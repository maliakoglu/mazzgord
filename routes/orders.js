// /api/orders — Sipariş oluşturma (sepet → ödeme)
import { corsHeaders, checkAdminAuth, unauthorizedResponse } from "../lib/cors.js";
import { escapeHtml } from "../lib/escapeHtml.js";
import { orderSchema, validateBody } from "../lib/validation.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export async function handleOrdersRoute(path, request, env) {
  // GET /api/orders — Admin: tüm siparişleri listele
  if (path === "/api/orders" && request.method === "GET") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const result = await env.DB.prepare(
        "SELECT * FROM orders ORDER BY created_at DESC LIMIT 100"
      ).all();
      const orders = (result.results || []).map(o => {
        let items = [];
        try { items = JSON.parse(o.items_json); } catch {}
        return { ...o, items };
      });
      return jsonResponse({ success: true, data: orders });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // POST /api/orders — Sepetten sipariş oluştur (public)
  if (path === "/api/orders" && request.method === "POST") {
    try {
      const body = await request.json();
      const validation = validateBody(orderSchema, body);
      if (!validation.success) return validation.response;

      const { customer_name, customer_email, customer_phone, items, total, delivery_method, shipping_address, file_keys, source_language, target_language } = validation.data;

      const delivery = delivery_method || "digital";
      const address = delivery === "shipping" ? (shipping_address || null) : null;

      const linkId = crypto.randomUUID().replace(/-/g, "").substring(0, 16);
      const itemsJson = JSON.stringify(items);
      const description = items.map(i => i.name).join(", ").substring(0, 200);

      // orders tablosuna kaydet
      const fileKeysJson = file_keys && Array.isArray(file_keys) ? JSON.stringify(file_keys) : null;
      await env.DB.prepare(
        "INSERT INTO orders (payment_link_id, customer_name, customer_email, customer_phone, items_json, total, status, delivery_method, shipping_address, file_key, source_language, target_language) VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?)"
      ).bind(linkId, customer_name, customer_email, customer_phone || null, itemsJson, total, delivery, address, fileKeysJson, source_language || null, target_language || null).run();

      // payments tablosuna da kaydet (mevcut ödeme akışı ile uyumlu)
      await env.DB.prepare(
        "INSERT INTO payments (quote_id, amount, description, customer_name, customer_email, customer_phone, payment_link_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')"
      ).bind(null, total, description, customer_name, customer_email, customer_phone || null, linkId).run();

      return jsonResponse({
        success: true,
        payment_link_id: linkId,
        payment_url: `https://mazzgord.com/odeme?id=${linkId}`,
      });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // GET /api/orders/:link_id — Sipariş durumu getir (public, müşteri için)
  const orderMatch = path.match(/^\/api\/orders\/([a-f0-9]+)$/);
  if (orderMatch && request.method === "GET") {
    try {
      const linkId = orderMatch[1];
      const order = await env.DB.prepare(
        "SELECT * FROM orders WHERE payment_link_id = ?"
      ).bind(linkId).first();

      if (!order) {
        return jsonResponse({ success: false, error: "Sipariş bulunamadı" }, 404);
      }

      // items_json'u parse et
      let items = [];
      try { items = JSON.parse(order.items_json); } catch {}

      return jsonResponse({
        success: true,
        data: { ...order, items }
      });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // PUT /api/orders/:link_id/deliver — Admin: siparişi teslim et (dijital veya kargo)
  const deliverMatch = path.match(/^\/api\/orders\/([a-f0-9]+)\/deliver$/);
  if (deliverMatch && request.method === "PUT") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();

      const linkId = deliverMatch[1];

      // Hem multipart (dosya+yük) hem JSON (sadece durum) destekle
      const contentType = request.headers.get("Content-Type") || "";
      let tracking_number = null;
      let delivery_note = null;
      let deliveredFileKey = null;

      if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        tracking_number = formData.get("tracking_number") || null;
        delivery_note = formData.get("delivery_note") || null;
        const file = formData.get("file");
        if (file) {
          const MAX_FILE_SIZE = 25 * 1024 * 1024;
          if (file.size > MAX_FILE_SIZE) {
            return jsonResponse({ success: false, error: "Dosya boyutu 25MB'den buyuk" }, 413);
          }
          const safeFileName = String(file.name)
            .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
            .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
            .replace(/[^a-zA-Z0-9._-]/g, "_");
          const dateStr = new Date().toISOString().split("T")[0];
          deliveredFileKey = `delivered/${linkId}_${dateStr}_${safeFileName}`;
          await env.DOCS.put(deliveredFileKey, file.stream(), {
            httpMetadata: { contentType: file.type || "application/octet-stream" },
            customMetadata: {
              payment_link_id: linkId,
              uploaded_at: new Date().toISOString(),
              original_filename: file.name,
              type: "delivered",
            },
          });
        }
      } else {
        const body = await request.json();
        tracking_number = body.tracking_number || null;
        delivery_note = body.delivery_note || null;
        deliveredFileKey = body.delivered_file_key || null;
      }

      const order = await env.DB.prepare(
        "SELECT * FROM orders WHERE payment_link_id = ?"
      ).bind(linkId).first();

      if (!order) {
        return jsonResponse({ success: false, error: "Sipariş bulunamadı" }, 404);
      }

      // Sipariş durumunu güncelle
      await env.DB.prepare(
        "UPDATE orders SET status = 'delivered', shipping_tracking = ?, delivered_file_key = ? WHERE payment_link_id = ?"
      ).bind(tracking_number || null, deliveredFileKey, linkId).run();

      // Müşteriye teslimat e-postası gönder
      try {
        const resendKey = env.RESEND_API_KEY;
        if (resendKey) {
          let items = [];
          try { items = JSON.parse(order.items_json); } catch {}

          const isDigital = order.delivery_method === "digital";
          const deliveryHtml = isDigital
            ? `<p>Çeviri belgeleriniz hazırdır. ${deliveredFileKey ? `Çevrilmiş belgenizi <a href="https://mazzgord.com/hesabim" style="color:#2563eb">Hesabım</a> sayfanızdan indirebilirsiniz.` : "Belgeler kısa süre içinde e-posta ve WhatsApp üzerinden size iletilecektir."}</p>`
            : `<p>Çeviri belgeleriniz hazırdır ve kargo ile gönderilmiştir.</p>${tracking_number ? `<p><strong>Kargo Takip No:</strong> ${tracking_number}</p>` : ""}`;

          const html = `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <div style="background:#f8f9fa;padding:30px;border-radius:10px">
    <h1 style="color:#16a34a;text-align:center">📦 Belgeleriniz Hazır!</h1>
    <p>Sayın <strong>${escapeHtml(order.customer_name)}</strong>,</p>
    <p>Çeviri işleminiz tamamlanmıştır.</p>
    <div style="background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">Sipariş No:</td><td style="padding:8px 0;font-weight:bold;text-align:right;font-family:monospace">${linkId}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Teslimat:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${isDigital ? "Dijital (E-posta/WhatsApp)" : "Kargo"}</td></tr>
        ${tracking_number ? `<tr><td style="padding:8px 0;color:#666">Kargo Takip:</td><td style="padding:8px 0;font-weight:bold;text-align:right;font-family:monospace">${escapeHtml(tracking_number)}</td></tr>` : ""}
      </table>
    </div>
    ${deliveryHtml}
    ${delivery_note ? `<p><em>Not: ${escapeHtml(delivery_note)}</em></p>` : ""}
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
    <p style="font-size:13px;color:#666">Mazzgord Çeviri Hizmetleri<br>Denizli, Türkiye<br>info@mazzgord.com | +90 538 629 50 40</p>
  </div>
</body></html>`;

          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: "Mazzgord <info@mazzgord.com>",
              to: [order.customer_email],
              subject: `Belgeleriniz Hazır — ${linkId} | Mazzgord`,
              html,
            }),
          });
        }
      } catch (err) {
        console.log("Teslimat e-posta hatası:", String(err));
      }

      return jsonResponse({ success: true, message: "Sipariş teslim edildi", link_id: linkId });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  return null;
}

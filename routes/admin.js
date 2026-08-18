// Admin API endpoints — extracted from worker.js
import { corsHeaders, checkAdminAuth, unauthorizedResponse } from "../lib/cors.js";
import { sendStatusNotification } from "../lib/notifications.js";

export async function handleAdminRoute(path, request, env) {
  // GET /api/messages — Admin: mesajları listele
  if (path === "/api/messages" && request.method === "GET") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const result = await env.DB.prepare(
        "SELECT * FROM messages ORDER BY created_at DESC LIMIT 100"
      ).all();
      return new Response(JSON.stringify({ success: true, data: result.results }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // GET /api/customers — Admin: müşteri listesi (özet)
  if (path === "/api/customers" && request.method === "GET") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const result = await env.DB.prepare(
        `SELECT q.email, q.name, q.phone,
          COUNT(*) as total_orders,
          COUNT(DISTINCT q.source_language || '→' || q.target_language) as lang_variety,
          MIN(q.created_at) as first_order,
          MAX(q.created_at) as last_order,
          COALESCE(SUM(p.amount), 0) as total_spent,
          GROUP_CONCAT(DISTINCT q.source_language || '→' || q.target_language) as lang_pairs
        FROM quotes q
        LEFT JOIN payments p ON p.quote_id = q.id AND p.status = 'paid'
        GROUP BY q.email
        ORDER BY last_order DESC`
      ).all();
      return new Response(JSON.stringify({ success: true, data: result.results }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // GET /api/customer/:email — Admin: müşteri detayı
  if (path.startsWith("/api/customer/") && request.method === "GET") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const customerEmail = decodeURIComponent(path.replace("/api/customer/", ""));
      const orders = await env.DB.prepare(
        "SELECT * FROM quotes WHERE email = ? ORDER BY created_at DESC"
      ).bind(customerEmail).all();
      const payments = await env.DB.prepare(
        "SELECT p.* FROM payments p JOIN quotes q ON p.quote_id = q.id WHERE q.email = ? ORDER BY p.created_at DESC"
      ).bind(customerEmail).all();
      return new Response(JSON.stringify({ success: true, data: { orders: orders.results, payments: payments.results } }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // GET /api/dashboard — Admin: dashboard istatistikleri
  if (path === "/api/dashboard" && request.method === "GET") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();

      const today = new Date().toISOString().split("T")[0];
      const monthStart = today.substring(0, 7) + "-01";

      const todayQuotes = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM quotes WHERE date(created_at) = date('now')"
      ).first();
      const pendingQuotes = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM quotes WHERE order_status = 'pending'"
      ).first();
      const urgentQuotes = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM quotes WHERE urgency = 'acil' AND order_status NOT IN ('completed', 'delivered', 'cancelled')"
      ).first();
      const todayRevenue = await env.DB.prepare(
        "SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE date(paid_at) = date('now') AND status = 'paid'"
      ).first();
      const monthRevenue = await env.DB.prepare(
        "SELECT COALESCE(SUM(amount), 0) as total FROM payments WHERE paid_at >= ? AND status = 'paid'"
      ).bind(monthStart).first();
      const totalQuotes = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM quotes"
      ).first();
      const totalPaid = await env.DB.prepare(
        "SELECT COUNT(*) as count FROM payments WHERE status = 'paid'"
      ).first();
      const langPairs = await env.DB.prepare(
        "SELECT source_language || ' → ' || target_language as pair, COUNT(*) as count FROM quotes GROUP BY pair ORDER BY count DESC LIMIT 5"
      ).all();
      const recentCustomers = await env.DB.prepare(
        "SELECT name, email, created_at FROM quotes ORDER BY created_at DESC LIMIT 5"
      ).all();

      return new Response(JSON.stringify({
        success: true,
        data: {
          todayQuotes: todayQuotes?.count || 0,
          pendingQuotes: pendingQuotes?.count || 0,
          urgentQuotes: urgentQuotes?.count || 0,
          todayRevenue: todayRevenue?.total || 0,
          monthRevenue: monthRevenue?.total || 0,
          totalQuotes: totalQuotes?.count || 0,
          totalPaid: totalPaid?.count || 0,
          topLanguages: langPairs?.results || [],
          recentCustomers: recentCustomers?.results || [],
        }
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // PUT /api/quote/:id/status — Admin: sipariş durumu güncelle
  if (path.startsWith("/api/quote/") && path.endsWith("/status") && request.method === "PUT") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const quoteId = path.replace("/api/quote/", "").replace("/status", "");
      const body = await request.json();
      const { status, estimated_price, translator, delivery_date } = body;

      await env.DB.prepare(
        "UPDATE quotes SET order_status = ?, estimated_price = ?, translator = ?, delivery_date = ? WHERE id = ?"
      ).bind(
        status || null,
        estimated_price != null ? estimated_price : null,
        translator || null,
        delivery_date || null,
        quoteId
      ).run();

      // Müşteriye durum bildirimi gönder
      if (status) {
        const quote = await env.DB.prepare(
          "SELECT id, name, email, source_language, target_language, order_status, estimated_price, delivery_date, translator FROM quotes WHERE id = ?"
        ).bind(quoteId).first();
        if (quote) await sendStatusNotification(env, quote);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // PUT /api/quote/:id/deliver — Admin: teklif siparişini teslim et (dosya yükleme + durum)
  if (path.startsWith("/api/quote/") && path.endsWith("/deliver") && request.method === "PUT") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const quoteId = path.replace("/api/quote/", "").replace("/deliver", "");

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
            return new Response(JSON.stringify({ success: false, error: "Dosya boyutu 25MB'den buyuk" }), {
              status: 413, headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }
          const safeFileName = String(file.name)
            .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
            .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
            .replace(/[^a-zA-Z0-9._-]/g, "_");
          const dateStr = new Date().toISOString().split("T")[0];
          deliveredFileKey = `delivered/MZ-${String(quoteId).padStart(5, "0")}_${dateStr}_${safeFileName}`;
          await env.DOCS.put(deliveredFileKey, file.stream(), {
            httpMetadata: { contentType: file.type || "application/octet-stream" },
            customMetadata: {
              quote_id: quoteId,
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

      const quote = await env.DB.prepare(
        "SELECT * FROM quotes WHERE id = ?"
      ).bind(quoteId).first();

      if (!quote) {
        return new Response(JSON.stringify({ success: false, error: "Sipariş bulunamadı" }), {
          status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      await env.DB.prepare(
        "UPDATE quotes SET order_status = 'delivered', shipping_tracking = ?, delivered_file_key = ? WHERE id = ?"
      ).bind(tracking_number || null, deliveredFileKey, quoteId).run();

      // Müşteriye teslimat e-postası gönder
      try {
        const resendKey = env.RESEND_API_KEY;
        if (resendKey) {
          const isDigital = quote.delivery_method !== "shipping";
          const orderNo = `MZ-${String(quote.id).padStart(5, "0")}`;
          const deliveryHtml = isDigital
            ? `<p>Çeviri belgeleriniz hazırdır. ${deliveredFileKey ? `Çevrilmiş belgenizi <a href="https://mazzgord.com/hesabim" style="color:#2563eb">Hesabım</a> sayfanızdan indirebilirsiniz.` : "Belgeler kısa süre içinde e-posta ve WhatsApp üzerinden size iletilecektir."}</p>`
            : `<p>Çeviri belgeleriniz hazırdır ve kargo ile gönderilmiştir.</p>${tracking_number ? `<p><strong>Kargo Takip No:</strong> ${tracking_number}</p>` : ""}`;

          const html = `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <div style="background:#f8f9fa;padding:30px;border-radius:10px">
    <h1 style="color:#16a34a;text-align:center">📦 Belgeleriniz Hazır!</h1>
    <p>Sayın <strong>${quote.name}</strong>,</p>
    <p>Çeviri işleminiz tamamlanmıştır.</p>
    <div style="background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">Sipariş No:</td><td style="padding:8px 0;font-weight:bold;text-align:right;font-family:monospace">${orderNo}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Teslimat:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${isDigital ? "Dijital (E-posta/WhatsApp)" : "Kargo"}</td></tr>
        ${tracking_number ? `<tr><td style="padding:8px 0;color:#666">Kargo Takip:</td><td style="padding:8px 0;font-weight:bold;text-align:right;font-family:monospace">${tracking_number}</td></tr>` : ""}
      </table>
    </div>
    ${deliveryHtml}
    ${delivery_note ? `<p><em>Not: ${delivery_note}</em></p>` : ""}
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
    <p style="font-size:13px;color:#666">Mazzgord Çeviri Hizmetleri<br>Denizli, Türkiye<br>info@mazzgord.com | +90 538 629 50 40</p>
  </div>
</body></html>`;

          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: "Mazzgord <info@mazzgord.com>",
              to: [quote.email],
              subject: `Belgeleriniz Hazır — ${orderNo} | Mazzgord`,
              html,
            }),
          });
        }
      } catch (err) {
        console.log("Teklif teslimat e-posta hatası:", String(err));
      }

      return new Response(JSON.stringify({ success: true, message: "Sipariş teslim edildi", quote_id: quoteId }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // GET /api/quotes — Admin: teklifleri listele
  if (path === "/api/quotes" && request.method === "GET") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const result = await env.DB.prepare(
        "SELECT * FROM quotes ORDER BY created_at DESC LIMIT 100"
      ).all();
      return new Response(JSON.stringify({ success: true, data: result.results }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // GET /api/files/:key — Admin: R2'den dosya indir
  if (path.startsWith("/api/files/") && request.method === "GET") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      const fileKey = path.replace("/api/files/", "");
      const obj = await env.DOCS.get(`uploads/${fileKey}`);
      if (!obj) {
        return new Response(JSON.stringify({ error: "Dosya bulunamadı" }), {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const isInline = request.headers.get("X-View-Mode") === "inline";
      return new Response(obj.body, {
        headers: {
          "Content-Type": obj.httpMetadata?.contentType || "application/octet-stream",
          "Content-Disposition": `${isInline ? "inline" : "attachment"}; filename="${fileKey.split("/").pop()}"`,
          "Access-Control-Allow-Origin": "*",
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }


  // POST /api/admin/login — Admin login (şifre doğrulama, token döndür)
  if (path === "/api/admin/login" && request.method === "POST") {
    try {
      const body = await request.json();
      const password = body.password || "";
      if (password && password === env.ADMIN_TOKEN) {
        return new Response(JSON.stringify({ success: true, token: env.ADMIN_TOKEN }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      return new Response(JSON.stringify({ success: false, error: "Hatali sifre" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  return null;
}

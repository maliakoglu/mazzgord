// GET /api/account/profile — Müşteri profil bilgileri
// GET /api/account/orders — Müşteri sipariş geçmişi (quotes + orders)
// GET /api/account/files/:key — Müşteri dosya indirme (R2)
import { corsHeaders } from "../lib/cors.js";
import { getCustomerFromRequest, unauthorizedCustomerResponse } from "../lib/customerAuth.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export async function handleAccountRoute(path, request, env) {
  // Sadece /api/account/ ile başlayan yolları işle
  if (!path.startsWith("/api/account/")) return null;

  // Tüm account route'ları auth gerektirir
  const customer = await getCustomerFromRequest(request, env);
  if (!customer) return unauthorizedCustomerResponse();

  // GET /api/account/profile
  if (path === "/api/account/profile" && request.method === "GET") {
    try {
      const row = await env.DB.prepare(
        "SELECT id, name, email, phone, created_at FROM customers WHERE id = ?"
      ).bind(customer.customerId).first();
      if (!row) return jsonResponse({ success: false, error: "Kullanici bulunamadi" }, 404);
      return jsonResponse({ success: true, data: row });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // GET /api/account/orders — Sipariş geçmişi (quotes + orders)
  if (path === "/api/account/orders" && request.method === "GET") {
    try {
      // Quotes (teklifler)
      const quotes = await env.DB.prepare(
        "SELECT id, name, email, source_language, target_language, document_type, page_count, word_count, urgency, delivery_method, order_status, estimated_price, delivery_date, created_at FROM quotes WHERE email = ? ORDER BY created_at DESC"
      ).bind(customer.email).all();

      // Orders (siparişler)
      const orders = await env.DB.prepare(
        "SELECT payment_link_id, customer_name, items_json, total, status, delivery_method, shipping_tracking, created_at FROM orders WHERE customer_email = ? ORDER BY created_at DESC"
      ).bind(customer.email).all();

      // Payments (ödeme geçmişi)
      const payments = await env.DB.prepare(
        "SELECT p.amount, p.description, p.status, p.payment_link_id, p.created_at FROM payments p WHERE p.customer_email = ? ORDER BY p.created_at DESC"
      ).bind(customer.email).all();

      // Orders items_json'u parse et
      const parsedOrders = (orders.results || []).map(o => {
        let items = [];
        try { items = JSON.parse(o.items_json); } catch {}
        return { ...o, items };
      });

      return jsonResponse({
        success: true,
        data: {
          quotes: quotes.results || [],
          orders: parsedOrders,
          payments: payments.results || [],
        }
      });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // GET /api/account/files/:key — Dosya indirme (R2)
  if (path.startsWith("/api/account/files/") && request.method === "GET") {
    try {
      const fileKey = decodeURIComponent(path.replace("/api/account/files/", ""));

      // Bu dosya müşteriye ait mi? — quotes veya orders tablosundan kontrol
      const quoteFile = await env.DB.prepare(
        "SELECT id FROM quotes WHERE email = ? AND file_key = ?"
      ).bind(customer.email, fileKey).first();

      if (!quoteFile) {
        // Orders file_key kontrol (JSON array)
        const orderFiles = await env.DB.prepare(
          "SELECT file_key FROM orders WHERE customer_email = ?"
        ).bind(customer.email).all();
        const allKeys = [];
        for (const o of (orderFiles.results || [])) {
          try { const keys = JSON.parse(o.file_key); if (Array.isArray(keys)) allKeys.push(...keys); } catch {}
        }
        if (!allKeys.includes(fileKey)) {
          return jsonResponse({ success: false, error: "Dosya bulunamadi veya yetkiniz yok" }, 403);
        }
      }

      const object = await env.DOCS.get(fileKey);
      if (!object) return jsonResponse({ success: false, error: "Dosya bulunamadi" }, 404);

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("Content-Disposition", `attachment; filename="${fileKey.split("/").pop()}"`);

      return new Response(object.body, { headers });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  return null;
}

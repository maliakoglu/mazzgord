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
      // Quotes, Orders ve Payments — paralel çek
      const [quotes, orders, payments] = await Promise.all([
        env.DB.prepare(
          `SELECT q.id, q.name, q.email, q.source_language, q.target_language, q.document_type, q.page_count, q.word_count, q.urgency, q.delivery_method, q.order_status, q.offer_status, q.offer_note, q.estimated_price, q.delivery_date, q.delivered_file_key, q.file_key, q.document_uploaded_at, q.created_at,
           (SELECT p.payment_link_id FROM payments p WHERE p.quote_id = q.id AND p.status = 'pending' ORDER BY p.created_at DESC LIMIT 1) as payment_link_id,
           (SELECT p.status FROM payments p WHERE p.quote_id = q.id AND p.status = 'paid' ORDER BY p.paid_at DESC LIMIT 1) as payment_status
           FROM quotes q WHERE q.email = ? ORDER BY q.created_at DESC`
        ).bind(customer.email).all(),
        env.DB.prepare(
          "SELECT payment_link_id, customer_name, items_json, total, status, delivery_method, shipping_tracking, delivered_file_key, created_at FROM orders WHERE customer_email = ? ORDER BY created_at DESC"
        ).bind(customer.email).all(),
        env.DB.prepare(
          "SELECT p.amount, p.description, p.status, p.payment_link_id, p.created_at FROM payments p WHERE p.customer_email = ? ORDER BY p.created_at DESC"
        ).bind(customer.email).all(),
      ]);

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

  // GET /api/account/files/:key — Dosya indirme (R2) — ÖDEME KONTROLÜ YAPILIR
  if (path.startsWith("/api/account/files/") && request.method === "GET") {
    try {
      const fileKey = decodeURIComponent(path.replace("/api/account/files/", ""));

      // 1) Dosya hangi quote'a veya order'a ait? — sahiplik kontrolü
      let ownerQuoteId = null;
      let ownerOrderLinkId = null;

      // a) Quote file_key (müşteri yüklediği kaynak belge)
      const quoteFile = await env.DB.prepare(
        "SELECT id FROM quotes WHERE email = ? AND file_key = ?"
      ).bind(customer.email, fileKey).first();
      if (quoteFile) ownerQuoteId = quoteFile.id;

      // b) Quote delivered_file_key (admin teslim ettiği belge)
      if (!ownerQuoteId) {
        const deliveredQuote = await env.DB.prepare(
          "SELECT id FROM quotes WHERE email = ? AND delivered_file_key = ?"
        ).bind(customer.email, fileKey).first();
        if (deliveredQuote) ownerQuoteId = deliveredQuote.id;
      }

      // c) Orders file_key (JSON array)
      if (!ownerQuoteId && !ownerOrderLinkId) {
        const orderFiles = await env.DB.prepare(
          "SELECT payment_link_id, file_key FROM orders WHERE customer_email = ?"
        ).bind(customer.email).all();
        for (const o of (orderFiles.results || [])) {
          try {
            const keys = JSON.parse(o.file_key);
            if (Array.isArray(keys) && keys.includes(fileKey)) {
              ownerOrderLinkId = o.payment_link_id;
              break;
            }
          } catch {}
        }
      }

      // d) Orders delivered_file_key
      if (!ownerQuoteId && !ownerOrderLinkId) {
        const deliveredOrder = await env.DB.prepare(
          "SELECT payment_link_id FROM orders WHERE customer_email = ? AND delivered_file_key = ?"
        ).bind(customer.email, fileKey).first();
        if (deliveredOrder) ownerOrderLinkId = deliveredOrder.payment_link_id;
      }

      // Sahiplik yok → erişim reddedildi
      if (!ownerQuoteId && !ownerOrderLinkId) {
        return jsonResponse({ success: false, error: "Dosya bulunamadi veya yetkiniz yok" }, 403);
      }

      // 2) ÖDEME KONTROLÜ — ödeme yapılmadan belge erişimi yok
      let isPaid = false;

      if (ownerQuoteId) {
        // Quote bazlı: payments tablosunda bu quote_id için paid kaydı var mı?
        const payment = await env.DB.prepare(
          "SELECT status FROM payments WHERE quote_id = ? AND status = 'paid' LIMIT 1"
        ).bind(ownerQuoteId).first();
        isPaid = !!payment;
      } else if (ownerOrderLinkId) {
        // Order bazlı: payment_link_id ile ödeme kontrolü
        const payment = await env.DB.prepare(
          "SELECT status FROM payments WHERE payment_link_id = ? AND status = 'paid' LIMIT 1"
        ).bind(ownerOrderLinkId).first();
        isPaid = !!payment;
      }

      if (!isPaid) {
        return jsonResponse({
          success: false,
          error: "Bu belgeye erişmek için ödemenizi tamamlamanız gerekiyor.",
          code: "PAYMENT_REQUIRED"
        }, 402);
      }

      // 3) Ödeme yapılmış — R2'den dosyayı serve et
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

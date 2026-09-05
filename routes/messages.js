// /api/messages/order/:id — Sipariş bazlı mesajlaşma
import { corsHeaders, checkAdminAuth, unauthorizedResponse } from "../lib/cors.js";
import { getCustomerFromRequest, unauthorizedCustomerResponse } from "../lib/customerAuth.js";
import { escapeHtml } from "../lib/escapeHtml.js";

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export async function handleMessagesRoute(path, request, env) {
  if (!path.startsWith("/api/messages/order/")) return null;

  // GET /api/messages/order/:quoteId — Müşteri: mesajları getir
  const getMatch = path.match(/^\/api\/messages\/order\/(\d+)$/);
  if (getMatch && request.method === "GET") {
    try {
      const quoteId = getMatch[1];

      // Auth: müşteri bu siparişe sahip mi?
      const customer = await getCustomerFromRequest(request, env);
      let isOwner = false;

      if (customer) {
        const quote = await env.DB.prepare(
          "SELECT id FROM quotes WHERE id = ? AND email = ?"
        ).bind(quoteId, customer.email).first();
        if (quote) isOwner = true;
      }

      // Admin de görebilir
      const isAdmin = checkAdminAuth(request, env);
      if (!isOwner && !isAdmin) return unauthorizedCustomerResponse();

      const messages = await env.DB.prepare(
        "SELECT id, sender, message, created_at FROM order_messages WHERE quote_id = ? ORDER BY created_at ASC"
      ).bind(quoteId).all();

      return jsonResponse({ success: true, data: messages.results || [] });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  // POST /api/messages/order/:quoteId — Müşteri veya admin: mesaj gönder
  const postMatch = path.match(/^\/api\/messages\/order\/(\d+)$/);
  if (postMatch && request.method === "POST") {
    try {
      const quoteId = postMatch[1];

      // Auth: müşteri bu siparişe sahip mi?
      const customer = await getCustomerFromRequest(request, env);
      let isOwner = false;
      let sender = "customer";

      if (customer) {
        const quote = await env.DB.prepare(
          "SELECT id FROM quotes WHERE id = ? AND email = ?"
        ).bind(quoteId, customer.email).first();
        if (quote) isOwner = true;
      }

      const isAdmin = checkAdminAuth(request, env);
      if (isAdmin) sender = "admin";

      if (!isOwner && !isAdmin) return unauthorizedCustomerResponse();

      const body = await request.json();
      const message = (body.message || "").trim();
      if (!message) return jsonResponse({ success: false, error: "Mesaj bos" }, 400);
      if (message.length > 2000) return jsonResponse({ success: false, error: "Mesaj cok uzun" }, 400);

      await env.DB.prepare(
        "INSERT INTO order_messages (quote_id, sender, message) VALUES (?, ?, ?)"
      ).bind(quoteId, sender, message).run();

      // Admin'e yeni mesaj bildirimi (e-posta)
      if (sender === "customer") {
        try {
          const resendKey = env.RESEND_API_KEY;
          if (resendKey) {
            const quote = await env.DB.prepare(
              "SELECT id, name, email FROM quotes WHERE id = ?"
            ).bind(quoteId).first();
            if (quote) {
              const orderNo = `MZ-${String(quote.id).padStart(5, "0")}`;
              await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
                body: JSON.stringify({
                  from: "Mazzgord <info@mazzgord.com>",
                  to: ["info@mazzgord.com"],
                  subject: `Yeni Mesaj — ${orderNo} | ${quote.name}`,
                  html: `<p><strong>${escapeHtml(quote.name)}</strong> (${escapeHtml(quote.email)}) sipariş <strong>${orderNo}</strong> için yeni mesaj gönderdi:</p><p style="background:#f8f9fa;padding:15px;border-radius:8px">${escapeHtml(message)}</p>`,
                }),
              });
            }
          }
        } catch (err) {
          console.log("Mesaj bildirim e-posta hatası:", String(err));
        }
      }

      return jsonResponse({ success: true, message: "Mesaj gonderildi" });
    } catch (err) {
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

  return null;
}

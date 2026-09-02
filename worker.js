import { seoData } from "./lib/seoData.js";
import { handleRedirects } from "./lib/redirects.js";
import { corsHeaders, checkAdminAuth, unauthorizedResponse, checkCsrf, csrfFailedResponse } from "./lib/cors.js";
import { checkRateLimit } from "./lib/rateLimit.js";
import { handleContact } from "./routes/contact.js";
import { handleQuote } from "./routes/quote.js";
import { handleUpload } from "./routes/upload.js";
import { handleAdminRoute } from "./routes/admin.js";
import { handleCalculatePrice } from "./routes/calculatePrice.js";
import { handleServicesRoute } from "./routes/services.js";
import { handleXmlFeed } from "./routes/xmlFeed.js";
import { handleOrdersRoute } from "./routes/orders.js";
import { handleAuthRoute } from "./routes/auth.js";
import { handleAccountRoute } from "./routes/account.js";
import { handleMessagesRoute } from "./routes/messages.js";
import { processResponse } from "./lib/seoProcessor.js";
import { escapeHtml } from "./lib/escapeHtml.js";

export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const path = url.pathname;

    const redirectResponse = handleRedirects(url);
    if (redirectResponse) return redirectResponse;



    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const rateLimitResponse = await checkRateLimit(request, env, path);
    if (rateLimitResponse) return rateLimitResponse;

    if (request.method === "POST" && !path.startsWith("/api/payment/") && !path.startsWith("/odeme/sonuc")) {
      const csrfOk = checkCsrf(request);
      if (!csrfOk) {
        console.log("CSRF FAILED:", {
          path,
          method: request.method,
          auth: request.headers.get("Authorization") || "NONE",
          mobile: request.headers.get("X-Mazzgord-Mobile") || "NONE",
          origin: request.headers.get("Origin") || "NONE",
        });
        return csrfFailedResponse();
      }
    }

    if (path === "/api/contact" && request.method === "POST") {
      return handleContact(request, env);
    }

    if ((path === "/api/quote" && request.method === "POST") || (path.startsWith("/api/quote/") && request.method === "GET" && !path.endsWith("/detail")) || (path === "/api/quote/send-code" && request.method === "POST") || (path === "/api/quote/verify-code" && request.method === "POST") || (path.match(/^\/api\/quote\/\d+\/(?:accept|reject|upload-document|review)$/) && request.method === "POST")) {
      return handleQuote(request, env, path, request.method);
    }

    if (path === "/api/upload" && request.method === "POST") {
      return handleUpload(request, env);
    }

    const adminResponse = await handleAdminRoute(path, request, env);
    if (adminResponse) return adminResponse;

    if (path === "/api/calculate-price" && request.method === "POST") {
      return handleCalculatePrice(request, env);
    }

    const servicesResponse = await handleServicesRoute(path, request, env);
    if (servicesResponse) return servicesResponse;

    if (path === "/api/iyzico/products.xml" && request.method === "GET") {
      return handleXmlFeed(request, env);
    }

    const authResponse = await handleAuthRoute(path, request, env);
    if (authResponse) return authResponse;

    const accountResponse = await handleAccountRoute(path, request, env);
    if (accountResponse) return accountResponse;

    const messagesResponse = await handleMessagesRoute(path, request, env);
    if (messagesResponse) return messagesResponse;

    const ordersResponse = await handleOrdersRoute(path, request, env);
    if (ordersResponse) return ordersResponse;


    async function sendPaymentEmails(env, payment, iyzicoPaymentId) {
      const resendKey = env.RESEND_API_KEY;
      if (!resendKey) {
        console.log("RESEND_API_KEY eksik — e-posta gönderilemedi");
        return;
      }

      const refNumber = payment.payment_link_id;
      const amount = Number(payment.amount).toFixed(2);
      const date = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });

      const customerHtml = `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <div style="background:#f8f9fa;padding:30px;border-radius:10px">
    <h1 style="color:#16a34a;text-align:center">✅ Ödemeniz Alındı!</h1>
    <p>Sayın <strong>${escapeHtml(payment.customer_name)}</strong>,</p>
    <p>Çeviri hizmeti ödemeniz başarıyla alınmıştır.</p>
    <div style="background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">Hizmet:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${escapeHtml(payment.description || "Çeviri Hizmeti")}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Tutar:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${amount} ₺</td></tr>
        <tr><td style="padding:8px 0;color:#666">Tarih:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${date}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Ödeme Referansı:</td><td style="padding:8px 0;font-weight:bold;text-align:right;font-family:monospace">${refNumber}</td></tr>
        <tr><td style="padding:8px 0;color:#666">İşlem No:</td><td style="padding:8px 0;font-weight:bold;text-align:right;font-family:monospace">${iyzicoPaymentId}</td></tr>
      </table>
    </div>
    <p>Lütfen ödeme referans numaranızı saklayın. Çeviri işleminiz en kısa sürede başlatılacaktır.</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
    <p style="font-size:13px;color:#666">Mazzgord Çeviri Hizmetleri<br>Denizli, Türkiye<br>info@mazzgord.com | +90 538 629 50 40</p>
  </div>
</body></html>`;

      const adminHtml = `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <div style="background:#f8f9fa;padding:30px;border-radius:10px">
    <h1 style="color:#2563eb;text-align:center">💰 Yeni Ödeme Alındı!</h1>
    <div style="background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">Müşteri:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${escapeHtml(payment.customer_name)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">E-posta:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${escapeHtml(payment.customer_email)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Telefon:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${escapeHtml(payment.customer_phone || "—")}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Hizmet:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${escapeHtml(payment.description || "Çeviri Hizmeti")}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Tutar:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${amount} ₺</td></tr>
        <tr><td style="padding:8px 0;color:#666">Tarih:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${date}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Ödeme Referansı:</td><td style="padding:8px 0;font-weight:bold;text-align:right;font-family:monospace">${refNumber}</td></tr>
        <tr><td style="padding:8px 0;color:#666">İşlem No:</td><td style="padding:8px 0;font-weight:bold;text-align:right;font-family:monospace">${iyzicoPaymentId}</td></tr>
      </table>
    </div>
    <p style="text-align:center"><a href="https://mazzgord.com/admin" style="display:inline-block;padding:10px 24px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold">Admin Paneli</a></p>
  </div>
</body></html>`;

      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Mazzgord <info@mazzgord.com>",
            to: [payment.customer_email],
            subject: "Ödemeniz Alındı — Mazzgord Çeviri Hizmetleri",
            html: customerHtml,
          }),
        });

        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Mazzgord <info@mazzgord.com>",
            to: ["info@mazzgord.com"],
            subject: `Yeni Ödeme: ${amount} ₺ — ${escapeHtml(payment.customer_name)}`,
            html: adminHtml,
          }),
        });

      } catch (err) {
        console.log("E-posta gönderme hatası:", String(err));
      }
    }

    async function iyzicoAuth(apiKey, secretKey, uri, body) {
      const random = String(Date.now()) + Math.random().toString(8).slice(2);
      const encoder = new TextEncoder();
      const dataToSign = random + uri + JSON.stringify(body);
      const key = await crypto.subtle.importKey(
        'raw', encoder.encode(secretKey),
        { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
      );
      const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(dataToSign));
      const sigBytes = new Uint8Array(sigBuffer);
      let hex = '';
      for (let i = 0; i < sigBytes.length; i++) {
        hex += sigBytes[i].toString(16).padStart(2, '0');
      }
      const authParams = `apiKey:${apiKey}&randomKey:${random}&signature:${hex}`;
      const authHeader = `IYZWSv2 ` + btoa(authParams);
      return { authHeader, random };
    }

    if (path === "/api/payment/create" && request.method === "POST") {
      try {
        if (!checkAdminAuth(request, env)) return unauthorizedResponse();
        const body = await request.json();
        const { quote_id, amount, description, customer_name, customer_email, customer_phone } = body;

        if (!amount || !customer_name || !customer_email) {
          return new Response(JSON.stringify({ success: false, error: "Eksik alan" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const linkId = crypto.randomUUID().replace(/-/g, "").substring(0, 16);

        await env.DB.prepare(
          "INSERT INTO payments (quote_id, amount, description, customer_name, customer_email, customer_phone, payment_link_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')"
        ).bind(
          quote_id || null, amount, description || "Çeviri Hizmeti",
          customer_name, customer_email, customer_phone || null, linkId
        ).run();

        return new Response(JSON.stringify({ success: true, payment_link_id: linkId, payment_url: `https://mazzgord.com/odeme?id=${linkId}` }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
          status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    if (path.startsWith("/api/payment/") && !path.startsWith("/api/payment/create") && !path.startsWith("/api/payment/verify") && !path.startsWith("/api/payment/callback") && request.method === "GET") {
      try {
        const linkId = path.replace("/api/payment/", "");
        const result = await env.DB.prepare(
          "SELECT * FROM payments WHERE payment_link_id = ?"
        ).bind(linkId).first();

        if (!result) {
          return new Response(JSON.stringify({ success: false, error: "Ödeme bulunamadı" }), {
            status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        return new Response(JSON.stringify({ success: true, data: result }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
          status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    if (path === "/api/payment/initialize" && request.method === "POST") {
      try {
        const body = await request.json();
        const { payment_link_id } = body;

        const payment = await env.DB.prepare(
          "SELECT * FROM payments WHERE payment_link_id = ?"
        ).bind(payment_link_id).first();

        if (!payment) {
          return new Response(JSON.stringify({ success: false, error: "Ödeme bulunamadı" }), {
            status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        if (payment.status === "paid") {
          return new Response(JSON.stringify({ success: false, error: "Bu ödeme zaten tamamlanmış" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const apiKey = env.IYZICO_API_KEY;
        const secretKey = env.IYZICO_SECRET_KEY;
        const baseUrl = "https://api.iyzipay.com";
        const conversationId = `mazzgord-${payment.id}-${Date.now()}`;

        const priceStr = Number(payment.amount).toFixed(2);
        const buyerId = `BY${payment.id}`;
        const basketId = `BS${payment.id}`;
        const itemId = `IT${payment.id}`;

        const requestBody = {
          locale: "tr",
          conversationId,
          price: priceStr,
          paidPrice: priceStr,
          currency: "TRY",
          basketId,
          paymentChannel: "WEB",
          paymentGroup: "PRODUCT",
          enabledInstallments: [1, 2, 3, 6, 9],
          callbackUrl: request.headers.get("X-Mazzgord-Mobile") === "1"
            ? `https://mazzgord.com/odeme/sonuc/mobil?link=${payment_link_id}`
            : `https://mazzgord.com/odeme/sonuc?link=${payment_link_id}`,
          buyer: {
            id: buyerId,
            name: payment.customer_name.split(" ")[0] || payment.customer_name,
            surname: payment.customer_name.split(" ").slice(1).join(" ") || "Müşteri",
            gsmNumber: (payment.customer_phone || "+905000000000").replace(/\s/g, "").replace(/^(\+?90)?0*/, "+90"),
            email: payment.customer_email,
            identityNumber: "11111111111",
            lastLoginDate: new Date().toISOString().replace("T", " ").substring(0, 19),
            registrationDate: new Date().toISOString().replace("T", " ").substring(0, 19),
            registrationAddress: "Kınıklı Mah., Pamukkale, Denizli, 20160",
            ip: request.headers.get("CF-Connecting-IP") || "85.34.78.112",
            city: "Denizli",
            country: "TR",
            zipCode: "20160"
          },
          shippingAddress: {
            contactName: payment.customer_name,
            city: "Denizli",
            country: "TR",
            address: "Kınıklı Mah., Pamukkale, Denizli, 20160",
            zipCode: "20160"
          },
          billingAddress: {
            contactName: payment.customer_name,
            city: "Denizli",
            country: "TR",
            address: "Kınıklı Mah., Pamukkale, Denizli, 20160",
            zipCode: "20160"
          },
          basketItems: [{
            id: itemId,
            name: payment.description || "Çeviri Hizmeti",
            category1: "Hizmet",
            category2: "Çeviri",
            itemType: "VIRTUAL",
            price: priceStr
          }]
        };

        if (!apiKey || !secretKey) {
          return new Response(JSON.stringify({ success: false, error: "iyzico API key'leri eksik" }), {
            status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }


        const uri = "/payment/iyzipos/checkoutform/initialize/auth/ecom";
        const { authHeader, random } = await iyzicoAuth(apiKey, secretKey, uri, requestBody);

        const iyzicoResponse = await fetch(`${baseUrl}/payment/iyzipos/checkoutform/initialize/auth/ecom`, {
          method: "POST",
          headers: {
            "Authorization": authHeader,
            "x-iyzi-rnd": random,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(requestBody)
        });

        const iyzicoData = await iyzicoResponse.json();

        await env.DB.prepare(
          "UPDATE payments SET iyzico_conversation_id = ? WHERE payment_link_id = ?"
        ).bind(conversationId, payment_link_id).run();

        if (iyzicoData.status === "success" && iyzicoData.paymentPageUrl) {
          return new Response(JSON.stringify({
            success: true,
            payment_page_url: iyzicoData.paymentPageUrl
          }), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        } else {
          return new Response(JSON.stringify({
            success: false,
            error: iyzicoData.errorMessage || iyzicoData.errorGroup || "iyzico hatası",
            raw: iyzicoData,

          }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
          status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    if (path === "/api/payment/verify" && request.method === "POST") {
      try {
        const body = await request.json();
        const { token, conversation_id, link_id } = body;

        const payment = await env.DB.prepare(
          "SELECT * FROM payments WHERE payment_link_id = ?"
        ).bind(link_id).first();

        if (!payment) {
          return new Response(JSON.stringify({ success: false, error: "Ödeme bulunamadı" }), {
            status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const apiKey = env.IYZICO_API_KEY;
        const secretKey = env.IYZICO_SECRET_KEY;
        const baseUrl = "https://api.iyzipay.com";

        const requestBody = {
          locale: "tr",
          conversationId: conversation_id || payment.iyzico_conversation_id,
          token: token
        };

        const uri = "/payment/iyzipos/checkoutform/auth/ecom/detail";
        const { authHeader, random } = await iyzicoAuth(apiKey, secretKey, uri, requestBody);

        const iyzicoResponse = await fetch(`${baseUrl}/payment/iyzipos/checkoutform/auth/ecom/detail`, {
          method: "POST",
          headers: {
            "Authorization": authHeader,
            "x-iyzi-rnd": random,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(requestBody)
        });

        const iyzicoData = await iyzicoResponse.json();

        if (iyzicoData.status === "success") {
          const iyzicoPaymentId = String(iyzicoData.paymentId || token);
          await env.DB.prepare(
            "UPDATE payments SET status = 'paid', iyzico_payment_id = ?, paid_at = datetime('now') WHERE payment_link_id = ?"
          ).bind(iyzicoPaymentId, link_id).run();

          if (payment.quote_id) {
            await env.DB.prepare(
              "UPDATE quotes SET order_status = 'in_progress' WHERE id = ? AND order_status NOT IN ('completed', 'delivered')"
            ).bind(payment.quote_id).run();
          }

          try {
            await sendPaymentEmails(env, payment, iyzicoPaymentId);
          } catch (err) {
            console.log("E-posta bildirim hatası:", String(err));
          }

          return new Response(JSON.stringify({ success: true, status: "paid", data: iyzicoData }), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        } else {
          await env.DB.prepare(
            "UPDATE payments SET status = 'failed', iyzico_payment_id = ? WHERE payment_link_id = ?"
          ).bind(String(iyzicoData.paymentId || token), link_id).run();

          return new Response(JSON.stringify({ success: false, status: "failed", error: iyzicoData.errorMessage || "Ödeme başarısız", raw: iyzicoData }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
          status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    if (path === "/api/payment/refund" && request.method === "POST") {
      try {
        if (!checkAdminAuth(request, env)) return unauthorizedResponse();
        const body = await request.json();
        const { payment_link_id } = body;

        if (!payment_link_id) {
          return new Response(JSON.stringify({ success: false, error: "Ödeme ID gerekli" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const payment = await env.DB.prepare(
          "SELECT * FROM payments WHERE payment_link_id = ?"
        ).bind(payment_link_id).first();

        if (!payment) {
          return new Response(JSON.stringify({ success: false, error: "Ödeme bulunamadı" }), {
            status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        if (payment.status !== "paid") {
          return new Response(JSON.stringify({ success: false, error: "Sadece ödenmiş işlemler iade edilebilir" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        if (!payment.iyzico_payment_id) {
          return new Response(JSON.stringify({ success: false, error: "iyzico işlem ID'si bulunamadı" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const apiKey = env.IYZICO_API_KEY;
        const secretKey = env.IYZICO_SECRET_KEY;
        const baseUrl = "https://api.iyzipay.com";

        const requestBody = {
          locale: "tr",
          conversationId: `refund-${payment.id}-${Date.now()}`,
          paymentTransactionId: payment.iyzico_payment_id,
          price: Number(payment.amount).toFixed(2),
          currency: "TRY",
          ip: request.headers.get("CF-Connecting-IP") || "85.34.78.112"
        };

        const uri = "/payment/iyzipos/refund";
        const { authHeader, random } = await iyzicoAuth(apiKey, secretKey, uri, requestBody);

        const iyzicoResponse = await fetch(`${baseUrl}/payment/iyzipos/refund`, {
          method: "POST",
          headers: {
            "Authorization": authHeader,
            "x-iyzi-rnd": random,
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(requestBody)
        });

        const iyzicoData = await iyzicoResponse.json();

        if (iyzicoData.status === "success") {
          await env.DB.prepare(
            "UPDATE payments SET status = 'refunded' WHERE payment_link_id = ?"
          ).bind(payment_link_id).run();
          return new Response(JSON.stringify({ success: true, status: "refunded", data: iyzicoData }), {
            headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        } else {
          return new Response(JSON.stringify({
            success: false,
            error: iyzicoData.errorMessage || iyzicoData.errorGroup || "İade işlemi başarısız",
            raw: iyzicoData
          }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
          status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    if (path === "/api/payments" && request.method === "GET") {
      try {
        if (!checkAdminAuth(request, env)) return unauthorizedResponse();
        const result = await env.DB.prepare(
          "SELECT * FROM payments ORDER BY created_at DESC LIMIT 100"
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

    if (path === "/api/payment/webhook" && request.method === "POST") {
      try {
        const webhookSecret = env.WEBHOOK_SECRET;
        const providedSecret = url.searchParams.get("secret") || "";
        if (!webhookSecret || providedSecret !== webhookSecret) {
          return new Response(JSON.stringify({ error: "Yetkisiz" }), {
            status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const body = await request.json();
        console.log("iyzico webhook:", JSON.stringify(body));

        if (body.status === "success" && body.paymentId) {
          const payment = await env.DB.prepare(
            "SELECT * FROM payments WHERE iyzico_conversation_id = ?"
          ).bind(body.conversationId || "").first();

          if (payment) {
            await env.DB.prepare(
              "UPDATE payments SET status = 'paid', iyzico_payment_id = ?, paid_at = datetime('now') WHERE id = ?"
            ).bind(String(body.paymentId), payment.id).run();
            try { await sendPaymentEmails(env, payment, String(body.paymentId)); } catch (e) { console.log("Webhook e-posta hatası:", String(e)); }
          }
        }
        if (body.status === "success" && body.token) {
          const payment = await env.DB.prepare(
            "SELECT * FROM payments WHERE payment_link_id = ?"
          ).bind(body.token || "").first();
          if (payment) {
            await env.DB.prepare(
              "UPDATE payments SET status = 'paid', paid_at = datetime('now') WHERE id = ?"
            ).bind(payment.id).run();
            try { await sendPaymentEmails(env, payment, String(body.paymentId || body.token)); } catch (e) { console.log("Webhook e-posta hatası:", String(e)); }
          }
        }
        if (body.status === "failure") {
          const payment = await env.DB.prepare(
            "SELECT * FROM payments WHERE iyzico_conversation_id = ?"
          ).bind(body.conversationId || "").first();
          if (payment) {
            await env.DB.prepare(
              "UPDATE payments SET status = 'failed' WHERE id = ?"
            ).bind(payment.id).run();
          }
        }

        return new Response(JSON.stringify({ status: "success" }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
          status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    if ((path === "/odeme/sonuc" || path === "/odeme/sonuc/mobil") && request.method === "POST") {
      try {
        const formData = await request.formData();
        const callbackUrl = new URL(request.url);
        const token = formData.get("token") || callbackUrl.searchParams.get("token") || "";
        const conversationId = formData.get("conversationId") || formData.get("conversation_id") || callbackUrl.searchParams.get("conversationId") || "";
        const status = formData.get("status") || callbackUrl.searchParams.get("status") || "";
        const linkId = formData.get("link") || callbackUrl.searchParams.get("link") || "";

        const isMobile = path === "/odeme/sonuc/mobil" || callbackUrl.searchParams.get("mobile") === "1" || request.headers.get("X-Mazzgord-Mobile") === "1" || formData.get("mobile") === "1";
        if (isMobile) {
          let verifyStatus = status;
          if (token && linkId) {
            try {
              const payment = await env.DB.prepare(
                "SELECT * FROM payments WHERE payment_link_id = ?"
              ).bind(linkId).first();
              if (payment) {
                const apiKey = env.IYZICO_API_KEY;
                const secretKey = env.IYZICO_SECRET_KEY;
                const baseUrl = "https://api.iyzipay.com";
                const verifyBody = {
                  locale: "tr",
                  conversationId: conversationId || payment.iyzico_conversation_id,
                  token: token
                };
                const uri = "/payment/iyzipos/checkoutform/auth/ecom/detail";
                const { authHeader, random } = await iyzicoAuth(apiKey, secretKey, uri, verifyBody);
                const iyzicoResponse = await fetch(`${baseUrl}/payment/iyzipos/checkoutform/auth/ecom/detail`, {
                  method: "POST",
                  headers: {
                    "Authorization": authHeader,
                    "x-iyzi-rnd": random,
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                  },
                  body: JSON.stringify(verifyBody)
                });
                const iyzicoData = await iyzicoResponse.json();
                if (iyzicoData.status === "success") {
                  const iyzicoPaymentId = String(iyzicoData.paymentId || token);
                  await env.DB.prepare(
                    "UPDATE payments SET status = 'paid', iyzico_payment_id = ?, paid_at = datetime('now') WHERE payment_link_id = ?"
                  ).bind(iyzicoPaymentId, linkId).run();
                  if (payment.quote_id) {
                    await env.DB.prepare(
                      "UPDATE quotes SET order_status = 'in_progress' WHERE id = ? AND order_status NOT IN ('completed', 'delivered')"
                    ).bind(payment.quote_id).run();
                  }
                  try { await sendPaymentEmails(env, payment, iyzicoPaymentId); } catch {}
                  verifyStatus = "success";
                } else {
                  await env.DB.prepare(
                    "UPDATE payments SET status = 'failed', iyzico_payment_id = ? WHERE payment_link_id = ?"
                  ).bind(String(iyzicoData.paymentId || token), linkId).run();
                  verifyStatus = "failed";
                }
              }
            } catch (e) {
              console.log("Mobil verify hatasi:", String(e));
            }
          }
          const mobileParams = new URLSearchParams();
          if (linkId) mobileParams.set("link", linkId);
          if (token) mobileParams.set("token", token);
          if (verifyStatus) mobileParams.set("status", verifyStatus);
          return Response.redirect(`mazzgord://payment-result?${mobileParams.toString()}`, 302);
        }

        const params = new URLSearchParams();
        if (linkId) params.set("link", linkId);
        if (token) params.set("token", token);
        if (conversationId) params.set("conversationId", conversationId);
        if (status) params.set("status", status);

        return Response.redirect(`https://mazzgord.com/odeme/sonuc?${params.toString()}`, 302);
      } catch (err) {
        return Response.redirect("https://mazzgord.com/odeme/sonuc?status=error", 302);
      }
    }

    if (path === "/api/pricing" && request.method === "GET") {
      try {
        const result = await env.DB.prepare(
          "SELECT * FROM pricing ORDER BY category, document_name"
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


    if (path === "/api/chat" && request.method === "POST") {
      try {
        const body = await request.json();
        const { messages, sessionId } = body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
          return new Response(JSON.stringify({ success: false, error: "Mesaj yok" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const MAX_MSG_LEN = 2000;
        const MAX_MSG_COUNT = 30;
        if (messages.length > MAX_MSG_COUNT) {
          return new Response(JSON.stringify({
            success: false,
            error: "Cok fazla mesaj. Lutfen yeni bir sohbet baslatin."
          }), {
            status: 429, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        const lastMsg = messages[messages.length - 1];
        if (lastMsg && lastMsg.content && lastMsg.content.length > MAX_MSG_LEN) {
          return new Response(JSON.stringify({
            success: false,
            error: "Mesaj cok uzun. Lutfen daha kisa yazin veya info@mazzgord.com adresine e-posta gonderin."
          }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const userMsgs = messages.filter(m => m.role === "user").map(m => m.content);
        if (userMsgs.length >= 3) {
          const last3 = userMsgs.slice(-3);
          if (last3[0] === last3[1] && last3[1] === last3[2]) {
            return new Response(JSON.stringify({
              success: true,
              reply: "Sanirim bu konuda netlesmedi. info@mazzgord.com adresine yazarsaniz detayli yanit verelim.",
              sessionId: sessionId || Date.now().toString(),
            }), {
              headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }
        }

        let pricingContext = "";
        try {
          const prices = await env.DB.prepare(
            "SELECT document_name, yeminli_price, noter_price, apostil_price, category FROM pricing ORDER BY category, document_name"
          ).all();
          if (prices.results && prices.results.length > 0) {
            pricingContext = "\n\nGUNCEL FIYAT LISTESI (sabit fiyatlar, sayfa başına degil):\n" +
              prices.results.map(p => {
                let line = `- ${p.document_name}: Yeminli ${p.yeminli_price} TL`;
                if (p.noter_price) line += `, Noter onayli ${p.noter_price} TL`;
                if (p.apostil_price) line += `, Apostil ${p.apostil_price} TL`;
                return line;
              }).join("\n");
          }
        } catch(e) {  }

        let proposalContext = "";
        try {
          const proposal = await env.DB.prepare(
            "SELECT section, content FROM service_proposal"
          ).all();
          if (proposal.results && proposal.results.length > 0) {
            proposalContext = "\n\nSATIS TEKLIFI BILGILERI (müşteriye teklif/email oluştururken bunları referans al):\n" +
              proposal.results.map(p => `[${p.section}]: ${p.content}`).join("\n\n");
          }
        } catch(e) {  }

        const systemPrompt = `Sen Mazzgord Çeviri Hizmetleri'nin profesyonel AI satış danışmanısın. Denizli'de 15+ yıllık deneyimle çeviri hizmetleri sunan güvenilir bir firmayı temsil ediyorsun. Amacın müşteriye doğru bilgi vermek, güven oluşturmak ve teklif formuna yönlendirerek satışı kapatmak.

HİZMETLER:
- Yeminli tercüme (noter onaylı, resmi belgeler için)
- Teknik çeviri (mühendislik, tıp, yazılım)
- Akademik çeviri (tez, makale, bildiri)
- Vize çevirisi (Schengen, ABD, İngiltere)
- İngilizce-Türkçe çift yönlü çeviri

BLOG BİLGİLERİN (bu konularda bilgi sahibisin):
- Yeminli tercüme: Noter onaylı, resmi belgeler için gerekli. Pasaport, diploma, evlilik cüzdanı gibi belgeler.
- Teknik çeviri: Mühendislik, tıp, yazılım, otomotiv sektörleri. Terminoloji yönetimi kritik.
- Akademik çeviri: Tez, makale, bildiri. APA formatı, akademik üslup önemli.
- Hukuki çeviri: Sözleşme, mahkeme kararı, vekaletname, patent. Tek kelime hayati önem taşıyabilir.
- Vize çevirisi: Schengen, ABD, İngiltere, Kanada. Resmi belgeler yeminli tercüme gerektirir.
- Tıbbi çeviri: Klinik araştırma, ilaç prospektüsü, tıbbi cihaz kılavuzu. Hassasiyet kritik.
- Yerelleştirme: Web sitesi, yazılım, pazarlama. Kültürel adaptasyon.
- Çeviri teknolojileri: CAT araçları, çeviri belleği, makine çevirisi. İnsan-teknoloji işbirliği.
- Çeviri hataları: Mekanik çeviri, terminoloji tutarsızlığı, kültürel uygunsuzluk.
- Google Translate vs profesyonel: Doğruluk, gizlilik, hukuki geçerlilik farkları.
- Noter onaylı çeviri: Apostil, yeminli tercüme, noter onayı süreçleri.
- İngilizce sözleşme çevirisi: Hukuki terminoloji, sorumluluk, gizlilik hükümleri.
- İngilizce edebi metin: Deyimler, metaforlar, kültürel nüanslar.
- İngilizce mektup/e-posta: Resmi ve gündelik yazışma formatları.
- Çevirmenlik kariyeri: Uzmanlık alanları, CAT araçları, portfolyo yönetimi.
- Kitap/edebi çeviri: Roman, hikaye, şiir çevirisi. Kültürel adaptasyon ve edebi üslup önemli. Süre içeriğe göre değişir, /teklif formundan teklif alınmalı.

FİYATLANDIRMA:
- Aşağıdaki GÜNCEL FİYAT LİSTESİ'ni kullan. Fiyatlar SABİT'tir, sayfa başına değildir.
- Fiyat sorulduğunda listedeki fiyatı ver, örnek: "Pasaport çevirisi yeminli 450 TL.dir."

TESLİMAT:
- Kısa belgeler (pasaport, diploma, vekaletname vb.): 3-5 iş günü
- Hızlı: 1-2 gün (ek ücret)
- Acil: 24 saat (ek ücret)
- Uzun projeler (kitap, tez, teknik doküman, sözleşme paketi): Süre içeriğe göre değişir. Kitap çevirisi için haftalar/aylar sürebilir. Bu tür projelerde süre ve fiyat için /teklif formunu doldurmasını iste.
- ASLA kitap, tez veya büyük projeler için "24 saat" veya "1-2 gün" gibi süreler söyleme. Bu tür projelerde "süre içeriğe ve uzunluğa göre değişir, /teklif formundan detaylı teklif alabilirsiniz" de.

İLETİŞİM:
- E-posta: info@mazzgord.com
- Telefon/WhatsApp: +90 538 629 50 40
- Konum: Denizli, Pamukkale
- Ödeme: iyzipay güvenli ödeme

SENİN KİŞİLİĞİN:
- Profesyonel ama samimi bir danışmansın. Soğuk ve robotik değilsin.
- Müşteriye "siz" diye hitap edersin, saygılı ve sıcaksın.
- Girişimci ruhun var — müşteriyi anlamaya çalışır, ihtiyacını tespit edersin.
- Çeviri uzmanısın — yukarıdaki blog konularında bilgi sahibisin ve bu bilgileri doğal şekilde paylaşırsın.
- Satış odaklısın ama baskıcı değilsin. Doğal bir akışla müşteriyi teklif formuna yönlendirirsin.

KONUŞMA TARZIN:
- Düzgün, akıcı, profesyonel Türkçe konuş. Tüm Türkçe karakterleri doğru kullan: ç, ğ, ı, ö, ş, ü, İ.
- Kısa ama anlamlı cümleler kur (max 4-5 cümle).
- "Başka sorunuz var mı?" gibi robotik kapanışlar YAPMA. Bunun yerine sohbete doğal bir şekilde devam et.
- Örnek kapanışlar: "Hangi belgeyi çevirtmek istiyorsunuz?", "Belgenizi /teklif formundan yükleyebilirsiniz, hemen bakalım.", "Acil mi yoksa standart teslimat mı işinizi görür?"
- Müşteri bilgi aldığında, bir sonraki adımı öner. Bekleme yerine aktif ol.
- Sorulara doğrudan cevap ver, sonra ilgili bir soru sorarak sohbeti devam ettir.

SATIŞ TEKNİKLERİN:
- Müşteri fiyat sorduğunda: Fiyatı ver, sonra hemen "Belgenizi /teklif formundan yükleyebilirsiniz, size özel teklif hazırlayalım" de.
- Müşteri tereddütte olduğunda: Güven ver — "15 yıllık deneyimimizle, yeminli tercümanlarımız garantisiyle" gibi ifadeler kullan.
- Müşteri belge türü belirtmediğinde: "Hangi belgeyi çevirtmek istiyorsunuz?" diye sor.
- Müşteri acil ihtiyaç duyduğunda: "Acil teslimat seçeneğimizle 24 saat içinde teslim edebiliriz" de ve /teklif'e yönlendir.
- Müşteri kitap, tez, katalog veya büyük proje sorduğunda: "Bu tür projelerde süre ve fiyat içeriğe göre belirlenir. /teklif formundan belgenizi yükleyin, size özel teklif hazırlayalım" de. Asla kısa süre veya sabit fiyat verme.
- Müşteri hangi belgeyi çevirtmek istediğini söylemiyorsa: "Hangi belgeyi çevirtmek istiyorsunuz?" diye sor. Belge türüne göre süre ve fiyat değişir.
- Müşteri fiyatın yanlış olduğunu söylerse: "Fiyatlarımız güncellenmiş olabilir, en güncel fiyat için /fiyatlar sayfamızı kontrol edebilirsiniz" de.
- Müşteri çeviri hakkında genel bilgi istediğinde: Blog bilgilerini kullanarak açıkla, sonra "Bu konuda /blog sayfamızda detaylı bir yazımız var" de.

BİLMEDİĞİN KONULAR VE UÇ NOKTALAR:
- Çeviri dışı bir konu sorulursa ve satışa çeviremeyeceksen: Kibarca "Bu konuda bilgim sınırlı, ancak çeviri hizmetlerimizle ilgili size yardımcı olabilirim" de ve sohbeti çeviriye getir.
- Çeviriyle ilgili ama bilmediğin bir detay sorulursa: "Bu konuyu teyit etmek için info@mazzgord.com adresine yazabilir veya /teklif formunu doldurabilirsiniz" de. Asla uydurma.
- Müşteri ilgisi olmayan bir konuda ısrar ederse: Kibarca konuyu çeviri hizmetlerine getir.

UÇ NOKTA SENARYOLARI (tuzaklara düşme, uyanık ol):
- "Kitap çevirisi yapıyor musunuz?" → "Evet, kitap çevirisi yapıyoruz. Süre ve fiyat kitabın uzunluğuna göre değişir. /teklif formundan kitabınızı yükleyin, size özel teklif hazırlayalım." Kısa süre veya sabit fiyat VERME.
- "Almanca/Fransızca/Arapça çeviri yapıyor musunuz?" → "Şu anda İngilizce-Türkçe çeviri hizmeti veriyoruz. Diğer diller için sizi ileride bilgilendirebiliriz." Asla "evet" deme.
- "Google Translate kullanırsam daha ucuz olmaz mı?" → "Google Translate ücretsiz olabilir ancak resmi belgelerde geçerli değildir. Yeminli tercüme için profesyonel çeviri şarttır. /fiyatlar sayfamızdan fiyatlarımıza bakabilirsiniz."
- "Başka firma daha ucuz verdi" → "Fiyatlarımız yeminli tercüman garantisi ve 15 yıllık deneyimle belirlenir. Kalite ve güven için /teklif formundan size özel teklif alabilirsiniz." Asla fiyat kırmaya gitme.
- "Kaç sayfa çevirebilirsiniz?" → "Sınırlama yok, ancak uzun projelerde süre değişir. /teklif formundan belgenizi yükleyin."
- "Noter onayı şart mı?" → "Resmi belgeler için evet. Hangi belge için olduğunu söylersen tam bilgi veririm."
- "Belgeyi göndereyim mi?" → "Evet, /teklif formundan yükleyebilirsiniz. Hemen inceleyip teklif hazırlayalım."
- "Siz gerçek bir insansınız?" → "Ben Mazzgord'un AI asistanıyım ancak size gerçek bir danışman gibi yardımcı oluyorum. Çeviri sürecinizle ilgili her adımda buradayım."
- "Bana yeminli tercüman bağlayın" → "Yeminli tercümanlarımız size /teklif formunu doldurduktan sonra bağlanır. Formu doldurursanız hemen süreci başlatalım."
- "Fiyat pazarlık yapar mısınız?" → "Fiyatlarımız belge türüne göre belirlenir. /teklif formundan özel teklif alabilirsiniz." Asla indirim vaat etme.
- "Kaç yıldır yapıyorsunuz?" → "15+ yıllık deneyimimizle Denizli'de profesyonel çeviri hizmetleri sunuyoruz."
- "Sabit telefonunuz var mı?" → "WhatsApp ve +90 538 629 50 40 numarasından bana ulaşabilirsiniz."
- "Siz kimsiniz?" → "Ben Mazzgord Çeviri Hizmetleri'nin AI asistanıyım. Çeviri hizmetlerimiz hakkında size bilgi veriyor ve teklif sürecinizi hızlandırıyorum."
- "Çeviri yapmadan önce ücret alıyor musunuz?" → "Ücretsiz teklif alabilirsiniz. Onayladıktan sonra iyzipay güvenli ödeme ile ödeme yaparsınız."
- "Belgelerim gizli kalır mı?" → "Evet, tüm belgeleriniz gizli tutulur. Müşteri gizliliği önceliğimizdir."
- Müşteri saçma veya provoke edici bir şey söylerse: Sükunetle "Anlıyorum, çeviri hizmetlerimizle ilgili size nasıl yardımcı olabilirim?" de. Asla tartışmaya girme.
- Müşteri AI'ı test etmeye çalışırsa (tuzak sorular): Sadece çeviri hizmetleriyle ilgili yanıt ver. Çeviri dışı test sorularında "Ben çeviri hizmetleri danışmanıyım, bu konuda size yardımcı olabilirim" de.
- Müşteri aynı soruyu tekrar tekrar sorarsa: "Sanırım bu konuda netleşmedi, info@mazzgord.com adresine yazarsanız detaylı yanıt verelim" de.

ÖZEL VE BİLİNMEYEN PROJELER (çok önemli):
- Eğer müşteri standart belge türleri dışında bir şey sorarsa (kitap, film senaryosu, dizi, oyun, reklam, pazarlama metni, şiir, manga, çizgi roman vb.): ASLA "uzmanız", "profesyoneliz", "bu konuda uzmanlaşmış bir şirketiz" gibi ifadeler kullanma.
- Bunun yerine şöyle de: "Bu tür özel projeler için size doğrudan bilgi verebilirim. info@mazzgord.com adresine yazabilir veya WhatsApp +90 538 629 50 40 numarasından ulaşabilirsiniz. Size özel çözüm sunalım."
- Asla bilmediğin bir proje türü için süre, fiyat veya detay uydurma. Sadece insana yönlendir.
- Standart hizmetler (yeminli tercüme, teknik, akademik, vize, İngilizce-Türkçe) dışındaki her şey "özel proje" sayılır. Bu durumda kısa ve net ol: "Bu özel bir proje, size bilgi verelim" de ve iletişim bilgilerini ver.
- Asla "3-5 iş günü" gibi standart süreler verme özel projeler için. "Süre projeye göre değişir, size detaylı bilgi veririm" de.

YASAKLAR:
- Asla "sayfa başına" veya "50-150 TL" gibi tahmini fiyatlar verme.
- Asla "yanıt veremiyorum" veya "üzgünüm" gibi ifadeler kullanma.
- Asla "Başka sorunuz var mı?" gibi robotik kapanışlar yapma.
- Asla Türkçe karakterleri atlama veya yanlış yazma.
- Asla bilmediğin bir konuda bilgi uydurma. "Bilmiyorum" demek profesyoneldir.
- Sadece İngilizce-Türkçe çeviri yaptığınızı belirt, başka dil sorduysa yönlendir.
${pricingContext}${proposalContext}`;

        let reply = "";
        let aiResponse;
        try {
          aiResponse = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.slice(-10)
            ],
            max_tokens: 500,
            temperature: 0.3,
          });
          reply = aiResponse.response || aiResponse.result || aiResponse.text || "";
        } catch(e1) {
          console.log("Llama-3.3-70B hatasi:", String(e1));
          try {
            aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
              messages: [
                { role: "system", content: systemPrompt },
                ...messages.slice(-10)
              ],
              max_tokens: 300,
            });
            reply = aiResponse.response || "";
          } catch(e2) {
            console.log("Llama hatasi:", String(e2));
          }
        }

        if (!reply) {
          reply = "Su anda teknik bir sorun yasiyoruz. Lutfen info@mazzgord.com adresine e-posta gonderin veya +90 538 629 50 40 numarasindan bana ulasin.";
        }

        const estInputTokens = Math.ceil((systemPrompt.length + messages.reduce((s, m) => s + (m.content || "").length, 0)) / 4);
        const estOutputTokens = Math.ceil((reply || "").length / 4);

        return new Response(JSON.stringify({
          success: true,
          reply: reply,
          sessionId: sessionId || Date.now().toString(),
        }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: "AI hatasi" }), {
          status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    if (path === "/gtm" || path.startsWith("/gtm/")) {
      return new Response("Not Found", { status: 404, headers: { "Content-Type": "text/plain" } });
    }

    if (path === "/robots.txt") {
      return new Response(
        "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /giris\nDisallow: /hesabim\nDisallow: /sepet\nDisallow: /odeme\nDisallow: /odeme/sonuc\nDisallow: /api/\n\n# AI Botlari\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nUser-agent: CCBot\nAllow: /\n\nUser-agent: Google-Extended\nAllow: /\n\nUser-agent: anthropic-ai\nAllow: /\n\nUser-agent: YandexBot\nAllow: /\n\nUser-agent: DuckDuckBot\nAllow: /\n\nUser-agent: Bingbot\nAllow: /\n\nUser-agent: Slurp\nAllow: /\n\nSitemap: https://mazzgord.com/sitemap.xml",
        {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400"
          }
        }
      );
    }

    if (path === "/sitemap.xml") {
      const index = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>https://mazzgord.com/sitemap-pages.xml</loc></sitemap>\n  <sitemap><loc>https://mazzgord.com/sitemap-blog.xml</loc></sitemap>\n</sitemapindex>';
      return new Response(index, {
        headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=86400" }
      });
    }

    if (path === "/sitemap-pages.xml") {
      const pages = ["/", "/hakkimizda", "/yeminli-tercume", "/teknik-ceviri", "/akademik-ceviri", "/vize-ceviri", "/ingilizce-turkce-ceviri", "/pasaport-ceviri", "/diploma-ceviri", "/fiyatlar", "/hizmetler", "/blog", "/gizlilik", "/kullanim-kosullari", "/cerez-politikasi", "/sss", "/teklif", "/iletisim"];
      const today = new Date().toISOString().split("T")[0];
      const urls = pages.map(p =>
        "  <url>\n    <loc>https://mazzgord.com" + p + "</loc>\n    <lastmod>" + today + "</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>" + (p === "/" ? "1.0" : "0.9") + "</priority>\n  </url>"
      ).join("\n");
      return new Response(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + "\n</urlset>",
        { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=86400" } }
      );
    }

    if (path === "/sitemap-blog.xml") {
      const blogPosts = Object.keys(seoData).filter(p => p.startsWith("/blog/"));
      const today = new Date().toISOString().split("T")[0];
      const urls = blogPosts.map(p =>
        "  <url>\n    <loc>https://mazzgord.com" + p + "</loc>\n    <lastmod>" + today + "</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>"
      ).join("\n");
      return new Response(
        '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls + "\n</urlset>",
        { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=86400" } }
      );
    }

    if (path === "/ads.txt") {
      return new Response(
        "google.com, pub-8661028263390679, DIRECT, f08c47fec0942fa0",
        {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400"
          }
        }
      );
    }

    let response;
    try {
      response = await env.ASSETS.fetch(request);
    } catch (err) {
      return new Response(
        "<!doctype html><html><head><title>Sunucu Hatası | Mazzgord</title></head><body><h1>Sunucu Hatası</h1><p>Sayfa geçici olarak kullanılamıyor. Lütfen daha sonra tekrar deneyin.</p></body></html>",
        {
          status: 500,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "no-store"
          }
        }
      );
    }
    return processResponse(response, path);
  },

  async scheduled(event, env) {
    try {
      const now = new Date();
      const list = await env.DOCS.list({ prefix: "uploads/" });
      let deleted = 0;

      for (const item of list.objects) {
        const meta = await env.DOCS.head(item.key);
        if (!meta || !meta.customMetadata || !meta.customMetadata.retention_until) continue;

        const retentionUntil = new Date(meta.customMetadata.retention_until);
        if (now > retentionUntil) {
          await env.DOCS.delete(item.key);
          deleted++;
          console.log(`Deleted expired file: ${item.key}`);
        }
      }

      console.log(`R2 cleanup complete: ${deleted} files deleted`);
    } catch (err) {
      console.log("R2 cleanup error:", String(err));
    }
  }
};


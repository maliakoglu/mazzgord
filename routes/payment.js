import { corsHeaders, getCorsHeaders, checkAdminAuth, unauthorizedResponse } from "../lib/cors.js";
import { escapeHtml } from "../lib/escapeHtml.js";

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
        headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: "Mazzgord <info@mazzgord.com>", to: [payment.customer_email], subject: "Ödemeniz Alındı — Mazzgord Çeviri Hizmetleri", html: customerHtml }),
      });
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from: "Mazzgord <info@mazzgord.com>", to: ["info@mazzgord.com"], subject: `Yeni Ödeme: ${amount} ₺ — ${escapeHtml(payment.customer_name)}`, html: adminHtml }),
      });
    } catch (err) {
      console.log("E-posta gönderim hatası:", String(err));
    }
}

async function iyzicoAuth(apiKey, secretKey, uri, body) {
    const randArr = new Uint32Array(1);
    crypto.getRandomValues(randArr);
    const random = String(Date.now()) + randArr[0].toString(8);
    const encoder = new TextEncoder();
    const dataToSign = random + uri + JSON.stringify(body);
    const key = await crypto.subtle.importKey('raw', encoder.encode(secretKey), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sigBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(dataToSign));
    const sigBytes = new Uint8Array(sigBuffer);
    let hex = '';
    for (let i = 0; i < sigBytes.length; i++) { hex += sigBytes[i].toString(16).padStart(2, '0'); }
    const authParams = `apiKey:${apiKey}&randomKey:${random}&signature:${hex}`;
    const authHeader = `IYZWSv2 ` + btoa(authParams);
    return { authHeader, random };
}

async function deterministicIdentityNumber(email, phone) {
    const input = (email || "").toLowerCase() + "|" + (phone || "");
    const enc = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("SHA-256", enc.encode(input));
    const hashArray = new Uint8Array(hashBuffer);
    let num = 0;
    for (let i = 0; i < 5; i++) { num = num * 256 + hashArray[i]; }
    num = 10000000000 + (num % 90000000000);
    return num.toString();
}

export async function handlePaymentRoute(path, request, env) {
  const url = new URL(request.url);

  // POST /api/payment/create — admin creates payment link
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

  // GET /api/payment/:linkId — get payment info
  if (path.startsWith("/api/payment/") && !path.startsWith("/api/payment/create") && !path.startsWith("/api/payment/verify") && !path.startsWith("/api/payment/callback") && !path.startsWith("/api/payment/initialize") && !path.startsWith("/api/payment/refund") && !path.startsWith("/api/payment/webhook") && request.method === "GET") {
    try {
      const linkId = path.replace("/api/payment/", "");
      const result = await env.DB.prepare(
        "SELECT payment_link_id, amount, description, status, created_at, paid_at FROM payments WHERE payment_link_id = ?"
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

  // POST /api/payment/initialize — start iyzico checkout
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
          identityNumber: await deterministicIdentityNumber(payment.customer_email, payment.customer_phone),
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
        headers: { "Authorization": authHeader, "x-iyzi-rnd": random, "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const iyzicoData = await iyzicoResponse.json();

      await env.DB.prepare(
        "UPDATE payments SET iyzico_conversation_id = ? WHERE payment_link_id = ?"
      ).bind(conversationId, payment_link_id).run();

      if (iyzicoData.status === "success" && iyzicoData.paymentPageUrl) {
        return new Response(JSON.stringify({ success: true, payment_page_url: iyzicoData.paymentPageUrl }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } else {
        return new Response(JSON.stringify({ success: false, error: iyzicoData.errorMessage || iyzicoData.errorGroup || "iyzico hatası" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/payment/verify — verify iyzico payment
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
        headers: { "Authorization": authHeader, "x-iyzi-rnd": random, "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(requestBody)
      });

      const iyzicoData = await iyzicoResponse.json();

      if (iyzicoData.status === "success") {
        const expectedConvId = payment.iyzico_conversation_id;
        if (expectedConvId && iyzicoData.conversationId && iyzicoData.conversationId !== expectedConvId) {
          console.log("conversationId uyuşmazlığı:", { expected: expectedConvId, got: iyzicoData.conversationId });
          return new Response(JSON.stringify({ success: false, error: "Ödeme doğrulanamadı" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const iyzicoPaymentId = String(iyzicoData.paymentId || token);
        await env.DB.prepare(
          "UPDATE payments SET status = 'paid', iyzico_payment_id = ?, paid_at = datetime('now') WHERE payment_link_id = ?"
        ).bind(iyzicoPaymentId, link_id).run();

        if (payment.quote_id) {
          await env.DB.prepare(
            "UPDATE quotes SET order_status = 'in_progress' WHERE id = ? AND order_status NOT IN ('completed', 'delivered')"
          ).bind(payment.quote_id).run();
        }

        try { await sendPaymentEmails(env, payment, iyzicoPaymentId); } catch (err) { console.log("E-posta bildirim hatası:", String(err)); }

        return new Response(JSON.stringify({ success: true, status: "paid" }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } else {
        await env.DB.prepare(
          "UPDATE payments SET status = 'failed', iyzico_payment_id = ? WHERE payment_link_id = ?"
        ).bind(String(iyzicoData.paymentId || token), link_id).run();

        return new Response(JSON.stringify({ success: false, status: "failed", error: iyzicoData.errorMessage || "Ödeme başarısız" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/payment/refund — admin refunds payment
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
        headers: { "Authorization": authHeader, "x-iyzi-rnd": random, "Content-Type": "application/json", "Accept": "application/json" },
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
        return new Response(JSON.stringify({ success: false, error: iyzicoData.errorMessage || iyzicoData.errorGroup || "İade işlemi başarısız" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // GET /api/payments — list all payments (admin)
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

  // POST /api/payment/webhook — iyzico webhook
  if (path === "/api/payment/webhook" && request.method === "POST") {
    try {
      const webhookSecret = env.WEBHOOK_SECRET;
      const providedSecret = url.searchParams.get("secret") || "";
      if (!webhookSecret || providedSecret.length !== webhookSecret.length) {
        return new Response(JSON.stringify({ error: "Yetkisiz" }), {
          status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const enc = new TextEncoder();
      const a = enc.encode(providedSecret);
      const b = enc.encode(webhookSecret);
      let diff = 0;
      for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
      if (diff !== 0) {
        return new Response(JSON.stringify({ error: "Yetkisiz" }), {
          status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      const body = await request.json();
      console.log("iyzico webhook:", JSON.stringify(body));

      if (body.status === "success" && body.paymentId) {
        const payment = await env.DB.prepare(
          "SELECT id, customer_name, customer_email, customer_phone, description, amount, payment_link_id, quote_id FROM payments WHERE iyzico_conversation_id = ?"
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
          "SELECT id, customer_name, customer_email, customer_phone, description, amount, payment_link_id, quote_id FROM payments WHERE payment_link_id = ?"
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
          "SELECT id FROM payments WHERE iyzico_conversation_id = ?"
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

  // POST /odeme/sonuc or /odeme/sonuc/mobil — iyzico callback redirect
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
              "SELECT id, customer_name, customer_email, customer_phone, description, amount, payment_link_id, quote_id, iyzico_conversation_id FROM payments WHERE payment_link_id = ?"
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
                headers: { "Authorization": authHeader, "x-iyzi-rnd": random, "Content-Type": "application/json", "Accept": "application/json" },
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

  return null;
}

// POST /api/quote — Teklif talebini D1'e kaydet
// GET /api/quote/:orderNo — Public: teklif durumu sorgula (müşteri takibi)
import { corsHeaders } from "../lib/cors.js";
import { escapeHtml } from "../lib/escapeHtml.js";
import { quoteSchema, validateBody } from "../lib/validation.js";
import { generateCode, storeVerifyCode, checkVerifyCode, sendVerifyEmail, markEmailVerified, isEmailVerified } from "../lib/emailVerify.js";
import { getCustomerFromRequest } from "../lib/customerAuth.js";
import { sendStatusNotification } from "../lib/notifications.js";

export async function handleQuote(request, env, path = "", method = "POST") {
  // GET /api/quote/:id/review — Değerlendirme getir
  const getReviewMatch = path.match(/^\/api\/quote\/(\d+)\/review$/);
  if (getReviewMatch && method === "GET") {
    try {
      const quoteId = parseInt(getReviewMatch[1]);
      const review = await env.DB.prepare(
        "SELECT id, quote_id, rating, comment, created_at FROM reviews WHERE quote_id = ?"
      ).bind(quoteId).first();
      return new Response(JSON.stringify({ success: true, data: review || null }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/quote/:id/review — Müşteri değerlendirme gönder
  const reviewMatch = path.match(/^\/api\/quote\/(\d+)\/review$/);
  if (reviewMatch && method === "POST") {
    try {
      const customer = await getCustomerFromRequest(request, env);
      if (!customer) {
        return new Response(JSON.stringify({ success: false, error: "Giris yapmalisiniz" }), {
          status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const quoteId = parseInt(reviewMatch[1]);
      const quote = await env.DB.prepare(
        "SELECT * FROM quotes WHERE id = ? AND email = ?"
      ).bind(quoteId, customer.email).first();
      if (!quote) {
        return new Response(JSON.stringify({ success: false, error: "Teklif bulunamadi" }), {
          status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      if (quote.order_status !== "delivered" && quote.order_status !== "completed") {
        return new Response(JSON.stringify({ success: false, error: "Sadece tamamlanan siparisler degerlendirilebilir" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const existing = await env.DB.prepare(
        "SELECT id FROM reviews WHERE quote_id = ?"
      ).bind(quoteId).first();
      if (existing) {
        return new Response(JSON.stringify({ success: false, error: "Bu siparis zaten degerlendirilmis" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const body = await request.json();
      const rating = parseInt(body.rating);
      const comment = (body.comment || "").trim();
      if (!rating || rating < 1 || rating > 5) {
        return new Response(JSON.stringify({ success: false, error: "Puan 1-5 arasi olmali" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      await env.DB.prepare(
        "INSERT INTO reviews (quote_id, rating, comment) VALUES (?, ?, ?)"
      ).bind(quoteId, rating, comment || null).run();
      return new Response(JSON.stringify({ success: true, message: "Degerlendirmeniz alindi" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // GET /api/quote/:orderNo — Public: teklif durumu sorgula (müşteri takibi)
  if (method === "GET" && path.startsWith("/api/quote/")) {
    try {
      const orderNo = decodeURIComponent(path.replace("/api/quote/", ""));
      let quote;
      // UUID formatı mı? (order_token ile sorgula)
      const uuidMatch = orderNo.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
      if (uuidMatch) {
        quote = await env.DB.prepare(
          "SELECT id, name, email, source_language, target_language, document_type, page_count, word_count, urgency, delivery_method, shipping_address, shipping_tracking, order_status, offer_status, estimated_price, delivery_date, created_at FROM quotes WHERE order_token = ?"
        ).bind(orderNo).first();
      } else {
        // MZ-00001 formatı — sadece id ile sorgula (geriye uyumluluk)
        const idMatch = orderNo.match(/^MZ-(\d+)$/i);
        if (!idMatch) {
          return new Response(JSON.stringify({ success: false, error: "Geçersiz sipariş numarası" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        const quoteId = parseInt(idMatch[1]);
        quote = await env.DB.prepare(
          "SELECT id, name, email, source_language, target_language, document_type, page_count, word_count, urgency, delivery_method, shipping_address, shipping_tracking, order_status, offer_status, estimated_price, delivery_date, created_at FROM quotes WHERE id = ?"
        ).bind(quoteId).first();
      }

      if (!quote) {
        return new Response(JSON.stringify({ success: false, error: "Sipariş bulunamadı" }), {
          status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Hassas bilgileri çıkar — sadece durum bilgisi döndür
      return new Response(JSON.stringify({
        success: true,
        data: {
          order_no: `MZ-${String(quote.id).padStart(5, "0")}`,
          order_token: orderNo,
          source_language: quote.source_language,
          target_language: quote.target_language,
          document_type: quote.document_type,
          page_count: quote.page_count,
          word_count: quote.word_count,
          urgency: quote.urgency,
          delivery_method: quote.delivery_method,
          shipping_tracking: quote.shipping_tracking,
          order_status: quote.order_status,
          offer_status: quote.offer_status,
          estimated_price: quote.estimated_price,
          delivery_date: quote.delivery_date,
          created_at: quote.created_at,
        }
      }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/quote/send-code — E-posta dogrulama kodu gonder
  if (path == "/api/quote/send-code" && method === "POST") {
    try {
      const body = await request.json();
      const email = body.email;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return new Response(JSON.stringify({ success: false, error: "Gecersiz e-posta" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const code = generateCode();
      await storeVerifyCode(env, email, code);
      const sent = await sendVerifyEmail(env, email, code);
      if (!sent) {
        return new Response(JSON.stringify({ success: false, error: "E-posta gonderilemedi" }), {
          status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      return new Response(JSON.stringify({ success: true, message: "Dogrulama kodu gonderildi" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/quote/verify-code — Dogrulama kodunu kontrol et
  if (path == "/api/quote/verify-code" && method === "POST") {
    try {
      const body = await request.json();
      const { email, code } = body;
      if (!email || !code) {
        return new Response(JSON.stringify({ success: false, error: "E-posta ve kod zorunlu" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const valid = await checkVerifyCode(env, email, code);
      if (!valid) {
        return new Response(JSON.stringify({ success: false, error: "Gecersiz veya suresi dolmus kod" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      await markEmailVerified(env, email);
      return new Response(JSON.stringify({ success: true, verified: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/quote/:id/accept — Müşteri teklifi kabul et
  const acceptMatch = path.match(/^\/api\/quote\/(\d+)\/accept$/);
  if (acceptMatch && method === "POST") {
    try {
      const customer = await getCustomerFromRequest(request, env);
      if (!customer) {
        return new Response(JSON.stringify({ success: false, error: "Giris yapmalisiniz" }), {
          status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const quoteId = parseInt(acceptMatch[1]);
      const quote = await env.DB.prepare(
        "SELECT * FROM quotes WHERE id = ? AND email = ?"
      ).bind(quoteId, customer.email).first();
      if (!quote) {
        return new Response(JSON.stringify({ success: false, error: "Teklif bulunamadi" }), {
          status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      if (quote.offer_status !== "offered") {
        return new Response(JSON.stringify({ success: false, error: "Bu teklif su anda kabul edilemez" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      // Teklif kabul edildi — order_status = 'payment_pending', ödeme kaydı oluştur
      await env.DB.prepare(
        "UPDATE quotes SET offer_status = 'accepted', offer_accepted_at = datetime('now'), order_status = 'payment_pending' WHERE id = ?"
      ).bind(quoteId).run();

      // Ödeme kaydı zaten var mı kontrol et (admin manuel oluşturmuş olabilir)
      let payment = await env.DB.prepare(
        "SELECT payment_link_id FROM payments WHERE quote_id = ? ORDER BY created_at DESC LIMIT 1"
      ).bind(quoteId).first();

      let paymentLinkId = null;
      if (payment) {
        // Mevcut kaydı güncelle — pending'e çek
        paymentLinkId = payment.payment_link_id;
        await env.DB.prepare(
          "UPDATE payments SET status = 'pending' WHERE payment_link_id = ? AND status NOT IN ('paid', 'refunded')"
        ).bind(paymentLinkId).run();
      } else {
        // Yeni ödeme kaydı oluştur — amount = estimated_price
        const amount = quote.estimated_price;
        if (!amount || Number(amount) <= 0) {
          // Fiyat tanımlı değil — ödeme kaydı olmadan kabul et, admin fiyat belirlemeli
          // (nadiren olur, admin teklif gönderirken estimated_price set etmeli)
        } else {
          paymentLinkId = crypto.randomUUID().replace(/-/g, "").substring(0, 16);
          await env.DB.prepare(
            "INSERT INTO payments (quote_id, amount, description, customer_name, customer_email, customer_phone, payment_link_id, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')"
          ).bind(
            quoteId,
            amount,
            quote.source_language + " → " + quote.target_language + " çeviri",
            quote.name,
            quote.email,
            quote.phone || null,
            paymentLinkId
          ).run();
        }
      }

      // Bildirim gönder
      try {
        const updatedQuote = { ...quote, order_status: "payment_pending" };
        await sendStatusNotification(env, updatedQuote);
      } catch {}
      return new Response(JSON.stringify({
        success: true,
        message: "Teklif kabul edildi. Ödemenizi tamamlayabilirsiniz.",
        payment_link_id: paymentLinkId,
        order_status: "payment_pending"
      }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/quote/:id/reject — Müşteri teklifi reddet
  const rejectMatch = path.match(/^\/api\/quote\/(\d+)\/reject$/);
  if (rejectMatch && method === "POST") {
    try {
      const customer = await getCustomerFromRequest(request, env);
      if (!customer) {
        return new Response(JSON.stringify({ success: false, error: "Giris yapmalisiniz" }), {
          status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const quoteId = parseInt(rejectMatch[1]);
      const quote = await env.DB.prepare(
        "SELECT * FROM quotes WHERE id = ? AND email = ?"
      ).bind(quoteId, customer.email).first();
      if (!quote) {
        return new Response(JSON.stringify({ success: false, error: "Teklif bulunamadi" }), {
          status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      if (quote.offer_status !== "offered") {
        return new Response(JSON.stringify({ success: false, error: "Bu teklif su anda reddedilemez" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const body = await request.json().catch(() => ({}));
      const rejectReason = body.reason || null;
      await env.DB.prepare(
        "UPDATE quotes SET offer_status = 'rejected', offer_rejected_at = datetime('now'), offer_note = ?, order_status = 'rejected' WHERE id = ?"
      ).bind(rejectReason, quoteId).run();
      // İlgili pending ödeme kaydını iptal et (varsa)
      await env.DB.prepare(
        "UPDATE payments SET status = 'cancelled' WHERE quote_id = ? AND status = 'pending'"
      ).bind(quoteId).run();
      return new Response(JSON.stringify({ success: true, message: "Teklif reddedildi. İşlem sonlandırıldı." }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/quote/:id/upload-document — Müşteri belge yükle (ödeme sonrası)
  const uploadDocMatch = path.match(/^\/api\/quote\/(\d+)\/upload-document$/);
  if (uploadDocMatch && method === "POST") {
    try {
      const customer = await getCustomerFromRequest(request, env);
      if (!customer) {
        return new Response(JSON.stringify({ success: false, error: "Giris yapmalisiniz" }), {
          status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const quoteId = parseInt(uploadDocMatch[1]);
      const quote = await env.DB.prepare(
        "SELECT * FROM quotes WHERE id = ? AND email = ?"
      ).bind(quoteId, customer.email).first();
      if (!quote) {
        return new Response(JSON.stringify({ success: false, error: "Teklif bulunamadi" }), {
          status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      // Sadece ödeme yapılmışsa belge yüklenebilir
      const payment = await env.DB.prepare(
        "SELECT * FROM payments WHERE quote_id = ? AND status = 'paid'"
      ).bind(quoteId).first();
      if (!payment) {
        return new Response(JSON.stringify({ success: false, error: "Odeme yapilmadan belge yuklenemez" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      // Multipart form data
      const formData = await request.formData();
      const file = formData.get("file");
      if (!file) {
        return new Response(JSON.stringify({ success: false, error: "Dosya yok" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const MAX_FILE_SIZE = 10 * 1024 * 1024;
      if (file.size > MAX_FILE_SIZE) {
        return new Response(JSON.stringify({ success: false, error: "Dosya boyutu 10MB'den buyuk" }), {
          status: 413, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const allowedExtensions = [".pdf", ".doc", ".docx", ".txt", ".rtf", ".jpg", ".jpeg", ".png", ".webp"];
      const fileExt = "." + (file.name.split(".").pop() || "").toLowerCase();
      if (!allowedExtensions.includes(fileExt)) {
        return new Response(JSON.stringify({ success: false, error: "Desteklenmeyen dosya turu" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const dateStr = new Date().toISOString().split("T")[0];
      const timeStr = new Date().toTimeString().split(" ")[0].replace(/:/g, "");
      const safeName = (customer.name || "Mobil").replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
      const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const fileKey = `uploads/${safeName}_${dateStr}_${timeStr}_${safeFileName}`;
      await env.DOCS.put(fileKey, file.stream(), {
        httpMetadata: { contentType: file.type },
        customMetadata: {
          uploaded_at: new Date().toISOString(),
          quote_id: String(quoteId),
          customer_name: customer.name,
          original_filename: file.name,
          type: "customer_document",
        },
      });
      await env.DB.prepare(
        "UPDATE quotes SET file_key = ?, document_uploaded_at = datetime('now'), order_status = 'reviewing' WHERE id = ?"
      ).bind(fileKey, quoteId).run();
      // Bildirim gönder
      try {
        await sendStatusNotification(env, { ...quote, order_status: "reviewing" });
      } catch {}
      return new Response(JSON.stringify({ success: true, file_key: fileKey, message: "Belge yuklendi" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/quote — Teklif talebini D1'e kaydet
  try {
    const body = await request.json();
    const validation = validateBody(quoteSchema, body);
    if (!validation.success) return validation.response;

    const { name, email, phone, source_language, target_language, document_type, page_count, notes, file_key, service_type, urgency, delivery_method, word_count, yeminli, noter_onay, meeting_day, meeting_time } = validation.data;

    // Auth token varsa e-posta dogrulamayi atla (mobil giris yapmis kullanici)
    const authCustomer = await getCustomerFromRequest(request, env);
    if (!authCustomer) {
      const verified = await isEmailVerified(env, email);
      if (!verified) {
        return new Response(JSON.stringify({ success: false, error: "E-posta dogrulamasi gerekli" }), {
          status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    const delivery = delivery_method || 'digital';
    const address = (delivery === 'shipping' || delivery === 'hand_delivery') ? (validation.data.shipping_address || null) : null;

    // Idempotency kontrolü — aynı anahtarla 60sn içinde tekrar gönderim engelle
    const idempotencyKey = validation.data.idempotency_key;
    if (idempotencyKey) {
      const existing = await env.RATE_LIMIT.get(`idemp:${idempotencyKey}`);
      if (existing) {
        return new Response(JSON.stringify({ success: true, idempotent: true }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      await env.RATE_LIMIT.put(`idemp:${idempotencyKey}`, "1", { expirationTtl: 60 });
    }

    const orderToken = crypto.randomUUID();
    await env.DB.prepare(
      "INSERT INTO quotes (name, email, phone, source_language, target_language, document_type, page_count, notes, file_key, service_type, urgency, delivery_method, word_count, yeminli, noter_onay, order_status, shipping_address, notary_need, apostille_need, target_country, delivery_date, meeting_day, meeting_time, order_token, customer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    ).bind(
      name, email, phone || null, source_language, target_language,
      document_type || null, page_count || null, notes || null, file_key || null,
      service_type || null, urgency, delivery,
      word_count || null, yeminli ? 1 : 0, noter_onay ? 1 : 0, address,
      validation.data.notary_need || null, validation.data.apostille_need || null, validation.data.target_country || null,
      validation.data.delivery_date || null, meeting_day || null, meeting_time || null, orderToken, authCustomer ? authCustomer.customerId : null
    ).run();

    // Sipariş numarası oluştur
    const quoteRow = await env.DB.prepare(
      "SELECT last_insert_rowid() as id"
    ).first();
    const orderNo = `MZ-${String(quoteRow.id).padStart(5, '0')}`;

    // Müşteriye "teklif alındı" e-postası gönder
    try {
      const resendKey = env.RESEND_API_KEY;
      if (resendKey) {
        const customerHtml = `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <div style="background:#f8f9fa;padding:30px;border-radius:10px">
    <h1 style="color:#2563eb">📋 Teklif Talebiniz Alındı!</h1>
    <p>Sayın <strong>${escapeHtml(name)}</strong>,</p>
    <p>Çeviri hizmeti teklif talebiniz başarıyla alınmıştır.</p>
    <div style="background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">Sipariş No:</td><td style="padding:8px 0;font-weight:bold;text-align:right;font-family:monospace">${orderNo}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Kaynak Dil:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${escapeHtml(source_language)}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Hedef Dil:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${escapeHtml(target_language)}</td></tr>
        ${document_type ? `<tr><td style="padding:8px 0;color:#666">Belge Türü:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${escapeHtml(document_type)}</td></tr>` : ''}
        ${page_count ? `<tr><td style="padding:8px 0;color:#666">Sayfa Sayısı:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${page_count}</td></tr>` : ''}
      </table>
    </div>
    <p>En kısa sürede teklifinizi hazırlayıp size bildireceğiz.</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
    <p style="font-size:13px;color:#666">Mazzgord Çeviri Hizmetleri<br>Denizli, Türkiye<br>info@mazzgord.com | +90 538 629 50 40</p>
  </div>
</body></html>`;
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Mazzgord <info@mazzgord.com>",
            to: [email],
            subject: `Teklif Talebiniz Alındı — ${orderNo} | Mazzgord`,
            html: customerHtml,
          }),
        });
      }
    } catch (err) {
      console.error("Teklif e-posta hatası:", String(err));
    }

    return new Response(JSON.stringify({ success: true, order_no: orderNo, order_token: orderToken }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}

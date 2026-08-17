// POST /api/quote — Teklif talebini D1'e kaydet
// GET /api/quote/:orderNo — Public: teklif durumu sorgula (müşteri takibi)
import { corsHeaders } from "../lib/cors.js";
import { escapeHtml } from "../lib/escapeHtml.js";
import { quoteSchema, validateBody } from "../lib/validation.js";
import { generateCode, storeVerifyCode, checkVerifyCode, sendVerifyEmail } from "../lib/emailVerify.js";

export async function handleQuote(request, env, path = "", method = "POST") {
  // GET /api/quote/:orderNo — Public: teklif durumu sorgula (müşteri takibi)
  if (method === "GET" && path.startsWith("/api/quote/")) {
    try {
      const orderNo = decodeURIComponent(path.replace("/api/quote/", ""));
      // MZ-00001 formatından ID çıkar
      const idMatch = orderNo.match(/^MZ-(\d+)$/i);
      if (!idMatch) {
        return new Response(JSON.stringify({ success: false, error: "Geçersiz sipariş numarası" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const quoteId = parseInt(idMatch[1]);
      const quote = await env.DB.prepare(
        "SELECT id, name, email, source_language, target_language, document_type, page_count, word_count, urgency, delivery_method, shipping_address, shipping_tracking, order_status, estimated_price, delivery_date, created_at FROM quotes WHERE id = ?"
      ).bind(quoteId).first();

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
          source_language: quote.source_language,
          target_language: quote.target_language,
          document_type: quote.document_type,
          page_count: quote.page_count,
          word_count: quote.word_count,
          urgency: quote.urgency,
          delivery_method: quote.delivery_method,
          shipping_tracking: quote.shipping_tracking,
          order_status: quote.order_status,
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
      return new Response(JSON.stringify({ success: true, verified: true }), {
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

    const { name, email, phone, source_language, target_language, document_type, page_count, notes, file_key, service_type, urgency, delivery_method, word_count, yeminli, noter_onay } = validation.data;

    const delivery = delivery_method || 'digital';
    const address = delivery === 'shipping' ? (validation.data.shipping_address || null) : null;

    await env.DB.prepare(
      "INSERT INTO quotes (name, email, phone, source_language, target_language, document_type, page_count, notes, file_key, service_type, urgency, delivery_method, word_count, yeminli, noter_onay, order_status, shipping_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)"
    ).bind(
      name, email, phone || null, source_language, target_language,
      document_type || null, page_count || null, notes || null, file_key || null,
      service_type || null, urgency, delivery,
      word_count || null, yeminli ? 1 : 0, noter_onay ? 1 : 0, address
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
      console.log("Teklif e-posta hatası:", String(err));
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}

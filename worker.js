import { seoData } from "./lib/seoData.js";
import { handleRedirects } from "./lib/redirects.js";
import { corsHeaders, getCorsHeaders, checkAdminAuth, unauthorizedResponse, checkCsrf, csrfFailedResponse } from "./lib/cors.js";
import { checkRateLimit } from "./lib/rateLimit.js";
import { handleContact } from "./routes/contact.js";
import { handleQuote } from "./routes/quote.js";
import { handleUpload } from "./routes/upload.js";
import { handleAdminRoute } from "./routes/admin.js";
import { handleCalculatePrice } from "./routes/calculatePrice.js";
import { handleServicesRoute } from "./routes/services.js";
import { handlePricingRoute } from "./routes/services.js";
import { handleXmlFeed } from "./routes/xmlFeed.js";
import { handleOrdersRoute } from "./routes/orders.js";
import { handleAuthRoute } from "./routes/auth.js";
import { handleAccountRoute } from "./routes/account.js";
import { handleMessagesRoute } from "./routes/messages.js";
import { processResponse } from "./lib/seoProcessor.js";
import { escapeHtml } from "./lib/escapeHtml.js";
import { buildSystemPrompt } from "./lib/chatSystemPrompt.js";
import { handlePaymentRoute } from "./routes/payment.js";

export default {
  async fetch(request, env) {

    const url = new URL(request.url);
    const path = url.pathname;

    const redirectResponse = handleRedirects(url);
    if (redirectResponse) return redirectResponse;



    if (request.method === "OPTIONS") {
      return new Response(null, { headers: getCorsHeaders(request) });
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



    const paymentResponse = await handlePaymentRoute(path, request, env);
    if (paymentResponse) return paymentResponse;
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


    // GET /api/reviews/approved — Onaylı müşteri değerlendirmeleri (public)
    if (path === "/api/reviews/approved" && request.method === "GET") {
      try {
        const result = await env.DB.prepare(
          "SELECT r.id, r.rating, r.customer_name, r.comment, r.created_at FROM reviews r WHERE r.approved = 1 ORDER BY r.created_at DESC LIMIT 20"
        ).all();
        return new Response(JSON.stringify({ success: true, data: result.results }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      } catch (err) {
        return new Response(JSON.stringify({ success: true, data: [] }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // POST /api/chat/submit-quote — Chatbot icinden teklif olustur
    if (path === "/api/chat/submit-quote" && request.method === "POST") {
      try {
        // Rate limit — IP basina 10 dakikada max 3 teklif
        const clientIP = request.headers.get("CF-Connecting-IP") || "unknown";
        const rlKey = "chatquote:" + clientIP;
        const rlCount = await env.RATE_LIMIT.get(rlKey);
        if (rlCount && parseInt(rlCount) >= 3) {
          return new Response(JSON.stringify({ success: false, error: "Cok fazla teklif talebi. Lutfen 10 dakika sonra tekrar deneyin." }), {
            status: 429, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        await env.RATE_LIMIT.put(rlKey, String((parseInt(rlCount) || 0) + 1), { expirationTtl: 600 });

        const body = await request.json();
        const { name, email, phone, document_type, service_type, source_language, target_language, urgency, delivery_method, file_key, file_name, notes } = body;

        // Zorunlu alanlar
        if (!name || !email) {
          return new Response(JSON.stringify({ success: false, error: "Isim ve e-posta zorunlu" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        // Email validasyonu
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return new Response(JSON.stringify({ success: false, error: "Gecerli bir e-posta adresi girin" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        // Dosya yuklu olmali
        if (!file_key) {
          return new Response(JSON.stringify({ success: false, error: "Teklif icin dosya yuklemesi gerekli" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        // Name length limit
        if (name.length > 100) {
          return new Response(JSON.stringify({ success: false, error: "Isim cok uzun" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }

        const orderToken = crypto.randomUUID();
        const yeminli = service_type === "yeminli" || service_type === "noter" ? 1 : 0;
        const noter_onay = service_type === "noter" ? 1 : 0;
        const delivery = delivery_method || "digital";

        await env.DB.prepare(
          "INSERT INTO quotes (name, email, phone, source_language, target_language, document_type, notes, file_key, service_type, urgency, delivery_method, yeminli, noter_onay, order_status, order_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?)"
        ).bind(
          name, email, phone || null,
          source_language || "İngilizce", target_language || "Türkçe",
          document_type || null, notes || null, file_key || null,
          service_type || null, urgency || "standart", delivery,
          yeminli, noter_onay, orderToken
        ).run();

        const quoteRow = await env.DB.prepare("SELECT last_insert_rowid() as id").first();
        const orderNo = "MZ-" + String(quoteRow.id).padStart(5, "0");

        // Müşteriye e-posta gönder
        try {
          const resendKey = env.RESEND_API_KEY;
          if (resendKey) {
            const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333"><div style="background:#f8f9fa;padding:30px;border-radius:10px"><h1 style="color:#2563eb">📋 Teklif Talebiniz Alındı!</h1><p>Sayın <strong>${name}</strong>,</p><p>Çeviri hizmeti teklif talebiniz başarıyla alınmıştır.</p><div style="background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb"><table style="width:100%;border-collapse:collapse"><tr><td style="padding:8px 0;color:#666">Sipariş No:</td><td style="padding:8px 0;font-weight:bold;text-align:right;font-family:monospace">${orderNo}</td></tr><tr><td style="padding:8px 0;color:#666">Kaynak Dil:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${source_language || "İngilizce"}</td></tr><tr><td style="padding:8px 0;color:#666">Hedef Dil:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${target_language || "Türkçe"}</td></tr>${document_type ? `<tr><td style="padding:8px 0;color:#666">Belge Türü:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${document_type}</td></tr>` : ""}</table></div><p>En kısa sürede teklifinizi hazırlayıp size bildireceğiz.</p><hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0"><p style="font-size:13px;color:#666">Mazzgord Çeviri Hizmetleri<br>Denizli, Türkiye<br>info@mazzgord.com | +90 538 629 50 40</p></div></body></html>`;
            await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
              body: JSON.stringify({
                from: "Mazzgord <info@mazzgord.com>",
                to: [email],
                subject: `Teklif Talebiniz Alındı — ${orderNo} | Mazzgord`,
                html,
              }),
            });
          }
        } catch(e) { }

        return new Response(JSON.stringify({ success: true, orderNo }), {
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
            "SELECT document_name, yeminli_price, noter_price, apostil_price, noter_masraf, noter_takip, apostil_takip, category FROM pricing ORDER BY category, document_name"
          ).all();
          if (prices.results && prices.results.length > 0) {
            pricingContext = "\n\nGUNCEL FIYAT LISTESI (2026 Noterlik Ucret Tarifesi gore dokumlu):\n" +
              prices.results.map(p => {
                let line = `- ${p.document_name}: Yeminli ${p.yeminli_price} TL`;
                if (p.noter_price) line += `, Noter ile toplam ${p.noter_price} TL (noter masrafi ${p.noter_masraf || 0} TL + islem/takip ${p.noter_takip || 0} TL)`;
                if (p.apostil_price) line += `, Apostil ile toplam ${p.apostil_price} TL (apostil islem/takip ${p.apostil_takip || 0} TL)`;
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

        const systemPrompt = buildSystemPrompt(pricingContext, proposalContext);

        // Streaming response — AI yanitini token token gonder
        const streamHeaders = {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          "Connection": "keep-alive",
          ...corsHeaders,
        };


        let aiStream;
        try {
          aiStream = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.slice(-10)
            ],
            max_tokens: 500,
            temperature: 0.3,
            stream: true,
          });
        } catch(e1) {
          console.log("Llama-3.3-70B streaming hatasi:", String(e1));
          try {
            aiStream = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fast", {
              messages: [
                { role: "system", content: systemPrompt },
                ...messages.slice(-10)
              ],
              max_tokens: 300,
              stream: true,
            });
          } catch(e2) {
            console.log("Llama streaming hatasi:", String(e2));
            return new Response(JSON.stringify({ success: false, error: "AI hatasi" }), {
              status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
            });
          }
        }

        // AI stream'i zaten SSE formatinda — dogrudan passthrough
        return new Response(aiStream, { headers: streamHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ success: false, error: "AI hatasi" }), {
          status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
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

      // === Otomatik değerlendirme e-postası ===
      // Teslimden 3 gün sonra müşteriye değerlendirme e-postası gönder
      try {
        const reviewCandidates = await env.DB.prepare(
          `SELECT q.id, q.name, q.email, q.order_token, q.order_status, q.review_email_sent, q.delivery_date
           FROM quotes q
           WHERE q.order_status IN ('delivered', 'completed')
             AND q.review_email_sent = 0
             AND q.email IS NOT NULL
             AND q.delivery_date IS NOT NULL`
        ).all();

        let sent = 0;
        const now = new Date();
        const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

        for (const quote of (reviewCandidates.results || [])) {
          const deliveryDate = new Date(quote.delivery_date + "T00:00:00");
          if (deliveryDate < threeDaysAgo) continue;

          // Zaten değerlendirme var mı kontrol et
          const existing = await env.DB.prepare(
            "SELECT id FROM reviews WHERE quote_id = ?"
          ).bind(quote.id).first();
          if (existing) {
            // Değerlendirme yapılmış, email_sent = 1 işaretle
            await env.DB.prepare(
              "UPDATE quotes SET review_email_sent = 1 WHERE id = ?"
            ).bind(quote.id).run();
            continue;
          }

          const resendKey = env.RESEND_API_KEY;
          if (!resendKey) break;

          const reviewUrl = `https://mazzgord.com/degerlendir?token=${quote.order_token}`;
          const reviewHtml = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <div style="background:#f8f9fa;padding:30px;border-radius:10px">
    <h1 style="color:#2563eb;text-align:center">⭐ Çevirimizi Nasıl Buldunuz?</h1>
    <p>Sayın <strong>${escapeHtml(quote.name)}</strong>,</p>
    <p>Çeviri hizmetimizden memnun kaldığınızı umuyoruz. Deneyiminizi paylaşmak ister misiniz?</p>
    <p>Geri bildiriminiz bizim için çok değerli ve diğer müşterilerin doğru karar vermesine yardımcı oluyor.</p>
    <div style="text-align:center;margin:30px 0">
      <a href="${reviewUrl}" style="display:inline-block;padding:14px 32px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px">Değerlendirme Yap</a>
    </div>
    <p style="font-size:13px;color:#666;text-align:center">Değerlendirme yapmak sadece 1 dakikanızı alır.</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
    <p style="font-size:13px;color:#666">Mazzgord Çeviri Hizmetleri<br>Denizli, Türkiye</p>
  </div>
</body></html>`;

          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Mazzgord <info@mazzgord.com>",
              to: [quote.email],
              subject: "⭐ Çevirimizi Nasıl Buldunuz? — Mazzgord",
              html: reviewHtml,
            }),
          });

          await env.DB.prepare(
            "UPDATE quotes SET review_email_sent = 1 WHERE id = ?"
          ).bind(quote.id).run();
          sent++;
        }
        console.log(`Review emails sent: ${sent}`);
      } catch (reviewErr) {
        console.log("Review email error:", String(reviewErr));
      }

    } catch (err) {
      console.log("R2 cleanup error:", String(err));
    }
  }
};


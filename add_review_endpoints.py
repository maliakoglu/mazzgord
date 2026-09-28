with open("routes/quote.js", "r", encoding="utf-8") as f:
    content = f.read()

# Mevcut POST review endpoint'inden SONRA public review endpoint ekle
# Public review: order_token ile auth gerektirmeden değerlendirme gönder
anchor = '  // POST /api/quote — Teklif talebini D1\'e kaydet'

public_review = '''  // POST /api/quote/review/public — Public: order_token ile değerlendirme (giriş gerektirmez)
  if (path === "/api/quote/review/public" && method === "POST") {
    try {
      const body = await request.json();
      const { order_token, rating, comment } = body;
      if (!order_token || !rating) {
        return new Response(JSON.stringify({ success: false, error: "Eksik bilgi" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const ratingNum = parseInt(rating);
      if (ratingNum < 1 || ratingNum > 5) {
        return new Response(JSON.stringify({ success: false, error: "Puan 1-5 arasi olmali" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const quote = await env.DB.prepare(
        "SELECT id, order_status, name FROM quotes WHERE order_token = ?"
      ).bind(order_token).first();
      if (!quote) {
        return new Response(JSON.stringify({ success: false, error: "Siparis bulunamadi" }), {
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
      ).bind(quote.id).first();
      if (existing) {
        return new Response(JSON.stringify({ success: false, error: "Bu siparis zaten degerlendirilmis" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      await env.DB.prepare(
        "INSERT INTO reviews (quote_id, rating, comment) VALUES (?, ?, ?)"
      ).bind(quote.id, ratingNum, (comment || "").trim() || null).run();
      return new Response(JSON.stringify({ success: true, message: "Degerlendirmeniz alindi. Tesekkurler!" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // GET /api/reviews/approved — Public: onaylanmış yorumları getir
  if (path === "/api/reviews/approved" && method === "GET") {
    try {
      const result = await env.DB.prepare(
        `SELECT r.id, r.rating, r.comment, r.created_at,
         q.name as customer_name, q.source_language, q.target_language, q.document_type
         FROM reviews r
         LEFT JOIN quotes q ON q.id = r.quote_id
         WHERE r.approved = 1
         ORDER BY r.created_at DESC LIMIT 50`
      ).all();
      return new Response(JSON.stringify({ success: true, data: result.results || [] }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

'''

if anchor in content and "review/public" not in content:
    content = content.replace(anchor, public_review + anchor, 1)
    print("✓ Public review + approved list endpoint eklendi")
else:
    print("✗ Anchor bulunamadı veya zaten eklenmiş")

with open("routes/quote.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Backend parça 1 tamam.")

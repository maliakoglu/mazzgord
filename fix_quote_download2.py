with open("routes/quote.js", "r", encoding="utf-8") as f:
    content = f.read()

anchor = "  // GET /api/reviews/approved"

code = '''  // GET /api/quote/:orderNo/download — Müşteri: teslim edilen dosyayı indir (quote akışı)
  const quoteDownloadMatch = path.match(/^\\/api\\/quote\\/([^/]+)\\/download$/);
  if (quoteDownloadMatch && method === "GET") {
    try {
      const orderNo = decodeURIComponent(quoteDownloadMatch[1]);
      let quote;
      const uuidMatch = orderNo.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
      if (uuidMatch) {
        quote = await env.DB.prepare(
          "SELECT order_status, delivered_file_key FROM quotes WHERE order_token = ?"
        ).bind(orderNo).first();
      } else {
        const idMatch = orderNo.match(/^MZ-(\\d+)$/i);
        if (!idMatch) {
          return new Response(JSON.stringify({ success: false, error: "Geçersiz sipariş numarası" }), {
            status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
          });
        }
        quote = await env.DB.prepare(
          "SELECT order_status, delivered_file_key FROM quotes WHERE id = ?"
        ).bind(parseInt(idMatch[1])).first();
      }
      if (!quote) {
        return new Response(JSON.stringify({ success: false, error: "Sipariş bulunamadı" }), {
          status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      if (quote.order_status !== "delivered" && quote.order_status !== "completed") {
        return new Response(JSON.stringify({ success: false, error: "Dosya henüz teslim edilmedi" }), {
          status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      if (!quote.delivered_file_key) {
        return new Response(JSON.stringify({ success: false, error: "Teslim dosyası bulunamadı" }), {
          status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const file = await env.DOCS.get(quote.delivered_file_key);
      if (!file) {
        return new Response(JSON.stringify({ success: false, error: "Dosya bulunamadı" }), {
          status: 404, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const originalName = file.customMetadata?.original_filename || "cevrilmis_belge";
      const contentType = file.httpMetadata?.contentType || "application/octet-stream";
      return new Response(file.body, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${originalName}"`,
          ...corsHeaders,
        },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

'''

if anchor in content and "quoteDownloadMatch" not in content:
    content = content.replace(anchor, code + anchor, 1)
    print("4 OK")
else:
    print("4 SKIP")

with open("routes/quote.js", "w", encoding="utf-8") as f:
    f.write(content)
print("PARCA2 DONE")

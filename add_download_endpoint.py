with open("routes/orders.js", "r", encoding="utf-8") as f:
    content = f.read()

# /deliver endpoint'inden ÖNCE download endpoint'i ekle
anchor = '  // PUT /api/orders/:link_id/deliver — Admin: siparişi teslim et (dijital veya kargo)'
download_code = '''  // GET /api/orders/:link_id/download — Müşteri: teslim edilen dosyayı indir
  const downloadMatch = path.match(/^\\/api\\/orders\\/([a-f0-9]+)\\/download$/);
  if (downloadMatch && request.method === "GET") {
    try {
      const linkId = downloadMatch[1];
      const order = await env.DB.prepare(
        "SELECT status, delivered_file_key, customer_email FROM orders WHERE payment_link_id = ?"
      ).bind(linkId).first();

      if (!order) {
        return jsonResponse({ success: false, error: "Sipariş bulunamadı" }, 404);
      }
      if (order.status !== "delivered") {
        return jsonResponse({ success: false, error: "Dosya henüz teslim edilmedi" }, 403);
      }
      if (!order.delivered_file_key) {
        return jsonResponse({ success: false, error: "Teslim dosyası bulunamadı" }, 404);
      }

      const file = await env.DOCS.get(order.delivered_file_key);
      if (!file) {
        return jsonResponse({ success: false, error: "Dosya bulunamadı" }, 404);
      }

      // Orijinal dosya adını customMetadata'dan al
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
      return jsonResponse({ success: false, error: "Sunucu hatasi" }, 500);
    }
  }

'''

if anchor in content and "downloadMatch" not in content:
    content = content.replace(anchor, download_code + anchor, 1)
    print("✓ Download endpoint eklendi")
else:
    print("✗ Anchor bulunamadı veya zaten eklenmiş")

with open("routes/orders.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Tamam.")

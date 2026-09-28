with open("routes/admin.js", "r", encoding="utf-8") as f:
    content = f.read()

# Admin reviews GET endpoint'inden SONRA approve/reject ekle
anchor = '  // POST /api/admin/login — Admin login'

approve_code = '''  // PUT /api/admin/reviews/:id/approve — Değerlendirmeyi onayla
  const approveMatch = path.match(/^\\/api\\/admin\\/reviews\\/(\\d+)\\/approve$/);
  if (approveMatch && request.method === "PUT") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      await env.DB.prepare(
        "UPDATE reviews SET approved = 1 WHERE id = ?"
      ).bind(parseInt(approveMatch[1])).run();
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // PUT /api/admin/reviews/:id/reject — Değerlendirmeyi reddet
  const rejectMatch = path.match(/^\\/api\\/admin\\/reviews\\/(\\d+)\\/reject$/);
  if (rejectMatch && request.method === "PUT") {
    try {
      if (!checkAdminAuth(request, env)) return unauthorizedResponse();
      await env.DB.prepare(
        "UPDATE reviews SET approved = -1 WHERE id = ?"
      ).bind(parseInt(rejectMatch[1])).run();
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

'''

if anchor in content and "approveMatch" not in content:
    content = content.replace(anchor, approve_code + anchor, 1)
    print("✓ Admin approve/reject endpoint eklendi")
else:
    print("✗ Anchor bulunamadı veya zaten eklenmiş")

with open("routes/admin.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Backend parça 2 tamam.")

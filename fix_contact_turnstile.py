with open('routes/contact.js', 'r') as f:
    content = f.read()

old = """    if (!turnstile_token) {
      return new Response(JSON.stringify({ success: false, error: "Güvenlik doğrulaması gerekli" }), {
        status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    const turnstileResult = await verifyTurnstile(turnstile_token, env, request.headers.get("CF-Connecting-IP"));
    if (!turnstileResult.success) {
      return new Response(JSON.stringify({ success: false, error: turnstileResult.error }), {
        status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }"""

new = """    // Turnstile opsiyonel — token varsa doğrula, yoksa geç
    if (turnstile_token) {
      const turnstileResult = await verifyTurnstile(turnstile_token, env, request.headers.get("CF-Connecting-IP"));
      if (!turnstileResult.success) {
        return new Response(JSON.stringify({ success: false, error: turnstileResult.error }), {
          status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }"""

if old in content:
    content = content.replace(old, new)
    with open('routes/contact.js', 'w') as f:
        f.write(content)
    print("OK: contact.js Turnstile opsiyonel yapıldı")
else:
    print("HATA: blok bulunamadi")

with open('routes/quote.js', 'r') as f:
    content = f.read()

# 1) Import ekle
content = content.replace(
    'import { sendStatusNotification, sendTelegramNotification } from "../lib/notifications.js";',
    'import { sendStatusNotification, sendTelegramNotification } from "../lib/notifications.js";\nimport { verifyTurnstile } from "../lib/turnstile.js";'
)

# 2) Auth check sonrasina turnstile dogrulamasi ekle
old = """    const authCustomer = await getCustomerFromRequest(request, env);
    if (!authCustomer && email) {
      const verified = await isEmailVerified(env, email);
      if (!verified) {
        return new Response(JSON.stringify({ success: false, error: "E-posta dogrulamasi gerekli" }), {
          status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }"""

new = """    const authCustomer = await getCustomerFromRequest(request, env);
    if (!authCustomer && email) {
      const verified = await isEmailVerified(env, email);
      if (!verified) {
        return new Response(JSON.stringify({ success: false, error: "E-posta dogrulamasi gerekli" }), {
          status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // Turnstile bot korumasi (giris yapmis kullanici muaf)
    if (!authCustomer) {
      const turnstileToken = validation.data.turnstile_token;
      if (!turnstileToken) {
        return new Response(JSON.stringify({ success: false, error: "Guvenlik dogrulamasi gerekli" }), {
          status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
      const turnstileResult = await verifyTurnstile(turnstileToken, env, request.headers.get("CF-Connecting-IP"));
      if (!turnstileResult.success) {
        return new Response(JSON.stringify({ success: false, error: turnstileResult.error }), {
          status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }"""

if old not in content:
    print("HATA: auth block bulunamadi!")
else:
    content = content.replace(old, new)
    with open('routes/quote.js', 'w') as f:
        f.write(content)
    print("OK: routes/quote.js guncellendi")

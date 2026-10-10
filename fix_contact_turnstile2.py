with open('routes/contact.js', 'r') as f:
    lines = f.readlines()

# "// Turnstile dogrulama" satırını bul
start = None
for i, line in enumerate(lines):
    if '// Turnstile dogrulama' in line:
        start = i
        break

if start is None:
    print("HATA: '// Turnstile dogrulama' bulunamadi")
    exit(1)

# start'tan itibaren "await env.DB.prepare" satırına kadar olan bloğu bul
end = None
for i in range(start, len(lines)):
    if 'await env.DB.prepare' in lines[i]:
        end = i
        break

if end is None:
    print("HATA: 'await env.DB.prepare' bulunamadi")
    exit(1)

# Yeni blok
new_block = """    // Turnstile dogrulama (opsiyonel — token varsa dogrula)
    if (turnstile_token) {
      const turnstileResult = await verifyTurnstile(turnstile_token, env, request.headers.get("CF-Connecting-IP"));
      if (!turnstileResult.success) {
        return new Response(JSON.stringify({ success: false, error: turnstileResult.error }), {
          status: 403, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

"""

# start'tan end-1'e kadar olan satırları değiştir
new_lines = lines[:start] + [new_block] + lines[end:]
with open('routes/contact.js', 'w') as f:
    f.writelines(new_lines)

print("OK: contact.js Turnstile opsiyonel yapıldı")

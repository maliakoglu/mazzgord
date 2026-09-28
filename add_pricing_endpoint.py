with open("routes/services.js", "r", encoding="utf-8") as f:
    content = f.read()

# GET /api/pricing endpoint ekle — dosyanın başına
anchor = "export async function handleServicesRoute"

pricing_endpoint = '''// GET /api/pricing — Public: pricing tablosundan belge türleri ve fiyatlar
export async function handlePricingRoute(path, request, env) {
  if (path === "/api/pricing" && request.method === "GET") {
    try {
      const result = await env.DB.prepare(
        "SELECT document_name, yeminli_price, noter_price, apostil_price, category FROM pricing ORDER BY category, document_name"
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
  return null;
}

'''

if anchor in content and "handlePricingRoute" not in content:
    content = content.replace(anchor, pricing_endpoint + anchor, 1)
    print("OK - pricing endpoint eklendi")
else:
    print("SKIP - anchor bulunamadi veya zaten eklenmis")

with open("routes/services.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Backend tamam.")

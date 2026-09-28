with open("routes/calculatePrice.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1) validation.js'e delivery_method ekle
with open("lib/validation.js", "r", encoding="utf-8") as f:
    val = f.read()

old_schema = '  document_type: z.string().max(200).optional().or(z.literal("")),\n  page_count:'
new_schema = '  document_type: z.string().max(200).optional().or(z.literal("")),\n  delivery_method: z.string().max(50).optional().or(z.literal("")),\n  page_count:'

if old_schema in val and "delivery_method" not in val:
    val = val.replace(old_schema, new_schema, 1)
    print("1 OK - validation'a delivery_method eklendi")
else:
    print("1 SKIP")

with open("lib/validation.js", "w", encoding="utf-8") as f:
    f.write(val)

# 2) calculatePrice.js'e delivery_method destructuring ekle
old_destr = "const { product_id, sku, document_type, page_count, word_count, service_type, urgency, yeminli, noter_onay, quantity, options } = validation.data;"
new_destr = "const { product_id, sku, document_type, delivery_method, page_count, word_count, service_type, urgency, yeminli, noter_onay, quantity, options } = validation.data;"

if old_destr in content:
    content = content.replace(old_destr, new_destr, 1)
    print("2 OK - destructuring'e delivery_method eklendi")
else:
    print("2 SKIP")

# 3) Pricing bloğuna kargo ücreti ekle
old_pricing = '''        const finalPrice = Math.round(base * 100) / 100;
        return new Response(JSON.stringify({
          success: true,
          estimated_price: finalPrice,
          breakdown,
          source: "pricing"
        }), {'''

new_pricing = '''        // Kargo teslimatı ek ücret
        if (delivery_method === "shipping") {
          base += 300;
          breakdown.multipliers.shipping = { value: 300, amount: 300 };
        }

        const finalPrice = Math.round(base * 100) / 100;
        return new Response(JSON.stringify({
          success: true,
          estimated_price: finalPrice,
          breakdown,
          source: "pricing"
        }), {'''

if old_pricing in content and "shipping" not in content:
    content = content.replace(old_pricing, new_pricing, 1)
    print("3 OK - pricing bloğuna kargo ücreti eklendi")
else:
    print("3 SKIP")

# 4) Fallback bloğuna da kargo ücreti ekle
old_fallback = '''    const minPrice = 100;
    const finalPrice = Math.max(basePrice, minPrice);'''

new_fallback = '''    if (delivery_method === "shipping") basePrice += 300;

    const minPrice = 100;
    const finalPrice = Math.max(basePrice, minPrice);'''

if old_fallback in content and "delivery_method === \"shipping\"" not in content:
    content = content.replace(old_fallback, new_fallback, 1)
    print("4 OK - fallback bloğuna kargo ücreti eklendi")
else:
    print("4 SKIP")

with open("routes/calculatePrice.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Backend tamam.")

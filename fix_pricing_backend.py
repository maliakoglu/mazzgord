with open("routes/calculatePrice.js", "r", encoding="utf-8") as f:
    content = f.read()

# services tablosu kontrolünden ÖNCE pricing tablosu kontrolü ekle
anchor = "    // === FALLBACK: hardcoded mantık (geriye dönük uyumluluk) ==="

pricing_logic = """    // === PRICING TABLOSU: document_type + service_type ile ===
    if (document_type && env.DB) {
      let serviceColumn = "yeminli_price";
      if (service_type === "noter") serviceColumn = "noter_price";
      else if (service_type === "apostil") serviceColumn = "apostil_price";
      else if (service_type === "yeminli") serviceColumn = "yeminli_price";
      else serviceColumn = "yeminli_price"; // varsayılan

      // document_type pricing tablosunda var mı?
      const priceRow = await env.DB.prepare(
        `SELECT yeminli_price, noter_price, apostil_price FROM pricing WHERE document_name = ?`
      ).bind(document_type).first();

      if (priceRow) {
        let base = priceRow[serviceColumn] || priceRow.yeminli_price;
        const breakdown = { base, source: "pricing_table", document_type, service_type, multipliers: {} };

        // Aciliyet çarpanı
        if (urgency === 'hizli') {
          base = base * 1.3;
          breakdown.multipliers.urgency = { value: 1.3, amount: Math.round((base - base/1.3) * 100) / 100 };
        } else if (urgency === 'acil') {
          base = base * 1.5;
          breakdown.multipliers.urgency = { value: 1.5, amount: Math.round((base - base/1.5) * 100) / 100 };
        }

        const finalPrice = Math.round(base * 100) / 100;
        return new Response(JSON.stringify({
          success: true,
          estimated_price: finalPrice,
          breakdown,
          source: "pricing"
        }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

"""

if anchor in content and "pricing_table" not in content:
    content = content.replace(anchor, pricing_logic + anchor, 1)
    print("OK - pricing tablosu destegi eklendi")
else:
    print("SKIP - anchor bulunamadi veya zaten eklenmis")

with open("routes/calculatePrice.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Backend tamam.")

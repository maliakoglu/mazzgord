with open("routes/calculatePrice.js", "r", encoding="utf-8") as f:
    content = f.read()

# Pricing bloğundaki fiyat hesaplamayı kademeli yap
old_pricing_calc = '''      if (priceRow) {
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

        // Kargo teslimatı ek ücret
        if (delivery_method === "shipping") {
          base += 300;
          breakdown.multipliers.shipping = { value: 300, amount: 300 };
        }

        const finalPrice = Math.round(base * 100) / 100;'''

new_pricing_calc = '''      if (priceRow) {
        const firstPagePrice = priceRow[serviceColumn] || priceRow.yeminli_price;
        let base = firstPagePrice;
        const breakdown = { base: firstPagePrice, source: "pricing_table", document_type, service_type, multipliers: {} };

        // Sayfa sayısına göre kademeli fiyatlandırma
        const pages = page_count || 1;
        if (pages > 1) {
          const extraPages = pages - 1;
          let extraTotal = 0;
          if (extraPages <= 4) {
            extraTotal = extraPages * 250;
          } else {
            extraTotal = 4 * 250 + (extraPages - 4) * 200;
          }
          base += extraTotal;
          breakdown.multipliers.extra_pages = { pages: extraPages, amount: extraTotal };
        }

        // Kelime sayısı varsa sayfaya çevir (250 kelime = 1 sayfa)
        if (word_count && word_count > 0 && !page_count) {
          const estPages = Math.max(1, Math.ceil(word_count / 250));
          if (estPages > 1) {
            const extraPages = estPages - 1;
            let extraTotal = 0;
            if (extraPages <= 4) {
              extraTotal = extraPages * 250;
            } else {
              extraTotal = 4 * 250 + (extraPages - 4) * 200;
            }
            base = firstPagePrice + extraTotal;
            breakdown.multipliers.extra_pages = { pages: extraPages, estimated_from_words: word_count, amount: extraTotal };
          }
        }

        // Aciliyet çarpanı
        if (urgency === 'hizli') {
          const surcharge = base * 0.3;
          base += surcharge;
          breakdown.multipliers.urgency = { value: 1.3, amount: Math.round(surcharge * 100) / 100 };
        } else if (urgency === 'acil') {
          const surcharge = base * 0.5;
          base += surcharge;
          breakdown.multipliers.urgency = { value: 1.5, amount: Math.round(surcharge * 100) / 100 };
        }

        // Kargo teslimatı ek ücret
        if (delivery_method === "shipping") {
          base += 300;
          breakdown.multipliers.shipping = { value: 300, amount: 300 };
        }

        breakdown.total_base = Math.round(base * 100) / 100;
        const finalPrice = Math.round(base * 100) / 100;'''

if old_pricing_calc in content:
    content = content.replace(old_pricing_calc, new_pricing_calc, 1)
    print("OK - kademeli fiyatlandırma eklendi")
else:
    print("SKIP - anchor bulunamadı")

with open("routes/calculatePrice.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Backend tamam.")

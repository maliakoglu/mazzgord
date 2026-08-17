// POST /api/calculate-price — Otomatik fiyat hesaplama
// Öncelik: services tablosundan ürün fiyatı kullan
// Fallback: hardcoded mantık (geriye dönük uyumluluk)
import { corsHeaders } from "../lib/cors.js";
import { calculatePriceSchema, validateBody } from "../lib/validation.js";

function parseOptions(optionsJson) {
  if (!optionsJson) return [];
  try { return JSON.parse(optionsJson); } catch { return []; }
}

export async function handleCalculatePrice(request, env) {
  try {
    const body = await request.json();
    const validation = validateBody(calculatePriceSchema, body);
    if (!validation.success) return validation.response;

    const { product_id, sku, page_count, word_count, service_type, urgency, yeminli, noter_onay, quantity, options } = validation.data;

    // === YENİ: services tablosundan ürün tabanlı hesaplama ===
    if ((product_id || sku) && env.DB) {
      let product;
      if (product_id) {
        product = await env.DB.prepare("SELECT * FROM services WHERE id = ? AND active = 1").bind(product_id).first();
      } else {
        product = await env.DB.prepare("SELECT * FROM services WHERE sku = ? AND active = 1").bind(sku).first();
      }

      if (product) {
        const productOptions = parseOptions(product.options);
        const qty = quantity || page_count || word_count || 1;
        let base = product.base_price * qty;

        // Ürün options'larından hesapla
        const breakdown = { base: Math.round(base * 100) / 100, product: product.sku, multipliers: {} };

        // Eğer options parametresi verilmişse, onu kullan
        const selectedOptions = options || {};
        
        // Legacy parametreleri de destekle (yeminli, noter_onay, urgency)
        if (yeminli && !selectedOptions.sworn) selectedOptions.sworn = true;
        if (noter_onay && !selectedOptions.notary) selectedOptions.notary = true;
        if (urgency === 'acil' || urgency === 'hizli') selectedOptions.urgent = true;

        for (const opt of productOptions) {
          if (!selectedOptions[opt.key]) continue;
          if (opt.type === "surcharge_percent") {
            const surcharge = base * (opt.value / 100);
            base += surcharge;
            breakdown.multipliers[opt.key] = { type: "surcharge_percent", value: opt.value, amount: Math.round(surcharge * 100) / 100 };
          } else if (opt.type === "fixed_price") {
            const surcharge = opt.value * qty;
            base += surcharge;
            breakdown.multipliers[opt.key] = { type: "fixed_price", value: opt.value, amount: Math.round(surcharge * 100) / 100 };
          }
        }

        const finalPrice = Math.round(base * 100) / 100;
        return new Response(JSON.stringify({
          success: true,
          estimated_price: finalPrice,
          breakdown,
          source: "services"
        }), {
          headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }
    }

    // === FALLBACK: hardcoded mantık (geriye dönük uyumluluk) ===
    let basePrice = 0;
    if (word_count && word_count > 0) {
      basePrice = word_count * 0.60;
    } else if (page_count && page_count > 0) {
      basePrice = page_count * 125;
    } else {
      basePrice = 125;
    }

    if (yeminli) basePrice *= 1.5;
    if (noter_onay) basePrice *= 1.2;
    if (urgency === 'hizli') basePrice *= 1.3;
    if (urgency === 'acil') basePrice *= 1.5;

    const minPrice = 100;
    const finalPrice = Math.max(basePrice, minPrice);

    return new Response(JSON.stringify({
      success: true,
      estimated_price: Math.round(finalPrice * 100) / 100,
      breakdown: {
        base: Math.round((word_count ? word_count * 0.60 : (page_count || 1) * 125) * 100) / 100,
        yeminli_multiplier: yeminli ? 1.5 : 1,
        noter_multiplier: noter_onay ? 1.2 : 1,
        urgency_multiplier: urgency === 'acil' ? 1.5 : urgency === 'hizli' ? 1.3 : 1,
      },
      source: "fallback"
    }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
      status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}

// /api/iyzico/products.xml — iyzico / Google Merchant Center XML ürün feed
import { escapeHtml } from "../lib/escapeHtml.js";

function xmlEscape(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function categoryName(category) {
  switch (category) {
    case "egitim": return "Eğitim Belgesi Çevirisi";
    case "resmi": return "Resmi Belge Çevirisi";
    case "ticari": return "Ticari Belge Çevirisi";
    case "translation": return "Çeviri Hizmetleri";
    case "sworn": return "Yeminli Tercüme";
    case "official": return "Resmi Onaylar";
    case "extra": return "Ek Hizmetler";
    default: return "Çeviri Hizmetleri";
  }
}

export async function handleXmlFeed(request, env) {
  try {
    const result = await env.DB.prepare(
      "SELECT * FROM services WHERE active = 1 ORDER BY sort_order ASC, id ASC"
    ).all();

    const baseUrl = "https://mazzgord.com";

    let items = "";
    for (const s of result.results) {
      const productUrl = `${baseUrl}/hizmetler`;
      const cat = categoryName(s.category);
      const price = Number(s.base_price || 0).toFixed(2);
      const taxRate = Number(s.tax_rate || 0).toFixed(2);

      items += `
    <item>
      <g:id>${s.id}</g:id>
      <g:sku>${xmlEscape(s.sku)}</g:sku>
      <title>${xmlEscape(s.name)}</title>
      <description>${xmlEscape(s.description || s.name)}</description>
      <g:product_type>${xmlEscape(cat)}</g:product_type>
      <link>${productUrl}</link>
      <g:image_link>${s.image ? xmlEscape(s.image) : `${baseUrl}/og-image.png`}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${price} ${s.currency || "TRY"}</g:price>
      <g:brand>Mazzgord</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>no</g:identifier_exists>
      <g:tax>
        <g:rate>${taxRate}</g:rate>
        <g:country>TR</g:country>
      </g:tax>
      <g:shipping>
        <g:country>TR</g:country>
        <g:service>Dijital Teslimat</g:service>
        <g:price>0.00 TRY</g:price>
      </g:shipping>
    </item>`;
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Mazzgord Çeviri Hizmetleri</title>
    <link>${baseUrl}</link>
    <description>Profesyonel çeviri ve yeminli tercüme hizmetleri</description>
    <last_build_date>${new Date().toUTCString()}</last_build_date>${items}
  </channel>
</rss>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=300",
      },
    });
  } catch (err) {
    return new Response(
      '<?xml version="1.0" encoding="UTF-8"?>\n<error>XML feed oluşturulamadi</error>',
      {
        status: 500,
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      }
    );
  }
}

// UTM parametre altyapısı — kanal karşılaştırması için

export interface UTMParams {
  source: string;
  medium: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export function buildUTMUrl(baseURL: string, params: UTMParams): string {
  const url = new URL(baseURL);
  url.searchParams.set("utm_source", params.source);
  url.searchParams.set("utm_medium", params.medium);
  if (params.campaign) url.searchParams.set("utm_campaign", params.campaign);
  if (params.content) url.searchParams.set("utm_content", params.content);
  if (params.term) url.searchParams.set("utm_term", params.term);
  return url.toString();
}

// Hazır UTM linkleri — dış kanallar için
export const utmLinks = {
  // Sosyal medya biyografi linkleri
  instagram: buildUTMUrl("https://mazzgord.com/teklif", {
    source: "instagram",
    medium: "social",
    campaign: "bio_link",
  }),
  facebook: buildUTMUrl("https://mazzgord.com/teklif", {
    source: "facebook",
    medium: "social",
    campaign: "bio_link",
  }),
  linkedin: buildUTMUrl("https://mazzgord.com/teklif", {
    source: "linkedin",
    medium: "social",
    campaign: "bio_link",
  }),

  // Google İşletme Profili
  google_business: buildUTMUrl("https://mazzgord.com", {
    source: "google_business",
    medium: "local",
    campaign: "gmb_listing",
  }),

  // E-posta imzası
  email_signature: buildUTMUrl("https://mazzgord.com", {
    source: "email",
    medium: "email",
    campaign: "signature",
  }),

  // WhatsApp profil açıklaması
  whatsapp_profile: buildUTMUrl("https://mazzgord.com/teklif", {
    source: "whatsapp",
    medium: "messaging",
    campaign: "profile_link",
  }),

  // Blog içi CTA'lar
  blog_cta: buildUTMUrl("https://mazzgord.com/teklif", {
    source: "blog",
    medium: "internal",
    campaign: "blog_cta",
  }),
};

// Sayfa bazlı UTM source — analytics event'leri için
export function getPageSource(pathname: string): string {
  if (pathname.startsWith("/blog/")) return "blog";
  if (pathname.startsWith("/denizli-")) return "denizli_page";
  if (pathname === "/") return "homepage";
  if (pathname === "/teklif") return "teklif_page";
  if (pathname === "/fiyatlar") return "pricing_page";
  return "service_page";
}

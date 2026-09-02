// Analytics event tracking — talimatta tanımlı 10 dönüşüm olayı
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

import { getPageSource } from "@/lib/utm";

type EventName =
  | "offer_form_started"
  | "offer_form_completed"
  | "document_upload_started"
  | "document_upload_completed"
  | "whatsapp_click"
  | "phone_click"
  | "email_click"
  | "service_page_cta_click"
  | "pricing_view"
  | "faq_opened";

export function trackEvent(name: EventName, params?: Record<string, unknown>): void {
  // Kişisel belge içeriğini analitiğe aktarma — yalnızca anonim olay bilgisi
  const safeParams = {
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
    page_source: typeof window !== "undefined" ? getPageSource(window.location.pathname) : "",
    ...params,
  };

  if (typeof window !== "undefined") {
    if (window.gtag) {
      window.gtag("event", name, safeParams);
    }
    if (window.dataLayer) {
      window.dataLayer.push({ event: name, ...safeParams });
    }
  }

  // Console'a da logla (debug için)
  if (typeof console !== "undefined" && console.debug) {
    console.debug("[analytics]", name, safeParams);
  }
}

// Kısayol fonksiyonlar
export const track = {
  offerFormStarted: () => trackEvent("offer_form_started"),
  offerFormCompleted: () => trackEvent("offer_form_completed"),
  documentUploadStarted: () => trackEvent("document_upload_started"),
  documentUploadCompleted: () => trackEvent("document_upload_completed"),
  whatsappClick: (source?: string) => trackEvent("whatsapp_click", { source }),
  phoneClick: () => trackEvent("phone_click"),
  emailClick: () => trackEvent("email_click"),
  servicePageCtaClick: (service?: string) => trackEvent("service_page_cta_click", { service }),
  pricingView: () => trackEvent("pricing_view"),
  faqOpened: (question?: string) => trackEvent("faq_opened", { question }),
};

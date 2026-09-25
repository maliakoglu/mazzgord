// Analytics event tracking — talimatta tanımlı dönüşüm olayları
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
  | "service_page_view"
  | "pricing_view"
  | "faq_opened"
  | "scroll_depth"
  | "page_time"
  | "form_abandoned"
  | "payment_start"
  | "payment_success"
  | "review_section_view";

// CTA konum tipleri — manus dokümanına göre
export type CtaLocation =
  | "hero"
  | "header"
  | "service_card"
  | "pricing_section"
  | "blog_inline"
  | "sticky_mobile"
  | "footer"
  | "footer_fab"
  | "contact_page"
  | "denizli_local"
  | "contact";

// Hizmet tipleri
export type ServiceType =
  | "yeminli_tercume"
  | "pasaport_cevirisi"
  | "diploma_cevirisi"
  | "noter_onayli_ceviri"
  | "apostil"
  | "vize_cevirisi"
  | "teknik_ceviri"
  | "akademik_ceviri"
  | "adli_sicil_cevirisi"
  | "nufus_kayit_ornegi"
  | "transkript_cevirisi"
  | "ingilizce_turkce"
  | "acil_tercume"
  | "general";

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
  whatsappClick: (cta_location: CtaLocation, service_type: ServiceType = "general") =>
    trackEvent("whatsapp_click", { cta_location, service_type }),
  phoneClick: (cta_location: CtaLocation = "contact_page") =>
    trackEvent("phone_click", { cta_location }),
  emailClick: (cta_location: CtaLocation = "contact_page") =>
    trackEvent("email_click", { cta_location }),
  servicePageCtaClick: (service?: string) => trackEvent("service_page_cta_click", { service }),
  servicePageView: (service_type: ServiceType) =>
    trackEvent("service_page_view", { service_type }),
  pricingView: () => trackEvent("pricing_view"),
  faqOpened: (question?: string) => trackEvent("faq_opened", { question }),
  scrollDepth: (depth: number) => trackEvent("scroll_depth", { depth }),
  pageTime: (seconds: number) => trackEvent("page_time", { seconds }),
  formAbandoned: (step?: string) => trackEvent("form_abandoned", { step }),
  paymentStart: (service_type: ServiceType = "general") =>
    trackEvent("payment_start", { service_type }),
  paymentSuccess: (service_type: ServiceType = "general") =>
    trackEvent("payment_success", { service_type }),
  reviewSectionView: () => trackEvent("review_section_view"),
};

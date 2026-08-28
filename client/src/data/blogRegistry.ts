import { lazy } from "react";

// Blog slug → lazy component mapping
// Yeni blog eklemek için: dosyayı oluştur, buraya bir satır ekle
export const blogRegistry = {
  "yeminli-tercume": lazy(() => import("@/pages/BlogYeminliTercume")),
  "vize-ceviri": lazy(() => import("@/pages/BlogVizeCeviri")),
  "teknik-ceviri": lazy(() => import("@/pages/BlogTeknikCeviri")),
  "akademik-ceviri": lazy(() => import("@/pages/BlogAkademikCeviri")),
  "ceviri-ipuclari": lazy(() => import("@/pages/BlogCeviriIpuclari")),
  "ceviri-sektoru": lazy(() => import("@/pages/BlogCeviriSektoru")),
  "tibbi-ceviri": lazy(() => import("@/pages/BlogTibbiCeviri")),
  "yerellestirme-hizmetleri": lazy(() => import("@/pages/BlogYerellestirme")),
  "ceviri-teknolojileri": lazy(() => import("@/pages/BlogCeviriTeknolojileri")),
  "ceviri-hatalari": lazy(() => import("@/pages/BlogCeviriHatalari")),
  "teknik-ceviri-nedir": lazy(() => import("@/pages/BlogTeknikCeviriNedir")),
  "hukuki-ceviri": lazy(() => import("@/pages/BlogHukukiCeviri")),
  "teknik-hukuk-vize-ceviri-rehberi": lazy(() => import("@/pages/BlogUcDunyaCeviri")),
  "cevirmenlik-kariyer-rehberi": lazy(() => import("@/pages/BlogCevirmenlikKariyer")),
  "ingilizce-turkce-deyim-cevirisi": lazy(() => import("@/pages/BlogDeyimCevirisi")),
  "google-translate-vs-profesyonel-ceviri": lazy(() => import("@/pages/BlogGoogleTranslateVsProfesyonel")),
  "ingilizce-sozlesme-cevirisi": lazy(() => import("@/pages/BlogSozlesmeCevirisi")),
  "ingilizce-mektup-email-cevirisi": lazy(() => import("@/pages/BlogMektupEmailCevirisi")),
  "ingilizce-edebi-metin-cevirisi": lazy(() => import("@/pages/BlogEdebiMetinCevirisi")),
  "noter-onayli-ceviri": lazy(() => import("@/pages/BlogNoterOnayliCeviri")),
  "pasaport-tercumesi-nasil-yapilir": lazy(() => import("@/pages/BlogPasaportTercumesi")),
  "yeminli-tercume-fiyatlari-2026": lazy(() => import("@/pages/BlogYeminliTercumeFiyatlari2026")),
  "vize-formatlari": lazy(() => import("@/pages/BlogVizeFormatlari")),
  "arac-ruhsati-cevirisi": lazy(() => import("@/pages/BlogAracRuhsatiCevirisi")),
  "ingiltere-vize-cevirisi-gercek-vaka": lazy(() => import("@/pages/BlogIngiltereVizeCeviri")),
  "dogalgaz-faturasi-cevirisi": lazy(() => import("@/pages/BlogDogalgazFaturasiCevirisi")),
} as const;

export const blogSlugs = Object.keys(blogRegistry);

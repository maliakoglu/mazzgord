# Changelog

## [2026-08-29] — Performans Optimizasyonu (Mobil PageSpeed 70→88)

### Kaldırılan
- Hero gradient blob animasyonları (5 adet `blur(60-90px)` efekti)
- `MagneticButton.tsx` componenti (kullanılmayan wrapper)
- `ScrollProgress.tsx` componenti (scroll dinleyici)
- `useReveal` hook'u (14 IntersectionObserver) — 5 home component'i `e0e0aed` sürümüne döndürüldü
- `page-transition` CSS animasyonu ve App.tsx wrapper div
- `backdropFilter: blur(8px)` — PricingPreview ve Testimonials kartlarından

### Eklenen
- WAF custom rule: `/gtm/` Zaraz endpoint bloklandı (365KB JS kalktı)
- Self-hosted font dosyaları (deneme amaçlı, sonra Google Fonts'a geri dönüldü)

### Değiştirilen
- Hero.tsx: 162 satır → 66 satır (sade CSS fade-up animasyonu)
- Font CSP: Google Fonts referansları korundu (preconnect + display=swap)
- 5 home component'i (Services, Process, WhyChooseUs, PricingPreview, Testimonials) `e0e0aed` sürümüne döndürüldü

### Sonuç
- Mobil: 70 → 88 (+18 puan)
- Masaüstü: 90 → 93 (+3 puan)
- TBT: 290ms → 130ms
- CLS: 0 (değişmedi)
- LCP: 5.7s → 3.0s

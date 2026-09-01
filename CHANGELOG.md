# MAZZGORD Change Log
### 2026-09-01 — Yeni Blog Yazıları ve Duplicate Title Düzeltmesi

**Değişiklik**

* `client/src/pages/BlogApostilVsNoterOnayli.tsx` — yeni blog yazısı: "Apostil Onaylı Çeviri ile Noter Onaylı Çeviri Arasındaki Fark" (185 satır, JSON-LD Article + FAQPage schema, karşılaştırma tablosu)
* `client/src/pages/BlogVizeBasvurusuBelgeler.tsx` — yeni blog yazısı: "Vize Başvurusu İçin Hangi Belgeler Çevrilmelidir? 2026 Rehber" (262 satır, ülke bazlı vize çeviri rehberi, JSON-LD Article + FAQPage schema)
* `client/src/data/blogRegistry.ts` — 2 yeni lazy import eklendi (28 → 30)
* `client/src/pages/Blog.tsx` — posts array'ine 2 yeni kayıt eklendi (28 → 30)
* `client/src/components/BlogLayout.tsx` — "apostil" illustration key + SVG eklendi
* `lib/seoData.js` — 2 yeni blog SEO entry eklendi (26 → 28 blog slug)
* `prerender.py` — 2 yeni route eklendi (48 → 50)
* `add-meta-tags.py` — seoData.js'den title/description okuyup prerender edilmiş HTML'lere yazma mantığı eklendi; 18 hizmet sayfasının title ve meta description'ı düzeltildi

**Düzeltilen Hata**

* 6 sayfa 3 ayrı başlığı paylaşıyordu (duplicate title SEO sorunu): `/yeminli-tercume`, `/teknik-ceviri`, `/akademik-ceviri` hizmet sayfaları ile blog sayfaları aynı `<title>` etiketine sahipti. Hizmet sayfaları React component'lerinde `<title>` set etmiyordu; prerender sonrası `client/index.html`'deki varsayılan title ile kalıyordu. `add-meta-tags.py` güncellenerek `seoData.js`'deki benzersiz title'lar HTML dosyalarına yazıldı.

**Cloudflare**

* `mazzgordwebsite` (production) — deploy edildi
* 83 new/modified asset yüklendi
* 50 route prerender edildi

**Test**

* Vite build: 1689 modül, 1.68s
* Prerender: 50/50 sayfa render edildi
* Meta tags: 18 title + 18 description düzeltildi
* Duplicate title: 0 (tüm sayfalarda benzersiz title)


### 2026-08-30 — Deployment, Performance ve Cloudflare Yapılandırması

**Değişiklik**

* `prerender.py` timeout düzeltmesi: 30s → 60s, `TimeoutExpired` yakalama eklendi
* `@builder.io/vite-plugin-jsx-loc` paketi ve `vite.config.ts` referansları kaldırıldı
* Google Fonts CDN linkleri kaldırıldı, self-hosted `/fonts/fonts.css`'e geçildi
* Clarity script `index.html`'den kaldırıldı, `lib/seoProcessor.js`'e `requestIdleCallback` ile lazy-load eklendi
* `prerender.py` Clarity script temizleme regex'i eklendi
* CSP'den Google Fonts domain izinleri kaldırıldı (`fonts.googleapis.com`, `fonts.gstatic.com`)
* `wrangler.toml`'a `[observability.traces]` eklendi (enabled, %5 sampling)
* Orphaned Worker route `api.mazzgord.com/iyzico/*` silindi
* Preview Worker'a 5 secret eklendi (ADMIN_TOKEN, IYZICO_API_KEY, IYZICO_SECRET_KEY, RESEND_API_KEY, WEBHOOK_SECRET)
* Wrangler 4.121.0 → 4.127.1 güncellendi

**Cloudflare**

* `mazzgordwebsite` (production) — deploy edildi
* `mazzgordwebsite-preview` (preview) — deploy edildi
* `api.mazzgord.com/iyzico/*` route silindi (orphaned)
* Observability traces açıldı (production + preview)

**Test**

* Vite build: 1685 modül, 1.67s
* Prerender: 46/46 sayfa render edildi
* Sitemap: 36 URL
* Meta tags: 0 duplicate

**Deployment**

* Production deployment başarılı.
* Preview deployment başarılı.

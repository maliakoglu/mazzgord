# MAZZGORD Change Log
### 2026-09-05 — Kapsamlı Güvenlik Denetimi ve Düzeltmeleri

**Kritik Güvenlik Düzeltmeleri**

* `lib/cors.js` — CSRF bypass kapatıldı: Origin/Referer yoksa artık reddediliyor (önceden `true` dönüyordu); `X-Mazzgord-Mobile` header'ı tek başına CSRF bypass edemiyor
* `lib/cors.js` — CORS wildcard `*` kaldırıldı; dinamik `getCorsHeaders(request)` eklendi, sadece izinli origin'ler kendi origin'ini alıyor
* `lib/cors.js` — `checkAdminAuth` timing-safe karşılaştırmaya geçirildi
* `lib/customerAuth.js` — Müşteri token imzalama anahtarı `ADMIN_TOKEN`'dan ayrı `CUSTOMER_TOKEN_SECRET`'e taşındı; `fallback-secret` tamamen kaldırıldı
* `worker.js` — Ödeme GET endpoint IDOR kapatıldı: `SELECT *` → sadece gerekli alanlar (`payment_link_id, amount, description, status, created_at, paid_at`)
* `worker.js` — iyzico `raw` yanıt sızıntısı kaldırıldı (3 yerde: initialize, verify, refund)
* `worker.js` — Payment verify `data: iyzicoData` sızıntısı kaldırıldı; `conversationId` doğrulaması eklendi
* `worker.js` — Webhook secret timing-safe karşılaştırmaya geçirildi
* `worker.js` — Webhook ve `/odeme/sonuc` `SELECT *` sorguları daraltıldı
* `worker.js` — `iyzicoAuth` `Math.random()` → `crypto.getRandomValues()`

**Yüksek Öncelikli Düzeltmeler**

* `routes/auth.js` — Şifre sıfırlama kodu `Math.random()` → `crypto.getRandomValues()`
* `lib/emailVerify.js` — E-posta doğrulama kodu `Math.random()` → `crypto.getRandomValues()`
* `lib/rateLimit.js` — Admin login için 5/dakika, chat için 3/dakika özel rate limit
* `routes/messages.js` — HTML escaping düzeltildi: `message.replace(/</g, "&lt;")` → `escapeHtml()`; `quote.name` ve `quote.email` escape edildi

**Orta Öncelikli Düzeltmeler**

* `routes/orders.js` — `customer_name`, `delivery_note`, `tracking_number` escape edildi; gereksiz dinamik `import()` kaldırıldı
* `routes/admin.js` — `quote.name`, `tracking_number`, `delivery_note` escape edildi; dashboard 9 sequential DB sorgusu → `Promise.all`
* `routes/services.js` — Admin POST/PUT için Zod validation şemaları eklendi (`serviceCreateSchema`, `serviceUpdateSchema`)
* `lib/validation.js` — Service create/update şemaları eklendi (negatif fiyat, uzun SKU/slug önleme)
* `routes/account.js` — 3 sequential DB sorgusu → `Promise.all`
* `routes/upload.js` — Double rate limit kaldırıldı (global + handler içi)
* `client/src/pages/Odeme.tsx` — `customer_name` ve `customer_email` gösterimi kaldırıldı (IDOR düzeltmesiyle uyumlu)

**Düşük Öncelikli Düzeltmeler**

* `wrangler.toml` — `GOOGLE_CLIENT_ID` production ve preview env'lara eklendi (top-level `[vars]` miras alınmıyordu)
* `worker.js` — `sendPaymentEmails` ve `iyzicoAuth` fonksiyonları `fetch` içinden modül seviyesine taşındı
* `client/index.html` — hreflang tekrarı ve yalnız `</script>` etiketi kaldırıldı
* `.bak` dosyaları temizlendi (`prerender.py.bak`, `worker.js.bak`, `routes/quote.js.bak`, `routes/account.js.bak`)
* `lib/redirects.js` — localhost istisnası eklendi (local test için)

**Test ve Altyapı**

* `tests/cors.test.ts` — CORS değişikliklerine göre güncellendi
* `tests/quote.test.ts` — Mock env'e `RATE_LIMIT` (KV) eklendi
* `@testing-library/dom` dev dependency eklendi — `cart.test.tsx` artık geçiyor
* 96/96 test geçiyor
* `.gitignore` — Eski test/ara dosyalar eklendi; git takibinden çıkarıldı
* `CUSTOMER_TOKEN_SECRET` Wrangler secret olarak production + default env'e eklendi

### 2026-09-02 — Renk ve Tipografi Sistemi, Google Login, Yeni Sayfalar, Yeni Görseller

**Renk ve Tipografi**

* `client/src/index.css` — Yeni marka renk paleti: gece laciverti `#17212B` başlık, koyu petrol `#123F46` vurgu, sıcak kırık beyaz `#F8F7F2` zemin, kömür grisi `#3F4548` gövde, koyu adaçayı `#39756D` etiketler, derin kömür `#111827` CTA, bronz-altın `#A7834B` dekoratif. Yeni sınıflar: `.heading-accent`, `.section-label`, `.btn-secondary`, `.decorative-line`, `.decorative-icon`. Dark mode butonları altın/bronz.
* `client/public/fonts/fonts.css` — Libre Baskerville (400 + 700) self-host edildi
* `client/public/fonts/LibreBaskerville-400.ttf` + `LibreBaskerville-700.ttf` — yeni font dosyaları
* 24 dosyada Playfair Display → Libre Baskerville geçişi (Hero, Navbar, Services, Process, About, WhyChooseUs, FAQ, Portfolio, Contact, Footer, MobileStickyCTA, DenizliLocal, NotFound + blog sayfaları)
* 21 dosyada `--color-editorial-teal` → `--color-sage` geçişi
* `client/src/components/home/Hero.tsx` — "İngilizce–Türkçe" `.heading-accent` vurgu; üst etiket `.section-label`; WhatsApp butonu `.btn-secondary`
* `client/src/components/home/Process.tsx` — adım dairelerine hover animasyonu (koyu petrol + büyüme + gölge)

**Google ile Giriş**

* `client/src/pages/Giris.tsx` — Google OAuth login eklendi; şifre sıfırlama (forgot/reset) akışı eklendi; `googleReady` state, Google script lazy load
* `routes/auth.js` — 3 yeni endpoint: `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`, `POST /api/auth/google`; Google kullanıcısı şifre ile giremez kontrolü
* `lib/seoProcessor.js` — CSP'ye `accounts.google.com` eklendi (script-src, connect-src, frame-src)
* `wrangler.toml` — `GOOGLE_CLIENT_ID` env var eklendi
* `client/index.html` — Google accounts DNS prefetch

**Yeni Sayfalar ve Routing**

* `client/src/App.tsx` — 10 yeni route eklendi: transkript-ceviri, adli-sicil-cevirisi, nufus-kayit-ornegi-cevirisi, acil-tercume, denizli-yeminli-tercume, denizli-noter-onayli-tercume, denizli-pasaport-tercumesi, denizli-diploma-tercumesi, denizli-vize-tercumesi, denizli-apostil-tercume
* `client/src/pages/Hizmetler.tsx` — silindi (208 satır)
* `lib/redirects.js` — `/hizmetler` → `/` ve `/ceviri` → `/` redirect
* `prerender.py` — 10 yeni route eklendi (50 → 59), `/hizmetler` kaldırıldı
* `scripts/generate_sitemap.py` — 10 yeni route + priority değerleri eklendi
* `lib/seoData.js` — 10 yeni sayfa için SEO title/description; mevcut sayfalarda "çeviri bürosu" → "yeminli tercüman" güncellemesi; fiyat 350→450 TL
* `lib/seoProcessor.js` — 10 yeni service page breadcrumb/SEO tanımı

**SEO**

* `client/src/components/Breadcrumb.tsx` — BreadcrumbList JSON-LD schema eklendi (dynamically injected)
* `client/src/pages/Blog.tsx` — Blog altına CTA bölümü eklendi (Teklif Al + WhatsApp)
* `client/src/pages/BlogNoterOnayliCeviri.tsx` — içerik güncellendi
* `client/src/pages/BlogYeminliTercume.tsx` — içerik güncellendi

**Yeni Görseller**

* `public/images/hero-document-translation.webp` — Hero bölümü görseli
* `public/images/official-documents.webp` — Services bölümü görseli
* `public/images/apostille-notary.webp` — apostil/noter görseli
* `public/images/online-translation.webp` — online çeviri görseli
* `mazzgord gorseller/Mazzgord 2/` — görsel seti ve yerleşim önerileri dokümanı

**Worker**

* `worker.js` — yorum satırları temizlendi, kod daha sıkı hale getirildi

**Cloudflare**

* `mazzgordwebsite` (production) — deploy edildi
* 68 new/modified asset yüklendi (182 total)
* 59 route prerender edildi
* Libre Baskerville TTF font dosyaları Workers Assets'e eklendi

**Test**

* Vite build: 1703 modül, 1.71s
* Prerender: 59/59 sayfa render edildi
* Dark mode buton görünürlüğü düzeltildi (altın/bronz)

### 2026-09-01 — Hero SEO Optimizasyonu ve Hedef Kitle Güncellemesi

**Değişiklik**

* `client/src/components/home/Hero.tsx` — Hero metni SEO odaklı yeniden yazıldı; "yeminli tercüman", "belge çevirisi", "noter onaylı çeviri" ve "apostil çeviri" anahtar kelimeleri doğal akışta eklendi (8.100 + 720 + 70 + 20 aylık arama hacmi)
* `client/src/pages/AkademikCeviri.tsx` — "denklik sürecindeki öğrenciler" ifadesi eklendi (denklik araması hedef kitleye eklendi)

**Cloudflare**

* `mazzgordwebsite` (production) — deploy edildi
* 55 new/modified asset yüklendi
* 50 route prerender edildi

**Test**

* Vite build: 1689 modül, 1.67s
* Prerender: 50/50 sayfa render edildi
* Meta tags: 19 title + 19 description düzeltildi

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

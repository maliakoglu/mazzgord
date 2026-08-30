# MAZZGORD Change Log

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

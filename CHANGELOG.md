## [1.2.0] — 2026-08-20

### Mobil Uygulama Test Düzeltmeleri (16 madde)

#### Kritik
- **Odeme dogrulama**: payment.tsx — tarayici kapandiktan sonra API'den odeme durumu poll ediliyor, sahte "basarili" ekrani kaldirildi.
- **Teklif sihirbazi geri butonu**: quote.tsx — mevcut "Geri don" butonu dogrulandi, floating buton kaldirildi.
- **Gercek dosya yukleme**: quote.tsx — expo-document-picker ile R2'ye gercek dosya yukleme eklendi (PDF, DOC, JPG, PNG, max 10MB). Sahte toggle kaldirildi.
- **Track delivered/cancelled**: track.tsx — "delivered" artik completed ile ayni asamada, "cancelled" icin ozel iptal UI'i eklendi.
- **Durum etiketleri tek yerden**: constants/const.ts — STATUS_LABELS merkezi hale getirildi, track.tsx ve account.tsx arasindaki tutarsizlik giderildi.

#### Onemli
- **Auth hata mesajlari**: use-auth.ts — "Giris basarisiz" -> "Giris basarisiz", "Kayit basarisiz" -> "Kayit basarisiz".
- **Order status cevirisi**: account.tsx — odeme siparislerinde ham Ingilizce status yerine Turkce etiket, badge tonu duruma gore degisiyor.
- **Order baslik duzeltmesi**: account.tsx — payment_link_id (UUID) yerine tutar (₺) baslik olarak gosteriliyor.
- **Support karti tiklanabilir**: account.tsx — "Bir sorunuz mu var?" karti mailto:info@mazzgord.com aciyor.
- **Dil secimi dropdown**: quote.tsx — kaynak/hedef dil serbest metin yerine secilebilir chip listesi.
- **Kaynak=hedef dil kontrolu**: quote.tsx — ayni dil secilirse hata mesaji.
- **Anasayfa metin tutarliligi**: index.tsx — "24 saat icinde donus" -> "24 saat icinde teklif donusu".

#### Orta
- **Tab ikon stili**: _layout.tsx — account ikonu outline -> filled, digerleriyle tutarli.
- **API timeout**: lib/api.ts — 15 saniyelik AbortController timeout, Turkce hata mesaji.
- **Services retry**: services.tsx — retry butonu fetchServices'i cagiriyor, API yeniden cekiliyor.
- **Accessibility label'lar**: index.tsx — butonlara accessibilityRole ve accessibilityLabel eklendi.

### Degisen Dosyalar
- mazzgord-mobile/app/payment.tsx
- mazzgord-mobile/app/(tabs)/quote.tsx
- mazzgord-mobile/app/(tabs)/track.tsx
- mazzgord-mobile/app/(tabs)/account.tsx
- mazzgord-mobile/app/(tabs)/index.tsx
- mazzgord-mobile/app/(tabs)/services.tsx
- mazzgord-mobile/app/(tabs)/_layout.tsx
- mazzgord-mobile/constants/const.ts
- mazzgord-mobile/hooks/use-auth.ts
- mazzgord-mobile/lib/api.ts
- mazzgord-mobile/package.json
- mazzgord-mobile/pnpm-lock.yaml

### Yeni Bagimlilik
- expo-document-picker ~14.0.8

## [1.1.1] — 2026-08-20

### Yeni Özellikler
- **Android APK derleme**: EAS Build ile bulutta APK uretildi. preview profili ile internal dagitim APK'si olusturuldu.
- **eas.json**: EAS Build yapilandirmasi eklendi (preview + production profilleri).
- **app.config.ts**: EAS projectId eklendi (0d6f8bc4-3447-4990-ac0d-d9263a2527e7).

### Degisen Dosyalar
- mazzgord-mobile/pnpm-lock.yaml — gereksiz bağımlılıklar cikarildi, lock file yenilendi.


## [1.1.0] — 2026-08-20

### Yeni Özellikler
- **Mobil uygulama entegrasyonu**: mazzgord-mobile/ Expo React Native projesi mazzgord.com Workers API'ye baglandi.
- **Mobil API katmani**: lib/api.ts — mazzgord.com Workers API'ye fetch yapan tam API client (auth, services, quote, account, contact, payment).
- **Mobil login/register ekrani**: app/(auth)/login.tsx — email/sifre ile giris ve kayit.
- **Mobil odeme ekrani**: app/payment.tsx — gercek iyzico 3D Secure odeme akisi (expo-web-browser ile).
- **Mobil teklif sihirbazi**: app/(tabs)/quote.tsx — 5 adimli teklif alma (e-posta dogrulama dahil).
- **Mobil siparis takibi**: app/(tabs)/track.tsx — gercek API'den siparis durumu.
- **Mobil hesap ekrani**: app/(tabs)/account.tsx — gercek profil + siparis gecmisi.
- **Mobil hizmetler ekrani**: app/(tabs)/services.tsx — gercek API'den hizmet katalogu.

### Degisen Dosyalar
- lib/cors.js — CORS * olarak guncellendi, GET metodu ve Authorization header eklendi, CSRF'de Bearer token istisnasi.
- wrangler.toml — production ve preview ortam ayarlari eklendi.

### Silinen Dosyalar
- mazzgord-mobile/server/ — Manus Express backend (tRPC, MySQL, Drizzle) kaldirildi.
- mazzgord-mobile/drizzle/ — MySQL schema kaldirildi.
- mazzgord-mobile/lib/trpc.ts, lib/_core/auth.ts, lib/_core/api.ts, lib/_core/manus-runtime.ts — Manus OAuth/tRPC kaldirildi.
- mazzgord-mobile/app/oauth/callback.tsx — Manus OAuth callback kaldirildi.

### Teknik Detaylar
- Mobil uygulama artik tek backend (mazzgord.com Workers API) kullaniyor.
- Manus OAuth -> email/sifre auth'a gecildi.
- tRPC, Express, Drizzle, MySQL, jose, cookie, superjson baimliliklari kaldirildi.
- TypeScript temiz (theme-lab.tsx dev dosyasi haric).
- pnpm 9.12.0 ile baimliliklar kuruldu, Expo web'de calisiyor.


## [1.0.16] — 2026-08-20

### Düzeltmeler
- **Blog OG meta etiketleri dinamik hale getirildi**: Tüm blog sayfaları artık kendine özel og:title, og:description, og:url ile prerender ediliyor. Önceden tüm sayfalarda anasayfa etiketleri gösteriliyordu.
- **Facebook paylaşım önizleme fix**: Blog linki Facebook'a yapıştırıldığında doğru başlık, açıklama ve URL önizlemesi çıkıyor.
- **react-helmet kaldırıldı**: React 19 ile uyumsuz olduğu için çalışmıyordu. Yerine BlogLayout'ta useEffect ile doğrudan DOM manipülasyonu kullanıldı.
- **Prerender uyumu**: useEffect Chrome prerender sırasında çalışıyor, meta etiketler statik HTML'e yazılıyor.

### Degisen Dosyalar
- client/src/components/BlogLayout.tsx


## [1.0.15] — 2026-08-19

### Iyilestirmeler
- **Preload optimizasyonu (Lighthouse 76 -> 99)**: Gereksiz modulepreload'lar kaldirildi, CSS preload eklendi.
- Kritik preload'lar: vendor-react, index entry, Home. Digerleri lazy yukleniyor.

### Degisen Dosyalar
- lib/seoProcessor.js


## [1.0.14] — 2026-08-19

### Iyilestirmeler
- **Bundle optimizasyonu (Lighthouse 69 -> 76)**: Vite manualChunks function API'ye gecildi. React artık vendor-react chunk'inda.
- **index.js**: 222 KB -> 41 KB (sadece App + contexts + router).
- **Toaster ve TooltipProvider**: App.tsx'te lazy yapildi, ayri chunk'lar olustu.

### Degisen Dosyalar
- vite.config.ts, client/src/App.tsx


## [1.0.13] — 2026-08-19

### İyileştirmeler
- **Performans (Lighthouse 60 -> 69)**: react-helmet kaldırıldı (16 KB), AdSense ve GA4 lazy-load'a alındı.
- **AdSense prerender temizliği**: Chrome prerender sırasında gömülen AdSense iframe'leri Worker tarafından temizleniyor.
- **index.html temizliği**: AdSense ve GA4 direkt script'leri kaldırıldı, Worker lazy-load yönetiyor.

### Degisen Dosyalar
- lib/seoProcessor.js, client/index.html, package.json, 21 client/src/pages/*.tsx, client/src/components/BlogLayout.tsx


## [1.0.12] — 2026-08-19

### Düzeltmeler
- **Uzun title'lar (Ahrefs long titles)**: 21 Helmet componentinden <title> kaldırıldı. Worker server-side yönetiyor.
- **seoData.js**: 9 uzun title 60 karakterin altına kısaltıldı.

### Degisen Dosyalar
- lib/seoData.js, 21 client/src/pages/*.tsx, client/src/components/BlogLayout.tsx


## [1.0.11] — 2026-08-19

### Düzeltmeler
- **Cift meta description (Ahrefs issue #c64d53a0)**: 21 Helmet componentinden meta description kaldırıldı. Worker server-side yönetiyor.
- **Celiskili robots etiketi**: cerez-politikasi, kullanim-kosullari, gizlilik sayfalarinda index + noindex celiskisi giderildi. Worker artık noindex, follow ekliyor.
- **noindex sayfalar sitemapten cıkarıldı**: sepet, giris, hesabim, odeme, cerez-politikasi, kullanim-kosullari, gizlilik, siparis-takip artık sitemapte yok.
- **seoProcessor.js**: noIndexPaths ve noFollowPaths ayrıstırıldı.

### Degisen Dosyalar
- lib/seoProcessor.js, scripts/generate_sitemap.py, 21 client/src/pages/*.tsx, client/src/components/BlogLayout.tsx

## [1.0.10] — 2026-08-19

### Düzeltmeler
- **Admin.tsx typecheck hataları giderildi**: `startDeliverOrder` ve `startDeliverQuote` fonksiyonlarında tip uyumsuzlukları düzeltildi. TypeScript `tsc --noEmit` artık tamamen temiz.

### Değişen Dosyalar
- `client/src/pages/Admin.tsx` — `delivery_note` boolean→string, `file: null` eklendi


## [1.0.9] — 2026-08-19

### Düzeltmeler
- **Çerez Politikası**: SEO meta tag'leri eklendi (title, description, canonical, noindex)
- **Kullanım Koşulları**: SEO meta tag'leri eklendi (title, description, canonical, noindex)

### Değişen Dosyalar
- `client/src/pages/CookiePolicy.tsx` — Helmet eklendi
- `client/src/pages/Terms.tsx` — Helmet eklendi


## [1.0.8] — 2026-08-19

### Düzeltmeler
- **Hakkımda sayfası**: SEO meta tag'leri (title, description, canonical, OG) ve ProfessionalService structured data eklendi
- **Gizlilik politikası**: 90 gün saklama süresi netleştirildi, üçüncü taraf hizmetler (Web3Forms, Resend, WhatsApp, Cloudflare) eklendi, noter/apostil/kargo aktarımı belirtildi, AdSense bölümü Türkçe karakterleri düzeltildi
- **ChatWidget**: 12 Türkçe karakter düzeltmesi

### Değişen Dosyalar
- `client/src/pages/About.tsx` — Helmet + ProfessionalService schema
- `client/src/pages/Privacy.tsx` — 90 gün retention, üçüncü taraf hizmetler, Türkçe karakterler
- `client/src/components/ChatWidget.tsx` — Türkçe karakterler


## [1.0.7] — 2026-08-19

### Düzeltmeler
- **ChatWidget Türkçe karakterler**: 12 metin düzeltildi (çeviri, yanıtlanır, bağlantı, vb.)
- **Teklif başarı ekranı**: Başvuru numarası, takip linki, WhatsApp butonu ve yanıt süresi eklendi

### Değişen Dosyalar
- `client/src/components/ChatWidget.tsx` — Türkçe karakter düzeltmeleri
- `routes/quote.js` — response'a order_no + order_token eklendi
- `client/src/pages/TeklifFormu.tsx` — success ekranı güncellendi


## [1.0.6] — 2026-08-19

### Yeni Özellikler
- **Teklif başarı ekranı**: Başvuru numarası (MZ-XXXXX), takip linki ve WhatsApp butonu eklendi. Beklenen yanıt süresi (2-4 saat) bilgisi gösteriliyor.

### Değişen Dosyalar
- `routes/quote.js` — response'a `order_no` + `order_token` eklendi
- `client/src/pages/TeklifFormu.tsx` — success ekranı güncellendi, `orderToken`/`orderNo` state eklendi


## [1.0.5] — 2026-08-19

### Bakım
- **Legacy kolon temizliği**: `quotes` tablosundaki kullanılmayan `status` kolonu kaldırıldı (sadece `order_status` kullanılıyor). İlişkili index `idx_quotes_status` da temizlendi. (#7)

### Değişen Dosyalar
- D1 migration: `DROP INDEX idx_quotes_status`, `ALTER TABLE quotes DROP COLUMN status`


## [1.0.4] — 2026-08-19

### Düzeltmeler
- **Web3Forms bildirim kontrolü**: Frontend'de Web3Forms yanıtı kontrol ediliyor, başarısızsa console.error ile loglanıyor (#6)
- **Resend hata loglama**: `console.log` yerine `console.error` kullanılıyor — gözlemlenebilirlik iyileştirildi (#6)

### Değişen Dosyalar
- `client/src/pages/TeklifFormu.tsx` — Web3Forms yanıt kontrolü
- `routes/quote.js` — Resend hata loglama seviyesi yükseltildi


## [1.0.3] — 2026-08-19

### Güvenlik
- **Sipariş numarası enumerable hatası giderildi**: Her teklife `crypto.randomUUID` ile benzersiz `order_token` atanıyor. GET endpoint'i artık hem `MZ-` (geriye uyumlu) hem de UUID token ile sorgulanabiliyor. Token'ı bilmeyenler sipariş bilgilerine erişemez. (#5)

### Değişen Dosyalar
- `routes/quote.js` — INSERT'e `order_token` eklendi, GET'te UUID sorgulama desteği
- `client/src/pages/SiparisTakip.tsx` — UUID formatı tanıma, order_token gösterimi
- D1 migration: `ALTER TABLE quotes ADD COLUMN order_token TEXT`


## [1.0.2] — 2026-08-19

### Düzeltmeler
- **Idempotency**: Teklif formunda çift kayıt önlendi — `crypto.randomUUID` ile benzersiz anahtar, KV'de 60sn TTL ile kontrol (#4)

### Değişen Dosyalar
- `lib/validation.js` — `idempotency_key` Zod şemasına eklendi
- `routes/quote.js` — idempotency kontrolü eklendi
- `client/src/pages/TeklifFormu.tsx` — `crypto.randomUUID` ile idempotency_key üretimi


# Changelog

## [1.0.1] — 2026-08-19

### Düzeltmeler
- **Teklif formu**: `delivery_date` alanı D1 INSERT ve Zod şemasına eklendi — veri kaybı giderildi (#1)
- **E-posta doğrulama**: Backend'de zorunlu hale getirildi — KV tabanlı `markEmailVerified`/`isEmailVerified` fonksiyonları eklendi (#2)
- **Dosya yükleme**: "Belge yükleme zorunludur" metni "isteğe bağlı (opsiyonel)" olarak düzeltildi (#3)
- **Dosya yükleme**: `.webp` formatı backend izin verilen uzantı/MIME listesine eklendi (#3)
- **KVKK metni**: Türkçe karakter hataları düzeltildi (Kişisel, işlenmesine, ilişkin, vb.)
- **Teslim Tarihi**: Kullanıcıda kafa karışıklığına yol açan alan kaldırıldı

### Güvenlik
- E-posta doğrulaması artık sunucu tarafında da kontrol ediliyor — API'ye direkt istek atılarak doğrulamasız teklif gönderilemez

### Değişen Dosyalar
- `lib/validation.js` — `delivery_date` Zod şemasına eklendi
- `lib/emailVerify.js` — `markEmailVerified`, `isEmailVerified` fonksiyonları eklendi
- `routes/quote.js` — e-posta doğrulama kontrolü, `delivery_date` INSERT'e eklendi
- `routes/upload.js` — `.webp` desteği eklendi
- `client/src/pages/TeklifFormu.tsx` — KVKK metni düzeltildi, Teslim Tarihi kaldırıldı


## [2026-08-21] — Mobil Teklif & Takip Akışı + Reviews + iyzico Mobil Ödeme

### Backend (Worker API)
- `POST /api/quote/:id/review` ve `GET /api/quote/:id/review` — Müşteri değerlendirme endpoint'leri eklendi
- `GET /api/admin/reviews` — Admin değerlendirme listesi endpoint'i eklendi
- `POST /api/quote` — Auth token varsa e-posta doğrulama atlanır, `customer_id` ilişkilendirilir
- `/odeme/sonuc` callback — Mobil isteklerde `mazzgord://` scheme'ine redirect eklendi

### Mobil Uygulama
- `quote.tsx` — 5 adımdan 4 adıma düşürüldü, e-posta doğrulama kaldırıldı, auth bariyer modal'ı eklendi
- `track.tsx` — 6 aşamalı canlı takip (Teklif → Belge → Kabul → Ödeme → Çeviri → Teslim) + kabul/red, ödeme, indirme, değerlendirme
- `offer-detail.tsx` — 6 adımlı timeline güncellendi (Teklif → Belge → Kabul → Ödeme → Çeviri → Teslim)
- `payment.tsx` — iyzico ödeme `openAuthSessionAsync` ile güncellendi, `mazzgord://` scheme ile otomatik dönüş
- `lib/api.ts` — `reviewApi` (get/submit), `PaymentInfo` tipine `iyzico_conversation_id` eklendi
- `app.config.ts` — Deep link scheme `mazzgord` olarak sabitlendi

### Web Admin Panel
- `Admin.tsx` — Reviews tab'ı eklendi (yıldız puanları + yorumlar, responsive grid)

### Test
- Uçtan uca test tamamlandı: kayıt → teklif → admin fiyat → kabul → ödeme → çeviri → teslim → değerlendirme

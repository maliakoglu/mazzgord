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


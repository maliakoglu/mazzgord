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


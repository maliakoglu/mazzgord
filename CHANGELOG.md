# Changelog

## 2026-10-08

### SEO Düzeltmeleri — Sitemap, Schema, Geo Koordinat

#### Sitemap Çakışması Çözüldü
- `client/public/sitemap.xml` ve `dist/public/sitemap.xml` statik dosyaları silindi
- Worker'ın dinamik sitemap üretimi tek kaynak olarak korundu (sitemap.xml → sitemap-pages.xml + sitemap-blog.xml)

#### Noindex Sayfaları Sitemap'ten Çıkarıldı
- `/gizlilik`, `/kullanim-kosullari`, `/cerez-politikasi` sitemap-pages.xml'den kaldırıldı
- Bu sayfalar robots meta ile noindex ama sitemap'te yer almıyordu — tutarlılık sağlandı

#### Blog Sitemap lastmod Tarihleri
- `blogDates` seoProcessor.js'den export edildi, worker.js'e import edildi
- `/sitemap-blog.xml` artık her blog post için gerçek yayın tarihini (blogDates) kullanıyor
- Önceki: tüm blog URL'leri bugünün tarihini alıyordu — Google her gün "güncellendi" sanıyordu

#### Geo Koordinat Tutarlılığı
- Tüm 3 dosya tek koordinata sabitlendi: `37.7470977, 29.0954121`
  - `lib/seoProcessor.js` — LocalBusiness schema GeoCoordinates (eski: 37.9200, 29.1200)
  - `client/src/components/home/Contact.tsx` — Google Maps embed (eski: 37.7765, 29.0864)
  - `client/src/components/Map.tsx` — default center (eski: 37.7749, -122.4194 — San Francisco!)

#### BlogPosting Schema Güçlendirildi
- `image` (ImageObject, 1200x630) eklendi
- `mainEntityOfPage` eklendi
- `wordCount` — HTML'den dinamik kelime sayısı hesaplanıyor
- `articleSection` ("Ceviri Hizmetleri") eklendi
- `inLanguage` ("tr-TR") eklendi

#### /blog Sayfasına ItemList Schema
- Blog listeleme sayfasına ItemList schema eklendi
- Tüm blog postlar ListItem olarak işaretlendi (position + url + name)
- Google'da blog yazılarının koleksiyon olarak görünmesi için

### Build
- `npm run build` başarılı
- 58 HTML dosyası işlendi, 26 title + 26 description düzeltildi, 58 canonical eklendi
## 2026-10-07

### Sitemap Güncellemeleri
- `worker.js` içindeki `/sitemap-pages.xml` route'una 12 sayfa eklendi:
  - /noter-onayli-tercume
  - /denizli-yeminli-tercume
  - /apostil-tercume
  - /transkript-ceviri
  - /adli-sicil-cevirisi
  - /nufus-kayit-ornegi-cevirisi
  - /acil-tercume
  - /denizli-noter-onayli-tercume
  - /denizli-pasaport-tercumesi
  - /denizli-diploma-tercumesi
  - /denizli-vize-tercumesi
  - /denizli-apostil-tercume
- Sitemap-pages URL sayısı: 18 → 30
- Build + deploy tamamlandı

### llms.txt (AI Knowledge Catalog)
- llms.txt dosyası gerçek içerikle yeniden yazıldı
- "Çeviri bürosu" → "Mehmet Akoğlu'nun kişisel çalışma markası" olarak düzeltildi
- İletişim bilgileri eklendi (telefon, WhatsApp, çalışma saatleri)
- Tüm blog yazıları (28 adet) eklendi
- Kurumsal sayfalar eklendi (ana sayfa, hakkımda, fiyatlar, teklif, iletişim, SSS, hizmetler, gizlilik, kullanım koşulları, çerez politikası)
- Typolar düzeltildi (Tercümesii → Tercümesi)
- llms.txt client/public ve public dizinlerine sync edildi
- Build + deploy tamamlandı
- Canlıda https://mazzgord.com/llms.txt 87 satır olarak erişilebilir

### Kontrol
- llms.txt ve sitemap-blog.xml blog linkleri tam eşleşiyor (28/28)
- Eksik blog yok

## 2026-10-08

### SEO Sitemap & Schema İyileştirmeleri
- Statik `client/public/sitemap.xml` silindi — worker'ın dinamik sitemap'i ile çakışıyordu
- Noindex sayfalar (`/gizlilik`, `/kullanim-kosullari`, `/cerez-politikasi`) `/sitemap-pages.xml`'den çıkarıldı
- Blog sitemap (`/sitemap-blog.xml`) `lastmod` tarihleri artık `blogDates`'ten geliyor (gerçek yayın tarihi)
- Geo koordinatlar düzeltildi: `37.7470977, 29.0954121` (seoProcessor schema, Contact maps embed, Map.tsx default center)
- BlogPosting schema zenginleştirildi: `image`, `wordCount`, `articleSection`, `inLanguage`, `mainEntityOfPage` eklendi
- `/blog` liste sayfasına `ItemList` schema eklendi (Google için blog kataloğu)
- Build + deploy tamamlandı

## [2026-10-09] — Fiyatlandırma güncellemesi

### Noter Masrafı
- Tüm belgeler için `noter_masraf` 1400 TL olarak güncellendi (önceki: 450 TL)
- 63 kayıt toplu olarak güncellendi

### Apostil Takip Ücreti
- `apostil_takip` tüm belgeler için 150 TL olarak güncellendi (önceki: 500 TL)

### Tutar Hesaplama
- `noter_price` = `yeminli_price` + `noter_masraf` + `noter_takip` olarak yeniden hesaplandı
- `apostil_price` = `yeminli_price` + `noter_masraf` + `noter_takip` + `apostil_takip` olarak yeniden hesaplandı
- Örnek: Pasaport çevirisi — yeminli 450 + noter 1400 + takip 300 = noter_price 2150 TL
- Örnek: Diploma çevirisi — yeminli 550 + noter 1400 + takip 300 = noter_price 2250 TL

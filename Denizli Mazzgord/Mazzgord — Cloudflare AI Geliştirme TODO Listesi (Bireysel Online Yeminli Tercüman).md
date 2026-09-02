# Mazzgord — Cloudflare AI Geliştirme TODO Listesi (Bireysel Online Yeminli Tercüman)

## Kullanım

Bu liste **P0 → P1 → P2** sırasıyla uygulanmalıdır. Her madde tamamlandığında kutuyu işaretle ve kısa bir test notu ekle. Kullanıcı tarafından doğrulanması gereken bilgiler, uygulama öncesinde ayrıca onaylanmalıdır.

## P0 — Yayına çıkış için kritik işler

### Proje ve mevcut durum

- [ ] Mevcut Mazzgord sayfalarının, URL’lerinin, görsellerinin ve formlarının envanterini çıkar.
- [ ] Yeni geliştirme ortamını üretim alan adından ayır.
- [ ] Mevcut URL’ler için redirect planı oluştur; çalışan URL’leri gereksiz yere değiştirme.
- [ ] Marka adı, tercümanın adı/unvanı, telefon, e-posta, hizmet bölgesi, çalışma saatleri ve ödeme/teslim bilgilerinin doğruluğunu tercümandan teyit et.
- [ ] Gerçek olmayan sertifika, yorum, müşteri sayısı, ekip/şirket bilgisi, teslim süresi veya uzmanlık iddiası kullanma.

### Ölçüm

- [ ] Google Search Console’u doğrula.
- [ ] Analytics veya eşdeğer gizlilik odaklı ölçüm çözümünü kur.
- [ ] Teklif formu başlatma olayını ekle: `offer_form_started`.
- [ ] Teklif formu tamamlanma olayını ekle: `offer_form_completed`.
- [ ] WhatsApp tıklama olayını ekle: `whatsapp_click`.
- [ ] Telefon tıklama olayını ekle: `phone_click`.
- [ ] E-posta tıklama olayını ekle: `email_click`.
- [ ] Dosya yükleme başlatma ve tamamlanma olaylarını ekle.
- [ ] Kişisel belge içeriğini veya belge adını analitik sistemlere gönderme.
- [ ] İlk 14 günlük organik trafik ve dönüşüm baz çizgisini kaydet.

### Ana sayfa

- [ ] H1 başlığını “Denizli’de İngilizce–Türkçe Yeminli Tercüme” niyetini açıkça karşılayacak şekilde düzenle.
- [ ] İlk ekrana tek bir birincil CTA ekle: “Belgen İçin Teklif Al”.
- [ ] İkincil CTA ekle: “WhatsApp’tan Belge Gönder”.
- [ ] İlk ekranda hizmet bölgesi, dil odağı ve yaklaşık yanıt süresini açıkla.
- [ ] İlk ekranın altına güven şeridi ekle: İngilizce–Türkçe uzmanlığı, Denizli ve online hizmet, gizlilik, teslim öncesi kontrol.
- [ ] Güven şeridindeki her iddianın tek tercümanın gerçek ve doğrulanabilir uzmanlık/çalışma biçimiyle uyumlu olduğunu kontrol et.
- [ ] Ana sayfada teklif akışını hizmet kartlarından önce görünür hale getir.
- [ ] “Nasıl çalışır?” bölümünü beş kısa ve anlaşılır adım olarak koru.
- [ ] Fiyatı etkileyen faktörleri açıkla: belge türü, sayfa/karakter yoğunluğu, noter, apostil, teslim zamanı ve teslim yöntemi.
- [ ] Son CTA bölümünü ekle ve aynı iki eylemi tekrar et: teklif formu ve WhatsApp.

### Teklif akışı

- [ ] Teklif formunu mobilde tek sütun, kısa ve okunabilir hale getir.
- [ ] Belge türü alanı ekle.
- [ ] Kaynak dil alanı ekle; İngilizceyi varsayılan yap ancak değiştirmeye izin ver.
- [ ] Hedef dil alanı ekle; Türkçeyi varsayılan yap ancak değiştirmeye izin ver.
- [ ] Sayfa veya belge adedi alanı ekle.
- [ ] Noter onayı için “Evet / Hayır / Emin değilim” seçeneklerini ekle.
- [ ] Apostil için “Evet / Hayır / Emin değilim” seçeneklerini ekle.
- [ ] Teslim zamanı için normal/acil seçeneklerini ekle.
- [ ] Teslim yöntemi için dijital, kargo ve yüz yüze seçeneklerini ekle.
- [ ] Dosya yükleme alanı ekle veya güvenli biçimde mevcut yapıya bağla.
- [ ] Dosya yükleme için tür ve boyut sınırı belirle.
- [ ] Dosya yükleme alanında belge gizliliği ve saklama/silme bilgisini göster.
- [ ] Ad, telefon ve e-posta için yalnızca gerekli alanları kullan.
- [ ] Form hatalarını alan bazında, açık Türkçe metinlerle göster.
- [ ] Başarılı gönderim ekranında başvuru özeti ve beklenen dönüş süresini göster.
- [ ] Başarılı gönderimde WhatsApp ve telefon alternatiflerini göster.
- [ ] Spam koruması ekle; Cloudflare Turnstile veya eşdeğer çözümü değerlendir.
- [ ] Formun başarısız olduğu durumda kullanıcı verisini kaybetmeden tekrar deneme sağla.

### Güven ve gizlilik

- [ ] `/hakkimizda` sayfasını, tek başına çalışan tercümanın uzmanlık ve güven merkezi olarak yeniden yaz.
- [ ] Tercümanın doğrulanabilir uzmanlık, eğitim, yeminli tercümanlık ve çalışma alanı bilgilerini ekle.
- [ ] Çalışma yöntemini ve teslim öncesi kontrol sürecini açıkla.
- [ ] Belgelerin kimler tarafından görüldüğünü ve hangi amaçla işlendiğini açıkla.
- [ ] Belge saklama ve silme süresini tercüman ile teyit ederek yayınla.
- [ ] İzinli müşteri yorumları için kaynak ve bağlam bilgisi ekle.
- [ ] Yorumların gerçekliğini ve yayın iznini kontrol et.
- [ ] Anonimleştirilmiş proje örneklerini incele; ad, kimlik numarası, adres, doğum tarihi, belge numarası ve imza gibi verileri kaldır.
- [ ] `/gizlilik` sayfasını form ve dosya yükleme akışıyla tutarlı hale getir.

## P1 — İlk büyüme ve SEO işleri

### Ticari hizmet sayfaları

- [ ] `/denizli-yeminli-tercume` sayfasını oluştur.
- [ ] `/denizli-noter-onayli-tercume` sayfasını oluştur.
- [ ] `/denizli-pasaport-tercumesi` sayfasını oluştur.
- [ ] `/denizli-diploma-tercumesi` sayfasını oluştur.
- [ ] `/denizli-vize-tercumesi` sayfasını oluştur.
- [ ] `/denizli-apostil-tercume` sayfasını oluştur.
- [ ] `/transkript-ceviri` sayfasını oluştur veya mevcut sayfayı derinleştir.
- [ ] `/adli-sicil-cevirisi` sayfasını oluştur.
- [ ] `/nufus-kayit-ornegi-cevirisi` sayfasını oluştur.
- [ ] `/acil-tercume` sayfasını oluştur.
- [ ] Her sayfada özgün H1, title, meta description ve canonical URL kullan.
- [ ] Her sayfada belgeyi hazırlama, süreç, teslim, fiyatı etkileyen faktörler, SSS ve CTA bölümleri kullan.
- [ ] Denizli sayfalarında yalnızca şehir adını değiştirilmiş kopya metin kullanma.
- [ ] Her sayfanın gerçek hizmet kapsamı ve teslim bilgisi tercüman tarafından doğrulansın.

### İçerik ve iç bağlantı

- [ ] Mevcut blog yazılarını ana konu kümelerine ayır: pasaport, diploma, vize, noter/apostil, akademik, teknik ve fiyat.
- [ ] Her blog yazısına bir ana hizmet sayfası bağlantısı ekle.
- [ ] Her blog yazısının sonunda tek bir ana teklif CTA’sı kullan.
- [ ] “Pasaport tercümesi nasıl yapılır?” yazısını pasaport hizmet sayfasına bağla.
- [ ] “Yeminli tercüme fiyatları” yazısını fiyatlar ve teklif sayfasına bağla.
- [ ] Denizli’de noter/apostil süreci hakkında özgün ve doğrulanmış rehberler üret.
- [ ] Genel, düşük niyetli ve birbirini tekrarlayan yazıları birleştirme veya güncelleme planına al.
- [ ] Her yazıda yayın tarihi, güncelleme tarihi ve yazar/uzmanlık bilgisi göster.

### Yapısal veri ve teknik SEO

- [ ] `Organization` veya uygun `LocalBusiness` şemasını ekle.
- [ ] Hizmet sayfalarına `Service` şeması ekle.
- [ ] Sayfa hiyerarşisine `BreadcrumbList` şeması ekle.
- [ ] Yalnızca sayfada görünür SSS için `FAQPage` şeması kullan.
- [ ] Yapısal veriyi Rich Results Test ile doğrula.
- [ ] Her indekslenebilir sayfanın tek canonical URL’si olduğunu kontrol et.
- [ ] `/hesabim`, `/giris`, `/admin`, `/sepet`, `/odeme` ve özel sonuç sayfalarını indeks dışı bırak.
- [ ] Sitemap’te yalnızca indekslenmesi istenen canonical URL’leri tut.
- [ ] robots.txt içinde sitemap URL’sini doğrula.
- [ ] 404 sayfasına ana hizmetlere ve teklif sayfasına bağlantı ekle.
- [ ] Open Graph ve Twitter/X kartlarını ekle.
- [ ] Başlıkların ve meta açıklamaların kopya olup olmadığını kontrol et.
- [ ] Görsellere açıklayıcı Türkçe alt metin ekle.
- [ ] İç bağlantılarda “buraya tıklayın” yerine açıklayıcı anchor text kullan.

### Yerel SEO

- [ ] Google İşletme Profili kategori ve hizmetlerini doğrula.
- [ ] İşletme adı, telefon, e-posta, çalışma saatleri ve hizmet bölgesini tüm kanallarda tutarlı yap.
- [ ] Denizli ofis/online hizmet modelini gerçeğe uygun biçimde belirt.
- [ ] Gerçek işletme fotoğrafları ve anonimleştirilmiş çalışma ortamı görselleri ekle.
- [ ] Gerçek müşterilerden düzenli yorum iste; yorum satın alma veya sahte yorum kullanma.
- [ ] Gelen yorumlara doğal ve özgün yanıtlar ver.
- [ ] Google İşletme Profili web sitesi tıklamalarını ölç.
- [ ] Denizli hizmet sayfalarını Google İşletme Profili hizmetleriyle tutarlı hale getir.

## P1 — Performans ve erişilebilirlik

- [ ] Mobil görünümde ilk ekranın yüklenmesini ölç.
- [ ] Core Web Vitals baz çizgisini Search Console ve PageSpeed ile kaydet.
- [ ] Hero görselini WebP/AVIF ve doğru boyutta sun.
- [ ] Büyük görseller için lazy-loading uygula; ilk ekrandaki kritik görseli gereksiz geciktirme.
- [ ] Kullanılmayan JavaScript ve CSS’yi kaldır.
- [ ] Üçüncü taraf analitik, sohbet ve ödeme script’lerini geciktirerek yükle.
- [ ] Font sayısını ve ağırlıklarını azalt.
- [ ] Layout shift oluşturan görsel ve butonlar için sabit alan tanımla.
- [ ] Klavye ile tüm menü, form ve modal akışını test et.
- [ ] Görünür focus durumlarını kontrol et.
- [ ] Kontrast ve form hata mesajlarını kontrol et.
- [ ] Mobil sabit CTA çubuğunun form alanlarını ve içerikleri kapatmadığını test et.

## P2 — İleri seviye büyüme

- [ ] İngilizce içerik gerekiyorsa özgün `/en/` bilgi mimarisi tasarla.
- [ ] Otomatik/kopya çeviriyle çok sayıda düşük kaliteli sayfa üretme.
- [ ] Şirketlere hizmet verilecekse bunu “tek tercümandan doğrudan online teklif” olarak konumlandır; ekip, ajans veya tercüme bürosu ağı iddiası oluşturma.
- [ ] Teknik, akademik ve hukuki çeviriyi yalnızca gerçekten bizzat sunulan uzmanlık alanları için ayrı hizmet kümeleri halinde derinleştir.
- [ ] Aylık içerik takvimi oluştur.
- [ ] En çok dönüşüm sağlayan hizmet sayfalarını belirle.
- [ ] Ana sayfa CTA’sı için A/B veya kontrollü varyasyon testi yap.
- [ ] “WhatsApp”, “form” ve “telefon” kanallarının tekliften ödemeye katkısını karşılaştır.
- [ ] Kullanıcıların teklif akışında terk ettiği adımları ölç.
- [ ] Nitelikli teklif başına edinme maliyetini takip et.
- [ ] Düzenli SEO teknik taraması yap.

## Cloudflare uygulama notları

- [ ] Statik ön yüz için Cloudflare Pages veya mevcut hosting uyumluluğunu değerlendir; yönetimi tek kişi için sade tut.
- [ ] Sunucu tarafı form işlemleri gerekiyorsa Cloudflare Workers kullan.
- [ ] Hassas dosyalar için R2 kullanılıyorsa herkese açık bucket yerine erişim kontrollü akış uygula.
- [ ] Teklif kayıtları için D1 veya mevcut güvenli veri katmanını değerlendir.
- [ ] Turnstile ile form spam korumasını değerlendir.
- [ ] Hassas verileri log’lara yazma.
- [ ] API anahtarlarını istemci koduna koyma; secrets/environment variables kullan.
- [ ] Rate limit ve dosya yükleme sınırlarını belirle.
- [ ] Dosya erişim bağlantılarını süreli ve yetkili yap.
- [ ] Preview, staging ve production ortamlarını ayır.
- [ ] Her deploy sonrası sitemap, form, WhatsApp, telefon ve mobil görünümü kontrol et.

## Yayın öncesi test matrisi

| Test | Durum | Not |
|---|---|---|
| Ana sayfa mobil | [ ] | |
| Ana sayfa masaüstü | [ ] | |
| Teklif formu başarılı gönderim | [ ] | |
| Form hatası ve tekrar deneme | [ ] | |
| Dosya türü/boyutu doğrulama | [ ] | |
| WhatsApp bağlantısı | [ ] | |
| Telefon bağlantısı | [ ] | |
| E-posta bağlantısı | [ ] | |
| Sitemap erişimi | [ ] | |
| robots.txt erişimi | [ ] | |
| Canonical kontrolü | [ ] | |
| Structured data doğrulaması | [ ] | |
| 404 sayfası | [ ] | |
| KVKK/gizlilik bağlantıları | [ ] | |
| Klavye navigasyonu | [ ] | |
| Kontrast ve focus | [ ] | |
| Core Web Vitals ölçümü | [ ] | |
| Analytics olayları | [ ] | |
| Spam koruması | [ ] | |
| Hassas dosya erişim testi | [ ] | |

## Tamamlanma raporu şablonu

Her geliştirme turunun sonunda şu bilgileri yaz:

- Tamamlanan TODO maddeleri:
- Değişen dosyalar ve URL’ler:
- Yapılan testler:
- Başarısız veya bekleyen testler:
- Kullanıcıdan doğrulama bekleyen bilgiler:
- Performans ölçümü:
- Sonraki öncelikli üç iş:

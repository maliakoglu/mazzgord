# Mazzgord — Cloudflare AI Uygulama Talimatları

## Proje amacı

Mazzgord, Denizli merkezli olup tamamen online çalışan, **tek başına hizmet veren İngilizce–Türkçe yeminli tercümanın** kişisel hizmet markasıdır. Hizmet kapsamında noter onaylı tercüme, apostil, resmi belge ve vize çevirisi bulunur. Bu proje, mevcut sitenin karşılaştırma sonrası belirlenen eksiklerini gideren, güven veren, hızlı, mobil öncelikli ve teklif dönüşümünü ölçebilen yeni bir web deneyimi oluşturmak içindir.

Bu proje, karşılaştırma sitesindeki net teklif akışı ve görünür güven unsurlarından yalnızca işlevsel olarak ilham alır; şirket, ekip veya ofis ağı algısı oluşturmaz; tek tercüman hizmetini açıkça anlatır ve başka bir sitenin tasarımını, metinlerini, marka kimliğini veya kodunu kopyalamaz. Mazzgord’un farkı **işi bizzat yapan tek bir yeminli tercümanla doğrudan iletişim, İngilizce–Türkçe odağı, Denizli bilgisi, online kolaylık ve belgeyi kişisel olarak inceleyerek net teklif verme** olmalıdır.

## Cloudflare AI için ana talimat

> Mazzgord için üretime hazır, mobil öncelikli, erişilebilir ve SEO uyumlu **kişisel tercüman hizmeti sitesi** oluştur. Marka konumlandırması: Denizli’de ve online olarak çalışan, işleri bizzat yapan İngilizce–Türkçe yeminli tercüman. Öncelik, ziyaretçinin belgesini güvenli biçimde göndermesi ve kısa sürede nitelikli teklif almasıdır. Her sayfada açık bir sonraki adım, kişisel uzmanlık ve güven unsurları, fiyatı etkileyen faktörler, teslim süresi ve doğrudan iletişim kanalı bulunmalıdır.

## Mevcut eksiklerin özeti

| Eksik alan | Yeni projede çözüm |
|---|---|
| Kişisel güven unsurları yeterince görünür değil | Tercümanın uzmanlık profili, işi bizzat yaptığı bilgisi, çalışma yöntemi, açık iletişim, gizlilik özeti, gerçek müşteri yorumları ve anonimleştirilmiş iş örnekleri için ayrı alanlar oluştur |
| Teklif akışı temel form ve WhatsApp bağlantısına dayanıyor | Belge türü, dil yönü, sayfa sayısı, noter/apostil, teslim zamanı ve dosya gönderimini toplayan kısa çok adımlı teklif akışı oluştur |
| Kesin fiyat öncesi kullanıcı belirsizliği yüksek | Kesin fiyat vaadi vermeden tahmini aralık veya fiyatı etkileyen faktörleri göster; kesin teklifin belge incelemesi sonrası verileceğini açıkça yaz |
| Denizli yerel SEO sayfa mimarisi sınırlı | Denizli yeminli tercüme, Denizli noter onaylı tercüme, Denizli pasaport/diploma/vize/apostil tercümesi gibi özgün hizmet sayfaları oluştur |
| Blog içerikleri ticari sayfalara yeterince bağlanmayabilir | Her rehber yazısını ilgili hizmet sayfasına ve tek bir teklif CTA’sına bağla |
| Dönüşüm ölçümü belirsiz | Form, WhatsApp, telefon, e-posta ve dosya gönderim olaylarını ölçülebilir hale getir |
| Performans saha verisi izlenmiyor | Core Web Vitals hedeflerini ve performans kontrolünü proje kabul kriterine ekle |
| Kişisel belgelerde gizlilik mesajı yeterince görünür değil | Dosya yükleme alanında, form yanında ve gizlilik sayfasında belge işleme/silme politikasını açıkla |

## Marka ve iletişim dili

Metinler Türkçe olmalıdır. Üslup **sakin, açık, güvenilir, doğrudan ve abartısız** olmalıdır. “En iyi”, “garantili”, “kusursuz”, “rakipsiz” gibi kanıtlanamayan iddialar kullanılmamalıdır. Kullanıcıya “siz” diye hitap edilmelidir.

Ana mesaj:

> Denizli’de İngilizce–Türkçe yeminli tercüme. Belgenizi gönderin; belge türü, noter/apostil ihtiyacı ve teslim süresini inceleyip net teklif verelim.

Birincil CTA: **Belgen İçin Teklif Al**  
İkincil CTA: **WhatsApp’tan Belge Gönder**  
Telefon CTA’sı: **Telefonla Bilgi Al**

## Hedef kullanıcılar

Birinci hedef kitle pasaport, diploma, transkript, adli sicil, nüfus kayıt örneği, evrak ve vize dosyası çevirisi ihtiyacı olan bireysel müşterilerdir. İkinci hedef kitle akademik, teknik veya hukuki İngilizce–Türkçe çeviri arayan öğrenci, araştırmacı ve küçük işletmelerdir. Üçüncü hedef kitle Denizli’de noter, apostil, konsolosluk, eğitim ve vize süreçleri için belge desteği arayan kişilerdir.

## Önerilen site haritası

### Temel sayfalar

- `/` — Denizli İngilizce–Türkçe yeminli tercüme ana sayfası
- `/hakkimizda` — Uzmanlık, çalışma yöntemi ve güven merkezi
- `/hizmetler` — Tüm hizmetlerin kategorik özeti
- `/teklif` — Çok adımlı teklif ve belge gönderim akışı
- `/fiyatlar` — Başlangıç aralıkları ve fiyatı etkileyen faktörler
- `/iletisim` — Telefon, WhatsApp, e-posta, konum ve çalışma saatleri
- `/sss` — Satın alma itirazlarını çözen SSS
- `/blog` — Rehber içerik merkezi
- `/gizlilik`, `/kullanim-kosullari`, `/cerez-politikasi` — Yasal sayfalar

### Ticari hizmet sayfaları

- `/yeminli-tercume`
- `/noter-onayli-tercume`
- `/apostil-tercume`
- `/pasaport-ceviri`
- `/diploma-ceviri`
- `/transkript-ceviri`
- `/adli-sicil-cevirisi`
- `/nufus-kayit-ornegi-cevirisi`
- `/vize-cevirisi`
- `/teknik-ceviri`
- `/akademik-ceviri`
- `/acil-tercume`
- `/ingilizce-turkce-ceviri`

### Denizli ve online hizmet açılış sayfaları

İlk sürümde yalnızca gerçekten özgün içerik hazırlanabilen sayfaları oluştur. Şehir adı değiştirilmiş kopya sayfalar üretme.

- `/denizli-yeminli-tercume`
- `/denizli-noter-onayli-tercume`
- `/denizli-pasaport-tercumesi`
- `/denizli-diploma-tercumesi`
- `/denizli-vize-tercumesi`
- `/denizli-apostil-tercume`

## Ana sayfa gereksinimleri

Ana sayfanın ilk ekranında marka adı, “Denizli’de İngilizce–Türkçe yeminli tercüme” başlığı, kısa değer önerisi, birincil teklif CTA’sı ve WhatsApp CTA’sı yer almalıdır. Kullanıcı, ilk ekranda belgesini nasıl göndereceğini ve ne kadar sürede dönüş bekleyebileceğini anlamalıdır.

İlk ekranın hemen altında güven şeridi bulunmalıdır. Bu şeritte yalnızca doğrulanabilir bilgiler gösterilmelidir: **İngilizce–Türkçe uzmanlığı, Denizli ve online hizmet, belge gizliliği, teslim öncesi kontrol, tahmini yanıt süresi**. Sertifika, yorum sayısı veya resmi unvan gibi bilgiler kullanıcı tarafından sağlanmadan uydurulmamalıdır.

Ana sayfada şu bölümler bulunmalıdır: teklif kutusu, nasıl çalışır, hizmetler, fiyatı etkileyen faktörler, güven ve uzmanlık, izinli yorumlar, anonimleştirilmiş proje örnekleri, Denizli yerel hizmet bölümü, SSS ve son CTA. Bölümler görsel olarak ayrılmalı; ancak kullanıcıyı gereksiz animasyon ve pop-up’larla yormamalıdır.

## Teklif akışı gereksinimleri

Teklif akışı mümkün olduğunca kısa olmalıdır. İlk adımda şu alanlar toplanmalıdır:

| Alan | Zorunlu mu? | Açıklama |
|---|---:|---|
| Belge türü | Evet | Pasaport, diploma, transkript, vize, adli sicil vb. |
| Kaynak dil | Evet | Varsayılan İngilizce |
| Hedef dil | Evet | Varsayılan Türkçe |
| Sayfa veya belge adedi | Evet | Yaklaşık değer yeterli |
| Noter onayı | Hayır | Kullanıcı bilmiyorsa “emin değilim” seçeneği olmalı |
| Apostil | Hayır | Kullanıcı bilmiyorsa açıklama bağlantısı gösterilmeli |
| Teslim zamanı | Evet | Normal veya acil |
| Teslim yöntemi | Evet | E-posta/WhatsApp, kargo veya yüz yüze |
| Dosya yükleme | Hayır | Fotoğraf, PDF veya tarama; dosya gönderimi alternatif olarak WhatsApp’a yönlenebilir |
| Ad, telefon, e-posta | Evet | Teklif dönüşü için gerekli minimum alanlar |

Kesin fiyat, belge incelenmeden vaat edilmemelidir. Başarılı gönderim sonrası başvuru özeti, beklenen geri dönüş süresi, gizlilik açıklaması ve WhatsApp/telefon alternatifi gösterilmelidir.

## SEO gereksinimleri

Her indekslenebilir sayfanın özgün `title`, `meta description`, canonical URL, Open Graph alanları, tek bir anlamlı H1 başlığı ve açıklayıcı URL’si olmalıdır. Hizmet sayfaları Denizli bağlamını doğal biçimde kullanmalı; anahtar kelime doldurma yapılmamalıdır.

İç bağlantı yapısı şu akışı desteklemelidir: **rehber yazısı → ilgili hizmet sayfası → teklif sayfası**. Footer’da tüm hizmetleri ve temel yasal sayfaları listele. Görsellerde anlamlı alt metin kullan; örnek belgelerde kişisel verileri tamamen maskele.

Uygun sayfalarda `Organization` veya `LocalBusiness`, `Service`, `BreadcrumbList` ve sayfada görünür SSS varsa `FAQPage` yapılandırılmış verisi kullanılabilir. Yapılandırılmış veriye kullanıcıya gösterilmeyen iddia veya bilgi ekleme.

## Teknik ve güvenlik gereksinimleri

Site HTTPS üzerinden çalışmalıdır. Form ve dosya akışlarında spam koruması, dosya türü/boyutu doğrulaması, güvenli hata mesajları, rate limit ve kişisel veri minimizasyonu uygulanmalıdır. API anahtarları istemci koduna yazılmamalıdır. Yönetim uçları ve özel kullanıcı sayfaları arama motorlarına açılmamalıdır.

Dosya yükleme varsa dosyalar herkese açık statik URL olarak sunulmamalı; erişim kontrolü, süreli erişim bağlantısı, dosya boyutu sınırı ve silme politikası uygulanmalıdır. Kullanıcıya belge saklama süresi açıkça bildirilmelidir. Uygulanabilir teknik seçenekler Cloudflare Workers, R2, D1 ve Turnstile’dır; kesin servis seçimi proje altyapısı doğrulandıktan sonra yapılmalıdır.

## Performans ve erişilebilirlik

Mobil öncelikli tasarım uygulanmalıdır. Üst bölümde ağır video, gereksiz slider veya büyük görsel kullanılmamalıdır. Görseller modern formatlarda, uygun boyutta ve lazy-load ile sunulmalıdır. Klavye ile gezinme, görünür focus durumu, yeterli renk kontrastı, form hata mesajları, semantik HTML ve ekran okuyucu etiketleri zorunludur.

Performans kabulünde mobil LCP, INP ve CLS ölçülmeli; kötü saha verisi varsa iyileştirme yapılmadan proje tamamlanmış sayılmamalıdır. Lighthouse puanı tek başına başarı ölçütü değildir.

## Ölçüm ve dönüşüm olayları

Aşağıdaki olayları ölçülebilir hale getir:

- `offer_form_started`
- `offer_form_completed`
- `document_upload_started`
- `document_upload_completed`
- `whatsapp_click`
- `phone_click`
- `email_click`
- `service_page_cta_click`
- `pricing_view`
- `faq_opened`

Kişisel belgelerin içeriğini analitik sistemlere aktarma. Form dönüşümlerinde yalnızca anonim olay bilgisi, kaynak sayfa, cihaz türü ve kampanya parametreleri gibi gerekli verileri kullan.

## Tasarım ilkeleri

Tasarım sade ve güven veren olmalıdır. Krem/beyaz zemin, koyu metin, ölçülü yeşil veya petrol vurgusu kullanılabilir; kontrast WCAG düzeylerine uygun olmalıdır. CTA düğmeleri görsel olarak belirgin, fakat agresif olmamalıdır. Mobilde sabit WhatsApp/teklif çubuğu kullanılacaksa içerik ve form alanlarını kapatmamalıdır.

## Kabul kriterleri

Proje şu koşullar sağlanmadan tamamlanmış sayılmamalıdır:

1. Mobil ve masaüstünde ana sayfa, teklif ve tüm hizmet sayfaları çalışır.
2. Kullanıcı üç dakikadan kısa sürede teklif formunu tamamlayabilir.
3. Form, WhatsApp ve telefon tıklamaları ayrı ölçülür.
4. Her ticari sayfanın özgün SEO başlıkları ve canonical URL’si vardır.
5. Denizli açılış sayfaları özgün içerik ve gerçek hizmet bilgisi içerir.
6. Kişisel belge örneklerinde görünür kişisel veri yoktur.
7. Dosya yükleme varsa erişim kontrolü ve silme politikası uygulanır.
8. Form spam koruması ve güvenli hata yönetimi vardır.
9. Klavye erişimi, mobil kullanım ve temel ekran okuyucu etiketleri test edilmiştir.
10. Sitemap, robots.txt, 404 sayfası, favicon, Open Graph ve yapılandırılmış veri doğrulanmıştır.
11. Performans ölçümü yapılmış ve özellikle mobilde kritik darboğazlar giderilmiştir.
12. Uydurma sertifika, yorum, müşteri, ekip/şirket ölçeği veya başarı iddiası kullanılmamıştır.

## Cloudflare AI’den beklenen çıktı

Uygulama başlamadan önce dosya yapısını, kullanılacak Cloudflare bileşenlerini, veri akışını ve güvenlik varsayımlarını açıkla. Önce çalışan bir MVP oluştur; sonra SEO sayfaları, ölçüm, güvenlik ve performans iyileştirmelerini sırayla uygula. Her değişiklikten sonra hangi TODO maddelerinin tamamlandığını ve nasıl test edildiğini belirt.

## Proje kaynakları

- Mevcut site: https://mazzgord.com
- Karşılaştırma sitesi: https://www.adiguncompany.com
- Ayrıntılı karşılaştırma raporu: `mazzgord_adigun_karsilastirma_ve_optimizasyon_plani.md`

## Geliştirici notu

Bu README bir uygulama brifidir. Gerçek kişisel bilgiler, ödeme bilgileri, müşteri yorumları, uzmanlık/unvan bilgileri, çalışma saatleri, teslim süreleri ve kesin fiyatlar uygulamaya alınmadan önce tercüman tarafından doğrulanmalıdır. Site, tek kişinin sunduğu kişisel online hizmeti olduğundan farklı göstermemelidir.

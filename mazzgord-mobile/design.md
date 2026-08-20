# Mazzgord Mobil Uygulama Arayüz Tasarım Planı

## Tasarım yönü

Uygulama, **modern minimalizm + kurumsal güven** ekseninde tasarlanacaktır. Deneyim iOS Human Interface Guidelines yaklaşımına yakın; sakin, okunabilir, katmanlı ve tek elle kullanılabilir olacaktır. Her ekran portre yönünde 9:16 kullanım için planlanır. Ana aksiyonlar ekranın alt yarısında veya başparmak erişim alanında tutulur; kritik işlemler sabit ve belirgin CTA ile tamamlanır.

## Ekran listesi

| Ekran | Ana içerik | Ana işlev |
|---|---|---|
| Ana Sayfa | Karşılama, güven mesajı, hızlı aksiyonlar, popüler hizmetler, süreç | Teklif alma veya hizmet keşfine yönlendirme |
| Hizmetler | Kategori filtreleri, hizmet kartları, fiyat başlangıçları | Hizmet keşfi ve detayına geçiş |
| Hizmet Detayı | Hizmet açıklaması, seçenekler, fiyat bilgisi, teslim süresi | Teklif başlatma veya sepete ekleme |
| Teklif Sihirbazı | Dil, belge, hizmet, aciliyet, teslimat, dosya ve iletişim adımları | Kişiselleştirilmiş teklif talebi oluşturma |
| Teklif Başarılı | Başvuru numarası, takip CTA'sı, WhatsApp iletişimi | Sonucu teyit etme ve takibe geçme |
| Sipariş Takip | Referans numarası, durum kartı, zaman çizelgesi, teslimat | Oturumsuz sipariş kontrolü |
| Giriş / Kayıt | E-posta, şifre, isim, telefon | Hesap oluşturma ve oturum açma |
| Hesabım | Profil özeti, aktif talepler, geçmiş siparişler, dosyalar | Müşteri işlemlerini tek merkezden yönetme |
| Sipariş Detayı | Durum, mesajlar, ödeme, teslim dosyası | Siparişle ilgili tüm aksiyonlar |
| Ödeme | Tutar özeti, güvenli ödeme yönlendirmesi, sonuç | Ödemeyi tamamlatma |
| İletişim | Telefon, e-posta, WhatsApp, mesaj formu | Firmaya ulaşma |

## Ana kullanıcı akışları

### Teklif alma

Kullanıcı Ana Sayfa'da “Teklif Al” düğmesine basar. Sihirbazda önce dil yönünü, ardından belge türünü ve çeviri hizmetini seçer. Sayfa/kelime bilgisi, aciliyet, noter/apostil ihtiyacı ve teslimat yöntemini girer. Son adımda belge yükler ve iletişim bilgilerini onaylar. Gönderim tamamlanınca başvuru numarası ve takip düğmesi gösterilir.

### Hizmetten siparişe

Kullanıcı Hizmetler ekranında bir kart seçer. Detay ekranında seçenekleri işaretler, fiyat özeti güncellenir ve “Devam Et” düğmesine basar. Dosya ve teslimat bilgilerini ekler, sepet özetini görür, güvenli ödeme ekranına yönlendirilir. Ödeme sonucu uygulama içinde başarı veya hata durumu olarak gösterilir.

### Sipariş takibi

Kullanıcı alt navigasyondaki “Takip” sekmesine geçer veya teklif sonrası takip düğmesine basar. MZ başvuru numarasını girer. Uygulama durum kartını, tahmini teslim tarihini ve süreç zaman çizelgesini gösterir. Hesap sahibi kullanıcılar sipariş detayından mesaj gönderebilir ve teslim dosyasını indirebilir.

## Renk sistemi

| Token | Renk | Kullanım |
|---|---|---|
| Navy | `#1E3A8A` | Marka, üst bilgi, ana başlık ve güven alanları |
| Navy Deep | `#172554` | Koyu hero alanı, güçlü kontrast |
| Orange | `#EA580C` | Ana CTA, dikkat ve dönüşüm aksiyonları |
| Orange Soft | `#FFF7ED` | CTA arka planı ve uyarı vurgusu |
| Canvas | `#F8FAFC` | Uygulama arka planı |
| Surface | `#FFFFFF` | Kartlar ve formlar |
| Ink | `#1F2937` | Ana metin |
| Muted | `#64748B` | Yardımcı metin |
| Border | `#E2E8F0` | Ayırıcılar ve input sınırları |
| Success | `#16A34A` | Başarılı teklif, ödeme ve teslimat |

## Komponent prensipleri

Kartlar 20 px köşe yarıçapına, input alanları 14 px köşe yarıçapına sahip olacaktır. Birincil düğmeler turuncu, ikincil düğmeler açık yüzey ve navy metinli olacaktır. Birincil düğme basıldığında hafif ölçek ve opaklık geri bildirimi alacaktır. Her form adımında net ilerleme göstergesi bulunacak; kullanıcı geri gittiğinde girdiği bilgiler korunacaktır. Alt tab bar beş ana hedefe ayrılacaktır: Ana Sayfa, Hizmetler, Teklif, Takip ve Hesabım.

## Önizleme yaklaşımı

İlk teslim, gerçek backend bağlantısı beklemeden değerlendirilebilen zengin ve etkileşimli bir prototip olacaktır. Hizmetler, fiyatlar, sipariş durumu ve örnek müşteri verileri arayüz akışını göstermek için yerel demo verisiyle sunulacak; canlı API entegrasyon noktaları daha sonra bağlanabilir şekilde ayrıştırılacaktır.

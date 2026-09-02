# Mazzgord Görsel Seti ve Yerleşim Önerileri

## Site inceleme özeti

mazzgord.com; Denizli merkezli, Türkiye geneline ve yurt dışına online hizmet veren, İngilizce–Türkçe yeminli tercüme odağına sahip kişisel bir hizmet sitesi olarak konumlanıyor. Ana sayfada özellikle **yeminli tercüme, pasaport/kimlik, diploma/transkript, vize evrakı, noter onayı ve apostil** hizmetleri öne çıkıyor. Süreç bölümü belgenin gönderilmesi, inceleme ve teklif, onay/ödeme, çeviri-kontrol ve teslim adımlarını anlatıyor. Ana görsel dil; sıcak kırık beyaz zemin, koyu kömür/siyah tipografi, adaçayı yeşili vurgu ve sakin-premium bir tonla uyumlu tutuldu.

Ana sayfanın hero alanı şu anda metin merkezli ve geniş boşluklu görünüyor. Bu nedenle ilk görsel, başlık ve CTA düğmelerini kapatmayacak şekilde sağ tarafa ağırlıklandırıldı. Hizmet kartlarında bulunan mevcut 400×128 oranındaki proje görselleri yerine veya onların üstündeki açıklayıcı alanlarda kullanılmak üzere ikinci görsel; noter/apostil anlatımında dikey görsel olarak üçüncü görsel; online hizmet ve “Denizli ve Online” bölümünde dördüncü görsel kullanılabilir.

## Görsel dosyaları

| Dosya | Önerilen kullanım | Oran / kaynak boyut | Kısa açıklama |
|---|---|---:|---|
| `hero-document-translation.jpg` | Hero alanı, başlığın sağındaki arka plan veya bölüm görseli | 16:9, 2560×1440 | Resmî belge, çeviri, kontrol ve güven duygusunu tek karede anlatır; sol taraf metin için boş bırakılmıştır. |
| `official-documents.jpg` | “Hizmetlerimiz”, “Yeminli Tercüme”, diploma/pasaport hizmet kartı veya proje galerisi | 4:3, 2176×1632 | Pasaport, diploma, transkript ve resmî evrakları aynı masa düzeninde gösterir. |
| `apostille-notary.jpg` | “Noter Onaylı Tercüme” ve “Apostil Tercüme” bölümü | 3:4, 1632×2176 | Damga, mühür ve düzenli evrak kompozisyonuyla noter/apostil sürecini sezdirir; üst-sol alan metin bindirmeye uygundur. |
| `online-translation.jpg` | “Denizli ve Online Yeminli Tercüme” veya süreç bölümünün yanında | 16:9, 2560×1440 | Tek kişinin laptop, telefon ve belgelerle uzaktan çalıştığını gösterir; online hizmeti kişisel ve güvenilir hale getirir. |

## En güçlü yerleşim önerisi

**Hero alanında `hero-document-translation.jpg` dosyasını kullanmanızı öneririm.** Görseli tam ekran arka plan yapmak yerine, masaüstünde hero içeriğinin sağ yarısında yaklaşık %48–55 genişlikte bir görsel panel olarak kullanmak daha güvenli olur. Sol taraftaki başlık, açıklama ve “Belgem İçin Teklif Al” / “WhatsApp’tan Gönder” düğmeleri okunaklı kalır. Mobil görünümde görsel başlığın altında, yaklaşık 220–280 px yüksekliğinde ve `object-fit: cover` ile gösterilebilir.

Metinle iç içe soluk görünüm için aynı hero görselinin opaklığını düşürülmüş ikinci bir kullanımını tavsiye ederim. Görseli ayrı bir `<img>` olarak kullanmak yerine hero bölümünün arka plan katmanına alın; üzerine kırık beyazdan yarı saydam bir gradient bindirin. Böylece belge ve masa detayları hissedilir, fakat metnin önüne geçmez.

Örnek CSS yaklaşımı:

```css
.hero-visual {
  position: absolute;
  inset: 0 0 0 42%;
  opacity: 0.18;
  background: url('/images/hero-document-translation.jpg') center / cover no-repeat;
  mask-image: linear-gradient(to right, transparent 0%, black 38%, black 100%);
  pointer-events: none;
}
```

Bu kullanımda içerik katmanı `position: relative; z-index: 1` olmalıdır. Koyu tema için aynı görselin üzerine koyu kömür renkli bir gradient eklenmeli; görselin kendisi yeniden üretilmek zorunda değildir.

## Bölüm bazlı yerleşim

### 1. Hero: güven ve ilk izlenim

`hero-document-translation.jpg` doğrudan “Noter Yeminli İngilizce–Türkçe Tercüme” başlığının karşısına yerleştirilebilir. Görsel üzerindeki belgeler okunamayacak şekilde tasarlandığı için gerçek müşteri verisi riski yaratmaz. Görseli kullanırken kendi sitenizde okunabilir resmî belge gibi görünen yapay metinleri özellikle yakınlaştırmayın; amaç belge türünü anlatmak, belge içeriğini göstermek değildir.

### 2. Hizmetlerimiz: ne yaptığınızı tek bakışta anlatma

`official-documents.jpg`, hizmet kartlarının üstünde veya kartların ilk sırasının yanında kullanılabilir. “Pasaport Çevirisi”, “Diploma Çevirisi” ve “Yeminli Tercüme” başlıklarıyla en güçlü eşleşmeyi yapar. Kart görselleri için `border-radius: 18px`, düşük doygunluk ve hafif gölge mevcut sakin tasarım dilini korur.

### 3. Noter ve apostil: süreçteki uzmanlık

`apostille-notary.jpg` dikey bir kart veya iki kolonlu bölümde kullanılmalıdır. Görselin üst-sol boşluğu, görsel üzerine kısa bir etiket bindirmek için uygundur; ancak uzun paragrafı görselin üstüne yerleştirmek yerine metni görselin yanında tutmak daha erişilebilir olur. Önerilen metin: **“Noter ve apostil sürecinde doğru yönlendirme.”**

### 4. Denizli ve Online: kişisel hizmet duygusu

`online-translation.jpg`, sitenin “Denizli'de ve Online Yeminli Tercüme” bölümünü güçlendirir. Bu fotoğraf, hizmetin bir ajans ekibi tarafından değil, işi bizzat yapan profesyonel bir tercüman tarafından yürütüldüğünü anlatır. Bu, sitedeki “Her işi bizzat ben yapıyorum” mesajıyla doğrudan uyumludur.

## Cloudflare ajanı için üretim istemleri

Aşağıdaki istemler, siteye yeni varyasyonlar üretirken kullanılabilir. Her üretimde **okunabilir kişisel bilgi, sahte logo, ülke bayrağı ve marka adı üretmemesini** açıkça belirtmek önemlidir.

### Hero istemi

> Mazzgord için sıcak kırık beyaz, kömür siyahı ve adaçayı yeşili renk paletine sahip, gerçekçi editorial web hero fotoğrafı oluştur. Konu: İngilizce–Türkçe yeminli tercüme, resmî belge inceleme ve güven. Sağ tarafta açık bir dosya içinde okunamayan resmî evraklar, siyah dolma kalem, küçük adaçayı yeşili mühür ve büyüteç olsun. Sol %45 alanda tamamen sakin, açık renkli ve metin bindirmeye uygun boş alan bırak. 16:9 yatay kompozisyon. Hiçbir okunabilir isim, numara, adres, logo, bayrak veya filigran olmasın. Minimal, premium, doğal pencere ışığı, yumuşak gölgeler.

### Resmî belgeler istemi

> Gerçekçi hizmet bölümü görseli oluştur: pasaport, diploma, transkript, kimlik kartı biçimi ve düzenli belge klasörleri sıcak kırık beyaz bir çalışma masasının üzerinde olsun. Belge yazıları tamamen okunamaz ve kişisel veri içermeyen yumuşak odakta olsun. 4:3 yatay kompozisyon, sade yuvarlatılmış kart içinde kullanılabilir kadraj, kömür siyahı ve adaçayı yeşili küçük vurgu detayları. Logo, bayrak, okunabilir metin ve filigran olmasın.

### Noter/apostil istemi

> Noter onaylı tercüme ve apostil sürecini anlatan gerçekçi dikey editorial fotoğraf oluştur. Açık renkli resmî evraklar, nötr kabartma mühür, siyah kaşe ve düzenli sayfalar görülsün. Üst-sol tarafta geniş ve aydınlık metin güvenli alan bırak; nesneler alt-sağda toplansın. 3:4 dikey kompozisyon, sakin ve güven veren kırık beyaz, kömür ve adaçayı paleti. Hiçbir okunabilir belge metni, gerçek kurum mührü, ülke arması, marka veya filigran olmasın.

### Online hizmet istemi

> Denizli merkezli ve Türkiye geneline online hizmet veren tek kişilik yeminli tercüman için gerçekçi, sıcak ve kişisel bir çalışma ortamı fotoğrafı oluştur. Yetişkin bir profesyonel, ev-ofis masasındaki laptopta belge incelesin; yanında basılı evraklar ve okunamayan genel bir mesajlaşma ekranına sahip telefon olsun. Kişi sağ üçte, sol tarafta web metni için geniş boş duvar alanı bulunsun. 16:9 yatay kompozisyon, doğal gün ışığı, kırık beyaz, ahşap, kömür ve adaçayı tonları. Yüz kimliği önemli değil; okunabilir mesaj, logo, marka veya filigran olmasın.

## Teknik uygulama tavsiyeleri

Görselleri `WebP` formatına dönüştürerek özellikle hero ve online görsellerinin dosya boyutunu düşürmenizi öneririm. Orijinal JPG dosyalarını arşivde tutup web için yaklaşık 1600–1920 px genişliğinde WebP kopyaları kullanmak yeterlidir. Hero görseli ilk ekranda görünüyorsa `preload` veya uygun `fetchpriority` ile; aşağıdaki görseller ise `loading="lazy"` ile yüklenebilir. Görsellere açıklayıcı Türkçe `alt` metni verilmelidir.

| Dosya | Örnek `alt` metni |
|---|---|
| Hero | `İngilizce Türkçe yeminli tercüme için incelenen resmi belgeler` |
| Resmî belgeler | `Pasaport, diploma ve resmi belgelerin çeviri için hazırlanması` |
| Apostil/noter | `Noter onaylı tercüme ve apostil sürecini temsil eden mühürlü belge` |
| Online | `Online çalışan yeminli tercümanın belge ve bilgisayar başındaki çalışma ortamı` |

Sitenizdeki mevcut proje görselleri 400×128 ölçüsünde kullanıldığı için bu yeni görselleri doğrudan o ölçüye zorla sıkıştırmak yerine iki ayrı kullanım üretmek daha iyi olur: proje galerisi için kısa yatay kırpım, açıklayıcı hizmet bölümleri için orijinal orana yakın görsel. Önemli olan görselin çeviri hizmetini anlatmasıdır; gerçeğe benzeyen ama okunabilir sahte belge metni kullanmak güven ve gizlilik açısından doğru değildir.

## Kaynak

[1]: https://mazzgord.com/ "Mazzgord ana sayfası — Denizli yeminli tercüme ve İngilizce–Türkçe çeviri hizmetleri"

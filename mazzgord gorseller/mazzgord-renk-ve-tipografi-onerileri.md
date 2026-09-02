# Mazzgord Renk ve Tipografi Önerileri

## Genel tasarım yönü

Mazzgord için en uygun görsel yön; **ciddi, güvenilir, maskülen ve premium** bir renk anlayışıdır. Mevcut kırık beyaz zemin ve adaçayı yeşili vurgular korunabilir. Başlıklarda ise saf siyah yerine gece laciverti ve koyu petrol tonları kullanılarak daha sofistike bir görünüm elde edilebilir.

Önerilen ana kombinasyon:

> **Kırık beyaz zemin + gece laciverti başlık + koyu petrol vurgu + siyah CTA + sınırlı bronz detay**

Bu kombinasyon, müşteride resmî belge, güvenlik, dikkat, profesyonel sorumluluk ve kurumsal ciddiyet algısı oluşturur.

## Önerilen ana renk paleti

| Kullanım | Renk adı | Hex kodu | Önerilen kullanım |
|---|---|---:|---|
| Ana başlıklar | Gece laciverti | `#17212B` | H1, H2, H3 ve önemli başlıklar |
| Güçlü vurgu başlıkları | Koyu petrol | `#123F46` | Hizmet adı, seçili kelime ve önemli vurgu |
| Normal metin | Kömür grisi | `#3F4548` | Paragraflar, açıklamalar ve yardımcı metinler |
| Küçük üst etiketler | Koyu adaçayı | `#39756D` | “Noter Yeminli Tercüme” gibi küçük kategori etiketleri |
| Ana CTA butonları | Derin kömür/siyah | `#111827` | “Teklif Al”, “Belgem İçin Teklif Al” butonları |
| CTA hover rengi | Koyu petrol | `#123F46` | Buton üzerine gelindiğinde kullanılacak renk |
| İnce detaylar | Bronz-altın | `#A7834B` | Çizgi, ikon, numara, küçük ayraç ve hover detayları |
| Ana arka plan | Sıcak kırık beyaz | `#F8F7F2` | Sayfa ve geniş bölüm arka planı |

## Başlık kullanım hiyerarşisi

Ana hero başlığında `#17212B` kullanılmalıdır. Bu renk saf siyah kadar ciddi görünür; ancak daha sofistike, yumuşak ve premium bir etki bırakır.

Hizmeti doğrudan anlatan kritik kelimeler sınırlı biçimde `#123F46` koyu petrol rengiyle vurgulanabilir.

Örnek:

```text
Noter Yeminli İngilizce–Türkçe Tercüme
```

Önerilen renk uygulaması:

- “Noter Yeminli” → `#17212B`
- “İngilizce–Türkçe” → `#123F46`
- “Tercüme” → `#17212B`

HTML örneği:

```html
<h1>
  Noter Yeminli
  <span class="heading-accent">İngilizce–Türkçe</span>
  Tercüme
</h1>
```

CSS:

```css
h1,
h2,
h3 {
  color: #17212B;
}

.heading-accent {
  color: #123F46;
}
```

Vurguyu her kelimeye uygulamamak gerekir. Yalnızca hizmet yönünü veya müşterinin aradığı ana kavramı açıklayan kelimeler renklendirilmelidir.

## Daha güçlü ve maskülen alternatif palet

Daha koyu, kurumsal ve maskülen bir görünüm istenirse aşağıdaki alternatif kullanılabilir:

| Kullanım | Hex kodu |
|---|---:|
| Ana başlık | `#111827` |
| İkincil başlık | `#263746` |
| Vurgu | `#123F46` |
| Buton | `#0B1117` |
| Buton hover | `#123F46` |
| Normal metin | `#41484D` |
| İnce detay | `#8D6E3F` |

Bronz-altın tonunu özellikle küçük oranlarda kullanmak gerekir. Başlıklarda veya geniş alanlarda yoğun kullanılırsa ciddi tercüme hizmeti algısı zayıflayabilir ve tasarım gereğinden fazla gösterişli görünebilir.

## CSS değişkenleri

```css
:root {
  --bg-warm: #F8F7F2;
  --heading: #17212B;
  --heading-strong: #111827;
  --heading-accent: #123F46;
  --body: #3F4548;
  --sage: #39756D;
  --button: #111827;
  --button-hover: #123F46;
  --gold-detail: #A7834B;
  --white: #FFFFFF;
}

body {
  background-color: var(--bg-warm);
  color: var(--body);
}

h1,
h2,
h3 {
  color: var(--heading);
}

.heading-accent {
  color: var(--heading-accent);
}

.btn-primary {
  background-color: var(--button);
  color: var(--white);
}

.btn-primary:hover {
  background-color: var(--button-hover);
}

.section-label {
  color: var(--sage);
}

.decorative-line,
.decorative-icon {
  color: var(--gold-detail);
}
```

## Buton önerisi

CTA butonları siyaha yakın `#111827` renginde olmalıdır. Bu renk sayfadaki başlıklarla uyum sağlar ve ziyaretçinin dikkatini doğrudan aksiyona yönlendirir.

```css
.btn-primary {
  background: #111827;
  color: #FFFFFF;
  border: 1px solid #111827;
  transition: background-color 180ms ease, transform 180ms ease;
}

.btn-primary:hover {
  background: #123F46;
  border-color: #123F46;
  transform: translateY(-1px);
}

.btn-secondary {
  background: transparent;
  color: #17212B;
  border: 1px solid #39756D;
}

.btn-secondary:hover {
  background: #E8F0ED;
  border-color: #123F46;
  color: #123F46;
}
```

Ana buton için “Belgem İçin Teklif Al”, ikincil buton için “WhatsApp’tan Gönder” metinleri kullanılabilir.

## Font önerisi

Mevcut serif başlık yapısı korunabilir. Daha ciddi ve kontrollü bir etki için şu kombinasyon önerilir:

- Başlık fontu: **Libre Baskerville**, ağırlık `700`
- Gövde fontu: **Inter**, ağırlık `400–500`
- Küçük etiketler: **Inter**, ağırlık `600`

Alternatif başlık fontları:

| Font | Etki |
|---|---|
| Libre Baskerville | Güvenilir, akademik ve resmî |
| DM Serif Display | Daha karakterli ve premium |
| Cormorant Garamond | Zarif, editorial ve seçkin |
| Playfair Display | Mevcut tasarıma yakın, klasik ve şık |

Benim ilk tercihim **Libre Baskerville + Inter** kombinasyonudur. Libre Baskerville resmî belge ve hukuk bağlamına yakışan bir ciddiyet taşırken, Inter gövde metinlerinin modern ve okunaklı kalmasını sağlar.

```css
:root {
  --font-heading: "Libre Baskerville", Georgia, serif;
  --font-body: "Inter", Arial, sans-serif;
}

body {
  font-family: var(--font-body);
}

h1,
h2,
h3,
h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.section-label {
  font-family: var(--font-body);
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```

## Net tavsiye

Mazzgord için uygulanması gereken temel sistem şudur:

1. Sayfa arka planını sıcak kırık beyaz `#F8F7F2` olarak koruyun.
2. Ana başlıkları gece laciverti `#17212B` yapın.
3. “İngilizce–Türkçe”, “Yeminli Tercüme” veya “Noter Onaylı” gibi anahtar kavramları koyu petrol `#123F46` ile sınırlı biçimde vurgulayın.
4. CTA butonlarında `#111827`, hover durumunda `#123F46` kullanın.
5. Bronz-altın `#A7834B` rengini yalnızca küçük dekoratif detaylarda kullanın.
6. Başlıklarda Libre Baskerville, gövde metninde Inter kullanın.

Bu sistem, mevcut sıcak ve kişisel tasarımı korurken Mazzgord’u daha **ciddi, güvenilir, profesyonel ve maskülen** gösterir.

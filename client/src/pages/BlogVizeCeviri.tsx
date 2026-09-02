import BlogLayout from "@/components/BlogLayout"

export default function BlogVizeCeviri() {
  return (
    <BlogLayout
      title="İngiltere Vize Başvurusu İçin Çeviri Rehberi | Mazzgord"
      description="İngiltere vize başvurusu için hangi belgelerin çevirisi gerekir? Certified translation nedir, apostil gerekir mi, süreç nasıl işler? Gerçek müşteri deneyimiyle adım adım anlatım."
      canonical="https://mazzgord.com/blog/vize-ceviri"
      date="10 Mayıs 2026"
      illustration="vize"
      jsonLd={JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "headline": "İngiltere Vize Başvurusu İçin Çeviri Rehberi",
            "description": "İngiltere vize başvurusu için hangi belgelerin çevirisi gerekir? Certified translation nedir, apostil gerekir mi, süreç nasıl işler? Gerçek müşteri deneyimiyle adım adım anlatım.",
            "datePublished": "2026-05-10",
            "dateModified": "2026-08-28",
            "author": { "@type": "Organization", "name": "Mazzgord Çeviri Hizmetleri" },
            "publisher": { "@type": "Organization", "name": "Mazzgord Çeviri Hizmetleri", "url": "https://mazzgord.com" },
            "mainEntityOfPage": "https://mazzgord.com/blog/vize-ceviri",
            "image": "https://mazzgord.com/og-image.png"
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "İngiltere vize başvurusu için hangi belgelerin çevirisi gerekir?", "acceptedAnswer": { "@type": "Answer", "text": "Pasaport, nüfus cüzdanı, evlilik cüzdanı, banka hesap dokümanları, tapu, maaş bordrosu, vergi levhası ve imza sirküleri gibi belgelerin yeminli tercüme ile çevirisi istenir." } },
              { "@type": "Question", "name": "İngiltere vize başvurusu için apostil gerekir mi?", "acceptedAnswer": { "@type": "Answer", "text": "İngiltere göçmenlik idaresi genellikle certified translation yeterli görür ve apostil istemez. Ancak vize türünüze göre değişebilir." } },
              { "@type": "Question", "name": "Certified translation nedir?", "acceptedAnswer": { "@type": "Answer", "text": "Certified translation, yeminli tercüman tarafından yapılan, imzalı ve kaşeli, çevirinin doğruluğunu taahhüt eden çeviridir. İngiltere vize başvurularında bu tür çeviri kabul edilir." } },
              { "@type": "Question", "name": "İngiltere vize çevirisi ne kadar sürer?", "acceptedAnswer": { "@type": "Answer", "text": "Belge sayısına göre değişir. 6-10 sayfalık bir belge seti 1-3 gün içinde teslim edilebilir." } }
            ]
          }
        ]
      })}
    >
<p className="text-xl leading-relaxed">İngiltere vize başvurusu yaparken en çok sorulan sorulardan biri: <strong>"Belgelerimi kim çevirecek ve hangi formatta olmalı?"</strong> Bu soru çok kritik çünkü yanlış çeviri veya yanlış format, vize reddine yol açabilir.</p>

<p>Bu rehberde, İngiltere vize başvurusu için çeviri sürecini gerçek bir müşteri deneyimi üzerinden anlatacağım. Mart ayında bir müşterim standart visitor vizesi için bana ulaştı — 25 Mart randevusu vardı ve 16 sayfalık belge seti gerekiyordu. O sürecten öğrendiklerimizi burada paylaşacağım.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">İngiltere Konsolosluğu Çeviri İçin Ne İster?</h2>
<p>İngiltere konsolosluğu, Türkçe belgelerin İngilizceye <strong>yeminli tercüme</strong> ile çevrilmesini zorunlu kılar. Çevirinin her sayfası yeminli tercümanın imzasını ve kaşesini taşımalıdır. Ayrıca çevirmenin iletişim bilgileri de belirtilmelidir.</p>

<p>Önemli bir detay: İngiltere göçmenlik idaresi genellikle <strong>certified translation</strong> yeterli görür ve apostil istemez. Bu, süreci hızlandıran bir avantaj. Ancak vize türünüze göre şartlar değişebilir — başvuru yapacağınız kurumun güncel gereksinimlerini kontrol etmeniz önemlidir.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Hangi Belgelerin Çevirisi Gerekir?</h2>
<p>İngiltere vize başvurusunda genellikle şu belgelerin çevirisi istenir:</p>
<ul className="space-y-3 my-4 pl-6 list-disc">
  <li><strong>Pasaport</strong> (kimlik bilgileri sayfası)</li>
  <li><strong>Nüfus cüzdanı</strong> veya vukuatlı nüfus kayıt örneği</li>
  <li><strong>Evlilik cüzdanı</strong> (eşli başvurularda)</li>
  <li><strong>Banka hesap dokümanları</strong> — mali durum kanıtı</li>
  <li><strong>Tapu ve mülkiyet belgeleri</strong> — varlık kanıtı</li>
  <li><strong>Çalışma belgesi ve maaş bordrosu</strong> — gelir kanıtı</li>
  <li><strong>Vergi levhası</strong> (şirket sahipleri için)</li>
  <li><strong>İmza sirküleri</strong> (şirket sahipleri için)</li>
  <li><strong>Emekli aylık bilgisi</strong> (emekliler için)</li>
  <li><strong>Adli sicil kaydı</strong> (bazı vize türlerinde)</li>
</ul>

<div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-8">
  <h3 className="text-lg font-bold text-primary mb-3">İpucu: Bazı Belgeler İngilizce Alınabilir</h3>
  <p className="text-muted-foreground">İkametgah ve adli sicil kaydı gibi bazı belgeler e-devlet üzerinden İngilizce alınabiliyor. Bu, çeviri maliyetinizi düşürür. Çeviriciye danışın.</p>
</div>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Gerçek Deneyim: Mart Ayında Bir Müşteri</h2>
<p>Mart ayında bir müşteri, standart visitor vizesi için bana ulaştı. 25 Mart randevusu vardı ve yaklaşık 16 sayfalık belgesi olacağını söyledi. Süreç şöyle ilerledi:</p>

<h3 className="text-xl font-bold text-primary mt-8 mb-4">Belgelerde Hata: Yanlış Çıkarılmış Vukuatlı Kayıtlar</h3>
<p>Müşteri belgeleri göndermeye başladığında bir sorun çıktı: <strong>vukuatlı nüfus belgelerini yanlış çıkarmıştı</strong>. İki belgede de hata vardı. Bu tür durumlar çok yaygın — e-devlet üzerinden yanlış belge türü seçilebilir veya bilgiler eksik olabilir. <strong>Çeviri başlamadan önce belgelerin doğru ve eksiksiz olması şarttır.</strong> Yanlış belgeyi çevirmek hem zaman kaybı hem de maliyet demektir.</p>

<h3 className="text-xl font-bold text-primary mt-8 mb-4">Fiyatlandırma ve Teslim</h3>
<p>Sayfa başı 450 TL üzerinden fiyatlandırma yaptık. Müşteri 6 belge üzerinden teklif göndermemi istedi, kalan 3 belgeyi ertesi gün ileteceğini söyledi. 25 Mart randevusuna yetiştirmeyi taahhüt ettim. İlk 6 belgeyi bir günde çevirip teslim ettim. Toplam 9 belge 3 gün içinde tamamlandı.</p>

<h3 className="text-xl font-bold text-primary mt-8 mb-4">Orijinal Belge ve Barkodlar</h3>
<p>Teslim sırasında müşteri, belgelerin sonuna orijinal belgelerin eklenmemiş olmasını ve QR/barkodların görünmediğini fark edip uyardı. Bu önemli bir detay — bazı kurumlar orijinal belgeyi ve barkodları görmek isteyebilir. Orijinal belgeleri ekleyerek QR/barkodların görünmesini sağladım.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Çeviri Sürecinde Dikkat Edilmesi Gerekenler</h2>
<p>Yıllar içinde edindiğim tecrübeyle, vize çevirisinde şu noktalara dikkat ediyorum:</p>
<ul className="space-y-3 my-4 pl-6 list-disc">
  <li><strong>Tarihler ve tutarlar:</strong> Kaynak belgeyle birebir uyumlu olmalı. Herhangi bir tutarsızlık vize reddine yol açabilir.</li>
  <li><strong>İsimler ve unvanlar:</strong> Pasaportta yazan isim formatına birebir uygun olmalı.</li>
  <li><strong>İmza ve kaşe:</strong> Her sayfada yeminli tercüman imzası ve kaşesi olmalı.</li>
  <li><strong>Orijinal belge eki:</strong> Bazı kurumlar çevirinin sonuna orijinal belge eklenmesini ister.</li>
  <li><strong>Format:</strong> Belgenin okunaklı ve düzenli olması, konsolosluk memurunun işini kolaylaştırır.</li>
</ul>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">İngiltere Vize Çevirisi Fiyatı 2026</h2>
<p>İngiltere vize başvurusu için belge çevirisi fiyatı, <strong>sayfa başı 450 TL'den</strong> başlar. Fiyatı etkileyen faktörler:</p>
<ul className="space-y-2 my-4 pl-6 list-disc">
  <li><strong>Sayfa sayısı:</strong> Belge ne kadar çoksa, toplam maliyet o kadar artar.</li>
  <li><strong>Belge türü:</strong> Vukuatlı nüfus kayıt örneği gibi karmaşık belgeler daha fazla dikkat gerektirir.</li>
  <li><strong>Teslim süresi:</strong> Acil teslimat (aynı gün) için ek ücret uygulanabilir.</li>
</ul>
<p>Net fiyat teklifi için belgelerinizin fotoğrafını WhatsApp üzerinden gönderin.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">İngiltere Vize Çevirisi Online Yapılır mı?</h2>
<p>Evet, tamamen online yapılır. Belgelerinizi PDF veya fotoğraf olarak WhatsApp veya <a href="/teklif" className="text-primary font-semibold hover:underline">teklif formu</a> üzerinden göndermeniz yeterli. Çeviri tamamlandığında, imzalı ve kaşeli PDF olarak teslim edilir. Sisteme yüklemeniz için dijital format yeterlidir.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Sıkça Sorulan Sorular</h2>
<div className="space-y-4 mt-6">
  <div className="p-5 bg-slate-50 rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">İngiltere vize başvurusu için hangi belgelerin çevirisi gerekir?</h3><p className="text-muted-foreground">Pasaport, nüfus cüzdanı, evlilik cüzdanı, banka hesap dokümanları, tapu, maaş bordrosu, vergi levhası ve imza sirküleri gibi belgelerin yeminli tercüme ile çevirisi istenir.</p></div>
  <div className="p-5 bg-slate-50 rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">İngiltere vize başvurusu için apostil gerekir mi?</h3><p className="text-muted-foreground">İngiltere göçmenlik idaresi genellikle certified translation yeterli görür ve apostil istemez. Ancak vize türünüze göre değişebilir.</p></div>
  <div className="p-5 bg-slate-50 rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Certified translation nedir?</h3><p className="text-muted-foreground">Certified translation, yeminli tercüman tarafından yapılan, imzalı ve kaşeli, çevirinin doğruluğunu taahhüt eden çeviridir. İngiltere vize başvurularında bu tür çeviri kabul edilir.</p></div>
  <div className="p-5 bg-slate-50 rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">İngiltere vize çevirisi ne kadar sürer?</h3><p className="text-muted-foreground">Belge sayısına göre değişir. 6-10 sayfalık bir belge seti 1-3 gün içinde teslim edilebilir.</p></div>
</div>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Sonuç</h2>
<p>İngiltere vize başvurusu için belge çevirisi, doğru tercümanla düzgün yapıldığında sorunsuz bir süreçtir. Belgeleri doğru çıkarmak, certified translation yeterliliğini bilmek, orijinal belge ve barkodları eklemek ve iyi iletişim — bunlar başarılı bir vize çevirisinin anahtarlarıdır.</p>
<p>İngiltere vize çevirisi için <a href="/teklif" className="text-primary font-semibold hover:underline">teklif formundan</a> bana ulaşabilir veya WhatsApp üzerinden belgelerinizi gönderebilirsiniz.</p>

<div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-8">
  <h3 className="text-lg font-bold text-primary mb-3">İlgili Sayfalar</h3>
  <ul className="space-y-2">
    <li><a href="/vize-ceviri" className="text-primary hover:underline">Vize Çeviri Hizmeti</a></li>
    <li><a href="/yeminli-tercume" className="text-primary hover:underline">Yeminli Tercüme</a></li>
    <li><a href="/blog/ingiltere-vize-cevirisi-gercek-vaka" className="text-primary hover:underline">İngiltere Vize Çevirisi: Gerçek Müşteri Deneyimi</a></li>
  </ul>
</div>
    </BlogLayout>
  )
}

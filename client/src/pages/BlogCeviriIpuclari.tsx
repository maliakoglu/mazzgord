import BlogLayout from "@/components/BlogLayout"

export default function BlogCeviriIpuclari() {
  return (
    <BlogLayout
      title="İngilizce-Türkçe Çeviride Yapılan Yaygın Hatalar | Mazzgord"
      description="İngilizce-Türkçe çeviride en sık yapılan hatalar ve nasıl önlenebilecekleri. Gerçek müşteri deneyimlerinden örneklerle çeviri kalitesini artırın."
      canonical="https://mazzgord.com/blog/ceviri-ipuclari"
      date="1 Mayıs 2026"
      illustration="ipuclari"
      jsonLd={JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Article",
            "headline": "İngilizce-Türkçe Çeviride Yapılan Yaygın Hatalar",
            "description": "İngilizce-Türkçe çeviride en sık yapılan hatalar ve nasıl önlenebilecekleri. Gerçek müşteri deneyimlerinden örneklerle çeviri kalitesini artırın.",
            "datePublished": "2026-05-01",
            "dateModified": "2026-08-28",
            "author": { "@type": "Organization", "name": "Mazzgord Çeviri Hizmetleri" },
            "publisher": { "@type": "Organization", "name": "Mazzgord Çeviri Hizmetleri", "url": "https://mazzgord.com" },
            "mainEntityOfPage": "https://mazzgord.com/blog/ceviri-ipuclari",
            "image": "https://mazzgord.com/og-image.png"
          }
        ]
      })}
    >
<p className="text-xl leading-relaxed">Yıllar içinde yüzlerce belge çevirdim ve müşterilerimin yaşadığı sorunları gördüm. İngilizce-Türkçe çeviri, iki dilin yapısal farklılıkları nedeniyle özel zorluklar barındırır. Bu yazıda, en sık yapılan hataları ve nasıl önlenebileceklerini <strong>gerçek müşteri deneyimlerinden örneklerle</strong> anlatacağım.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">1. Kelimesi Kelimesine Çeviri</h2>
<p>En yaygın hata, İngilizce cümleyi kelime kelime Türkçeye aktarmaktır. İngilizce ve Türkçe dil yapıları farklıdır — İngilizce özne-nesne-yüklek düzenine sahipken Türkçe özne-yüklem-nesne düzenini kullanır. Kelimesi kelimesine çeviri anlamsız ve doğal olmayan cümleler üretir.</p>
<p>Örneğin, "The application must be submitted in person" cümlesi kelimesi kelimesine "Uygulama şahsen sunulmalıdır" olarak çevrilebilir — ama doğru çeviri "Başvuru şahsen yapılmalıdır" şeklindedir. "Application" kelimesi her durumda "uygulama" anlamına gelmez.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">2. Deyim ve Atasözlerinin Yanlış Çevirisi</h2>
<p>İngilizce deyimler Türkçede farklı ifadelerle karşılanır. "Break a leg" deyimi "bacak kır" değil "bol şans" olarak çevrilmelidir. Bu tür hatalar özellikle mektup ve e-posta çevirilerinde sık karşılaşılan sorunlardan biridir.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">3. Dilbilgisi Hataları</h2>
<p>İngilizcede sıfat isimden önce gelirken Türkçede isimden sonra gelir. Bu yapısal fark dilbilgisi hatalarına yol açabilir. "Official document" ifadesi "resmi belge" olarak çevrilir — sıfatın yeri değişir.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">4. Tarih ve Sayı Formatları</h2>
<p>Bu hata, vize başvurularında en sık karşılaştığım sorunlardan biri. İngilizcede tarih formatı Türkçeden farklıdır. Örneğin <strong>03/05/2026</strong> İngilizcede 5 Mart iken Türkçede 3 Mayıs olabilir. Tarih, para birimi ve ölçü birimleri çevirisinde dikkatli olmak gerekir.</p>
<p>Geçen ay bir müşterinin vize başvurusu için belgelerini çevirirken, banka hesap dokümanındaki tarih formatını dikkatle kontrol ettim — yanlış tarih çevirisi vize reddine yol açabilirdi. Resmi belgelerde bu tür hatalar başvuru süreçlerini olumsuz etkiler.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">5. Tutarlılık Eksikliği</h2>
<p>Uzun belgelerde aynı terimlerin farklı şekilde çevrilmesi yaygın bir hatadır. Örneğin bir belgede "certificate" kelimesi önce "sertifika" sonra "belge" olarak çevrilirse, okuyucu bunların farklı şeyler olduğunu düşünebilir. Terminoloji tutarlılığı için terim sözlüğü oluşturmak ve belge boyunca aynı çeviriyi kullanmak esastır.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">6. Kültürel Uyumsuzluk</h2>
<p>Çeviri sadece dil aktarımı değil kültür aktarımıdır. Kaynak dilin kültürel referansları hedef dilin kültürüne uygun şekilde aktarılmalıdır. Örneğin "notary public" ifadesi Türkçeye "noter" olarak çevrilir, ama Amerika'daki notary public ile Türkiye'deki noter arasında yetki farkları vardır. Bu tür kültürel farklar çeviride dikkate alınmalıdır.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">7. Pasif ve Aktif Cümle Yapısı</h2>
<p>İngilizce pasif cümleleri Türkçeye çevirirken aktif yapı tercih edilebilir. "The document was signed by the officer" cümlesi Türkçeye "Belgeyi memur imzaladı" şeklinde daha doğal bir aktif yapıyla çevrilebilir. Pasif ve aktif yapıyı doğru kullanmak çevirinin akıcılığını artırır.</p>

<h2 className="text-2xl md:text-3xl font-bold text-primary mt-12 mb-6">Çeviri Hatalarını Önlemek İçin Ne Yapmalı?</h2>
<p>Bu hataları önlemenin en etkili yolu, çeviriyi kaynak metinle karşılaştırarak kontrol etmektir. Her çeviriyi teslim öncesinde isim, tarih, sayı ve kurum adları açısından ikinci kez kontrol ederim. Özellikle vize ve göçmenlik başvurularında bir tek harf hatası bile ret sebebi olabilir.</p>
<p>Müşterilerimden gelen geri bildirimler, bu kontrol sürecinin değerini kanıtlıyor. Geçen ay bir müşteri, teslim ettiğim çevirideki tarih formatını kontrol edip teşekkür etti — "Başka bir yerde yaptırdığımda tarihi yanlış çevirmişlerdi, sizin çevirinizde her şey tamdı" dedi. Bu tür geri bildirimler, dikkatli kontrolün önemini gösteriyor.</p>

<div className="bg-primary/5 p-6 rounded-xl border border-primary/10 my-8">
  <h3 className="text-lg font-bold text-primary mb-3">İpucu</h3>
  <p className="text-muted-foreground">Çeviri yaptırmadan önce belgenizi net bir şekilde gönderin. Belge ne kadar netse, çeviri o kadar doğru olur. Taranmış belgelerde okunmayan alanlar varsa, o kısımları ayrıca net bir şekilde iletin.</p>
</div>

<div className="mt-8 p-6 bg-secondary/30 rounded-xl border border-border">
  <h3 className="text-lg font-bold text-primary mb-4">İlgili Hizmetler</h3>
  <div className="grid md:grid-cols-2 gap-4">
    <a href="/ingilizce-turkce-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce-Türkçe Çeviri</a>
    <a href="/yeminli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Yeminli Tercüme</a>
  </div>
</div>
    </BlogLayout>
  );
}

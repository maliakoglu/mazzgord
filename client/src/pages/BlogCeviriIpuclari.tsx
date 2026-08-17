import BlogLayout from "@/components/BlogLayout"

export default function BlogCeviriIpuclari() {
  return (
    <BlogLayout
      title="İngilizce-Türkçe Çeviride Yapılan Yaygın Hatalar | Mazzgord"
      description="İngilizce-Türkçe çeviride en sık yapılan hataları ve nasıl önlenebileceklerini açıklıyoruz."
      canonical="https://mazzgord.com/blog/ceviri-ipuclari"
      date="1 Mayıs 2026"
      illustration="ipuclari"
    >
<p className="text-muted-foreground leading-relaxed">İngilizce-Türkçe çeviri, iki dilin yapısal farklılıkları nedeniyle özel zorluklar barındırır. Bu yazıda çeviride en sık yapılan hataları ve nasıl önlenebileceklerini açıklıyoruz.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">1. Kelimesi Kelimesine Çeviri</h2>
          <p className="text-muted-foreground leading-relaxed">En yaygın hata, İngilizce cümleyi kelime kelime Türkçeye aktarmaktır. İngilizce ve Türkçe dil yapıları farklıdır. Kelimesi kelimesine çeviri anlamsız ve doğal olmayan cümleler üretir.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">2. Deyim ve Atasözlerinin Yanlış Çevirisi</h2>
          <p className="text-muted-foreground leading-relaxed">İngilizce deyimler Türkçede farklı ifadelerle karşılanır. Break a leg deyimi bacak kır değil bol şans olarak çevrilmelidir.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">3. Dilbilgisi Hataları</h2>
          <p className="text-muted-foreground leading-relaxed">İngilizcede sıfat isimden önce gelirken Türkçede isimdan sonra gelir. Bu yapısal fark dilbilgisi hatalarına yol açabilir.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">4. Kültürel Uyumsuzluk</h2>
          <p className="text-muted-foreground leading-relaxed">Çeviri sadece dil aktarımı değil kültür aktarımıdır. Kaynak dilin kültürel referansları hedef dilin kültürüne uygun şekilde aktarılmalıdır.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">5. Tutarlılık Eksikliği</h2>
          <p className="text-muted-foreground leading-relaxed">Uzun belgelerde aynı terimlerin farklı şekilde çevrilmesi yaygın bir hatadır. Terminoloji sözlüğü oluşturmak ve belge boyunca tutarlı çeviri yapmak esastır.</p>
        <div className="mt-8 p-6 bg-secondary/30 rounded-xl border border-border">
          <h3 className="text-lg font-bold text-primary mb-4">İlgili Hizmetler</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/ingilizce-turkce-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce-Türkçe Çeviri</a>
            <a href="/yeminli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Yeminli Tercüme</a>
          </div>
        </div>
    </BlogLayout>
  )
}

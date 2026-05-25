import { ArrowLeft } from "lucide-react";
export default function BlogCeviriIpuclari() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Blog</a>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-4">İngilizce-Türkçe Çeviride Yapılan Yaygın Hatalar</h1>
        <p className="text-muted-foreground mb-8">1 Mayıs 2026 · Mazzgord Çeviri Hizmetleri</p>
        <div className="prose prose-lg max-w-none space-y-6">
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
        </div>
      </div>
    </div>
  );
}

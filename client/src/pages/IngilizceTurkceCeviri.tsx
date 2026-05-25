import { ArrowLeft, CheckCircle2, Languages, MessageSquare, Zap } from "lucide-react";
export default function IngilizceTurkceCeviri() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-4">İngilizce-Türkçe Çeviri Hizmeti | Denizli</h1>
        <p className="text-xl text-muted-foreground mb-8">İngilizce-Türkçe ve Türkçe-İngilizce profesyonel çeviri hizmetleri. Yeminli tercüme, teknik çeviri, akademik çeviri ve vize başvurusu çevirisi.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Languages className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Çift Yönlü Çeviri</h3><p className="text-muted-foreground text-sm">İngilizceden Türkçeye ve Türkçeden İngilizeye profesyonel çeviri.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><MessageSquare className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Ana Dil Doğruluğu</h3><p className="text-muted-foreground text-sm">Ana dili Türkçe olan çevirmenlerimizle doğal ve akıcı çeviri.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Zap className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Hızlı Teslimat</h3><p className="text-muted-foreground text-sm">Acil projeler için aynı gün teslimat seçeneği.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">İngilizce-Türkçe Çeviri</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">İngilizce-Türkçe dil çifti, Türkiye'de en çok talep edilen çeviri dil çiftidir. Küreselleşen dünyada İngilizce, iş dünyasının, akademinin ve uluslararası ilişkilerin ortak dili haline gelmiştir. Bu nedenle İngilizce-Türkçe çeviri hizmeti, bireyler ve kurumlar için vazgeçilmez bir ihtiyaçtır.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">İngilizce-Türkçe çeviride en büyük zorluk, iki dilin yapısal farklılıklarıdır. İngilizce Hint-Avrupa dil ailesine ait bir dilken Türkçe Ural-Altay dil ailesine mensuptur. Bu yapısal farklılık, kelime dizimi, zaman kullanımı ve ifade biçimleri üzerinde doğrudan etkili olur. Deneyimli bir çevirmen, bu farklılıkları göz önünde bulundurarak kaynak metnin anlamını hedef dilde en doğru şekilde aktarır.</p>
          <p className="text-muted-foreground leading-relaxed">Mazzgord olarak İngilizce-Türkçe çevirilerinizi ana dili Türkçe olan uzman çevirmenlerimizle gerçekleştiriyoruz. Her projede doğruluk, tutarlılık ve okunabilirlik ilkelerine bağlı kalıyoruz.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İngilizce-Türkçe Çeviri Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Yeminli İngilizce-Türkçe çeviri","Teknik İngilizce-Türkçe çeviri","Akademik İngilizce-Türkçe çeviri","Vize başvurusu İngilizce çeviri","Hukuki İngilizce-Türkçe çeviri","Tıbbi İngilizce-Türkçe çeviri","Web sitesi İngilizce-Türkçe çeviri","İş İngilizcesi çeviri","E-posta ve yazışma çevirisi","Sözleşme çevirisi","Katalog ve broşür çevirisi","Sunum çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">İngilizce-Türkçe Çeviri Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Belgenizi gönderin, ücretsiz teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Alın</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

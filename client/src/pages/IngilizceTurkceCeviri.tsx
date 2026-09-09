import { CheckCircle2, Languages, MessageSquare, Zap } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { useState } from "react";
export default function IngilizceTurkceCeviri() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Breadcrumb items={[{label: "Hizmetler", href: "/"}, {label: "İngilizce-Türkçe Çeviri"}]} />
        <h1 className="text-4xl font-bold text-primary mb-4">İngilizce-Türkçe Çeviri Hizmeti | Denizli</h1>
        <p className="text-xl text-muted-foreground mb-8">İngilizce-Türkçe ve Türkçe-İngilizce profesyonel çeviri hizmetleri. Yeminli tercüme, teknik çeviri, akademik çeviri ve vize başvurusu çevirisi.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Languages className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Çift Yönlü Çeviri</h3><p className="text-muted-foreground text-sm">İngilizceden Türkçeye ve Türkçeden İngilizeye profesyonel çeviri.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><MessageSquare className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Ana Dil Doğruluğu</h3><p className="text-muted-foreground text-sm">Ana dili Türkçe olan yeminli tercüman olarak doğal ve akıcı çeviri.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Zap className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Zamanında Teslim</h3><p className="text-muted-foreground text-sm">Acil projelerde teslim kapasiteye bağlı değerlendirilir.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">İngilizce-Türkçe Çeviri</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">İngilizce-Türkçe dil çifti, Türkiye'de en çok talep edilen çeviri dil çiftidir. Küreselleşen dünyada İngilizce, iş dünyasının, akademinin ve uluslararası ilişkilerin ortak dili haline gelmiştir. Bu nedenle İngilizce-Türkçe çeviri hizmeti, bireyler ve kurumlar için vazgeçilmez bir ihtiyaçtır.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">İngilizce-Türkçe çeviride en büyük zorluk, iki dilin yapısal farklılıklarıdır. İngilizce Hint-Avrupa dil ailesine ait bir dilken Türkçe Ural-Altay dil ailesine mensuptur. Bu yapısal farklılık, kelime dizimi, zaman kullanımı ve ifade biçimleri üzerinde doğrudan etkili olur. Bu farklılıkları göz önünde bulundurarak kaynak metnin anlamını hedef dilde en doğru şekilde aktarmaya çalışıyorum.</p>
          <p className="text-muted-foreground leading-relaxed">İngilizce-Türkçe çevirilerinizi ana dili Türkçe olan yeminli tercüman olarak yapıyorum. Her projede doğruluk, tutarlılık ve okunabilirlik ilkelerine bağlı kalıyorum.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İngilizce-Türkçe Çeviri Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Yeminli İngilizce-Türkçe çeviri","Teknik İngilizce-Türkçe çeviri","Akademik İngilizce-Türkçe çeviri","Vize başvurusu İngilizce çeviri","Hukuki İngilizce-Türkçe çeviri","Tıbbi İngilizce-Türkçe çeviri","Web sitesi İngilizce-Türkçe çeviri","İş İngilizcesi çeviri","E-posta ve yazışma çevirisi","Sözleşme çevirisi","Katalog ve broşür çevirisi","Sunum çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-2">İngilizce-Türkçe çeviri ne kadar sürer?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Standart belgeler çoğunlukla 1-3 iş günü içinde teslim edilir. Belge yoğunluğu ve teslim tarihi net teklifte belirtilir.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-2">Yeminli tercüme mi, normal çeviri mi gerekiyor?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Resmi belgeler için yeminli tercüme, genel metinler için normal çeviri yeterlidir. Belgenin kullanım amacına göre hangi türün gerektiğini birlikte değerlendiririz.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-2">Fiyat nasıl belirlenir?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Belge türü, sayfa sayısı, metin yoğunluğu, teslim tarihi ve dil çifti fiyatı etkiler. Kesin fiyat belge görüldükten sonra belirlenir.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-2">Online çeviri yapıyor musunuz?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Evet, belgelerinizi WhatsApp veya e-posta ile gönderebilir, dijital teslim alabilirsiniz. Yeminli tercüme gerekiyorsa fiziksel teslim kargo ile yapılır.</p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İlgili Blog Yazıları</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <a href="/blog/ingilizce-turkce-deyim-cevirisi" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce-Türkçe Deyim Çevirisi</a>
            <a href="/blog/google-translate-vs-profesyonel-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Google Translate mi, Profesyonel Çeviri mi?</a>
            <a href="/blog/ingilizce-edebi-metin-cevirisi" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce Edebi Metin Çevirisi</a>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-6">Diğer Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/yeminli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Yeminli Tercüme</a>
            <a href="/teknik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teknik Çeviri</a>
            <a href="/akademik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Akademik Çeviri</a>
            <a href="/vize-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Vize Çeviri</a>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">İngilizce-Türkçe Çeviri Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Belgenizi gönderin, net teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Belgem İçin Teklif Al</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ArrowLeft, CheckCircle2, Shield, Clock, FileText } from "lucide-react";
export default function YeminliTercume() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-4">Yeminli Tercüme Hizmeti | Denizli</h1>
        <p className="text-xl text-muted-foreground mb-8">Denizli'de profesyonel yeminli tercüme hizmetleri. Resmi belgeleriniz için güvenilir ve doğru çeviri çözümleri.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Shield className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Resmi Geçerlilik</h3><p className="text-muted-foreground text-sm">Yeminli tercümanlarımızın imzası tüm resmi kurumlarda geçerlidir.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Clock className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Hızlı Teslimat</h3><p className="text-muted-foreground text-sm">Acil talepleriniz için aynı gün teslimat seçeneği sunuyoruz.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><FileText className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Geniş Belge Yelpazesi</h3><p className="text-muted-foreground text-sm">Nüfus cüzdanı, diploma, sabıka kaydı ve daha fazlası.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Yeminli Tercüme Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Yeminli tercüme, yeminli tercümanlar tarafından yapılan ve noter onayı gerektirmeyen resmi çeviri işlemidir. Yeminli tercüman, yeminname vererek çevirisinin doğru ve eksiksiz olduğunu taahhüt eder. Bu çeviriler, mahkemeler, konsolosluklar, üniversiteler ve diğer resmi kurumlar tarafından kabul edilir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Türkiye'de yeminli tercümanlık, 6325 sayılı Yeminli Mali Müşavirlik ve Yeminli Tercümanlık Kanunu ile düzenlenmiştir. Yeminli tercümanlar, noter huzurunda yemin ederek bu unvanı alır ve yaptıkları çeviriler resmi belge niteliği taşır.</p>
          <p className="text-muted-foreground leading-relaxed">Yeminli tercüme, özellikle yurt dışı başvurularında, vize işlemlerinde, göçmenlik dosyalarında ve üniversite başvurularında zorunlu bir belgedir. Yanlış veya eksik çeviri, başvurunun reddedilmesine neden olabilir.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Yeminli Tercüme Yapılan Belgeler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Nüfus cüzdanı çevirisi","Pasaport çevirisi","Diploma ve transkript çevirisi","Sabıka kaydı çevirisi","Evlilik cüzdanı çevirisi","İkametgâh çevirisi","Sürücü belgesi çevirisi","Vergi levhası çevirisi","İmza sirküleri çevirisi","Faaliyet belgesi çevirisi","Sağlık raporu çevirisi","Adli sicil kaydı çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Denizli'de Yeminli Tercüme</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Mazzgord olarak Denizli'de yeminli tercüme hizmeti sunuyoruz. Denizli Adliyesi, Denizli Valiliği, Pamukkale Üniversitesi ve diğer kurumlar tarafından kabul edilen yeminli tercümelerimizle resmi işlemlerinizi sorunsuz bir şekilde tamamlayabilirsiniz.</p>
          <p className="text-muted-foreground leading-relaxed">WhatsApp üzerinden 7/24 ulaşabilir, belgenizin fotoğrafını göndererek ücretsiz fiyat teklifi alabilirsiniz.</p>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Yeminli Tercüme Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Belgenizi gönderin, ücretsiz teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Alın</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp ile Ulaşın</a>
          </div>
        </div>
      </div>
    </div>
  );
}

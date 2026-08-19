import { ArrowLeft, CheckCircle2, Plane, FileCheck, Stamp } from "lucide-react";
import { useState } from "react";
export default function VizeCeviri() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
          <div className="hidden md:flex gap-8">
            <a href="/fiyatlar" className="text-foreground hover:text-primary transition">Fiyatlar</a>
            <a href="/blog" className="text-foreground hover:text-primary transition">Blog</a>
            <a href="/hakkimizda" className="text-foreground hover:text-primary transition">Hakkımda</a>
            <a href="/teklif" className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition no-underline">Teklif Al</a>
                      </div>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none z-60"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
          </button>
          {mobileOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setMobileOpen(false)}
              ></div>
              <div className="fixed top-0 right-0 w-72 h-full bg-background z-50 shadow-2xl p-8 pt-24 flex flex-col gap-2 md:hidden">
                <a href="/fiyatlar" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Fiyatlar</a>
                <a href="/blog" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Blog</a>
                <a href="/hakkimizda" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Hakkımda</a>
                <a href="/teklif" className="block px-4 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Teklif Al</a>
                              </div>
            </>
          )}
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-4">Vize Başvurusu Çevirisi | Denizli</h1>
        <p className="text-xl text-muted-foreground mb-8">İngiltere, ABD, Almanya ve diğer ülke vize başvuruları için yeminli tercüme hizmeti. Konsolosluk kabul şartlarına uygun çeviri.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Plane className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Vize Uzmanlığı</h3><p className="text-muted-foreground text-sm">İngiltere, ABD, Schengen vize başvurularında deneyimli.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><FileCheck className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Konsolosluk Onaylı</h3><p className="text-muted-foreground text-sm">Çoğu konsolosluk tarafından kabul edilen yeminli çeviri; başvuru yapacağınız kurumun güncel şartlarını kontrol edin.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Stamp className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Yeminli Tercüme</h3><p className="text-muted-foreground text-sm">Yeminli tercüman imzası ve kaşesi ile resmi geçerlilik.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Vize Başvurusu İçin Çeviri</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Vize başvuruları, her ülkenin konsolosluğunun belirlediği kurallara göre yürütülen hassas işlemlerdir. Başvuru dosyasındaki belgelerin çevirisi, konsolosluğun istediği formata ve standartlara uygun olmalıdır. Aksi takdirde başvuru reddedilebilir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">İngiltere vize başvurularında tüm Türkçe belgelerin İngilizceye yeminli tercüme ile çevrilmesi gerekmektedir. İngiltere konsolosluğu genellikle yeminli tercüman imzası taşıyan çevirileri ister. ABD göçmenlik başvurularında da çoğu durumda yeminli çeviri istenir. Başvuru yapacağınız kurumun güncel şartlarını işlem öncesinde kontrol etmeniz gerekir.</p>
          <p className="text-muted-foreground leading-relaxed">İngiltere, ABD, Almanya, Fransa, Hollanda ve diğer ülkelerin konsolosluk şartlarına uygun çeviri yapıyorum.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Vize Başvurusu İçin Çevrilen Belgeler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Pasaport çevirisi","Nüfus cüzdanı çevirisi","Evlilik cüzdanı çevirisi","Banka hesap dokümanı çevirisi","Tapu çevirisi","Çalışma belgesi çevirisi","Maaş bordrosu çevirisi","Vergi levhası çevirisi","İmza sirküleri çevirisi","Sağlık raporu çevirisi","Sabıka kaydı çevirisi","İkametgâh çevirisi","Diploma çevirisi","Sürücü belgesi çevirisi","Şirket faaliyet belgesi çevirisi","Noter senedi çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">İngiltere Vize Başvurusu Çevirisi</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">İngiltere vize başvuruları en sık karşılaştığımız başvuru türlerinden biridir. İngiltere konsolosluğu çeviri konusunda çok katı kurallara sahiptir. Tüm Türkçe belgeler yeminli tercüman tarafından İngilizceye çevrilmeli ve her sayfa tercümanın imzasını ve kaşesini taşımalıdır.</p>
          <p className="text-muted-foreground leading-relaxed">Denizli'den İngiltere'ye vize başvurusu yapacaklar için hızlı ve doğru çeviri yapıyorum.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-2">Vize başvurusu için hangi belgelerin çevirisi gerekir?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Vize türüne göre değişmekle birlikte genellikle pasaport, banka hesap dökümü, maaş bordrosu, tapu senedi, evlilik cüzdanı, doğum belgesi ve sağlık sigortası belgelerinin çevirisi istenir. Başvuru yapacağınız konsolosluğun güncel belge listesini kontrol etmeniz gerekir.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-2">Yeminli tercüme yeterli mi, noter onayı da gerekir mi?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Çoğu vize başvurusunda yeminli tercüme yeterlidir; ancak bazı konsolosluklar noter tasdiki de isteyebilir. Başvuru yapacağınız kurumun güncel şartlarını işlem öncesinde kontrol edin.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-2">Vize çevirisi ne kadar sürede teslim edilir?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Standart belgeler çoğunlukla 1-3 iş günü içinde teslim edilir. Acil taleplerde aynı gün teslim kapasiteye bağlı olarak değerlendirilir.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-bold text-foreground mb-2">Apostil gerekiyor mu?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Apostil, belgenin kullanılacağı ülkeye göre gerekebilir. Başvuru yapacağınız kurumun güncel şartlarını kontrol edin. Apostil işlem/takip hizmeti ayrıca sunulabilir.</p>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İlgili Blog Yazıları</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <a href="/blog/vize-formatlari" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Vize Tercüme Formatları Rehberi</a>
            <a href="/blog/teknik-hukuk-vize-ceviri-rehberi" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teknik, Hukuk ve Vize Çeviri Rehberi</a>
            <a href="/blog/pasaport-tercumesi-nasil-yapilir" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Pasaport Tercümesi Nasıl Yapılır?</a>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-6">Diğer Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/yeminli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Yeminli Tercüme</a>
            <a href="/ingilizce-turkce-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce-Türkçe Çeviri</a>
            <a href="/teknik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teknik Çeviri</a>
            <a href="/akademik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Akademik Çeviri</a>
          <a href="/fiyatlar" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Fiyatları</a>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Vize Başvurusu Çevirisi Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Belgelerinizi gönderin, net teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Belgem İçin Teklif Al</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

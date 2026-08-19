import { ArrowLeft, CheckCircle2, Shield, Clock, Globe } from "lucide-react";
import { useState } from "react";
export default function PasaportCeviri() {
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
          <button className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none z-60" onClick={() => setMobileOpen(!mobileOpen)}>
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
          </button>
          {mobileOpen && (
            <>
              <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)}></div>
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
        <h1 className="text-4xl font-bold text-primary mb-4">Pasaport Çevirisi | İngilizce-Türkçe Yeminli Tercüme</h1>
        <p className="text-xl text-muted-foreground mb-8">Pasaportunuzun yeminli tercüman tarafından İngilizce veya Türkçe'ye çevirisi. Vize başvuruları ve resmi işlemler için hızlı, güvenilir ve doğru çeviri hizmeti.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Shield className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Resmi Geçerlilik</h3><p className="text-muted-foreground text-sm">Yeminli tercüman imzası çoğu konsolosluk ve resmi kurumda kabul edilir; başvuru yapacağınız kurumun güncel şartlarını kontrol etmeniz gerekir.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Clock className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Aynı Gün Teslimat</h3><p className="text-muted-foreground text-sm">Pasaport çevirisi genellikle aynı gün içinde tamamlanır.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Globe className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">İngilizce-Türkçe</h3><p className="text-muted-foreground text-sm">İngilizce-Türkçe dil çiftinde uzman yeminli tercüme.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Pasaport Çevirisi Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Pasaport çevirisi, pasaportunuzdaki kimlik bilgilerinin — ad, soyad, doğum tarihi, pasaport numarası, veriliş ve bitiş tarihleri gibi — yeminli tercüman tarafından İngilizce'ye veya Türkçe'ye çevrilmesidir. Bu çeviri, yeminli tercüman tarafından imzalanır ve kaşelenir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Pasaport çevirisi, özellikle vize başvurularında, yurt dışı eğitim başvurularında, göçmenlik dosyalarında ve uluslararası resmi işlemlerde talep edilir. Yanlış çeviri, başvuru sürecinizin gecikmesine veya reddedilmesine neden olabilir.</p>
          <p className="text-muted-foreground leading-relaxed">İngilizce-Türkçe dil çiftinde pasaport çevirisi yapıyorum. Pasaportunuzdaki tüm bilgileri eksiksiz ve doğru şekilde çevirip imzalıyor ve kaşeliyorum. Belgeniz resmi kurumlarda kullanılabilir hale gelir.</p>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Pasaport Çevirisi Nerede Kullanılır?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["İngiltere vize başvuruları","AB vize başvuruları","ABD göçmenlik dosyaları (USCIS)","Yurt dışı üniversite başvuruları","Uluslararası iş başvuruları","Konsolosluk işlemleri","Yurt dışı banka hesabı açma","Uluslararası evlilik işlemleri"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Pasaport Çevirisi Süreci: Adım Adım</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">1</div><div><h3 className="text-lg font-semibold text-primary mb-2">Pasaport Fotoğrafını Gönderin</h3><p className="text-muted-foreground">Pasaportunuzun fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden iletin. Pasaportun tüm sayfalarının net görünmesi gerekir.</p></div></div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">2</div><div><h3 className="text-lg font-semibold text-primary mb-2">Fiyat Teklifi</h3><p className="text-muted-foreground">Pasaport çevirisi için belgeyi inceleyip net teklif veririm. Teklifi onayladığınızda çeviri süreci başlar.</p></div></div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">3</div><div><h3 className="text-lg font-semibold text-primary mb-2">Çeviri ve İmza</h3><p className="text-muted-foreground">Yeminli tercüman pasaportunuzdaki tüm bilgileri çevirir, imzalar ve kaşeler. Çeviri resmi belge niteliği kazanır.</p></div></div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">4</div><div><h3 className="text-lg font-semibold text-primary mb-2">Teslim</h3><p className="text-muted-foreground">Çevrilmiş pasaportunuz dijital (PDF) olarak veya kargo/kurye ile adresinize teslim edilir. Belgeniz resmi başvurular için hazırdır.</p></div></div>
          </div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Pasaport Çevirisi Fiyatları</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Pasaport çevirisi için belgeyi inceleyip net teklif veririm. İngilizce-Türkçe veya Türkçe-İngilizce için ücret aynıdır. Noter onayı gerektiğinde, gerçek noter bedeli makbuzla teyit edilir ve işlem/takip bedeli ayrı kalemdir.</p>
          <p className="text-muted-foreground leading-relaxed">Net teklif için pasaportunuzun fotoğrafını WhatsApp'tan gönderin. Belge türünü, noter ve apostil ihtiyacını inceleyip dönüş yapıyorum.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Pasaport çevirisi nedir ve ne için gerekir?</h3><p className="text-muted-foreground">Pasaport çevirisi, pasaportunuzdaki kimlik bilgilerinin yeminli tercüman tarafından İngilizce'ye veya Türkçe'ye çevrilmesidir. Vize başvuruları, yurt dışı işlemler, göçmenlik dosyaları ve resmi kurum başvurularında istenir.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Pasaport çevirisi yeminli tercüman tarafından mı yapılmalıdır?</h3><p className="text-muted-foreground">Evet, resmi kurumlar pasaport çevirisinin yeminli tercüman tarafından yapılmasını ve imzalanmasını ister. Yeminli tercüman imzası, çevirinin doğru ve eksiksiz olduğunu taahhüt eder.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Pasaport çevirisi ne kadar sürer?</h3><p className="text-muted-foreground">Pasaport çevirisi genellikle aynı gün veya 1 iş günü içinde tamamlanır. Acil taleplerde birkaç saat içinde teslimat mümkündür.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Pasaport çevirisi için noter onayı gerekir mi?</h3><p className="text-muted-foreground">Çoğu durumda yeminli tercüman imzası yeterlidir. Ancak bazı ülkeler ve konsolosluklar noter onayını şart koşabilir. Başvuru yapacağınız kuruma danışmanızı öneririz.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Pasaport çevirisi ücreti ne kadar?</h3><p className="text-muted-foreground">Pasaport çevirisi ücreti belge görülerek belirlenir. Belgenizin fotoğrafını WhatsApp'tan gönderin; net teklif alırsınız.</p></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İlgili Blog Yazıları</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <a href="/blog/pasaport-tercumesi-nasil-yapilir" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Pasaport Tercümesi Nasıl Yapılır?</a>
            <a href="/blog/vize-formatlari" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Vize Tercüme Formatları Rehberi</a>
            <a href="/blog/noter-onayli-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Noter Onaylı Çeviri Rehberi</a>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-6">Diğer Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/yeminli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Yeminli Tercüme</a>
            <a href="/ingilizce-turkce-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce-Türkçe Çeviri</a>
            <a href="/vize-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Vize Çevirisi</a>
            <a href="/teknik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teknik Çeviri</a>
            <a href="/akademik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Akademik Çeviri</a>
            <a href="/fiyatlar" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Fiyatları</a>
            <a href="/teklif" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teklif Al</a>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Pasaport Çevirisi Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Pasaportunuzun fotoğrafını gönderin, net teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Alın</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp ile Ulaşın</a>
          </div>
        </div>
      </div>
    </div>
  );
}

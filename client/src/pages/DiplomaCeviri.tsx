import { ArrowLeft, CheckCircle2, Shield, Clock, Globe } from "lucide-react";
import { useState } from "react";
export default function DiplomaCeviri() {
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
        <h1 className="text-4xl font-bold text-primary mb-4">Diploma ve Transkript Çevirisi | İngilizce-Türkçe Yeminli Tercüme</h1>
        <p className="text-xl text-muted-foreground mb-8">Diploma, transkript ve akademik belgelerinizin yeminli tercüman tarafından İngilizce veya Türkçe'ye çevirisi. Yurt dışı başvurular ve denklik işlemleri için hızlı, güvenilir ve doğru çeviri.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Shield className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Resmi Geçerlilik</h3><p className="text-muted-foreground text-sm">Yeminli tercüman imzası tüm üniversite ve resmi kurumlarda geçerlidir.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Clock className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Hızlı Teslimat</h3><p className="text-muted-foreground text-sm">Diploma çevirisi aynı gün, transkript çevirisi 1-3 iş günü içinde.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Globe className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">İngilizce-Türkçe</h3><p className="text-muted-foreground text-sm">İngilizce-Türkçe dil çiftinde uzman akademik çeviri.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Diploma ve Transkript Çevirisi Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Diploma çevirisi, diploma belgenizdeki — okul adı, bölüm, mezuniyet tarihi, diploma numarası gibi — bilgilerin yeminli tercüman tarafından İngilizce'ye veya Türkçe'ye çevrilmesidir. Transkript çevirisi ise not dökümü belgenizdeki ders adları, kredi saatleri, notlar ve genel not ortalamasının çevrilmesidir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Bu çeviriler, yurt dışı üniversite başvurularında, denklik işlemlerinde, uluslararası iş başvurularında ve göçmenlik dosyalarında talep edilir. Yanlış veya eksik çeviri, başvuru sürecinizin gecikmesine veya reddedilmesine neden olabilir.</p>
          <p className="text-muted-foreground leading-relaxed">İngilizce-Türkçe dil çiftinde diploma ve transkript çevirisi yapıyorum. Akademik terimleri doğru şekilde çevirip imzalıyor ve kaşeliyorum. Belgelerinizin uluslararası kurumlarda kabul edilmesini sağlıyorum.</p>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Diploma ve Transkript Çevirisi Nerede Kullanılır?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Yurt dışı yüksek lisans başvuruları","Doktora başvuruları","Üniversite denklik işlemleri","Erasmus ve değişim programları","Uluslararası iş başvuruları","Göçmenlik dosyaları","ABD ve İngiltere vize başvuruları","Yurt dışı öğretmenlik yetkilendirmesi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Diploma ve Transkript Çevirisi Süreci</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">1</div>
              <div><h3 className="text-lg font-semibold text-primary mb-2">Belgeleri Gönderin</h3><p className="text-muted-foreground">Diploma ve transkriptinizin net fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden iletin.</p></div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">2</div>
              <div><h3 className="text-lg font-semibold text-primary mb-2">Fiyat Teklifi</h3><p className="text-muted-foreground">Belgelerinizin uzunluğuna göre net teklif veririm. Teklifi onayladığınızda çeviri süreci başlar.</p></div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">3</div>
              <div><h3 className="text-lg font-semibold text-primary mb-2">Çeviri ve İmza</h3><p className="text-muted-foreground">Yeminli tercüman belgelerinizi çevirir, imzalar ve kaşeler. Akademik terimler doğru şekilde aktarılır.</p></div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">4</div>
              <div><h3 className="text-lg font-semibold text-primary mb-2">Teslim</h3><p className="text-muted-foreground">Çevrilmiş belgeleriniz dijital (PDF) olarak veya kargo ile teslim edilir. Başvurularınız için hazırdır.</p></div>
            </div>
          </div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Transkript Çevirisinde Dikkat Edilen Hususlar</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Transkript çevirisinde ders adlarının akademik karşılıkları büyük önem taşır. Türk üniversitelerindeki ders adları, İngilizce akademik sistemdeki karşılıklarına doğru şekilde aktarılır. Kredi saatleri, AKTS/ECTS kredileri ve not sistemleri (4'lük veya 100'lük) titizlikle çevrilir.</p>
          <p className="text-muted-foreground leading-relaxed">Genel not ortalaması (GPA), harf notları (AA, BA, BB vb.) ve diğer akademik bilgiler kaynak belgeye sadık kalınarak çevrilir.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Diploma çevirisi nedir ve ne için gerekir?</h3><p className="text-muted-foreground">Diploma çevirisi, diploma belgenizdeki bilgilerin yeminli tercüman tarafından İngilizce'ye veya Türkçe'ye çevrilmesidir. Yurt dışı üniversite başvuruları, denklik işlemleri, iş başvuruları ve göçmenlik dosyalarında istenir.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Transkript çevirisi ne kadar sürer?</h3><p className="text-muted-foreground">Transkript çevirisi içeriğin uzunluğuna göre 1-3 iş günü içinde tamamlanır. Acil taleplerde aynı gün teslimat mümkündür.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Diploma çevirisi için noter onayı gerekir mi?</h3><p className="text-muted-foreground">Çoğu durumda yeminli tercüman imzası yeterlidir. Ancak bazı ülkeler ve üniversiteler noter onayını veya apostil şart koşabilir.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Transkript çevirisinde ders adları nasıl çevrilir?</h3><p className="text-muted-foreground">Transkriptteki ders adları, akademik karşılıkları gözetilerek çevrilir. Türk yükseköğretim sistemindeki ders adlarını İngilizce akademik karşılıklarına doğru şekilde aktarıyorum.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Diploma ve transkript çevirisi ücreti ne kadar?</h3><p className="text-muted-foreground">Diploma çevirisi belge görülerek, transkript çevirisi sayfa sayısına göre fiyatlandırılır. Belgenizin fotoğrafını WhatsApp'tan gönderin; net teklif alırsınız.</p></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İlgili Blog Yazıları</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <a href="/blog/akademik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Akademik Çeviri Rehberi</a>
            <a href="/blog/noter-onayli-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Noter Onaylı Çeviri Rehberi</a>
            <a href="/blog/vize-formatlari" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Vize Tercüme Formatları Rehberi</a>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-6">Diğer Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/yeminli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Yeminli Tercüme</a>
            <a href="/ingilizce-turkce-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce-Türkçe Çeviri</a>
            <a href="/pasaport-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Pasaport Çevirisi</a>
            <a href="/vize-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Vize Çevirisi</a>
            <a href="/akademik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Akademik Çeviri</a>
            <a href="/fiyatlar" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Fiyatları</a>
            <a href="/teklif" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teklif Al</a>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Diploma ve Transkript Çevirisi Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Belgelerinizin fotoğrafını gönderin, net teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Alın</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp ile Ulaşın</a>
          </div>
        </div>
      </div>
    </div>
  );
}

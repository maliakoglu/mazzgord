import { ArrowLeft, CheckCircle2, Shield, Clock, FileText, Stamp } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { useState } from "react";

export default function NoterOnayliTercume() {
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
        <Breadcrumb items={[{ label: "Hizmetler", href: "/hizmetler" }, { label: "Noter Onaylı Tercüme" }]} />
        <h1 className="text-4xl font-bold text-primary mb-4">Denizli Noter Onaylı Tercüme | Yeminli Çeviri Hizmeti</h1>
        <p className="text-xl text-muted-foreground mb-8">Denizli'de noter onaylı tercüme hizmetleri. Pasaport, diploma, vize belgeleri ve resmi evraklarınız için yeminli tercüman tarafından yapılan, noter tasdikli çeviri.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Stamp className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Noter Tasdiki</h3><p className="text-muted-foreground text-sm">Çeviriniz yeminli tercüman imzasıyla noter tarafından tasdik edilir.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Shield className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Resmi Geçerlilik</h3><p className="text-muted-foreground text-sm">Noter onaylı tercüme tüm resmi kurumlarda geçerlidir.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Clock className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Hızlı Süreç</h3><p className="text-muted-foreground text-sm">Çeviri ve noter onayı aynı gün içinde tamamlanabilir.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Noter Onaylı Tercüme Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Noter onaylı tercüme, yeminli tercüman tarafından yapılan çevirinin, noter huzurunda imzalanarak resmi olarak tasdik edilmesidir. Bu işlem, çevirinin doğruluğunu ve yeminli tercümanın yetkisini resmi olarak belgeler. Noter onaylı tercüme, özellikle yurt dışı işlemlerinde, vize başvurularında, göçmenlik dosyalarında ve resmi kurum işlemlerinde istenir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Denizli'de noter onaylı tercüme hizmeti almak için öncelikle belgenizin yeminli tercüman tarafından çevrilmesi gerekir. Çeviri tamamlandıktan sonra, tercümanın imzası noter tarafından tasdik edilir ve belge resmi olarak kullanıma hazır hale gelir. Bu süreç genellikle aynı gün içinde tamamlanabilir.</p>
          <p className="text-muted-foreground leading-relaxed">Noter onaylı tercüme ile yeminli tercüme arasındaki fark: Yeminli tercüme, tercümanın imzası ve mührüyle geçerlidir; noter onaylı tercüme ise ek olarak noter tasdiki içerir. Bazı kurumlar özellikle noter onayını şart koşar.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Noter Onaylı Tercüme Yapılan Belgeler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Pasaport çevirisi", "Diploma ve transkript çevirisi", "Evlilik cüzdanı çevirisi", "Doğum belgesi çevirisi", "Nüfus kayıt örneği çevirisi", "Adli sicil kaydı çevirisi", "İkametgâh çevirisi", "Sürücü belgesi çevirisi", "Vergi levhası çevirisi", "İmza sirküleri çevirisi", "Vize başvuru evrakları çevirisi", "Mahkeme kararları çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Denizli'de Noter Onaylı Tercüme Süreci</h2>
          <div className="space-y-4">
            <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">1</div><div><h3 className="font-bold mb-1">Belgeyi Gönderin</h3><p className="text-muted-foreground">Belgenizin net bir fotoğrafını veya taranmış halini e-posta veya WhatsApp ile gönderin.</p></div></div>
            <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">2</div><div><h3 className="font-bold mb-1">Teklif Alın</h3><p className="text-muted-foreground">Belgeniz incelenir, çeviri ücreti ve noter onay bedeli size bildirilir.</p></div></div>
            <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">3</div><div><h3 className="font-bold mb-1">Çeviri Yapılır</h3><p className="text-muted-foreground">Yeminli tercüman belgenizi çevirir ve imzalar.</p></div></div>
            <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">4</div><div><h3 className="font-bold mb-1">Noter Onayı</h3><p className="text-muted-foreground">Çeviri noter tarafından tasdik edilir ve resmi belge hazır hale gelir.</p></div></div>
            <div className="flex gap-4"><div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">5</div><div><h3 className="font-bold mb-1">Teslim</h3><p className="text-muted-foreground">Noter onaylı çeviriniz teslim edilir. Kargo ile gönderim yapılabilir.</p></div></div>
          </div>
        </div>
        <div className="bg-primary/5 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Noter Onaylı Tercüme Fiyatları</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Noter onaylı tercüme fiyatı, belgenin uzunluğuna, diline ve noter harç bedeline göre değişir. Çeviri ücreti sayfa bazında hesaplanır; noter onay bedeli belge başına ayrı olarak uygulanır.</p>
          <p className="text-muted-foreground leading-relaxed">Net fiyat teklifi için belgenizi göndermeniz yeterlidir. Fiyat teklifi ücretsizdir.</p>
          <a href="/teklif" className="inline-flex items-center gap-2 mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition no-underline">Ücretsiz Teklif Al <ArrowLeft className="w-4 h-4 rotate-180" /></a>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <a href="/yeminli-tercume" className="block p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Yeminli Tercüme</a>
          <a href="/apostil-tercume" className="block p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Apostil Tercüme</a>
          <a href="/pasaport-ceviri" className="block p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Pasaport Çevirisi</a>
          <a href="/diploma-ceviri" className="block p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Diploma Çevirisi</a>
        </div>
      </div>
    </div>
  );
}

import { ArrowLeft, CheckCircle2, Shield, Clock, FileText, Stamp } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { useState } from "react";

export default function NoterOnayliTercume() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Breadcrumb items={[{ label: "Hizmetler", href: "/" }, { label: "Noter Onaylı Tercüme" }]} />
        <h1 className="text-4xl font-bold text-primary mb-4">Denizli Noter Onaylı Tercüme | Yeminli Çeviri Hizmeti</h1>
        <p className="text-xl text-muted-foreground mb-8">Denizli'de noter onaylı tercüme hizmetleri. Pasaport, diploma, vize belgeleri ve resmi evraklarınız için yeminli tercüman tarafından yapılan, noter tasdikli çeviri.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Stamp className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Noter Tasdiki</h3><p className="text-muted-foreground text-sm">Çeviriniz yeminli tercüman imzasıyla noter tarafından tasdik edilir.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Shield className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Resmi Geçerlilik</h3><p className="text-muted-foreground text-sm">Noter onaylı tercüme tüm resmi kurumlarda geçerlidir.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Clock className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Hızlı Süreç</h3><p className="text-muted-foreground text-sm">Çeviri ve noter onayı aynı gün içinde tamamlanabilir.</p></div></div>
        </div>
        <img src="/images/apostille-notary.webp" alt="Noter onaylı tercüme ve apostil sürecini temsil eden mühürlü belge" width={1632} height={2176} className="w-full max-w-sm mx-auto rounded-2xl mb-8" style={{ maxHeight: "500px", objectFit: "cover" }} loading="lazy" />
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
          <a href="/teklif" className="inline-flex items-center gap-2 mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition no-underline">Teklif Al <ArrowLeft className="w-4 h-4 rotate-180" /></a>
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

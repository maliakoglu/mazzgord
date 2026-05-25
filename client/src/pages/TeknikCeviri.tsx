import { ArrowLeft, CheckCircle2, Settings, Globe, FileCode } from "lucide-react";
export default function TeknikCeviri() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-4">Teknik Çeviri Hizmeti | Denizli</h1>
        <p className="text-xl text-muted-foreground mb-8">İngilizce-Türkçe teknik belge çevirilerinde uzmanlaşmış profesyonel çeviri hizmetleri.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Settings className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Sektör Uzmanlığı</h3><p className="text-muted-foreground text-sm">Teknik terminolojiye hakim çevirmenlerimizle sektörel doğruluk.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Globe className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Uluslararası Standartlar</h3><p className="text-muted-foreground text-sm">ISO standartlarına uygun teknik çeviri süreçleri.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><FileCode className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Terminoloji Yönetimi</h3><p className="text-muted-foreground text-sm">Tutarlı terminoloji için özel sözlükler oluşturuyoruz.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Teknik Çeviri Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Teknik çeviri, teknik belgelerin bir dilden başka bir dile çevrilmesidir. Mühendislik, bilişim, otomotiv, enerji, inşaat ve üretim gibi sektörlerde kullanılan uzman metinleri kapsar. Teknik çeviri, sektör terminolojisine tam hakimiyet gerektirir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Teknik çeviride en küçük bir hata, cihazların yanlış kullanımına, güvenlik risklerine veya maddi kayıplara neden olabilir. Bu nedenle teknik çeviriler yalnızca konuya hakim uzman çevirmenler tarafından yapılmalıdır.</p>
          <p className="text-muted-foreground leading-relaxed">Mazzgord olarak teknik çevirilerinizi sektör uzmanı çevirmenlerimizle gerçekleştiriyoruz. Her projede terminoloji tutarlılığına ve teknik doğruluğa özen gösteriyoruz.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Teknik Çeviri Yapılan Belgeler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Kullanım kılavuzu çevirisi","Teknik şartname çevirisi","Montaj talimatı çevirisi","Bakım kılavuzu çevirisi","MSDS çevirisi","Patent çevirisi","Mühendislik raporu çevirisi","Yazılım dokümantasyonu çevirisi","API dokümantasyonu çevirisi","Ürün kataloğu çevirisi","Teknik çizim notları çevirisi","Kalite belgesi çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Teknik Çeviri Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Teknik belgenizi gönderin, ücretsiz teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Alın</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

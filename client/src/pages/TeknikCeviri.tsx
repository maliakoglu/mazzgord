import { Helmet } from "react-helmet";
import { ArrowLeft, CheckCircle2, Settings, Globe, FileCode } from "lucide-react";
import { useState } from "react";
export default function TeknikCeviri() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Teknik Çeviri Hizmeti | Denizli - Mazzgord</title>
        <meta name="description" content="Teknik çeviri hizmeti. Kullanım kılavuzu, mühendislik belgeleri, teknik spesifikasyonlar için uzman çevirmenler. Denizlide profesyonel teknik çeviri." />
        <link rel="canonical" href="https://mazzgord.com/teknik-ceviri" />
        <meta property="og:title" content="Teknik Çeviri Hizmeti | Denizli - Mazzgord" />
        <meta property="og:description" content="Teknik çeviri hizmeti. Kullanım kılavuzu, mühendislik belgeleri, teknik spesifikasyonlar için uzman çevirmenler. Denizlide profesyonel teknik çeviri." />
        <meta property="og:url" content="https://mazzgord.com/teknik-ceviri" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Teknik Çeviri Hizmeti",
            "provider": {
              "@type": "Organization",
              "name": "Mazzgord Çeviri Hizmetleri",
              "url": "https://mazzgord.com",
              "areaServed": "Denizli, Türkiye"
            },
            "areaServed": "Denizli, Türkiye",
            "url": "https://mazzgord.com/teknik-ceviri"
          }
        `}</script>
      </Helmet>


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
        <h1 className="text-4xl font-bold text-primary mb-4">Teknik Çeviri Hizmeti | Denizli</h1>
        <p className="text-xl text-muted-foreground mb-8">İngilizce-Türkçe teknik belge çevirilerinde uzmanlaşmış profesyonel çeviri hizmetleri.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Settings className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Sektör Uzmanlığı</h3><p className="text-muted-foreground text-sm">Teknik terminolojiye hakim yeminli tercüman olarak sektörel doğruluk.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Globe className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Uluslararası Standartlar</h3><p className="text-muted-foreground text-sm">Tutarlı terminoloji ve teknik doğruluk odaklı süreç.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><FileCode className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Terminoloji Yönetimi</h3><p className="text-muted-foreground text-sm">Tutarlı terminoloji için proje bazlı sözlük tutuyorum.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Teknik Çeviri Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Teknik çeviri, teknik belgelerin bir dilden başka bir dile çevrilmesidir. Mühendislik, bilişim, otomotiv, enerji, inşaat ve üretim gibi sektörlerde kullanılan uzman metinleri kapsar. Teknik çeviri, sektör terminolojisine tam hakimiyet gerektirir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Teknik çeviride en küçük bir hata, cihazların yanlış kullanımına, güvenlik risklerine veya maddi kayıplara neden olabilir. Bu nedenle teknik çeviriler yalnızca konuya hakim uzman çevirmenler tarafından yapılmalıdır.</p>
          <p className="text-muted-foreground leading-relaxed">Teknik çevirileri bizzat ben yapıyorum. Her projede terminoloji tutarlılığına ve teknik doğruluğa özen gösteriyorum.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Teknik Çeviri Yapılan Belgeler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Kullanım kılavuzu çevirisi","Teknik şartname çevirisi","Montaj talimatı çevirisi","Bakım kılavuzu çevirisi","MSDS çevirisi","Patent çevirisi","Mühendislik raporu çevirisi","Yazılım dokümantasyonu çevirisi","API dokümantasyonu çevirisi","Ürün kataloğu çevirisi","Teknik çizim notları çevirisi","Kalite belgesi çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Diğer Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/yeminli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Yeminli Tercüme</a>
            <a href="/ingilizce-turkce-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce-Türkçe Çeviri</a>
            <a href="/akademik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Akademik Çeviri</a>
            <a href="/vize-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Vize Çeviri</a>
          <a href="/fiyatlar" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Fiyatları</a>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Teknik Çeviri Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Teknik belgenizi gönderin, net teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Alın</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

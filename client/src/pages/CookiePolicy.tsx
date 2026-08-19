import { ArrowLeft } from "lucide-react"
import { useState } from "react";

export default function CookiePolicy() {
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
        <h1 className="text-4xl font-bold text-primary mb-8">Çerez Politikası</h1>
        <div className="prose prose-lg max-w-none text-foreground space-y-6">
          <p className="text-muted-foreground">Son güncelleme: 23 Mayıs 2026</p>
          <h2 className="text-2xl font-bold text-primary mt-8">1. Çerez Nedir?</h2>
          <p>Çerezler, web sitelerinin tarayıcınız aracılığıyla cihazınıza yerleştirdiği küçük metin dosyalarıdır. Bu dosyalar, siteyi bir sonraki ziyaretinizde sizi tanımak ve daha iyi bir deneyim sunmak için kullanılır.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">2. Kullandığımız Çerezler</h2>
          <h3 className="text-xl font-bold mt-6">Zorunlu Çerezler</h3>
          <p>Bu çerezler, web sitesinin temel işlevlerinin çalışması için gereklidir ve devre dışı bırakılamaz.</p>
          <h3 className="text-xl font-bold mt-6">Analitik Çerezler</h3>
          <p>Google Analytics tarafından kullanılan çerezler, ziyaretçilerin siteyi nasıl kullandığını anlamaya yardımcı olur. Bu veriler anonim olarak toplanır.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>_ga — Google Analytics ziyaretçi takibi (2 yıl)</li>
            <li>_ga_* — Google Analytics oturum durumu (2 yıl)</li>
          </ul>
          <h3 className="text-xl font-bold mt-6">Reklam Çerezleri</h3>
          <p>Google AdSense tarafından kullanılan çerezler, ilgi alanlarınıza göre ilgili reklamlar göstermek için kullanılır.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>__gads — Google AdSense reklam tercihleri (13 ay)</li>
            <li>__gpi — Google AdSense reklam kişiselleştirme (13 ay)</li>
          </ul>
          <h2 className="text-2xl font-bold text-primary mt-8">3. Çerezleri Yönetme</h2>
          <p>Tarayıcı ayarlarınızı değiştirerek çerezleri kontrol edebilir veya devre dışı bırakabilirsiniz. Ancak, bazı çerezleri devre dışı bırakmanız sitenin işlevselliğini etkileyebilir.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">4. Değişiklikler</h2>
          <p>Bu çerez politikası zaman zaman güncellenebilir. Değişiklikler bu sayfada yayımlanır.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">5. İletişim</h2>
          <p>Çerez politikamızla ilgili sorularınız için:</p>
          <p>E-posta: <a href="mailto:info@mazzgord.com" className="text-primary hover:underline">info@mazzgord.com</a></p>
        </div>
      </div>
    </div>
  );
}

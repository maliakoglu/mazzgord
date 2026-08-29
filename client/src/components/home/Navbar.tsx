import { ChevronDown, User, Moon, Sun } from "lucide-react";
import { useLocation } from "wouter";
import { useTheme } from "@/contexts/ThemeContext";

export default function Navbar({ mobileOpen, setMobileOpen, servicesOpen, setServicesOpen }: {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  servicesOpen: boolean;
  setServicesOpen: (v: boolean) => void;
}) {
  const [location, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();

  const goHome = () => {
    if (location !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-foreground cursor-pointer no-underline hover:no-underline" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '-0.02em' }} onClick={goHome}>Mazzgord</div>
          <div className="hidden md:flex gap-8 items-center">
            <div className="relative group">
              <span className="text-foreground hover:underline underline-offset-2 transition cursor-pointer flex items-center gap-1 no-underline hover:no-underline" style={{ fontWeight: 400 }}>Hizmetler <ChevronDown className="w-4 h-4" /></span>
              <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2" style={{ boxShadow: 'rgba(213, 208, 184, 0.4) 0px 4px 12px 0px' }}>
                <a href="/hizmetler" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary transition no-underline hover:no-underline">Tüm Hizmetler</a>
                <div className="border-t border-border my-1"></div>
                <a href="/yeminli-tercume" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition no-underline hover:no-underline">Yeminli Tercüme</a>
                <a href="/ingilizce-turkce-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition no-underline hover:no-underline">İngilizce-Türkçe Çeviri</a>
                <a href="/teknik-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition no-underline hover:no-underline">Teknik Çeviri</a>
                <a href="/akademik-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition no-underline hover:no-underline">Akademik Çeviri</a>
                <a href="/vize-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition no-underline hover:no-underline">Vize Çevirisi</a>
                <a href="/pasaport-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition no-underline hover:no-underline">Pasaport Çevirisi</a>
                <a href="/diploma-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition no-underline hover:no-underline">Diploma ve Transkript</a>
              </div>
            </div>
            <a href="/blog" className="text-foreground hover:underline underline-offset-2 transition no-underline hover:no-underline">Rehber</a>
            <a href="/hakkimizda" className="text-foreground hover:underline underline-offset-2 transition no-underline hover:no-underline">Hakkımda</a>
            <a href="/iletisim" className="text-foreground hover:underline underline-offset-2 transition no-underline hover:no-underline">İletişim</a>
            <a href="/teklif" className="btn-nav no-underline hover:no-underline">Teklif Al</a>
            <a href="/hesabim" className="flex items-center gap-1 text-foreground hover:underline underline-offset-2 transition no-underline hover:no-underline"><User className="w-4 h-4" /> Hesabım</a>
            <button onClick={toggleTheme} className="p-2 rounded-lg text-foreground hover:bg-secondary transition no-underline cursor-pointer bg-transparent border-none" aria-label="Temayı değiştir" title="Temayı değiştir">{theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}</button>
          </div>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none z-60"
            aria-label="Menüyü aç/kapat"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={"block w-6 h-0.5 bg-foreground rounded transition-all duration-300 " + (mobileOpen ? "rotate-45 translate-y-[7px]" : "")}></span>
            <span className={"block w-6 h-0.5 bg-foreground rounded transition-all duration-300 " + (mobileOpen ? "opacity-0" : "")}></span>
            <span className={"block w-6 h-0.5 bg-foreground rounded transition-all duration-300 " + (mobileOpen ? "-rotate-45 -translate-y-[7px]" : "")}></span>
          </button>
        </div>
      </nav>
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)}></div>
          <div className="fixed top-0 right-0 w-72 h-full bg-card z-50 p-8 pt-24 flex flex-col gap-2 md:hidden" style={{ boxShadow: 'rgba(213, 208, 184, 0.4) 0px 4px 12px 0px' }}>
            <button className="block w-full text-left px-4 py-3 text-foreground hover:bg-secondary rounded-lg text-lg no-underline hover:no-underline transition" onClick={() => setServicesOpen(!servicesOpen)}>Hizmetler <ChevronDown className={`w-4 h-4 inline transition-transform ${servicesOpen ? "rotate-180" : ""}`} /></button>
            {servicesOpen && (
              <div className="pl-4">
                <a href="/hizmetler" className="block px-4 py-2 text-foreground font-medium hover:bg-secondary rounded-lg text-base no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>Tüm Hizmetler</a>
                <a href="/yeminli-tercume" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg text-base no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>Yeminli Tercüme</a>
                <a href="/ingilizce-turkce-ceviri" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg text-base no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>İngilizce-Türkçe Çeviri</a>
                <a href="/teknik-ceviri" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg text-base no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>Teknik Çeviri</a>
                <a href="/akademik-ceviri" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg text-base no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>Akademik Çeviri</a>
                <a href="/vize-ceviri" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg text-base no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>Vize Çevirisi</a>
                <a href="/pasaport-ceviri" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg text-base no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>Pasaport Çevirisi</a>
                <a href="/diploma-ceviri" className="block px-4 py-2 text-foreground hover:bg-secondary rounded-lg text-base no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>Diploma ve Transkript</a>
              </div>
            )}
            <a href="/blog" className="block px-4 py-3 text-foreground hover:bg-secondary rounded-lg text-lg no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>Rehber</a>
            <a href="/hakkimizda" className="block px-4 py-3 text-foreground hover:bg-secondary rounded-lg text-lg no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>Hakkımda</a>
            <a href="/iletisim" className="block px-4 py-3 text-foreground hover:bg-secondary rounded-lg text-lg no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>İletişim</a>
            <a href="/teklif" className="btn-nav no-underline hover:no-underline" style={{ display: 'block', textAlign: 'center', marginTop: 8 }} onClick={() => setMobileOpen(false)}>Teklif Al</a>
            <a href="/hesabim" className="block px-4 py-3 text-foreground hover:bg-secondary rounded-lg text-lg no-underline hover:no-underline transition" onClick={() => setMobileOpen(false)}>Hesabım</a>
            <button onClick={toggleTheme} className="block w-full text-left px-4 py-3 text-foreground hover:bg-secondary rounded-lg text-lg no-underline hover:no-underline transition bg-transparent border-none cursor-pointer" aria-label="Temayı değiştir">{theme === "light" ? "🌙 Gece Modu" : "☀️ Gündüz Modu"}</button>
          </div>
        </>
      )}
    </header>
  );
}

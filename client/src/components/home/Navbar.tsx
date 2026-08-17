import { ChevronDown, User } from "lucide-react";
import { useLocation } from "wouter";

export default function Navbar({ mobileOpen, setMobileOpen, servicesOpen, setServicesOpen }: {
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  servicesOpen: boolean;
  setServicesOpen: (v: boolean) => void;
}) {
  const [location, navigate] = useLocation();

  const goHome = () => {
    if (location !== "/") {
      navigate("/");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary cursor-pointer" onClick={goHome}>Mazzgord</div>
          <div className="hidden md:flex gap-8 items-center">
            <div className="relative group">
              <span className="text-foreground hover:text-primary transition cursor-pointer flex items-center gap-1">Hizmetler <ChevronDown className="w-4 h-4" /></span>
              <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
                <a href="/hizmetler" className="block px-4 py-2 text-sm font-medium text-primary hover:bg-accent transition">Tüm Hizmetler</a>
                <div className="border-t border-border my-1"></div>
                <a href="/yeminli-tercume" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition">Yeminli Tercüme</a>
                <a href="/ingilizce-turkce-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition">İngilizce-Türkçe Çeviri</a>
                <a href="/teknik-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition">Teknik Çeviri</a>
                <a href="/akademik-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition">Akademik Çeviri</a>
                <a href="/vize-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition">Vize Çevirisi</a>
                <a href="/pasaport-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition">Pasaport Çevirisi</a>
                <a href="/diploma-ceviri" className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-primary transition">Diploma ve Transkript</a>
              </div>
            </div>
            <a href="/fiyatlar" className="text-foreground hover:text-primary transition">Fiyatlar</a>
            <a href="/blog" className="text-foreground hover:text-primary transition">Rehber</a>
            <a href="/hakkimizda" className="text-foreground hover:text-primary transition">Hakkımda</a>
            <a href="/#portfolio" className="text-foreground hover:text-primary transition">Örnek Çalışmalar</a>
            <a href="#contact" className="text-foreground hover:text-primary transition">İletişim</a>
            <a href="/teklif" className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition no-underline">Teklif Al</a>
            <a href="/hesabim" className="flex items-center gap-1 text-foreground hover:text-primary transition"><User className="w-4 h-4" /> Hesabım</a>
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
          <div className="fixed top-0 right-0 w-72 h-full bg-background z-50 shadow-2xl p-8 pt-24 flex flex-col gap-2 md:hidden">
            <button className="block w-full text-left px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setServicesOpen(!servicesOpen)}>Hizmetler <ChevronDown className={`w-4 h-4 inline transition-transform ${servicesOpen ? "rotate-180" : ""}`} /></button>
            {servicesOpen && (
              <div className="pl-4">
                <a href="/hizmetler" className="block px-4 py-2 text-primary font-medium hover:bg-accent rounded-lg text-base no-underline transition" onClick={() => setMobileOpen(false)}>Tüm Hizmetler</a>
                <a href="/yeminli-tercume" className="block px-4 py-2 text-foreground hover:bg-accent rounded-lg text-base no-underline transition" onClick={() => setMobileOpen(false)}>Yeminli Tercüme</a>
                <a href="/ingilizce-turkce-ceviri" className="block px-4 py-2 text-foreground hover:bg-accent rounded-lg text-base no-underline transition" onClick={() => setMobileOpen(false)}>İngilizce-Türkçe Çeviri</a>
                <a href="/teknik-ceviri" className="block px-4 py-2 text-foreground hover:bg-accent rounded-lg text-base no-underline transition" onClick={() => setMobileOpen(false)}>Teknik Çeviri</a>
                <a href="/akademik-ceviri" className="block px-4 py-2 text-foreground hover:bg-accent rounded-lg text-base no-underline transition" onClick={() => setMobileOpen(false)}>Akademik Çeviri</a>
                <a href="/vize-ceviri" className="block px-4 py-2 text-foreground hover:bg-accent rounded-lg text-base no-underline transition" onClick={() => setMobileOpen(false)}>Vize Çevirisi</a>
                <a href="/pasaport-ceviri" className="block px-4 py-2 text-foreground hover:bg-accent rounded-lg text-base no-underline transition" onClick={() => setMobileOpen(false)}>Pasaport Çevirisi</a>
                <a href="/diploma-ceviri" className="block px-4 py-2 text-foreground hover:bg-accent rounded-lg text-base no-underline transition" onClick={() => setMobileOpen(false)}>Diploma ve Transkript</a>
              </div>
            )}
            <a href="/fiyatlar" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Fiyatlar</a>
            <a href="/blog" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Rehber</a>
            <a href="/hakkimizda" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Hakkımda</a>
            <a href="/#portfolio" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Örnek Çalışmalar</a>
            <a href="#contact" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>İletişim</a>
            <a href="/teklif" className="block px-4 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Teklif Al</a>
            <a href="/hesabim" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Hesabım</a>
          </div>
        </>
      )}
    </header>
  );
}

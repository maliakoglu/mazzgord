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
            <a href="/blog" className="text-foreground hover:text-primary transition">Rehber</a>
            <a href="/hakkimizda" className="text-foreground hover:text-primary transition">Hakkımda</a>
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
            <a href="/blog" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Rehber</a>
            <a href="/hakkimizda" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Hakkımda</a>
            <a href="#contact" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>İletişim</a>
            <a href="/teklif" className="block px-4 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Teklif Al</a>
            <a href="/hesabim" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Hesabım</a>
          </div>
        </>
      )}
      {/* Sabit WhatsApp butonu - tum sayfalarda gorunur */}
      <a
        href="https://wa.me/905386295040?text=Merhaba,%20belgem%20i%C3%A7in%20teklif%20almak%20istiyorum."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
        aria-label="WhatsApp'tan mesaj gonder"
      >
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </header>
  );
}

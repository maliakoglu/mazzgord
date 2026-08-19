import { Helmet } from "react-helmet";
import { ArrowLeft, CheckCircle2, Shield, Clock, FileText, MapPin } from "lucide-react";
import { useState } from "react";

export default function About() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Hakkımda | Yeminli Tercüman Mehmet Akoğlu - Mazzgord</title>
        <meta name="description" content="Denizli merkezli noter yeminli tercüman Mehmet Akoğlu. İngilizce-Türkçe resmi belge ve vize çevirisi. Pasaport, diploma, adli sicil ve vize evrakları için güvenilir çeviri hizmeti." />
        <link rel="canonical" href="https://mazzgord.com/hakkimizda" />
        <meta property="og:title" content="Hakkımda | Yeminli Tercüman Mehmet Akoğlu - Mazzgord" />
        <meta property="og:description" content="Denizli merkezli noter yeminli tercüman Mehmet Akoğlu. İngilizce-Türkçe resmi belge ve vize çevirisi." />
        <meta property="og:url" content="https://mazzgord.com/hakkimizda" />
        <meta property="og:type" content="profile" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Mazzgord Çeviri Hizmetleri",
            "description": "Denizli merkezli noter yeminli tercüman. İngilizce-Türkçe resmi belge ve vize çevirisi.",
            "url": "https://mazzgord.com",
            "telephone": "+905386295040",
            "email": "info@mazzgord.com",
            "areaServed": "Denizli, Türkiye",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Denizli",
              "addressCountry": "TR"
            },
            "founder": {
              "@type": "Person",
              "name": "Mehmet Akoğlu",
              "jobTitle": "Yeminli Tercüman"
            }
          }
        `}</script>
      </Helmet>

      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
          <div className="hidden md:flex gap-8 items-center">
            <a href="/fiyatlar" className="text-foreground hover:text-primary transition">Fiyatlar</a>
            <a href="/blog" className="text-foreground hover:text-primary transition">Blog</a>
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
                <a href="/teklif" className="block px-4 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Teklif Al</a>
              </div>
            </>
          )}
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Hakkımda</h1>
        <div className="space-y-8">
          <div className="bg-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Ben Kimim?</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">Ben Mehmet Akoğlu; Denizli merkezli noter yeminli tercümanım. İngilizce-Türkçe resmi belge ve vize çevirisi yapıyorum. Pasaport, diploma, adli sicil, nüfus kayıt örneği ve vize evraklarınızı belge türüne, noter ve apostil ihtiyacına göre inceler, net teklif sunarım.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Yeminli Tercüman</h3>
                <p className="text-muted-foreground">Noter huzurunda yemin etmiş yeminli tercümanım. Resmi belgeler için imza ve kaşe geçerlidir.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
              <FileText className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Her İşi Bizzat Yapıyorum</h3>
                <p className="text-muted-foreground">Çeviriyi başkasına devretmiyorum. Belgenizi inceler, çevirir ve teslim ederim.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
              <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Gizlilik Esastır</h3>
                <p className="text-muted-foreground">Belgeleriniz güvenle saklanır, çeviri tamamlandıktan sonra silinir. Üçüncü taraflarla paylaşılmaz.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Hızlı İletişim</h3>
                <p className="text-muted-foreground">WhatsApp üzerinden mesaj bırakabilirsiniz; mesai saatlerinde yanıt veririm.</p>
              </div>
            </div>
          </div>
          <div className="bg-secondary/30 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Benimle Çalışmanın Farkı</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Doğrudan İletişim</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Talebinizi aracı bir satış ekibi yerine doğrudan tercümanla görüşürsünüz.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Belge Odaklı Çalışma</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Belgenin türü, kullanım amacı ve teslim tarihi incelenerek teklif hazırlanır.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Açık Fiyatlandırma</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Yeminli tercüme, noter, apostil, işlem/takip ve kargo bedelleri ayrı açıklanır.</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-2">Gerçekçi Süreç</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">Kurum kabulü veya vize sonucu garanti edilmez; başvuru makamının güncel şartları ayrıca kontrol edilir.</p>
              </div>
            </div>
          </div>
          <div className="bg-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Nasıl Çalışıyorum?</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">Belgenizi WhatsApp veya teklif formu üzerinden gönderirsiniz. Belge türünü, dil yönünü, noter ve apostil ihtiyacını inceleyip net fiyat ve teslim süresi veririm. Teklifi onayladığınızda ödeme bilgileri gönderilir, ödeme doğrulanınca çeviri üretime alınır. Teslim öncesi isim, tarih, sayı ve kurum adlarını ikinci kez kontrol ederim.</p>
          </div>
          <div className="bg-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">İletişim</h2>
            <div className="space-y-3 text-muted-foreground text-lg">
              <p className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Denizli, Türkiye</p>
              <p>Telefon: <a href="tel:+905386295040" className="text-primary hover:underline">+90 538 629 50 40</a></p>
              <p>E-posta: <a href="mailto:info@mazzgord.com" className="text-primary hover:underline">info@mazzgord.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/905386295040" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mesaj Gönder</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

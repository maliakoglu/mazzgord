import { Helmet } from "react-helmet";
import { ArrowLeft, CheckCircle2, Shield, Clock, FileText } from "lucide-react";
import { useState } from "react";
export default function YeminliTercume() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Denizli Yeminli Tercüman | Noter Onaylı Tercüme - Mazzgord</title>
        <meta name="description" content="Denizli'de yeminli tercüme hizmeti. Pasaport, diploma, sabıka kaydı, evlilik cüzdanı ve tüm resmi belgeler için yeminli tercüman imzası. Hızlı teslimat." />
        <link rel="canonical" href="https://mazzgord.com/yeminli-tercume" />
        <meta property="og:title" content="Denizli Yeminli Tercüman | Noter Onaylı Tercüme - Mazzgord" />
        <meta property="og:description" content="Denizli'de yeminli tercüme hizmeti. Pasaport, diploma, sabıka kaydı, evlilik cüzdanı ve tüm resmi belgeler için yeminli tercüman imzası. Hızlı teslimat." />
        <meta property="og:url" content="https://mazzgord.com/yeminli-tercume" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="tr_TR" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Service",
                "serviceType": "Yeminli Tercüme Hizmeti",
                "provider": {
                  "@type": "Organization",
                  "name": "Mazzgord Çeviri Hizmetleri",
                  "url": "https://mazzgord.com",
                  "areaServed": "Denizli, Türkiye"
                },
                "areaServed": "Denizli, Türkiye",
                "url": "https://mazzgord.com/yeminli-tercume"
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "Yeminli tercüme nedir?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Yeminli tercüme, yeminli tercümanlar tarafından yapılan ve resmi belge niteliği taşıyan çeviri işlemidir. Yeminli tercüman, çevirisinin doğru ve eksiksiz olduğunu taahhüt eder. Bu çeviriler mahkemeler, konsolosluklar, üniversiteler ve diğer resmi kurumlar tarafından kabul edilir." }
                  },
                  {
                    "@type": "Question",
                    "name": "Yeminli tercüme için noter onayı gerekir mi?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Çoğu durumda yeminli tercüman imzası yeterlidir, noter onayı gerekmez. Ancak bazı kurumlar ve ülkeler noter onayını şart koşabilir. Belgenizi sunacağınız kuruma danışmanızı öneririz." }
                  },
                  {
                    "@type": "Question",
                    "name": "Yeminli tercüme ne kadar sürer?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Standart belgeler için çeviri 1-3 iş günü içinde tamamlanır. Acil taleplerde aynı gün teslimat mümkündür." }
                  },
                  {
                    "@type": "Question",
                    "name": "Yeminli tercüme fiyatları nasıl belirlenir?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Fiyat belgenin diline, sayfa/karakter sayısına ve belge türüne göre belirlenir. Belgenizin fotoğrafını WhatsApp'tan gönderin; net teklif alırsınız." }
                  },
                  {
                    "@type": "Question",
                    "name": "Denizli'de yeminli tercüman nerede bulunur?",
                    "acceptedAnswer": { "@type": "Answer", "text": "Denizli merkezli yeminli tercümanım. Belgenizi online veya WhatsApp üzerinden iletebilir, teslimatınızı dijital veya kargo ile alabilirsiniz." }
                  }
                ]
              }
            ]
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
        <h1 className="text-4xl font-bold text-primary mb-4">Denizli Yeminli Tercüman | Noter Onaylı Tercüme</h1>
        <p className="text-xl text-muted-foreground mb-8">Denizli'de profesyonel yeminli tercüme hizmetleri. Resmi belgeleriniz için güvenilir ve doğru çeviri çözümleri.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Shield className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Resmi Geçerlilik</h3><p className="text-muted-foreground text-sm">Yeminli tercüman imzam tüm resmi kurumlarda geçerlidir.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Clock className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Hızlı Teslimat</h3><p className="text-muted-foreground text-sm">Acil talepleriniz için aynı gün teslimat seçeneği var.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><FileText className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Geniş Belge Yelpazesi</h3><p className="text-muted-foreground text-sm">Nüfus cüzdanı, diploma, sabıka kaydı ve daha fazlası.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Yeminli Tercüme Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Yeminli tercüme, yeminli tercümanlar tarafından yapılan ve noter onayı gerektirmeyen resmi çeviri işlemidir. Yeminli tercüman, yeminname vererek çevirisinin doğru ve eksiksiz olduğunu taahhüt eder. Bu çeviriler, mahkemeler, konsolosluklar, üniversiteler ve diğer resmi kurumlar tarafından kabul edilir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Türkiye'de yeminli tercümanlık, 6325 sayılı Yeminli Mali Müşavirlik ve Yeminli Tercümanlık Kanunu ile düzenlenmiştir. Yeminli tercümanlar, noter huzurunda yemin ederek bu unvanı alır ve yaptıkları çeviriler resmi belge niteliği taşır.</p>
          <p className="text-muted-foreground leading-relaxed">Yeminli tercüme, özellikle yurt dışı başvurularında, vize işlemlerinde, göçmenlik dosyalarında ve üniversite başvurularında zorunlu bir belgedir. Yanlış veya eksik çeviri, başvurunun reddedilmesine neden olabilir.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Yeminli Tercüme Yapılan Belgeler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Nüfus cüzdanı çevirisi","Pasaport çevirisi","Diploma ve transkript çevirisi","Sabıka kaydı çevirisi","Evlilik cüzdanı çevirisi","İkametgâh çevirisi","Sürücü belgesi çevirisi","Vergi levhası çevirisi","İmza sirküleri çevirisi","Faaliyet belgesi çevirisi","Sağlık raporu çevirisi","Adli sicil kaydı çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Denizli'de Yeminli Tercüme</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Denizli merkezli yeminli tercüme hizmeti veriyorum. Denizli Adliyesi, Denizli Valiliği, Pamukkale Üniversitesi ve diğer kurumlar tarafından kabul edilen yeminli tercümelerle resmi işlemlerinizi sorunsuz tamamlayabilirsiniz.</p>
          <p className="text-muted-foreground leading-relaxed">WhatsApp üzerinden ulaşabilir, belgenizin fotoğrafını göndererek net teklif alabilirsiniz. Mesai saatlerinde yanıt veririm.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Yeminli Tercüme Süreci: Adım Adım</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Belge Teslimi</h3>
                <p className="text-muted-foreground">Belgenizin fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden gönderin. Belgenin dili, sayfa sayısı ve teslim süresi belirlenir.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Fiyat Teklifi</h3>
                <p className="text-muted-foreground">Belgenizi inceledikten sonra net teklif veririm. Teklifi onayladığınızda çeviri süreci başlar.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Çeviri ve İmza</h3>
                <p className="text-muted-foreground">Belgenizi çevirir, imzalar ve kaşelerim. Bu adım belgenin yeminli çeviri olarak geçerlilik kazanmasını sağlar.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Teslim</h3>
                <p className="text-muted-foreground">Yeminli çeviri belgeniz dijital olarak veya kargo/kurye ile adresinize teslim edilir. Belge resmi kurumlarda kullanılmaya hazırdır.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Yeminli Tercüme Fiyatları</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Yeminli tercüme fiyatları; belgenin diline, sayfa veya karakter sayısına ve konusuna göre belirlenir. Standart belgeler için sayfa başına ücret uygulanır. Özel içerikli belgelerde (hukuki, teknik, tıbbi) fiyat değişebilir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Noter onayı gerektiren belgelerde, gerçek noter bedeli makbuzla teyit edilir ve çeviri ücretine dahil değildir. Noter işlem/takip bedeli ayrı kalemdir.</p>
          <p className="text-muted-foreground leading-relaxed">Net teklif için belgenizin fotoğrafını WhatsApp'tan gönderin. Belge türünü, noter ve apostil ihtiyacını inceleyip dönüş yapıyorum.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Yeminli tercüme nedir?</h3>
              <p className="text-muted-foreground">Yeminli tercüme, yeminli tercümanlar tarafından yapılan ve resmi belge niteliği taşıyan çeviri işlemidir. Yeminli tercüman, çevirisinin doğru ve eksiksiz olduğunu taahhüt eder. Bu çeviriler mahkemeler, konsolosluklar, üniversiteler ve diğer resmi kurumlar tarafından kabul edilir.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Yeminli tercüme için noter onayı gerekir mi?</h3>
              <p className="text-muted-foreground">Çoğu durumda yeminli tercüman imzası yeterlidir, noter onayı gerekmez. Ancak bazı kurumlar ve ülkeler noter onayını şart koşabilir. Belgenizi sunacağınız kuruma danışmanızı öneririz.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Yeminli tercüme ne kadar sürer?</h3>
              <p className="text-muted-foreground">Standart belgeler için çeviri 1-3 iş günü içinde tamamlanır. Acil taleplerde aynı gün teslimat mümkündür.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Yeminli tercüme fiyatları nasıl belirlenir?</h3>
              <p className="text-muted-foreground">Fiyat belgenin diline, sayfa/karakter sayısına ve belge türüne göre belirlenir. Belgenizin fotoğrafını WhatsApp'tan gönderin; net teklif alırsınız.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Denizli'de yeminli tercüman nerede bulunur?</h3>
              <p className="text-muted-foreground">Denizli merkezli yeminli tercümanım. Belgenizi online veya WhatsApp üzerinden iletebilir, teslimatınızı dijital veya kargo ile alabilirsiniz.</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Diğer Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/ingilizce-turkce-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce-Türkçe Çeviri</a>
            <a href="/teknik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teknik Çeviri</a>
            <a href="/akademik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Akademik Çeviri</a>
            <a href="/vize-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Vize Çeviri</a>
            <a href="/blog/noter-onayli-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Noter Onaylı Çeviri Rehberi</a>
          <a href="/fiyatlar" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Fiyatları</a>
            <a href="/teklif" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teklif Al</a>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Yeminli Tercüme Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Belgenizi gönderin, net teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Alın</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp ile Ulaşın</a>
          </div>
        </div>
      </div>
    </div>
  );
}

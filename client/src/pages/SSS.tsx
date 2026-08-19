import { ArrowLeft } from "lucide-react"
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function SSS() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const faqs = [
    {
      q: "Çeviri ücretleri nasıl belirleniyor?",
      a: "Çeviri ücretleri; kelime sayısı, dil çifti, teknik zorluk derecesi, teslimat süresi ve belgenin yeminli tercüme gerektirip gerektirmediğine göre belirlenir. Standart tek sayfalık belgelerde yeminli tercüme 950 TL'den başlayan fiyatlarla başlar. Belge türü, yoğunluk, dil çifti ve teslim tarihi fiyatı etkiler. Noter ve apostil bedelleri ayrı hesaplanır. Kesin fiyat belge görüldükten sonra belirlenir."
    },
    {
      q: "Yeminli tercüme ile normal tercüme arasındaki fark nedir?",
      a: "Yeminli tercüme, noter huzurunda yemin etmiş ve 'yeminli tercüman' unvanı almış kişiler tarafından yapılan, resmi kurumlarca kabul edilen çeviridir. Normal tercüme ise herhangi bir resmi geçerliliği olmayan, günlük kullanım için yapılan çeviridir. Yeminli tercüme; mahkeme kararları, diploma, pasaport, evlilik cüzdanı gibi resmi belgelerde genellikle istenir; başvuru yapacağınız kurumun güncel şartlarını kontrol etmeniz gerekir."
    },
    {
      q: "Çeviri ne kadar sürede teslim edilir?",
      a: "Standart teslimat süremiz 1-3 iş günüdür. 10 sayfaya kadar olan belgelerde 24 saat içinde teslimat mümkündür. Acil durumlarda aynı gün teslim kapasiteye bağlı olarak değerlendirilir (ek ücret uygulabilir). Büyük projelerde (50+ sayfa) teslimat süresi proje bazında belirlenir."
    },
    {
      q: "Hangi dillerde çeviri hizmeti veriyorsunuz?",
      a: "Başlıca İngilizce-Türkçe çift yönlü çeviri hizmeti sunuyoruz. Yeminli tercüme, teknik çeviri, akademik çeviri ve vize başvurusu çevirileri başta olmak üzere tüm İngilizce çeviri ihtiyaçlarınız için noter yeminli tercüman olarak hizmetinizdeyim. İletişime geçerek ihtiyacınızı belirtebilirsiniz."
    },
    {
      q: "Noter onayı süreci nasıl işliyor?",
      a: "Yeminli tercümanımız belgenizi çevirdikten sonra, çevirinin doğruluğunu beyan eden bir yeminli tercüme beyannamesi imzalar. Ardından belge ve beyanname notere götürülerek tercümanın imzası onaylatılır. Bu işlem genellikle 1-2 saat sürer. Noter ücreti, çeviri ücretinden ayrı olarak tahsil edilir."
    },
    {
      q: "Online (dijital) çeviri hizmeti veriyor musunuz?",
      a: "Evet, tüm çeviri hizmetlerimizi online olarak da sunuyoruz. Belgelerinizi e-posta veya WhatsApp ile gönderebilir, çeviriyi dijital ortamda teslim alabilirsiniz. Yeminli tercüme gerekiyorsa, fiziksel belgeleri kargo ile göndermeniz yeterlidir. Denizli dışındaki müşterilerimiz için de hızlı kargo çözümlerimiz var."
    },
    {
      q: "Akademik çeviri (tez, makale) yapıyor musunuz?",
      a: "Evet, akademik çeviri konusunda kişisel olarak hizmet veriyorum. Yüksek lisans tezi, doktora tezi, akademik makale, bildiri, araştırma raporu ve özet çevirileri yapıyoruz. Akademik terminolojiye hakim olarak, çalışmanızın orijinal anlamını ve akademik üslubunu koruyarak çeviriyi hazırlıyorum."
    },
    {
      q: "Çeviri kalitenizden nasıl emin olabilirim?",
      a: "Her çeviriyi kendim hazırlıyor ve teslim öncesinde kaynak metinle karşılaştırarak kontrol ediyorum. Yazım veya biçim hatası benden kaynaklıysa ücretsiz düzeltirim. Müşterinin sonradan yeni belge veya farklı format istemesi yeni kapsam olarak değerlendirilir."
    },
    {
      q: "Vize başvurusu için hangi belgelerin çevrilmesi gerekir?",
      a: "Vize türüne göre değişmekle birlikte genellikle; pasaport (kimlik sayfası), davetiye mektubu, banka hesap dökümü, maaş bordrosu, tapu senedi, evlilik cüzdanı, doğum belgesi, ikametgah belgesi ve seyahat sağlık sigortası belgelerinin çevirisi istenir. Schengen, İngiltere, ABD ve Kanada vizesi için çoğu durumda yeminli tercüme istenir; ancak başvuru yapacağınız kurumun güncel şartlarını işlem öncesinde kontrol etmeniz gerekir."
    },
    {
      q: "Noter onaylı çeviri nedir ve ne zaman gerekir?",
      a: "Noter onaylı çeviri, yeminli tercüman tarafından çevrilen belgenin imzasının noter tarafından tasdik edilmesidir. Çoğu durumda yeminli tercüman imzası yeterlidir, ancak bazı kurumlar ve ülkeler noter onayını şart koşar. Detaylı bilgi için noter onaylı çeviri rehberimizi inceleyebilirsiniz: https://mazzgord.com/blog/noter-onayli-ceviri"
    },
    {
      q: "Müşteri gizliliği nasıl korunuyor?",
      a: "Tüm belgeleriniz gizlilik ilkesi kapsamında işlenir. Belgeleriniz şifrelenmiş dijital kanallar üzerinden iletilir, çeviri tamamlandıktan sonra belirlenen saklama süresi (90 gün) sonunda kalıcı olarak silinir. Hiçbir müşteri belgesi üçüncü taraflarla paylaşılmaz. KVKK kapsamında tüm veri koruma yükümlülüklerine uyuyoruz."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sıkça Sorulan Sorular (SSS) | Çeviri Hizmetleri | Mazzgord</title>
        <link rel="canonical" href="https://mazzgord.com/sss" />
      </Helmet>

      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
          <div className="hidden md:flex gap-8">
            <a href="/fiyatlar" className="text-foreground hover:text-primary transition">Fiyatlar</a>
            <a href="/blog" className="text-foreground hover:text-primary transition">Rehber</a>
            <a href="/hakkimizda" className="text-foreground hover:text-primary transition">Hakkımda</a>
            <a href="/teklif" className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition no-underline">Teklif Al</a>
          </div>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none z-60"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={"block w-6 h-0.5 bg-foreground rounded transition-all duration-300 " + (mobileOpen ? "rotate-45 translate-y-[7px]" : "")}></span>
            <span className={"block w-6 h-0.5 bg-foreground rounded transition-all duration-300 " + (mobileOpen ? "opacity-0" : "")}></span>
            <span className={"block w-6 h-0.5 bg-foreground rounded transition-all duration-300 " + (mobileOpen ? "-rotate-45 -translate-y-[7px]" : "")}></span>
          </button>
          {mobileOpen && (
            <>
              <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setMobileOpen(false)}></div>
              <div className="fixed top-0 right-0 w-72 h-full bg-background z-50 shadow-2xl p-8 pt-24 flex flex-col gap-2 md:hidden">
                <a href="/fiyatlar" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Fiyatlar</a>
                <a href="/blog" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Rehber</a>
                <a href="/hakkimizda" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Hakkımda</a>
                <a href="/teklif" className="block px-4 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Teklif Al</a>
              </div>
            </>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Sıkça Sorulan Sorular</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Çeviri hizmetleri hakkında en çok merak edilen soruları burada yanıtladım.
            Aradığınız cevabı bulamazsanız, WhatsApp veya teklif formundan bana ulaşabilirsiniz.
          </p>
        </header>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center bg-card hover:bg-accent/50 transition cursor-pointer"
              >
                <span className="font-semibold text-foreground text-lg">{faq.q}</span>
                <svg
                  className={"w-5 h-5 text-primary transition-transform duration-300 " + (openItems.includes(index) ? "rotate-180" : "")}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openItems.includes(index) && (
                <div className="px-6 py-4 border-t border-border bg-muted/30">
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-primary/5 rounded-xl border border-primary/10 text-center">
          <h2 className="text-2xl font-bold text-primary mb-3">Sorunuzu Bulamadınız mı?</h2>
          <p className="text-muted-foreground mb-6">
            Aklınıza takılan herhangi bir soru için bana doğrudan ulaşın, mesai saatlerinde yanıt veririm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition font-medium no-underline">
              Teklif Al
            </a>
            <a href="https://wa.me/905386295040" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium no-underline">
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <footer className="bg-card border-t border-border py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2026 Mazzgord Çeviri Hizmetleri. Tüm hakları saklıdır.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/gizlilik" className="hover:text-primary transition">Gizlilik Politikası</a>
            <a href="/kullanim-kosullari" className="hover:text-primary transition">Kullanım Koşulları</a>
            <a href="/cerez-politikasi" className="hover:text-primary transition">Çerez Politikası</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

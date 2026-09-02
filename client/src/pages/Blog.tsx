import { ArrowLeft, Calendar } from "lucide-react"
import { useState } from "react";

export default function Blog() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const categories = ["Tümü", "Gerçek Vakalar", "Rehberler", "İpuçları & Sektör"];

  const posts = [
    { title: "Araç Ruhsatı Çevirisi Nasıl Yapılır? Gerçek Vaka Örneğiyle", date: "28 Ağustos 2026", slug: "/blog/arac-ruhsati-cevirisi", category: "Gerçek Vakalar" },
    { title: "İngiltere Vize Başvurusu İçin Belge Çevirisi: Gerçek Müşteri Deneyimi", date: "28 Ağustos 2026", slug: "/blog/ingiltere-vize-cevirisi-gercek-vaka", category: "Gerçek Vakalar" },
    { title: "Doğalgaz Faturası Çevirisi: sam.gov Kaydı İçin Gerçek Vaka", date: "28 Ağustos 2026", slug: "/blog/dogalgaz-faturasi-cevirisi", category: "Gerçek Vakalar" },
    { title: "Apostil Onaylı Çeviri ile Noter Onaylı Çeviri Arasındaki Fark", date: "1 Eylül 2026", slug: "/blog/apostil-vs-noter-onayli-ceviri", category: "Rehberler" },
    { title: "Vize Başvurusu İçin Hangi Belgeler Çevrilmelidir? 2026 Rehber", date: "1 Eylül 2026", slug: "/blog/vize-basvurusu-hangi-belgeler", category: "Rehberler" },
    { title: "Vize Labirentinde Kaybolmayın: Konsoloslukların Kabul Ettiği 6 Kritik Tercüme Formatı", date: "18 Ağustos 2026", slug: "/blog/vize-formatlari", category: "Rehberler" },
    { title: "Yeminli Tercüme Fiyatları 2026", date: "12 Ağustos 2026", slug: "/blog/yeminli-tercume-fiyatlari-2026", category: "Rehberler" },
    { title: "Pasaport Tercümesi Nasıl Yapılır? 2026 Adım Adım Rehber", date: "12 Ağustos 2026", slug: "/blog/pasaport-tercumesi-nasil-yapilir", category: "Rehberler" },
    { title: "Noter Onaylı Çeviri Nasıl Yapılır? 2026 Adım Adım Rehber", date: "29 Temmuz 2026", slug: "/blog/noter-onayli-ceviri", category: "Rehberler" },
    { title: "İngilizce Edebi Metin Çevirisi: Sanatın İki Dilde Yeniden Yaratımı", date: "10 Temmuz 2026", slug: "/blog/ingilizce-edebi-metin-cevirisi", category: "Rehberler" },
    { title: "İngilizce Mektup ve E-posta Çevirisi: Resmi ve Gündelik Yazışmalar", date: "10 Temmuz 2026", slug: "/blog/ingilizce-mektup-email-cevirisi", category: "Rehberler" },
    { title: "İngilizce Sözleşme Çevirisi: Dikkat Edilmesi Gereken Kritik Noktalar", date: "10 Temmuz 2026", slug: "/blog/ingilizce-sozlesme-cevirisi", category: "Rehberler" },
    { title: "Google Translate mi, Profesyonel Çeviri mi? Doğru Seçim Rehberi", date: "10 Temmuz 2026", slug: "/blog/google-translate-vs-profesyonel-ceviri", category: "İpuçları & Sektör" },
    { title: "İngilizce-Türkçe Çeviride Deyimlerin Aktarımı: Zorluklar ve Çözümler", date: "10 Temmuz 2026", slug: "/blog/ingilizce-turkce-deyim-cevirisi", category: "İpuçları & Sektör" },
    { title: "Çevirmenlik Kariyer Rehberi: İki Dil Bilmek Yetmez", date: "30 Haziran 2026", slug: "/blog/cevirmenlik-kariyer-rehberi", category: "İpuçları & Sektör" },
    { title: "Hata Kabul Etmeyen Üç Dünya: Teknik, Hukuk ve Vize Çevirilerinde Hayat Kurtaran Rehber", date: "30 Haziran 2026", slug: "/blog/uc-dunya-ceviri", category: "Rehberler" },
    { title: "Hukuki Çeviri: Tek Bir Kelimeyle Hayat Kurtaran (Ya Da Karartan!) O Dünya", date: "30 Haziran 2026", slug: "/blog/hukuki-ceviri", category: "Rehberler" },
    { title: "Teknik Çeviri Nedir, Neden Hayat Kurtarır?", date: "30 Haziran 2026", slug: "/blog/teknik-ceviri-nedir", category: "Rehberler" },
    { title: "Çeviri Yaptırırken Can Yakacak Hatalar (Ve Bunlardan Kurtulma Yolları)", date: "30 Haziran 2026", slug: "/blog/ceviri-hatalari", category: "İpuçları & Sektör" },
    { title: "Çeviri Teknolojileri: Geleceğin Çevirmenliği", date: "30 Haziran 2026", slug: "/blog/ceviri-teknolojileri", category: "İpuçları & Sektör" },
    { title: "Yerelleştirme Hizmetleri: Küresel Pazarda Başarı İçin Anahtar", date: "30 Haziran 2026", slug: "/blog/yerellestirme-hizmetleri", category: "Rehberler" },
    { title: "Tıbbi Çeviri: Sağlık Sektöründe Doğruluk ve Hassasiyet", date: "29 Haziran 2026", slug: "/blog/tibbi-ceviri", category: "Rehberler" },
    { title: "Akademik Çeviri Rehberi: Bilimsel Çalışmalarınız İçin Doğru Adres", date: "22 Haziran 2026", slug: "/blog/akademik-ceviri", category: "Rehberler" },
    { title: "Teknik Çeviri Rehberi: Uzmanlık ve Doğruluk", date: "22 Haziran 2026", slug: "/blog/teknik-ceviri", category: "Rehberler" },
    { title: "Yeminli Tercüme Sürecinde Sıkça Sorulan Sorular ve Cevapları", date: "22 Haziran 2026", slug: "/blog/yeminli-tercume", category: "Rehberler" },
    { title: "Yeminli Tercüme Nedir? Nerelerde Kullanılır?", date: "15 Mayıs 2026", slug: "/blog/yeminli-tercume", category: "Rehberler" },
    { title: "İngiltere Vize Başvurusu İçin Çeviri Rehberi", date: "10 Mayıs 2026", slug: "/blog/vize-ceviri", category: "Rehberler" },
    { title: "Teknik Çeviride Dikkat Edilmesi Gereken 5 Önemli Nokta", date: "5 Mayıs 2026", slug: "/blog/teknik-ceviri", category: "Rehberler" },
    { title: "İngilizce-Türkçe Çeviride Yapılan Yaygın Hatalar", date: "1 Mayıs 2026", slug: "/blog/ceviri-ipuclari", category: "İpuçları & Sektör" },
    { title: "Türkiye'de Çeviri Sektörü ve Gelecek Trendleri", date: "20 Nisan 2026", slug: "/blog/ceviri-sektoru", category: "İpuçları & Sektör" },
  ];

  const filteredPosts = activeCategory === "Tümü" ? posts : posts.filter(p => p.category === activeCategory);

  const categoryColors: Record<string, string> = {
    "Gerçek Vakalar": "bg-green-100 text-green-700",
    "Rehberler": "bg-blue-100 text-blue-700",
    "İpuçları & Sektör": "bg-amber-100 text-amber-700",
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
          <div className="hidden md:flex gap-8">
            <a href="/yeminli-tercume" className="text-foreground hover:text-primary transition">Hizmetler</a>
            <a href="/blog" className="text-foreground hover:text-primary transition">Blog</a>
            <a href="/hakkimizda" className="text-foreground hover:text-primary transition">Hakkımda</a>
            <a href="/iletisim" className="text-foreground hover:text-primary transition">İletişim</a>
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
                <a href="/yeminli-tercume" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Hizmetler</a>
                <a href="/blog" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Blog</a>
                <a href="/hakkimizda" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Hakkımda</a>
                <a href="/iletisim" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>İletişim</a>
              </div>
            </>
          )}
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-4">Blog</h1>
        <p className="text-xl text-muted-foreground mb-8">Çeviri sektörü hakkında güncel bilgiler, ipuçları ve uzman rehberler.</p>

        <div className="flex gap-2 mb-8 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={"px-4 py-2 rounded-full text-sm font-medium transition no-underline " + (activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80")}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredPosts.map((post, idx) => (
            <a key={idx} href={post.slug} className="block p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:border-primary/50 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <span className={"px-2.5 py-1 rounded-full text-xs font-medium " + (categoryColors[post.category] || "bg-secondary text-secondary-foreground")}>{post.category}</span>
                <div className="flex items-center gap-1 text-muted-foreground text-sm"><Calendar className="w-3.5 h-3.5" />{post.date}</div>
              </div>
              <h2 className="text-lg font-bold text-foreground hover:text-primary transition">{post.title}</h2>
            </a>
          ))}
        </div>
      </div>
    
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Belgeniz İçin Teklif Alın</h2>
          <p className="mb-6 opacity-90">Belgenizi gönderin, aynı gün içinde net teklif veririm.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Alın</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp ile Ulaşın</a>
          </div>
        </div>
      </div>
  );
}
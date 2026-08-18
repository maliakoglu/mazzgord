import { ArrowLeft, Calendar } from "lucide-react"
import { useState } from "react";
export default function Blog() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const posts = [
    { title: "Vize Labirentinde Kaybolmayın: Konsoloslukların Kabul Ettiği 6 Kritik Tercüme Formatı", date: "18 Ağustos 2026", slug: "/blog/vize-formatlari" },
    { title: "Yeminli Tercüme Fiyatları 2026", date: "12 Ağustos 2026", slug: "/blog/yeminli-tercume-fiyatlari-2026" },
    { title: "Pasaport Tercümesi Nasıl Yapılır? 2026 Adım Adım Rehber", date: "12 Ağustos 2026", slug: "/blog/pasaport-tercumesi-nasil-yapilir" },
    { title: "Noter Onaylı Çeviri Nasıl Yapılır? 2026 Adım Adım Rehber", date: "29 Temmuz 2026", slug: "/blog/noter-onayli-ceviri" },
    { title: "İngilizce Edebi Metin Çevirisi: Sanatın İki Dilde Yeniden Yaratımı", date: "10 Temmuz 2026", slug: "/blog/ingilizce-edebi-metin-cevirisi" },
    { title: "İngilizce Mektup ve E-posta Çevirisi: Resmi ve Gündelik Yazışmalar", date: "10 Temmuz 2026", slug: "/blog/ingilizce-mektup-email-cevirisi" },
    { title: "İngilizce Sözleşme Çevirisi: Dikkat Edilmesi Gereken Kritik Noktalar", date: "10 Temmuz 2026", slug: "/blog/ingilizce-sozlesme-cevirisi" },
    { title: "Google Translate mi, Profesyonel Çeviri mi? Doğru Seçim Rehberi", date: "10 Temmuz 2026", slug: "/blog/google-translate-vs-profesyonel-ceviri" },
    { title: "İngilizce-Türkçe Çeviride Deyimlerin Aktarımı: Zorluklar ve Çözümler", date: "10 Temmuz 2026", slug: "/blog/ingilizce-turkce-deyim-cevirisi" },
    { title: "Çevirmenlik Kariyer Rehberi: İki Dil Bilmek Yetmez", date: "30 Haziran 2026", slug: "/blog/cevirmenlik-kariyer-rehberi" },
    { title: "Hata Kabul Etmeyen Üç Dünya: Teknik, Hukuk ve Vize Çevirilerinde Hayat Kurtaran Rehber", date: "30 Haziran 2026", slug: "/blog/teknik-hukuk-vize-ceviri-rehberi" },
    { title: "Hukuki Çeviri: Tek Bir Kelimeyle Hayat Kurtaran (Ya Da Karartan!) O Dünya", date: "30 Haziran 2026", slug: "/blog/hukuki-ceviri" },
    { title: "Teknik Çeviri Nedir, Neden Hayat Kurtarır?", date: "30 Haziran 2026", slug: "/blog/teknik-ceviri-nedir" },
    { title: "Çeviri Yaptırırken Can Yakacak Hatalar (Ve Bunlardan Kurtulma Yolları)", date: "30 Haziran 2026", slug: "/blog/ceviri-hatalari" },
    { title: "Çeviri Teknolojileri: Geleceğin Çevirmenliği", date: "30 Haziran 2026", slug: "/blog/ceviri-teknolojileri" },
    { title: "Yerelleştirme Hizmetleri: Küresel Pazarda Başarı İçin Anahtar", date: "30 Haziran 2026", slug: "/blog/yerellestirme-hizmetleri" },
    { title: "Tıbbi Çeviri: Sağlık Sektöründe Doğruluk ve Hassasiyet", date: "29 Haziran 2026", slug: "/blog/tibbi-ceviri" },
    { title: "Akademik Çeviri Rehberi: Bilimsel Çalışmalarınız İçin Doğru Adres", date: "22 Haziran 2026", slug: "/blog/akademik-ceviri" },
    { title: "Teknik Çeviri Rehberi: Uzmanlık ve Doğruluk", date: "22 Haziran 2026", slug: "/blog/teknik-ceviri" },
    { title: "Yeminli Tercüme Sürecinde Sıkça Sorulan Sorular ve Cevapları", date: "22 Haziran 2026", slug: "/blog/yeminli-tercume" },
    { title: "Yeminli Tercüme Nedir? Nerelerde Kullanılır?", date: "15 Mayıs 2026", slug: "/blog/yeminli-tercume" },
    { title: "İngiltere Vize Başvurusu İçin Çeviri Rehberi", date: "10 Mayıs 2026", slug: "/blog/vize-ceviri" },
    { title: "Teknik Çeviride Dikkat Edilmesi Gereken 5 Önemli Nokta", date: "5 Mayıs 2026", slug: "/blog/teknik-ceviri" },
    { title: "İngilizce-Türkçe Çeviride Yapılan Yaygın Hatalar", date: "1 Mayıs 2026", slug: "/blog/ceviri-ipuclari" },
    { title: "Türkiye'de Çeviri Sektörü ve Gelecek Trendleri", date: "20 Nisan 2026", slug: "/blog/ceviri-sektoru" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
          <div className="hidden md:flex gap-8">
            <a href="/yeminli-tercume" className="text-foreground hover:text-primary transition">Hizmetler</a>
            <a href="/blog" className="text-foreground hover:text-primary transition">Blog</a>
            <a href="/hakkimizda" className="text-foreground hover:text-primary transition">Hakkımda</a>
            <a href="/#contact" className="text-foreground hover:text-primary transition">İletişim</a>
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
                <a href="/#contact" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>İletişim</a>
              </div>
            </>
          )}
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Blog</h1>
        <p className="text-xl text-muted-foreground mb-12">Çeviri sektörü hakkında güncel bilgiler, ipuçları ve uzman rehberler.</p>
        <div className="space-y-6">
          {posts.map((post, idx) => (
            <a key={idx} href={post.slug} className="block p-6 bg-card rounded-xl border border-border hover:shadow-lg hover:border-primary/50 transition-all">
              <h2 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition">{post.title}</h2>
              <div className="flex items-center gap-2 text-muted-foreground text-sm"><Calendar className="w-4 h-4" />{post.date}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

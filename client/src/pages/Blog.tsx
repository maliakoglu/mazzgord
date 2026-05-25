import { ArrowLeft, Calendar } from "lucide-react";
export default function Blog() {
  const posts = [
    { title: "Yeminli Tercüme Nedir? Nerelerde Kullanılır?", date: "15 Mayıs 2026", slug: "/blog/yeminli-tercume" },
    { title: "İngiltere Vize Başvurusu İçin Çeviri Rehberi", date: "10 Mayıs 2026", slug: "/blog/vize-ceviri" },
    { title: "Teknik Çeviride Dikkat Edilmesi Gereken 5 Önemli Nokta", date: "5 Mayıs 2026", slug: "/blog/teknik-ceviri" },
    { title: "İngilizce-Türkçe Çeviride Yapılan Yaygın Hatalar", date: "1 Mayıs 2026", slug: "/blog/ceviri-ipuclari" },
    { title: "Türkiye'de Çeviri Sektörü ve Gelecek Trendleri", date: "20 Nisan 2026", slug: "/blog/ceviri-sektoru" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Blog</h1>
        <p className="text-xl text-muted-foreground mb-12">Çeviri sektörü hakkında güncel bilgiler, ipuçları ve rehberler.</p>
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

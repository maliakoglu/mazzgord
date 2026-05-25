import { ArrowLeft } from "lucide-react";
export default function BlogCeviriSektoru() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Blog</a>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-4">Türkiye'de Çeviri Sektörü ve Gelecek Trendleri</h1>
        <p className="text-muted-foreground mb-8">20 Nisan 2026 · Mazzgord Çeviri Hizmetleri</p>
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-muted-foreground leading-relaxed">Türkiye'de çeviri sektörü, küreselleşme ve dijitalleşme ile birlikte hızla büyümektedir. Yurt dışına açılan Türk şirketleri, yabancı yatırımcılar ve artan göçmenlik başvuruları çeviri talebini her geçen yıl artırmaktadır.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">Sektörün Büyüklüğü</h2>
          <p className="text-muted-foreground leading-relaxed">Türkiye'de çeviri sektörü yıllık 500 milyon TL'yi aşan bir pazar hacmine sahiptir. İstanbul, Ankara ve İzmir'in ardından Denizli gibi sanayi şehirlerinde de çeviri talebi artmaktadır. Özellikle tekstil, mermer ve tarım sektörlerinde uluslararası ticaret çeviri ihtiyacını artırmaktadır.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">Yapay Zeka ve Çeviri</h2>
          <p className="text-muted-foreground leading-relaxed">Yapay zeka tabanlı çeviri araçları son yıllarda büyük gelişme göstermiştir. Ancak bu araçlar hala yeminli tercüme, hukuki çeviri ve akademik çeviri gibi alanlarda insan çevirmenlerin yerini alamamaktadır. Özellikle resmi belgelerde yeminli tercüman imzası zorunlu olup yapay zeka çevirileri kabul edilmemektedir.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">Gelecek Trendleri</h2>
          <p className="text-muted-foreground leading-relaxed">Çeviri sektöründe uzmanlaşma trendi artmaktadır. Genel çevirmenler yerine hukuki çeviri, teknik çeviri ve tıbbi çeviri gibi alanlarda uzmanlaşmış çevirmenler tercih edilmektedir. Mazzgord olarak bu trende uyum sağlayarak İngilizce-Türkçe dil çiftinde uzmanlaşmış hizmet sunuyoruz.</p>
        </div>
      </div>
    </div>
  );
}

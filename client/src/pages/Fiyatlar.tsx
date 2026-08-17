import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ArrowLeft, Search, FileText, CheckCircle2 } from "lucide-react";

interface PriceItem {
  id: number;
  document_name: string;
  yeminli_price: number;
  noter_price: number;
  apostil_price: number;
  has_apostil_variant: number;
  category: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  resmi: "Resmi Belgeler",
  egitim: "Eğitim Belgeleri",
  ticari: "Ticari Belgeler",
};

function formatPrice(price: number): string {
  return price.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function Fiyatlar() {
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    fetch("/api/pricing")
      .then(res => res.json())
      .then(data => {
        if (data.success) setPrices(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = prices.filter(p => {
    const matchSearch = p.document_name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "all" || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const categories = ["all", ...Array.from(new Set(prices.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Çeviri Fiyatları 2026 | Yeminli Tercüme Fiyat Listesi | Mazzgord</title>
        <meta name="description" content="2026 yeminli tercüme fiyatları. Pasaport, diploma, vize ve resmi belge çevirisi için başlangıç fiyatları. Noter ve apostil işlem/takip bedelleri ayrı." />
      </Helmet>

      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="w-5 h-5" /> Ana Sayfa
          </a>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-3">Yeminli Tercüme Fiyatları</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Belge görülmeden kesin fiyat verilmez. Aşağıdaki başlangıç fiyatları referans amaçlıdır. Net teklif için belgenizi gönderin.
          </p>
        </div>

        {/* 3 Katmanlı Sistem */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold text-foreground mb-2">Yeminli Tercüme</h3>
            <p className="text-sm text-muted-foreground">Belge türü ve yoğunluğa göre başlangıç fiyatı. Çeviri, imza ve kaşe dahil.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold text-foreground mb-2">Noter İşlem/Takip</h3>
            <p className="text-sm text-muted-foreground">Gerçek noter bedeli makbuzla teyit edilir. İşlem/takip bedeli belgeyi notere götürme ve teslim alma hizmetidir.</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-bold text-foreground mb-2">Apostil İşlem/Takip</h3>
            <p className="text-sm text-muted-foreground">Devlet apostil bedeli ayrı alınmaz. Başvuru, takip ve teslim hizmeti için işlem/takip bedeli alınır.</p>
          </div>
        </div>

        {/* Belge bazlı fiyat tablosu */}
        <h2 className="text-2xl font-bold text-foreground mb-4">Belge Bazlı Başlangıç Fiyatları</h2>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Belge ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
              >
                {cat === "all" ? "Tümü" : CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-14 bg-secondary/50 rounded-lg animate-pulse" style={{ animationDelay: i * 0.05 + "s" }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>Sonuç bulunamadı.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-3 px-4 font-bold text-foreground">Belge Adı</th>
                  <th className="text-right py-3 px-4 font-bold text-foreground whitespace-nowrap">Yeminli Tercüme</th>
                  <th className="text-right py-3 px-4 font-bold text-foreground whitespace-nowrap">Noter İşlem/Takip</th>
                  <th className="text-right py-3 px-4 font-bold text-foreground whitespace-nowrap">Apostil İşlem/Takip</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b border-border hover:bg-secondary/20 transition">
                    <td className="py-3 px-4 text-foreground font-medium">{p.document_name}</td>
                    <td className="py-3 px-4 text-right text-foreground whitespace-nowrap">{formatPrice(p.yeminli_price)} ₺</td>
                    <td className="py-3 px-4 text-right text-foreground whitespace-nowrap">+{formatPrice(p.noter_price - p.yeminli_price)} ₺</td>
                    <td className="py-3 px-4 text-right text-foreground whitespace-nowrap">{p.has_apostil_variant ? `+${formatPrice(p.apostil_price - p.noter_price)} ₺` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Önemli Bilgiler */}
        <div className="mt-10 bg-secondary/30 rounded-lg p-6">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Önemli Bilgiler
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Yeminli tercüme bedeli belge türü ve yoğunluğa göre değişir; her belge için sabit değildir.</li>
            <li>• Noter bedeli belge türüne göre değişir; işlem öncesi noter makbuzuyla teyit edilir.</li>
            <li>• Noter işlem/takip bedeli, belgeyi notere götürme, takip etme ve teslim alma hizmetidir.</li>
            <li>• Apostil şerhi valilik/kaymakamlıkça düzenlenir; devlet apostil bedeli ayrı alınmaz.</li>
            <li>• Apostil işlem/takip bedeli, başvuru, takip ve teslim hizmetidir.</li>
            <li>• Acil teslimde +%30-%50 ek ücret uygulanır; kapasiteye bağlıdır.</li>
            <li>• Kargo bedeli gerçek gönderim bedelidir; şehir ve teslim şekline göre değişir.</li>
          </ul>
        </div>

        {/* Fiyat Nasıl Belirlenir */}
        <div className="mt-10 bg-card border border-border rounded-lg p-6">
          <h3 className="font-bold text-foreground mb-4 text-lg">Fiyat Nasıl Belirlenir?</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-1">Belgeyi incelerim</h4>
              <p className="text-sm text-muted-foreground">Belge türü, dil yönü, sayfa sayısı, yoğunluk ve formatı kontrol ederim. Hangi onaya ihtiyaç duyduğunu söylerim.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Kalemleri ayrı gösteririm</h4>
              <p className="text-sm text-muted-foreground">Yeminli tercüme bedeli, noter bedeli (gerçek), noter işlem/takip, apostil işlem/takip ve kargo ayrı kalemler olarak teklif edilir.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Onay sonrası üretime başlarım</h4>
              <p className="text-sm text-muted-foreground">Teklifi onayladığınızda ödeme bilgileri gönderilir. Ödeme doğrulanınca çeviri üretime alınır.</p>
            </div>
          </div>
        </div>

        {/* SSS */}
        <div className="mt-10 bg-secondary/30 rounded-lg p-6">
          <h3 className="font-bold text-foreground mb-4 text-lg">Sıkça Sorulan Sorular</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-1">Yeminli tercüme nedir?</h4>
              <p className="text-sm text-muted-foreground">Noter yeminli tercüman tarafından yapılan, imzalı ve kaşeli resmi çeviridir. Pasaport, diploma, adli sicil gibi belgeler için gereklidir.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Noter bedeli neden sabit değil?</h4>
              <p className="text-sm text-muted-foreground">Noter bedeli belge türüne, sayfa sayısına ve noter uygulamasına göre değişir. İşlem öncesi noter makbuzuyla gerçek bedel teyit edilir.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Apostil ne demek?</h4>
              <p className="text-sm text-muted-foreground">Apostil, belgenizin yabancı bir ülkede kullanılabilmesi için valilik/kaymakamlıkça eklenen uluslararası tasdik şerhidir. Devlet apostil bedeli ayrı alınmaz; başvuru ve takip hizmeti için işlem/takip bedeli alınır.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Kargo ile teslimat var mı?</h4>
              <p className="text-sm text-muted-foreground">Evet, Türkiye'nin her yerine kargo ile fiziksel teslimat yapılır. Dijital teslimat (PDF) e-posta veya WhatsApp ile de mümkündür. Kargo bedeli gerçek gönderim bedelidir.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a href="/teklif" className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition mr-4">
            Teklif Al
          </a>
          <a
            href="https://wa.me/905386295040?text=Merhaba,%20belgem%20için%20fiyat%20teklifi%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition"
          >
            WhatsApp'tan Sor
          </a>
          <p className="text-sm text-muted-foreground mt-4">
            Sorularınız için: <a href="mailto:info@mazzgord.com" className="text-primary hover:underline">info@mazzgord.com</a> · <a href="tel:+905386295040" className="text-primary hover:underline">+90 538 629 50 40</a>
          </p>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { ArrowLeft, Search, FileText, Clock, Truck, Stamp, Languages, ShieldCheck, CheckCircle2 } from "lucide-react";
import { type ServiceProduct } from "@/contexts/CartContext";

const CATEGORY_LABELS: Record<string, string> = {
  egitim: "Eğitim Belgeleri",
  resmi: "Resmi Belgeler",
  ticari: "Ticari Belgeler",
};

const CATEGORY_ICONS: Record<string, typeof FileText> = {
  translation: Languages,
  sworn: ShieldCheck,
  official: Stamp,
  extra: Clock,
};

const UNIT_LABELS: Record<string, string> = {
  page: "sayfa",
  word: "kelime",
  document: "belge",
  item: "adet",
};

function formatPrice(price: number): string {
  return price.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

function ServiceCard({ product }: { product: ServiceProduct }) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-foreground text-lg">{product.name}</h3>
      </div>
      {product.description && (
        <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
      )}
      <div className="text-sm text-muted-foreground mb-3">
        Birim: <span className="font-medium text-foreground">{UNIT_LABELS[product.unit] || product.unit}</span> · Fiyat: <span className="font-medium text-foreground">{formatPrice(product.base_price)} ₺</span>
      </div>

      {(product.options && product.options.length > 0) && (
        <div className="mb-3 space-y-2">
          {product.options.map((opt) => (
            <div key={opt.key} className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">{opt.label}</span>
              <span className="text-muted-foreground">
                {opt.type === "surcharge_percent" ? `+%${opt.value}` : `+${formatPrice(opt.value)} ₺`}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
        <div>
          <span className="text-xs text-muted-foreground">Başlangıç</span>
          <div className="text-xl font-bold text-primary">{formatPrice(product.base_price)} ₺</div>
        </div>
        <a
          href="/teklif"
          className="px-4 py-2.5 rounded-lg font-medium text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition no-underline"
        >
          Teklif Al
        </a>
      </div>
    </div>
  );
}

export default function Hizmetler() {
  const [services, setServices] = useState<ServiceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setServices(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = services.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "all" || s.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const categories = ["all", ...Array.from(new Set(services.map((s) => s.category)))];
  const grouped = filtered.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, ServiceProduct[]>);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="w-5 h-5" /> Ana Sayfa
          </a>
          <div className="hidden md:flex gap-8 items-center">
            <a href="/fiyatlar" className="text-foreground hover:text-primary transition">Fiyatlar</a>
            <a href="/blog" className="text-foreground hover:text-primary transition">Blog</a>
            <a href="/hakkimizda" className="text-foreground hover:text-primary transition">Hakkımda</a>
            <a href="/teklif" className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition no-underline">Teklif Al</a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-3">Çeviri Hizmetleri</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Yeminli tercüme, resmi belge ve vize çevirisi. Hizmeti seçin, belgenizi gönderin, net teklif alın.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Hizmet ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {cat === "all" ? "Tümü" : CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-secondary/50 rounded-lg animate-pulse" style={{ animationDelay: `${i * 0.05}s` }} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p>Sonuç bulunamadı.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([category, items]) => {
              const Icon = CATEGORY_ICONS[category] || FileText;
              return (
                <div key={category}>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">{CATEGORY_LABELS[category] || category}</h2>
                    <span className="text-sm text-muted-foreground">({items.length})</span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((product) => (
                      <ServiceCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 bg-secondary/30 rounded-lg p-6">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            Önemli Bilgiler
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Yeminli tercüme bedeli belge türü ve yoğunluğa göre değişir; her belge için sabit değildir.</li>
            <li>• Noter bedeli belge türüne göre değişir; işlem öncesi noter makbuzuyla teyit edilir.</li>
            <li>• Noter işlem/takip bedeli, belgeyi notere götürme ve teslim alma hizmetidir.</li>
            <li>• Apostil şerhi valilik/kaymakamlıkça düzenlenir; devlet apostil bedeli ayrı alınmaz.</li>
            <li>• Acil teslimde +%30-%50 ek ücret uygulanır; kapasiteye bağlıdır.</li>
            <li>• Kargo bedeli gerçek gönderim bedelidir; şehir ve teslim şekline göre değişir.</li>
          </ul>
        </div>
      </div>


    </div>
  );
}

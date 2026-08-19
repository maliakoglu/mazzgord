import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Search, Package, Mail, Truck, CheckCircle2, Clock, AlertCircle, Loader2, ArrowLeft } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  payment_link_id: string;
  order_token?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  items: OrderItem[];
  total: number;
  status: string;
  delivery_method: string;
  shipping_address: string | null;
  shipping_tracking: string | null;
  created_at: string;
}

function formatPrice(price: number): string {
  return price.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

export default function SiparisTakip() {
  const [searchId, setSearchId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (id) {
      setSearchId(id);
      fetchOrder(id);
    }
  }, []);

  const fetchOrder = async (id: string) => {
    setLoading(true);
    setError("");
    setSearched(true);
    try {
      // UUID (order_token) veya MZ- formatı
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id.trim());
      const isQuote = isUUID || id.toUpperCase().startsWith("MZ-");
      const endpoint = isQuote ? `/api/quote/${id.trim()}` : `/api/orders/${id}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data.success) {
        if (isQuote) {
          // Quote formatını order formatına çevir
          const q = data.data;
          setOrder({
            payment_link_id: q.order_no,
            order_token: q.order_token,
            customer_name: "",
            customer_email: "",
            customer_phone: null,
            items: [{
              name: `${q.source_language} → ${q.target_language}${q.document_type ? " — " + q.document_type : ""}`,
              quantity: 1,
              unitPrice: q.estimated_price || 0,
              totalPrice: q.estimated_price || 0,
            }],
            total: q.estimated_price || 0,
            status: q.order_status || "pending",
            delivery_method: q.delivery_method || "digital",
            shipping_address: null,
            shipping_tracking: q.shipping_tracking,
            created_at: q.created_at,
          });
        } else {
          setOrder(data.data);
        }
      } else {
        setOrder(null);
        setError(data.error || "Sipariş bulunamadı");
      }
    } catch {
      setOrder(null);
      setError("Sunucu hatası. Lütfen tekrar deneyin.");
    }
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    fetchOrder(searchId.trim());
  };

  const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
    pending: { label: "Ödeme Bekleniyor", color: "text-orange-600 bg-orange-50 border-orange-200", icon: Clock },
    paid: { label: "Çeviri Devam Ediyor", color: "text-blue-600 bg-blue-50 border-blue-200", icon: Loader2 },
    delivered: { label: "Teslim Edildi", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
    cancelled: { label: "İptal Edildi", color: "text-red-600 bg-red-50 border-red-200", icon: AlertCircle },
  };

  const status = order ? statusConfig[order.status] || statusConfig.pending : null;
  const StatusIcon = status?.icon || Clock;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Sipariş Takibi | Mazzgord Çeviri Hizmetleri</title>
        <meta name="description" content="Sipariş durumunuzu takip edin." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="w-5 h-5" /> Ana Sayfa
          </a>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl font-bold text-primary mb-2 flex items-center gap-3">
          <Package className="w-7 h-7" /> Sipariş Takibi
        </h1>
        <p className="text-muted-foreground mb-8">Sipariş numaranızla (örn: MZ-00001) veya ödeme referans numaranızla çeviri işleminizin durumunu kontrol edin.</p>

        {/* Arama */}
        <form onSubmit={handleSearch} className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Sipariş no (örn: MZ-00001 veya e-posta'daki takip kodu)"
            />
          </div>
          <button type="submit" disabled={loading}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sorgula"}
          </button>
        </form>

        {/* Sonuç */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-muted-foreground">Sipariş sorgulanıyor...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center gap-3 py-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <p className="text-red-600 font-medium">{error}</p>
            <p className="text-sm text-muted-foreground">Sipariş numaranızı kontrol edip tekrar deneyin.</p>
          </div>
        )}

        {!loading && order && status && (
          <div className="space-y-4">
            {/* Durum kartı */}
            <div className={`flex items-center gap-3 p-4 rounded-lg border ${status.color}`}>
              <StatusIcon className={`w-6 h-6 ${order.status === "paid" ? "animate-spin" : ""}`} />
              <div>
                <p className="font-bold">{status.label}</p>
                <p className="text-sm opacity-80">Sipariş No: {order.payment_link_id}</p>
              </div>
            </div>

            {/* Sipariş detayı */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Sipariş Detayı</h2>
              <div className="space-y-2 mb-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-foreground">{item.name} × {item.quantity}</span>
                    <span className="text-muted-foreground">{formatPrice(item.totalPrice)} ₺</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-medium text-foreground">Toplam</span>
                <span className="text-xl font-bold text-primary">{formatPrice(order.total)} ₺</span>
              </div>
            </div>

            {/* Müşteri ve teslimat bilgileri */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Teslimat Bilgileri</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-muted-foreground">E-posta</p>
                    <p className="text-foreground">{order.customer_email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Truck className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-muted-foreground">Teslimat Yöntemi</p>
                    <p className="text-foreground">{order.delivery_method === "shipping" ? "Kargo ile Teslimat" : "Dijital Teslimat (E-posta/WhatsApp)"}</p>
                  </div>
                </div>
                {order.delivery_method === "shipping" && order.shipping_address && (
                  <div className="flex items-start gap-3">
                    <Package className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground">Kargo Adresi</p>
                      <p className="text-foreground whitespace-pre-line">{order.shipping_address}</p>
                    </div>
                  </div>
                )}
                {order.shipping_tracking && (
                  <div className="flex items-start gap-3">
                    <Truck className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-muted-foreground">Kargo Takip No</p>
                      <p className="text-foreground font-mono">{order.shipping_tracking}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Zaman çizelgesi */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Süreç</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status ? "bg-emerald-100" : "bg-secondary"}`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Sipariş Alındı</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at + "Z").toLocaleString("tr-TR")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status !== "pending" ? "bg-emerald-100" : "bg-secondary"}`}>
                    {order.status !== "pending" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Ödeme Tamamlandı</p>
                    <p className="text-xs text-muted-foreground">{order.status !== "pending" ? "Ödeme alındı" : "Bekleniyor"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === "delivered" ? "bg-emerald-100" : "bg-secondary"}`}>
                    {order.status === "delivered" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Teslim Edildi</p>
                    <p className="text-xs text-muted-foreground">{order.status === "delivered" ? "Belgeleriniz hazır" : "Bekleniyor"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !searched && !order && (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Sipariş numaranızı girerek durumunuzu kontrol edebilirsiniz.</p>
          </div>
        )}
      </div>
    </div>
  );
}

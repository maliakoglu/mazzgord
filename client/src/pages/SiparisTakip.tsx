import { useState, useEffect } from "react";
import Navbar from "@/components/home/Navbar";
import { Search, Package, Mail, Truck, CheckCircle2, Clock, AlertCircle, Loader2 } from "lucide-react";

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
  delivered_file_key?: string | null;
  is_quote?: boolean;
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
              totalPrice: q.estimated_price || 0 }],
            total: q.estimated_price || 0,
            status: q.order_status || "pending",
            delivery_method: q.delivery_method || "digital",
            shipping_address: null,
            shipping_tracking: q.shipping_tracking,
            delivered_file_key: q.delivered_file_key || null,
            is_quote: true,
            created_at: q.created_at });
        } else {
          setOrder({ ...data.data, is_quote: false });
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

  const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock; step: number }> = {
    pending: { label: "Teklif Alındı", color: "text-amber-600 bg-amber-50 border-amber-200", icon: Clock, step: 1 },
    contacted: { label: "İletişime Geçildi", color: "text-blue-600 bg-blue-50 border-blue-200", icon: Mail, step: 2 },
    needs_info: { label: "Bilgi/Belge Eksik", color: "text-orange-600 bg-orange-50 border-orange-200", icon: AlertCircle, step: 2 },
    qualified: { label: "Teklif Hazırlanıyor", color: "text-cyan-600 bg-cyan-50 border-cyan-200", icon: Clock, step: 3 },
    quote_sent: { label: "Teklif Gönderildi", color: "text-blue-600 bg-blue-50 border-blue-200", icon: Mail, step: 3 },
    won: { label: "İş Onaylandı", color: "text-indigo-600 bg-indigo-50 border-indigo-200", icon: CheckCircle2, step: 4 },
    payment_pending: { label: "Ödeme Bekleniyor", color: "text-orange-600 bg-orange-50 border-orange-200", icon: Clock, step: 4 },
    paid: { label: "Ödeme Alındı", color: "text-green-600 bg-green-50 border-green-200", icon: CheckCircle2, step: 5 },
    reviewing: { label: "Belge İnceleniyor", color: "text-blue-600 bg-blue-50 border-blue-200", icon: Loader2, step: 6 },
    processing: { label: "Çeviri Devam Ediyor", color: "text-blue-600 bg-blue-50 border-blue-200", icon: Loader2, step: 6 },
    translating: { label: "Çeviriye Başlandı", color: "text-indigo-600 bg-indigo-50 border-indigo-200", icon: Loader2, step: 6 },
    quality_control: { label: "Kalite Kontrol", color: "text-purple-600 bg-purple-50 border-purple-200", icon: CheckCircle2, step: 7 },
    completed: { label: "Çeviri Tamamlandı", color: "text-green-600 bg-green-50 border-green-200", icon: CheckCircle2, step: 7 },
    delivered: { label: "Teslim Edildi", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: CheckCircle2, step: 8 },
    repeat_closed: { label: "Tamamlandı", color: "text-gray-600 bg-gray-50 border-gray-200", icon: CheckCircle2, step: 8 },
    lost: { label: "İşlem Yapılamadı", color: "text-red-600 bg-red-50 border-red-200", icon: AlertCircle, step: 0 },
    cancelled: { label: "İptal Edildi", color: "text-red-600 bg-red-50 border-red-200", icon: AlertCircle, step: 0 },
  };

  const status = order ? statusConfig[order.status] || statusConfig.pending : null;
  const StatusIcon = status?.icon || Clock;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

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
              <h2 className="text-lg font-bold text-foreground mb-4">Süreç Takibi</h2>
              <div className="space-y-1">
                {[
                  { step: 1, label: "Teklif Alındı", desc: "Talebiniz sistemimize kaydedildi" },
                  { step: 2, label: "İletişim & Bilgi Doğrulama", desc: "Detaylar netleştiriliyor" },
                  { step: 3, label: "Teklif Hazırlığı", desc: "Fiyat ve süre belirleniyor" },
                  { step: 4, label: "Onay & Ödeme", desc: "Sipariş onayı ve ödeme adımı" },
                  { step: 5, label: "Ödeme Alındı", desc: "Çeviri süreci başlıyor" },
                  { step: 6, label: "Çeviri Devam Ediyor", desc: "Belgeleriniz çevriliyor" },
                  { step: 7, label: "Kalite Kontrol", desc: "Çeviri kontrol ediliyor" },
                  { step: 8, label: "Teslim Edildi", desc: "Belgeleriniz hazır" },
                ].map((s) => {
                  const currentStep = status?.step || 0;
                  const isDone = currentStep > s.step;
                  const isCurrent = currentStep === s.step;
                  const isCancelled = status?.step === 0;
                  return (
                    <div key={s.step} className="flex items-start gap-3 pb-4 last:pb-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDone ? "bg-emerald-100" : isCurrent ? "bg-primary/10 ring-2 ring-primary" : "bg-secondary"
                      }`}>
                        {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> :
                         isCurrent ? <Loader2 className="w-4 h-4 text-primary animate-spin" /> :
                         <Clock className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <div className="pt-1">
                        <p className={`text-sm font-medium ${isCurrent ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"}`}>
                          {s.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isDone ? "Tamamlandı" : isCurrent ? "Devam ediyor..." : isCancelled ? "—" : "Bekliyor"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {status?.step === 0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {status.label}
                  </p>
                </div>
              )}
            </div>

            {/* Dosya İndirme */}
            {order.status === "delivered" && order.delivered_file_key && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-emerald-800">Belgeniz Hazır!</p>
                      <p className="text-sm text-emerald-700">Çevrilmiş belgenizi indirebilirsiniz.</p>
                    </div>
                  </div>
                  <a href={order.is_quote ? `/api/quote/${order.payment_link_id}/download` : `/api/orders/${order.payment_link_id}/download`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition">
                    <Package className="w-5 h-5" /> Belgeyi İndir
                  </a>
                </div>
              </div>
            )}
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

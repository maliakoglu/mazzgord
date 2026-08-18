import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { User, FileText, Download, LogOut, Loader2, AlertCircle, Package, CreditCard, Clock } from "lucide-react";

interface Customer { id: number; name: string; email: string; phone: string; }
interface Quote { id: number; source_language: string; target_language: string; document_type: string; order_status: string; estimated_price: number; delivered_file_key: string | null; created_at: string; }
interface Order { payment_link_id: string; customer_name: string; items: any[]; total: number; status: string; delivered_file_key: string | null; created_at: string; }
interface Payment { amount: number; description: string; status: string; payment_link_id: string; created_at: string; }

const STATUS_LABELS: Record<string, string> = {
  pending: "Beklemede", processing: "İşleniyor", completed: "Tamamlandı", delivered: "Teslim Edildi", cancelled: "İptal", paid: "Ödendi",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800", processing: "bg-blue-100 text-blue-800", completed: "bg-green-100 text-green-800", delivered: "bg-green-100 text-green-800", cancelled: "bg-red-100 text-red-800", paid: "bg-green-100 text-green-800",
};

export default function Hesabim() {
  const [, navigate] = useLocation();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [data, setData] = useState<{ quotes: Quote[]; orders: Order[]; payments: Payment[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"quotes" | "orders" | "payments">("quotes");

  useEffect(() => {
    const token = localStorage.getItem("mazzgord_token");
    const savedCustomer = localStorage.getItem("mazzgord_customer");
    if (!token || !savedCustomer) {
      navigate("/giris");
      return;
    }
    setCustomer(JSON.parse(savedCustomer));
    fetchData(token);
  }, []);

  const fetchData = async (token: string) => {
    try {
      const res = await fetch("/api/account/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || "Veri yüklenemedi");
      }
    } catch {
      setError("Sunucu hatası");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("mazzgord_token");
    localStorage.removeItem("mazzgord_customer");
    navigate("/");
  };

  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = async (fileKey: string) => {
    const token = localStorage.getItem("mazzgord_token");
    if (!token) return;
    setDownloading(fileKey);
    try {
      const res = await fetch(`/api/account/files/${encodeURIComponent(fileKey)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileKey.split("/").pop() || "dosya";
        a.click();
        URL.revokeObjectURL(url);
      } else {
        alert("Dosya bulunamadı veya henüz teslim edilmedi.");
      }
    } catch {
      alert("Dosya indirilemedi. Lütfen tekrar deneyin.");
    }
    setDownloading(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Hesabım | Mazzgord Çeviri Hizmetleri</title>
        <meta name="description" content="Sipariş geçmişiniz, teklifleriniz ve dosyalarınız." />
      </Helmet>

      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-primary">Mazzgord</a>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
            <LogOut className="w-4 h-4" /> Çıkış
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profil */}
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{customer?.name}</h1>
              <p className="text-sm text-muted-foreground">{customer?.email}</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm rounded-lg p-3 mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button onClick={() => setTab("quotes")} className={`px-4 py-2 font-medium text-sm border-b-2 transition ${tab === "quotes" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            Teklifler ({data?.quotes?.length || 0})
          </button>
          <button onClick={() => setTab("orders")} className={`px-4 py-2 font-medium text-sm border-b-2 transition ${tab === "orders" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            Siparişler ({data?.orders?.length || 0})
          </button>
          <button onClick={() => setTab("payments")} className={`px-4 py-2 font-medium text-sm border-b-2 transition ${tab === "payments" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            Ödemeler ({data?.payments?.length || 0})
          </button>
        </div>

        {/* Quotes */}
        {tab === "quotes" && (
          <div className="space-y-3">
            {(data?.quotes || []).length === 0 ? (
              <p className="text-center text-muted-foreground py-12">Henüz teklif talebiniz yok.</p>
            ) : (
              (data?.quotes || []).map((q) => (
                <div key={q.id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-foreground">MZ-{String(q.id).padStart(5, "0")}</p>
                      <p className="text-sm text-muted-foreground">{q.source_language} → {q.target_language}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[q.order_status] || "bg-gray-100 text-gray-800"}`}>
                      {STATUS_LABELS[q.order_status] || q.order_status}
                    </span>
                  </div>
                  {q.document_type && <p className="text-sm text-muted-foreground mb-1">Belge: {q.document_type}</p>}
                  {q.estimated_price && <p className="text-sm font-medium text-foreground">Tutar: {q.estimated_price} ₺</p>}
                  <p className="text-xs text-muted-foreground mt-2">{new Date(q.created_at).toLocaleDateString("tr-TR")}</p>
                  {q.delivered_file_key && (q.order_status === "delivered" || q.order_status === "completed") && (
                    <button
                      onClick={() => handleDownload(q.delivered_file_key!)}
                      className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                    >
                      {downloading === q.delivered_file_key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Çevrilmiş Belgeyi İndir
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Orders */}
        {tab === "orders" && (
          <div className="space-y-3">
            {(data?.orders || []).length === 0 ? (
              <p className="text-center text-muted-foreground py-12">Henüz siparişiniz yok.</p>
            ) : (
              (data?.orders || []).map((o) => (
                <div key={o.payment_link_id} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-foreground flex items-center gap-2"><Package className="w-4 h-4" /> {o.payment_link_id}</p>
                      <p className="text-sm text-muted-foreground">{o.items?.map((i: any) => i.name).join(", ")}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[o.status] || "bg-gray-100 text-gray-800"}`}>
                      {STATUS_LABELS[o.status] || o.status}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{o.total} ₺</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(o.created_at).toLocaleDateString("tr-TR")}</p>
                  {o.delivered_file_key && (o.status === "delivered" || o.status === "completed") && (
                    <button
                      onClick={() => handleDownload(o.delivered_file_key!)}
                      className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                    >
                      {downloading === o.delivered_file_key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} Çevrilmiş Belgeyi İndir
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Payments */}
        {tab === "payments" && (
          <div className="space-y-3">
            {(data?.payments || []).length === 0 ? (
              <p className="text-center text-muted-foreground py-12">Henüz ödeme geçmişiniz yok.</p>
            ) : (
              (data?.payments || []).map((p, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-foreground flex items-center gap-2"><CreditCard className="w-4 h-4" /> {p.description}</p>
                      <p className="text-sm text-muted-foreground">{p.payment_link_id}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{p.amount} ₺</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${STATUS_COLORS[p.status] || "bg-gray-100 text-gray-800"}`}>
                        {STATUS_LABELS[p.status] || p.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(p.created_at).toLocaleDateString("tr-TR")}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

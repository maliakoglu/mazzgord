import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { User, FileText, Download, LogOut, Loader2, AlertCircle, Package, CreditCard, Clock, MessageCircle, Send, X, CheckCircle, XCircle } from "lucide-react";

interface Customer { id: number; name: string; email: string; phone: string; }
interface Quote { id: number; source_language: string; target_language: string; document_type: string; order_status: string; offer_status: string; offer_note: string | null; estimated_price: number; delivery_date: string | null; delivered_file_key: string | null; file_key: string | null; document_uploaded_at: string | null; created_at: string; }
interface Order { payment_link_id: string; customer_name: string; items: any[]; total: number; status: string; delivered_file_key: string | null; created_at: string; }
interface Payment { amount: number; description: string; status: string; payment_link_id: string; created_at: string; }

const STATUS_LABELS: Record<string, string> = {
  pending: "Beklemede", processing: "İşleniyor", reviewing: "İnceleniyor", in_progress: "Hazırlanıyor", payment_pending: "Ödeme Bekleniyor", completed: "Tamamlandı", delivered: "Teslim Edildi", cancelled: "İptal", rejected: "Reddedildi", paid: "Ödendi",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800", processing: "bg-blue-100 text-blue-800", reviewing: "bg-blue-100 text-blue-800", in_progress: "bg-blue-100 text-blue-800", payment_pending: "bg-orange-100 text-orange-800", completed: "bg-green-100 text-green-800", delivered: "bg-green-100 text-green-800", cancelled: "bg-red-100 text-red-800", rejected: "bg-gray-200 text-gray-600", paid: "bg-green-100 text-green-800",
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
  const [chatQuoteId, setChatQuoteId] = useState<number | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatSending, setChatSending] = useState(false);

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
      } else if (res.status === 402) {
        const result = await res.json().catch(() => ({}));
        alert(result.error || "Bu belgeye erişmek için ödemenizi tamamlamanız gerekiyor.");
      } else {
        alert("Dosya bulunamadı veya henüz teslim edilmedi.");
      }
    } catch {
      alert("Dosya indirilemedi. Lütfen tekrar deneyin.");
    }
    setDownloading(null);
  };

  const [actionLoading, setActionLoading] = useState<number | null>(null);

  const handleAccept = async (quoteId: number) => {
    const token = localStorage.getItem("mazzgord_token");
    if (!token) return;
    setActionLoading(quoteId);
    try {
      const res = await fetch(`/api/quote/${quoteId}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) {
        if (result.payment_link_id) {
          window.location.href = `/odeme?id=${result.payment_link_id}`;
        } else {
          fetchData(token);
        }
      } else {
        alert(result.error || "Teklif kabul edilemedi");
      }
    } catch {
      alert("Sunucu hatası");
    }
    setActionLoading(null);
  };

  const handleReject = async (quoteId: number) => {
    const token = localStorage.getItem("mazzgord_token");
    if (!token) return;
    if (!confirm("Bu teklifi reddetmek istediğinize emin misiniz? Bu işlem sonlandırılacaktır.")) return;
    setActionLoading(quoteId);
    try {
      const res = await fetch(`/api/quote/${quoteId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({}),
      });
      const result = await res.json();
      if (result.success) {
        fetchData(token);
      } else {
        alert(result.error || "Teklif reddedilemedi");
      }
    } catch {
      alert("Sunucu hatası");
    }
    setActionLoading(null);
  };

  const openChat = async (quoteId: number) => {
    setChatQuoteId(quoteId);
    setChatLoading(true);
    const token = localStorage.getItem("mazzgord_token");
    if (!token) return;
    try {
      const res = await fetch(`/api/messages/order/${quoteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      if (result.success) setChatMessages(result.data);
    } catch {
      setChatMessages([]);
    }
    setChatLoading(false);
  };

  const closeChat = () => {
    setChatQuoteId(null);
    setChatMessages([]);
    setChatInput("");
  };

  const sendMessage = async () => {
    if (!chatInput.trim() || !chatQuoteId) return;
    const token = localStorage.getItem("mazzgord_token");
    if (!token) return;
    setChatSending(true);
    try {
      const res = await fetch(`/api/messages/order/${chatQuoteId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: chatInput.trim() }),
      });
      const result = await res.json();
      if (result.success) {
        setChatMessages(prev => [...prev, { id: Date.now(), sender: "customer", message: chatInput.trim(), created_at: new Date().toISOString() }]);
        setChatInput("");
      }
    } catch {
      alert("Mesaj gönderilemedi");
    }
    setChatSending(false);
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
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <button
                      onClick={() => openChat(q.id)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition"
                    >
                      <MessageCircle className="w-4 h-4" /> Mesaj
                    </button>
                    {q.offer_status === "offered" && (
                      <>
                        <button
                          onClick={() => handleAccept(q.id)}
                          disabled={actionLoading === q.id}
                          className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition disabled:opacity-50"
                        >
                          {actionLoading === q.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />} Kabul Et
                        </button>
                        <button
                          onClick={() => handleReject(q.id)}
                          disabled={actionLoading === q.id}
                          className="flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition disabled:opacity-50"
                        >
                          <XCircle className="w-4 h-4" /> Reddet
                        </button>
                      </>
                    )}
                    {q.offer_status === "accepted" && q.order_status === "payment_pending" && (
                      <button
                        onClick={() => handleAccept(q.id)}
                        disabled={actionLoading === q.id}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50"
                      >
                        {actionLoading === q.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />} Ödemeye Geç
                      </button>
                    )}
                    {q.delivered_file_key && (q.order_status === "delivered" || q.order_status === "completed") && (
                      <button
                        onClick={() => handleDownload(q.delivered_file_key!)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                      >
                        {downloading === q.delivered_file_key ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />} İndir
                      </button>
                    )}
                  </div>
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
        {/* Chat Modal */}
      {chatQuoteId && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeChat}></div>
          <div className="relative bg-background border border-border rounded-t-2xl md:rounded-2xl w-full md:max-w-lg h-[70vh] md:h-[60vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Sipariş MZ-{String(chatQuoteId).padStart(5, "0")}
              </h3>
              <button onClick={closeChat} className="p-1 hover:bg-accent rounded-lg transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              ) : chatMessages.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Henüz mesaj yok. İlk mesajınızı gönderin.</p>
              ) : (
                chatMessages.map((m) => (
                  <div key={m.id} className={"flex " + (m.sender === "customer" ? "justify-end" : "justify-start")}>
                    <div className={"max-w-[80%] rounded-xl px-4 py-2.5 " + (m.sender === "customer" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-secondary-foreground rounded-bl-sm")}>
                      <p className="text-sm">{m.message}</p>
                      <p className={"text-xs mt-1 " + (m.sender === "customer" ? "text-primary-foreground/70" : "text-muted-foreground")}>
                        {new Date(m.created_at).toLocaleString("tr-TR")}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  placeholder="Mesajınızı yazın..."
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatInput.trim() || chatSending}
                  className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50"
                >
                  {chatSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

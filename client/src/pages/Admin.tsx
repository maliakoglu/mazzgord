import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Shield, Mail, FileText, Download, LogOut, RefreshCw, Inbox, ClipboardList, CreditCard, CheckCircle2, Eye, X, TrendingUp, Clock, AlertTriangle, DollarSign, Users, Languages, Package } from "lucide-react";
import { toast } from "sonner";
import AdminServices from "@/components/admin/AdminServices";

// Admin token — backend /api/admin/login'den alınır, sessionStorage'da saklanır

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}

interface Quote {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  source_language: string;
  target_language: string;
  document_type: string | null;
  page_count: number | null;
  notes: string | null;
  file_key: string | null;
  status: string;
  created_at: string;
  service_type?: string | null;
  urgency?: string | null;
  delivery_method?: string | null;
  word_count?: number | null;
  yeminli?: number;
  noter_onay?: number;
  order_status?: string | null;
  estimated_price?: number | null;
  translator?: string | null;
  delivery_date?: string | null;
  shipping_address?: string | null;
  shipping_tracking?: string | null;
}

interface Customer {
  email: string;
  name: string;
  phone: string | null;
  total_orders: number;
  lang_variety: number;
  first_order: string;
  last_order: string;
  total_spent: number;
  lang_pairs: string | null;
}

interface DashboardData {
  todayQuotes: number;
  pendingQuotes: number;
  urgentQuotes: number;
  todayRevenue: number;
  monthRevenue: number;
  totalQuotes: number;
  totalPaid: number;
  topLanguages: Array<{ pair: string; count: number }>;
  recentCustomers: Array<{ name: string; email: string; created_at: string }>;
}

const ORDER_STATUSES = [
  { value: "pending", label: "Yeni Talep", color: "bg-yellow-100 text-yellow-800" },
  { value: "contacted", label: "İletişime Geçildi", color: "bg-blue-100 text-blue-800" },
  { value: "needs_info", label: "Bilgi/Belge Eksik", color: "bg-amber-100 text-amber-800" },
  { value: "qualified", label: "Teklif için Hazır", color: "bg-cyan-100 text-cyan-800" },
  { value: "quote_sent", label: "Teklif Gönderildi", color: "bg-sky-100 text-sky-800" },
  { value: "follow_up", label: "Takip Gerekli", color: "bg-orange-100 text-orange-800" },
  { value: "won", label: "İş Onaylandı", color: "bg-indigo-100 text-indigo-800" },
  { value: "payment_pending", label: "Ödeme Bekleniyor", color: "bg-orange-100 text-orange-800" },
  { value: "paid", label: "Ödeme Alındı", color: "bg-green-100 text-green-800" },
  { value: "reviewing", label: "İnceleniyor", color: "bg-blue-100 text-blue-800" },
  { value: "translating", label: "Çeviriye Başlandı", color: "bg-indigo-100 text-indigo-800" },
  { value: "quality_control", label: "Kalite Kontrol", color: "bg-purple-100 text-purple-800" },
  { value: "completed", label: "Tamamlandı", color: "bg-teal-100 text-teal-800" },
  { value: "delivered", label: "Teslim Edildi", color: "bg-emerald-100 text-emerald-800" },
  { value: "repeat_closed", label: "Tekrar İş/Kapandı", color: "bg-gray-100 text-gray-800" },
  { value: "lost", label: "Kaybedildi", color: "bg-red-100 text-red-800" },
  { value: "cancelled", label: "İptal", color: "bg-red-100 text-red-800" },
];

interface Payment {
  id: number;
  quote_id: number | null;
  amount: number;
  description: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  payment_link_id: string;
  status: string;
  iyzico_payment_id: string | null;
  created_at: string;
  paid_at: string | null;
}

interface Order {
  id: number;
  payment_link_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  items_json: string;
  total: number;
  status: string;
  delivery_method: string;
  shipping_address: string | null;
  shipping_tracking: string | null;
  source_language?: string | null;
  target_language?: string | null;
  file_key?: string | null;
  created_at: string;
  items?: any[];
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"dashboard" | "messages" | "quotes" | "payments" | "customers" | "services" | "orders">("dashboard");
  const [messages, setMessages] = useState<Message[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    amount: "",
    description: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
  });
  const [paymentFormLoading, setPaymentFormLoading] = useState(false);
  const [refundingId, setRefundingId] = useState<string | null>(null);
  const [createdPaymentUrl, setCreatedPaymentUrl] = useState("");
  const [previewFile, setPreviewFile] = useState<{ url: string; name: string; type: string } | null>(null);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [deliveringOrderId, setDeliveringOrderId] = useState<string | null>(null);
  const [deliverForm, setDeliverForm] = useState({ tracking_number: "", delivery_note: "" });
  const [deliverLoading, setDeliverLoading] = useState(false);
  const [deliveringQuoteId, setDeliveringQuoteId] = useState<number | null>(null);
  const [quoteDeliverForm, setQuoteDeliverForm] = useState({ tracking_number: "", delivery_note: "" });
  const [quoteDeliverLoading, setQuoteDeliverLoading] = useState(false);
  const [editingQuoteId, setEditingQuoteId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ order_status: "", estimated_price: "", translator: "", delivery_date: "" });

  useEffect(() => {
    const saved = sessionStorage.getItem("mazzgord_admin");
    if (saved) {
      setAdminToken(saved);
      setAuthed(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        setAdminToken(data.token);
        setAuthed(true);
        sessionStorage.setItem("mazzgord_admin", data.token);
      } else {
        setError("Hatalı şifre");
      }
    } catch {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    setAdminToken("");
    sessionStorage.removeItem("mazzgord_admin");
    setPassword("");
  };

  const handleRefund = async (paymentLinkId: string) => {
    if (!confirm("Bu ödemeyi iade etmek istediğinize emin misiniz?")) return;
    setRefundingId(paymentLinkId);
    try {
      const adminToken = localStorage.getItem("adminToken");
      const res = await fetch("/api/payment/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${adminToken}` },
        body: JSON.stringify({ payment_link_id: paymentLinkId }),
      });
      const data = await res.json();
      if (data.success) {
        setPayments(payments.map(p => p.payment_link_id === paymentLinkId ? { ...p, status: "refunded" } : p));
        toast.success("Ödeme iade edildi");
      } else {
        toast.error(data.error || "İade işlemi başarısız");
      }
    } catch {
      toast.error("Sunucu hatası");
    } finally {
      setRefundingId(null);
    }
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentFormLoading(true);
    setCreatedPaymentUrl("");
    try {
      const res = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          amount: parseFloat(paymentForm.amount),
          description: paymentForm.description || "Çeviri Hizmeti",
          customer_name: paymentForm.customer_name,
          customer_email: paymentForm.customer_email,
          customer_phone: paymentForm.customer_phone || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setCreatedPaymentUrl(data.payment_url);
        setPaymentForm({ amount: "", description: "", customer_name: "", customer_email: "", customer_phone: "" });
        fetchData();
      } else {
        alert("Hata: " + (data.error || "Ödeme oluşturulamadı"));
      }
    } catch (err) {
      alert("Bağlantı hatası");
    }
    setPaymentFormLoading(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Ödeme linki kopyalandı!");
  };

  const createPaymentFromQuote = (q: Quote) => {
    const descParts = [
      q.source_language && q.target_language ? `${q.source_language}→${q.target_language}` : "",
      q.document_type || "",
    ].filter(Boolean).join(" — ");
    setPaymentForm({
      amount: "",
      description: descParts || "Çeviri Hizmeti",
      customer_name: q.name,
      customer_email: q.email,
      customer_phone: q.phone || "",
    });
    setShowPaymentModal(true);
    setCreatedPaymentUrl("");
    setTab("payments");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${adminToken}` };
      const [msgRes, quoteRes, payRes, dashRes, custRes, ordRes] = await Promise.all([
        fetch("/api/messages", { headers }),
        fetch("/api/quotes", { headers }),
        fetch("/api/payments", { headers }),
        fetch("/api/dashboard", { headers }),
        fetch("/api/customers", { headers }),
        fetch("/api/orders", { headers }),
      ]);
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData.data || []);
      }
      if (quoteRes.ok) {
        const quoteData = await quoteRes.json();
        setQuotes(quoteData.data || []);
      }
      if (payRes.ok) {
        const payData = await payRes.json();
        setPayments(payData.data || []);
      }
      if (dashRes.ok) {
        const dashData = await dashRes.json();
        setDashboard(dashData.data || null);
      }
      if (custRes.ok) {
        const custData = await custRes.json();
        setCustomers(custData.data || []);
      }
      if (ordRes.ok) {
        const ordData = await ordRes.json();
        setOrders(ordData.data || []);
      }
    } catch (err) {
      console.error("Veri çekme hatası:", err);
    }
    setLoading(false);
  };

  const updateQuoteStatus = async (quoteId: number) => {
    try {
      const res = await fetch(`/api/quote/${quoteId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          status: editForm.order_status,
          estimated_price: editForm.estimated_price ? parseFloat(editForm.estimated_price) : null,
          translator: editForm.translator || null,
          delivery_date: editForm.delivery_date || null,
        }),
      });
      if (res.ok) {
        setEditingQuoteId(null);
        fetchData();
      }
    } catch (err) {
      console.error("Durum güncelleme hatası:", err);
    }
  };

  const startEditQuote = (q: Quote) => {
    setEditingQuoteId(q.id);
    setEditForm({
      order_status: q.order_status || q.status || "pending",
      estimated_price: q.estimated_price?.toString() || "",
      translator: q.translator || "",
      delivery_date: q.delivery_date || "",
    });
  };

  const getStatusLabel = (status: string) => {
    const s = ORDER_STATUSES.find(o => o.value === status);
    return s ? s.label : status;
  };

  const getStatusColor = (status: string) => {
    const s = ORDER_STATUSES.find(o => o.value === status);
    return s ? s.color : "bg-gray-100 text-gray-800";
  };

  useEffect(() => {
    if (authed) fetchData();
  }, [authed]);

  const downloadFile = async (fileKey: string) => {
    try {
      const key = fileKey.replace("uploads/", "");
      const res = await fetch(`/api/files/${key}`, {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = key.split("-").slice(1).join("-") || key;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("İndirme hatası:", err);
    }
  };

  const viewFile = async (fileKey: string) => {
    try {
      const key = fileKey.replace("uploads/", "");
      const res = await fetch(`/api/files/${key}`, {
        headers: { Authorization: `Bearer ${adminToken}`, "X-View-Mode": "inline" },
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const fileName = fileKey.split("/").pop() || key;
        const ext = fileName.split(".").pop()?.toLowerCase() || "";
        setPreviewFile({ url, name: fileName, type: ext });
      }
    } catch (err) {
      console.error("Görüntüleme hatası:", err);
    }
  };

  const closePreview = () => {
    if (previewFile) {
      URL.revokeObjectURL(previewFile.url);
    }
    setPreviewFile(null);
  };

  const deliverOrder = async (linkId: string) => {
    setDeliverLoading(true);
    try {
      const res = await fetch(`/api/orders/${linkId}/deliver`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          tracking_number: deliverForm.tracking_number || null,
          delivery_note: deliverForm.delivery_note || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDeliveringOrderId(null);
        setDeliverForm({ tracking_number: "", delivery_note: "" });
        fetchData();
      } else {
        alert("Hata: " + (data.error || "Teslim edilemedi"));
      }
    } catch {
      alert("Bağlantı hatası");
    }
    setDeliverLoading(false);
  };

  const startDeliverOrder = (linkId: string, deliveryMethod: string) => {
    setDeliveringOrderId(linkId);
    setDeliverForm({
      tracking_number: "",
      delivery_note: deliveryMethod === "digital"
        ? "Çeviri belgeleri e-posta ve WhatsApp ile gönderilecektir."
        : "",
    });
  };

  const deliverQuote = async (quoteId: number) => {
    setQuoteDeliverLoading(true);
    try {
      const res = await fetch(`/api/quote/${quoteId}/deliver`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          tracking_number: quoteDeliverForm.tracking_number || null,
          delivery_note: quoteDeliverForm.delivery_note || null,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setDeliveringQuoteId(null);
        setQuoteDeliverForm({ tracking_number: "", delivery_note: "" });
        fetchData();
      } else {
        alert("Hata: " + (data.error || "Teslim edilemedi"));
      }
    } catch {
      alert("Bağlantı hatası");
    }
    setQuoteDeliverLoading(false);
  };

  const startDeliverQuote = (quoteId: number, deliveryMethod: string | null | undefined) => {
    setDeliveringQuoteId(quoteId);
    setQuoteDeliverForm({
      tracking_number: "",
      delivery_note: deliveryMethod !== "shipping"
        ? "Çeviri belgeleri e-posta ve WhatsApp ile gönderilecektir."
        : "",
    });
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Helmet>
          <title>Admin Panel | Mazzgord</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground mt-2">Mazzgord Yönetim Girişi</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Şifre</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                placeholder="Admin şifresi"
                required
                autoFocus
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
            >
              Giriş Yap
            </button>
          </form>
          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-muted-foreground hover:text-primary transition">← Ana Sayfaya Dön</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Panel | Mazzgord</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
            <span className="text-sm text-muted-foreground hidden md:inline">| Mazzgord</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={fetchData} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden md:inline">Yenile</span>
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition">
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setTab("dashboard")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${tab === "dashboard" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
          >
            <TrendingUp className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => setTab("messages")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${tab === "messages" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
          >
            <Mail className="w-4 h-4" />
            Mesajlar ({messages.length})
          </button>
          <button
            onClick={() => setTab("quotes")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${tab === "quotes" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
          >
            <ClipboardList className="w-4 h-4" />
            Teklifler ({quotes.length})
          </button>
          <button
            onClick={() => setTab("payments")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${tab === "payments" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
          >
            <CreditCard className="w-4 h-4" />
            Ödemeler ({payments.length})
          </button>
          <button
            onClick={() => setTab("services")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${tab === "services" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
          >
            <Package className="w-4 h-4" />
            Hizmetler
          </button>
          <button
            onClick={() => setTab("orders")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${tab === "orders" ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground hover:bg-secondary/80"}`}
          >
            <FileText className="w-4 h-4" />
            Siparişler ({orders.length})
          </button>
        </div>

        {tab === "dashboard" && dashboard && (
          <div className="space-y-6">
            {/* Stat kartları */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-muted-foreground">Bugünkü Sipariş</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{dashboard.todayQuotes}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">Bekleyen İş</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{dashboard.pendingQuotes}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-muted-foreground">Acil İşler</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{dashboard.urgentQuotes}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-muted-foreground">Bugünkü Kazanç</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{dashboard.todayRevenue.toFixed(2)} ₺</p>
              </div>
            </div>

            {/* İkinci satır */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">Bu Ay Kazanç</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{dashboard.monthRevenue.toFixed(2)} ₺</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <ClipboardList className="w-5 h-5 text-indigo-500" />
                  <span className="text-sm text-muted-foreground">Toplam Sipariş</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{dashboard.totalQuotes}</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CreditCard className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm text-muted-foreground">Tamamlanan Ödeme</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{dashboard.totalPaid}</p>
              </div>
            </div>

            {/* En çok çevrilen diller */}
            {dashboard.topLanguages.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-primary" />
                  En Çok Çeviri Yapılan Diller
                </h3>
                <div className="space-y-3">
                  {dashboard.topLanguages.map((lang, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-foreground">{lang.pair}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-secondary rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-full rounded-full"
                            style={{ width: `${(lang.count / dashboard.topLanguages[0].count) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground font-medium w-8">{lang.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Son müşteriler */}
            {dashboard.recentCustomers.length > 0 && (
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Son Müşteriler
                </h3>
                <div className="space-y-3">
                  {dashboard.recentCustomers.map((c, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium text-foreground">{c.name}</p>
                        <p className="text-sm text-muted-foreground">{c.email}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(c.created_at + "Z").toLocaleDateString("tr-TR")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "dashboard" && !dashboard && (
          <div className="text-center py-20 text-muted-foreground">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Dashboard yükleniyor...</p>
          </div>
        )}

        {tab === "customers" && (
          <div className="space-y-4">
            {customers.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Henüz müşteri yok</p>
              </div>
            ) : (
              customers.map((c) => (
                <div key={c.email} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-foreground">{c.name}</h3>
                      <p className="text-sm text-muted-foreground">{c.email}</p>
                      {c.phone && <p className="text-sm text-muted-foreground">📞 {c.phone}</p>}
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-muted-foreground">Son Sipariş:</span>
                      <p className="text-sm font-medium text-foreground">{new Date(c.last_order + "Z").toLocaleDateString("tr-TR")}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
                    <div>
                      <span className="text-xs text-muted-foreground">Toplam Sipariş</span>
                      <p className="text-lg font-bold text-foreground">{c.total_orders}</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Toplam Harcama</span>
                      <p className="text-lg font-bold text-green-600">{c.total_spent.toFixed(2)} ₺</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Dil Çeşitliliği</span>
                      <p className="text-lg font-bold text-foreground">{c.lang_variety}</p>
                    </div>
                  </div>
                  {c.lang_pairs && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">Dil Çiftleri: </span>
                      <span className="text-sm text-foreground">{c.lang_pairs}</span>
                    </div>
                  )}
                  <div className="mt-2 text-xs text-muted-foreground">
                    İlk Sipariş: {new Date(c.first_order + "Z").toLocaleDateString("tr-TR")}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "services" && (
          <AdminServices adminToken={adminToken} />
        )}

        {tab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Henüz sipariş yok</p>
              </div>
            ) : (
              orders.map((o) => {
                let items: any[] = [];
                try { items = o.items_json ? JSON.parse(o.items_json) : (o.items || []); } catch {}
                const isDelivered = o.status === "delivered";
                const isPending = o.status === "pending";
                return (
                  <div key={o.id} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm text-muted-foreground">#{o.payment_link_id}</span>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${isDelivered ? "bg-emerald-100 text-emerald-800" : isPending ? "bg-orange-100 text-orange-800" : "bg-blue-100 text-blue-800"}`}>
                            {isDelivered ? "Teslim Edildi" : isPending ? "Beklemede" : o.status}
                          </span>
                        </div>
                        <h3 className="font-bold text-foreground">{o.customer_name}</h3>
                        <p className="text-sm text-muted-foreground">{o.customer_email}{o.customer_phone ? ` · ${o.customer_phone}` : ""}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">{Number(o.total).toLocaleString("tr-TR")} ₺</div>
                        <p className="text-xs text-muted-foreground">{new Date(o.created_at + "Z").toLocaleString("tr-TR")}</p>
                      </div>
                    </div>

                    <div className="bg-secondary/20 rounded-lg p-3 mb-3">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {items.map((item, i) => (
                          <span key={i} className="text-sm bg-background px-2 py-1 rounded border border-border">
                            {item.name} × {item.quantity}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                        {(o.source_language || o.target_language) && (
                          <span>Dil: <strong className="text-foreground">{o.source_language || "?"} → {o.target_language || "?"}</strong></span>
                        )}
                        <span>Teslimat: <strong className="text-foreground">{o.delivery_method === "shipping" ? "Kargo" : "Dijital"}</strong></span>
                        {o.shipping_address && (
                          <span className="text-foreground">📍 {o.shipping_address.substring(0, 80)}{o.shipping_address.length > 80 ? "..." : ""}</span>
                        )}
                        {o.shipping_tracking && (
                          <span>Kargo Takip: <strong className="text-foreground font-mono">{o.shipping_tracking}</strong></span>
                        )}
                      </div>
                    </div>

                    {o.file_key && (
                      <div className="mt-3 flex items-center gap-3">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm text-muted-foreground truncate">{o.file_key.split("/").pop()}</span>
                        <button onClick={() => viewFile(o.file_key!)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition">
                          <Eye className="w-3 h-3" /> Görüntüle
                        </button>
                        <button onClick={() => downloadFile(o.file_key!)}
                          className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-foreground rounded-lg text-xs font-medium hover:bg-secondary/80 transition">
                          <Download className="w-3 h-3" /> İndir
                        </button>
                      </div>
                    )}

                    {!isDelivered && (
                      <div className="mt-4 pt-4 border-t border-border">
                        {deliveringOrderId === o.payment_link_id ? (
                          <div className="space-y-3">
                            {o.delivery_method === "shipping" && (
                              <div>
                                <label className="block text-sm font-medium text-foreground mb-1">Kargo Takip No</label>
                                <input type="text" value={deliverForm.tracking_number}
                                  onChange={(e) => setDeliverForm({ ...deliverForm, tracking_number: e.target.value })}
                                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                  placeholder="Kargo takip numarası" />
                              </div>
                            )}
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-1">Teslimat Notu (opsiyonel)</label>
                              <textarea value={deliverForm.delivery_note}
                                onChange={(e) => setDeliverForm({ ...deliverForm, delivery_note: e.target.value })}
                                rows={2}
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                placeholder="Müşteriye iletilecek not" />
                            </div>
                            <div className="flex gap-2">
                              <button onClick={() => deliverOrder(o.payment_link_id)} disabled={deliverLoading}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition disabled:opacity-50">
                                {deliverLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Gönderiliyor...</> : <><CheckCircle2 className="w-4 h-4" /> Teslim Et ve E-posta Gönder</>}
                              </button>
                              <button onClick={() => { setDeliveringOrderId(null); setDeliverForm({ tracking_number: "", delivery_note: "" }); }}
                                className="px-4 py-2 bg-secondary text-foreground rounded-lg font-medium text-sm hover:bg-secondary/80 transition">
                                İptal
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button onClick={() => startDeliverOrder(o.payment_link_id, o.delivery_method)}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition">
                            <CheckCircle2 className="w-4 h-4" /> Teslim Et
                          </button>
                        )}
                      </div>
                    )}

                    {isDelivered && (
                      <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-emerald-600">
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Bu sipariş teslim edildi</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {tab === "messages" && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Henüz mesaj yok</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-foreground">{msg.name}</h3>
                      <p className="text-sm text-muted-foreground">{msg.email}</p>
                      {msg.phone && <p className="text-sm text-muted-foreground">📞 {msg.phone}</p>}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(msg.created_at + "Z").toLocaleString("tr-TR")}
                    </span>
                  </div>
                  <div className="bg-secondary/30 rounded-lg p-4 mt-3">
                    <p className="text-foreground whitespace-pre-wrap">{msg.message}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "quotes" && (
          <div className="space-y-4">
            {quotes.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Henüz teklif talebi yok</p>
              </div>
            ) : (
              quotes.map((q) => (
                <div key={q.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-foreground">{q.name}</h3>
                      <p className="text-sm text-muted-foreground">{q.email}</p>
                      {q.phone && <p className="text-sm text-muted-foreground">📞 {q.phone}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${q.status === "pending" ? "bg-yellow-100 text-yellow-800" : q.status === "completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                        {q.status === "pending" ? "Bekliyor" : q.status === "completed" ? "Tamamlandı" : q.status}
                      </span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(q.created_at + "Z").toLocaleString("tr-TR")}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Kaynak Dil:</span>
                      <p className="font-medium text-foreground">{q.source_language}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Hedef Dil:</span>
                      <p className="font-medium text-foreground">{q.target_language}</p>
                    </div>
                    {q.document_type && (
                      <div>
                        <span className="text-muted-foreground">Belge Türü:</span>
                        <p className="font-medium text-foreground">{q.document_type}</p>
                      </div>
                    )}
                    {q.page_count && (
                      <div>
                        <span className="text-muted-foreground">Sayfa:</span>
                        <p className="font-medium text-foreground">{q.page_count}</p>
                      </div>
                    )}
                  </div>
                  {q.notes && (
                    <div className="bg-secondary/30 rounded-lg p-4 mt-3">
                      <span className="text-xs text-muted-foreground">Notlar:</span>
                      <p className="text-foreground mt-1 whitespace-pre-wrap">{q.notes}</p>
                    </div>
                  )}
                  {q.file_key && (
                    <div className="mt-3 p-3 bg-secondary/20 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {q.file_key.split("/").pop()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => viewFile(q.file_key!)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                        >
                          <Eye className="w-4 h-4" />
                          Görüntüle
                        </button>
                        <button
                          onClick={() => downloadFile(q.file_key!)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition"
                        >
                          <Download className="w-4 h-4" />
                          İndir
                        </button>
                      </div>
                    </div>
                  )}
                  {/* Teslimat Bilgisi */}
                  {(q.delivery_method || q.shipping_address) && (
                    <div className="mt-3 p-3 bg-secondary/20 rounded-lg">
                      <div className="flex flex-wrap gap-3 text-sm">
                        <span className="text-muted-foreground">Teslimat: <strong className="text-foreground">{q.delivery_method === "shipping" ? "Kargo" : "Dijital"}</strong></span>
                        {q.shipping_address && (
                          <span className="text-foreground">📍 {q.shipping_address.substring(0, 80)}{q.shipping_address.length > 80 ? "..." : ""}</span>
                        )}
                        {q.shipping_tracking && (
                          <span className="text-muted-foreground">Kargo Takip: <strong className="text-foreground font-mono">{q.shipping_tracking}</strong></span>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => createPaymentFromQuote(q)}
                    className="flex items-center gap-2 mt-3 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                  >
                    <CreditCard className="w-4 h-4" />
                    Ödeme Linki Oluştur
                  </button>

                  {/* Teslim Et */}
                  {(q.order_status || q.status) !== "delivered" && (
                    <div className="mt-3">
                      {deliveringQuoteId === q.id ? (
                        <div className="space-y-3 p-3 bg-secondary/20 rounded-lg">
                          {q.delivery_method === "shipping" && (
                            <div>
                              <label className="block text-sm font-medium text-foreground mb-1">Kargo Takip No</label>
                              <input type="text" value={quoteDeliverForm.tracking_number}
                                onChange={(e) => setQuoteDeliverForm({ ...quoteDeliverForm, tracking_number: e.target.value })}
                                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Kargo takip numarası" />
                            </div>
                          )}
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1">Teslimat Notu (opsiyonel)</label>
                            <textarea value={quoteDeliverForm.delivery_note}
                              onChange={(e) => setQuoteDeliverForm({ ...quoteDeliverForm, delivery_note: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                              placeholder="Müşteriye iletilecek not" />
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => deliverQuote(q.id)} disabled={quoteDeliverLoading}
                              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition disabled:opacity-50">
                              {quoteDeliverLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Gönderiliyor...</> : <><CheckCircle2 className="w-4 h-4" /> Teslim Et ve E-posta Gönder</>}
                            </button>
                            <button onClick={() => { setDeliveringQuoteId(null); setQuoteDeliverForm({ tracking_number: "", delivery_note: "" }); }}
                              className="px-4 py-2 bg-secondary text-foreground rounded-lg font-medium text-sm hover:bg-secondary/80 transition">
                              İptal
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => startDeliverQuote(q.id, q.delivery_method)}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium text-sm hover:bg-emerald-700 transition">
                          <CheckCircle2 className="w-4 h-4" /> Teslim Et
                        </button>
                      )}
                    </div>
                  )}
                  {(q.order_status || q.status) === "delivered" && (
                    <div className="mt-3 flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Bu sipariş teslim edildi</span>
                    </div>
                  )}

                  {/* Sipariş Durumu Yönetimi */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Sipariş Durumu:</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(q.order_status || q.status)}`}>
                        {getStatusLabel(q.order_status || q.status)}
                      </span>
                    </div>
                    {(q.urgency || q.yeminli || q.noter_onay) && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {q.urgency === "acil" && (
                          <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">⚠️ Acil</span>
                        )}
                        {q.urgency === "hizli" && (
                          <span className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800">⏩ Hızlı</span>
                        )}
                        {q.yeminli === 1 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">📜 Yeminli</span>
                        )}
                        {q.noter_onay === 1 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">✒️ Noter Onaylı</span>
                        )}
                      </div>
                    )}
                    {q.estimated_price != null && (
                      <p className="text-sm text-green-600 font-medium mb-2">Tahmini Fiyat: {q.estimated_price.toFixed(2)} ₺</p>
                    )}
                    {editingQuoteId === q.id ? (
                      <div className="space-y-2 mt-3 p-3 bg-secondary/20 rounded-lg">
                        <select
                          value={editForm.order_status}
                          onChange={(e) => setEditForm({ ...editForm, order_status: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                        >
                          {ORDER_STATUSES.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                          ))}
                        </select>
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Tahmini fiyat (₺)"
                          value={editForm.estimated_price}
                          onChange={(e) => setEditForm({ ...editForm, estimated_price: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Çevirmen"
                          value={editForm.translator}
                          onChange={(e) => setEditForm({ ...editForm, translator: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                        />
                        <input
                          type="date"
                          value={editForm.delivery_date}
                          onChange={(e) => setEditForm({ ...editForm, delivery_date: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateQuoteStatus(q.id)}
                            className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                          >
                            Kaydet
                          </button>
                          <button
                            onClick={() => setEditingQuoteId(null)}
                            className="px-4 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition"
                          >
                            İptal
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => startEditQuote(q)}
                          className="text-sm text-primary hover:underline"
                        >
                          ✏️ Durumu Güncelle
                        </button>
                        <button
                          onClick={async () => {
                            const res = await fetch("/api/calculate-price", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                page_count: q.page_count,
                                word_count: q.word_count,
                                urgency: q.urgency || "standart",
                                yeminli: q.yeminli === 1,
                                noter_onay: q.noter_onay === 1,
                              }),
                            });
                            const data = await res.json();
                            if (data.success) {
                              setEditForm({
                                order_status: q.order_status || q.status || "pending",
                                estimated_price: data.estimated_price.toFixed(2),
                                translator: q.translator || "",
                                delivery_date: q.delivery_date || "",
                              });
                              setEditingQuoteId(q.id);
                            }
                          }}
                          className="text-sm text-green-600 hover:underline"
                        >
                          💰 Fiyat Hesapla
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {tab === "payments" && (
          <div className="space-y-4">
            <button
              onClick={() => { setShowPaymentModal(true); setCreatedPaymentUrl(""); }}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
            >
              <CreditCard className="w-4 h-4" />
              Yeni Ödeme Linki Oluştur
            </button>

            {showPaymentModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowPaymentModal(false)}>
                <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                  <h3 className="text-lg font-bold text-foreground mb-4">Yeni Ödeme Linki</h3>
                  {createdPaymentUrl ? (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-foreground mb-3">Ödeme linki oluşturuldu!</p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={createdPaymentUrl}
                            readOnly
                            className="flex-1 px-3 py-2 border border-border rounded-lg bg-secondary/30 text-sm text-foreground"
                          />
                          <button
                            onClick={() => copyToClipboard(createdPaymentUrl)}
                            className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                          >
                            Kopyala
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={createdPaymentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 bg-secondary text-foreground rounded-lg text-sm font-medium text-center hover:bg-secondary/80 transition"
                        >
                          Ödeme Sayfasını Aç
                        </a>
                        <button
                          onClick={() => { setShowPaymentModal(false); setCreatedPaymentUrl(""); }}
                          className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                        >
                          Kapat
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleCreatePayment} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Tutar (₺) *</label>
                        <input
                          type="number"
                          step="0.01"
                          min="1"
                          value={paymentForm.amount}
                          onChange={(e) => setPaymentForm({ ...paymentForm, amount: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                          placeholder="250.00"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Açıklama</label>
                        <input
                          type="text"
                          value={paymentForm.description}
                          onChange={(e) => setPaymentForm({ ...paymentForm, description: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                          placeholder="Yeminli Tercüme - 5 sayfa"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Müşteri Adı *</label>
                        <input
                          type="text"
                          value={paymentForm.customer_name}
                          onChange={(e) => setPaymentForm({ ...paymentForm, customer_name: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                          placeholder="Ahmet Yılmaz"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">E-posta *</label>
                        <input
                          type="email"
                          value={paymentForm.customer_email}
                          onChange={(e) => setPaymentForm({ ...paymentForm, customer_email: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                          placeholder="musteri@email.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Telefon</label>
                        <input
                          type="tel"
                          value={paymentForm.customer_phone}
                          onChange={(e) => setPaymentForm({ ...paymentForm, customer_phone: e.target.value })}
                          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                          placeholder="+90 5xx xxx xx xx"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          type="submit"
                          disabled={paymentFormLoading}
                          className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50"
                        >
                          {paymentFormLoading ? "Oluşturuluyor..." : "Link Oluştur"}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowPaymentModal(false)}
                          className="px-4 py-2 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition"
                        >
                          İptal
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}

            {payments.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">
                <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Henüz ödeme yok</p>
              </div>
            ) : (
              payments.map((p) => (
                <div key={p.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-foreground">{p.customer_name}</h3>
                      <p className="text-sm text-muted-foreground">{p.customer_email}</p>
                      {p.customer_phone && <p className="text-sm text-muted-foreground">📞 {p.customer_phone}</p>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${p.status === "paid" ? "bg-green-100 text-green-800" : p.status === "failed" ? "bg-red-100 text-red-800" : p.status === "refunded" ? "bg-purple-100 text-purple-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {p.status === "paid" ? "✓ Ödendi" : p.status === "failed" ? "✗ Başarısız" : p.status === "refunded" ? "↩ İade Edildi" : "⏳ Bekliyor"}
                      </span>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {new Date(p.created_at + "Z").toLocaleString("tr-TR")}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground">{p.description || "Çeviri Hizmeti"}</span>
                      {p.paid_at && (
                        <span className="text-xs text-green-600 ml-3">Ödeme: {new Date(p.paid_at + "Z").toLocaleString("tr-TR")}</span>
                      )}
                    </div>
                    <span className="text-xl font-bold text-primary">{p.amount?.toFixed(2)} ₺</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-border text-xs">
                    <div>
                      <span className="text-muted-foreground">Referans: </span>
                      <span className="font-mono text-foreground">{p.payment_link_id}</span>
                    </div>
                    {p.iyzico_payment_id && (
                      <div>
                        <span className="text-muted-foreground">İşlem No: </span>
                        <span className="font-mono text-foreground">{p.iyzico_payment_id}</span>
                      </div>
                    )}
                    {p.status === "paid" && (
                      <button
                        onClick={() => handleRefund(p.payment_link_id)}
                        disabled={refundingId === p.payment_link_id}
                        className="ml-auto px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-medium hover:bg-red-100 transition disabled:opacity-50"
                      >
                        {refundingId === p.payment_link_id ? "İade ediliyor..." : "İade Et"}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Dosya Görüntüleme Modalı */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={closePreview}>
          <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <span className="font-medium text-foreground">{previewFile.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={previewFile.url}
                  download={previewFile.name}
                  className="flex items-center gap-1 px-3 py-1.5 bg-secondary text-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition"
                >
                  <Download className="w-4 h-4" /> İndir
                </a>
                <button
                  onClick={closePreview}
                  className="p-1.5 text-muted-foreground hover:text-foreground transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-secondary/10">
              {(previewFile.type === "pdf") ? (
                <iframe
                  src={previewFile.url}
                  className="w-full h-[70vh] border-0"
                  title={previewFile.name}
                />
              ) : ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(previewFile.type) ? (
                <img src={previewFile.url} alt={previewFile.name} className="max-w-full max-h-[70vh] object-contain" />
              ) : ["txt", "md"].includes(previewFile.type) ? (
                <iframe src={previewFile.url} className="w-full h-[70vh] border-0" title={previewFile.name} />
              ) : (
                <div className="text-center py-20">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-2">Bu dosya türü tarayıcıda görüntülenemiyor.</p>
                  <p className="text-sm text-muted-foreground">Dosya türü: .{previewFile.type}</p>
                  <a
                    href={previewFile.url}
                    download={previewFile.name}
                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                  >
                    <Download className="w-4 h-4" /> Dosyayı İndir
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

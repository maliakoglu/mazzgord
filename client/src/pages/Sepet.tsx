import { useState, useRef } from "react";
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus, Loader2, User, Mail, Phone, Upload, FileText, X, CheckCircle2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

function formatPrice(price: number): string {
  return price.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

const UNIT_LABELS: Record<string, string> = {
  page: "sayfa", word: "kelime", document: "belge", item: "adet",
};

const OPTION_LABELS: Record<string, string> = {
  urgent: "Acil Çeviri", notary: "Noter Onayı", apostille: "Apostil", shipping: "Kargo",
};

export default function Sepet() {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState(() => {
    const saved = localStorage.getItem("mazzgord_customer");
    if (saved) {
      try {
        const c = JSON.parse(saved);
        return { name: c.name || "", email: c.email || "", phone: c.phone || "", delivery_method: "digital", shipping_address: "", source_language: "", target_language: "" };
      } catch {}
    }
    return { name: "", email: "", phone: "", delivery_method: "digital", shipping_address: "", source_language: "", target_language: "" };
  });
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      alert("Dosya boyutu 10MB'dan küçük olmalıdır.");
      return;
    }
    setUploadStatus("uploading");
    setFileName(file.name);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("customer_name", customer.name || "Bilinmeyen");
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (res.ok) {
        const data = await res.json();
        setFileKey(data.file_key);
        setUploadStatus("done");
      } else {
        setUploadStatus("error");
      }
    } catch {
      setUploadStatus("error");
    }
  };

  const removeFile = () => {
    setFileKey(null);
    setFileName("");
    setUploadStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setShowCheckout(true);
  };

  const handleSubmit = async () => {
    if (!customer.name || !customer.email) {
      setError("Ad ve e-posta zorunludur");
      return;
    }
    setSubmitting(true);
    setError("");
    if (!customer.source_language || !customer.target_language) {
      setError("Lütfen kaynak ve hedef dili seçin");
      return;
    }
    if (!fileKey) {
      setError("Lütfen çevrilmesini istediğiniz belgeyi yükleyin");
      return;
    }
    if (customer.delivery_method === "shipping" && !customer.shipping_address.trim()) {
      setError("Kargo teslimatı için adres gereklidir");
      return;
    }
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone,
          delivery_method: customer.delivery_method,
          shipping_address: customer.delivery_method === "shipping" ? customer.shipping_address : null,
          file_key: fileKey,
          source_language: customer.source_language,
          target_language: customer.target_language,
          items: items.map(i => ({
            productId: i.productId,
            sku: i.sku,
            name: i.name,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
            totalPrice: i.totalPrice,
            options: i.options,
          })),
          total,
        }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        window.location.href = data.payment_url;
      } else {
        setError(data.error || "Sipariş oluşturulamadı");
      }
    } catch {
      setError("Sunucu hatası. Lütfen tekrar deneyin.");
    }
    setSubmitting(false);
  };

  if (items.length === 0 && !showCheckout) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="sticky top-0 z-50 bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <a href="/teklif" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
              <ArrowLeft className="w-5 h-5" /> Hizmetler
            </a>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-20 max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary mb-4">
            <ShoppingCart className="w-8 h-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Sepetiniz Boş</h1>
          <p className="text-muted-foreground mb-8">Henüz sepete hizmet eklenmedi.</p>
          <a href="/teklif" className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition">
            Hizmetleri İncele
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <a href="/teklif" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="w-5 h-5" /> Hizmetler
          </a>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
          <ShoppingCart className="w-7 h-7" /> Sepetim
        </h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.productId} className="bg-card border border-border rounded-lg p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Birim fiyat: {formatPrice(item.unitPrice)} ₺ / {UNIT_LABELS[item.unit] || item.unit}
                  </p>
                </div>
                <button onClick={() => removeItem(item.productId)} className="text-muted-foreground hover:text-red-500 transition p-1" aria-label="Kaldır">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {Object.keys(item.options).length > 0 && Object.values(item.options).some((v) => v) && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {Object.entries(item.options).filter(([, v]) => v).map(([key]) => (
                    <span key={key} className="px-2 py-1 bg-secondary text-sm text-foreground rounded">
                      {OPTION_LABELS[key] || key}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-3 py-2 text-foreground hover:bg-secondary transition" aria-label="Azalt">
                    <Minus className="w-4 h-4" />
                  </button>
                  <input type="number" value={item.quantity}
                    onChange={(e) => updateQuantity(item.productId, Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 text-center border-x border-border py-2 bg-background text-foreground focus:outline-none" />
                  <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-3 py-2 text-foreground hover:bg-secondary transition" aria-label="Artır">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">{item.quantity} × {formatPrice(item.unitPrice)} ₺</span>
                  <div className="text-xl font-bold text-primary">{formatPrice(item.totalPrice)} ₺</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-secondary/30 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium text-foreground">Genel Toplam</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(total)} ₺</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button onClick={handleCheckout} className="flex-1 px-6 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition">
              Ödemeye Geç
            </button>
            <button onClick={clearCart} className="px-6 py-4 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition">
              Sepeti Boşalt
            </button>
          </div>
        </div>

        {showCheckout && (
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Teslimat ve Fatura Bilgileri</h2>
            {!localStorage.getItem("mazzgord_token") && (
              <div className="mb-4 bg-secondary/50 border border-border rounded-lg p-3 flex items-center justify-between">
                <p className="text-sm text-foreground">Zaten hesabınız var mı? Bilgileriniz otomatik dolsun.</p>
                <a href="/giris" className="text-sm font-medium text-primary hover:underline">Giriş Yap</a>
              </div>
            )}
            {error && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Ad Soyad *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Adınız Soyadınız" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">E-posta *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="ornek@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="tel" value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+90 5xx xxx xx xx" />
                </div>
              </div>

              {/* Teslimat Yöntemi */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Teslimat Yöntemi *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button type="button"
                    onClick={() => setCustomer({ ...customer, delivery_method: "digital" })}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg transition text-left ${customer.delivery_method === "digital" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${customer.delivery_method === "digital" ? "border-primary" : "border-muted-foreground"}`}>
                      {customer.delivery_method === "digital" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">Dijital Teslimat</div>
                      <div className="text-xs text-muted-foreground">E-posta ve WhatsApp ile</div>
                    </div>
                  </button>
                  <button type="button"
                    onClick={() => setCustomer({ ...customer, delivery_method: "shipping" })}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg transition text-left ${customer.delivery_method === "shipping" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${customer.delivery_method === "shipping" ? "border-primary" : "border-muted-foreground"}`}>
                      {customer.delivery_method === "shipping" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">Kargo ile Teslimat</div>
                      <div className="text-xs text-muted-foreground">Fiziksel belge gönderimi</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Kargo Adresi — sadece shipping seçilirse */}
              {customer.delivery_method === "shipping" && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Kargo Adresi *</label>
                  <textarea value={customer.shipping_address}
                    onChange={(e) => setCustomer({ ...customer, shipping_address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Ad Soyad, Mahalle, Sokak, Bina No, İlçe, İl, Posta Kodu" />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSubmit} disabled={submitting}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition disabled:opacity-50">
                {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Ödeme oluşturuluyor...</> : "Ödemeye Devam Et"}
              </button>
              <button onClick={() => setShowCheckout(false)}
                className="px-6 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition">
                Geri
              </button>
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              Güvenli ödeme iyzico 3D Secure ile yapılır. KDV'den müstesnadır (Esnaf Muafiyeti).
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <a href="/teklif" className="text-primary hover:underline">← Teklif formuna geri dön</a>
        </div>
      </div>
    </div>
  );
}

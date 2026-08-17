import { useState, useRef } from "react";
import { X, Upload, FileText, CheckCircle2, Loader2, User, Mail, Phone, Truck, Globe } from "lucide-react";
import type { ServiceProduct } from "@/contexts/CartContext";

function formatPrice(price: number): string {
  return price.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}

interface UploadedFile {
  file_key: string;
  file_name: string;
}

export default function OrderModal({ product, onClose }: { product: ServiceProduct; onClose: () => void }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, boolean>>({});
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [deliveryMethod, setDeliveryMethod] = useState<"digital" | "shipping">("digital");
  const [shippingAddress, setShippingAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live price calculation
  let livePrice = product.base_price * quantity;
  for (const opt of (product.options || [])) {
    if (selectedOptions[opt.key]) {
      if (opt.type === "surcharge_percent") livePrice += (product.base_price * quantity) * (opt.value / 100);
      else if (opt.type === "fixed_price") livePrice += opt.value * quantity;
    }
  }
  livePrice = Math.round(livePrice * 100) / 100;

  const toggleOption = (key: string) => {
    setSelectedOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (uploadedFiles.length + files.length > 10) {
      setError("En fazla 10 dosya yükleyebilirsiniz.");
      return;
    }

    setUploadingFile(true);
    setError("");

    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        setError(`${file.name} 10MB'dan büyük. Lütfen daha küçük bir dosya yükleyin.`);
        continue;
      }
      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("customer_name", customer.name || "Bilinmeyen");
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (res.ok) {
          const data = await res.json();
          setUploadedFiles((prev) => [...prev, { file_key: data.file_key, file_name: file.name }]);
        }
      } catch {
        setError(`${file.name} yüklenemedi.`);
      }
    }
    setUploadingFile(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (fileKey: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.file_key !== fileKey));
  };

  const handleSubmit = async () => {
    setError("");
    if (!customer.name || !customer.email) {
      setError("Ad ve e-posta zorunludur.");
      return;
    }
    if (!sourceLanguage || !targetLanguage) {
      setError("Kaynak ve hedef dil seçiniz.");
      return;
    }
    if (uploadedFiles.length === 0) {
      setError("En az bir belge yükleyiniz.");
      return;
    }
    if (deliveryMethod === "shipping" && !shippingAddress.trim()) {
      setError("Kargo adresi gereklidir.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: customer.name,
          customer_email: customer.email,
          customer_phone: customer.phone,
          source_language: sourceLanguage,
          target_language: targetLanguage,
          delivery_method: deliveryMethod,
          shipping_address: deliveryMethod === "shipping" ? shippingAddress : null,
          file_keys: uploadedFiles.map((f) => f.file_key),
          items: [{
            productId: product.id,
            sku: product.sku,
            name: product.name,
            quantity,
            unitPrice: product.base_price,
            totalPrice: livePrice,
            options: selectedOptions,
          }],
          total: livePrice,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setPaymentUrl(data.payment_url);
      } else {
        setError(data.error || "Sipariş oluşturulamadı.");
      }
    } catch {
      setError("Sunucu hatası. Lütfen tekrar deneyin.");
    }
    setSubmitting(false);
  };

  const inputClass = "w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-card border border-border rounded-lg max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-foreground">{product.name}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">Siparişiniz Oluşturuldu!</h3>
            <p className="text-muted-foreground mb-6">Ödemeyi tamamlayarak çeviri işleminizi başlatabilirsiniz.</p>
            <a href={paymentUrl} className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition">
              Ödemeye Git
            </a>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}

            {/* Fiyat özeti */}
            <div className="bg-secondary/30 rounded-lg p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{product.name}</p>
                <p className="text-xs text-muted-foreground">{quantity} × {formatPrice(product.base_price)} ₺</p>
              </div>
              <div className="text-2xl font-bold text-primary">{formatPrice(livePrice)} ₺</div>
            </div>

            {/* Dil seçimi */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                <Globe className="w-4 h-4" /> Dil Çifti *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)} className={inputClass}>
                  <option value="">Kaynak dil</option>
                  <option value="Türkçe">Türkçe</option>
                  <option value="İngilizce">İngilizce</option>
                </select>
                <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)} className={inputClass}>
                  <option value="">Hedef dil</option>
                  <option value="Türkçe">Türkçe</option>
                  <option value="İngilizce">İngilizce</option>
                </select>
              </div>
            </div>

            {/* Adet */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Adet ({product.unit})</label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2 text-foreground hover:bg-secondary transition">−</button>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-16 text-center border-x border-border py-2 bg-background text-foreground focus:outline-none" />
                  <button onClick={() => setQuantity((q) => q + 1)} className="px-3 py-2 text-foreground hover:bg-secondary transition">+</button>
                </div>
                <span className="text-sm text-muted-foreground">{product.unit}</span>
              </div>
            </div>

            {/* Ek seçenekler */}
            {(product.options && product.options.length > 0) && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Ek Hizmetler</label>
                <div className="space-y-2">
                  {product.options.map((opt) => (
                    <label key={opt.key} className="flex items-center gap-2 cursor-pointer text-sm">
                      <input type="checkbox" checked={selectedOptions[opt.key] || false} onChange={() => toggleOption(opt.key)} className="w-4 h-4 rounded border-border" />
                      <span className="text-foreground">{opt.label}</span>
                      <span className="text-muted-foreground">{opt.type === "surcharge_percent" ? `+%${opt.value}` : `+${formatPrice(opt.value)} ₺`}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Belge yükleme */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Belge Yükleme * <span className="text-xs text-muted-foreground">(max 10 dosya, her biri 10MB)</span></label>
              {uploadedFiles.length > 0 && (
                <div className="space-y-2 mb-3">
                  {uploadedFiles.map((f) => (
                    <div key={f.file_key} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-800 truncate">{f.file_name}</span>
                      </div>
                      <button onClick={() => removeFile(f.file_key)} className="text-red-600 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {uploadedFiles.length < 10 && (
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition">
                  {uploadingFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <p className="text-sm text-muted-foreground">Yükleniyor...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Dosya seçmek için tıklayın</p>
                      <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, TXT, JPG, PNG — max 10MB</p>
                    </div>
                  )}
                </div>
              )}
              <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png" multiple onChange={handleFileUpload} className="hidden" />
            </div>

            {/* Kişisel bilgiler */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Ad Soyad *</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className={inputClass + " pl-10"} placeholder="Adınız Soyadınız" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">E-posta *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} className={inputClass + " pl-10"} placeholder="ornek@email.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className={inputClass + " pl-10"} placeholder="+90 5xx xxx xx xx" />
                </div>
              </div>
            </div>

            {/* Teslimat yöntemi */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Teslimat Yöntemi *</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button type="button" onClick={() => setDeliveryMethod("digital")}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg transition text-left ${deliveryMethod === "digital" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryMethod === "digital" ? "border-primary" : "border-muted-foreground"}`}>
                    {deliveryMethod === "digital" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">Dijital Teslimat</div>
                    <div className="text-xs text-muted-foreground">E-posta ve WhatsApp</div>
                  </div>
                </button>
                <button type="button" onClick={() => setDeliveryMethod("shipping")}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg transition text-left ${deliveryMethod === "shipping" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${deliveryMethod === "shipping" ? "border-primary" : "border-muted-foreground"}`}>
                    {deliveryMethod === "shipping" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">Kargo ile Teslimat</div>
                    <div className="text-xs text-muted-foreground">Fiziksel belge gönderimi</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Kargo adresi */}
            {deliveryMethod === "shipping" && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Kargo Adresi *</label>
                <textarea value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} rows={3} className={inputClass + " resize-none"} placeholder="Ad Soyad, Mahalle, Sokak, Bina No, İlçe, İl, Posta Kodu" />
              </div>
            )}

            {/* Submit */}
            <div className="pt-4 border-t border-border">
              <button onClick={handleSubmit} disabled={submitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition disabled:opacity-50">
                {submitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Sipariş oluşturuluyor...</> : `${formatPrice(livePrice)} ₺ — Ödemeye Devam Et`}
              </button>
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Güvenli ödeme iyzico 3D Secure ile yapılır. KDV'den müstesnadır (Esnaf Muafiyeti).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

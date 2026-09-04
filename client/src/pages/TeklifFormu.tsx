import { useState, useRef } from "react";
import { ArrowLeft, Upload, FileText, CheckCircle2, Loader2, X, Globe, Clock, FileType, Mail, Phone, User } from "lucide-react";
import { track } from "@/lib/analytics";

const LANGUAGES = [
  "Türkçe", "İngilizce"
];

const DOCUMENT_TYPES = [
  "Pasaport / Kimlik",
  "Diploma / Transkript",
  "Evlilik Cüzdanı / Nüfus Kayıt",
  "Vize Belgeleri",
  "Sözleşme / Hukuki Belge",
  "Teknik Kılavuz / Doküman",
  "Akademik Makale / Tez",
  "Tıbbi Belge / Rapor",
  "Noter Tasdikli Belge",
  "Mahkeme Kararı / Dilekçe",
  "Şirket Evrakı / Ticari Belge",
  "Web Sitesi / Yazılım",
  "Reklam / Pazarlama Metni",
  "Diğer"
];

const SERVICE_TYPES = [
  { value: "yeminli", label: "Yeminli Tercüme (Resmi)" },
  { value: "noter", label: "Noter Tasdikli Çeviri" },
  { value: "profesyonel", label: "Profesyonel Çeviri" },
  { value: "akademik", label: "Akademik Çeviri" },
  { value: "teknik", label: "Teknik Çeviri" },
  { value: "hukuki", label: "Hukuki Çeviri" },
];

const URGENCY_OPTIONS = [
  { value: "standart", label: "Standart (3-5 iş günü)", price: "" },
  { value: "hizli", label: "Hızlı (1-2 iş günü)", price: " +30%" },
  { value: "acil", label: "Acil (24 saat içinde)", price: " +50%" },
];



export default function TeklifFormu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [emailVerified, setEmailVerified] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "sending" | "sent" | "verifying" | "error">("idle");
  const [verifyCode, setVerifyCode] = useState("");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [fileKeys, setFileKeys] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [orderToken, setOrderToken] = useState<string>("");
  const [orderNo, setOrderNo] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source_language: "İngilizce",
    target_language: "Türkçe",
    document_type: "",
    service_type: "",
    page_count: "",
    word_count: "",
    urgency: "standart",
    delivery_method: "digital",
    shipping_address: "",
    notes: "",
    notary_need: "",
    apostille_need: "",
    target_country: "",
    delivery_date: "",
    meeting_day: "",
    meeting_time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (fileKeys.length + files.length > 10) {
      alert("En fazla 10 dosya yükleyebilirsiniz.");
      return;
    }

    track.documentUploadStarted();
    setUploadStatus("uploading");

    const newKeys: string[] = [];
    const newNames: string[] = [];
    let hasError = false;

    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} 10MB\'dan küçük olmalıdır.`);
        hasError = true;
        continue;
      }

      try {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("customer_name", formData.name || "Bilinmeyen");

        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });

        if (res.ok) {
          const data = await res.json();
          newKeys.push(data.file_key);
          newNames.push(file.name);
        } else {
          hasError = true;
        }
      } catch {
        hasError = true;
      }
    }

    if (newKeys.length > 0) {
      setFileKeys([...fileKeys, ...newKeys]);
      setFileNames([...fileNames, ...newNames]);
      track.documentUploadCompleted();
    }
    setUploadStatus(hasError && newKeys.length === 0 ? "error" : "done");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFileKeys(fileKeys.filter((_, i) => i !== index));
    setFileNames(fileNames.filter((_, i) => i !== index));
    if (fileKeys.length <= 1) setUploadStatus("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dosya yükleme opsiyonel — bazı müşteriler önce soru sormak isteyebilir
    if (formData.delivery_method === "shipping" && !formData.shipping_address.trim()) {
      alert("Kargo teslimatı için adres gereklidir.");
      return;
    }
    if (formData.delivery_method === "hand_delivery" && !formData.shipping_address.trim()) {
      alert("Elden teslimat için buluşma yeri gereklidir.");
      return;
    }
    track.offerFormStarted();
    setSubmitStatus("sending");
    const idempotencyKey = crypto.randomUUID();
    try {
      // Worker'a gönder (D1'e kaydolur)
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          page_count: formData.page_count ? parseInt(formData.page_count) : null,
          word_count: formData.word_count ? parseInt(formData.word_count) : null,
          file_key: fileKeys.length > 0 ? fileKeys[0] : null,
          file_keys: fileKeys.length > 0 ? fileKeys : null,
          delivery_method: formData.delivery_method,
          shipping_address: (formData.delivery_method === "shipping" || formData.delivery_method === "hand_delivery") ? formData.shipping_address : null,
          yeminli: formData.service_type === "yeminli" || formData.service_type === "noter",
          noter_onay: formData.service_type === "noter",
          notary_need: formData.notary_need || null,
          apostille_need: formData.apostille_need || null,
          target_country: formData.target_country || null,
          delivery_date: formData.delivery_date || null,
          meeting_day: formData.delivery_method === "hand_delivery" ? (formData.meeting_day || null) : null,
          meeting_time: formData.delivery_method === "hand_delivery" ? (formData.meeting_time || null) : null,
          idempotency_key: idempotencyKey,
        }),
      });

      // Web3Forms'e de gönder (e-posta düşer)
      const emailBody = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `TEKLİF TALEBİ\n\n` +
          `Kaynak Dil: ${formData.source_language}\n` +
          `Hedef Dil: ${formData.target_language}\n` +
          `Belge Türü: ${formData.document_type}\n` +
          `Hizmet Türü: ${SERVICE_TYPES.find(s => s.value === formData.service_type)?.label || formData.service_type}\n` +
          `Sayfa Sayısı: ${formData.page_count || "Belirtilmedi"}\n` +
          `Kelime Sayısı: ${formData.word_count || "Belirtilmedi"}\n` +
          `Aciliyet: ${URGENCY_OPTIONS.find(u => u.value === formData.urgency)?.label || formData.urgency}\n` +
          `Teslimat: ${formData.delivery_method === "shipping" ? "Kargo" : formData.delivery_method === "hand_delivery" ? "Elden Teslim" : "Dijital (E-posta)"}\n` +
          (formData.delivery_method === "hand_delivery" && formData.meeting_day ? `Tarih: ${formData.meeting_day}${formData.meeting_time ? " " + formData.meeting_time : ""}\n` : "") +
          `Dosyalar: ${fileNames.length > 0 ? fileNames.join(", ") : "Yüklenmedi"}\n` +
          `Notlar: ${formData.notes || "Yok"}`,
        access_key: "bcd1bf4b-064e-4e56-83f7-5dc9aaf5d74c",
        subject: "Yeni Teklif Talebi - Mazzgord",
      };

      const web3Res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailBody),
      });
      if (!web3Res.ok) {
        console.error("Web3Forms bildirim hatasi:", web3Res.status);
      }

      if (response.ok) {
        const result = await response.json().catch(() => ({}));
        if (result.order_token) setOrderToken(result.order_token);
        if (result.order_no) setOrderNo(result.order_no);
        // WhatsApp bildirimi — müşteriden işletmeye hazır mesaj
        let telefon = (formData.phone || "").replace(/\s+/g, "");
        if (telefon.startsWith("0")) telefon = "90" + telefon.substring(1);
        else if (!telefon.startsWith("90")) telefon = "90" + telefon;

        const serviceLabel = SERVICE_TYPES.find(s => s.value === formData.service_type)?.label || formData.service_type || "Belirtilmedi";
        const urgencyLabel = URGENCY_OPTIONS.find(u => u.value === formData.urgency)?.label || formData.urgency;

        const mesaj = `🔔 *Teklif Talebi*

` +
          `*Ad:* ${formData.name}
` +
          `*Telefon:* ${formData.phone}
` +
          `*E-posta:* ${formData.email}
` +
          `*Dil:* ${formData.source_language} → ${formData.target_language}
` +
          `*Belge:* ${formData.document_type || "Belirtilmedi"}
` +
          `*Hizmet:* ${serviceLabel}
` +
          `*Sayfa:* ${formData.page_count || "—"}
` +
          `*Kelime:* ${formData.word_count || "—"}
` +
          `*Noter:* ${formData.notary_need || "Belirtilmedi"}
` +
          `*Apostil:* ${formData.apostille_need || "Belirtilmedi"}
` +
          `*Ülke/Kurum:* ${formData.target_country || "Belirtilmedi"}
` +
          `*Teslim Tarihi:* ${formData.delivery_date || "Belirtilmedi"}
` +
          `*Aciliyet:* ${urgencyLabel}
` +
          `*Teslimat:* ${formData.delivery_method === "shipping" ? "Kargo" : formData.delivery_method === "hand_delivery" ? "Elden Teslim" : "Dijital (E-posta)"}
` +
          (formData.delivery_method === "hand_delivery" && formData.meeting_day ? `*Tarih:* ${formData.meeting_day}${formData.meeting_time ? " " + formData.meeting_time : ""}
` : "") +
          (formData.notes ? `*Notlar:* ${formData.notes}
` : "") +
          (fileName ? `*Dosya:* ${fileName}
` : "") +
          `
mazzgord.com`;

        const whatsappURL = `https://wa.me/905386295040?text=${encodeURIComponent(mesaj)}`;
        window.open(whatsappURL, "_blank");

        track.offerFormCompleted();
      setSubmitStatus("success");
        setFormData({
          name: "", email: "", phone: "", source_language: "İngilizce", target_language: "Türkçe",
          document_type: "", service_type: "", page_count: "", word_count: "",
          urgency: "standart", delivery_method: "digital", shipping_address: "", notes: "",
          notary_need: "", apostille_need: "", target_country: "", delivery_date: "",
          meeting_day: "", meeting_time: "",
        });
        setFileKeys([]);
        setFileNames([]);
        // Başarı ekranı kalıcı — kullanıcı manuel olarak yeni teklif verebilir
      } else {
        // Backend hatasi - spesifik mesaj goster
        const errorBody = await response.text().catch(() => "");
        let errorMsg = "Bir hata olustu. Lutfen tekrar deneyin.";
        try {
          const errData = JSON.parse(errorBody);
          if (errData.error) errorMsg = errData.error;
        } catch {}
        setSubmitStatus("error");
        // Hata mesajini state'e kaydet
        setTimeout(() => setSubmitStatus("idle"), 8000);
      }
    } catch (err) {
      // Ag hatasi veya sunucu yanit vermiyor
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 8000);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground transition";
  const labelClass = "flex items-center gap-2 text-sm font-medium text-foreground mb-2";
  const sectionClass = "bg-card border border-border rounded-lg p-6";

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="w-5 h-5" /> Ana Sayfa
          </a>
          <div className="hidden md:flex gap-8">
            <a href="/fiyatlar" className="text-foreground hover:text-primary transition">Fiyatlar</a>
            <a href="/blog" className="text-foreground hover:text-primary transition">Blog</a>
            <a href="/hakkimizda" className="text-foreground hover:text-primary transition">Hakkımda</a>
            <a href="/teklif" className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition no-underline">Teklif Al</a>
          </div>
          <button className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none z-60" onClick={() => setMobileOpen(!mobileOpen)}>
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
          </button>
          {mobileOpen && (
            <div className="fixed top-0 right-0 w-72 h-full bg-background z-50 shadow-2xl p-8 pt-24 flex flex-col gap-2 md:hidden">
              <a href="/fiyatlar" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Fiyatlar</a>
              <a href="/blog" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Blog</a>
              <a href="/hakkimizda" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Hakkımda</a>
              <a href="/teklif" className="block px-4 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Teklif Al</a>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-3">Çeviri Teklif Formu</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Belge türü, dil yönü, noter ve apostil ihtiyacını belirtin. Belgenizi inceleyip net fiyat ve teslim süresiyle dönüş yapayım.
          </p>
        </div>

        {submitStatus === "success" && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-green-800 mb-2">Talebiniz Alındı</h3>
            <p className="text-green-700 mb-4">Belgenin türünü, yoğunluğunu ve dil yönünü inceleyerek size kesin fiyat ve teslim süresiyle dönüş yapacağım. Noter, apostil ve kurum kabul şartları işlem türüne göre değişebilir.</p>
            <div className="bg-white border border-green-200 rounded-lg p-4 mt-4 space-y-3">
              {orderNo && (
                <div>
                  <p className="text-sm text-muted-foreground">Başvuru Numaranız</p>
                  <p className="text-lg font-bold text-foreground font-mono">{orderNo}</p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a href="/siparis?id={orderToken}" className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
                  Teklifi Takip Et
                </a>
                <a href="https://wa.me/905386295040" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                  WhatsApp'tan Yaz
                </a>
              </div>
              <p className="text-xs text-muted-foreground pt-2">Genellikle 2-4 saat içinde dönüş yapılır. Acil taleplerde WhatsApp'tan ulaşabilirsiniz.</p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-700 font-medium">Bir hata olustu. Lutfen tekrar deneyin veya WhatsApp'tan iletisime gecin.</p>
            <p className="text-sm text-red-600 mt-1">
              <a href="https://wa.me/905386295040" className="underline hover:no-underline" target="_blank" rel="noopener noreferrer">+90 538 629 50 40 (WhatsApp)</a>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Kişisel Bilgiler */}
          <div className={sectionClass}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Kişisel Bilgiler
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Ad Soyad <span className="text-red-500">*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Adınız Soyadınız" required />
              </div>
              <div>
                <label className={labelClass}><Mail className="w-4 h-4" /> E-posta <span className="text-red-500">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={(e) => { handleChange(e); setEmailVerified(false); setVerifyStatus("idle"); }} className={inputClass} placeholder="e-posta@adresi.com" required />
                {emailVerified && <p className="text-green-600 text-sm mt-1 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> E-posta doğrulandı</p>}
                {!emailVerified && formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && (
                  <div className="mt-2 flex gap-2 items-center">
                    {verifyStatus !== "sent" && (
                      <button type="button" onClick={async () => {
                        setVerifyStatus("sending");
                        try {
                          const res = await fetch("/api/quote/send-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: formData.email }) });
                          const data = await res.json();
                          if (data.success) setVerifyStatus("sent");
                          else { setVerifyStatus("error"); alert(data.error); }
                        } catch { setVerifyStatus("error"); }
                      }} disabled={verifyStatus === "sending"} className="px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-accent transition disabled:opacity-50">
                        {verifyStatus === "sending" ? "Gönderiliyor..." : "Kod Gönder"}
                      </button>
                    )}
                    {verifyStatus === "sent" && (
                      <>
                        <input type="text" maxLength={6} value={verifyCode} onChange={(e) => setVerifyCode(e.target.value)} placeholder="6 haneli kod" className="w-32 px-3 py-1.5 text-sm border border-border rounded-lg bg-background" />
                        <button type="button" onClick={async () => {
                          setVerifyStatus("verifying");
                          try {
                            const res = await fetch("/api/quote/verify-code", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: formData.email, code: verifyCode }) });
                            const data = await res.json();
                            if (data.success) { setEmailVerified(true); setVerifyStatus("idle"); }
                            else { setVerifyStatus("error"); alert(data.error); }
                          } catch { setVerifyStatus("error"); }
                        }} className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition">
                          Doğrula
                        </button>
                      </>
                    )}
                    {verifyStatus === "error" && <span className="text-red-500 text-sm">Hata oluştu</span>}
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className={labelClass}><Phone className="w-4 h-4" /> Telefon <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="05XX XXX XX XX" required />
              </div>
            </div>
          </div>

          {/* Çeviri Detayları */}
          <div className={sectionClass}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" /> Çeviri Detayları
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Kaynak Dil <span className="text-red-500">*</span></label>
                <select name="source_language" value={formData.source_language} onChange={handleChange} className={inputClass} required>
                  <option value="">Dil seçiniz</option>
                  {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Hedef Dil <span className="text-red-500">*</span></label>
                <select name="target_language" value={formData.target_language} onChange={handleChange} className={inputClass} required>
                  <option value="">Dil seçiniz</option>
                  {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}><FileType className="w-4 h-4" /> Belge Türü</label>
                <select name="document_type" value={formData.document_type} onChange={handleChange} className={inputClass}>
                  <option value="">Belge türü seçiniz</option>
                  {DOCUMENT_TYPES.map(doc => <option key={doc} value={doc}>{doc}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Hizmet Türü</label>
                <select name="service_type" value={formData.service_type} onChange={handleChange} className={inputClass}>
                  <option value="">Hizmet seçiniz</option>
                  {SERVICE_TYPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Sayfa Sayısı</label>
                <input type="number" name="page_count" value={formData.page_count} onChange={handleChange} className={inputClass} placeholder="Örn: 5" min="1" />
              </div>
              <div>
                <label className={labelClass}>Kelime Sayısı</label>
                <input type="number" name="word_count" value={formData.word_count} onChange={handleChange} className={inputClass} placeholder="Örn: 2500" min="1" />
              </div>
              <div>
                <label className={labelClass}>Noter Onayı Gerekli mi?</label>
                <select name="notary_need" value={formData.notary_need} onChange={handleChange} className={inputClass}>
                  <option value="">Seçiniz</option>
                  <option value="evet">Evet, gerekli</option>
                  <option value="hayir">Hayır, gerekli değil</option>
                  <option value="bilmiyorum">Bilmiyorum</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Apostil Gerekli mi?</label>
                <select name="apostille_need" value={formData.apostille_need} onChange={handleChange} className={inputClass}>
                  <option value="">Seçiniz</option>
                  <option value="evet">Evet, gerekli</option>
                  <option value="hayir">Hayır, gerekli değil</option>
                  <option value="bilmiyorum">Bilmiyorum</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Belge Hangi Ülke/Kurum İçin?</label>
                <input type="text" name="target_country" value={formData.target_country} onChange={handleChange} className={inputClass} placeholder="Örn: İngiltere vizesi, ABD göçmenlik" />
              </div>

            </div>
          </div>

          {/* Aciliyet ve Teslimat */}
          <div className={sectionClass}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> Aciliyet ve Teslimat
            </h2>
            <div className="space-y-4">
              <div>
                <label className={labelClass}>Aciliyet Durumu</label>
                <select name="urgency" value={formData.urgency} onChange={handleChange} className={inputClass}>
                  {URGENCY_OPTIONS.map(u => <option key={u.value} value={u.value}>{u.label}{u.price}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Teslimat Yöntemi <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button type="button"
                    onClick={() => setFormData({ ...formData, delivery_method: "digital" })}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg transition text-left ${formData.delivery_method === "digital" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.delivery_method === "digital" ? "border-primary" : "border-muted-foreground"}`}>
                      {formData.delivery_method === "digital" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">Dijital Teslimat</div>
                      <div className="text-xs text-muted-foreground">E-posta ve WhatsApp ile</div>
                    </div>
                  </button>
                  <button type="button"
                    onClick={() => setFormData({ ...formData, delivery_method: "shipping" })}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg transition text-left ${formData.delivery_method === "shipping" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.delivery_method === "shipping" ? "border-primary" : "border-muted-foreground"}`}>
                      {formData.delivery_method === "shipping" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">Kargo ile Teslimat</div>
                      <div className="text-xs text-muted-foreground">Fiziksel belge gönderimi</div>
                    </div>
                  </button>
                  <button type="button"
                    onClick={() => setFormData({ ...formData, delivery_method: "hand_delivery" })}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg transition text-left ${formData.delivery_method === "hand_delivery" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.delivery_method === "hand_delivery" ? "border-primary" : "border-muted-foreground"}`}>
                      {formData.delivery_method === "hand_delivery" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">Elden Teslim</div>
                      <div className="text-xs text-muted-foreground">Belirlenen noktada buluşma</div>
                    </div>
                  </button>
                </div>
              </div>
              {formData.delivery_method === "shipping" && (
                <div>
                  <label className={labelClass}>Kargo Adresi <span className="text-red-500">*</span></label>
                  <textarea name="shipping_address" value={formData.shipping_address} onChange={handleChange}
                    rows={3}
                    className={inputClass + " resize-none"}
                    placeholder="Ad Soyad, Mahalle, Sokak, Bina No, İlçe, İl, Posta Kodu" />
                </div>
              )}
              {formData.delivery_method === "hand_delivery" && (
                <div>
                  <label className={labelClass}>Buluşma Yeri / Bölge <span className="text-red-500">*</span></label>
                  <textarea name="shipping_address" value={formData.shipping_address} onChange={handleChange}
                    rows={2}
                    className={inputClass + " resize-none"}
                    placeholder="Örn: Denizli Merkez, Çınar Meydanı çevresi" />
                </div>
              )}
              {formData.delivery_method === "hand_delivery" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Tercih Edilen Gün</label>
                    <input type="date" name="meeting_day" value={formData.meeting_day} onChange={handleChange}
                      className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Tercih Edilen Saat</label>
                    <input type="time" name="meeting_time" value={formData.meeting_time} onChange={handleChange}
                      className={inputClass} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Dosya Yükleme */}
          <div className={sectionClass}>
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-primary" /> Belge Yükleme <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Çevrilmesini istediğiniz belgeleri yükleyin (PDF, DOC, DOCX, TXT, JPG, PNG — her dosya max 10MB, en fazla 10 dosya). Belge yükleme isteğe bağlıdır (opsiyonel).
            </p>
            {fileKeys.length > 0 && (
              <div className="space-y-2 mb-3">
                {fileNames.map((name, i) => (
                  <div key={i} className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800 text-sm">{name}</p>
                        <p className="text-xs text-green-600">Yüklendi</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => removeFile(i)} className="text-red-600 hover:text-red-700">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {fileKeys.length < 10 && (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition"
              >
                {uploadStatus === "uploading" ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    <p className="text-muted-foreground">Yükleniyor...</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <p className="text-muted-foreground">Dosya seçmek için tıklayın</p>
                    <p className="text-xs text-muted-foreground">PDF, DOC, DOCX, TXT, JPG, PNG — max 10MB ({fileKeys.length}/10 yüklendi)</p>
                  </div>
                )}
              </div>
            )}
            <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.txt,.rtf,.jpg,.jpeg,.png,.webp" onChange={handleFileUpload} className="hidden" multiple />
            {uploadStatus === "error" && (
              <p className="text-red-600 text-sm mt-2">Dosya yüklenemedi. Lütfen tekrar deneyin.</p>
            )}
          </div>

          {/* Ek Notlar */}
          <div className={sectionClass}>
            <h2 className="text-lg font-bold text-foreground mb-4">Ek Notlar</h2>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className={inputClass}
              rows={4}
              placeholder="Özel terminoloji, format gereksinimleri, referans materyalleri veya diğer notlarınız..."
            />
          </div>

          {/* KVKK Onayi */}
          <div className="bg-card border border-border rounded-lg p-6">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={kvkkAccepted}
                onChange={(e) => setKvkkAccepted(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary"
                required
              />
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Kişisel verilerimin işlenmesine ilişkin aydınlatma metnini</span> okudum. Verilerimin teklif hazırlama, iletişim ve hizmet sunumu amacıyla işlenmesine, gerektiğinde üçüncü taraflarla (noter, kurye, resmi kurumlar) paylaşılmasına ve 90 gün süreyle saklanmasına izin veriyorum. Onayımı istediğim zaman geri alabilirim.
              </div>
            </label>
          </div>

          {/* Submit */}

        {/* Güven Badge'leri */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> Gizlilik Esastır</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> Belgeyi İnceleyip Net Teklif</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-600" /> Mesai Saatlerinde Yanıt</span>
        </div>


          <div className="text-center">
            <button
              type="submit"
              disabled={submitStatus === "sending" || uploadStatus === "uploading" || !emailVerified || !kvkkAccepted}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {submitStatus === "sending" ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Gönderiliyor...</>
              ) : (
                <>Teklif Talebi Gönder</>
              )}
            </button>
            <p className="text-sm text-muted-foreground mt-4">
              Form gönderildiğinde talebiniz kaydedilir ve WhatsApp üzerinden size iletilir.
            </p>
          </div>
        </form>

        {/* Alt bilgi */}
        <div className="mt-12 text-center text-sm text-muted-foreground border-t border-border pt-6">
          <p>Sorularınız için: <a href="mailto:info@mazzgord.com" className="text-primary hover:underline">info@mazzgord.com</a></p>
          <p className="mt-1">Telefon: <a href="tel:+905386295040" className="text-primary hover:underline">+90 538 629 50 40</a></p>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Zap, Send, CheckCircle2, Loader2 } from "lucide-react";
import { track } from "@/lib/analytics";

const DOC_TYPES = [
  "Pasaport",
  "Diploma / Transkript",
  "Vize Evrakı",
  "Kimlik / Nüfus Kayıt",
  "Adli Sicil",
  "Sözleşme",
  "Noter Onaylı Belge",
  "Apostil Belgesi",
  "Teknik Doküman",
  "Akademik Makale",
  "Diğer",
];

export default function QuickQuote() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [docType, setDocType] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [orderNo, setOrderNo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !docType) return;

    setStatus("sending");
    track.offerFormStarted();

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: "",
          source_language: "İngilizce",
          target_language: "Türkçe",
          document_type: docType,
          urgency: "standart",
          delivery_method: "digital",
          idempotency_key: crypto.randomUUID(),
        }),
      });

      if (response.ok) {
        const result = await response.json().catch(() => ({}));
        if (result.order_no) setOrderNo(result.order_no);
        setStatus("success");
        track.offerFormCompleted();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-3" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Teklif Talebiniz Alındı!</h3>
        <p className="text-green-700 mb-4">Belgenizi inceleyip en kısa sürede size dönüş yapacağım.</p>
        {orderNo && (
          <p className="text-sm text-muted-foreground mb-4">
            Başvuru No: <span className="font-bold font-mono text-foreground">{orderNo}</span>
          </p>
        )}
        <a
          href={`https://wa.me/905386295040?text=${encodeURIComponent(`Merhaba, teklif talebi gönderdim. Başvuru no: ${orderNo}. Belge türüm: ${docType}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
        >
          WhatsApp'tan Hızlı İletişim
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Hızlı Teklif — 30 Saniye</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">Sadece 3 alan doldurun, gerisini WhatsApp'tan halledelim.</p>
      <form onSubmit={handleSubmit} className="grid sm:grid-cols-3 gap-3">
        <label htmlFor="qq-name" className="sr-only">Adınız Soyadınız</label>
        <input
          id="qq-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Adınız Soyadınız"
          aria-label="Adınız Soyadınız"
          required
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
        <label htmlFor="qq-phone" className="sr-only">Telefon numaranız</label>
        <input
          id="qq-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="05XX XXX XX XX"
          aria-label="Telefon numaranız"
          required
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        />
        <label htmlFor="qq-doc-type" className="sr-only">Belge türü</label>
        <select
          id="qq-doc-type"
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
          aria-label="Belge türü"
          required
          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
        >
          <option value="">Belge Türü</option>
          {DOC_TYPES.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={status === "sending"}
          className="sm:col-span-3 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition disabled:opacity-50"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Gönderiliyor...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Hızlı Teklif Al
            </>
          )}
        </button>
        {status === "error" && (
          <p className="sm:col-span-3 text-sm text-red-600 text-center">
            Bir hata oluştu. Lütfen WhatsApp'tan ulaşın: 0538 629 50 40
          </p>
        )}
      </form>
    </div>
  );
}

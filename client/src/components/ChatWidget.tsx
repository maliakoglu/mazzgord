import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Paperclip, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";

function renderContent(text: string, useMarkdown: boolean = true) {
  if (!useMarkdown) return <span>{text}</span>;
  return <Streamdown className="chat-md">{text}</Streamdown>;
}

interface Message { role: "user" | "assistant"; content: string; }
interface QuoteData {
  name: string; email: string; phone: string;
  document_type: string; service_type: string;
  source_language: string; target_language: string;
  urgency: string; delivery_method: string; notes: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem("mazzgord_chat_messages");
      if (saved) return JSON.parse(saved);
    } catch(e) { }
    return [{ role: "assistant", content: "Merhaba! Ben Mazzgord AI \u00e7eviri asistan\u0131y\u0131m. \u00c7eviri hizmetleri hakk\u0131nda sorular\u0131n\u0131z\u0131 yan\u0131tlayabilirim. Size nas\u0131l yard\u0131mc\u0131 olabilirim?" }];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => {
    try {
      const saved = localStorage.getItem("mazzgord_chat_session");
      if (saved) return saved;
    } catch(e) { }
    const id = Date.now().toString();
    try { localStorage.setItem("mazzgord_chat_session", id); } catch(e) { }
    return id;
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [uploadedFile, setUploadedFile] = useState<{key: string, name: string} | null>(null);
  const [uploading, setUploading] = useState(false);
  const [pendingQuote, setPendingQuote] = useState<QuoteData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [orderNo, setOrderNo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingQuote, orderNo]);

  // Mesajlari localStorage'a kaydet
  useEffect(() => {
    try {
      if (messages.length > 1) {
        localStorage.setItem("mazzgord_chat_messages", JSON.stringify(messages.slice(-20)));
      }
    } catch(e) { }
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.success) {
        setUploadedFile({ key: data.file_key, name: data.file_name });
        setMessages(prev => [...prev, { role: "user", content: "\u{1F4CE} " + file.name + " y\u00fcklendi" }]);
        setMessages(prev => [...prev, { role: "assistant", content: "Belgenizi ald\u0131m! Hangi belgeyi \u00e7evirtmek istiyorsunuz? (Pasaport, diploma, vize belgesi, s\u00f6zle\u015fme vb.)" }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Dosya y\u00fcklenemedi. L\u00fctfen PDF, JPG veya PNG format\u0131nda tekrar deneyin." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Dosya y\u00fcklenirken bir hata olu\u015ftu. L\u00fctfen tekrar deneyin." }]);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const submitQuote = async () => {
    if (!pendingQuote || !uploadedFile) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/chat/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...pendingQuote, file_key: uploadedFile.key, file_name: uploadedFile.name }),
      });
      const data = await res.json();
      if (data.success) {
        setOrderNo(data.orderNo);
        setPendingQuote(null);
        setUploadedFile(null);
        setMessages(prev => [...prev, { role: "assistant", content: "\u2705 Teklif talebiniz al\u0131nd\u0131! Sipari\u015f numaran\u0131z: " + data.orderNo + ". Belgenizi inceleyip en k\u0131sa s\u00fcrede fiyat teklifini e-posta ile g\u00f6nderece\u011fim. Sipari\u015f takibini /siparis sayfas\u0131ndan yapabilirsiniz." }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Teklif olu\u015fturulurken bir hata olu\u015ftu. L\u00fctfen info@mazzgord.com adresine yaz\u0131n." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Ba\u011flant\u0131 hatas\u0131. L\u00fctfen tekrar deneyin." }]);
    } finally {
      setSubmitting(false);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    // Bos assistant mesaji ekle — token'lar buraya akacak
    setMessages(prev => [...prev, { role: "assistant", content: "" }]);
    let accumulated = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: userMsg }], sessionId }),
      });

      if (!res.ok || !res.body) {
        setMessages(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { role: "assistant", content: "Ba\u011flant\u0131 hatas\u0131. L\u00fctfen tekrar deneyin." };
          return copy;
        });
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const bufferLines = buffer.split("\n");
        buffer = bufferLines.pop() || "";

        for (const line of bufferLines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6);
          if (raw === "[DONE]") break;
          try {
            const data = JSON.parse(raw);
            const text = data.choices?.[0]?.delta?.content || data.response || "";
            if (text) {
              accumulated += text;
              setMessages(prev => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: accumulated };
                return copy;
              });
            }
          } catch(e) { }
        }
      }

      // Teklif formatini kontrol et — saglamlastirilmis
      const match = accumulated.match(/\[TEKLIF_HAZIR\](\{[\s\S]*?\})\[\/TEKLIF_HAZIR\]/);
      if (match) {
        try {
          const quoteData: QuoteData = JSON.parse(match[1]);
          setPendingQuote(quoteData);
          const cleaned = accumulated.replace(/\[TEKLIF_HAZIR\][\s\S]*?\[\/TEKLIF_HAZIR\]/, "").trim();
          const finalText = cleaned || "Bilgileri \u00f6zet olarak a\u015fa\u011f\u0131da g\u00f6r\u00fcyorsunuz. Onayl\u0131yorsan\u0131z \u2018Teklif Talebi G\u00f6nder\u2019 butonuna t\u0131klay\u0131n.";
          setMessages(prev => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: finalText };
            return copy;
          });
        } catch(e) {
          // JSON parse basarisiz — fallback: tag'leri temizle, ham metni goster
          console.log("Teklif JSON parse hatasi:", String(e));
          const cleaned = accumulated.replace(/\[TEKLIF_HAZIR\][\s\S]*?\[\/TEKLIF_HAZIR\]/, "").trim();
          setMessages(prev => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: cleaned || "Teklif olusturulurken bir sorun olustu. Lutfen /teklif formundan ulasabilirsiniz." };
            return copy;
          });
        }
      } else if (accumulated.includes("[TEKLIF_HAZIR]")) {
        // Tag acik ama kapanmamis — streaming yarim kalmis olabilir
        const partial = accumulated.match(/\[TEKLIF_HAZIR\](\{[\s\S]*)/);
        if (partial) {
          try {
            let jsonStr = partial[1].trim();
            // Kapanis tag'i yoksa ekle
            if (!jsonStr.endsWith("}")) jsonStr += "}";
            if (!jsonStr.endsWith("[/TEKLIF_HAZIR]")) jsonStr = jsonStr.replace(/\[\/TEKLIF_HAZIR\]$/, "");
            const quoteData: QuoteData = JSON.parse(jsonStr);
            setPendingQuote(quoteData);
            const cleaned = accumulated.replace(/\[TEKLIF_HAZIR\][\s\S]*/, "").trim();
            const finalText = cleaned || "Bilgileri \u00f6zet olarak a\u015fa\u011f\u0131da g\u00f6r\u00fcyorsunuz. Onayl\u0131yorsan\u0131z \u2018Teklif Talebi G\u00f6nder\u2019 butonuna t\u0131klay\u0131n.";
            setMessages(prev => {
              const copy = [...prev];
              copy[copy.length - 1] = { role: "assistant", content: finalText };
              return copy;
            });
          } catch(e2) {
            console.log("Kismi teklif parse hatasi:", String(e2));
          }
        }
      }
    } catch {
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "assistant", content: accumulated || "Ba\u011flant\u0131 hatas\u0131. L\u00fctfen tekrar deneyin." };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-50 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="AI Asistanini Ac"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  const urgencyLabels: Record<string, string> = {
    standart: "Standart (3-5 is gunu)",
    hizli: "Hizli (1-2 is gunu) +30%",
    acil: "Acil (24 saat) +50%",
  };
  const serviceLabels: Record<string, string> = {
    yeminli: "Yeminli Tercume",
    noter: "Noter Onayli Tercume",
    profesyonel: "Profesyonel Ceviri",
    akademik: "Akademik Ceviri",
    teknik: "Teknik Ceviri",
    hukuki: "Hukuki Ceviri",
    apostil: "Apostil Takibi",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 bg-card border border-border rounded-2xl shadow-2xl flex flex-col" style={{ height: "500px", maxHeight: "70vh" }}>
      <div className="bg-primary text-primary-foreground p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm">Mazzgord AI Asistan</p>
            <p className="text-xs opacity-80">Ceviri sorulariniz yanitlanir</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="hover:bg-primary-foreground/10 rounded-lg p-1 transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div className={msg.role === "user"
              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%] text-sm"
              : "bg-secondary text-foreground rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%] text-sm"
            }>
              {renderContent(msg.content, msg.role === "assistant")}
            </div>
          </div>
        ))}

        {uploading && (
          <div className="flex justify-start">
            <div className="bg-secondary text-foreground rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm text-muted-foreground">Dosya yukleniyor...</span>
            </div>
          </div>
        )}

        {uploadedFile && (
          <div className="flex justify-start">
            <div className="bg-emerald-50 text-emerald-700 rounded-2xl rounded-bl-sm px-4 py-2 flex items-center gap-2 text-sm border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>{uploadedFile.name}</span>
            </div>
          </div>
        )}

        {pendingQuote && (
          <div className="bg-card border-2 border-primary rounded-xl p-4 space-y-2">
            <p className="font-bold text-sm text-primary">Teklif Ozeti</p>
            <div className="text-xs space-y-1 text-foreground">
              <p><span className="text-muted-foreground">Belge:</span> {pendingQuote.document_type || "-"}</p>
              <p><span className="text-muted-foreground">Hizmet:</span> {serviceLabels[pendingQuote.service_type] || pendingQuote.service_type || "-"}</p>
              <p><span className="text-muted-foreground">Dil:</span> {pendingQuote.source_language || "-"} &rarr; {pendingQuote.target_language || "-"}</p>
              <p><span className="text-muted-foreground">Aciliyet:</span> {urgencyLabels[pendingQuote.urgency] || pendingQuote.urgency || "-"}</p>
              <p><span className="text-muted-foreground">Teslimat:</span> {pendingQuote.delivery_method === "shipping" ? "Kargo (300 TL)" : pendingQuote.delivery_method === "hand_delivery" ? "Elden Teslim" : "Dijital (Ucretsiz)"}</p>
              <p><span className="text-muted-foreground">Ad:</span> {pendingQuote.name || "-"}</p>
              <p><span className="text-muted-foreground">E-posta:</span> {pendingQuote.email || "-"}</p>
              <p><span className="text-muted-foreground">Telefon:</span> {pendingQuote.phone || "-"}</p>
              {pendingQuote.notes && <p><span className="text-muted-foreground">Not:</span> {pendingQuote.notes}</p>}
            </div>
            <button
              onClick={submitQuote}
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-medium hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Gonderiliyor...</> : <><CheckCircle2 className="w-4 h-4" /> Teklif Talebi Gonder</>}
            </button>
          </div>
        )}

        {orderNo && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
            <p className="text-sm font-bold text-emerald-700">Siparis: {orderNo}</p>
            <Link href="/siparis" className="text-xs text-primary underline mt-1 inline-block">Siparis Takibi</Link>
          </div>
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-secondary text-foreground rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm text-muted-foreground">Yaziyor...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length <= 2 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {["Pasaport cevirisi ne kadar?", "Vize icin hangi belgeler?", "Teslimat suresi?", "Online odeme var mi?"].map(q => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="text-xs bg-secondary/50 text-foreground px-3 py-1.5 rounded-full hover:bg-secondary transition border border-border"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="p-3 border-t border-border bg-card rounded-b-2xl">
        <div className="flex gap-2 items-center">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading || loading}
            className="text-muted-foreground hover:text-primary transition p-2 rounded-lg hover:bg-secondary disabled:opacity-50"
            aria-label="Dosya yukle"
            title="Belgenizi yukleyin"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Sorunuzu yazin..."
            className="flex-1 px-3 py-2 border border-border rounded-lg bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-primary text-primary-foreground rounded-lg px-3 py-2 hover:bg-primary/90 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 text-center">
          AI tarafindan yanitlanir &middot; <a href="/teklif" className="text-primary hover:underline">Teklif Al</a>
        </p>
      </div>
    </div>
  );
}

import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Merhaba! Ben Mazzgord AI ceviri asistaniyim. Ceviri hizmetleri hakkinda sorularinizi yanitlayabilirim. Size nasil yardimci olabilirim?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => Date.now().toString());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMsg }],
          sessionId,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Uzgunum, su anda yanit veremiyorum. Lutfen info@mazzgord.com adresine yazin." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Baglanti hatasi. Lutfen tekrar deneyin." }]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-6 z-50 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="AI Asistani Ac"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 bg-card border border-border rounded-2xl shadow-2xl flex flex-col" style={{ height: "500px", maxHeight: "70vh" }}>
      {/* Header */}
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

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div className={msg.role === "user"
              ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm px-4 py-2 max-w-[80%] text-sm"
              : "bg-secondary text-foreground rounded-2xl rounded-bl-sm px-4 py-2 max-w-[80%] text-sm"
            }>
              {msg.content}
            </div>
          </div>
        ))}
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

      {/* Quick Actions */}
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

      {/* Input */}
      <div className="p-3 border-t border-border bg-card rounded-b-2xl">
        <div className="flex gap-2">
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
          AI tarafindan yanitlanir · <a href="/teklif" className="text-primary hover:underline">Teklif Al</a>
        </p>
      </div>
    </div>
  );
}

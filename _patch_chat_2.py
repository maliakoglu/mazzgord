with open("client/src/components/ChatWidget.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_send = '''  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: userMsg }], sessionId }),
      });
      const data = await res.json();
      if (data.success) {
        let reply = data.reply;
        const match = reply.match(/\\[TEKLIF_HAZIR\\](\\{[\\s\\S]*?\\})\\[\\/TEKLIF_HAZIR\\]/);
        if (match) {
          try {
            const quoteData: QuoteData = JSON.parse(match[1]);
            setPendingQuote(quoteData);
            reply = reply.replace(/\\[TEKLIF_HAZIR\\][\\s\\S]*?\\[\\/TEKLIF_HAZIR\\]/, "").trim();
            if (!reply) reply = "Bilgileri ozet olarak asagida goruyorsunuz. Onayliyorsaniz 'Teklif Talebi Gonder' butonuna tiklayin.";
          } catch(e) { }
        }
        if (reply) {
          setMessages(prev => [...prev, { role: "assistant", content: reply }]);
        }
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Uzgunum, su anda yanit veremiyorum. Lutfen info@mazzgord.com adresine yazin." }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Baglanti hatasi. Lutfen tekrar deneyin." }]);
    } finally {
      setLoading(false);
    }
  };'''

new_send = '''  const sendMessage = async () => {
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
          copy[copy.length - 1] = { role: "assistant", content: "Baglanti hatasi. Lutfen tekrar deneyin." };
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
        const lines = buffer.split("\\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.text) {
              accumulated += data.text;
              setMessages(prev => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: accumulated };
                return copy;
              });
            }
            if (data.done) break;
          } catch(e) { }
        }
      }

      // Teklif formatini kontrol et
      const match = accumulated.match(/\\[TEKLIF_HAZIR\\](\\{[\\s\\S]*?\\})\\[\\/TEKLIF_HAZIR\\]/);
      if (match) {
        try {
          const quoteData: QuoteData = JSON.parse(match[1]);
          setPendingQuote(quoteData);
          const cleaned = accumulated.replace(/\\[TEKLIF_HAZIR\\][\\s\\S]*?\\[\\/TEKLIF_HAZIR\\]/, "").trim();
          const finalText = cleaned || "Bilgileri ozet olarak asagida goruyorsunuz. Onayliyorsaniz 'Teklif Talebi Gonder' butonuna tiklayin.";
          setMessages(prev => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: finalText };
            return copy;
          });
        } catch(e) { }
      }
    } catch {
      setMessages(prev => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: "assistant", content: accumulated || "Baglanti hatasi. Lutfen tekrar deneyin." };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };'''

if old_send not in content:
    print("HATA: sendMessage fonksiyonu bulunamadi!")
    exit(1)

content = content.replace(old_send, new_send)

with open("client/src/components/ChatWidget.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: Parca 2 — sendMessage streaming'e cevrildi")

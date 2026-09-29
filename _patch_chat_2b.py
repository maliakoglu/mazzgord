with open("client/src/components/ChatWidget.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

# sendMessage fonksiyonunun baslangic ve bitis satirini bul
start = None
end = None
for i, line in enumerate(lines):
    if "const sendMessage = async () => {" in line:
        start = i
    if start is not None and i > start and line.strip() == "};" and i - start > 5:
        end = i
        break

if start is None or end is None:
    print(f"HATA: sendMessage bulunamadi! start={start} end={end}")
    exit(1)

print(f"sendMessage: satir {start+1} - {end+1}")

new_func = '''  const sendMessage = async () => {
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
          copy[copy.length - 1] = { role: "assistant", content: "Ba\\u011flant\\u0131 hatas\\u0131. L\\u00fctfen tekrar deneyin." };
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
        const bufferLines = buffer.split("\\n");
        buffer = bufferLines.pop() || "";

        for (const line of bufferLines) {
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
          const finalText = cleaned || "Bilgileri \\u00f6zet olarak a\\u015fa\\u011f\\u0131da g\\u00f6r\\u00fcyorsunuz. Onayl\\u0131yorsan\\u0131z \\u2018Teklif Talebi G\\u00f6nder\\u2019 butonuna t\\u0131klay\\u0131n.";
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
        copy[copy.length - 1] = { role: "assistant", content: accumulated || "Ba\\u011flant\\u0131 hatas\\u0131. L\\u00fctfen tekrar deneyin." };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  };
'''

lines[start:end+1] = [new_func]

with open("client/src/components/ChatWidget.tsx", "w", encoding="utf-8") as f:
    f.writelines(lines)

print("OK: Parca 2 — sendMessage streaming'e cevrildi")

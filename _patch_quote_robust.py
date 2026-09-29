with open("client/src/components/ChatWidget.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old = '''      // Teklif formatini kontrol et
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
      }'''

new = '''      // Teklif formatini kontrol et — saglamlastirilmis
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
        } catch(e) {
          // JSON parse basarisiz — fallback: tag'leri temizle, ham metni goster
          console.log("Teklif JSON parse hatasi:", String(e));
          const cleaned = accumulated.replace(/\\[TEKLIF_HAZIR\\][\\s\\S]*?\\[\\/TEKLIF_HAZIR\\]/, "").trim();
          setMessages(prev => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "assistant", content: cleaned || "Teklif olusturulurken bir sorun olustu. Lutfen /teklif formundan ulasabilirsiniz." };
            return copy;
          });
        }
      } else if (accumulated.includes("[TEKLIF_HAZIR]")) {
        // Tag acik ama kapanmamis — streaming yarim kalmis olabilir
        const partial = accumulated.match(/\\[TEKLIF_HAZIR\\](\\{[\\s\\S]*)/);
        if (partial) {
          try {
            let jsonStr = partial[1].trim();
            // Kapanis tag'i yoksa ekle
            if (!jsonStr.endsWith("}")) jsonStr += "}";
            if (!jsonStr.endsWith("[/TEKLIF_HAZIR]")) jsonStr = jsonStr.replace(/\\[\\/TEKLIF_HAZIR\\]$/, "");
            const quoteData: QuoteData = JSON.parse(jsonStr);
            setPendingQuote(quoteData);
            const cleaned = accumulated.replace(/\\[TEKLIF_HAZIR\\][\\s\\S]*/, "").trim();
            const finalText = cleaned || "Bilgileri \\u00f6zet olarak a\\u015fa\\u011f\\u0131da g\\u00f6r\\u00fcyorsunuz. Onayl\\u0131yorsan\\u0131z \\u2018Teklif Talebi G\\u00f6nder\\u2019 butonuna t\\u0131klay\\u0131n.";
            setMessages(prev => {
              const copy = [...prev];
              copy[copy.length - 1] = { role: "assistant", content: finalText };
              return copy;
            });
          } catch(e2) {
            console.log("Kismi teklif parse hatasi:", String(e2));
          }
        }
      }'''

if old not in content:
    print("HATA: Teklif parse bloku bulunamadi!")
    exit(1)

content = content.replace(old, new)

with open("client/src/components/ChatWidget.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: Teklif akisi saglamlastirildi")

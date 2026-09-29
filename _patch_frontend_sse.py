with open("client/src/components/ChatWidget.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old = '''        for (const line of bufferLines) {
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
        }'''

new = '''        for (const line of bufferLines) {
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
        }'''

if old not in content:
    print("HATA: Frontend SSE parse blogu bulunamadi!")
    exit(1)

content = content.replace(old, new)

with open("client/src/components/ChatWidget.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: Frontend SSE parse duzeltildi")

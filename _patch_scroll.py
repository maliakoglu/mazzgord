with open("client/src/components/ChatWidget.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old = '''  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingQuote, orderNo]);'''

new = '''  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: loading ? "auto" : "smooth" });
  }, [messages, pendingQuote, orderNo]);'''

if old not in content:
    print("HATA: useEffect scroll bulunamadi!")
    exit(1)
content = content.replace(old, new)

with open("client/src/components/ChatWidget.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: Scroll titremesi duzeltildi")

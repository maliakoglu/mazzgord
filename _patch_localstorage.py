with open("client/src/components/ChatWidget.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. messages state'ini localStorage'dan baslat
old_messages = '''  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Merhaba! Ben Mazzgord AI \\u00e7eviri asistan\\u0131y\\u0131m. \\u00c7eviri hizmetleri hakk\\u0131nda sorular\\u0131n\\u0131z\\u0131 yan\\u0131tlayabilirim. Size nas\\u0131l yard\\u0131mc\\u0131 olabilirim?" }
  ]);'''

new_messages = '''  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem("mazzgord_chat_messages");
      if (saved) return JSON.parse(saved);
    } catch(e) { }
    return [{ role: "assistant", content: "Merhaba! Ben Mazzgord AI \\u00e7eviri asistan\\u0131y\\u0131m. \\u00c7eviri hizmetleri hakk\\u0131nda sorular\\u0131n\\u0131z\\u0131 yan\\u0131tlayabilirim. Size nas\\u0131l yard\\u0131mc\\u0131 olabilirim?" }];
  });'''

if old_messages not in content:
    print("HATA: messages state bulunamadi!")
    exit(1)
content = content.replace(old_messages, new_messages)

# 2. sessionId'yi localStorage'dan baslat
old_session = '  const [sessionId] = useState(() => Date.now().toString());'
new_session = '''  const [sessionId] = useState(() => {
    try {
      const saved = localStorage.getItem("mazzgord_chat_session");
      if (saved) return saved;
    } catch(e) { }
    const id = Date.now().toString();
    try { localStorage.setItem("mazzgord_chat_session", id); } catch(e) { }
    return id;
  });'''

if old_session not in content:
    print("HATA: sessionId bulunamadi!")
    exit(1)
content = content.replace(old_session, new_session)

# 3. messages degistikce localStorage'a kaydet
old_scroll = '''  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingQuote, orderNo]);'''

new_scroll = '''  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pendingQuote, orderNo]);

  // Mesajlari localStorage'a kaydet
  useEffect(() => {
    try {
      if (messages.length > 1) {
        localStorage.setItem("mazzgord_chat_messages", JSON.stringify(messages.slice(-20)));
      }
    } catch(e) { }
  }, [messages]);'''

if old_scroll not in content:
    print("HATA: useEffect scroll bulunamadi!")
    exit(1)
content = content.replace(old_scroll, new_scroll)

with open("client/src/components/ChatWidget.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: localStorage persistence eklendi")

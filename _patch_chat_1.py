with open("client/src/components/ChatWidget.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Import ekle
old_import = 'import { useState, useRef, useEffect } from "react";\nimport { MessageCircle, X, Send, Loader2, Paperclip, CheckCircle2 } from "lucide-react";\nimport { Link } from "wouter";'
new_import = 'import { useState, useRef, useEffect } from "react";\nimport { MessageCircle, X, Send, Loader2, Paperclip, CheckCircle2 } from "lucide-react";\nimport { Link } from "wouter";\nimport { Streamdown } from "streamdown";'

if old_import not in content:
    print("HATA: Import satiri bulunamadi!")
    exit(1)
content = content.replace(old_import, new_import)

# 2. renderContent fonksiyonunu Streamdown ile degistir
old_render = '''function renderContent(text: string) {
  const parts = text.split(/(\\/teklif\\?[^\\s\\)]+)/g);
  return parts.map((part, i) => {
    if (part.startsWith("/teklif?")) {
      return <Link key={i} href={part} className="text-primary font-semibold underline">{part}</Link>;
    }
    return <span key={i}>{part}</span>;
  });
}'''

new_render = '''function renderContent(text: string) {
  return <Streamdown className="chat-md">{text}</Streamdown>;
}'''

if old_render not in content:
    print("HATA: renderContent bulunamadi!")
    exit(1)
content = content.replace(old_render, new_render)

with open("client/src/components/ChatWidget.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: Parca 1 — import + renderContent guncellendi")

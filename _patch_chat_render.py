with open("client/src/components/ChatWidget.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_render = '''function renderContent(text: string) {
  return <Streamdown className="chat-md">{text}</Streamdown>;
}'''

new_render = '''function renderContent(text: string, useMarkdown: boolean = true) {
  if (!useMarkdown) return <span>{text}</span>;
  return <Streamdown className="chat-md">{text}</Streamdown>;
}'''

if old_render not in content:
    print("HATA: renderContent bulunamadi!")
    exit(1)
content = content.replace(old_render, new_render)

old_msg = '''              {renderContent(msg.content)}'''
new_msg = '''              {renderContent(msg.content, msg.role === "assistant")}'''

if old_msg not in content:
    print("HATA: mesaj render bulunamadi!")
    exit(1)
content = content.replace(old_msg, new_msg)

with open("client/src/components/ChatWidget.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: renderContent role'e gore ayristirildi")

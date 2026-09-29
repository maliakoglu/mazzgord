with open("lib/chatSystemPrompt.js", "r", encoding="utf-8") as f:
    content = f.read()

# YASAKLAR bolumune dil kurali ekle
old = "- Sadece İngilizce-Türkçe çeviri yaptığınızı belirt, başka dil sorduysa yönlendir."
new = """- Sadece İngilizce-Türkçe çeviri yaptığınızı belirt, başka dil sorduysa yönlendir.
- SADECE Türkçe konuş. Asla başka dilde (İngilizce, Hollandaca, Almanca vb.) kelime kullanma.
- "mogelijk", "possible", "möglich" gibi yabancı kelimeler ASLA kullanma."""

if old not in content:
    print("HATA: Yasaklar satiri bulunamadi!")
    exit(1)
content = content.replace(old, new)

with open("lib/chatSystemPrompt.js", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: Dil kurali eklendi")

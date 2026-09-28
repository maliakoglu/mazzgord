# 1) /sepet redirect ekle
with open("lib/redirects.js", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace(
    '  "/ucretsiz-teklif": "/teklif",',
    '  "/ucretsiz-teklif": "/teklif",\n  "/sepet": "/",'
)
print("1 OK - /sepet redirect eklendi")

with open("lib/redirects.js", "w", encoding="utf-8") as f:
    f.write(content)

# 2) seoData.js'e /degerlendir ekle (NOINDEX — robots: noindex)
with open("lib/seoData.js", "r", encoding="utf-8") as f:
    content = f.read()

# Son entry'yi bul — dosyanın yapısını görelim
# Genelde son entry'den önce } kapanışı olur
# /degerlendir için noindex entry ekle
if "/degerlendir" not in content:
    # Sondaki kapanış } bul, ondan önce ekle
    # seoData.js muhtemelen export const seoData = { ... } yapısında
    # En güvenli: son "},\n};" pattern'ini bul
    import re
    # Son entry'yi bul — "  "/path": { ... },\n}; pattern
    # Basit approach: "};" ile biten son bloktan önce ekle
    last_block = content.rfind('};')
    if last_block > 0:
        insert = '''  "/degerlendir": {
    title: "Değerlendirme — Mazzgord",
    description: "",
    robots: "noindex, nofollow",
  },
'''
        content = content[:last_block] + insert + content[last_block:]
        print("2 OK - /degerlendir seoData'ya eklendi")
    else:
        print("2 SKIP - kapanış bulunamadı")
else:
    print("2 SKIP - zaten var")

with open("lib/seoData.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Tamam.")

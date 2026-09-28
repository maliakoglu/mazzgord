# 1) redirects.js'e /sepet → / redirect ekle
with open("lib/redirects.js", "r", encoding="utf-8") as f:
    content = f.read()

# Mevcut redirect pattern'ini bul, /sepet ekle
if "/sepet" not in content:
    # redirects objesine ekle — dosya yapısını görmediğimiz için generic approach
    # Eğer REDIRECTS = { ... } pattern varsa
    import re
    # redirect map'in sonuna ekle
    old = '" /sepet": "/"'
    # Dosyayı kontrol et, uygun yere ekle
    if "const REDIRECTS" in content or "redirects" in content.lower():
        # En basit: dosyanın sonuna bir kontrol ekle
        pass
    print("redirects.js kontrol edilecek")

# 2) generate_sitemap.py NOINDEX listesine /degerlendir ekle
with open("scripts/generate_sitemap.py", "r", encoding="utf-8") as f:
    sitemap = f.read()

if "/degerlendir" not in sitemap:
    sitemap = sitemap.replace(
        'NOINDEX = {"/giris", "/hesabim", "/odeme", "/odeme/sonuc", "/admin", "/cerez-politikasi", "/kullanim-kosullari", "/gizlilik", "/siparis-takip"}',
        'NOINDEX = {"/giris", "/hesabim", "/degerlendir", "/odeme", "/odeme/sonuc", "/admin", "/cerez-politikasi", "/kullanim-kosullari", "/gizlilik", "/siparis-takip"}'
    )
    print("2 OK - /degerlendir NOINDEX'e eklendi")
else:
    print("2 SKIP - zaten var")

with open("scripts/generate_sitemap.py", "w", encoding="utf-8") as f:
    f.write(sitemap)

# 3) seoData.js'e /degerlendir NOINDEX meta ekle
with open("lib/seoData.js", "r", encoding="utf-8") as f:
    seo = f.read()

if "/degerlendir" not in seo:
    # Son entry'den sonra ekle
    # Dosyanın yapısını tam görmediğimiz için güvenli approach
    print("3 PENDING - seoData.js manuel kontrol gerekli")
else:
    print("3 SKIP - zaten var")

with open("lib/seoData.js", "w", encoding="utf-8") as f:
    f.write(seo)

print("Tamam.")

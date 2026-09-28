with open("lib/seoData.js", "r", encoding="utf-8") as f:
    content = f.read()

# Bozuk kısmı düzelt
old = '''  "/iletisim": {
    "title": "İletişim | Mazzgord Çeviri Hizmetleri",
    "description": "Mazzgord çeviri hizmetleri ile iletişim. Telefon, e-posta, WhatsApp ve iletişim formu üzerinden bana ulaşın. Denizli merkezli yeminli tercüme hizmeti."
  }
  "/degerlendir": {
    title: "Değerlendirme — Mazzgord",
    description: "",
    robots: "noindex, nofollow",
  },
};'''

new = '''  "/iletisim": {
    "title": "İletişim | Mazzgord Çeviri Hizmetleri",
    "description": "Mazzgord çeviri hizmetleri ile iletişim. Telefon, e-posta, WhatsApp ve iletişim formu üzerinden bana ulaşın. Denizli merkezli yeminli tercüme hizmeti."
  },
  "/degerlendir": {
    "title": "Değerlendirme — Mazzgord",
    "description": "",
    "robots": "noindex, nofollow"
  }
};'''

if old in content:
    content = content.replace(old, new, 1)
    print("OK - seoData.js düzeltildi")
else:
    print("SKIP - anchor bulunamadı")

with open("lib/seoData.js", "w", encoding="utf-8") as f:
    f.write(content)

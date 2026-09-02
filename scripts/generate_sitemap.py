#!/usr/bin/env python3
"""Sitemap.xml otomatik üretici — prerender.py'deki ROUTES listesini kullanır."""
import os
from datetime import datetime

# prerender.py ile aynı route listesi
ROUTES = [
    "/",
    "/hakkimizda",
    "/yeminli-tercume",
    "/ingilizce-turkce-ceviri",
    "/teknik-ceviri",
    "/akademik-ceviri",
    "/vize-ceviri",
    "/pasaport-ceviri",
    "/diploma-ceviri",
    "/transkript-ceviri",
    "/adli-sicil-cevirisi",
    "/nufus-kayit-ornegi-cevirisi",
    "/acil-tercume",
    "/denizli-yeminli-tercume",
    "/denizli-noter-onayli-tercume",
    "/denizli-pasaport-tercumesi",
    "/denizli-diploma-tercumesi",
    "/denizli-vize-tercumesi",
    "/denizli-apostil-tercume",
    "/noter-onayli-tercume",
    "/apostil-tercume",
    "/fiyatlar",
    "/sepet",
    "/teklif",
    "/odeme",
    "/odeme/sonuc",
    "/giris",
    "/hesabim",
    "/sss",
    "/iletisim",
    "/blog",
    "/blog/yeminli-tercume",
    "/blog/vize-ceviri",
    "/blog/teknik-ceviri",
    "/blog/akademik-ceviri",
    "/blog/ceviri-ipuclari",
    "/blog/ceviri-sektoru",
    "/blog/tibbi-ceviri",
    "/blog/yerellestirme-hizmetleri",
    "/blog/ceviri-teknolojileri",
    "/blog/ceviri-hatalari",
    "/blog/teknik-ceviri-nedir",
    "/blog/hukuki-ceviri",
    "/blog/uc-dunya-ceviri",
    "/blog/cevirmenlik-kariyer-rehberi",
    "/blog/ingilizce-turkce-deyim-cevirisi",
    "/blog/google-translate-vs-profesyonel-ceviri",
    "/blog/ingilizce-sozlesme-cevirisi",
    "/blog/ingilizce-mektup-email-cevirisi",
    "/blog/ingilizce-edebi-metin-cevirisi",
    "/blog/noter-onayli-ceviri",
    "/blog/pasaport-tercumesi-nasil-yapilir",
    "/blog/yeminli-tercume-fiyatlari-2026",
    "/blog/vize-formatlari",
    "/blog/arac-ruhsati-cevirisi",
    "/blog/ingiltere-vize-cevirisi-gercek-vaka",
    "/blog/dogalgaz-faturasi-cevirisi",
]

# noindex sayfalar — sitemap'e eklenmez
NOINDEX = {"/giris", "/hesabim", "/sepet", "/odeme", "/odeme/sonuc", "/admin", "/cerez-politikasi", "/kullanim-kosullari", "/gizlilik", "/siparis-takip"}

# Öncelikler
PRIORITY = {
    "/": "1.0",
    "/yeminli-tercume": "0.9",
    "/pasaport-ceviri": "0.9",
    "/diploma-ceviri": "0.9",
    "/transkript-ceviri": "0.9",
    "/adli-sicil-cevirisi": "0.9",
    "/nufus-kayit-ornegi-cevirisi": "0.9",
    "/acil-tercume": "0.9",
    "/denizli-yeminli-tercume": "0.9",
    "/denizli-noter-onayli-tercume": "0.9",
    "/denizli-pasaport-tercumesi": "0.9",
    "/denizli-diploma-tercumesi": "0.9",
    "/denizli-vize-tercumesi": "0.9",
    "/denizli-apostil-tercume": "0.9",
    "/vize-ceviri": "0.9",
    "/ingilizce-turkce-ceviri": "0.8",
    "/hakkimizda": "0.8",
    "/hizmetler": "0.8",
    "/fiyatlar": "0.8",
    "/teklif": "0.8",
    "/blog": "0.8",
    "/teknik-ceviri": "0.7",
    "/akademik-ceviri": "0.7",
    "/sss": "0.6",
}
# Blog yazıları varsayılan 0.6

BASE_URL = "https://mazzgord.com"
TODAY = datetime.now().strftime("%Y-%m-%d")

lines = ['<?xml version="1.0" encoding="UTF-8"?>']
lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

for route in ROUTES:
    if route in NOINDEX:
        continue
    priority = PRIORITY.get(route, "0.6")
    loc = f"{BASE_URL}{route}" if route != "/" else f"{BASE_URL}/"
    lines.append(f"  <url><loc>{loc}</loc><lastmod>{TODAY}</lastmod><priority>{priority}</priority></url>")

lines.append("</urlset>")

# dist/public ve client/public'e yaz
dist_path = os.path.join(os.path.dirname(__file__), "..", "dist", "public", "sitemap.xml")
client_path = os.path.join(os.path.dirname(__file__), "..", "client", "public", "sitemap.xml")

for path in [dist_path, client_path]:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")

count = len(ROUTES) - len(NOINDEX)
print(f"✅ Sitemap güncellendi: {count} URL — {TODAY}")

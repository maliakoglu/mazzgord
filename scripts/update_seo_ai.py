#!/usr/bin/env python3
"""
update_seo_ai.py
mazzgord.com için SEO + AI görünürlük güncellemesi
"""

import os
import re
import json

BASE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
PUBLIC_DIR = os.path.join(BASE_DIR, "public")
CLIENT_DIR = os.path.join(BASE_DIR, "client")

ROBOTS_TXT = """User-agent: *
Allow: /
Disallow: /admin
Disallow: /odeme

# AI Botlari
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: YandexBot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

Sitemap: https://mazzgord.com/sitemap.xml
"""

LLMS_TXT = """# Mazzgord Ceviri Hizmetleri

> Mazzgord, Denizli merkezli profesyonel ceviri ve tercume hizmetleri sunan bir ceviri burosudur. Turkce ve Ingilizce dil ciftinde yeminli tercume, teknik ceviri, akademik ceviri ve vize cevirisi hizmetleri vermektedir.

## Hizmetler

- [Yeminli Tercume](https://mazzgord.com/yeminli-tercume): Resmi belgeler icin yeminli tercuman onayli Turkce-Ingilizce ceviri hizmeti.
- [Teknik Ceviri](https://mazzgord.com/teknik-ceviri): Muhendislik, yazilim ve otomotiv sektorlerinde Turkce-Ingilizce teknik ceviri.
- [Akademik Ceviri](https://mazzgord.com/akademik-ceviri): Tez, makale, bildiri ve arastirma raporu cevirisi (Turkce-Ingilizce).
- [Vize Cevirisi](https://mazzgord.com/vize-ceviri): Schengen, Ingiltere, ABD, Kanada vize basvurulari icin belge cevirisi.
- [Ingilizce-Turkce Ceviri](https://mazzgord.com/ingilizce-turkce-ceviri): Ingilizce-Turkce dil ciftinde profesyonel ceviri ve tercume.

## Blog

- [Blog Ana Sayfa](https://mazzgord.com/blog): Ceviri sektoru hakkinda guncel makaleler ve uzman rehberler.
- [Yeminli Tercume Blog](https://mazzgord.com/blog/yeminli-tercume): Yeminli tercume sureci ve bilinmesi gerekenler.
- [Vize Ceviri Blog](https://mazzgord.com/blog/vize-ceviri): Vize basvurulari icin belge cevirisi rehberi.
- [Teknik Ceviri Blog](https://mazzgord.com/blog/teknik-ceviri): Teknik ceviri sureci ve kalite standartlari.
- [Akademik Ceviri Blog](https://mazzgord.com/blog/akademik-ceviri): Akademik ceviri ipuclari ve rehberler.
- [Ingilizce-Turkce Deyim Cevirisi](https://mazzgord.com/blog/ingilizce-turkce-deyim-cevirisi): Deyim cevirisinde dikkat edilmesi gerekenler.
- [Google Translate vs Profesyonel Ceviri](https://mazzgord.com/blog/google-translate-vs-profesyonel-ceviri): Makine cevirisi ile profesyonel ceviri karsilastirmasi.
- [Ingilizce Sozlesme Cevirisi](https://mazzgord.com/blog/ingilizce-sozlesme-cevirisi): Sozlesme cevirisinde dikkat edilmesi gerekenler.
- [Ingilizce Mektup/Email Cevirisi](https://mazzgord.com/blog/ingilizce-mektup-email-cevirisi): Resmi ve is mektup cevirisi.
- [Ingilizce Edebi Metin Cevirisi](https://mazzgord.com/blog/ingilizce-edebi-metin-cevirisi): Edebi metin cevirisinde sanat ve teknik.

## Kurumsal

- [Hakkimizda](https://mazzgord.com/hakkimizda): Mazzgord ceviri burosu hakkinda bilgi.
- [Fiyatlar](https://mazzgord.com/fiyatlar): Ceviri hizmetleri fiyat listesi.
- [Teklif Al](https://mazzgord.com/teklif): Online ceviri teklifi alin.
- [Sikca Sorulan Sorular](https://mazzgord.com/sss): Ceviri hizmetleri hakkinda SSS.
- [Gizlilik Politikasi](https://mazzgord.com/gizlilik): Gizlilik politikasi.
- [Kullanim Kosullari](https://mazzgord.com/kullanim-kosullari): Kullanim kosullari.
- [Cerez Politikasi](https://mazzgord.com/cerez-politikasi): Cerez politikasi.

## Iletisim

- WhatsApp: +90 538 629 5040
- E-posta: info@mazzgord.com
- Konum: Denizli, Turkiye

## Tarama Izni

Bu web sitesinin icerigi, buyuk dil modelleri (LLM'ler) tarafindan egitim ve bilgi amaclli kullanilabilir. Blog makaleleri ve hizmet sayfalari kamuya aciktir.
"""

HEADERS_TXT = """/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=3600

/robots.txt
  Cache-Control: public, max-age=86400

/sitemap.xml
  Cache-Control: public, max-age=3600
  Content-Type: application/xml

/llms.txt
  Cache-Control: public, max-age=86400
  Content-Type: text/plain
"""

FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Ceviri hizmetleri ne kadar surer?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sure metin uzunluguna ve hizmet turune baglidir. Kisa metinler genelde 24 saat icinde teslim edilir."
            }
        },
        {
            "@type": "Question",
            "name": "Hangi dillerde ceviri yapiyorsunuz?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Turkce ve Ingilizce dil ciftinde yeminli tercume, teknik ceviri, akademik ceviri ve vize cevirisi hizmetleri sunuyoruz."
            }
        },
        {
            "@type": "Question",
            "name": "Yeminli tercume yapiyor musunuz?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Evet, yeminli tercume hizmeti veriyoruz. Noter onayli ceviriler icin teklif sayfamizdan basvurabilirsiniz."
            }
        },
        {
            "@type": "Question",
            "name": "Ceviri fiyatlari nasil belirlenir?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Fiyatlar kelime sayisina ve hizmet turune (yeminli, teknik, akademik, vize) gore belirlenir. Fiyatlar sayfamizdan detayli bilgi alabilirsiniz."
            }
        },
        {
            "@type": "Question",
            "name": "Online ceviri nasil calisir?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Belgelerinizi teklif sayfamiz uzerinden yukleyebilir, teklifinizi alabilir ve odemenizi yaparak cevirinizi dijital olarak teslim alabilirsiniz."
            }
        }
    ]
}

WEBSITE_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Mazzgord",
    "url": "https://mazzgord.com",
    "description": "Turkce ve Ingilizce profesyonel ceviri ve tercume hizmetleri.",
    "inLanguage": "tr"
}


def update_robots():
    path = os.path.join(PUBLIC_DIR, "robots.txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write(ROBOTS_TXT)
    print("robots.txt güncellendi: " + path)


def update_llms():
    path = os.path.join(PUBLIC_DIR, "llms.txt")
    with open(path, "w", encoding="utf-8") as f:
        f.write(LLMS_TXT)
    print("llms.txt güncellendi: " + path)


def update_headers():
    path = os.path.join(PUBLIC_DIR, "_headers")
    with open(path, "w", encoding="utf-8") as f:
        f.write(HEADERS_TXT)
    print("_headers olusturuldu: " + path)


def update_index_html():
    path = os.path.join(CLIENT_DIR, "index.html")
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    existing_count = html.count("application/ld+json")
    print("index.html mevcut schema sayisi: " + str(existing_count))

    faq_json = json.dumps(FAQ_SCHEMA, ensure_ascii=False, indent=4)
    website_json = json.dumps(WEBSITE_SCHEMA, ensure_ascii=False, indent=4)

    faq_script = '    <script type="application/ld+json">\n    ' + faq_json + '\n    </script>\n'
    website_script = '    <script type="application/ld+json">\n    ' + website_json + '\n    </script>\n'

    if "FAQPage" not in html:
        html = html.replace("</head>", faq_script + "  </head>")
        print("FAQPage schema eklendi")
    else:
        print("FAQPage schema zaten var, atlandi")

    if '"@type": "WebSite"' not in html and '"@type":"WebSite"' not in html:
        html = html.replace("</head>", website_script + "  </head>")
        print("WebSite schema eklendi")
    else:
        print("WebSite schema zaten var, atlandi")

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("index.html güncellendi: " + path)


def main():
    print("=" * 50)
    print("  MAZZGORD SEO + AI GORUNURLUK GUNCELLEMESI")
    print("=" * 50)
    print()
    update_robots()
    update_llms()
    update_headers()
    update_index_html()
    print()
    print("=" * 50)
    print("  TUM GUNCELLEMELER TAMAMLANDI")
    print("=" * 50)
    print()
    print("Siradaki adimlar:")
    print("  1. npm run build")
    print("  2. npx wrangler deploy")


if __name__ == "__main__":
    main()

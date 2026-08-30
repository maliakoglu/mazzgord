#!/usr/bin/env python3
import os, re

PAGES_DIR = os.path.join(os.getcwd(), "client", "src", "pages")

EXISTING_SLUGS = {
    "yeminli-tercume", "teknik-ceviri", "akademik-ceviri",
    "cevirmenlik-kariyer-rehberi", "teknik-hukuk-vize-ceviri-rehberi",
    "hukuki-ceviri", "teknik-ceviri-nedir", "ceviri-hatalari",
    "ceviri-teknolojileri", "yerellestirme-hizmetleri", "tibbi-ceviri",
    "ingilizce-turkce-deyim-cevirisi", "google-translate-vs-profesyonel-ceviri",
    "ingilizce-sozlesme-cevirisi", "ingilizce-mektup-email-cevirisi",
    "ingilizce-edebi-metin-cevirisi", "vize-ceviri", "ceviri-ipuclari",
    "ceviri-sektoru"
}

MISSING_BLOGS = [
    ("BlogAracRuhsatiCevirisi.tsx", "arac-ruhsati-cevirisi"),
    ("BlogDogalgazFaturasiCevirisi.tsx", "dogalgaz-faturasi-cevirisi"),
    ("BlogIngiltereVizeCeviri.tsx", "ingiltere-vize-cevirisi-gercek-vaka"),
    ("BlogNoterOnayliCeviri.tsx", "noter-onayli-ceviri"),
    ("BlogPasaportTercumesi.tsx", "pasaport-tercumesi-nasil-yapilir"),
    ("BlogVizeFormatlari.tsx", "vize-formatlari"),
    ("BlogYeminliTercumeFiyatlari2026.tsx", "yeminli-tercume-fiyatlari-2026"),
    ("BlogUcDunyaCeviri.tsx", "uc-dunya-ceviri"),
]

def extract_prop(content, prop_name):
    pattern = rf'{prop_name}="([^"]*)"'
    match = re.search(pattern, content)
    if match:
        return match.group(1)
    pattern = rf'{prop_name}=`([^`]*)`'
    match = re.search(pattern, content)
    if match:
        return match.group(1)
    return ""

def extract_canonical(content):
    match = re.search(r'canonical="https://mazzgord\.com/blog/([^"]*)"', content)
    if match:
        return match.group(1)
    return None

def jsx_to_markdown(jsx_content):
    text = jsx_content
    text = re.sub(r'\{/\*.*?\*/\}', '', text)
    text = re.sub(r'<h2[^>]*>(.*?)</h2>', lambda m: "\n## " + re.sub(r'<[^>]+>', '', m.group(1)).strip() + "\n", text, flags=re.DOTALL)
    text = re.sub(r'<h3[^>]*>(.*?)</h3>', lambda m: "\n### " + re.sub(r'<[^>]+>', '', m.group(1)).strip() + "\n", text, flags=re.DOTALL)
    text = re.sub(r'<h4[^>]*>(.*?)</h4>', lambda m: "\n#### " + re.sub(r'<[^>]+>', '', m.group(1)).strip() + "\n", text, flags=re.DOTALL)
    text = re.sub(r'<strong[^>]*>(.*?)</strong>', r'**\1**', text, flags=re.DOTALL)
    text = re.sub(r'<em[^>]*>(.*?)</em>', r'*\1*', text, flags=re.DOTALL)
    text = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', r'[\2](\1)', text, flags=re.DOTALL)
    text = re.sub(r'<ul[^>]*>', '\n', text)
    text = re.sub(r'</ul>', '\n', text)
    text = re.sub(r'<ol[^>]*>', '\n', text)
    text = re.sub(r'</ol>', '\n', text)
    def li_replace(match):
        inner = re.sub(r'<[^>]+>', '', match.group(1)).strip()
        return "- " + inner + "\n"
    text = re.sub(r'<li[^>]*>(.*?)</li>', li_replace, text, flags=re.DOTALL)
    text = re.sub(r'<p[^>]*>', '\n', text)
    text = re.sub(r'</p>', '\n', text)
    text = re.sub(r'<br\s*/?>', '\n', text)
    text = re.sub(r'<blockquote[^>]*>(.*?)</blockquote>', lambda m: '\n> ' + re.sub(r'<[^>]+>', '', m.group(1)).strip() + '\n', text, flags=re.DOTALL)
    text = re.sub(r'<table[^>]*>', '\n', text)
    text = re.sub(r'</table>', '\n', text)
    text = re.sub(r'<thead[^>]*>.*?</thead>', '', text, flags=re.DOTALL)
    text = re.sub(r'<tbody[^>]*>', '', text)
    text = re.sub(r'</tbody>', '', text)
    text = re.sub(r'<tr[^>]*>', '\n| ', text)
    text = re.sub(r'</tr>', ' |', text)
    text = re.sub(r'<th[^>]*>(.*?)</th>', r'\1 | ', text, flags=re.DOTALL)
    text = re.sub(r'<td[^>]*>(.*?)</td>', r'\1 | ', text, flags=re.DOTALL)
    text = re.sub(r'<div[^>]*>', '\n', text)
    text = re.sub(r'</div>', '\n', text)
    text = re.sub(r'<span[^>]*>', '', text)
    text = re.sub(r'</span>', '', text)
    text = re.sub(r'<section[^>]*>', '\n', text)
    text = re.sub(r'</section>', '\n', text)
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'\{[^}]*\}', '', text)
    text = re.sub(r'\n{3,}', '\n\n', text)
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    return '\n\n'.join(lines)

def esc(s):
    return s.replace("'", "''")

def main():
    print("Blog D1 senkronizasyonu basliyor...\n")
    sql_statements = []
    found = 0
    for filename, expected_slug in MISSING_BLOGS:
        file_path = os.path.join(PAGES_DIR, filename)
        if not os.path.exists(file_path):
            print("  Dosya bulunamadi: " + filename)
            continue
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        title = extract_prop(content, "title")
        description = extract_prop(content, "description")
        slug = extract_canonical(content) or expected_slug
        match = re.search(r'<BlogLayout[^>]*>\s*\n(.*?)\s*</BlogLayout>', content, flags=re.DOTALL)
        markdown_content = jsx_to_markdown(match.group(1)) if match else ""
        if slug in EXISTING_SLUGS:
            print("  Zaten D1de var: " + slug)
            continue
        if not title:
            print("  Title bulunamadi: " + filename)
            continue
        if not markdown_content.strip():
            print("  Icerik bos: " + filename)
            continue
        print("  Hazir: " + slug + " (" + str(len(markdown_content)) + " karakter)")
        sql = "INSERT INTO blog_posts (slug, title, description, content, published) VALUES ('" + esc(slug) + "', '" + esc(title) + "', '" + esc(description) + "', '" + esc(markdown_content) + "', 1);"
        sql_statements.append(sql)
        found += 1
    output_file = os.path.join(os.getcwd(), "synceksik_blog.sql")
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n\n'.join(sql_statements))
        f.write('\n')
    print("\n" + str(found) + " blog yazisi SQL'e donusturuldu.")
    print("Dosya: " + output_file)
    print("\nCalistir:")
    print("  npx wrangler d1 execute mazzgord-db --file=synceksik_blog.sql --remote")

if __name__ == "__main__":
    main()

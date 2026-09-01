import os, re, glob

DEFAULT_TITLE = "Mazzgord - Yeminli Tercüme | İngilizce-Türkçe Resmi Belge Çevirisi | Denizli"

# --- Parse seoData.js ---
seo_js_path = os.path.join(os.path.dirname(__file__), "lib", "seoData.js")
with open(seo_js_path, "r", encoding="utf-8") as f:
    seo_content = f.read()

seo_data = {}
pattern = r'"(/[^"]*)":\s*\{\s*"title":\s*"((?:[^"\\]|\\.)*)",\s*"description":\s*"((?:[^"\\]|\\.)*)"'
for match in re.finditer(pattern, seo_content):
    path = match.group(1)
    title = match.group(2)
    description = match.group(3)
    seo_data[path] = {"title": title, "description": description}

print(f"📋 seoData.js'den {len(seo_data)} sayfa meta verisi okundu")

# --- Process HTML files ---
META_TAGS = [
    '<meta name="p:domain_verify" content="e44a8eefa3422ef3b31a986d0a5fc78d"/>',
]

dist_dir = os.path.join(os.path.dirname(__file__), "dist", "public")
html_files = glob.glob(os.path.join(dist_dir, "**", "*.html"), recursive=True)
count = 0
title_fixed = 0
desc_fixed = 0

for html_path in html_files:
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()
    modified = False

    # Determine route from file path
    rel_path = os.path.relpath(html_path, dist_dir)
    if rel_path == "index.html":
        route = "/"
    else:
        route = "/" + rel_path.replace("/index.html", "").replace("\\", "/")
        if route.endswith("/"):
            route = route.rstrip("/")

    # Only fix pages where title is still the default (page didn't set its own)
    title_match = re.search(r'<title>([^<]*)</title>', content)
    if title_match and title_match.group(1) == DEFAULT_TITLE and route in seo_data:
        seo = seo_data[route]

        # Replace title
        content = re.sub(r'<title>[^<]*</title>', f'<title>{seo["title"]}</title>', content)
        modified = True
        title_fixed += 1

        # Replace or add meta description
        desc_pattern = r'<meta\s+name="description"\s+content="[^"]*"\s*/?>'
        new_desc = f'<meta name="description" content="{seo["description"]}"/>'
        if re.search(desc_pattern, content):
            content = re.sub(desc_pattern, new_desc, content)
        else:
            content = re.sub(r'(<title>[^<]*</title>)', r'\1\n    ' + new_desc, content, count=1)
        desc_fixed += 1

        # Replace og:title
        og_title_pattern = r'<meta\s+property="og:title"\s+content="[^"]*"\s*/?>'
        if re.search(og_title_pattern, content):
            content = re.sub(og_title_pattern, f'<meta property="og:title" content="{seo["title"]}"/>', content)

        # Replace og:description
        og_desc_pattern = r'<meta\s+property="og:description"\s+content="[^"]*"\s*/?>'
        if re.search(og_desc_pattern, content):
            content = re.sub(og_desc_pattern, f'<meta property="og:description" content="{seo["description"]}"/>', content)

    # --- p:domain_verify logic (existing) ---
    existing = re.findall(r'<meta\s+name="p:domain_verify"[^>]*/?>', content)
    if len(existing) > 1:
        first = existing[0]
        content = re.sub(r'<meta\s+name="p:domain_verify"[^>]*/?>', '', content)
        content = content.replace(first, '', 1)
        content = re.sub(r"(<head[^>]*>)", r"\1\n    " + first, content, count=1)
        modified = True
    elif len(existing) == 0:
        for tag in META_TAGS:
            if tag not in content:
                content = re.sub(r"(<head[^>]*>)", r"\1\n    " + tag, content, count=1)
                modified = True

    if modified:
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(content)
        count += 1

print(f"✅ {count} HTML dosyası işlendi")
print(f"   📝 {title_fixed} title düzeltildi")
print(f"   📝 {desc_fixed} description düzeltildi")

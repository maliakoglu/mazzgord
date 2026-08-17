import os, re, glob

META_TAGS = [
    '<meta name="p:domain_verify" content="e44a8eefa3422ef3b31a986d0a5fc78d"/>',
]

dist_dir = os.path.join(os.path.dirname(__file__), "dist", "public")
html_files = glob.glob(os.path.join(dist_dir, "**", "*.html"), recursive=True)
count = 0

for html_path in html_files:
    with open(html_path, "r", encoding="utf-8") as f:
        content = f.read()
    modified = False
    
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

print(f"\u2705 {count} HTML dosyas\u0131 i\u015flendi (duplicate temizlendi)")

# 1) prerender.py — /sepet satırını kaldır
with open("prerender.py", "r", encoding="utf-8") as f:
    lines = f.readlines()
new_lines = [l for l in lines if l.strip() != '"/sepet",']
with open("prerender.py", "w", encoding="utf-8") as f:
    f.writelines(new_lines)
print("1 OK - prerender.py")

# 2) scripts/generate_sitemap.py — iki yerden kaldır
with open("scripts/generate_sitemap.py", "r", encoding="utf-8") as f:
    content = f.read()
content = content.replace('    "/sepet",\n', '')
content = content.replace('"/sepet", ', '')
with open("scripts/generate_sitemap.py", "w", encoding="utf-8") as f:
    f.write(content)
print("2 OK - generate_sitemap.py")

# 3) lib/seoData.js — /sepet bloğunu kaldır
with open("lib/seoData.js", "r", encoding="utf-8") as f:
    content = f.read()
# /sepet bloğunu bul ve kaldır (virgülle biten object)
import re
content = re.sub(r'  "/sepet": \{[^}]*\},?\n', '', content)
with open("lib/seoData.js", "w", encoding="utf-8") as f:
    f.write(content)
print("3 OK - seoData.js")

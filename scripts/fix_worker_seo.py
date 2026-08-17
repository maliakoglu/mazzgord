import os

WORKER_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "worker.js")

with open(WORKER_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# 1. robots.txt — AI botlari ekle
old_robots = '"User-agent: *\\nAllow: /\\nDisallow: /admin\\nDisallow: /odeme\\nSitemap: https://mazzgord.com/sitemap.xml"'

new_robots = '"User-agent: *\\nAllow: /\\nDisallow: /admin\\nDisallow: /odeme\\n\\n# AI Botlari\\nUser-agent: GPTBot\\nAllow: /\\n\\nUser-agent: PerplexityBot\\nAllow: /\\n\\nUser-agent: CCBot\\nAllow: /\\n\\nUser-agent: Google-Extended\\nAllow: /\\n\\nUser-agent: anthropic-ai\\nAllow: /\\n\\nUser-agent: YandexBot\\nAllow: /\\n\\nUser-agent: DuckDuckBot\\nAllow: /\\n\\nUser-agent: Bingbot\\nAllow: /\\n\\nUser-agent: Slurp\\nAllow: /\\n\\nSitemap: https://mazzgord.com/sitemap.xml"'

if old_robots in content:
    content = content.replace(old_robots, new_robots)
    print("robots.txt Worker kodu güncellendi")
else:
    print("UYARI: robots.txt eski metin bulunamadi, manuel kontrol gerekir")

# 2. llms.txt — Worker'da handling var mi kontrol et
if "/llms.txt" in content:
    print("llms.txt Worker'da zaten handle ediliyor")
else:
    print("llms.txt Worker'da handle edilmiyor — assets'ten serve ediliyor")

with open(WORKER_PATH, "w", encoding="utf-8") as f:
    f.write(content)

print("worker.js güncellendi")

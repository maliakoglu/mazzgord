with open("lib/seoProcessor.js", "r", encoding="utf-8") as f:
    content = f.read()

# script-src'e https://www.proz.com ekle
content = content.replace(
    "https://static.cloudflareinsights.com; style-src",
    "https://static.cloudflareinsights.com https://www.proz.com; style-src"
)

# frame-src'e https://www.proz.com ekle
content = content.replace(
    "frame-src https://a.impactradius-go.com",
    "frame-src https://www.proz.com https://a.impactradius-go.com"
)

# connect-src'e https://www.proz.com ekle (widget API çağrıları için)
content = content.replace(
    "connect-src 'self' https://a.impactradius-go.com",
    "connect-src 'self' https://www.proz.com https://a.impactradius-go.com"
)

with open("lib/seoProcessor.js", "w", encoding="utf-8") as f:
    f.write(content)

print("OK - CSP'ye proz.com eklendi (script-src, frame-src, connect-src)")

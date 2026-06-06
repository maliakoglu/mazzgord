import re

with open('client/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Eski fragment meta tag'ini kaldır (raporda "deprecated" uyarısı vardı)
old_count = content.count('name="fragment"')
content = re.sub(r'<meta[^>]*name=["\']fragment["\'][^>]*>\s*', '', content)
if old_count > 0:
    print(f'✅ Eski "fragment" meta tag kaldırıldı ({old_count} adet)')

# 2. Eklenecek yeni meta tag'ler
new_tags = '''    <meta property="og:site_name" content="Mazzgord" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="theme-color" content="#0f172a" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Mazzgord" />
    <meta name="application-name" content="Mazzgord" />
    <meta name="msapplication-TileColor" content="#0f172a" />
    <meta name="format-detection" content="telephone=no" />
'''

# 3. Ekle (tekrar etmemek için kontrol)
if 'og:site_name' not in content:
    content = content.replace('</head>', new_tags + '\n</head>')
    print('✅ Yeni meta tag\'ler eklendi: og:site_name, og:image boyutları, theme-color, apple-mobile-web-app')
else:
    print('⚠️ Meta tag\'ler zaten var')

with open('client/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ client/index.html güncellendi.')

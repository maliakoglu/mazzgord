import os
files = ['client/index.html', 'dist/public/index.html']
for f in files:
    if not os.path.exists(f): continue
    with open(f, 'r', encoding='utf-8') as file: content = file.read()
    import re
    # seo-content div'ini ve içindekileri kaldır
    new = re.sub(r'<!-- SEO Static Content -->.*?<div id="seo-content".*?</div>\s*', '', content, flags=re.DOTALL)
    if new != content:
        with open(f, 'w', encoding='utf-8') as file: file.write(new)
        print(f'{f}: SEO bloğu kaldırıldı')
    else:
        print(f'{f}: zaten temiz')

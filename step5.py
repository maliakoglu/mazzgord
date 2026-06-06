import os
link = '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />'
files = ['client/index.html', 'dist/public/index.html']
for f in files:
    if not os.path.exists(f): continue
    with open(f, 'r', encoding='utf-8') as file: content = file.read()
    if 'apple-touch-icon' in content: print(f'{f}: var'); continue
    if '</head>' in content:
        content = content.replace('</head>', link + '\n</head>')
        with open(f, 'w', encoding='utf-8') as file: file.write(content)
        print(f'{f}: eklendi')

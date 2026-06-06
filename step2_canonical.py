with open('client/index.html','r',encoding='utf-8') as f: h=f.read()

canonical = '<link rel="canonical" href="https://mazzgord.com/" />'

if 'rel="canonical"' in h:
    print('⚠️ Canonical zaten var, atlanıyor.')
elif '</head>' in h:
    h = h.replace('</head>', canonical + '\n</head>')
    with open('client/index.html','w',encoding='utf-8') as f: f.write(h)
    print('✅ Canonical URL eklendi.')
else:
    print('❌ Hata: </head> etiketi bulunamadı.')

with open('client/index.html','r',encoding='utf-8') as f: h=f.read()

import re

# seo-content div'ini bul
m = re.search(r'(<div id="seo-content".*?>)(.*?)(</div>\s*</body>)', h, re.DOTALL)
if not m:
    print('❌ seo-content bulunamadı.')
    exit()

prefix, content, suffix = m.group(1), m.group(2), m.group(3)

# Zaten nav varsa tekrar ekleme
if 'İçindekiler' in content:
    print('⚠️ İçindekiler zaten var, atlanıyor.')
    exit()

# h2 ve h3'lere id ekle (eğer yoksa)
content = re.sub(r'<h2>(?!.*id=)', '<h2 id="ceviri-hizmetlerimiz">', content, count=1)
content = re.sub(r'<h3>(?!.*id=)', '<h3 id="yeminli-tercume">', content, count=1)
content = re.sub(r'<h3>(?!.*id=)', '<h3 id="teknik-ceviri">', content, count=1)
content = re.sub(r'<h3>(?!.*id=)', '<h3 id="akademik-ceviri">', content, count=1)
content = re.sub(r'<h2>(?!.*id=)', '<h2 id="neden-mazzgord">', content, count=1)

# İletişim bölümü ekle (en sona)
iletisim = '''
<div id="iletisim" style="background:#e8f4f8;padding:20px;border-radius:8px;margin-top:30px;">
<h2>İletişim ve Teklif Al</h2>
<p>Denizli'de yeminli tercüme, teknik çeviri ve akademik çeviri ihtiyaçlarınız için bize ulaşın. WhatsApp üzerinden hızlı teklif alabilir veya detaylı bilgi için mesaj bırakabilirsiniz.</p>
<p><strong>Mazzgord Profesyonel Çeviri Hizmetleri</strong><br>
Konum: Denizli, Türkiye<br>
Hizmet alanları: <a href="#yeminli-tercume">Yeminli Tercüme</a>, <a href="#teknik-ceviri">Teknik Çeviri</a>, <a href="#akademik-ceviri">Akademik Çeviri</a></p>
<p><a href="/">Ana sayfaya dön</a></p>
</div>
'''

# İçindekiler menüsü (h1'den hemen sonra)
nav = '''
<nav aria-label="İçindekiler" style="background:#f5f5f5;padding:15px 20px;border-radius:8px;margin-bottom:30px;">
<h2 style="margin-top:0;font-size:1.1em;">İçindekiler</h2>
<ul style="margin:0;padding-left:20px;">
<li><a href="#ceviri-hizmetlerimiz">Çeviri Hizmetlerimiz</a>
  <ul><li><a href="#yeminli-tercume">Yeminli Tercüme</a></li>
      <li><a href="#teknik-ceviri">Teknik Çeviri</a></li>
      <li><a href="#akademik-ceviri">Akademik Çeviri</a></li></ul>
</li>
<li><a href="#neden-mazzgord">Neden Mazzgord?</a></li>
<li><a href="#iletisim">İletişim ve Teklif Al</a></li>
</ul>
</nav>
'''

# h1'den sonra nav ekle
content = re.sub(r'(</h1>)', r'\1' + nav, content, count=1)

# Sayfa içi linkler ekle (paragraflara)
content = content.replace(
    'Yeminli Tercüme</h3>',
    'Yeminli Tercüme</h3>'
)
content = content.replace(
    '<p>Noter onaylı yeminli tercüme hizmetlerimizle resmi dokümanlarınızı hukuki geçerliliğe sahip şekilde çeviriyoruz. Pasaport, diploma, evlilik cüzdanı, mahkeme kararları ve daha fazlası için güvenilir çözüm ortağınızız.</p>',
    '<p>Noter onaylı yeminli tercüme hizmetlerimizle resmi dokümanlarınızı hukuki geçerliliğe sahip şekilde çeviriyoruz. Pasaport, diploma, evlilik cüzdanı, mahkeme kararları ve daha fazlası için güvenilir çözüm ortağınızız. <a href="#iletisim">Yeminli tercüme fiyat teklifi almak için iletişime geçin.</a></p>'
)
content = content.replace(
    '<p><strong>Denizli Merkezli:</strong> Yerinde danışmanlık, doküman teslim ve yüz yüze görüşme imkanı.</p>',
    '<p><strong>Denizli Merkezli:</strong> Yerinde danışmanlık, doküman teslim ve yüz yüze görüşme imkanı.</p>\n<p><a href="#iletisim">Hemen ücretsiz fiyat teklifi alın.</a></p>'
)

# İletişim bölümünü en sona ekle (</div> öncesine)
content = content.rstrip() + iletisim

# Birleştir
new_html = h[:m.start()] + prefix + content + suffix + h[m.end():]

with open('client/index.html','w',encoding='utf-8') as f: f.write(new_html)
print('✅ İç link yapısı eklendi.')

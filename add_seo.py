import os

seo = '''<!-- SEO Static Content -->
<div id="seo-content" style="max-width:900px;margin:0 auto;padding:40px 20px;font-family:system-ui,sans-serif;line-height:1.6;color:#333;">
<h1>Denizli Yeminli Tercüme ve Profesyonel Çeviri Hizmetleri</h1>
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
<p>Mazzgord olarak Denizli merkezli profesyonel çeviri hizmetleri sunuyoruz. Yeminli tercüme, teknik çeviri, akademik çeviri ve noter onaylı çeviri alanlarında uzman kadromuzla hizmetinizdeyiz. İngilizce-Türkçe ve Türkçe-İngilizce çeviri işlemlerinizde hızlı teslimat, rekabetçi fiyatlar ve yüksek kalite garantisi veriyoruz.</p>
<p>Denizli'nin önde gelen çeviri bürolarından biri olarak, vize başvuruları, akademik makaleler, teknik kılavuzlar, sözleşmeler ve ticari dokümanlar için güvenilir çeviri çözümleri üretiyoruz. Her proje, alanında uzman tercümanlarımız tarafından titizlikle incelenir ve kalite kontrol süreçlerinden geçirilir.</p>
<h2 id="ceviri-hizmetlerimiz">Çeviri Hizmetlerimiz</h2>
<p>Mazzgord çeviri bürosu olarak geniş yelpazede profesyonel çeviri hizmetleri sunmaktayız. Her bir çeviri kategorisi, alanında uzmanlaşmış tercümanlarımız tarafından yürütülür.</p>
<h3 id="yeminli-tercume">Yeminli Tercüme</h3>
<p>Noter onaylı yeminli tercüme hizmetlerimizle resmi dokümanlarınızı hukuki geçerliliğe sahip şekilde çeviriyoruz. Pasaport, diploma, evlilik cüzdanı, mahkeme kararları ve daha fazlası için güvenilir çözüm ortağınızız. <a href="#iletisim">Yeminli tercüme fiyat teklifi almak için iletişime geçin.</a></p>
<h3 id="teknik-ceviri">Teknik Çeviri</h3>
<p>Mühendislik, tıp, IT ve endüstri alanlarında teknik terminoloji bilgisi gerektiren dokümanlarınız için uzman teknik çeviri hizmeti sunuyoruz. Kullanım kılavuzları, ürün spesifikasyonları ve teknik raporlarınızı hedef dile kusursuz şekilde aktarıyoruz.</p>
<h3 id="akademik-ceviri">Akademik Çeviri</h3>
<p>Tez, makale, araştırma raporları ve akademik yayınlarınız için alanında uzman akademik çevirmenlerimizle destek veriyoruz. Akademik terminolojiye hakim kadromuzla bildiri ve yayınlarınızı uluslararası standartlara uygun şekilde çeviriyoruz.</p>
<h2 id="neden-mazzgord">Neden Mazzgord?</h2>
<p>Denizli'de çeviri hizmeti arayanlar için Mazzgord'u tercih etmeniz için birçok neden var:</p>
<p><strong>Hızlı Teslimat:</strong> Acil çeviri ihtiyaçlarınız için aynı gün ve 24 saat teslimat seçenekleri sunuyoruz.</p>
<p><strong>Gizlilik Garantisi:</strong> Tüm dokümanlarınız en yüksek gizlilik standartlarında korunur ve imha edilir.</p>
<p><strong>Uygun Fiyat:</strong> Kaliteden ödün vermeden rekabetçi fiyat politikası ile profesyonel hizmet.</p>
<p><strong>Denizli Merkezli:</strong> Yerinde danışmanlık, doküman teslim ve yüz yüze görüşme imkanı.</p>
<p><a href="#iletisim">Hemen ücretsiz fiyat teklifi alın.</a></p>
<div id="iletisim" style="background:#e8f4f8;padding:20px;border-radius:8px;margin-top:30px;">
<h2>İletişim ve Teklif Al</h2>
<p>Denizli'de yeminli tercüme, teknik çeviri ve akademik çeviri ihtiyaçlarınız için bize ulaşın. WhatsApp üzerinden hızlı teklif alabilir veya detaylı bilgi için mesaj bırakabilirsiniz.</p>
<p><strong>Mazzgord Profesyonel Çeviri Hizmetleri</strong><br>Konum: Denizli, Türkiye<br>Hizmet alanları: <a href="#yeminli-tercume">Yeminli Tercüme</a>, <a href="#teknik-ceviri">Teknik Çeviri</a>, <a href="#akademik-ceviri">Akademik Çeviri</a></p>
<p><a href="/">Ana sayfaya dön</a></p>
</div>
</div>'''

files = ['client/index.html', 'dist/public/index.html']
for filepath in files:
    if not os.path.exists(filepath):
        print(f'{filepath}: dosya yok, atlanıyor')
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'seo-content' in content:
        print(f'{filepath}: zaten var')
        continue
    if '</body>' not in content:
        print(f'{filepath}: </body> bulunamadı')
        continue
    content = content.replace('</body>', seo + '\n</body>')
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{filepath}: eklendi')

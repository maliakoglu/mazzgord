with open('public/index.html','r',encoding='utf-8') as f: h=f.read()

seo='''<!-- SEO Static Content -->
<div id="seo-content" style="max-width:900px;margin:0 auto;padding:40px 20px;font-family:system-ui,sans-serif;line-height:1.6;color:#333;">
<h1>Denizli Yeminli Tercüme ve Profesyonel Çeviri Hizmetleri</h1>
<p>Mazzgord olarak Denizli merkezli profesyonel çeviri hizmetleri sunuyoruz. Yeminli tercüme, teknik çeviri, akademik çeviri ve noter onaylı çeviri alanlarında uzman kadromuzla hizmetinizdeyiz. İngilizce-Türkçe ve Türkçe-İngilizce çeviri işlemlerinizde hızlı teslimat, rekabetçi fiyatlar ve yüksek kalite garantisi veriyoruz.</p>
<p>Denizli'nin önde gelen çeviri bürolarından biri olarak, vize başvuruları, akademik makaleler, teknik kılavuzlar, sözleşmeler ve ticari dokümanlar için güvenilir çeviri çözümleri üretiyoruz. Her proje, alanında uzman tercümanlarımız tarafından titizlikle incelenir ve kalite kontrol süreçlerinden geçirilir.</p>
<h2>Çeviri Hizmetlerimiz</h2>
<h3>Yeminli Tercüme</h3>
<p>Noter onaylı yeminli tercüme hizmetlerimizle resmi dokümanlarınızı hukuki geçerliliğe sahip şekilde çeviriyoruz. Pasaport, diploma, evlilik cüzdanı, mahkeme kararları ve daha fazlası için güvenilir çözüm ortağınızız.</p>
<h3>Teknik Çeviri</h3>
<p>Mühendislik, tıp, IT ve endüstri alanlarında teknik terminoloji bilgisi gerektiren dokümanlarınız için uzman teknik çeviri hizmeti sunuyoruz. Kullanım kılavuzları, ürün spesifikasyonları ve teknik raporlarınızı hedef dile kusursuz şekilde aktarıyoruz.</p>
<h3>Akademik Çeviri</h3>
<p>Tez, makale, araştırma raporları ve akademik yayınlarınız için alanında uzman akademik çevirmenlerimizle destek veriyoruz. Akademik terminolojiye hakim kadromuzla bildiri ve yayınlarınızı uluslararası standartlara uygun şekilde çeviriyoruz.</p>
<h2>Neden Mazzgord?</h2>
<p><strong>Hızlı Teslimat:</strong> Acil çeviri ihtiyaçlarınız için aynı gün ve 24 saat teslimat seçenekleri sunuyoruz.</p>
<p><strong>Gizlilik Garantisi:</strong> Tüm dokümanlarınız en yüksek gizlilik standartlarında korunur ve imha edilir.</p>
<p><strong>Uygun Fiyat:</strong> Kaliteden ödün vermeden rekabetçi fiyat politikası ile profesyonel hizmet.</p>
<p><strong>Denizli Merkezli:</strong> Yerinde danışmanlık, doküman teslim ve yüz yüze görüşme imkanı.</p>
</div>'''

if '</body>' in h:
    h=h.replace('</body>',seo+'\n</body>')
    with open('public/index.html','w',encoding='utf-8') as f: f.write(h)
    print('✅ Adım 1 tamamlandı: İçerik ve heading yapısı eklendi.')
else:
    print('❌ Hata: </body> etiketi bulunamadı.')

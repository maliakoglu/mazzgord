import re
import os

# 1. HTML dosyalarından eski SEO bloğunu temizle, screen-reader-only içerik ekle
sr_only_style = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;'
sr_content = f'''<div style="{sr_only_style}">
<h1>Denizli Yeminli Tercüme ve Profesyonel Çeviri Hizmetleri</h1>
<p>Mazzgord olarak Denizli merkezli profesyonel çeviri hizmetleri sunuyoruz. Yeminli tercüme, teknik çeviri, akademik çeviri ve noter onaylı çeviri alanlarında uzman kadromuzla hizmetinizdeyiz.</p>
</div>'''

for filepath in ['client/index.html', 'dist/public/index.html']:
    if not os.path.exists(filepath):
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Eski seo-content bloğunu kaldır
    content = re.sub(r'<!-- SEO Static Content -->.*?<div id="seo-content".*?</div>\s*', '', content, flags=re.DOTALL)
    
    # Eğer sr-only içerik yoksa ekle
    if 'Denizli Yeminli Tercüme' not in content:
        content = content.replace('<body>', f'<body>\n{sr_content}')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'{filepath}: temizlendi ve sr-only içerik eklendi')

# 2. Home.tsx'e footer öncesinde SEO section ekle
home_path = 'client/src/pages/Home.tsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Eğer zaten SEO Content Section varsa tekrar ekleme
if 'SEO Content Section' in content:
    print('Home.tsx: SEO section zaten var')
else:
    seo_section = '''      {/* SEO Content Section */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary">Çeviri Hizmetlerimiz Hakkında</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Yeminli Tercüme Hizmetleri</h3>
              <p className="text-muted-foreground leading-relaxed">
                Denizli'de noter onaylı yeminli tercüme hizmetlerimizle resmi belgelerinizi hukuki geçerliliğe sahip şekilde çeviriyoruz. 
                Pasaport, diploma, evlilik cüzdanı, mahkeme kararları ve daha fazlası için <a href="#services" className="text-primary hover:underline">güvenilir çeviri çözümleri</a> sunuyoruz.
                Yeminli tercüme işlemlerinizde noter onayı ve apostil hizmetleri de sunuyoruz.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Teknik Çeviri Çözümleri</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mühendislik, tıp, IT ve endüstri alanlarında teknik terminoloji bilgisi gerektiren dokümanlarınız için uzman teknik çeviri hizmeti sunuyoruz. 
                Kullanım kılavuzları, ürün spesifikasyonları ve teknik raporlarınızı hedef dile kusursuz şekilde aktarıyoruz.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Akademik Çeviri Desteği</h3>
              <p className="text-muted-foreground leading-relaxed">
                Tez, makale, araştırma raporları ve akademik yayınlarınız için alanında uzman akademik çevirmenlerimizle destek veriyoruz. 
                Akademik terminolojiye hakim kadromuzla bildiri ve yayınlarınızı uluslararası standartlara uygun şekilde çeviriyoruz.
              </p>
            </div>
            <div className="text-center pt-4">
              <a href="#contact" className="inline-flex items-center text-primary hover:underline font-medium">
                Ücretsiz fiyat teklifi alın <ArrowRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

'''
    # Footer yorumundan hemen önce ekle
    content = content.replace('{/* Footer */}', seo_section + '{/* Footer */}')
    
    with open(home_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print('Home.tsx: SEO section eklendi (footer öncesi)')


const puppeteer = require('puppeteer');
const { createServer } = require('http');
const express = require('express');
const path = require('path');
const fs = require('fs');

const ROUTES = [
  '/',
  '/hakkimizda',
  '/yeminli-tercume',
  '/teknik-ceviri',
  '/akademik-ceviri',
  '/vize-ceviri',
  '/ingilizce-turkce-ceviri',
  '/pasaport-ceviri',
  '/diploma-ceviri',
  '/blog',
  '/fiyatlar',
  '/hizmetler',
  '/sepet',
  '/sss',
  '/admin',
  '/teklif',
  '/odeme',
  '/gizlilik',
  '/kullanim-kosullari',
  '/cerez-politikasi',
  '/blog/yeminli-tercume',
  '/blog/teknik-ceviri',
  '/blog/akademik-ceviri',
  '/blog/cevirmenlik-kariyer-rehberi',
  '/blog/teknik-hukuk-vize-ceviri-rehberi',
  '/blog/hukuki-ceviri',
  '/blog/teknik-ceviri-nedir',
  '/blog/ceviri-hatalari',
  '/blog/ceviri-teknolojileri',
  '/blog/yerellestirme-hizmetleri',
  '/blog/tibbi-ceviri',
  '/blog/ingilizce-turkce-deyim-cevirisi',
  '/blog/google-translate-vs-profesyonel-ceviri',
  '/blog/ingilizce-sozlesme-cevirisi',
  '/blog/ingilizce-mektup-email-cevirisi',
  '/blog/ingilizce-edebi-metin-cevirisi',
  '/blog/vize-ceviri',
  '/blog/ceviri-ipuclari',
  '/blog/ceviri-sektoru',
  '/blog/noter-onayli-ceviri',
  '/blog/pasaport-tercumesi-nasil-yapilir',
  '/blog/yeminli-tercume-fiyatlari-2026',
];

const DIST_DIR = path.resolve(__dirname, 'dist/public');

async function main() {
  console.log('🚀 Prerender başlıyor...');

  // Express server başlat
  const app = express();
  app.use(express.static(DIST_DIR, { index: 'index.html' }));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });

  const server = createServer(app);
  await new Promise((resolve) => server.listen(3001, resolve));
  console.log('✅ Server başlatıldı: http://localhost:3001');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const route of ROUTES) {
    const page = await browser.newPage();
    try {
      console.log(`📄 Render: ${route}`);
      await page.goto(`http://localhost:3001${route}`, {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });

      // React'in render etmesi için bekle
      await page.waitForSelector('#root > *', { timeout: 10000 }).catch(() => {});
      await new Promise((r) => setTimeout(r, 500));

      let html = await page.content();
      // iyzico widget'i prerender'da donmus halde kaydetme, tarayicida fresh calissin
      html = html.replace(/<div id="iyzi-root">[\s\S]*?<\/div><!-- \/iyzi-root -->/g, '');
      html = html.replace(/<div id="iyzi-root">[\s\S]*?<\/div>/g, '');

      // Dosya yolunu belirle
      let filePath;
      if (route === '/') {
        filePath = path.join(DIST_DIR, 'index.html');
      } else {
        const dir = path.join(DIST_DIR, route);
        fs.mkdirSync(dir, { recursive: true });
        filePath = path.join(dir, 'index.html');
      }

      fs.writeFileSync(filePath, html, 'utf-8');
      console.log(`✅ Kaydedildi: ${filePath}`);
    } catch (err) {
      console.error(`❌ Hata (${route}): ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  console.log('🎉 Prerender tamamlandı!');
}

main().catch((err) => {
  console.error('Fatal hata:', err);
  process.exit(1);
});

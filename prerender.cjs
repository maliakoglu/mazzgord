const puppeteer = require('puppeteer');
const http = require('http');
const path = require('path');
const fs = require('fs');

const ROUTES = [
  "/",
  "/hakkimizda",
  "/yeminli-tercume",
  "/ingilizce-turkce-ceviri",
  "/teknik-ceviri",
  "/akademik-ceviri",
  "/vize-ceviri",
  "/pasaport-ceviri",
  "/diploma-ceviri",
  "/transkript-ceviri",
  "/adli-sicil-cevirisi",
  "/nufus-kayit-ornegi-cevirisi",
  "/acil-tercume",
  "/denizli-yeminli-tercume",
  "/denizli-noter-onayli-tercume",
  "/denizli-pasaport-tercumesi",
  "/denizli-diploma-tercumesi",
  "/denizli-vize-tercumesi",
  "/denizli-apostil-tercume",
  "/noter-onayli-tercume",
  "/apostil-tercume",
  "/fiyatlar",
  "/teklif",
  "/sss",
  "/iletisim",
  "/gizlilik",
  "/kullanim-kosullari",
  "/cerez-politikasi",
  "/giris",
  "/hesabim",
  "/odeme",
  "/odeme/sonuc",
  "/blog",
  "/blog/yeminli-tercume",
  "/blog/vize-ceviri",
  "/blog/teknik-ceviri",
  "/blog/akademik-ceviri",
  "/blog/ceviri-ipuclari",
  "/blog/ceviri-sektoru",
  "/blog/tibbi-ceviri",
  "/blog/yerellestirme-hizmetleri",
  "/blog/ceviri-teknolojileri",
  "/blog/ceviri-hatalari",
  "/blog/teknik-ceviri-nedir",
  "/blog/hukuki-ceviri",
  "/blog/uc-dunya-ceviri",
  "/blog/cevirmenlik-kariyer-rehberi",
  "/blog/ingilizce-turkce-deyim-cevirisi",
  "/blog/google-translate-vs-profesyonel-ceviri",
  "/blog/ingilizce-sozlesme-cevirisi",
  "/blog/ingilizce-mektup-email-cevirisi",
  "/blog/ingilizce-edebi-metin-cevirisi",
  "/blog/noter-onayli-ceviri",
  "/blog/pasaport-tercumesi-nasil-yapilir",
  "/blog/yeminli-tercume-fiyatlari-2026",
  "/blog/vize-formatlari",
  "/blog/arac-ruhsati-cevirisi",
  "/blog/ingiltere-vize-cevirisi-gercek-vaka",
  "/blog/dogalgaz-faturasi-cevirisi",
  "/blog/apostil-vs-noter-onayli-ceviri",
  "/blog/vize-basvurusu-hangi-belgeler",
];

const DIST_DIR = path.resolve(__dirname, 'dist/public');

async function main() {
  console.log('🚀 Prerender başlıyor...');

  // Node.js http server (express gerekmez)
  const MIME = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff':'font/woff','.woff2':'font/woff2','.ttf':'font/ttf','.txt':'text/plain','.xml':'application/xml','.ico':'image/x-icon'};

  const server = http.createServer((req, res) => {
    let urlPath = req.url.split('?')[0];
    let filePath = path.join(DIST_DIR, urlPath);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.join(DIST_DIR, 'index.html');
    }
    const ext = path.extname(filePath);
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(500); res.end('Error'); return; }
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      res.end(data);
    });
  });

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
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // React'in render etmesi için bekle
      await page.waitForSelector('h1', { timeout: 15000 }).catch(() => {});
      await new Promise((r) => setTimeout(r, 2000));

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
  server.close();
  console.log('🎉 Prerender tamamlandı!');
}

main().catch((err) => {
  console.error('Fatal hata:', err);
  process.exit(1);
});

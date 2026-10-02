const fs = require("fs");

// 1. fonts.css lazy-load -> normal stylesheet
let html = fs.readFileSync("client/index.html", "utf8");
html = html.replace(
  '<link rel="stylesheet" href="/fonts/fonts.css" media="print" onload="this.media=\'all\'">',
  '<link rel="stylesheet" href="/fonts/fonts.css">'
);
// 2. Libre Baskerville preload geri ekle
if (!html.includes("LibreBaskerville-700.ttf")) {
  html = html.replace(
    '<link rel="preload" href="/fonts/Inter-400-latin.woff2" as="font" type="font/woff2" crossorigin />',
    '<link rel="preload" href="/fonts/LibreBaskerville-700.ttf" as="font" type="font/ttf" crossorigin />\n    <link rel="preload" href="/fonts/Inter-400-latin.woff2" as="font" type="font/woff2" crossorigin />'
  );
}
fs.writeFileSync("client/index.html", html);
console.log("fonts.css + preload geri alindi");

// 3. Hero mask tamamen kaldır
let hero = fs.readFileSync("client/src/components/home/Hero.tsx", "utf8");
hero = hero.replace(
  /<div style=\{\{ position: "absolute", inset: "0 0 0 42%", pointerEvents: "none", maskImage: "linear-gradient\(to right, transparent 0%, black 38%, black 100%\)", WebkitMaskImage: "linear-gradient\(to right, transparent 0%, black 38%, black 100%\)" \}\}><img src="\/images\/hero-document-translation.webp" alt="" aria-hidden="true" fetchpriority="high" decoding="async" width="2176" height="1632" style=\{\{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 \}\} \/><\/div>/,
  '<img src="/images/hero-document-translation.webp" alt="" aria-hidden="true" fetchpriority="high" decoding="async" width="2176" height="1632" style={{ position: "absolute", inset: "0 0 0 42%", width: "58%", height: "100%", objectFit: "cover", opacity: 0.18, pointerEvents: "none" }} />'
);
fs.writeFileSync("client/src/components/home/Hero.tsx", hero);
console.log("Hero mask kaldirildi");

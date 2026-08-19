// SEO HTML processing — extracted from worker.js
import { seoData } from "./seoData.js";

const CSP = "default-src 'self'; script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://cdn.jsdelivr.net https://static.iyzipay.com https://www.clarity.ms https://scripts.clarity.ms https://c.clarity.ms https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://api.web3forms.com https://api.iyzipay.com https://api.iyzipay.com https://pagead2.googlesyndication.com https://ep1.adtrafficquality.google https://www.google-analytics.com https://*.clarity.ms https://www.googletagmanager.com; frame-src https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://api.iyzipay.com https://api.iyzipay.com https://*.iyzico.com https://*.iyzipay.com https://www.google.com https://maps.google.com; object-src 'none'; base-uri 'self'";
const CSP_FRAME_ANCESTORS = CSP + "; frame-ancestors 'none'";

const blogDates = {
  "/blog/yeminli-tercume": "2026-01-15",
  "/blog/teknik-ceviri": "2026-01-22",
  "/blog/akademik-ceviri": "2026-01-30",
  "/blog/cevirmenlik-kariyer-rehberi": "2026-02-07",
  "/blog/teknik-hukuk-vize-ceviri-rehberi": "2026-02-14",
  "/blog/hukuki-ceviri": "2026-02-21",
  "/blog/teknik-ceviri-nedir": "2026-02-28",
  "/blog/ceviri-hatalari": "2026-03-07",
  "/blog/ceviri-teknolojileri": "2026-03-14",
  "/blog/yerellestirme-hizmetleri": "2026-03-21",
  "/blog/tibbi-ceviri": "2026-03-28",
  "/blog/ingilizce-turkce-deyim-cevirisi": "2026-04-04",
  "/blog/google-translate-vs-profesyonel-ceviri": "2026-04-11",
  "/blog/noter-onayli-ceviri": "2026-04-18",
  "/blog/ingilizce-sozlesme-cevirisi": "2026-04-25",
  "/blog/ingilizce-mektup-email-cevirisi": "2026-05-02",
  "/blog/ingilizce-edebi-metin-cevirisi": "2026-05-09",
  "/blog/vize-ceviri": "2026-05-16",
  "/blog/pasaport-tercumesi-nasil-yapilir": "2026-05-23",
  "/blog/yeminli-tercume-fiyatlari-2026": "2026-05-30",
  "/blog/ceviri-ipuclari": "2026-06-06",
  "/blog/ceviri-sektoru": "2026-06-13",
};

const blogRelated = {
  "/blog/yeminli-tercume": ["/blog/ceviri-hatalari", "/blog/teknik-ceviri", "/blog/hukuki-ceviri"],
  "/blog/teknik-ceviri": ["/blog/teknik-ceviri-nedir", "/blog/teknik-hukuk-vize-ceviri-rehberi", "/blog/ceviri-teknolojileri"],
  "/blog/teknik-ceviri-nedir": ["/blog/teknik-ceviri", "/blog/tibbi-ceviri", "/blog/ceviri-teknolojileri"],
  "/blog/akademik-ceviri": ["/blog/ceviri-hatalari", "/blog/ceviri-teknolojileri", "/blog/cevirmenlik-kariyer-rehberi"],
  "/blog/hukuki-ceviri": ["/blog/teknik-hukuk-vize-ceviri-rehberi", "/blog/ingilizce-sozlesme-cevirisi", "/blog/yeminli-tercume"],
  "/blog/teknik-hukuk-vize-ceviri-rehberi": ["/blog/hukuki-ceviri", "/blog/teknik-ceviri", "/blog/yeminli-tercume"],
  "/blog/ceviri-hatalari": ["/blog/ceviri-teknolojileri", "/blog/akademik-ceviri", "/blog/cevirmenlik-kariyer-rehberi"],
  "/blog/cevirmenlik-kariyer-rehberi": ["/blog/ceviri-teknolojileri", "/blog/ceviri-hatalari", "/blog/ceviri-sektoru"],
  "/blog/ceviri-teknolojileri": ["/blog/ceviri-hatalari", "/blog/cevirmenlik-kariyer-rehberi", "/blog/ceviri-sektoru"],
  "/blog/tibbi-ceviri": ["/blog/teknik-ceviri-nedir", "/blog/teknik-ceviri", "/blog/ceviri-hatalari"],
  "/blog/yerellestirme-hizmetleri": ["/blog/ceviri-teknolojileri", "/blog/ceviri-sektoru", "/blog/cevirmenlik-kariyer-rehberi"],
  "/blog/ingilizce-sozlesme-cevirisi": ["/blog/hukuki-ceviri", "/blog/teknik-hukuk-vize-ceviri-rehberi", "/blog/ingilizce-edebi-metin-cevirisi"],
  "/blog/ingilizce-edebi-metin-cevirisi": ["/blog/ingilizce-turkce-deyim-cevirisi", "/blog/ingilizce-mektup-email-cevirisi", "/blog/ceviri-hatalari"],
  "/blog/ingilizce-turkce-deyim-cevirisi": ["/blog/ingilizce-edebi-metin-cevirisi", "/blog/ingilizce-mektup-email-cevirisi", "/blog/ceviri-hatalari"],
  "/blog/ingilizce-mektup-email-cevirisi": ["/blog/ingilizce-turkce-deyim-cevirisi", "/blog/ingilizce-edebi-metin-cevirisi", "/blog/ceviri-hatalari"],
  "/blog/noter-onayli-ceviri": ["/blog/yeminli-tercume", "/blog/teknik-hukuk-vize-ceviri-rehberi", "/blog/hukuki-ceviri"],
  "/blog/google-translate-vs-profesyonel-ceviri": ["/blog/ceviri-teknolojileri", "/blog/ceviri-hatalari", "/blog/cevirmenlik-kariyer-rehberi"],
  "/blog/ceviri-ipuclari": ["/blog/ceviri-hatalari", "/blog/ceviri-teknolojileri", "/blog/cevirmenlik-kariyer-rehberi"],
  "/blog/ceviri-sektoru": ["/blog/ceviri-teknolojileri", "/blog/cevirmenlik-kariyer-rehberi", "/blog/yerellestirme-hizmetleri"],
  "/blog/vize-ceviri": ["/blog/teknik-hukuk-vize-ceviri-rehberi", "/blog/yeminli-tercume", "/blog/pasaport-tercumesi-nasil-yapilir"],
  "/blog/pasaport-tercumesi-nasil-yapilir": ["/blog/yeminli-tercume", "/blog/vize-ceviri", "/blog/noter-onayli-ceviri"],
  "/blog/yeminli-tercume-fiyatlari-2026": ["/blog/yeminli-tercume", "/blog/noter-onayli-ceviri", "/blog/pasaport-tercumesi-nasil-yapilir"],
};

const blogTitles = {
  "/blog/yeminli-tercume": "Yeminli Tercüme Sürecinde SSS",
  "/blog/teknik-ceviri": "Teknik Çeviri Rehberi",
  "/blog/teknik-ceviri-nedir": "Teknik Çeviri Nedir?",
  "/blog/akademik-ceviri": "Akademik Çeviri Rehberi",
  "/blog/hukuki-ceviri": "Hukuki Çeviri Rehberi",
  "/blog/teknik-hukuk-vize-ceviri-rehberi": "Teknik, Hukuk ve Vize Çeviri Rehberi",
  "/blog/ceviri-hatalari": "Çeviri Hataları ve Çözümleri",
  "/blog/cevirmenlik-kariyer-rehberi": "Çevirmenlik Kariyer Rehberi",
  "/blog/ceviri-teknolojileri": "Çeviri Teknolojileri",
  "/blog/tibbi-ceviri": "Tıbbi Çeviri",
  "/blog/yerellestirme-hizmetleri": "Yerelleştirme Hizmetleri",
  "/blog/ingilizce-sozlesme-cevirisi": "İngilizce Sözleşme Çevirisi",
  "/blog/ingilizce-edebi-metin-cevirisi": "İngilizce Edebi Metin Çevirisi",
  "/blog/ingilizce-turkce-deyim-cevirisi": "İngilizce-Türkçe Deyim Çevirisi",
  "/blog/ingilizce-mektup-email-cevirisi": "İngilizce Mektup ve E-posta Çevirisi",
  "/blog/noter-onayli-ceviri": "Noter Onaylı Çeviri Rehberi",
  "/blog/google-translate-vs-profesyonel-ceviri": "Google Translate mi, Profesyonel Çeviri mi?",
  "/blog/ceviri-ipuclari": "Profesyonel Çeviri İpuçları",
  "/blog/ceviri-sektoru": "Çeviri Sektörü Trendleri 2026",
};

export async function processResponse(response, path) {
  const contentType = response.headers.get("content-type") || "";

  // Non-HTML responses — security headers only
  if (!contentType.includes("text/html")) {
    let headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("X-Frame-Options", "DENY");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    headers.set("Content-Security-Policy", CSP);
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(self)");
    if (
      contentType.includes("css") ||
      contentType.includes("javascript") ||
      contentType.includes("image/") ||
      contentType.includes("font/")
    ) {
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }

  // HTML responses — full SEO processing
  const noIndexPaths = ["/odeme", "/odeme/sonuc", "/admin", "/cerez-politikasi", "/kullanim-kosullari", "/gizlilik", "/giris", "/hesabim", "/sepet", "/siparis-takip"];
  const noFollowPaths = ["/odeme", "/odeme/sonuc", "/admin", "/giris", "/hesabim", "/siparis-takip"];
  let is404 = false;
  let isNoIndex = false;
  let normalizedPath = path.replace(/\/$/, "") || "/";
  let data = seoData[normalizedPath];
  if (!data && normalizedPath !== "/") {
    data = seoData[normalizedPath + "/"];
  }
  if (!data) {
    if (noIndexPaths.includes(normalizedPath)) {
      isNoIndex = true;
      data = {
        title: "Mazzgord Çeviri Hizmetleri",
        description: "Denizli'de profesyonel çeviri hizmetleri."
      };
    } else {
      data = {
        title: "Sayfa Bulunamadı | Mazzgord Çeviri Hizmetleri",
        description: "Aradığınız sayfa bulunamadı. Mazzgord çeviri hizmetleri ana sayfasına geri dönebilirsiniz."
      };
      is404 = true;
    }
  } else if (noIndexPaths.includes(normalizedPath)) {
    isNoIndex = true;
  }

  let html = await response.text();
  const headInjections = [];
  const baseUrl = "https://mazzgord.com";

  // 1. Organization schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "Mazzgord Çeviri Hizmetleri",
    "url": baseUrl,
    "logo": { "@type": "ImageObject", "url": `${baseUrl}/og-image.png`, "width": 1200, "height": 630 },
    "description": "Profesyonel İngilizce-Türkçe çeviri, yeminli tercüme ve noter tasdikli çeviri hizmetleri.",
    "email": "info@mazzgord.com",
    "telephone": "+905386295040",
    "address": { "@type": "PostalAddress", "addressCountry": "TR", "addressRegion": "Denizli", "addressLocality": "Pamukkale", "streetAddress": "Kınıklı Mah.", "postalCode": "20160" },
    "contactPoint": [{ "@type": "ContactPoint", "contactType": "customer service", "telephone": "+905386295040", "email": "info@mazzgord.com", "availableLanguage": ["tr", "en"] }],
    "sameAs": ["https://www.instagram.com/mazzgord", "https://www.facebook.com/mazzgord", "https://www.linkedin.com/company/mazzgord"]
  };
  headInjections.push(`<script type="application/ld+json">${JSON.stringify(orgSchema)}</script>`);

  // iyzico Buyer Protection — only on /odeme
  if (normalizedPath === "/odeme" || normalizedPath === "/odeme/sonuc" || normalizedPath === "/odeme/") {
    headInjections.push(`<script type="text/javascript">window.iyz = { token: '54ada6dd-eb63-45ee-a1d8-43aa976c4196', position: 'bottomRight', ideaSoft: false, pwi: true};</script>`);
    headInjections.push(`<script type="text/javascript" src="https://static.iyzipay.com/buyer-protection/buyer-protection.js" defer></script>`);
  }

  // 2. WebSite schema
  const websiteSchema = {
    "@context": "https://schema.org", "@type": "WebSite", "@id": `${baseUrl}/#website`, "url": baseUrl,
    "name": "Mazzgord Çeviri Hizmetleri", "description": "Profesyonel İngilizce-Türkçe çeviri ve yeminli tercüme hizmetleri.",
    "inLanguage": "tr-TR", "publisher": { "@id": `${baseUrl}/#organization` }
  };
  headInjections.push(`<script type="application/ld+json">${JSON.stringify(websiteSchema)}</script>`);

  // 3. ProfessionalService — homepage only
  if (normalizedPath === "/") {
    const businessSchema = {
      "@context": "https://schema.org", "@type": "ProfessionalService", "@id": `${baseUrl}/#localbusiness`,
      "name": "Mazzgord Çeviri Hizmetleri", "image": `${baseUrl}/og-image.png`, "url": baseUrl,
      "telephone": "+905386295040", "email": "info@mazzgord.com", "priceRange": "₺₺",
      "address": { "@type": "PostalAddress", "addressCountry": "TR", "addressRegion": "Denizli", "addressLocality": "Pamukkale", "streetAddress": "Kınıklı Mah.", "postalCode": "20160" },
      "openingHoursSpecification": [{ "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "08:00", "closes": "17:00" }],
      "geo": { "@type": "GeoCoordinates", "latitude": 37.9200, "longitude": 29.1200 },
      "areaServed": { "@type": "Country", "name": "Türkiye" }, "serviceType": "Çeviri Hizmetleri",
      "hasOfferCatalog": {
        "@type": "OfferCatalog", "name": "Çeviri Hizmetleri", "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Yeminli Tercüme", "description": "Resmi kurumlarda geçerli yeminli tercüme hizmeti" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Noter Tasdikli Çeviri", "description": "Noter onaylı çeviri hizmeti" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "İngilizce-Türkçe Çeviri", "description": "Profesyonel İngilizce-Türkçe çift yönlü çeviri" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Teknik Çeviri", "description": "Teknik belge ve kılavuz çevirisi" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Akademik Çeviri", "description": "Tez, makale ve akademik yayın çevirisi" }},
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Vize Çevirisi", "description": "Vize başvuruları için belge çevirisi" }}
        ]
      }
    };
    headInjections.push(`<script type="application/ld+json">${JSON.stringify(businessSchema)}</script>`);
  }

  // 4. FAQPage — /sss only
  if (normalizedPath === "/sss") {
    const faqSchema = {
      "@context": "https://schema.org", "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Yeminli tercüme nedir?", "acceptedAnswer": { "@type": "Answer", "text": "Yeminli tercüme, yeminli tercümanlar tarafından yapılan ve resmi kurumlarda geçerli olan çeviri türüdür. Noter onayı gerektiren işlemlerde kullanılır." }},
        { "@type": "Question", "name": "Çeviri süresi ne kadar?", "acceptedAnswer": { "@type": "Answer", "text": "Belgenin uzunluğuna ve diline göre değişir. Standart belgeler genellikle 1-3 iş günü içinde teslim edilir. Acil çevirilerde 24 saat içinde teslim mümkündür." }},
        { "@type": "Question", "name": "Noter tasdikli çeviri gerekli mi?", "acceptedAnswer": { "@type": "Answer", "text": "Resmi işlemler için noter tasdikli çeviri gerekebilir. Hangi durumlarda gerekli olduğunu size bildiririz." }},
        { "@type": "Question", "name": "Hangi dillerde çeviri yapıyorsunuz?", "acceptedAnswer": { "@type": "Answer", "text": "Şu anda İngilizce-Türkçe ve Türkçe-İngilizce çeviri hizmetleri sunuyoruz." }},
        { "@type": "Question", "name": "Çeviri fiyatları nasıl belirlenir?", "acceptedAnswer": { "@type": "Answer", "text": "Fiyatlar; belgenin uzunluğu (sayfa/kelime), çeviri türü (yeminli/profesyonel), aciliyet durumu ve teslimat yöntemine göre belirlenir. Ücretsiz teklif alabilirsiniz." }},
        { "@type": "Question", "name": "Online çeviri hizmeti veriyor musunuz?", "acceptedAnswer": { "@type": "Answer", "text": "Evet, 7/24 online hizmet veriyoruz. Mesaj ve teklif taleplerinize 08:00-17:00 saatleri arasında (Pazar hariç) yanıt veriyoruz." }},
        { "@type": "Question", "name": "Belgelerimi nasıl gönderebilirim?", "acceptedAnswer": { "@type": "Answer", "text": "Teklif formu üzerinden belgenizi dijital olarak yükleyebilir veya info@mazzgord.com adresine e-posta gönderebilirsiniz." }}
      ]
    };
    headInjections.push(`<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>`);
  }

  // 4b. Service schema — hizmet sayfalari
  const servicePages = {
    "/yeminli-tercume": { name: "Yeminli Tercüme", desc: "Resmi kurumlarda geçerli yeminli tercüme hizmeti" },
    "/teknik-ceviri": { name: "Teknik Çeviri", desc: "Teknik belge, kılavuz ve mühendislik çevirisi" },
    "/akademik-ceviri": { name: "Akademik Çeviri", desc: "Tez, makale ve akademik yayın çevirisi" },
    "/vize-ceviri": { name: "Vize Çevirisi", desc: "Vize başvuruları için belge çevirisi" },
    "/ingilizce-turkce-ceviri": { name: "İngilizce-Türkçe Çeviri", desc: "Profesyonel İngilizce-Türkçe çift yönlü çeviri" },
    "/pasaport-ceviri": { name: "Pasaport Çevirisi", desc: "Pasaport çevirisi için yeminli tercüme hizmeti" },
    "/diploma-ceviri": { name: "Diploma Çevirisi", desc: "Diploma ve transkript çevirisi için yeminli tercüme" },
  };
  if (servicePages[normalizedPath]) {
    const svc = servicePages[normalizedPath];
    const serviceSchema = {
      "@context": "https://schema.org", "@type": "Service",
      "name": svc.name, "description": svc.desc,
      "provider": { "@type": "ProfessionalService", "name": "Mazzgord Çeviri Hizmetleri", "url": "https://mazzgord.com", "telephone": "+905386295040" },
      "areaServed": { "@type": "Country", "name": "Türkiye" },
      "url": "https://mazzgord.com" + normalizedPath
    };
    headInjections.push(`<script type="application/ld+json">${JSON.stringify(serviceSchema)}</script>`);
  }

  // 5. BreadcrumbList
  const breadcrumbs = [{ name: "Ana Sayfa", url: baseUrl }];
  if (normalizedPath.startsWith("/blog/")) {
    breadcrumbs.push({ name: "Blog", url: `${baseUrl}/blog` });
    breadcrumbs.push({ name: data.title ? data.title.split("|")[0].trim() : "Blog Yazısı", url: `${baseUrl}${normalizedPath}` });
  } else if (normalizedPath === "/blog") {
    breadcrumbs.push({ name: "Blog", url: `${baseUrl}/blog` });
  } else if (normalizedPath === "/teklif") {
    breadcrumbs.push({ name: "Teklif Formu", url: `${baseUrl}/teklif` });
  } else if (normalizedPath === "/sss") {
    breadcrumbs.push({ name: "Sıkça Sorulan Sorular", url: `${baseUrl}/sss` });
  } else if (normalizedPath === "/hakkimizda") {
    breadcrumbs.push({ name: "Hakkımızda", url: `${baseUrl}/hakkimizda` });
  } else if (normalizedPath === "/yeminli-tercume") {
    breadcrumbs.push({ name: "Yeminli Tercüme", url: `${baseUrl}/yeminli-tercume` });
  } else if (normalizedPath === "/teknik-ceviri") {
    breadcrumbs.push({ name: "Teknik Çeviri", url: `${baseUrl}/teknik-ceviri` });
  } else if (normalizedPath === "/akademik-ceviri") {
    breadcrumbs.push({ name: "Akademik Çeviri", url: `${baseUrl}/akademik-ceviri` });
  } else if (normalizedPath === "/vize-ceviri") {
    breadcrumbs.push({ name: "Vize Çevirisi", url: `${baseUrl}/vize-ceviri` });
  } else if (normalizedPath === "/ingilizce-turkce-ceviri") {
    breadcrumbs.push({ name: "İngilizce-Türkçe Çeviri", url: `${baseUrl}/ingilizce-turkce-ceviri` });
  } else if (normalizedPath !== "/") {
    breadcrumbs.push({ name: data.title ? data.title.split("|")[0].trim() : normalizedPath, url: `${baseUrl}${normalizedPath}` });
  }
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((b, i) => ({ "@type": "ListItem", "position": i + 1, "name": b.name, "item": b.url }))
  };
  headInjections.push(`<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>`);

  // Title
  html = html.replace(/<title[^>]*>[^<]*<\/title>/gi, '');
  html = html.replace('</head>', `  <title>${data.title}</title>\n</head>`);
  // Meta description
  html = html.replace(/<meta\s+name=["']description["'][^>]*>/gi, '');
  html = html.replace('</head>', `  <meta name="description" content="${data.description}" />\n</head>`);

  // Canonical
  const canonicalUrl = `https://mazzgord.com${normalizedPath === "/" ? "/" : normalizedPath}`;
  html = html.replace(/<link\s+rel=["']canonical["'][^>]*>/gi, '');
  html = html.replace(/<!-- canonical:[^]*?-->/gi, '');
  if (!is404) {
    headInjections.push(`<link rel="canonical" href="${canonicalUrl}" />`);
  }

  // gtag
  headInjections.push(`<script>window.dataLayer=window.dataLayer||[];function g(){dataLayer.push(arguments)}g('js',new Date());g('config','G-3X2GCEQSDJ');var ric=window.requestIdleCallback||function(cb){setTimeout(cb,3000)};ric(function(){var s=document.createElement('script');s.src='https://www.googletagmanager.com/gtag/js?id=G-3X2GCEQSDJ';s.async=true;document.head.appendChild(s)},{timeout:4000})</script>`);

  // OG tags
  html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/gi, '');
  html = html.replace(/<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/gi, '');
  html = html.replace(/<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/gi, '');
  html = html.replace(/<meta\s+property=["']og:type["']\s+content=["'][^"']*["']\s*\/?>/gi, '');
  html = html.replace(/<meta\s+property=["']og:locale["']\s+content=["'][^"']*["']\s*\/?>/gi, '');
  headInjections.push(
    `  <meta property="og:title" content="${data.title}" />\n` +
    `  <meta property="og:description" content="${data.description}" />\n` +
    `  <meta property="og:url" content="${canonicalUrl}" />\n` +
    `  <meta property="og:type" content="website" />\n` +
    `  <meta property="og:locale" content="tr_TR" />\n  <meta property="og:site_name" content="Mazzgord Çeviri Hizmetleri" />\n`
  );

  // Twitter tags
  html = html.replace(/<meta\s+name=["']twitter:card["']\s+content=["'][^"']*["']\s*\/?>/gi, '');
  html = html.replace(/<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/gi, '');
  html = html.replace(/<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/gi, '');
  headInjections.push(
    `  <meta name="twitter:card" content="summary_large_image" />\n` +
    `  <meta name="twitter:title" content="${data.title}" />\n` +
    `  <meta name="twitter:description" content="${data.description}" />\n` +
    `  <meta name="twitter:image" content="https://mazzgord.com/og-image.png" />\n`
  );

  // Robots
  html = html.replace(/<meta\s+name=["']robots["'][^>]*>/gi, '');
  if (is404) {
    headInjections.push('<meta name="robots" content="noindex, follow" />');
  } else if (isNoIndex) {
    const follow = noFollowPaths.includes(normalizedPath) ? 'nofollow' : 'follow';
    headInjections.push('<meta name="robots" content="noindex, ' + follow + '" />');
    html = html.replace(/<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i, '<meta name="description" content="' + data.description + '" />');
    html = html.replace(/<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i, '<meta property="og:title" content="' + data.title + '" />');
  } else {
    headInjections.push('<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />');
  }

  // BlogPosting schema for blog posts
  if (normalizedPath.startsWith("/blog/") && !html.includes('"@type": "BlogPosting"')) {
    const articleSchema = {
      "@context": "https://schema.org", "@type": "BlogPosting",
      "headline": data.title, "description": data.description,
      "url": "https://mazzgord.com" + normalizedPath,
      "datePublished": (blogDates[normalizedPath] || "2026-06-22"),
      "dateModified": new Date().toISOString().split("T")[0],
      "author": { "@type": "Person", "name": "Mehmet Akoğlu", "url": "https://mazzgord.com/hakkimizda" },
      "publisher": { "@type": "Organization", "name": "Mazzgord", "url": "https://mazzgord.com", "logo": { "@type": "ImageObject", "url": "https://mazzgord.com/favicon.png" } }
    };
    headInjections.push(`  <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>\n`);
  }

  // Ads
  // Prerender sirasinda Chrome'un render ettigi AdSense iframe'lerini temizle
  html = html.replace(/<ins\s+class="adsbygoogle"[\s\S]*?<\/ins>/gi, '');
  html = html.replace(/<iframe[^>]*google_esf[^>]*>[\s\S]*?<\/iframe>/gi, '');
  html = html.replace(/<iframe[^>]*adsbygoogle[^>]*>[\s\S]*?<\/iframe>/gi, '');
  html = html.replace(/<iframe[^>]*googlesyndication[^>]*>[\s\S]*?<\/iframe>/gi, '');
  html = html.replace(/<iframe[^>]*googleapis[^>]*>[\s\S]*?<\/iframe>/gi, '');
  html = html.replace(/<iframe[^>]*adtrafficquality[^>]*>[\s\S]*?<\/iframe>/gi, '');
  html = html.replace(/<iframe[^>]*google\.com\/recaptcha[^>]*>[\s\S]*?<\/iframe>/gi, '');
  html = html.replace(/<script[^>]*show_ads_impl[^>]*>[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script[^>]*adsbygoogle[^>]*>[\s\S]*?<\/script>/gi, '');

  const noAdsPaths = ["/gizlilik", "/kullanim-kosullari", "/cerez-politikasi"];
  const shouldShowAds = !noAdsPaths.includes(normalizedPath);
  if (!shouldShowAds) {
    html = html.replace(/<script[\s\S]*?<\/script>/gi, (match) => {
      return match.includes("adsbygoogle") ? "" : match;
    });
    html = html.replace(/<meta[^>]*google-adsense-account[^>]*>/gi, "");
  }
  if (shouldShowAds) {
    headInjections.push(`<script>var ric=window.requestIdleCallback||function(cb){setTimeout(cb,5000)};ric(function(){var s=document.createElement('script');s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8661028263390679';s.async=true;s.crossOrigin='anonymous';document.head.appendChild(s)},{timeout:6000})</script>`);
  }
  const adsenseMeta = `<meta name="google-adsense-account" content="ca-pub-8661028263390679">`;
  if (!html.includes("google-adsense-account")) { headInjections.push(adsenseMeta); }

  // Gereksiz modulepreload'lari temizle — sadece kritik olanlari tut
  const criticalPreloads = ['vendor-react', 'index-', 'Home-'];
  html = html.replace(/<link\s+rel="modulepreload"[^>]*href="([^"]*)"[^>]*>/gi, (match, href) => {
    return criticalPreloads.some(p => href.includes(p)) ? match : '';
  });

  // CSS preload ekle — tarayici erken indirmeye baslasin
  const cssMatch = html.match(/<link\s+rel="stylesheet"[^>]*href="([^"]*\.css)"[^>]*>/i);
  if (cssMatch) {
    html = html.replace(cssMatch[0], '<link rel="preload" as="style" href="' + cssMatch[1] + '" crossorigin>' + cssMatch[0]);
  }

  // OG image
  if (html.includes('property="og:image"')) {
    html = html.replace(/<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>(?:\s*<meta\s+property=["']og:image:width["'][^>]*>)?(?:\s*<meta\s+property=["']og:image:height["'][^>]*>)?/i, '<meta property="og:image" content="https://mazzgord.com/og-image.png" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />');
  } else {
    html = html.replace("</head>", '  <meta property="og:image" content="https://mazzgord.com/og-image.png" />\n    <meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />\n</head>');
  }

  // hreflang
  html = html.replace(/<link\s+rel=["']alternate["']\s+hreflang=["'][^"']*["']\s+href=["'][^"']*["']\s*\/?>/gi, '');
  html = html.replace(/<!-- hreflang:[^]*?-->/gi, '');
  if (!is404) {
    headInjections.push(`<link rel="alternate" hreflang="tr" href="${canonicalUrl}" />`);
    headInjections.push(`<link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />`);
  }

  // Inject head
  if (headInjections.length > 0) {
    html = html.replace("</head>", `  ${headInjections.join("\n  ")}\n</head>`);
  }

  // Blog related links
  if (normalizedPath.startsWith("/blog/") && normalizedPath !== "/blog") {
    const related = blogRelated[normalizedPath];
    if (related) {
      const relatedHtml = '<div class="bg-primary/5 p-6 rounded-xl border border-primary/10 my-8"><h3 class="text-lg font-bold text-primary mb-3">İlgili Blog Yazıları</h3><ul class="space-y-2">' +
        related.map(slug => '<li><a href="' + slug + '" class="text-primary hover:underline">' + (blogTitles[slug] || slug) + '</a></li>').join('') +
        '</ul></div>';
      html = html.replace('</article>', relatedHtml + '</article>');
    }
  }

  // Final headers
  let finalHeaders = new Headers(response.headers);
  finalHeaders.set("X-Content-Type-Options", "nosniff");
  finalHeaders.set("X-Frame-Options", "DENY");
  finalHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
  finalHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  finalHeaders.set("Content-Security-Policy", CSP_FRAME_ANCESTORS);
  finalHeaders.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(self)");
  finalHeaders.set("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=600");

  const finalStatus = is404 ? 404 : response.status;
  return new Response(html, {
    status: finalStatus,
    statusText: is404 ? "Not Found" : response.statusText,
    headers: finalHeaders
  });
}

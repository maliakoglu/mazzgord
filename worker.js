export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/ads.txt") {
      return new Response(
        "google.com, pub-8661028263390679, DIRECT, f08c47fec0942fa0",
        {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400"
          }
        }
      );
    }

    let response = await env.ASSETS.fetch(request);
    const contentType = response.headers.get("content-type") || "";

    let headers = new Headers(response.headers);
    if (!contentType.includes("text/html")) {
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("X-Frame-Options", "DENY");
      headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
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

    const seoData = {
      "/": {
        "title": "Profesyonel Çeviri Hizmetleri | Yeminli Tercüme | Mazzgord Denizli",
        "description": "Denizli'de profesyonel çeviri hizmetleri, yeminli tercüme, teknik çeviri, akademik ve hukuki çeviri. Hızlı teslimat, resmi belge çevirileri ve uzmanlaşmış tercüman kadrosu."
      },
      "/hakkimizda": {
        "title": "Hakkımızda | Mazzgord Çeviri Bürosu Denizli",
        "description": "Mazzgord çeviri bürosu olarak Denizli'de 10+ yıllık deneyimimizle profesyonel tercüme hizmetleri sunuyoruz."
      },
      "/yeminli-tercume": {
        "title": "Yeminli Tercüme Hizmetleri | Denizli | Mazzgord",
        "description": "Denizli'de noter onaylı yeminli tercüme hizmetleri. Pasaport, diploma, evlilik cüzdanı ve resmi belge çevirileri."
      },
      "/teknik-ceviri": {
        "title": "Teknik Çeviri ve Mühendislik Tercümesi | Mazzgord",
        "description": "Teknik kılavuz, mühendislik raporu ve kullanım kılavuzu çevirileri. Alanında uzman teknik tercüman kadromuzla hizmetinizdeyiz."
      },
      "/akademik-ceviri": {
        "title": "Akademik Çeviri ve Tez Tercümesi | Mazzgord",
        "description": "Tez, makale, özet ve akademik yayın çevirileri. APA formatına uygun profesyonel akademik tercüme hizmetleri."
      },
      "/vize-ceviri": {
        "title": "Vize Başvuru Çeviri Hizmetleri | Mazzgord",
        "description": "Schengen, Amerika, İngiltere ve Kanada vize başvuruları için profesyonel belge çevirisi ve yeminli tercüme hizmetleri."
      },
      "/ingilizce-turkce-ceviri": {
        "title": "İngilizce Türkçe Profesyonel Çeviri | Mazzgord",
        "description": "İngilizce Türkçe çift yönlü profesyonel çeviri hizmetleri. Yeminli tercüme, teknik ve akademik İngilizce çeviri."
      },
      "/blog": {
        "title": "Blog - Çeviri İpuçları ve Sektör Haberleri | Mazzgord",
        "description": "Profesyonel çeviri sektöründen ipuçları, yeminli tercüme rehberleri ve dil haberleri. Mazzgord blogu."
      },
      "/blog/yeminli-tercume": {
        "title": "Yeminli Tercüme Nedir? Rehber 2024 | Mazzgord Blog",
        "description": "Yeminli tercüme nedir, nasıl yapılır ve hangi belgeler için gereklidir? Detaylı rehber ve ipuçları."
      },
      "/blog/vize-ceviri": {
        "title": "Vize İçin Gerekli Çeviri Belgeleri | Mazzgord Blog",
        "description": "Vize başvurularında gerekli çeviri belgeleri, yeminli tercüme şartları ve profesyonel çeviri hizmetleri."
      },
      "/blog/teknik-ceviri": {
        "title": "Teknik Çeviri Nasıl Yapılır? | Mazzgord Blog",
        "description": "Teknik çeviri süreçleri, terminoloji yönetimi ve profesyonel teknik tercüme standartları hakkında bilgi."
      },
      "/blog/ceviri-ipuclari": {
        "title": "Profesyonel Çeviri İpuçları | Mazzgord Blog",
        "description": "Profesyonel çevirmenlerden pratik ipuçları, kaliteli çeviri teknikleri ve yaygın hatalardan kaçınma yolları."
      },
      "/blog/ceviri-sektoru": {
        "title": "Çeviri Sektörü Trendleri 2024 | Mazzgord Blog",
        "description": "Çeviri sektöründeki son gelişmeler, teknoloji trendleri ve gelecek öngörüleri. Sektör haberleri ve analizler."
      },
      "/gizlilik": {
        "title": "Gizlilik Politikası | Mazzgord",
        "description": "Mazzgord çeviri hizmetleri gizlilik politikası. Kişisel verilerinizin korunması ve kullanım şartları."
      },
      "/kullanim-kosullari": {
        "title": "Kullanım Koşulları | Mazzgord",
        "description": "Mazzgord web sitesi kullanım koşulları ve hizmet şartları."
      },
      "/cerez-politikasi": {
        "title": "Çerez Politikası | Mazzgord",
        "description": "Mazzgord web sitesi çerez politikası. Çerez kullanımı ve gizlilik tercihleri hakkında bilgi."
      }
    };

    let normalizedPath = path.replace(/\/$/, "") || "/";
    let data = seoData[normalizedPath];
    if (!data && normalizedPath !== "/") {
      data = seoData[normalizedPath + "/"];
    }
    if (!data) {
      data = seoData["/"];
    }

    let html = await response.text();

    html = html.replace(/<title>.*?<\/title>/i, `<title>${data.title}</title>`);
    html = html.replace(
      /<meta\s+name=["']description["']\s+content=["'].*?["']\s*\/?>/i,
      `<meta name="description" content="${data.description}" />`
    );

    const canonicalUrl = `https://mazzgord.com${normalizedPath === "/" ? "/" : normalizedPath}`;
    if (!html.includes('rel="canonical"')) {
      html = html.replace("</head>", `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`);
    }

    if (!html.includes('property="og:title"')) {
      const ogTags =
        `  <meta property="og:title" content="${data.title}" />\n` +
        `  <meta property="og:description" content="${data.description}" />\n` +
        `  <meta property="og:url" content="${canonicalUrl}" />\n` +
        `  <meta property="og:type" content="website" />\n` +
        `  <meta property="og:locale" content="tr_TR" />\n`;
      html = html.replace("</head>", `${ogTags}</head>`);
    }

    if (!html.includes('name="twitter:card"')) {
      const twitterTags =
        `  <meta name="twitter:card" content="summary_large_image" />\n` +
        `  <meta name="twitter:title" content="${data.title}" />\n` +
        `  <meta name="twitter:description" content="${data.description}" />\n`;
      html = html.replace("</head>", `${twitterTags}</head>`);
    }

    if (!html.includes("application/ld+json")) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Mazzgord Çeviri Hizmetleri",
        "description": data.description,
        "url": "https://mazzgord.com",
        "areaServed": { "@type": "City", "name": "Denizli", "addressCountry": "TR" },
        "serviceType": "Çeviri ve Tercüme Hizmetleri",
        "address": { "@type": "PostalAddress", "addressLocality": "Denizli", "addressCountry": "TR" }
      };
      const schemaScript = `  <script type="application/ld+json">${JSON.stringify(schema)}</script>\n`;
      html = html.replace("</head>", `${schemaScript}</head>`);
    }

    const adsenseCode = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8661028263390679" crossorigin="anonymous"></script>`;
    if (!html.includes("adsbygoogle")) {
      html = html.replace("</head>", `  ${adsenseCode}\n</head>`);
    }
    const adsenseMeta = `<meta name="google-adsense-account" content="ca-pub-8661028263390679">`;
    if (!html.includes("google-adsense-account")) {
      html = html.replace("</head>", `  ${adsenseMeta}\n</head>`);
    }


    const themeColor = `<meta name="theme-color" content="#0f172a">`;
    if (!html.includes("theme-color")) {
      html = html.replace("</head>", `  ${themeColor}\n</head>`);
    }

    const ogSiteName = `<meta property="og:site_name" content="Mazzgord">`;
    if (!html.includes("og:site_name")) {
      html = html.replace("</head>", `  ${ogSiteName}\n</head>`);
    }

    const twitterImage = `<meta name="twitter:image" content="https://mazzgord.com/logo.png">`;
    if (!html.includes("twitter:image")) {
      html = html.replace("</head>", `  ${twitterImage}\n</head>`);
    }

    const hreflang = `<link rel="alternate" hreflang="tr" href="${canonicalUrl}" />`;
    if (!html.includes("hreflang")) {
      html = html.replace("</head>", `  ${hreflang}\n</head>`);
    }

    const languageMeta = `<meta name="language" content="Turkish">`;
    if (!html.includes('name="language"')) {
      html = html.replace("</head>", `  ${languageMeta}\n</head>`);
    }

    let finalHeaders = new Headers(response.headers);
    finalHeaders.set("X-Content-Type-Options", "nosniff");
    finalHeaders.set("X-Frame-Options", "DENY");
    finalHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    finalHeaders.set("Cache-Control", "public, max-age=0, must-revalidate");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers: finalHeaders
    });
  }
};


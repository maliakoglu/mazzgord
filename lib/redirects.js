// Redirect logic — extracted from worker.js

const oldPageRedirects = {
  "/acilceviri": "/teklif",
  "/destek": "/sss",
  "/menu": "/",
  "/gizlilik-politikasi": "/gizlilik",
  "/sirket": "/hakkimizda",
  "/portfolyo": "/",
  "/ceviri": "/",
  "/hizmetler": "/",
  "/tercume": "/yeminli-tercume",
  "/fiyat": "/fiyatlar",
  "/fiyat-listesi": "/fiyatlar",
  "/ucretsiz-teklif": "/teklif",
  "/sepet": "/",
  "/hakkimda": "/hakkimizda",
};

export function handleRedirects(url) {
  const path = url.pathname;

  // Local development — redirect'leri atla
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    return null;
  }

  // === WWW -> NON-WWW 301 REDIRECT ===
  if (url.hostname === "www.mazzgord.com") {
    const newUrl = new URL(url.pathname + url.search + url.hash, "https://mazzgord.com");
    return new Response(null, {
      status: 301,
      headers: {
        "Location": newUrl.toString(),
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
      },
    });
  }

  // === HTTP -> HTTPS REDIRECT ===
  if (url.protocol === "http:") {
    const newUrl = new URL(url.pathname + url.search + url.hash, "https://mazzgord.com");
    return new Response(null, {
      status: 301,
      headers: {
        "Location": newUrl.toString(),
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
      },
    });
  }

  // === ESKI SAYFA REDIRECT'LERI ===
  const redirectPath = path.replace(/\/$/, "") || "/";
  if (oldPageRedirects[redirectPath]) {
    const target = oldPageRedirects[redirectPath];
    const newUrl = new URL(target + url.search + url.hash, "https://mazzgord.com");
    return new Response(null, {
      status: 301,
      headers: {
        "Location": newUrl.toString(),
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
      },
    });
  }
  if (oldPageRedirects[path]) {
    const target = oldPageRedirects[path];
    const newUrl = new URL(target + url.search + url.hash, "https://mazzgord.com");
    return new Response(null, {
      status: 301,
      headers: {
        "Location": newUrl.toString(),
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
      },
    });
  }

  // === TRAILING SLASH REDIRECT ===
  if (path !== "/" && path.endsWith("/")) {
    const newPath = path.replace(/\/$/, "");
    const newUrl = new URL(newPath, url.origin);
    newUrl.search = url.search;
    newUrl.hash = url.hash;
    return new Response(null, {
      status: 301,
      headers: {
        "Location": newUrl.toString(),
        "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
      },
    });
  }

  return null;
}

// Redirect logic — extracted from worker.js

const oldPageRedirects = {
  "/acilceviri": "/teklif",
  "/destek": "/sss",
  "/menu": "/",
  "/iletisim": "/teklif",
  "/gizlilik-politikasi": "/gizlilik",
  "/sirket": "/hakkimizda",
  "/portfolyo": "/",
  "/ceviri": "/hizmetler",
  "/tercume": "/yeminli-tercume",
  "/fiyat": "/fiyatlar",
  "/fiyat-listesi": "/fiyatlar",
  "/ucretsiz-teklif": "/teklif",
  "/hakkimda": "/hakkimizda",
};

export function handleRedirects(url) {
  const path = url.pathname;

  // === WWW -> NON-WWW 301 REDIRECT ===
  if (url.hostname === "www.mazzgord.com") {
    const newUrl = new URL(url.pathname + url.search + url.hash, "https://mazzgord.com");
    return Response.redirect(newUrl.toString(), 301);
  }

  // === HTTP -> HTTPS REDIRECT ===
  if (url.protocol === "http:") {
    const newUrl = new URL(url.pathname + url.search + url.hash, "https://mazzgord.com");
    return Response.redirect(newUrl.toString(), 301);
  }

  // === ESKI SAYFA REDIRECT'LERI ===
  const redirectPath = path.replace(/\/$/, "") || "/";
  if (oldPageRedirects[redirectPath]) {
    const target = oldPageRedirects[redirectPath];
    const newUrl = new URL(target + url.search + url.hash, "https://mazzgord.com");
    return Response.redirect(newUrl.toString(), 301);
  }
  if (oldPageRedirects[path]) {
    const target = oldPageRedirects[path];
    const newUrl = new URL(target + url.search + url.hash, "https://mazzgord.com");
    return Response.redirect(newUrl.toString(), 301);
  }

  // === TRAILING SLASH REDIRECT ===
  if (path !== "/" && path.endsWith("/")) {
    const newPath = path.replace(/\/$/, "");
    const newUrl = new URL(newPath, url.origin);
    newUrl.search = url.search;
    newUrl.hash = url.hash;
    return Response.redirect(newUrl.toString(), 301);
  }

  return null;
}

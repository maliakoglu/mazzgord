// CORS headers and admin auth — extracted from worker.js

const ALLOWED_ORIGINS = [
  "https://mazzgord.com",
  "http://localhost:8081",
  "http://localhost:3000",
];

export const corsHeaders = {
  "Access-Control-Allow-Origin": "https://mazzgord.com",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Mazzgord-Mobile",
  "Vary": "Origin",
};

// Dinamik CORS headers — Origin'e göre izin ver
export function getCorsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : "https://mazzgord.com";
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Mazzgord-Mobile",
    "Vary": "Origin",
  };
}

// Timing-safe string karşılaştırma
function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  const enc = new TextEncoder();
  const bufA = enc.encode(a);
  const bufB = enc.encode(b);
  let diff = 0;
  for (let i = 0; i < bufA.length; i++) {
    diff |= bufA[i] ^ bufB[i];
  }
  return diff === 0;
}

export function checkAdminAuth(request, env) {
  const auth = request.headers.get("Authorization") || "";
  if (!env.ADMIN_TOKEN) return false;
  return timingSafeEqual(auth, `Bearer ${env.ADMIN_TOKEN}`);
}

export function unauthorizedResponse() {
  return new Response(JSON.stringify({ success: false, error: "Yetkisiz" }), {
    status: 401,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

// CSRF koruması — Origin/Referer kontrolü
// İstisnalar:
// 1. Authorization: Bearer header'ı varsa (mobil uygulama token auth)
// 2. OPTIONS preflight istekleri (worker.js'de erken dönülüyor)
export function checkCsrf(request) {
  const auth = request.headers.get("Authorization") || "";

  // Token auth varsa CSRF kontrolünü atla (mobil uygulama)
  if (auth.startsWith("Bearer ")) {
    return true;
  }

  const origin = request.headers.get("Origin") || "";
  const referer = request.headers.get("Referer") || "";

  // Web istekleri için Origin/Referer kontrolü
  if (origin) {
    return ALLOWED_ORIGINS.includes(origin);
  }

  if (referer) {
    try {
      const refererUrl = new URL(referer);
      return ALLOWED_ORIGINS.includes(refererUrl.origin);
    } catch {
      return false;
    }
  }

  // Origin ve Referer yoksa — reddet
  return false;
}

export function csrfFailedResponse() {
  return new Response(JSON.stringify({ success: false, error: "Guvenlik kontrolu basarisiz" }), {
    status: 403,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

// CORS headers and admin auth — extracted from worker.js

const ALLOWED_ORIGINS = [
  "https://mazzgord.com",
  "http://localhost:8081",
  "http://localhost:3000",
];

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export function checkAdminAuth(request, env) {
  const auth = request.headers.get("Authorization") || "";
  return auth === `Bearer ${env.ADMIN_TOKEN}`;
}

export function unauthorizedResponse() {
  return new Response(JSON.stringify({ success: false, error: "Yetkisiz" }), {
    status: 401,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

// CSRF koruması — Origin/Referer kontrolü
// İstisna: Authorization: Bearer header'ı varsa (mobil uygulama token auth) CSRF'yi atla
export function checkCsrf(request) {
  const auth = request.headers.get("Authorization") || "";
  if (auth.startsWith("Bearer ")) return true;

  const origin = request.headers.get("Origin") || "";
  const referer = request.headers.get("Referer") || "";

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

  return false;
}

export function csrfFailedResponse() {
  return new Response(JSON.stringify({ success: false, error: "Guvenlik kontrolu basarisiz" }), {
    status: 403,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

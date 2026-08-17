// CORS headers and admin auth — extracted from worker.js

export const corsHeaders = {
  "Access-Control-Allow-Origin": "https://mazzgord.com",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
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
// POST isteklerinde origin https://mazzgord.com değilse reddet
export function checkCsrf(request) {
  const origin = request.headers.get("Origin") || "";
  const referer = request.headers.get("Referer") || "";

  // Origin varsa direkt kontrol et
  if (origin) {
    return origin === "https://mazzgord.com";
  }

  // Origin yoksa Referer'dan çıkar
  if (referer) {
    try {
      const refererUrl = new URL(referer);
      return refererUrl.origin === "https://mazzgord.com";
    } catch {
      return false;
    }
  }

  // İkisi de yoksa reddet
  return false;
}

export function csrfFailedResponse() {
  return new Response(JSON.stringify({ success: false, error: "Guvenlik kontrolu basarisiz" }), {
    status: 403,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

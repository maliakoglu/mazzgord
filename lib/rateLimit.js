// Rate limiting logic — KV-based (migrated from D1)
import { corsHeaders } from "./cors.js";

export async function checkRateLimit(request, env, path) {
  if (!path.startsWith("/api/")) return null;

  const clientIP = request.headers.get("CF-Connecting-IP") || "unknown";
  const rateLimitKey = `rl:${clientIP}:${path}`;

  const now = Date.now();
  const windowMs = 60000; // 1 minute
  // Admin login için daha sıkı limit (5/dakika)
  // Chat endpoint için sıkı limit (3/dakika) — Workers AI maliyet riski
  const maxRequests = path === "/api/admin/login" ? 5 : path === "/api/chat" ? 3 : 10;

  // KV'den mevcut durumu oku
  const raw = await env.RATE_LIMIT.get(rateLimitKey);
  let count = 0;
  let firstRequest = now;

  if (raw) {
    try {
      const data = JSON.parse(raw);
      if (now - data.firstRequest < windowMs) {
        count = data.count;
        firstRequest = data.firstRequest;
      }
    } catch(e) { /* invalid JSON, start fresh */ }
  }

  count++;

  if (count > maxRequests) {
    return new Response(JSON.stringify({ success: false, error: "Cok fazla istek" }), {
      status: 429,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }

  // KV'ye yaz (TTL 60 saniye)
  await env.RATE_LIMIT.put(rateLimitKey, JSON.stringify({ count, firstRequest }), { expirationTtl: 60 });

  return null;
}

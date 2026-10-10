// Cloudflare Turnstile server-side token verification
import { corsHeaders } from "./cors.js";

export async function verifyTurnstile(token, env, remoteIP = null) {
  if (!token) return { success: false, error: "Güvenlik doğrulaması gerekli" };
  if (!env.TURNSTILE_SECRET_KEY) {
    console.error("TURNSTILE_SECRET_KEY tanimli degil");
    return { success: false, error: "Sunucu hatasi" };
  }
  try {
    const body = new URLSearchParams();
    body.append("secret", env.TURNSTILE_SECRET_KEY);
    body.append("response", token);
    if (remoteIP) body.append("remoteip", remoteIP);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, error: "Güvenlik doğrulaması başarısız" };
    }
    return { success: true };
  } catch (err) {
    console.error("Turnstile verify hatasi:", String(err));
    return { success: false, error: "Sunucu hatasi" };
  }
}

export function turnstileFailedResponse() {
  return new Response(JSON.stringify({ success: false, error: "Güvenlik doğrulaması gerekli" }), {
    status: 403,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

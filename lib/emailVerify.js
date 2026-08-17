// E-posta doğrulama — KV tabanlı 6 haneli kod
import { corsHeaders } from "./cors.js";

// 6 haneli rastgele kod
export function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// KV'ye kod kaydet (5 dakika TTL)
export async function storeVerifyCode(env, email, code) {
  const key = `verify:${email.toLowerCase()}`;
  await env.RATE_LIMIT.put(key, code, { expirationTtl: 300 });
}

// KV'den kodu kontrol et ve sil
export async function checkVerifyCode(env, email, code) {
  const key = `verify:${email.toLowerCase()}`;
  const stored = await env.RATE_LIMIT.get(key);
  if (stored && stored === code) {
    await env.RATE_LIMIT.delete(key);
    return true;
  }
  return false;
}

// Doğrulama e-postası gönder
export async function sendVerifyEmail(env, email, code) {
  const resendKey = env.RESEND_API_KEY;
  if (!resendKey) return false;

  const html = `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <div style="background:#f8f9fa;padding:30px;border-radius:10px;text-align:center">
    <h1 style="color:#2563eb">E-posta Doğrulama</h1>
    <p>Teklif talebinizi tamamlamak için aşağıdaki doğrulama kodunu kullanın:</p>
    <div style="font-size:36px;font-weight:bold;letter-spacing:8px;background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:2px solid #2563eb;color:#2563eb">${code}</div>
    <p style="font-size:13px;color:#666">Bu kod 5 dakika geçerlidir. Teklif talebi sizin tarafınızdan yapılmadıysa bu e-postayı görmezden gelebilirsiniz.</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
    <p style="font-size:13px;color:#666">Mazzgord Çeviri Hizmetleri<br>info@mazzgord.com</p>
  </div>
</body></html>`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Mazzgord <info@mazzgord.com>",
        to: [email],
        subject: "E-posta Doğrulama Kodu — Mazzgord",
        html,
      }),
    });
    return true;
  } catch {
    return false;
  }
}

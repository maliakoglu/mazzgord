// POST /api/auth/register — Müşteri kaydı
// POST /api/auth/login — Müşteri girişi
// POST /api/auth/forgot-password — Şifre sıfırlama kodu gönder
// POST /api/auth/reset-password — Şifre sıfırla (kod + yeni şifre)
// POST /api/auth/google — Google ile giriş
import { corsHeaders } from "../lib/cors.js";
import { hashPassword, createToken } from "../lib/customerAuth.js";
import { authSchema, validateBody } from "../lib/validation.js";

export async function handleAuthRoute(path, request, env) {
  // POST /api/auth/register
  if (path === "/api/auth/register" && request.method === "POST") {
    try {
      const body = await request.json();
      const validation = validateBody(authSchema, body);
      if (!validation.success) return validation.response;

      const { name, email, password, phone } = validation.data;

      // Email kullanımda mı?
      const existing = await env.DB.prepare(
        "SELECT id FROM customers WHERE email = ?"
      ).bind(email).first();
      if (existing) {
        return new Response(JSON.stringify({ success: false, error: "Bu e-posta zaten kayitli" }), {
          status: 409, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Şifre hashle
      const salt = email + Date.now();
      const passwordHash = await hashPassword(password, salt);

      // Kaydet
      const result = await env.DB.prepare(
        "INSERT INTO customers (email, password_hash, name, phone) VALUES (?, ?, ?, ?)"
      ).bind(email, `${salt}:${passwordHash}`, name, phone || null).run();

      const customerId = result.meta.last_row_id;
      const token = await createToken(customerId, email, env);

      return new Response(JSON.stringify({
        success: true, token,
        customer: { id: customerId, name, email, phone: phone || null }
      }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/auth/login
  if (path === "/api/auth/login" && request.method === "POST") {
    try {
      const body = await request.json();
      const { email, password } = body;

      if (!email || !password) {
        return new Response(JSON.stringify({ success: false, error: "E-posta ve sifre zorunlu" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Müşteriyi bul
      const customer = await env.DB.prepare(
        "SELECT id, email, name, phone, password_hash FROM customers WHERE email = ?"
      ).bind(email).first();
      if (!customer) {
        return new Response(JSON.stringify({ success: false, error: "E-posta veya sifre hatali" }), {
          status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Google kullanıcısı şifre ile giremez
      if (customer.password_hash === "google_oauth") {
        return new Response(JSON.stringify({ success: false, error: "Bu hesap Google ile oluşturulmuş. Lütfen Google ile giriş yapın." }), {
          status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Şifre doğrula
      const [salt, storedHash] = customer.password_hash.split(":");
      const inputHash = await hashPassword(password, salt);
      if (inputHash !== storedHash) {
        return new Response(JSON.stringify({ success: false, error: "E-posta veya sifre hatali" }), {
          status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      const token = await createToken(customer.id, customer.email, env);
      return new Response(JSON.stringify({
        success: true, token,
        customer: { id: customer.id, name: customer.name, email: customer.email, phone: customer.phone }
      }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/auth/forgot-password — Şifre sıfırlama kodu gönder
  if (path === "/api/auth/forgot-password" && request.method === "POST") {
    try {
      const body = await request.json();
      const { email } = body;

      if (!email) {
        return new Response(JSON.stringify({ success: false, error: "E-posta zorunlu" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Müşteri var mı kontrol et (güvenlik için her zaman success dön ama sadece varsa kod gönder)
      const customer = await env.DB.prepare(
        "SELECT id, name FROM customers WHERE email = ?"
      ).bind(email).first();

      if (customer && customer.password_hash !== "google_oauth") {
        // 6 haneli kod üret
        const randArr = new Uint32Array(1);
        crypto.getRandomValues(randArr);
        const code = (100000 + (randArr[0] % 900000)).toString();
        const kvKey = `resetpwd:${email.toLowerCase()}`;
        await env.RATE_LIMIT.put(kvKey, code, { expirationTtl: 300 }); // 5 dakika

        // E-posta gönder
        const resendKey = env.RESEND_API_KEY;
        if (resendKey) {
          const html = `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <div style="background:#f8f9fa;padding:30px;border-radius:10px;text-align:center">
    <h1 style="color:#2563eb">Şifre Sıfırlama</h1>
    <p>Sayın ${customer.name},</p>
    <p>Şifrenizi sıfırlamak için aşağıdaki doğrulama kodunu kullanın:</p>
    <div style="font-size:36px;font-weight:bold;letter-spacing:8px;background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:2px solid #2563eb;color:#2563eb">${code}</div>
    <p style="font-size:13px;color:#666">Bu kod 5 dakika geçerlidir. Şifre sıfırlama talebi sizin tarafınızdan yapılmadıysa bu e-postayı görmezden gelebilirsiniz.</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
    <p style="font-size:13px;color:#666">Mazzgord Çeviri Hizmetleri<br>info@mazzgord.com</p>
  </div>
</body></html>`;
          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              from: "Mazzgord <info@mazzgord.com>",
              to: [email],
              subject: "Şifre Sıfırlama Kodu — Mazzgord",
              html,
            }),
          });
        }
      }

      // Güvenlik: Her zaman success dön (email var mı yok mu belli olmasın)
      return new Response(JSON.stringify({ success: true, message: "Sıfırlama kodu gönderildi (e-posta kayıtlıysa)" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/auth/reset-password — Şifre sıfırla
  if (path === "/api/auth/reset-password" && request.method === "POST") {
    try {
      const body = await request.json();
      const { email, code, newPassword } = body;

      if (!email || !code || !newPassword) {
        return new Response(JSON.stringify({ success: false, error: "E-posta, kod ve yeni şifre zorunlu" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      if (newPassword.length < 6) {
        return new Response(JSON.stringify({ success: false, error: "Şifre en az 6 karakter olmali" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Kodu kontrol et
      const kvKey = `resetpwd:${email.toLowerCase()}`;
      const storedCode = await env.RATE_LIMIT.get(kvKey);
      if (!storedCode || storedCode !== code) {
        return new Response(JSON.stringify({ success: false, error: "Geçersiz veya süresi dolmuş kod" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Yeni şifreyi hashle
      const salt = email + Date.now();
      const passwordHash = await hashPassword(newPassword, salt);

      // Güncelle
      await env.DB.prepare(
        "UPDATE customers SET password_hash = ?, updated_at = datetime('now') WHERE email = ?"
      ).bind(`${salt}:${passwordHash}`, email).run();

      // Kodu sil
      await env.RATE_LIMIT.delete(kvKey);

      return new Response(JSON.stringify({ success: true, message: "Şifreniz başarıyla sıfırlandı" }), {
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  // POST /api/auth/google — Google ile giriş
  if (path === "/api/auth/google" && request.method === "POST") {
    try {
      const body = await request.json();
      const { credential } = body;

      if (!credential) {
        return new Response(JSON.stringify({ success: false, error: "Google token zorunlu" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Google ID token'ı doğrula
      const googleResp = await fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
      );

      if (!googleResp.ok) {
        return new Response(JSON.stringify({ success: false, error: "Geçersiz Google token" }), {
          status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      const googleData = await googleResp.json();

      // Client ID doğrula
      if (env.GOOGLE_CLIENT_ID && googleData.aud !== env.GOOGLE_CLIENT_ID) {
        return new Response(JSON.stringify({ success: false, error: "Geçersiz Google client" }), {
          status: 401, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      const email = googleData.email;
      const name = googleData.name || email.split("@")[0];

      if (!email) {
        return new Response(JSON.stringify({ success: false, error: "Google hesabından e-posta alınamadı" }), {
          status: 400, headers: { "Content-Type": "application/json", ...corsHeaders },
        });
      }

      // Müşteri var mı?
      let customer = await env.DB.prepare(
        "SELECT id, email, name, phone FROM customers WHERE email = ?"
      ).bind(email).first();

      if (!customer) {
        // Yeni Google kullanıcısı oluştur
        const result = await env.DB.prepare(
          "INSERT INTO customers (email, password_hash, name, phone) VALUES (?, ?, ?, ?)"
        ).bind(email, "google_oauth", name, null).run();

        const customerId = result.meta.last_row_id;
        const token = await createToken(customerId, email, env);

        return new Response(JSON.stringify({
          success: true, token,
          customer: { id: customerId, name, email, phone: null }
        }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
      }

      // Mevcut müşteri — token dön
      const token = await createToken(customer.id, customer.email, env);
      return new Response(JSON.stringify({
        success: true, token,
        customer: { id: customer.id, name: customer.name, email: customer.email, phone: customer.phone }
      }), { headers: { "Content-Type": "application/json", ...corsHeaders } });
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
        status: 500, headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
  }

  return null;
}

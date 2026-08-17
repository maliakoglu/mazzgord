// POST /api/auth/register — Müşteri kaydı
// POST /api/auth/login — Müşteri girişi
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

  return null;
}

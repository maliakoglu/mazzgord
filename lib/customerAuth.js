// Müşteri kimlik doğrulama — PBKDF2 şifre hashleme + HMAC token
import { corsHeaders } from "./cors.js";

// PBKDF2 ile şifre hashleme (Web Crypto API)
export async function hashPassword(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: enc.encode(salt), iterations: 100000, hash: "SHA-256" },
    keyMaterial, 256
  );
  const hashArray = Array.from(new Uint8Array(bits));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Token üret — customer_id|email|expiry HMAC imzası
export async function createToken(customerId, email, env) {
  const expiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 gün
  const payload = `${customerId}|${email}|${expiry}`;
  const secret = env.CUSTOMER_TOKEN_SECRET || env.ADMIN_TOKEN;
  if (!secret) throw new Error("CUSTOMER_TOKEN_SECRET eksik");
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const sigHex = Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, "0")).join("");
  return btoa(`${payload}:${sigHex}`);
}

// Token doğrula — geçerliyse customer_id döndür
export async function verifyToken(token, env) {
  try {
    const decoded = atob(token);
    const [payload, sigHex] = decoded.split(":");
    const [customerId, email, expiry] = payload.split("|");
    if (Date.now() > parseInt(expiry)) return null;

    const secret = env.CUSTOMER_TOKEN_SECRET || env.ADMIN_TOKEN;
    if (!secret) return null;
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
    );
    const expectedSig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
    const expectedHex = Array.from(new Uint8Array(expectedSig)).map(b => b.toString(16).padStart(2, "0")).join("");
    if (sigHex !== expectedHex) return null;

    return { customerId: parseInt(customerId), email };
  } catch {
    return null;
  }
}

// Request'ten token çıkar ve doğrula
export async function getCustomerFromRequest(request, env) {
  const auth = request.headers.get("Authorization") || "";
  if (!auth.startsWith("Bearer ")) return null;
  const token = auth.slice(7);
  return verifyToken(token, env);
}

export function unauthorizedCustomerResponse() {
  return new Response(JSON.stringify({ success: false, error: "Giris yapilmali" }), {
    status: 401,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

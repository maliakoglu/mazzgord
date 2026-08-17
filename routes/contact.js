// POST /api/contact — İletişim formunu D1'e kaydet
import { corsHeaders } from "../lib/cors.js";
import { contactSchema, validateBody } from "../lib/validation.js";

export async function handleContact(request, env) {
  try {
    const body = await request.json();
    const validation = validateBody(contactSchema, body);
    if (!validation.success) return validation.response;

    const { name, email, phone, message } = validation.data;

    await env.DB.prepare(
      "INSERT INTO messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)"
    ).bind(name, email, phone || null, "İletişim Formu", message).run();

    return new Response(JSON.stringify({ success: true }), {
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: "Sunucu hatasi" }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
}

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

    // Admin'e e-posta bildirimi gönder
    try {
      const resendKey = env.RESEND_API_KEY;
      if (resendKey) {
        const html = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <div style="background:#f8f9fa;padding:30px;border-radius:10px">
    <h1 style="color:#2563eb">Yeni İletişim Mesajı</h1>
    <div style="background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">Ad Soyad:</td><td style="padding:8px 0;font-weight:bold">${name.replace(/</g, "&lt;")}</td></tr>
        <tr><td style="padding:8px 0;color:#666">E-posta:</td><td style="padding:8px 0;font-weight:bold">${email.replace(/</g, "&lt;")}</td></tr>
        ${phone ? `<tr><td style="padding:8px 0;color:#666">Telefon:</td><td style="padding:8px 0;font-weight:bold">${phone.replace(/</g, "&lt;")}</td></tr>` : ""}
      </table>
      <div style="margin-top:15px;padding:15px;background:#f8f9fa;border-radius:8px">
        <p style="margin:0;white-space:pre-wrap">${message.replace(/</g, "&lt;")}</p>
      </div>
    </div>
    <p style="font-size:13px;color:#666">Bu mesaj mazzgord.com iletişim formundan geldi.</p>
  </div>
</body></html>`;
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            from: "Mazzgord <info@mazzgord.com>",
            to: ["info@mazzgord.com"],
            subject: `Yeni İletişim Mesajı — ${name}`,
            html,
          }),
        });
      }
    } catch (err) {
      console.log("İletişim e-posta hatası:", String(err));
    }

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

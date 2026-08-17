// Sipariş durum bildirimleri — merkezi e-posta gönderimi
import { escapeHtml } from "./escapeHtml.js";

const STATUS_LABELS = {
  pending: "Yeni Talep",
  contacted: "İletişime Geçildi",
  needs_info: "Bilgi/Belge Eksik",
  qualified: "Teklif için Hazır",
  quote_sent: "Teklif Gönderildi",
  follow_up: "Takip Gerekli",
  won: "İş Onaylandı",
  payment_pending: "Ödeme Bekleniyor",
  paid: "Ödeme Alındı",
  reviewing: "İnceleniyor",
  processing: "Çeviri Devam Ediyor",
  translating: "Çeviriye Başlandı",
  quality_control: "Kalite Kontrol",
  completed: "Çeviri Tamamlandı",
  delivered: "Teslim Edildi",
  repeat_closed: "Tamamlandı",
  lost: "Kaybedildi",
  cancelled: "İptal Edildi",
};

const STATUS_COLORS = {
  pending: "#f59e0b",
  contacted: "#3b82f6",
  needs_info: "#d97706",
  qualified: "#0891b2",
  quote_sent: "#0284c7",
  follow_up: "#ea580c",
  won: "#4f46e5",
  payment_pending: "#ea580c",
  paid: "#16a34a",
  reviewing: "#3b82f6",
  processing: "#3b82f6",
  translating: "#4f46e5",
  quality_control: "#9333ea",
  completed: "#16a34a",
  delivered: "#16a34a",
  repeat_closed: "#6b7280",
  lost: "#ef4444",
  cancelled: "#ef4444",
};

export async function sendStatusNotification(env, quote) {
  const resendKey = env.RESEND_API_KEY;
  if (!resendKey || !quote || !quote.email) return false;

  const orderNo = `MZ-${String(quote.id).padStart(5, "0")}`;
  const statusLabel = STATUS_LABELS[quote.order_status] || quote.order_status;
  const statusColor = STATUS_COLORS[quote.order_status] || "#666";

  const html = `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <div style="background:#f8f9fa;padding:30px;border-radius:10px">
    <h1 style="color:${statusColor};text-align:center">📋 Sipariş Durumu Güncellendi</h1>
    <p>Sayın <strong>${escapeHtml(quote.name)}</strong>,</p>
    <p>Teklif talebinizin durumu güncellenmiştir.</p>
    <div style="background:#fff;padding:20px;border-radius:8px;margin:20px 0;border:1px solid #e5e7eb">
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;color:#666">Sipariş No:</td><td style="padding:8px 0;font-weight:bold;text-align:right;font-family:monospace">${orderNo}</td></tr>
        <tr><td style="padding:8px 0;color:#666">Durum:</td><td style="padding:8px 0;font-weight:bold;text-align:right;color:${statusColor}">${statusLabel}</td></tr>
        ${quote.source_language ? `<tr><td style="padding:8px 0;color:#666">Dil Çifti:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${escapeHtml(quote.source_language)} → ${escapeHtml(quote.target_language)}</td></tr>` : ''}
        ${quote.estimated_price != null ? `<tr><td style="padding:8px 0;color:#666">Tutar:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${quote.estimated_price} ₺</td></tr>` : ''}
        ${quote.delivery_date ? `<tr><td style="padding:8px 0;color:#666">Teslim Tarihi:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${quote.delivery_date}</td></tr>` : ''}
        ${quote.translator ? `<tr><td style="padding:8px 0;color:#666">Tercüman:</td><td style="padding:8px 0;font-weight:bold;text-align:right">${escapeHtml(quote.translator)}</td></tr>` : ''}
      </table>
    </div>
    <p>Siparişinizi <a href="https://mazzgord.com/siparis?no=${orderNo}" style="color:#2563eb">buradan</a> takip edebilirsiniz.</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
    <p style="font-size:13px;color:#666">Mazzgord Çeviri Hizmetleri<br>Denizli, Türkiye<br>info@mazzgord.com | +90 538 629 50 40</p>
  </div>
</body></html>`;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Mazzgord <info@mazzgord.com>",
        to: [quote.email],
        subject: `Sipariş Durumu: ${statusLabel} — ${orderNo} | Mazzgord`,
        html,
      }),
    });
    return true;
  } catch {
    return false;
  }
}

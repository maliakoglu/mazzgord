with open("worker.js", "r", encoding="utf-8") as f:
    content = f.read()

# R2 cleanup'tan SONRA review email gönderimi ekle
old_cron_end = """      console.log(`R2 cleanup complete: ${deleted} files deleted`);
    } catch (err) {
      console.log("R2 cleanup error:", String(err));
    }
  }
};"""

new_cron_end = """      console.log(`R2 cleanup complete: ${deleted} files deleted`);

      // === Otomatik değerlendirme e-postası ===
      // Teslimden 3 gün sonra müşteriye değerlendirme e-postası gönder
      try {
        const reviewCandidates = await env.DB.prepare(
          `SELECT q.id, q.name, q.email, q.order_token, q.order_status, q.review_email_sent, q.delivery_date
           FROM quotes q
           WHERE q.order_status IN ('delivered', 'completed')
             AND q.review_email_sent = 0
             AND q.email IS NOT NULL
             AND q.delivery_date IS NOT NULL`
        ).all();

        let sent = 0;
        const now = new Date();
        const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000);

        for (const quote of (reviewCandidates.results || [])) {
          const deliveryDate = new Date(quote.delivery_date + "T00:00:00");
          if (deliveryDate < threeDaysAgo) continue;

          // Zaten değerlendirme var mı kontrol et
          const existing = await env.DB.prepare(
            "SELECT id FROM reviews WHERE quote_id = ?"
          ).bind(quote.id).first();
          if (existing) {
            // Değerlendirme yapılmış, email_sent = 1 işaretle
            await env.DB.prepare(
              "UPDATE quotes SET review_email_sent = 1 WHERE id = ?"
            ).bind(quote.id).run();
            continue;
          }

          const resendKey = env.RESEND_API_KEY;
          if (!resendKey) break;

          const reviewUrl = `https://mazzgord.com/degerlendir?token=${quote.order_token}`;
          const reviewHtml = `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <div style="background:#f8f9fa;padding:30px;border-radius:10px">
    <h1 style="color:#2563eb;text-align:center">⭐ Çevirimizi Nasıl Buldunuz?</h1>
    <p>Sayın <strong>${escapeHtml(quote.name)}</strong>,</p>
    <p>Çeviri hizmetimizden memnun kaldığınızı umuyoruz. Deneyiminizi paylaşmak ister misiniz?</p>
    <p>Geri bildiriminiz bizim için çok değerli ve diğer müşterilerin doğru karar vermesine yardımcı oluyor.</p>
    <div style="text-align:center;margin:30px 0">
      <a href="${reviewUrl}" style="display:inline-block;padding:14px 32px;background:#2563eb;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px">Değerlendirme Yap</a>
    </div>
    <p style="font-size:13px;color:#666;text-align:center">Değerlendirme yapmak sadece 1 dakikanızı alır.</p>
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0">
    <p style="font-size:13px;color:#666">Mazzgord Çeviri Hizmetleri<br>Denizli, Türkiye</p>
  </div>
</body></html>`;

          await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${resendKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Mazzgord <info@mazzgord.com>",
              to: [quote.email],
              subject: "⭐ Çevirimizi Nasıl Buldunuz? — Mazzgord",
              html: reviewHtml,
            }),
          });

          await env.DB.prepare(
            "UPDATE quotes SET review_email_sent = 1 WHERE id = ?"
          ).bind(quote.id).run();
          sent++;
        }
        console.log(`Review emails sent: ${sent}`);
      } catch (reviewErr) {
        console.log("Review email error:", String(reviewErr));
      }

    } catch (err) {
      console.log("R2 cleanup error:", String(err));
    }
  }
};"""

if old_cron_end in content and "review_email_sent" not in content:
    # escapeHtml import'unun varlığını kontrol et
    if "escapeHtml" in content:
        content = content.replace(old_cron_end, new_cron_end, 1)
        print("✓ Cron handler'a değerlendirme e-postası eklendi")
    else:
        print("✗ escapeHtml import bulunamadı")
else:
    print("✗ Cron anchor bulunamadı veya zaten eklenmiş")

with open("worker.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Cron güncellemesi tamam.")

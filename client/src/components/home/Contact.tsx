import { Mail, Phone, MapPin } from "lucide-react";
import { track } from "@/lib/analytics";

interface ContactProps {
  formData: { name: string; email: string; phone: string; message: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitStatus: "idle" | "sending" | "success" | "error";
}

export default function Contact({ formData, handleChange, handleSubmit, submitStatus }: ContactProps) {
  return (
    <section id="contact" className="py-20 md:py-32 parallax-yorumlar" style={{ backgroundColor: 'var(--color-soft-sand)' }}>
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        <h2 className="text-center mb-4" style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '36px', fontWeight: 700, color: 'var(--color-heading)', letterSpacing: '-0.02em' }}>İletişim</h2>
        <p className="text-center mb-16 mx-auto" style={{ color: 'var(--color-mid-stone)', fontSize: '16px', lineHeight: 1.63, maxWidth: '600px' }}>
          Çeviri ihtiyaçlarınız hakkında bilgi almak için bize ulaşın. Hızlı yanıt ve profesyonel danışmanlık.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex gap-4">
              <Phone className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--color-sage)' }} />
              <div>
                <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '18px', fontWeight: 500, marginBottom: '4px', color: 'var(--color-heading)' }}>Telefon</h3>
                <a href="tel:+905386295040" onClick={() => track.phoneClick()} style={{ color: 'var(--color-ink-black)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '2px' }}>+90 538 629 50 40</a>
                <a href="https://wa.me/905386295040" target="_blank" rel="noopener noreferrer" onClick={() => track.whatsappClick("contact")} style={{ color: 'var(--color-warm-gray)', fontSize: '14px', display: 'block', marginTop: '4px' }}>WhatsApp üzerinden iletişim için tıklayın</a>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--color-sage)' }} />
              <div>
                <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '18px', fontWeight: 500, marginBottom: '4px', color: 'var(--color-heading)' }}>E-posta</h3>
                <p style={{ color: 'var(--color-mid-stone)', fontSize: '15px' }}><a href="mailto:info@mazzgord.com" onClick={() => track.emailClick()} style={{ color: 'var(--color-ink-black)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>info@mazzgord.com</a></p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--color-sage)' }} />
                <div>
                  <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '18px', fontWeight: 500, marginBottom: '4px', color: 'var(--color-heading)' }}>Konum</h3>
                  <p style={{ color: 'var(--color-mid-stone)', fontSize: '15px' }}>Denizli, Türkiye</p>
                </div>
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'rgba(213, 208, 184, 0.3) 0px 1px 2px 0px' }}>
                <iframe
                  src="https://www.google.com/maps?q=37.7765,29.0864&z=13&output=embed"
                  width="100%"
                  height="200"
                  style={{ border: 'none' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Denizli Haritası"
                />
              </div>
            </div>
          </div>

          <div className="p-8" style={{ backgroundColor: 'var(--color-paper-white)', borderRadius: '24px', boxShadow: 'rgba(213, 208, 184, 0.4) 0px 2px 6px 0px' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="contact-name" style={{ display: 'block', fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--color-ink-black)', marginBottom: '8px' }}>Ad Soyad</label>
                <input id="contact-name" type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', fontSize: '14px', borderRadius: '8px', border: '1px solid var(--color-lavender-mist)', backgroundColor: 'var(--color-soft-sand)', color: 'var(--color-ink-black)', fontFamily: '"Inter", sans-serif' }} placeholder="Adınız" required />
              </div>
              <div>
                <label htmlFor="contact-email" style={{ display: 'block', fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--color-ink-black)', marginBottom: '8px' }}>E-posta</label>
                <input id="contact-email" type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px 14px', fontSize: '14px', borderRadius: '8px', border: '1px solid var(--color-lavender-mist)', backgroundColor: 'var(--color-soft-sand)', color: 'var(--color-ink-black)', fontFamily: '"Inter", sans-serif' }} placeholder="E-posta adresiniz" required />
              </div>
              <div>
                <label htmlFor="contact-phone" style={{ display: 'block', fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--color-ink-black)', marginBottom: '8px' }}>Telefon</label>
                <input id="contact-phone" type="tel" name="phone" value={formData.phone} required onChange={handleChange} style={{ width: '100%', padding: '10px 14px', fontSize: '14px', borderRadius: '8px', border: '1px solid var(--color-lavender-mist)', backgroundColor: 'var(--color-soft-sand)', color: 'var(--color-ink-black)', fontFamily: '"Inter", sans-serif' }} placeholder="Telefon numaranız" />
              </div>
              <div>
                <label htmlFor="contact-message" style={{ display: 'block', fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 600, color: 'var(--color-ink-black)', marginBottom: '8px' }}>Mesaj</label>
                <textarea id="contact-message" name="message" value={formData.message} onChange={handleChange} rows={4} style={{ width: '100%', padding: '10px 14px', fontSize: '14px', borderRadius: '8px', border: '1px solid var(--color-lavender-mist)', backgroundColor: 'var(--color-soft-sand)', color: 'var(--color-ink-black)', fontFamily: '"Inter", sans-serif', resize: 'vertical' }} placeholder="Çeviri ihtiyacınız hakkında bilgi verin..." required />
              </div>
              <button type="submit" className="btn-primary w-full" style={{ justifyContent: 'center', padding: '12px 24px', fontSize: '16px', border: 'none' }}>Gönder</button>
            </form>
            {submitStatus === "success" && (
              <p style={{ color: 'var(--color-sage)', fontWeight: 600, marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</p>
            )}
            {submitStatus === "error" && (
              <p style={{ color: 'var(--color-stamp-red)', fontWeight: 600, marginTop: '16px', textAlign: 'center', fontSize: '14px' }}>Bir hata oluştu. Lütfen tekrar deneyin.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

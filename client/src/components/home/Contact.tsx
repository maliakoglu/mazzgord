import { Mail, Phone, MapPin, Clock, FileText, MessageCircle } from "lucide-react";
import { track } from "@/lib/analytics";

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 parallax-yorumlar" style={{ backgroundColor: 'var(--color-soft-sand)' }}>
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        <h2 className="text-center mb-4" style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '36px', fontWeight: 700, color: 'var(--color-heading)', letterSpacing: '-0.02em' }}>İletişim</h2>
        <p className="text-center mb-16 mx-auto" style={{ color: 'var(--color-mid-stone)', fontSize: '16px', lineHeight: 1.63, maxWidth: '600px' }}>
          Belgenizi gönderin, aynı gün net fiyat ve teslim süresi alırsınız.
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
                  <p style={{ color: 'var(--color-mid-stone)', fontSize: '15px' }}>Pamukkale, Denizli</p>
                  <p style={{ color: 'var(--color-mid-stone)', fontSize: '15px' }}>Pzt–Cmt 09:00–18:00</p>
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

          <div className="flex flex-col justify-center gap-6" style={{ backgroundColor: 'var(--color-paper-white)', borderRadius: '24px', padding: '40px', boxShadow: 'rgba(213, 208, 184, 0.4) 0px 2px 6px 0px' }}>
            <div className="text-center">
              <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '24px', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '12px' }}>Belgeniz Hazır mı?</h3>
              <p style={{ color: 'var(--color-mid-stone)', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
                Belgenizi gönderin — mesai içinde aynı gün net fiyat ve teslim süresi alırsınız. Noter onayı ve apostil takibi dahil.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <a
                href="/teklif"
                onClick={() => track.servicePageCtaClick("contact")}
                className="btn-primary flex items-center justify-center gap-2"
                style={{ padding: '14px 28px', fontSize: '16px' }}
              >
                <FileText className="w-5 h-5" />
                Teklif Formu — Belgenizi Gönderin
              </a>
              <a
                href="https://wa.me/905386295040?text=Merhaba,%20belgem%20için%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track.whatsappClick("contact")}
                className="btn-secondary flex items-center justify-center gap-2"
                style={{ padding: '14px 28px', fontSize: '16px' }}
              >
                <MessageCircle className="w-5 h-5" style={{ color: 'var(--color-sage)' }} />
                WhatsApp'tan Hızlı Teklif
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-4 text-sm" style={{ color: 'var(--color-warm-gray)', borderTop: '1px solid var(--color-lavender-mist)' }}>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" style={{ color: 'var(--color-sage)' }} /> Pzt–Cmt 09:00–18:00</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" style={{ color: 'var(--color-sage)' }} /> Pamukkale, Denizli</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

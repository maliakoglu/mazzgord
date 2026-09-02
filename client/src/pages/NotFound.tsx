import { Home, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-lg mx-4 text-center" style={{ padding: '40px 24px' }}>
        <div style={{ fontFamily: '"Libre Baskerville", serif', fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: 700, color: 'var(--color-sage)', marginBottom: '8px', lineHeight: 1 }}>
          404
        </div>
        <h1 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 500, color: 'var(--color-ink-black)', marginBottom: '16px' }}>
          Sayfa Bulunamadı
        </h1>
        <p style={{ color: 'var(--color-mid-stone)', fontSize: '16px', lineHeight: 1.63, marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px' }}>
          Aradığınız sayfa taşınmış veya silinmiş olabilir. Çeviri hizmetlerimiz için ana sayfaya dönebilir veya WhatsApp'tan ulaşabilirsiniz.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setLocation("/")}
            className="btn-primary inline-flex items-center gap-2"
            style={{ padding: '12px 28px', fontSize: '16px' }}
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </button>
          <a
            href="https://wa.me/905386295040?text=Merhaba,%20belgem%20için%20teklif%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-semibold transition no-underline hover:no-underline"
            style={{ padding: '12px 28px', fontSize: '16px', borderRadius: '10000px', border: '1px solid var(--color-lavender-mist)', color: 'var(--color-ink-black)', background: 'var(--color-paper-white)' }}
          >
            <MessageCircle className="w-5 h-5" style={{ color: 'var(--color-sage)' }} />
            WhatsApp'tan Yazın
          </a>
        </div>
      </div>
    </div>
  );
}

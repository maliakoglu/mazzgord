import { CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <style>{`
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.4s ease-out forwards;
          opacity: 0;
        }
        .fade-up-delay-1 { animation-delay: 0.1s; }
        .fade-up-delay-2 { animation-delay: 0.2s; }
        .fade-up-delay-3 { animation-delay: 0.3s; }
      `}</style>

      <div className="container mx-auto px-4 relative z-10 text-center" style={{ maxWidth: '900px' }}>
        <div className="fade-up fade-up-delay-1" style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '3px', marginBottom: '20px', textTransform: 'uppercase', color: 'var(--color-editorial-teal)' }}>
          Noter Yeminli Tercüme
        </div>
        <h1 className="fade-up" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 700, marginBottom: '15px', lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--color-ink-black)' }}>
          Noter Yeminli İngilizce–Türkçe Tercüme
        </h1>
        <span className="fade-up fade-up-delay-1 block" style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', fontWeight: 500, marginBottom: '24px', color: 'var(--color-charcoal)' }}>
          İngilizce-Türkçe Resmi Belge ve Vize Çevirisi
        </span>
        <p className="fade-up fade-up-delay-2" style={{ fontSize: 'clamp(0.95rem, 3.5vw, 1.1rem)', color: 'var(--color-mid-stone)', maxWidth: '680px', margin: '0 auto 40px', lineHeight: 1.63 }}>
          Yeminli tercüman güvencesiyle pasaport, diploma, transkript, vize evrakı ve adli sicil belgelerinizi hızla çeviriyorum. Noter onaylı çeviri ve apostil çeviri takibini sizin yerinize tamamlıyorum. Zaman kaybetmeyin; belgenizi WhatsApp'tan gönderin, net teklifinizi hemen alın.
        </p>
        <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/teklif"
            className="btn-primary"
            style={{ padding: '12px 28px', fontSize: '16px' }}
          >
            Belgem İçin Teklif Al
          </a>
          <a
            href="https://wa.me/905386295040?text=Merhaba,%20belgem%20için%20teklif%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-semibold transition no-underline hover:no-underline"
            style={{ padding: '12px 28px', fontSize: '16px', borderRadius: '10000px', border: '1px solid var(--color-lavender-mist)', color: 'var(--color-ink-black)', background: 'var(--color-paper-white)' }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: 'var(--color-editorial-teal)' }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp'tan Gönder
          </a>
        </div>
        <div className="fade-up fade-up-delay-3 mt-10">
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-center md:gap-6 text-sm" style={{ color: 'var(--color-warm-gray)' }}>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-editorial-teal)' }} /> Noter Yeminli Tercüman</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-editorial-teal)' }} /> İngilizce-Türkçe</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-editorial-teal)' }} /> Belgeyi Gönder, Teklif Al</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" style={{ color: 'var(--color-editorial-teal)' }} /> Denizli ve Online</span>
          </div>
        </div>
      </div>
    </section>
  );
}

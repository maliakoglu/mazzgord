import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{background: 'linear-gradient(135deg, #0a1628 0%, #0d2847 30%, #1a3a6b 60%, #0d2847 100%)'}}>
      <style>{`
        @keyframes sparkleAnim {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes shine {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .sparkle-dot {
          position: absolute;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px 2px rgba(255,255,255,0.8);
          opacity: 0;
          animation: sparkleAnim 2s infinite linear;
          pointer-events: none;
        }
        .fade-up {
          animation: fadeUp 1s ease-out forwards;
          opacity: 0;
        }
        .fade-up-delay-1 { animation-delay: 0.3s; }
        .fade-up-delay-2 { animation-delay: 0.6s; }
        .fade-up-delay-3 { animation-delay: 0.9s; }
        .fade-up-delay-4 { animation-delay: 1.2s; }
        .fade-up-delay-5 { animation-delay: 1.5s; }
        .parallax-section {
          will-change: transform;
          transition: transform 0.1s ease-out;
        }
      `}</style>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="sparkle-dot" style={{
            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDelay: Math.random() * 5 + 's',
            animationDuration: Math.random() * 3 + 1.5 + 's',
          }} />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="fade-up fade-up-delay-1" style={{color: '#60a5fa', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '5px', marginBottom: '15px', textTransform: 'uppercase'}}>
          Noter Yeminli Tercüme
        </div>
        <h1 className="fade-up" style={{fontSize: 'clamp(2.5rem, 10vw, 4.8rem)', fontWeight: 800, marginBottom: '15px', lineHeight: 1.1, background: 'linear-gradient(to right, #fff, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          Denizli Çeviri ve Tercüme Bürosu
        </h1>
        <span className="fade-up fade-up-delay-1 block" style={{fontSize: 'clamp(1.1rem, 4.5vw, 1.8rem)', fontWeight: 600, marginBottom: '20px', color: '#fff'}}>
          İngilizce-Türkçe Resmi Belge ve Vize Çevirisi
        </span>
        <p className="fade-up fade-up-delay-2" style={{fontSize: 'clamp(0.95rem, 3.8vw, 1.15rem)', color: '#cbd5e0', maxWidth: '750px', margin: '0 auto 40px'}}>
          Denizli'den tüm Türkiye'ye İngilizce-Türkçe yeminli belge ve vize çevirisi. Pasaport, diploma, adli sicil ve vize evraklarınızı WhatsApp'tan gönderin; belge türü, noter ve apostil ihtiyacı ile teslim süresini inceleyip size net teklif vereyim.
        </p>
        <div className="fade-up fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            className="font-bold px-8 py-4 text-lg rounded-xl w-full sm:w-auto border-0"
            style={{background: '#00c2ff', color: '#0a1628', boxShadow: '0 8px 25px rgba(0, 194, 255, 0.3)'}}
            onClick={() => window.location.href = "/teklif"}
          >
            Teklif Alın <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <a
            href="https://wa.me/905386295040?text=Merhaba,%20belgem%20için%20teklif%20almak%20istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 text-lg rounded-xl w-full sm:w-auto inline-flex items-center justify-center gap-2 font-semibold transition"
            style={{borderColor: 'rgba(255,255,255,0.2)', color: '#fff', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)'}}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            WhatsApp'tan Gönder
          </a>
        </div>
      </div>
      
      <div className="fade-up fade-up-delay-3 absolute bottom-8 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Noter Yeminli Tercüman</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> İngilizce-Türkçe</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Belgeyi Gönder, Teklif Al</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Hızlı Teslimat</span>
          </div>
        </div>
      </div>
    </section>
  );
}

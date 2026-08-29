import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { CheckCircle2 } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const features = [
  "Noter Yeminli Tercüman",
  "İngilizce-Türkçe",
  "Belgeyi Gönder, Teklif Al",
  "Denizli ve Online",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/3 -left-1/3 w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(45,122,128,0.10) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(213,208,184,0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(45,122,128,0.08) 0%, transparent 70%)",
            filter: "blur(70px)",
          }}
          animate={{ x: [0, 30, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(213,208,184,0.10) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 relative z-10 text-center"
        style={{ maxWidth: "900px" }}
      >
        {/* Badge */}
        <motion.div variants={item}>
          <span
            className="inline-block mb-5"
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-editorial-teal)",
              padding: "6px 16px",
              borderRadius: "10000px",
              border: "1px solid var(--color-lavender-mist)",
              background: "rgba(253, 252, 245, 0.6)",
              backdropFilter: "blur(8px)",
            }}
          >
            Noter Yeminli Tercüme
          </span>
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={item}
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "clamp(2.5rem, 8vw, 4rem)",
            fontWeight: 700,
            marginBottom: "15px",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--color-ink-black)",
          }}
        >
          Noter Yeminli İngilizce–Türkçe Tercüme
        </motion.h1>

        {/* Subtitle */}
        <motion.span
          variants={item}
          className="block"
          style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: "clamp(1.1rem, 4vw, 1.5rem)",
            fontWeight: 500,
            marginBottom: "24px",
            color: "var(--color-charcoal)",
          }}
        >
          İngilizce-Türkçe Resmi Belge ve Vize Çevirisi
        </motion.span>

        {/* Description */}
        <motion.p
          variants={item}
          style={{
            fontSize: "clamp(0.95rem, 3.5vw, 1.1rem)",
            color: "var(--color-mid-stone)",
            maxWidth: "680px",
            margin: "0 auto 40px",
            lineHeight: 1.63,
          }}
        >
          Denizli'den tüm Türkiye'ye İngilizce-Türkçe yeminli belge ve vize çevirisi. Pasaport, diploma, adli sicil ve vize evraklarınızı WhatsApp'tan gönderin; belge türü, noter ve apostil ihtiyacı ile teslim süresini inceleyip size net teklif vereyim.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            href="/teklif"
            className="btn-primary"
            style={{ padding: "12px 28px", fontSize: "16px" }}
          >
            Belgem İçin Teklif Al
          </MagneticButton>
          <MagneticButton
            href="https://wa.me/905386295040?text=Merhaba,%20belgem%20için%20teklif%20almak%20istiyorum."
            className="inline-flex items-center justify-center gap-2 font-semibold transition no-underline hover:no-underline"
            style={{
              padding: "12px 28px",
              fontSize: "16px",
              borderRadius: "10000px",
              border: "1px solid var(--color-lavender-mist)",
              color: "var(--color-ink-black)",
              background: "var(--color-paper-white)",
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--color-editorial-teal)" }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp'tan Gönder
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Bottom features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-8 left-0 right-0 z-10"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: "var(--color-warm-gray)" }}>
            {features.map((f, i) => (
              <motion.span
                key={i}
                className="flex items-center gap-1.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.1, duration: 0.4 }}
              >
                <CheckCircle2 className="w-4 h-4" style={{ color: "var(--color-editorial-teal)" }} />
                {f}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

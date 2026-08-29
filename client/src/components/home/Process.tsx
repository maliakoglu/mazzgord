import { motion } from "framer-motion";

const steps = [
  { num: "1", title: "Belgenizi Gönderin", desc: "Belgenizin net fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden iletin." },
  { num: "2", title: "İnceleme ve Teklif", desc: "Belge türünü, dil yönünü, noter ve apostil ihtiyacını inceleyip net fiyat ve teslim süresi veriyorum." },
  { num: "3", title: "Onay ve Ödeme", desc: "Teklifi onayladığınızda ödeme bilgileri gönderilir. Online ödeme veya havale seçeneği mevcut." },
  { num: "4", title: "Çeviri ve Kontrol", desc: "Çeviriyi hazırlayıp isim, tarih, sayı ve kurum adlarını ikinci kez kontrol ediyorum." },
  { num: "5", title: "Teslim", desc: "Çeviri dijital olarak e-posta/WhatsApp ile veya kargo ile adresinize teslim edilir." },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Process() {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: "var(--color-soft-sand)" }}>
      <div className="container mx-auto px-4" style={{ maxWidth: "1200px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-center mb-4" style={{ fontFamily: '"Playfair Display", serif', fontSize: "36px", fontWeight: 700, color: "var(--color-ink-black)", letterSpacing: "-0.02em" }}>
            Nasıl Çalışıyorum?
          </h2>
          <p className="text-center mb-16 mx-auto" style={{ color: "var(--color-mid-stone)", fontSize: "16px", lineHeight: 1.63, maxWidth: "600px" }}>
            Belgenizi göndermekten teslim almaya kadar beş adımda tamamlanır.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-3 lg:grid-cols-5 gap-8"
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={item} className="text-center">
              <div
                className="mx-auto mb-4 flex items-center justify-center"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10000px",
                  backgroundColor: "var(--color-ink-black)",
                  color: "var(--color-paper-white)",
                  fontFamily: '"Playfair Display", serif',
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                {step.num}
              </div>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: "18px", fontWeight: 500, marginBottom: "8px", color: "var(--color-ink-black)" }}>
                {step.title}
              </h3>
              <p style={{ color: "var(--color-mid-stone)", fontSize: "14px", lineHeight: 1.63 }}>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

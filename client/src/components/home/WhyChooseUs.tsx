import { motion } from "framer-motion";
import { CheckCircle2, Globe } from "lucide-react";

const benefits = [
  "Noter yeminli tercüman olarak resmi belgeler için yasal geçerlilik",
  "Her işi bizzat ben yapıyorum; başkasına devretmiyorum",
  "Belgenizi inceler, net teklif veririm; sürpriz fiyat yok",
  "Gizlilik esastır; belgeleriniz güvenle saklanır ve iş bitince silinir",
  "Teslim öncesi isim, tarih, sayı ve kurum adları ikinci kez kontrol edilir",
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32 bg-background parallax-section">
      <div className="container mx-auto px-4" style={{ maxWidth: "1200px" }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: "36px", fontWeight: 700, marginBottom: "32px", color: "var(--color-ink-black)", letterSpacing: "-0.02em", lineHeight: 1.31 }}>
              Neden Benimle Çalışmalısınız?
            </h2>
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="space-y-6">
              {benefits.map((benefit, idx) => (
                <motion.div key={idx} variants={item} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: "var(--color-editorial-teal)" }} />
                  <p style={{ color: "var(--color-ink-black)", fontSize: "16px", lineHeight: 1.5 }}>{benefit}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg h-96 flex items-center justify-center"
            style={{ backgroundColor: "var(--color-soft-sand)", borderRadius: "24px" }}
          >
            <div className="text-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Globe className="w-24 h-24 mx-auto mb-4" style={{ color: "var(--color-sandstone)" }} />
              </motion.div>
              <p style={{ color: "var(--color-warm-gray)", fontSize: "16px", lineHeight: 1.5 }}>İngilizce-Türkçe Yeminli Tercüme</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

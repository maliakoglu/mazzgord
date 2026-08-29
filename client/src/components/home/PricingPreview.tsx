import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const items = [
  { service: "Yeminli Tercüme", price: "1.000 TL'den başlayan", note: "Belge türü ve yoğunluğa göre" },
  { service: "Noter Onaylı Tercüme", price: "Tercüme + gerçek noter bedeli", note: "Noter bedeli işlem öncesi teyit edilir" },
  { service: "Apostil Süreci", price: "350 TL'den başlayan işlem/takip", note: "Devlet apostil bedeli ayrı alınmaz" },
  { service: "Acil Teslim", price: "+%30-%50", note: "Aynı gün, kapasiteye bağlı" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const card = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function PricingPreview() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Başlangıç Fiyatları</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
            Belge görülmeden kesin fiyat verilmez. Aşağıdaki başlangıç aralıkları referans amaçlıdır.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              variants={card}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-card p-6 rounded-xl border border-border"
            >
              <h3 className="text-lg font-bold text-foreground mb-2">{item.service}</h3>
              <p className="text-2xl font-bold text-primary mb-1">{item.price}</p>
              <p className="text-sm text-muted-foreground">{item.note}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <Button className="font-bold px-8 py-4 text-lg rounded-xl" onClick={() => (window.location.href = "/fiyatlar")}>
            Tüm Fiyatları Gör <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

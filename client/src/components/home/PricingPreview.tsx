import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const items = [
  { service: "Yeminli Tercüme", price: "1.000 TL'den başlayan", note: "Belge türü ve yoğunluğa göre" },
  { service: "Noter Onaylı Tercüme", price: "Tercüme + gerçek noter bedeli", note: "Noter bedeli işlem öncesi teyit edilir" },
  { service: "Apostil Süreci", price: "350 TL'den başlayan işlem/takip", note: "Devlet apostil bedeli ayrı alınmaz" },
  { service: "Acil Teslim", price: "+%30-%50", note: "Aynı gün, kapasiteye bağlı" },
];

export default function PricingPreview() {
  const { ref: titleRef } = useReveal();
  const { ref: gridRef } = useReveal();
  const { ref: btnRef } = useReveal();
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="reveal" ref={titleRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Başlangıç Fiyatları</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
            Belge görülmeden kesin fiyat verilmez. Aşağıdaki başlangıç aralıkları referans amaçlıdır.
          </p>
        </div>

        <div
          className="reveal-stagger grid md:grid-cols-2 gap-6 mb-8"
          ref={gridRef}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="relative bg-card p-8 rounded-2xl border border-border overflow-hidden hover-lift"
              style={{
                background: "rgba(253, 252, 245, 0.6)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: idx % 2 === 0
                    ? "linear-gradient(90deg, var(--color-editorial-teal), var(--color-sandstone))"
                    : "linear-gradient(90deg, var(--color-sandstone), var(--color-editorial-teal))",
                }}
              />
              <h3 className="text-lg font-bold text-foreground mb-3" style={{ fontFamily: '"Playfair Display", serif' }}>{item.service}</h3>
              <p className="text-2xl font-bold text-primary mb-2">{item.price}</p>
              <p className="text-sm text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </div>

        <div
          className="reveal text-center"
          ref={btnRef}
        >
          <Button className="font-bold px-8 py-4 text-lg rounded-xl" onClick={() => (window.location.href = "/fiyatlar")}>
            Tüm Fiyatları Gör <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

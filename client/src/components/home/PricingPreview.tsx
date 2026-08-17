import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PricingPreview() {
  const items = [
    { service: "Yeminli Tercüme", price: "1.000 TL'den başlayan", note: "Belge türü ve yoğunluğa göre" },
    { service: "Noter Onaylı Tercüme", price: "Tercüme + gerçek noter bedeli", note: "Noter bedeli işlem öncesi teyit edilir" },
    { service: "Apostil Süreci", price: "350 TL'den başlayan işlem/takip", note: "Devlet apostil bedeli ayrı alınmaz" },
    { service: "Acil Teslim", price: "+%30-%50", note: "Aynı gün, kapasiteye bağlı" },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Başlangıç Fiyatları</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
          Belge görülmeden kesin fiyat verilmez. Aşağıdaki başlangıç aralıkları referans amaçlıdır.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {items.map((item, idx) => (
            <div key={idx} className="bg-card p-6 rounded-xl border border-border">
              <h3 className="text-lg font-bold text-foreground mb-2">{item.service}</h3>
              <p className="text-2xl font-bold text-primary mb-1">{item.price}</p>
              <p className="text-sm text-muted-foreground">{item.note}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button
            className="font-bold px-8 py-4 text-lg rounded-xl"
            onClick={() => window.location.href = "/fiyatlar"}
          >
            Tüm Fiyatları Gör <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

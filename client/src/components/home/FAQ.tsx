import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: "Belgenin fotoğrafını WhatsApp'tan göndersem yeterli mi?",
      a: "Evet. Belgenizin net fotoğrafını veya taranmış halini WhatsApp'tan göndermeniz yeterli. Belge türünü, dil yönünü ve noter/apostil ihtiyacını inceleyip net teklif veriyorum.",
    },
    {
      q: "Noter onayı ne kadar sürer?",
      a: "Noter onayı genellikle aynı gün tamamlanır. Noter bedeli belge türüne göre değişir; işlem öncesi teyit edilir. Noter bedelini kendim tahsil etmem, makbuz karşılığı gerçek bedeli müşteriye iletirim.",
    },
    {
      q: "Denizli dışında yaşayanlar için hizmet veriyor musunuz?",
      a: "Evet. Türkiye'nin her yerinden online hizmet veriyorum. Belgelerinizi dijital olarak gönderirsiniz; çeviri tamamlandığında dijital (PDF) olarak e-posta veya WhatsApp ile teslim edilir. Fiziksel kopya gerektiğinde kargo ile gönderilir.",
    },
    {
      q: "Apostil ne demek, her belgede gerekir mi?",
      a: "Apostil, belgenizin yabancı bir ülkede kullanılabilmesi için valilik veya kaymakamlıkça eklenen uluslararası tasdik şerhidir. Her belgede gerekmez; belgenin kullanılacağı ülke ve kuruma göre değişir. Hangi onaya ihtiyaç duyduğunuzu belgeyi inceledikten sonra söylüyorum.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Sıkça Sorulan Sorular</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto text-lg">
          Aklınıza takılan sorular için buraya bakabilirsiniz.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-card rounded-xl border border-border overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-6 text-left cursor-pointer"
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <span className="font-bold text-foreground text-lg">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform ${open === idx ? "rotate-180" : ""}`} />
              </button>
              {open === idx && (
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { track } from "@/lib/analytics";
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
    <section className="py-20 md:py-32" style={{ backgroundColor: "var(--color-soft-sand)" }}>
      <div className="container mx-auto px-4" style={{ maxWidth: "800px" }}>
        <h2 className="text-center mb-4" style={{ fontFamily: "\"Libre Baskerville\", serif", fontSize: "36px", fontWeight: 700, color: 'var(--color-heading)', letterSpacing: "-0.02em" }}>Sıkça Sorulan Sorular</h2>
        <p className="text-center mb-12 mx-auto" style={{ color: "var(--color-mid-stone)", fontSize: "16px", lineHeight: 1.63, maxWidth: "600px" }}>
          Aklınıza takılan sorular için buraya bakabilirsiniz.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} style={{ backgroundColor: "var(--color-paper-white)", borderRadius: "16px", overflow: "hidden", boxShadow: "rgba(213, 208, 184, 0.3) 0px 1px 2px 0px" }}>
              <button
                className="w-full flex justify-between items-center p-6 text-left cursor-pointer"
                style={{ border: "none", background: "transparent" }}
                onClick={() => setOpen(open === idx ? null : idx)}
              >
                <span style={{ fontFamily: "\"Inter\", sans-serif", fontWeight: 700, fontSize: "16px", color: "var(--color-ink-black)" }}>{faq.q}</span>
                <ChevronDown className="w-5 h-5 flex-shrink-0 ml-4 transition-transform" style={{ color: "var(--color-warm-gray)", transform: open === idx ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>
              {open === idx && (
                <div className="px-6 pb-6">
                  <p style={{ color: "var(--color-mid-stone)", fontSize: "15px", lineHeight: 1.63 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

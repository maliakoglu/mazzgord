import { FileText, Globe, Users, ArrowUpRight } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

const services = [
  { icon: FileText, title: "Yeminli Tercüme", description: "Resmi belgelerinizin yeminli tercümesi. Noter onayı ve apostil süreci takibi dahil.", link: "/yeminli-tercume" },
  { icon: FileText, title: "Pasaport Çevirisi", description: "Pasaport, kimlik ve adli sicil çevirisi. Vize ve göçmenlik başvuruları için.", link: "/pasaport-ceviri" },
  { icon: FileText, title: "Diploma Çevirisi", description: "Diploma, transkript ve öğrenci belgesi çevirisi. Denklik ve başvuru için.", link: "/diploma-ceviri" },
  { icon: Globe, title: "Vize Çevirisi", description: "Vize başvuru dosyaları ve konsolosluk evrakları için çeviri hizmeti.", link: "/vize-ceviri" },
  { icon: Globe, title: "İngilizce-Türkçe Çeviri", description: "İngilizce-Türkçe çift yönlü çeviri. Resmi, teknik ve akademik metinler.", link: "/ingilizce-turkce-ceviri" },
  { icon: Users, title: "Teknik ve Akademik Çeviri", description: "Teknik doküman, tez, makale ve hukuki metin çevirisi. Belge görülerek teklif.", link: "/teknik-ceviri" },
];

export default function Services() {
  const { ref: titleRef } = useReveal();
  const { ref: gridRef } = useReveal();
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4" style={{ maxWidth: "1200px" }}>
        <div className="reveal" ref={titleRef}>
          <h2 className="text-center mb-4" style={{ fontFamily: '"Playfair Display", serif', fontSize: "36px", fontWeight: 700, color: "var(--color-ink-black)", letterSpacing: "-0.02em" }}>
            Hizmetlerimiz
          </h2>
          <p className="text-center mb-16 mx-auto" style={{ color: "var(--color-mid-stone)", fontSize: "16px", lineHeight: 1.63, maxWidth: "600px" }}>
            İngilizce-Türkçe yeminli tercüme. Resmi belgeler ve vize evrakları için belgenizi gönderin, net teklif alın.
          </p>
        </div>

        <div
          className="reveal-stagger grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          ref={gridRef}
        >
          {services.map((service, idx) => (
            <a
              key={idx}
              href={service.link}
              className="card-feature block no-underline hover:no-underline relative group hover-lift"
              style={{ overflow: "hidden" }}
            >
              <service.icon className="mb-4" style={{ width: "28px", height: "28px", color: "var(--color-editorial-teal)" }} />
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: "20px", fontWeight: 500, marginBottom: "10px", color: "var(--color-ink-black)" }}>
                {service.title}
              </h3>
              <p style={{ color: "var(--color-mid-stone)", fontSize: "14px", lineHeight: 1.63 }}>
                {service.description}
              </p>
              <ArrowUpRight
                className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ width: "18px", height: "18px", color: "var(--color-editorial-teal)" }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

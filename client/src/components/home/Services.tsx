import { Card } from "@/components/ui/card";
import { FileText, Globe, Users } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Hizmetlerimiz</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
          İngilizce-Türkçe yeminli tercüme. Resmi belgeler ve vize evrakları için belgenizi gönderin, net teklif alın.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: FileText,
              title: "Yeminli Tercüme",
              description: "Resmi belgelerinizin yeminli tercümesi. Noter onayı ve apostil süreci takibi dahil.",
              link: "/yeminli-tercume",
            },
            {
              icon: FileText,
              title: "Pasaport Çevirisi",
              description: "Pasaport, kimlik ve adli sicil çevirisi. Vize ve göçmenlik başvuruları için.",
              link: "/pasaport-ceviri",
            },
            {
              icon: FileText,
              title: "Diploma Çevirisi",
              description: "Diploma, transkript ve öğrenci belgesi çevirisi. Denklik ve başvuru için.",
              link: "/diploma-ceviri",
            },
            {
              icon: Globe,
              title: "Vize Çevirisi",
              description: "Vize başvuru dosyaları ve konsolosluk evrakları için çeviri hizmeti.",
              link: "/vize-ceviri",
            },
            {
              icon: Globe,
              title: "İngilizce-Türkçe Çeviri",
              description: "İngilizce-Türkçe çift yönlü çeviri. Resmi, teknik ve akademik metinler.",
              link: "/ingilizce-turkce-ceviri",
            },
            {
              icon: Users,
              title: "Teknik ve Akademik Çeviri",
              description: "Teknik doküman, tez, makale ve hukuki metin çevirisi. Belge görülerek teklif.",
              link: "/teknik-ceviri",
            },
          ].map((service, idx) => (
            <a key={idx} href={service.link} className="no-underline">
              <Card className="p-8 hover:shadow-lg hover:scale-105 transition-all duration-300 border-border cursor-pointer h-full">
                <service.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

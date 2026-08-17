import { Card } from "@/components/ui/card";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 bg-secondary/30 parallax-yorumlar">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary parallax-section">Başarılı Projeler</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
          Müşteri memnuniyeti ve kaliteli çeviri hizmetleri sunma konusunda uzun yılların tecrübesi.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "İngiltere Vize Başvurusu",
              description: "Resmi belgeler ve kimlik dokümanlarının yeminli tercümesi. Başvuru kriterlerine tam uygun, dikkatli ve doğru çeviri.",
              tags: ["Yeminli Tercüme", "Vize Başvurusu"],
            },
            {
              title: "ABD Göçmenlik Başvurusu",
              description: "Amerika Birleşik Devletleri Vatandaşlık ve Göçmenlik Hizmetleri başvurusu için gerekli E-Devlet belgelerinin profesyonel çevirisi.",
              tags: ["Hukuki Çeviri", "Göçmenlik"],
            },
            {
              title: "Finansal Belge Çevirisi",
              description: "Finansal bağların ve düzenli aboneliklerin kanıtlanması amacıyla resmi makamlara sunulmak üzere hazırlanan çeviri.",
              tags: ["Teknik Çeviri", "Finansal"],
            },
            {
              title: "Kurumsal Belge Çevirisi",
              description: "Kurumsal kimlik bilgilerini ve veri doğruluğunu yansıtan teknik terim odaklı resmi çeviri hizmetleri.",
              tags: ["Kurumsal", "Teknik"],
            },
          ].map((project, idx) => (
            <Card key={idx} className="p-8 border-border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
              <h3 className="text-2xl font-bold mb-3 text-foreground">{project.title}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

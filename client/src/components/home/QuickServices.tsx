export default function QuickServices() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { title: "Yeminli Tercüme", link: "/yeminli-tercume" },
            { title: "Pasaport Çevirisi", link: "/pasaport-ceviri" },
            { title: "Diploma Çevirisi", link: "/diploma-ceviri" },
            { title: "Vize Çevirisi", link: "/vize-ceviri" },
            { title: "İngilizce-Türkçe Çeviri", link: "/ingilizce-turkce-ceviri" },
            { title: "Teknik Çeviri", link: "/teknik-ceviri" },
          ].map((service, idx) => (
            <a key={idx} href={service.link} className="p-4 bg-card rounded-xl border border-border hover:shadow-lg hover:border-primary/50 transition-all text-center">
              <span className="font-bold text-primary">{service.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

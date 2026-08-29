import { FileText, Globe, Users } from "lucide-react";

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        <h2 className="text-center mb-4" style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 700, color: 'var(--color-ink-black)', letterSpacing: '-0.02em' }}>Hizmetlerimiz</h2>
        <p className="text-center mb-16 mx-auto" style={{ color: 'var(--color-mid-stone)', fontSize: '16px', lineHeight: 1.63, maxWidth: '600px' }}>
          İngilizce-Türkçe yeminli tercüme. Resmi belgeler ve vize evrakları için belgenizi gönderin, net teklif alın.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <a key={idx} href={service.link} className="card-feature block no-underline hover:no-underline transition" style={{ transition: 'box-shadow 0.3s, transform 0.3s' }}
               onMouseEnter={e => { e.currentTarget.style.boxShadow = 'rgba(213, 208, 184, 0.4) 0px 8px 24px 0px'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
               onMouseLeave={e => { e.currentTarget.style.boxShadow = 'rgba(213, 208, 184, 0.4) 0px 2px 6px 0px'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <service.icon className="mb-4" style={{ width: '28px', height: '28px', color: 'var(--color-editorial-teal)' }} />
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 500, marginBottom: '10px', color: 'var(--color-ink-black)' }}>{service.title}</h3>
              <p style={{ color: 'var(--color-mid-stone)', fontSize: '14px', lineHeight: 1.63 }}>{service.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

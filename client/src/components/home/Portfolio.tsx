export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 md:py-32 parallax-yorumlar" style={{ backgroundColor: 'var(--color-soft-sand)' }}>
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        <h2 className="text-center mb-4 parallax-section" style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '36px', fontWeight: 700, color: 'var(--color-heading)', letterSpacing: '-0.02em' }}>Başarılı Projeler</h2>
        <p className="text-center mb-16 mx-auto" style={{ color: 'var(--color-mid-stone)', fontSize: '16px', lineHeight: 1.63, maxWidth: '600px' }}>
          Müşteri memnuniyeti ve kaliteli çeviri hizmetleri sunma konusunda uzun yılların tecrübesi.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
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
            <div key={idx} className="p-8 transition" style={{ backgroundColor: 'var(--color-paper-white)', borderRadius: '24px', boxShadow: 'rgba(213, 208, 184, 0.4) 0px 2px 6px 0px' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'rgba(213, 208, 184, 0.4) 0px 8px 24px 0px'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'rgba(213, 208, 184, 0.4) 0px 2px 6px 0px'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '24px', fontWeight: 500, marginBottom: '12px', color: 'var(--color-heading)' }}>{project.title}</h3>
              <p className="mb-4" style={{ color: 'var(--color-mid-stone)', fontSize: '15px', lineHeight: 1.63 }}>{project.description}</p>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="tag" style={{ backgroundColor: "rgba(57, 117, 109, 0.12)", color: "var(--color-sage)" }}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

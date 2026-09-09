export default function Portfolio() {
  const projects = [
    {
      title: "İngiltere Vize Başvurusu — Pasaport ve Banka Belgesi",
      need: "Müşteri İngiltere vizesi için pasaport ve banka belgesinin yeminli çevirisine ihtiyaç duyuyordu.",
      action: "Pasaport ve 3 aylık banka hesap özetinin yeminli çevirisi yapıldı. Belge formatı vize başvuru kriterlerine göre düzenlendi.",
      duration: "1 iş günü",
      delivery: "Dijital (PDF) + WhatsApp",
      tags: ["Yeminli Tercüme", "Vize"],
    },
    {
      title: "ABD Göçmenlik — Adli Sicil ve Nüfus Kayıt Örneği",
      need: "ABD göçmenlik başvurusu için adli sicil ve nüfus kayıt örneğinin noter onaylı çevirisi gerekiyordu.",
      action: "Adli sicil belgesi ve nüfus kayıt örneği çevrildi, noter tasdiki tamamlandı. İsim ve tarihler ikinci kez kontrol edildi.",
      duration: "2 iş günü (noter dahil)",
      delivery: "Elden teslim — Denizli",
      tags: ["Noter Onaylı", "Göçmenlik"],
    },
    {
      title: "Diploma ve Transkript — Yurt Dışı Denklik",
      need: "Müşteri yurt dışında yüksek lisans başvurusu için diploma ve transkript çevirisi istedi.",
      action: "Diploma ve transkript yeminli çevirisi yapıldı. Noter onayı ve apostil takibi sağlandı.",
      duration: "3 iş günü (apostil dahil)",
      delivery: "Dijital (PDF) + Kargo",
      tags: ["Yeminli Tercüme", "Apostil"],
    },
    {
      title: "Teknik Kılavuz — Makine İhracat Belgeleri",
      need: "Müşteri İngiltere'ye makine ihracatı için teknik kılavuz ve güvenlik belgelerinin çevirisine ihtiyaç duyuyordu.",
      action: "Teknik terminoloji tutarlılığı sağlanarak kılavuz ve güvenlik belgeleri çevrildi. Format orijinal belgeyle uyumlu tutuldu.",
      duration: "4 iş günü",
      delivery: "Dijital (PDF + DOCX)",
      tags: ["Teknik Çeviri", "Ticari"],
    },
  ];

  return (
    <section id="portfolio" className="py-20 md:py-32 parallax-yorumlar" style={{ backgroundColor: 'var(--color-soft-sand)' }}>
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        <h2 className="text-center mb-4 parallax-section" style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '36px', fontWeight: 700, color: 'var(--color-heading)', letterSpacing: '-0.02em' }}>Tamamlanan Çevirilerden Örnekler</h2>
        <p className="text-center mb-16 mx-auto" style={{ color: 'var(--color-mid-stone)', fontSize: '16px', lineHeight: 1.63, maxWidth: '600px' }}>
          Belge türüne, kurum ihtiyacına ve teslim süresine göre gerçekleştirilen çeviri örnekleri.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <div key={idx} className="p-8 transition" style={{ backgroundColor: 'var(--color-paper-white)', borderRadius: '24px', boxShadow: 'rgba(213, 208, 184, 0.4) 0px 2px 6px 0px' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'rgba(213, 208, 184, 0.4) 0px 8px 24px 0px'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'rgba(213, 208, 184, 0.4) 0px 2px 6px 0px'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '20px', fontWeight: 500, marginBottom: '16px', color: 'var(--color-heading)' }}>{project.title}</h3>
              <div className="space-y-3 mb-4">
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-sage)' }}>İhtiyaç</span>
                  <p style={{ color: 'var(--color-mid-stone)', fontSize: '14px', lineHeight: 1.6 }}>{project.need}</p>
                </div>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-sage)' }}>Yapılan İşlem</span>
                  <p style={{ color: 'var(--color-mid-stone)', fontSize: '14px', lineHeight: 1.6 }}>{project.action}</p>
                </div>
                <div className="flex gap-6 pt-2" style={{ borderTop: '1px solid var(--color-lavender-mist)' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--color-warm-gray)' }}>Süre</span>
                    <p style={{ fontSize: '14px', color: 'var(--color-ink-black)', fontWeight: 500 }}>{project.duration}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--color-warm-gray)' }}>Teslim</span>
                    <p style={{ fontSize: '14px', color: 'var(--color-ink-black)', fontWeight: 500 }}>{project.delivery}</p>
                  </div>
                </div>
              </div>
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

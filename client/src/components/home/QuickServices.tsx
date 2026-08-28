export default function QuickServices() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { title: "Yeminli Tercüme", link: "/yeminli-tercume" },
            { title: "Pasaport Çevirisi", link: "/pasaport-ceviri" },
            { title: "Diploma Çevirisi", link: "/diploma-ceviri" },
            { title: "Vize Çevirisi", link: "/vize-ceviri" },
            { title: "İngilizce-Türkçe", link: "/ingilizce-turkce-ceviri" },
            { title: "Teknik Çeviri", link: "/teknik-ceviri" },
          ].map((service, idx) => (
            <a key={idx} href={service.link} className="block p-4 rounded-lg text-center no-underline hover:no-underline transition"
               style={{ backgroundColor: 'var(--color-paper-white)', border: '1px solid var(--color-lavender-mist)', boxShadow: 'rgba(213, 208, 184, 0.3) 0px 1px 2px 0px' }}
               onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-ink-black)'; e.currentTarget.style.boxShadow = 'rgba(213, 208, 184, 0.4) 0px 4px 12px 0px'; }}
               onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-lavender-mist)'; e.currentTarget.style.boxShadow = 'rgba(213, 208, 184, 0.3) 0px 1px 2px 0px'; }}>
              <span style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--color-ink-black)' }}>{service.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

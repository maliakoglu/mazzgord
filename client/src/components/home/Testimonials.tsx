import { useReveal } from "@/hooks/useReveal";

const reviews = [
  { name: "Yağız Can K.", service: "Resmi Belge Çevirisi", source: "Bionluk", text: "Hızlı ve güvenilir bir hizmet aldım, teşekkürler." },
  { name: "Tuna M.", service: "Vize Evrakı Çevirisi", source: "Bionluk", text: "Mesajlara ve isteklere çok özen gösteren birisi. İşim acil olduğu için ekstra hızlı yaptı. 10 üzerinden 10 hizmet. Bundan sonra bütün vize işlemlerimde Mehmet Akoğlu'nu tercih edeceğim." },
  { name: "Yusuf A. (tekrar eden müşteri)", service: "Resmi Belge Çevirisi", source: "Bionluk", text: "Birkaç kez beraber çalıştık. Çözüm odaklı, hızlı ve güçlü iletişim. Diğer freelancerlar gibi her şeye ekstra fiyat çekmiyor, yaptığı işin karşılığını istiyor. Süper, devam." },
];

const images = ["/images/proje-1.webp", "/images/proje-2.webp", "/images/proje-3.webp", "/images/proje-4.webp", "/images/proje-5.webp", "/images/proje-6.webp"];

export default function Testimonials({ openGallery }: { openGallery: (images: string[], startIndex: number) => void }) {
  const { ref: titleRef } = useReveal();
  const { ref: reviewsRef } = useReveal();
  const { ref: galleryRef } = useReveal();
  const { ref: projectsRef } = useReveal();
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30 parallax-yorumlar">
      <div className="container mx-auto px-4">
        <div className="reveal" ref={titleRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Müşteri Yorumları</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
            Bionluk üzerinden alınan müşteri geri bildirimleri
          </p>
        </div>

        <div className="reveal-stagger grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto" ref={reviewsRef}>
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="relative bg-card p-8 rounded-2xl border border-border overflow-hidden hover-lift"
              style={{ background: "rgba(253, 252, 245, 0.6)", backdropFilter: "blur(8px)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, var(--color-editorial-teal), var(--color-sandstone))" }} />
              <svg className="w-8 h-8 mb-4 opacity-20" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--color-editorial-teal)" }}>
                <path d="M14.017 21v-7.391c0-2.877.01-4.32.747-5.592.726-1.27 1.574-1.733 3.236-2.017v3.391c-1.002.312-1.387.75-1.387 1.826v3.783h2.391v4h-2.391v7h-2.596zm-9.017 0v-7.391c0-2.877.01-4.32.747-5.592.726-1.27 1.574-1.733 3.236-2.017v3.391c-1.002.312-1.387.75-1.387 1.826v3.783h2.391v4h-2.391v7h-2.596z" />
              </svg>
              <p className="text-foreground mb-6 leading-relaxed" style={{ fontSize: "15px", lineHeight: 1.7 }}>{review.text}</p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="font-bold text-primary" style={{ fontFamily: '"Playfair Display", serif', fontSize: "16px" }}>— {review.name}</p>
                <span className="text-xs text-muted-foreground px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(45,122,128,0.08)" }}>{review.service}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-3">{review.source} üzerinden alınan müşteri geri bildirimi</p>
            </div>
          ))}
        </div>

        <div className="reveal text-center" ref={projectsRef}>
          <h3 className="text-2xl font-bold text-primary mb-6">Tamamlanan Projelerden Örnekler</h3>
          <div className="reveal-stagger grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto" ref={galleryRef}>
            {images.map((img, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer hover-lift"
                onClick={() => openGallery(images, idx)}
              >
                <img src={img} alt={"Proje örneği " + (idx + 1)} width={400} height={128} className="w-full h-32 object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-4">Resimlere tıklayarak büyütebilirsiniz</p>
        </div>
      </div>
    </section>
  );
}

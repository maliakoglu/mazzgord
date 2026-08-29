export default function Testimonials({ openGallery }: { openGallery: (images: string[], startIndex: number) => void }) {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30 parallax-yorumlar">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Müşteri Yorumları</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
          Bionluk üzerinden alınan müşteri geri bildirimleri
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
          {[
            {
              name: "Yağız Can K.",
              service: "Resmi Belge Çevirisi",
              source: "Bionluk",
              permission: true,
              text: "Hızlı ve güvenilir bir hizmet aldım, teşekkürler.",
            },
            {
              name: "Tuna M.",
              service: "Vize Evrakı Çevirisi",
              source: "Bionluk",
              permission: true,
              text: "Mesajlara ve isteklere çok özen gösteren birisi. İşim acil olduğu için ekstra hızlı yaptı. 10 üzerinden 10 hizmet. Bundan sonra bütün vize işlemlerimde Mehmet Akoğlu'nu tercih edeceğim.",
            },
            {
              name: "Yusuf A. (tekrar eden müşteri)",
              service: "Resmi Belge Çevirisi",
              source: "Bionluk",
              permission: true,
              text: "Birkaç kez beraber çalıştık. Çözüm odaklı, hızlı ve güçlü iletişim. Diğer freelancerlar gibi her şeye ekstra fiyat çekmiyor, yaptığı işin karşılığını istiyor. Süper, devam.",
            },
          ].map((review, idx) => (
            <div key={idx} className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <p className="text-foreground mb-4 leading-relaxed">"{review.text}"</p>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="font-bold text-primary">— {review.name}</p>
                <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">{review.service}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-3">{review.source} üzerinden alınan müşteri geri bildirimi</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-primary mb-6">Tamamlanan Projelerden Örnekler</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              "/images/proje-1.webp",
              "/images/proje-2.webp",
              "/images/proje-3.webp",
              "/images/proje-4.webp",
              "/images/proje-5.webp",
              "/images/proje-6.webp",
            ].map((img, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 duration-300"
                onClick={() => openGallery(["/images/proje-1.webp", "/images/proje-2.webp", "/images/proje-3.webp", "/images/proje-4.webp", "/images/proje-5.webp", "/images/proje-6.webp"], idx)}
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

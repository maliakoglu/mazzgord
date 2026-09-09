export default function Testimonials({ openGallery }: { openGallery: (images: string[], startIndex: number) => void }) {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30 parallax-yorumlar">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Müşteri Yorumları</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
          Bionluk üzerinden alınan müşteri geri bildirimleri
        </p>
        <div className="flex justify-center mb-16">
          <a href="https://maps.app.goo.gl/QUpy2H12rKtegBAaA" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition"
            style={{ backgroundColor: '#fff', border: '1px solid #dadce0', color: '#1f1f1f' }}>
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google'da Yorumları Gör
          </a>
        </div>

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
                <img src={img} alt={"Mazzgord tamamlanan çeviri projesi örneği " + (idx + 1) + " - yeminli tercüme Denizli"} width={400} height={128} className="w-full h-32 object-cover" loading="lazy" />
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mt-4">Resimlere tıklayarak büyütebilirsiniz</p>
        </div>
      </div>
    </section>
  );
}

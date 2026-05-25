import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="w-5 h-5" /> Ana Sayfa
          </a>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Gizlilik Politikası</h1>
        <div className="prose prose-lg max-w-none text-foreground space-y-6">
          <p className="text-muted-foreground">Son güncelleme: 23 Mayıs 2026</p>

          <h2 className="text-2xl font-bold text-primary mt-8">1. Genel</h2>
          <p>Mazzgord olarak, kişisel verilerinizin güvenliğine büyük önem veriyoruz. Bu gizlilik politikası, web sitemizi (mazzgord.com) ziyaret ettiğinizde topladığımız bilgileri ve bu bilgileri nasıl kullandığımızı açıklamaktadır.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">2. Toplanan Veriler</h2>
          <p>İletişim formu aracılığıyla aşağıdaki kişisel verileri toplayabiliriz:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ad Soyad</li>
            <li>E-posta adresi</li>
            <li>Telefon numarası</li>
            <li>Mesaj içeriği</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8">3. Verilerin Kullanım Amacı</h2>
          <p>Toplanan veriler yalnızca aşağıdaki amaçlarla kullanılmaktadır:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Çeviri hizmeti taleplerine yanıt vermek</li>
            <li>Teklif hazırlamak</li>
            <li>Müşteri iletişimini sağlamak</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8">4. Verilerin Paylaşılması</h2>
          <p>Kişisel verileriniz üçüncü kişilerle paylaşılmamaktadır. Yasal zorunluluklar dışında verileriniz hiçbir kurum veya kuruluşa aktarılmamaktadır.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">5. Verilerin Saklanması</h2>
          <p>Kişisel verileriniz, işleme amacının gerekli kıldığı süre boyunca saklanmaktadır. Bu sürenin sonunda verileriniz güvenli bir şekilde silinmektedir.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">6. Çerezler</h2>
          <p>Web sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. Detaylı bilgi için <a href="/cerez-politikasi" className="text-primary hover:underline">Çerez Politikası</a> sayfamızı inceleyebilirsiniz.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">7. Haklarınız</h2>
          <p>6698 sayılı KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
            <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
            <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde bunların düzeltilmesini isteme</li>
            <li>KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8">8. İletişim</h2>
          <p>Gizlilik politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz:</p>
          <p>E-posta: <a href="mailto:info@mazzgord.com" className="text-primary hover:underline">info@mazzgord.com</a></p>
          <p>Telefon: +90 538 629 50 40</p>
        </div>
      </div>
    </div>
  );
}

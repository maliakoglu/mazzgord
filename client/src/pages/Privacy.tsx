import Navbar from "@/components/home/Navbar";
import { useState } from "react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">

      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Gizlilik Politikası</h1>
        <div className="prose prose-lg max-w-none text-foreground space-y-6">
          <p className="text-muted-foreground">Son güncelleme: 23 Mayıs 2026</p>

          <h2 className="text-2xl font-bold text-primary mt-8">1. Genel</h2>
          <p>Kişisel verilerinizin güvenliğine önem veriyorum. Bu gizlilik politikası, web sitemi (mazzgord.com) ziyaret ettiğinizde topladığım bilgileri ve bu bilgileri nasıl kullandığımı açıklamaktadır.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">2. Toplanan Veriler</h2>
          <p>Teklif formu ve iletişim kanalları aracılığıyla aşağıdaki kişisel verileri topluyorum:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ad Soyad</li>
            <li>E-posta adresi</li>
            <li>Telefon numarası</li>
            <li>Belge türü, dil yönü, sayfa sayısı</li>
            <li>Noter ve apostil ihtiyacı bilgisi</li>
            <li>Teslim tarihi ve teslim yöntemi</li>
            <li>Yüklenen belge/dosya (opsiyonel)</li>
            <li>Mesaj içeriği</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8">3. Verilerin Kullanım Amacı</h2>
          <p>Toplanan veriler yalnızca aşağıdaki amaçlarla kullanılmaktadır:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Çeviri hizmeti taleplerine yanıt vermek</li>
            <li>Teklif hazırlamak</li>
            <li>Müşteri iletişimini sağlamak</li>
            <li>Sipariş ve teslimat sürecini yönetmek</li>
          </ul>

          <h2 className="text-2xl font-bold text-primary mt-8">4. Verilerin Paylaşılması</h2>
          <p>Kişisel verileriniz üçüncü kişilerle paylaşılmamaktadır. Yasal zorunluluklar dışında verileriniz hiçbir kurum veya kuruluşa aktarılmamaktadır. Belgeniz, çeviri üretimi dışında hiçbir yapay zekâ veya çevrim içi araca gönderilmez.</p>
          <p>Hizmet sunumu için aşağıdaki üçüncü taraf hizmetleri kullanılmaktadır:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Web3Forms</strong> — Teklif taleplerinin işletmeye e-posta olarak iletilmesi</li>
            <li><strong>Resend</strong> — Müşteriye teklif onayı ve durum bildirimi e-postalarının gönderilmesi</li>
            <li><strong>WhatsApp</strong> — İletişim ve teklif takip kanalı olarak kullanılır</li>
            <li><strong>Cloudflare</strong> — Web sitesi barındırma, güvenlik ve dosya depolama (R2)</li>
          </ul>
          <p>Noter onayı, apostil ve kargo işlemleri için belgeniz ilgili kurumlara (noter, valilik/kaymakamlık, kargo firması) fiziksel veya dijital olarak iletilir. Bu aktarım yalnızca sizin onayınız ile ve hizmetin gereği olarak yapılır.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">5. Verilerin Saklanması</h2>
          <p>Kişisel verileriniz, işleme amacının gerekli kıldığı süre boyunca saklanmaktadır. Yüklenen belgeler güvenli bulut depolamada 90 gün saklanır ve bu sürenin sonunda otomatik olarak silinir. Belge saklama süresi talep üzerine uzatılabilir.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">6. Çerezler</h2>
          
          <div className="bg-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Reklam ve Google AdSense</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Mazzgord.com, Google AdSense reklam hizmetini kullanmaktadır. Google AdSense,
              size ilgi alanlarınıza göre reklamlar göstermek için çerezler kullanır.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Detaylı bilgi: <a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline" target="_blank">Google Reklam ve Gizlilik</a>
            </p>
          </div>

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
          <p>Gizlilik politikamızla ilgili sorularınız için benimle iletişime geçebilirsiniz:</p>
          <p>E-posta: <a href="mailto:info@mazzgord.com" className="text-primary hover:underline">info@mazzgord.com</a></p>
          <p>Telefon: +90 538 629 50 40</p>
          <p>Veri Sorumlusu: Mehmet Akoğlu (Mazzgord)</p>
        </div>
      </div>
    </div>
  );
}

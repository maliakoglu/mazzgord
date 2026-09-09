import Navbar from "@/components/home/Navbar";
import { useState } from "react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Kullanım Koşulları</h1>
        <div className="prose prose-lg max-w-none text-foreground space-y-6">
          <p className="text-muted-foreground">Son güncelleme: 23 Mayıs 2026</p>

          <h2 className="text-2xl font-bold text-primary mt-8">1. Kabul</h2>
          <p>mazzgord.com web sitesini kullanarak bu kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız, web sitemizi kullanmayınız.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">2. Hizmet Tanımı</h2>
          <p>Mazzgord, İngilizce-Türkçe yeminli tercüme hizmeti verir. Yeminli tercüme, pasaport/diploma/vize çevirisi ve teknik/akademik çeviri hizmetleri sunulmaktadır.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">3. Teklif ve Sözleşme</h2>
          <p>Web sitemiz üzerinden yapılan talepler, kesin sözleşme yerine teklif niteliğindedir. Çeviri hizmeti sözleşmesi, her iki tarafın mutabık kalması ve ödeme onayı sonrasında geçerli olur.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">4. Fiyatlandırma</h2>
          <p>Çeviri ücretleri, belgenin karakter sayısı, dili, konusu ve teslim süresine göre belirlenir. Web sitemizde belirtilen fiyatlar bilgilendirme amaçlıdır ve kesin fiyat teklifi yerine geçmez.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">5. Teslimat</h2>
          <p>Çeviri teslim tarihi, sözleşme aşamasında kararlaştırılır. Müşterinin kaynak belgeyi geç göndermesi veya ek taleplerde bulunması durumunda teslim tarihi yeniden belirlenebilir.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">6. Gizlilik</h2>
          <p>Müşterilerimize ait tüm belgeler ve kişisel bilgiler gizli tutulmaktadır. Belgeler 90 gün güvenle saklanır ve bu sürenin sonunda otomatik olarak silinir. Detaylı bilgi için <a href="/gizlilik" className="text-primary hover:underline">Gizlilik Politikası</a> sayfamızı inceleyebilirsiniz.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">7. Telif Hakkı</h2>
          <p>Çeviri hizmeti sonucunda üretilen içerik, ödeme tamamlandığında müşteriye devredilir. Ödeme yapılmadan önce tüm çeviri içerikleri telif hakkı kapsamındadır.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">8. Sorumluluk Sınırı</h2>
          <p>Çeviri doğruluğu konusunda azami özen gösterilir; ancak kaynak belgedeki hatalardan veya belgenin orijinal içeriğinden kaynaklanan sorunlardan sorumluluk kabul edilmez.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">9. İptal ve İade</h2>
          <p>Çeviri işlemi başlamadan önce iptal talebinde bulunulabilir. İşlem başladıktan sonra iptal durumunda, tamamlanan kısım için ücret tahsil edilir.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">10. Değişiklikler</h2>
          <p>Bu kullanım koşulları önceden bildirimde bulunmaksızın değiştirilebilir.</p>

          <h2 className="text-2xl font-bold text-primary mt-8">11. İletişim</h2>
          <p>Kullanım koşullarıyla ilgili sorularınız için:</p>
          <p>E-posta: <a href="mailto:info@mazzgord.com" className="text-primary hover:underline">info@mazzgord.com</a></p>
          <p>Telefon: +90 538 629 50 40</p>
        </div>
      </div>
    </div>
  );
}

import { ArrowLeft } from "lucide-react"
import { useState } from "react";

export default function Terms() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
          <div className="hidden md:flex gap-8">
            <a href="/fiyatlar" className="text-foreground hover:text-primary transition">Fiyatlar</a>
            <a href="/blog" className="text-foreground hover:text-primary transition">Blog</a>
            <a href="/hakkimizda" className="text-foreground hover:text-primary transition">Hakkımda</a>
            <a href="/teklif" className="bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium hover:bg-primary/90 transition no-underline">Teklif Al</a>
          </div>
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none z-60"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}></span>
          </button>
          {mobileOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setMobileOpen(false)}
              ></div>
              <div className="fixed top-0 right-0 w-72 h-full bg-background z-50 shadow-2xl p-8 pt-24 flex flex-col gap-2 md:hidden">
                <a href="/fiyatlar" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Fiyatlar</a>
                <a href="/blog" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Blog</a>
                <a href="/hakkimizda" className="block px-4 py-3 text-foreground hover:bg-accent rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Hakkımda</a>
                <a href="/teklif" className="block px-4 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 rounded-lg text-lg no-underline transition" onClick={() => setMobileOpen(false)}>Teklif Al</a>
              </div>
            </>
          )}
        </div>
      </nav>
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
          <p>Müşterilerimize ait tüm belgeler ve kişisel bilgiler gizli tutulmaktadır. Detaylı bilgi için <a href="/gizlilik" className="text-primary hover:underline">Gizlilik Politikası</a> sayfamızı inceleyebilirsiniz.</p>

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

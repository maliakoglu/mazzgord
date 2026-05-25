import { ArrowLeft } from "lucide-react";
export default function BlogVizeCeviri() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Blog</a>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-4">İngiltere Vize Başvurusu İçin Çeviri Rehberi</h1>
        <p className="text-muted-foreground mb-8">10 Mayıs 2026 · Mazzgord Çeviri Hizmetleri</p>
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-muted-foreground leading-relaxed">İngiltere vize başvurusu, dikkat ve özen gerektiren bir süreçtir. Başvuru dosyanızdaki belgelerin çevirisi, konsolosluğun istediği formata ve standartlara uygun olmalıdır. Bu rehberde İngiltere vize başvurusu için çeviri sürecini adım adım açıklıyoruz.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">İngiltere Vize Başvurusunda Çeviri Gereksinimleri</h2>
          <p className="text-muted-foreground leading-relaxed">İngiltere konsolosluğu, Türkçe belgelerin İngilizceye yeminli tercüme ile çevrilmesini zorunlu kılar. Çevirinin her sayfası yeminli tercümanın imzasını ve kaşesini taşımalıdır. Ayrıca çevirmenin iletişim bilgileri ve yeminli tercümanlık sicil numarası da belirtilmelidir.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">Hangi Belgelerin Çevirisi Gerekir?</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Pasaport (kimlik bilgileri sayfası)</li>
            <li>Nüfus cüzdanı</li>
            <li>Evlilik cüzdanı (eşli başvurularda)</li>
            <li>Banka hesap dokümanları</li>
            <li>Tapu ve mülkiyet belgeleri</li>
            <li>Çalışma belgesi ve maaş bordrosu</li>
            <li>Vergi levhası (şirket sahipleri için)</li>
            <li>İmza sirküleri (şirket sahipleri için)</li>
          </ul>
          <h2 className="text-2xl font-bold text-primary mt-8">Çeviri Sürecinde Dikkat Edilmesi Gerekenler</h2>
          <p className="text-muted-foreground leading-relaxed">Çeviri sürecinde en önemli nokta, belgelerin eksiksiz ve doğru çevrilmesidir. Tarihler, tutarlar, isimler ve unvanlar kaynak belgeyle birebir uyumlu olmalıdır. Herhangi bir tutarsızlık başvurunun reddedilmesine neden olabilir.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">Denizli'de Vize Çeviri Hizmeti</h2>
          <p className="text-muted-foreground leading-relaxed">Mazzgord olarak İngiltere vize başvuruları için yeminli çeviri hizmeti sunuyoruz. WhatsApp üzerinden ücretsiz fiyat teklifi alabilirsiniz.</p>
        </div>
      </div>
    </div>
  );
}

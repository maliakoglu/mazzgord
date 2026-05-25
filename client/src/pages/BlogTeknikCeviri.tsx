import { ArrowLeft } from "lucide-react";
export default function BlogTeknikCeviri() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Blog</a>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-4">Teknik Çeviride Dikkat Edilmesi Gereken 5 Önemli Nokta</h1>
        <p className="text-muted-foreground mb-8">5 Mayıs 2026 · Mazzgord Çeviri Hizmetleri</p>
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-muted-foreground leading-relaxed">Teknik çeviri, diğer çeviri türlerine göre çok daha fazla özen ve uzmanlık gerektirir. Bir kullanım kılavuzundaki yanlış çeviri, cihazın yanlış kullanılmasına ve güvenlik risklerine neden olabilir. İşte teknik çeviride dikkat edilmesi gereken 5 önemli nokta.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">1. Terminoloji Tutarlılığı</h2>
          <p className="text-muted-foreground leading-relaxed">Teknik belgelerde aynı terim her zaman aynı şekilde çevrilmelidir. Örneğin bir belgede "valve" kelimesi "vana" olarak çevrildiyse, belgenin tamamında aynı çeviri kullanılmalıdır. Terminoloji tutarsızlığı, okuyucunun kafasını karıştırır ve belgenin güvenilirliğini zedeler.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">2. Sektör Bilgisi</h2>
          <p className="text-muted-foreground leading-relaxed">Teknik çevirmen, çevirdiği belgenin sektörüne hakim olmalıdır. Otomotiv, enerji, bilişim ve inşaat gibi sektörlerin kendine özgü terminolojisi vardır. Sektör bilgisi olmayan bir çevirmen, teknik terimleri yanlış çevirebilir.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">3. Kaynak Belgeye Sadakat</h2>
          <p className="text-muted-foreground leading-relaxed">Teknik çeviride yaratıcılık değil, doğruluk esastır. Kaynak belgedeki her bilgi, sayı ve teknik detay birebir aktarılmalıdır. Hiçbir bilgi eklenmemeli veya çıkarılmamalıdır.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">4. Biçimsel Uygunluk</h2>
          <p className="text-muted-foreground leading-relaxed">Teknik belgeler genellikle belirli bir formata sahiptir. Çeviri de bu formata uygun olmalıdır. Tablolar, şekiller ve numaralandırma kaynak belgeyle uyumlu olmalıdır.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">5. Kalite Kontrol</h2>
          <p className="text-muted-foreground leading-relaxed">Teknik çeviriler mutlaka ikinci bir uzman tarafından kontrol edilmelidir. Mazzgord olarak her teknik çeviriyi çift kontrol sürecinden geçiriyoruz.</p>
        </div>
      </div>
    </div>
  );
}

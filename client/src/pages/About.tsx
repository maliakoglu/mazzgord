import { ArrowLeft, CheckCircle2, Users, Globe, Award } from "lucide-react";

export default function About() {
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
        <h1 className="text-4xl font-bold text-primary mb-8">Hakkımızda</h1>
        <div className="space-y-8">
          <div className="bg-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Biz Kimiz?</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">Mazzgord, Denizli merkezli profesyonel çeviri ve yeminli tercüme hizmetleri sunan bir çeviri ofisidir. İngilizce-Türkçe dil çiftinde uzmanlaşmış ekibimizle, bireysel ve kurumsal müşterilerimize yüksek kaliteli çeviri çözümleri sunmaktayız.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
              <Award className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Kalite Güvencesi</h3>
                <p className="text-muted-foreground">Her çeviri, titizlikle kontrol edilir ve en yüksek doğruluk standartlarına uygun olarak teslim edilir.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
              <Users className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Deneyimli Ekip</h3>
                <p className="text-muted-foreground">Yeminli tercümanlarımız ve uzman çevirmenlerimizle profesyonel hizmet sunuyoruz.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
              <Globe className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">Uluslararası Standartlar</h3>
                <p className="text-muted-foreground">Vize başvuruları, göçmenlik dosyaları ve resmi belgeler için uluslararası standartlara uygun çeviri.</p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-card rounded-xl border border-border">
              <CheckCircle2 className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-bold text-lg mb-2">7/24 Erişim</h3>
                <p className="text-muted-foreground">WhatsApp üzerinden 7 gün 24 saat bize ulaşabilir, teklif alabilirsiniz.</p>
              </div>
            </div>
          </div>
          <div className="bg-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Misyonumuz</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">Dil engellerini ortadan kaldırmak ve müşterilerimizin resmi işlemlerinde yanlarında olmak en büyük misyonumuz. Her projede doğruluk, gizlilik ve zamanında teslimat ilkesiyle çalışıyoruz.</p>
          </div>
          <div className="bg-secondary/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">İletişim</h2>
            <div className="space-y-3 text-muted-foreground text-lg">
              <p>📍 Konum: Denizli, Türkiye</p>
              <p>📞 Telefon: <a href="tel:+905386295040" className="text-primary hover:underline">+90 538 629 50 40</a></p>
              <p>📧 E-posta: <a href="mailto:info@mazzgord.com" className="text-primary hover:underline">info@mazzgord.com</a></p>
              <p>💬 WhatsApp: <a href="https://wa.me/905386295040" target="_blank" className="text-primary hover:underline">Mesaj Gönder</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

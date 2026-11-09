import { CheckCircle2, Shield, Clock, FileText, Globe, MapPin } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { track } from "@/lib/analytics";
import { useState, useEffect } from "react";

export default function DenizliApostilTercume() {
  useEffect(() => {
    track.servicePageView("apostil");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Breadcrumb items={[{label: "Hizmetler", href: "/"}, {label: "Denizli Apostil Tercüme"}]} />

        <h1 className="text-4xl font-bold text-primary mb-4">Denizli'de Apostil Tercüme Süreci: Valilik, Çeviri ve Teslim Adımları</h1>
        <p className="text-xl text-muted-foreground mb-8">Denizli Valiliği ve kaymakamlıklardan apostil tasdiki almak için gereken yeminli çeviri süreci, belge türleri ve pratik adımlar. Denizli merkezli yeminli tercüman olarak süreci baştan sona takip ediyorum.</p>
        <p className="text-sm text-muted-foreground mb-8">Son güncelleme: Kasım 2026</p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><MapPin className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Denizli Valiliği</h3><p className="text-muted-foreground text-sm">Apostil tasdiki Denizli Valiliği veya ilgili kaymakamlık tarafından verilir. Süreci sizin yerinize takip ederim.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Shield className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Yeminli Çeviri</h3><p className="text-muted-foreground text-sm">Belgeniz yeminli tercüman tarafından çevrilir, imzalanır ve kaşelenir. Apostil öncesi çeviri şarttır.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Clock className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Süreç Takibi</h3><p className="text-muted-foreground text-sm">Çeviri, noter onayı ve apostil başvurusu birlikte yönetilir. Kargo ile teslim mümkün.</p></div></div>
        </div>

        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Denizli'de Apostil Süreci Nasıl İşler?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Apostil, bir belgenin Lahey Apostil Sözleşmesi'ne taraf ülkelerde geçerli olduğunu doğrulayan uluslararası bir tasdiktir. Türkiye'de apostil tasdiki valilikler ve kaymakamlıklar tarafından verilir. Denizli'de bu işlem <strong>Denizli Valiliği</strong> üzerinden yürütülür.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Apostil tercüme süreci şöyle çalışır: Önce belgeniz yeminli tercüman tarafından çevrilir ve imzalanır. Ardından çeviri (veya asıl belge) Denizli Valiliği'ne sunularak apostil tasdiki alınır. Bazı belgeler için apostil öncesi noter tasdiki de gerekebilir — hangi belgeniz için ne gerek olduğunu birlikte belirleriz.</p>
          <p className="text-muted-foreground leading-relaxed">Resmi bilgi için: <a href="https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille" className="text-primary hover:underline" target="_blank" rel="nofollow noopener noreferrer">Lahey Apostil Sözleşmesi (HCCH)</a> ve <a href="https://www.denizli.gov.tr/" className="text-primary hover:underline" target="_blank" rel="nofollow noopener noreferrer">Denizli Valiliği</a>. Başvuru yapacağınız kurumun güncel şartlarını işlem öncesinde kontrol etmeniz gerekir.</p>
        </div>

        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Apostil Gerektiren Durumlar — Temsili Örnekler</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Aşağıdaki senaryolar <strong>temsili örneklerdir</strong> — gerçek müşteri vakalarını temsil etmez. Denizli'de apostil tercüme ihtiyacının nasıl ortaya çıktığını göstermek için örnek olarak verilmiştir.</p>
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-primary mb-2">1. Pamukkale Üniversitesi Mezunu — Yurt Dışı Yüksek Lisans</h3>
              <p className="text-muted-foreground leading-relaxed mb-2"><strong>Durum:</strong> Pamukkale Üniversitesi'nden mezun olan bir öğrenci, Almanya'da yüksek lisans başvurusu için diploma ve transkript çevirisi ister.</p>
              <p className="text-muted-foreground leading-relaxed mb-2"><strong>Süreç:</strong> Diploma ve transkript İngilizceye yeminli çevrilir → imzalanır ve kaşelenir → Denizli Valiliği'ne apostil başvurusu yapılır → apostilli belge teslim edilir.</p>
              <p className="text-muted-foreground leading-relaxed"><strong>Dikkat:</strong> Almanya bazı durumlarda apostil yanında ek tasdik isteyebilir. Başvuru yapacağınız üniversitenin güncel şartlarını kontrol edin.</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-primary mb-2">2. Denizli Tekstil Firması — İhracat Anlaşması</h3>
              <p className="text-muted-foreground leading-relaxed mb-2"><strong>Durum:</strong> Denizli merkezli bir tekstil firması, yurt dışındaki bir partneriyle sözleşme imzalarken imza sirküleri ve vergi levhasının apostilli çevirisini sunmak zorundadır.</p>
              <p className="text-muted-foreground leading-relaxed mb-2"><strong>Süreç:</strong> İmza sirküleri ve vergi levhası İngilizceye çevrilir → noter onayı alınır → Denizli Valiliği'nden apostil tasdiki alınır → sözleşmeye eklenir.</p>
              <p className="text-muted-foreground leading-relaxed"><strong>Dikkat:</strong> Ticaret sicil belgeleri için apostil öncesi Ticaret Sicil Müdürlüğü onayı gerekebilir.</p>
            </div>
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-primary mb-2">3. Denizli'de Evlenen Yabancı Uyruklu — Evlilik Cüzdanı</h3>
              <p className="text-muted-foreground leading-relaxed mb-2"><strong>Durum:</strong> Denizli'de evlenen yabancı uyruklu bir kişi, evlilik cüzdanının apostilli çevirisini kendi ülkesindeki makamlara sunmak ister.</p>
              <p className="text-muted-foreground leading-relaxed mb-2"><strong>Süreç:</strong> Evlilik cüzdanı ilgili ülkenin diline çevrilir → yeminli tercüman imzalar → Denizli Valiliği'nden apostil alınır → belge ülkeye gönderilir.</p>
              <p className="text-muted-foreground leading-relaxed"><strong>Dikkat:</strong> Evlilik cüzdanı için nüfus müdürlüğünden onaylı suret gerekir. Orijinal belge apostil için yeterli olmayabilir.</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Denizli Apostil Tercüme Süreci — Adım Adım</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">1</div>
              <div><h3 className="text-lg font-semibold text-primary mb-2">Belgenizi Gönderin</h3><p className="text-muted-foreground">Belgenizin orijinalini veya noter tasdikli suretini gönderin. Hangi belgelerin apostil gerektirdiğini birlikte belirleriz. WhatsApp veya teklif formu üzerinden ulaşabilirsiniz.</p></div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">2</div>
              <div><h3 className="text-lg font-semibold text-primary mb-2">Yeminli Çeviri</h3><p className="text-muted-foreground">Belgeniz yeminli tercüman tarafından çevrilir, imzalanır ve kaşelenir. Çeviri ücreti sayfa bazında belirlenir.</p></div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">3</div>
              <div><h3 className="text-lg font-semibold text-primary mb-2">Noter Onayı (Gerekirse)</h3><p className="text-muted-foreground">Bazı belgeler için apostil öncesi noter tasdiki gerekir. Hangi belgeler için gerek olduğunu birlikte kontrol ederiz.</p></div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">4</div>
              <div><h3 className="text-lg font-semibold text-primary mb-2">Denizli Valiliği Apostil Başvurusu</h3><p className="text-muted-foreground">Belgeniz Denizli Valiliği veya ilgili kaymakamlığa sunulur. Apostil harcı belge başına ödenir. Süreç valiliğin yoğunluğuna göre değişir.</p></div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">5</div>
              <div><h3 className="text-lg font-semibold text-primary mb-2">Teslim</h3><p className="text-muted-foreground">Apostil tasdikli belgeniz kargo veya dijital olarak teslim edilir. Denizli içinde yüz yüze teslim de mümkündür.</p></div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Apostil Tercüme Yapılan Belgeler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Diploma ve transkript", "Evlilik cüzdanı", "Doğum belgesi", "Adli sicil kaydı", "Mahkeme kararı", "Nüfus kayıt örneği", "Vergi levhası", "İmza sirküleri", "Sağlık raporu", "Yetki belgesi", "Tek sicil belgesi", "Kaymakamlık belgeleri"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Denizli Valiliği apostil için nereye başvururum?</h3>
              <p className="text-muted-foreground">Apostil tasdiki Denizli Valiliği'nden alınır. Kaymakamlık belgeleri için ilgili kaymakamlığa başvurulabilir. Süreci sizin yerinize takip ediyorum — valiliğe gitmenize gerek yok.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Apostil ne kadar sürer?</h3>
              <p className="text-muted-foreground">Valilik veya kaymakamlığın yoğunluğuna göre değişir. Genellikle 2-5 iş günü içinde tamamlanır. Çeviri süresi ayrıca 1-3 iş günü ekler. Acil durumlarda süreç önceliklendirilebilir.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Apostil için orijinal belge mi gerekir?</h3>
              <p className="text-muted-foreground">Evet, apostil için belgenin orijinali veya noter tasdikli sureti gerekir. Fotokopi yeterli değildir. Nüfus kayıt örnekleri için nüfus müdürlüğünden onaylı suret alınmalıdır.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Denizli dışından apostil tercüme alabilir miyim?</h3>
              <p className="text-muted-foreground">Evet. Kargo ile belge gönderimi ve teslimat mümkün. Apostil sürecini sizin yerinize takip ederim. Türkiye'nin her yerinden ve yurt dışından belge gönderebilirsiniz.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Apostil hangi ülkelerde geçerli?</h3>
              <p className="text-muted-foreground">Apostil, <a href="https://www.hcch.net/en/instruments/conventions/specialised-sections/apostille" className="text-primary hover:underline" target="_blank" rel="nofollow noopener noreferrer">Lahey Apostil Sözleşmesi</a>'ne taraf olan tüm ülkelerde geçerlidir. Sözleşmeye taraf olmayan ülkeler için farklı tasdik süreçleri gerekir — hangi ülkeye başvuracağınızı söyleyin, süreci birlikte planlayalım.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Apostil harcı ne kadar?</h3>
              <p className="text-muted-foreground">Apostil harcı belge başına ayrı uygulanır ve valilik/kaymakamlık tarafından belirlenir. Çeviri ücreti ayrıdır. Net maliyet için belgenizi gönderin — ücretsiz teklif veririm.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Apostil ve noter onayı aynı şey mi?</h3>
              <p className="text-muted-foreground">Hayır. Noter onayı, çevirinin noter tarafından tasdik edilmesidir. Apostil ise belgenin yurt dışında geçerli olduğunu doğrulayan uluslararası tasdiktir. Bazı belgeler için her ikisi birden gerekir. Detaylı bilgi: <a href="/blog/apostil-vs-noter-onayli-ceviri" className="text-primary hover:underline">Apostil vs Noter Onaylı Çeviri</a>.</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İlgili Hizmetler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/apostil-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Apostil Tercüme (Genel)</a>
            <a href="/denizli-yeminli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Denizli Yeminli Tercüme</a>
            <a href="/denizli-noter-onayli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Denizli Noter Onaylı Tercüme</a>
            <a href="/denizli-diploma-tercumesi" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Denizli Diploma Tercümesi</a>
            <a href="/fiyatlar" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Fiyatları</a>
            <a href="/blog/apostil-vs-noter-onayli-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Apostil vs Noter Onaylı Çeviri</a>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Denizli Apostil Tercüme Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Belgenizi gönderin, çeviri ve apostil sürecini birlikte yönetelim. Ücretsiz teklif.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Al</a>
            <a href="https://wa.me/905386295040" onClick={() => track.whatsappClick("service_card", "apostil")} target="_blank" rel="nofollow noopener noreferrer" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp'tan Gönderin</a>
          </div>
        </div>
      </div>
    </div>
  );
}

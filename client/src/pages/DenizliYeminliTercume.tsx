import { CheckCircle2, Shield, Clock, Globe } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { track } from "@/lib/analytics";
import { useState, useEffect } from "react";
export default function DenizliYeminliTercume() {
  useEffect(() => {
    track.servicePageView("yeminli_tercume");
  }, []);
    return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Breadcrumb items={[{label: "Hizmetler", href: "/"}, {label: "Denizli Yeminli Tercüme"}]} />
        <h1 className="text-4xl font-bold text-primary mb-4">Denizli Yeminli Tercüman | İngilizce-Türkçe Yeminli Çeviri</h1>
        <p className="text-xl text-muted-foreground mb-8">Denizli merkezli yeminli tercüman. İngilizce-Türkçe resmi belge çevirisi — pasaport, diploma, vize evrakı. Online veya yüz yüze hizmet, aynı gün teslimat seçeneği.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Shield className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Yeminli Tercüman İmzası</h3><p className="text-muted-foreground text-sm">Yeminname vererek çevirinin doğru ve eksiksiz olduğunu taahhüt ederim. İmza ve kaşe dahil.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Clock className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Aynı Gün Teslimat</h3><p className="text-muted-foreground text-sm">Standart belgelerde aynı gün teslimat mümkün. Acil taleplerde öncelikli olarak işleme alırım.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Globe className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Online veya Yüz Yüze</h3><p className="text-muted-foreground text-sm">Denizli'de yüz yüze belge teslimi mümkün. Türkiye'nin her yerinden ve yurt dışından online hizmet.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Denizli'de Yeminli Tercüme Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Yeminli tercüme, yeminli tercüman tarafından yapılan ve resmi belge niteliği taşıyan çeviri işlemidir. Yeminname vererek çevirinin doğru ve eksiksiz olduğunu taahhüt ederim. Bu çeviriler mahkemeler, konsolosluklar, üniversiteler ve diğer resmi kurumlar tarafından kabul edilir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Yeminli tercümanlar, noter huzurunda yemin ederek bu unvanı alır ve yaptıkları çeviriler resmi belge niteliği taşır.</p>
          <p className="text-muted-foreground leading-relaxed">Denizli'de yaşayan veya Denizli'deki kurumlara belge sunacak olanlar için yeminli tercüme, vize, eğitim, göçmenlik ve resmi işlemlerde zorunlu bir adımdır.</p>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Denizli'de Yeminli Tercüme Nasıl İşliyor?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Denizli merkezli yeminli tercüman olarak, Denizli Adliyesi, Denizli Valiliği, Pamukkale Üniversitesi ve diğer yerel kurumlar tarafından kabul edilen yeminli tercümeler hazırlıyorum.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Ancak online hizmet verdiğim için Denizli dışından da müşterilerim var. İstanbul, Ankara, İzmir ve hatta yurt dışından belge gönderen müşterilerim var. Tüm süreci online yürütebilirsiniz — belgenizi WhatsApp ile gönderir, çeviriyi dijital olarak teslim alırsınız.</p>
          <p className="text-muted-foreground leading-relaxed">Denizli'de yüz yüze belge teslimi mümkün; randevu için iletişime geçin. Mesai saatlerinde WhatsApp üzerinden yanıt veririm.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Denizli Yeminli Tercüme Süreci</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">1</div><div><h3 className="text-lg font-semibold text-primary mb-2">Belgenizi Gönderin</h3><p className="text-muted-foreground">Belgenizin fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden iletin. Belgenin dili, sayfa sayısı ve teslim süresi belirlenir.</p></div></div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">2</div><div><h3 className="text-lg font-semibold text-primary mb-2">Teklif Alın</h3><p className="text-muted-foreground">Belgenizi inceledikten sonra net teklif veririm. Teklifi onayladığınızda çeviri süreci başlar.</p></div></div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">3</div><div><h3 className="text-lg font-semibold text-primary mb-2">Çeviri ve İmza</h3><p className="text-muted-foreground">Belgenizi çevirir, imzalar ve kaşelerim. Çeviri yeminli belge niteliği kazanır.</p></div></div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">4</div><div><h3 className="text-lg font-semibold text-primary mb-2">Teslim</h3><p className="text-muted-foreground">Çeviriyi dijital (PDF) olarak veya kargo ile adresinize teslim ederim. Belgeniz resmi kurumlarda kullanılmaya hazırdır.</p></div></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Denizli'de yeminli tercüman nerede bulunur?</h3><p className="text-muted-foreground">Denizli merkezli yeminli tercümanım. Belgenizi online veya WhatsApp üzerinden iletebilir, teslimatınızı dijital veya kargo ile alabilirsiniz. Yüz yüze teslimat için randevu alın.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Denizli dışından belge gönderebilir miyim?</h3><p className="text-muted-foreground">Evet. Online hizmet verdiğim için Türkiye'nin her yerinden ve yurt dışından belge gönderebilirsiniz. Tüm süreci WhatsApp üzerinden yürütüyoruz.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Yeminli tercüme ne kadar sürer?</h3><p className="text-muted-foreground">Standart belgeler için 1-3 iş günü. Acil taleplerde aynı gün teslimat mümkün. Belge türüne göre değişir.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Yeminli tercüme fiyatı ne kadar?</h3><p className="text-muted-foreground">Sayfa başı 450 TL'den başlar. Belge türüne, dile ve teslim süresine göre değişir. Net teklif için belgenizi WhatsApp'tan gönderin.</p></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Denizli'de Hangi Belgeler İçin Yeminli Tercüme Yaptırabilirsiniz?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Resmi Belgeler</h3><p className="text-muted-foreground text-sm">Pasaport, kimlik, nüfus kayıt örneği, adli sicil kaydı, ikametgah, evlilik cüzdanı, doğum belgesi, sürücü belgesi.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Eğitim Belgeleri</h3><p className="text-muted-foreground text-sm">Diploma, transkript, öğrenci belgesi, denklik belgesi, sertifika, kurs bitirme belgesi, referans mektubu.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Vize ve Göçmenlik</h3><p className="text-muted-foreground text-sm">Vize başvuru dilekçesi, davetiye mektubu, banka hesap dökümü, maaş bordrosu, işyeri belgesi, seyahat sağlık sigortası.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Ticari ve Hukuki</h3><p className="text-muted-foreground text-sm">Sözleşme, fatura, şirket ana sözleşmesi, mahkeme kararı, vekaletname, patent başvurusu, ticaret sicil kaydı.</p></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Denizli'de Hizmet Verdiğim Bölgeler</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Denizli merkez ve tüm ilçelerine hizmet veriyorum. Yüz yüze teslimat için randevu oluşturabilir, online süreçle Türkiye'nin her yerinden belge gönderebilirsiniz.</p>
          <div className="flex flex-wrap gap-2">
            {["Pamukkale", "Merkezefendi", "Merkez", "Çardak", "Acıpayam", "Tavas", "Serinhisar", "Çivril", "Honaz", "Sarayköy", "Bozkurt", "Buldan", "Bekilli", "Kale", "Güney", "Babadağ", "Baklan"].map(b => (
              <span key={b} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">{b}</span>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">Ayrıca komşu illerden — Burdur, Aydın, Muğla, Uşak, Isparta — ve yurt dışından online belge kabul ediyorum. Kargo ile teslimat mümkündür.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Denizli Yeminli Tercüme Hakkında Merak Edilenler</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Denizli yeminli tercüman fiyatları ne kadar?</h3><p className="text-muted-foreground">Sayfa başı 450 TL'den başlar. Pasaport, diploma, transkript ve vize belgeleri için net fiyat, belgeyi inceledikten sonra verilir. Acil teslimat ve noter onayı ek ücret gerektirebilir.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Yeminli tercüme ile noter onaylı tercüme arasındaki fark nedir?</h3><p className="text-muted-foreground">Yeminli tercüme, yeminli tercümanın imza ve kaşesiyle resmi belge niteliği kazanır. Noter onaylı tercümede ise çeviri ayrıca noter huzurunda tasdik edilir. Bazı kurumlar yalnızca yeminli tercümeyi, bazıları ek olarak noter onayını şart koşar.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Yeminli tercüme noter onayı gerektirir mi?</h3><p className="text-muted-foreground">Yeminli tercümanın imza ve kaşesi belgeye resmi nitelik kazandırır. Bazı kurumlar ek olarak noter tasdiki ister — noter onaylı tercüme hizmeti de sunuyorum.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Denizli'de aynı gün yeminli tercüme yapılır mı?</h3><p className="text-muted-foreground">Evet. Standart belgelerde (pasaport, diploma, nüfus kayıt örneği) aynı gün teslimat mümkündür. Acil talepler için WhatsApp'tan öncelikli işlem talep edebilirsiniz.</p></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İlgili Hizmetler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/yeminli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Yeminli Tercüme</a>
            <a href="/denizli-noter-onayli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Denizli Noter Onaylı Tercüme</a>
            <a href="/denizli-pasaport-tercumesi" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Denizli Pasaport Tercümesi</a>
            <a href="/denizli-diploma-tercumesi" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Denizli Diploma Tercümesi</a>
            <a href="/fiyatlar" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Fiyatları</a>
            <a href="/teklif" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teklif Al</a>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Denizli Yeminli Tercüme Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Belgenizi gönderin, aynı gün teklif alırım.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Al</a>
            <a href="https://wa.me/905386295040" onClick={() => track.whatsappClick("service_card", "yeminli_tercume")} target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp'tan Gönderin</a>
          </div>
        </div>
      </div>
    </div>
  );
}

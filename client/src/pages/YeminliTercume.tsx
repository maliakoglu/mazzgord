import { CheckCircle2, Shield, Clock, FileText } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { useState } from "react";
export default function YeminliTercume() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Breadcrumb items={[{label: "Hizmetler", href: "/"}, {label: "Yeminli Tercüme"}]} />
        <h1 className="text-4xl font-bold text-primary mb-4">Denizli Yeminli Tercüman | Noter Onaylı Tercüme</h1>
        <p className="text-xl text-muted-foreground mb-8">Ben Mehmet Akoğlu; Denizli merkezli, noter huzurunda yemin etmiş bağımsız İngilizce-Türkçe yeminli tercümanım. Yemin zaptım Denizli 2. Noterliği'nde düzenlenmiştir. Pasaport, diploma, vize ve resmi belgelerinizi çeviriyorum. Belgenizi WhatsApp'tan gönderin — mesai içinde aynı gün net fiyat ve teslim süresi alın.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Shield className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Resmi Geçerlilik</h3><p className="text-muted-foreground text-sm">Yeminli tercüman imzam tüm resmi kurumlarda geçerlidir.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Clock className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Hızlı Teslimat</h3><p className="text-muted-foreground text-sm">Acil talepleriniz için aynı gün teslimat seçeneği var.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><FileText className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Geniş Belge Yelpazesi</h3><p className="text-muted-foreground text-sm">Nüfus cüzdanı, diploma, sabıka kaydı ve daha fazlası.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Yeminli Tercüme Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Yeminli tercüme, noter huzurunda yemin etmiş bir tercümanın yaptığı ve imzasıyla geçerlilik kazanan resmi çeviridir. Yemin zaptım Denizli 2. Noterliği'nde düzenlenmiştir. Yaptığım her çeviri imzalı ve kaşelidir, mahkemeler, konsolosluklar, üniversiteler ve resmi kurumlar tarafından kabul edilir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Pasaport, diploma, adli sicil, vize evrakı gibi belgeleriniz yurt dışı başvurusunda, göçmenlik dosyasında veya üniversite başvurusunda kullanılacaksa yeminli tercüme istenir. Yanlış veya eksik çeviri başvurunun reddedilmesine yol açabilir — bu yüzden her belgeyi bizzat çevirir, teslimden önce isim, tarih, sayı ve kurum adlarını ikinci kez kontrol ederim.</p>
          <p className="text-muted-foreground leading-relaxed">Noter onayı çoğu durumda gerekmez; yeminli tercüman imzası yeterlidir. Ancak bazı kurumlar noter tasdiki veya apostil şart koşabilir — belgenizin kullanılacağı kurumun güncel şartlarını kontrol etmenizi öneririm.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Yeminli Tercüme Yapılan Belgeler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Nüfus cüzdanı çevirisi","Pasaport çevirisi","Diploma ve transkript çevirisi","Sabıka kaydı çevirisi","Evlilik cüzdanı çevirisi","İkametgâh çevirisi","Sürücü belgesi çevirisi","Vergi levhası çevirisi","İmza sirküleri çevirisi","Faaliyet belgesi çevirisi","Sağlık raporu çevirisi","Adli sicil kaydı çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Denizli'de Yeminli Tercüme</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Pamukkale, Denizli merkezli bağımsız yeminli tercümanım. Yemin zaptım Denizli 2. Noterliği'nde düzenlenmiştir; imza ve kaşem resmi kurumlarda geçerlidir. Denizli Adliyesi, Denizli Valiliği, Pamukkale Üniversitesi ve diğer kurumlar tarafından kabul edilen yeminli tercümelerle resmi işlemlerinizi sorunsuz tamamlayabilirsiniz.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Ancak online hizmet verdiğim için Denizli dışından da müşterilerim var. İstanbul, Ankara, İzmir ve hatta yurt dışından belge gönderen müşterilerim var. Tüm süreci online yürütebilirsiniz — belgenizi WhatsApp ile gönderir, çeviriyi dijital olarak teslim alırsınız.</p>
          <p className="text-muted-foreground leading-relaxed">WhatsApp üzerinden ulaşabilir, belgenizin fotoğrafını göndererek net teklif alabilirsiniz. Pzt–Cmt 09:00–18:00 arasında yanıt veririm.</p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
          <h3 className="text-lg font-bold text-primary mb-3">Gerçek Müşteri Deneyimleri</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Yeminli tercüme hizmetinde karşılaştığım gerçek durumları blog yazılarımda paylaşıyorum. İşte bazı örnekler:</p>
          <div className="space-y-3">
            <a href="/blog/arac-ruhsati-cevirisi" className="block p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline">
              <p className="text-foreground font-medium">📄 Araç Ruhsatı Çevirisi</p>
              <p className="text-muted-foreground text-sm mt-1">Taranmış belgede okunmayan alanlar nasıl çözüldü? Certification of Translation beyanı nasıl eklendi? 6 saatte teslim.</p>
            </a>
            <a href="/blog/ingiltere-vize-cevirisi-gercek-vaka" className="block p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline">
              <p className="text-foreground font-medium">📄 İngiltere Vize Başvurusu</p>
              <p className="text-muted-foreground text-sm mt-1">9 belge 3 günde tamamlandı. Belgelerde hata tespiti, certified translation, orijinal belge ve barkod ekleme.</p>
            </a>
            <a href="/blog/dogalgaz-faturasi-cevirisi" className="block p-4 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline">
              <p className="text-foreground font-medium">📄 Doğalgaz Faturası Çevirisi</p>
              <p className="text-muted-foreground text-sm mt-1">sam.gov kaydı için adres kanıtı. Amerikan letter formatına uyarlama, çevirmen sertifikası beyanı.</p>
            </a>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Certified Translation Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Yurt dışındaki kurumlar — özellikle Amerika ve İngiltere — genellikle <strong>certified translation</strong> ister. Bu, tercümanın çevirinin doğru olduğunu beyan ettiği, imzası ve iletişim bilgilerini içeren resmi bir taahhüt metnidir. Ek ücret olmadan eklenir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">İngiltere göçmenlik idaresi genellikle certified translation yeterli görür ve apostil istemez. Amerika'daki sam.gov gibi kurumlar da çevirmen sertifikası beyanı ister. Bu tür beyanlar, yeminli tercüme hizmetinin bir parçasıdır.</p>
          <p className="text-muted-foreground leading-relaxed">Başvuru yapacağınız kurumun güncel şartlarını kontrol etmeniz önemlidir — her kurum farklı gereksinimler isteyebilir.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Yeminli Tercüme Süreci: Adım Adım</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Belge Teslimi</h3>
                <p className="text-muted-foreground">Belgenizin fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden gönderin. Belgenin dili, sayfa sayısı ve teslim süresi belirlenir.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Fiyat Teklifi</h3>
                <p className="text-muted-foreground">Belgenizi inceledikten sonra net teklif veririm. Teklifi onayladığınızda çeviri süreci başlar.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Çeviri ve İmza</h3>
                <p className="text-muted-foreground">Belgenizi çevirir, imzalar ve kaşelerim. Bu adım belgenin yeminli çeviri olarak geçerlilik kazanmasını sağlar.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Teslim</h3>
                <p className="text-muted-foreground">Yeminli çeviri belgeniz dijital olarak veya kargo/kurye ile adresinize teslim edilir. Belge resmi kurumlarda kullanılmaya hazırdır.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Yeminli Tercüme Online Yapılır mı?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Evet, tamamen online yapılır. Belgelerinizi PDF veya fotoğraf olarak WhatsApp veya <a href="/teklif" className="text-primary font-semibold hover:underline">teklif formu</a> üzerinden göndermeniz yeterli. Çeviri tamamlandığında, imzalı ve kaşeli PDF olarak teslim edilir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Fiziksel kopya gerektiğinde kargo ile adresinize gönderilir. Yurt dışında yaşıyorsanız, dijital teslimat en hızlı seçenektir.</p>
          <p className="text-muted-foreground leading-relaxed">Müşterilerim İstanbul, Ankara, İzmir ve yurt dışından belge gönderiyor. Tüm süreci WhatsApp üzerinden yürütüyoruz — belge gönderimi, teklif, çeviri, teslim.</p>
        </div>

        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Yeminli Tercüme Fiyatları 2026</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Yeminli tercüme fiyatı <strong>sayfa başı 450 TL'den</strong> başlar. Fiyat; belgenin diline, sayfa veya karakter sayısına ve konusuna göre belirlenir. Özel içerikli belgelerde (hukuki, teknik, tıbbi) fiyat değişebilir.</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Fiyatı Etkileyen Faktörler</h3>
              <ul className="text-muted-foreground text-sm space-y-1 list-disc pl-4">
                <li>Sayfa sayısı ve metin yoğunluğu</li>
                <li>Belge türü (pasaport, diploma, vukuatlı)</li>
                <li>Teslim süresi (acil = ek ücret)</li>
                <li>Noter onayı gereksinimi</li>
              </ul>
            </div>
            <div className="p-4 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Dahil Olan Hizmetler</h3>
              <ul className="text-muted-foreground text-sm space-y-1 list-disc pl-4">
                <li>Yeminli tercüman imzası ve kaşesi</li>
                <li>Certification of Translation beyanı</li>
                <li>PDF formatında teslim</li>
                <li>Orijinal belge eki (istek üzerine)</li>
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">Noter onayı gerektiren belgelerde, gerçek noter bedeli makbuzla teyit edilir ve çeviri ücretine dahil değildir. Noter işlem/takip bedeli ayrı kalemdir.</p>
          <p className="text-muted-foreground leading-relaxed">Net teklif için belgenizin fotoğrafını WhatsApp'tan gönderin. Belge türünü, noter ve apostil ihtiyacını inceleyip dönüş yapıyorum.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Yeminli tercüme nedir?</h3>
              <p className="text-muted-foreground">Noter huzurunda yemin etmiş tercümanın imzalı ve kaşeli çevirisidir. Yemin zaptım Denizli 2. Noterliği'nde düzenlenmiştir. Yaptığım çeviriler mahkeme, konsolosluk, üniversite ve resmi kurumlarda geçerlidir.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Yeminli tercüme için noter onayı gerekir mi?</h3>
              <p className="text-muted-foreground">Çoğu durumda yeminli tercüman imzası yeterlidir, noter onayı gerekmez. Ancak bazı kurumlar ve ülkeler noter onayını şart koşabilir. Belgenizi sunacağınız kurumun güncel şartlarını kontrol etmenizi öneririm.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Yeminli tercüme ne kadar sürer?</h3>
              <p className="text-muted-foreground">Standart belgeler için çeviri 1-3 iş günü içinde tamamlanır. Acil taleplerde aynı gün teslimat mümkündür.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Yeminli tercüme fiyatları nasıl belirlenir?</h3>
              <p className="text-muted-foreground">Fiyatı belgenin diline, sayfa/karakter sayısına ve belge türüne göre belirlerim. Belgenizin fotoğrafını WhatsApp'tan gönderin; net teklif alırsınız.</p>
            </div>
            <div className="p-5 bg-card rounded-lg border border-border">
              <h3 className="font-bold text-primary mb-2">Denizli'de yeminli tercüman nerede bulunur?</h3>
              <p className="text-muted-foreground">Pamukkale, Denizli merkezli bağımsız yeminli tercümanım. Yemin zaptım Denizli 2. Noterliği'nde düzenlenmiştir. Belgenizi online veya WhatsApp üzerinden iletebilir, teslimatınızı dijital veya kargo ile alabilirsiniz.</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Diğer Hizmetlerim</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/ingilizce-turkce-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce-Türkçe Çeviri</a>
            <a href="/teknik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teknik Çeviri</a>
            <a href="/akademik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Akademik Çeviri</a>
            <a href="/vize-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Vize Çeviri</a>
            <a href="/blog/noter-onayli-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Noter Onaylı Çeviri Rehberi</a>
          <a href="/fiyatlar" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Fiyatları</a>
            <a href="/teklif" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teklif Al</a>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Belgenizi Gönderin, Aynı Gün Net Teklif Alın</h2>
          <p className="mb-2 opacity-90">Bağımsız Tercüman yeminli tercüman. Noter onayı ve apostil takibi dahil.</p>
          <p className="text-sm mb-6 opacity-80">⏱ Pzt–Cmt 09:00–18:00 · 📍 Pamukkale, Denizli</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Formu — Belgenizi Gönderin</a>
            <a href="https://wa.me/905386295040?text=Merhaba,%20belgem%20için%20teklif%20almak%20istiyorum." target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp'tan Hızlı Teklif</a>
          </div>
        </div>
      </div>
    </div>
  );
}

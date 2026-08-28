import { ArrowLeft, CheckCircle2, Settings, Globe, FileCode } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import { useState } from "react";
export default function TeknikCeviri() {
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
        <Breadcrumb items={[{label: "Hizmetler", href: "/hizmetler"}, {label: "Teknik Çeviri"}]} />
        <h1 className="text-4xl font-bold text-primary mb-4">Teknik Çeviri Hizmeti | Denizli</h1>
        <p className="text-xl text-muted-foreground mb-8">İngilizce-Türkçe teknik belge çevirilerinde uzmanlaşmış profesyonel çeviri hizmetleri.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Settings className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Sektör Uzmanlığı</h3><p className="text-muted-foreground text-sm">Teknik terminolojiye hakim yeminli tercüman olarak sektörel doğruluk.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><Globe className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Uluslararası Standartlar</h3><p className="text-muted-foreground text-sm">Tutarlı terminoloji ve teknik doğruluk odaklı süreç.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><FileCode className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Terminoloji Yönetimi</h3><p className="text-muted-foreground text-sm">Tutarlı terminoloji için proje bazlı sözlük tutuyorum.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Teknik Çeviri Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Teknik çeviri, teknik belgelerin bir dilden başka bir dile çevrilmesidir. Mühendislik, bilişim, otomotiv, enerji, inşaat ve üretim gibi sektörlerde kullanılan uzman metinleri kapsar. Teknik çeviri, sektör terminolojisine tam hakimiyet gerektirir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Teknik çeviride en küçük bir hata, cihazların yanlış kullanımına, güvenlik risklerine veya maddi kayıplara neden olabilir. Bu nedenle teknik çeviriler yalnızca konuya hakim uzman çevirmenler tarafından yapılmalıdır.</p>
        </div>

        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
          <h3 className="text-lg font-bold text-primary mb-3">Nasıl Çalışıyoruz?</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">Teknik çeviri, her tercümanın yapabileceği bir alan değildir. Basit teknik belgeleri bizzat ben çeviriyorum. Ancak karmaşık ve yüksek uzmanlık gerektiren teknik belgelerde — örneğin tıbbi cihaz kılavuzları, patent çevirileri, mühendislik raporları — alanında uzman <strong>teknik çevirmenlerle iş birliği</strong> yapıyorum.</p>
          <p className="text-muted-foreground leading-relaxed">Bu sayede hem fiyat hem de kalite açısından en doğru sonucu alırsınız. Belgenizi gönderdiğinizde, hangi yaklaşımın uygun olduğuna birlikte karar veririz.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Teknik Çeviri Yapılan Belgeler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Kullanım kılavuzu çevirisi","Teknik şartname çevirisi","Montaj talimatı çevirisi","Bakım kılavuzu çevirisi","MSDS çevirisi","Patent çevirisi","Mühendislik raporu çevirisi","Yazılım dokümantasyonu çevirisi","API dokümantasyonu çevirisi","Ürün kataloğu çevirisi","Teknik çizim notları çevirisi","Kalite belgesi çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Teknik Çeviri Neden Farklıdır?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Teknik çeviri, genel çeviriden çok farklıdır. Bir edebi metinde çevirmenin ifadede özgürlüğü vardır. Ama teknik çeviride <strong>tercih hakkı sınırlıdır</strong>: "valve" kelimesi "vana" olarak çevrildiyse, belgenin tamamında aynı şekilde kullanılmalıdır. Terminoloji tutarlılığı, teknik çevirinin temelidir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Teknik belgelerde <strong>ölçü birimleri</strong> kritiktir. İngilizce "pound" veya "inch" birimleri Türkçeye çevrilirken metrik sisteme uyarlama gerekebilir. Ancak bazı durumlarda orijinal birim korunur — özellikle uluslararası standartlara atıfta bulunulduğunda.</p>
          <p className="text-muted-foreground leading-relaxed">Hedef kitle de önemlidir. Mühendis için teknik terimler korunabilir, ama son kullanıcı için daha anlaşılır bir dil tercih edilebilir. Belgenizi kime sunacağınız, çeviri yaklaşımını belirler.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Teknik Çeviri Süreci</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">1</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Belge İncelemesi</h3>
                <p className="text-muted-foreground text-sm">Belgenizi incelerim, teknik alanı ve zorluk derecesini belirlerim. Basit bir teknik belge mi yoksa uzmanlık gerektiren karmaşık bir belge mi olduğuna birlikte karar veririz.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">2</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Uygun Yaklaşım Belirleme</h3>
                <p className="text-muted-foreground text-sm">Belge basitse bizzat çeviririm. Karmaşık ve yüksek uzmanlık gerektiren bir belgeyse, alanında uzman teknik çevirmenlerle iş birliği yaparım. Size en uygun ve en doğru yaklaşımı birlikte belirleriz.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">3</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Terminoloji ve Çeviri</h3>
                <p className="text-muted-foreground text-sm">Proje bazlı terminoloji sözlüğü oluşturulur. Çeviri, tutarlı terminoloji ve teknik doğruluk gözetilerek yapılır. Ölçü birimleri, tarihler ve sayılar kaynak belgeyle birebir karşılaştırılır.</p>
              </div>
            </div>
            <div className="flex gap-4 p-5 bg-card rounded-lg border border-border">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">4</div>
              <div>
                <h3 className="text-lg font-semibold text-primary mb-2">Kontrol ve Teslim</h3>
                <p className="text-muted-foreground text-sm">Çeviriyi kaynak metinle karşılaştırarak kontrol ederim. Terminoloji tutarlılığını, ölçü birimlerini ve teknik doğruluğu doğrularım. Sonra size teslim ederim.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Teknik Çeviride Dikkat Edilmesi Gerekenler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-card rounded-xl border border-border"><h3 className="font-bold text-primary mb-2">Terminoloji Tutarlılığı</h3><p className="text-muted-foreground text-sm">Aynı terim belgenin tamamında aynı şekilde çevrilmelidir. Tutarsızlık, okuyucunun kafasını karıştırır ve belgenin güvenilirliğini zedeler.</p></div>
            <div className="p-5 bg-card rounded-xl border border-border"><h3 className="font-bold text-primary mb-2">Güvenlik ve Doğruluk</h3><p className="text-muted-foreground text-sm">Kullanım kılavuzlarında yanlış çeviri güvenlik riski yaratabilir. "Do not open" ifadesinin yanlış çevirisi cihaz hasarına yol açabilir.</p></div>
            <div className="p-5 bg-card rounded-xl border border-border"><h3 className="font-bold text-primary mb-2">Format Uyumluluğu</h3><p className="text-muted-foreground text-sm">Teknik belgeler genellikle tablo, liste ve diyagram içerir. Çevirinin de aynı düzeni koruması gerekir.</p></div>
            <div className="p-5 bg-card rounded-xl border border-border"><h3 className="font-bold text-primary mb-2">Hedef Kitleye Uygun Dil</h3><p className="text-muted-foreground text-sm">Mühendis için teknik terimler korunur, son kullanıcı için daha anlaşılır bir dil tercih edilir.</p></div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Teknik Çeviri Fiyatı 2026</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Teknik çeviri fiyatı, belge türüne ve teknik zorluk derecesine göre belirlenir. Standart belgeler <strong>sayfa başı 350 TL'den</strong> başlar. Karmaşık teknik belgelerde fiyat farklılık gösterebilir.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Fiyatı etkileyen faktörler:</p>
          <ul className="space-y-2 my-4 pl-6 list-disc text-muted-foreground">
            <li><strong>Belge türü:</strong> Kullanım kılavuzu, patent, MSDS gibi farklı belge türleri farklı zorluk derecesine sahiptir.</li>
            <li><strong>Terminoloji yoğunluğu:</strong> Ne kadar çok teknik terim varsa, o kadar fazla dikkat ve zaman gerektirir.</li>
            <li><strong>Format:</strong> Tablo, diyagram ve çizim içeren belgeler daha fazla düzenleme gerektirir.</li>
            <li><strong>Teslim süresi:</strong> Acil teslimat (aynı gün) için ek ücret uygulanabilir.</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed">Net fiyat teklifi için belgenizin fotoğrafını WhatsApp üzerinden gönderin. Belgeyi inceledikten sonra en uygun yaklaşımı ve fiyatı birlikte belirleriz.</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Teknik çeviri nedir?</h3><p className="text-muted-foreground">Teknik çeviri, mühendislik, bilişim, otomotiv gibi sektörlerde kullanılan teknik belgelerin bir dilden başka dile çevrilmesidir. Sektör terminolojisine tam hakimiyet gerektirir.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Teknik çeviri ne kadar sürer?</h3><p className="text-muted-foreground">Belge uzunluğuna ve teknik zorluk derecesine göre değişir. Kısa belgeler 1-2 günde, uzun projeler 3-7 günde teslim edilebilir.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Teknik çeviri online yapılır mı?</h3><p className="text-muted-foreground">Evet, tamamen online yapılır. Belgenizi PDF veya fotoğraf olarak göndermeniz yeterli. Çeviri tamamlandığında dijital olarak teslim edilir.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Karmaşık teknik belgelerde nasıl çalışıyorsunuz?</h3><p className="text-muted-foreground">Basit teknik belgeleri bizzat çeviriyorum. Karmaşık ve yüksek uzmanlık gerektiren belgelerde, alanında uzman teknik çevirmenlerle iş birliği yapıyorum. Belgenizi gönderdiğinizde en uygun yaklaşımı birlikte belirleriz.</p></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İlgili Blog Yazıları</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <a href="/blog/teknik-ceviri-nedir" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teknik Çeviri Nedir?</a>
            <a href="/blog/teknik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teknik Çeviri Rehberi</a>
            <a href="/blog/ceviri-teknolojileri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Teknolojileri</a>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-6">Diğer Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/yeminli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Yeminli Tercüme</a>
            <a href="/ingilizce-turkce-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce-Türkçe Çeviri</a>
            <a href="/akademik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Akademik Çeviri</a>
            <a href="/vize-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Vize Çeviri</a>
          <a href="/fiyatlar" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Fiyatları</a>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Teknik Çeviri Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Teknik belgenizi gönderin, net teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Alın</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

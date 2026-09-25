import { CheckCircle2, GraduationCap, BookOpen, FileText } from "lucide-react";
import Navbar from "@/components/home/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import { track } from "@/lib/analytics";
import { useState, useEffect } from "react";
export default function AkademikCeviri() {
  useEffect(() => {
    track.servicePageView("akademik_ceviri");
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Breadcrumb items={[{label: "Hizmetler", href: "/"}, {label: "Akademik Çeviri"}]} />
        <h1 className="text-4xl font-bold text-primary mb-4">Akademik Çeviri Hizmeti | Denizli</h1>
        <p className="text-xl text-muted-foreground mb-8">İngilizce-Türkçe akademik makale, tez ve bilimsel yayın çevirisi. Üniversite başvuruları için profesyonel çeviri.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><GraduationCap className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Akademik Uzmanlık</h3><p className="text-muted-foreground text-sm">Bilimsel terminolojiye hakim yeminli tercüman olarak doğru çeviri.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><BookOpen className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Yayın Standartları</h3><p className="text-muted-foreground text-sm">Uluslararası akademik yayın standartlarına uygun çeviri.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><FileText className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Geniş Kapsam</h3><p className="text-muted-foreground text-sm">Makale, tez, bildiri ve akademik belge çevirileri.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Akademik Çeviri Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Akademik çeviri, bilimsel makalelerin, tezlerin, bildirilerin ve diğer akademik belgelerin bir dilden başka bir dile çevrilmesidir. Akademik terminolojiye tam hakimiyet ve alan uzmanlığı gerektirir. APA ve MLA gibi atıf stilleri ve bilimsel yazım normlarına uygunluk esastır.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Akademik çeviriler, uluslararası dergilerde yayın yapmak isteyen araştırmacılar, yurt dışı üniversite başvurusu ve denklik sürecindeki öğrenciler ve uluslararası konferanslara katılacak akademisyenler için kritik öneme sahiptir.</p>
          <p className="text-muted-foreground leading-relaxed">Denizli Pamukkale Üniversitesi başta olmak üzere tüm akademik kurumlara yönelik çeviri yapıyorum.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Akademik Çeviri Yapılan Belgeler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Makale çevirisi","Tez ve dissertasyon çevirisi","Bildiri çevirisi","Özet çevirisi","Araştırma raporu çevirisi","Literatür taraması çevirisi","Üniversite başvuru belgesi çevirisi","Transkript çevirisi","Akademik CV çevirisi","Makale revizyonu çevirisi","Kitap bölümü çevirisi","Deney raporu çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Akademik Çeviri Fiyatları 2026</h2>
          <div className="bg-secondary/30 rounded-xl p-8 mb-6">
            <p className="text-muted-foreground leading-relaxed mb-6">Akademik çeviri fiyatları, belgenin türüne, teknik karmaşıklığına ve teslim süresine göre değişir. Aşağıdaki fiyatlar referans niteliğindedir. Net fiyat için belgenizi gönderin, ücretsiz teklif alın.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-3 px-4 font-semibold text-foreground">Belge Türü</th>
                    <th className="py-3 px-4 font-semibold text-foreground">Fiyat Aralığı</th>
                    <th className="py-3 px-4 font-semibold text-foreground">Teslim Süresi</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-3 px-4">Makale çevirisi</td><td className="py-3 px-4">450-600 TL / sayfa</td><td className="py-3 px-4">3-5 iş günü</td></tr>
                  <tr className="border-b border-border"><td className="py-3 px-4">Tez / dissertasyon çevirisi</td><td className="py-3 px-4">450-550 TL / sayfa</td><td className="py-3 px-4">5-10 iş günü</td></tr>
                  <tr className="border-b border-border"><td className="py-3 px-4">Bildiri çevirisi</td><td className="py-3 px-4">450-500 TL / sayfa</td><td className="py-3 px-4">2-4 iş günü</td></tr>
                  <tr className="border-b border-border"><td className="py-3 px-4">Özet (abstract) çevirisi</td><td className="py-3 px-4">150-250 TL</td><td className="py-3 px-4">1-2 iş günü</td></tr>
                  <tr className="border-b border-border"><td className="py-3 px-4">Akademik CV çevirisi</td><td className="py-3 px-4">300-500 TL</td><td className="py-3 px-4">1-2 iş günü</td></tr>
                  <tr><td className="py-3 px-4">Transkript çevirisi</td><td className="py-3 px-4">450 TL / sayfa</td><td className="py-3 px-4">1-3 iş günü</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Fiyatlar İngilizce-Türkçe çeviri için geçerlidir. Acil teslimat için +%50 ücret uygulanır. Noter onayı talep edilirse noter harcı ayrıca tahsil edilir.</p>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Akademik Çeviri Süreci</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div><div><h3 className="font-bold mb-1">Belge Gönderimi</h3><p className="text-muted-foreground text-sm">Belgenizi WhatsApp veya teklif formu üzerinden gönderin. İnceleyip size net fiyat ve teslim süresi bildirelim.</p></div></div>
            <div className="flex gap-4 p-4 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div><div><h3 className="font-bold mb-1">Terminoloji Analizi</h3><p className="text-muted-foreground text-sm">Akademik alana özgü terminoloji belirlenir. Kaynak metindeki atıf formatları (APA, MLA, Chicago) tespit edilir.</p></div></div>
            <div className="flex gap-4 p-4 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div><div><h3 className="font-bold mb-1">Çeviri ve İnceleme</h3><p className="text-muted-foreground text-sm">Çeviri yapılır, akademik üslup ve terminoloji tutarlılığı kontrol edilir. Atıf ve kaynakça formatı korunur.</p></div></div>
            <div className="flex gap-4 p-4 bg-card rounded-lg border border-border"><div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div><div><h3 className="font-bold mb-1">Teslimat</h3><p className="text-muted-foreground text-sm">Çevrilmiş belge Word veya PDF formatında teslim edilir. Noter onayı gerekiyorsa noter işlemleri takip edilir.</p></div></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Akademik Çeviri Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div className="bg-card rounded-lg border border-border p-6"><h3 className="font-bold mb-2">Akademik çeviri için yeminli tercüman şart mı?</h3><p className="text-muted-foreground text-sm">Yurt dışı üniversite başvuruları ve denklik işlemleri için yeminli tercüman tarafından çevrilmiş ve noter onaylı belge gereklidir. Uluslararası dergi yayınları için yeminli onay şart değildir, ancak profesyonel akademik çeviri önerilir.</p></div>
            <div className="bg-card rounded-lg border border-border p-6"><h3 className="font-bold mb-2">Tez çevirisi ne kadar sürer?</h3><p className="text-muted-foreground text-sm">Tez uzunluğuna göre değişir. 50 sayfalık bir tez yaklaşık 5-7 iş gününde çevrilir. Acil ihtiyaçlarda süre kısaltılabilir, ek ücret uygulanır.</p></div>
            <div className="bg-card rounded-lg border border-border p-6"><h3 className="font-bold mb-2">APA ve MLA formatını koruyor musunuz?</h3><p className="text-muted-foreground text-sm">Evet. Kaynak metindeki atıf formatı (APA, MLA, Chicago, Harvard) aynen korunur. Kaynakça ve referanslar titizlikle çevrilir.</p></div>
            <div className="bg-card rounded-lg border border-border p-6"><h3 className="font-bold mb-2">Hangi akademik alanlarda çeviri yapıyorsunuz?</h3><p className="text-muted-foreground text-sm">Sosyal bilimler, eğitim, işletme, hukuk, tıp ve mühendislik alanlarında İngilizce-Türkçe akademik çeviri yapıyorum. Yüksek teknik içerikli çalışmalarda alan uzmanıyla görüşme önerilebilir.</p></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İlgili Blog Yazıları</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <a href="/blog/akademik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Akademik Çeviri Rehberi</a>
            <a href="/blog/teknik-ceviri-nedir" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teknik Çeviri Nedir?</a>
            <a href="/blog/ceviri-hatalari" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Hataları ve Çözümleri</a>
          </div>

          <h2 className="text-2xl font-bold text-primary mb-6">Diğer Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/yeminli-tercume" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Yeminli Tercüme</a>
            <a href="/ingilizce-turkce-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">İngilizce-Türkçe Çeviri</a>
            <a href="/teknik-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Teknik Çeviri</a>
            <a href="/vize-ceviri" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Vize Çeviri</a>
          <a href="/fiyatlar" className="block px-4 py-3 bg-card rounded-lg border border-border hover:border-primary hover:shadow-md transition no-underline text-foreground">Çeviri Fiyatları</a>
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Akademik Çeviri Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Akademik belgenizi gönderin, net teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/teklif" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Al</a>
            <a href="https://wa.me/905386295040" onClick={() => track.whatsappClick("service_card", "akademik_ceviri")} target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

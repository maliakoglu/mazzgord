import { ArrowLeft, CheckCircle2, GraduationCap, BookOpen, FileText } from "lucide-react";
export default function AkademikCeviri() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Ana Sayfa</a>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-4">Akademik Çeviri Hizmeti | Denizli</h1>
        <p className="text-xl text-muted-foreground mb-8">İngilizce-Türkçe akademik makale, tez ve bilimsel yayın çevirisi. Üniversite başvuruları için profesyonel çeviri.</p>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><GraduationCap className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Akademik Uzmanlık</h3><p className="text-muted-foreground text-sm">Bilimsel terminolojiye hakim çevirmenlerimizle doğru çeviri.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><BookOpen className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Yayın Standartları</h3><p className="text-muted-foreground text-sm">Uluslararası akademik yayın standartlarına uygun çeviri.</p></div></div>
          <div className="flex gap-4 p-6 bg-card rounded-xl border border-border"><FileText className="w-8 h-8 text-primary flex-shrink-0" /><div><h3 className="font-bold mb-2">Geniş Kapsam</h3><p className="text-muted-foreground text-sm">Makale, tez, bildiri ve akademik belge çevirileri.</p></div></div>
        </div>
        <div className="bg-secondary/30 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-4">Akademik Çeviri Nedir?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Akademik çeviri, bilimsel makalelerin, tezlerin, bildirilerin ve diğer akademik belgelerin bir dilden başka bir dile çevrilmesidir. Akademik terminolojiye tam hakimiyet ve alan uzmanlığı gerektirir. APA ve MLA gibi atıf stilleri ve bilimsel yazım normlarına uygunluk esastır.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Akademik çeviriler, uluslararası dergilerde yayın yapmak isteyen araştırmacılar, yurt dışı üniversite başvurusu yapacak öğrenciler ve uluslararası konferanslara katılacak akademisyenler için kritik öneme sahiptir.</p>
          <p className="text-muted-foreground leading-relaxed">Mazzgord olarak Denizli Pamukkale Üniversitesi başta olmak üzere tüm akademik kurumlara yönelik çeviri hizmeti sunuyoruz.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Akademik Çeviri Yapılan Belgeler</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {["Makale çevirisi","Tez ve dissertasyon çevirisi","Bildiri çevirisi","Özet çevirisi","Araştırma raporu çevirisi","Literatür taraması çevirisi","Üniversite başvuru belgesi çevirisi","Transkript çevirisi","Akademik CV çevirisi","Makale revizyonu çevirisi","Kitap bölümü çevirisi","Deney raporu çevirisi"].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" /><span className="text-foreground">{item}</span></div>
            ))}
          </div>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Akademik Çeviri Teklifi Alın</h2>
          <p className="mb-6 opacity-90">Akademik belgenizi gönderin, ücretsiz teklif alın.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/" className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg font-medium transition">Teklif Alın</a>
            <a href="https://wa.me/905386295040" target="_blank" className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition">WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  );
}

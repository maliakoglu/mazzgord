import { ArrowLeft } from "lucide-react";
export default function BlogYeminliTercume() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition"><ArrowLeft className="w-5 h-5" /> Blog</a>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-4">Yeminli Tercüme Nedir? Nerelerde Kullanılır?</h1>
        <p className="text-muted-foreground mb-8">15 Mayıs 2026 · Mazzgord Çeviri Hizmetleri</p>
        <div className="prose prose-lg max-w-none space-y-6">
          <p className="text-muted-foreground leading-relaxed">Yeminli tercüme, resmi kurumlarda geçerli olan ve yeminli tercümanlar tarafından yapılan çeviri işlemidir. Türkiye'de yeminli tercümanlık, 6325 sayılı kanun ile düzenlenmiş olup, yeminli tercümanlar noter huzurunda yemin ederek bu unvanı alırlar.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">Yeminli Tercüme Nasıl Yapılır?</h2>
          <p className="text-muted-foreground leading-relaxed">Yeminli tercüme süreci, belgenin teslim alınması ile başlar. Yeminli tercüman, belgeyi dikkatlice inceleyerek çeviriye başlar. Çeviri tamamlandıktan sonra tercüman belgeyi imzalar ve kaşesini basar. Bu imza ve kaşe çevirinin doğruluğunu taahhüt eder. Yeminli tercüme noter onayı gerektirmez.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">Yeminli Tercüme Nerelerde Kullanılır?</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Vize başvuruları (İngiltere, ABD, Schengen ülkeleri)</li>
            <li>Göçmenlik başvuruları</li>
            <li>Üniversite başvuruları</li>
            <li>Mahkeme dosyaları</li>
            <li>Resmi ihaleler</li>
            <li>Şirket kuruluş işlemleri</li>
            <li>Patent başvuruları</li>
          </ul>
          <h2 className="text-2xl font-bold text-primary mt-8">Yeminli Tercüme ile Normal Çeviri Arasındaki Fark</h2>
          <p className="text-muted-foreground leading-relaxed">Normal çeviri herhangi bir çevirmen tarafından yapılabilir ve resmi geçerliliği yoktur. Yeminli tercüme ise yeminli tercüman tarafından yapılır ve resmi kurumlarda geçerlidir. Yeminli tercümede tercümanın imzası ve kaşesi belgenin doğruluğunu garanti eder.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">Denizli'de Yeminli Tercüme</h2>
          <p className="text-muted-foreground leading-relaxed">Mazzgord olarak Denizli'de yeminli tercüme hizmeti sunuyoruz. Tüm resmi kurumlar tarafından kabul edilen yeminli tercümelerimizle işlemlerinizi sorunsuz tamamlayabilirsiniz. WhatsApp üzerinden 7/24 ulaşabilirsiniz.</p>
        </div>
      </div>
    </div>
  );
}

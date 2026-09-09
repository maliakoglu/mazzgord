import Navbar from "@/components/home/Navbar";
import { useState } from "react";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Çerez Politikası</h1>
        <div className="prose prose-lg max-w-none text-foreground space-y-6">
          <p className="text-muted-foreground">Son güncelleme: 23 Mayıs 2026</p>
          <h2 className="text-2xl font-bold text-primary mt-8">1. Çerez Nedir?</h2>
          <p>Çerezler, web sitelerinin tarayıcınız aracılığıyla cihazınıza yerleştirdiği küçük metin dosyalarıdır. Bu dosyalar, siteyi bir sonraki ziyaretinizde sizi tanımak ve daha iyi bir deneyim sunmak için kullanılır.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">2. Kullandığımız Çerezler</h2>
          <h3 className="text-xl font-bold mt-6">Zorunlu Çerezler</h3>
          <p>Bu çerezler, web sitesinin temel işlevlerinin çalışması için gereklidir ve devre dışı bırakılamaz.</p>
          <h3 className="text-xl font-bold mt-6">Analitik Çerezler</h3>
          <p>Google Analytics tarafından kullanılan çerezler, ziyaretçilerin siteyi nasıl kullandığını anlamaya yardımcı olur. Bu veriler anonim olarak toplanır.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>_ga — Google Analytics ziyaretçi takibi (2 yıl)</li>
            <li>_ga_* — Google Analytics oturum durumu (2 yıl)</li>
          </ul>
          <h3 className="text-xl font-bold mt-6">Reklam Çerezleri</h3>
          <p>Google AdSense tarafından kullanılan çerezler, ilgi alanlarınıza göre ilgili reklamlar göstermek için kullanılır.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>__gads — Google AdSense reklam tercihleri (13 ay)</li>
            <li>__gpi — Google AdSense reklam kişiselleştirme (13 ay)</li>
          </ul>
          <h2 className="text-2xl font-bold text-primary mt-8">3. Çerezleri Yönetme</h2>
          <p>Tarayıcı ayarlarınızı değiştirerek çerezleri kontrol edebilir veya devre dışı bırakabilirsiniz. Ancak, bazı çerezleri devre dışı bırakmanız sitenin işlevselliğini etkileyebilir.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">4. Değişiklikler</h2>
          <p>Bu çerez politikası zaman zaman güncellenebilir. Değişiklikler bu sayfada yayımlanır.</p>
          <h2 className="text-2xl font-bold text-primary mt-8">5. İletişim</h2>
          <p>Çerez politikamızla ilgili sorularınız için:</p>
          <p>E-posta: <a href="mailto:info@mazzgord.com" className="text-primary hover:underline">info@mazzgord.com</a></p>
        </div>
      </div>
    </div>
  );
}

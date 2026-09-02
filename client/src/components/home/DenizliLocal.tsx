import { MapPin, Globe, Clock } from "lucide-react";
import { track } from "@/lib/analytics";

export default function DenizliLocal() {
  return (
    <section className="py-20 md:py-32" style={{ backgroundColor: 'var(--color-soft-sand)' }}>
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        <div className="text-center mb-12">
          <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '36px', fontWeight: 700, color: 'var(--color-heading)', letterSpacing: '-0.02em', marginBottom: '16px' }}>
            Denizli'de ve Online Yeminli Tercüme
          </h2>
          <p className="mx-auto" style={{ color: 'var(--color-mid-stone)', fontSize: '16px', lineHeight: 1.63, maxWidth: '680px' }}>
            Denizli merkezli yeminli tercüman olarak, belgelerinizi online veya yüz yüze çeviriyorum. Şehirde yaşıyor olmanız gerekmez — belgenizi WhatsApp veya teklif formundan gönderin, gerisini ben hallederim.
          </p>
        </div>

        <img src="/images/online-translation.webp" alt="Online çalışan yeminli tercümanın belge ve bilgisayar başındaki çalışma ortamı" width={2560} height={1440} className="w-full rounded-2xl mb-12" style={{ maxHeight: "400px", objectFit: "cover" }} loading="lazy" />
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-paper-white)', boxShadow: 'rgba(213, 208, 184, 0.4) 0px 2px 6px 0px' }}>
            <MapPin className="w-8 h-8 flex-shrink-0" style={{ color: 'var(--color-sage)' }} />
            <div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--color-heading)', fontSize: '18px' }}>Denizli Merkez</h3>
              <p style={{ color: 'var(--color-mid-stone)', fontSize: '14px', lineHeight: 1.63 }}>Denizli'de yaşıyorum ve çalışıyorum. Yüz yüze belge teslimi mümkün; randevu için iletişime geçin.</p>
            </div>
          </div>
          <div className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-paper-white)', boxShadow: 'rgba(213, 208, 184, 0.4) 0px 2px 6px 0px' }}>
            <Globe className="w-8 h-8 flex-shrink-0" style={{ color: 'var(--color-sage)' }} />
            <div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--color-heading)', fontSize: '18px' }}>Online Hizmet</h3>
              <p style={{ color: 'var(--color-mid-stone)', fontSize: '14px', lineHeight: 1.63 }}>Türkiye'nin her yerinden ve yurt dışından belge gönderebilirsiniz. Çeviriyi dijital veya kargo ile teslim ederim.</p>
            </div>
          </div>
          <div className="flex gap-4 p-6 rounded-2xl" style={{ backgroundColor: 'var(--color-paper-white)', boxShadow: 'rgba(213, 208, 184, 0.4) 0px 2px 6px 0px' }}>
            <Clock className="w-8 h-8 flex-shrink-0" style={{ color: 'var(--color-sage)' }} />
            <div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--color-heading)', fontSize: '18px' }}>Hızlı Dönüş</h3>
              <p style={{ color: 'var(--color-mid-stone)', fontSize: '14px', lineHeight: 1.63 }}>Belgenizi gönderin, aynı gün içinde teklif veririm. Acil çevirilerde öncelikli olarak işleme alırım.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/teklif" onClick={() => track.servicePageCtaClick("denizli_local")} className="px-8 py-3 rounded-lg font-medium transition no-underline" style={{ backgroundColor: 'var(--color-sage)', color: 'white' }}>
            Teklif Alın
          </a>
          <a href="https://wa.me/905386295040" target="_blank" rel="noopener noreferrer" onClick={() => track.whatsappClick("denizli_local")} className="px-8 py-3 rounded-lg font-medium transition" style={{ backgroundColor: '#22C55E', color: 'white' }}>
            WhatsApp ile Ulaşın
          </a>
        </div>
      </div>
    </section>
  );
}

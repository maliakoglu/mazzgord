import { CheckCircle2, Shield, Stamp, Clock } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32 bg-background parallax-section">
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '36px', fontWeight: 700, marginBottom: '32px', color: 'var(--color-heading)', letterSpacing: '-0.02em', lineHeight: 1.31 }}>Neden Benimle Çalışmalısınız?</h2>
            <div className="space-y-6">
              {[
                "Noter yeminli tercüman olarak resmi belgeler için yasal geçerlilik",
                "Her işi bizzat ben yapıyorum; başkasına devretmiyorum",
                "Belgenizi inceler, net teklif veririm; sürpriz fiyat yok",
                "Gizlilik esastır; belgeleriniz 90 gün güvenle saklanır, sonra otomatik silinir",
                "Teslim öncesi isim, tarih, sayı ve kurum adları ikinci kez kontrol edilir",
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--color-sage)' }} />
                  <p style={{ color: 'var(--color-ink-black)', fontSize: '16px', lineHeight: 1.5 }}>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-soft-sand)', borderRadius: '24px', padding: '40px' }}>
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full" style={{ backgroundColor: 'var(--color-sage)', opacity: 0.15 }}>
                <Shield className="w-10 h-10" style={{ color: 'var(--color-sage)' }} />
              </div>
              <div>
                <h3 style={{ fontFamily: '"Libre Baskerville", serif', fontSize: '22px', fontWeight: 700, color: 'var(--color-heading)', marginBottom: '8px' }}>Noter Yeminli Tercüman</h3>
                <p style={{ color: 'var(--color-mid-stone)', fontSize: '15px', lineHeight: 1.6, maxWidth: '280px', margin: '0 auto' }}>
                  Noter huzurunda yemin etmiş bağımsız tercüman. Yemin zaptım Denizli 2. Noterliği'nde düzenlenmiştir. Resmi belgeleriniz yasal geçerliliğe sahip, imzalı ve kaşeli çeviridir.
                </p>
              </div>
              <div className="flex items-center justify-center gap-6 pt-4" style={{ borderTop: '1px solid var(--color-lavender-mist)' }}>
                <div className="flex items-center gap-2">
                  <Stamp className="w-5 h-5" style={{ color: 'var(--color-sage)' }} />
                  <span style={{ fontSize: '14px', color: 'var(--color-ink-black)' }}>İmza & Kaşe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" style={{ color: 'var(--color-sage)' }} />
                  <span style={{ fontSize: '14px', color: 'var(--color-ink-black)' }}>Hızlı Teslim</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

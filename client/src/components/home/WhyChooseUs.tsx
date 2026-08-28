import { CheckCircle2, Globe } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32 bg-background parallax-section">
      <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '36px', fontWeight: 700, marginBottom: '32px', color: 'var(--color-ink-black)', letterSpacing: '-0.02em', lineHeight: 1.31 }}>Neden Benimle Çalışmalısınız?</h2>
            <div className="space-y-6">
              {[
                "Noter yeminli tercüman olarak resmi belgeler için yasal geçerlilik",
                "Her işi bizzat ben yapıyorum; başkasına devretmiyorum",
                "Belgenizi inceler, net teklif veririm; sürpriz fiyat yok",
                "Gizlilik esastır; belgeleriniz güvenle saklanır ve iş bitince silinir",
                "Teslim öncesi isim, tarih, sayı ve kurum adları ikinci kez kontrol edilir",
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--color-editorial-teal)' }} />
                  <p style={{ color: 'var(--color-ink-black)', fontSize: '16px', lineHeight: 1.5 }}>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg h-96 flex items-center justify-center" style={{ backgroundColor: 'var(--color-soft-sand)', borderRadius: '24px' }}>
            <div className="text-center">
              <Globe className="w-24 h-24 mx-auto mb-4" style={{ color: 'var(--color-sandstone)' }} />
              <p style={{ color: 'var(--color-warm-gray)', fontSize: '16px', lineHeight: 1.5 }}>İngilizce-Türkçe Yeminli Tercüme</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

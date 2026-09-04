import { CheckCircle2, Globe } from "lucide-react";

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
                "Gizlilik esastır; belgeleriniz güvenle saklanır ve iş bitince silinir",
                "Teslim öncesi isim, tarih, sayı ve kurum adları ikinci kez kontrol edilir",
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-1" style={{ color: 'var(--color-sage)' }} />
                  <p style={{ color: 'var(--color-ink-black)', fontSize: '16px', lineHeight: 1.5 }}>{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg flex items-center justify-center hidden md:flex" style={{ backgroundColor: 'var(--color-soft-sand)', borderRadius: '24px', padding: '40px' }}>
            <iframe
              src="https://a.impactradius-go.com/gen-ad-code/4677196/3976191/54446/"
              width="100%"
              height="250"
              scrolling="no"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 'none', maxWidth: '300px', width: '100%', height: '250px' }}
              title="Reklam"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

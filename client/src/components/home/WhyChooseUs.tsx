import { CheckCircle2, Globe } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Neden Benimle Çalışmalısınız?</h2>
            <div className="space-y-6">
              {[
                "Noter yeminli tercüman olarak resmi belgeler için yasal geçerlilik",
                "Her işi bizzat ben yapıyorum; başkasına devretmiyorum",
                "Belgenizi inceler, net teklif veririm; sürpriz fiyat yok",
                "Gizlilik esastır; belgeleriniz güvenle saklanır ve iş bitince silinir",
                "Teslim öncesi isim, tarih, sayı ve kurum adları ikinci kez kontrol edilir",
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <p className="text-lg text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-12 h-96 flex items-center justify-center">
            <div className="text-center">
              <Globe className="w-24 h-24 text-primary mx-auto mb-4 opacity-50" />
              <p className="text-muted-foreground text-lg">İngilizce-Türkçe Yeminli Tercüme</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

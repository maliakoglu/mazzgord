export default function Process() {
  const steps = [
    {
      num: "1",
      title: "Belgenizi Gönderin",
      desc: "Belgenizin net fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden iletin.",
    },
    {
      num: "2",
      title: "İnceleme ve Teklif",
      desc: "Belge türünü, dil yönünü, noter ve apostil ihtiyacını inceleyip net fiyat ve teslim süresi veriyorum.",
    },
    {
      num: "3",
      title: "Onay ve Ödeme",
      desc: "Teklifi onayladığınızda ödeme bilgileri gönderilir. Online ödeme veya havale seçeneği mevcut.",
    },
    {
      num: "4",
      title: "Çeviri ve Kontrol",
      desc: "Çeviriyi hazırlayıp isim, tarih, sayı ve kurum adlarını ikinci kez kontrol ediyorum.",
    },
    {
      num: "5",
      title: "Teslim",
      desc: "Çeviri dijital olarak e-posta/WhatsApp ile veya kargo ile adresinize teslim edilir.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Nasıl Çalışıyorum?</h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
          Belgenizi göndermekten teslim almaya kadar beş adımda tamamlanır.
        </p>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

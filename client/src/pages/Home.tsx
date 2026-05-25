import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, ArrowRight, CheckCircle2, Globe, FileText, Users } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [cookieConsent, setCookieConsent] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cookieConsent") === "true";
    }
    return false;
  });

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setCookieConsent(true);
  };
  const [gallery, setGallery] = useState<{open: boolean, images: string[], current: number}>({open: false, images: [], current: 0});

  const openGallery = (images: string[], startIndex: number = 0) => {
    setGallery({open: true, images, current: startIndex});
  };

  const closeGallery = () => {
    setGallery({open: false, images: [], current: 0});
  };

  const nextImage = () => {
    setGallery(prev => ({...prev, current: (prev.current + 1) % prev.images.length}));
  };

  const prevImage = () => {
    setGallery(prev => ({...prev, current: (prev.current - 1 + prev.images.length) % prev.images.length}));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, access_key: "bcd1bf4b-064e-4e56-83f7-5dc9aaf5d74c" }),
      });
      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Mazzgord</div>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-foreground hover:text-primary transition">Hizmetler</a>
            <a href="/blog" className="text-foreground hover:text-primary transition">Blog</a>
            <a href="#contact" className="text-foreground hover:text-primary transition">İletişim</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Profesyonel Çeviri Hizmetleri
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95">
              İngilizce-Türkçe yeminli tercüme ve uzmanlaşmış çeviri çözümleri
            </p>
            <div className="flex gap-4">
              <Button 
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Teklif Alın <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg"
                onClick={() => window.open("https://bionluk.com/mehmetakoglu20/Ingilizce-Turkce-belge-evrak-ve-sertifika-cevirisi-yaparim-768554", "_blank")}
              >
                Daha Fazla Bilgi
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Hizmetlerimiz</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
            Yeminli tercüman olarak, hukuki, teknik ve akademik çeviriler konusunda uzmanlaşmış hizmetler sunuyorum.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Yeminli Tercüme",
                description: "Resmi belgeler, vize başvuruları ve hukuki dokümanlara yönelik profesyonel çeviri hizmetleri.",
              },
              {
                icon: Globe,
                title: "Teknik Çeviri",
                description: "Yazılım, mühendislik ve teknoloji sektörüne özel teknik terimler ve dokümantasyon çevirisi.",
              },
              {
                icon: Users,
                title: "Akademik Çeviri",
                description: "Tez, makale ve araştırma dokümanlara yönelik akademik standartlara uygun çeviri hizmetleri.",
              },
            ].map((service, idx) => (
              <Card key={idx} className="p-8 hover:shadow-lg hover:scale-105 transition-all duration-300 border-border cursor-pointer">
                <service.icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Hizmet Sayfaları */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: "Yeminli Tercüme", link: "/yeminli-tercume" },
              { title: "Teknik Çeviri", link: "/teknik-ceviri" },
              { title: "Akademik Çeviri", link: "/akademik-ceviri" },
              { title: "Vize Başvurusu Çevirisi", link: "/vize-ceviri" },
              { title: "İngilizce-Türkçe Çeviri", link: "/ingilizce-turkce-ceviri" },
            ].map((service, idx) => (
              <a key={idx} href={service.link} className="p-4 bg-card rounded-xl border border-border hover:shadow-lg hover:border-primary/50 transition-all text-center">
                <span className="font-bold text-primary">{service.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Başarılı Projeler</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
            Müşteri memnuniyeti ve kaliteli çeviri hizmetleri sunma konusunda uzun yılların tecrübesi.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "İngiltere Vize Başvurusu",
                description: "Resmi belgeler ve kimlik dokümanlarının yeminli tercümesi. Başvuru kriterlerine tam uygun, dikkatli ve doğru çeviri.",
                tags: ["Yeminli Tercüme", "Vize Başvurusu"],
                
              },
              {
                title: "ABD Göçmenlik Başvurusu",
                description: "Amerika Birleşik Devletleri Vatandaşlık ve Göçmenlik Hizmetleri başvurusu için gerekli E-Devlet belgelerinin profesyonel çevirisi.",
                tags: ["Hukuki Çeviri", "Göçmenlik"],
              },
              {
                title: "Finansal Belge Çevirisi",
                description: "Finansal bağların ve düzenli aboneliklerin kanıtlanması amacıyla resmi makamlara sunulmak üzere hazırlanan çeviri.",
                tags: ["Teknik Çeviri", "Finansal"],
              },
              {
                title: "Kurumsal Belge Çevirisi",
                description: "Kurumsal kimlik bilgilerini ve veri doğruluğunu yansıtan teknik terim odaklı resmi çeviri hizmetleri.",
                tags: ["Kurumsal", "Teknik"],
              },
            ].map((project, idx) => (
              <Card key={idx} className="p-8 border-border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer" >
                <h3 className="text-2xl font-bold mb-3 text-foreground">{project.title}</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Müşteri Yorumları */}
      <section id="testimonials" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Müşteri Yorumları</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
            Müşterilerimizin deneyimleri ve geri bildirimleri
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: "Yağız Can Köseoğlu",
                rating: 5,
                text: "Hızlı ve güvenilir bir hizmet aldık, teşekkürler.",
              },
              {
                name: "Tuna Malkara",
                rating: 5,
                text: "Mesajlara ve isteklere çok özen gösteren birisi. İşim acil olduğu için ekstra hızlı yaptı. 10 üzerinden 10 hizmet. Bundan sonra bütün vize işlemlerimde Mehmet Akoğlu'nu tercih edeceğim.",
              },
              {
                name: "Yusuf Artar",
                rating: 5,
                text: "Birkaç kez beraber çalıştık, hızlı çözüm ve güçlü iletişim. Tavsiye ederim!",
              },
              {
                name: "Yusuf Artar",
                rating: 5,
                text: "Kendisi çözüm odaklı, hızlı! Beraber çalışmanızı öneririm. Diğer freelancerlar gibi her şeye ekstra fiyat çekmiyor, yaptığı işin karşılığını istiyor. Süper, devam!",
              },
              {
                name: "Avukat (lawyer35)",
                rating: 5,
                text: "Çok hızlı ve profesyonel bir hizmet. Hukuki belgelerimizin çevirisi kusursuzdu.",
              },
            ].map((review, idx) => (
              <div key={idx} className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">"{review.text}"</p>
                <p className="font-bold text-primary">— {review.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-primary mb-6">Tamamlanan Projelerden Örnekler</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {[
                "/images/proje-1.jpg",
                "/images/proje-2.jpg",
                "/images/proje-3.jpg",
                "/images/proje-4.jpg",
                "/images/proje-5.jpg",
                "/images/proje-6.jpg",
              ].map((img, idx) => (
                <div
                  key={idx}
                  className="rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow cursor-pointer hover:scale-105 duration-300"
                  onClick={() => openGallery(["/images/proje-1.jpg", "/images/proje-2.jpg", "/images/proje-3.jpg", "/images/proje-4.jpg", "/images/proje-5.jpg", "/images/proje-6.jpg"], idx)}
                >
                  <img src={img} alt={"Proje örneği " + (idx + 1)} className="w-full h-32 object-cover" />
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-4">Resimlere tıklayarak büyütebilirsiniz</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-primary">Neden Bizi Seçmelisiniz?</h2>
              <div className="space-y-6">
                {[
                  "Yeminli tercüman sertifikası ile resmi belgeler için yasal geçerlilik",
                  "15+ yıl deneyim ile güvenilir ve hızlı hizmet",
                  "Teknik, hukuki ve akademik alanlarda uzmanlaşmış çeviri",
                  "Müşteri memnuniyeti ve gizlilik garantisi",
                  "Rekabetçi fiyatlandırma ve esnek teslimat seçenekleri",
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
                <p className="text-muted-foreground text-lg">Uluslararası Standartlarda Çeviri Hizmetleri</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">İletişim</h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto text-lg">
            Çeviri ihtiyaçlarınız hakkında bilgi almak için bize ulaşın. Hızlı yanıt ve profesyonel danışmanlık garantisi.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Telefon</h3>
                  <p className="text-muted-foreground">WhatsApp üzerinden iletişim için bize ulaşabilirsiniz</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">E-posta</h3>
                  <p className="text-muted-foreground"><a href="mailto:info@mazzgord.com" className="hover:underline">info@mazzgord.com</a></p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">Konum</h3>
                    <p className="text-muted-foreground">Denizli, Türkiye</p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.64732102858!2d29.0484!3d37.7765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c73e1476e6d1c7%3A0x5e5e5e5e5e5e5e5e!2sDenizli%2C%20T%C3%BCrkiye!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Denizli Haritası"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8 border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Ad Soyad</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    placeholder="Adınız"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">E-posta</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    placeholder="E-posta adresiniz"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    placeholder="Telefon numaranız"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Mesaj</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                    placeholder="Çeviri ihtiyacınız hakkında bilgi verin..."
                    required
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg">
                  Gönder
                </Button>
              </form>
              {submitStatus === "success" && (
                <p className="text-green-600 font-medium mt-4 text-center">Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 font-medium mt-4 text-center">Bir hata oluştu. Lütfen tekrar deneyin.</p>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Mazzgord</h4>
              <p className="opacity-90">Profesyonel çeviri hizmetleri</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Hizmetler</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="#services" className="hover:opacity-100 transition">Yeminli Tercüme</a></li>
                <li><a href="#services" className="hover:opacity-100 transition">Teknik Çeviri</a></li>
                <li><a href="#services" className="hover:opacity-100 transition">Akademik Çeviri</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Şirket</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="/hakkimizda" onClick={(e) => { e.preventDefault(); window.location.href = "/hakkimizda"; }} className="hover:opacity-100 transition">Hakkımızda</a></li>
                <li><a href="#portfolio" className="hover:opacity-100 transition">Portfolyo</a></li>
                <li><a href="#contact" className="hover:opacity-100 transition">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Yasal</h4>
              <ul className="space-y-2 opacity-90">
                <li><a href="/gizlilik" onClick={(e) => { e.preventDefault(); window.location.href = "/gizlilik"; }} className="hover:opacity-100 transition">Gizlilik Politikası</a></li>
                <li><a href="/kullanim-kosullari" onClick={(e) => { e.preventDefault(); window.location.href = "/kullanim-kosullari"; }} className="hover:opacity-100 transition">Kullanım Koşulları</a></li>
                <li><a href="/cerez-politikasi" onClick={(e) => { e.preventDefault(); window.location.href = "/cerez-politikasi"; }} className="hover:opacity-100 transition">Çerez Politikası</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">İletişim</h4>
              <p className="opacity-90">WhatsApp: Bilgi almak için</p>
              <p className="opacity-90">E-posta: <a href="mailto:info@mazzgord.com" className="hover:underline">info@mazzgord.com</a></p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center opacity-90">
            <p>&copy; 2026 Mazzgord. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
      <a href="https://wa.me/905386295040" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110" aria-label="WhatsApp ile iletisime gecin">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
      {/* Gallery Modal */}
      {gallery.open && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={closeGallery}>
          <div className="relative max-w-4xl max-h-[90vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeGallery} className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300">&times;</button>
            <img src={gallery.images[gallery.current]} alt="Galeri" className="max-w-full max-h-[80vh] object-contain rounded-lg" />
            {gallery.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl">&lsaquo;</button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl">&rsaquo;</button>
              </>
            )}
            <div className="text-center text-white mt-4">{gallery.current + 1} / {gallery.images.length}</div>
          </div>
        </div>
      )}
    </div>
  );
}

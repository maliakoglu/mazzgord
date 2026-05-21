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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">Mazzgord</div>
          <div className="hidden md:flex gap-8">
            <a href="#services" className="text-foreground hover:text-primary transition">Hizmetler</a>
            <a href="#portfolio" className="text-foreground hover:text-primary transition">Portfolyo</a>
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
                tags: ["Yeminli Tercüme", "Viza Başvurusu"],
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
              <Card key={idx} className="p-8 border-border hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
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
                  <p className="text-muted-foreground">info@mazzgord.com</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Konum</h3>
                  <p className="text-muted-foreground">Türkiye</p>
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
                <li><a href="#portfolio" className="hover:opacity-100 transition">Portfolyo</a></li>
                <li><a href="#contact" className="hover:opacity-100 transition">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">İletişim</h4>
              <p className="opacity-90">WhatsApp: Bilgi almak için</p>
              <p className="opacity-90">E-posta: info@mazzgord.com</p>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center opacity-90">
            <p>&copy; 2026 Mazzgord. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

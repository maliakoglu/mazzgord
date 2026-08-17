import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

interface ContactProps {
  formData: { name: string; email: string; phone: string; message: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitStatus: "idle" | "sending" | "success" | "error";
}

export default function Contact({ formData, handleChange, handleSubmit, submitStatus }: ContactProps) {
  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary/30 parallax-yorumlar">
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
                <a href="tel:+905386295040" className="text-primary hover:underline font-medium block">+90 538 629 50 40</a>
                <a href="https://wa.me/905386295040" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition text-sm">WhatsApp üzerinden iletişim için tıklayın</a>
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
                  className="border-0"
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
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-2">Ad Soyad</label>
                <input
                  id="contact-name"
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
                <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-2">E-posta</label>
                <input
                  id="contact-email"
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
                <label htmlFor="contact-phone" className="block text-sm font-medium text-foreground mb-2">Telefon</label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
                  placeholder="Telefon numaranız"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-2">Mesaj</label>
                <textarea
                  id="contact-message"
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
  );
}

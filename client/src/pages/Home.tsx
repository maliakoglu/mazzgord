import { useState, useEffect } from "react";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import Portfolio from "@/components/home/Portfolio";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import GalleryModal from "@/components/home/GalleryModal";
import Process from "@/components/home/Process";
import PricingPreview from "@/components/home/PricingPreview";
import FAQ from "@/components/home/FAQ";
import Portfolio from "@/components/home/Portfolio";
import DenizliLocal from "@/components/home/DenizliLocal";

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.parallax-section');
      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const speed = 0.03;
          const yPos = (rect.top - window.innerHeight / 2) * speed;
          (el as HTMLElement).style.transform = 'translateY(' + yPos + 'px)';
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
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
      const emailPromise = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, access_key: "bcd1bf4b-064e-4e56-83f7-5dc9aaf5d74c" }),
      });

      const dbPromise = fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const [emailResponse] = await Promise.all([emailPromise, dbPromise]);

      if (emailResponse.ok) {
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
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} servicesOpen={servicesOpen} setServicesOpen={setServicesOpen} />
      <main>
        <Hero />
        <Process />
        <Services />
        <WhyChooseUs />
        <section className="py-8 bg-background hidden md:block">
          <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
            <div className="flex justify-center">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe
                  src="https://a.impactradius-go.com/gen-ad-code/4677196/4009076/4823/"
                  width="728"
                  height="90"
                  scrolling="no"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: "none", width: "728px", height: "90px" }}
                  title="Reklam"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        <PricingPreview />
        <Testimonials openGallery={openGallery} />
        <Portfolio />
        <DenizliLocal />
        <section className="py-8 bg-background hidden md:block">
          <div className="container mx-auto px-4" style={{ maxWidth: '1200px' }}>
            <div className="flex justify-center">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe
                  src="https://a.impactradius-go.com/gen-ad-code/4677196/462271/8199/"
                  width="728"
                  height="90"
                  scrolling="no"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ border: "none", width: "728px", height: "90px" }}
                  title="Reklam"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>
        <FAQ />
        <Contact formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} submitStatus={submitStatus} />
      </main>
      <Footer />
      <GalleryModal open={gallery.open} images={gallery.images} current={gallery.current} onClose={closeGallery} onNext={nextImage} onPrev={prevImage} />
    </div>
  );
}

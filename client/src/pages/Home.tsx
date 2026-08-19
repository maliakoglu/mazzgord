import { useState, useEffect } from "react";
import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Services from "@/components/home/Services";
import QuickServices from "@/components/home/QuickServices";
import Portfolio from "@/components/home/Portfolio";
import Testimonials from "@/components/home/Testimonials";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import GalleryModal from "@/components/home/GalleryModal";
import Process from "@/components/home/Process";
import PricingPreview from "@/components/home/PricingPreview";
import FAQ from "@/components/home/FAQ";
import MobileStickyCTA from "@/components/home/MobileStickyCTA";

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
        <QuickServices />
        <WhyChooseUs />
        <PricingPreview />
        <Testimonials openGallery={openGallery} />
        <FAQ />
        <Contact formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} submitStatus={submitStatus} />
      </main>
      <Footer />
      <GalleryModal open={gallery.open} images={gallery.images} current={gallery.current} onClose={closeGallery} onNext={nextImage} onPrev={prevImage} />
    </div>
  );
}

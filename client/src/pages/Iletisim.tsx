import { useState } from "react";
import Navbar from "@/components/home/Navbar";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export default function Iletisim() {

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Breadcrumb items={[{label: "İletişim"}]} />
        <h1 className="text-4xl font-bold text-primary mb-8">İletişim</h1>
        <Contact />
      </div>
      <Footer />
    </div>
  );
}

import React, { useState, useEffect } from "react";

const steps = [
  {
    id: 1,
    title: "Belgenizi Gönderin",
    desc: "Net fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden kolayca iletin.",
    icon: "https://cdn.lordicon.com/nocovwne.json",
  },
  {
    id: 2,
    title: "İnceleme ve Teklif",
    desc: "Belge türü, dil yönü, noter ve apostil ihtiyacını inceleyip şeffaf fiyat çıkarıyorum.",
    icon: "https://cdn.lordicon.com/msoeawqm.json",
  },
  {
    id: 3,
    title: "Onay ve Ödeme",
    desc: "Teklifi onayladığınızda online ödeme veya havale ile süreci anında başlatıyoruz.",
    icon: "https://cdn.lordicon.com/qhviklyi.json",
  },
  {
    id: 4,
    title: "Çeviri ve Kontrol",
    desc: "Çeviriyi hazırlayıp; isim, tarih, sayı ve kurum adlarını ikinci kez titizlikle kontrol ediyorum.",
    icon: "https://cdn.lordicon.com/puvaffet.json",
  },
  {
    id: 5,
    title: "Hızlı Teslimat",
    desc: "Dijital olarak WhatsApp/Mail ile veya ıslak imzalı kargo ile kapınıza teslim.",
    icon: "https://cdn.lordicon.com/uetqnvvg.json",
  },
];

export default function ProcessWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="py-20 md:py-28 px-4 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-soft-sand)" }}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full border"
            style={{
              color: "#2d5f57",
              backgroundColor: "rgba(57, 117, 109, 0.08)",
              borderColor: "rgba(57, 117, 109, 0.25)",
            }}
          >
            Şeffaf & Hızlı Prosedür
          </span>
          <h2
            className="mt-4"
            style={{
              fontFamily: '"Libre Baskerville", serif',
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 700,
              color: "var(--color-heading)",
              letterSpacing: "-0.02em",
            }}
          >
            Çeviri Süreci Nasıl İşliyor?
          </h2>
          <p
            className="mt-3 mx-auto"
            style={{
              color: "var(--color-mid-stone)",
              fontSize: "16px",
              lineHeight: 1.63,
              maxWidth: "560px",
            }}
          >
            Belgenizi ilettiğiniz andan itibaren kapınıza teslim edilene kadar 5 adımda profesyonel hizmet.
          </p>
        </div>

        <div
          className="rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          style={{
            backgroundColor: "var(--color-paper-white)",
            border: "1px solid var(--color-lavender-mist)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {/* Sol: Adım Listesi */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <button
                  key={step.id}
                  aria-label={`Adım: ${step.title}`}
                  onClick={() => setActiveStep(index)}
                  className="relative text-left p-4 md:p-5 rounded-2xl transition-all duration-500 overflow-hidden cursor-pointer group border"
                  style={{
                    backgroundColor: isActive
                      ? "rgba(57, 117, 109, 0.06)"
                      : "transparent",
                    borderColor: isActive
                      ? "rgba(57, 117, 109, 0.2)"
                      : "transparent",
                  }}
                >
                  <div className="relative z-10 flex items-start gap-4">
                    <span
                      className="text-xl font-black mt-0.5 transition-colors duration-300"
                      style={{
                        fontFamily: '"Libre Baskerville", serif',
                        color: isActive
                          ? "var(--color-sage)"
                          : "var(--color-warm-gray)",
                      }}
                    >
                      0{step.id}
                    </span>
                    <div>
                      <h3
                        className="text-base md:text-lg font-bold transition-colors duration-300"
                        style={{
                          fontFamily: '"Libre Baskerville", serif',
                          color: isActive
                            ? "var(--color-heading)"
                            : "var(--color-warm-gray)",
                        }}
                      >
                        {step.title}
                      </h3>
                      {isActive && (
                        <p
                          className="text-sm mt-2 leading-relaxed"
                          style={{
                            color: "var(--color-mid-stone)",
                            lineHeight: 1.63,
                          }}
                        >
                          {step.desc}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Sağ: Lordicon */}
          <div className="lg:col-span-7 flex justify-center items-center h-[280px] md:h-[360px] relative">
            <div
              className="absolute inset-0 rounded-full blur-3xl scale-75"
              style={{
                background:
                  "radial-gradient(circle, rgba(57, 117, 109, 0.08), transparent)",
              }}
            />
            <div
              key={activeStep}
              className="relative z-10 transition-all duration-500"
              style={{ transform: "scale(1.4)" }}
            >
              {React.createElement('lord-icon', {
                src: steps[activeStep].icon,
                trigger: 'loop',
                colors: 'primary:#123F46,secondary:#39756D,tertiary:#A7834B',
                style: { width: '200px', height: '200px' },
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

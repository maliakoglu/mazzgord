import { useLocation } from "wouter";
import { track } from "@/lib/analytics";

export default function MobileStickyCTA() {
  const [location] = useLocation();

  const tabs = [
    { path: "/", label: "Ana Sayfa", icon: "home" },
    { path: "/teklif", label: "Teklif Al", icon: "form" },
    { path: "https://wa.me/905386295040?text=Merhaba,%20belgem%20için%20teklif%20almak%20istiyorum.", label: "WhatsApp", icon: "whatsapp", external: true },
  ];

  const renderIcon = (icon: string, active: boolean) => {
    const color = active ? "var(--color-sage)" : "var(--color-warm-gray)";
    if (icon === "home") {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      );
    }
    if (icon === "services") {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
        </svg>
      );
    }
    if (icon === "form") {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>
        </svg>
      );
    }
    if (icon === "whatsapp") {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#22C55E">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      );
    }
    return null;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden" style={{ backgroundColor: 'rgba(253, 252, 245, 0.97)', backdropFilter: 'blur(12px)', borderTop: '1px solid var(--color-lavender-mist)' }}>
      <div className="flex justify-around items-stretch px-2" style={{ height: '60px' }}>
        {tabs.map((tab, idx) => {
          const isActive = !tab.external && (location === tab.path || (tab.path !== "/" && location.startsWith(tab.path)));
          return (
            <a
              key={idx}
              href={tab.path}
              {...(tab.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex flex-col items-center justify-center gap-1 no-underline transition flex-1"
              style={{ opacity: isActive ? 1 : 0.7 }}
            >
              {renderIcon(tab.icon, isActive)}
              <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '10px', fontWeight: isActive ? 600 : 500, color: isActive ? 'var(--color-sage)' : 'var(--color-warm-gray)' }}>
                {tab.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

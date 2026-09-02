import { ChevronRight, Home } from "lucide-react";
import { useEffect } from "react";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  useEffect(() => {
    const itemList = [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://mazzgord.com" },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        item: item.href ? `https://mazzgord.com${item.href}` : undefined,
      })),
    ];

    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: itemList,
    };

    let script = document.querySelector('script[data-breadcrumb-jsonld]');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-breadcrumb-jsonld', '');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }, [items]);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
      <a href="/" className="hover:text-primary transition flex items-center gap-1 no-underline">
        <Home className="w-3.5 h-3.5" /> Ana Sayfa
      </a>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
          {item.href ? (
            <a href={item.href} className="hover:text-primary transition no-underline">{item.label}</a>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
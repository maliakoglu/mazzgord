import { ReactNode } from "react";

export default function MagneticButton({ children, className, style, href, onClick }: { children: ReactNode; className?: string; style?: React.CSSProperties; href?: string; onClick?: () => void }) {
  const baseClass = (className || "") + " hover-lift";
  if (href) {
    return (
      <a href={href} className={baseClass} style={style} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button className={baseClass} style={style} onClick={onClick}>
      {children}
    </button>
  );
}

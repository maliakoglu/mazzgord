import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

export default function MagneticButton({ children, className, style, href, onClick }: { children: ReactNode; className?: string; style?: React.CSSProperties; href?: string; onClick?: () => void }) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.25);
    y.set(relY * 0.25);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const motionStyle = { x: springX, y: springY };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        style={{ ...style, ...motionStyle }}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        whileTap={{ scale: 0.95 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
      style={{ ...style, ...motionStyle }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}

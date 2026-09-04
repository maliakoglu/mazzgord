import { useEffect, useRef } from "react";
import { track } from "./analytics";

// Scroll derinligi ve sayfa suresi takibi
export function usePageAnalytics() {
  const startTime = useRef(Date.now());
  const maxDepth = useRef(0);
  const depthSent = useRef<Set<number>>(new Set());

  useEffect(() => {
    startTime.current = Date.now();
    maxDepth.current = 0;
    depthSent.current = new Set();

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const depth = Math.round((scrollTop / docHeight) * 100);
      if (depth > maxDepth.current) maxDepth.current = depth;

      // 25%, 50%, 75%, 100% esiklerinde event gonder
      const thresholds = [25, 50, 75, 100];
      for (const t of thresholds) {
        if (depth >= t && !depthSent.current.has(t)) {
          depthSent.current.add(t);
          track.scrollDepth(t);
        }
      }
    };

    const handleBeforeUnload = () => {
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (seconds >= 2) track.pageTime(seconds);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      const seconds = Math.round((Date.now() - startTime.current) / 1000);
      if (seconds >= 2) track.pageTime(seconds);
    };
  }, []);
}

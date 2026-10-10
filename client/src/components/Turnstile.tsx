import { useEffect, useRef, useState, useCallback } from "react";

const TURNSTILE_SITE_KEY = "0x4AAAAAAFSE5c4qWTQfO8vi";
const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const LOAD_TIMEOUT = 8000;

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: any) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string | undefined;
    };
    __turnstileScriptLoaded?: boolean;
  }
}

function loadTurnstileScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.__turnstileScriptLoaded && window.turnstile) {
      resolve();
      return;
    }
    const existing = document.querySelector(`script[src="${SCRIPT_URL}"]`);
    if (existing) {
      let elapsed = 0;
      const poll = setInterval(() => {
        elapsed += 100;
        if (window.turnstile) {
          window.__turnstileScriptLoaded = true;
          clearInterval(poll);
          resolve();
        } else if (elapsed >= LOAD_TIMEOUT) {
          clearInterval(poll);
          reject(new Error("timeout"));
        }
      }, 100);
      return;
    }
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.__turnstileScriptLoaded = true;
      let elapsed = 0;
      const poll = setInterval(() => {
        elapsed += 50;
        if (window.turnstile) {
          clearInterval(poll);
          resolve();
        } else if (elapsed >= 2000) {
          clearInterval(poll);
          reject(new Error("turnstile undefined"));
        }
      }, 50);
    };
    script.onerror = () => reject(new Error("script error"));
    document.head.appendChild(script);
  });
}

export default function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onTokenRef = useRef(onToken);
  const [loaded, setLoaded] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => { onTokenRef.current = onToken; }, [onToken]);

  useEffect(() => {
    let cancelled = false;
    loadTurnstileScript()
      .then(() => { if (!cancelled) setLoaded(true); })
      .catch(() => { if (!cancelled) setHidden(true); });
    return () => { cancelled = true; };
  }, [retryKey]);

  useEffect(() => {
    if (!loaded || !containerRef.current || !window.turnstile) return;
    if (widgetIdRef.current) return;
    try {
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => onTokenRef.current(token),
        "expired-callback": () => onTokenRef.current(""),
        "error-callback": () => { onTokenRef.current(""); setHidden(true); },
        "refresh-expired": "auto",
        theme: "light",
      });
    } catch {
      setHidden(true);
    }
    const timer = setTimeout(() => {
      if (widgetIdRef.current && window.turnstile) {
        const t = window.turnstile.getResponse(widgetIdRef.current);
        if (!t) setHidden(true);
      }
    }, 15000);
    return () => clearTimeout(timer);
  }, [loaded, retryKey]);

  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try { window.turnstile.remove(widgetIdRef.current); } catch {}
      }
    };
  }, []);

  const handleRetry = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      try { window.turnstile.remove(widgetIdRef.current); } catch {}
    }
    widgetIdRef.current = null;
    setLoaded(false);
    setHidden(false);
    setRetryKey(k => k + 1);
  }, []);

  if (hidden) return null;

  if (!loaded) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground p-2">
        <span className="inline-block w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        Güvenlik doğrulaması yükleniyor...
        <button type="button" onClick={handleRetry} className="ml-2 text-xs underline hover:text-primary">
          atla
        </button>
      </div>
    );
  }

  return <div ref={containerRef} />;
}

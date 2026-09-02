import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { User, Mail, Lock, Phone, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

const GOOGLE_CLIENT_ID = "1026895491536-rcubkoj8unp8gtfefk8tueeg1a4mr10j.apps.googleusercontent.com";

declare global {
  interface Window {
    google?: any;
  }
}

export default function Giris() {
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<"login" | "register" | "forgot" | "reset">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [googleReady, setGoogleReady] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "", code: "", newPassword: "" });

  useEffect(() => {
    if (window.google) { setGoogleReady(true); return; }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => setGoogleReady(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!googleReady || !window.google) return;
    const btn = document.getElementById("google-btn");
    if (!btn || btn.children.length > 0) return;
    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleGoogleCallback,
    });
    window.google.accounts.id.renderButton(btn, {
      theme: "outline", size: "large", width: 320, text: "continue_with", locale: "tr"
    });
  }, [googleReady, mode]);

  const handleGoogleCallback = async (response: any) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("mazzgord_token", data.token);
        localStorage.setItem("mazzgord_customer", JSON.stringify(data.customer));
        navigate("/hesabim");
      } else {
        setError(data.error || "Google ile giriş başarısız");
      }
    } catch {
      setError("Sunucu hatası. Lütfen tekrar deneyin.");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      if (mode === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, password: form.password }),
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem("mazzgord_token", data.token);
          localStorage.setItem("mazzgord_customer", JSON.stringify(data.customer));
          navigate("/hesabim");
        } else { setError(data.error || "İşlem başarısız"); }
      } else if (mode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (data.success) {
          localStorage.setItem("mazzgord_token", data.token);
          localStorage.setItem("mazzgord_customer", JSON.stringify(data.customer));
          navigate("/hesabim");
        } else { setError(data.error || "İşlem başarısız"); }
      } else if (mode === "forgot") {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccess("Sıfırlama kodu e-posta adresinize gönderildi. Kodu girip yeni şifrenizi belirleyin.");
          setMode("reset");
        } else { setError(data.error || "İşlem başarısız"); }
      } else if (mode === "reset") {
        const res = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: form.email, code: form.code, newPassword: form.newPassword }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccess("Şifreniz başarıyla sıfırlandı. Giriş yapabilirsiniz.");
          setMode("login");
          setForm({ ...form, password: "", code: "", newPassword: "" });
        } else { setError(data.error || "İşlem başarısız"); }
      }
    } catch { setError("Sunucu hatası. Lütfen tekrar deneyin."); }
    setLoading(false);
  };

  if (mode === "forgot" || mode === "reset") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-2 text-foreground">{mode === "forgot" ? "Şifremi Unuttum" : "Yeni Şifre Belirle"}</h1>
            <p className="text-center text-muted-foreground text-sm mb-6">{mode === "forgot" ? "E-posta adresinize sıfırlama kodu gönderilecek" : "E-postanıza gelen kodu ve yeni şifrenizi girin"}</p>
            {error && (<div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm rounded-lg p-3 mb-4"><AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span></div>)}
            {success && (<div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm rounded-lg p-3 mb-4"><CheckCircle2 className="w-4 h-4 shrink-0" /><span>{success}</span></div>)}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">E-posta</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition" placeholder="ornek@email.com" />
                </div>
              </div>
              {mode === "reset" && (
                <>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Doğrulama Kodu</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="text" required maxLength={6} value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition text-center text-lg tracking-widest" placeholder="000000" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Yeni Şifre</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input type="password" required minLength={6} value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition" placeholder="••••••••" />
                    </div>
                  </div>
                </>
              )}
              <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2">
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {mode === "forgot" ? "Sıfırlama Kodu Gönder" : "Şifreyi Sıfırla"}
              </button>
            </form>
            <div className="text-center mt-6 text-sm text-muted-foreground">
              <button onClick={() => { setMode("login"); setError(""); setSuccess(""); }} className="text-primary font-medium hover:underline">← Giriş sayfasına dön</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-2 text-foreground">{mode === "login" ? "Giriş Yap" : "Hesap Oluştur"}</h1>
          <p className="text-center text-muted-foreground text-sm mb-6">{mode === "login" ? "Siparişlerinizi takip edin" : "Hesabınızı oluşturun"}</p>
          {error && (<div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm rounded-lg p-3 mb-4"><AlertCircle className="w-4 h-4 shrink-0" /><span>{error}</span></div>)}
          {success && (<div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm rounded-lg p-3 mb-4"><CheckCircle2 className="w-4 h-4 shrink-0" /><span>{success}</span></div>)}
          <div className="mb-6"><div id="google-btn" className="w-full flex justify-center"></div></div>
          <div className="flex items-center gap-3 mb-6"><div className="flex-1 h-px bg-border"></div><span className="text-xs text-muted-foreground">veya</span><div className="flex-1 h-px bg-border"></div></div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="text" required minLength={2} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition" placeholder="Adınız Soyadınız" />
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition" placeholder="ornek@email.com" />
              </div>
            </div>
            {mode === "register" && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Telefon (opsiyonel)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition" placeholder="0555 123 45 67" />
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "login" ? "Giriş Yap" : "Hesap Oluştur"}
            </button>
          </form>
          {mode === "login" && (
            <div className="text-center mt-4 text-sm">
              <button onClick={() => { setMode("forgot"); setError(""); setSuccess(""); }} className="text-muted-foreground hover:text-primary transition">Şifremi unuttum</button>
            </div>
          )}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            {mode === "login" ? (
              <>Hesabınız yok mu?{" "}<button onClick={() => { setMode("register"); setError(""); setSuccess(""); }} className="text-primary font-medium hover:underline">Hesap oluşturun</button></>
            ) : (
              <>Zaten hesabınız var mı?{" "}<button onClick={() => { setMode("login"); setError(""); setSuccess(""); }} className="text-primary font-medium hover:underline">Giriş yapın</button></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { User, Mail, Lock, Phone, Loader2, AlertCircle } from "lucide-react";

export default function Giris() {
  const [, navigate] = useLocation();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("mazzgord_token", data.token);
        localStorage.setItem("mazzgord_customer", JSON.stringify(data.customer));
        navigate("/hesabim");
      } else {
        setError(data.error || "İşlem başarısız");
      }
    } catch {
      setError("Sunucu hatası. Lütfen tekrar deneyin.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20">
      <Helmet>
      </Helmet>
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-2 text-foreground">
            {mode === "login" ? "Giriş Yap" : "Hesap Oluştur"}
          </h1>
          <p className="text-center text-muted-foreground text-sm mb-6">
            {mode === "login" ? "Siparişlerinizi takip edin" : "Hesabınızı oluşturun"}
          </p>

          {error && (
            <div className="flex items-center gap-2 bg-destructive/10 text-destructive text-sm rounded-lg p-3 mb-4">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Ad Soyad</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">E-posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>
            {mode === "register" && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Telefon (opsiyonel)</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    placeholder="0555 123 45 67"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "login" ? "Giriş Yap" : "Hesap Oluştur"}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-muted-foreground">
            {mode === "login" ? (
              <>Hesabınız yok mu?{" "}
                <button onClick={() => { setMode("register"); setError(""); }} className="text-primary font-medium hover:underline">
                  Hesap oluşturun
                </button>
              </>
            ) : (
              <>Zaten hesabınız var mı?{" "}
                <button onClick={() => { setMode("login"); setError(""); }} className="text-primary font-medium hover:underline">
                  Giriş yapın
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

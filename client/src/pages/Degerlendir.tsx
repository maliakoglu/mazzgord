import { useState, useEffect } from "react";
import Navbar from "@/components/home/Navbar";
import { Star, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function Degerlendir() {
  const [token, setToken] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    if (t) setToken(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setErrorMsg("Değerlendirme bağlantısı bulunamadı. E-postanızdaki linke tıklayın.");
      setStatus("error");
      return;
    }
    if (rating < 1) {
      setErrorMsg("Lütfen bir puan seçin.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/quote/review/public", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order_token: token, rating, comment }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.error || "Bir hata oluştu.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Bağlantı hatası. Lütfen tekrar deneyin.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 max-w-lg text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">Teşekkürler!</h1>
          <p className="text-muted-foreground mb-8">Değerlendirmeniz alındı. Geri bildiriminiz bizim için çok değerli.</p>
          <a href="/" className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-3">Çevirimizi Değerlendirin</h1>
          <p className="text-muted-foreground">Deneyiminizi paylaşarak bize ve diğer müşterilere yardımcı olun.</p>
        </div>

        {status === "error" && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Puanınız</label>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
                  className="p-1 transition-transform hover:scale-110" aria-label={`${star} yıldız`}>
                  <Star className={`w-10 h-10 ${(hover || rating) >= star ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="review-comment" className="block text-sm font-medium text-foreground mb-2">Yorumunuz (isteğe bağlı)</label>
            <textarea id="review-comment" value={comment} onChange={(e) => setComment(e.target.value)} rows={4}
              className="w-full px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
              placeholder="Deneyiminizi kısaca anlatın..." maxLength={500} />
            <p className="text-xs text-muted-foreground mt-1 text-right">{comment.length}/500</p>
          </div>

          <button type="submit" disabled={status === "submitting"}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50 flex items-center justify-center gap-2">
            {status === "submitting" ? <><Loader2 className="w-5 h-5 animate-spin" /> Gönderiliyor...</> : "Değerlendirmeyi Gönder"}
          </button>
        </form>
      </div>
    </div>
  );
}

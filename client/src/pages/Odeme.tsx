import { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, Shield, CheckCircle2, Loader2, AlertCircle, Download } from "lucide-react";

export default function Odeme() {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "redirecting" | "success" | "failed">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || params.get("link");
    const token = params.get("token");
    const conversationId = params.get("conversationId");
    const status = params.get("status");

    const savedToken = localStorage.getItem("mazzgord_iyzico_token");
    const savedLink = localStorage.getItem("mazzgord_payment_link");
    
    const effectiveId = id || savedLink || "";
    const effectiveToken = token || savedToken || "";

    // Geçerli ödeme ID yoksa ana sayfaya yönlendir
    if (!effectiveId && !effectiveToken) {
      window.location.href = "/";
      return;
    }

    // iyzico'dan döndükten sonra — link parametresi varsa
    // Önce token ile verify et, token yoksa ödeme durumunu kontrol et
    if (effectiveToken && effectiveId) {
      localStorage.removeItem("mazzgord_iyzico_token");
      localStorage.removeItem("mazzgord_payment_link");
      verifyPayment(effectiveId, effectiveToken, conversationId || "");
      return;
    }

    // Token yok ama link var — iyzico'dan dönmüş, ödeme durumunu kontrol et
    if (effectiveId) {
      fetchPayment(effectiveId);
      return;
    }

    setError("Ödeme ID bulunamadı.");
    setLoading(false);
  }, []);

  const fetchPayment = async (id: string) => {
    try {
      const res = await fetch(`/api/payment/${id}`);
      const data = await res.json();
      if (data.success) {
        setPaymentData(data.data);
        if (data.data.status === "paid") {
          setStatus("success");
        } else if (data.data.status === "pending") {
          // Ödeme hâlâ pending — iyzico'dan döndü ama verify olmadı
          // Token ile verify etmeyi dene
          const savedToken = localStorage.getItem("mazzgord_iyzico_token");
          if (savedToken) {
            localStorage.removeItem("mazzgord_iyzico_token");
            localStorage.removeItem("mazzgord_payment_link");
            verifyPayment(id, savedToken, "");
          } else {
            // Token yok — ödeme tamamlanmamış olabilir
            setStatus("idle");
            setPaymentData(data.data);
          }
        } else if (data.data.status === "failed") {
          setStatus("failed");
          setError("Ödeme başarısız oldu.");
        }
      } else {
        setError(data.error || "Ödeme bilgisi bulunamadı.");
      }
    } catch {
      setError("Sunucu hatası.");
    }
    setLoading(false);
  };

  const verifyPayment = async (linkId: string, token: string, conversationId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          link_id: linkId,
          token: token,
          conversation_id: conversationId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setPaymentData({ ...paymentData, status: "paid" });
      } else {
        setStatus("failed");
        setError(data.error || "Ödeme doğrulanamadı.");
      }
    } catch {
      setStatus("failed");
      setError("Sunucu hatası.");
    }
    setLoading(false);
  };

  const downloadReceipt = () => {
    const date = new Date().toLocaleDateString("tr-TR");
    const time = new Date().toLocaleTimeString("tr-TR");
    const ref = paymentData?.payment_link_id || "—";
    const amount = paymentData?.amount?.toFixed(2) || "0.00";
    const desc = paymentData?.description || "Çeviri Hizmeti";

    const html = `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a1a; padding: 40px; max-width: 700px; margin: 0 auto; }
  .header { text-align: center; border-bottom: 3px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
  .header h1 { font-size: 28px; color: #2563eb; margin-bottom: 5px; }
  .header p { color: #666; font-size: 14px; }
  .receipt-title { text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 25px; color: #16a34a; }
  .info-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
  .info-table td { padding: 10px 0; border-bottom: 1px solid #eee; font-size: 14px; }
  .info-table td:first-child { color: #666; width: 40%; }
  .info-table td:last-child { font-weight: 600; text-align: right; }
  .amount-box { background: #f0fdf4; border: 2px solid #16a34a; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0; }
  .amount-box .label { font-size: 14px; color: #666; margin-bottom: 5px; }
  .amount-box .value { font-size: 32px; font-weight: bold; color: #16a34a; }
  .vat-note { background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px; padding: 12px; margin: 20px 0; font-size: 13px; text-align: center; color: #92400e; font-weight: 600; }
  .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #999; }
  .footer .contact { margin-top: 8px; }
  @media print { body { padding: 20px; } .no-print { display: none; } }
</style></head><body>
  <div class="header">
    <h1>MAZZGORD</h1>
    <p>Çeviri Hizmetleri · Denizli, Türkiye</p>
  </div>

  <div class="receipt-title">✅ ÖDEME MAKBUZU</div>

  <table class="info-table">
    <tr><td>Hizmet</td><td>${desc}</td></tr>
    <tr><td>Ödeme Referansı</td><td style="font-family: monospace;">${ref}</td></tr>
    <tr><td>Ödeme Tarihi</td><td>${date} ${time}</td></tr>
  </table>

  <div class="amount-box">
    <div class="label">ÖDENEN TUTAR</div>
    <div class="value">${amount} ₺</div>
  </div>

  <div class="vat-note">
    ⚠️ KDV'den müstesnadır (Esnaf Muafiyeti)<br>
    3065 sayılı Katma Değer Vergisi Kanunu'nun 17/4. maddesi kapsamında KDV'den müstesnadır.
  </div>

  <div class="footer">
    <p>Bu makbuz elektronik olarak üretilmiştir.</p>
    <div class="contact">
      Mazzgord Çeviri Hizmetleri · Kınıklı Mah., Pamukkale, Denizli, 20160<br>
      info@mazzgord.com · +90 538 629 50 40 · mazzgord.com
    </div>
  </div>

  <div class="no-print" style="text-align:center;margin-top:30px">
    <button onclick="window.print()" style="padding:12px 30px;background:#2563eb;color:#fff;border:none;border-radius:6px;font-size:16px;cursor:pointer">📄 PDF olarak kaydet / Yazdır</button>
  </div>
</body></html>`;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    setTimeout(() => {
      if (win) win.print();
    }, 500);
  };

  const handlePay = async () => {
    setStatus("redirecting");
    try {
      const res = await fetch("/api/payment/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ payment_link_id: paymentData.payment_link_id }),
      });
      const data = await res.json();
      if (data.success && data.payment_page_url) {
        // link_id'yi localStorage'a kaydet — geri döndüğümüzde kullanacağız
        localStorage.setItem("mazzgord_payment_link", paymentData.payment_link_id);
        // iyzico token callback URL'de gelecek, burada saklama
        window.location.href = data.payment_page_url;
      } else {
        setStatus("failed");
        setError(data.error || "Ödeme başlatılamadı.");
      }
    } catch {
      setStatus("failed");
      setError("Sunucu hatası.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground">Ödeme bilgileri yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Ödemeniz Alındı!</h1>
          <p className="text-muted-foreground mb-6">
            {paymentData?.amount?.toFixed(2)} ₺ ödemeniz başarıyla tamamlandı.
            Çeviri işleminiz başlatılacaktır.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-muted-foreground">Ödeme Referansı:</p>
            <p className="font-mono text-sm text-foreground">{paymentData?.payment_link_id}</p>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={downloadReceipt}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
            >
              <Download className="w-5 h-5" /> Makbuzu İndir (PDF)
            </button>
            <a href="/" className="inline-block px-6 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition text-center">
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (error && status === "failed") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Ödeme Başarısız</h1>
          <p className="text-muted-foreground mb-6">{error}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={downloadReceipt}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition"
            >
              <Download className="w-5 h-5" /> Makbuzu İndir (PDF)
            </button>
            <a href="/" className="inline-block px-6 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition text-center">
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full px-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-muted-foreground">{error || "Ödeme bulunamadı."}</p>
          <a href="/" className="inline-block mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition">
            Ana Sayfaya Dön
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <a href="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition">
            <ArrowLeft className="w-5 h-5" /> Ana Sayfa
          </a>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Güvenli Ödeme</h1>
          <p className="text-muted-foreground">Çeviri hizmeti ödemenizi tamamlayın</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center pb-3 border-b border-border">
              <span className="text-muted-foreground">Hizmet:</span>
              <span className="font-medium text-foreground">{paymentData.description || "Çeviri Hizmeti"}</span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-lg font-bold text-foreground">Toplam:</span>
              <span className="text-2xl font-bold text-primary">{paymentData.amount?.toFixed(2)} ₺</span>
            </div>
          </div>

          <button
            onClick={handlePay}
            disabled={status === "redirecting"}
            className="w-full py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          >
            {status === "redirecting" ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Yönlendiriliyor...</>
            ) : (
              <><CreditCard className="w-5 h-5" /> {paymentData.amount?.toFixed(2)} ₺ Öde</>
            )}
          </button>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>3D Secure ile güvenli ödeme (iyzico)</span>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>Kredi kartı / Banka kartı</span>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Sorularınız için: <a href="mailto:info@mazzgord.com" className="text-primary hover:underline">info@mazzgord.com</a></p>
          <p className="mt-1">Tel: <a href="tel:+905386295040" className="text-primary hover:underline">+90 538 629 50 40</a></p>
        </div>
      </div>
    </div>
  );
}

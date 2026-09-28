import re

with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1) State değişkenleri — orderNo state'inden sonra ekle
state_anchor = 'const [orderNo, setOrderNo] = useState<string>("");'
state_addition = '''
  const [priceEstimate, setPriceEstimate] = useState<number | null>(null);
  const [priceLoading, setPriceLoading] = useState(false);'''

if state_anchor in content and "priceEstimate" not in content:
    content = content.replace(state_anchor, state_anchor + state_addition, 1)
    print("✓ State değişkenleri eklendi")
else:
    print("✗ State anchor bulunamadı veya zaten eklenmiş")

# 2) Fiyat hesaplama useEffect — beforeunload useEffect'inden sonra ekle
effect_anchor = '    window.addEventListener("beforeunload", handleBeforeUnload);\n    return () => window.removeEventListener("beforeunload", handleBeforeUnload);\n  }, [submitStatus]);'
effect_addition = '''

  // Canlı fiyat hesaplama — kullanıcı formu doldurdukça otomatik güncellenir
  useEffect(() => {
    if (!formData.service_type || (!formData.page_count && !formData.word_count)) {
      setPriceEstimate(null);
      return;
    }
    const timer = setTimeout(async () => {
      setPriceLoading(true);
      try {
        const res = await fetch("/api/calculate-price", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_type: formData.service_type,
            page_count: formData.page_count ? parseInt(formData.page_count) : null,
            word_count: formData.word_count ? parseInt(formData.word_count) : null,
            urgency: formData.urgency,
            yeminli: formData.service_type === "yeminli" || formData.service_type === "noter",
            noter_onay: formData.service_type === "noter",
          }),
        });
        const data = await res.json();
        if (data.success) setPriceEstimate(data.estimated_price);
      } catch {
        // sessiz geç — fiyat göstermez
      } finally {
        setPriceLoading(false);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [formData.service_type, formData.page_count, formData.word_count, formData.urgency, formData.notary_need, formData.apostille_need]);'''

if effect_anchor in content and "Canlı fiyat hesaplama" not in content:
    content = content.replace(effect_anchor, effect_anchor + effect_addition, 1)
    print("✓ Fiyat hesaplama useEffect eklendi")
else:
    print("✗ Effect anchor bulunamadı veya zaten eklenmiş")

# 3) Fiyat gösteren UI — "Dosya Yükleme" bölümünden önce ekle
ui_anchor = '          {/* Dosya Yükleme */}'
ui_addition = '''          {/* Tahmini Fiyat */}
          {(priceEstimate !== null || priceLoading) && (
            <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tahmini Fiyat</p>
                  {priceLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <span className="text-lg text-muted-foreground">Hesaplanıyor...</span>
                    </div>
                  ) : (
                    <p className="text-3xl font-bold text-primary">
                      {priceEstimate?.toLocaleString("tr-TR")} ₺
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    * Belge incelendikten sonra kesin fiyat belirlenir. Bu bir tahmindir.
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Teslim Süresi</p>
                  <p className="text-sm font-medium text-foreground">
                    {formData.urgency === "acil" ? "24 saat içinde" :
                     formData.urgency === "hizli" ? "1-2 iş günü" :
                     "3-5 iş günü"}
                  </p>
                </div>
              </div>
            </div>
          )}

'''

if ui_anchor in content and "Tahmini Fiyat" not in content:
    content = content.replace(ui_anchor, ui_addition + ui_anchor, 1)
    print("✓ Fiyat UI kutusu eklendi")
else:
    print("✗ UI anchor bulunamadı veya zaten eklenmiş")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("\nTamam. Dosya yazıldı.")

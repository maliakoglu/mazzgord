with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Fiyat kutusunu detaylı breakdown ile değiştir
old_price_box = '''          {/* Tahmini Fiyat */}
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
          )}'''

new_price_box = '''          {/* Tahmini Fiyat */}
          {(priceEstimate !== null || priceLoading) && (
            <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-6">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
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
              {/* Fiyat dökümü */}
              {!priceLoading && priceEstimate !== null && (
                <div className="space-y-1 pt-3 border-t border-primary/10">
                  <p className="text-xs font-medium text-foreground mb-2">Fiyat Dökümü:</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Çeviri ücreti ({formData.document_type || "Belge"})</span>
                    <span>{formData.service_type === "noter" ? "Noter harcı dahil" : formData.service_type === "apostil" ? "Apostil + noter dahil" : "Yeminli tercüme"}</span>
                  </div>
                  {formData.urgency === "hizli" && (
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Hızlı teslimat ek ücreti</span>
                      <span>+30%</span>
                    </div>
                  )}
                  {formData.urgency === "acil" && (
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Acil teslimat ek ücreti</span>
                      <span>+50%</span>
                    </div>
                  )}
                  {formData.delivery_method === "shipping" && (
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Kargo ücreti</span>
                      <span>+300 ₺</span>
                    </div>
                  )}
                  {formData.delivery_method === "hand_delivery" && (
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Elden teslim</span>
                      <span>Ücretsiz</span>
                    </div>
                  )}
                  {(formData.service_type === "noter" || formData.service_type === "apostil") && (
                    <div className="flex justify-between text-xs text-amber-700 bg-amber-50 rounded p-2 mt-2">
                      <span>ℹ Fiziksel teslimat zorunludur</span>
                      <span>{formData.delivery_method === "shipping" ? "Kargo" : "Elden"}</span>
                    </div>
                  )}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-3">
                * Belge incelendikten sonra kesin fiyat belirlenir. Bu bir tahmindir.
              </p>
            </div>
          )}'''

if old_price_box in content:
    content = content.replace(old_price_box, new_price_box, 1)
    print("OK - fiyat breakdown kutusu güncellendi")
else:
    print("SKIP - fiyat kutusu anchor bulunamadı")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Parça 2 tamam.")

with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1) Form container'ı genişlet ve grid yapısına al
old_container = '      <div className="container mx-auto px-4 py-12 max-w-3xl">'
new_container = '      <div className="container mx-auto px-4 py-12 max-w-6xl">'

if old_container in content:
    content = content.replace(old_container, new_container, 1)
    print("1 OK - container genisletildi")
else:
    print("1 SKIP")

# 2) Form ve sağ panel grid'i oluştur — form etiketini bul
old_form_start = '        <form onSubmit={handleSubmit} className="space-y-6">'
new_form_start = '        <div className="grid lg:grid-cols-[1fr_320px] gap-6">\n        <form onSubmit={handleSubmit} className="space-y-6">'

if old_form_start in content and "lg:grid-cols" not in content:
    content = content.replace(old_form_start, new_form_start, 1)
    print("2 OK - grid yapisi eklendi")
else:
    print("2 SKIP")

# 3) Form kapanışından sonra sağ panel ekle
old_form_end = "        </form>\n\n        {/* Footer */"
new_form_end = """        </form>

        {/* Sticky Fiyat Paneli — Desktop */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <div className="bg-card border-2 border-primary/20 rounded-lg p-6 shadow-lg">
              <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Tahmini Fiyat
              </h3>
              {(priceEstimate !== null || priceLoading) ? (
                <div>
                  {priceLoading ? (
                    <div className="flex items-center gap-2 py-4">
                      <Loader2 className="w-6 h-6 text-primary animate-spin" />
                      <span className="text-muted-foreground">Hesaplanıyor...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-4xl font-bold text-primary transition-all duration-300">
                        {priceEstimate?.toLocaleString("tr-TR")} ₺
                      </p>
                      <div className="space-y-1 pt-3 border-t border-border">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Belge</span>
                          <span className="text-foreground font-medium">{formData.document_type || "—"}</span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Hizmet</span>
                          <span className="text-foreground font-medium">
                            {formData.service_type === "noter" ? "Noter Onaylı" :
                             formData.service_type === "apostil" ? "Apostil" :
                             formData.service_type === "yeminli" ? "Yeminli" : formData.service_type || "—"}
                          </span>
                        </div>
                        {formData.page_count && parseInt(formData.page_count) > 1 && (
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Sayfa</span>
                            <span className="text-foreground font-medium">{formData.page_count}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Teslimat</span>
                          <span className="text-foreground font-medium">
                            {formData.delivery_method === "shipping" ? "Kargo (+300₺)" :
                             formData.delivery_method === "hand_delivery" ? "Elden" : "Dijital"}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Teslim Süresi</span>
                          <span className="text-foreground font-medium">
                            {formData.urgency === "acil" ? "24 saat" :
                             formData.urgency === "hizli" ? "1-2 gün" : "3-5 gün"}
                          </span>
                        </div>
                      </div>
                      {(formData.service_type === "noter" || formData.service_type === "apostil") && (
                        <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mt-2">
                          {formData.service_type === "noter" ? "Noter harcı dahil" : "Apostil + noter dahil"}
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground pt-2">
                        * Belge incelendikten sonra kesin fiyat belirlenir.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Belge türü ve hizmet seçtikçe fiyat burada görünecek.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        </div>

        {/* Footer */"""

if old_form_end in content:
    content = content.replace(old_form_end, new_form_end, 1)
    print("3 OK - sticky panel eklendi")
else:
    print("3 SKIP")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Parca 1 tamam.")

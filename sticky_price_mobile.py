with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Mobile alt bar — sayfa kapanışından önce ekle
old_end = """    </div>
  );
}"""

new_end = """      {/* Mobile Fiyat Barı */}
      {(priceEstimate !== null || priceLoading) && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t-2 border-primary/30 shadow-2xl">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Tahmini Fiyat</p>
              {priceLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-sm text-muted-foreground">Hesaplanıyor...</span>
                </div>
              ) : (
                <p className="text-xl font-bold text-primary">
                  {priceEstimate?.toLocaleString("tr-TR")} ₺
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Teslim</p>
              <p className="text-sm font-medium text-foreground">
                {formData.urgency === "acil" ? "24 saat" :
                 formData.urgency === "hizli" ? "1-2 gün" : "3-5 gün"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}"""

if old_end in content and "Mobile Fiyat Barı" not in content:
    content = content.replace(old_end, new_end, 1)
    print("OK - mobile bar eklendi")
else:
    print("SKIP")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)

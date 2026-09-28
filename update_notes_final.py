with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old = '''                {formData.service_type === "noter" && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                    ℹ Noter onaylı çeviriler fiziksel olarak teslim edilmelidir. Dijital teslimat seçilemez. Kargo veya elden teslim zorunludur. Noter harç ücreti fiyata dahildir.
                  </p>
                )}
                {formData.service_type === "apostil" && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                    ℹ Apostil işlemleri fiziksel olarak teslim edilmelidir. Dijital teslimat seçilemez. Kargo veya elden teslim zorunludur. Apostil ve noter harç ücretleri fiyata dahildir.
                  </p>
                )}'''

new = '''                {formData.service_type === "noter" && (
                  <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2 space-y-2">
                    <p>ℹ Noter onaylı çeviriler fiziksel olarak teslim edilmelidir. Dijital teslimat seçilemez. Kargo veya elden teslim zorunludur. Noter harç ücreti fiyata dahildir.</p>
                    <p className="font-medium">📎 Orijinal belgenizi kargo ile veya elden teslim edebilirsiniz. Kargo adresini teklif onayından sonra size ileteceğim. Belgeniz güvende tutulur ve işlem tamamlandığında size iade edilir.</p>
                  </div>
                )}
                {formData.service_type === "apostil" && (
                  <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2 space-y-2">
                    <p>ℹ Apostil işlemleri fiziksel olarak teslim edilmelidir. Dijital teslimat seçilemez. Kargo veya elden teslim zorunludur. Apostil ve noter harç ücretleri fiyata dahildir.</p>
                    <p className="font-medium">📎 Orijinal belgenizi kargo ile veya elden teslim edebilirsiniz. Kargo adresini teklif onayından sonra size ileteceğim. Belgeniz güvende tutulur ve işlem tamamlandığında size iade edilir.</p>
                  </div>
                )}'''

if old in content:
    content = content.replace(old, new, 1)
    print("OK")
else:
    print("SKIP")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)

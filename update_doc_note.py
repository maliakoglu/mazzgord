with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_note = '''                {formData.service_type === "noter" && (
                  <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2 space-y-1">
                    <p>ℹ Noter onaylı çeviriler fiziksel olarak teslim edilmelidir. Dijital teslimat seçilemez. Kargo veya elden teslim zorunludur. Noter harç ücreti fiyata dahildir.</p>
                    <p className="font-medium">📎 Orijinal belgeyi kargo veya elden teslim etmeniz gerekir. Dijital kopya noter onayı için yeterli değildir.</p>
                  </div>
                )}
                {formData.service_type === "apostil" && (
                  <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2 space-y-1">
                    <p>ℹ Apostil işlemleri fiziksel olarak teslim edilmelidir. Dijital teslimat seçilemez. Kargo veya elden teslim zorunludur. Apostil ve noter harç ücretleri fiyata dahildir.</p>
                    <p className="font-medium">📎 Orijinal belgeyi kargo veya elden teslim etmeniz gerekir. Dijital kopya apostil işlemi için yeterli değildir.</p>
                  </div>
                )}'''

new_note = '''                {formData.service_type === "noter" && (
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

if old_note in content:
    content = content.replace(old_note, new_note, 1)
    print("OK - müşteri dostu uyarı güncellendi")
else:
    print("SKIP")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)

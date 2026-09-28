with open("client/src/pages/SiparisTakip.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# Eski timeline'ı yeni 8 adımlı + indirme butonu ile değiştir
old_timeline = """            {/* Zaman çizelgesi */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Süreç</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status ? "bg-emerald-100" : "bg-secondary"}`}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Sipariş Alındı</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at + "Z").toLocaleString("tr-TR")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status !== "pending" ? "bg-emerald-100" : "bg-secondary"}`}>
                    {order.status !== "pending" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Ödeme Tamamlandı</p>
                    <p className="text-xs text-muted-foreground">{order.status !== "pending" ? "Ödeme alındı" : "Bekleniyor"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === "delivered" ? "bg-emerald-100" : "bg-secondary"}`}>
                    {order.status === "delivered" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Teslim Edildi</p>
                    <p className="text-xs text-muted-foreground">{order.status === "delivered" ? "Belgeleriniz hazır" : "Bekleniyor"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}"""

new_timeline = """            {/* Zaman çizelgesi */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">Süreç Takibi</h2>
              <div className="space-y-1">
                {[
                  { step: 1, label: "Teklif Alındı", desc: "Talebiniz sistemimize kaydedildi" },
                  { step: 2, label: "İletişim & Bilgi Doğrulama", desc: "Detaylar netleştiriliyor" },
                  { step: 3, label: "Teklif Hazırlığı", desc: "Fiyat ve süre belirleniyor" },
                  { step: 4, label: "Onay & Ödeme", desc: "Sipariş onayı ve ödeme adımı" },
                  { step: 5, label: "Ödeme Alındı", desc: "Çeviri süreci başlıyor" },
                  { step: 6, label: "Çeviri Devam Ediyor", desc: "Belgeleriniz çevriliyor" },
                  { step: 7, label: "Kalite Kontrol", desc: "Çeviri kontrol ediliyor" },
                  { step: 8, label: "Teslim Edildi", desc: "Belgeleriniz hazır" },
                ].map((s) => {
                  const currentStep = status?.step || 0;
                  const isDone = currentStep > s.step;
                  const isCurrent = currentStep === s.step;
                  const isCancelled = status?.step === 0;
                  return (
                    <div key={s.step} className="flex items-start gap-3 pb-4 last:pb-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isDone ? "bg-emerald-100" : isCurrent ? "bg-primary/10 ring-2 ring-primary" : "bg-secondary"
                      }`}>
                        {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> :
                         isCurrent ? <Loader2 className="w-4 h-4 text-primary animate-spin" /> :
                         <Clock className="w-4 h-4 text-muted-foreground" />}
                      </div>
                      <div className="pt-1">
                        <p className={`text-sm font-medium ${isCurrent ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"}`}>
                          {s.label}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isDone ? "Tamamlandı" : isCurrent ? "Devam ediyor..." : isCancelled ? "—" : "Bekliyor"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {status?.step === 0 && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {status.label}
                  </p>
                </div>
              )}
            </div>

            {/* Dosya İndirme */}
            {order.status === "delivered" && order.delivered_file_key && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-bold text-emerald-800">Belgeniz Hazır!</p>
                      <p className="text-sm text-emerald-700">Çevrilmiş belgenizi indirebilirsiniz.</p>
                    </div>
                  </div>
                  <a href={`/api/orders/${order.payment_link_id}/download`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition">
                    <Package className="w-5 h-5" /> Belgeyi İndir
                  </a>
                </div>
              </div>
            )}
          </div>
        )}"""

if old_timeline in content:
    content = content.replace(old_timeline, new_timeline, 1)
    print("✓ Timeline + indirme butonu eklendi")
else:
    print("✗ Timeline anchor bulunamadı")

with open("client/src/pages/SiparisTakip.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Parça 2 tamam.")

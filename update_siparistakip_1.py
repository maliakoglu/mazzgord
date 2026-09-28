with open("client/src/pages/SiparisTakip.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1) Order interface'e delivered_file_key ekle
old_interface = """  shipping_tracking: string | null;
  created_at: string;
}"""
new_interface = """  shipping_tracking: string | null;
  delivered_file_key?: string | null;
  created_at: string;
}"""

if old_interface in content and "delivered_file_key" not in content:
    content = content.replace(old_interface, new_interface, 1)
    print("✓ Order interface güncellendi")
else:
    print("✗ Interface anchor bulunamadı veya zaten eklenmiş")

# 2) statusConfig'i 17 duruma genişlet
old_status = """  const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
    pending: { label: "Ödeme Bekleniyor", color: "text-orange-600 bg-orange-50 border-orange-200", icon: Clock },
    paid: { label: "Çeviri Devam Ediyor", color: "text-blue-600 bg-blue-50 border-blue-200", icon: Loader2 },
    delivered: { label: "Teslim Edildi", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: CheckCircle2 },
    cancelled: { label: "İptal Edildi", color: "text-red-600 bg-red-50 border-red-200", icon: AlertCircle } };"""

new_status = """  const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock; step: number }> = {
    pending: { label: "Teklif Alındı", color: "text-amber-600 bg-amber-50 border-amber-200", icon: Clock, step: 1 },
    contacted: { label: "İletişime Geçildi", color: "text-blue-600 bg-blue-50 border-blue-200", icon: Mail, step: 2 },
    needs_info: { label: "Bilgi/Belge Eksik", color: "text-orange-600 bg-orange-50 border-orange-200", icon: AlertCircle, step: 2 },
    qualified: { label: "Teklif Hazırlanıyor", color: "text-cyan-600 bg-cyan-50 border-cyan-200", icon: Clock, step: 3 },
    quote_sent: { label: "Teklif Gönderildi", color: "text-blue-600 bg-blue-50 border-blue-200", icon: Mail, step: 3 },
    won: { label: "İş Onaylandı", color: "text-indigo-600 bg-indigo-50 border-indigo-200", icon: CheckCircle2, step: 4 },
    payment_pending: { label: "Ödeme Bekleniyor", color: "text-orange-600 bg-orange-50 border-orange-200", icon: Clock, step: 4 },
    paid: { label: "Ödeme Alındı", color: "text-green-600 bg-green-50 border-green-200", icon: CheckCircle2, step: 5 },
    reviewing: { label: "Belge İnceleniyor", color: "text-blue-600 bg-blue-50 border-blue-200", icon: Loader2, step: 6 },
    processing: { label: "Çeviri Devam Ediyor", color: "text-blue-600 bg-blue-50 border-blue-200", icon: Loader2, step: 6 },
    translating: { label: "Çeviriye Başlandı", color: "text-indigo-600 bg-indigo-50 border-indigo-200", icon: Loader2, step: 6 },
    quality_control: { label: "Kalite Kontrol", color: "text-purple-600 bg-purple-50 border-purple-200", icon: CheckCircle2, step: 7 },
    completed: { label: "Çeviri Tamamlandı", color: "text-green-600 bg-green-50 border-green-200", icon: CheckCircle2, step: 7 },
    delivered: { label: "Teslim Edildi", color: "text-emerald-600 bg-emerald-50 border-emerald-200", icon: CheckCircle2, step: 8 },
    repeat_closed: { label: "Tamamlandı", color: "text-gray-600 bg-gray-50 border-gray-200", icon: CheckCircle2, step: 8 },
    lost: { label: "İşlem Yapılamadı", color: "text-red-600 bg-red-50 border-red-200", icon: AlertCircle, step: 0 },
    cancelled: { label: "İptal Edildi", color: "text-red-600 bg-red-50 border-red-200", icon: AlertCircle, step: 0 },
  };"""

if old_status in content:
    content = content.replace(old_status, new_status, 1)
    print("✓ statusConfig 17 duruma genişletildi")
else:
    print("✗ statusConfig anchor bulunamadı")

with open("client/src/pages/SiparisTakip.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Parça 1 tamam.")

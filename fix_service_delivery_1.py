with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1) handleServiceTypeChange fonksiyonu ekle — handleChange'ten sonra
anchor = '''  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!interactedRef.current) {
      interactedRef.current = true;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };'''

new_handler = anchor + '''

  // Hizmet türü değişince teslimat yöntemini otomatik ayarla
  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!interactedRef.current) interactedRef.current = true;
    const newServiceType = e.target.value;
    let newDelivery = formData.delivery_method;
    // Noter onaylı ve apostil fiziksel teslimat gerektirir
    if (newServiceType === "noter" || newServiceType === "apostil") {
      if (formData.delivery_method === "digital") newDelivery = "shipping";
    }
    // Yeminli/profesyonel dijital olabilir
    if (newServiceType === "yeminli" || newServiceType === "profesyonel" || newServiceType === "akademik" || newServiceType === "teknik" || newServiceType === "hukuki") {
      // mevcut seçim korunur
    }
    setFormData({ ...formData, service_type: newServiceType, delivery_method: newDelivery });
  };'''

if anchor in content and "handleServiceTypeChange" not in content:
    content = content.replace(anchor, new_handler, 1)
    print("1 OK - handleServiceTypeChange eklendi")
else:
    print("1 SKIP")

# 2) Service type select'inde handleServiceTypeChange kullan
old_select = '<select id="tf-service-type" name="service_type" value={formData.service_type} onChange={handleChange} className={inputClass}>'
new_select = '<select id="tf-service-type" name="service_type" value={formData.service_type} onChange={handleServiceTypeChange} className={inputClass}>'

if old_select in content:
    content = content.replace(old_select, new_select, 1)
    print("2 OK - service type select handler güncellendi")
else:
    print("2 SKIP")

# 3) Service type altına bilgi notu ekle
old_service_end = '''                </select>
              </div>
              <div>
                <label htmlFor="tf-page-count" className={labelClass}>Sayfa Sayısı</label>'''

new_service_end = '''                </select>
                {formData.service_type === "noter" && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                    ℹ Noter onaylı çeviriler fiziksel olarak teslim edilmelidir. Dijital teslimat seçilemez. Kargo veya elden teslim zorunludur. Noter harç ücreti fiyata dahildir.
                  </p>
                )}
                {formData.service_type === "apostil" && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mt-2">
                    ℹ Apostil işlemleri fiziksel olarak teslim edilmelidir. Dijital teslimat seçilemez. Kargo veya elden teslim zorunludur. Apostil ve noter harç ücretleri fiyata dahildir.
                  </p>
                )}
                {formData.service_type === "yeminli" && (
                  <p className="text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-lg p-3 mt-2">
                    ℹ Yeminli çeviri dijital (e-posta/WhatsApp), kargo veya elden teslim edilebilir.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="tf-page-count" className={labelClass}>Sayfa Sayısı</label>'''

if old_service_end in content and "Noter onaylı çeviriler fiziksel" not in content:
    content = content.replace(old_service_end, new_service_end, 1)
    print("3 OK - bilgi notları eklendi")
else:
    print("3 SKIP")

# 4) Dijital teslimat butonunu devre dışı bırak when noter/apostil
old_digital_btn = '''                  <button type="button"
                    onClick={() => setFormData({ ...formData, delivery_method: "digital" })}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg transition text-left ${formData.delivery_method === "digital" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>'''

new_digital_btn = '''                  <button type="button"
                    onClick={() => { if (formData.service_type !== "noter" && formData.service_type !== "apostil") setFormData({ ...formData, delivery_method: "digital" }); }}
                    disabled={formData.service_type === "noter" || formData.service_type === "apostil"}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg transition text-left ${(formData.service_type === "noter" || formData.service_type === "apostil") ? "opacity-40 cursor-not-allowed border-border" : formData.delivery_method === "digital" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>'''

if old_digital_btn in content and "disabled={formData.service_type" not in content:
    content = content.replace(old_digital_btn, new_digital_btn, 1)
    print("4 OK - dijital buton devre dışı bırakma eklendi")
else:
    print("4 SKIP")

# 5) Teslimat bölümüne genel bilgi notu ekle
old_delivery_label = '<label className={labelClass}>Teslimat Yöntemi <span className="text-red-500">*</span></label>'
new_delivery_label = '''<label className={labelClass}>Teslimat Yöntemi <span className="text-red-500">*</span></label>
                {(formData.service_type === "noter" || formData.service_type === "apostil") && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2 mb-3">
                    {formData.service_type === "noter" ? "Noter onaylı" : "Apostilli"} çevirilerde dijital teslimat mümkün değildir. Lütfen kargo veya elden teslim seçin.
                  </p>
                )}'''

if old_delivery_label in content and "diyital teslimat mümkün değildir" not in content:
    content = content.replace(old_delivery_label, new_delivery_label, 1)
    print("5 OK - teslimat bilgi notu eklendi")
else:
    print("5 SKIP")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Parça 1 tamam.")

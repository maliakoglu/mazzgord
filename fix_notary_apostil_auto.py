with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1) handleServiceTypeChange'e notary_need ve apostille_need otomatik ayarı ekle
old_handler = '''  // Hizmet türü değişince teslimat yöntemini otomatik ayarla
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

new_handler = '''  // Hizmet türü değişince teslimat yöntemi ve noter/apostil durumunu otomatik ayarla
  const handleServiceTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (!interactedRef.current) interactedRef.current = true;
    const newServiceType = e.target.value;
    let newDelivery = formData.delivery_method;
    let newNotary = formData.notary_need;
    let newApostil = formData.apostille_need;

    // Noter onaylı ve apostil fiziksel teslimat gerektirir
    if (newServiceType === "noter" || newServiceType === "apostil") {
      if (formData.delivery_method === "digital") newDelivery = "shipping";
    }

    // Noter/apostil durumlarını hizmet türüne göre otomatik ayarla
    if (newServiceType === "noter") {
      newNotary = "evet";
      newApostil = "hayir";
    } else if (newServiceType === "apostil") {
      newNotary = "evet";
      newApostil = "evet";
    } else if (newServiceType === "yeminli" || newServiceType === "profesyonel" || newServiceType === "akademik" || newServiceType === "teknik" || newServiceType === "hukuki") {
      newNotary = "hayir";
      newApostil = "hayir";
    }

    setFormData({ ...formData, service_type: newServiceType, delivery_method: newDelivery, notary_need: newNotary, apostille_need: newApostil });
  };'''

if old_handler in content:
    content = content.replace(old_handler, new_handler, 1)
    print("1 OK - handleServiceTypeChange güncellendi")
else:
    print("1 SKIP")

# 2) Noter onayı select'ini devre dışı bırak when service_type = noter/apostil
old_notary_select = '''                <select id="tf-notary" name="notary_need" value={formData.notary_need} onChange={handleChange} className={inputClass}>
                  <option value="">Seçiniz</option>
                  <option value="evet">Evet, gerekli</option>
                  <option value="hayir">Hayır, gerekli değil</option>
                  <option value="bilmiyorum">Bilmiyorum</option>
                </select>'''

new_notary_select = '''                <select id="tf-notary" name="notary_need" value={formData.notary_need} onChange={handleChange}
                  disabled={formData.service_type === "noter" || formData.service_type === "apostil"}
                  className={inputClass + (formData.service_type === "noter" || formData.service_type === "apostil" ? " opacity-60 cursor-not-allowed" : "")}>
                  <option value="">Seçiniz</option>
                  <option value="evet">Evet, gerekli</option>
                  <option value="hayir">Hayır, gerekli değil</option>
                  <option value="bilmiyorum">Bilmiyorum</option>
                </select>
                {(formData.service_type === "noter" || formData.service_type === "apostil") && (
                  <p className="text-xs text-muted-foreground mt-1">Hizmet türüne göre otomatik "Evet" olarak ayarlandı.</p>
                )}'''

if old_notary_select in content:
    content = content.replace(old_notary_select, new_notary_select, 1)
    print("2 OK - noter select devre dışı bırakma eklendi")
else:
    print("2 SKIP")

# 3) Apostil select'ini devre dışı bırak when service_type = apostil
old_apostil_select = '''                <select id="tf-apostil" name="apostille_need" value={formData.apostille_need} onChange={handleChange} className={inputClass}>
                  <option value="">Seçiniz</option>
                  <option value="evet">Evet, gerekli</option>
                  <option value="hayir">Hayır, gerekli değil</option>
                  <option value="bilmiyorum">Bilmiyorum</option>
                </select>'''

new_apostil_select = '''                <select id="tf-apostil" name="apostille_need" value={formData.apostille_need} onChange={handleChange}
                  disabled={formData.service_type === "apostil"}
                  className={inputClass + (formData.service_type === "apostil" ? " opacity-60 cursor-not-allowed" : "")}>
                  <option value="">Seçiniz</option>
                  <option value="evet">Evet, gerekli</option>
                  <option value="hayir">Hayır, gerekli değil</option>
                  <option value="bilmiyorum">Bilmiyorum</option>
                </select>
                {formData.service_type === "apostil" && (
                  <p className="text-xs text-muted-foreground mt-1">Hizmet türüne göre otomatik "Evet" olarak ayarlandı.</p>
                )}'''

if old_apostil_select in content:
    content = content.replace(old_apostil_select, new_apostil_select, 1)
    print("3 OK - apostil select devre dışı bırakma eklendi")
else:
    print("3 SKIP")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Tamam.")

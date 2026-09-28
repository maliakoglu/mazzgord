with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1) DOCUMENT_TYPES'ı dinamik yükleme ile değiştir
old_docs = '''const DOCUMENT_TYPES = [
  "Pasaport / Kimlik",
  "Diploma / Transkript",
  "Evlilik Cüzdanı / Nüfus Kayıt",
  "Vize Belgeleri",
  "Sözleşme / Hukuki Belge",
  "Teknik Kılavuz / Doküman",
  "Akademik Makale / Tez",
  "Tıbbi Belge / Rapor",
  "Noter Tasdikli Belge",
  "Mahkeme Kararı / Dilekçe",
  "Şirket Evrakı / Ticari Belge",
  "Web Sitesi / Yazılım",
  "Reklam / Pazarlama Metni",
  "Diğer"
];'''

new_docs = '''const DOCUMENT_TYPES_FALLBACK = [
  "Pasaport", "Kimlik Kartı", "Diploma", "Transkript (1 Sayfa)",
  "Vize Belgeleri", "Sözleşme / Hukuki Belge", "Diğer"
];'''

if old_docs in content:
    content = content.replace(old_docs, new_docs, 1)
    print("1 OK - DOCUMENT_TYPES değiştirildi")
else:
    print("1 SKIP")

# 2) State'e pricingData ekle
state_anchor = '  const [priceEstimate, setPriceEstimate] = useState<number | null>(null);'
state_addition = '\n  const [pricingDocs, setPricingDocs] = useState<{document_name: string; category: string}[]>([]);'

if state_anchor in content and "pricingDocs" not in content:
    content = content.replace(state_anchor, state_anchor + state_addition, 1)
    print("2 OK - pricingDocs state eklendi")
else:
    print("2 SKIP")

# 3) useEffect ile pricing verisini yükle — beforeunload useEffect'inden sonra
effect_anchor = '    window.addEventListener("beforeunload", handleBeforeUnload);\n    return () => window.removeEventListener("beforeunload", handleBeforeUnload);\n  }, [submitStatus]);'
effect_addition = '''

  // Pricing tablosundan belge türlerini yükle
  useEffect(() => {
    fetch("/api/pricing")
      .then(res => res.json())
      .then(data => { if (data.success && data.data) setPricingDocs(data.data); })
      .catch(() => {});
  }, []);'''

if effect_anchor in content and "pricingDocs" not in content:
    content = content.replace(effect_anchor, effect_anchor + effect_addition, 1)
    print("3 OK - pricing yükleme useEffect eklendi")
else:
    print("3 SKIP")

# 4) Fiyat hesaplama useEffect'ini güncelle — document_type da göndersin
old_effect = '''    if (!formData.service_type || (!formData.page_count && !formData.word_count)) {
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
        });'''

new_effect = '''    if (!formData.service_type || (!formData.document_type && !formData.page_count && !formData.word_count)) {
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
            document_type: formData.document_type || null,
            page_count: formData.page_count ? parseInt(formData.page_count) : null,
            word_count: formData.word_count ? parseInt(formData.word_count) : null,
            urgency: formData.urgency,
            yeminli: formData.service_type === "yeminli" || formData.service_type === "noter",
            noter_onay: formData.service_type === "noter",
          }),
        });'''

if old_effect in content:
    content = content.replace(old_effect, new_effect, 1)
    print("4 OK - useEffect güncellendi")
else:
    print("4 SKIP")

# 5) useEffect dependency'ye document_type ekle
old_deps = "  }, [formData.service_type, formData.page_count, formData.word_count, formData.urgency, formData.notary_need, formData.apostille_need]);"
new_deps = "  }, [formData.service_type, formData.document_type, formData.page_count, formData.word_count, formData.urgency, formData.notary_need, formData.apostille_need]);"

if old_deps in content:
    content = content.replace(old_deps, new_deps, 1)
    print("5 OK - dependency güncellendi")
else:
    print("5 SKIP")

# 6) Belge türü dropdown'ını DB'den yükle
old_dropdown = '''                <select id="tf-doc-type" name="document_type" value={formData.document_type} onChange={handleChange} className={inputClass}>
                  <option value="">Belge türü seçiniz</option>
                  {DOCUMENT_TYPES.map(doc => <option key={doc} value={doc}>{doc}</option>)}
                </select>'''

new_dropdown = '''                <select id="tf-doc-type" name="document_type" value={formData.document_type} onChange={handleChange} className={inputClass}>
                  <option value="">Belge türü seçiniz</option>
                  {pricingDocs.length > 0 ? (
                    ["egitim", "resmi", "ticari"].map(cat => {
                      const docs = pricingDocs.filter(d => d.category === cat);
                      if (docs.length === 0) return null;
                      const catLabel = cat === "egitim" ? "Eğitim Belgeleri" : cat === "resmi" ? "Resmi Belgeler" : "Ticari Belgeler";
                      return <optgroup key={cat} label={catLabel}>
                        {docs.map(doc => <option key={doc.document_name} value={doc.document_name}>{doc.document_name}</option>)}
                      </optgroup>;
                    })
                  ) : (
                    DOCUMENT_TYPES_FALLBACK.map(doc => <option key={doc} value={doc}>{doc}</option>)
                  )}
                </select>'''

if old_dropdown in content:
    content = content.replace(old_dropdown, new_dropdown, 1)
    print("6 OK - dropdown güncellendi")
else:
    print("6 SKIP")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Frontend güncellemesi tamam.")

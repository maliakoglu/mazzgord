with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# useEffect'in API çağrısına delivery_method ekle
old_body = '''          body: JSON.stringify({
            service_type: formData.service_type,
            document_type: formData.document_type || null,
            page_count: formData.page_count ? parseInt(formData.page_count) : null,
            word_count: formData.word_count ? parseInt(formData.word_count) : null,
            urgency: formData.urgency,
            yeminli: formData.service_type === "yeminli" || formData.service_type === "noter",
            noter_onay: formData.service_type === "noter",
          }),'''

new_body = '''          body: JSON.stringify({
            service_type: formData.service_type,
            document_type: formData.document_type || null,
            delivery_method: formData.delivery_method || "digital",
            page_count: formData.page_count ? parseInt(formData.page_count) : null,
            word_count: formData.word_count ? parseInt(formData.word_count) : null,
            urgency: formData.urgency,
            yeminli: formData.service_type === "yeminli" || formData.service_type === "noter",
            noter_onay: formData.service_type === "noter",
          }),'''

if old_body in content:
    content = content.replace(old_body, new_body, 1)
    print("1 OK - delivery_method API çağrısına eklendi")
else:
    print("1 SKIP")

# useEffect dependency'ye delivery_method ekle
old_deps = "  }, [formData.service_type, formData.document_type, formData.page_count, formData.word_count, formData.urgency, formData.notary_need, formData.apostille_need]);"
new_deps = "  }, [formData.service_type, formData.document_type, formData.delivery_method, formData.page_count, formData.word_count, formData.urgency, formData.notary_need, formData.apostille_need]);"

if old_deps in content:
    content = content.replace(old_deps, new_deps, 1)
    print("2 OK - dependency'ye delivery_method eklendi")
else:
    print("2 SKIP")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Frontend tamam.")

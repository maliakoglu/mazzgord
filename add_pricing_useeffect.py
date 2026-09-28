with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# beforeunload useEffect'inden sonra ekle
anchor = "    window.addEventListener(\"beforeunload\", handleBeforeUnload);\n    return () => window.removeEventListener(\"beforeunload\", handleBeforeUnload);\n  }, [submitStatus]);"

addition = "\n\n  // Pricing tablosundan belge türlerini yükle\n  useEffect(() => {\n    fetch(\"/api/pricing\")\n      .then(res => res.json())\n      .then(data => { if (data.success && data.data) setPricingDocs(data.data); })\n      .catch(() => {});\n  }, []);"

if anchor in content and "api/pricing" not in content:
    content = content.replace(anchor, anchor + addition, 1)
    print("OK - pricing yükleme useEffect eklendi")
else:
    print("SKIP")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)

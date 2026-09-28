with open("lib/validation.js", "r", encoding="utf-8") as f:
    content = f.read()

old = '  document_type: z.string().max(200).optional().or(z.literal("")),\n  page_count:'
new = '  document_type: z.string().max(200).optional().or(z.literal("")),\n  delivery_method: z.string().max(50).optional().or(z.literal("")),\n  page_count:'

if old in content and "delivery_method" not in content[content.index("calculatePriceSchema"):content.index("Yardımcı")]:
    content = content.replace(old, new, 1)
    print("OK - delivery_method calculatePriceSchema'ya eklendi")
else:
    print("SKIP")

with open("lib/validation.js", "w", encoding="utf-8") as f:
    f.write(content)

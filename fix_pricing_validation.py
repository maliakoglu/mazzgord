# 1) validation.js'e document_type ekle
with open("lib/validation.js", "r", encoding="utf-8") as f:
    content = f.read()

old_schema = '''export const calculatePriceSchema = z.object({
  product_id: z.number().int().min(1).optional(),
  sku: z.string().max(100).optional().or(z.literal("")),
  page_count: z.number().int().min(1).max(10000).nullish(),
  word_count: z.number().int().min(1).max(1000000).nullish(),
  service_type: z.string().max(100).optional().or(z.literal("")),
  urgency: z.enum(["standart", "hizli", "acil"]).optional(),
  yeminli: z.boolean().optional(),
  noter_onay: z.boolean().optional(),
  quantity: z.number().int().min(1).max(10000).optional(),
  options: z.record(z.string(), z.any()).optional(),
});'''

new_schema = '''export const calculatePriceSchema = z.object({
  product_id: z.number().int().min(1).optional(),
  sku: z.string().max(100).optional().or(z.literal("")),
  document_type: z.string().max(200).optional().or(z.literal("")),
  page_count: z.number().int().min(1).max(10000).nullish(),
  word_count: z.number().int().min(1).max(1000000).nullish(),
  service_type: z.string().max(100).optional().or(z.literal("")),
  urgency: z.enum(["standart", "hizli", "acil"]).optional(),
  yeminli: z.boolean().optional(),
  noter_onay: z.boolean().optional(),
  quantity: z.number().int().min(1).max(10000).optional(),
  options: z.record(z.string(), z.any()).optional(),
});'''

if old_schema in content:
    content = content.replace(old_schema, new_schema, 1)
    print("1 OK - validation'a document_type eklendi")
else:
    print("1 SKIP")

with open("lib/validation.js", "w", encoding="utf-8") as f:
    f.write(content)

# 2) calculatePrice.js'de destructuring'e document_type ekle
with open("routes/calculatePrice.js", "r", encoding="utf-8") as f:
    content = f.read()

old_destructure = "const { product_id, sku, page_count, word_count, service_type, urgency, yeminli, noter_onay, quantity, options } = validation.data;"
new_destructure = "const { product_id, sku, document_type, page_count, word_count, service_type, urgency, yeminli, noter_onay, quantity, options } = validation.data;"

if old_destructure in content:
    content = content.replace(old_destructure, new_destructure, 1)
    print("2 OK - destructuring'e document_type eklendi")
else:
    print("2 SKIP")

with open("routes/calculatePrice.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Tamam.")

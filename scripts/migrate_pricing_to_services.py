import json, subprocess, re, sys

# pricing tablosunu çek
result = subprocess.run(
    ["npx", "wrangler", "d1", "execute", "mazzgord-db", "--remote", "--json",
     "--command=SELECT id, document_name, yeminli_price, noter_price, apostil_price, category FROM pricing ORDER BY category, document_name"],
    capture_output=True, text=True
)

try:
    data = json.loads(result.stdout)
    rows = data[0]["results"]
except Exception as e:
    print(f"Hata: {e}")
    print(result.stdout[:500])
    sys.exit(1)

print(f"Toplam {len(rows)} belge bulundu.")

CATEGORY_MAP = {
    "egitim": "egitim",
    "resmi": "resmi",
    "ticari": "ticari",
}

def slugify(name):
    s = name.lower()
    s = s.replace("ı", "i").replace("ö", "o").replace("ü", "u").replace("ş", "s").replace("ç", "c").replace("ğ", "g")
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = s.strip("-")
    # apostil variantları için suffix ekle
    if "(apostil)" in s:
        s = s.replace("-apostil", "-apostil")
    return s

def make_sku(name, pricing_id):
    # SKU: DOC-{id} formatında benzersiz
    return f"DOC-{pricing_id}"

count = 0
for r in rows:
    name = r["document_name"]
    yeminli = r["yeminli_price"]
    notary_diff = r["noter_price"] - r["yeminli_price"]
    apostil_diff = r["apostil_price"] - r["noter_price"]
    category = r["category"]

    slug = slugify(name)
    sku = make_sku(name, r["id"])

    # Options: acil %30, noter farkı, apostil farkı, kargo 250
    options = json.dumps([
        {"key": "urgent", "label": "Acil Çeviri", "type": "surcharge_percent", "value": 30},
        {"key": "notary", "label": "Noter Onayı", "type": "fixed_price", "value": notary_diff},
        {"key": "apostille", "label": "Apostil", "type": "fixed_price", "value": apostil_diff},
        {"key": "shipping", "label": "Kargo", "type": "fixed_price", "value": 250}
    ], ensure_ascii=False)

    # Açıklama
    desc = f"{name} yeminli tercüme. Sayfa başına ücretlendirilir."

    # SQL escape
    name_esc = name.replace("'", "''")
    desc_esc = desc.replace("'", "''")
    options_esc = options.replace("'", "''")

    sql = f"INSERT INTO services (sku, slug, name, description, category, unit, base_price, currency, active, tax_rate, delivery_type, sort_order, options) VALUES ('{sku}', '{slug}', '{name_esc}', '{desc_esc}', '{category}', 'page', {yeminli}, 'TRY', 1, 0.20, 'both', {r['id']}, '{options_esc}')"

    res = subprocess.run(
        ["npx", "wrangler", "d1", "execute", "mazzgord-db", "--remote", f"--command={sql}"],
        capture_output=True, text=True
    )

    if res.returncode != 0:
        # UNIQUE constraint — slug çakışması olabilir, slug'a id ekle
        if "UNIQUE" in res.stderr:
            slug = f"{slug}-{r['id']}"
            sql = f"INSERT INTO services (sku, slug, name, description, category, unit, base_price, currency, active, tax_rate, delivery_type, sort_order, options) VALUES ('{sku}', '{slug}', '{name_esc}', '{desc_esc}', '{category}', 'page', {yeminli}, 'TRY', 1, 0.20, 'both', {r['id']}, '{options_esc}')"
            res = subprocess.run(
                ["npx", "wrangler", "d1", "execute", "mazzgord-db", "--remote", f"--command={sql}"],
                capture_output=True, text=True
            )
            if res.returncode != 0:
                print(f"HATA: {name} — {res.stderr[:100]}")
                continue
        else:
            print(f"HATA: {name} — {res.stderr[:100]}")
            continue

    count += 1
    if count % 10 == 0:
        print(f"  {count}/{len(rows)} eklendi...")

print(f"\nTamamlandı: {count}/{len(rows)} ürün eklendi.")

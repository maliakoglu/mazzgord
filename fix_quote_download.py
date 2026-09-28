with open("routes/quote.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1) UUID SELECT'e delivered_file_key ekle
old_sel1 = "delivery_method, shipping_address, shipping_tracking, order_status, offer_status, estimated_price, delivery_date, created_at FROM quotes WHERE order_token = ?"
new_sel1 = "delivery_method, shipping_address, shipping_tracking, order_status, offer_status, estimated_price, delivery_date, delivered_file_key, created_at FROM quotes WHERE order_token = ?"
if old_sel1 in content:
    content = content.replace(old_sel1, new_sel1, 1)
    print("1 OK")
else:
    print("1 SKIP")

# 2) MZ SELECT'e delivered_file_key ekle
old_sel2 = "delivery_method, shipping_address, shipping_tracking, order_status, offer_status, estimated_price, delivery_date, created_at FROM quotes WHERE id = ?"
new_sel2 = "delivery_method, shipping_address, shipping_tracking, order_status, offer_status, estimated_price, delivery_date, delivered_file_key, created_at FROM quotes WHERE id = ?"
if old_sel2 in content:
    content = content.replace(old_sel2, new_sel2, 1)
    print("2 OK")
else:
    print("2 SKIP")

# 3) Response'a delivered_file_key ekle
old_resp = "          delivery_date: quote.delivery_date,\n          created_at: quote.created_at,"
new_resp = "          delivery_date: quote.delivery_date,\n          delivered_file_key: quote.delivered_file_key,\n          created_at: quote.created_at,"
if old_resp in content:
    content = content.replace(old_resp, new_resp, 1)
    print("3 OK")
else:
    print("3 SKIP")

with open("routes/quote.js", "w", encoding="utf-8") as f:
    f.write(content)
print("PARCA1 DONE")

with open("client/src/pages/SiparisTakip.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1) Order interface'e is_quote ekle
old_iface = "  delivered_file_key?: string | null;\n  created_at: string;\n}"
new_iface = "  delivered_file_key?: string | null;\n  is_quote?: boolean;\n  created_at: string;\n}"
if old_iface in content and "is_quote" not in content:
    content = content.replace(old_iface, new_iface, 1)
    print("1 OK")
else:
    print("1 SKIP")

# 2) fetchOrder'da quote formatına is_quote ekle
old_quote_set = '            delivery_method: q.delivery_method || "digital",\n            shipping_address: null,\n            shipping_tracking: q.shipping_tracking,\n            created_at: q.created_at });'
new_quote_set = '            delivery_method: q.delivery_method || "digital",\n            shipping_address: null,\n            shipping_tracking: q.shipping_tracking,\n            delivered_file_key: q.delivered_file_key || null,\n            is_quote: true,\n            created_at: q.created_at });'
if old_quote_set in content:
    content = content.replace(old_quote_set, new_quote_set, 1)
    print("2 OK")
else:
    print("2 SKIP")

# 3) orders akışı için is_quote = false ekle
old_order_set = "} else {\n          setOrder(data.data);\n        }"
new_order_set = "} else {\n          setOrder({ ...data.data, is_quote: false });\n        }"
if old_order_set in content:
    content = content.replace(old_order_set, new_order_set, 1)
    print("3 OK")
else:
    print("3 SKIP")

# 4) İndirme linkini dinamik yap
old_download = '                  <a href={`/api/orders/${order.payment_link_id}/download`}'
new_download = '                  <a href={order.is_quote ? `/api/quote/${order.payment_link_id}/download` : `/api/orders/${order.payment_link_id}/download`}'
if old_download in content:
    content = content.replace(old_download, new_download, 1)
    print("4 OK")
else:
    print("4 SKIP")

with open("client/src/pages/SiparisTakip.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("FRONTEND DONE")

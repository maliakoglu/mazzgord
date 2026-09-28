with open("worker.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1) Import ekle
import_anchor = 'import { handleServicesRoute } from "./routes/services.js";'
import_addition = '\nimport { handlePricingRoute } from "./routes/services.js";'

if import_anchor in content and "handlePricingRoute" not in content:
    content = content.replace(import_anchor, import_anchor + import_addition, 1)
    print("1 OK - import eklendi")
else:
    print("1 SKIP")

# 2) Route handler ekle — calculate-price route'undan sonra
route_anchor = '    if (path === "/api/calculate-price" && request.method === "POST") {'
route_addition = '    if (path === "/api/pricing" && request.method === "GET") {\n      return handlePricingRoute(path, request, env);\n    }\n    '

if route_anchor in content and "/api/pricing" not in content:
    content = content.replace(route_anchor, route_addition + route_anchor, 1)
    print("2 OK - route eklendi")
else:
    print("2 SKIP")

with open("worker.js", "w", encoding="utf-8") as f:
    f.write(content)
print("Worker route ekleme tamam.")

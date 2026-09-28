with open("client/src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1) Lazy import ekle — SiparisTakip'ten sonra
import_anchor = 'const SiparisTakip = lazy(() => import("@/pages/SiparisTakip"));'
import_addition = '\nconst Degerlendir = lazy(() => import("@/pages/Degerlendir"));'

if import_anchor in content and "Degerlendir" not in content:
    content = content.replace(import_anchor, import_anchor + import_addition, 1)
    print("✓ Import eklendi")
else:
    print("✗ Import anchor bulunamadı veya zaten eklenmiş")

# 2) Route ekle — SiparisTakip route'undan sonra
route_anchor = '<Route path={"/siparis"} component={SiparisTakip} />'
route_addition = '\n      <Route path={"/degerlendir"} component={Degerlendir} />'

if route_anchor in content and "/degerlendir" not in content:
    content = content.replace(route_anchor, route_anchor + route_addition, 1)
    print("✓ Route eklendi")
else:
    print("✗ Route anchor bulunamadı veya zaten eklenmiş")

with open("client/src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Route ekleme tamam.")

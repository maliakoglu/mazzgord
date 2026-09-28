with open("client/src/App.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1) CartProvider import'unu kaldır
content = content.replace('import { CartProvider } from "./contexts/CartContext";\n', '')
print("1 OK - import kaldirildi")

# 2) CartProvider wrapper'ını kaldır
content = content.replace("        <CartProvider>\n          <TooltipProvider>", "        <TooltipProvider>")
content = content.replace("          </TooltipProvider>\n        </CartProvider>", "          </TooltipProvider>")
print("2 OK - wrapper kaldirildi")

with open("client/src/App.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("App.tsx temizlendi")

with open("client/src/pages/TeklifFormu.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1) framer-motion import ekle
old_import = 'import { useState, useRef, useEffect } from "react";'
new_import = 'import { useState, useRef, useEffect } from "react";\nimport { motion, AnimatePresence } from "framer-motion";'

if old_import in content and "framer-motion" not in content:
    content = content.replace(old_import, new_import, 1)
    print("1 OK - framer-motion import eklendi")
else:
    print("1 SKIP")

# 2) Mobile bar'ı framer-motion ile değiştir
old_bar = '''      {/* Mobile Fiyat Barı */}
      {(priceEstimate !== null || priceLoading) && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t-2 border-primary/30 shadow-2xl">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Tahmini Fiyat</p>
              {priceLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  <span className="text-sm text-muted-foreground">Hesaplanıyor...</span>
                </div>
              ) : (
                <p className="text-xl font-bold text-primary">
                  {priceEstimate?.toLocaleString("tr-TR")} ₺
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Teslim</p>
              <p className="text-sm font-medium text-foreground">
                {formData.urgency === "acil" ? "24 saat" :
                 formData.urgency === "hizli" ? "1-2 gün" : "3-5 gün"}
              </p>
            </div>
          </div>
        </div>
      )}'''

new_bar = '''      {/* Mobile Fiyat Barı — Dinamik animasyonlu */}
      <AnimatePresence>
        {(priceEstimate !== null || priceLoading) && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t-2 border-primary/30 shadow-2xl"
          >
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Tahmini Fiyat</p>
                {priceLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                    <span className="text-sm text-muted-foreground">Hesaplanıyor...</span>
                  </div>
                ) : (
                  <motion.p
                    key={priceEstimate}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="text-xl font-bold text-primary"
                  >
                    {priceEstimate?.toLocaleString("tr-TR")} ₺
                  </motion.p>
                )}
              </div>
              <motion.div
                key={formData.urgency}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-right"
              >
                <p className="text-xs text-muted-foreground">Teslim</p>
                <p className="text-sm font-medium text-foreground">
                  {formData.urgency === "acil" ? "24 saat" :
                   formData.urgency === "hizli" ? "1-2 gün" : "3-5 gün"}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>'''

if old_bar in content:
    content = content.replace(old_bar, new_bar, 1)
    print("2 OK - mobile bar framer-motion ile güncellendi")
else:
    print("2 SKIP")

with open("client/src/pages/TeklifFormu.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Tamam.")

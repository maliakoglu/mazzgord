# -*- coding: utf-8 -*-

path = "client/src/pages/DenizliYeminliTercume.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1) Yeni FAQ bölümündeki duplicate soruyu benzersiz soruyla değiştir (sadece 2. occurrence)
old_dup = '<h3 className="font-bold text-primary mb-2">Denizli\'de yeminli tercüman nerede bulunur?</h3><p className="text-muted-foreground">Denizli merkezli yeminli tercümanım. Belgenizi online veya WhatsApp üzerinden iletebilir, teslimatınızı dijital veya kargo ile alabilirsiniz. Yüz yüze teslimat için randevu alın.</p>'
new_unique = '<h3 className="font-bold text-primary mb-2">Yeminli tercüme ile noter onaylı tercüme arasındaki fark nedir?</h3><p className="text-muted-foreground">Yeminli tercüme, yeminli tercümanın imza ve kaşesiyle resmi belge niteliği kazanır. Noter onaylı tercümede ise çeviri ayrıca noter huzurunda tasdik edilir. Bazı kurumlar yalnızca yeminli tercümeyi, bazıları ek olarak noter onayını şart koşar.</p>'

first = content.find(old_dup)
if first != -1:
    second = content.find(old_dup, first + 1)
    if second != -1:
        content = content[:second] + new_unique + content[second + len(old_dup):]
        print("Yeni FAQ'daki duplicate soru benzersiz soruyla değiştirildi.")
    else:
        print("UYARI: İkinci occurrence bulunamadı.")
else:
    print("UYARI: Soru hiç bulunamadı.")

# 2) İkinci FAQ başlığını yeniden adlandır (duplicate H2 önle)
old_h2 = '<h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2>'
new_h2 = '<h2 className="text-2xl font-bold text-primary mb-6">Denizli Yeminli Tercüme Hakkında Merak Edilenler</h2>'

idx = content.find(old_h2)
if idx != -1:
    idx2 = content.find(old_h2, idx + 1)
    if idx2 != -1:
        content = content[:idx2] + new_h2 + content[idx2 + len(old_h2):]
        print("İkinci FAQ başlığı yeniden adlandırıldı.")
    else:
        print("UYARI: İkinci FAQ başlığı bulunamadı.")
else:
    print("UYARI: FAQ başlığı bulunamadı.")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Dosya kaydedildi.")

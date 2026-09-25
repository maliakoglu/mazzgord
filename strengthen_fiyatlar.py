# -*- coding: utf-8 -*-

path = "client/src/pages/Fiyatlar.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Son FAQ maddesinden sonra 5 yeni FAQ ekle
anchor = '''            <div>
              <h4 className="font-medium text-foreground mb-1">Kargo ile teslimat var mı?</h4>
              <p className="text-sm text-muted-foreground">Evet, Türkiye'nin her yerine kargo ile fiziksel teslimat yapılır. Dijital teslimat (PDF) e-posta veya WhatsApp ile de mümkündür. Kargo bedeli gerçek gönderim bedelidir.</p>
            </div>
          </div>
        </div>'''

new_faqs = '''            <div>
              <h4 className="font-medium text-foreground mb-1">Kargo ile teslimat var mı?</h4>
              <p className="text-sm text-muted-foreground">Evet, Türkiye'nin her yerine kargo ile fiziksel teslimat yapılır. Dijital teslimat (PDF) e-posta veya WhatsApp ile de mümkündür. Kargo bedeli gerçek gönderim bedelidir.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Yeminli tercüme fiyatları ne kadar?</h4>
              <p className="text-sm text-muted-foreground">Yeminli tercüme sayfa başı 450 TL'den başlar. Pasaport, diploma, transkript, adli sicil gibi standart belgelerde fiyat sayfa sayısına göre belirlenir. Net fiyat için belgenizi WhatsApp'tan göndermeniz yeterli.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Transkript çeviri ücreti ne kadar?</h4>
              <p className="text-sm text-muted-foreground">Transkript çevirisi sayfa başı 450 TL'den başlar. Yurt dışı üniversite başvuruları için yeminli tercüman tarafından çevrilir, imzalanır ve kaşelenir. Çok sayfalı transkriptlerde toplu indirim uygulanabilir.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Akademik çeviri ücretleri nasıl hesaplanır?</h4>
              <p className="text-sm text-muted-foreground">Tez, makale ve bildiri çevirisi sayfa başı 450 TL'den başlar. Akademik terminoloji, APA/MLA formatı ve kaynakça düzenlemesi dahildir. Uzun belgelerde (tez gibi) toplu fiyat teklifi verilir.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Noter onaylı çeviri ücreti ne kadar?</h4>
              <p className="text-sm text-muted-foreground">Noter onaylı çeviride yeminli tercüme bedeli (sayfa başı 450 TL) + noter tasdik bedeli alınır. Noter bedeli belge türüne ve sayfa sayısına göre değişir; işlem öncesi noter makbuzuyla gerçek bedel teyit edilir.</p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-1">Belge tercümesi fiyatları neye göre değişir?</h4>
              <p className="text-sm text-muted-foreground">Belge türü, dil yönü, sayfa sayısı, metin yoğunluğu ve istenen onay türü (yeminli, noter, apostil) fiyatı belirler. Standart resmi belgelerde sayfa başı 450 TL sabit fiyat uygulanır.</p>
            </div>
          </div>
        </div>'''

if anchor in content:
    content = content.replace(anchor, new_faqs, 1)
    print("5 yeni FAQ eklendi.")
else:
    print("HATA: Anchor bulunamadı!")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
print("Dosya kaydedildi.")

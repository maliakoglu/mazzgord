# -*- coding: utf-8 -*-

path = "client/src/pages/DenizliYeminliTercume.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1) "İlgili Hizmetler" bölümünden önce iki yeni bölüm ekle
anchor = '''        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İlgili Hizmetler</h2>'''

new_sections = '''        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Denizli'de Hangi Belgeler İçin Yeminli Tercüme Yaptırabilirsiniz?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Resmi Belgeler</h3><p className="text-muted-foreground text-sm">Pasaport, kimlik, nüfus kayıt örneği, adli sicil kaydı, ikametgah, evlilik cüzdanı, doğum belgesi, sürücü belgesi.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Eğitim Belgeleri</h3><p className="text-muted-foreground text-sm">Diploma, transkript, öğrenci belgesi, denklik belgesi, sertifika, kurs bitirme belgesi, referans mektubu.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Vize ve Göçmenlik</h3><p className="text-muted-foreground text-sm">Vize başvuru dilekçesi, davetiye mektubu, banka hesap dökümü, maaş bordrosu, işyeri belgesi, seyahat sağlık sigortası.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Ticari ve Hukuki</h3><p className="text-muted-foreground text-sm">Sözleşme, fatura, şirket ana sözleşmesi, mahkeme kararı, vekaletname, patent başvurusu, ticaret sicil kaydı.</p></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Denizli'de Hizmet Verdiğim Bölgeler</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Denizli merkez ve tüm ilçelerine hizmet veriyorum. Yüz yüze teslimat için randevu oluşturabilir, online süreçle Türkiye'nin her yerinden belge gönderebilirsiniz.</p>
          <div className="flex flex-wrap gap-2">
            {["Pamukkale", "Merkezefendi", "Merkez", "Çardak", "Acıpayam", "Tavas", "Serinhisar", "Çivril", "Honaz", "Sarayköy", "Bozkurt", "Buldan", "Bekilli", "Kale", "Güney", "Babadağ", "Baklan"].map(b => (
              <span key={b} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm">{b}</span>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4">Ayrıca komşu illerden — Burdur, Aydın, Muğla, Uşak, Isparta — ve yurt dışından online belge kabul ediyorum. Kargo ile teslimat mümkündür.</p>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4">
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Denizli yeminli tercüman fiyatları ne kadar?</h3><p className="text-muted-foreground">Sayfa başı 450 TL'den başlar. Pasaport, diploma, transkript ve vize belgeleri için net fiyat, belgeyi inceledikten sonra verilir. Acil teslimat ve noter onayı ek ücret gerektirebilir.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Denizli'de yeminli tercüman nerede bulunur?</h3><p className="text-muted-foreground">Denizli merkezli yeminli tercümanım. Belgenizi online veya WhatsApp üzerinden iletebilir, teslimatınızı dijital veya kargo ile alabilirsiniz. Yüz yüze teslimat için randevu alın.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Yeminli tercüme noter onayı gerektirir mi?</h3><p className="text-muted-foreground">Yeminli tercümanın imza ve kaşesi belgeye resmi nitelik kazandırır. Bazı kurumlar ek olarak noter tasdiki ister — noter onaylı tercüme hizmeti de sunuyorum.</p></div>
            <div className="p-5 bg-card rounded-lg border border-border"><h3 className="font-bold text-primary mb-2">Denizli'de aynı gün yeminli tercüme yapılır mı?</h3><p className="text-muted-foreground">Evet. Standart belgelerde (pasaport, diploma, nüfus kayıt örneği) aynı gün teslimat mümkündür. Acil talepler için WhatsApp'tan öncelikli işlem talep edebilirsiniz.</p></div>
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-primary mb-6">İlgili Hizmetler</h2>'''

if anchor in content:
    content = content.replace(anchor, new_sections, 1)
    print("Yeni bölümler eklendi.")
else:
    print("HATA: Anchor bulunamadı!")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Dosya kaydedildi.")

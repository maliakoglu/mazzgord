import re

with open("lib/seoData.js", "r", encoding="utf-8") as f:
    content = f.read()

updates = {
    # Ana sayfa — "tercüme" sorgusu pozisyon 4.54, 123 gösterim 0 tıklama
    '"title": "Yeminli Tercüman | İngilizce-Türkçe Çeviri | Sayfa Başı 450 TL | Mazzgord"':
        '"title": "Yeminli Tercüman | Aynı Gün Teslimat | Sayfa Başı 450₺ | Denizli"',

    # /yeminli-tercume — "yeminli tercüme" pozisyon 1.09, 0 tıklama!
    '"title": "Denizli Yeminli Tercüman | Noter Onaylı | Mazzgord"':
        '"title": "Yeminli Tercüme | Noter Onaylı | Aynı Gün Teslim | 450₺/Sayfa"',

    # /ingilizce-turkce-ceviri — "tercüme" ile ilgili sorgularda görünüyor
    '"title": "İngilizce Türkçe Çeviri | Yeminli Tercüme | Sayfa Başı 450 TL | Mazzgord"':
        '"title": "İngilizce Türkçe Çeviri | Yeminli Tercüman | 450₺/Sayfa | Aynı Gün"',

    # /denizli-yeminli-tercume — "denizli yeminli tercüman" pozisyon 15.96, 198 gösterim!
    '"title": "Denizli Yeminli Tercüman | İngilizce-Türkçe Yeminli Çeviri | Mazzgord"':
        '"title": "Denizli Yeminli Tercüman | 8+ Yıl Deneyim | Aynı Gün Teslim | 450₺"',

    # /fiyatlar — "belge tercümesi fiyatları" pozisyon 73, "yeminli tercüme fiyatları" pozisyon 88
    '"title": "Çeviri Fiyatları 2026 | Sayfa Başı 450 TL | Yeminli Tercüme | Mazzgord"':
        '"title": "Çeviri Fiyatları 2026 | Yeminli Tercüme | Sayfa Başı 450₺ | Net Fiyat"',

    # /pasaport-ceviri
    '"title": "Pasaport Çevirisi | Yeminli Tercüme | Mazzgord"':
        '"title": "Pasaport Çevirisi | Yeminli Tercüman | Aynı Gün Teslim | 450₺/Sayfa"',

    # /diploma-ceviri
    '"title": "Diploma Çevirisi | Yeminli Tercüme | Mazzgord"':
        '"title": "Diploma Çevirisi | Yeminli Tercüman | Yurt Dışı Başvuru | 450₺"',

    # /transkript-ceviri — "transkript çeviri ücreti" pozisyon 87
    '"title": "Transkript Çevirisi | İngilizce-Türkçe Yeminli Tercüme | Mazzgord"':
        '"title": "Transkript Çevirisi | Yeminli Tercüman | 450₺/Sayfa | Aynı Gün"',

    # /akademik-ceviri — "akademik çeviri ücretleri" pozisyon 96
    '"title": "Akademik Çeviri | Tez, Makale, Bildiri | Fiyatlar 2026 | Mazzgord"':
        '"title": "Akademik Çeviri | Tez & Makale Çevirisi | 450₺/Sayfa | 2026"',

    # /vize-ceviri
    '"title": "Vize Başvuru Çeviri Hizmetleri | Denizli | Mazzgord"':
        '"title": "Vize Çevirisi | Schengen & ABD & İngiltere | Yeminli Tercüman"',

    # /teknik-ceviri — "teknik çeviri nedir" pozisyon 94
    '"title": "Teknik Çeviri | Kullanım Kılavuzu ve Şartname Çevirisi | Mazzgord"':
        '"title": "Teknik Çeviri | Kullanım Kılavuzu & Şartname | Yeminli Tercüman"',

    # /acil-tercume
    '"title": "Acil Tercüme | Hızlı İngilizce-Türkçe Yeminli Çeviri | Mazzgord"':
        '"title": "Acil Tercüme | Aynı Gün Teslimat | Yeminli Tercüman | Hızlı"',

    # /hakkimizda
    '"title": "Yeminli Tercüman Mehmet Akoğlu | 8+ Yıl Deneyim | Mazzgord Denizli"':
        '"title": "Yeminli Tercüman Mehmet Akoğlu | 8+ Yıl Deneyim | Denizli"',

    # /denizli-noter-onayli-tercume
    '"title": "Denizli Noter Onaylı Tercüme | Yeminli Çeviri Hizmeti | Mazzgord"':
        '"title": "Denizli Noter Onaylı Tercüme | Yeminli Tercüman | Aynı Gün"',

    # /denizli-pasaport-tercumesi
    '"title": "Denizli Pasaport Tercümesi | İngilizce-Türkçe Yeminli Çeviri | Mazzgord"':
        '"title": "Denizli Pasaport Tercümesi | Yeminli Tercüman | Aynı Gün | 450₺"',

    # /denizli-diploma-tercumesi
    '"title": "Denizli Diploma Tercümesi | İngilizce-Türkçe Yeminli Çeviri | Mazzgord"':
        '"title": "Denizli Diploma Tercümesi | Yeminli Tercüman | Yurt Dışı | 450₺"',

    # /denizli-vize-tercumesi
    '"title": "Denizli Vize Tercümesi | İngilizce-Türkçe Yeminli Çeviri | Mazzgord"':
        '"title": "Denizli Vize Tercümesi | Schengen & ABD | Yeminli Tercüman"',

    # /denizli-apostil-tercume
    '"title": "Denizli Apostil Tercüme | Yeminli Çeviri ve Apostil İşlemleri | Mazzgord"':
        '"title": "Denizli Apostil Tercüme | Yeminli Tercüman | Lahey Sözleşmesi"',

    # /noter-onayli-tercume — "noter onaylı çeviri" pozisyon 96
    '"title": "Denizli Noter Onaylı Tercüme | Yeminli Çeviri Hizmeti | Mazzgord"':
        '"title": "Noter Onaylı Çeviri | Yeminli Tercüman | Aynı Gün Teslim | 450₺"',

    # /apostil-tercume
    '"title": "Denizli Apostil Tercüme | Yeminli Çeviri ve Apostil İşlemleri | Mazzgord"':
        '"title": "Apostil Tercüme | Yeminli Tercüman | Lahey Sözleşmesi | Denizli"',
}

count = 0
for old, new in updates.items():
    if old in content:
        content = content.replace(old, new)
        count += 1
    else:
        print(f"UYARI: Bulunamadı: {old[:60]}...")

with open("lib/seoData.js", "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{count} başlık güncellendi.")

with open("lib/seoData.js", "r", encoding="utf-8") as f:
    content = f.read()

updates = {
    # Ana sayfa
    '"description": "Denizli yeminli tercüman. İngilizce-Türkçe pasaport, diploma, vize çevirisi. Noter onaylı, aynı gün teslimat. Sayfa başı 450 TL. Ücretsiz teklif alın."':
        '"description": "Denizli yeminli tercüman. Aynı gün teslimat, noter onaylı. Pasaport, diploma, vize çevirisi sayfa başı 450₺. Ücretsiz teklif için WhatsApp: 0538 629 50 40."',

    # /yeminli-tercume
    '"description": "Denizli yeminli tercüman. Noter onaylı pasaport, diploma, evlilik cüzdanı ve resmi belge çevirisi. Hızlı teslimat, uygun fiyat."':
        '"description": "Yeminli tercüme: pasaport, diploma, vize, resmi belge çevirisi. Noter onaylı, aynı gün teslimat. Sayfa başı 450₺. Ücretsiz teklif alın."',

    # /denizli-yeminli-tercume — 198 gösterim!
    '"description": "Denizli merkezli yeminli tercüman. İngilizce-Türkçe resmi belge çevirisi — pasaport, diploma, vize evrakı. Online veya yüz yüze hizmet, aynı gün teslimat."':
        '"description": "Denizli yeminli tercüman Mehmet Akoğlu. 8+ yıl deneyim. Pasaport, diploma, vize çevirisi. Noter onaylı, aynı gün teslimat. Sayfa başı 450₺. Hemen teklif alın."',

    # /fiyatlar
    '"description": "2026 yeminli tercüme fiyatları. Pasaport, diploma, vize çevirisi sayfa başı 450 TL. Net fiyat için belgenizi WhatsApp\'tan gönderin."':
        '"description": "2026 çeviri fiyatları: yeminli tercüme sayfa başı 450₺. Pasaport, diploma, vize, transkript çevirisi. Net fiyat için belgenizi WhatsApp\'tan gönderin."',

    # /ingilizce-turkce-ceviri
    '"description": "İngilizce-Türkçe yeminli çeviri. Pasaport, diploma, vize, sözleşme çevirisi. Noter onaylı, aynı gün teslimat. Sayfa başı 450 TL. Ücretsiz teklif alın."':
        '"description": "İngilizce-Türkçe yeminli çeviri. Pasaport, diploma, vize, sözleşme çevirisi. Noter onaylı, aynı gün teslimat. 450₺/sayfa. Ücretsiz teklif alın."',

    # /pasaport-ceviri
    '"description": "Pasaport çevirisi için profesyonel yeminli tercüme hizmeti. İngilizce-Türkçe pasaport tercümesi, vize ve resmi başvurular için hızlı ve güvenilir çeviri."':
        '"description": "Pasaport çevirisi: yeminli tercüman tarafından İngilizce-Türkçe çeviri. Vize başvurusu için aynı gün teslimat. 450₺/sayfa. Ücretsiz teklif."',

    # /diploma-ceviri
    '"description": "Diploma ve transkript çevirisi için profesyonel yeminli tercüme hizmeti. İngilizce-Türkçe diploma çevirisi, yurt dışı başvurular için hızlı ve güvenilir çeviri."':
        '"description": "Diploma çevirisi: yeminli tercüman tarafından İngilizce-Türkçe çeviri. Yurt dışı başvuru için aynı gün teslimat. 450₺/sayfa. Ücretsiz teklif."',

    # /transkript-ceviri
    '"description": "Transkript çevirisi için profesyonel yeminli tercüme hizmeti. İngilizce-Türkçe transkript tercümesi, yurt dışı eğitim başvuruları için hızlı ve güvenilir çeviri."':
        '"description": "Transkript çevirisi: yeminli tercüman tarafından İngilizce-Türkçe çeviri. Yurt dışı eğitim başvurusu için aynı gün. 450₺/sayfa. Ücretsiz teklif."',

    # /akademik-ceviri
    '"description": "Akademik çeviri ücretleri 2026. Tez, makale, bildiri ve özet çevirisi. APA/MLA formatına uygun İngilizce-Türkçe akademik tercüme. Sayfa başı 450 TL. Ücretsiz teklif."':
        '"description": "Akademik çeviri: tez, makale, bildiri çevirisi. APA/MLA formatına uygun. 450₺/sayfa, aynı gün teslimat. Ücretsiz teklif alın."',

    # /vize-ceviri
    '"description": "Denizli\'de Schengen, Amerika, İngiltere ve Kanada vize başvuruları için profesyonel belge çevirisi ve yeminli tercüme hizmetleri."':
        '"description": "Vize çevirisi: Schengen, ABD, İngiltere, Kanada başvuruları için yeminli tercüman. Noter onaylı, aynı gün. 450₺/sayfa. Ücretsiz teklif."',

    # /teknik-ceviri
    '"description": "Teknik belge çevirisi: kullanım kılavuzu, şartname, MSDS, patent. İngilizce-Türkçe terminoloji tutarlılığı ve doğru format. Online teklif."':
        '"description": "Teknik çeviri: kullanım kılavuzu, şartname, MSDS, patent. İngilizce-Türkçe terminoloji tutarlılığı. 450₺/sayfa. Ücretsiz teklif alın."',

    # /acil-tercume
    '"description": "Acil çeviri ihtiyacınız için aynı gün teslimat. İngilizce-Türkçe yeminli tercüme. Belgenizi gönderin, öncelikli olarak çevirip teslim edeyim."':
        '"description": "Acil tercüme: aynı gün teslimat. İngilizce-Türkçe yeminli çeviri. Belgenizi gönderin, öncelikli çeviri. 450₺/sayfa. WhatsApp: 0538 629 50 40."',

    # /hakkimizda
    '"description": "Denizli yeminli tercüman Mehmet Akoğlu. 8+ yıl deneyimle İngilizce-Türkçe pasaport, diploma, vize çevirisi. Noter onaylı, aynı gün teslimat."':
        '"description": "Denizli yeminli tercüman Mehmet Akoğlu. 8+ yıl deneyim. İngilizce-Türkçe pasaport, diploma, vize çevirisi. Noter onaylı, aynı gün teslimat."',

    # /noter-onayli-tercume
    '"description": "Denizli\'de noter onaylı tercüme. Pasaport, diploma, vize belgeleri ve resmi evraklar için yeminli tercüman tarafından yapılan, noter tasdikli çeviri hizmeti."':
        '"description": "Noter onaylı çeviri: pasaport, diploma, vize, resmi evrak. Yeminli tercüman tarafından yapılır, noter tasdikli. Aynı gün. 450₺/sayfa."',
}

count = 0
for old, new in updates.items():
    if old in content:
        content = content.replace(old, new)
        count += 1
    else:
        print(f"UYARI: Bulunamadı: {old[:70]}...")

with open("lib/seoData.js", "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{count} description güncellendi.")

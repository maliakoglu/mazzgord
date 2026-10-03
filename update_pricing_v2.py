#!/usr/bin/env python3
"""
Fiyatlandırma v2:
- Yeminli tercüme: min 450 TL (mevcut fiyatlar korunur, 450'den düşük yok)
- Noter masrafı: 2026 tarifesine göre (301 TL tek sayfa, 543 TL iki sayfa)
- Noter takip: 700 TL (tek sayfa), 900 TL (iki sayfa)
- Apostil takip: 400 TL
- noter_price = yeminli + noter_masraf + noter_takip
- apostil_price = noter_price + apostil_takip
"""

YAZI_UCRETI = 80.68
KARSILASTIRMA_UCRETI = 80.68
NOTER_UCRETI_MIN = 58.82

def noter_masraf_hesapla(sayfa):
    yazu = YAZI_UCRETI * 2 * sayfa
    kars = KARSILASTIRMA_UCRETI * sayfa
    noter = NOTER_UCRETI_MIN
    return round(yazu + kars + noter)

IKI_SAYFALIK = {
    "Vekaletname (Genel)", "Kira Sözleşmesi", "Satış Sözleşmesi",
    "Şirket Ana Sözleşmesi", "Ticaret Sicil Gazetesi",
    "Transkript (Çoklu Sayfa)", "Özgeçmiş (CV)", "SGK Hizmet Dökümü",
    "Heyet Raporu", "Epikriz Raporu", "Laboratuvar Sonuçları",
    "Mahkeme Kararı (Kısa)", "Boşanma İlamı", "Vasiyetname",
    "Diğer Resmi Yazışmalar", "Sağlık Raporu (Tek Hekim)",
    "Sabıka Kaydı (Arşivli)", "Banka Hesap Özeti (Detaylı)",
    "Evlilik Cüzdanı",
}

belgeler = [
    (1, "Adli Sicil Kaydı", 450, "resmi"),
    (2, "Adli Sicil Kaydı (Apostil)", 450, "resmi"),
    (3, "Adres Yerleşim Yeri Belgesi", 450, "resmi"),
    (4, "Adres Yerleşim Yeri Belgesi (Apostil)", 450, "resmi"),
    (5, "Askerlik Durum Belgesi", 450, "resmi"),
    (6, "Diploma", 550, "egitim"),
    (7, "Diploma (Apostil)", 550, "egitim"),
    (8, "Doğum Raporu", 450, "resmi"),
    (9, "Ehliyet", 450, "resmi"),
    (10, "Evlenme Bildirim Formu", 450, "resmi"),
    (11, "Evlilik Cüzdanı", 750, "resmi"),
    (12, "Formül A (Doğum Belgesi)", 450, "resmi"),
    (13, "Formül A (Doğum Belgesi) (Apostil)", 450, "resmi"),
    (14, "Formül B (Evlilik Kayıt Belgesi)", 450, "resmi"),
    (15, "Formül B (Evlilik Kayıt Belgesi) (Apostil)", 450, "resmi"),
    (16, "Formül C (Ölüm Belgesi)", 450, "resmi"),
    (17, "Geçici Mezuniyet Belgesi", 550, "egitim"),
    (18, "İmza Sirküleri (Tek Sayfa)", 600, "ticari"),
    (19, "Katılım Belgesi", 450, "egitim"),
    (20, "Kimlik Kartı", 450, "resmi"),
    (21, "Lise Transkripti", 600, "egitim"),
    (22, "Muvafakatname (Tek Sayfa)", 600, "resmi"),
    (23, "Taahhütname (Tek Sayfa)", 450, "resmi"),
    (24, "Nüfus Kayıt Örneği (Tek Sayfa)", 450, "resmi"),
    (25, "Nüfus Kayıt Örneği (Tek Sayfa) (Apostil)", 450, "resmi"),
    (26, "Öğrenci Belgesi", 450, "egitim"),
    (27, "Pasaport", 450, "resmi"),
    (28, "Patent Belgesi", 750, "ticari"),
    (29, "Sabıka Kaydı", 450, "resmi"),
    (30, "Sertifika", 450, "egitim"),
    (31, "Tapu Senedi", 550, "resmi"),
    (32, "Vekaletname (Tek Sayfa)", 600, "resmi"),
    (33, "Vekaletname (Tek Sayfa) (Apostil)", 600, "resmi"),
    (34, "Vergi Levhası", 550, "ticari"),
    (35, "Yüksek Lisans Diploması", 550, "egitim"),
    (36, "Doktora Diploması", 550, "egitim"),
    (37, "Transkript (1 Sayfa)", 600, "egitim"),
    (38, "Transkript (Çoklu Sayfa)", 600, "egitim"),
    (39, "Niyet Mektubu (Eğitim)", 550, "egitim"),
    (40, "Özgeçmiş (CV)", 750, "egitim"),
    (41, "Referans Mektubu", 550, "egitim"),
    (42, "Kurs Bitirme Belgesi", 450, "egitim"),
    (43, "Araç Tescil Belgesi (Ruhsat)", 450, "resmi"),
    (44, "Banka Hesap Özeti (1 Sayfa)", 450, "resmi"),
    (45, "Banka Hesap Özeti (Detaylı)", 550, "resmi"),
    (46, "Maaş Bordrosu", 450, "resmi"),
    (47, "SGK Hizmet Dökümü", 550, "resmi"),
    (48, "Sabıka Kaydı (Arşivli)", 750, "resmi"),
    (49, "Vekaletname (Genel)", 600, "resmi"),
    (50, "Kira Sözleşmesi", 750, "resmi"),
    (51, "Sağlık Raporu (Tek Hekim)", 750, "resmi"),
    (52, "Heyet Raporu", 750, "resmi"),
    (53, "Epikriz Raporu", 750, "resmi"),
    (54, "Laboratuvar Sonuçları", 750, "resmi"),
    (55, "Mahkeme Kararı (Kısa)", 750, "resmi"),
    (56, "Boşanma İlamı", 750, "resmi"),
    (57, "Vasiyetname", 750, "resmi"),
    (58, "Vize Başvuru Dilekçesi", 450, "resmi"),
    (59, "Diğer Resmi Yazışmalar", 750, "resmi"),
    (60, "Satış Sözleşmesi", 750, "ticari"),
    (61, "Şirket Ana Sözleşmesi", 750, "ticari"),
    (62, "Ticaret Sicil Gazetesi", 750, "ticari"),
    (63, "Faaliyet Belgesi", 550, "ticari"),
]

sql_lines = []
print(f"{'ID':>3} | {'Belge':<45} | {'Sayfa':>5} | {'Yeminli':>7} | {'N.Masraf':>8} | {'N.Takip':>7} | {'N.Toplam':>8} | {'A.Takip':>7} | {'A.Toplam':>8}")
print("-" * 120)

for doc_id, name, yeminli, cat in belgeler:
    sayfa = 2 if name in IKI_SAYFALIK else 1
    noter_masraf = noter_masraf_hesapla(sayfa)
    noter_takip = 900 if sayfa == 2 else 700
    apostil_takip = 400
    noter_price = yeminli + noter_masraf + noter_takip
    apostil_price = noter_price + apostil_takip
    has_apostil = 1 if "(Apostil)" in name else 0

    print(f"{doc_id:>3} | {name:<45} | {sayfa:>5} | {yeminli:>7} | {noter_masraf:>8} | {noter_takip:>7} | {noter_price:>8} | {apostil_takip:>7} | {apostil_price:>8}")

    sql_lines.append(
        f"UPDATE pricing SET yeminli_price={yeminli}, noter_masraf={noter_masraf}, noter_takip={noter_takip}, apostil_takip={apostil_takip}, noter_price={noter_price}, apostil_price={apostil_price} WHERE id={doc_id};"
    )

with open("update_pricing_v2.sql", "w") as f:
    f.write("-- Fiyatlandırma v2: min 450 TL tercüme, gerçekçi noter takip bedeli\n\n")
    f.write("\n".join(sql_lines))
    f.write("\n")

print(f"\n{len(sql_lines)} UPDATE satırı update_pricing_v2.sql dosyasına yazıldı.")

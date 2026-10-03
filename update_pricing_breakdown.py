#!/usr/bin/env python3
"""
2026 Noterlik Ücret Tarifesi'ne göre pricing tablosunu günceller.
noter_masraf: Gerçek noter bedeli (yazı + karşılaştırma + noter ücreti)
noter_takip: Mazzgord'un notere götürme/takip/teslim hizmet bedeli
apostil_takip: Mazzgord'un apostil başvuru/takip/teslim hizmet bedeli
"""

# 2026 Noterlik Ücret Tarifesi kalemleri
YAZI_UCRETI = 80.68       # Madde 3 - sayfa başına
KARSILASTIRMA_UCRETI = 80.68  # Madde 5 - sayfa başına (asıllar hariç)
NOTER_UCRETI_MIN = 58.82  # Madde 1 - minimum işlem başına
TESCIL_UCRETI = 25.21     # Madde 6 - işlem başına (gerektiğinde)

def noter_masraf_hesapla(sayfa_sayisi):
    """1 sayfalık tercüme için noter masrafı hesapla"""
    # Yazı ücreti: asıl + örnek (2 nüsha) × sayfa
    yazu = YAZI_UCRETI * 2 * sayfa_sayisi
    # Karşılaştırma ücreti: tercüme sayfaları (asıl hariç)
    kars = KARSILASTIRMA_UCRETI * sayfa_sayisi
    # Noter ücreti: minimum
    noter = NOTER_UCRETI_MIN
    toplam = yazu + kars + noter
    return round(toplam)

# Belge → sayfa sayısı eşlemesi
# Çoğu belge 1 sayfa, sözleşmeler ve raporlar 2 sayfa
TEK_SAYFA = 1
COK_SAYFA = 2

# 2 sayfa olan belgeler (ID → sayfa)
IKI_SAYFALIK = {
    "Vekaletname (Genel)",
    "Kira Sözleşmesi",
    "Satış Sözleşmesi",
    "Şirket Ana Sözleşmesi",
    "Ticaret Sicil Gazetesi",
    "Transkript (Çoklu Sayfa)",
    "Özgeçmiş (CV)",
    "SGK Hizmet Dökümü",
    "Heyet Raporu",
    "Epikriz Raporu",
    "Laboratuvar Sonuçları",
    "Mahkeme Kararı (Kısa)",
    "Boşanma İlamı",
    "Vasiyetname",
    "Diğer Resmi Yazışmalar",
    "Sağlık Raporu (Tek Hekim)",
    "Sabıka Kaydı (Arşivli)",
    "Banka Hesap Özeti (Detaylı)",
    "Evlilik Cüzdanı",
}

# Tüm belgeler (D1'den alınan veri)
belgeler = [
    (1, "Adli Sicil Kaydı", 450, 2650, 3050, 0, "resmi"),
    (2, "Adli Sicil Kaydı (Apostil)", 450, 2650, 3050, 1, "resmi"),
    (3, "Adres Yerleşim Yeri Belgesi", 450, 2650, 3050, 0, "resmi"),
    (4, "Adres Yerleşim Yeri Belgesi (Apostil)", 450, 2650, 3050, 1, "resmi"),
    (5, "Askerlik Durum Belgesi", 450, 2650, 3050, 0, "resmi"),
    (6, "Diploma", 550, 2850, 3250, 0, "egitim"),
    (7, "Diploma (Apostil)", 1100, 4250, 4600, 1, "egitim"),
    (8, "Doğum Raporu", 450, 2650, 3050, 0, "resmi"),
    (9, "Ehliyet", 450, 2650, 3050, 0, "resmi"),
    (10, "Evlenme Bildirim Formu", 450, 2650, 3050, 0, "resmi"),
    (11, "Evlilik Cüzdanı", 750, 3000, 3400, 0, "resmi"),
    (12, "Formül A (Doğum Belgesi)", 450, 2650, 3050, 0, "resmi"),
    (13, "Formül A (Doğum Belgesi) (Apostil)", 450, 2650, 3050, 1, "resmi"),
    (14, "Formül B (Evlilik Kayıt Belgesi)", 450, 2650, 3050, 0, "resmi"),
    (15, "Formül B (Evlilik Kayıt Belgesi) (Apostil)", 450, 2650, 3050, 1, "resmi"),
    (16, "Formül C (Ölüm Belgesi)", 450, 2650, 3050, 0, "resmi"),
    (17, "Geçici Mezuniyet Belgesi", 550, 2850, 3250, 0, "egitim"),
    (18, "İmza Sirküleri (Tek Sayfa)", 600, 3000, 3400, 0, "ticari"),
    (19, "Katılım Belgesi", 450, 2650, 3050, 0, "egitim"),
    (20, "Kimlik Kartı", 450, 2650, 3050, 0, "resmi"),
    (21, "Lise Transkripti", 600, 3000, 3400, 0, "egitim"),
    (22, "Muvafakatname (Tek Sayfa)", 600, 3000, 3400, 0, "resmi"),
    (23, "Taahhütname (Tek Sayfa)", 450, 2650, 3050, 0, "resmi"),
    (24, "Nüfus Kayıt Örneği (Tek Sayfa)", 450, 2650, 3050, 0, "resmi"),
    (25, "Nüfus Kayıt Örneği (Tek Sayfa) (Apostil)", 450, 2650, 3050, 1, "resmi"),
    (26, "Öğrenci Belgesi", 450, 2650, 3050, 0, "egitim"),
    (27, "Pasaport", 450, 2650, 3050, 0, "resmi"),
    (28, "Patent Belgesi", 750, 3000, 3400, 0, "ticari"),
    (29, "Sabıka Kaydı", 450, 2650, 3050, 0, "resmi"),
    (30, "Sertifika", 450, 2650, 3050, 0, "egitim"),
    (31, "Tapu Senedi", 550, 2850, 3250, 0, "resmi"),
    (32, "Vekaletname (Tek Sayfa)", 600, 3000, 3400, 0, "resmi"),
    (33, "Vekaletname (Tek Sayfa) (Apostil)", 600, 3000, 3400, 1, "resmi"),
    (34, "Vergi Levhası", 550, 2850, 3250, 0, "ticari"),
    (35, "Yüksek Lisans Diploması", 550, 2850, 3250, 0, "egitim"),
    (36, "Doktora Diploması", 550, 2850, 3250, 0, "egitim"),
    (37, "Transkript (1 Sayfa)", 600, 3000, 3400, 0, "egitim"),
    (38, "Transkript (Çoklu Sayfa)", 600, 3000, 3400, 0, "egitim"),
    (39, "Niyet Mektubu (Eğitim)", 550, 2850, 3250, 0, "egitim"),
    (40, "Özgeçmiş (CV)", 750, 3000, 3400, 0, "egitim"),
    (41, "Referans Mektubu", 550, 2850, 3250, 0, "egitim"),
    (42, "Kurs Bitirme Belgesi", 450, 2650, 3050, 0, "egitim"),
    (43, "Araç Tescil Belgesi (Ruhsat)", 450, 2650, 3050, 0, "resmi"),
    (44, "Banka Hesap Özeti (1 Sayfa)", 450, 2650, 3050, 0, "resmi"),
    (45, "Banka Hesap Özeti (Detaylı)", 550, 2850, 3250, 0, "resmi"),
    (46, "Maaş Bordrosu", 450, 2650, 3050, 0, "resmi"),
    (47, "SGK Hizmet Dökümü", 550, 2850, 3250, 0, "resmi"),
    (48, "Sabıka Kaydı (Arşivli)", 750, 3000, 3400, 0, "resmi"),
    (49, "Vekaletname (Genel)", 600, 3000, 3400, 0, "resmi"),
    (50, "Kira Sözleşmesi", 750, 3000, 3400, 0, "resmi"),
    (51, "Sağlık Raporu (Tek Hekim)", 750, 3000, 3400, 0, "resmi"),
    (52, "Heyet Raporu", 750, 3000, 3400, 0, "resmi"),
    (53, "Epikriz Raporu", 750, 3000, 3400, 0, "resmi"),
    (54, "Laboratuvar Sonuçları", 750, 3000, 3400, 0, "resmi"),
    (55, "Mahkeme Kararı (Kısa)", 750, 3000, 3400, 0, "resmi"),
    (56, "Boşanma İlamı", 750, 3000, 3400, 0, "resmi"),
    (57, "Vasiyetname", 750, 3000, 3400, 0, "resmi"),
    (58, "Vize Başvuru Dilekçesi", 450, 2650, 3050, 0, "resmi"),
    (59, "Diğer Resmi Yazışmalar", 750, 3000, 3400, 0, "resmi"),
    (60, "Satış Sözleşmesi", 750, 3000, 3400, 0, "ticari"),
    (61, "Şirket Ana Sözleşmesi", 750, 3000, 3400, 0, "ticari"),
    (62, "Ticaret Sicil Gazetesi", 750, 3000, 3400, 0, "ticari"),
    (63, "Faaliyet Belgesi", 550, 2850, 3250, 0, "ticari"),
]

sql_lines = []
print(f"{'ID':>3} | {'Belge':<45} | {'Sayfa':>5} | {'Yeminli':>7} | {'N.Masraf':>8} | {'N.Takip':>7} | {'N.Toplam':>8} | {'A.Takip':>7} | {'A.Toplam':>8}")
print("-" * 120)

for doc_id, name, yeminli, noter_toplam, apostil_toplam, has_apostil, cat in belgeler:
    sayfa = COK_SAYFA if name in IKI_SAYFALIK else TEK_SAYFA
    noter_masraf = noter_masraf_hesapla(sayfa)
    noter_takip = noter_toplam - yeminli - noter_masraf
    apostil_takip = apostil_toplam - noter_toplam

    print(f"{doc_id:>3} | {name:<45} | {sayfa:>5} | {yeminli:>7} | {noter_masraf:>8} | {noter_takip:>7} | {noter_toplam:>8} | {apostil_takip:>7} | {apostil_toplam:>8}")

    sql_lines.append(
        f"UPDATE pricing SET noter_masraf={noter_masraf}, noter_takip={noter_takip}, apostil_takip={apostil_takip} WHERE id={doc_id};"
    )

with open("update_pricing_breakdown.sql", "w") as f:
    f.write("-- 2026 Noterlik Ücret Tarifesi'ne göre fiyat dökümü\n")
    f.write("-- noter_masraf: Gerçek noter bedeli (yazı + karşılaştırma + noter ücreti)\n")
    f.write("-- noter_takip: Mazzgord notere götürme/takip/teslim hizmet bedeli\n")
    f.write("-- apostil_takip: Mazzgord apostil başvuru/takip/teslim hizmet bedeli\n\n")
    f.write("\n".join(sql_lines))
    f.write("\n")

print(f"\n{len(sql_lines)} UPDATE satırı update_pricing_breakdown.sql dosyasına yazıldı.")

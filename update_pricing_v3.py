#!/usr/bin/env python3
"""
Fiyatlandırma v3 — 2026 gerçek noter maliyetleri (Senaryo A) + %25 kar
Senaryo A: Tercüme yeminli tercüman tarafından yapılır, noter çevirme ücreti (667,67 TL) ALINMAZ.

Noter masrafı kalemleri (2026):
- Tercüme Harcı: 104,00 TL (Harçlar Kanunu)
- Yazı Ücreti: 80,68 TL/sayfa (Noterlik Tarifesi Madde 3)
- Değerli Kâğıt Bedeli: 149,00 TL (standart) veya 298,00 TL (vekâletname/taahhütname)
- Noter Ücreti: 58,82 TL (min, Madde 1)
- KDV %20: (yazı + kâğıt + noter ücreti) x 0,20
- Çevirme ücreti YOK (sen çevirdin)
"""

HARC = 104.00
YAZI_UCRETI = 80.68
NOTER_UCRETI_MIN = 58.82
KAGIT_STANDART = 149.00
KAGIT_OZEL = 298.00
KDV_ORANI = 0.20

def noter_masraf_hesapla(sayfa, ozel_kagit=False):
    kagit = KAGIT_OZEL if ozel_kagit else KAGIT_STANDART
    yazi = YAZI_UCRETI * sayfa
    noter_ucreti = NOTER_UCRETI_MIN
    kdve = (yazi + kagit + noter_ucreti) * KDV_ORANI
    toplam = HARC + yazi + kagit + noter_ucreti + kdve
    return round(toplam)

IKI_SAYFALIK = {
    "Vekaletname (Genel)", "Kira Sozlesmesi", "Satis Sozlesmesi",
    "Sirket Ana Sozlesmesi", "Ticaret Sicil Gazetesi",
    "Transkript (Coklu Sayfa)", "Ozgecmis (CV)", "SGK Hizmet Dokumu",
    "Heyet Raporu", "Epikriz Raporu", "Laboratuvar Sonuclari",
    "Mahkeme Karari (Kisa)", "Bosanma Ilami", "Vasiyetname",
    "Diger Resmi Yaziismalar", "Saglik Raporu (Tek Hekim)",
    "Sabika Kaydi (Arsivli)", "Banka Hesap Ozeti (Detayli)",
    "Evlilik Cuzdani",
}

OZEL_KAGIT = {
    "Vekaletname (Tek Sayfa)", "Vekaletname (Tek Sayfa) (Apostil)",
    "Vekaletname (Genel)", "Muvafakatname (Tek Sayfa)",
    "Taahhutname (Tek Sayfa)",
}

belgeler = [
    (1, "Adli Sicil Kaydi", 450, "resmi"),
    (2, "Adli Sicil Kaydi (Apostil)", 450, "resmi"),
    (3, "Adres Yerlesim Yeri Belgesi", 450, "resmi"),
    (4, "Adres Yerlesim Yeri Belgesi (Apostil)", 450, "resmi"),
    (5, "Askerlik Durum Belgesi", 450, "resmi"),
    (6, "Diploma", 550, "egitim"),
    (7, "Diploma (Apostil)", 550, "egitim"),
    (8, "Dogum Raporu", 450, "resmi"),
    (9, "Ehliyet", 450, "resmi"),
    (10, "Evlenme Bildirim Formu", 450, "resmi"),
    (11, "Evlilik Cuzdani", 750, "resmi"),
    (12, "Formul A (Dogum Belgesi)", 450, "resmi"),
    (13, "Formul A (Dogum Belgesi) (Apostil)", 450, "resmi"),
    (14, "Formul B (Evlilik Kayit Belgesi)", 450, "resmi"),
    (15, "Formul B (Evlilik Kayit Belgesi) (Apostil)", 450, "resmi"),
    (16, "Formul C (Olum Belgesi)", 450, "resmi"),
    (17, "Gecici Mezuniyet Belgesi", 550, "egitim"),
    (18, "Imza Sirkuleri (Tek Sayfa)", 600, "ticari"),
    (19, "Katilim Belgesi", 450, "egitim"),
    (20, "Kimlik Karti", 450, "resmi"),
    (21, "Lise Transkripti", 600, "egitim"),
    (22, "Muvafakatname (Tek Sayfa)", 600, "resmi"),
    (23, "Taahhutname (Tek Sayfa)", 450, "resmi"),
    (24, "Nufus Kayit Ornegi (Tek Sayfa)", 450, "resmi"),
    (25, "Nufus Kayit Ornegi (Tek Sayfa) (Apostil)", 450, "resmi"),
    (26, "Ogrenci Belgesi", 450, "egitim"),
    (27, "Pasaport", 450, "resmi"),
    (28, "Patent Belgesi", 750, "ticari"),
    (29, "Sabika Kaydi", 450, "resmi"),
    (30, "Sertifika", 450, "egitim"),
    (31, "Tapu Senedi", 550, "resmi"),
    (32, "Vekaletname (Tek Sayfa)", 600, "resmi"),
    (33, "Vekaletname (Tek Sayfa) (Apostil)", 600, "resmi"),
    (34, "Vergi Levhasi", 550, "ticari"),
    (35, "Yuksek Lisans Diplomasi", 550, "egitim"),
    (36, "Doktora Diplomasi", 550, "egitim"),
    (37, "Transkript (1 Sayfa)", 600, "egitim"),
    (38, "Transkript (Coklu Sayfa)", 600, "egitim"),
    (39, "Niyet Mektubu (Egitim)", 550, "egitim"),
    (40, "Ozgecmis (CV)", 750, "egitim"),
    (41, "Referans Mektubu", 550, "egitim"),
    (42, "Kurs Bitirme Belgesi", 450, "egitim"),
    (43, "Arac Tescil Belgesi (Ruhsat)", 450, "resmi"),
    (44, "Banka Hesap Ozeti (1 Sayfa)", 450, "resmi"),
    (45, "Banka Hesap Ozeti (Detayli)", 550, "resmi"),
    (46, "Maas Bordrosu", 450, "resmi"),
    (47, "SGK Hizmet Dokumu", 550, "resmi"),
    (48, "Sabika Kaydi (Arsivli)", 750, "resmi"),
    (49, "Vekaletname (Genel)", 600, "resmi"),
    (50, "Kira Sozlesmesi", 750, "resmi"),
    (51, "Saglik Raporu (Tek Hekim)", 750, "resmi"),
    (52, "Heyet Raporu", 750, "resmi"),
    (53, "Epikriz Raporu", 750, "resmi"),
    (54, "Laboratuvar Sonuclari", 750, "resmi"),
    (55, "Mahkeme Karari (Kisa)", 750, "resmi"),
    (56, "Bosanma Ilami", 750, "resmi"),
    (57, "Vasiyetname", 750, "resmi"),
    (58, "Vize Basvuru Dilekcesi", 450, "resmi"),
    (59, "Diger Resmi Yaziismalar", 750, "resmi"),
    (60, "Satis Sozlesmesi", 750, "ticari"),
    (61, "Sirket Ana Sozlesmesi", 750, "ticari"),
    (62, "Ticaret Sicil Gazetesi", 750, "ticari"),
    (63, "Faaliyet Belgesi", 550, "ticari"),
]

NOTER_TAKIP_1 = 250
NOTER_TAKIP_2 = 300
APOSTIL_TAKIP = 400

sql_lines = []
print(f"{'ID':>3} | {'Belge':<45} | {'S':>1} | {'K':>1} | {'Terc':>5} | {'N.Mas':>6} | {'Takip':>5} | {'N.Top':>7} | {'A.Top':>7} | {'Kazanc':>7} | {'Kar%':>5}")
print("-" * 115)

for doc_id, name, tercume, cat in belgeler:
    sayfa = 2 if name in IKI_SAYFALIK else 1
    ozel = name in OZEL_KAGIT
    noter_masraf = noter_masraf_hesapla(sayfa, ozel)
    noter_takip = NOTER_TAKIP_2 if sayfa == 2 else NOTER_TAKIP_1
    apostil_takip = APOSTIL_TAKIP
    noter_price = tercume + noter_masraf + noter_takip
    apostil_price = noter_price + apostil_takip
    kazanc = tercume + noter_takip
    gider = 100 + int(tercume * 0.8)
    net_kar = kazanc - gider
    kar_yuzde = round(net_kar / noter_price * 100) if noter_price > 0 else 0
    print(f"{doc_id:>3} | {name:<45} | {sayfa:>1} | {'O' if ozel else 'S':>1} | {tercume:>5} | {noter_masraf:>6} | {noter_takip:>5} | {noter_price:>7} | {apostil_price:>7} | {kazanc:>7} | {kar_yuzde:>4}%")
    sql_lines.append(
        f"UPDATE pricing SET yeminli_price={tercume}, noter_masraf={noter_masraf}, noter_takip={noter_takip}, apostil_takip={apostil_takip}, noter_price={noter_price}, apostil_price={apostil_price} WHERE id={doc_id};"
    )

with open("update_pricing_v3.sql", "w") as f:
    f.write("-- Fiyatlandirma v3: 2026 gercek noter maliyetleri (Senaryo A) + %25 kar\n\n")
    f.write("\n".join(sql_lines))
    f.write("\n")

print(f"\n{len(sql_lines)} UPDATE satiri update_pricing_v3.sql dosyasina yazildi.")

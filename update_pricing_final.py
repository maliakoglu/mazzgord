#!/usr/bin/env python3
"""
Fiyatlandırma FINAL — 2026 gerçek noter maliyeti (tam tablo) + %25 net kar
Net kar = (Tercüme + Takip - Transport) / Toplam Fiyat = %25
Transport = 100 TL (git-gel)
"""

# 2026 Noter maliyeti (1 sayfa, standart) — tablodan alindi
# Çevirme: 667.67 + Harç: 104 + Yazı: 80.68 + Kâğıt: 149 + KDV: 180.27 = 1.181.62
NOTER_1_SAYFA_STANDART = 1182
# Özel kâğıt (vekaletname/taahhütname): kâğıt 149→298, KDV artar
NOTER_1_SAYFA_OZEL = 1360
# 2 sayfa standart: çevirme+yazı x2, diğerleri sabit, KDV yeniden hesap
NOTER_2_SAYFA_STANDART = 2080
# 2 sayfa özel
NOTER_2_SAYFA_OZEL = 2258

TRANSPORT = 100

def noter_masraf(sayfa, ozel):
    if sayfa == 1:
        return NOTER_1_SAYFA_OZEL if ozel else NOTER_1_SAYFA_STANDART
    else:
        return NOTER_2_SAYFA_OZEL if ozel else NOTER_2_SAYFA_STANDART

def takip_hesapla(tercume, noter_masrafi):
    # (terc + takip - transport) / (noter + terc + takip) = 0.25
    # 0.75*takip = 0.25*noter - 0.75*terc + transport
    takip = (0.25 * noter_masrafi - 0.75 * tercume + TRANSPORT) / 0.75
    return max(0, round(takip))

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

APOSTIL_TAKIP = 400

sql_lines = []
print(f"{'ID':>3} | {'Belge':<45} | {'S':>1} | {'K':>1} | {'Terc':>5} | {'N.Mas':>6} | {'Takip':>5} | {'N.Top':>7} | {'A.Top':>7} | {'NetKr':>6} | {'Kar%':>5}")
print("-" * 110)

for doc_id, name, tercume, cat in belgeler:
    sayfa = 2 if name in IKI_SAYFALIK else 1
    ozel = name in OZEL_KAGIT
    nm = noter_masraf(sayfa, ozel)
    takip = takip_hesapla(tercume, nm)
    noter_price = tercume + nm + takip
    apostil_price = noter_price + APOSTIL_TAKIP
    net_kar = tercume + takip - TRANSPORT
    kar_yuzde = round(net_kar / noter_price * 100) if noter_price > 0 else 0
    print(f"{doc_id:>3} | {name:<45} | {sayfa:>1} | {'O' if ozel else 'S':>1} | {tercume:>5} | {nm:>6} | {takip:>5} | {noter_price:>7} | {apostil_price:>7} | {net_kar:>6} | {kar_yuzde:>4}%")
    sql_lines.append(
        f"UPDATE pricing SET yeminli_price={tercume}, noter_masraf={nm}, noter_takip={takip}, apostil_takip={APOSTIL_TAKIP}, noter_price={noter_price}, apostil_price={apostil_price} WHERE id={doc_id};"
    )

with open("update_pricing_final.sql", "w") as f:
    f.write("-- Fiyatlandirma FINAL: 2026 gercek noter maliyeti + %25 net kar\n\n")
    f.write("\n".join(sql_lines))
    f.write("\n")

print(f"\n{len(sql_lines)} UPDATE satiri update_pricing_final.sql dosyasina yazildi.")

-- Yeni belge türleri — mevcut fiyat pattern'lerine göre
-- INSERT OR IGNORE: zaten varsa atla (document_name UNIQUE)

INSERT OR IGNORE INTO pricing (document_name, yeminli_price, noter_price, apostil_price, has_apostil_variant, category) VALUES
-- === EGITIM ===
('Yüksek Lisans Diploması',              1100, 3100, 3450, 0, 'egitim'),
('Doktora Diploması',                     1200, 3200, 3550, 0, 'egitim'),
('Transkript (1 Sayfa)',                  1100, 3100, 3450, 0, 'egitim'),
('Transkript (Çoklu Sayfa)',              1000, 2750, 3100, 0, 'egitim'),
('Niyet Mektubu (Eğitim)',                1000, 2750, 3100, 0, 'egitim'),
('Özgeçmiş (CV)',                         1000, 2750, 3100, 0, 'egitim'),
('Referans Mektubu',                      1000, 2750, 3100, 0, 'egitim'),
('Kurs Bitirme Belgesi',                  1000, 2750, 3100, 0, 'egitim'),

-- === RESMI ===
('Araç Tescil Belgesi (Ruhsat)',          1000, 2750, 3100, 0, 'resmi'),
('Banka Hesap Özeti (1 Sayfa)',           1000, 2750, 3100, 0, 'resmi'),
('Banka Hesap Özeti (Detaylı)',           1000, 2750, 3100, 0, 'resmi'),
('Maaş Bordrosu',                         1000, 2750, 3100, 0, 'resmi'),
('SGK Hizmet Dökümü',                     1000, 2750, 3100, 0, 'resmi'),
('Sabıka Kaydı (Arşivli)',                1100, 3100, 3450, 0, 'resmi'),
('Vekaletname (Genel)',                   1100, 3100, 3450, 0, 'resmi'),
('Kira Sözleşmesi',                       1100, 3100, 3450, 0, 'resmi'),
('Sağlık Raporu (Tek Hekim)',             1000, 2750, 3100, 0, 'resmi'),
('Heyet Raporu',                          1100, 3100, 3450, 0, 'resmi'),
('Epikriz Raporu',                        1100, 3100, 3450, 0, 'resmi'),
('Laboratuvar Sonuçları',                 1000, 2750, 3100, 0, 'resmi'),
('Mahkeme Kararı (Kısa)',                 1100, 3100, 3450, 0, 'resmi'),
('Boşanma İlamı',                         1100, 3100, 3450, 0, 'resmi'),
('Vasiyetname',                           1100, 3100, 3450, 0, 'resmi'),
('Vize Başvuru Dilekçesi',               1000, 2750, 3100, 0, 'resmi'),
('Diğer Resmi Yazışmalar',                1000, 2750, 3100, 0, 'resmi'),

-- === TICARI ===
('Satış Sözleşmesi',                      1100, 3100, 3450, 0, 'ticari'),
('Şirket Ana Sözleşmesi',                 1100, 3100, 3450, 0, 'ticari'),
('Ticaret Sicil Gazetesi',                1100, 3100, 3450, 0, 'ticari'),
('Faaliyet Belgesi',                      1000, 2750, 3100, 0, 'ticari');

CREATE TABLE IF NOT EXISTS pricing_items (
  item_no INTEGER PRIMARY KEY,
  document_type TEXT NOT NULL,
  language_pair TEXT NOT NULL DEFAULT 'TR ↔ EN',
  unit TEXT NOT NULL,
  unit_price REAL NOT NULL,
  delivery_time TEXT NOT NULL,
  is_active INTEGER DEFAULT 1,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS service_proposal (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_pricing_active ON pricing_items(is_active);
CREATE INDEX IF NOT EXISTS idx_proposal_section ON service_proposal(section);

INSERT OR REPLACE INTO pricing_items (item_no, document_type, language_pair, unit, unit_price, delivery_time) VALUES
(1,  'Lise Diploması',                    'TR ↔ EN', 'Adet',  900,   '24 Saat'),
(2,  'Lisans Diploması',                   'TR ↔ EN', 'Adet',  900,   '24 Saat'),
(3,  'Yüksek Lisans Diploması',             'TR ↔ EN', 'Adet',  1100,  '24 Saat'),
(4,  'Doktora Diploması',                   'TR ↔ EN', 'Adet',  1300,  '24 Saat'),
(5,  'Transkript (1 Sayfa)',                'TR ↔ EN', 'Sayfa', 700,   '24 Saat'),
(6,  'Transkript (Çoklu Sayfa)',            'TR ↔ EN', 'Sayfa', 550,   '48 Saat'),
(7,  'Öğrenci Belgesi',                    'TR ↔ EN', 'Adet',  500,   '12 Saat'),
(8,  'Mezuniyet Belgesi',                   'TR ↔ EN', 'Adet',  700,   '12 Saat'),
(9,  'Doğum Kayıt Örneği (Formül A)',       'TR ↔ EN', 'Adet',  700,   '12 Saat'),
(10, 'Evlenme Kayıt Örneği (Formül B)',     'TR ↔ EN', 'Adet',  700,   '12 Saat'),
(11, 'Ölüm Kayıt Örneği (Formül C)',        'TR ↔ EN', 'Adet',  700,   '12 Saat'),
(12, 'İkametgah Belgesi',                  'TR ↔ EN', 'Adet',  500,   '12 Saat'),
(13, 'Nüfus Cüzdanı / Kimlik Kartı',       'TR ↔ EN', 'Adet',  500,   '6 Saat'),
(14, 'Pasaport',                            'TR ↔ EN', 'Adet',  700,   '6 Saat'),
(15, 'Sürücü Belgesi (Ehliyet)',            'TR ↔ EN', 'Adet',  700,   '6 Saat'),
(16, 'Araç Tescil Belgesi (Ruhsat)',        'TR ↔ EN', 'Adet',  900,   '12 Saat'),
(17, 'Banka Hesap Özeti (1 Sayfa)',        'TR ↔ EN', 'Sayfa', 500,   '12 Saat'),
(18, 'Banka Hesap Özeti (Detaylı)',         'TR ↔ EN', 'Sayfa', 400,   '24-48 Saat'),
(19, 'Maaş Bordrosu',                      'TR ↔ EN', 'Adet',  500,   '12 Saat'),
(20, 'SGK Hizmet Dökümü',                   'TR ↔ EN', 'Sayfa', 700,   '24 Saat'),
(21, 'Adli Sicil Kaydı',                    'TR ↔ EN', 'Adet',  500,   '12 Saat'),
(22, 'Sabıka Kaydı (Arşivli)',              'TR ↔ EN', 'Adet',  700,   '12 Saat'),
(23, 'Vekaletname (Kısa)',                  'TR ↔ EN', 'Adet',  1100,  '24 Saat'),
(24, 'Vekaletname (Genel)',                 'TR ↔ EN', 'Sayfa', 900,   '24-48 Saat'),
(25, 'Kira Sözleşmesi',                      'TR ↔ EN', 'Sayfa', 700,   '24-48 Saat'),
(26, 'Satış Sözleşmesi',                    'TR ↔ EN', 'Sayfa', 900,   '48 Saat'),
(27, 'Şirket Ana Sözleşmesi',               'TR ↔ EN', 'Sayfa', 1100,  '72 Saat'),
(28, 'Ticaret Sicil Gazetesi',              'TR ↔ EN', 'Sayfa', 900,   '48 Saat'),
(29, 'Vergi Levhası',                       'TR ↔ EN', 'Adet',  700,   '12 Saat'),
(30, 'İmza Sirküleri',                      'TR ↔ EN', 'Adet',  700,   '12 Saat'),
(31, 'Faaliyet Belgesi',                    'TR ↔ EN', 'Adet',  700,   '12 Saat'),
(32, 'Tapu Senedi',                          'TR ↔ EN', 'Adet',  900,   '24 Saat'),
(33, 'Muvafakatname',                       'TR ↔ EN', 'Adet',  700,   '12 Saat'),
(34, 'Taahhütname',                         'TR ↔ EN', 'Adet',  700,   '12 Saat'),
(35, 'Sağlık Raporu (Tek Hekim)',            'TR ↔ EN', 'Adet',  700,   '12 Saat'),
(36, 'Heyet Raporu',                         'TR ↔ EN', 'Sayfa', 900,   '48 Saat'),
(37, 'Epikriz Raporu',                       'TR ↔ EN', 'Sayfa', 1100,  '48 Saat'),
(38, 'Laboratuvar Sonuçları',               'TR ↔ EN', 'Sayfa', 700,   '24 Saat'),
(39, 'Mahkeme Kararı (Kısa)',                'TR ↔ EN', 'Sayfa', 1100,  '48 Saat'),
(40, 'Boşanma İlamı',                        'TR ↔ EN', 'Sayfa', 900,   '48-72 Saat'),
(41, 'Vasiyetname',                          'TR ↔ EN', 'Sayfa', 1300,  '72 Saat'),
(42, 'Apostille Şerhi',                      'TR ↔ EN', 'Adet',  400,   '6 Saat'),
(43, 'Noter Onay Şablonu Hazırlama',        'TR ↔ EN', 'Adet',  500,   '6 Saat'),
(44, 'Vize Başvuru Dilekçesi',              'TR ↔ EN', 'Adet',  500,   '12 Saat'),
(45, 'Niyet Mektubu (Eğitim)',              'TR ↔ EN', 'Kelime', 2.00, '24 Saat'),
(46, 'Özgeçmiş (CV)',                        'TR ↔ EN', 'Sayfa', 900,   '24 Saat'),
(47, 'Referans Mektubu',                     'TR ↔ EN', 'Adet',  700,   '24 Saat'),
(48, 'Sertifika / Katılım Belgesi',         'TR ↔ EN', 'Adet',  500,   '12 Saat'),
(49, 'Kurs Bitirme Belgesi',                'TR ↔ EN', 'Adet',  500,   '12 Saat'),
(50, 'Diğer Resmi Yazışmalar',              'TR ↔ EN', 'Sayfa', 700,   '24 Saat');

INSERT OR REPLACE INTO service_proposal (section, content) VALUES
('executive_summary',
'Mehmet Ali Akoğlu tarafından sunulan yüksek kaliteli, sadık ve terminolojik açıdan doğru çeviri hizmetlerinin kapsamını ve şartlarını içermektedir. Özellikle resmi ve kişisel belgelerin İngilizce ↔ Türkçe dil çiftinde, orijinal formatı korunarak ve hızlı teslimat prensibiyle çevrilmesi hedeflenmektedir.'),
('service_scope',
'Hizmetlerimiz, resmi makamlar, eğitim kurumları ve kişisel başvurular için gerekli olan belgelerin profesyonel çevirisini kapsamaktadır. Temel prensiplerimiz: Hızlı Teslimat (acil işler için aynı gün veya 24 saat), Format Koruma (orijinal belge yapısına sadık mizanpaj), Ücretsiz Revizyon (küçük düzeltmeler için ek ücret yok), Resmi Süreç Uyumluluğu (baskıya veya resmi işlemlere hazır format).'),
('terms_conditions',
'1. Gizlilik: Tüm belgeler ve kişisel veriler KVKK ve uluslararası standartlara uygun korunur. 2. Ödeme: İş başlangıcında %50 avans, kalan tutar teslimat öncesi. Kurumsal müşterilere aylık faturalandırma. 3. Revizyon: Teslimden sonra 7 gün içinde küçük düzeltmeler ücretsiz. 4. İptal: Başlanmış projelerde tamamlanan kısmın ücreti tahsil edilir. 5. Sorumluluk: Çeviriler kaynak metne sadık yapılır. Belge içeriğinden kaynaklanan hukuki sorumluluk müşteriye aittir.'),
('contact_process',
'Süreci başlatmak için çevrilecek belgenin örneğini veya detaylarını mesaj yoluyla iletebilirsiniz. E-posta: info@mazzgord.com, Telefon/WhatsApp: +90 538 629 50 40, Konum: Denizli Pamukkale, Ödeme: iyzipay güvenli ödeme.'),
('prepared_by',
'Hazırlayan: Mehmet Ali Akoğlu, Tarih: 28 Nisan 2026, Konu: Profesyonel Belge ve Doküman Çevirisi Hizmetleri');

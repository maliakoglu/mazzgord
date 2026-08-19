-- Sipariş mesajları (chat)
CREATE TABLE IF NOT EXISTS order_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote_id INTEGER NOT NULL,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Değerlendirmeler
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  comment TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Quotes tablosuna yeni kolonlar ekle
ALTER TABLE quotes ADD COLUMN service_type TEXT;
ALTER TABLE quotes ADD COLUMN urgency TEXT DEFAULT 'standart';
ALTER TABLE quotes ADD COLUMN delivery_method TEXT;
ALTER TABLE quotes ADD COLUMN yeminli INTEGER DEFAULT 0;
ALTER TABLE quotes ADD COLUMN noter_onay INTEGER DEFAULT 0;
ALTER TABLE quotes ADD COLUMN word_count INTEGER;
ALTER TABLE quotes ADD COLUMN order_status TEXT DEFAULT 'pending';
ALTER TABLE quotes ADD COLUMN estimated_price REAL;
ALTER TABLE quotes ADD COLUMN translator TEXT;
ALTER TABLE quotes ADD COLUMN delivery_date TEXT;

-- Quotes tablosuna ek kolonlar (noter/apostil/ülke/adres)
ALTER TABLE quotes ADD COLUMN notary_need TEXT;
ALTER TABLE quotes ADD COLUMN apostille_need TEXT;
ALTER TABLE quotes ADD COLUMN target_country TEXT;
ALTER TABLE quotes ADD COLUMN shipping_address TEXT;

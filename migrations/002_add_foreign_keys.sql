-- Migration: 002_add_foreign_keys.sql
-- Tarih: 2026-08-12
-- Amaç: Foreign key constraint'leri ekleme (tablo yeniden oluşturma ile)

-- order_messages: quote_id → quotes.id FK ekle
CREATE TABLE IF NOT EXISTS order_messages_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote_id INTEGER NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  sender TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);
INSERT INTO order_messages_new SELECT * FROM order_messages;
DROP TABLE order_messages;
ALTER TABLE order_messages_new RENAME TO order_messages;
CREATE INDEX IF NOT EXISTS idx_order_messages_quote_id ON order_messages(quote_id);
CREATE INDEX IF NOT EXISTS idx_order_messages_created_at ON order_messages(created_at);

-- reviews: quote_id → quotes.id FK ekle
CREATE TABLE IF NOT EXISTS reviews_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote_id INTEGER NOT NULL REFERENCES quotes(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL,
  comment TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);
INSERT INTO reviews_new SELECT * FROM reviews;
DROP TABLE reviews;
ALTER TABLE reviews_new RENAME TO reviews;
CREATE INDEX IF NOT EXISTS idx_reviews_quote_id ON reviews(quote_id);

-- payments: quote_id → quotes.id FK ekle (quote_id nullable)
CREATE TABLE IF NOT EXISTS payments_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote_id INTEGER REFERENCES quotes(id) ON DELETE SET NULL,
  amount REAL NOT NULL,
  description TEXT,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  payment_link_id TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending',
  iyzico_payment_id TEXT,
  iyzico_conversation_id TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  paid_at TEXT
);
INSERT INTO payments_new SELECT * FROM payments;
DROP TABLE payments;
ALTER TABLE payments_new RENAME TO payments;
CREATE INDEX IF NOT EXISTS idx_payments_quote_id ON payments(quote_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

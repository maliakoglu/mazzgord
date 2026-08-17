-- Migration: 001_add_indexes.sql
-- Tarih: 2026-08-12
-- Amaç: Kritik sorgu kolonlarına indeks ekleme

-- messages
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);

-- quotes
CREATE INDEX IF NOT EXISTS idx_quotes_created_at ON quotes(created_at);
CREATE INDEX IF NOT EXISTS idx_quotes_email ON quotes(email);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_order_status ON quotes(order_status);

-- order_messages
CREATE INDEX IF NOT EXISTS idx_order_messages_quote_id ON order_messages(quote_id);
CREATE INDEX IF NOT EXISTS idx_order_messages_created_at ON order_messages(created_at);

-- reviews
CREATE INDEX IF NOT EXISTS idx_reviews_quote_id ON reviews(quote_id);

-- payments
CREATE INDEX IF NOT EXISTS idx_payments_quote_id ON payments(quote_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at);

-- pricing
CREATE INDEX IF NOT EXISTS idx_pricing_category ON pricing(category);

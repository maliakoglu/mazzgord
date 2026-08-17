
CREATE TABLE IF NOT EXISTS payments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  quote_id INTEGER,
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

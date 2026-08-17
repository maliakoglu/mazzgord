-- Hizmet ürünleri kataloğu
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  sku TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'translation',
  source_language TEXT,
  target_language TEXT,
  unit TEXT NOT NULL DEFAULT 'page',
  base_price REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'TRY',
  active INTEGER DEFAULT 1,
  image TEXT,
  tax_rate REAL DEFAULT 0.20,
  delivery_type TEXT DEFAULT 'digital',
  sort_order INTEGER DEFAULT 0,
  options TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_services_category ON services(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);

-- Teklif kabul/red akışı için yeni kolonlar
-- offer_status: pending (teklif hazır değil) → offered (teklif hazır) → accepted → rejected → expired
ALTER TABLE quotes ADD COLUMN offer_status TEXT DEFAULT 'pending';
ALTER TABLE quotes ADD COLUMN offer_note TEXT;
ALTER TABLE quotes ADD COLUMN offer_accepted_at TEXT;
ALTER TABLE quotes ADD COLUMN offer_rejected_at TEXT;
ALTER TABLE quotes ADD COLUMN document_uploaded_at TEXT;
ALTER TABLE quotes ADD COLUMN customer_id INTEGER;

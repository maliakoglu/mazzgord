-- reviews tablosuna approved kolonu ekle (admin onayı)
ALTER TABLE reviews ADD COLUMN approved INTEGER DEFAULT 0;

-- quotes tablosuna review_email_sent kolonu ekle (cron takibi)
ALTER TABLE quotes ADD COLUMN review_email_sent INTEGER DEFAULT 0;

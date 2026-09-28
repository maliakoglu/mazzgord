with open("client/src/components/home/Testimonials.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old_component = '''import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function Testimonials({ openGallery }: { openGallery: (images: string[], startIndex: number) => void }) {
  useEffect(() => {
    track.reviewSectionView();
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30 parallax-yorumlar">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Müşteri Yorumları</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
          Bionluk üzerinden alınan müşteri geri bildirimleri
        </p>'''

new_component = '''import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { Star } from "lucide-react";

interface DBReview {
  id: number;
  rating: number;
  comment: string | null;
  created_at: string;
  customer_name: string | null;
  source_language: string | null;
  target_language: string | null;
  document_type: string | null;
}

export default function Testimonials({ openGallery }: { openGallery: (images: string[], startIndex: number) => void }) {
  const [dbReviews, setDbReviews] = useState<DBReview[]>([]);

  useEffect(() => {
    track.reviewSectionView();
    fetch("/api/reviews/approved")
      .then(res => res.json())
      .then(data => { if (data.success && data.data) setDbReviews(data.data); })
      .catch(() => {});
  }, []);

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-secondary/30 parallax-yorumlar">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">Müşteri Yorumları</h2>
        <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
          Doğrulanmış müşteri değerlendirmeleri ve Bionluk üzerinden alınan geri bildirimler
        </p>'''

if old_component in content:
    content = content.replace(old_component, new_component, 1)
    print("✓ Testimonials header + state güncellendi")
else:
    print("✗ Header anchor bulunamadı")

# Hardcoded yorumlar bölümünden SONRA DB yorumları ekle
# "Diğer müşteri yorumları" bölümünden ÖNCE ekle
db_reviews_block = '''
        {/* DB'den onaylı yorumlar */}
        {dbReviews.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
            {dbReviews.map((review) => (
              <div key={review.id} className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= review.rating ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
                <p className="text-foreground mb-4 leading-relaxed">"{review.comment || "Mükemmel hizmet!"}"</p>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <p className="font-bold text-primary">— {review.customer_name || "Müşteri"}</p>
                  <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                    {review.source_language && review.target_language ? `${review.source_language} → ${review.target_language}` : "Çeviri Hizmeti"}
                  </span>
                </div>
                <p className="text-xs text-emerald-600 mt-3 flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                  Doğrulanmış sipariş
                </p>
              </div>
            ))}
          </div>
        )}

'''

# "Diğer müşteri yorumları" başlığını bul ve ondan önce ekle
other_anchor = '        <div className="text-center">'
if other_anchor in content and "dbReviews.length > 0" not in content:
    content = content.replace(other_anchor, db_reviews_block + other_anchor, 1)
    print("✓ DB yorumları bölümü eklendi")
else:
    print("✗ DB reviews anchor bulunamadı veya zaten eklenmiş")

with open("client/src/components/home/Testimonials.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("Testimonials güncellemesi tamam.")

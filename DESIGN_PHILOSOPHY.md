# Mazzgord Web Sitesi Arayüz Tasarım Planı

## Tasarım yönü

Site, **kurumsal güven + modern zarafet** ekseninde tasarlanmıştır. Deneyim sakin, okunabilir ve güven verici olup; Playfair Display başlıklar ile kurumsal ciddiyet, Inter gövde metni ile modern okunabilirlik sağlar. Tüm sayfalar responsive olup, mobil öncelikli yaklaşım benimsenmiştir. Ana dönüşüm aksiyonları (Teklif Al, WhatsApp) her sayfada belirgin ve erişilebilir tutulur.

## Teknoloji

- **Framework:** React SPA (Vite)
- **Stil:** Tailwind CSS v4 (`@import "tailwindcss"`) + CSS custom properties (oklch renk uzayı)
- **Tipografi:** Playfair Display (başlıklar) + Inter (gövde metni)
- **Hosting:** Cloudflare Workers (mazzgord.com)
- **Build:** Vite → Wrangler CLI

## Sayfa listesi

| Sayfa | Route | Ana içerik |
|---|---|---|
| Ana Sayfa | `/` | Hero, hakkımda, hizmetler, hızlı hizmetler, süreç, portfolyo, yorumlar, fiyat önizleme, SSS, iletişim, footer |
| Hizmetler | `/hizmetler` | Tüm hizmetlerin listelendiği genel sayfa |
| Yeminli Tercüme | `/yeminli-tercume` | Yeminli tercüme hizmet detay sayfası |
| İngilizce Çeviri | `/ingilizce-turkce-ceviri` | İngilizce-Türkçe çeviri hizmet detay sayfası |
| Teknik Çeviri | `/teknik-ceviri` | Teknik çeviri hizmet detay sayfası |
| Akademik Çeviri | `/akademik-ceviri` | Akademik çeviri hizmet detay sayfası |
| Vize Çeviri | `/vize-ceviri` | Vize başvurusu çeviri hizmet detay sayfası |
| Diploma Çeviri | `/diploma-ceviri` | Diploma çeviri hizmet detay sayfası |
| Pasaport Çeviri | `/pasaport-ceviri` | Pasaport çeviri hizmet detay sayfası |
| Fiyatlar | `/fiyatlar` | Hizmet fiyat tablosu |
| Teklif Formu | `/teklif` | Çok adımlı teklif talebi formu |
| Sipariş Takip | `/siparis-takip` | Sipariş durumu takibi |
| S.S.S. | `/sss` | Sıkça sorulan sorular |
| Hakkımda | `/hakkimizda` | Hakkımda sayfası |
| Giriş | `/giris` | Müşteri girişi |
| Hesabım | `/hesabim` | Müşteri hesap yönetimi |
| Sepet | `/sepet` | Alışveriş sepeti |
| Ödeme | `/odeme` | Ödeme sayfası |
| Blog | `/blog` | Blog listesi |
| Blog yazıları | `/blog/:slug` | Bireysel blog yazıları |
| Admin | `/admin` | Yönetici paneli |
| Gizlilik | `/privacy` | Gizlilik politikası |
| Çerez Politikası | `/cookie-policy` | Çerez politikası |
| Kullanım Şartları | `/terms` | Kullanım şartları |
| 404 | `*` | Bulunamadı sayfası |

## Ana sayfa bölüm sırası

1. **Navbar** — Sticky üst navigasyon, mobil hamburger menü
2. **Hero** — Karşılama, ana başlık, CTA butonları
3. **About** — Hakkımda tanıtımı
4. **Services** — Hizmet kartları
5. **QuickServices** — Hızlı hizmet erişimi
6. **Process** — Çeviri süreci adımları
7. **Portfolio** — Portfolyo galerisi (modal görüntüleyici ile)
8. **Testimonials** — Müşteri yorumları
9. **WhyChooseUs** — Neden biz bölümü (parallax)
10. **PricingPreview** — Fiyat önizleme
11. **FAQ** — Sıkça sorulan sorular (accordion)
12. **Contact** — İletişim formu
13. **Footer** — Alt bilgi, linkler, iletişim
14. **MobileStickyCTA** — Mobil sabit CTA barı (alt)
15. **GalleryModal** — Portfolyo görsel görüntüleyici

## Renk sistemi (OKLCH)

| Token | OKLCH Değeri | Hex Yaklaşık | Kullanım |
|---|---|---|---|
| Primary | `oklch(0.35 0.15 250)` | `#1E3A8A` (Navy) | Marka, başlıklar, ana linkler, ring |
| Primary-foreground | `oklch(0.98 0.001 0)` | `#FAFAFA` | Primary üzerinde metin |
| Accent | `oklch(0.6 0.18 30)` | `#EA580C` (Orange) | CTA butonları, dikkat aksiyonları |
| Accent-foreground | `oklch(0.99 0 0)` | `#FFFFFF` | Accent üzerinde metin |
| Background | `oklch(0.99 0 0)` | `#FCFCFC` | Sayfa arka planı |
| Foreground | `oklch(0.2 0.02 250)` | `#1F2937` (Ink) | Ana metin |
| Card | `oklch(0.99 0 0)` | `#FCFCFC` | Kart arka planı |
| Secondary | `oklch(0.95 0.01 250)` | `#F1F5F9` | İkincil arka planlar |
| Muted | `oklch(0.92 0.01 250)` | `#E2E8F0` | Sessiz arka planlar |
| Muted-foreground | `oklch(0.5 0.02 250)` | `#64748B` | Yardımcı metin |
| Border | `oklch(0.94 0.01 250)` | `#E2E8F0` | Kenarlıklar, ayırıcılar |
| Input | `oklch(0.96 0.005 250)` | `#F1F5F9` | Input arka planları |
| Destructive | `oklch(0.577 0.245 27.325)` | `#DC2626` | Hata, silme |
| Success (bg-accent) | `hsl(142, 76%, 36%)` | `#16A34A` | Başarı, onay |

### Chart renkleri (gradyan)

| Token | OKLCH | Kullanım |
|---|---|---|
| Chart-1 | `oklch(0.35 0.15 250)` | Navy — birincil |
| Chart-2 | `oklch(0.45 0.12 250)` | Açık navy |
| Chart-3 | `oklch(0.55 0.1 250)` | Orta navy |
| Chart-4 | `oklch(0.65 0.08 250)` | Soluk navy |
| Chart-5 | `oklch(0.75 0.06 250)` | Çok soluk navy |

## Tipografi

| Öğe | Font | Ağırlık | Boyut |
|---|---|---|---|
| H1 | Playfair Display | 700 | `text-5xl` (48px) / `md:text-6xl` (60px) |
| H2 | Playfair Display | 700 | `text-4xl` (36px) / `md:text-5xl` (48px) |
| H3 | Playfair Display | 700 | `text-2xl` (24px) / `md:text-3xl` (30px) |
| H4-H6 | Playfair Display | 700 | Tailwind varsayılan |
| Gövde | Inter | 400 | `text-base` (16px) / `md:text-lg` (18px) |
| Satır yüksekliği | — | — | Gövde 1.6, Başlık 1.2 |
| Harf aralığı | — | — | Başlık -0.02em |

## Spacing ve layout

| Öğe | Değer |
|---|---|
| Container max-width | 1280px |
| Container padding (mobil) | 16px |
| Container padding (tablet) | 24px |
| Container padding (desktop) | 32px |
| Radius-sm | `calc(var(--radius) - 4px)` |
| Radius-md | `calc(var(--radius) - 2px)` |
| Radius-lg | `var(--radius)` = 0.5rem (8px) |
| Radius-xl | `calc(var(--radius) + 4px)` |

## Bileşen prensipleri

- **Kartlar:** `bg-card rounded-xl border border-border` yapısı, hover'da `border-primary` ve gölge
- **Butonlar:** Primary = accent (turuncu) background + beyaz metin; ikincil = outline/border
- **Linkler:** `hover:text-primary` geçişli, `cursor-pointer`
- **Form inputları:** `bg-input border-border rounded-lg` yapısı
- **Accordion (SSS):** Tıklanan öğe açılır, chevron 180° döner
- **Mobil menü:** Sağdan slide-in drawer, overlay arka plan
- **Parallax:** Neden biz, projeler, yorumlar bölümlerinde hafif scroll parallax efekti
- **Mobil CTA:** Alt sabit bar (MobileStickyCTA), her sayfada görünür

## Responsive yaklaşım

- **Mobile-first:** Tüm stiller önce mobil için yazılır, `md:` ve `lg:` ile genişletilir
- **Breakpoints:** `sm: 640px`, `md: 768px`, `lg: 1024px`
- **Grid:** Mobil tek kolon, `md:grid-cols-2`, `md:grid-cols-3` ile genişletilir
- **Navigasyon:** Mobil hamburger menü, desktop yatay navigasyon

## Erişilebilirlik

- Tüm interaktif elemanlar `cursor-pointer` ve `:not(:disabled)` kontrolü
- Outline ring (`outline-ring/50`) focus durumunda
- `aria-disabled` kontrolü
- Semantic HTML (h1-h6 hiyerarşisi)

## Blog sistemi

- Blog yazıları `client/src/pages/Blog*.tsx` olarak ayrı dosyalar
- `BlogLayout` bileşeni ile ortak layout (başlık, açıklama, canonical, tarih, illüstrasyon)
- Blog registry: `client/src/data/blogRegistry.ts`
- SEO: Her sayfada meta tags, canonical URL, structured data

## SEO yapısı

- `public/robots.txt` — Tarayıcı yönergeleri
- `public/sitemap.xml` — Site haritası
- `public/llms.txt` — AI tarayıcı içeriği
- Her sayfada meta description, canonical URL
- Prerender: `prerender.cjs` ve `prerender.py` ile statik HTML üretimi
- SEO scriptleri: `scripts/fix_worker_seo.py`, `scripts/update_seo_ai.py`

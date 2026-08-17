"""mazzgord.com - Icerik Yonetim CLI"""
import os, sys, re, csv, requests
from datetime import datetime

ACCOUNT_ID = "bde689fe6dafc08e312dd0b3340acf54"
DATABASE_ID = "f4a36869-586e-4fe2-a887-8563b24a427f"
API_BASE = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/d1/database/{DATABASE_ID}"
API_TOKEN = os.environ.get("CLOUDFLARE_API_TOKEN", "")
CATEGORIES = ["resmi", "egitim", "ticari", "genel", "tibbi", "hukuki"]

def ensure_token():
    global API_TOKEN
    if not API_TOKEN:
        API_TOKEN = input("Cloudflare API Token: ").strip()
        os.environ["CLOUDFLARE_API_TOKEN"] = API_TOKEN

def headers():
    return {"Authorization": f"Bearer {API_TOKEN}", "Content-Type": "application/json"}

def query(sql, params=None):
    ensure_token()
    payload = {"sql": sql}
    if params:
        payload["params"] = params
    resp = requests.post(f"{API_BASE}/query", json=payload, headers=headers())
    data = resp.json()
    if not data.get("success"):
        raise Exception(f"D1 hatasi: {data.get('errors', [])}")
    return data["result"][0]["results"]

def now():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def print_table(rows, cols=None):
    if not rows:
        print("  (kayit yok)")
        return
    if cols is None:
        cols = list(rows[0].keys())
    h = " | ".join(f"{c[:20]:<20}" for c in cols)
    print(f"  {h}")
    print(f"  {'-' * len(h)}")
    for r in rows:
        print("  " + " | ".join(str(r.get(c, ""))[:20].ljust(20) for c in cols))

def slugify(text):
    m = {"ç":"c","ğ":"g","ı":"i","ö":"o","ş":"s","ü":"u","İ":"i","Ç":"c","Ğ":"g","Ö":"o","Ş":"s","Ü":"u"}
    for k,v in m.items():
        text = text.replace(k, v)
    return re.sub(r'[^a-z0-9-]', '-', text.lower()).strip('-')

# ─── PRICING ───
def list_pricing():
    rows = query("SELECT * FROM pricing ORDER BY category, document_name;")
    print(f"\n📊 FIYAT LISTESI ({len(rows)} kayit)")
    print_table(rows, ["id","document_name","yeminli_price","noter_price","apostil_price","category"])

def add_pricing():
    print("\n➕ YENI FIYAT")
    name = input("  Belge adi: ").strip()
    if not name: print("  ❌ Ad gerekli!"); return
    y = float(input("  Yeminli ₺: ") or "0")
    n = float(input("  Noter ₺: ") or "0")
    a = float(input("  Apostil ₺: ") or "0")
    cat = input(f"  Kategori {CATEGORIES} (varsayilan: genel): ").strip() or "genel"
    ha = input("  Apostil varyanti? (e/h): ").strip().lower() == "e"
    query("INSERT INTO pricing (document_name,yeminli_price,noter_price,apostil_price,has_apostil_variant,category) VALUES (?,?,?,?,?,?)", [name,y,n,a,1 if ha else 0,cat])
    print(f"  ✅ Eklendi: {name}")

def update_pricing():
    list_pricing()
    pid = input("\n  ID: ").strip()
    if not pid: return
    ex = query("SELECT * FROM pricing WHERE id=?", [int(pid)])
    if not ex: print("  ❌ Yok!"); return
    ex = ex[0]
    name = input(f"  Ad (bos=degismez): ").strip() or ex["document_name"]
    y = input(f"  Yeminli (bos={ex['yeminli_price']}): ").strip()
    y = float(y) if y else ex["yeminli_price"]
    n = input(f"  Noter (bos={ex['noter_price']}): ").strip()
    n = float(n) if n else ex["noter_price"]
    a = input(f"  Apostil (bos={ex['apostil_price']}): ").strip()
    a = float(a) if a else ex["apostil_price"]
    query("UPDATE pricing SET document_name=?,yeminli_price=?,noter_price=?,apostil_price=? WHERE id=?", [name,y,n,a,int(pid)])
    print(f"  ✅ Guncellendi: {name}")

def delete_pricing():
    list_pricing()
    pid = input("\n  ID: ").strip()
    if not pid: return
    if input("  Emin? (e/h): ").strip().lower() != "e": return
    query("DELETE FROM pricing WHERE id=?", [int(pid)])
    print(f"  ✅ Silindi: {pid}")

def bulk_update():
    print("\n📈 TOPLU FIYAT GUNCELLEME")
    print("  1. Yuzde artis (tumu)")
    print("  2. Sabit tutar ekle (tumu)")
    print("  3. Kategoriye gore artis")
    c = input("  Secim: ").strip()
    if c == "1":
        p = float(input("  Artis %: "))
        query("UPDATE pricing SET yeminli_price=ROUND(yeminli_price*?,2),noter_price=ROUND(noter_price*?,2),apostil_price=ROUND(apostil_price*?,2)", [1+p/100]*3)
        print(f"  ✅ %{p} artirildi")
    elif c == "2":
        amt = float(input("  Tutar ₺: "))
        query("UPDATE pricing SET yeminli_price=yeminli_price+?,noter_price=noter_price+?,apostil_price=apostil_price+?", [amt]*3)
        print(f"  ✅ ₺{amt} eklendi")
    elif c == "3":
        cat = input(f"  Kategori {CATEGORIES}: ").strip()
        p = float(input("  Artis %: "))
        query("UPDATE pricing SET yeminli_price=ROUND(yeminli_price*?,2),noter_price=ROUND(noter_price*?,2),apostil_price=ROUND(apostil_price*?,2) WHERE category=?", [1+p/100]*3+[cat])
        print(f"  ✅ '{cat}' %{p} artirildi")

def export_pricing():
    rows = query("SELECT * FROM pricing ORDER BY category, document_name;")
    fn = f"pricing_{now().split()[0]}.csv"
    with open(fn, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=rows[0].keys())
        w.writeheader()
        w.writerows(rows)
    print(f"  ✅ {len(rows)} kayit -> {fn}")

# ─── BLOG ───
def list_posts():
    rows = query("SELECT id,slug,title,published,created_at FROM blog_posts ORDER BY id;")
    print(f"\n📝 BLOG ({len(rows)} kayit)")
    print_table(rows, ["id","title","slug","published","created_at"])

def add_post():
    print("\n➕ YENI BLOG")
    title = input("  Baslik: ").strip()
    if not title: print("  ❌ Baslik gerekli!"); return
    slug = input(f"  Slug (bos=oto: {slugify(title)}): ").strip() or slugify(title)
    desc = input("  Aciklama: ").strip()
    print("  Icerik (bitir: yeni satirda . yaz):")
    lines = []
    while True:
        ln = input()
        if ln.strip() == ".": break
        lines.append(ln)
    content = "\n".join(lines)
    pub = input("  Yayinla? (e/h, varsayilan: e): ").strip().lower() != "h"
    query("INSERT INTO blog_posts (slug,title,description,content,published) VALUES (?,?,?,?,?)", [slug,title,desc,content,1 if pub else 0])
    print(f"  ✅ Eklendi: {title}")

def add_post_file():
    print("\n📁 DOSYADAN BLOG")
    fp = input("  Dosya yolu (Markdown): ").strip()
    try:
        with open(fp, "r", encoding="utf-8") as f:
            content = f.read()
        title = ""
        desc = ""
        if content.startswith("---"):
            parts = content.split("---", 2)
            if len(parts) >= 3:
                for ln in parts[1].strip().split("\n"):
                    if ln.startswith("title:"): title = ln.split(":",1)[1].strip().strip('"\'')
                    elif ln.startswith("description:"): desc = ln.split(":",1)[1].strip().strip('"\'')
                content = parts[2].strip()
        if not title: title = input("  Baslik: ").strip()
        slug = input(f"  Slug (bos=oto: {slugify(title)}): ").strip() or slugify(title)
        pub = input("  Yayinla? (e/h, varsayilan: e): ").strip().lower() != "h"
        query("INSERT INTO blog_posts (slug,title,description,content,published) VALUES (?,?,?,?,?)", [slug,title,desc,content,1 if pub else 0])
        print(f"  ✅ Eklendi: {title}")
    except FileNotFoundError:
        print(f"  ❌ Dosya yok: {fp}")

def update_post():
    list_posts()
    pid = input("\n  ID: ").strip()
    if not pid: return
    ex = query("SELECT * FROM blog_posts WHERE id=?", [int(pid)])
    if not ex: print("  ❌ Yok!"); return
    ex = ex[0]
    title = input(f"  Baslik (bos=degismez): ").strip() or ex["title"]
    desc = input(f"  Aciklama (bos=degismez): ").strip() or ex.get("description","")
    nc = input("  Yeni icerik (bos=degismez, f=dosyadan): ").strip()
    if nc == "f":
        fp = input("  Dosya: ").strip()
        with open(fp, "r", encoding="utf-8") as f: nc = f.read()
    elif not nc: nc = ex["content"]
    query("UPDATE blog_posts SET title=?,description=?,content=?,updated_at=datetime('now') WHERE id=?", [title,desc,nc,int(pid)])
    print(f"  ✅ Guncellendi: {title}")

def toggle_publish():
    list_posts()
    pid = input("\n  ID: ").strip()
    if not pid: return
    ex = query("SELECT published,title FROM blog_posts WHERE id=?", [int(pid)])
    if not ex: print("  ❌ Yok!"); return
    cur = ex[0]["published"]
    query("UPDATE blog_posts SET published=?,updated_at=datetime('now') WHERE id=?", [0 if cur else 1, int(pid)])
    print(f"  ✅ '{ex[0]['title']}' -> {'taslak' if cur else 'yayinda'}")

def delete_post():
    list_posts()
    pid = input("\n  ID: ").strip()
    if not pid: return
    if input("  Emin? (e/h): ").strip().lower() != "e": return
    query("DELETE FROM blog_posts WHERE id=?", [int(pid)])
    print(f"  ✅ Silindi: {pid}")

# ─── REVIEWS ───
def list_reviews():
    rows = query("SELECT r.id,r.quote_id,q.name as musteri,r.rating,r.comment,r.created_at FROM reviews r LEFT JOIN quotes q ON r.quote_id=q.id ORDER BY r.created_at DESC;")
    print(f"\n⭐ YORUMLAR ({len(rows)} kayit)")
    print_table(rows, ["id","musteri","rating","comment","created_at"])

def add_review():
    print("\n➕ YENI YORUM")
    quotes = query("SELECT id,name FROM quotes ORDER BY id;")
    if quotes: print_table(quotes, ["id","name"])
    qid = int(input("  Teklif ID: ").strip() or "0")
    rating = int(input("  Puan (1-5): ").strip() or "5")
    if not 1 <= rating <= 5: print("  ❌ 1-5!"); return
    comment = input("  Yorum: ").strip()
    query("INSERT INTO reviews (quote_id,rating,comment) VALUES (?,?,?)", [qid,rating,comment])
    print(f"  ✅ Eklendi ({rating}/5)")

def delete_review():
    list_reviews()
    rid = input("\n  ID: ").strip()
    if not rid: return
    if input("  Emin? (e/h): ").strip().lower() != "e": return
    query("DELETE FROM reviews WHERE id=?", [int(rid)])
    print(f"  ✅ Silindi: {rid}")

def rating_stats():
    rows = query("SELECT COUNT(*) as t,AVG(rating) as avg,SUM(CASE WHEN rating=5 THEN 1 ELSE 0 END) as b5,SUM(CASE WHEN rating=4 THEN 1 ELSE 0 END) as b4,SUM(CASE WHEN rating=3 THEN 1 ELSE 0 END) as b3,SUM(CASE WHEN rating<=2 THEN 1 ELSE 0 END) as low FROM reviews;")
    if rows:
        r = rows[0]
        print(f"\n📊 YORUM ISTATISTIK")
        print(f"  Toplam: {r['t'] or 0}")
        print(f"  Ortalama: {r['avg']:.1f}/5" if r['avg'] else "  Ortalama: -")
        print(f"  5★: {r['b5'] or 0} | 4★: {r['b4'] or 0} | 3★: {r['b3'] or 0} | ≤2★: {r['low'] or 0}")

# ─── OTHER ───
def show_quotes():
    rows = query("SELECT id,name,source_language,target_language,document_type,page_count,status,order_status,estimated_price,created_at FROM quotes ORDER BY created_at DESC;")
    print(f"\n📋 TEKLIFLER ({len(rows)} kayit)")
    for r in rows:
        print(f"  #{r['id']} | {r['name']} | {r['source_language']}→{r['target_language']} | {r['document_type'] or '-'} | {r['page_count'] or 0} syf | Durum:{r['status']} | ₺{r['estimated_price'] or 0} | {str(r['created_at'])[:10]}")

def show_messages():
    rows = query("SELECT id,name,email,subject,message,created_at FROM messages ORDER BY created_at DESC;")
    print(f"\n📧 MESAJLAR ({len(rows)} kayit)")
    for r in rows:
        print(f"  #{r['id']} | {r['name']} | {r['email']} | {r['subject'] or '-'} | {str(r['created_at'])[:10]}")
        print(f"    {str(r['message'])[:100]}...")

def show_payments():
    rows = query("SELECT id,quote_id,amount,status,customer_name,created_at,paid_at FROM payments ORDER BY created_at DESC;")
    print(f"\n💳 ODEMELER ({len(rows)} kayit)")
    for r in rows:
        print(f"  #{r['id']} | Teklif#{r['quote_id']} | ₺{r['amount']} | {r['status']} | {r['customer_name'] or '-'} | {str(r['created_at'])[:10]}")

# ─── MENU ───
def main():
    while True:
        print("\n" + "=" * 50)
        print("  mazzgord.com — Icerik Yonetim CLI")
        print("=" * 50)
        print("\n  📊 FIYAT")
        print("    1. Listele  2. Ekle  3. Guncelle  4. Sil  5. Toplu  6. CSV")
        print("\n  📝 BLOG")
        print("    7. Listele  8. Ekle  9. Dosyadan  10. Guncelle  11. Yayin  12. Sil")
        print("\n  ⭐ YORUM")
        print("    13. Listele  14. Ekle  15. Sil  16. Istatistik")
        print("\n  📋 DIGER")
        print("    17. Teklifler  18. Mesajlar  19. Odemeler")
        print("\n    0. Cikis")
        c = input("\n  Secim: ").strip()
        acts = {"1":list_pricing,"2":add_pricing,"3":update_pricing,"4":delete_pricing,"5":bulk_update,"6":export_pricing,
                "7":list_posts,"8":add_post,"9":add_post_file,"10":update_post,"11":toggle_publish,"12":delete_post,
                "13":list_reviews,"14":add_review,"15":delete_review,"16":rating_stats,
                "17":show_quotes,"18":show_messages,"19":show_payments}
        if c == "0": print("  👋 Gorusuruz!"); break
        elif c in acts:
            try: acts[c]()
            except Exception as e: print(f"  ❌ {e}")
        else: print("  ❌ Gecersiz!")
        input("\n  Enter...")

if __name__ == "__main__":
    main()

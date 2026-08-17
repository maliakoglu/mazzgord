import os
import sys
import time
import subprocess
import urllib.request

print("🚀 MAZZGORD Python prerender başlatılıyor...")

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
DIST = os.path.join(os.getcwd(), "dist", "public")

if not os.path.exists(CHROME):
    print("❌ Google Chrome bulunamadı.")
    sys.exit(1)

if not os.path.exists(DIST):
    print("❌ dist klasörü bulunamadı. Önce Vite build yap.")
    sys.exit(1)

print("✅ Chrome bulundu.")
print(f"📁 dist: {DIST}")

# Local server
print("🌐 Local server başlatılıyor...")

server = subprocess.Popen(
    ["python3", "spa_server.py"],
    stdout=subprocess.DEVNULL,
    stderr=subprocess.DEVNULL
)

time.sleep(2)

try:
    urllib.request.urlopen("http://localhost:3001", timeout=5)
    print("✅ Server: http://localhost:3001")
except Exception as e:
    print(f"❌ Server başlatılamadı: {e}")
    server.terminate()
    sys.exit(1)

# React/Vite SPA route'ları
ROUTES = [
    "/",
    "/hakkimizda",
    "/yeminli-tercume",
    "/ingilizce-turkce-ceviri",
    "/teknik-ceviri",
    "/akademik-ceviri",
    "/vize-ceviri",
    "/pasaport-ceviri",
    "/diploma-ceviri",
    "/fiyatlar",
    "/hizmetler",
    "/sepet",
    "/teklif",
    "/odeme",
    "/odeme/sonuc",
    "/giris",
    "/hesabim",
    "/sss",
    "/blog",
    "/blog/yeminli-tercume",
    "/blog/vize-ceviri",
    "/blog/teknik-ceviri",
    "/blog/akademik-ceviri",
    "/blog/ceviri-ipuclari",
    "/blog/ceviri-sektoru",
    "/blog/tibbi-ceviri",
    "/blog/yerellestirme-hizmetleri",
    "/blog/ceviri-teknolojileri",
    "/blog/ceviri-hatalari",
    "/blog/teknik-ceviri-nedir",
    "/blog/hukuki-ceviri",
    "/blog/teknik-hukuk-vize-ceviri-rehberi",
    "/blog/cevirmenlik-kariyer-rehberi",
    "/blog/ingilizce-turkce-deyim-cevirisi",
    "/blog/google-translate-vs-profesyonel-ceviri",
    "/blog/ingilizce-sozlesme-cevirisi",
    "/blog/ingilizce-mektup-email-cevirisi",
    "/blog/ingilizce-edebi-metin-cevirisi",
    "/blog/noter-onayli-ceviri",
    "/blog/pasaport-tercumesi-nasil-yapilir",
    "/blog/yeminli-tercume-fiyatlari-2026",
]

print(f"📋 {len(ROUTES)} route render edilecek.")

# Chrome'u headless çalıştır
for route in ROUTES:
    url = f"http://localhost:3001{route}"

    print(f"📄 Render: {route}")

    result = subprocess.run(
        [
            CHROME,
            "--headless=new",
            "--disable-gpu",
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-dev-shm-usage",
            "--no-first-run",
            "--no-default-browser-check",
            "--virtual-time-budget=3000",
            "--dump-dom",
            url,
        ],
        capture_output=True,
        text=True,
        timeout=30,
    )

    if result.returncode != 0:
        print(f"⚠️ Chrome hata verdi: {route}")
        print(result.stderr[-500:])
        continue

    html = result.stdout

    if not html.strip():
        print(f"⚠️ Boş HTML: {route}")
        continue

    # URL'den dosya yolu oluştur
    clean = route.strip("/")

    if not clean:
        output_dir = DIST
    else:
        output_dir = os.path.join(DIST, clean)

    os.makedirs(output_dir, exist_ok=True)

    output_file = os.path.join(output_dir, "index.html")

    with open(output_file, "w", encoding="utf-8") as f:
        f.write(html)

    print(f"   ✅ Kaydedildi: {output_file}")

print()
print("🎉 PRERENDER TAMAMLANDI.")

server.terminate()
server.wait()

print("🛑 Local server kapatıldı.")

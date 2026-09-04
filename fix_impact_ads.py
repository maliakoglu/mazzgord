import os

FILES = [
    "client/src/components/home/WhyChooseUs.tsx",
    "client/src/pages/Home.tsx",
]

def fix_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    original = content
    content = content.replace('src="//a.impactradius-go.com', 'src="https://a.impactradius-go.com')
    content = content.replace(
        'width="728"\n                  height="90"\n                  scrolling="no"\n                  frameBorder="0"\n                  marginHeight={0}\n                  marginWidth={0}\n                  style={{ border: "none", maxWidth: "100%", height: "auto" }}',
        'width="100%"\n                  height="90"\n                  scrolling="no"\n                  frameBorder="0"\n                  marginHeight={0}\n                  marginWidth={0}\n                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"\n                  referrerPolicy="no-referrer-when-downgrade"\n                  style={{ border: "none", maxWidth: "728px", width: "100%", height: "auto" }}'
    )
    content = content.replace(
        'width="300"\n              height="250"\n              scrolling="no"\n              frameBorder="0"\n              marginHeight={0}\n              marginWidth={0}\n              style={{ border: \'none\' }}',
        'width="100%"\n              height="250"\n              scrolling="no"\n              frameBorder="0"\n              marginHeight={0}\n              marginWidth={0}\n              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"\n              referrerPolicy="no-referrer-when-downgrade"\n              style={{ border: \'none\', maxWidth: \'300px\', width: \'100%\' }}'
    )
    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  Duzeltildi: {path}")
        return True
    else:
        print(f"  Degisiklik yok: {path}")
        return False

print("=== impact.com mobil reklam duzeltmesi ===\n")
changed = 0
for f in FILES:
    if os.path.exists(f):
        if fix_file(f):
            changed += 1
    else:
        print(f"  Bulunamadi: {f}")
print(f"\n{changed} dosya duzeltildi.")

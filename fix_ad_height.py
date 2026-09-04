import os

FILES = [
    "client/src/components/home/WhyChooseUs.tsx",
    "client/src/pages/Home.tsx",
]

def fix_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    original = content

    # 728x90 banner: height auto -> sabit 90px, sandbox'i kaldir
    content = content.replace(
        'sandbox="allow-scripts allow-same-origin allow-popups allow-forms"\n                  referrerPolicy="no-referrer-when-downgrade"\n                  style={{ border: "none", maxWidth: "728px", width: "100%", height: "auto" }}',
        'referrerPolicy="no-referrer-when-downgrade"\n                  style={{ border: "none", maxWidth: "728px", width: "100%", height: "90px" }}'
    )

    # 300x250: height auto -> sabit 250px, sandbox'i kaldir
    content = content.replace(
        'sandbox="allow-scripts allow-same-origin allow-popups allow-forms"\n              referrerPolicy="no-referrer-when-downgrade"\n              style={{ border: \'none\', maxWidth: \'300px\', width: \'100%\' }}',
        'referrerPolicy="no-referrer-when-downgrade"\n              style={{ border: \'none\', maxWidth: \'300px\', width: \'100%\', height: \'250px\' }}'
    )

    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  Duzeltildi: {path}")
        return True
    else:
        print(f"  Degisiklik yok: {path}")
        return False

print("=== Reklam yukseklik duzeltmesi ===\n")
changed = 0
for f in FILES:
    if os.path.exists(f):
        if fix_file(f):
            changed += 1
    else:
        print(f"  Bulunamadi: {f}")
print(f"\n{changed} dosya duzeltildi.")

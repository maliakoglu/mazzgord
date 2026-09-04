import os

def fix_home():
    path = "client/src/pages/Home.tsx"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    original = content

    # Parent div: overflow hidden'i kaldir, maxWidth 728px yap
    content = content.replace(
        "<div style={{ overflow: 'hidden', maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>",
        "<div style={{ display: 'flex', justifyContent: 'center' }}>"
    )

    # Iframe: width 728 sabit, maxWidth kaldir
    content = content.replace(
        'width="100%"\n                  height="90"\n                  scrolling="no"\n                  frameBorder="0"\n                  marginHeight={0}\n                  marginWidth={0}\n                  referrerPolicy="no-referrer-when-downgrade"\n                  style={{ border: "none", maxWidth: "728px", width: "100%", height: "90px" }}',
        'width="728"\n                  height="90"\n                  scrolling="no"\n                  frameBorder="0"\n                  marginHeight={0}\n                  marginWidth={0}\n                  referrerPolicy="no-referrer-when-downgrade"\n                  style={{ border: "none", width: "728px", height: "90px" }}'
    )

    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  Duzeltildi: {path}")
    else:
        print(f"  Degisiklik yok: {path}")

fix_home()

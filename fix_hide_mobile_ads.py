import os

FILES = [
    "client/src/components/home/WhyChooseUs.tsx",
    "client/src/pages/Home.tsx",
]

def fix_file(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    original = content

    # WhyChooseUs.tsx — iframe'in parent div'ine hidden md:block ekle
    content = content.replace(
        '<div className="rounded-lg flex items-center justify-center" style={{ backgroundColor: \'var(--color-soft-sand)\', borderRadius: \'24px\', padding: \'40px\' }}>',
        '<div className="rounded-lg flex items-center justify-center hidden md:flex" style={{ backgroundColor: \'var(--color-soft-sand)\', borderRadius: \'24px\', padding: \'40px\' }}>'
    )

    # Home.tsx — reklam section'larina hidden md:block ekle
    content = content.replace(
        '<section className="py-8 bg-background">\n          <div className="container mx-auto px-4" style={{ maxWidth: \'1200px\' }}>\n            <div className="flex justify-center">\n              <div style={{ overflow: \'hidden\', maxWidth: \'100%\', display: \'flex\', justifyContent: \'center\' }}>',
        '<section className="py-8 bg-background hidden md:block">\n          <div className="container mx-auto px-4" style={{ maxWidth: \'1200px\' }}>\n            <div className="flex justify-center">\n              <div style={{ overflow: \'hidden\', maxWidth: \'100%\', display: \'flex\', justifyContent: \'center\' }}>'
    )

    if content != original:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  Duzeltildi: {path}")
        return True
    else:
        print(f"  Degisiklik yok: {path}")
        return False

print("=== Mobilde reklamlari gizleme ===\n")
changed = 0
for f in FILES:
    if os.path.exists(f):
        if fix_file(f):
            changed += 1
    else:
        print(f"  Bulunamadi: {f}")
print(f"\n{changed} dosya duzeltildi.")

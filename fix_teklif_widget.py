with open('client/src/pages/TeklifFormu.tsx', 'r') as f:
    content = f.read()

# 1. Turnstile widget'ı submit butonundan hemen önceki badge bloğuna ekle
old_badge = """        {/* Güven Badge'leri */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-muted-foreground">"""

new_badge = """        {/* Turnstile güvenlik doğrulaması */}
        <div className="flex justify-center mb-6">
          <Turnstile onToken={setTurnstileToken} />
        </div>

        {/* Güven Badge'leri */}
        <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-muted-foreground">"""

if old_badge in content and '<Turnstile onToken' not in content:
    content = content.replace(old_badge, new_badge)
    print('1/2 Turnstile widget eklendi')
elif '<Turnstile onToken' in content:
    print('1/2 Widget zaten var')
else:
    print('1/2 HATA: badge blok bulunamadi')

# 2. Submit butonuna !turnstileToken ekle
old_disabled = 'disabled={submitStatus === "sending" || uploadStatus === "uploading" || !kvkkAccepted}'
new_disabled = 'disabled={submitStatus === "sending" || uploadStatus === "uploading" || !kvkkAccepted || !turnstileToken}'

if old_disabled in content:
    content = content.replace(old_disabled, new_disabled)
    print('2/2 Buton kilidi eklendi')
elif '!turnstileToken}' in content:
    print('2/2 Buton kilidi zaten var')
else:
    print('2/2 HATA: disabled blok bulunamadi')

with open('client/src/pages/TeklifFormu.tsx', 'w') as f:
    f.write(content)
print('DONE: TeklifFormu.tsx kaydedildi')

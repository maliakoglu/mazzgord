with open('client/src/pages/Home.tsx', 'r') as f:
    content = f.read()

# 1. Turnstile import ekle
if 'import Turnstile' not in content:
    content = content.replace(
        'import { useState, useEffect } from "react";',
        'import { useState, useEffect } from "react";\nimport Turnstile from "@/components/Turnstile";'
    )
    print("1/3 Import eklendi")
else:
    print("1/3 Import zaten var")

# 2. turnstileToken state ekle
if 'turnstileToken' not in content:
    content = content.replace(
        'const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");',
        'const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");\n  const [turnstileToken, setTurnstileToken] = useState("");'
    )
    print("2/3 State eklendi")
else:
    print("2/3 State zaten var")

# 3. /api/contact fetch body'ye turnstile_token ekle
old_body = 'body: JSON.stringify(formData),'
new_body = 'body: JSON.stringify({ ...formData, turnstile_token: turnstileToken }),'
if old_body in content and 'turnstile_token' not in content.split('api/contact')[1].split(')')[0]:
    content = content.replace(old_body, new_body, 1)
    print("3/3 Fetch body guncellendi")
elif 'turnstile_token' in content:
    print("3/3 Fetch body zaten guncel")
else:
    print("3/3 HATA: fetch body bulunamadi")

with open('client/src/pages/Home.tsx', 'w') as f:
    f.write(content)
print("DONE: Home.tsx kaydedildi")

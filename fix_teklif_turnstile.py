with open('client/src/pages/TeklifFormu.tsx', 'r') as f:
    content = f.read()

# 1. Turnstile import ekle
if 'import Turnstile' not in content:
    content = content.replace(
        'import { track } from "@/lib/analytics";',
        'import { track } from "@/lib/analytics";\nimport Turnstile from "@/components/Turnstile";'
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

# 3. fetch body'ye turnstile_token ekle
if 'turnstile_token: turnstileToken' not in content:
    content = content.replace(
        'idempotency_key: idempotencyKey }) });',
        'idempotency_key: idempotencyKey,\n          turnstile_token: turnstileToken }) });'
    )
    print("3/3 Fetch body guncellendi")
else:
    print("3/3 Fetch body zaten guncel")

with open('client/src/pages/TeklifFormu.tsx', 'w') as f:
    f.write(content)
print("DONE: TeklifFormu.tsx kaydedildi")

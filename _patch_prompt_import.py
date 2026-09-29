with open("worker.js", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Import ekle — escapeHtml import'undan sonra
old_import = 'import { escapeHtml } from "./lib/escapeHtml.js";'
new_import = 'import { escapeHtml } from "./lib/escapeHtml.js";\nimport { buildSystemPrompt } from "./lib/chatSystemPrompt.js";'

if old_import not in content:
    print("HATA: Import satiri bulunamadi!")
    exit(1)
content = content.replace(old_import, new_import)

# 2. systemPrompt satirini bul ve degistir
# "const systemPrompt = `Sen Mazzgord" ile baslayan satiri bul
old_prompt_start = "        const systemPrompt = `Sen Mazzgord"
if old_prompt_start not in content:
    print("HATA: systemPrompt baslangici bulunamadi!")
    exit(1)

# systemPrompt blok'unun sonunu bul: "${pricingContext}${proposalContext}`;" 
old_prompt_end = "${pricingContext}${proposalContext}`;"
if old_prompt_end not in content:
    print("HATA: systemPrompt sonu bulunamadi!")
    exit(1)

# Baslangic satirindan sonuna kadar olan kismi bul ve degistir
start_idx = content.index(old_prompt_start)
end_idx = content.index(old_prompt_end) + len(old_prompt_end)

old_block = content[start_idx:end_idx]
new_block = '        const systemPrompt = buildSystemPrompt(pricingContext, proposalContext);'

content = content[:start_idx] + new_block + content[end_idx:]

with open("worker.js", "w", encoding="utf-8") as f:
    f.write(content)

print("OK: worker.js system prompt import edildi, inline prompt kaldirildi")

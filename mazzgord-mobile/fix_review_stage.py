with open("app/(tabs)/track.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# stage === 3 -> stage === 5 (teslim edilen siparisler)
content = content.replace("{stage === 3 && <View style={{ marginTop: 14, gap: 10 }}>", "{stage === 5 && <View style={{ marginTop: 14, gap: 10 }}>", 1)

# Badge rengi: stage === 3 -> stage === 5
content = content.replace('stage === 3 ? "green" : stage === 2 ? "orange" : "blue"', 'stage === 5 ? "green" : stage === 4 ? "orange" : "blue"', 1)

with open("app/(tabs)/track.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("OK: degerlendirme butonu stage 5'e tasindi")

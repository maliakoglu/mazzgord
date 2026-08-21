with open("app/(tabs)/track.tsx", "r", encoding="utf-8") as f:
    content = f.read()

old = """          {/* Stage 1: Payment after accept */}
          {stage === 1 && quote.order_status === "payment_pending" && quote.payment_link_id && <View style={{ marginTop: 14 }}><PrimaryButton title="Odemeyi tamamla" icon="payments" onPress={() => handlePay(quote)} /></View>}"""

new = """          {/* Stage 3: Payment after accept */}
          {stage === 3 && quote.order_status === "payment_pending" && quote.payment_link_id && <View style={{ marginTop: 14 }}><PrimaryButton title="Odemeyi tamamla" icon="payments" onPress={() => handlePay(quote)} /></View>}"""

content = content.replace(old, new, 1)

with open("app/(tabs)/track.tsx", "w", encoding="utf-8") as f:
    f.write(content)
print("OK: odeme butonu stage 3'e tasindi")

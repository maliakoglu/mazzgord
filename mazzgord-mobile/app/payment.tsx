import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, PrimaryButton } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";
import { paymentApi, type PaymentInfo } from "@/lib/api";

export default function PaymentScreen() {
  const colors = useColors();
  const params = useLocalSearchParams<{ link?: string }>();
  const linkId = params.link || "";
  const [payment, setPayment] = useState<PaymentInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    if (!linkId) { setError("Ödeme linki eksik"); return; }
    setLoading(true);
    paymentApi.get(linkId)
      .then((res) => {
        if (res.success && res.data) setPayment(res.data);
        else setError(res.error || "Ödeme bulunamadı");
      })
      .catch(() => setError("Ödeme bilgisi alınamadı"))
      .finally(() => setLoading(false));
  }, [linkId]);

  const handlePay = async () => {
    if (!payment) return;
    setLoading(true);
    setError(null);
    try {
      const res = await paymentApi.initialize(payment.payment_link_id);
      if (res.success && res.payment_page_url) {
        await WebBrowser.openBrowserAsync(res.payment_page_url);
        setPaid(true);
      } else {
        setError(res.error || "Ödeme başlatılamadı");
      }
    } catch {
      setError("Ödeme başlatılamadı");
    } finally {
      setLoading(false);
    }
  };

  if (paid) return <ScreenContainer edges={["top", "bottom", "left", "right"]}><View style={{ flex: 1, padding: 24, alignItems: "center", justifyContent: "center" }}><View style={{ width: 84, height: 84, borderRadius: 42, backgroundColor: "#DCFCE7", alignItems: "center", justifyContent: "center" }}><MaterialIcons name="verified" size={46} color="#16A34A" /></View><Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "900", marginTop: 20, textAlign: "center" }}>Ödeme başarılı.</Text><Text style={{ color: colors.muted, fontSize: 14, lineHeight: 21, textAlign: "center", marginTop: 9 }}>Siparişiniz işleme alındı. Makbuzunuz e-posta adresinize gönderildi.</Text><View style={{ width: "100%", marginTop: 24 }}><PrimaryButton title="Siparişimi takip et" icon="timeline" onPress={() => router.push("/(tabs)/track")} /></View></View></ScreenContainer>;

  if (loading && !payment) return <ScreenContainer edges={["top", "bottom", "left", "right"]}><View style={{ flex: 1, padding: 24, alignItems: "center", justifyContent: "center" }}><MaterialIcons name="hourglass-top" size={40} color={colors.muted} /><Text style={{ color: colors.muted, marginTop: 12 }}>Ödeme bilgisi yükleniyor...</Text></View></ScreenContainer>;

  if (error) return <ScreenContainer edges={["top", "bottom", "left", "right"]}><View style={{ flex: 1, padding: 24, alignItems: "center", justifyContent: "center" }}><MaterialIcons name="error-outline" size={40} color="#EF4444" /><Text style={{ color: colors.foreground, fontSize: 18, fontWeight: "800", marginTop: 12 }}>{error}</Text><View style={{ marginTop: 20 }}><PrimaryButton title="Geri dön" icon="arrow-back" onPress={() => router.back()} /></View></View></ScreenContainer>;

  if (!payment) return <ScreenContainer edges={["top", "bottom", "left", "right"]}><View style={{ flex: 1, padding: 24, alignItems: "center", justifyContent: "center" }}><MaterialIcons name="error-outline" size={40} color={colors.muted} /><Text style={{ color: colors.muted, marginTop: 12 }}>Ödeme bilgisi bulunamadı.</Text></View></ScreenContainer>;

  return <ScreenContainer edges={["top", "left", "right"]}><ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}><Pressable onPress={() => router.back()}><MaterialIcons name="arrow-back" size={24} color={colors.foreground} /></Pressable><LogoMark compact /><Badge tone="green">GÜVENLİ ÖDEME</Badge></View>
    <Text style={{ color: colors.foreground, fontSize: 29, fontWeight: "900", letterSpacing: -0.8 }}>Ödeme özeti</Text>
    <Text style={{ color: colors.muted, fontSize: 14, marginTop: 8 }}>Siparişinizi tamamlamak üzeresiniz.</Text>
    <View style={{ backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 18, marginTop: 23 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12, paddingBottom: 17, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={{ width: 44, height: 44, borderRadius: 13, backgroundColor: "#FFF7ED", alignItems: "center", justifyContent: "center" }}><MaterialIcons name="receipt-long" size={24} color={colors.primary} /></View>
        <View><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "800" }}>{payment.description || "Çeviri Hizmeti"}</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 3 }}>{payment.customer_name}</Text></View>
      </View>
      <View style={{ paddingTop: 17, gap: 13 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}><Text style={{ color: colors.muted, fontSize: 13 }}>Hizmet bedeli</Text><Text style={{ color: colors.foreground, fontWeight: "700" }}>{Number(payment.amount).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺</Text></View>
        <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 2 }} />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}><Text style={{ color: colors.foreground, fontSize: 16, fontWeight: "900" }}>Toplam</Text><Text style={{ color: colors.primary, fontSize: 20, fontWeight: "900" }}>{Number(payment.amount).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺</Text></View>
      </View>
    </View>
    <View style={{ backgroundColor: "#EFF6FF", borderRadius: 17, padding: 16, flexDirection: "row", gap: 11, marginTop: 16 }}><MaterialIcons name="lock" size={20} color="#2563EB" /><Text style={{ flex: 1, color: "#1E40AF", fontSize: 12, lineHeight: 18 }}>Ödeme bilgileriniz iyzico'nun güvenli ödeme sayfasında işlenir. Kart bilgileriniz uygulamada saklanmaz.</Text></View>
    <View style={{ marginTop: 23 }}><PrimaryButton title={loading ? "Başlatılıyor..." : "Güvenli ödemeye geç"} icon="lock" onPress={handlePay} disabled={loading} /></View>
    <Text style={{ color: colors.muted, fontSize: 11, textAlign: "center", marginTop: 13 }}>3D Secure ile korunmaktadır.</Text>
  </ScrollView></ScreenContainer>;
}

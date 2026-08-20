import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, PrimaryButton } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";
import { quoteApi, type QuoteStatus } from "@/lib/api";

const STATUS_STEPS = [
  { key: "pending", title: "Talep alındı", icon: "check" as const },
  { key: "reviewing", title: "Belge inceleniyor", icon: "search" as const },
  { key: "in_progress", title: "Çeviri hazırlanıyor", icon: "edit" as const },
  { key: "completed", title: "Teslim edildi", icon: "local-shipping" as const },
];

const STATUS_LABELS: Record<string, string> = {
  pending: "Beklemede",
  reviewing: "İnceleniyor",
  in_progress: "Hazırlanıyor",
  completed: "Tamamlandı",
  delivered: "Teslim Edildi",
  cancelled: "İptal Edildi",
};

function getStatusIndex(status: string): number {
  const idx = STATUS_STEPS.findIndex((s) => s.key === status);
  return idx >= 0 ? idx : 0;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export default function TrackScreen() {
  const colors = useColors();
  const [ref, setRef] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<QuoteStatus | null>(null);

  const handleSearch = async () => {
    if (!ref.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await quoteApi.track(ref.trim().toUpperCase());
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.error || "Sipariş bulunamadı");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sipariş bulunamadı");
    } finally {
      setLoading(false);
    }
  };

  const statusIndex = data ? getStatusIndex(data.order_status) : 0;

  return <ScreenContainer edges={["top", "left", "right"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 34 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}><LogoMark compact /><Badge tone="blue">SİPARİŞ TAKİBİ</Badge></View>
    <Text style={{ color: colors.foreground, fontSize: 29, fontWeight: "900", letterSpacing: -0.8 }}>Siparişinizin{`\n`}durumunu öğrenin.</Text>
    <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 9 }}>Başvuru veya sipariş numaranızı girerek güncel durumu görüntüleyin.</Text>
    <View style={{ marginTop: 23, backgroundColor: colors.surface, borderRadius: 19, padding: 16, borderWidth: 1, borderColor: colors.border }}><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "800", marginBottom: 9 }}>Başvuru numarası</Text><View style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", paddingHorizontal: 13 }}><MaterialIcons name="tag" size={19} color={colors.muted} /><TextInput value={ref} onChangeText={setRef} placeholder="Örn. MZ-00624" placeholderTextColor={colors.muted} autoCapitalize="characters" style={{ flex: 1, marginLeft: 9, color: colors.foreground, fontWeight: "700" }} /></View><View style={{ marginTop: 13 }}><PrimaryButton title={loading ? "Aranıyor..." : "Siparişi görüntüle"} icon="search" onPress={handleSearch} /></View></View>

    {error && <View style={{ marginTop: 24, backgroundColor: "#FEF2F2", borderRadius: 16, padding: 18, borderWidth: 1, borderColor: "#FECACA", alignItems: "center" }}><MaterialIcons name="error-outline" size={36} color="#EF4444" /><Text style={{ color: "#991B1B", fontSize: 15, fontWeight: "700", marginTop: 10 }}>{error}</Text></View>}

    {data && <View style={{ marginTop: 24 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}><View><Text style={{ color: colors.muted, fontSize: 11, fontWeight: "800" }}>BAŞVURU</Text><Text style={{ color: colors.foreground, fontSize: 21, fontWeight: "900", marginTop: 3 }}>{data.order_no}</Text></View><Badge tone="orange">{STATUS_LABELS[data.order_status] || data.order_status}</Badge></View>
      <View style={{ backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 18 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 22 }}><View><Text style={{ color: colors.muted, fontSize: 11 }}>DİLLER</Text><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginTop: 4 }}>{data.source_language} → {data.target_language}</Text></View><View style={{ alignItems: "flex-end" }}><Text style={{ color: colors.muted, fontSize: 11 }}>TAHMİNİ TESLİM</Text><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginTop: 4 }}>{formatDate(data.delivery_date)}</Text></View></View>
        {STATUS_STEPS.map((item, index) => <View key={item.key} style={{ flexDirection: "row", minHeight: index < STATUS_STEPS.length - 1 ? 63 : 40 }}><View style={{ width: 25, alignItems: "center" }}><View style={{ width: 25, height: 25, borderRadius: 13, backgroundColor: index <= statusIndex ? colors.primary : colors.background, borderWidth: index <= statusIndex ? 0 : 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" }}><MaterialIcons name={item.icon} size={14} color={index <= statusIndex ? "#fff" : colors.muted} /></View>{index < STATUS_STEPS.length - 1 && <View style={{ width: 2, flex: 1, backgroundColor: index < statusIndex ? colors.primary : colors.border, marginVertical: 4 }} />}</View><View style={{ marginLeft: 12, paddingBottom: 9 }}><Text style={{ color: index <= statusIndex ? colors.foreground : colors.muted, fontSize: 14, fontWeight: index <= statusIndex ? "800" : "600" }}>{item.title}</Text></View></View>)}
        {data.estimated_price != null && <View style={{ marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border }}><Text style={{ color: colors.muted, fontSize: 11 }}>TAHMİNİ BEDEL</Text><Text style={{ color: colors.primary, fontSize: 20, fontWeight: "900", marginTop: 4 }}>{Number(data.estimated_price).toLocaleString("tr-TR")} ₺</Text></View>}
      </View>
    </View>}
  </ScrollView></ScreenContainer>;
}

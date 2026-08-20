import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, SectionTitle } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";
import { servicesApi, type Service } from "@/lib/api";

const CATEGORY_ICONS: Record<string, { icon: keyof typeof MaterialIcons.glyphMap; tone: "blue" | "orange" | "green" }> = {
  "Resmi": { icon: "verified", tone: "blue" },
  "Uzmanlık": { icon: "engineering", tone: "orange" },
  "Hukuki": { icon: "balance", tone: "orange" },
  "Akademik": { icon: "school", tone: "blue" },
  "Teknik": { icon: "engineering", tone: "green" },
};

function getServiceMeta(s: Service) {
  const cat = CATEGORY_ICONS[s.category] || { icon: "translate" as const, tone: "blue" as const };
  const price = s.base_price > 0 ? `${s.base_price.toLocaleString("tr-TR")} ${s.currency} / ${s.unit}` : "Teklif alın";
  return { ...cat, price };
}

export default function ServicesScreen() {
  const colors = useColors();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tümü");
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = () => {
    setLoading(true);
    setError(null);
    servicesApi.list()
      .then((res) => {
        if (res.success && res.data) setServices(res.data);
        else setError("Hizmetler yüklenemedi");
      })
      .catch(() => setError("Hizmetler yüklenemedi"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchServices(); }, []);

  const categories = useMemo(() => {
    const cats = new Set(services.map((s) => s.category));
    return ["Tümü", ...Array.from(cats)];
  }, [services]);

  const filtered = useMemo(() =>
    services.filter((item) =>
      (category === "Tümü" || item.category === category) &&
      `${item.name} ${item.description || ""}`.toLowerCase().includes(query.toLowerCase())
    ), [services, category, query]);

  if (loading) return <ScreenContainer edges={["top", "left", "right"]}>
    <View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}>
      <MaterialIcons name="hourglass-top" size={40} color={colors.muted} />
      <Text style={{ color: colors.muted, marginTop: 12 }}>Hizmetler yükleniyor...</Text>
    </View>
  </ScreenContainer>;

  if (error) return <ScreenContainer edges={["top", "left", "right"]}>
    <View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}>
      <MaterialIcons name="cloud-off" size={40} color={colors.muted} />
      <Text style={{ color: colors.muted, marginTop: 12 }}>{error}</Text>
      <Pressable onPress={fetchServices} style={{ marginTop: 16, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: colors.primary }}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>Tekrar dene</Text>
      </Pressable>
    </View>
  </ScreenContainer>;

  return <ScreenContainer edges={["top", "left", "right"]}>
    <FlatList data={filtered} keyExtractor={(item) => String(item.id)} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 32 }} ListHeaderComponent={<>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}><LogoMark compact /><Badge>PROFESYONEL HİZMET</Badge></View>
      <Text style={{ color: colors.foreground, fontSize: 29, fontWeight: "900", letterSpacing: -0.8 }}>İhtiyacınıza uygun{`\n`}hizmeti bulun.</Text>
      <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 9, marginBottom: 18 }}>Her belge, uzman dokunuşu hak eder.</Text>
      <View style={{ height: 49, borderRadius: 15, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, flexDirection: "row", alignItems: "center", paddingHorizontal: 14, marginBottom: 14 }}><MaterialIcons name="search" size={22} color={colors.muted} /><TextInput value={query} onChangeText={setQuery} placeholder="Hizmet ara" placeholderTextColor={colors.muted} style={{ flex: 1, marginLeft: 9, color: colors.foreground, fontSize: 14 }} /></View>
      <FlatList data={categories} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item) => item} contentContainerStyle={{ gap: 8, marginBottom: 22 }} renderItem={({ item }) => <Pressable onPress={() => setCategory(item)} style={{ paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, backgroundColor: category === item ? colors.primary : colors.surface, borderWidth: 1, borderColor: category === item ? colors.primary : colors.border }}><Text style={{ color: category === item ? "#fff" : colors.muted, fontSize: 12, fontWeight: "800" }}>{item}</Text></Pressable>} />
      <SectionTitle title="Hizmetlerimiz" action={`${filtered.length} sonuç`} />
    </>} renderItem={({ item }) => { const meta = getServiceMeta(item); return <Pressable onPress={() => router.push("/(tabs)/quote")} style={({ pressed }) => [{ backgroundColor: colors.surface, borderRadius: 19, padding: 15, borderWidth: 1, borderColor: colors.border, marginBottom: 11, flexDirection: "row", gap: 13 }, pressed && { opacity: 0.78 }]}>
      <View style={{ width: 48, height: 48, borderRadius: 15, backgroundColor: meta.tone === "green" ? "#F0FDF4" : meta.tone === "blue" ? "#EFF6FF" : "#FFF7ED", alignItems: "center", justifyContent: "center" }}><MaterialIcons name={meta.icon} size={24} color={meta.tone === "green" ? "#16A34A" : meta.tone === "blue" ? "#2563EB" : colors.primary} /></View>
      <View style={{ flex: 1 }}><View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "800", flex: 1 }}>{item.name}</Text><MaterialIcons name="chevron-right" size={20} color={colors.muted} /></View><Text style={{ color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 4 }}>{item.description || ""}</Text><Text style={{ color: colors.primary, fontSize: 12, fontWeight: "800", marginTop: 8 }}>{meta.price}</Text></View>
    </Pressable>; }} ListEmptyComponent={<View style={{ alignItems: "center", paddingVertical: 40 }}><MaterialIcons name="search-off" size={40} color={colors.muted} /><Text style={{ color: colors.muted, marginTop: 10 }}>Aradığınız hizmet bulunamadı.</Text></View>} />
  </ScreenContainer>;
}

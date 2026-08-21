import { useEffect, useMemo, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, SectionTitle } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";
import { pricingApi, type PriceItem } from "@/lib/api";

const CATEGORY_LABELS: Record<string, string> = {
  resmi: "Resmi Belgeler",
  egitim: "Eğitim Belgeleri",
  ticari: "Ticari Belgeler",
};

const CATEGORY_ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  resmi: "verified",
  egitim: "school",
  ticari: "business-center",
};

function formatPrice(price: number): string {
  return price.toLocaleString("tr-TR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export default function FiyatlarScreen() {
  const colors = useColors();
  const [prices, setPrices] = useState<PriceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const fetchPrices = () => {
    setLoading(true);
    setError(null);
    pricingApi.list()
      .then((res) => {
        if (res.success && res.data) setPrices(res.data);
        else setError("Fiyatlar yüklenemedi");
      })
      .catch(() => setError("Fiyatlar yüklenemedi"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchPrices(); }, []);

  const categories = useMemo(() => {
    const cats = new Set(prices.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, [prices]);

  const filtered = useMemo(() =>
    prices.filter((p) =>
      (activeCategory === "all" || p.category === activeCategory) &&
      p.document_name.toLowerCase().includes(search.toLowerCase())
    ), [prices, activeCategory, search]);

  if (loading) return <ScreenContainer edges={["top", "left", "right"]}>
    <View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}>
      <MaterialIcons name="hourglass-top" size={40} color={colors.muted} />
      <Text style={{ color: colors.muted, marginTop: 12 }}>Fiyatlar yükleniyor...</Text>
    </View>
  </ScreenContainer>;

  if (error) return <ScreenContainer edges={["top", "left", "right"]}>
    <View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}>
      <MaterialIcons name="cloud-off" size={40} color={colors.muted} />
      <Text style={{ color: colors.muted, marginTop: 12 }}>{error}</Text>
      <Pressable onPress={fetchPrices} style={{ marginTop: 16, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: colors.primary }}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>Tekrar dene</Text>
      </Pressable>
    </View>
  </ScreenContainer>;

  return <ScreenContainer edges={["top", "left", "right"]}>
    <FlatList data={filtered} keyExtractor={(item) => String(item.id)} showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 32 }} ListHeaderComponent={<>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}><LogoMark compact /><Badge>FİYAT LİSTESİ</Badge></View>

      <Text style={{ color: colors.foreground, fontSize: 26, fontWeight: "900", letterSpacing: -0.7 }}>Yeminli Tercüme{"\n"}Fiyatları</Text>
      <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 9, marginBottom: 20 }}>Belge görülmeden kesin fiyat verilmez. Aşağıdaki başlangıç fiyatları referans amaçlıdır. Net teklif için belgenizi gönderin.</Text>

      {/* 3 Katmanlı Sistem */}
      <View style={{ gap: 9, marginBottom: 24 }}>
        {[
          { title: "Yeminli Tercüme", desc: "Belge türü ve yoğunluğa göre başlangıç fiyatı. Çeviri, imza ve kaşe dahil.", icon: "verified" as const },
          { title: "Noter İşlem/Takip", desc: "Gerçek noter bedeli makbuzla teyit edilir. İşlem/takip bedeli belgeyi notere götürme ve teslim alma hizmetidir.", icon: "gavel" as const },
          { title: "Apostil İşlem/Takip", desc: "Devlet apostil bedeli ayrı alınmaz. Başvuru, takip ve teslim hizmeti için işlem/takip bedeli alınır.", icon: "public" as const },
        ].map((item) => <View key={item.title} style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 16, padding: 14, flexDirection: "row", gap: 12 }}>
          <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: "#FFF7ED", alignItems: "center", justifyContent: "center" }}><MaterialIcons name={item.icon} size={20} color={colors.primary} /></View>
          <View style={{ flex: 1 }}><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800" }}>{item.title}</Text><Text style={{ color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 4 }}>{item.desc}</Text></View>
        </View>)}
      </View>

      <SectionTitle title="Belge Bazlı Fiyatlar" action={`${filtered.length} sonuç`} />

      {/* Arama */}
      <View style={{ height: 49, borderRadius: 15, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, flexDirection: "row", alignItems: "center", paddingHorizontal: 14, marginBottom: 12 }}><MaterialIcons name="search" size={22} color={colors.muted} /><TextInput value={search} onChangeText={setSearch} placeholder="Belge ara..." placeholderTextColor={colors.muted} style={{ flex: 1, marginLeft: 9, color: colors.foreground, fontSize: 14 }} /></View>

      {/* Kategori filtre */}
      <FlatList data={categories} horizontal showsHorizontalScrollIndicator={false} keyExtractor={(item) => item} contentContainerStyle={{ gap: 8, marginBottom: 18 }} renderItem={({ item }) => <Pressable onPress={() => setActiveCategory(item)} style={{ paddingHorizontal: 16, paddingVertical: 9, borderRadius: 20, backgroundColor: activeCategory === item ? colors.primary : colors.surface, borderWidth: 1, borderColor: activeCategory === item ? colors.primary : colors.border }}><Text style={{ color: activeCategory === item ? "#fff" : colors.muted, fontSize: 12, fontWeight: "800" }}>{item === "all" ? "Tümü" : CATEGORY_LABELS[item] || item}</Text></Pressable>} />
    </>} renderItem={({ item }) => {
      const catIcon = CATEGORY_ICONS[item.category] || "translate";
      const noterDiff = item.noter_price - item.yeminli_price;
      const apostilDiff = item.has_apostil_variant ? item.apostil_price - item.noter_price : null;
      return <View style={{ backgroundColor: colors.surface, borderRadius: 17, padding: 15, borderWidth: 1, borderColor: colors.border, marginBottom: 10 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 11, marginBottom: 11 }}>
          <View style={{ width: 42, height: 42, borderRadius: 13, backgroundColor: "#FFF7ED", alignItems: "center", justifyContent: "center" }}><MaterialIcons name={catIcon} size={22} color={colors.primary} /></View>
          <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "800", flex: 1 }}>{item.document_name}</Text>
        </View>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <View style={{ flex: 1, backgroundColor: colors.background, borderRadius: 12, padding: 10 }}>
            <Text style={{ color: colors.muted, fontSize: 10, fontWeight: "800" }}>YEMİNLİ</Text>
            <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "800", marginTop: 3 }}>{formatPrice(item.yeminli_price)} ₺</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: colors.background, borderRadius: 12, padding: 10 }}>
            <Text style={{ color: colors.muted, fontSize: 10, fontWeight: "800" }}>NOTER</Text>
            <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "800", marginTop: 3 }}>+{formatPrice(noterDiff)} ₺</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: colors.background, borderRadius: 12, padding: 10 }}>
            <Text style={{ color: colors.muted, fontSize: 10, fontWeight: "800" }}>APOSTİL</Text>
            <Text style={{ color: apostilDiff !== null ? colors.foreground : colors.muted, fontSize: 15, fontWeight: "800", marginTop: 3 }}>{apostilDiff !== null ? `+${formatPrice(apostilDiff)} ₺` : "—"}</Text>
          </View>
        </View>
      </View>;
    }} ListEmptyComponent={<View style={{ alignItems: "center", paddingVertical: 40 }}><MaterialIcons name="search-off" size={40} color={colors.muted} /><Text style={{ color: colors.muted, marginTop: 12, fontSize: 14 }}>Sonuç bulunamadı.</Text></View>} ListFooterComponent={<>
      {/* Önemli Bilgiler */}
      <View style={{ marginTop: 22, backgroundColor: colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: colors.border }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 }}><MaterialIcons name="info" size={18} color={colors.primary} /><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "800" }}>Önemli Bilgiler</Text></View>
        {[
          "Yeminli tercüme bedeli belge türü ve yoğunluğa göre değişir; her belge için sabit değildir.",
          "Noter bedeli belge türüne göre değişir; işlem öncesi noter makbuzuyla teyit edilir.",
          "Apostil şerhi valilik/kaymakamlıkça düzenlenir; devlet apostil bedeli ayrı alınmaz.",
          "Acil teslimde +%30-%50 ek ücret uygulanır; kapasiteye bağlıdır.",
          "Kargo bedeli gerçek gönderim bedelidir; şehir ve teslim şekline göre değişir.",
        ].map((info, i) => <View key={i} style={{ flexDirection: "row", gap: 8, marginTop: i ? 7 : 0 }}><Text style={{ color: colors.primary, fontSize: 12 }}>•</Text><Text style={{ color: colors.muted, fontSize: 12, lineHeight: 17, flex: 1 }}>{info}</Text></View>)}
      </View>
    </>} />
  </ScreenContainer>;
}

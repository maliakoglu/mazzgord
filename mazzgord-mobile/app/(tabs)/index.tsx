import { ScrollView, Pressable, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, PrimaryButton, SectionTitle, StatCard, styles } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";

const services = [
  { title: "Yeminli Tercüme", subtitle: "Resmi belgeleriniz için", icon: "verified" as const },
  { title: "Teknik Çeviri", subtitle: "Uzmanlık gerektiren metinler", icon: "engineering" as const },
  { title: "Akademik Çeviri", subtitle: "Tez, makale ve araştırma", icon: "school" as const },
];

export default function HomeScreen() {
  const colors = useColors();
  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 34 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
          <LogoMark />
          <Pressable onPress={() => router.push("/(tabs)/account")} style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border }}>
            <MaterialIcons name="person-outline" size={22} color={colors.foreground} />
          </Pressable>
        </View>

        <View style={{ backgroundColor: colors.primary, borderRadius: 25, padding: 22, overflow: "hidden", marginBottom: 22 }}>
          <View style={{ position: "absolute", width: 170, height: 170, borderRadius: 85, backgroundColor: "rgba(255,255,255,0.08)", right: -45, top: -58 }} />
          <Badge tone="orange">GÜVENİLİR ÇEVİRİ DENEYİMİ</Badge>
          <Text style={{ color: "#fff", fontSize: 29, fontWeight: "900", lineHeight: 34, letterSpacing: -0.8, marginTop: 17, maxWidth: 280 }}>Belgeleriniz, doğru dilde geleceğe hazır.</Text>
          <Text style={{ color: "#DBEAFE", fontSize: 14, lineHeight: 21, marginTop: 10, maxWidth: 290 }}>Profesyonel, yeminli ve hızlı çeviri hizmeti. Teklifinizi birkaç adımda alın.</Text>
          <View style={{ marginTop: 20, width: "72%" }}><PrimaryButton title="Hemen teklif al" icon="arrow-forward" onPress={() => router.push("/quote")} /></View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginTop: 15 }}><MaterialIcons name="schedule" size={15} color="#BFDBFE" /><Text style={{ color: "#BFDBFE", fontSize: 12, fontWeight: "600" }}>24 saat içinde dönüş</Text></View>
        </View>

        <View style={{ flexDirection: "row", gap: 10, marginBottom: 27 }}>
          <StatCard value="10+" label="Yıl deneyim" icon="workspace-premium" />
          <StatCard value="6" label="Uzmanlık alanı" icon="language" />
          <StatCard value="24h" label="Hızlı dönüş" icon="bolt" />
        </View>

        <SectionTitle title="Nasıl yardımcı olalım?" action="Tümünü gör" onPress={() => router.push("/services")} />
        <View style={{ gap: 10, marginBottom: 26 }}>
          {services.map((service) => <Pressable key={service.title} onPress={() => router.push("/services")} style={({ pressed }) => [{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 17, padding: 15, flexDirection: "row", alignItems: "center", gap: 13 }, pressed && { opacity: 0.76 }]}>
            <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: "#FFF7ED", alignItems: "center", justifyContent: "center" }}><MaterialIcons name={service.icon} size={23} color={colors.primary} /></View>
            <View style={{ flex: 1 }}><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "800" }}>{service.title}</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 3 }}>{service.subtitle}</Text></View>
            <MaterialIcons name="chevron-right" size={22} color={colors.muted} />
          </Pressable>)}
        </View>

        <View style={{ backgroundColor: colors.surface, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: colors.border }}>
          <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "800" }}>Sürecimiz basit.</Text>
          <Text style={{ color: colors.muted, fontSize: 13, marginTop: 4, marginBottom: 16 }}>Siz belgenizi paylaşın, gerisini biz halledelim.</Text>
          {[{ n: "01", title: "Belgenizi gönderin", icon: "upload-file" as const }, { n: "02", title: "Net teklif alın", icon: "price-check" as const }, { n: "03", title: "Çevirinizi teslim alın", icon: "task-alt" as const }].map((item, index) => <View key={item.n} style={{ flexDirection: "row", alignItems: "center", marginTop: index ? 14 : 0 }}><View style={{ width: 36, height: 36, borderRadius: 12, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}><MaterialIcons name={item.icon} size={19} color="#fff" /></View><View style={{ marginLeft: 12, flex: 1 }}><Text style={{ color: colors.muted, fontSize: 10, fontWeight: "800" }}>ADIM {item.n}</Text><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "700", marginTop: 2 }}>{item.title}</Text></View>{index < 2 && <MaterialIcons name="arrow-downward" size={16} color={colors.border} />}</View>)}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

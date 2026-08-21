import { Animated, ScrollView, Pressable, Text, View } from "react-native";
import { useRef } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, PrimaryButton, SectionTitle, StatCard, styles } from "@/components/mazzgord-ui";
import { HeroCard } from "@/components/hero-card";
import { useColors } from "@/hooks/use-colors";

const steps = [
  { n: "1", title: "Belgenizi Gönderin", desc: "Belgenizin net fotoğrafını veya taranmış halini WhatsApp veya teklif formu üzerinden iletin.", icon: "upload-file" as const },
  { n: "2", title: "İnceleme ve Teklif", desc: "Belge türünü, dil yönünü, noter ve apostil ihtiyacını inceleyip net fiyat ve teslim süresi veriyorum.", icon: "price-check" as const },
  { n: "3", title: "Onay ve Ödeme", desc: "Teklifi onayladığınızda ödeme bilgileri gönderilir. Online ödeme veya havale seçeneği mevcut.", icon: "payments" as const },
  { n: "4", title: "Çeviri ve Kontrol", desc: "Çeviriyi hazırlayıp isim, tarih, sayı ve kurum adlarını ikinci kez kontrol ediyorum.", icon: "fact-check" as const },
  { n: "5", title: "Teslim", desc: "Çeviri dijital olarak e-posta/WhatsApp ile veya kargo ile adresinize teslim edilir.", icon: "task-alt" as const },
];

const pricing = [
  { title: "Yeminli Tercüme", price: "1.000 TL'den başlayan", note: "Belge türü ve yoğunluğa göre", icon: "verified" as const },
  { title: "Noter Onaylı Tercüme", price: "Tercüme + gerçek noter bedeli", note: "Noter bedeli işlem öncesi teyit edilir", icon: "gavel" as const },
  { title: "Apostil Süreci", price: "350 TL'den başlayan işlem/takip", note: "Devlet apostil bedeli ayrı alınmaz", icon: "public" as const },
  { title: "Acil Teslim", price: "+%30-%50", note: "Aynı gün, kapasiteye bağlı", icon: "bolt" as const },
];

export default function HomeScreen() {
  const colors = useColors();
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <ScreenContainer edges={["top", "left", "right"]}>
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 34 }} onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })} scrollEventThrottle={16}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}>
          <LogoMark />
          <Pressable onPress={() => router.push("/(tabs)/account")} accessibilityRole="button" accessibilityLabel="Hesabım" style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border }}>
            <MaterialIcons name="person-outline" size={22} color={colors.foreground} />
          </Pressable>
        </View>

        <HeroCard scrollY={scrollY} />

        <View style={{ flexDirection: "row", gap: 10, marginBottom: 27 }}>
          <StatCard value="10+" label="Yıl deneyim" icon="workspace-premium" />
          <StatCard value="6" label="Uzmanlık alanı" icon="language" />
          <StatCard value="24h" label="Hızlı dönüş" icon="bolt" />
        </View>

        <SectionTitle title="Nasıl Çalışıyorum?" />
        <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 19, marginBottom: 16 }}>Belgenizi göndermekten teslim almaya kadar beş adımda tamamlanır.</Text>
        <View style={{ gap: 9, marginBottom: 28 }}>
          {steps.map((step) => <View key={step.n} style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 16, padding: 14, flexDirection: "row", gap: 12 }}>
            <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }}><MaterialIcons name={step.icon} size={20} color="#fff" /></View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
                <Text style={{ color: colors.muted, fontSize: 10, fontWeight: "800" }}>ADIM {step.n}</Text>
              </View>
              <Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginTop: 2 }}>{step.title}</Text>
              <Text style={{ color: colors.muted, fontSize: 12, lineHeight: 17, marginTop: 4 }}>{step.desc}</Text>
            </View>
          </View>)}
        </View>

        <SectionTitle title="Başlangıç Fiyatları" />
        <Text style={{ color: colors.muted, fontSize: 12, lineHeight: 18, marginBottom: 14 }}>Belge görülmeden kesin fiyat verilmez. Aşağıdaki başlangıç aralıkları referans amaçlıdır.</Text>
        <View style={{ gap: 9, marginBottom: 18 }}>
          {pricing.map((item) => <View key={item.title} style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 16, padding: 14, flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: "#FFF7ED", alignItems: "center", justifyContent: "center" }}><MaterialIcons name={item.icon} size={20} color={colors.primary} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800" }}>{item.title}</Text>
              <Text style={{ color: colors.primary, fontSize: 13, fontWeight: "700", marginTop: 2 }}>{item.price}</Text>
              <Text style={{ color: colors.muted, fontSize: 11, marginTop: 2 }}>{item.note}</Text>
            </View>
          </View>)}
        </View>
      </Animated.ScrollView>
    </ScreenContainer>
  );
}

import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColors } from "@/hooks/use-colors";
import { HapticTab } from "@/components/haptic-tab";

const ICONS: Record<string, keyof typeof MaterialIcons.glyphMap> = {
  index: "home",
  services: "translate",
  quote: "add-circle",
  track: "timeline",
  account: "person",
};

export default function TabLayout() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const bottom = Platform.OS === "web" ? 10 : Math.max(insets.bottom, 8);
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarButton: HapticTab,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600", marginBottom: 2 },
        tabBarStyle: {
          height: 62 + bottom,
          paddingTop: 7,
          paddingBottom: bottom,
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name={ICONS[route.name] ?? "circle"} size={size + 1} color={color} />
        ),
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Ana Sayfa" }} />
      <Tabs.Screen name="services" options={{ title: "Hizmetler" }} />
      <Tabs.Screen name="quote" options={{ title: "Teklif Al" }} />
      <Tabs.Screen name="track" options={{ title: "Takip" }} />
      <Tabs.Screen name="account" options={{ title: "Hesabım" }} />
    <Tabs.Screen name="offer-detail" options={{ href: null, title: "Teklif Detayı" }} />
    </Tabs>
  );
}

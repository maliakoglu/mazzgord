import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, PrimaryButton, SectionTitle } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";
import { useAuth } from "@/hooks/use-auth";
import { accountApi, type AccountOrders } from "@/lib/api";

import { STATUS_LABELS } from "@/constants/const";

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long" });
  } catch {
    return dateStr;
  }
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function AccountScreen() {
  const colors = useColors();
  const { user, loading, logout } = useAuth();
  const [orders, setOrders] = useState<AccountOrders | null>(null);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setOrdersLoading(true);
    accountApi.orders()
      .then((res) => { if (res.success && res.data) setOrders(res.data); })
      .catch(() => {})
      .finally(() => setOrdersLoading(false));
  }, [user]);

  const activeQuotes = (orders?.quotes || []).filter((q) => !["completed", "delivered", "cancelled"].includes(q.order_status));
  const completedQuotes = (orders?.quotes || []).filter((q) => ["completed", "delivered"].includes(q.order_status));
  const fileCount = (orders?.quotes || []).filter((q) => q.delivered_file_key).length + (orders?.orders || []).filter((o) => o.delivered_file_key).length;

  if (loading) return <ScreenContainer edges={["top", "left", "right"]}>
    <View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}><MaterialIcons name="hourglass-top" size={40} color={colors.muted} /><Text style={{ color: colors.muted, marginTop: 12 }}>Yükleniyor...</Text></View>
  </ScreenContainer>;

  if (!user) return <ScreenContainer edges={["top", "left", "right"]}>
    <View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: 84, height: 84, borderRadius: 42, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border }}><MaterialIcons name="lock" size={38} color={colors.muted} /></View>
      <Text style={{ color: colors.foreground, fontSize: 24, fontWeight: "900", marginTop: 22 }}>Giriş yapın</Text>
      <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 21, textAlign: "center", marginTop: 9, maxWidth: 280 }}>Siparişlerinizi görmek ve takip etmek için giriş yapın.</Text>
      <View style={{ width: "100%", marginTop: 24 }}><PrimaryButton title="Giriş yap" icon="login" onPress={() => router.navigate("/(auth)/login" as any)} /></View>
    </View>
  </ScreenContainer>;

  return <ScreenContainer edges={["top", "left", "right"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 35 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}><LogoMark compact /><Pressable onPress={logout}><MaterialIcons name="logout" size={23} color={colors.foreground} /></Pressable></View>
    <View style={{ backgroundColor: colors.primary, borderRadius: 22, padding: 19, flexDirection: "row", alignItems: "center", marginBottom: 25 }}><View style={{ width: 56, height: 56, borderRadius: 28, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center" }}><Text style={{ color: "#fff", fontSize: 21, fontWeight: "900" }}>{getInitials(user.name || "K")}</Text></View><View style={{ marginLeft: 13, flex: 1 }}><Text style={{ color: "#DBEAFE", fontSize: 11, fontWeight: "700" }}>HOŞ GELDİNİZ</Text><Text style={{ color: "#fff", fontSize: 20, fontWeight: "900", marginTop: 2 }}>{user.name || "Kullanıcı"}</Text><Text style={{ color: "#DBEAFE", fontSize: 12, marginTop: 3 }}>{user.email}</Text></View></View>
    <SectionTitle title="Genel bakış" />
    <View style={{ flexDirection: "row", gap: 10, marginBottom: 25 }}><View style={{ flex: 1, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 16, padding: 15 }}><MaterialIcons name="description" size={21} color={colors.primary} /><Text style={{ color: colors.foreground, fontSize: 23, fontWeight: "900", marginTop: 8 }}>{activeQuotes.length}</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>Aktif talep</Text></View><View style={{ flex: 1, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 16, padding: 15 }}><MaterialIcons name="payments" size={21} color="#16A34A" /><Text style={{ color: colors.foreground, fontSize: 23, fontWeight: "900", marginTop: 8 }}>{completedQuotes.length}</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>Tamamlanan</Text></View><View style={{ flex: 1, backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 16, padding: 15 }}><MaterialIcons name="folder" size={21} color="#2563EB" /><Text style={{ color: colors.foreground, fontSize: 23, fontWeight: "900", marginTop: 8 }}>{fileCount}</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>Dosya</Text></View></View>
    <SectionTitle title="Son siparişler" action={orders ? `${(orders.quotes || []).length} kayıt` : ""} />
    {ordersLoading && <View style={{ alignItems: "center", paddingVertical: 20 }}><Text style={{ color: colors.muted }}>Yükleniyor...</Text></View>}
    {orders && (orders.quotes || []).length === 0 && (orders.orders || []).length === 0 && <View style={{ alignItems: "center", paddingVertical: 30 }}><MaterialIcons name="inbox" size={36} color={colors.muted} /><Text style={{ color: colors.muted, marginTop: 10 }}>Henüz siparişiniz yok.</Text></View>}
    {(orders?.quotes || []).slice(0, 5).map((q) => <Pressable key={q.id} onPress={() => router.navigate({ pathname: "/(tabs)/track" } as any)} style={{ backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 11 }}><View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}><View><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "800" }}>MZ-{String(q.id).padStart(5, "0")}</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>{q.source_language} → {q.target_language} · {formatDate(q.created_at)}</Text></View><Badge>{STATUS_LABELS[q.order_status] || q.order_status}</Badge></View></Pressable>)}
    {(orders?.orders || []).slice(0, 5).map((o) => <Pressable key={o.payment_link_id} onPress={() => router.navigate({ pathname: "/payment", params: { link: o.payment_link_id } } as any)} style={{ backgroundColor: colors.surface, borderRadius: 18, borderWidth: 1, borderColor: colors.border, padding: 16, marginBottom: 11 }}><View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}><View><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "800" }}>{Number(o.total).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺</Text><Text style={{ color: colors.muted, fontSize: 12, marginTop: 4 }}>{formatDate(o.created_at)}</Text></View><Badge tone={o.status === "paid" ? "green" : o.status === "refunded" ? "gray" : "orange"}>{STATUS_LABELS[o.status] || o.status}</Badge></View></Pressable>)}
    <Pressable onPress={() => Linking.openURL("mailto:info@mazzgord.com")} style={{ marginTop: 28, backgroundColor: "#FFF7ED", padding: 16, borderRadius: 17, flexDirection: "row", gap: 11 }}><MaterialIcons name="support-agent" size={22} color={colors.primary} /><View style={{ flex: 1 }}><Text style={{ color: colors.foreground, fontWeight: "800" }}>Bir sorunuz mu var?</Text><Text style={{ color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 3 }}>Uzman ekibimiz size yardımcı olmaya hazır.</Text></View><MaterialIcons name="chevron-right" size={21} color={colors.primary} /></Pressable>
  </ScrollView></ScreenContainer>;
}

import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { LogoMark, PrimaryButton } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";
import { useAuth } from "@/hooks/use-auth";

export default function LoginScreen() {
  const colors = useColors();
  const { login, register, error } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLocalError(null);
    if (!email.trim() || !password.trim()) {
      setLocalError("E-posta ve şifre zorunlu");
      return;
    }
    if (mode === "register" && !name.trim()) {
      setLocalError("Ad soyad zorunlu");
      return;
    }
    setLoading(true);
    let success = false;
    if (mode === "login") {
      success = await login(email.trim(), password);
    } else {
      success = await register({ name: name.trim(), email: email.trim(), password, phone: phone.trim() || undefined });
    }
    setLoading(false);
    if (success) {
      router.replace("/(tabs)/account");
    }
  };

  const errMsg = localError || error;

  return <ScreenContainer edges={["top", "bottom", "left", "right"]}><ScrollView contentContainerStyle={{ padding: 24, paddingTop: 60, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
    <View style={{ alignItems: "center", marginBottom: 36 }}><LogoMark /></View>
    <Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "900", letterSpacing: -0.8 }}>{mode === "login" ? "Tekrar hoş geldiniz" : "Hesap oluşturun"}</Text>
    <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 8, marginBottom: 26 }}>{mode === "login" ? "Siparişlerinizi görüntülemek için giriş yapın." : "Siparişlerinizi takip etmek için kayıt olun."}</Text>
    {mode === "register" && <View style={{ marginBottom: 13 }}><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "800", marginBottom: 8 }}>Ad Soyad</Text><View style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", paddingHorizontal: 13, backgroundColor: colors.surface }}><MaterialIcons name="person-outline" size={19} color={colors.muted} /><TextInput value={name} onChangeText={setName} placeholder="Adınız soyadınız" placeholderTextColor={colors.muted} style={{ flex: 1, marginLeft: 9, color: colors.foreground, fontSize: 14 }} /></View></View>}
    <View style={{ marginBottom: 13 }}><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "800", marginBottom: 8 }}>E-posta</Text><View style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", paddingHorizontal: 13, backgroundColor: colors.surface }}><MaterialIcons name="mail-outline" size={19} color={colors.muted} /><TextInput value={email} onChangeText={setEmail} placeholder="ornek@email.com" placeholderTextColor={colors.muted} keyboardType="email-address" autoCapitalize="none" style={{ flex: 1, marginLeft: 9, color: colors.foreground, fontSize: 14 }} /></View></View>
    <View style={{ marginBottom: 13 }}><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "800", marginBottom: 8 }}>Şifre</Text><View style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", paddingHorizontal: 13, backgroundColor: colors.surface }}><MaterialIcons name="lock-outline" size={19} color={colors.muted} /><TextInput value={password} onChangeText={setPassword} placeholder="••••••••" placeholderTextColor={colors.muted} secureTextEntry style={{ flex: 1, marginLeft: 9, color: colors.foreground, fontSize: 14 }} /></View></View>
    {mode === "register" && <View style={{ marginBottom: 24 }}><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "800", marginBottom: 8 }}>Telefon (opsiyonel)</Text><View style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", paddingHorizontal: 13, backgroundColor: colors.surface }}><MaterialIcons name="phone" size={19} color={colors.muted} /><TextInput value={phone} onChangeText={setPhone} placeholder="+90 5xx xxx xx xx" placeholderTextColor={colors.muted} keyboardType="phone-pad" style={{ flex: 1, marginLeft: 9, color: colors.foreground, fontSize: 14 }} /></View></View>}
    {errMsg && <View style={{ backgroundColor: "#FEF2F2", borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "#FECACA", marginBottom: 16 }}><Text style={{ color: "#991B1B", fontSize: 13, fontWeight: "600" }}>{errMsg}</Text></View>}
    <View style={{ marginTop: mode === "register" ? 0 : 24 }}><PrimaryButton title={loading ? "İşleniyor..." : mode === "login" ? "Giriş yap" : "Kayıt ol"} icon={loading ? "hourglass-top" : "login"} onPress={handleSubmit} disabled={loading} /></View>
    <Pressable onPress={() => { setMode(mode === "login" ? "register" : "login"); setLocalError(null); }} style={{ flexDirection: "row", justifyContent: "center", gap: 5, marginTop: 20 }}><Text style={{ color: colors.muted, fontSize: 14 }}>{mode === "login" ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}</Text><Text style={{ color: colors.primary, fontSize: 14, fontWeight: "800" }}>{mode === "login" ? "Kayıt ol" : "Giriş yap"}</Text></Pressable>
    <Pressable onPress={() => router.replace("/(tabs)")} style={{ flexDirection: "row", justifyContent: "center", marginTop: 14 }}><Text style={{ color: colors.muted, fontSize: 13 }}>Daha sonra · Ana sayfaya dön</Text></Pressable>
  </ScrollView></ScreenContainer>;
}

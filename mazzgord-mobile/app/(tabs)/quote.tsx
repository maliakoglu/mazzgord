import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, PrimaryButton } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";
import { quoteApi, uploadApi, authApi } from "@/lib/api";
import { useAuth } from "@/hooks/use-auth";
import * as DocumentPicker from "expo-document-picker";

const DOC_TYPES = ["Pasaport / Kimlik", "Diploma / Transkript", "Sözleşme / Hukuki Belge", "Vize Belgesi", "Diğer"];
const SERVICE_TYPES = ["Yeminli tercüme", "Profesyonel çeviri", "Noter tasdikli çeviri"];
const URGENCY = [
  { label: "Standart · 3–5 iş günü", value: "standart" },
  { label: "Hızlı · 1–2 iş günü", value: "hizli" },
  { label: "Acil · 24 saat", value: "acil" },
];
const LANGUAGES = ["Türkçe", "İngilizce", "Almanca", "Fransızca", "İspanyolca", "İtalyanca", "Rusça", "Arapça", "Çince", "Japonca", "Farsça", "Kürtçe", "Diğer"];

export default function QuoteScreen() {
  const colors = useColors();
  const { user, isAuthenticated, login, register, error: authErrorFromHook } = useAuth();
  const [step, setStep] = useState(1);
  const [doc, setDoc] = useState("");
  const [service, setService] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [urgency, setUrgency] = useState("standart");
  const [uploadedFile, setUploadedFile] = useState<{ name: string; uri: string; type: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [fileKey, setFileKey] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showAuthBarrier, setShowAuthBarrier] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [authName, setAuthName] = useState("");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authPhone, setAuthPhone] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [orderNo, setOrderNo] = useState<string | null>(null);

  const pickDocument = async () => {
    if (uploading) return;
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "image/jpeg", "image/png", "image/webp"],
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets || result.assets.length === 0) return;
      const asset = result.assets[0];
      setUploading(true);
      setError(null);
      const res = await uploadApi.upload({ uri: asset.uri, name: asset.name, type: asset.mimeType || "application/octet-stream", file: (asset as any).file }, name || "Mobil-Kullanici");
      if (res.success && res.file_key) {
        setFileKey(res.file_key);
        setUploadedFile({ name: asset.name, uri: asset.uri, type: asset.mimeType || "application/octet-stream" });
      } else {
        setError(res.error || "Dosya yuklenemedi");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Dosya yuklenemedi");
    } finally {
      setUploading(false);
    }
  };

  const submitQuote = async () => {
    setError(null);
    if (!name.trim() || !email.trim()) { setError("Ad ve e-posta zorunlu"); return; }
    if (!sourceLang || !targetLang) { setError("Kaynak ve hedef dil zorunlu"); return; }
    if (!isAuthenticated) { setShowAuthBarrier(true); return; }
    setSubmitting(true);
    try {
      const res = await quoteApi.create({
        file_key: fileKey || undefined,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        source_language: sourceLang,
        target_language: targetLang,
        document_type: doc || undefined,
        page_count: pageCount ? parseInt(pageCount, 10) : undefined,
        service_type: service || undefined,
        urgency,
        delivery_method: "digital",
      });
      if (res.success && res.order_no) {
        setOrderNo(res.order_no);
      } else {
        setError(res.error || "Teklif gönderilemedi");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Teklif gönderilemedi");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAuthSubmit = async () => {
    setAuthError(null);
    if (!authEmail.trim() || !authPassword.trim()) { setAuthError("E-posta ve sifre zorunlu"); return; }
    if (authMode === "register" && !authName.trim()) { setAuthError("Ad soyad zorunlu"); return; }
    setAuthLoading(true);
    try {
      let result;
      if (authMode === "login") {
        result = await authApi.login({ email: authEmail.trim(), password: authPassword });
      } else {
        result = await authApi.register({ name: authName.trim(), email: authEmail.trim(), password: authPassword, phone: authPhone.trim() || undefined });
      }
      if (result.success && result.token && result.customer) {
        const { setToken } = await import("@/lib/api");
        await setToken(result.token);
        setAuthLoading(false);
        await handleAuthSuccess();
      } else {
        setAuthLoading(false);
        setAuthError(result.error || "Islem basarisiz");
      }
    } catch (err) {
      setAuthLoading(false);
      setAuthError(err instanceof Error ? err.message : "Baglanti hatasi");
    }
  };

  const handleAuthSuccess = async () => {
    setShowAuthBarrier(false);
    setSubmitting(true);
    try {
      const res = await quoteApi.create({
        file_key: fileKey || undefined,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        source_language: sourceLang,
        target_language: targetLang,
        document_type: doc || undefined,
        page_count: pageCount ? parseInt(pageCount, 10) : undefined,
        service_type: service || undefined,
        urgency,
        delivery_method: "digital",
      });
      if (res.success && res.order_no) {
        setOrderNo(res.order_no);
      } else {
        setError(res.error || "Teklif gönderilemedi");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Teklif gönderilemedi");
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => {
    if (step === 2 && sourceLang && targetLang && sourceLang === targetLang) {
      setError("Kaynak ve hedef dil aynı olamaz");
      return;
    }
    setError(null);
    if (step < 4) setStep(step + 1);
  };
  const back = () => { if (step > 1) setStep(step - 1); };

  if (orderNo) return <ScreenContainer edges={["top", "bottom", "left", "right"]}><View style={{ flex: 1, padding: 25, justifyContent: "center", alignItems: "center" }}><View style={{ width: 86, height: 86, borderRadius: 43, backgroundColor: "#DCFCE7", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><MaterialIcons name="check" size={46} color="#16A34A" /></View><Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "900", textAlign: "center" }}>Talebiniz alındı.</Text><Text style={{ color: colors.muted, fontSize: 15, lineHeight: 22, textAlign: "center", marginTop: 10 }}>Uzman ekibimiz belgenizi inceleyip en kısa sürede size dönüş yapacak.</Text><View style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 18, padding: 18, width: "100%", marginTop: 27, alignItems: "center" }}><Text style={{ color: colors.muted, fontSize: 12 }}>BAŞVURU NUMARANIZ</Text><Text style={{ color: colors.primary, fontSize: 24, fontWeight: "900", letterSpacing: 1.5, marginTop: 5 }}>{orderNo}</Text></View><View style={{ width: "100%", marginTop: 18 }}><PrimaryButton title="Başvuruyu takip et" icon="timeline" onPress={() => router.push("/(tabs)/track")} /></View><Pressable onPress={() => { setOrderNo(null); setStep(1); }} style={{ padding: 18 }}><Text style={{ color: colors.muted, fontWeight: "700" }}>Yeni teklif oluştur</Text></Pressable></View></ScreenContainer>;

  return <ScreenContainer edges={["top", "left", "right"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 30 }}>
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 25 }}><LogoMark compact /><Badge>ADIM {step} / 4</Badge></View>
    <Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "900", letterSpacing: -0.8 }}>{step === 1 ? "Belgenizi tanıyalım." : step === 2 ? "Dil ve hizmet seçin." : step === 3 ? "Teslimat tercihiniz." : "İletişim bilgileriniz."}</Text>
    <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 8 }}>{step === 1 ? "Belgenizin türünü seçin." : step === 2 ? "Çeviri dillerini ve hizmet türünü belirleyin." : step === 3 ? "İşlem hızını seçin ve belgenizi yükleyin." : "Size ulaşmak için iletişim bilgilerinizi bırakın."}</Text>
    <View style={{ flexDirection: "row", gap: 6, marginTop: 23, marginBottom: 27 }}>{[1, 2, 3, 4].map((item) => <View key={item} style={{ flex: 1, height: 5, borderRadius: 4, backgroundColor: item <= step ? colors.primary : colors.border }} />)}</View>
    {step === 1 && <><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 11 }}>Belge türü</Text><View style={{ gap: 10 }}>{DOC_TYPES.map((item, index) => <Pressable key={item} onPress={() => setDoc(item)} style={{ borderWidth: 1, borderColor: doc === item ? colors.primary : colors.border, backgroundColor: doc === item ? "#FFF7ED" : colors.surface, padding: 16, borderRadius: 15, flexDirection: "row", alignItems: "center" }}><View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: doc === item ? colors.primary : "#EFF6FF", alignItems: "center", justifyContent: "center", marginRight: 11 }}><MaterialIcons name={index === 0 ? "badge" : index === 1 ? "school" : index === 2 ? "description" : index === 3 ? "flight" : "folder-open"} size={18} color={doc === item ? "#fff" : "#2563EB"} /></View><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "700", flex: 1 }}>{item}</Text>{doc === item && <MaterialIcons name="check-circle" size={21} color={colors.primary} />}</Pressable>)}</View></>}
    {step === 2 && <><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 8 }}>Kaynak dil</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }} contentContainerStyle={{ gap: 8, paddingRight: 20 }}>{LANGUAGES.map((lang) => <Pressable key={lang} onPress={() => setSourceLang(lang)} style={{ paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: sourceLang === lang ? colors.primary : colors.border, backgroundColor: sourceLang === lang ? "#FFF7ED" : colors.surface }}><Text style={{ color: sourceLang === lang ? colors.primary : colors.foreground, fontSize: 13, fontWeight: "700" }}>{lang}</Text></Pressable>)}</ScrollView><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 8 }}>Hedef dil</Text><ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 14 }} contentContainerStyle={{ gap: 8, paddingRight: 20 }}>{LANGUAGES.map((lang) => <Pressable key={lang} onPress={() => setTargetLang(lang)} style={{ paddingVertical: 10, paddingHorizontal: 16, borderRadius: 14, borderWidth: 1, borderColor: targetLang === lang ? colors.primary : colors.border, backgroundColor: targetLang === lang ? "#FFF7ED" : colors.surface }}><Text style={{ color: targetLang === lang ? colors.primary : colors.foreground, fontSize: 13, fontWeight: "700" }}>{lang}</Text></Pressable>)}</ScrollView><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 11 }}>Hizmet türü</Text><View style={{ gap: 10 }}>{SERVICE_TYPES.map((item) => <Pressable key={item} onPress={() => setService(item)} style={{ borderWidth: 1, borderColor: service === item ? colors.primary : colors.border, backgroundColor: service === item ? "#FFF7ED" : colors.surface, padding: 17, borderRadius: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "700" }}>{item}</Text>{service === item ? <MaterialIcons name="radio-button-checked" size={22} color={colors.primary} /> : <MaterialIcons name="radio-button-unchecked" size={22} color={colors.border} />}</Pressable>)}</View><Text style={{ color: colors.muted, fontSize: 12, marginTop: 22, marginBottom: 8 }}>Yaklaşık sayfa sayısı (opsiyonel)</Text><TextInput value={pageCount} onChangeText={setPageCount} placeholder="Örn. 4" placeholderTextColor={colors.muted} keyboardType="number-pad" style={{ height: 51, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 15, color: colors.foreground }} /></>}

    {step === 3 && <><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 11 }}>İşlem hızı</Text><View style={{ gap: 10 }}>{URGENCY.map((item) => <Pressable key={item.value} onPress={() => setUrgency(item.value)} style={{ borderWidth: 1, borderColor: urgency === item.value ? colors.primary : colors.border, backgroundColor: urgency === item.value ? "#FFF7ED" : colors.surface, padding: 17, borderRadius: 15, flexDirection: "row", justifyContent: "space-between" }}><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "700" }}>{item.label}</Text>{urgency === item.value && <MaterialIcons name="check-circle" size={21} color={colors.primary} />}</Pressable>)}</View><Pressable onPress={pickDocument} disabled={uploading} style={{ marginTop: 26, padding: 20, borderRadius: 17, borderWidth: 1.5, borderStyle: "dashed", borderColor: uploadedFile ? "#16A34A" : colors.primary, backgroundColor: uploadedFile ? "#F0FDF4" : "#FFF7ED", alignItems: "center" }}><MaterialIcons name={uploading ? "hourglass-top" : uploadedFile ? "check-circle" : "cloud-upload"} size={30} color={uploading ? colors.muted : uploadedFile ? "#16A34A" : colors.primary} /><Text style={{ color: uploadedFile ? "#15803D" : colors.foreground, fontWeight: "800", marginTop: 8 }}>{uploading ? "Yükleniyor..." : uploadedFile ? uploadedFile.name : "Belgenizi yükleyin"}</Text><Text style={{ color: colors.muted, fontSize: 11, marginTop: 4 }}>{uploadedFile ? "Değiştirmek için dokunun" : "PDF, DOC, JPG veya PNG · Maks. 10 MB"}</Text></Pressable></>}
    {step === 4 && <><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 11 }}>İletişim bilgileriniz</Text><TextInput value={name} onChangeText={setName} placeholder="Ad soyad" placeholderTextColor={colors.muted} style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 15, color: colors.foreground, marginBottom: 11 }} /><TextInput value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="E-posta adresi" placeholderTextColor={colors.muted} autoCapitalize="none" style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 15, color: colors.foreground, marginBottom: 11 }} /><TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Telefon (opsiyonel)" placeholderTextColor={colors.muted} style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 15, color: colors.foreground, marginBottom: 16 }} /><View style={{ backgroundColor: "#EFF6FF", padding: 15, borderRadius: 15, flexDirection: "row", gap: 10 }}><MaterialIcons name="lock-outline" size={20} color="#2563EB" /><Text style={{ color: "#1E40AF", flex: 1, fontSize: 12, lineHeight: 18 }}>Bilgileriniz yalnızca teklifinizi hazırlamak için kullanılır.</Text></View></>}
    {error && <View style={{ backgroundColor: "#FEF2F2", borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "#FECACA", marginTop: 16 }}><Text style={{ color: "#991B1B", fontSize: 13, fontWeight: "600" }}>{error}</Text></View>}
    <View style={{ marginTop: 30 }}>{step < 4 ? <PrimaryButton title="Devam et" icon="arrow-forward" onPress={next} /> : <PrimaryButton title={submitting ? "Gönderiliyor..." : "Teklifimi gönder"} icon="send" onPress={submitQuote} disabled={submitting} />}</View>
    {step > 1 && <Pressable onPress={() => { setStep(step - 1); setError(null); }} style={{ alignItems: "center", padding: 17 }}><Text style={{ color: colors.muted, fontWeight: "700" }}>Geri dön</Text></Pressable>}
  </ScrollView>
      <Modal visible={showAuthBarrier} animationType="slide" transparent onRequestClose={() => setShowAuthBarrier(false)}>
        <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <View style={{ backgroundColor: colors.background, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40, maxHeight: "85%" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <Text style={{ color: colors.foreground, fontSize: 22, fontWeight: "900" }}>{authMode === "login" ? "Giris yapin" : "Hesap olusturun"}</Text>
              <Pressable onPress={() => setShowAuthBarrier(false)} hitSlop={8}><MaterialIcons name="close" size={24} color={colors.muted} /></Pressable>
            </View>
            <Text style={{ color: colors.muted, fontSize: 13, lineHeight: 19, marginBottom: 20 }}>Teklifinizi gonderebilmek ve takip edebilmek icin giris yapmaniz gerekli.</Text>
            {authMode === "register" && <View style={{ marginBottom: 13 }}><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "800", marginBottom: 8 }}>Ad Soyad</Text><View style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", paddingHorizontal: 13, backgroundColor: colors.surface }}><MaterialIcons name="person-outline" size={19} color={colors.muted} /><TextInput value={authName} onChangeText={setAuthName} placeholder="Adiniz soyadiniz" placeholderTextColor={colors.muted} style={{ flex: 1, marginLeft: 9, color: colors.foreground, fontSize: 14 }} /></View></View>}
            <View style={{ marginBottom: 13 }}><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "800", marginBottom: 8 }}>E-posta</Text><View style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", paddingHorizontal: 13, backgroundColor: colors.surface }}><MaterialIcons name="mail-outline" size={19} color={colors.muted} /><TextInput value={authEmail} onChangeText={setAuthEmail} placeholder="ornek@email.com" placeholderTextColor={colors.muted} keyboardType="email-address" autoCapitalize="none" style={{ flex: 1, marginLeft: 9, color: colors.foreground, fontSize: 14 }} /></View></View>
            <View style={{ marginBottom: 13 }}><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "800", marginBottom: 8 }}>Sifre</Text><View style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", paddingHorizontal: 13, backgroundColor: colors.surface }}><MaterialIcons name="lock-outline" size={19} color={colors.muted} /><TextInput value={authPassword} onChangeText={setAuthPassword} placeholder="********" placeholderTextColor={colors.muted} secureTextEntry style={{ flex: 1, marginLeft: 9, color: colors.foreground, fontSize: 14 }} /></View></View>
            {authMode === "register" && <View style={{ marginBottom: 13 }}><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "800", marginBottom: 8 }}>Telefon (opsiyonel)</Text><View style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, flexDirection: "row", alignItems: "center", paddingHorizontal: 13, backgroundColor: colors.surface }}><MaterialIcons name="phone" size={19} color={colors.muted} /><TextInput value={authPhone} onChangeText={setAuthPhone} placeholder="+90 5xx xxx xx xx" placeholderTextColor={colors.muted} keyboardType="phone-pad" style={{ flex: 1, marginLeft: 9, color: colors.foreground, fontSize: 14 }} /></View></View>}
            {authError && <View style={{ backgroundColor: "#FEF2F2", borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "#FECACA", marginBottom: 16 }}><Text style={{ color: "#991B1B", fontSize: 13, fontWeight: "600" }}>{authError}</Text></View>}
            <View style={{ marginTop: 4 }}><PrimaryButton title={authLoading ? "Isleniyor..." : authMode === "login" ? "Giris yap & Teklif gonder" : "Kayit ol & Teklif gonder"} icon={authLoading ? "hourglass-top" : "send"} onPress={handleAuthSubmit} disabled={authLoading} /></View>
            <Pressable onPress={() => { setAuthMode(authMode === "login" ? "register" : "login"); setAuthError(null); }} style={{ flexDirection: "row", justifyContent: "center", gap: 5, marginTop: 18 }}><Text style={{ color: colors.muted, fontSize: 14 }}>{authMode === "login" ? "Hesabiniz yok mu?" : "Zaten hesabiniz var mi?"}</Text><Text style={{ color: colors.primary, fontSize: 14, fontWeight: "800" }}>{authMode === "login" ? "Kayit ol" : "Giris yap"}</Text></Pressable>
          </View>
        </View>
      </Modal>
    </ScreenContainer>;
}

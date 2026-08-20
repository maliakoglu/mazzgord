import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, PrimaryButton } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";
import { quoteApi } from "@/lib/api";

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
  const [step, setStep] = useState(1);
  const [doc, setDoc] = useState("");
  const [service, setService] = useState("");
  const [sourceLang, setSourceLang] = useState("");
  const [targetLang, setTargetLang] = useState("");
  const [urgency, setUrgency] = useState("standart");
  const [uploaded, setUploaded] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pageCount, setPageCount] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNo, setOrderNo] = useState<string | null>(null);

  const sendCode = async () => {
    setError(null);
    if (!email.trim()) { setError("E-posta adresi zorunlu"); return; }
    setSendingCode(true);
    try {
      const res = await quoteApi.sendCode(email.trim());
      if (res.success) { setCodeSent(true); }
      else { setError(res.error || "Kod gönderilemedi"); }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kod gönderilemedi");
    } finally {
      setSendingCode(false);
    }
  };

  const submitQuote = async () => {
    setError(null);
    if (!name.trim() || !email.trim()) { setError("Ad ve e-posta zorunlu"); return; }
    if (!sourceLang || !targetLang) { setError("Kaynak ve hedef dil zorunlu"); return; }
    if (!codeSent || !verifyCode.trim()) { setError("E-posta doğrulama kodu gerekli"); return; }
    setSubmitting(true);
    try {
      const verifyRes = await quoteApi.verifyCode(email.trim(), verifyCode.trim());
      if (!verifyRes.success) { setError(verifyRes.error || "Doğrulama kodu hatalı"); setSubmitting(false); return; }
      const res = await quoteApi.create({
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

  const next = () => { if (step < 5) setStep(step + 1); };

  if (orderNo) return <ScreenContainer edges={["top", "bottom", "left", "right"]}><View style={{ flex: 1, padding: 25, justifyContent: "center", alignItems: "center" }}><View style={{ width: 86, height: 86, borderRadius: 43, backgroundColor: "#DCFCE7", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><MaterialIcons name="check" size={46} color="#16A34A" /></View><Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "900", textAlign: "center" }}>Talebiniz alındı.</Text><Text style={{ color: colors.muted, fontSize: 15, lineHeight: 22, textAlign: "center", marginTop: 10 }}>Uzman ekibimiz belgenizi inceleyip en kısa sürede size dönüş yapacak.</Text><View style={{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 18, padding: 18, width: "100%", marginTop: 27, alignItems: "center" }}><Text style={{ color: colors.muted, fontSize: 12 }}>BAŞVURU NUMARANIZ</Text><Text style={{ color: colors.primary, fontSize: 24, fontWeight: "900", letterSpacing: 1.5, marginTop: 5 }}>{orderNo}</Text></View><View style={{ width: "100%", marginTop: 18 }}><PrimaryButton title="Başvuruyu takip et" icon="timeline" onPress={() => router.push("/(tabs)/track")} /></View><Pressable onPress={() => { setOrderNo(null); setStep(1); setCodeSent(false); setVerifyCode(""); }} style={{ padding: 18 }}><Text style={{ color: colors.muted, fontWeight: "700" }}>Yeni teklif oluştur</Text></Pressable></View></ScreenContainer>;

  return <ScreenContainer edges={["top", "left", "right"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 30 }}>
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 25 }}><LogoMark compact /><Badge>ADIM {step} / 5</Badge></View>
    <Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "900", letterSpacing: -0.8 }}>{step === 1 ? "Belgenizi tanıyalım." : step === 2 ? "Dil ve hizmet seçin." : step === 3 ? "Teslimat tercihiniz." : step === 4 ? "İletişim bilgileriniz." : "E-posta doğrulaması"}</Text>
    <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 8 }}>{step === 1 ? "Belgenizin türünü seçin." : step === 2 ? "Çeviri dillerini ve hizmet türünü belirleyin." : step === 3 ? "İşlem hızını seçin ve belgenizi yükleyin." : step === 4 ? "Size ulaşmak için iletişim bilgilerinizi bırakın." : "E-postanıza gönderilen kodu girin."}</Text>
    <View style={{ flexDirection: "row", gap: 6, marginTop: 23, marginBottom: 27 }}>{[1, 2, 3, 4, 5].map((item) => <View key={item} style={{ flex: 1, height: 5, borderRadius: 4, backgroundColor: item <= step ? colors.primary : colors.border }} />)}</View>
    {step === 1 && <><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 11 }}>Belge türü</Text><View style={{ gap: 10 }}>{DOC_TYPES.map((item, index) => <Pressable key={item} onPress={() => setDoc(item)} style={{ borderWidth: 1, borderColor: doc === item ? colors.primary : colors.border, backgroundColor: doc === item ? "#FFF7ED" : colors.surface, padding: 16, borderRadius: 15, flexDirection: "row", alignItems: "center" }}><View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: doc === item ? colors.primary : "#EFF6FF", alignItems: "center", justifyContent: "center", marginRight: 11 }}><MaterialIcons name={index === 0 ? "badge" : index === 1 ? "school" : index === 2 ? "description" : index === 3 ? "flight" : "folder-open"} size={18} color={doc === item ? "#fff" : "#2563EB"} /></View><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "700", flex: 1 }}>{item}</Text>{doc === item && <MaterialIcons name="check-circle" size={21} color={colors.primary} />}</Pressable>)}</View></>}
    {step === 2 && <><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 8 }}>Kaynak dil</Text><View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.surface, marginBottom: 14, paddingHorizontal: 13, height: 52, justifyContent: "center" }}><TextInput value={sourceLang} onChangeText={setSourceLang} placeholder="Örn. Türkçe" placeholderTextColor={colors.muted} style={{ color: colors.foreground, fontSize: 14 }} /></View><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 8 }}>Hedef dil</Text><View style={{ borderWidth: 1, borderColor: colors.border, borderRadius: 14, backgroundColor: colors.surface, marginBottom: 14, paddingHorizontal: 13, height: 52, justifyContent: "center" }}><TextInput value={targetLang} onChangeText={setTargetLang} placeholder="Örn. İngilizce" placeholderTextColor={colors.muted} style={{ color: colors.foreground, fontSize: 14 }} /></View><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 11 }}>Hizmet türü</Text><View style={{ gap: 10 }}>{SERVICE_TYPES.map((item) => <Pressable key={item} onPress={() => setService(item)} style={{ borderWidth: 1, borderColor: service === item ? colors.primary : colors.border, backgroundColor: service === item ? "#FFF7ED" : colors.surface, padding: 17, borderRadius: 15, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "700" }}>{item}</Text>{service === item ? <MaterialIcons name="radio-button-checked" size={22} color={colors.primary} /> : <MaterialIcons name="radio-button-unchecked" size={22} color={colors.border} />}</Pressable>)}</View><Text style={{ color: colors.muted, fontSize: 12, marginTop: 22, marginBottom: 8 }}>Yaklaşık sayfa sayısı (opsiyonel)</Text><TextInput value={pageCount} onChangeText={setPageCount} placeholder="Örn. 4" placeholderTextColor={colors.muted} keyboardType="number-pad" style={{ height: 51, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 15, color: colors.foreground }} /></>}

    {step === 3 && <><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 11 }}>İşlem hızı</Text><View style={{ gap: 10 }}>{URGENCY.map((item) => <Pressable key={item.value} onPress={() => setUrgency(item.value)} style={{ borderWidth: 1, borderColor: urgency === item.value ? colors.primary : colors.border, backgroundColor: urgency === item.value ? "#FFF7ED" : colors.surface, padding: 17, borderRadius: 15, flexDirection: "row", justifyContent: "space-between" }}><Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "700" }}>{item.label}</Text>{urgency === item.value && <MaterialIcons name="check-circle" size={21} color={colors.primary} />}</Pressable>)}</View><Pressable onPress={() => setUploaded(!uploaded)} style={{ marginTop: 26, padding: 20, borderRadius: 17, borderWidth: 1.5, borderStyle: "dashed", borderColor: uploaded ? "#16A34A" : colors.primary, backgroundColor: uploaded ? "#F0FDF4" : "#FFF7ED", alignItems: "center" }}><MaterialIcons name={uploaded ? "check-circle" : "cloud-upload"} size={30} color={uploaded ? "#16A34A" : colors.primary} /><Text style={{ color: uploaded ? "#15803D" : colors.foreground, fontWeight: "800", marginTop: 8 }}>{uploaded ? "belge.pdf yüklendi" : "Belgenizi yükleyin"}</Text><Text style={{ color: colors.muted, fontSize: 11, marginTop: 4 }}>{uploaded ? "Dosyayı değiştirmek için dokunun" : "PDF, JPG veya PNG · Maks. 10 MB"}</Text></Pressable></>}
    {step === 4 && <><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 11 }}>İletişim bilgileriniz</Text><TextInput value={name} onChangeText={setName} placeholder="Ad soyad" placeholderTextColor={colors.muted} style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 15, color: colors.foreground, marginBottom: 11 }} /><TextInput value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="E-posta adresi" placeholderTextColor={colors.muted} autoCapitalize="none" style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 15, color: colors.foreground, marginBottom: 11 }} /><TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Telefon (opsiyonel)" placeholderTextColor={colors.muted} style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 15, color: colors.foreground, marginBottom: 16 }} /><View style={{ backgroundColor: "#EFF6FF", padding: 15, borderRadius: 15, flexDirection: "row", gap: 10 }}><MaterialIcons name="lock-outline" size={20} color="#2563EB" /><Text style={{ color: "#1E40AF", flex: 1, fontSize: 12, lineHeight: 18 }}>Bilgileriniz yalnızca teklifinizi hazırlamak için kullanılır.</Text></View></>}
    {step === 5 && <><Text style={{ color: colors.foreground, fontSize: 14, fontWeight: "800", marginBottom: 11 }}>E-posta doğrulaması</Text><Text style={{ color: colors.muted, fontSize: 13, lineHeight: 19, marginBottom: 16 }}>{email} adresine 6 haneli bir kod gönderdik. Kodu aşağıya girin.</Text>{!codeSent ? <PrimaryButton title={sendingCode ? "Gönderiliyor..." : "Doğrulama kodu gönder"} icon="mail" onPress={sendCode} disabled={sendingCode} /> : <><TextInput value={verifyCode} onChangeText={setVerifyCode} placeholder="6 haneli kod" placeholderTextColor={colors.muted} keyboardType="number-pad" maxLength={6} style={{ height: 52, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 15, color: colors.foreground, fontSize: 18, fontWeight: "800", textAlign: "center", letterSpacing: 4 }} /><Pressable onPress={sendCode} style={{ alignItems: "center", padding: 14 }}><Text style={{ color: colors.primary, fontSize: 13, fontWeight: "700" }}>Kodu tekrar gönder</Text></Pressable></>}</>}
    {error && <View style={{ backgroundColor: "#FEF2F2", borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "#FECACA", marginTop: 16 }}><Text style={{ color: "#991B1B", fontSize: 13, fontWeight: "600" }}>{error}</Text></View>}
    <View style={{ marginTop: 30 }}>{step < 5 ? <PrimaryButton title="Devam et" icon="arrow-forward" onPress={next} /> : <PrimaryButton title={submitting ? "Gönderiliyor..." : "Teklifimi gönder"} icon="send" onPress={submitQuote} disabled={submitting} />}</View>
    {step > 1 && <Pressable onPress={() => { setStep(step - 1); setError(null); }} style={{ alignItems: "center", padding: 17 }}><Text style={{ color: colors.muted, fontWeight: "700" }}>Geri dön</Text></Pressable>}
  </ScrollView></ScreenContainer>;
}

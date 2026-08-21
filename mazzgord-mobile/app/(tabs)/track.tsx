import { useCallback, useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useFocusEffect } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, PrimaryButton } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";
import { useAuth } from "@/hooks/use-auth";
import { accountApi, quoteApi, reviewApi, getToken, type QuoteRecord } from "@/lib/api";

const STAGES = [
  { key: 0, title: "Teklif", icon: "request-quote" as const, desc: "Talebiniz alindi, inceleniyor" },
  { key: 1, title: "Belge", icon: "upload-file" as const, desc: "Belgeniz incelendi" },
  { key: 2, title: "Kabul", icon: "check-circle" as const, desc: "Teklifi onaylayin" },
  { key: 3, title: "Ödeme", icon: "payments" as const, desc: "Ödemenizi tamamlayin" },
  { key: 4, title: "Çeviri", icon: "edit" as const, desc: "Çeviri süreci devam ediyor" },
  { key: 5, title: "Teslim", icon: "local-shipping" as const, desc: "Dosyaniz hazir" },
];

function getStage(quote: QuoteRecord): number {
  const os = quote.order_status;
  const ofs = quote.offer_status;
  if (os === "delivered") return 5;
  if (os === "completed" || os === "in_progress") return 4;
  if (os === "paid") return 4;
  if (os === "payment_pending") return 3;
  if (ofs === "accepted") return 2;
  if (quote.file_key || quote.document_uploaded_at) return 1;
  if (ofs === "offered") return 1;
  return 0;
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
  const { user, loading: authLoading, isAuthenticated } = useAuth();
  const [quotes, setQuotes] = useState<QuoteRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [reviewModal, setReviewModal] = useState<QuoteRecord | null>(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const res = await accountApi.orders();
      if (res.success && res.data) {
        setQuotes(res.data.quotes || []);
      }
    } catch {
      setError("Siparisler yuklenemedi");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(useCallback(() => {
    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated, fetchOrders]));

  const handleAccept = async (quoteId: number) => {
    setActionLoading(quoteId);
    try {
      const res = await quoteApi.accept(quoteId);
      if (res.success) {
        await fetchOrders();
      } else {
        setError(res.error || "Kabul basarisiz");
      }
    } catch {
      setError("Islem basarisiz");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (quoteId: number) => {
    setActionLoading(quoteId);
    try {
      const res = await quoteApi.reject(quoteId);
      if (res.success) {
        await fetchOrders();
      } else {
        setError(res.error || "Red basarisiz");
      }
    } catch {
      setError("Islem basarisiz");
    } finally {
      setActionLoading(null);
    }
  };

  const handlePay = (quote: QuoteRecord) => {
    if (quote.payment_link_id) {
      router.push({ pathname: "/payment", params: { link: quote.payment_link_id, quote_id: String(quote.id) } });
    }
  };

  const handleDownload = async (quote: QuoteRecord) => {
    if (!quote.delivered_file_key) return;
    const token = await getToken();
    const url = `https://mazzgord.com/api/account/files/${encodeURIComponent(quote.delivered_file_key)}?token=${encodeURIComponent(token || "")}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        setError("Dosya acilamiyor. Tarayicinizi kontrol edin.");
      }
    } catch {
      setError("Dosya indirilemedi. Tekrar deneyin.");
    }
  };

  const handleReviewSubmit = async () => {
    if (!reviewModal) return;
    setReviewError(null);
    if (!reviewRating || reviewRating < 1 || reviewRating > 5) {
      setReviewError("Lutfen 1-5 arasi puan verin");
      return;
    }
    setReviewLoading(true);
    try {
      const res = await reviewApi.submit(reviewModal.id, reviewRating, reviewComment.trim() || undefined);
      if (res.success) {
        setReviewModal(null);
        setReviewRating(0);
        setReviewComment("");
        await fetchOrders();
      } else {
        setReviewError(res.error || "Degerlendirme gonderilemedi");
      }
    } catch {
      setReviewError("Sunucu hatasi");
    } finally {
      setReviewLoading(false);
    }
  };

  // Auth loading
  if (authLoading) return <ScreenContainer edges={["top", "left", "right"]}>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MaterialIcons name="hourglass-top" size={40} color={colors.muted} />
      <Text style={{ color: colors.muted, marginTop: 12 }}>Yukleniyor...</Text>
    </View>
  </ScreenContainer>;

  // Not logged in
  if (!isAuthenticated) return <ScreenContainer edges={["top", "left", "right"]}>
    <View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}>
      <View style={{ width: 84, height: 84, borderRadius: 42, backgroundColor: colors.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border }}><MaterialIcons name="lock" size={38} color={colors.muted} /></View>
      <Text style={{ color: colors.foreground, fontSize: 24, fontWeight: "900", marginTop: 22 }}>Giris yapin</Text>
      <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 21, textAlign: "center", marginTop: 9, maxWidth: 280 }}>Siparislerinizi takip etmek icin giris yapin.</Text>
      <View style={{ width: "100%", marginTop: 24 }}><PrimaryButton title="Giris yap" icon="login" onPress={() => router.navigate("/(auth)/login" as any)} /></View>
    </View>
  </ScreenContainer>;

  return <ScreenContainer edges={["top", "left", "right"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 34 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 26 }}><LogoMark compact /><Badge tone="blue">SIPARIS TAKIBI</Badge></View>
    <Text style={{ color: colors.foreground, fontSize: 29, fontWeight: "900", letterSpacing: -0.8 }}>Siparisleriniz</Text>
    <Text style={{ color: colors.muted, fontSize: 14, lineHeight: 20, marginTop: 9, marginBottom: 22 }}>Tum siparislerinizi canli takip edin.</Text>

    {loading && <View style={{ alignItems: "center", paddingVertical: 40 }}><MaterialIcons name="hourglass-top" size={36} color={colors.muted} /><Text style={{ color: colors.muted, marginTop: 10 }}>Yukleniyor...</Text></View>}

    {error && <View style={{ backgroundColor: "#FEF2F2", borderRadius: 16, padding: 18, borderWidth: 1, borderColor: "#FECACA", alignItems: "center", marginBottom: 16 }}><MaterialIcons name="error-outline" size={32} color="#EF4444" /><Text style={{ color: "#991B1B", fontSize: 14, fontWeight: "700", marginTop: 8 }}>{error}</Text><Pressable onPress={fetchOrders} style={{ marginTop: 12 }}><Text style={{ color: colors.primary, fontWeight: "700" }}>Tekrar dene</Text></Pressable></View>}

    {!loading && !error && quotes.length === 0 && <View style={{ alignItems: "center", paddingVertical: 60 }}><MaterialIcons name="inbox" size={48} color={colors.muted} /><Text style={{ color: colors.muted, fontSize: 15, marginTop: 14 }}>Henuz siparisiniz yok.</Text><View style={{ marginTop: 20, width: 220 }}><PrimaryButton title="Teklif al" icon="add-circle" onPress={() => router.push("/(tabs)/quote")} /></View></View>}

    {!loading && !error && quotes.length > 0 && quotes.map((quote) => {
      const stage = getStage(quote);
      const isCancelled = quote.order_status === "cancelled" || quote.offer_status === "rejected";
      return <View key={quote.id} style={{ backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 18, marginBottom: 16 }}>
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <View>
            <Text style={{ color: colors.muted, fontSize: 11, fontWeight: "800" }}>MZ-{String(quote.id).padStart(5, "0")}</Text>
            <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: "800", marginTop: 3 }}>{quote.source_language} → {quote.target_language}</Text>
          </View>
          {isCancelled ? <Badge tone="gray">IPTAL</Badge> : <Badge tone={stage === 5 ? "green" : stage === 4 ? "orange" : "blue"}>{STAGES[stage].title}</Badge>}
        </View>

        {isCancelled ? <View style={{ paddingVertical: 12, alignItems: "center" }}><MaterialIcons name="cancel" size={32} color="#EF4444" /><Text style={{ color: "#991B1B", fontSize: 13, marginTop: 6 }}>Bu siparis iptal edilmistir.</Text></View> : <>
          {/* 4-stage timeline */}
          <View style={{ marginTop: 4 }}>
            {STAGES.map((item, index) => <View key={item.key} style={{ flexDirection: "row", minHeight: index < STAGES.length - 1 ? 56 : 36 }}>
              <View style={{ width: 25, alignItems: "center" }}>
                <View style={{ width: 25, height: 25, borderRadius: 13, backgroundColor: index <= stage ? colors.primary : colors.background, borderWidth: index <= stage ? 0 : 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" }}><MaterialIcons name={item.icon} size={14} color={index <= stage ? "#fff" : colors.muted} /></View>
                {index < STAGES.length - 1 && <View style={{ width: 2, flex: 1, backgroundColor: index < stage ? colors.primary : colors.border, marginVertical: 4 }} />}
              </View>
              <View style={{ marginLeft: 12, paddingBottom: 6, flex: 1 }}>
                <Text style={{ color: index <= stage ? colors.foreground : colors.muted, fontSize: 14, fontWeight: index <= stage ? "800" : "600" }}>{item.title}</Text>
                {index === stage && <Text style={{ color: colors.muted, fontSize: 12, marginTop: 2 }}>{item.desc}</Text>}
              </View>
            </View>)}
          </View>

          {/* Price */}
          {quote.estimated_price != null && <View style={{ marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.border, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: colors.muted, fontSize: 12 }}>TEKLIF BEDELI</Text>
            <Text style={{ color: colors.primary, fontSize: 18, fontWeight: "900" }}>{Number(quote.estimated_price).toLocaleString("tr-TR")} TL</Text>
          </View>}

          {/* Stage 1: Accept/Reject */}
          {stage === 1 && quote.offer_status === "offered" && <View style={{ flexDirection: "row", gap: 10, marginTop: 14 }}>
            <View style={{ flex: 1 }}><PrimaryButton title={actionLoading === quote.id ? "..." : "Kabul et"} icon="check" onPress={() => handleAccept(quote.id)} disabled={actionLoading === quote.id} /></View>
            <Pressable onPress={() => handleReject(quote.id)} disabled={actionLoading === quote.id} style={{ flex: 1, height: 52, borderRadius: 14, borderWidth: 1, borderColor: "#FECACA", backgroundColor: "#FEF2F2", alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 6 }}><MaterialIcons name="close" size={18} color="#EF4444" /><Text style={{ color: "#991B1B", fontWeight: "700" }}>Reddet</Text></Pressable>
          </View>}

          {/* Stage 3: Payment after accept */}
          {stage === 3 && quote.order_status === "payment_pending" && quote.payment_link_id && <View style={{ marginTop: 14 }}><PrimaryButton title="Odemeyi tamamla" icon="payments" onPress={() => handlePay(quote)} /></View>}

          {/* Stage 3: Download + Review */}
          {stage === 5 && <View style={{ marginTop: 14, gap: 10 }}>
            {quote.delivered_file_key && <PrimaryButton title="Dosyayi indir" icon="download" onPress={() => handleDownload(quote)} />}
            <Pressable onPress={() => { setReviewModal(quote); setReviewRating(0); setReviewComment(""); setReviewError(null); }} style={{ height: 48, borderRadius: 14, borderWidth: 1, borderColor: colors.border, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 6 }}><MaterialIcons name="star" size={18} color="#F59E0B" /><Text style={{ color: colors.foreground, fontWeight: "700" }}>Degerlendirme yap</Text></Pressable>
          </View>}
        </>}
      </View>;
    })}

    {/* Review Modal */}
    {reviewModal && <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end", zIndex: 100 }}><View style={{ backgroundColor: colors.background, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <Text style={{ color: colors.foreground, fontSize: 22, fontWeight: "900" }}>Degerlendirme</Text>
        <Pressable onPress={() => setReviewModal(null)} hitSlop={8}><MaterialIcons name="close" size={24} color={colors.muted} /></Pressable>
      </View>
      <Text style={{ color: colors.muted, fontSize: 13, marginBottom: 18 }}>MZ-{String(reviewModal.id).padStart(5, "0")} numarali siparisinizi degerlendirin.</Text>
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 18 }}>{[1, 2, 3, 4, 5].map((star) => <Pressable key={star} onPress={() => setReviewRating(star)}><MaterialIcons name={star <= reviewRating ? "star" : "star-border"} size={40} color="#F59E0B" /></Pressable>)}</View>
      <TextInput value={reviewComment} onChangeText={setReviewComment} placeholder="Yorumunuz (opsiyonel)" placeholderTextColor={colors.muted} multiline style={{ minHeight: 80, borderRadius: 14, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.surface, paddingHorizontal: 15, paddingVertical: 12, color: colors.foreground, fontSize: 14, marginBottom: 16 }} />
      {reviewError && <View style={{ backgroundColor: "#FEF2F2", borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "#FECACA", marginBottom: 16 }}><Text style={{ color: "#991B1B", fontSize: 13, fontWeight: "600" }}>{reviewError}</Text></View>}
      <PrimaryButton title={reviewLoading ? "Gonderiliyor..." : "Degerlendirmeyi gonder"} icon="send" onPress={handleReviewSubmit} disabled={reviewLoading} />
    </View></View>}

  </ScrollView></ScreenContainer>;
}

import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useLocalSearchParams } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { Badge, LogoMark, PrimaryButton } from "@/components/mazzgord-ui";
import { useColors } from "@/hooks/use-colors";
import { quoteApi, accountApi, type QuoteRecord } from "@/lib/api";
import * as DocumentPicker from "expo-document-picker";
import { OFFER_STATUS_LABELS, ORDER_STATUS_LABELS } from "@/constants/const";

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

const TIMELINE_STEPS = [
  { key: "offered", title: "Teklif", icon: "request-quote" as const },
  { key: "accepted", title: "Kabul", icon: "check-circle" as const },
  { key: "paid", title: "Ödeme", icon: "payments" as const },
  { key: "document", title: "Belge", icon: "upload-file" as const },
  { key: "completed", title: "İşlem", icon: "edit" as const },
  { key: "delivered", title: "Teslim", icon: "local-shipping" as const },
];

function getTimelineIndex(quote: QuoteRecord): number {
  if (quote.order_status === "delivered") return 5;
  if (quote.order_status === "completed" || quote.order_status === "in_progress") return 4;
  if (quote.order_status === "reviewing" || quote.file_key || quote.document_uploaded_at) return 3;
  if (quote.order_status === "payment_pending") return 1;
  if (quote.offer_status === "accepted") return 1;
  if (quote.offer_status === "offered") return 0;
  return 0;
}

export default function OfferDetailScreen() {
  const colors = useColors();
  const params = useLocalSearchParams<{ id?: string }>();
  const quoteId = params.id ? parseInt(params.id) : 0;
  const [quote, setQuote] = useState<QuoteRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadQuote = useCallback(async () => {
    if (!quoteId) { setError("Teklif ID eksik"); setLoading(false); return; }
    try {
      const res = await accountApi.orders();
      if (res.success && res.data) {
        const found = (res.data.quotes || []).find((q) => q.id === quoteId);
        if (found) setQuote(found);
        else setError("Teklif bulunamadı");
      } else {
        setError("Teklif yüklenemedi");
      }
    } catch {
      setError("Teklif yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [quoteId]);

  useFocusEffect(useCallback(() => { loadQuote(); }, [loadQuote]));

  const handleAccept = async () => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await quoteApi.accept(quoteId);
      if (res.success) {
        await loadQuote();
        // Kabul sonrası payment_link_id geldiyse ödeme sayfasına yönlendir
        if (res.payment_link_id) {
          router.push({ pathname: "/payment", params: { link: res.payment_link_id } });
        }
      } else {
        setError(res.error || "Teklif kabul edilemedi");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Teklif kabul edilemedi");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    setActionLoading(true);
    setError(null);
    try {
      const res = await quoteApi.reject(quoteId);
      if (res.success) { await loadQuote(); }
      else { setError(res.error || "Teklif reddedilemedi"); }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Teklif reddedilemedi");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUploadDocument = async () => {
    if (actionLoading) return;
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "image/jpeg", "image/png", "image/webp"],
        copyToCacheDirectory: true,
      });
      if (result.canceled || !result.assets || result.assets.length === 0) return;
      const asset = result.assets[0];
      setActionLoading(true);
      setError(null);
      const res = await quoteApi.uploadDocument(quoteId, { uri: asset.uri, name: asset.name, type: asset.mimeType || "application/octet-stream", file: (asset as any).file });
      if (res.success) { await loadQuote(); }
      else { setError(res.error || "Belge yüklenemedi"); }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Belge yüklenemedi");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <ScreenContainer edges={["top", "left", "right"]}><View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}><MaterialIcons name="hourglass-top" size={40} color={colors.muted} /><Text style={{ color: colors.muted, marginTop: 12 }}>Yükleniyor...</Text></View></ScreenContainer>;

  if (error) return <ScreenContainer edges={["top", "left", "right"]}><View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}><MaterialIcons name="error-outline" size={40} color="#EF4444" /><Text style={{ color: colors.foreground, fontSize: 16, fontWeight: "700", marginTop: 12 }}>{error}</Text><View style={{ marginTop: 20 }}><PrimaryButton title="Geri dön" icon="arrow-back" onPress={() => router.back()} /></View></View></ScreenContainer>;

  if (!quote) return <ScreenContainer edges={["top", "left", "right"]}><View style={{ flex: 1, padding: 20, alignItems: "center", justifyContent: "center" }}><Text style={{ color: colors.muted }}>Teklif bulunamadı.</Text></View></ScreenContainer>;

  const timelineIndex = getTimelineIndex(quote);

  return <ScreenContainer edges={["top", "left", "right"]}><ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 35 }}>
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 }}><Pressable onPress={() => router.back()}><MaterialIcons name="arrow-back" size={24} color={colors.foreground} /></Pressable><LogoMark compact /></View>

    {/* Teklif özeti */}
    <Text style={{ color: colors.foreground, fontSize: 28, fontWeight: "900", letterSpacing: -0.8 }}>Teklif Detayı</Text>
    <Text style={{ color: colors.muted, fontSize: 14, marginTop: 6 }}>MZ-{String(quote.id).padStart(5, "0")}</Text>

    <View style={{ backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 18, marginTop: 20 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: "800" }}>{quote.source_language} → {quote.target_language}</Text>
        <Badge tone={quote.offer_status === "offered" ? "orange" : quote.offer_status === "accepted" ? "green" : quote.offer_status === "rejected" ? "gray" : "blue"}>{OFFER_STATUS_LABELS[quote.offer_status || "pending"] || quote.offer_status}</Badge>
      </View>
      {quote.document_type && <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}><Text style={{ color: colors.muted, fontSize: 13 }}>Belge türü</Text><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "600" }}>{quote.document_type}</Text></View>}
      {quote.page_count != null && <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}><Text style={{ color: colors.muted, fontSize: 13 }}>Sayfa sayısı</Text><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "600" }}>{quote.page_count}</Text></View>}
      {quote.estimated_price != null && <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}><Text style={{ color: colors.muted, fontSize: 13 }}>Tutar</Text><Text style={{ color: colors.primary, fontSize: 16, fontWeight: "900" }}>{Number(quote.estimated_price).toLocaleString("tr-TR")} ₺</Text></View>}
      {quote.delivery_date && <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}><Text style={{ color: colors.muted, fontSize: 13 }}>Teslim tarihi</Text><Text style={{ color: colors.foreground, fontSize: 13, fontWeight: "600" }}>{formatDate(quote.delivery_date)}</Text></View>}
      {quote.offer_note && <View style={{ marginTop: 10, backgroundColor: "#EFF6FF", padding: 12, borderRadius: 12 }}><Text style={{ color: "#1E40AF", fontSize: 12, lineHeight: 18 }}>{quote.offer_note}</Text></View>}
    </View>

    {/* Timeline */}
    <Text style={{ color: colors.foreground, fontSize: 17, fontWeight: "800", marginTop: 28, marginBottom: 16 }}>Süreç</Text>
    <View style={{ backgroundColor: colors.surface, borderRadius: 20, borderWidth: 1, borderColor: colors.border, padding: 18 }}>
      {TIMELINE_STEPS.map((step, index) => <View key={step.key} style={{ flexDirection: "row", minHeight: index < TIMELINE_STEPS.length - 1 ? 56 : 36 }}>
        <View style={{ width: 25, alignItems: "center" }}>
          <View style={{ width: 25, height: 25, borderRadius: 13, backgroundColor: index <= timelineIndex ? colors.primary : colors.background, borderWidth: index <= timelineIndex ? 0 : 1, borderColor: colors.border, alignItems: "center", justifyContent: "center" }}>
            <MaterialIcons name={step.icon} size={14} color={index <= timelineIndex ? "#fff" : colors.muted} />
          </View>
          {index < TIMELINE_STEPS.length - 1 && <View style={{ width: 2, flex: 1, backgroundColor: index < timelineIndex ? colors.primary : colors.border, marginVertical: 4 }} />}
        </View>
        <View style={{ marginLeft: 12, paddingBottom: 9 }}>
          <Text style={{ color: index <= timelineIndex ? colors.foreground : colors.muted, fontSize: 14, fontWeight: index <= timelineIndex ? "800" : "600" }}>{step.title}</Text>
        </View>
      </View>)}
    </View>

    {/* Aksiyon butonları — duruma göre */}
    {error && <View style={{ backgroundColor: "#FEF2F2", borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "#FECACA", marginTop: 16 }}><Text style={{ color: "#991B1B", fontSize: 13, fontWeight: "600" }}>{error}</Text></View>}

    {quote.offer_status === "offered" && <View style={{ marginTop: 20, gap: 10 }}>
      <PrimaryButton title={actionLoading ? "İşleniyor..." : "Teklifi Kabul Et"} icon="check-circle" onPress={handleAccept} disabled={actionLoading} />
      <Pressable onPress={handleReject} disabled={actionLoading} style={{ alignItems: "center", padding: 14 }}><Text style={{ color: "#EF4444", fontWeight: "700" }}>Teklifi Reddet</Text></Pressable>
    </View>}

    {quote.offer_status === "accepted" && quote.order_status === "payment_pending" && <View style={{ marginTop: 20 }}>
      <View style={{ backgroundColor: "#EFF6FF", borderRadius: 14, padding: 16, marginBottom: 14 }}><Text style={{ color: "#1E40AF", fontSize: 13, lineHeight: 19 }}>Teklifiniz kabul edildi. İşlemin devam edebilmesi için ödemenizi tamamlamanız gerekiyor.</Text></View>
      <PrimaryButton title="Ödemeye Geç" icon="payments" onPress={() => router.push({ pathname: "/payment", params: { link: (quote as any).payment_link_id || String(quote.id) } })} />
    </View>}

    {quote.offer_status === "accepted" && (quote.order_status === "in_progress" || quote.order_status === "reviewing") && !quote.file_key && !quote.document_uploaded_at && <View style={{ marginTop: 20 }}>
      <View style={{ backgroundColor: "#FFF7ED", borderRadius: 14, padding: 16, marginBottom: 14 }}><Text style={{ color: colors.primary, fontSize: 13, lineHeight: 19 }}>Ödemeniz alındı. Belgenizi yükleyerek işlemi başlatın.</Text></View>
      <PrimaryButton title={actionLoading ? "Yükleniyor..." : "Belgenizi Yükleyin"} icon="upload-file" onPress={handleUploadDocument} disabled={actionLoading} />
    </View>}

    {quote.order_status === "reviewing" && <View style={{ marginTop: 20, backgroundColor: "#EFF6FF", borderRadius: 14, padding: 16 }}><Text style={{ color: "#1E40AF", fontSize: 13, lineHeight: 19 }}>Belgeniz alındı. İşleminiz başlatıldı.</Text></View>}

    {quote.order_status === "in_progress" && <View style={{ marginTop: 20, backgroundColor: "#EFF6FF", borderRadius: 14, padding: 16 }}><Text style={{ color: "#1E40AF", fontSize: 13, lineHeight: 19 }}>Çeviriniz hazırlanıyor. Tamamlandığında buradan indirebileceksiniz.</Text></View>}

    {quote.order_status === "delivered" && quote.delivered_file_key && <View style={{ marginTop: 20 }}>
      <View style={{ backgroundColor: "#F0FDF4", borderRadius: 14, padding: 16, marginBottom: 14 }}><Text style={{ color: "#15803D", fontSize: 13, lineHeight: 19 }}>Belgeniz hazır! 🎉</Text></View>
      <PrimaryButton title="Belgenizi Görüntüleyin" icon="download" onPress={() => router.push({ pathname: "/(tabs)/track" })} />
    </View>}
  </ScrollView></ScreenContainer>;
}

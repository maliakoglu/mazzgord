import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useColors } from "@/hooks/use-colors";

export function LogoMark({ compact = false }: { compact?: boolean }) {
  const colors = useColors();
  return (
    <View style={styles.brandRow}>
      <View style={[styles.logo, { backgroundColor: colors.primary }]}>
        <MaterialIcons name="translate" size={compact ? 17 : 20} color="#fff" />
      </View>
      <View>
        <Text style={[styles.brandName, { color: colors.foreground }]}>mazzgord</Text>
        {!compact && <Text style={[styles.brandSub, { color: colors.muted }]}>ÇEVİRİ HİZMETLERİ</Text>}
      </View>
    </View>
  );
}

export function SectionTitle({ title, action, onPress }: { title: string; action?: string; onPress?: () => void }) {
  const colors = useColors();
  return (
    <View style={styles.sectionTitle}>
      <Text style={[styles.sectionText, { color: colors.foreground }]}>{title}</Text>
      {action && <Pressable onPress={onPress}><Text style={[styles.actionText, { color: colors.primary }]}>{action}</Text></Pressable>}
    </View>
  );
}

export function PrimaryButton({ title, icon, onPress, disabled = false }: { title: string; icon?: keyof typeof MaterialIcons.glyphMap; onPress?: () => void; disabled?: boolean }) {
  const colors = useColors();
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.primaryButton, { backgroundColor: colors.primary }, pressed && styles.pressed, disabled && styles.disabled]}>
      {icon && <MaterialIcons name={icon} size={19} color="#fff" />}
      <Text style={styles.primaryText}>{title}</Text>
    </Pressable>
  );
}

export function OutlineButton({ title, icon, onPress }: { title: string; icon?: keyof typeof MaterialIcons.glyphMap; onPress?: () => void }) {
  const colors = useColors();
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.outlineButton, { borderColor: colors.border }, pressed && styles.pressed]}>
      {icon && <MaterialIcons name={icon} size={19} color={colors.primary} />}
      <Text style={[styles.outlineText, { color: colors.foreground }]}>{title}</Text>
    </Pressable>
  );
}

export function Badge({ children, tone = "orange" }: { children: ReactNode; tone?: "orange" | "green" | "blue" | "gray" }) {
  const colors = useColors();
  const palette = tone === "green" ? { bg: "#DCFCE7", text: "#15803D" } : tone === "blue" ? { bg: "#DBEAFE", text: "#1D4ED8" } : tone === "gray" ? { bg: colors.surface, text: colors.muted } : { bg: "#FFF7ED", text: colors.primary };
  return <View style={[styles.badge, { backgroundColor: palette.bg }]}><Text style={[styles.badgeText, { color: palette.text }]}>{children}</Text></View>;
}

export function StatCard({ value, label, icon }: { value: string; label: string; icon: keyof typeof MaterialIcons.glyphMap }) {
  const colors = useColors();
  return <View style={[styles.statCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><MaterialIcons name={icon} size={21} color={colors.primary} /><Text style={[styles.statValue, { color: colors.foreground }]}>{value}</Text><Text style={[styles.statLabel, { color: colors.muted }]}>{label}</Text></View>;
}

export const styles = StyleSheet.create({
  brandRow: { flexDirection: "row", alignItems: "center", gap: 9 },
  logo: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  brandName: { fontSize: 20, fontWeight: "800", letterSpacing: -0.7 },
  brandSub: { fontSize: 8, fontWeight: "700", letterSpacing: 1.1, marginTop: -1 },
  sectionTitle: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 13 },
  sectionText: { fontSize: 18, fontWeight: "800", letterSpacing: -0.3 },
  actionText: { fontSize: 13, fontWeight: "700" },
  primaryButton: { minHeight: 52, borderRadius: 16, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingHorizontal: 18 },
  primaryText: { color: "#fff", fontSize: 15, fontWeight: "800" },
  outlineButton: { minHeight: 50, borderRadius: 16, borderWidth: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingHorizontal: 18, backgroundColor: "transparent" },
  outlineText: { fontSize: 15, fontWeight: "700" },
  pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.5 },
  badge: { alignSelf: "flex-start", borderRadius: 7, paddingHorizontal: 9, paddingVertical: 5 },
  badgeText: { fontSize: 11, fontWeight: "800" },
  statCard: { flex: 1, minHeight: 96, borderRadius: 16, borderWidth: 1, padding: 13, gap: 7 },
  statValue: { fontSize: 20, fontWeight: "800" },
  statLabel: { fontSize: 11, fontWeight: "600" },
});

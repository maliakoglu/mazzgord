export type ColorScheme = "light" | "dark";

export type ThemeColorPalette = {
  primary: string;
  background: string;
  surface: string;
  foreground: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
};

const lightPalette: ThemeColorPalette = {
  primary: "#1E3A8A",
  background: "#FFFFFF",
  surface: "#F8FAFC",
  foreground: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  success: "#16A34A",
  warning: "#F59E0B",
  error: "#EF4444",
};

const darkPalette: ThemeColorPalette = {
  primary: "#3B82F6",
  background: "#0F172A",
  surface: "#1E293B",
  foreground: "#F1F5F9",
  muted: "#94A3B8",
  border: "#334155",
  success: "#22C55E",
  warning: "#FBBF24",
  error: "#F87171",
};

export const Colors: Record<ColorScheme, ThemeColorPalette> = {
  light: lightPalette,
  dark: darkPalette,
};

export const SchemeColors: Record<ColorScheme, ThemeColorPalette> = Colors;

export const Fonts = {
  regular: { fontFamily: "System" },
  medium: { fontFamily: "System", fontWeight: "500" as const },
  semibold: { fontFamily: "System", fontWeight: "600" as const },
  bold: { fontFamily: "System", fontWeight: "700" as const },
  extrabold: { fontFamily: "System", fontWeight: "900" as const },
};

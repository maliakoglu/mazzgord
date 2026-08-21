export type ColorScheme = "light" | "dark";

export type ThemeColorPalette = {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  foreground: string;
  muted: string;
  border: string;
  success: string;
  warning: string;
  error: string;
};

const lightPalette: ThemeColorPalette = {
  primary: "#F97316",
  accent: "#1D4ED8",
  background: "#FFFFFF",
  surface: "#F1F5F9",
  surfaceAlt: "#FFF7ED",
  foreground: "#0F172A",
  muted: "#64748B",
  border: "#E2E8F0",
  success: "#16A34A",
  warning: "#F59E0B",
  error: "#EF4444",
};

const darkPalette: ThemeColorPalette = {
  primary: "#FB923C",
  accent: "#60A5FA",
  background: "#0B1120",
  surface: "#1E293B",
  surfaceAlt: "#292524",
  foreground: "#F8FAFC",
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

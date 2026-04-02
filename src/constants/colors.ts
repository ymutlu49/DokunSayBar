import type { ChipColor, ThemePalette } from "../types";

/* ===== Rod Gradient ===== */
export const ROD_GRADIENT = {
  top: "#fde047",
  mid: "#f59e0b",
  bottom: "#78350f",
} as const;

export const ROD_STROKE = "#78350f";

export const ROD_FLIPPED_GRADIENT = {
  top: "#222",
  bottom: "#0a0a0a",
} as const;

/* ===== Chip Colors ===== */
export const CHIP_BG: Record<ChipColor, string> = {
  blue: "#3b82f6",
  red: "#dc2626",
  green: "#22c55e",
  yellow: "#eab308",
};

export const CHIP_BORDER: Record<ChipColor, string> = {
  blue: "#1e40af",
  red: "#991b1b",
  green: "#15803d",
  yellow: "#a16207",
};

export const CHIP_TEXT: Record<ChipColor, string> = {
  blue: "#fff",
  red: "#fff",
  green: "#fff",
  yellow: "#422006",
};

/* ===== Pen / Drawing Colors ===== */
export const PEN_COLORS = [
  "#1a1a1a",
  "#dc2626",
  "#2563eb",
  "#16a34a",
  "#d97706",
] as const;

/* ===== Background Presets ===== */
export const BG_PRESETS = [
  "#f0ead6",
  "#ffffff",
  "#d4e4f7",
  "#2d2d2d",
] as const;

/* ===== Theme Palettes ===== */
export const THEME_LIGHT: ThemePalette = {
  bg: "#b8c0ae",
  panel: "#c8cfbe",
  brd: "#a0aa94",
  tx: "#3d4a35",
  sub: "#6b7a60",
};

export const THEME_DARK: ThemePalette = {
  bg: "#333",
  panel: "#1a1a1a",
  brd: "#555",
  tx: "#ccc",
  sub: "#888",
};

/* ===== Accent Colors ===== */
export const ACCENT = {
  primary: "#f59e0b",
  success: "#22c55e",
  danger: "#dc2626",
  info: "#3b82f6",
  purple: "#7c3aed",
} as const;

export function getTheme(bgColor: string): ThemePalette {
  return bgColor === "#2d2d2d" ? THEME_DARK : THEME_LIGHT;
}

export function isDarkMode(bgColor: string): boolean {
  return bgColor === "#2d2d2d";
}

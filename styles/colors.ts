export const colors = {
  primary: {
    lime: "#a3e635",
    limeDark: "#65a30d",
    limeLight: "#bef264",
    limeGlow: "rgba(163,230,53,0.15)",
    limeGlowStrong: "rgba(163,230,53,0.25)",
  },
  surface: {
    pure: "#000000",
    0: "#0a0a0a",
    50: "#111111",
    100: "#1a1a1a",
    200: "#262626",
    300: "#333333",
    400: "#404040",
    500: "#525252",
    600: "#737373",
    700: "#a3a3a3",
    800: "#d4d4d4",
    900: "#f5f5f5",
  },
  semantic: {
    success: "#a3e635",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
    neutral: "#737373",
  },
  chart: {
    green: "#a3e635",
    yellow: "#facc15",
    orange: "#fb923c",
    red: "#ef4444",
    purple: "#a855f7",
    blue: "#3b82f6",
    cyan: "#06b6d4",
  },
  overlay: {
    light: "rgba(255,255,255,0.05)",
    medium: "rgba(255,255,255,0.1)",
    heavy: "rgba(255,255,255,0.15)",
    dark: "rgba(0,0,0,0.4)",
    darker: "rgba(0,0,0,0.6)",
  },
} as const;

export type Colors = typeof colors;

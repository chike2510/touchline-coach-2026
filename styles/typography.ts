export const typography = {
  fontFamily: {
    sans: "var(--font-inter), system-ui, sans-serif",
    mono: "var(--font-jetbrains), monospace",
  },
  sizes: {
    "2xs": { size: "0.625rem", lineHeight: "0.875rem", letterSpacing: "0.02em" },
    xs: { size: "0.75rem", lineHeight: "1rem", letterSpacing: "0.01em" },
    sm: { size: "0.875rem", lineHeight: "1.25rem", letterSpacing: "0" },
    base: { size: "1rem", lineHeight: "1.5rem", letterSpacing: "-0.01em" },
    lg: { size: "1.125rem", lineHeight: "1.75rem", letterSpacing: "-0.01em" },
    xl: { size: "1.25rem", lineHeight: "1.75rem", letterSpacing: "-0.02em" },
    "2xl": { size: "1.5rem", lineHeight: "2rem", letterSpacing: "-0.02em" },
    "3xl": { size: "1.875rem", lineHeight: "2.25rem", letterSpacing: "-0.03em" },
    "4xl": { size: "2.25rem", lineHeight: "2.5rem", letterSpacing: "-0.03em" },
  },
  weights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
} as const;

export type Typography = typeof typography;

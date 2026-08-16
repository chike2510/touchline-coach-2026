export const colors = {
  brand: {
    lime: "#B7F52A",
    limeBright: "#D4FF38",
    limeDeep: "#7EA814",
    purple: "#B66DFF",
    purpleDeep: "#6F2EA8",
  },
  surface: {
    canvas: "#03080F",
    rail: "#06111B",
    panel: "#0B141D",
    panelRaised: "#111B25",
    panelHover: "#172330",
    border: "#22313D",
    borderStrong: "#344554",
  },
  text: {
    primary: "#F4F7FA",
    secondary: "#AAB6C2",
    muted: "#6E7C89",
    inverse: "#071018",
  },
  semantic: {
    success: "#B7F52A",
    warning: "#F5C84B",
    danger: "#F04444",
    info: "#6AA7FF",
    purple: "#B66DFF",
  },
  chart: {
    lime: "#B7F52A",
    purple: "#B66DFF",
    amber: "#F5C84B",
    red: "#F04444",
    blue: "#6AA7FF",
    cyan: "#45D5D5",
  },
  overlay: {
    light: "rgba(255,255,255,0.05)",
    medium: "rgba(255,255,255,0.09)",
    dark: "rgba(3,8,15,0.72)",
  },
} as const;

export type Colors = typeof colors;

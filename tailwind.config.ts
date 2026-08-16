import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pitch: {
          50: "#F5FFD6",
          100: "#E8FF9A",
          200: "#D4FF38",
          300: "#C6FB32",
          400: "#B7F52A",
          500: "#B7F52A",
          600: "#97D619",
          700: "#7EA814",
          800: "#516F0E",
          900: "#304708",
          950: "#172603",
        },
        surface: {
          0: "#03080F",
          50: "#06111B",
          100: "#0B141D",
          200: "#111B25",
          300: "#172330",
          400: "#22313D",
          500: "#344554",
          600: "#6E7C89",
          700: "#AAB6C2",
          800: "#CDD6DE",
          900: "#E6EDF2",
          950: "#F4F7FA",
        },
        accent: {
          lime: "#B7F52A",
          limeDark: "#7EA814",
          limeGlow: "rgba(183,245,42,0.16)",
          purple: "#B66DFF",
          amber: "#F5C84B",
          orange: "#F29D57",
          red: "#F04444",
          blue: "#6AA7FF",
          cyan: "#45D5D5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 20px rgba(183,245,42,0.16)",
        "glow-strong": "0 0 30px rgba(183,245,42,0.26)",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.5)",
        elevated: "0 12px 40px rgba(0,0,0,0.6)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
        "snap": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite linear",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fadeIn 0.3s ease-out",
        "scale-in": "scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;

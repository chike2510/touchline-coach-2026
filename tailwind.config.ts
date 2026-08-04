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
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#a3e635",
          600: "#84cc16",
          700: "#65a30d",
          800: "#3f6212",
          900: "#14532d",
          950: "#052e16",
        },
        surface: {
          0: "#000000",
          50: "#0a0a0a",
          100: "#111111",
          200: "#1a1a1a",
          300: "#262626",
          400: "#333333",
          500: "#404040",
          600: "#525252",
          700: "#737373",
          800: "#a3a3a3",
          900: "#d4d4d4",
          950: "#f5f5f5",
        },
        accent: {
          lime: "#a3e635",
          limeDark: "#65a30d",
          limeGlow: "rgba(163,230,53,0.15)",
          purple: "#a855f7",
          amber: "#f59e0b",
          orange: "#fb923c",
          red: "#ef4444",
          blue: "#3b82f6",
          cyan: "#06b6d4",
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
        glow: "0 0 20px rgba(163,230,53,0.15)",
        "glow-strong": "0 0 30px rgba(163,230,53,0.25)",
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

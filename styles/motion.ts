export const motion = {
  duration: {
    instant: 0.1,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    slower: 0.7,
  },
  easing: {
    spring: [0.34, 1.56, 0.64, 1],
    smooth: [0.4, 0, 0.2, 1],
    snap: [0.16, 1, 0.3, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    linear: [0, 0, 1, 1],
  },
  variants: {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    },
    slideUp: {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
    },
    slideInRight: {
      hidden: { x: 20, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
    },
    scaleIn: {
      hidden: { scale: 0.95, opacity: 0 },
      visible: { scale: 1, opacity: 1, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } },
    },
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, delayChildren: 0.1 },
      },
    },
    staggerItem: {
      hidden: { y: 12, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
    },
  },
} as const;

export type Motion = typeof motion;

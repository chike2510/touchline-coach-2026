"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  glow?: boolean;
  onClick?: () => void;
  interactive?: boolean;
}

export function Card({
  children,
  className,
  padding = "md",
  glow = false,
  onClick,
  interactive = false,
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-3",
    md: "p-4",
    lg: "p-5",
  };

  return (
    <motion.div
      whileTap={interactive ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-surface-400/80 bg-gradient-to-br from-surface-200/90 to-surface-100/95",
        glow && "shadow-glow border-pitch-500/60",
        interactive && "cursor-pointer active:opacity-90",
        paddings[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

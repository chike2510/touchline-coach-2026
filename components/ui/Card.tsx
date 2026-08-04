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
        "relative rounded-2xl bg-surface-100 border border-surface-200/50 overflow-hidden",
        glow && "shadow-glow border-pitch-500/20",
        interactive && "cursor-pointer active:opacity-90",
        paddings[padding],
        className
      )}
    >
      {children}
    </motion.div>
  );
}

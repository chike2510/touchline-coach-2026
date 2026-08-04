"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  onClick,
  className,
  type = "button",
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 select-none";

  const variants = {
    primary: "bg-pitch-500 text-surface-0 hover:bg-pitch-400 active:scale-[0.97] shadow-glow",
    secondary: "bg-surface-200 text-surface-900 hover:bg-surface-300 active:scale-[0.97]",
    ghost: "bg-transparent text-surface-700 hover:bg-surface-100 hover:text-surface-900 active:scale-[0.97]",
    danger: "bg-accent-red/20 text-accent-red hover:bg-accent-red/30 active:scale-[0.97]",
    outline: "border border-surface-400 text-surface-700 hover:border-pitch-500 hover:text-pitch-400 active:scale-[0.97]",
  };

  const sizes = {
    sm: "h-9 px-3 text-xs",
    md: "h-12 px-5 text-sm",
    lg: "h-14 px-6 text-base",
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        base,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon}
      {children}
    </motion.button>
  );
}

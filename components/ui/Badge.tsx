"use client";

import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "lime" | "amber" | "red" | "blue" | "purple" | "neutral" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "neutral", size = "sm", className }: BadgeProps) {
  const variants = {
    lime: "bg-pitch-500/15 text-pitch-400 border-pitch-500/20",
    amber: "bg-accent-amber/15 text-accent-amber border-accent-amber/20",
    red: "bg-accent-red/15 text-accent-red border-accent-red/20",
    blue: "bg-accent-blue/15 text-accent-blue border-accent-blue/20",
    purple: "bg-accent-purple/15 text-accent-purple border-accent-purple/20",
    neutral: "bg-surface-200 text-surface-700 border-surface-300",
    outline: "bg-transparent text-surface-600 border-surface-400",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-2xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-lg border font-semibold",
      variants[variant],
      sizes[size],
      className
    )}>
      {children}
    </span>
  );
}

"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  color?: "lime" | "amber" | "red" | "blue" | "purple";
  showValue?: boolean;
  className?: string;
  label?: string;
}

export function ProgressBar({
  value,
  max = 100,
  size = "md",
  color = "lime",
  showValue = false,
  className,
  label,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const colors = {
    lime: "bg-pitch-500",
    amber: "bg-accent-amber",
    red: "bg-accent-red",
    blue: "bg-accent-blue",
    purple: "bg-accent-purple",
  };

  const sizes = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-surface-600">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-surface-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full rounded-full bg-surface-200 overflow-hidden", sizes[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={cn("h-full rounded-full", colors[color])}
        />
      </div>
    </div>
  );
}

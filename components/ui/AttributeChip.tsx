"use client";

import { cn } from "@/utils/cn";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface AttributeChipProps {
  label: string;
  value: number;
  potential?: number;
  trend?: "up" | "down" | "stable";
  className?: string;
}

export function AttributeChip({ label, value, potential, trend, className }: AttributeChipProps) {
  const getColor = (v: number) => {
    if (v >= 85) return "text-pitch-400";
    if (v >= 70) return "text-surface-400";
    if (v >= 55) return "text-accent-amber";
    return "text-accent-red";
  };

  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      <span className="text-sm text-surface-600">{label}</span>
      <div className="flex items-center gap-2">
        {potential && (
          <span className="text-xs text-surface-500">{potential}</span>
        )}
        <span className={cn("text-sm font-bold tabular-nums", getColor(value))}>
          {value}
        </span>
        {trend === "up" && <ArrowUp className="w-3 h-3 text-pitch-500" />}
        {trend === "down" && <ArrowDown className="w-3 h-3 text-accent-red" />}
        {trend === "stable" && <Minus className="w-3 h-3 text-surface-500" />}
      </div>
    </div>
  );
}

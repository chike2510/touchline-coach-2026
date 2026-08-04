"use client";

import { cn } from "@/utils/cn";
import { Card } from "./Card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: ReactNode;
  icon?: LucideIcon;
  trend?: { value: string; positive: boolean };
  color?: "lime" | "amber" | "red" | "blue" | "purple" | "default";
  className?: string;
}

export function StatCard({ label, value, icon: Icon, trend, color = "default", className }: StatCardProps) {
  const colors = {
    lime: "text-pitch-400", amber: "text-accent-amber", red: "text-accent-red",
    blue: "text-accent-blue", purple: "text-accent-purple", default: "text-surface-900",
  };

  return (
    <Card padding="sm" className={cn("text-center", className)}>
      {Icon && <Icon className={cn("w-4 h-4 mx-auto mb-2", colors[color])} />}
      <div className={cn("text-lg font-bold tabular-nums", colors[color])}>{value}</div>
      <div className="text-2xs text-surface-600 uppercase tracking-wider mt-1">{label}</div>
      {trend && (
        <div className={cn("text-2xs font-semibold mt-1", trend.positive ? "text-pitch-400" : "text-accent-red")}>
          {trend.positive ? "↑" : "↓"} {trend.value}
        </div>
      )}
    </Card>
  );
}

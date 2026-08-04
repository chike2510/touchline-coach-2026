"use client";

import { cn } from "@/utils/cn";
import { getInitials } from "@/lib/utils";

interface AvatarProps {
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  ringColor?: "none" | "lime" | "surface";
  className?: string;
}

export function Avatar({ name, size = "md", ringColor = "none", className }: AvatarProps) {
  const sizes = {
    xs: "w-8 h-8 text-2xs", sm: "w-10 h-10 text-xs", md: "w-12 h-12 text-sm",
    lg: "w-16 h-16 text-lg", xl: "w-20 h-20 text-2xl",
  };
  const rings = {
    none: "", lime: "ring-2 ring-pitch-500/40", surface: "ring-2 ring-surface-300",
  };

  return (
    <div
      className={cn(
        "shrink-0 rounded-xl bg-surface-200 flex items-center justify-center font-bold text-surface-500",
        sizes[size], rings[ringColor], className
      )}
    >
      {getInitials(name)}
    </div>
  );
}

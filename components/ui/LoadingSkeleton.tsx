"use client";

import { cn } from "@/utils/cn";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circle" | "rect" | "card";
  lines?: number;
}

export function LoadingSkeleton({ className, variant = "rect", lines = 1 }: SkeletonProps) {
  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-4 rounded-lg bg-surface-200 shimmer w-full" />
        ))}
      </div>
    );
  }

  const variants = {
    text: "h-4 rounded-lg",
    circle: "rounded-full aspect-square",
    rect: "rounded-xl",
    card: "rounded-2xl h-32",
  };

  return (
    <div className={cn("bg-surface-200 shimmer", variants[variant], className)} />
  );
}

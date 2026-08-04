"use client";

import { cn } from "@/utils/cn";

interface HeatMapPlaceholderProps {
  points?: { x: number; y: number; intensity: number }[];
  className?: string;
}

// Deterministic placeholder heat blobs — swap `points` for real tracking
// data later without changing the render.
const defaultPoints = [
  { x: 30, y: 20, intensity: 0.8 }, { x: 55, y: 15, intensity: 0.6 }, { x: 70, y: 30, intensity: 0.9 },
  { x: 45, y: 45, intensity: 1 }, { x: 60, y: 55, intensity: 0.7 }, { x: 25, y: 60, intensity: 0.5 },
  { x: 50, y: 70, intensity: 0.65 }, { x: 75, y: 65, intensity: 0.55 },
];

export function HeatMapPlaceholder({ points = defaultPoints, className }: HeatMapPlaceholderProps) {
  return (
    <div className={cn("relative w-full aspect-[3/4] rounded-xl bg-emerald-950/30 border border-surface-200/50 overflow-hidden", className)}>
      <div className="absolute inset-x-[8%] top-[4%] bottom-[4%] border border-emerald-500/20 rounded-md" />
      <div className="absolute top-1/2 left-[8%] right-[8%] h-px bg-emerald-500/15" />
      {points.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-xl"
          style={{
            left: `${p.x}%`, top: `${p.y}%`, width: `${28 + p.intensity * 24}px`, height: `${28 + p.intensity * 24}px`,
            background: `rgba(163,230,53,${0.15 + p.intensity * 0.35})`, transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
}

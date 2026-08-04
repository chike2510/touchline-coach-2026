"use client";

import { cn } from "@/utils/cn";

interface MomentumChartProps {
  values: number[]; // -100..100, positive = home team
  homeLabel: string;
  awayLabel: string;
  className?: string;
}

export function MomentumChart({ values, homeLabel, awayLabel, className }: MomentumChartProps) {
  const max = 100;
  const width = 100;
  const barWidth = values.length > 0 ? width / values.length : 0;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative w-full h-24">
        <div className="absolute inset-x-0 top-1/2 h-px bg-surface-300" />
        <svg viewBox={`0 0 ${width} 100`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
          {values.map((v, i) => {
            const h = (Math.abs(v) / max) * 48;
            const isHome = v >= 0;
            return (
              <rect
                key={i}
                x={i * barWidth}
                y={isHome ? 50 - h : 50}
                width={Math.max(barWidth - 0.3, 0.4)}
                height={Math.max(h, 0.5)}
                fill={isHome ? "#a3e635" : "#525252"}
                opacity={0.9}
              />
            );
          })}
        </svg>
      </div>
      <div className="flex items-center justify-between mt-1 text-2xs font-semibold text-surface-600">
        <span>{homeLabel}</span>
        <span>{awayLabel}</span>
      </div>
    </div>
  );
}

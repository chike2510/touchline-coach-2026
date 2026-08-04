"use client";

import type { TacticalPrinciple } from "@/types";

interface PrincipleSliderProps {
  principle: TacticalPrinciple;
}

export function PrincipleSlider({ principle }: PrincipleSliderProps) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-xs text-surface-600 w-28 shrink-0">{principle.label}</span>
      <div className="flex-1 flex items-center gap-1 mx-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i < principle.scale ? "bg-pitch-500" : "bg-surface-300"}`}
          />
        ))}
      </div>
      <span className="text-2xs font-semibold text-surface-400 w-24 text-right shrink-0 truncate">{principle.value}</span>
    </div>
  );
}

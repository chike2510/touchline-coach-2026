"use client";

import { cn } from "@/utils/cn";
import type { TacticPreset } from "@/types";

interface TacticPresetPillProps {
  preset: TacticPreset;
  active: boolean;
  onClick: () => void;
}

export function TacticPresetPill({ preset, active, onClick }: TacticPresetPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 px-3 py-2 rounded-xl border text-left transition-colors min-w-[110px]",
        active ? "bg-pitch-500/15 border-pitch-500/30" : "bg-surface-200 border-transparent"
      )}
    >
      <p className={cn("text-xs font-bold truncate", active ? "text-pitch-400" : "text-surface-300")}>{preset.name}</p>
      <p className="text-2xs text-surface-600">{preset.formation}</p>
    </button>
  );
}

"use client";

import { PitchMarkings } from "@/features/tactics/PitchMarkings";
import type { MatchLineupPlayer } from "@/types";

interface LiveTacticalMapProps {
  lineup: MatchLineupPlayer[];
  highlightedId?: string;
}

export function LiveTacticalMap({ lineup, highlightedId }: LiveTacticalMapProps) {
  return (
    <div className="relative w-full aspect-[3/4] rounded-2xl bg-gradient-to-b from-emerald-950/40 to-emerald-950/20 overflow-hidden border border-surface-200/50">
      <PitchMarkings />
      {lineup.map((p) => (
        <div
          key={p.id}
          className="absolute flex flex-col items-center"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)" }}
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 ${
              highlightedId === p.id ? "bg-pitch-500 border-pitch-200 scale-110" : "bg-red-600/90 border-red-800/60"
            }`}
          >
            {p.number}
          </div>
          {p.rating !== undefined && (
            <span className="text-[9px] font-bold text-pitch-400 bg-black/70 px-1 rounded mt-0.5">{p.rating.toFixed(1)}</span>
          )}
        </div>
      ))}
    </div>
  );
}

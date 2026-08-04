"use client";

import { motion } from "framer-motion";
import type { MatchStatLine } from "@/types";

function toPct(home: number | string, away: number | string) {
  const h = typeof home === "string" ? parseFloat(home) : home;
  const a = typeof away === "string" ? parseFloat(away) : away;
  const total = h + a;
  if (!total || Number.isNaN(total)) return 50;
  return (h / total) * 100;
}

export function MatchStatRow({ stat }: { stat: MatchStatLine }) {
  const pct = toPct(stat.home, stat.away);
  return (
    <div className="py-2.5 border-b border-surface-200/30 last:border-0">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-bold text-pitch-400 tabular-nums">{stat.home}</span>
        <span className="text-2xs text-surface-500 uppercase tracking-wide">{stat.label}</span>
        <span className="text-sm font-bold text-surface-400 tabular-nums">{stat.away}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-surface-300 overflow-hidden flex">
        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.6 }} className="h-full bg-pitch-500" />
        <div className="h-full bg-surface-500 flex-1" />
      </div>
    </div>
  );
}

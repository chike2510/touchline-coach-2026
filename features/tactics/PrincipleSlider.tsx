"use client";

import type { TacticalPrinciple } from "@/types";

interface PrincipleSliderProps { principle: TacticalPrinciple; onChange?: (scale: number) => void; }

export function PrincipleSlider({ principle, onChange }: PrincipleSliderProps) {
  return <label className="block rounded-xl border border-surface-400/70 bg-surface-100/60 px-3 py-2.5"><div className="flex items-center justify-between gap-3"><span className="w-28 shrink-0 text-xs text-surface-700">{principle.label}</span><span className="min-w-20 text-right text-2xs font-semibold text-accent-lime">{principle.value}</span></div><div className="mt-2 flex items-center gap-2"><input aria-label={`${principle.label} intensity`} type="range" min={0} max={5} value={principle.scale} onChange={(event) => onChange?.(Number(event.target.value))} className="h-1.5 flex-1 accent-[var(--lime)]" /><span className="w-6 text-right font-mono text-[10px] text-surface-600">{principle.scale}/5</span></div></label>;
}

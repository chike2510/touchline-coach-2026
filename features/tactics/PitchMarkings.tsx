"use client";

export function PitchMarkings() {
  return (
    <div className="absolute inset-0 opacity-40 pointer-events-none">
      <div className="absolute inset-x-[6%] top-[3%] bottom-[3%] border border-emerald-500/25 rounded-lg">
        {/* Top box */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[44%] h-[14%] border-x border-b border-emerald-500/25 rounded-b-md" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[22%] h-[6%] border-x border-b border-emerald-500/25 rounded-b-sm" />
        {/* Bottom box */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[44%] h-[14%] border-x border-t border-emerald-500/25 rounded-t-md" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[22%] h-[6%] border-x border-t border-emerald-500/25 rounded-t-sm" />
        {/* Halfway line + centre circle */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-emerald-500/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[18%] aspect-square rounded-full border border-emerald-500/25" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500/30" />
      </div>
    </div>
  );
}

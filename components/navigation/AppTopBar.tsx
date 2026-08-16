"use client";

import { Bell, MessageSquare, Search } from "lucide-react";
import { useEffect, useState } from "react";

type ClubPayload = { club?: { name?: string; league?: string }; career?: { managerName?: string } | null };

export function AppTopBar() {
  const [payload, setPayload] = useState<ClubPayload>({});

  useEffect(() => {
    let active = true;
    fetch("/api/club").then((response) => response.ok ? response.json() : null).then((data: ClubPayload | null) => { if (active && data) setPayload(data); }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  const club = payload.club?.name ?? "Your club";
  const league = payload.club?.league ?? "Competition";
  const coach = payload.career?.managerName ?? "Head coach";

  return <header className="sticky top-0 z-30 border-b border-surface-400/50 bg-surface-0/90 px-4 py-3 backdrop-blur-xl sm:px-6 lg:px-8"><div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4"><div className="flex min-w-0 items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-surface-400 bg-surface-100 text-[10px] font-bold text-accent-lime">CLUB</div><div className="min-w-0"><p className="truncate text-sm font-bold text-surface-950">{club}</p><p className="truncate text-[11px] text-surface-600">{coach} <span className="mx-1 text-accent-lime">•</span> {league}</p></div></div><div className="flex items-center gap-1 sm:gap-2"><button className="rounded-xl p-2 text-surface-700 transition hover:bg-surface-200 hover:text-surface-950" aria-label="Search"><Search className="h-5 w-5" /></button><button className="relative rounded-xl p-2 text-surface-700 transition hover:bg-surface-200 hover:text-surface-950" aria-label="Notifications"><Bell className="h-5 w-5" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-accent-lime" /></button><button className="hidden rounded-xl p-2 text-surface-700 transition hover:bg-surface-200 hover:text-surface-950 sm:block" aria-label="Messages"><MessageSquare className="h-5 w-5" /></button></div></div></header>;
}

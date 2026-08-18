"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, ChevronRight, CircleGauge, LayoutGrid, Shield, Trophy } from "lucide-react";

const links = [
  { href: "/", label: "Overview", icon: CircleGauge },
  { href: "/squad", label: "Squad", icon: Shield },
  { href: "/match", label: "Match", icon: Trophy },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="min-h-screen bg-[var(--paper)]"><aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[var(--line)] bg-[#ebe7dc] px-6 py-7 lg:block"><div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-sm font-black text-[var(--amber)]">RA</div><div><p className="text-sm font-black tracking-tight">Riverside Athletic</p><p className="eyebrow mt-1">Manager's office</p></div></div><div className="mt-14"><p className="eyebrow mb-4">Navigate</p><nav className="space-y-1">{links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition-colors ${pathname === href ? "bg-[var(--ink)] text-[var(--paper)]" : "text-[var(--muted)] hover:bg-[var(--paper)] hover:text-[var(--ink)]"}`}><Icon className="h-4 w-4" />{label}{pathname === href && <ChevronRight className="ml-auto h-4 w-4 text-[var(--amber)]" />}</Link>)}</nav></div><div className="absolute bottom-8 left-6 right-6 border-t border-[var(--line)] pt-5"><p className="eyebrow">Season 26/27</p><p className="mt-2 text-xs leading-5 text-[var(--muted)]">Build a team that can survive difficult Saturdays.</p></div></aside><main className="mx-auto min-h-screen max-w-6xl lg:ml-64">{children}</main><nav className="fixed inset-x-4 bottom-4 z-20 flex justify-around rounded-2xl border border-[var(--line)] bg-[rgba(251,250,246,.94)] p-2 shadow-xl backdrop-blur lg:hidden">{links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`flex min-w-16 flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-bold ${pathname === href ? "bg-[var(--ink)] text-[var(--paper)]" : "text-[var(--muted)]"}`}><Icon className="h-4 w-4" />{label}</Link>)}</nav></div>;
}

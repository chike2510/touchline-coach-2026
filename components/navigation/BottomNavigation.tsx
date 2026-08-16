"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { desktopNav, getMobileNav } from "./navigation-model";

type NavigationItemProps = { href: string; label: string; icon: typeof desktopNav[number]["icon"]; badge?: number; compact?: boolean };

function NavigationItem({ href, label, icon: Icon, badge, compact = false }: NavigationItemProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <button onClick={() => router.push(href)} className={cn("group relative flex items-center transition-colors", compact ? "w-full gap-3 rounded-xl px-3 py-2.5 text-left" : "min-w-[58px] flex-1 flex-col justify-center gap-1 py-2")} aria-current={isActive ? "page" : undefined}>
      {isActive && compact && <motion.span layoutId="desktop-nav-active" className="absolute inset-0 rounded-xl bg-accent-purple/15" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
      {isActive && !compact && <motion.span layoutId="mobile-nav-active" className="absolute left-1/2 top-0 h-0.5 w-8 -translate-x-1/2 rounded-full bg-accent-lime" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
      <span className={cn("relative flex items-center justify-center", isActive ? "text-accent-lime" : "text-surface-600 group-hover:text-surface-800")}>
        <Icon className={cn(compact ? "h-[18px] w-[18px]" : "h-5 w-5", isActive && "stroke-[2.2px]")} />
        {badge ? <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-purple px-1 text-[9px] font-bold text-white">{badge}</span> : null}
      </span>
      <span className={cn("relative truncate", compact ? "text-xs" : "text-[10px]", isActive ? "font-semibold text-accent-lime" : "text-surface-600")}>{label}</span>
    </button>
  );
}

export function DesktopNavigation() {
  return <aside className="fixed inset-y-0 left-0 z-40 hidden w-[224px] border-r border-surface-400/70 bg-surface-50/95 px-4 py-6 backdrop-blur-xl lg:block"><div className="flex h-full flex-col"><div className="mb-8 flex items-center gap-2 px-3"><span className="text-lg font-extrabold italic tracking-tight text-surface-950">TOUCHLINE <span className="text-accent-lime">26</span></span></div><div className="mb-5 flex items-center gap-3 rounded-2xl border border-surface-400 bg-surface-100 px-3 py-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-300 text-xs font-bold text-accent-lime">MU</div><div className="min-w-0"><p className="truncate text-sm font-semibold text-surface-950">MAN UTD</p><p className="truncate text-[10px] text-surface-600">Head Coach</p></div></div><nav className="custom-scrollbar flex-1 space-y-1 overflow-y-auto">{desktopNav.map((item) => <NavigationItem key={`${item.label}-${item.href}`} {...item} compact />)}</nav><div className="border-t border-surface-400/70 pt-3"><NavigationItem label="Settings" href="/more/settings" icon={desktopNav[14].icon} compact /></div></div></aside>;
}

export function BottomNavigation() {
  const pathname = usePathname();
  const items = getMobileNav(pathname);
  return <nav className="fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(var(--safe-bottom)+.5rem)] lg:hidden"><div className="mx-auto max-w-[860px] rounded-2xl border border-surface-400/80 bg-surface-50/95 px-2 shadow-2xl backdrop-blur-xl"><div className="flex min-h-[64px] items-stretch">{items.map((item) => <NavigationItem key={`${item.label}-${item.href}`} {...item} />)}</div></div></nav>;
}

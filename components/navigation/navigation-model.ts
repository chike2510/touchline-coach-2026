import type { LucideIcon } from "lucide-react";
import { BarChart3, CalendarDays, ClipboardList, Crosshair, Dumbbell, FileText, Home, Inbox, LayoutGrid, HeartPulse, MoreHorizontal, Search, Settings, Shield, Shuffle, Trophy, Users, WalletCards } from "lucide-react";

export type NavItem = { label: string; href: string; icon: LucideIcon; badge?: number };
export type NavContext = "home" | "squad" | "tactics" | "match" | "season" | "club" | "more";

export const desktopNav: NavItem[] = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Squad", href: "/squad", icon: Users },
  { label: "Tactics", href: "/tactics", icon: LayoutGrid },
  { label: "Staff", href: "/more/staff", icon: Users },
  { label: "Schedule", href: "/more/calendar", icon: CalendarDays },
  { label: "Scouting", href: "/more/scouting", icon: Search },
  { label: "Transfers", href: "/more/transfers", icon: Shuffle },
  { label: "Club Info", href: "/more/club", icon: Shield },
  { label: "Finances", href: "/more/club", icon: WalletCards },
  { label: "Training", href: "/more/training", icon: Dumbbell },
  { label: "Medical Centre", href: "/more/medical", icon: HeartPulse },
  { label: "Inbox", href: "/more/inbox", icon: Inbox, badge: 4 },
  { label: "Competitions", href: "/more/competitions", icon: Trophy },
  { label: "Analytics", href: "/more/analytics", icon: BarChart3 },
  { label: "Settings", href: "/more/settings", icon: Settings },
];

const mobileContexts: Record<NavContext, NavItem[]> = {
  home: [desktopNav[0], desktopNav[1], desktopNav[2], { label: "Season", href: "/more/calendar", icon: CalendarDays }, desktopNav[7]],
  squad: [desktopNav[0], desktopNav[1], desktopNav[2], { label: "Season", href: "/more/calendar", icon: CalendarDays }, { label: "More", href: "/more", icon: MoreHorizontal }],
  tactics: [desktopNav[0], desktopNav[1], desktopNav[2], { label: "Match", href: "/match", icon: Trophy }, { label: "More", href: "/more", icon: MoreHorizontal }],
  match: [desktopNav[0], desktopNav[2], { label: "Match", href: "/match", icon: Trophy }, desktopNav[6], desktopNav[11]],
  season: [desktopNav[0], { label: "Season", href: "/more/calendar", icon: CalendarDays }, desktopNav[12], desktopNav[11], { label: "More", href: "/more", icon: MoreHorizontal }],
  club: [desktopNav[0], desktopNav[1], desktopNav[7], desktopNav[12], { label: "More", href: "/more", icon: MoreHorizontal }],
  more: [desktopNav[0], desktopNav[1], desktopNav[2], { label: "Season", href: "/more/calendar", icon: CalendarDays }, { label: "More", href: "/more", icon: MoreHorizontal }],
};

export function getNavContext(pathname: string): NavContext {
  if (pathname === "/home" || pathname === "/") return "home";
  if (pathname.startsWith("/squad") || pathname.startsWith("/player")) return "squad";
  if (pathname.startsWith("/tactics")) return "tactics";
  if (pathname.startsWith("/match")) return "match";
  if (pathname.includes("calendar") || pathname.includes("competitions") || pathname.includes("analytics")) return "season";
  if (pathname.includes("club")) return "club";
  return "more";
}

export function getMobileNav(pathname: string) {
  return mobileContexts[getNavContext(pathname)];
}

export const utilityNav: NavItem[] = [
  { label: "Match Prep", href: "/match/prep", icon: ClipboardList },
  { label: "Inbox", href: "/more/inbox", icon: FileText },
  { label: "Tactical Lab", href: "/tactics/lab", icon: Crosshair },
];

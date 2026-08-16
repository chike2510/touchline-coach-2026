"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface HeaderProps { title: string; subtitle?: string; showBack?: boolean; showSearch?: boolean; showNotifications?: boolean; notificationCount?: number; rightAction?: ReactNode; className?: string; transparent?: boolean; }

export function Header({ title, subtitle, showBack = false, showSearch = false, showNotifications = false, notificationCount = 0, rightAction, className }: HeaderProps) {
  const router = useRouter();
  return <motion.header initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className={cn("px-4 pt-6 sm:px-6 lg:px-8 lg:pt-8", className)}><div className="mx-auto flex max-w-[1400px] items-end justify-between gap-4"><div className="flex min-w-0 items-center gap-3">{showBack && <button onClick={() => router.back()} className="rounded-xl border border-surface-400 p-2 text-surface-700 transition hover:border-surface-500 hover:text-surface-950" aria-label="Go back"><ArrowLeft className="h-4 w-4" /></button>}<div className="min-w-0"><h1 className="page-title truncate">{title}</h1>{subtitle && <p className="page-subtitle mt-2 truncate">{subtitle}</p>}</div></div><div className="flex items-center gap-1">{showSearch && <button className="rounded-xl p-2 text-surface-700 hover:bg-surface-200 hover:text-surface-950" aria-label="Search"><Search className="h-5 w-5" /></button>}{showNotifications && <button className="relative rounded-xl p-2 text-surface-700 hover:bg-surface-200 hover:text-surface-950" aria-label="Notifications"><Bell className="h-5 w-5" />{notificationCount > 0 && <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-purple px-1 text-[10px] font-bold text-white">{notificationCount}</span>}</button>}{rightAction}</div></div></motion.header>;
}

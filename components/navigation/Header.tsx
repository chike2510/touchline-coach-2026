"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  rightAction?: ReactNode;
  className?: string;
  transparent?: boolean;
}

export function Header({
  title,
  subtitle,
  showBack = false,
  showSearch = false,
  showNotifications = false,
  notificationCount = 0,
  rightAction,
  className,
  transparent = false,
}: HeaderProps) {
  const router = useRouter();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "sticky top-0 z-40 px-4 pt-[env(safe-area-inset-top,0px)]",
        transparent ? "bg-transparent" : "bg-surface-0/95 backdrop-blur-xl border-b border-surface-200/30",
        className
      )}
    >
      <div className="flex items-center justify-between h-14">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {showBack && (
            <button
              onClick={() => router.back()}
              className="p-2 -ml-2 rounded-xl hover:bg-surface-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-surface-400" />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-lg font-bold text-surface-950 truncate">{title}</h1>
            {subtitle && <p className="text-xs text-surface-600">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showSearch && (
            <button className="p-2 rounded-xl hover:bg-surface-100 transition-colors">
              <Search className="w-5 h-5 text-surface-400" />
            </button>
          )}
          {showNotifications && (
            <button className="relative p-2 rounded-xl hover:bg-surface-100 transition-colors">
              <Bell className="w-5 h-5 text-surface-400" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-pitch-500 text-surface-0 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          )}
          {rightAction}
        </div>
      </div>
    </motion.header>
  );
}

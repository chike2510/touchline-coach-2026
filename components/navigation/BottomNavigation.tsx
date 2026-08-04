"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, LayoutGrid, Trophy, MoreHorizontal } from "lucide-react";

const navItems = [
  { label: "Home", icon: Home, href: "/home" },
  { label: "Squad", icon: Users, href: "/squad" },
  { label: "Tactics", icon: LayoutGrid, href: "/tactics" },
  { label: "Match", icon: Trophy, href: "/match" },
  { label: "More", icon: MoreHorizontal, href: "/more" },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-[430px]">
        <div className="glass-strong border-t border-surface-200/50 px-2 pb-[env(safe-area-inset-bottom,0px)]">
          <div className="flex items-center justify-around h-16">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className={cn(
                    "relative flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors",
                    isActive ? "text-pitch-400" : "text-surface-600 hover:text-surface-400"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="bottom-nav-indicator"
                      className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-pitch-500 rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <item.icon className={cn("w-5 h-5", isActive && "stroke-[2.5px]")} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

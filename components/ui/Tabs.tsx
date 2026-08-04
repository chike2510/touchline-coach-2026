"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

export function Tabs({ tabs, defaultTab, className }: TabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex gap-1 border-b border-surface-200 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors",
              active === tab.id ? "text-pitch-400" : "text-surface-600 hover:text-surface-400"
            )}
          >
            {active === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-pitch-500"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="pt-4"
      >
        {tabs.find((t) => t.id === active)?.content}
      </motion.div>
    </div>
  );
}

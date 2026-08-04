"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import type { InboxMessage } from "@/types";

interface NotificationCardProps {
  message: InboxMessage;
  active?: boolean;
  onClick?: () => void;
}

const typeDot: Record<string, string> = {
  info: "text-accent-blue", success: "text-pitch-400", warning: "text-accent-amber", danger: "text-accent-red",
};

export function NotificationCard({ message, active, onClick }: NotificationCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full text-left px-4 py-3 border-l-2 transition-colors",
        active ? "bg-surface-200/60 border-pitch-500" : "border-transparent hover:bg-surface-100"
      )}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-semibold text-surface-400">{message.from}</span>
        <span className="text-2xs text-surface-600">{message.timeLabel}</span>
      </div>
      <div className="flex items-start gap-1.5">
        {!message.read && <Circle className={cn("w-1.5 h-1.5 mt-1.5 fill-current shrink-0", typeDot[message.type])} />}
        <p className={cn("text-sm leading-snug", message.read ? "text-surface-600" : "text-surface-950 font-semibold")}>
          {message.subject}
        </p>
      </div>
      <span className="text-2xs text-pitch-500 mt-1 inline-block">{message.categoryLabel}</span>
    </motion.button>
  );
}

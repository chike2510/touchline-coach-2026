"use client";

import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("flex flex-col items-center justify-center text-center py-12 px-6", className)}
    >
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-surface-200 flex items-center justify-center mb-4 text-surface-500">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-surface-400 mb-1">{title}</h3>
      {description && <p className="text-sm text-surface-600 max-w-xs">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  );
}

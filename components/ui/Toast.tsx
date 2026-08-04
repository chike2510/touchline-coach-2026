"use client";

import { useAppStore } from "@/store";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";

export function Toast() {
  const { toast, hideToast } = useAppStore();

  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(hideToast, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.open, hideToast]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-pitch-400" />,
    error: <XCircle className="w-5 h-5 text-accent-red" />,
    warning: <AlertCircle className="w-5 h-5 text-accent-amber" />,
    info: <Info className="w-5 h-5 text-accent-blue" />,
  };

  return (
    <AnimatePresence>
      {toast.open && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className={cn(
            "fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl shadow-elevated",
            "bg-surface-100 border border-surface-200 backdrop-blur-xl"
          )}
        >
          {icons[toast.type]}
          <span className="text-sm font-medium text-surface-900">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

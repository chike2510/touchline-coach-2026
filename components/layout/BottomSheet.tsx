"use client";

import { cn } from "@/utils/cn";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode, useEffect } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  height?: "sm" | "md" | "lg" | "full";
  className?: string;
}

export function BottomSheet({ isOpen, onClose, title, children, height = "md", className }: BottomSheetProps) {
  const heights = {
    sm: "max-h-[40vh]",
    md: "max-h-[60vh]",
    lg: "max-h-[80vh]",
    full: "max-h-[92vh]",
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "relative w-full max-w-[430px] bg-surface-100 rounded-t-3xl overflow-hidden",
              heights[height],
              className
            )}
          >
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <div className="w-12 h-1 rounded-full bg-surface-300 mx-auto absolute top-3 left-1/2 -translate-x-1/2" />
              {title && <h2 className="text-base font-bold text-surface-950 mt-2">{title}</h2>}
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-surface-200 transition-colors ml-auto mt-1"
              >
                <X className="w-5 h-5 text-surface-500" />
              </button>
            </div>
            <div className="overflow-y-auto scrollbar-hide px-5 pb-8">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

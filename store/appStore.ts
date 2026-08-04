"use client";

import { create } from "zustand";
import type { ScreenName } from "@/types";

interface AppStore {
  currentScreen: ScreenName;
  previousScreen: ScreenName | null;
  bottomSheetOpen: boolean;
  bottomSheetTitle: string;
  toast: { open: boolean; message: string; type: "success" | "error" | "info" | "warning" };
  notifications: number;
  setScreen: (screen: ScreenName) => void;
  goBack: () => void;
  openBottomSheet: (title?: string) => void;
  closeBottomSheet: () => void;
  showToast: (message: string, type?: "success" | "error" | "info" | "warning") => void;
  hideToast: () => void;
  setNotifications: (count: number) => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  currentScreen: "home",
  previousScreen: null,
  bottomSheetOpen: false,
  bottomSheetTitle: "",
  toast: { open: false, message: "", type: "info" },
  notifications: 3,

  setScreen: (screen) =>
    set((state) => ({
      previousScreen: state.currentScreen,
      currentScreen: screen,
    })),

  goBack: () =>
    set((state) => ({
      currentScreen: state.previousScreen ?? "home",
      previousScreen: null,
    })),

  openBottomSheet: (title) => set({ bottomSheetOpen: true, bottomSheetTitle: title ?? "" }),
  closeBottomSheet: () => set({ bottomSheetOpen: false, bottomSheetTitle: "" }),

  showToast: (message, type = "info") =>
    set({ toast: { open: true, message, type } }),
  hideToast: () =>
    set({ toast: { open: false, message: "", type: "info" } }),

  setNotifications: (count) => set({ notifications: count }),
}));

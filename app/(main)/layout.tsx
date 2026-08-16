"use client";

import { BottomNavigation, DesktopNavigation } from "@/components/navigation/BottomNavigation";
import { AppTopBar } from "@/components/navigation/AppTopBar";
import { Toast } from "@/components/ui/Toast";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <div className="app-canvas"><DesktopNavigation /><div className="shell-main"><AppTopBar /><main className="pb-24 lg:pb-10">{children}</main></div><Toast /><BottomNavigation /></div>;
}
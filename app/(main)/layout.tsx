"use client";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { Toast } from "@/components/ui/Toast";
export default function MainLayout({children}:{children:React.ReactNode}){return <div className="pb-20">{children}<Toast/><BottomNavigation/></div>}
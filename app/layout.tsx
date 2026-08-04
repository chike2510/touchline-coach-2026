import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Touchline 26",description:"Real Coach. Real Decisions."};
export default function RootLayout({children}:{children:React.ReactNode}){return(<html lang="en"><body className="bg-black text-neutral-100 antialiased"><div className="mx-auto max-w-[430px] min-h-screen bg-surface-0 relative shadow-2xl">{children}</div></body></html>);}
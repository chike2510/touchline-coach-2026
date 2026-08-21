"use client";
import Link from "next/link"; import { usePathname } from "next/navigation"; import { CalendarDays, CircleGauge, Coins, Dumbbell, HeartPulse, Inbox, LayoutGrid, Radar, Shield, Stethoscope, Trophy, Users, WalletCards, Wrench } from "lucide-react";
const nav=[
 {href:"/",label:"Inbox",short:"IN",icon:Inbox},
 {href:"/squad",label:"Squad",short:"SQ",icon:Users},
 {href:"/tactics",label:"Tactics",short:"TX",icon:LayoutGrid},
 {href:"/training",label:"Training",short:"TR",icon:Dumbbell},
 {href:"/match",label:"Matchday",short:"MD",icon:Trophy},
 {href:"/development",label:"Development",short:"DV",icon:Wrench},
 {href:"/medical",label:"Medical",short:"MC",icon:Stethoscope},
 {href:"/scouting",label:"Scouting",short:"SC",icon:Radar},
 {href:"/transfers",label:"Transfers",short:"TM",icon:WalletCards},
 {href:"/staff",label:"Staff",short:"ST",icon:HeartPulse},
 {href:"/calendar",label:"Schedule",short:"CA",icon:CalendarDays},
 {href:"/competitions",label:"Competitions",short:"CO",icon:CircleGauge},
 {href:"/club",label:"Club",short:"CL",icon:Shield},
 {href:"/finances",label:"Finances",short:"FN",icon:Coins},
];
export function Shell({children}:{children:React.ReactNode}){const path=usePathname();const locked=path==="/match";return <div className={`workstation ${locked?"match-locked":""}`}>
 {!locked&&<aside className="workstation-rail"><div className="club-mark">RA</div><div className="club-identity"><strong>Riverside Athletic</strong><span>Manager career · 12</span></div><div className="rail-divider"/><p className="rail-label">Departments</p><nav className="rail-nav">{nav.map(({href,label,short,icon:Icon})=><Link key={href} href={href} className={`rail-link ${path===href?"active":""}`}><Icon className="h-4 w-4"/><span className="rail-short">{short}</span><span className="rail-text">{label}</span></Link>)}</nav><div className="rail-foot"><span className="pulse-dot"/> National League One · 5th</div></aside>}
 <main className={`workstation-main ${locked?"main-locked":""}`}><header className="workstation-topbar"><div className="topbar-title"><span className="topbar-kicker">TOUCHLINE 26</span><span className="topbar-context">{locked?"LIVE MATCHROOM":"RIVERSIDE ATHLETIC · MANAGER CENTRE"}</span></div><div className="topbar-meta"><span>Sat 26 Apr · 10:00</span><span className="manager-chip">AM</span></div></header>{children}</main></div>}
export { nav };

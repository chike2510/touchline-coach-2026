"use client";

import { Header } from "@/components/navigation/Header";
import { Card } from "@/components/ui/Card";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { motion } from "framer-motion";
import { ChevronRight, HelpCircle, Shield, FileText } from "lucide-react";
import { useState } from "react";

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${checked ? "bg-pitch-500" : "bg-surface-300"}`}
      aria-pressed={checked}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
        style={{ left: checked ? "22px" : "2px" }}
      />
    </button>
  );
}

function Row({ label, description, control }: { label: string; description?: string; control: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="pr-3 min-w-0">
        <p className="text-xs font-semibold text-surface-300">{label}</p>
        {description && <p className="text-2xs text-surface-600">{description}</p>}
      </div>
      {control}
    </div>
  );
}

function SelectRow({ label, description, value }: { label: string; description?: string; value: string }) {
  return (
    <Row
      label={label}
      description={description}
      control={
        <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-200 text-2xs font-semibold text-surface-400">
          {value} <ChevronRight className="w-3 h-3 rotate-90" />
        </button>
      }
    />
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState("general");
  const [notif, setNotif] = useState({ results: true, transfers: true, injuries: true, reports: true, board: true, marketing: false, news: false });
  const [audio, setAudio] = useState({ commentary: true, music: false, vibration: false });
  const [save, setSave] = useState({ autoSave: true, cloudSave: true });
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");

  const tabs = [
    { label: "General", value: "general" }, { label: "Match", value: "match" },
    { label: "Display", value: "display" }, { label: "Data", value: "data" },
  ];

  return (
    <div>
      <Header title="SETTINGS" subtitle="Customize your experience" showBack />

      <div className="px-4 py-4 space-y-4">
        <Card className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-surface-200 flex items-center justify-center text-xl font-bold text-surface-500">AU</div>
          <div className="flex-1">
            <p className="text-base font-bold text-surface-300">Auracle</p>
            <p className="text-2xs text-surface-600">Manchester United Manager</p>
            <p className="text-2xs text-surface-600 mt-0.5">Manager Since 1 Jul 2025</p>
          </div>
        </Card>

        <SegmentedControl options={tabs} value={tab} onChange={setTab} />

        {tab === "general" && (
          <>
            <Card>
              <h3 className="text-xs font-bold text-surface-500 uppercase tracking-wide mb-1">Game Difficulty</h3>
              <SelectRow label="AI Difficulty" value="World Class" />
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xs text-surface-600">AI Competitiveness</span>
                  <span className="text-2xs font-bold text-surface-400">75%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-surface-300 overflow-hidden">
                  <div className="h-full bg-pitch-500" style={{ width: "75%" }} />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xs font-bold text-surface-500 uppercase tracking-wide mb-1">Gameplay Settings</h3>
              <div className="divide-y divide-surface-200/40">
                <SelectRow label="Match Engine" value="Advanced" />
                <SelectRow label="Match Speed" value="Normal" />
                <SelectRow label="Substitutions" value="Manual" />
                <SelectRow label="Injuries" value="Realistic" />
                <SelectRow label="Player Development" value="Realistic" />
                <SelectRow label="Transfer Window" value="Realistic" />
                <SelectRow label="Contract Negotiations" value="Manual" />
              </div>
            </Card>
          </>
        )}

        {tab === "match" && (
          <Card>
            <h3 className="text-xs font-bold text-surface-500 uppercase tracking-wide mb-1">Notifications</h3>
            <div className="divide-y divide-surface-200/40">
              <Row label="Match Results" description="Get notified about match results." control={<Toggle checked={notif.results} onChange={(v) => setNotif((n) => ({ ...n, results: v }))} />} />
              <Row label="Transfers" description="Get notified about transfers and loans." control={<Toggle checked={notif.transfers} onChange={(v) => setNotif((n) => ({ ...n, transfers: v }))} />} />
              <Row label="Injuries" description="Get notified about player injuries." control={<Toggle checked={notif.injuries} onChange={(v) => setNotif((n) => ({ ...n, injuries: v }))} />} />
              <Row label="Team Reports" description="Receive weekly team reports." control={<Toggle checked={notif.reports} onChange={(v) => setNotif((n) => ({ ...n, reports: v }))} />} />
              <Row label="Board Messages" description="Receive important board updates." control={<Toggle checked={notif.board} onChange={(v) => setNotif((n) => ({ ...n, board: v }))} />} />
              <Row label="Marketing" description="Receive marketing and sponsorship updates." control={<Toggle checked={notif.marketing} onChange={(v) => setNotif((n) => ({ ...n, marketing: v }))} />} />
              <Row label="News & Media" description="Receive news and media updates." control={<Toggle checked={notif.news} onChange={(v) => setNotif((n) => ({ ...n, news: v }))} />} />
            </div>
          </Card>
        )}

        {tab === "display" && (
          <>
            <Card>
              <h3 className="text-xs font-bold text-surface-500 uppercase tracking-wide mb-2">Theme</h3>
              <div className="flex gap-2">
                {(["dark", "light", "system"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex-1 py-2.5 rounded-xl text-2xs font-bold capitalize border transition-colors ${
                      theme === t ? "bg-pitch-500/15 text-pitch-400 border-pitch-500/30" : "bg-surface-200 text-surface-600 border-transparent"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </Card>
            <Card>
              <SelectRow label="Language" value="English" />
              <SelectRow label="Data View" description="Choose how information is displayed." value="Detailed" />
            </Card>
            <Card>
              <h3 className="text-xs font-bold text-surface-500 uppercase tracking-wide mb-1">Audio &amp; Controls</h3>
              <div className="divide-y divide-surface-200/40">
                <Row label="Commentary" description="Enable match commentary." control={<Toggle checked={audio.commentary} onChange={(v) => setAudio((a) => ({ ...a, commentary: v }))} />} />
                <Row label="Music" description="Play background music." control={<Toggle checked={audio.music} onChange={(v) => setAudio((a) => ({ ...a, music: v }))} />} />
                <Row label="Vibration" description="Enable vibration feedback." control={<Toggle checked={audio.vibration} onChange={(v) => setAudio((a) => ({ ...a, vibration: v }))} />} />
              </div>
            </Card>
          </>
        )}

        {tab === "data" && (
          <>
            <Card>
              <h3 className="text-xs font-bold text-surface-500 uppercase tracking-wide mb-1">Save &amp; Data</h3>
              <div className="divide-y divide-surface-200/40">
                <Row label="Auto Save" description="Automatically save your progress." control={<Toggle checked={save.autoSave} onChange={(v) => setSave((s) => ({ ...s, autoSave: v }))} />} />
                <Row label="Cloud Save" description="Save your progress to the cloud." control={<Toggle checked={save.cloudSave} onChange={(v) => setSave((s) => ({ ...s, cloudSave: v }))} />} />
                <SelectRow label="Backup Saves" value="Manage" />
              </div>
              <button className="w-full mt-3 py-2.5 rounded-xl border border-accent-red/30 text-accent-red text-xs font-bold">Reset All Data</button>
            </Card>
            <Card padding="none">
              {[
                { icon: HelpCircle, label: "Help & Support" },
                { icon: Shield, label: "Privacy Policy" },
                { icon: FileText, label: "Terms of Service" },
              ].map((item, i) => (
                <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-surface-200/40" : ""}`}>
                  <item.icon className="w-4 h-4 text-surface-500" />
                  <span className="text-xs font-medium text-surface-300 flex-1 text-left">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-surface-600" />
                </button>
              ))}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

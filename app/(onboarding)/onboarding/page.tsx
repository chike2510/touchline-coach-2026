"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Shield, Sparkles, Users, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

const philosophies = [
  { id: "development", title: "Develop the next generation", detail: "Build a culture where young players earn their place.", icon: Users },
  { id: "winning", title: "Compete for everything", detail: "Set demanding standards and make every match matter.", icon: Zap },
  { id: "identity", title: "Create an unmistakable identity", detail: "Make your principles visible in every phase of play.", icon: Sparkles },
];
const tactics = ["Possession & control", "Vertical transitions", "High press", "Compact counter-attack"];
const difficulties = ["Rookie", "Pro", "Master"] as const;
const clubs = ["Manchester United", "Arsenal", "Newcastle United"];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [managerName, setManagerName] = useState("");
  const [philosophy, setPhilosophy] = useState("");
  const [tacticalIdentity, setTacticalIdentity] = useState("");
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number] | "">("");
  const [clubId, setClubId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const canContinue = useMemo(() => {
    if (step === 0) return managerName.trim().length >= 2;
    if (step === 1) return Boolean(philosophy);
    if (step === 2) return Boolean(tacticalIdentity);
    if (step === 3) return Boolean(difficulty);
    return Boolean(clubId);
  }, [clubId, difficulty, managerName, philosophy, step, tacticalIdentity]);

  async function finish() {
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/onboarding", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ managerName, philosophy, tacticalIdentity, difficulty, clubId, leagueId: "premier-league" }) });
      if (!response.ok) throw new Error("We could not save your career yet.");
      router.push("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not save your career yet.");
    } finally { setSaving(false); }
  }

  function next() { if (step === 4) void finish(); else setStep((current) => current + 1); }
  function back() { if (step === 0) router.push("/"); else setStep((current) => current - 1); }

  return (
    <main className="min-h-screen px-5 py-6 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[520px] flex-col">
        <header className="flex items-center justify-between">
          <button onClick={back} className="touch-active rounded-2xl border border-surface-200 px-3 py-2 text-surface-400" aria-label="Go back"><ArrowLeft className="h-4 w-4" /></button>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-pitch-400"><Shield className="h-4 w-4" /> Touchline 26</div>
          <span className="text-xs text-surface-600">{step + 1} / 5</span>
        </header>

        <div className="mt-8 flex gap-1.5" aria-label="Onboarding progress">{Array.from({ length: 5 }).map((_, index) => <div key={index} className={`h-1 flex-1 rounded-full transition-colors ${index <= step ? "bg-pitch-500" : "bg-surface-200"}`} />)}</div>

        <section className="flex flex-1 flex-col justify-center py-10">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.2 }}>
              {step === 0 && <div><p className="eyebrow">Create your career</p><h1 className="mt-3 text-4xl font-semibold tracking-tight text-surface-950">Your touchline<br /><span className="text-pitch-400">starts here.</span></h1><p className="mt-4 max-w-sm text-sm leading-6 text-surface-500">A modern coaching simulation built around the decisions only you can make.</p><label className="mt-10 block text-xs font-semibold uppercase tracking-wider text-surface-500" htmlFor="manager-name">Manager name</label><input id="manager-name" autoFocus value={managerName} onChange={(event) => setManagerName(event.target.value)} placeholder="e.g. Alex Ferguson" className="mt-2 w-full rounded-2xl border border-surface-200 bg-surface-100 px-4 py-4 text-base text-surface-950 outline-none transition focus:border-pitch-500" /></div>}
              {step === 1 && <div><p className="eyebrow">Your philosophy</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-surface-950">What will your club<br /><span className="text-pitch-400">stand for?</span></h1><div className="mt-8 space-y-3">{philosophies.map(({ id, title, detail, icon: Icon }) => <button key={id} onClick={() => setPhilosophy(id)} className={`w-full rounded-2xl border p-4 text-left transition ${philosophy === id ? "border-pitch-500 bg-pitch-500/10" : "border-surface-200 bg-surface-100 hover:border-surface-300"}`}><div className="flex items-start gap-3"><span className={`rounded-xl p-2 ${philosophy === id ? "bg-pitch-500 text-surface-0" : "bg-surface-200 text-pitch-400"}`}><Icon className="h-5 w-5" /></span><span><span className="block text-sm font-semibold text-surface-950">{title}</span><span className="mt-1 block text-xs leading-5 text-surface-500">{detail}</span></span>{philosophy === id && <Check className="ml-auto h-5 w-5 text-pitch-400" />}</div></button>)}</div></div>}
              {step === 2 && <div><p className="eyebrow">Tactical DNA</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-surface-950">How should your<br /><span className="text-pitch-400">team feel?</span></h1><div className="mt-8 grid grid-cols-2 gap-3">{tactics.map((item) => <button key={item} onClick={() => setTacticalIdentity(item)} className={`min-h-28 rounded-2xl border p-4 text-left text-sm font-semibold transition ${tacticalIdentity === item ? "border-pitch-500 bg-pitch-500/10 text-pitch-300" : "border-surface-200 bg-surface-100 text-surface-300"}`}>{item}{tacticalIdentity === item && <Check className="mt-3 h-4 w-4 text-pitch-400" />}</button>)}</div></div>}
              {step === 3 && <div><p className="eyebrow">Choose your challenge</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-surface-950">How much pressure<br /><span className="text-pitch-400">do you want?</span></h1><div className="mt-8 space-y-3">{difficulties.map((item, index) => <button key={item} onClick={() => setDifficulty(item)} className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${difficulty === item ? "border-pitch-500 bg-pitch-500/10" : "border-surface-200 bg-surface-100"}`}><span><span className="block text-base font-semibold text-surface-950">{item}</span><span className="mt-1 block text-xs text-surface-500">{["Learn the rhythm of management.", "Every decision has a consequence.", "Only the complete coach survives."][index]}</span></span><span className="text-xs text-surface-600">0{index + 1}</span></button>)}</div></div>}
              {step === 4 && <div><p className="eyebrow">Choose your club</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-surface-950">Where will you<br /><span className="text-pitch-400">make history?</span></h1><div className="mt-8 space-y-3">{clubs.map((club, index) => <button key={club} onClick={() => setClubId(club.toLowerCase().replaceAll(" ", "-"))} className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${clubId === club.toLowerCase().replaceAll(" ", "-") ? "border-pitch-500 bg-pitch-500/10" : "border-surface-200 bg-surface-100"}`}><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-200 text-sm font-bold text-pitch-400">{["MU", "A", "NU"][index]}</span><span><span className="block text-sm font-semibold text-surface-950">{club}</span><span className="mt-1 block text-xs text-surface-500">Premier League · England</span></span>{clubId === club.toLowerCase().replaceAll(" ", "-") && <Check className="ml-auto h-5 w-5 text-pitch-400" />}</button>)}</div>{error && <p className="mt-4 text-sm text-red-400">{error}</p>}</div>}
            </motion.div>
          </AnimatePresence>
        </section>

        <footer className="flex items-center justify-between gap-4 border-t border-surface-200/70 pt-5"><p className="text-xs text-surface-600">You can refine your profile later.</p><button onClick={next} disabled={!canContinue || saving} className="touch-active flex items-center gap-2 rounded-2xl bg-pitch-500 px-5 py-3 text-sm font-bold text-surface-0 transition hover:bg-pitch-400 disabled:cursor-not-allowed disabled:opacity-40">{saving ? "Saving..." : step === 4 ? "Enter the club" : "Continue"}<ArrowRight className="h-4 w-4" /></button></footer>
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

type Config = { ok: number; reviewMin: number; penaltyBlaming: number; penaltySensitive: number; version: string };

const DEFAULT_CONFIG: Config = { ok: 80, reviewMin: 65, penaltyBlaming: 30, penaltySensitive: 50, version: "1.0" };

export default function AdminPage() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [saved, setSaved] = useState<string>("");

  useEffect(() => {
    const raw = window.localStorage.getItem("qc-config");
    if (raw) setConfig(JSON.parse(raw));
  }, []);

  function save() {
    const newCfg = { ...config, version: (parseFloat(config.version) + 0.1).toFixed(1) } as Config;
    window.localStorage.setItem("qc-config", JSON.stringify(newCfg));
    setConfig(newCfg);
    setSaved(`Saved v${newCfg.version} @ ${new Date().toLocaleTimeString()}`);
  }

  return (
    <div className="max-w-xl space-y-3">
      <div className="text-lg font-semibold">Admin • Scoring & Thresholds</div>
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 space-y-3">
        <Field label="OK threshold (≥)" value={config.ok} onChange={(v) => setConfig((c) => ({ ...c, ok: v }))} />
        <Field label="Review min" value={config.reviewMin} onChange={(v) => setConfig((c) => ({ ...c, reviewMin: v }))} />
        <Field label="Penalty: Blaming" value={config.penaltyBlaming} onChange={(v) => setConfig((c) => ({ ...c, penaltyBlaming: v }))} />
        <Field label="Penalty: Sensitive validation fail" value={config.penaltySensitive} onChange={(v) => setConfig((c) => ({ ...c, penaltySensitive: v }))} />
        <div className="text-xs text-neutral-500">Current version: v{config.version}</div>
        <div className="flex gap-2">
          <button onClick={save} className="h-9 px-3 rounded-md border border-neutral-300 dark:border-neutral-700">Save (bump version)</button>
          {saved ? <div className="text-xs text-emerald-600">{saved}</div> : null}
        </div>
      </div>
      <div className="text-sm text-neutral-500">Evaluations will display the config version used (prototype uses latest from localStorage).</div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <label className="block">
      <div className="text-sm mb-1">{label}</div>
      <input type="number" className="h-9 w-40 px-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80" value={value} onChange={(e) => onChange(parseFloat(e.target.value))} />
    </label>
  );
}



"use client";

import { use, useEffect, useMemo, useState } from "react";
import { DiffViewer } from "@/components/DiffViewer";
import { useToast } from "@/components/ToastProvider";

type Params = { params: Promise<{ id: string }> };

type Param = { key: string; name: string; weight: number; result: "Pass" | "Partial" | "Fail"; notes: string };

export default function ConversationPage({ params }: Params) {
  const { id } = use(params);
  const [paramsState, setParamsState] = useState<Param[]>(PARAMS);
  const [penalties, setPenalties] = useState<{ blaming: boolean; sensitive: boolean }>({ blaming: true, sensitive: false });
  const [overrides, setOverrides] = useState<string[]>(["EVIDENCE_MISSING"]);
  const [audit, setAudit] = useState<string[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const [config, setConfig] = useState<{ ok: number; reviewMin: number; penaltyBlaming: number; penaltySensitive: number; version: string } | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    // Load config from localStorage if set by Admin, else defaults
    const raw = window.localStorage.getItem("qc-config");
    if (raw) setConfig(JSON.parse(raw));
    else setConfig(DEFAULT_CONFIG);
  }, []);

  const scoring = useMemo(() => {
    const raw = paramsState.reduce((sum, p) => {
      const pass = p.result === "Pass" ? 1 : p.result === "Partial" ? 0.5 : 0;
      return sum + p.weight * pass;
    }, 0);
    const score100 = Math.round((raw * 100) / 83);
    let status: "OK" | "Review" | "Not OK" = score100 >= (config?.ok ?? 80) ? "OK" : score100 >= (config?.reviewMin ?? 65) ? "Review" : "Not OK";
    // Overrides force Not OK
    if (overrides.includes("EVIDENCE_MISSING") || overrides.includes("CRITICAL_CONTRAD") || overrides.includes("VALIDASI_SENSITIF_FAIL")) {
      status = "Not OK";
    }
    // Penalties affect display score only (prototype)
    const penalty = (penalties.blaming ? (config?.penaltyBlaming ?? 30) : 0) + (penalties.sensitive ? (config?.penaltySensitive ?? 50) : 0);
    const finalScore = Math.max(0, score100 - penalty);
    return { raw, score100, penalty, finalScore, status };
  }, [paramsState, penalties, overrides, config]);

  function updateParamResult(key: string, result: Param["result"]) {
    setParamsState((prev) => prev.map((p) => (p.key === key ? { ...p, result } : p)));
    setAudit((a) => [
      `Param ${key} set to ${result} @ ${currentTime}`,
      ...a,
    ]);
  }

  function togglePenalty(kind: "blaming" | "sensitive") {
    setPenalties((p) => ({ ...p, [kind]: !p[kind] }));
    setAudit((a) => [
      `Penalty ${kind} toggled @ ${currentTime}`,
      ...a,
    ]);
  }

  function toggleOverride(tag: string) {
    setOverrides((o) => (o.includes(tag) ? o.filter((t) => t !== tag) : [...o, tag]));
    setAudit((a) => [
      `Override ${tag} toggled @ ${currentTime}`,
      ...a,
    ]);
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
      <div className="xl:col-span-1 space-y-3">
        <Header id={id} />
        <Panel title="Transcript">
          <div className="space-y-2 text-sm">
            {TRANSCRIPT.map((t) => (
              <div key={t.turn} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
                <div className="text-xs text-neutral-500 mb-1">Turn {t.turn} • {t.speaker}</div>
                <div>{t.text}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div className="xl:col-span-1 space-y-3">
        <Panel title="Rubric & Scoring">
          <div className="space-y-3">
            {paramsState.map((p) => (
              <div key={p.key} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{p.name} <span className="text-xs text-neutral-500">(w {p.weight})</span></div>
                  <select className="h-8 px-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-sm" value={p.result} onChange={(e) => updateParamResult(p.key, e.target.value as Param["result"]) } aria-label={`${p.name} result`}>
                    <option>Pass</option>
                    <option>Partial</option>
                    <option>Fail</option>
                  </select>
                </div>
                <div className="mt-2">
                  <label className="text-xs text-neutral-500">Notes</label>
                  <textarea className="mt-1 w-full min-h-16 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm p-2" defaultValue={p.notes} />
                </div>
              </div>
            ))}
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
              <div className="font-medium mb-2">Penalties</div>
              <div className="flex flex-wrap gap-3">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={penalties.blaming} onChange={() => togglePenalty("blaming")} /> Blaming −{config?.penaltyBlaming ?? 30}
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={penalties.sensitive} onChange={() => togglePenalty("sensitive")} /> Sensitive validation fail −{config?.penaltySensitive ?? 50}
                </label>
              </div>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
              <div className="font-medium mb-2">Overrides</div>
              <div className="flex flex-wrap gap-3 text-sm">
                {OVERRIDE_TAGS.map((t) => (
                  <label key={t} className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={overrides.includes(t)} onChange={() => toggleOverride(t)} /> {t}
                  </label>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3 bg-white dark:bg-neutral-950">
              <div className="text-sm text-neutral-500">Formula: Raw = Σ(weight × pass) → Score_100 = Raw × 100 / 83</div>
              <div className="mt-1 text-lg flex items-center gap-2">Score: {scoring.finalScore} • <StatusBadge status={scoring.status} /> <span className="text-xs text-neutral-500">(raw {scoring.score100} − penalty {scoring.penalty})</span></div>
              <div className="text-xs text-neutral-500 mt-1">Config v{config?.version ?? DEFAULT_CONFIG.version} • OK ≥ {config?.ok ?? 80} • Review {config?.reviewMin ?? 65}–{(config?.ok ?? 80) - 1}</div>
            </div>
          </div>
        </Panel>
      </div>
      <div className="xl:col-span-1 space-y-3">
        <Panel title="Evidence & KB">
          <div className="space-y-2 text-sm">
            {EVIDENCE.map((e) => (
              <div key={e.kb_chunk_id} className="rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
                <div className="text-xs text-neutral-500 mb-1">Turn {e.turn_index} • {e.doc_type} • {e.doc}</div>
                <div className="mb-2">{e.snippet}</div>
                <div className="text-xs text-neutral-500">kb_chunk_id: {e.kb_chunk_id} • conf {e.confidence}</div>
                <div className="mt-3">
                  <DiffViewer left={TRANSCRIPT.find(t => t.turn === e.turn_index)?.text || ""} right={e.snippet} />
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="Audit trail">
          <ul className="text-xs space-y-1">
            {audit.length === 0 ? <li className="text-neutral-500">No changes yet</li> : audit.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Header({ id }: { id: string }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-950">
      <div className="text-sm text-neutral-500">Case {id} • Bot Billing • Model v2.3</div>
      <div className="mt-2 flex flex-wrap gap-2">
        <button className="h-8 px-3 rounded-md border border-neutral-300 dark:border-neutral-700">Escalate</button>
        <button className="h-8 px-3 rounded-md border border-neutral-300 dark:border-neutral-700">Re-evaluate</button>
        <button className="h-8 px-3 rounded-md border border-neutral-300 dark:border-neutral-700">Export</button>
        <button className="h-8 px-3 rounded-md border border-neutral-300 dark:border-neutral-700">Mark Reviewed</button>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800">
      <div className="h-10 px-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center text-sm text-neutral-600">{title}</div>
      <div className="p-3">{children}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: "OK" | "Review" | "Not OK" }) {
  const map: Record<string, string> = {
    OK: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-900",
    Review: "bg-amber-100 text-amber-900 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-900",
    "Not OK": "bg-rose-100 text-rose-900 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-900",
  };
  return <span className={`inline-flex items-center h-6 px-2 rounded-full border text-xs ${map[status]}`}>{status}</span>;
}

const TRANSCRIPT = [
  { turn: 1, speaker: "User", text: "Hi, I want a refund for last month." },
  { turn: 2, speaker: "Bot", text: "Sure, our policy allows refunds within 7 days of billing." },
  { turn: 3, speaker: "User", text: "It was 14 days ago." },
];

const PARAMS: Param[] = [
  { key: "pp_accuracy", name: "Accuracy of P&P", weight: 10, result: "Fail" as const, notes: "Promised refund policy not in KB." },
  { key: "compliance", name: "Compliance", weight: 8, result: "Pass" as const, notes: "" },
];

const EVIDENCE = [
  { turn_index: 2, kb_chunk_id: "KB123", doc: "Refund Policy v1.2", doc_type: "Procedure", confidence: 0.82, snippet: "Refunds are permitted within 7 days of the billing date..." },
];

const DEFAULT_CONFIG = { ok: 80, reviewMin: 65, penaltyBlaming: 30, penaltySensitive: 50, version: "1.0" };
const OVERRIDE_TAGS = ["EVIDENCE_MISSING", "CRITICAL_CONTRAD", "VALIDASI_SENSITIF_FAIL"];



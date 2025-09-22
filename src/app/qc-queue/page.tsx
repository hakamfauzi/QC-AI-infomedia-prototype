"use client";

import { useEffect, useMemo, useState } from "react";
import { useToast } from "@/components/ToastProvider";

type Row = { id: string; bot: string; end: string; score: number; status: "OK" | "Review" | "Not OK"; overrides: string[]; penalties: string[]; kbVerify: number; slaDue: string; model: string; team?: string };

export default function QCQueuePage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{ search?: string; status?: string; bot?: string; team?: string }>({});
  const { addToast } = useToast();

  const qs = useMemo(() => {
    const p = new URLSearchParams();
    if (filters.search) p.set("search", filters.search);
    if (filters.status) p.set("status", filters.status);
    if (filters.bot) p.set("bot", filters.bot);
    if (filters.team) p.set("team", filters.team);
    return p.toString();
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/evaluations?${qs}`)
      .then((r) => r.json())
      .then((d) => setRows(d.rows))
      .finally(() => setLoading(false));
  }, [qs]);

  function exportCsv() {
    const url = `/api/evaluations?${qs}&format=csv`;
    const a = document.createElement("a");
    a.href = url;
    a.download = "qc-queue.csv";
    a.click();
    addToast({ title: "Export started", description: "Your CSV is downloading." });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <input className="h-9 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950" placeholder="Search #id or bot" value={filters.search || ""} onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value || undefined }))} />
        <select className="h-9 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950" value={filters.status || ""} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value || undefined }))}>
          <option value="">All Status</option>
          <option>OK</option>
          <option>Review</option>
          <option>Not OK</option>
        </select>
        <button onClick={exportCsv} className="h-9 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 hover:bg-neutral-100 dark:hover:bg-neutral-800">Export CSV</button>
      </div>
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden tile-hover">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 dark:bg-neutral-900 sticky top-14 z-10">
            <tr className="text-left">
              <th className="p-3 w-8">#</th>
              <th className="p-3">Case</th>
              <th className="p-3">Bot/Flow</th>
              <th className="p-3">End</th>
              <th className="p-3">Score</th>
              <th className="p-3">Status</th>
              <th className="p-3">Overrides</th>
              <th className="p-3">Penalties</th>
              <th className="p-3">KB Verify</th>
              <th className="p-3">SLA</th>
              <th className="p-3">Model</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-6 text-center text-neutral-500" colSpan={11}>Loading…</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="p-6 text-center text-neutral-500" colSpan={11}>No results. Try adjusting filters.</td></tr>
            ) : rows.map((r, i) => (
              <tr key={r.id} className="border-t border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50/60 dark:hover:bg-neutral-900/60">
                <td className="p-3"><input type="checkbox" aria-label={`select ${r.id}`} /></td>
                <td className="p-3"><a className="underline" href={`/conversation/${r.id}`}>#{r.id}</a></td>
                <td className="p-3">{r.bot}</td>
                <td className="p-3">{r.end}</td>
                <td className="p-3">{r.score}</td>
                <td className="p-3"><StatusBadge status={r.status} /></td>
                <td className="p-3 space-x-1">{r.overrides.map(o => <Badge key={o} text={o} tone="red" />)}</td>
                <td className="p-3 space-x-1">{r.penalties.map(p => <Badge key={p} text={p} tone="amber" />)}</td>
                <td className="p-3">{r.kbVerify}%</td>
                <td className="p-3">{r.slaDue}</td>
                <td className="p-3">{r.model}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

function Badge({ text, tone }: { text: string; tone: "red" | "amber" }) {
  const base = "inline-flex items-center h-6 px-2 rounded-full border text-xs";
  const toneMap = {
    red: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900",
    amber: "bg-amber-50 text-amber-900 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900",
  } as const;
  return <span className={`${base} ${toneMap[tone]}`}>{text}</span>;
}

// rows fetched from API



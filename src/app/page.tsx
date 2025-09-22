"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ avgScore: 0, okPct: 0, coverage: 0, kbVerify: 0, qcTATHours: 0 });
  const [filters, setFilters] = useState<{ bot?: string; team?: string; status?: string }>({});

  const qs = useMemo(() => {
    const p = new URLSearchParams();
    if (filters.bot) p.set("bot", filters.bot);
    if (filters.team) p.set("team", filters.team);
    if (filters.status) p.set("status", filters.status);
    return p.toString();
  }, [filters]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/evaluations?${qs}`)
      .then((r) => r.json())
      .then((d) => {
        setRows(d.rows);
        setStats(d.stats);
      })
      .catch((e) => setError(String(e)))
      .finally(() => setLoading(false));
  }, [qs]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <select className="h-9 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950" value={filters.bot || ""} onChange={(e) => setFilters((f) => ({ ...f, bot: e.target.value || undefined }))}>
          <option value="">All Bots</option>
          <option>Billing</option>
          <option>Support</option>
          <option>Onboarding</option>
        </select>
        <select className="h-9 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950" value={filters.team || ""} onChange={(e) => setFilters((f) => ({ ...f, team: e.target.value || undefined }))}>
          <option value="">All Teams</option>
          <option>Team A</option>
          <option>Team B</option>
          <option>Team C</option>
        </select>
        <select className="h-9 px-3 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950" value={filters.status || ""} onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value || undefined }))}>
          <option value="">All Status</option>
          <option>OK</option>
          <option>Review</option>
          <option>Not OK</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <MetricTile label="Avg Score" value={`${stats.avgScore}`} suffix="/ 100" />
        <MetricTile label="OK" value={`${stats.okPct}%`} />
        <MetricTile label="Coverage" value={`${stats.coverage}%`} />
        <MetricTile label="KB Verify" value={`${stats.kbVerify}%`} />
        <MetricTile label="QC TAT" value={`${stats.qcTATHours}h`} />
      </div>
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-950">
        <div className="text-sm text-neutral-500">Trends (placeholder)</div>
        <div className="h-40 grid place-items-center text-neutral-400 text-sm">{loading ? "Loading..." : error ? error : "Chart here"}</div>
      </div>
      <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-950">
        <div className="text-sm text-neutral-500 mb-2">Sample rows</div>
        <ul className="text-sm list-disc pl-4">
          {rows.slice(0, 3).map((r) => (
            <li key={r.id}>#{r.id} • {r.bot} • {r.score} • {r.status}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MetricTile({ label, value, suffix, trend }: { label: string; value: string; suffix?: string; trend?: string }) {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-950 tile-hover">
      <div className="text-xs text-neutral-500 mb-1">{label}</div>
      <div className="text-2xl font-semibold tracking-tight">
        {value} {suffix ? <span className="text-neutral-400 text-base align-middle">{suffix}</span> : null}
      </div>
      {trend ? <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">{trend}</div> : null}
    </div>
  );
}
 

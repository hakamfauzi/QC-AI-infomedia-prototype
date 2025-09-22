export type Evaluation = {
  id: string;
  bot: string;
  team: string;
  end: string; // ISO
  score: number;
  status: "OK" | "Review" | "Not OK";
  overrides: string[];
  penalties: string[];
  kbVerify: number; // 0-100
  slaDue: string; // text
  model: string;
};

export type OverviewStats = {
  avgScore: number;
  okPct: number;
  coverage: number;
  kbVerify: number;
  qcTATHours: number;
};

const now = new Date();

export const EVALUATIONS: Evaluation[] = [
  { id: "98231", bot: "Billing", team: "Team A", end: new Date(now.getTime() - 6.5 * 3600_000).toISOString(), score: 73, status: "Review", overrides: ["EVIDENCE_MISSING"], penalties: ["-30"], kbVerify: 62, slaDue: "18h", model: "v2.3" },
  { id: "98232", bot: "Support", team: "Team B", end: new Date(now.getTime() - 3.2 * 3600_000).toISOString(), score: 86, status: "OK", overrides: [], penalties: [], kbVerify: 91, slaDue: "—", model: "v2.3" },
  { id: "98233", bot: "Onboarding", team: "Team A", end: new Date(now.getTime() - 10.1 * 3600_000).toISOString(), score: 61, status: "Not OK", overrides: ["CRITICAL_CONTRAD"], penalties: ["-50"], kbVerify: 40, slaDue: "6h", model: "v2.2" },
  { id: "98234", bot: "Billing", team: "Team C", end: new Date(now.getTime() - 1.1 * 3600_000).toISOString(), score: 79, status: "Review", overrides: [], penalties: [], kbVerify: 84, slaDue: "—", model: "v2.3" },
];

export function filterEvaluations(params: { bot?: string; team?: string; from?: string; to?: string; status?: string; search?: string }) {
  const { bot, team, from, to, status, search } = params;
  const fromTs = from ? Date.parse(from) : undefined;
  const toTs = to ? Date.parse(to) : undefined;
  return EVALUATIONS.filter((e) => {
    if (bot && e.bot !== bot) return false;
    if (team && e.team !== team) return false;
    if (status && e.status !== status) return false;
    const t = Date.parse(e.end);
    if (fromTs && t < fromTs) return false;
    if (toTs && t > toTs) return false;
    if (search && !(`#${e.id}`.includes(search) || e.bot.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });
}

export function computeOverviewStats(rows: Evaluation[]): OverviewStats {
  if (rows.length === 0) return { avgScore: 0, okPct: 0, coverage: 0, kbVerify: 0, qcTATHours: 0 };
  const avgScore = Math.round((rows.reduce((s, r) => s + r.score, 0) / rows.length) * 10) / 10;
  const okPct = Math.round((rows.filter((r) => r.status === "OK").length / rows.length) * 100);
  const kbVerify = Math.round((rows.reduce((s, r) => s + r.kbVerify, 0) / rows.length));
  // Fake coverage and TAT for prototype
  const coverage = 90 + Math.round(Math.random() * 10);
  const qcTATHours = Math.round(4 + Math.random() * 4);
  return { avgScore, okPct, coverage, kbVerify, qcTATHours };
}

export function toCSV(rows: Evaluation[]): string {
  const header = ["id","bot","team","end","score","status","overrides","penalties","kbVerify","slaDue","model"];
  const body = rows.map((r) => [r.id, r.bot, r.team, r.end, r.score, r.status, r.overrides.join("|"), r.penalties.join("|"), r.kbVerify, r.slaDue, r.model]);
  return [header, ...body].map((row) => row.map((v) => `"${String(v).replaceAll('"','\"')}"`).join(",")).join("\n");
}



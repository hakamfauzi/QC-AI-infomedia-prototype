import { computeOverviewStats, filterEvaluations, toCSV } from "@/lib/mock";

export const runtime = "nodejs";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const as = Object.fromEntries(searchParams.entries());
    const rows = filterEvaluations({
      bot: as.bot,
      team: as.team,
      from: as.from,
      to: as.to,
      status: as.status,
      search: as.search,
    });
    const accept = req.headers.get("accept") || "";
    if (accept.includes("text/csv") || as.format === "csv") {
      const csv = toCSV(rows);
      return new Response(csv, { headers: { "content-type": "text/csv; charset=utf-8" } });
    }
    const stats = computeOverviewStats(rows);
    return Response.json({ rows, stats });
  } catch (e: any) {
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}



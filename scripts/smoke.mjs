import assert from "node:assert";

const BASE = process.env.BASE_URL || "http://localhost:3000";

async function main() {
  console.log("Smoke: GET /api/evaluations JSON");
  const r1 = await fetch(`${BASE}/api/evaluations`);
  assert.equal(r1.status, 200);
  const j = await r1.json();
  assert.ok(Array.isArray(j.rows), "rows array");
  assert.ok(j.rows.length >= 0, "rows length present");
  assert.ok(j.stats && typeof j.stats.avgScore === "number", "stats present");
  console.log(" ✓ JSON ok (rows:", j.rows.length, ")");

  console.log("Smoke: GET /api/evaluations CSV");
  const r2 = await fetch(`${BASE}/api/evaluations?format=csv`, { headers: { accept: "text/csv" } });
  assert.equal(r2.status, 200);
  const txt = await r2.text();
  assert.ok(txt.startsWith("\"id\","), "csv header");
  console.log(" ✓ CSV ok (chars:", txt.length, ")");

  console.log("All smoke tests passed.");
}

main().catch((e) => {
  console.error("Smoke test failed:", e);
  process.exit(1);
});



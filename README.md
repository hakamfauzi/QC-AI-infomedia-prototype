# Agentic QC AI — Prototype (Next.js)

## Quick Start

- Prereqs: Node 18+
- Install and run:

```
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

- Overview: filters (Bot/Team/Status) update KPI tiles and sample list.
- QC Queue: filter/search, loading/empty states, CSV export (toast on download).
- Conversation: 3-pane judge view, interactive rubric, penalties, overrides, diff viewer, audit trail.
- Admin: thresholds and penalties with versioning (stored in localStorage).

## API

- GET `/api/evaluations?bot=&team=&status=&search=` → `{ rows, stats }`
- GET `/api/evaluations?format=csv` → CSV download

## Acceptance Check (slice‑1)

- Overview filters update tiles and list within 500ms after response.
- QC Queue supports CSV export and filtering; empty state visible when no results.
- Conversation shows claims with citations; toggling penalties/overrides updates score and status immediately; audit log records it.
- Admin edits thresholds/penalties; version displayed; Conversation uses current values.

## Smoke Test

Run:

```
npm run smoke
```

Checks JSON response shape and CSV header from `/api/evaluations`.

## Notes

- Prototype data is in `src/lib/mock.ts`.
- Diff viewer is a simple inline highlighter for demo purposes.

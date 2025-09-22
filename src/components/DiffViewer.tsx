"use client";

export function DiffViewer({ left, right }: { left: string; right: string }) {
  const leftTokens = tokenize(left);
  const rightTokens = tokenize(right);
  const diff = simpleDiff(leftTokens, rightTokens);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
      <div>
        <div className="text-xs text-neutral-500 mb-1">Claim</div>
        <div className="rounded-md border border-neutral-200 dark:border-neutral-800 p-2 leading-6">
          {diff.left.map((d, i) => (
            <span key={i} className={d.type === "removed" ? "bg-rose-200/50 dark:bg-rose-900/40" : ""}>{d.token}</span>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs text-neutral-500 mb-1">KB Snippet</div>
        <div className="rounded-md border border-neutral-200 dark:border-neutral-800 p-2 leading-6">
          {diff.right.map((d, i) => (
            <span key={i} className={d.type === "added" ? "bg-emerald-200/50 dark:bg-emerald-900/40" : ""}>{d.token}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function tokenize(s: string): string[] {
  return s.split(/(\s+|\b)/g).filter(Boolean);
}

type DiffPiece = { token: string; type: "same" | "added" | "removed" };

function simpleDiff(a: string[], b: string[]): { left: DiffPiece[]; right: DiffPiece[] } {
  // Very naive LCS-like diff for prototype
  const left: DiffPiece[] = [];
  const right: DiffPiece[] = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      left.push({ token: a[i++], type: "same" });
      right.push({ token: b[j++], type: "same" });
    } else if (!b.slice(j + 1, j + 6).includes(a[i])) {
      left.push({ token: a[i++], type: "removed" });
    } else if (!a.slice(i + 1, i + 6).includes(b[j])) {
      right.push({ token: b[j++], type: "added" });
    } else {
      left.push({ token: a[i++], type: "removed" });
      right.push({ token: b[j++], type: "added" });
    }
  }
  while (i < a.length) left.push({ token: a[i++], type: "removed" });
  while (j < b.length) right.push({ token: b[j++], type: "added" });
  return { left, right };
}



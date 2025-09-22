"use client";

import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [mode, setMode] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("theme-mode") : null;
    if (saved === "light" || saved === "dark" || saved === "system") setMode(saved);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const el = document.documentElement;
    // Control Tailwind's dark: variants using the .dark class
    if (mode === "dark") {
      el.classList.add("dark");
    } else {
      el.classList.remove("dark");
    }
    // Persist selection
    window.localStorage.setItem("theme-mode", mode);
  }, [mode]);

  return (
    <div className="flex items-center gap-2 text-xs">
      <label className="sr-only" htmlFor="theme-select">Theme</label>
      <select id="theme-select" className="h-8 px-2 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900" value={mode} onChange={(e) => setMode(e.target.value as any)}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}



"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/submit", label: "Submit QC" },
  { href: "/qc", label: "QC Queue" },
  { href: "/analytics", label: "Analytics" },
  { href: "/calibration", label: "Calibration" },
  { href: "/sampling", label: "Sampling" },
  { href: "/knowledge", label: "Knowledge Base" },
  { href: "/incidents", label: "Incidents" },
  { href: "/reports", label: "Reports" },
  { href: "/admin", label: "Admin" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering active states until mounted
  if (!mounted) {
    return (
      <nav className="px-2 py-2 text-sm">
        {links.map((l) => (
          <a
            key={l.href}
            className="block px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 hover:bg-neutral-200"
            href={l.href}
          >
            {l.label}
          </a>
        ))}
      </nav>
    );
  }

  return (
    <nav className="px-2 py-2 text-sm">
      {links.map((l) => {
        const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
        return (
          <a
            key={l.href}
            className={
              `block px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 ` +
              (active
                ? "bg-neutral-900 text-neutral-100"
                : "hover:bg-neutral-200")
            }
            href={l.href}
          >
            {l.label}
          </a>
        );
      })}
    </nav>
  );
}



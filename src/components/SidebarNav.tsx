"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Overview" },
  { href: "/qc-queue", label: "QC Queue" },
  { href: "/conversation/123", label: "Conversation Detail" },
  { href: "/calibration", label: "Calibration" },
  { href: "/sampling", label: "Sampling" },
  { href: "/knowledge", label: "Knowledge" },
  { href: "/incidents", label: "Incidents" },
  { href: "/reports", label: "Reports" },
  { href: "/admin", label: "Admin" },
];

export function SidebarNav() {
  const pathname = usePathname();
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
                ? "bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                : "hover:bg-neutral-100 dark:hover:bg-neutral-800")
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



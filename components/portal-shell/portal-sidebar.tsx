"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DistrictSeal } from "@/components/ui/district-seal";
import { cn } from "@/lib/utils";

type Item = { label: string; href: string };

const companyItems: Item[] = [
  { label: "DISTRICT OVERVIEW", href: "/company/overview" },
  { label: "COMPANY REGISTRY", href: "/company/registry" },
  { label: "ACTIVE FOUNDERS", href: "/company/founders" },
  { label: "RESIDENCY LAYER", href: "/company/residency" },
  { label: "WORKSPACE", href: "/company/workspace" },
  { label: "LOCAL HIRING", href: "/company/hiring" },
  { label: "DISTRICT BENEFITS", href: "/company/benefits" },
  { label: "DOCUMENTS", href: "/company/documents" },
  { label: "EVENTS", href: "/company/events" },
  { label: "DISTRICT DIRECTORY", href: "/company/directory" },
  { label: "SETTINGS", href: "/company/settings" },
];

const govtItems: Item[] = [
  { label: "DISTRICT OVERVIEW", href: "/govt/overview" },
  { label: "ALL COMPANIES", href: "/govt/overview#companies" },
  { label: "ALL FOUNDERS", href: "/govt/overview#founders" },
  { label: "RESIDENCY APPROVALS", href: "/govt/overview#approvals" },
  { label: "OPERATIONAL ACTIVITY", href: "/govt/overview#activity" },
];

const bottomLinks = [
  { label: "POLICY", href: "#" },
  { label: "LEGAL DESK", href: "#" },
  { label: "SUPPORT NODE", href: "#" },
  { label: "DISTRICT STATUS", href: "#" },
];

export function PortalSidebar({ variant }: { variant: "company" | "govt" }) {
  const pathname = usePathname();
  const items = variant === "company" ? companyItems : govtItems;

  return (
    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col border-r-2 border-[var(--border)] bg-white lg:flex">
      <div className="flex items-center gap-3 border-b-2 border-[var(--border)] px-5 py-5">
        <DistrictSeal size={26} />
        <div className="flex flex-col leading-tight">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text)]">
            Amaravati · ASC
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--text-3)]">
            {variant === "company"
              ? "District Operations"
              : "District Administration"}
          </span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto py-3">
        <div className="px-5 pb-2">
          <span className="label">
            {variant === "company" ? "[ NAVIGATE ]" : "[ ADMIN NAVIGATION ]"}
          </span>
        </div>
        <ul className="flex flex-col">
          {items.map((item) => {
            const hashIndex = item.href.indexOf("#");
            const basePath =
              hashIndex === -1 ? item.href : item.href.slice(0, hashIndex);
            const active =
              pathname === basePath ||
              (item.href === "/company/overview" && pathname === "/company") ||
              (item.href === "/govt/overview" && pathname === "/govt");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                    active
                      ? "bg-[var(--accent-soft)] font-bold text-[var(--text)]"
                      : "text-[var(--text-2)] hover:bg-[#FAFAFB] hover:text-[var(--text)]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-full w-[3px] transition-all",
                      active ? "bg-[var(--accent)]" : "bg-transparent"
                    )}
                  />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mx-5 mt-6 border-t-2 border-[var(--border-soft)] pt-4">
          <span className="label">[ DISTRICT FOOTER ]</span>
        </div>
        <ul className="mt-2 flex flex-col">
          {bottomLinks.map((b) => (
            <li key={b.label}>
              <Link
                href={b.href}
                className="flex items-center gap-3 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)] transition-colors hover:text-[var(--text)]"
              >
                {b.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-1 border-t-2 border-[var(--border-soft)] px-5 py-4">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
            DISTRICT 01 · OPERATIONAL
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
            16.516° N · 80.518° E
          </div>
        </div>
      </nav>
    </aside>
  );
}

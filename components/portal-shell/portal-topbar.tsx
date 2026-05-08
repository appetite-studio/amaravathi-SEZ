"use client";

import { useRouter } from "next/navigation";
import { Bell, LogOut, Search } from "lucide-react";
import { clearSession, useSession } from "@/lib/store";
import { portalCompany } from "@/lib/data";

export function PortalTopbar({ variant }: { variant: "company" | "govt" }) {
  const router = useRouter();
  const { session } = useSession();

  const onLogout = () => {
    clearSession();
    router.push("/");
  };

  const initials = (session?.name ?? (variant === "company" ? "NA" : "AP"))
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const left =
    variant === "company"
      ? {
          eyebrow: "[ TENANT NODE · OPERATIONAL ]",
          title: portalCompany.name,
          meta: `${portalCompany.cin} · ${portalCompany.tier.toUpperCase()}`,
        }
      : {
          eyebrow: "[ DISTRICT ADMINISTRATION · OVERSIGHT ]",
          title: "District Administration",
          meta: "DEPT. OF IT · GOVT OF ANDHRA PRADESH · 2026",
        };

  const userMeta =
    variant === "company"
      ? "COMPANY · TIER I"
      : "GOVT PREVIEW · ECOSYSTEM";

  return (
    <header className="flex items-center justify-between border-b-2 border-[var(--border)] bg-white px-6 py-3.5">
      <div className="flex flex-col leading-tight">
        <span className="label">{left.eyebrow}</span>
        <span className="mt-1 font-display text-[13px] font-bold uppercase tracking-[0.04em] text-[var(--text)]">
          {left.title}
        </span>
        <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          {left.meta}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search
            className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-3)]"
            strokeWidth={1.5}
          />
          <input
            type="text"
            placeholder={
              variant === "company"
                ? "SEARCH FOUNDERS, DOCS, PERMITS"
                : "SEARCH ECOSYSTEM"
            }
            className="w-[280px] border-[1.5px] border-[var(--border-soft)] bg-white py-1.5 pl-8 pr-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text)] placeholder:text-[var(--text-3)] focus:border-[var(--border)] focus:outline-none"
          />
        </div>
        <button
          type="button"
          className="relative inline-flex h-9 w-9 items-center justify-center border-[1.5px] border-[var(--border-soft)] text-[var(--text-2)] transition-colors hover:border-[var(--border)] hover:text-[var(--text)]"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" strokeWidth={1.5} />
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
        </button>
        <div className="ml-1 hidden items-center gap-3 border-l-2 border-[var(--border-soft)] pl-3 md:flex">
          <div className="flex h-9 w-9 items-center justify-center border-[1.5px] border-[var(--border)] bg-white font-mono text-[11px] tracking-[0.1em] text-[var(--text)]">
            {initials}
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text)]">
              {session?.name ?? (variant === "company" ? portalCompany.name : "Dept. of IT")}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              {userMeta}
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={onLogout}
          className="ml-1 inline-flex h-9 w-9 items-center justify-center border-[1.5px] border-[var(--border-soft)] text-[var(--text-2)] transition-colors hover:border-[var(--border)] hover:text-[var(--text)]"
          aria-label="Log out"
        >
          <LogOut className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
}

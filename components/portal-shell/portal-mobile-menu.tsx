"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DistrictSeal } from "@/components/ui/district-seal";
import { clearSession, useSession } from "@/lib/store";
import { cn } from "@/lib/utils";

type Variant = "company" | "govt";

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

const footerLinks: Item[] = [
  { label: "POLICY", href: "#" },
  { label: "LEGAL DESK", href: "#" },
  { label: "SUPPORT NODE", href: "#" },
  { label: "DISTRICT STATUS", href: "#" },
];

export function PortalMobileMenu({
  variant,
  open,
  onOpenChange,
}: {
  variant: Variant;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useSession();
  const items = variant === "company" ? companyItems : govtItems;

  const initials = (session?.name ?? (variant === "company" ? "NA" : "AP"))
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const onLogout = () => {
    clearSession();
    onOpenChange(false);
    router.push("/");
  };

  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="gap-0 p-0">
        <SheetHeader className="flex-row items-center gap-3 border-b-2 border-[var(--border)] px-5 py-5">
          <DistrictSeal size={26} />
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text)]">
              Amaravati · ASC
            </span>
            <SheetTitle className="text-[12px]">
              {variant === "company"
                ? "District Operations"
                : "District Administration"}
            </SheetTitle>
          </div>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {session && (
            <div className="flex items-center gap-3 border-b-2 border-[var(--border-soft)] bg-[#FAFAFB] px-5 py-4">
              <div className="flex h-10 w-10 items-center justify-center border-[1.5px] border-[var(--border)] bg-white font-mono text-[12px] tracking-[0.1em] text-[var(--text)]">
                {initials}
              </div>
              <div className="flex min-w-0 flex-col leading-tight">
                <span className="truncate font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--text)]">
                  {session.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                  {variant === "company"
                    ? "COMPANY · TIER I"
                    : "GOVT PREVIEW · ECOSYSTEM"}
                </span>
              </div>
            </div>
          )}

          <div className="px-5 pb-2 pt-4">
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
                (item.href === "/company/overview" &&
                  pathname === "/company") ||
                (item.href === "/govt/overview" && pathname === "/govt");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className={cn(
                      "group relative flex items-center gap-3 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
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
            {footerLinks.map((b) => (
              <li key={b.label}>
                <Link
                  href={b.href}
                  onClick={close}
                  className="flex items-center gap-3 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)] transition-colors hover:text-[var(--text)]"
                >
                  {b.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto border-t-2 border-[var(--border-soft)] px-5 py-4">
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center justify-center gap-2 border-2 border-[var(--border)] bg-white px-4 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text)] transition-colors hover:bg-[var(--text)] hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.5} />
              Log out
            </button>
            <div className="mt-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
              DISTRICT 01 · OPERATIONAL
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Building2,
  FileText,
  Home,
  IdCard,
  MoreHorizontal,
  ShieldCheck,
  Stamp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "company" | "govt";

type BaseTab = {
  label: string;
  icon: LucideIcon;
};

type NavTab = BaseTab & {
  kind: "link";
  href: string;
  hash?: string;
};

type MoreTab = BaseTab & {
  kind: "more";
};

type Tab = NavTab | MoreTab;

const companyTabs: Tab[] = [
  { kind: "link", label: "Home", icon: Home, href: "/company/overview" },
  { kind: "link", label: "Founders", icon: Users, href: "/company/founders" },
  {
    kind: "link",
    label: "Residency",
    icon: Stamp,
    href: "/company/residency",
  },
  {
    kind: "link",
    label: "Docs",
    icon: FileText,
    href: "/company/documents",
  },
  { kind: "more", label: "More", icon: MoreHorizontal },
];

const govtTabs: Tab[] = [
  { kind: "link", label: "Home", icon: Home, href: "/govt/overview" },
  {
    kind: "link",
    label: "Companies",
    icon: Building2,
    href: "/govt/overview",
    hash: "#companies",
  },
  {
    kind: "link",
    label: "Founders",
    icon: IdCard,
    href: "/govt/overview",
    hash: "#founders",
  },
  {
    kind: "link",
    label: "Approvals",
    icon: ShieldCheck,
    href: "/govt/overview",
    hash: "#approvals",
  },
  { kind: "more", label: "More", icon: MoreHorizontal },
];

export function PortalBottomNav({
  variant,
  onMoreClick,
}: {
  variant: Variant;
  onMoreClick: () => void;
}) {
  const pathname = usePathname();
  const tabs = variant === "company" ? companyTabs : govtTabs;
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHash(window.location.hash);
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [pathname]);

  return (
    <nav
      aria-label={
        variant === "company" ? "Company portal navigation" : "Govt portal navigation"
      }
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-[var(--border)] bg-white pb-[env(safe-area-inset-bottom)] lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isLast = i === tabs.length - 1;

          if (tab.kind === "more") {
            return (
              <li
                key="more"
                className={cn(
                  "border-r border-[var(--border-soft)]",
                  isLast && "border-r-0"
                )}
              >
                <button
                  type="button"
                  onClick={onMoreClick}
                  className="flex h-full w-full flex-col items-center justify-center gap-1 px-2 py-3 text-[var(--text-2)] transition-colors hover:text-[var(--text)]"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                    {tab.label}
                  </span>
                </button>
              </li>
            );
          }

          // Active matching:
          //   - For tabs with a hash: active when on the same path AND hash matches.
          //     Special case: `#companies` is active when there is no hash on the
          //     overview page (since that's the first/anchor section visible).
          //   - For tabs without a hash (Home): active when no hash is set on path.
          const onSamePath = pathname === tab.href;
          let active = false;
          if (tab.hash) {
            active = onSamePath && hash === tab.hash;
          } else {
            active = onSamePath && hash === "";
          }

          return (
            <li
              key={tab.label}
              className={cn(
                "border-r border-[var(--border-soft)]",
                isLast && "border-r-0"
              )}
            >
              <Link
                href={tab.hash ? `${tab.href}${tab.hash}` : tab.href}
                prefetch
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-1 px-2 py-3 transition-colors",
                  active
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--text-2)] hover:text-[var(--text)]"
                )}
              >
                <Icon
                  className="h-[18px] w-[18px]"
                  strokeWidth={active ? 2 : 1.5}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

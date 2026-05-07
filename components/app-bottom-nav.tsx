"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fingerprint, MapPin, Users, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Identity", href: "/app/identity", icon: Fingerprint },
  { label: "Community", href: "/app/community", icon: Users },
  { label: "Tools", href: "/app/tools", icon: Wrench },
  { label: "District", href: "/app/district", icon: MapPin },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Console navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-[var(--border)] bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        {navItems.map((item) => {
          const active = pathname?.startsWith(item.href) ?? false;
          const Icon = item.icon;
          return (
            <li
              key={item.href}
              className="border-r border-[var(--border-soft)] last:border-r-0"
            >
              <Link
                href={item.href}
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
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

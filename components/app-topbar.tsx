"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Search } from "lucide-react";
import { DistrictSeal } from "@/components/ui/district-seal";
import { cn } from "@/lib/utils";
import { clearSession, useSession } from "@/lib/store";

const navItems = [
  { label: "IDENTITY", href: "/app/identity" },
  { label: "COMMUNITY", href: "/app/community" },
  { label: "TOOLS", href: "/app/tools" },
  { label: "DISTRICT", href: "/app/district" },
];

export function AppTopbar({
  onOpenNotifications,
}: {
  onOpenNotifications?: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { session } = useSession();

  const initials = (session?.name ?? "DR")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const onLogout = () => {
    clearSession();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--border)] bg-[var(--header-dark)] text-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-8 py-4">
        <Link href="/app/identity" className="flex items-center gap-3">
          <DistrictSeal size={26} className="text-[var(--accent)]" />
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em]">
              Amaravati · Startup Capital
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/60">
              Founder Console · District 01
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch
                className={cn(
                  "border-[1.5px] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
                  active
                    ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                    : "border-transparent text-white/70 hover:border-white/40 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center border-[1.5px] border-white/30 text-white/70 transition-colors hover:border-white hover:text-white sm:inline-flex"
            aria-label="Search"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={onOpenNotifications}
            className="relative inline-flex h-9 w-9 items-center justify-center border-[1.5px] border-white/30 text-white/80 transition-colors hover:border-white hover:text-white"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" strokeWidth={1.5} />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="hidden h-9 w-9 items-center justify-center border-[1.5px] border-white/30 text-white/70 transition-colors hover:border-white hover:text-white sm:inline-flex"
            aria-label="Log out"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <div className="ml-2 hidden items-center gap-3 border-l-2 border-white/20 pl-3 md:flex">
            <div className="flex h-9 w-9 items-center justify-center border-[1.5px] border-white/40 bg-white/5 font-mono text-[11px] tracking-[0.1em]">
              {initials}
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                {session?.name ?? "Diya Rajiv"}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
                {session?.role ?? "Founder"} · Tier I
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

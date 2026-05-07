import Link from "next/link";
import { DistrictSeal } from "@/components/ui/district-seal";

const links = [
  { label: "DISTRICT", href: "/#district" },
  { label: "RESIDENCY", href: "/#residency" },
  { label: "COHORTS", href: "/#cohorts" },
  { label: "POLICY", href: "/#policy" },
];

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-[var(--border)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-6 px-8 py-5">
        <Link href="/" className="flex items-center gap-3">
          <DistrictSeal size={28} />
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text)]">
              Amaravati · Startup Capital
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--text-3)]">
              District 01 · Andhra Pradesh
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-[1.5px] border-transparent px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-2)] transition-colors hover:border-[var(--border)] hover:text-[var(--text)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/login"
            className="border-[1.5px] border-[var(--border)] bg-white px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text)] transition-colors hover:bg-[var(--text)] hover:text-white"
          >
            LOG IN
          </Link>
          <Link
            href="/login"
            className="border-2 border-[var(--accent)] bg-[var(--accent)] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors"
          >
            APPLY →
          </Link>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { DistrictSeal } from "@/components/ui/district-seal";

const cols = [
  {
    label: "DISTRICT",
    items: ["Residency", "Companies", "Cohorts", "Events", "Map"],
  },
  {
    label: "FOUNDERS",
    items: [
      "Apply for residency",
      "Register company",
      "Founder housing",
      "AP Skills Fund",
      "Mentor matching",
    ],
  },
  {
    label: "GOVERNANCE",
    items: ["Policy", "Local hiring", "Tax schedule", "Compliance", "Office hours"],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t-2 border-[var(--border)] bg-white">
      <div className="mx-auto max-w-[1280px] px-8 py-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <DistrictSeal size={36} />
              <div className="font-mono text-[11px] uppercase tracking-[0.22em]">
                Amaravati · Startup Capital
              </div>
            </div>
            <p className="max-w-sm text-[13px] leading-relaxed text-[var(--text-2)]">
              A founder-first startup district inside Amaravati, Andhra Pradesh.
              Operated as a digital governance layer by AIM States.
            </p>
            <div className="label">EST. 2026 · DISTRICT 01</div>
          </div>
          {cols.map((col) => (
            <div key={col.label} className="flex flex-col gap-3">
              <div className="label">{col.label}</div>
              <ul className="flex flex-col gap-2">
                {col.items.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-[13px] text-[var(--text)] transition-colors hover:text-[var(--accent)]"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-[var(--border)] pt-6 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          <div>© 2026 · Amaravati Startup Capital · Andhra Pradesh</div>
          <div>Operating system by AIM States</div>
        </div>
      </div>
    </footer>
  );
}

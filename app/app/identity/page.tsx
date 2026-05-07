"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ResidencyCard } from "@/components/identity/residency-card";
import { ResidencyTimeline } from "@/components/identity/timeline";
import { Progress } from "@/components/ui/progress";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { companies, founder } from "@/lib/data";

export default function IdentityPage() {
  const company = companies[0];

  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="[ DIGITAL IDENTITY · RESIDENCY PERMIT ]"
        title="Founder Console"
        body={`Welcome back, ${founder.name.split(" ")[0]}. Your residency is active and your local hiring compliance is verified for Q1 2026.`}
        trailing={
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill kind="active" label="ACTIVE RESIDENCY" pulse />
            <StatusPill kind="verified" label="COMPLIANCE Q1" />
          </div>
        }
      />

      <ResidencyCard />

      {/* Secondary cards row */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Company Registration */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="border-2 border-[var(--border)] bg-white p-6 hover-brutal"
        >
          <div className="label">[ COMPANY REGISTRATION ]</div>
          <div className="mt-3 font-display text-[20px] font-bold leading-tight">
            {company.name}
          </div>
          <div className="mt-1 font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-2)]">
            {company.type} · {company.category}
          </div>
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t-2 border-[var(--border-soft)] pt-4">
            <div className="col-span-2">
              <Field k="CIN" v={company.cin} mono />
            </div>
            <Field k="FOUNDED" v={company.founded} />
            <Field k="STAGE" v={company.stage} />
            <div className="col-span-2">
              <Field k="HEADCOUNT" v={String(company.headcount)} />
            </div>
          </div>
          <div className="mt-5">
            <StatusPill kind="active" label={company.status.toUpperCase()} />
          </div>
        </motion.div>

        {/* Local Hiring Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="border-2 border-[var(--border)] bg-white p-6 hover-brutal"
        >
          <div className="label">[ LOCAL HIRING COMPLIANCE ]</div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.02em] text-[var(--text)]">
              {Math.round(founder.localHiringRatio * 100)}
            </span>
            <span className="font-mono text-[14px] uppercase tracking-[0.12em] text-[var(--text-2)]">
              %
            </span>
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
            Q1 2026 · 3 OF 4 LOCAL HIRES
          </div>
          <div className="mt-5">
            <Progress value={founder.localHiringRatio * 100} />
          </div>
          <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-2)]">
            <span className="text-[var(--success)]">+4%</span> over Tier I floor (70%)
          </div>
          <div className="mt-5">
            <StatusPill kind="verified" label="COMPLIANCE VERIFIED" />
          </div>
        </motion.div>

        {/* Contribution Score */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="border-2 border-[var(--border)] bg-white p-6 hover-brutal"
        >
          <div className="label">[ DISTRICT CONTRIBUTION SCORE ]</div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.02em] text-[var(--accent)]">
              {founder.contributionScore}
            </span>
            <span className="font-mono text-[14px] uppercase tracking-[0.12em] text-[var(--text-2)]">
              / {founder.contributionMax}
            </span>
          </div>
          <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
            TOP 8% · TIER I FOUNDERS
          </div>
          <div className="mt-5">
            <Progress
              value={(founder.contributionScore / founder.contributionMax) * 100}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-y-2">
            <Field k="MENTOR HRS" v="14" />
            <Field k="HIRES" v="3" />
            <Field k="EVENTS" v="9" />
            <Field k="POLICY" v="2" />
          </div>
        </motion.div>

        {/* Permits & access */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="border-2 border-[var(--border)] bg-white p-6 hover-brutal"
        >
          <div className="label">[ PERMITS & ACCESS ]</div>
          <div className="mt-3 font-display text-[20px] font-bold leading-tight">
            Full Founder Access
          </div>
          <ul className="mt-5 flex flex-col gap-2.5 border-t-2 border-[var(--border-soft)] pt-4">
            {founder.permits.map((p) => (
              <li key={p} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center bg-[var(--text)]">
                  <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                </span>
                <span className="text-[13px] text-[var(--text)]">{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <Button variant="secondary" size="sm" className="w-full">
              VIEW PERMIT HISTORY
            </Button>
          </div>
        </motion.div>
      </div>

      <ResidencyTimeline />
    </div>
  );
}

function Field({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
        {k}
      </span>
      <span
        className={`font-mono text-[12px] text-[var(--text)] ${mono ? "break-all" : "truncate"}`}
      >
        {v}
      </span>
    </div>
  );
}

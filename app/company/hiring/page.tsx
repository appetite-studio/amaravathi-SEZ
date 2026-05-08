"use client";

import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, Users } from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Progress } from "@/components/ui/progress";
import { portalHiring, portalCompany } from "@/lib/data";

export default function LocalHiringPage() {
  const ratioPct = Math.round(portalHiring.ratio * 100);
  const requiredPct = Math.round(portalHiring.required * 100);
  const overFloor = ratioPct - requiredPct;

  return (
    <PortalShell variant="company">
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ LOCAL HIRING · COMPLIANCE CYCLE ]"
          title="Local Hiring · Andhra Pradesh"
          body={`${portalCompany.shortName} hires from the AP talent base under the Innovation District policy floor. Compliance verified by AP Skills Fund on ${portalHiring.verifiedOn}.`}
          trailing={
            <>
              <StatusPill kind="verified" label={portalHiring.complianceStatus} />
              <StatusPill kind="active" label={portalHiring.complianceCycle} />
            </>
          }
        />

        {/* Headline metric */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-2 border-[var(--border)] bg-white"
        >
          <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.2fr_1fr]">
            <div className="border-b-2 border-[var(--border)] p-8 lg:border-b-0 lg:border-r-2">
              <div className="label">[ AP RESIDENT HIRING RATIO ]</div>
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-[120px] font-extrabold leading-none tracking-[-0.03em] text-[var(--text)]">
                  {ratioPct}
                </span>
                <span className="font-display text-[28px] font-bold leading-none tracking-[-0.01em] text-[var(--text-2)]">
                  %
                </span>
              </div>
              <div className="mt-3 font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--text-2)]">
                {portalHiring.apResidents} OF {portalHiring.headcount} HIRES ARE
                AP RESIDENT
              </div>
              <div className="mt-6">
                <Progress value={ratioPct} />
                <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                  <span>0%</span>
                  <span className="text-[var(--accent)]">
                    REQUIRED · {requiredPct}%
                  </span>
                  <span>100%</span>
                </div>
              </div>
              <div className="mt-6 inline-flex items-center gap-2 border-[1.5px] border-[var(--border)] bg-[var(--accent-soft)] px-3 py-1.5">
                <CheckCircle2
                  className="h-4 w-4 text-[var(--success)]"
                  strokeWidth={2}
                />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text)]">
                  +{overFloor}% over Tier I floor
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-0">
              <Stat
                label="HEADCOUNT"
                value={String(portalHiring.headcount)}
                sub="all roles"
                bordered
              />
              <Stat
                label="OPEN ROLES"
                value={String(portalHiring.openRoles)}
                sub="active reqs"
                bordered
              />
              <Stat
                label="TRAINING HRS"
                value={String(portalHiring.trainingHours)}
                sub={`vs. ${portalHiring.trainingHoursTarget} target`}
                bordered
              />
              <Stat
                label="SKILLS FUND"
                value={portalHiring.skillsFundContribution}
                sub="contributed"
                bordered
              />
              <Stat
                label="ACTIVE INTERNS"
                value={String(portalHiring.internsActive)}
                sub={`vs. ${portalHiring.internsTarget} target`}
                bordered
                highlight
              />
              <Stat
                label="NET NEW JOBS"
                value="+8"
                sub="Q1 2026 · AP"
                bordered
                highlight
              />
            </div>
          </div>
        </motion.div>

        {/* Universities */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="label">[ UNIVERSITY PARTNERSHIPS ]</div>
              <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
                AP universities connected
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              5 ACTIVE · MOUS LIVE
            </span>
          </div>

          <div className="grid grid-cols-1 gap-0 border-2 border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
            {portalHiring.universities.map((u, i) => (
              <motion.div
                key={u.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex flex-col gap-3 border-b-2 border-r-2 border-[var(--border-soft)] p-5 last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r-2 lg:[&:nth-child(3n)]:border-r-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <GraduationCap
                      className="mt-0.5 h-4 w-4 text-[var(--text-2)]"
                      strokeWidth={1.5}
                    />
                    <div className="flex flex-col leading-tight">
                      <span className="font-display text-[14px] font-bold uppercase tracking-[0.04em] text-[var(--text)]">
                        {u.name}
                      </span>
                      <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                        {u.city}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="self-start border-[1.5px] border-[var(--border-soft)] bg-white px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-2)]">
                  {u.engaged}
                </span>
                <div className="mt-auto flex items-center gap-6 border-t-2 border-[var(--border-soft)] pt-3">
                  <div className="flex flex-col leading-none">
                    <span className="font-display text-[20px] font-bold text-[var(--text)]">
                      {u.hires}
                    </span>
                    <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                      HIRES
                    </span>
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="font-display text-[20px] font-bold text-[var(--text)]">
                      {u.interns}
                    </span>
                    <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                      INTERNS
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* AP-resident hires table */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="label">[ AP RESIDENT HIRES · ROLE LEDGER ]</div>
              <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
                Verified hires in current cycle
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              {portalHiring.hires.length} ENTRIES
            </span>
          </div>

          <div className="border-2 border-[var(--border)] bg-white">
            <div className="grid grid-cols-[1.4fr_1.6fr_1.2fr_120px_120px] gap-4 border-b-2 border-[var(--border)] bg-[var(--header-dark)] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/80">
              <span>NAME</span>
              <span>ROLE</span>
              <span>ORIGIN</span>
              <span>JOINED</span>
              <span>TIER</span>
            </div>
            {portalHiring.hires.map((h, i) => (
              <motion.div
                key={`${h.name}-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="grid grid-cols-[1.4fr_1.6fr_1.2fr_120px_120px] items-center gap-4 border-b border-[var(--border-soft)] px-5 py-3 last:border-b-0 hover:bg-[#FAFAFB]"
              >
                <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
                  {h.name}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-2)]">
                  {h.role}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-2)]">
                  {h.origin}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-2)]">
                  {h.joined}
                </span>
                <span
                  className={`self-start border-[1.5px] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] ${
                    h.tier === "AP RESIDENT"
                      ? "border-[var(--success)] text-[var(--success)]"
                      : "border-[var(--border-soft)] text-[var(--text-3)]"
                  }`}
                >
                  {h.tier}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Interns */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="label">[ ACTIVE INTERN COHORT ]</div>
              <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
                Interns under AP Skills Fund
              </h2>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              <Users className="h-3 w-3" strokeWidth={2} />
              {portalHiring.internsActive} ACTIVE · {portalHiring.interns.length - portalHiring.internsActive + 4} TRACKED
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {portalHiring.interns.map((intern, i) => (
              <motion.div
                key={intern.name}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="border-2 border-[var(--border)] bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col leading-tight">
                    <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
                      {intern.name}
                    </span>
                    <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                      {intern.university}
                    </span>
                  </div>
                  <span
                    className={`border-[1.5px] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] ${
                      intern.status === "ACTIVE"
                        ? "border-[var(--success)] text-[var(--success)]"
                        : "border-[var(--warning)] text-[var(--warning)]"
                    }`}
                  >
                    {intern.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t-2 border-[var(--border-soft)] pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-2)]">
                  <span>TRACK · {intern.track}</span>
                  <span>{intern.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}

function Stat({
  label,
  value,
  sub,
  bordered = false,
  highlight = false,
}: {
  label: string;
  value: string;
  sub?: string;
  bordered?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1 p-5 ${
        bordered
          ? "border-b-2 border-r-2 border-[var(--border-soft)] [&:nth-child(2n)]:border-r-0"
          : ""
      }`}
    >
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {label}
      </span>
      <span
        className={`font-display text-[28px] font-extrabold leading-none tracking-[-0.01em] ${
          highlight ? "text-[var(--accent)]" : "text-[var(--text)]"
        }`}
      >
        {value}
      </span>
      {sub && (
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-2)]">
          {sub}
        </span>
      )}
    </div>
  );
}

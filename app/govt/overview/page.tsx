"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { Activity, CheckCircle2, Clock, FileCheck2 } from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  portalActivity,
  portalApprovals,
  portalDirectory,
  type PortalApproval,
} from "@/lib/data";
import { useLocalState } from "@/lib/store";
import { cn } from "@/lib/utils";

const districtCompanies = [
  {
    name: "Neon AI Systems",
    cin: "ASC-COMP-2041",
    sector: "AI Infrastructure",
    tier: "Tier I",
    founders: 4,
    headcount: 14,
    hiring: 84,
    status: "Operational",
  },
  {
    name: "AIM States Labs",
    cin: "ASC-COMP-2042",
    sector: "GovTech",
    tier: "Tier II",
    founders: 3,
    headcount: 11,
    hiring: 76,
    status: "Operational",
  },
  {
    name: "Quantum Valley Systems",
    cin: "ASC-COMP-2055",
    sector: "Quantum / Robotics",
    tier: "Tier I",
    founders: 5,
    headcount: 19,
    hiring: 91,
    status: "Operational",
  },
  {
    name: "Saral Health",
    cin: "ASC-COMP-2068",
    sector: "BioTech",
    tier: "Tier II",
    founders: 2,
    headcount: 7,
    hiring: 86,
    status: "Operational",
  },
  {
    name: "Krish Mobility",
    cin: "ASC-COMP-2074",
    sector: "Robotics",
    tier: "Tier II",
    founders: 3,
    headcount: 9,
    hiring: 78,
    status: "Operational",
  },
];

const statusColor: Record<string, string> = {
  APPROVED: "var(--success)",
  "UNDER REVIEW": "var(--warning)",
  "PENDING DOCS": "var(--accent)",
};

type ApprovalState = Record<string, PortalApproval["status"]>;

export default function GovtOverviewPage() {
  const [overrides, setOverrides] = useLocalState<ApprovalState>(
    "asc.govt.approvals",
    {}
  );

  const approvals = useMemo(
    () =>
      portalApprovals.map((a) => ({
        ...a,
        status: overrides[a.id] ?? a.status,
      })),
    [overrides]
  );

  const counts = useMemo(() => {
    const c = { APPROVED: 0, "UNDER REVIEW": 0, "PENDING DOCS": 0 };
    approvals.forEach((a) => {
      c[a.status as keyof typeof c] = (c[a.status as keyof typeof c] ?? 0) + 1;
    });
    return c;
  }, [approvals]);

  const handle = (id: string, next: PortalApproval["status"]) => {
    setOverrides({ ...overrides, [id]: next });
  };

  return (
    <PortalShell variant="govt">
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ DISTRICT ADMINISTRATION · ECOSYSTEM OVERSIGHT ]"
          title="District Administration Console"
          body="Cross-tenant view of every company, founder, residency application, and operational signal inside Amaravati Startup Capital · District 01. Department of IT, Government of Andhra Pradesh."
          trailing={
            <>
              <StatusPill kind="active" label="LIVE · ECOSYSTEM" pulse />
              <StatusPill kind="verified" label="DEPT. OF IT · AP" />
            </>
          }
        />

        {/* Aggregate KPI grid */}
        <section>
          <div className="mb-4 label">[ DISTRICT-WIDE AGGREGATES ]</div>
          <div className="grid grid-cols-2 gap-0 border-2 border-[var(--border)] sm:grid-cols-3 lg:grid-cols-6">
            <Aggregate
              label="FOUNDERS"
              value="127"
              delta="+12 this week"
              highlight
            />
            <Aggregate label="STARTUPS" value="42" delta="+4 this week" middle />
            <Aggregate
              label="ACTIVE PERMITS"
              value="318"
              delta="9-day avg processing"
              middle
            />
            <Aggregate
              label="AP JOBS"
              value="318"
              delta="91% local"
              middle
            />
            <Aggregate
              label="COMPLIANCE"
              value="91%"
              delta="all tenants verified"
              middle
            />
            <Aggregate
              label="ACTIVITY"
              value="₹8.4 CR"
              delta="projected · Q1"
              last
            />
          </div>
        </section>

        {/* Per-company breakdown */}
        <section id="companies">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="label">[ ALL COMPANIES · CROSS-TENANT VIEW ]</div>
              <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
                {districtCompanies.length} registered companies · sorted by hiring %
              </h2>
            </div>
            <Button variant="secondary" size="sm">
              <FileCheck2 className="h-3.5 w-3.5" strokeWidth={2} />
              EXPORT REGISTRY
            </Button>
          </div>

          <div className="border-2 border-[var(--border)] bg-white">
            <div className="grid grid-cols-[1.6fr_1.2fr_1.2fr_80px_80px_1fr_120px] gap-4 border-b-2 border-[var(--border)] bg-[var(--header-dark)] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/80">
              <span>COMPANY · CIN</span>
              <span>SECTOR</span>
              <span>TIER</span>
              <span>FOUNDERS</span>
              <span>HEADCOUNT</span>
              <span>LOCAL HIRING</span>
              <span>STATUS</span>
            </div>
            {districtCompanies.map((c, i) => (
              <motion.div
                key={c.cin}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="grid grid-cols-[1.6fr_1.2fr_1.2fr_80px_80px_1fr_120px] items-center gap-4 border-b border-[var(--border-soft)] px-5 py-3.5 last:border-b-0 hover:bg-[#FAFAFB]"
              >
                <div className="flex flex-col leading-tight">
                  <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
                    {c.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                    {c.cin}
                  </span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-2)]">
                  {c.sector}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text)]">
                  {c.tier}
                </span>
                <span className="font-display text-[14px] font-bold text-[var(--text)]">
                  {c.founders}
                </span>
                <span className="font-display text-[14px] font-bold text-[var(--text)]">
                  {c.headcount}
                </span>
                <div className="flex items-center gap-3">
                  <Progress value={c.hiring} />
                  <span className="font-mono text-[11px] tabular-nums text-[var(--text)]">
                    {c.hiring}%
                  </span>
                </div>
                <span className="self-start border-[1.5px] border-[var(--success)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--success)]">
                  {c.status.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Residency Approvals queue */}
        <section id="approvals">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="label">[ RESIDENCY APPROVALS · INBOUND QUEUE ]</div>
              <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
                {approvals.length} applications · awaiting district registrar
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="border-[1.5px] border-[var(--success)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--success)]">
                {counts.APPROVED} APPROVED
              </span>
              <span className="border-[1.5px] border-[var(--warning)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--warning)]">
                {counts["UNDER REVIEW"]} REVIEW
              </span>
              <span className="border-[1.5px] border-[var(--accent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
                {counts["PENDING DOCS"]} PENDING
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {approvals.map((app, i) => {
              const recentlyApproved = overrides[app.id] === "APPROVED";
              return (
                <motion.div
                  key={app.id}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className={cn(
                    "grid grid-cols-1 gap-0 border-2 border-[var(--border)] bg-white transition-colors lg:grid-cols-[1fr_220px]",
                    recentlyApproved && "ring-2 ring-[var(--accent)]"
                  )}
                >
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-5 sm:grid-cols-4 lg:border-r-2 lg:border-[var(--border-soft)]">
                    <div className="flex flex-col leading-tight sm:col-span-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                        APPLICANT · {app.id}
                      </span>
                      <span className="mt-1 font-display text-[16px] font-bold uppercase tracking-[0.02em] text-[var(--text)]">
                        {app.applicant}
                      </span>
                      <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-2)]">
                        {app.origin}
                      </span>
                    </div>
                    <Field k="APPLYING WITH" v={app.company} />
                    <Field k="PERMIT TYPE" v={app.type} />
                    <Field k="SUBMITTED" v={app.submittedOn} />
                    <Field k="DOCUMENTS" v={app.documents} />
                  </div>

                  <div className="flex flex-col items-stretch justify-center gap-2 border-t-2 border-[var(--border-soft)] p-5 lg:border-t-0">
                    <span
                      className="text-center border-[1.5px] px-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]"
                      style={{
                        borderColor: statusColor[app.status],
                        color: statusColor[app.status],
                      }}
                    >
                      {app.status}
                    </span>
                    {app.status !== "APPROVED" ? (
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handle(app.id, "APPROVED")}
                        >
                          <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                          APPROVE
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handle(app.id, "PENDING DOCS")}
                        >
                          <Clock className="h-3 w-3" strokeWidth={2} />
                          REQUEST
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handle(app.id, "UNDER REVIEW")}
                      >
                        REVERT TO REVIEW
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Founders */}
        <section id="founders">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="label">[ ALL FOUNDERS · DISTRICT CENSUS ]</div>
              <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
                {portalDirectory.length} founders across {districtCompanies.length} companies
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              CROSS-TENANT VIEW
            </span>
          </div>

          <div className="border-2 border-[var(--border)] bg-white">
            <div className="grid grid-cols-[1.4fr_1.6fr_1fr_1fr_120px_80px] gap-4 border-b-2 border-[var(--border)] bg-[var(--header-dark)] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/80">
              <span>FOUNDER</span>
              <span>COMPANY</span>
              <span>SECTOR</span>
              <span>STATUS</span>
              <span>ROLE</span>
              <span>SCORE</span>
            </div>
            {portalDirectory.slice(0, 10).map((f) => (
              <div
                key={f.id}
                className="grid grid-cols-[1.4fr_1.6fr_1fr_1fr_120px_80px] items-center gap-4 border-b border-[var(--border-soft)] px-5 py-3 last:border-b-0 hover:bg-[#FAFAFB]"
              >
                <div className="flex flex-col leading-tight">
                  <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
                    {f.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                    {f.city}
                  </span>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text-2)]">
                  {f.company}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text)]">
                  {f.sector}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--success)]">
                  {f.residencyStatus}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-[var(--text-2)]">
                  {f.founderType}
                </span>
                <span className="font-display text-[14px] font-bold text-[var(--accent)]">
                  {f.contributionScore}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-right font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
            + {portalDirectory.length - 10} MORE FOUNDERS
          </div>
        </section>

        {/* Activity stream */}
        <section id="activity">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="label">[ OPERATIONAL ACTIVITY · DISTRICT-WIDE ]</div>
              <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
                Live feed across every tenant
              </h2>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)]">
              <Activity className="h-3 w-3" strokeWidth={2} />
              STREAMING
            </span>
          </div>

          <div className="grid grid-cols-1 gap-0 border-2 border-[var(--border)] bg-white md:grid-cols-2">
            {portalActivity.map((a, i) => (
              <div
                key={a.id}
                className={cn(
                  "border-b border-[var(--border-soft)] px-5 py-3.5",
                  i % 2 === 0 ? "md:border-r" : "",
                  i >= portalActivity.length - 2 && "md:border-b-0"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
                    {a.kind}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                    {a.timestamp}
                  </span>
                </div>
                <p className="mt-1.5 font-mono text-[11px] leading-snug text-[var(--text)]">
                  {a.title}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PortalShell>
  );
}

function Aggregate({
  label,
  value,
  delta,
  highlight,
  middle,
  last,
}: {
  label: string;
  value: string;
  delta: string;
  highlight?: boolean;
  middle?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1.5 p-5",
        last
          ? ""
          : middle
          ? "border-b-2 border-r-2 border-[var(--border-soft)] sm:border-b-0 sm:border-r-2"
          : "border-b-2 border-r-2 border-[var(--border-soft)] sm:border-b-0 sm:border-r-2"
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {label}
      </span>
      <span
        className={cn(
          "font-display text-[28px] font-extrabold leading-none tracking-[-0.01em]",
          highlight ? "text-[var(--accent)]" : "text-[var(--text)]"
        )}
      >
        {value}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-2)]">
        {delta}
      </span>
    </div>
  );
}

function Field({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-1 leading-tight">
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {k}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text)]">
        {v}
      </span>
    </div>
  );
}

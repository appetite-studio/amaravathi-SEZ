"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Activity,
  AlertTriangle,
  CircleDot,
  Clock,
  CheckCircle2,
  FileCheck2,
  Flag,
  MapPin,
  MoreVertical,
  Radio,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Snowflake,
  Stamp,
  TrendingUp,
} from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  portalActivity,
  portalApprovals,
  portalDirectory,
  type PortalActivityItem,
  type PortalApproval,
} from "@/lib/data";
import { useLocalState } from "@/lib/store";
import { cn } from "@/lib/utils";

type RiskLevel = "LOW" | "STANDARD" | "ELEVATED";

type DistrictCompany = {
  name: string;
  cin: string;
  sector: string;
  tier: string;
  founders: number;
  headcount: number;
  hiring: number;
  status: string;
  riskLevel: RiskLevel;
  lastReviewed: string;
  reviewer: string;
  hiringTrend: number[];
  founderOrigins: { city: string; count: number }[];
  permitHistory: { date: string; event: string }[];
  incentives: string[];
  contributionScore: number;
};

const districtCompanies: DistrictCompany[] = [
  {
    name: "Neon AI Systems",
    cin: "ASC-COMP-2041",
    sector: "AI Infrastructure",
    tier: "Tier I",
    founders: 4,
    headcount: 14,
    hiring: 84,
    status: "Operational",
    riskLevel: "LOW",
    lastReviewed: "2h ago",
    reviewer: "District Registrar",
    hiringTrend: [62, 68, 74, 78, 81, 84, 84],
    founderOrigins: [
      { city: "Vijayawada, AP", count: 1 },
      { city: "Singapore", count: 1 },
      { city: "Taipei", count: 1 },
      { city: "Kochi, KL", count: 1 },
    ],
    permitHistory: [
      { date: "12 Mar 2026", event: "Founder Residency · Diya Rajiv issued" },
      { date: "18 Mar 2026", event: "Founder Residency · Aarav Menon issued" },
      { date: "21 Mar 2026", event: "Visiting Researcher · Wei Lin issued" },
      { date: "04 Apr 2026", event: "Founder Residency · Priya Nair issued" },
    ],
    incentives: ["TAX · CLASS A", "RESIDENCY SUBSIDY", "SKILLS FUND", "DATA CORRIDOR"],
    contributionScore: 847,
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
    riskLevel: "STANDARD",
    lastReviewed: "5h ago",
    reviewer: "Sr. Deputy Registrar",
    hiringTrend: [54, 58, 62, 66, 70, 72, 76],
    founderOrigins: [
      { city: "San Francisco", count: 1 },
      { city: "Vijayawada, AP", count: 1 },
      { city: "Hyderabad", count: 1 },
    ],
    permitHistory: [
      { date: "02 Mar 2026", event: "Founder Residency · K. Iyer issued" },
      { date: "09 Mar 2026", event: "Founder Residency · 2 issued" },
      { date: "01 Apr 2026", event: "Workspace allocation · Tower A · L8" },
    ],
    incentives: ["POLICY ACCESS", "SKILLS FUND", "MENTOR NETWORK"],
    contributionScore: 712,
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
    riskLevel: "LOW",
    lastReviewed: "1h ago",
    reviewer: "District Registrar",
    hiringTrend: [72, 78, 82, 85, 88, 90, 91],
    founderOrigins: [
      { city: "Vienna", count: 1 },
      { city: "Hyderabad, IN", count: 2 },
      { city: "Visakhapatnam, AP", count: 1 },
      { city: "Stockholm", count: 1 },
    ],
    permitHistory: [
      { date: "20 Feb 2026", event: "Incorporation · ASC-COMP-2055" },
      { date: "28 Feb 2026", event: "Founder Residency · 3 issued" },
      { date: "14 Mar 2026", event: "Visiting Researcher · 2 issued" },
      { date: "02 Apr 2026", event: "Lab access (GPU) approved" },
    ],
    incentives: ["TAX · CLASS A", "RESIDENCY SUBSIDY", "DATA CORRIDOR", "GLOBAL TRADE"],
    contributionScore: 894,
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
    riskLevel: "ELEVATED",
    lastReviewed: "8h ago",
    reviewer: "Compliance Officer",
    hiringTrend: [45, 52, 58, 64, 72, 80, 86],
    founderOrigins: [
      { city: "Hyderabad", count: 1 },
      { city: "Tirupati, AP", count: 1 },
    ],
    permitHistory: [
      { date: "16 Mar 2026", event: "Incorporation · ASC-COMP-2068" },
      { date: "01 Apr 2026", event: "Compliance review opened · Q1 cycle" },
    ],
    incentives: ["SKILLS FUND", "MENTOR NETWORK"],
    contributionScore: 482,
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
    riskLevel: "STANDARD",
    lastReviewed: "12h ago",
    reviewer: "Sr. Deputy Registrar",
    hiringTrend: [60, 64, 68, 70, 72, 76, 78],
    founderOrigins: [
      { city: "Bangalore", count: 1 },
      { city: "Vijayawada, AP", count: 1 },
      { city: "Chennai", count: 1 },
    ],
    permitHistory: [
      { date: "24 Mar 2026", event: "Incorporation · ASC-COMP-2074" },
      { date: "11 Apr 2026", event: "Lab allocation · Quantum Zone" },
    ],
    incentives: ["POLICY ACCESS", "SKILLS FUND"],
    contributionScore: 538,
  },
];

const systemNotices = [
  {
    id: "n1",
    kind: "POLICY",
    title: "Notice 014/2026 · AP Policy Tier II update effective 14 Apr 2026",
    detail: "Capex rebate window extended for AI x Gov sub-category.",
  },
  {
    id: "n2",
    kind: "SLA",
    title: "Founder residency SLA reduced to 9 days",
    detail: "Effective 01 Apr 2026. Visiting researcher: 14 days.",
  },
  {
    id: "n3",
    kind: "CAPACITY",
    title: "Tower C occupancy reached 82%",
    detail: "New allocations routed to Tower B until 01 May.",
  },
  {
    id: "n4",
    kind: "COMPLIANCE",
    title: "3 compliance reviews scheduled this week",
    detail: "Saral Health · 12 Apr · 14:00 IST.",
  },
];

const districtZones = [
  { name: "Tower A", code: "ZN-01", capacity: "Sector A · L1–L9", occupancy: 92, status: "OPERATIONAL" },
  { name: "Tower B", code: "ZN-02", capacity: "Sector A · L10–L18", occupancy: 78, status: "OPERATIONAL" },
  { name: "Tower C", code: "ZN-03", capacity: "Sector A · L19–L24", occupancy: 82, status: "AT CAPACITY" },
  { name: "Quantum Zone", code: "ZN-04", capacity: "Sector B · Lab Wing", occupancy: 64, status: "OPERATIONAL" },
  { name: "AI Cluster", code: "ZN-05", capacity: "Sector B · Compute Wing", occupancy: 88, status: "OPERATIONAL" },
  { name: "Founder Housing", code: "ZN-06", capacity: "Sector A · Residency", occupancy: 71, status: "OPERATIONAL" },
];

const authorityActions = [
  { id: "flag-compliance", label: "Flag compliance review", icon: Flag, kind: "COMPLIANCE" },
  { id: "issue-provisional", label: "Issue provisional permit", icon: Stamp, kind: "POLICY" },
  { id: "freeze-incentives", label: "Freeze incentives", icon: Snowflake, kind: "POLICY" },
  { id: "request-audit", label: "Request audit documents", icon: FileCheck2, kind: "COMPLIANCE" },
  { id: "escalate-registrar", label: "Escalate to registrar", icon: ShieldAlert, kind: "RESIDENCY" },
];

const statusColor: Record<string, string> = {
  APPROVED: "var(--success)",
  "UNDER REVIEW": "var(--warning)",
  "PENDING DOCS": "var(--accent)",
};

const riskColor: Record<RiskLevel, string> = {
  LOW: "var(--success)",
  STANDARD: "var(--text-2)",
  ELEVATED: "var(--warning)",
};

const noticeKindColor: Record<string, string> = {
  POLICY: "var(--accent)",
  SLA: "var(--text)",
  CAPACITY: "var(--warning)",
  COMPLIANCE: "var(--success)",
};

const zoneStatusColor: Record<string, string> = {
  OPERATIONAL: "var(--success)",
  "AT CAPACITY": "var(--warning)",
};

type ApprovalState = Record<string, PortalApproval["status"]>;
type FounderDelta = Record<string, number>;
type CompanyFlags = Record<string, string[]>;

export default function GovtOverviewPage() {
  const [overrides, setOverrides] = useLocalState<ApprovalState>(
    "asc.govt.approvals",
    {}
  );
  const [recentActivity, setRecentActivity] = useLocalState<PortalActivityItem[]>(
    "asc.govt.recentActivity",
    []
  );
  const [founderDelta, setFounderDelta] = useLocalState<FounderDelta>(
    "asc.govt.founderDelta",
    {}
  );
  const [companyFlags, setCompanyFlags] = useLocalState<CompanyFlags>(
    "asc.govt.companyFlags",
    {}
  );
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [pulseKey, setPulseKey] = useState(0);
  const idCounter = useRef(0);
  const nextId = () => `${++idCounter.current}`;

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

  const handleApprove = (app: PortalApproval) => {
    setOverrides({ ...overrides, [app.id]: "APPROVED" });
    setRecentActivity([
      {
        id: `${app.id}-approved-${nextId()}`,
        title: `${app.applicant} · residency approved · ${app.company}`,
        kind: "RESIDENCY",
        timestamp: "JUST NOW",
      },
      ...recentActivity,
    ].slice(0, 8));
    if (districtCompanies.find((c) => c.name === app.company)) {
      setFounderDelta({
        ...founderDelta,
        [app.company]: (founderDelta[app.company] ?? 0) + 1,
      });
    }
    setPulseKey((k) => k + 1);
  };

  const handleRequest = (app: PortalApproval) => {
    setOverrides({ ...overrides, [app.id]: "PENDING DOCS" });
    setRecentActivity([
      {
        id: `${app.id}-request-${nextId()}`,
        title: `${app.applicant} · documents requested`,
        kind: "RESIDENCY",
        timestamp: "JUST NOW",
      },
      ...recentActivity,
    ].slice(0, 8));
    setPulseKey((k) => k + 1);
  };

  const handleRevert = (app: PortalApproval) => {
    setOverrides({ ...overrides, [app.id]: "UNDER REVIEW" });
    if (founderDelta[app.company]) {
      setFounderDelta({
        ...founderDelta,
        [app.company]: Math.max(0, (founderDelta[app.company] ?? 0) - 1),
      });
    }
    setPulseKey((k) => k + 1);
  };

  const handleAuthorityAction = (
    company: DistrictCompany,
    action: (typeof authorityActions)[number]
  ) => {
    const flags = companyFlags[company.name] ?? [];
    setCompanyFlags({
      ...companyFlags,
      [company.name]: [action.id, ...flags.filter((f) => f !== action.id)].slice(
        0,
        3
      ),
    });
    setRecentActivity([
      {
        id: `${company.name}-${action.id}-${nextId()}`,
        title: `${company.name} · ${action.label.toLowerCase()}`,
        kind: action.kind,
        timestamp: "JUST NOW",
      },
      ...recentActivity,
    ].slice(0, 8));
    setPulseKey((k) => k + 1);
  };

  const liveActivity = useMemo(
    () => [...recentActivity, ...portalActivity].slice(0, 16),
    [recentActivity]
  );

  return (
    <PortalShell variant="govt">
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ DISTRICT ADMINISTRATION · ECOSYSTEM OVERSIGHT ]"
          title="District Administration Console"
          body="Cross-tenant view of every company, founder, residency application, and operational signal inside Amaravati Startup Capital · District 01. Department of IT, Government of Andhra Pradesh."
          trailing={
            <>
              <motion.span
                key={pulseKey}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-flex"
              >
                <StatusPill kind="active" label="LIVE · ECOSYSTEM" pulse />
              </motion.span>
              <StatusPill kind="verified" label="DEPT. OF IT · AP" />
            </>
          }
        />

        {/* System Notices strip */}
        <SystemNoticesStrip />

        {/* Aggregate KPI grid */}
        <section>
          <div className="mb-4 label">[ DISTRICT-WIDE AGGREGATES ]</div>
          <div className="grid grid-cols-2 gap-0 border-2 border-[var(--border)] sm:grid-cols-3 lg:grid-cols-6">
            <Aggregate label="FOUNDERS" value="127" delta="+12 this week" highlight />
            <Aggregate label="STARTUPS" value="42" delta="+4 this week" middle />
            <Aggregate
              label="ACTIVE PERMITS"
              value="318"
              delta="9-day avg processing"
              middle
            />
            <Aggregate label="AP JOBS" value="318" delta="91% local" middle />
            <Aggregate
              label="COMPLIANCE"
              value="91%"
              delta="all tenants verified"
              middle
            />
            <Aggregate label="ACTIVITY" value="₹8.4 CR" delta="projected · Q1" last />
          </div>
        </section>

        {/* Zone Allocation mini panel */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <div className="label">[ DISTRICT MAP · ZONE ALLOCATION ]</div>
              <h2 className="mt-2 font-display text-[20px] font-bold tracking-[-0.01em]">
                6 zones · live occupancy
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              16.516° N · 80.518° E
            </span>
          </div>
          <div className="grid grid-cols-2 gap-0 border-2 border-[var(--border)] sm:grid-cols-3 lg:grid-cols-6">
            {districtZones.map((z, i) => (
              <ZoneCell key={z.code} zone={z} index={i} total={districtZones.length} />
            ))}
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
            <div className="grid grid-cols-[1.6fr_1.1fr_0.8fr_70px_70px_0.9fr_120px_120px_36px] gap-3 border-b-2 border-[var(--border)] bg-[var(--header-dark)] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/80">
              <span>COMPANY · CIN</span>
              <span>SECTOR</span>
              <span>TIER</span>
              <span>FNDRS</span>
              <span>HEAD</span>
              <span>HIRING</span>
              <span>RISK</span>
              <span>LAST REVIEW</span>
              <span></span>
            </div>
            {districtCompanies.map((c, i) => {
              const delta = founderDelta[c.name] ?? 0;
              const expanded = expandedCompany === c.name;
              const flags = companyFlags[c.name] ?? [];
              return (
                <div key={c.cin}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                    onClick={() =>
                      setExpandedCompany(expanded ? null : c.name)
                    }
                    className={cn(
                      "grid cursor-pointer grid-cols-[1.6fr_1.1fr_0.8fr_70px_70px_0.9fr_120px_120px_36px] items-center gap-3 border-b border-[var(--border-soft)] px-5 py-3.5 transition-colors hover:bg-[#FAFAFB]",
                      expanded && "bg-[var(--accent-soft)]"
                    )}
                  >
                    <div className="flex flex-col leading-tight">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
                          {c.name}
                        </span>
                        {flags.length > 0 && (
                          <span
                            className="inline-flex items-center gap-1 border-[1.5px] border-[var(--accent)] px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--accent)]"
                            title="Authority actions logged"
                          >
                            <Flag className="h-2.5 w-2.5" strokeWidth={2.5} />
                            {flags.length}
                          </span>
                        )}
                      </div>
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
                    <span className="flex items-baseline gap-1 font-display text-[14px] font-bold text-[var(--text)]">
                      {c.founders + delta}
                      {delta > 0 && (
                        <motion.span
                          initial={{ opacity: 0, y: -3 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="font-mono text-[9px] tracking-[0.22em] text-[var(--accent)]"
                        >
                          +{delta}
                        </motion.span>
                      )}
                    </span>
                    <span className="font-display text-[14px] font-bold text-[var(--text)]">
                      {c.headcount}
                    </span>
                    <div className="flex items-center gap-2">
                      <Progress value={c.hiring} />
                      <span className="font-mono text-[10px] tabular-nums text-[var(--text)]">
                        {c.hiring}%
                      </span>
                    </div>
                    <RiskPill level={c.riskLevel} />
                    <div className="flex flex-col leading-tight">
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text)]">
                        {c.lastReviewed}
                      </span>
                      <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                        {c.reviewer}
                      </span>
                    </div>
                    <AuthorityDropdown
                      company={c}
                      onAction={(a) => handleAuthorityAction(c, a)}
                    />
                  </motion.div>

                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden border-b-2 border-[var(--border-soft)] bg-[#FAFAFB]"
                      >
                        <CompanyIntelligence company={c} flags={flags} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
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
                    "grid grid-cols-1 gap-0 border-2 border-[var(--border)] bg-white transition-colors lg:grid-cols-[1fr_240px]",
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
                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        <RiskPill
                          level={(app.riskLevel ?? "STANDARD") as RiskLevel}
                        />
                      </div>
                    </div>
                    <Field k="APPLYING WITH" v={app.company} />
                    <Field k="PERMIT TYPE" v={app.type} />
                    <Field k="SUBMITTED" v={app.submittedOn} />
                    <Field k="DOCUMENTS" v={app.documents} />
                    <div className="flex flex-col gap-1 leading-tight sm:col-span-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                        OFFICER ASSIGNED
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text)]">
                        {app.officer ?? "Unassigned"}
                      </span>
                    </div>
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
                          onClick={() => handleApprove(app)}
                        >
                          <CheckCircle2 className="h-3 w-3" strokeWidth={2} />
                          APPROVE
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleRequest(app)}
                        >
                          <Clock className="h-3 w-3" strokeWidth={2} />
                          REQUEST
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleRevert(app)}
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
            <AnimatePresence initial={false}>
              {liveActivity.map((a, i) => {
                const isFresh = a.timestamp === "JUST NOW";
                return (
                  <motion.div
                    key={a.id}
                    layout
                    initial={
                      isFresh ? { opacity: 0, x: -8, backgroundColor: "var(--accent-soft)" } : { opacity: 1 }
                    }
                    animate={{ opacity: 1, x: 0, backgroundColor: "rgba(255,255,255,0)" }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className={cn(
                      "border-b border-[var(--border-soft)] px-5 py-3.5",
                      i % 2 === 0 ? "md:border-r" : "",
                      i >= liveActivity.length - 2 && "md:border-b-0"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.22em]"
                        style={{
                          color: isFresh ? "var(--accent)" : "var(--text-2)",
                        }}
                      >
                        {a.kind}
                      </span>
                      <span
                        className={cn(
                          "font-mono text-[9px] uppercase tracking-[0.22em]",
                          isFresh ? "text-[var(--accent)]" : "text-[var(--text-3)]"
                        )}
                      >
                        {isFresh && (
                          <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)] align-middle" />
                        )}
                        {a.timestamp}
                      </span>
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] leading-snug text-[var(--text)]">
                      {a.title}
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </PortalShell>
  );
}

/* -------------------------------------------------------------------------
   System Notices strip — operational tension at the top of the console.
   ------------------------------------------------------------------------- */

function SystemNoticesStrip() {
  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <div className="label">[ SYSTEM NOTICES · DISTRICT CHANNEL ]</div>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
          <Radio className="h-3 w-3" strokeWidth={2} />
          BROADCASTING
        </span>
      </div>
      <div className="grid grid-cols-1 gap-0 border-2 border-[var(--border)] bg-white sm:grid-cols-2 lg:grid-cols-4">
        {systemNotices.map((n, i) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="relative flex flex-col gap-2 border-b-2 border-r-2 border-[var(--border-soft)] p-4 last:border-r-0 sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r-2 lg:[&:nth-child(4n)]:border-r-0"
          >
            <span
              className="absolute left-0 top-0 h-full w-[3px]"
              style={{ backgroundColor: noticeKindColor[n.kind] }}
            />
            <div className="flex items-center justify-between pl-2">
              <span
                className="font-mono text-[9px] uppercase tracking-[0.22em]"
                style={{ color: noticeKindColor[n.kind] }}
              >
                {n.kind}
              </span>
              <CircleDot
                className="h-3 w-3"
                strokeWidth={2}
                style={{ color: noticeKindColor[n.kind] }}
              />
            </div>
            <h4 className="pl-2 font-mono text-[11px] uppercase leading-snug tracking-[0.04em] text-[var(--text)]">
              {n.title}
            </h4>
            <p className="pl-2 font-mono text-[10px] leading-snug text-[var(--text-2)]">
              {n.detail}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------
   Zone Allocation — district map mini panel.
   ------------------------------------------------------------------------- */

function ZoneCell({
  zone,
  index,
  total,
}: {
  zone: (typeof districtZones)[number];
  index: number;
  total: number;
}) {
  const accent = zoneStatusColor[zone.status];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className={cn(
        "flex flex-col gap-2 p-4",
        "border-b-2 border-r-2 border-[var(--border-soft)]",
        index === total - 1 ? "" : "",
        // hide right border on last column per breakpoint
        "sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r-2 lg:[&:nth-child(6n)]:border-r-0"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1.5">
          <MapPin
            className="h-3 w-3"
            strokeWidth={2}
            style={{ color: accent }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text)]">
            {zone.name}
          </span>
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          {zone.code}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display text-[22px] font-extrabold leading-none tracking-[-0.01em] text-[var(--text)]">
          {zone.occupancy}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-2)]">
          %
        </span>
      </div>
      <div className="h-1 w-full bg-[var(--border-soft)]">
        <div
          className="h-full"
          style={{ width: `${zone.occupancy}%`, backgroundColor: accent }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          {zone.capacity}
        </span>
        <span
          className="font-mono text-[8px] uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          {zone.status}
        </span>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------
   Authority dropdown menu — district registrar action set.
   ------------------------------------------------------------------------- */

function AuthorityDropdown({
  company,
  onAction,
}: {
  company: DistrictCompany;
  onAction: (action: (typeof authorityActions)[number]) => void;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          aria-label={`Authority actions for ${company.name}`}
          className="inline-flex h-8 w-8 items-center justify-center border-[1.5px] border-[var(--border-soft)] text-[var(--text-2)] transition-colors hover:border-[var(--border)] hover:text-[var(--text)] focus:outline-none focus:border-[var(--border)]"
        >
          <MoreVertical className="h-4 w-4" strokeWidth={1.5} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-50 min-w-[260px] border-2 border-[var(--border)] bg-white shadow-[var(--shadow-brutal)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b-2 border-[var(--border-soft)] bg-[var(--header-dark)] px-3 py-2 text-white">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/80">
              [ AUTHORITY ACTIONS ]
            </span>
            <Shield className="h-3 w-3 text-[var(--accent)]" strokeWidth={2} />
          </div>
          <div className="border-b border-[var(--border-soft)] px-3 py-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              {company.cin} · {company.tier}
            </span>
          </div>
          {authorityActions.map((action) => {
            const Icon = action.icon;
            return (
              <DropdownMenu.Item
                key={action.id}
                onSelect={() => onAction(action)}
                className="flex cursor-pointer items-center gap-3 px-3 py-2.5 text-[12px] text-[var(--text)] outline-none transition-colors data-[highlighted]:bg-[var(--accent-soft)]"
              >
                <Icon
                  className="h-3.5 w-3.5 text-[var(--text-2)]"
                  strokeWidth={1.5}
                />
                <span className="font-mono uppercase tracking-[0.04em]">
                  {action.label}
                </span>
              </DropdownMenu.Item>
            );
          })}
          <div className="border-t-2 border-[var(--border-soft)] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
            Logged to district audit trail
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

/* -------------------------------------------------------------------------
   Company Intelligence drawer — expanded row content.
   ------------------------------------------------------------------------- */

function CompanyIntelligence({
  company,
  flags,
}: {
  company: DistrictCompany;
  flags: string[];
}) {
  const max = Math.max(...company.hiringTrend);
  return (
    <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
      {/* Hiring trend */}
      <div className="border-b-2 border-[var(--border-soft)] p-5 lg:border-b-0 lg:border-r-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
            HIRING TREND · 7 CYCLES
          </span>
          <TrendingUp
            className="h-3 w-3 text-[var(--success)]"
            strokeWidth={2}
          />
        </div>
        <div className="mt-3 flex items-end gap-1.5" style={{ height: 64 }}>
          {company.hiringTrend.map((v, i) => (
            <div
              key={i}
              className="flex-1 bg-[var(--text)]"
              style={{ height: `${(v / max) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="font-display text-[24px] font-extrabold leading-none text-[var(--text)]">
            {company.hiring}%
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--success)]">
            +{company.hiring - company.hiringTrend[0]} pts
          </span>
        </div>
      </div>

      {/* Founder origins */}
      <div className="border-b-2 border-[var(--border-soft)] p-5 lg:border-b-0 lg:border-r-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          FOUNDER ORIGINS
        </span>
        <ul className="mt-3 flex flex-col gap-2">
          {company.founderOrigins.map((o) => (
            <li
              key={o.city}
              className="flex items-center justify-between text-[11px]"
            >
              <span className="flex items-center gap-1.5 font-mono uppercase tracking-[0.04em] text-[var(--text)]">
                <MapPin className="h-3 w-3 text-[var(--text-3)]" strokeWidth={2} />
                {o.city}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-2)]">
                ×{o.count}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Permit history */}
      <div className="border-b-2 border-[var(--border-soft)] p-5 lg:border-b-0 lg:border-r-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          PERMIT HISTORY
        </span>
        <ul className="mt-3 flex flex-col gap-2.5">
          {company.permitHistory.map((p, i) => (
            <li key={i} className="flex flex-col leading-tight">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                {p.date}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-[var(--text)]">
                {p.event}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Incentives + score */}
      <div className="p-5">
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          INCENTIVES UNLOCKED
        </span>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {company.incentives.map((inc) => (
            <span
              key={inc}
              className="border-[1.5px] border-[var(--border)] bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text)]"
            >
              {inc}
            </span>
          ))}
        </div>
        <div className="mt-5 border-t border-[var(--border-soft)] pt-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
            DISTRICT CONTRIBUTION SCORE
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-[28px] font-extrabold leading-none text-[var(--accent)]">
              {company.contributionScore}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-2)]">
              / 1000
            </span>
          </div>
          <div className="mt-2">
            <Progress value={(company.contributionScore / 1000) * 100} />
          </div>
        </div>
        {flags.length > 0 && (
          <div className="mt-5 border-t border-[var(--border-soft)] pt-3">
            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
              <AlertTriangle className="h-3 w-3" strokeWidth={2} />
              AUTHORITY FLAGS · {flags.length}
            </span>
            <ul className="mt-2 flex flex-col gap-1">
              {flags.map((f) => {
                const action = authorityActions.find((a) => a.id === f);
                return (
                  <li
                    key={f}
                    className="font-mono text-[10px] uppercase tracking-[0.04em] text-[var(--text)]"
                  >
                    · {action?.label ?? f}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   Risk pill — small authority signal.
   ------------------------------------------------------------------------- */

function RiskPill({ level }: { level: RiskLevel }) {
  const color = riskColor[level];
  const Icon =
    level === "ELEVATED"
      ? ShieldAlert
      : level === "STANDARD"
      ? Shield
      : ShieldCheck;
  return (
    <span
      className="inline-flex items-center gap-1.5 border-[1.5px] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em]"
      style={{ borderColor: color, color }}
    >
      <Icon className="h-2.5 w-2.5" strokeWidth={2.5} />
      RISK · {level}
    </span>
  );
}

/* -------------------------------------------------------------------------
   Aggregate KPI cell.
   ------------------------------------------------------------------------- */

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

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { ActivityPanel } from "@/components/portal-shell/activity-panel";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  portalCompany,
  portalFounders,
  portalResidency,
  portalHiring,
} from "@/lib/data";
import { IMG_AVATARS } from "@/lib/images";

export default function CompanyOverviewPage() {
  return (
    <PortalShell variant="company" activityPanel={<ActivityPanel />}>
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ DISTRICT NODE · OPERATIONAL ]"
          title={
            <>
              {portalCompany.name}
              <span className="ml-3 text-[var(--accent)]">·</span>
              <span className="ml-3 font-display text-[22px] font-bold uppercase tracking-[0.04em] text-[var(--text-2)] sm:text-[24px]">
                Inside the District
              </span>
            </>
          }
          body={`Operational console for ${portalCompany.legalName}. ${portalCompany.headcount} people. ${portalCompany.founderCount} founders. Compliance cycle ${portalCompany.complianceCycle.toLowerCase()}.`}
          trailing={
            <>
              <StatusPill kind="active" label="ENTITY OPERATIONAL" pulse />
              <StatusPill kind="verified" label="DISTRICT COMPLIANT" />
            </>
          }
        />

        {/* Hero card — registration banner */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-2 border-[var(--border)] bg-white"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[var(--border)] bg-[var(--accent)] px-6 py-4 text-white">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
              <span className="font-mono text-[12px] uppercase tracking-[0.18em]">
                DISTRICT REGISTRY · CERTIFIED ENTITY
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/80">
              {portalCompany.registrationId}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
            <RegistryField k="ENTITY TYPE" v={portalCompany.districtClassification} />
            <RegistryField k="STATUS" v={portalCompany.entityStatus} highlight />
            <RegistryField k="DISTRICT ACCESS" v={portalCompany.districtAccess} />
            <RegistryField k="SECTOR" v={portalCompany.sector} last />
          </div>

          <div className="grid grid-cols-1 gap-0 border-t-2 border-[var(--border-soft)] md:grid-cols-4">
            <RegistryField k="REGISTRATION ID" v={portalCompany.registrationId} />
            <RegistryField k="INCORPORATION" v={portalCompany.founded} />
            <RegistryField k="POLICY TIER" v={portalCompany.policyTier} />
            <RegistryField k="PERMIT STATUS" v={portalCompany.permitStatus} last />
          </div>

          <div className="flex flex-wrap items-center gap-2 border-t-2 border-[var(--border-soft)] bg-[var(--accent-soft)] px-6 py-3">
            {portalCompany.badges.map((b) => (
              <span
                key={b}
                className="border-[1.5px] border-[var(--border)] bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text)]"
              >
                {b}
              </span>
            ))}
            <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-2)]">
              SIGNED · DISTRICT REGISTRAR · {portalCompany.founded.toUpperCase()}
            </span>
          </div>
        </motion.div>

        {/* 5 hero cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Status */}
          <Card delay={0.05}>
            <CardLabel>[ COMPANY STATUS ]</CardLabel>
            <h3 className="mt-3 font-display text-[22px] font-bold leading-tight">
              Operational
            </h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-2)]">
              {portalCompany.subSector}
            </p>
            <div className="mt-5 flex flex-col gap-2 border-t-2 border-[var(--border-soft)] pt-4">
              <Row k="STAGE" v={portalCompany.stage} />
              <Row k="HEADCOUNT" v={String(portalCompany.headcount)} />
              <Row k="RUNWAY" v={`${portalCompany.runwayMonths} months`} />
            </div>
            <div className="mt-5">
              <StatusPill kind="active" label="ENTITY ACTIVE" pulse />
            </div>
          </Card>

          {/* Active Founders */}
          <Card delay={0.1}>
            <CardLabel>[ ACTIVE FOUNDERS ]</CardLabel>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.02em] text-[var(--text)]">
                {portalFounders.length}
              </span>
              <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-2)]">
                of {portalCompany.headcount}
              </span>
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              {portalResidency.summary.global} GLOBAL · {portalResidency.summary.apOrigin} AP ORIGIN
            </div>
            <div className="mt-5 flex -space-x-2 border-t-2 border-[var(--border-soft)] pt-4">
              {portalFounders.slice(0, 4).map((f) => (
                <div
                  key={f.id}
                  className="relative h-9 w-9 overflow-hidden border-2 border-white ring-1 ring-[var(--border)]"
                  title={f.name}
                >
                  <Image
                    src={IMG_AVATARS[f.avatarIndex % IMG_AVATARS.length]}
                    alt={f.name}
                    fill
                    sizes="36px"
                    className="object-cover grayscale-[10%]"
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-2)]">
              {portalFounders.map((f) => f.name.split(" ")[0]).join(" · ")}
            </div>
          </Card>

          {/* District Access */}
          <Card delay={0.15}>
            <CardLabel>[ DISTRICT ACCESS ]</CardLabel>
            <h3 className="mt-3 font-display text-[22px] font-bold leading-tight">
              Verified
            </h3>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              FULL DISTRICT ACCESS
            </p>
            <ul className="mt-5 flex flex-col gap-2 border-t-2 border-[var(--border-soft)] pt-4">
              {portalResidency.summary.districtPermissions
                .slice(0, 4)
                .map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-[12px] text-[var(--text)]"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--success)]"
                      strokeWidth={2}
                    />
                    <span>{p}</span>
                  </li>
                ))}
            </ul>
            <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              + 4 MORE PERMISSIONS
            </div>
          </Card>

          {/* Local Hiring */}
          <Card delay={0.2}>
            <CardLabel>[ LOCAL HIRING ]</CardLabel>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.02em] text-[var(--text)]">
                {Math.round(portalHiring.ratio * 100)}
              </span>
              <span className="font-mono text-[14px] uppercase tracking-[0.12em] text-[var(--text-2)]">
                %
              </span>
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              {portalHiring.apResidents} OF {portalHiring.headcount} AP RESIDENT HIRES
            </div>
            <div className="mt-5">
              <Progress value={portalHiring.ratio * 100} />
            </div>
            <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-2)]">
              <span className="text-[var(--success)]">
                +{Math.round((portalHiring.ratio - portalHiring.required) * 100)}%
              </span>{" "}
              over Tier I floor ({Math.round(portalHiring.required * 100)}%)
            </div>
            <div className="mt-5">
              <StatusPill kind="verified" label="COMPLIANCE VERIFIED" />
            </div>
          </Card>

          {/* Contribution Score */}
          <Card delay={0.25}>
            <CardLabel>[ DISTRICT CONTRIBUTION SCORE ]</CardLabel>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.02em] text-[var(--accent)]">
                {portalCompany.contributionScore}
              </span>
              <span className="font-mono text-[14px] uppercase tracking-[0.12em] text-[var(--text-2)]">
                / {portalCompany.contributionMax}
              </span>
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              {portalCompany.contributionTopBracket.toUpperCase()}
            </div>
            <div className="mt-5">
              <Progress
                value={
                  (portalCompany.contributionScore /
                    portalCompany.contributionMax) *
                  100
                }
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-y-2">
              <Row k="MENTOR HRS" v="14" />
              <Row k="HIRES" v={String(portalHiring.apResidents)} />
              <Row k="EVENTS" v="9" />
              <Row k="POLICY" v="2" />
            </div>
          </Card>

          {/* Permits & Access */}
          <Card delay={0.3}>
            <CardLabel>[ ACTIVE PERMITS ]</CardLabel>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-display text-[44px] font-extrabold leading-none tracking-[-0.02em] text-[var(--text)]">
                {portalResidency.summary.active +
                  portalResidency.summary.underReview}
              </span>
              <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--text-2)]">
                permits
              </span>
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-3)]">
              {portalResidency.summary.active} ACTIVE ·{" "}
              {portalResidency.summary.underReview} UNDER REVIEW
            </div>
            <ul className="mt-5 flex flex-col gap-2.5 border-t-2 border-[var(--border-soft)] pt-4">
              {portalResidency.permits.slice(0, 3).map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between gap-3 text-[12px]"
                >
                  <div className="flex flex-col leading-tight">
                    <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text)]">
                      {p.holder}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                      {p.type}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-[9px] uppercase tracking-[0.22em] ${
                      p.status === "ACTIVE ACCESS"
                        ? "text-[var(--success)]"
                        : "text-[var(--warning)]"
                    }`}
                  >
                    {p.status}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                asChild
              >
                <a href="/company/residency">
                  VIEW RESIDENCY LAYER
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}

function Card({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="border-2 border-[var(--border)] bg-white p-6 hover-brutal"
    >
      {children}
    </motion.div>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return <div className="label">{children}</div>;
}

function RegistryField({
  k,
  v,
  highlight,
  last,
}: {
  k: string;
  v: string;
  highlight?: boolean;
  last?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1.5 px-6 py-5 ${
        last
          ? ""
          : "border-b-2 border-[var(--border-soft)] md:border-b-0 md:border-r-2"
      }`}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {k}
      </span>
      <span
        className={`font-mono text-[14px] leading-tight ${
          highlight ? "text-[var(--accent)] font-bold uppercase" : "text-[var(--text)]"
        }`}
      >
        {v}
      </span>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between font-mono text-[11px]">
      <span className="uppercase tracking-[0.18em] text-[var(--text-3)]">
        {k}
      </span>
      <span className="text-[var(--text)]">{v}</span>
    </div>
  );
}

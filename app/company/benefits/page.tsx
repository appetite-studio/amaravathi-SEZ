"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock, Lock, Sparkles, type LucideIcon } from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { portalBenefits, portalCompany, type PortalBenefit } from "@/lib/data";
import { cn } from "@/lib/utils";

const statusIcon: Record<string, LucideIcon> = {
  ACTIVE: CheckCircle2,
  AVAILABLE: Sparkles,
  "UNDER REVIEW": Clock,
  LOCKED: Lock,
};

const statusColor: Record<string, { border: string; text: string; bar: string }> = {
  ACTIVE: {
    border: "border-[var(--success)]",
    text: "text-[var(--success)]",
    bar: "bg-[var(--success)]",
  },
  AVAILABLE: {
    border: "border-[var(--accent)]",
    text: "text-[var(--accent)]",
    bar: "bg-[var(--accent)]",
  },
  "UNDER REVIEW": {
    border: "border-[var(--warning)]",
    text: "text-[var(--warning)]",
    bar: "bg-[var(--warning)]",
  },
  LOCKED: {
    border: "border-[var(--border-soft)]",
    text: "text-[var(--text-3)]",
    bar: "bg-[var(--text-3)]",
  },
};

export default function DistrictBenefitsPage() {
  const grouped = portalBenefits.items.reduce<Record<string, PortalBenefit[]>>(
    (acc, b) => {
      acc[b.status] = acc[b.status] ?? [];
      acc[b.status].push(b);
      return acc;
    },
    {}
  );

  const counts = {
    ACTIVE: grouped.ACTIVE?.length ?? 0,
    AVAILABLE: grouped.AVAILABLE?.length ?? 0,
    "UNDER REVIEW": grouped["UNDER REVIEW"]?.length ?? 0,
    LOCKED: grouped.LOCKED?.length ?? 0,
  };

  return (
    <PortalShell variant="company">
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ DISTRICT BENEFITS · POLICY UNLOCKS ]"
          title="District Benefits"
          body={`${portalBenefits.unlockedSummary} for ${portalCompany.shortName}. Unlocks tied to ${portalCompany.policyTier}, sectoral fit, and verified compliance.`}
          trailing={
            <>
              <StatusPill kind="active" label={portalCompany.policyTier} pulse />
            </>
          }
        />

        {/* Status summary strip */}
        <div className="grid grid-cols-2 gap-0 border-2 border-[var(--border)] sm:grid-cols-4">
          <Counter label="ACTIVE" count={counts.ACTIVE} accent="success" />
          <Counter label="AVAILABLE" count={counts.AVAILABLE} accent="accent" middle />
          <Counter label="UNDER REVIEW" count={counts["UNDER REVIEW"]} accent="warning" middle />
          <Counter label="LOCKED" count={counts.LOCKED} accent="muted" last />
        </div>

        {/* Benefit grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {portalBenefits.items.map((b, i) => {
            const Icon = statusIcon[b.status] ?? CheckCircle2;
            const colors = statusColor[b.status];
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={cn(
                  "relative flex flex-col border-2 border-[var(--border)] bg-white hover-brutal",
                  b.status === "LOCKED" && "opacity-70"
                )}
              >
                {/* Top status strip */}
                <div
                  className={cn(
                    "flex items-center justify-between border-b-2 border-[var(--border)] px-5 py-3"
                  )}
                >
                  <div className={cn("flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em]", colors.text)}>
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                    {b.status}
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                    {b.category}
                  </span>
                </div>
                <div className={cn("h-[3px]", colors.bar)} />

                {/* Body */}
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="font-display text-[16px] font-bold uppercase leading-tight tracking-[0.02em] text-[var(--text)]">
                    {b.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[var(--text-2)]">
                    {b.description}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-3 border-t-2 border-[var(--border-soft)] bg-[#FAFAFB] px-5 py-3">
                  <div className="flex flex-col gap-0.5 leading-tight">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                      UNLOCKED VIA
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text)]">
                      {b.unlockedVia}
                    </span>
                  </div>
                  {b.status === "ACTIVE" && (
                    <Button variant="ghost" size="sm" className="self-start px-0 text-[var(--text)] hover:text-[var(--accent)]">
                      VIEW BENEFIT →
                    </Button>
                  )}
                  {b.status === "AVAILABLE" && (
                    <Button variant="secondary" size="sm" className="self-start">
                      APPLY →
                    </Button>
                  )}
                  {b.status === "UNDER REVIEW" && (
                    <span className="self-start font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--warning)]">
                      AWAITING DPIIT REVIEW
                    </span>
                  )}
                  {b.status === "LOCKED" && (
                    <span className="self-start font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                      REQUIRES TIER PROMOTION
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="border-2 border-dashed border-[var(--border-soft)] p-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          ALL BENEFITS GOVERNED BY ASC INNOVATION DISTRICT POLICY ·{" "}
          {portalCompany.policyTier} · UPDATED Q1 2026
        </div>
      </div>
    </PortalShell>
  );
}

function Counter({
  label,
  count,
  accent,
  middle,
  last,
}: {
  label: string;
  count: number;
  accent: "success" | "accent" | "warning" | "muted";
  middle?: boolean;
  last?: boolean;
}) {
  const accentClass: Record<typeof accent, string> = {
    success: "text-[var(--success)]",
    accent: "text-[var(--accent)]",
    warning: "text-[var(--warning)]",
    muted: "text-[var(--text-3)]",
  };
  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-5",
        last
          ? ""
          : middle
          ? "border-b-2 border-r-2 border-[var(--border-soft)] sm:border-b-0 sm:border-r-2"
          : "border-b-2 border-r-2 border-[var(--border-soft)] sm:border-b-0 sm:border-r-2 sm:[&:nth-child(2n)]:border-r-2"
      )}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {label}
      </span>
      <span
        className={cn(
          "font-display text-[36px] font-extrabold leading-none tracking-[-0.01em]",
          accentClass[accent]
        )}
      >
        {count}
      </span>
    </div>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { portalFounders, portalCompany, type PortalFounder } from "@/lib/data";
import { IMG_AVATARS } from "@/lib/images";

const tagFilters = [
  "ALL",
  "AP ORIGIN",
  "GLOBAL FOUNDER",
  "VISITING RESEARCHER",
  "COHORT MEMBER",
] as const;
type Tag = (typeof tagFilters)[number];

export default function ActiveFoundersPage() {
  const [activeTag, setActiveTag] = useState<Tag>("ALL");

  const filtered = useMemo(() => {
    if (activeTag === "ALL") return portalFounders;
    return portalFounders.filter((f) => f.tag === activeTag);
  }, [activeTag]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { ALL: portalFounders.length };
    portalFounders.forEach((f) => {
      c[f.tag] = (c[f.tag] ?? 0) + 1;
    });
    return c;
  }, []);

  return (
    <PortalShell variant="company">
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ ACTIVE FOUNDERS · LINKED RESIDENTS ]"
          title="Active Founders"
          body={`${portalFounders.length} founders linked to ${portalCompany.shortName} on the District Registry. Each holds an active residency permit and contributes to the district's operational score.`}
          trailing={
            <StatusPill
              kind="verified"
              label={`${portalFounders.length} ACTIVE PERMITS`}
            />
          }
        />

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          {tagFilters.map((tag) => {
            const active = activeTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={cn(
                  "flex items-center gap-2 border-[1.5px] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
                  active
                    ? "border-[var(--text)] bg-[var(--text)] text-white"
                    : "border-[var(--border-soft)] bg-white text-[var(--text-2)] hover:border-[var(--border)] hover:text-[var(--text)]"
                )}
              >
                {tag}
                <span
                  className={cn(
                    "font-mono text-[9px]",
                    active ? "text-white/70" : "text-[var(--text-3)]"
                  )}
                >
                  {counts[tag] ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* Founder grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((f, i) => (
            <FounderCard key={f.id} founder={f} delay={i * 0.05} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="border-2 border-dashed border-[var(--border-soft)] p-12 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              NO FOUNDERS MATCH THIS FILTER
            </span>
          </div>
        )}
      </div>
    </PortalShell>
  );
}

function FounderCard({
  founder,
  delay = 0,
}: {
  founder: PortalFounder;
  delay?: number;
}) {
  const tagAccent: Record<string, string> = {
    "AP ORIGIN": "var(--accent)",
    "GLOBAL FOUNDER": "var(--text)",
    "VISITING RESEARCHER": "var(--warning)",
    "COHORT MEMBER": "var(--success)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay }}
      className="border-2 border-[var(--border)] bg-white hover-brutal"
    >
      {/* Top: photo + name + tag strip */}
      <div className="flex items-start gap-4 border-b-2 border-[var(--border-soft)] p-5">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden border-2 border-[var(--border)] bg-[var(--header-dark)]">
          <Image
            src={IMG_AVATARS[founder.avatarIndex % IMG_AVATARS.length]}
            alt={founder.name}
            fill
            sizes="64px"
            className="object-cover grayscale-[10%]"
          />
        </div>
        <div className="flex flex-1 flex-col leading-tight">
          <span className="font-display text-[16px] font-bold uppercase tracking-[0.02em] text-[var(--text)]">
            {founder.name}
          </span>
          <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--text-2)]">
            {founder.role}
          </span>
          <div className="mt-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
            <MapPin className="h-3 w-3" strokeWidth={2} />
            {founder.originCity}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="border-b-2 border-[var(--border-soft)] px-5 py-4 text-[13px] leading-relaxed text-[var(--text-2)]">
        {founder.bio}
      </div>

      {/* Permit details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-b-2 border-[var(--border-soft)] px-5 py-4">
        <Cell k="PERMIT ID" v={founder.id} mono />
        <Cell k="TIER" v={founder.residencyTier} />
        <Cell k="TYPE" v={founder.residencyType} />
        <Cell k="VALID UNTIL" v={founder.residencyValidUntil} />
      </div>

      {/* Score + tag */}
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
            CONTRIBUTION SCORE
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-[var(--text)]">
            <span className="text-[var(--accent)]">{founder.contributionScore}</span>{" "}
            / {founder.contributionMax}
          </span>
        </div>
        <div className="mt-2">
          <Progress
            value={(founder.contributionScore / founder.contributionMax) * 100}
          />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span
            className="border-[1.5px] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{
              borderColor: tagAccent[founder.tag] ?? "var(--border)",
              color: tagAccent[founder.tag] ?? "var(--text)",
            }}
          >
            {founder.tag}
          </span>
          <Button variant="ghost" size="sm" className="px-0 hover:text-[var(--accent)]">
            VIEW PROFILE
            <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function Cell({
  k,
  v,
  mono = false,
}: {
  k: string;
  v: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {k}
      </span>
      <span
        className={`text-[12px] text-[var(--text)] ${mono ? "font-mono break-all" : ""}`}
      >
        {v}
      </span>
    </div>
  );
}

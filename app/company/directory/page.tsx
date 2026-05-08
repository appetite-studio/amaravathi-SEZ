"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Search } from "lucide-react";
import { PortalShell } from "@/components/portal-shell/portal-shell";
import { ActivityPanel } from "@/components/portal-shell/activity-panel";
import { PortalPageHeader } from "@/components/portal-shell/portal-page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { portalDirectory, type PortalDirectoryItem } from "@/lib/data";
import { IMG_AVATARS } from "@/lib/images";

const sectorChips = [
  "ALL",
  "AI",
  "QUANTUM",
  "CLIMATE",
  "ROBOTICS",
  "GOVTECH",
  "WEB3",
  "BIOTECH",
] as const;

const availabilityChips = [
  "ANY",
  "Recruiting",
  "Looking for Cofounder",
  "Investor",
  "Mentor",
] as const;

type Sector = (typeof sectorChips)[number];
type Availability = (typeof availabilityChips)[number];

export default function DistrictDirectoryPage() {
  const [sector, setSector] = useState<Sector>("ALL");
  const [availability, setAvailability] = useState<Availability>("ANY");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return portalDirectory.filter((d) => {
      if (sector !== "ALL" && d.sector !== sector) return false;
      if (availability !== "ANY" && d.availability !== availability) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !d.name.toLowerCase().includes(q) &&
          !d.company.toLowerCase().includes(q) &&
          !d.city.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [sector, availability, query]);

  return (
    <PortalShell variant="company" activityPanel={<ActivityPanel />}>
      <div className="flex flex-col gap-10">
        <PortalPageHeader
          eyebrow="[ DISTRICT DIRECTORY · FOUNDER CENSUS ]"
          title="District Directory"
          body={`The public census of every founder operational inside District 01. ${portalDirectory.length} entries. Cross-tenant by design — founders find each other here.`}
          trailing={
            <StatusPill
              kind="active"
              label={`${portalDirectory.length} ACTIVE BUILDERS`}
              pulse
            />
          }
        />

        {/* Search + filters */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-3)]"
              strokeWidth={1.5}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="SEARCH BY NAME, COMPANY, OR CITY"
              className="w-full border-2 border-[var(--border)] bg-white py-3 pl-11 pr-4 font-mono text-[13px] uppercase tracking-[0.12em] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              SECTOR ·
            </span>
            {sectorChips.map((s) => (
              <Chip
                key={s}
                label={s}
                active={sector === s}
                onClick={() => setSector(s)}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              AVAILABILITY ·
            </span>
            {availabilityChips.map((a) => (
              <Chip
                key={a}
                label={a.toUpperCase()}
                active={availability === a}
                onClick={() => setAvailability(a)}
              />
            ))}
          </div>
        </div>

        {/* Results meta */}
        <div className="flex items-center justify-between border-y-2 border-[var(--border-soft)] py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
          <span>
            {filtered.length} OF {portalDirectory.length} BUILDERS MATCH
          </span>
          <span>SORTED BY CONTRIBUTION SCORE</span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((item, i) => (
            <DirectoryCard key={item.id} item={item} delay={i * 0.03} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="border-2 border-dashed border-[var(--border-soft)] p-12 text-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              NO BUILDERS MATCH THESE FILTERS
            </span>
          </div>
        )}
      </div>
    </PortalShell>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border-[1.5px] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors",
        active
          ? "border-[var(--text)] bg-[var(--text)] text-white"
          : "border-[var(--border-soft)] bg-white text-[var(--text-2)] hover:border-[var(--border)] hover:text-[var(--text)]"
      )}
    >
      {label}
    </button>
  );
}

const availabilityAccent: Record<string, string> = {
  Recruiting: "var(--accent)",
  "Looking for Cofounder": "var(--warning)",
  Investor: "var(--success)",
  Mentor: "var(--text)",
};

function DirectoryCard({
  item,
  delay = 0,
}: {
  item: PortalDirectoryItem;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="border-2 border-[var(--border)] bg-white hover-brutal"
    >
      <div className="flex items-start gap-4 p-5">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden border-2 border-[var(--border)] bg-[var(--header-dark)]">
          <Image
            src={IMG_AVATARS[item.avatarIndex % IMG_AVATARS.length]}
            alt={item.name}
            fill
            sizes="56px"
            className="object-cover grayscale-[10%]"
          />
        </div>
        <div className="flex flex-1 flex-col leading-tight">
          <span className="font-display text-[14px] font-bold uppercase tracking-[0.02em] text-[var(--text)]">
            {item.name}
          </span>
          <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-2)]">
            {item.company}
          </span>
          <span className="mt-1 flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
            <MapPin className="h-3 w-3" strokeWidth={2} />
            {item.city}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-2 border-t-2 border-[var(--border-soft)] px-5 py-3">
        <Cell k="TYPE" v={item.founderType} />
        <Cell k="STATUS" v={item.residencyStatus} />
      </div>

      <div className="px-5 py-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
            CONTRIBUTION
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-[var(--text)]">
            <span className="text-[var(--accent)]">{item.contributionScore}</span>{" "}
            / 1000
          </span>
        </div>
        <div className="mt-2">
          <Progress value={(item.contributionScore / 1000) * 100} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t-2 border-[var(--border-soft)] bg-[#FAFAFB] px-5 py-3">
        <div className="flex items-center gap-1.5">
          <span className="border-[1.5px] border-[var(--border-soft)] bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text)]">
            {item.sector}
          </span>
          <span
            className="border-[1.5px] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{
              borderColor:
                availabilityAccent[item.availability] ?? "var(--border-soft)",
              color: availabilityAccent[item.availability] ?? "var(--text-3)",
            }}
          >
            {item.availability.toUpperCase()}
          </span>
        </div>
        <button
          type="button"
          className="inline-flex h-6 w-6 items-center justify-center text-[var(--text-2)] hover:text-[var(--accent)]"
          aria-label="View profile"
        >
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
        </button>
      </div>
    </motion.div>
  );
}

function Cell({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-0.5 leading-tight">
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        {k}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.04em] text-[var(--text)]">
        {v}
      </span>
    </div>
  );
}

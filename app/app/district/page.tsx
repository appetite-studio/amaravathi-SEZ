"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { StatusPill } from "@/components/ui/status-pill";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { events, metrics, notifications } from "@/lib/data";
import { IMG_DISTRICT_MAP } from "@/lib/images";

const hotspots = [
  { x: 24, y: 32, label: "COWORKING 03" },
  { x: 58, y: 22, label: "DISTRICT REGISTRY" },
  { x: 72, y: 56, label: "SECTOR A · HOUSING" },
  { x: 38, y: 70, label: "DISTRICT MESS" },
  { x: 14, y: 60, label: "AP SKILLS FUND" },
];

function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
    >
      {typeof value === "number" ? value.toLocaleString("en-IN") : value}
      {suffix}
    </motion.span>
  );
}

export default function DistrictPage() {
  const live = [...notifications]
    .map((n, i) => ({ ...n, idx: i }))
    .sort(() => 0);

  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="[ DISTRICT STATUS · LIVE METRICS ]"
        title="Amaravati Startup Capital · District 01"
        body="Live operating dashboard for the founder city. Compliance, occupancy, hiring ratio, jobs created, upcoming cohorts &mdash; all updated in real time."
        trailing={
          <div className="flex items-center gap-3">
            <StatusPill kind="live" label="LIVE · DISTRICT 01" pulse />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              UPDATED 09:42 IST
            </span>
          </div>
        }
      />

      {/* KPI grid */}
      <div className="grid grid-cols-1 gap-0 border-2 border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
        {metrics.district.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className={cn(
              "flex flex-col gap-3 border-b-2 border-r-2 border-[var(--border-soft)] bg-white p-7",
              "sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r-2 lg:[&:nth-child(3n)]:border-r-0"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="label">{m.label}</span>
              {m.highlight && <StatusPill kind="active" label="LIVE" pulse />}
            </div>
            <div
              className={cn(
                "font-display text-[44px] font-extrabold leading-none tracking-[-0.02em]",
                m.highlight ? "text-[var(--accent)]" : "text-[var(--text)]"
              )}
            >
              {typeof m.value === "number" ? <CountUp value={m.value} /> : m.value}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-2)]">
              {m.delta}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map + Events */}
      <div className="grid grid-cols-1 gap-0 border-2 border-[var(--border)] lg:grid-cols-[1.6fr_1fr]">
        <div className="relative min-h-[420px] border-b-2 border-[var(--border)] lg:border-b-0 lg:border-r-2">
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b-2 border-[var(--border)] bg-white/95 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-2)] backdrop-blur">
            <span>DISTRICT 01 · SECTOR A · OPERATIONAL</span>
            <span>16.516 N · 80.518 E</span>
          </div>
          <div className="relative aspect-[16/10] w-full bg-[var(--header-dark)]">
            {/* PLACEHOLDER: replace with final asset */}
            <Image
              src={IMG_DISTRICT_MAP}
              alt="Aerial render of Amaravati Startup Capital district"
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            {hotspots.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
              >
                <div className="flex flex-col items-center gap-1.5">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inset-0 animate-ping bg-[var(--accent)] opacity-60" />
                    <span className="relative h-3 w-3 border-2 border-white bg-[var(--accent)]" />
                  </span>
                  <span className="border-2 border-[var(--border)] bg-white px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text)]">
                    {h.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b-2 border-[var(--border)] px-6 py-4">
            <div className="label">[ UPCOMING EVENTS ]</div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
              14 THIS QUARTER
            </span>
          </div>
          <ul className="flex flex-col">
            {events.map((e) => (
              <li
                key={e.id}
                className="flex items-stretch gap-4 border-b-2 border-[var(--border-soft)] px-6 py-4 transition-colors last:border-b-0 hover:bg-[var(--accent-soft)]"
              >
                <div className="flex w-14 flex-col items-center justify-center border-2 border-[var(--border)] bg-white py-2 font-mono">
                  <span className="text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                    {e.day}
                  </span>
                  <span className="text-[18px] font-bold tracking-[0.02em] text-[var(--text)]">
                    {e.date.split(" ")[0]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <span className="font-mono text-[12px] uppercase tracking-[0.04em] text-[var(--text)]">
                    {e.title}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-3)]">
                    {e.host} · {e.time}
                  </span>
                </div>
                <span className="self-center border-[1.5px] border-[var(--border)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--text)]">
                  {e.tag}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-auto border-t-2 border-[var(--border)] p-5">
            <Button variant="secondary" size="md" className="w-full">
              VIEW FULL CALENDAR
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Button>
          </div>
        </div>
      </div>

      {/* Categories + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="border-2 border-[var(--border)] bg-white p-7"
        >
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-2">
              <div className="label">[ STARTUP CATEGORIES ]</div>
              <h3 className="font-display text-[22px] font-bold tracking-[0.01em]">
                42 startups · weighted by category
              </h3>
            </div>
            <Button variant="tag" size="sm">EXPORT CSV</Button>
          </div>
          <div className="mt-7 flex flex-col gap-4">
            {metrics.categories.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid grid-cols-[180px_1fr_60px] items-center gap-4"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text)]">
                  {c.label}
                </span>
                <div className="h-5 border-2 border-[var(--border)] bg-white">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${c.ratio * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className="h-full bg-[var(--accent)]"
                  />
                </div>
                <span className="text-right font-mono text-[12px] tracking-[0.08em] text-[var(--text)]">
                  {Math.round(c.ratio * 100)}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="border-2 border-[var(--border)] bg-white">
          <div className="flex items-center justify-between border-b-2 border-[var(--border)] px-6 py-4">
            <div className="label">[ LIVE ACTIVITY ]</div>
            <StatusPill kind="live" label="STREAMING" pulse />
          </div>
          <ul className="flex flex-col">
            {live.slice(0, 8).map((n) => (
              <li
                key={n.id}
                className="flex items-start gap-3 border-b-2 border-[var(--border-soft)] px-5 py-3 last:border-b-0"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                  {n.timestamp.split(" · ")[1] ?? n.timestamp}
                </span>
                <span className="flex-1 font-mono text-[11px] uppercase tracking-[0.06em] text-[var(--text)]">
                  {n.title}
                </span>
                <Plus className="h-3 w-3 text-[var(--accent)]" strokeWidth={2.5} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

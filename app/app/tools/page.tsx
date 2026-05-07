"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { StatusPill } from "@/components/ui/status-pill";
import { ToolIcon } from "@/components/tools/tool-icon";
import { ToolModal } from "@/components/tools/tool-modal";
import { cohorts, tools, type Tool } from "@/lib/data";

export default function ToolsPage() {
  const [active, setActive] = useState<Tool | null>(null);
  const [open, setOpen] = useState(false);

  const openTool = (t: Tool) => {
    setActive(t);
    setOpen(true);
  };

  return (
    <div className="flex flex-col gap-12">
      <SectionHeader
        eyebrow="[ DISTRICT TOOLS · OPERATING DASHBOARD ]"
        title="Run your company from one console."
        body="Every district interaction lives here. Incorporation, residency, hiring, housing, taxes, mentors, and the calendar &mdash; all wired into one founder console."
      />

      {/* Cohort hero card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="grid grid-cols-1 gap-0 border-2 border-[var(--border)] bg-white lg:grid-cols-[1.4fr_1fr]"
      >
        <div className="flex flex-col gap-5 p-8 lg:border-r-2 lg:border-[var(--border)]">
          <div className="flex items-center justify-between">
            <div className="label">[ NEXT COHORT ]</div>
            <StatusPill kind="new" label="OPEN FOR FOUNDERS" pulse />
          </div>
          <h2 className="font-display text-[36px] font-bold leading-[1.05] tracking-[-0.01em] sm:text-[44px]">
            Quantum Valley Cohort opens in
            <span className="text-[var(--accent)]"> {cohorts.current.openInDays} days.</span>
          </h2>
          <p className="max-w-2xl text-[15px] leading-relaxed text-[var(--text-2)]">
            Forty-two of sixty seats reserved. A weighted mix of AI x
            Governance, FinTech, ClimateTech and BioTech founders. Reserve a
            seat now &mdash; or skim the cohort brief.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-2)]">
              <span>SEATS</span>
              <span className="text-[var(--text)]">
                {cohorts.current.seatsFilled} / {cohorts.current.seatsTotal}
              </span>
            </div>
            <Progress
              value={
                (cohorts.current.seatsFilled / cohorts.current.seatsTotal) * 100
              }
            />
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => openTool(tools.find((t) => t.id === "join-cohort")!)}
            >
              RESERVE SEAT
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/app/community">VIEW COHORT BRIEF</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-0 p-0">
          {[
            { k: "STARTS ON", v: cohorts.current.startsOn },
            { k: "TOTAL SEATS", v: String(cohorts.current.seatsTotal) },
            { k: "RESERVED", v: String(cohorts.current.seatsFilled) },
            { k: "WAITLIST", v: "11" },
            { k: "MENTOR HRS", v: "240" },
            { k: "PARTNERS", v: "6" },
          ].map((s) => (
            <div
              key={s.k}
              className="flex flex-col justify-between gap-1 border-b-2 border-r-2 border-[var(--border-soft)] p-6 last:border-r-0"
            >
              <span className="label">{s.k}</span>
              <span className="font-display text-[24px] font-bold leading-none tracking-[-0.01em]">
                {s.v}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 13-card grid */}
      <div className="flex flex-col gap-6">
        <SectionHeader
          eyebrow="[ DISTRICT UTILITIES ]"
          title="Tools, utilities, and permits"
          body="Every form below files into the District Registry. Click a card to open its detail form."
        />
        <div className="grid grid-cols-1 gap-0 border-2 border-[var(--border)] sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t, i) => (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.32, delay: i * 0.03 }}
              type="button"
              onClick={() => openTool(t)}
              className="group relative flex flex-col items-start gap-5 border-b-2 border-r-2 border-[var(--border-soft)] bg-white p-7 text-left transition-colors hover:bg-[var(--accent-soft)] sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r-2 lg:[&:nth-child(3n)]:border-r-0"
            >
              <div className="flex w-full items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center border-2 border-[var(--border)] bg-white text-[var(--text)] group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                  <ToolIcon name={t.icon} className="h-5 w-5" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)] group-hover:text-[var(--accent)]">
                  OPEN →
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="font-display text-[15px] font-bold uppercase tracking-[0.06em] text-[var(--text)]">
                  {t.title}
                </div>
                <p className="text-[13px] leading-relaxed text-[var(--text-2)]">
                  {t.blurb}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <ToolModal tool={active} open={open} onOpenChange={setOpen} />
    </div>
  );
}

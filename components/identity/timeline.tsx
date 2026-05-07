"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { founder } from "@/lib/data";

export function ResidencyTimeline() {
  const steps = founder.milestones;
  return (
    <div className="border-2 border-[var(--border)] bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="label">[ RESIDENCY PIPELINE ]</div>
          <h3 className="font-display text-[20px] font-bold tracking-[0.01em]">
            Application → Active · 36 days end-to-end
          </h3>
        </div>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-2)]">
          PERMIT ID · {founder.residencyId}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-0 border-2 border-[var(--border)] sm:grid-cols-4">
        {steps.map((s, i) => {
          const isActive = s.status === "active";
          const isComplete = s.status === "complete";
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className={cn(
                "relative flex flex-col gap-3 border-b-2 border-[var(--border)] p-5 last:border-b-0 sm:border-b-0 sm:border-r-2 sm:last:border-r-0",
                isActive && "bg-[var(--accent-soft)]"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                  STEP {String(i + 1).padStart(2, "0")}
                </div>
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center border-2",
                    isActive && "border-[var(--accent)] bg-[var(--accent)] text-white",
                    isComplete && "border-[var(--text)] bg-white text-[var(--text)]",
                    !isActive && !isComplete && "border-[var(--border-soft)] bg-white text-[var(--text-3)]"
                  )}
                >
                  {isComplete || isActive ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                  ) : null}
                </span>
              </div>
              <div className="font-display text-[16px] font-bold uppercase tracking-[0.06em] text-[var(--text)]">
                {s.label}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-2)]">
                {s.date}
              </div>
              {isActive && (
                <div className="mt-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--accent)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
                  CURRENT
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

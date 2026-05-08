"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Metric = {
  value: number | string;
  label: string;
  highlight?: boolean;
};

const companyMetrics: Metric[] = [
  { value: 4, label: "FOUNDERS", highlight: true },
  { value: 12, label: "ACTIVE PERMITS" },
  { value: "84%", label: "LOCAL HIRING" },
  { value: "TIER I", label: "POLICY STATUS" },
  { value: "₹1.24 CR", label: "PROJECTED ACTIVITY" },
];

const govtMetrics: Metric[] = [
  { value: 127, label: "FOUNDERS", highlight: true },
  { value: 42, label: "STARTUPS" },
  { value: 318, label: "AP JOBS" },
  { value: "91%", label: "COMPLIANCE" },
  { value: "₹8.4 CR", label: "ACTIVITY" },
];

function CountUp({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const duration = 900;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{n.toLocaleString("en-IN")}</>;
}

export function PortalMetricsBar({
  variant,
  items,
}: {
  variant: "company" | "govt";
  items?: Metric[];
}) {
  const list = items ?? (variant === "company" ? companyMetrics : govtMetrics);

  return (
    <div className="border-b-2 border-[var(--border)] bg-[var(--header-dark)] text-white">
      <div className="flex flex-wrap items-stretch divide-x-2 divide-white/10">
        {list.map((m, i) => (
          <motion.div
            key={`${m.label}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="flex flex-1 min-w-[160px] flex-col gap-1.5 px-6 py-4"
          >
            <div
              className={cn(
                "font-display text-[26px] font-extrabold leading-none tracking-[-0.01em]",
                m.highlight ? "text-[var(--accent)]" : "text-white"
              )}
            >
              {typeof m.value === "number" ? <CountUp value={m.value} /> : m.value}
            </div>
            <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/60">
              {m.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

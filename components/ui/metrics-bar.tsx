"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Metric = {
  value: number | string;
  label: string;
  highlight?: boolean;
};

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

export function MetricsBar({
  items,
  variant = "dark",
  className,
}: {
  items: Metric[];
  variant?: "dark" | "light";
  className?: string;
}) {
  const isDark = variant === "dark";
  return (
    <div
      className={cn(
        "w-full",
        isDark ? "bg-[var(--header-dark)] text-white" : "bg-white text-[var(--text)] border-y-2 border-[var(--border)]",
        className
      )}
    >
      <div className="mx-auto flex max-w-[1280px] snap-x snap-mandatory items-center gap-x-8 gap-y-6 overflow-x-auto px-4 py-4 sm:gap-x-12 sm:px-6 sm:py-6 md:flex-wrap md:justify-between md:overflow-visible md:px-8">
        {items.map((item, i) => (
          <motion.div
            key={`${item.label}-${i}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="flex min-w-[130px] shrink-0 snap-start flex-col gap-2 sm:min-w-[150px] md:shrink"
          >
            <div
              className={cn(
                "font-display text-[28px] font-extrabold leading-none tracking-[-0.01em] sm:text-[32px] md:text-[36px]",
                item.highlight && "text-[var(--accent)]"
              )}
            >
              {typeof item.value === "number" ? (
                <CountUp value={item.value} />
              ) : (
                item.value
              )}
            </div>
            <div
              className={cn(
                "label",
                isDark ? "text-white/60" : "text-[var(--text-3)]"
              )}
            >
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

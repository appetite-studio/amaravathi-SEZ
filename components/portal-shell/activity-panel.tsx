"use client";

import { motion } from "framer-motion";
import { portalActivity, type PortalActivityItem } from "@/lib/data";

const kindAccent: Record<string, string> = {
  FOUNDER: "var(--accent)",
  WORKSPACE: "var(--text)",
  COMPLIANCE: "var(--success)",
  POLICY: "var(--text)",
  EVENT: "var(--accent)",
  HIRE: "var(--success)",
  FINANCE: "var(--text)",
  RESIDENCY: "var(--warning)",
};

export function ActivityPanel({
  items,
  title = "[ LIVE ACTIVITY ]",
}: {
  items?: PortalActivityItem[];
  title?: string;
}) {
  const list = items ?? portalActivity;

  return (
    <aside className="hidden h-full w-[320px] shrink-0 flex-col border-l-2 border-[var(--border)] bg-white xl:flex">
      <div className="flex items-center justify-between border-b-2 border-[var(--border)] px-5 py-4">
        <span className="label">{title}</span>
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--accent)]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--accent)]" />
          STREAMING
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul className="flex flex-col">
          {list.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="border-b border-[var(--border-soft)] px-5 py-3.5 transition-colors hover:bg-[#FAFAFB]"
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.22em]"
                  style={{ color: kindAccent[item.kind] ?? "var(--text-3)" }}
                >
                  {item.kind}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
                  {item.timestamp}
                </span>
              </div>
              <p className="mt-1.5 font-mono text-[11px] leading-snug text-[var(--text)]">
                {item.title}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>

      <div className="border-t-2 border-[var(--border-soft)] px-5 py-3 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--text-3)]">
        Stream · DISTRICT 01 NODE
      </div>
    </aside>
  );
}

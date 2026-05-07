"use client";

import { cn } from "@/lib/utils";

export function FilterChip({
  active,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        "border-[1.5px] border-[var(--border)] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
        active
          ? "bg-[var(--text)] text-white"
          : "bg-white text-[var(--text)] hover:bg-[var(--text)] hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

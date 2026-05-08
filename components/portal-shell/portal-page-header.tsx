import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PortalPageHeader({
  eyebrow,
  title,
  body,
  trailing,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-wrap items-end justify-between gap-6 border-b-2 border-[var(--border-soft)] pb-6",
        className
      )}
    >
      <div className="flex max-w-3xl flex-col gap-2">
        {eyebrow && <div className="label">{eyebrow}</div>}
        <h1 className="font-display text-[26px] font-bold leading-[1.05] tracking-[-0.01em] text-[var(--text)] sm:text-[30px]">
          {title}
        </h1>
        {body && (
          <p className="text-[14px] leading-relaxed text-[var(--text-2)]">
            {body}
          </p>
        )}
      </div>
      {trailing && (
        <div className="flex flex-wrap items-center gap-2">{trailing}</div>
      )}
    </header>
  );
}

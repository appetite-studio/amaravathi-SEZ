import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
  trailing,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  trailing?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className="flex w-full items-end justify-between gap-6">
        <div
          className={cn(
            "flex max-w-3xl flex-col gap-3",
            align === "center" && "items-center text-center"
          )}
        >
          {eyebrow && <div className="label">{eyebrow}</div>}
          <h2 className="font-display text-[34px] font-bold leading-[1.05] tracking-[-0.01em] text-[var(--text)] sm:text-[40px]">
            {title}
          </h2>
          {body && (
            <p className="text-[15px] leading-relaxed text-[var(--text-2)]">
              {body}
            </p>
          )}
        </div>
        {trailing && <div className="hidden md:block">{trailing}</div>}
      </div>
    </header>
  );
}

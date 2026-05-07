import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  trackClassName,
  fillClassName,
}: {
  value: number;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={cn(
        "h-3 w-full border-2 border-[var(--border)] bg-white",
        trackClassName,
        className
      )}
    >
      <div
        className={cn("h-full bg-[var(--accent)]", fillClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

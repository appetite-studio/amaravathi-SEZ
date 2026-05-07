import { cn } from "@/lib/utils";

type Kind =
  | "active"
  | "verified"
  | "approved"
  | "pending"
  | "review"
  | "new"
  | "live"
  | "policy"
  | "event";

const config: Record<
  Kind,
  { label: string; dot: string; border: string; text: string; bg?: string }
> = {
  active: {
    label: "ACTIVE",
    dot: "bg-[var(--accent)]",
    border: "border-[var(--border)]",
    text: "text-[var(--text)]",
  },
  verified: {
    label: "VERIFIED",
    dot: "bg-[var(--success)]",
    border: "border-[var(--border)]",
    text: "text-[var(--text)]",
  },
  approved: {
    label: "APPROVED",
    dot: "bg-[var(--success)]",
    border: "border-[var(--border)]",
    text: "text-[var(--text)]",
  },
  pending: {
    label: "PENDING",
    dot: "bg-[var(--warning)]",
    border: "border-[var(--border)]",
    text: "text-[var(--text)]",
  },
  review: {
    label: "REVIEW",
    dot: "bg-[var(--warning)]",
    border: "border-[var(--border)]",
    text: "text-[var(--text)]",
  },
  new: {
    label: "NEW",
    dot: "bg-[var(--accent)]",
    border: "border-[var(--border)]",
    text: "text-[var(--text)]",
  },
  live: {
    label: "LIVE",
    dot: "bg-[var(--accent)]",
    border: "border-[var(--accent)]",
    text: "text-[var(--accent)]",
  },
  policy: {
    label: "POLICY",
    dot: "bg-[var(--text)]",
    border: "border-[var(--border)]",
    text: "text-[var(--text)]",
  },
  event: {
    label: "EVENT",
    dot: "bg-[var(--text)]",
    border: "border-[var(--border)]",
    text: "text-[var(--text)]",
  },
};

export function StatusPill({
  kind,
  label,
  className,
  pulse,
}: {
  kind: Kind;
  label?: string;
  className?: string;
  pulse?: boolean;
}) {
  const c = config[kind];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border-[1.5px] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em]",
        c.border,
        c.text,
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          c.dot,
          pulse && "animate-pulse"
        )}
      />
      {label ?? c.label}
    </span>
  );
}

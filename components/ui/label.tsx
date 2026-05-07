import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Label({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("label", className)} {...props} />;
}

export function FieldLabel({
  label,
  value,
  mono = true,
  className,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="label">{label}</span>
      <span
        className={cn(
          "text-[15px] font-medium text-[var(--text)]",
          mono && "font-mono tracking-[0.02em]"
        )}
      >
        {value}
      </span>
    </div>
  );
}

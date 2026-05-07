import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export function Card({
  className,
  hover = true,
  inset = "p-7",
  ...props
}: ComponentProps<"div"> & { hover?: boolean; inset?: string }) {
  return (
    <div
      className={cn(
        "border-2 border-[var(--border)] bg-white",
        inset,
        hover && "hover-brutal",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-start justify-between gap-4", className)}
      {...props}
    />
  );
}

export function CardEyebrow({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("label", className)} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-display text-[20px] font-bold tracking-[0.02em] text-[var(--text)]",
        className
      )}
      {...props}
    />
  );
}

export function CardBody({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-[14px] leading-relaxed text-[var(--text-2)]",
        className
      )}
      {...props}
    />
  );
}

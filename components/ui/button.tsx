"use client";

import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-[0.12em] disabled:opacity-50 disabled:pointer-events-none transition-[transform,box-shadow,background] duration-150 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--accent)] text-white border-2 border-[var(--accent)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[var(--shadow-brutal-sm)]",
        secondary:
          "bg-white text-[var(--text)] border-2 border-[var(--border)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[var(--shadow-brutal-sm)]",
        dark:
          "bg-[var(--header-dark)] text-white border-2 border-[var(--header-dark)] hover:bg-black",
        tag:
          "bg-white text-[var(--text)] border-[1.5px] border-[var(--border)] text-[11px] hover:bg-[var(--text)] hover:text-white",
        ghost:
          "bg-transparent text-[var(--text)] hover:text-[var(--accent)]",
      },
      size: {
        md: "px-5 py-3 text-[12px]",
        lg: "px-6 py-4 text-[13px]",
        sm: "px-3.5 py-2 text-[11px]",
        icon: "h-10 w-10 p-0 text-[13px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    asChild?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonStyles({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonStyles };

"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  hideIcon?: boolean;
};

export const SearchInput = forwardRef<HTMLInputElement, Props>(
  ({ className, hideIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center gap-3 border-2 border-[var(--border)] bg-white px-5 py-4",
          className
        )}
      >
        {!hideIcon && (
          <Search className="h-4 w-4 shrink-0 text-[var(--text-2)]" strokeWidth={1.5} />
        )}
        <input
          ref={ref}
          {...props}
          className="w-full bg-transparent font-mono text-[12px] uppercase tracking-[0.18em] text-[var(--text)] placeholder:text-[var(--text-3)] focus:outline-none"
        />
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

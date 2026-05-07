import { cn } from "@/lib/utils";

export function DistrictSeal({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden="true"
    >
      <rect
        x="2"
        y="2"
        width="60"
        height="60"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="10"
        y="10"
        width="44"
        height="44"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M32 14 L32 50 M14 32 L50 32"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="32" cy="32" r="6" fill="currentColor" />
      <text
        x="32"
        y="58"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="4"
        letterSpacing="0.2em"
        fill="currentColor"
      >
        ASC · 01
      </text>
    </svg>
  );
}

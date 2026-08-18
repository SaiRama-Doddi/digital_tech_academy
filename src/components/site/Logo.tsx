import { Link } from "@tanstack/react-router";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ onDark = false, className }: { onDark?: boolean | undefined; className?: string | undefined }) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={cn("flex shrink-0 items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "relative grid size-10 place-items-center rounded-md",
          onDark ? "bg-accent/15" : "bg-primary",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path
            d="M12 2.6 20 5.6v6.1c0 4.6-3.2 8.4-8 9.7-4.8-1.3-8-5.1-8-9.7V5.6l8-3Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path
            d="M8.4 12.6l2.3 2.4 4.9-5.2"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.02rem] font-extrabold tracking-tight sm:text-[1.1rem]",
            onDark ? "text-navy-foreground" : "text-foreground",
          )}
        >
          Digital <span className="text-accent">Tech</span> Solution
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em]",
            onDark ? "text-navy-muted" : "text-muted-foreground",
          )}
        >
          Training Institute
        </span>
      </span>
    </Link>
  );
}

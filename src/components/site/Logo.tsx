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
          "relative grid size-10 place-items-center rounded-lg shadow-sm transition-transform duration-300 hover:scale-105",
          onDark ? "bg-accent/15" : "bg-blue-600 shadow-blue-500/10",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-5.5" aria-hidden="true">
          <path
            d="M12 2.6 20 5.6v6.1c0 4.6-3.2 8.4-8 9.7-4.8-1.3-8-5.1-8-9.7V5.6l8-3Z"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M8.4 12.6l2.3 2.4 4.9-5.2"
            fill="none"
            stroke="white"
            strokeWidth="2.0"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col leading-none text-left">
        <span
          className={cn(
            "font-display text-[1.02rem] font-black tracking-tight sm:text-[1.12rem]",
            onDark ? "text-navy-foreground" : "text-slate-800",
          )}
        >
          Digital<span className="text-blue-600">Tech</span> Solution
        </span>
        <span
          className={cn(
            "mt-1 text-[0.62rem] font-bold uppercase tracking-[0.18em]",
            onDark ? "text-navy-muted" : "text-slate-500",
          )}
        >
          Training Institute
        </span>
      </span>
    </Link>
  );
}

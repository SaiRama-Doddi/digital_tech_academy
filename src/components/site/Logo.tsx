import { Link } from "@tanstack/react-router";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean | undefined;
  className?: string | undefined;
}) {
  return (
    <Link
      to="/"
      aria-label={`${site.name} — home`}
      className={cn(
        "group flex shrink-0 items-center gap-2.5 sm:gap-3 transition-transform duration-200 select-none",
        className,
      )}
    >
      <span
        className={cn(
          "relative grid size-9 sm:size-10 place-items-center rounded-xl shadow-md transition-all duration-300 group-hover:scale-105 shrink-0",
          onDark
            ? "bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 shadow-indigo-900/30 ring-1 ring-white/20"
            : "bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 shadow-blue-500/25 ring-1 ring-white/30",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-5 sm:size-5.5 transition-transform duration-300 group-hover:scale-110"
          aria-hidden="true"
        >
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
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-400 ring-2 ring-white" />
      </span>
      <span className="flex min-w-0 flex-col leading-none text-left">
        <span
          className={cn(
            "font-display text-[0.98rem] sm:text-[1.12rem] font-black tracking-tight whitespace-nowrap uppercase",
            onDark ? "text-white" : "text-slate-900",
          )}
        >
          DIGI
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            TECH
          </span>
          ADEMY
        </span>
        <span
          className={cn(
            "mt-1 flex items-center gap-1.5 text-[0.56rem] sm:text-[0.60rem] font-bold uppercase tracking-[0.14em] whitespace-nowrap",
            onDark ? "text-slate-300" : "text-slate-500",
          )}
        >
          <span className="text-blue-600 font-extrabold dark:text-blue-400">LEARN</span>
          <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="text-indigo-600 font-extrabold dark:text-indigo-400">GROW</span>
          <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="text-sky-600 font-extrabold dark:text-sky-400">ACHIEVE</span>
        </span>
      </span>
    </Link>
  );
}

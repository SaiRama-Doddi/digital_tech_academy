import { Link } from "@tanstack/react-router";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import faviconPng from "@/assets/favicon.png";

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
      {/* Brand Favicon Tile */}
      <span
        className={cn(
          "relative grid size-9 sm:size-10 place-items-center rounded-xl shadow-md transition-all duration-300 group-hover:scale-105 shrink-0 overflow-hidden",
          onDark
            ? "ring-1 ring-white/20 shadow-indigo-950/40"
            : "ring-1 ring-blue-600/20 shadow-blue-500/20",
        )}
      >
        <img
          src={faviconPng}
          alt="Digitechademy Logo"
          className="size-full object-cover"
        />
        <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-emerald-400 ring-2 ring-white" />
      </span>

      {/* Brand Name Text: Digitech (Blue) + ademy (Orange) */}
      <span className="flex min-w-0 flex-col leading-none text-left">
        <span
          className={cn(
            "font-display text-[1.15rem] sm:text-[1.32rem] font-black tracking-tight whitespace-nowrap",
          )}
        >
          <span className={onDark ? "text-white" : "text-[#0254B8]"}>Digitech</span>
          <span className="text-[#EF5A24]">ademy</span>
        </span>
        <span
          className={cn(
            "mt-1 flex items-center gap-1.5 text-[0.55rem] sm:text-[0.58rem] font-extrabold uppercase tracking-[0.14em] whitespace-nowrap",
            onDark ? "text-slate-300" : "text-slate-500",
          )}
        >
          <span className="text-blue-600 font-extrabold dark:text-blue-400">LEARN</span>
          <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="text-indigo-600 font-extrabold dark:text-indigo-400">GROW</span>
          <span className="size-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="text-[#EF5A24] font-extrabold">ACHIEVE</span>
        </span>
      </span>
    </Link>
  );
}


import { ChevronRight } from "lucide-react";

import { Icon } from "@/components/site/Icon";
import { cn } from "@/lib/utils";

export type ProcessStep = {
  step: string;
  title: string;
  text?: string | undefined;
  icon?: string | undefined;
};

const defaultIcons: Record<string, string> = {
  "01": "BookOpen",
  "02": "Wrench",
  "03": "Rocket",
  "04": "FileSearch",
  "05": "TrendingUp",
};

export function ProcessTimeline({
  steps,
  onDark = false,
  className,
}: {
  steps: ProcessStep[];
  onDark?: boolean | undefined;
  className?: string | undefined;
}) {
  return (
    <ol
      className={cn(
        "grid gap-7 sm:gap-5 sm:grid-cols-2 pt-4",
        steps.length >= 5 ? "lg:grid-cols-5" : "lg:grid-cols-4",
        className,
      )}
    >
      {steps.map((step, index) => (
        <li
          key={step.step}
          data-reveal
          style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
          className={cn(
            "group relative flex flex-col rounded-2xl border p-5 pt-8 shadow-lg transition-all duration-300 hover:-translate-y-1.5",
            onDark
              ? "border-sky-500/25 bg-[#0b1c34]/90 backdrop-blur-md hover:border-sky-400/60 hover:shadow-xl hover:shadow-blue-500/15"
              : "border-slate-200/90 bg-white hover:border-blue-300 hover:shadow-md",
          )}
        >
          {/* Circular Icon Badge Straddling Top Border */}
          <div className="absolute -top-5 left-5 z-10">
            <div className="relative flex items-center justify-center">
              <div
                className="absolute -inset-1 rounded-full bg-sky-400/30 blur-xs transition-all duration-300 group-hover:bg-sky-400/50 group-hover:blur-sm"
                aria-hidden="true"
              />
              <span className="relative grid size-10 place-items-center rounded-full bg-gradient-to-b from-sky-400 via-blue-600 to-blue-800 text-white border-2 border-sky-300/40 shadow-sm transition-transform duration-300 group-hover:scale-110">
                <Icon
                  name={step.icon ?? defaultIcons[step.step] ?? "BookOpen"}
                  className="size-4.5 text-white"
                />
              </span>
            </div>
          </div>

          <span className="font-display text-lg font-black text-sky-400 tracking-tight">
            {step.step}
          </span>
          <h3
            className={cn(
              "mt-1 text-base font-bold leading-snug",
              onDark ? "text-white group-hover:text-sky-300" : "text-slate-900",
            )}
          >
            {step.title}
          </h3>
          {step.text ? (
            <p
              className={cn(
                "mt-2 text-xs sm:text-[13px] leading-relaxed",
                onDark ? "text-slate-300" : "text-slate-600",
              )}
            >
              {step.text}
            </p>
          ) : null}

          {/* Connector arrow between steps on desktop */}
          {index < steps.length - 1 && (
            <div
              className="pointer-events-none absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-20"
              aria-hidden="true"
            >
              <span className="grid size-5 place-items-center rounded-full bg-[#081426] border border-sky-400/40 text-sky-400 shadow-xs">
                <ChevronRight className="size-2.5" />
              </span>
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

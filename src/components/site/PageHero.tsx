import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string | undefined;
  title: string;
  description?: string | undefined;
  children?: ReactNode | undefined;
  align?: "left" | "center" | undefined;
  className?: string | undefined;
  titleClassName?: string | undefined;
  descriptionClassName?: string | undefined;
  containerClassName?: string | undefined;
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  align = "left",
  className,
  titleClassName,
  descriptionClassName,
  containerClassName,
}: PageHeroProps) {
  const isCenter = align === "center";

  return (
    <section className={cn("surface-navy sticky top-16 z-20 overflow-hidden border-b border-sky-500/20 shadow-md shadow-navy/20 backdrop-blur-xl", className)}>
      <div className="grid-lines absolute inset-0 opacity-70 pointer-events-none" aria-hidden="true" />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[36rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative z-10 py-4 sm:py-5 lg:py-6">
        <div
          className={cn(
            "max-w-5xl lg:max-w-6xl xl:max-w-7xl w-full",
            isCenter ? "mx-auto flex flex-col items-center text-center" : "flex flex-col items-start text-left",
            containerClassName
          )}
          data-reveal
        >
          {eyebrow ? (
            <span
              className={cn(
                "eyebrow text-accent inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold tracking-widest uppercase",
                isCenter && "justify-center"
              )}
            >
              <span className="h-px w-5 sm:w-6 bg-accent" aria-hidden="true" />
              <span>{eyebrow}</span>
              {isCenter ? <span className="h-px w-5 sm:w-6 bg-accent" aria-hidden="true" /> : null}
            </span>
          ) : null}

          <h1
            className={cn(
              "mt-2.5 sm:mt-3 text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.45rem] font-black leading-tight sm:leading-tight text-white tracking-tight sm:whitespace-nowrap text-left",
              isCenter && "text-center mx-auto",
              titleClassName
            )}
          >
            {title}
          </h1>

          {description ? (
            <p
              className={cn(
                "mt-1.5 sm:mt-2 text-xs sm:text-sm md:text-[15px] leading-relaxed text-slate-300 font-normal text-left whitespace-normal md:whitespace-nowrap w-full max-w-none",
                isCenter && "text-center mx-auto",
                descriptionClassName
              )}
            >
              {description}
            </p>
          ) : null}

          {children ? (
            <div className={cn("mt-7 w-full", isCenter ? "flex justify-center" : "flex justify-start")}>
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}


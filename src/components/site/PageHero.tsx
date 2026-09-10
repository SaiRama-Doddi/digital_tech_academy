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
    <section className={cn("surface-navy relative overflow-hidden", className)}>
      <div className="grid-lines absolute inset-0 opacity-70 pointer-events-none" aria-hidden="true" />
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 size-[36rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative z-10 py-8 sm:py-10 lg:py-12">
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
                "eyebrow text-accent inline-flex items-center gap-2",
                isCenter && "justify-center"
              )}
            >
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              <span>{eyebrow}</span>
              {isCenter ? <span className="h-px w-6 bg-accent" aria-hidden="true" /> : null}
            </span>
          ) : null}

          <h1
            className={cn(
              "mt-4 text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-extrabold leading-[1.2] sm:leading-[1.18] text-navy-foreground tracking-tight max-w-5xl xl:max-w-6xl text-left",
              isCenter && "text-center mx-auto",
              titleClassName
            )}
          >
            {title}
          </h1>

          {description ? (
            <p
              className={cn(
                "mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg font-normal text-left",
                isCenter && "mx-auto sm:text-center text-balance",
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


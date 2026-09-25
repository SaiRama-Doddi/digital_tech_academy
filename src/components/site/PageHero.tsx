import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string | undefined;
  title: ReactNode;
  description?: ReactNode | undefined;
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
    <section
      className={cn(
        "relative overflow-hidden border-b border-slate-200/90 bg-gradient-to-r from-slate-50 via-sky-50/70 to-blue-50/50 py-4 sm:py-5 lg:py-6 shadow-2xs",
        className
      )}
    >
      {/* Ambient light glow */}
      <div
        className="pointer-events-none absolute left-1/2 -top-24 size-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-400/10 via-sky-400/10 to-indigo-400/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative z-10">
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
                "eyebrow text-blue-700 inline-flex items-center gap-2 font-bold uppercase text-[10.5px] sm:text-xs tracking-widest",
                isCenter && "justify-center"
              )}
            >
              <span className="h-px w-5 sm:w-6 bg-blue-600" aria-hidden="true" />
              <span>{eyebrow}</span>
              {isCenter ? (
                <span className="h-px w-5 sm:w-6 bg-blue-600" aria-hidden="true" />
              ) : null}
            </span>
          ) : null}

          <h1
            className={cn(
              "font-display font-extrabold tracking-tight text-slate-900 leading-[1.25] text-left [text-wrap:balance] mt-1 sm:mt-1.5 text-lg sm:text-xl md:text-2xl lg:text-[1.75rem]",
              isCenter && "text-center mx-auto",
              titleClassName
            )}
          >
            {title}
          </h1>

          {description ? (
            <p
              className={cn(
                "leading-relaxed text-slate-600 font-normal text-left max-w-3xl [text-wrap:balance] mt-1 sm:mt-1.5 text-xs sm:text-[13.5px]",
                isCenter && "text-center mx-auto",
                descriptionClassName
              )}
            >
              {description}
            </p>
          ) : null}

          {children ? (
            <div
              className={cn(
                "w-full mt-4 sm:mt-5",
                isCenter ? "flex justify-center" : "flex justify-start"
              )}
            >
              {children}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

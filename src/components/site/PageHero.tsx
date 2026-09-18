import { useState, useEffect, type ReactNode } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className={cn(
        "surface-navy sticky top-16 z-20 overflow-hidden border-b backdrop-blur-xl transition-all duration-300 ease-in-out",
        isScrolled
          ? "border-sky-500/30 shadow-lg shadow-navy/30 bg-[#070f26]/95"
          : "border-sky-500/20 shadow-md shadow-navy/20",
        className
      )}
    >
      <div className="grid-lines absolute inset-0 opacity-70 pointer-events-none" aria-hidden="true" />
      {/* Ambient glow */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl transition-all duration-300",
          isScrolled ? "-top-36 size-[24rem]" : "-top-24 size-[36rem]"
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "container-site relative z-10 transition-all duration-300 ease-in-out",
          isScrolled ? "py-1.5 sm:py-2 lg:py-2.5" : "py-3 sm:py-4 lg:py-4.5"
        )}
      >
        <div
          className={cn(
            "max-w-5xl lg:max-w-6xl xl:max-w-7xl w-full transition-all duration-300",
            isCenter ? "mx-auto flex flex-col items-center text-center" : "flex flex-col items-start text-left",
            containerClassName
          )}
          data-reveal
        >
          {eyebrow ? (
            <span
              className={cn(
                "eyebrow text-accent inline-flex items-center gap-2 font-bold uppercase transition-all duration-300 ease-in-out",
                isScrolled
                  ? "text-[10px] sm:text-[11px] tracking-wider mb-0.5"
                  : "text-[11px] sm:text-xs tracking-widest",
                isCenter && "justify-center"
              )}
            >
              <span
                className={cn(
                  "h-px bg-accent transition-all duration-300",
                  isScrolled ? "w-3 sm:w-4" : "w-5 sm:w-6"
                )}
                aria-hidden="true"
              />
              <span>{eyebrow}</span>
              {isCenter ? (
                <span
                  className={cn(
                    "h-px bg-accent transition-all duration-300",
                    isScrolled ? "w-3 sm:w-4" : "w-5 sm:w-6"
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </span>
          ) : null}

          <h1
            className={cn(
              "leading-tight sm:leading-tight text-white tracking-tight sm:whitespace-nowrap text-left [text-wrap:balance] transition-all duration-300 ease-in-out",
              isScrolled
                ? "mt-0.5 sm:mt-1 text-base sm:text-lg md:text-xl lg:text-[1.35rem] xl:text-[1.5rem] font-extrabold"
                : "mt-1.5 sm:mt-2 text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.45rem] font-black",
              isCenter && "text-center mx-auto",
              titleClassName
            )}
          >
            {title}
          </h1>

          {description ? (
            <p
              className={cn(
                "leading-relaxed text-slate-300 font-normal text-left whitespace-normal md:whitespace-nowrap w-full max-w-none [text-wrap:balance] transition-all duration-300 ease-in-out",
                isScrolled
                  ? "mt-0.5 sm:mt-1 text-[11px] sm:text-xs md:text-sm leading-snug text-slate-300/90"
                  : "mt-1 sm:mt-1.5 text-xs sm:text-sm md:text-[15px]",
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
                "w-full transition-all duration-300",
                isScrolled ? "mt-2 sm:mt-2.5" : "mt-4 sm:mt-5",
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


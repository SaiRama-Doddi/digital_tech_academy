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
      setIsScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className={cn(
        "sticky top-16 z-30 overflow-hidden border-b transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-slate-200/90 shadow-sm py-1.5 sm:py-2"
          : "bg-gradient-to-r from-slate-50 via-sky-50/70 to-blue-50/50 border-slate-200/90 py-4 sm:py-5 lg:py-6 shadow-2xs",
        className,
      )}
    >
      {/* Ambient light glow */}
      <div
        className={cn(
          "pointer-events-none absolute left-1/2 -top-24 size-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-400/10 via-sky-400/10 to-indigo-400/10 blur-3xl transition-opacity duration-300",
          isScrolled ? "opacity-0" : "opacity-100",
        )}
        aria-hidden="true"
      />
      <div className="container-site relative z-10">
        <div
          className={cn(
            "max-w-5xl lg:max-w-6xl xl:max-w-7xl w-full transition-all duration-300",
            isCenter
              ? "mx-auto flex flex-col items-center text-center"
              : "flex flex-col items-start text-left",
            containerClassName,
          )}
        >
          {eyebrow ? (
            <span
              className={cn(
                "eyebrow text-blue-700 inline-flex items-center gap-2 font-bold uppercase transition-all duration-300",
                isScrolled
                  ? "text-[9.5px] sm:text-[10.5px] tracking-wider mb-0.5"
                  : "text-[10.5px] sm:text-xs tracking-widest",
                isCenter && "justify-center",
              )}
            >
              <span
                className={cn(
                  "h-px bg-blue-600 transition-all duration-300",
                  isScrolled ? "w-3 sm:w-4" : "w-5 sm:w-6",
                )}
                aria-hidden="true"
              />
              <span>{eyebrow}</span>
              {isCenter ? (
                <span
                  className={cn(
                    "h-px bg-blue-600 transition-all duration-300",
                    isScrolled ? "w-3 sm:w-4" : "w-5 sm:w-6",
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </span>
          ) : null}

          <h1
            className={cn(
              "font-display font-extrabold tracking-tight text-slate-900 leading-tight text-left [text-wrap:balance] transition-all duration-300",
              isScrolled
                ? "text-sm sm:text-base md:text-lg mt-0.5"
                : "text-lg sm:text-xl md:text-2xl lg:text-[1.75rem] mt-1 sm:mt-1.5",
              isCenter && "text-center mx-auto",
              titleClassName,
            )}
          >
            {title}
          </h1>

          {description ? (
            <p
              className={cn(
                "leading-relaxed font-normal text-left max-w-3xl [text-wrap:balance] transition-all duration-300",
                isScrolled
                  ? "text-[10.5px] sm:text-xs text-slate-500 line-clamp-1 mt-0.5"
                  : "text-xs sm:text-[13.5px] text-slate-600 mt-1 sm:mt-1.5",
                isCenter && "text-center mx-auto",
                descriptionClassName,
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
                isCenter ? "flex justify-center" : "flex justify-start",
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

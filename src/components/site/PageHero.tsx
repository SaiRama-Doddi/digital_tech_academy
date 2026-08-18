import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="surface-navy relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="container-site relative py-14 sm:py-16 lg:py-20">
        <div className="max-w-3xl" data-reveal>
          {eyebrow ? (
            <span className="eyebrow text-accent">
              <span className="h-px w-6 bg-accent" aria-hidden="true" />
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] text-navy-foreground sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy-muted sm:text-lg">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-7">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}

import { cn } from "@/lib/utils";

export type ProcessStep = { step: string; title: string; text?: string | undefined };

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
        "grid gap-4 sm:grid-cols-2 lg:gap-5",
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
            "hover-lift relative flex flex-col gap-2 rounded-xl border p-5",
            onDark ? "border-navy-foreground/12 glass-panel" : "border-border bg-card shadow-card",
          )}
        >
          <span className="font-display text-2xl font-extrabold text-accent">{step.step}</span>
          <h3 className={cn("text-base font-bold", onDark ? "text-navy-foreground" : "text-foreground")}>
            {step.title}
          </h3>
          {step.text ? (
            <p className={cn("text-sm leading-relaxed", onDark ? "text-navy-muted" : "text-muted-foreground")}>
              {step.text}
            </p>
          ) : null}
          <span
            aria-hidden="true"
            className={cn(
              "absolute right-0 top-1/2 hidden h-px w-4 translate-x-full bg-accent/50",
              index < steps.length - 1 && "lg:block",
            )}
          />
        </li>
      ))}
    </ol>
  );
}

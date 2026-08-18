import { useEffect, useState } from "react";

import { useInView } from "@/hooks/use-reveal";
import { stats } from "@/data/content";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-3xl font-extrabold text-accent sm:text-4xl lg:text-[2.6rem]">
      {display}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section aria-label="Institute statistics" className="surface-navy border-y border-navy-600/60">
      <div className="container-site section-y-sm">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-reveal
              className="flex flex-col items-center gap-1.5 border-l border-navy-600/70 pl-4 text-center lg:items-start lg:text-left"
            >
              <dd className="order-1 flex items-baseline font-display">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="order-2 text-xs font-semibold uppercase tracking-[0.12em] text-navy-muted sm:text-[0.8rem]">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

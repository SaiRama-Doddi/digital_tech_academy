import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type CountUpProps = {
  value: number;
  suffix?: string | undefined;
  prefix?: string | undefined;
  duration?: number | undefined;
  className?: string | undefined;
};

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 1600,
  className,
}: CountUpProps) {
  const { ref, inView } = useInView<HTMLSpanElement>(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplay(0);
      return;
    }

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic: smooth and visible progression for counts
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

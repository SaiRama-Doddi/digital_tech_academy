import { Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  name: string;
  course: string;
  rating: number;
  quote: string;
  onDark?: boolean | undefined;
  className?: string | undefined;
};

export function TestimonialCard({ name, course, rating, quote, onDark, className }: Props) {
  return (
    <figure
      className={cn(
        "group flex h-full w-full min-w-0 flex-col gap-3.5 sm:gap-4 rounded-2xl border p-4 sm:p-6 transition-all duration-300 overflow-hidden",
        onDark
          ? "border-navy-foreground/15 bg-navy-700/30 backdrop-blur-sm shadow-lg shadow-navy/20 hover:border-accent/40 text-navy-foreground"
          : "border-slate-200/80 bg-white shadow-sm hover:shadow-xl hover:shadow-navy/5 hover:border-accent/40 hover:-translate-y-1",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Quote className="size-5 sm:size-6 text-accent shrink-0" aria-hidden="true" />
        <div className="flex items-center gap-0.5 shrink-0" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5 shrink-0",
                i < rating ? "fill-accent text-accent" : onDark ? "text-navy-muted" : "text-border-strong",
              )}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <blockquote
        className={cn(
          "flex-1 text-sm sm:text-[0.95rem] lg:text-[1rem] leading-relaxed break-words font-normal",
          onDark ? "text-navy-foreground/85" : "text-foreground/85",
        )}
      >
        {quote}
      </blockquote>

      <figcaption className="flex items-center gap-2.5 sm:gap-3 border-t pt-3 sm:pt-4 border-inherit min-w-0">
        <span
          className={cn(
            "grid size-9 sm:size-10 shrink-0 place-items-center rounded-full text-xs sm:text-sm font-bold",
            onDark ? "bg-accent/20 text-accent" : "bg-accent-soft text-foreground",
          )}
          aria-hidden="true"
        >
          {name.charAt(0)}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm sm:text-[15px] font-bold">{name}</span>
          <span
            className={cn(
              "block truncate text-xs sm:text-[12.5px]",
              onDark ? "text-navy-muted" : "text-muted-foreground",
            )}
          >
            {course}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

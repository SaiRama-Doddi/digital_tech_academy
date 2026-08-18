import { Quote, Star } from "lucide-react";

import { cn } from "@/lib/utils";

type Props = {
  name: string;
  course: string;
  rating: number;
  quote: string;
  onDark?: boolean;
  className?: string;
};

export function TestimonialCard({ name, course, rating, quote, onDark, className }: Props) {
  return (
    <figure
      className={cn(
        "hover-lift flex h-full flex-col gap-4 rounded-xl border p-5 sm:p-6",
        onDark
          ? "border-navy-foreground/12 glass-panel text-navy-foreground"
          : "border-border bg-card shadow-card",
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <Quote className="size-6 text-accent" aria-hidden="true" />
        <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5",
                i < rating ? "fill-accent text-accent" : onDark ? "text-navy-muted" : "text-border-strong",
              )}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <blockquote
        className={cn(
          "flex-1 text-[0.95rem] leading-relaxed",
          onDark ? "text-navy-foreground/85" : "text-foreground/85",
        )}
      >
        {quote}
      </blockquote>

      <figcaption className="flex items-center gap-3 border-t pt-4 border-inherit">
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-full text-sm font-bold",
            onDark ? "bg-accent/20 text-accent" : "bg-accent-soft text-foreground",
          )}
          aria-hidden="true"
        >
          {name.charAt(0)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-bold">{name}</span>
          <span
            className={cn(
              "block truncate text-xs",
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

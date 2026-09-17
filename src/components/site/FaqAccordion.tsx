import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: string };

export function FaqAccordion({
  items,
  className,
  defaultOpen = 0,
}: {
  items: FaqItem[];
  className?: string | undefined;
  defaultOpen?: number | null | undefined;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className={cn("divide-y divide-border overflow-hidden rounded-xl border border-border bg-card", className)}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} data-reveal>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface sm:px-6 sm:py-5"
              >
                <span
                  className={cn(
                    "text-sm sm:text-base lg:text-[1.05rem] font-bold transition-colors leading-snug",
                    isOpen ? "text-accent-foreground" : "text-foreground",
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-md border transition-colors",
                    isOpen ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground",
                  )}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="size-4" /> : <Plus className="size-4" />}
                </span>
              </button>
            </h3>
            <div
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-xs sm:text-sm lg:text-[0.95rem] leading-relaxed text-muted-foreground sm:px-6 sm:pb-6">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

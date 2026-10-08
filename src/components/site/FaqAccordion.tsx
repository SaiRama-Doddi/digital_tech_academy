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
    <div
      className={cn(
        "divide-y divide-slate-200/80 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs",
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div
            key={item.question}
            data-reveal
            className={cn("transition-colors duration-200", isOpen ? "bg-blue-50/20" : "bg-white")}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="group flex w-full items-center justify-between gap-3.5 px-4.5 py-3.5 text-left transition-colors hover:bg-slate-50/80 sm:px-5.5 sm:py-4"
              >
                <span
                  className={cn(
                    "text-sm sm:text-[0.95rem] font-bold transition-colors leading-snug",
                    isOpen ? "text-blue-700" : "text-slate-800 group-hover:text-blue-600",
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    "grid size-7 sm:size-7.5 shrink-0 place-items-center rounded-lg border transition-all duration-200",
                    isOpen
                      ? "border-blue-500 bg-blue-600 text-white shadow-xs shadow-blue-500/30"
                      : "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300 group-hover:text-slate-700",
                  )}
                  aria-hidden="true"
                >
                  {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
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
                <p className="px-4.5 pb-3.5 sm:px-5.5 sm:pb-4.5 pt-0.5 text-left text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
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

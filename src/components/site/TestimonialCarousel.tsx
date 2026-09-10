import { useEffect, useRef, useState } from "react";
import { TestimonialCard } from "./TestimonialCard";
import { cn } from "@/lib/utils";

type Item = { name: string; course: string; rating: number; quote: string };

/** Grid on tablet/desktop, smooth auto-scrolling carousel on mobile. */
export function TestimonialCarousel({ items, onDark }: { items: Item[]; onDark?: boolean | undefined }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll on mobile screens (< 640px)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;
      if (!container) return;

      // Only auto-scroll on mobile (< 640px)
      if (window.innerWidth >= 640) return;

      const firstCard = container.firstElementChild as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth;
      const gap = 12; // gap-3 is 12px
      const scrollStep = cardWidth + gap;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 20) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        setActiveIndex(0);
      } else {
        container.scrollBy({ left: scrollStep, behavior: "smooth" });
        setActiveIndex((prev) => (prev + 1) % items.length);
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  const scrollToSlide = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.children;
    if (cards[index]) {
      const targetCard = cards[index] as HTMLElement;
      container.scrollTo({
        left: targetCard.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const firstCard = container.firstElementChild as HTMLElement;
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth + 12;
    const currentIdx = Math.round(container.scrollLeft / cardWidth);
    if (currentIdx !== activeIndex && currentIdx >= 0 && currentIdx < items.length) {
      setActiveIndex(currentIdx);
    }
  };

  return (
    <>
      {/* Mobile view: smooth auto-scrolling carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
          setTimeout(() => setIsPaused(false), 2500);
        }}
        className="no-scrollbar -mx-3 sm:mx-0 flex snap-x snap-mandatory gap-3 sm:gap-4 overflow-x-auto px-3 sm:px-0 pb-2 sm:hidden max-w-full scroll-smooth"
      >
        {items.map((item) => (
          <div key={item.name + item.quote} className="w-[85%] shrink-0 snap-center">
            <TestimonialCard {...item} onDark={onDark} />
          </div>
        ))}
      </div>

      {/* Mobile Auto-Scroll Dot Indicators */}
      <div className="flex sm:hidden justify-center items-center gap-1.5 mt-3.5">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToSlide(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
              activeIndex === i ? "w-6 bg-blue-600" : "w-1.5 bg-slate-300 hover:bg-slate-400",
            )}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>

      {/* Tablet & Desktop view: clean responsive grid (completely unchanged) */}
      <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.name + item.quote} data-reveal>
            <TestimonialCard {...item} onDark={onDark} />
          </div>
        ))}
      </div>
    </>
  );
}

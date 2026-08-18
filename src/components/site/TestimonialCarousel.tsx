import { TestimonialCard } from "./TestimonialCard";

type Item = { name: string; course: string; rating: number; quote: string };

/** Grid on tablet/desktop, swipeable horizontal carousel on mobile. */
export function TestimonialCarousel({ items, onDark }: { items: Item[]; onDark?: boolean }) {
  return (
    <>
      <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:hidden">
        {items.map((item) => (
          <div key={item.name + item.quote} className="w-[85%] shrink-0 snap-center">
            <TestimonialCard {...item} onDark={onDark} />
          </div>
        ))}
      </div>
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

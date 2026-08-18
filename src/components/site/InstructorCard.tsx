import type { Instructor } from "@/data/courses";

export function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <article
      data-reveal
      className="hover-lift group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card"
    >
      <div className="aspect-[4/3] overflow-hidden bg-navy sm:aspect-square">
        <img
          src={instructor.image}
          alt={`${instructor.name}, ${instructor.role}`}
          loading="lazy"
          width={800}
          height={800}
          className="size-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-base font-bold text-foreground">{instructor.name}</h3>
          <p className="text-sm font-semibold text-accent-foreground/70">{instructor.role}</p>
        </div>
        <p className="text-xs text-muted-foreground">{instructor.experience}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5">
          {instructor.expertise.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-surface px-2 py-1 text-[0.7rem] font-medium text-foreground/75"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

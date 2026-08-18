import { ArrowRight, Clock, Layers, Signal } from "lucide-react";

import { BtnLink } from "./Btn";
import type { Course } from "@/data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article
      data-reveal
      className="hover-lift group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy">
        <img
          src={course.image}
          alt={`${course.title} training visual`}
          loading="lazy"
          width={1200}
          height={800}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-md bg-navy/85 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-accent backdrop-blur">
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="space-y-2">
          <h3 className="text-lg font-bold leading-snug text-foreground sm:text-xl">{course.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{course.description}</p>
        </div>

        <dl className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground">
          <div className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5 text-accent" aria-hidden="true" />
            <dt className="sr-only">Duration</dt>
            <dd>{course.duration}</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Signal className="size-3.5 text-accent" aria-hidden="true" />
            <dt className="sr-only">Level</dt>
            <dd>{course.level}</dd>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Layers className="size-3.5 text-accent" aria-hidden="true" />
            <dt className="sr-only">Modules</dt>
            <dd>{course.syllabus.length} Modules</dd>
          </div>
        </dl>

        <ul className="flex flex-wrap gap-1.5">
          {course.highlights.slice(0, 6).map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-surface px-2 py-1 text-[0.72rem] font-medium text-foreground/75"
            >
              {item}
            </li>
          ))}
        </ul>

        <BtnLink
          to="/courses/$slug"
          params={{ slug: course.slug }}
          variant="primary"
          size="sm"
          className="mt-auto w-full"
        >
          View Course
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </BtnLink>
      </div>
    </article>
  );
}

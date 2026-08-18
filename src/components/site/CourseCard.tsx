import { ArrowRight, Clock, BookOpen, Signal } from "lucide-react";

import { BtnLink } from "./Btn";
import type { Course } from "@/data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article
      data-reveal
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.035)] hover:border-slate-200/60 transition-all duration-300 h-full"
    >
      {/* Course Image Wrapper */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 shrink-0">
        <img
          src={course.image}
          alt={`${course.title} training visual`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-md bg-slate-950/80 px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-accent backdrop-blur-sm">
          {course.category}
        </span>
      </div>

      {/* Course Details */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="space-y-1.5 flex-1">
          <h3 className="text-sm sm:text-base font-extrabold leading-snug text-slate-800 transition-colors group-hover:text-blue-600">
            {course.title}
          </h3>
          <p className="text-[0.75rem] leading-relaxed text-slate-500 text-justify line-clamp-3">
            {course.description}
          </p>
        </div>

        {/* Specs Row */}
        <div className="my-4 flex items-center gap-x-2.5 gap-y-1 flex-wrap text-[0.68rem] font-bold text-slate-400 border-t border-slate-50 pt-3">
          <div className="flex items-center gap-1">
            <Clock className="size-3.5 text-blue-500" />
            <span>{course.duration}</span>
          </div>
          <span className="text-slate-200 font-normal">•</span>
          <div className="flex items-center gap-1">
            <Signal className="size-3.5 text-blue-500" />
            <span>{course.level.split(" to ")[0]}</span>
          </div>
          <span className="text-slate-200 font-normal">•</span>
          <div className="flex items-center gap-1">
            <BookOpen className="size-3.5 text-blue-500" />
            <span>{course.syllabus.length} Modules</span>
          </div>
        </div>

        {/* CTA Button */}
        <BtnLink
          to="/courses/$slug"
          params={{ slug: course.slug }}
          variant="outline"
          size="sm"
          className="w-full border-slate-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-slate-700 font-bold transition-all duration-300 rounded-lg text-xs h-9 flex items-center justify-center gap-1.5"
        >
          View Program
          <ArrowRight
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </BtnLink>
      </div>
    </article>
  );
}

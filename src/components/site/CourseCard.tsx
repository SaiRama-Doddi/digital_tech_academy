import {
  ArrowRight,
  Clock,
  Signal,
  Megaphone,
  Code2,
  BarChart3,
  ShieldCheck,
  Palette,
  Briefcase,
  Award,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { Course } from "@/data/courses";

// Helper to determine the theme styling based on category and title
function getCourseTheme(category = "", title = "") {
  const text = `${category} ${title}`.toLowerCase();

  if (
    text.includes("market") ||
    text.includes("seo") ||
    text.includes("social") ||
    text.includes("ads") ||
    text.includes("ad")
  ) {
    return {
      bgGradient: "from-rose-50/80 via-white to-rose-50/30",
      borderColor: "border-rose-100 hover:border-rose-300",
      iconBg: "bg-rose-100 text-rose-600",
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
      btnBg: "bg-rose-100/90 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
      icon: Megaphone,
    };
  }

  if (
    text.includes("web") ||
    text.includes("code") ||
    text.includes("frontend") ||
    text.includes("full stack") ||
    text.includes("react") ||
    text.includes("developer")
  ) {
    return {
      bgGradient: "from-emerald-50/80 via-white to-emerald-50/30",
      borderColor: "border-emerald-100 hover:border-emerald-300",
      iconBg: "bg-emerald-100 text-emerald-600",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      btnBg: "bg-emerald-100/90 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
      icon: Code2,
    };
  }

  if (
    text.includes("data") ||
    text.includes("analytic") ||
    text.includes("bi") ||
    text.includes("sql") ||
    text.includes("python") ||
    text.includes("ai") ||
    text.includes("machine")
  ) {
    return {
      bgGradient: "from-purple-50/80 via-white to-purple-50/30",
      borderColor: "border-purple-100 hover:border-purple-300",
      iconBg: "bg-purple-100 text-purple-600",
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
      btnBg: "bg-purple-100/90 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
      icon: BarChart3,
    };
  }

  if (
    text.includes("cyber") ||
    text.includes("hack") ||
    text.includes("security") ||
    text.includes("soc") ||
    text.includes("network")
  ) {
    return {
      bgGradient: "from-amber-50/80 via-white to-amber-50/30",
      borderColor: "border-amber-100 hover:border-amber-300",
      iconBg: "bg-amber-100 text-amber-600",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
      btnBg: "bg-amber-100/90 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
      icon: ShieldCheck,
    };
  }

  if (
    text.includes("design") ||
    text.includes("ui") ||
    text.includes("ux") ||
    text.includes("creative") ||
    text.includes("graphic")
  ) {
    return {
      bgGradient: "from-sky-50/80 via-white to-sky-50/30",
      borderColor: "border-sky-100 hover:border-sky-300",
      iconBg: "bg-sky-100 text-sky-600",
      badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
      btnBg: "bg-sky-100/90 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
      icon: Palette,
    };
  }

  if (
    text.includes("business") ||
    text.includes("manage") ||
    text.includes("product") ||
    text.includes("leadership")
  ) {
    return {
      bgGradient: "from-pink-50/80 via-white to-pink-50/30",
      borderColor: "border-pink-100 hover:border-pink-200",
      iconBg: "bg-pink-100 text-pink-600",
      badgeBg: "bg-pink-50 text-pink-700 border-pink-200",
      btnBg: "bg-pink-100/90 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
      icon: Briefcase,
    };
  }

  return {
    bgGradient: "from-blue-50/80 via-white to-blue-50/30",
    borderColor: "border-blue-100 hover:border-blue-300",
    iconBg: "bg-blue-100 text-blue-600",
    badgeBg: "bg-blue-50 text-blue-700 border-blue-200",
    btnBg: "bg-blue-100/90 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    icon: Award,
  };
}

export function CourseCard({ course }: { course: Course | any }) {
  const navigate = useNavigate();
  const theme = getCourseTheme(course.category, course.title);
  const IconComponent = theme.icon;

  return (
    <article
      data-reveal
      role="link"
      tabIndex={0}
      aria-label={`Explore course details for ${course.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate({ to: "/courses/$slug", params: { slug: course.slug } });
        }
      }}
      onClick={() => {
        navigate({ to: "/courses/$slug", params: { slug: course.slug } });
      }}
      className={cn(
        "group flex flex-col justify-between rounded-2xl bg-gradient-to-b border p-4 sm:p-5 shadow-xs transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 cursor-pointer h-full select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
        theme.bgGradient,
        theme.borderColor,
      )}
    >
      {/* Top Meta Bar: Category Pill & Live Badge */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={cn(
            "text-[10px] sm:text-[10.5px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-2xs",
            theme.badgeBg,
          )}
        >
          {course.category || "Certification"}
        </span>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 border border-slate-200/80 text-[10px] font-bold text-slate-600 shadow-2xs">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Online</span>
        </div>
      </div>

      {/* Center Area: Circular Icon Badge, Title, Description & Highlights */}
      <div className="flex flex-col items-center flex-1 my-auto py-1 w-full">
        {/* Circular Colored Icon Badge */}
        <div
          className={cn(
            "size-12 sm:size-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-xs shrink-0",
            theme.iconBg,
          )}
        >
          <IconComponent className="size-6 sm:size-7" aria-hidden="true" />
        </div>

        {/* Course Title - Fixed height container for consistent horizontal baseline alignment */}
        <div className="mt-3 sm:mt-3.5 min-h-[44px] sm:min-h-[48px] flex items-center justify-center text-center w-full px-1">
          <h3 className="font-bold text-slate-900 text-xs sm:text-sm lg:text-[0.95rem] leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            {course.title}
          </h3>
        </div>

        {/* Subtitle / Topics / Description - Fully Justified text with consistent alignment */}
        <div className="mt-2 w-full min-h-[58px] sm:min-h-[62px] flex items-start px-0.5">
          <p className="w-full text-[11px] sm:text-xs text-slate-600 leading-relaxed text-justify line-clamp-3">
            {course.description}
          </p>
        </div>

        {/* Learning Journey Strip (if present) */}
        {course.learningJourney && (
          <div className="mt-2.5 w-full rounded-lg bg-white/90 border border-slate-200/80 px-2 py-1.5 text-center">
            <span className="block text-[8.5px] font-black uppercase tracking-wider text-slate-400">
              Learning Journey
            </span>
            <span className="block text-[10px] font-bold text-blue-700 truncate mt-0.5">
              {course.learningJourney}
            </span>
          </div>
        )}

        {/* Skill Chips - Aligned horizontal baseline */}
        <div className="mt-2.5 w-full min-h-[24px] flex flex-wrap items-center justify-center gap-1.5">
          {course.highlights && course.highlights.length > 0 ? (
            course.highlights.slice(0, 3).map((h: string, idx: number) => (
              <span
                key={idx}
                className="text-[9px] sm:text-[9.5px] font-semibold px-2 py-0.5 rounded-md border border-slate-200/70 bg-white/90 text-slate-600 max-w-[140px] truncate shadow-2xs"
              >
                {h}
              </span>
            ))
          ) : (
            <span className="text-[9px] sm:text-[9.5px] font-medium px-2 py-0.5 rounded-md border border-slate-200/50 bg-white/70 text-slate-500">
              Interactive Live Training
            </span>
          )}
        </div>
      </div>

      {/* Bottom Metadata & Action Row - Aligned flush to bottom */}
      <div className="mt-4 pt-3 border-t border-slate-100/90 flex items-center justify-between w-full">
        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="size-3 sm:size-3.5 text-slate-400" />
            {course.duration || "12 Weeks"}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-medium">
            {(course.level || "All Levels").split(" to ")[0]}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
          <span>{course.primaryCta || "Explore Track"}</span>
          <span
            className={cn(
              "grid size-6 place-items-center rounded-lg transition-all duration-200 shadow-xs ml-1",
              theme.btnBg,
            )}
            aria-hidden="true"
          >
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
}


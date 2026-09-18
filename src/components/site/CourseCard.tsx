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
  Radio,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { Course } from "@/data/courses";
import digitalMarketingImg from "@/assets/course-digital-marketing.jpg";
import cyberSecurityImg from "@/assets/course-cyber-security.jpg";
import advancedSeoImg from "@/assets/course-advanced-seo.jpg";
import ethicalHackingImg from "@/assets/course-ethical-hacking.jpg";
import programmaticAdvertisingImg from "@/assets/course-programmatic-advertising.jpg";
import { normalizeCourseCategory } from "@/services/courseService";

export function getCourseCategory(course: any): string {
  if (!course) return "Certification";
  return normalizeCourseCategory(course.category, course.title, course.slug);
}

export function getCourseImage(course: any): string {
  if (course?.image && typeof course.image === "string" && course.image.length > 5) {
    return course.image;
  }

  const slug = (course?.slug || "").toLowerCase();
  const title = (course?.title || "").toLowerCase();
  const category = (course?.category || "").toLowerCase();

  if (slug.includes("ethical") || title.includes("ethical") || title.includes("hacking")) {
    return ethicalHackingImg;
  }
  if (
    slug.includes("programmatic") ||
    title.includes("programmatic") ||
    title.includes("adtech") ||
    title.includes("dsp")
  ) {
    return programmaticAdvertisingImg;
  }
  if (slug.includes("seo") || title.includes("seo") || title.includes("search")) {
    return advancedSeoImg;
  }
  if (
    category.includes("cyber") ||
    category.includes("security") ||
    slug.includes("cyber") ||
    slug.includes("security") ||
    title.includes("cyber") ||
    title.includes("security")
  ) {
    return cyberSecurityImg;
  }
  if (category.includes("market") || slug.includes("market") || title.includes("market")) {
    return digitalMarketingImg;
  }

  return digitalMarketingImg;
}

// Helper to determine the theme styling based on category and title
function getCourseTheme(category = "", title = "") {
  const text = `${category} ${title}`.toLowerCase();

  if (
    text.includes("programmatic") ||
    text.includes("adtech") ||
    text.includes("dv360") ||
    text.includes("cm360")
  ) {
    return {
      bgGradient: "from-sky-50/80 via-white to-sky-50/30",
      borderColor: "border-sky-100 hover:border-sky-300",
      iconBg: "bg-sky-100 text-sky-600",
      badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
      btnBg: "bg-sky-100/90 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
      icon: Radio,
    };
  }

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
  const displayCategory = getCourseCategory(course);
  const theme = getCourseTheme(displayCategory, course.title);
  const IconComponent = theme.icon;
  const courseImage = getCourseImage(course);

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
      {/* Course Image Header with Floating Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900 shadow-xs mb-3.5 shrink-0">
        <img
          src={courseImage}
          alt={course.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-black/30" />

        {/* Floating Category & Mode Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2 z-10">
          <span
            className={cn(
              "text-[9.5px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full border shadow-xs backdrop-blur-md bg-white/95",
              theme.badgeBg,
            )}
          >
            {displayCategory}
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/95 border border-slate-200/80 text-[9.5px] font-bold text-slate-700 shadow-xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Online</span>
          </div>
        </div>

        {/* Subtle Theme Icon Accent Floating at Bottom-Right of Image */}
        <div
          className={cn(
            "absolute bottom-2.5 right-2.5 size-7 rounded-lg flex items-center justify-center shadow-md backdrop-blur-md transition-transform duration-300 group-hover:scale-110",
            theme.iconBg,
          )}
        >
          <IconComponent className="size-3.5" aria-hidden="true" />
        </div>
      </div>

      {/* Card Body: Title, Description & Highlights */}
      <div className="flex flex-col flex-1 w-full">
        {/* Course Title */}
        <div className="min-h-[44px] flex items-center w-full">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 text-left">
            {course.title}
          </h3>
        </div>

        {/* Subtitle / Topics / Description */}
        <div className="mt-1.5 w-full min-h-[54px] flex items-start">
          <p className="w-full text-xs text-slate-600 leading-relaxed text-justify line-clamp-3 font-normal">
            {course.description}
          </p>
        </div>

        {/* Learning Journey Strip (if present) */}
        {course.learningJourney && (
          <div className="mt-2.5 w-full rounded-lg bg-white/90 border border-slate-200/80 px-2 py-1 text-center">
            <span className="block text-[8px] font-black uppercase tracking-wider text-slate-400">
              Learning Journey
            </span>
            <span className="block text-[9.5px] font-bold text-blue-700 truncate mt-0.5">
              {course.learningJourney}
            </span>
          </div>
        )}

        {/* Skill Chips */}
        <div className="mt-2.5 w-full min-h-[24px] flex flex-wrap items-center gap-1.5">
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

      {/* Bottom Metadata & Action Row */}
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
          <span>{course.primaryCta || "View Course"}</span>
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


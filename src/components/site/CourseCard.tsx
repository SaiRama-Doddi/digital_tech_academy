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
  Bot,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import type { Course } from "@/data/courses";
import digitalMarketingImg from "@/assets/course-digital-marketing.jpg";
import cyberSecurityImg from "@/assets/course-cyber-security.jpg";
import advancedSeoImg from "@/assets/course-advanced-seo.jpg";
import ethicalHackingImg from "@/assets/course-ethical-hacking.jpg";
import programmaticAdvertisingImg from "@/assets/course-programmatic-advertising.jpg";
import domainAiAutomationImg from "@/assets/domain-ai-automation.jpg";
import domainFullstackDevImg from "@/assets/domain-fullstack-dev.jpg";
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

  if (slug.includes("ai") || title.includes("ai") || category.includes("ai") || slug.includes("automation") || title.includes("automation")) {
    return domainAiAutomationImg;
  }
  if (slug.includes("full-stack") || slug.includes("web-dev") || title.includes("full stack") || category.includes("stack") || category.includes("web")) {
    return domainFullstackDevImg;
  }
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
function getCourseTheme(category: string, title?: string) {
  const text = `${category} ${title || ""}`.toLowerCase();

  let icon = Award;
  if (text.includes("ai") || text.includes("automation") || text.includes("bot") || text.includes("agent")) {
    icon = Bot;
  } else if (text.includes("programmatic") || text.includes("adtech") || text.includes("media") || text.includes("dv360")) {
    icon = Radio;
  } else if (text.includes("market") || text.includes("seo") || text.includes("social") || text.includes("ads") || text.includes("ad")) {
    icon = Megaphone;
  } else if (text.includes("web") || text.includes("code") || text.includes("frontend") || text.includes("full stack") || text.includes("react") || text.includes("developer")) {
    icon = Code2;
  } else if (text.includes("data") || text.includes("analytic") || text.includes("bi") || text.includes("sql") || text.includes("python")) {
    icon = BarChart3;
  } else if (text.includes("cyber") || text.includes("hack") || text.includes("security") || text.includes("soc") || text.includes("network")) {
    icon = ShieldCheck;
  } else if (text.includes("design") || text.includes("ui") || text.includes("ux") || text.includes("creative") || text.includes("graphic")) {
    icon = Palette;
  } else if (text.includes("business") || text.includes("manage") || text.includes("product") || text.includes("leadership")) {
    icon = Briefcase;
  }

  return {
    bgGradient: "from-blue-50/30 via-white to-white",
    borderColor: "border-slate-300 hover:border-blue-600",
    iconBg: "bg-blue-50 text-blue-700 ring-1 ring-blue-200/80",
    badgeBg: "bg-blue-50 text-blue-800 border-blue-200",
    btnBg: "bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white",
    icon,
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
        "group flex flex-col justify-between rounded-xl bg-gradient-to-b border p-3.5 sm:p-4 shadow-2xs transition-all duration-200 hover:shadow-md hover:-translate-y-1 cursor-pointer h-full select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none",
        theme.bgGradient,
        theme.borderColor,
      )}
    >
      {/* Course Image Header with Floating Badges */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-slate-900 shadow-2xs mb-2.5 shrink-0">
        <img
          src={courseImage}
          alt={course.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-black/30" />

        {/* Floating Category & Mode Badges */}
        <div className="absolute top-2 inset-x-2 flex items-center justify-between gap-1.5 z-10">
          <span
            className={cn(
              "text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border shadow-2xs backdrop-blur-md bg-white/95",
              theme.badgeBg,
            )}
          >
            {displayCategory}
          </span>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/95 border border-slate-300 text-[9px] font-bold text-slate-800 shadow-2xs backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Online</span>
          </div>
        </div>

        {/* Subtle Theme Icon Accent Floating at Bottom-Right of Image */}
        <div
          className={cn(
            "absolute bottom-2 right-2 size-6 rounded-md flex items-center justify-center shadow-xs backdrop-blur-md transition-transform duration-300 group-hover:scale-110",
            theme.iconBg,
          )}
        >
          <IconComponent className="size-3" aria-hidden="true" />
        </div>
      </div>

      {/* Card Body: Title, Description & Highlights */}
      <div className="flex flex-col flex-1 w-full">
        {/* Course Title */}
        <div className="min-h-[38px] flex items-center w-full">
          <h3 className="font-bold text-slate-900 text-[13.5px] sm:text-sm leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 text-left">
            {course.title}
          </h3>
        </div>

        {/* Subtitle / Topics / Description */}
        <div className="mt-1 w-full min-h-[44px] flex items-start">
          <p className="w-full text-[11px] text-slate-600 leading-relaxed text-justify line-clamp-2 font-normal">
            {course.description}
          </p>
        </div>

        {/* Skill Chips */}
        <div className="mt-2 w-full min-h-[22px] flex flex-wrap items-center gap-1">
          {course.highlights && course.highlights.length > 0 ? (
            course.highlights.slice(0, 3).map((h: string, idx: number) => (
              <span
                key={idx}
                className="text-[8.5px] font-semibold px-1.5 py-0.5 rounded-md border border-slate-200 bg-white text-slate-600 max-w-[130px] truncate shadow-2xs"
              >
                {h}
              </span>
            ))
          ) : (
            <span className="text-[8.5px] font-medium px-1.5 py-0.5 rounded-md border border-slate-200 bg-white text-slate-600">
              Live Training
            </span>
          )}
        </div>
      </div>

      {/* Bottom Metadata & Action Row */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between w-full">
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600">
          <span className="flex items-center gap-1">
            <Clock className="size-3 text-slate-400" />
            {course.duration || "12 Weeks"}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-semibold">
            {(course.level || "All Levels").split(" to ")[0]}
          </span>
        </div>

        <div className="flex items-center gap-1 text-[10.5px] font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
          <span>{course.primaryCta || "View Course"}</span>
          <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </article>
  );
}


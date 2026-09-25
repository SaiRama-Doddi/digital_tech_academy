import { useState } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileSearch,
  GraduationCap,
  PlayCircle,
  Rocket,
  Sparkles,
  TrendingUp,
  Trophy,
  Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils";

export type AscentStep = {
  step: string;
  level: string;
  altitude: string;
  tag: string;
  title: string;
  text: string;
  highlights: string[];
  icon: string;
};

const stepsData: AscentStep[] = [
  {
    step: "01",
    level: "STEP 1 · BASECAMP",
    altitude: "Elevation: 20%",
    tag: "Concept Mastery",
    title: "Learn Fundamentals",
    text: "Understand the principles, terminology, frameworks, and tools behind each subject with clear conceptual foundations.",
    highlights: ["Core Principles", "Industry Tools", "Frameworks"],
    icon: "BookOpen",
  },
  {
    step: "02",
    level: "STEP 2 · THE ASCENT",
    altitude: "Elevation: 40%",
    tag: "Real-World Action",
    title: "See It In Action",
    text: "Watch how the concept is applied in a real-world scenario with live demonstrations and practical walkthroughs.",
    highlights: ["Live Demonstrations", "Real Scenarios", "Workflow Teardowns"],
    icon: "PlayCircle",
  },
  {
    step: "03",
    level: "STEP 3 · ELEVATION",
    altitude: "Elevation: 60%",
    tag: "Real Execution",
    title: "Build Real Projects",
    text: "Apply your learning to live campaigns, realistic client case studies, and complete portfolio-grade deliverables.",
    highlights: ["Live Projects", "Campaign Strategy", "Portfolio Assets"],
    icon: "Rocket",
  },
  {
    step: "04",
    level: "STEP 4 · MENTOR POLISH",
    altitude: "Elevation: 80%",
    tag: "Expert Audit",
    title: "Review & Refine",
    text: "Identify gaps, optimize your work under mentor guidance, and learn how seasoned industry leads evaluate live performance.",
    highlights: ["Mentor Feedback", "Gap Analysis", "Performance Tuning"],
    icon: "FileSearch",
  },
  {
    step: "05",
    level: "STEP 5 · THE SUMMIT",
    altitude: "Elevation: 100%",
    tag: "Career Success",
    title: "Progress & Excel",
    text: "Graduate with a job-ready portfolio, verified credentials, interview confidence, and career placement readiness.",
    highlights: ["Verified Certification", "Interview Ready", "Career Placement"],
    icon: "Trophy",
  },
];

const iconComponents: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  PlayCircle,
  Wrench,
  Rocket,
  FileSearch,
  Trophy,
  Award,
  GraduationCap,
  TrendingUp,
};

export function AscentTimeline({ className }: { className?: string | undefined }) {
  const [activeStep, setActiveStep] = useState<number>(4); // Default to Step 5 (Summit)

  return (
    <div className={cn("relative w-full", className)}>
      {/* Visual Ascent Tracker Header on Desktop */}
      <div className="mb-6 sm:mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-500/20 bg-[#071326]/80 p-4 sm:p-5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 text-white shadow-md shadow-sky-500/20">
            <TrendingUp className="size-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-bold uppercase tracking-wider text-sky-400">Student Success Ascent</p>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                <Sparkles className="size-2.5" /> 5 Milestones
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-200">
              Climbing from Foundation to Job-Ready Career Summit
            </p>
          </div>
        </div>

        {/* Quick summit preview tag */}
        <div className="hidden sm:flex items-center gap-2.5 rounded-xl border border-sky-400/30 bg-sky-500/10 px-3.5 py-1.5 text-xs text-sky-300">
          <Trophy className="size-4 text-sky-400" />
          <span className="font-semibold">Goal: 100% Career Placement Readiness</span>
        </div>
      </div>

      {/* ================= DESKTOP STAIRCASE (STAGES CLIMBING UPWARD) ================= */}
      <div className="hidden lg:block relative pt-12 pb-4">
        {/* Ascending Trajectory Curved Gradient Line */}
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 w-full h-24 overflow-visible"
          viewBox="0 0 1100 100"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="stairLineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#16c7ff" stopOpacity="1" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Stepped Climbing Curve */}
          <path
            d="M 50 80 Q 250 65, 450 45 T 850 20 L 1050 10"
            stroke="url(#stairLineGrad)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            fill="none"
          />
        </svg>

        {/* 5 Ascending Stair Columns */}
        <div className="grid grid-cols-5 gap-3.5 xl:gap-4 items-end">
          {stepsData.map((item, index) => {
            const IconCmp = iconComponents[item.icon] ?? BookOpen;
            const isSummit = index === 4;
            const isActive = activeStep === index;

            // Progressive vertical offset for staircase feel
            // Step 1: translateY(48px), Step 2: translateY(36px), Step 3: translateY(24px), Step 4: translateY(12px), Step 5: translateY(0px)
            const stairOffset = [
              "translate-y-12",
              "translate-y-9",
              "translate-y-6",
              "translate-y-3",
              "translate-y-0",
            ][index];

            return (
              <div
                key={item.step}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                onMouseEnter={() => setActiveStep(index)}
                className={cn(
                  "group relative flex flex-col rounded-2xl border transition-all duration-300 cursor-pointer select-none",
                  stairOffset,
                  isSummit
                    ? "border-sky-400/60 bg-gradient-to-b from-[#0e2547] to-[#09172d] shadow-xl shadow-sky-500/15"
                    : isActive
                      ? "border-sky-400/50 bg-[#0c1f3d] shadow-lg shadow-sky-500/10"
                      : "border-sky-500/20 bg-[#0a182e]/85 backdrop-blur-md hover:border-sky-400/40 hover:bg-[#0c1f3d]/90 shadow-md",
                )}
              >
                {/* Summit Crown Banner on Step 5 */}
                {isSummit && (
                  <div className="absolute -top-4 inset-x-0 mx-auto w-fit z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-600 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-md shadow-sky-400/30">
                    <Trophy className="size-3 text-slate-950" />
                    <span>The Summit</span>
                  </div>
                )}

                {/* Circular Icon Badge Straddling the Top Border */}
                <div className="absolute -top-5 left-5 z-10">
                  <div className="relative flex items-center justify-center">
                    {/* Glowing Halo */}
                    <div
                      className={cn(
                        "absolute -inset-1 rounded-full blur-xs transition-all duration-300",
                        isSummit
                          ? "bg-sky-400/40 group-hover:bg-sky-400/60"
                          : "bg-sky-400/30 group-hover:bg-sky-400/50",
                      )}
                      aria-hidden="true"
                    />
                    {/* Badge */}
                    <span
                      className={cn(
                        "relative grid size-10 place-items-center rounded-full text-white border-2 shadow-md transition-transform duration-300 group-hover:scale-110",
                        isSummit
                          ? "bg-gradient-to-b from-sky-400 via-blue-600 to-blue-800 border-sky-300/80"
                          : "bg-gradient-to-b from-sky-400 via-blue-600 to-blue-800 border-sky-300/40",
                      )}
                    >
                      <IconCmp className="size-4.5 text-white drop-shadow-xs" />
                    </span>
                  </div>
                </div>

                {/* Card Interior */}
                <div className="p-4 pt-7 sm:p-5 sm:pt-8 flex flex-col flex-1">
                  {/* Step Level & Altitude */}
                  <div className="flex items-center justify-between gap-1 text-[10px] font-extrabold uppercase tracking-wider text-sky-400">
                    <span>{item.step}</span>
                    <span className="text-slate-400 font-medium">{item.altitude}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className={cn(
                      "mt-2 text-sm xl:text-base font-bold leading-snug transition-colors",
                      isSummit
                        ? "text-sky-200 group-hover:text-white"
                        : "text-white group-hover:text-sky-300",
                    )}
                  >
                    {item.title}
                  </h3>

                  {/* Body Text */}
                  <p className="mt-2 text-[11px] xl:text-xs leading-relaxed text-slate-300 font-normal line-clamp-4">
                    {item.text}
                  </p>

                  {/* Skill Tag Pills */}
                  <div className="mt-3.5 pt-3 border-t border-sky-500/15 flex flex-wrap gap-1">
                    {item.highlights.map((h) => (
                      <span
                        key={h}
                        className={cn(
                          "rounded-md px-1.5 py-0.5 text-[9px] font-semibold",
                          isSummit
                            ? "bg-sky-500/20 text-sky-200 border border-sky-400/30"
                            : "bg-sky-500/10 text-sky-300 border border-sky-500/20",
                        )}
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Base Step Elevation Footprint Bar */}
                  <div className="mt-3 w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        isSummit
                          ? "bg-gradient-to-r from-cyan-400 to-sky-400"
                          : "bg-gradient-to-r from-blue-500 to-sky-400",
                      )}
                      style={{ width: `${(index + 1) * 20}%` }}
                    />
                  </div>
                </div>

                {/* Right Step Connector Arrow */}
                {!isSummit && (
                  <div
                    className="pointer-events-none absolute -right-3 top-1/2 -translate-y-1/2 hidden xl:flex items-center justify-center z-20"
                    aria-hidden="true"
                  >
                    <span className="grid size-5 place-items-center rounded-full bg-[#081426] border border-sky-400/40 text-sky-400 shadow-xs">
                      <ChevronRight className="size-2.5" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE / TABLET VERTICAL ASCENT LADDER ================= */}
      <div className="block lg:hidden space-y-4 pt-4">
        {stepsData.map((item, index) => {
          const IconCmp = iconComponents[item.icon] ?? BookOpen;
          const isSummit = index === 4;

          return (
            <div
              key={item.step}
              data-reveal
              style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              className={cn(
                "relative flex flex-col rounded-2xl border p-5 pt-8 shadow-md transition-all",
                isSummit
                  ? "border-sky-400/60 bg-gradient-to-b from-[#0e2547] to-[#09172d]"
                  : "border-sky-500/25 bg-[#0a182e]/90",
              )}
            >
              {/* Summit badge on mobile */}
              {isSummit && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-600 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-md shadow-sky-400/30">
                  <Trophy className="size-3 text-slate-950" />
                  <span>The Summit · Career Success</span>
                </div>
              )}

              {/* Circular Icon Badge */}
              <div className="absolute -top-5 left-5 z-10">
                <div className="relative flex items-center justify-center">
                  <div
                    className={cn(
                      "absolute -inset-1 rounded-full blur-xs",
                      isSummit ? "bg-sky-400/40" : "bg-sky-400/30",
                    )}
                  />
                  <span
                    className={cn(
                      "relative grid size-10 place-items-center rounded-full text-white border-2 shadow-md",
                      isSummit
                        ? "bg-gradient-to-b from-sky-400 via-blue-600 to-blue-800 border-sky-300/80"
                        : "bg-gradient-to-b from-sky-400 via-blue-600 to-blue-800 border-sky-300/40",
                    )}
                  >
                    <IconCmp className="size-4.5 text-white" />
                  </span>
                </div>
              </div>

              {/* Step info */}
              <div className="flex items-center justify-between text-xs font-bold text-sky-400 uppercase tracking-wider">
                <span>{item.level}</span>
                <span className="text-slate-400 font-medium">{item.altitude}</span>
              </div>

              <h3 className="mt-1 text-base font-bold text-white">{item.title}</h3>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {item.text}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-md bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 text-[10px] font-semibold text-sky-300"
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Trust strip */}
      <div className="mt-8 pt-5 border-t border-sky-500/15 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-semibold text-slate-400">
        <span className="flex items-center gap-1.5 text-sky-300">
          <CheckCircle2 className="size-3.5 text-emerald-400" /> Continuous Mentor Support
        </span>
        <span className="hidden sm:inline text-slate-600">•</span>
        <span className="flex items-center gap-1.5 text-sky-300">
          <CheckCircle2 className="size-3.5 text-emerald-400" /> Industry Recognized Credentials
        </span>
        <span className="hidden sm:inline text-slate-600">•</span>
        <span className="flex items-center gap-1.5 text-sky-300">
          <CheckCircle2 className="size-3.5 text-emerald-400" /> 100% Practical Application
        </span>
      </div>
    </div>
  );
}

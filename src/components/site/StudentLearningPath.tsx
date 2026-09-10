import { useState, useEffect } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  MessageSquareCheck,
  Rocket,
  Terminal,
  Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils";
import cartoonLearnImg from "@/assets/cartoon-learn.jpg";
import cartoonPracticeImg from "@/assets/cartoon-practice.jpg";
import cartoonBuildImg from "@/assets/cartoon-build.jpg";
import cartoonReviewImg from "@/assets/cartoon-review.jpg";
import cartoonProgressImg from "@/assets/cartoon-progress.jpg";

interface StageData {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  badge: string;
  color: {
    primary: string;
    text: string;
    bgBadge: string;
    gradient: string;
    glow: string;
  };
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  highlights: string[];
  tools: string[];
  outputTitle: string;
  outputBadge: string;
  outputStat: string;
  image: string;
  imageAlt: string;
}

const stages: StageData[] = [
  {
    id: "learn",
    step: "01",
    title: "Learn",
    subtitle: "Core Foundations",
    badge: "Foundation",
    color: {
      primary: "sky",
      text: "text-sky-400",
      bgBadge: "bg-sky-500/10 text-sky-300 border-sky-500/30",
      gradient: "from-sky-400 to-blue-600",
      glow: "from-sky-500/20 via-blue-600/10 to-transparent",
    },
    icon: BookOpen,
    description:
      "Master essential digital principles, search algorithms, and cyber threat frameworks through interactive classroom lectures and foundational case studies.",
    highlights: [
      "Understand core digital architecture & algorithms",
      "Industry frameworks and cheatsheets from day one",
    ],
    tools: ["OSI Model", "Search Algorithms", "Digital Funnels", "Threat Matrix"],
    outputTitle: "Foundation Blueprint",
    outputBadge: "Module 1 Cleared",
    outputStat: "32+ Core Concepts",
    image: cartoonLearnImg,
    imageAlt: "3D cartoon student learning core digital marketing and security principles",
  },
  {
    id: "practice",
    step: "02",
    title: "Practice",
    subtitle: "Hands-on Sandbox",
    badge: "Interactive Labs",
    color: {
      primary: "purple",
      text: "text-purple-400",
      bgBadge: "bg-purple-500/10 text-purple-300 border-purple-500/30",
      gradient: "from-purple-400 to-violet-600",
      glow: "from-purple-500/20 via-violet-600/10 to-transparent",
    },
    icon: Terminal,
    description:
      "Step into guided virtual sandboxes to run packet captures, configure conversion tracking tags, and build authentic practical muscle memory.",
    highlights: [
      "Hands-on terminal drills and live packet capture sessions",
      "Tracking pixel setup and error troubleshooting",
    ],
    tools: ["Wireshark", "Google Tag Manager", "Burp Suite", "Ads Sandbox"],
    outputTitle: "Interactive Lab Terminal",
    outputBadge: "Active Sandbox Session",
    outputStat: "24+ Completed Drills",
    image: cartoonPracticeImg,
    imageAlt: "3D cartoon tech developer running hands-on network packet and ads debugging drills",
  },
  {
    id: "build",
    step: "03",
    title: "Build",
    subtitle: "Real-World Projects",
    badge: "Live Capstones",
    color: {
      primary: "emerald",
      text: "text-emerald-400",
      bgBadge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      gradient: "from-emerald-400 to-teal-600",
      glow: "from-emerald-500/20 via-teal-600/10 to-transparent",
    },
    icon: Rocket,
    description:
      "Apply your skills to real client briefs with actual budgets, live ad campaigns, and enterprise web application penetration tests.",
    highlights: [
      "Resume-ready deliverables you can demonstrate in interviews",
      "Real budget constraints and business problem solving",
    ],
    tools: ["Google Ads", "Kali Linux", "GA4", "Metasploit"],
    outputTitle: "Capstone Deliverable",
    outputBadge: "Portfolio Grade",
    outputStat: "4.8x ROAS / Zero Critical CVEs",
    image: cartoonBuildImg,
    imageAlt: "3D cartoon tech innovator with 4.8x ROAS growth chart and cyber security shield",
  },
  {
    id: "review",
    step: "04",
    title: "Review",
    subtitle: "Mentor Audits",
    badge: "1-on-1 Feedback",
    color: {
      primary: "amber",
      text: "text-amber-400",
      bgBadge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      gradient: "from-amber-400 to-orange-500",
      glow: "from-amber-500/20 via-orange-600/10 to-transparent",
    },
    icon: MessageSquareCheck,
    description:
      "Receive direct 1-on-1 code critiques and campaign optimizations from seasoned industry practitioners to eliminate rookie mistakes.",
    highlights: [
      "Direct critique to eliminate rookie mistakes",
      "Personalized feedback tailored to your career goals",
    ],
    tools: ["Looker Studio", "Git Pull Requests", "Audit Rubrics"],
    outputTitle: "Mentor Audit Report",
    outputBadge: "1-on-1 Review Cleared",
    outputStat: "Score: 96/100 Approved",
    image: cartoonReviewImg,
    imageAlt: "3D cartoon tech mentor performing code and campaign compliance inspection with 96 score",
  },
  {
    id: "progress",
    step: "05",
    title: "Progress",
    subtitle: "Placement Ready",
    badge: "Career Summit",
    color: {
      primary: "rose",
      text: "text-rose-400",
      bgBadge: "bg-rose-500/10 text-rose-300 border-rose-500/30",
      gradient: "from-rose-400 to-pink-600",
      glow: "from-rose-500/20 via-pink-600/10 to-transparent",
    },
    icon: Award,
    description:
      "Graduate career-ready with accredited credentials, verified portfolios, technical interview prep, and direct hiring partner referrals.",
    highlights: [
      "Accredited credential ID for LinkedIn & resume",
      "Technical mock interviews with career referral access",
    ],
    tools: ["Portfolio Review", "Mock Interviews", "ATS Resume"],
    outputTitle: "Verified Credential Profile",
    outputBadge: "100% Placement Ready",
    outputStat: "95% Placement Rate",
    image: cartoonProgressImg,
    imageAlt: "3D cartoon graduate celebrating career placement with accredited certificate",
  },
];

export function StudentLearningPath({ className }: { className?: string }) {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [cycleKey, setCycleKey] = useState<number>(0);

  const selectStage = (idx: number) => {
    setActiveStageIndex(idx);
    setCycleKey((k) => k + 1);
  };

  // Automatically select one stage after the other sequentially without freezing
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveStageIndex((prev) => (prev + 1) % stages.length);
      setCycleKey((k) => k + 1);
    }, 4500);

    return () => clearTimeout(timer);
  }, [activeStageIndex, cycleKey]);

  // Synchronize timer and animation when switching back to the tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setCycleKey((k) => k + 1);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const currentStage = stages[activeStageIndex] ?? stages[0]!;
  const CurrentIcon = currentStage.icon;

  return (
    <div className={cn("relative w-full max-w-full overflow-hidden select-none", className)}>
      {/* ========================================================================= */}
      {/* 1. COMPACT STEPPER RAIL (Auto-advances sequentially)                      */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-5 gap-1 sm:gap-2 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-[#07152b]/90 border border-sky-500/20 backdrop-blur-md shadow-lg">
        {stages.map((stg, idx) => {
          const isActive = idx === activeStageIndex;
          const StepIcon = stg.icon;

          return (
            <button
              key={stg.id}
              type="button"
              onClick={() => selectStage(idx)}
              className={cn(
                "group relative flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2.5 rounded-lg sm:rounded-xl px-0.5 sm:px-3 py-1 sm:py-2.5 text-center sm:text-left transition-all duration-200 cursor-pointer focus:outline-none min-w-0",
                isActive
                  ? "bg-[#0f2347] border border-sky-400/60 shadow-md shadow-sky-500/10"
                  : "bg-transparent border border-transparent hover:bg-[#0b1c38]",
              )}
            >
              {/* Step indicator */}
              <div
                className={cn(
                  "grid size-6.5 sm:size-9 shrink-0 place-items-center rounded-md sm:rounded-lg text-white font-bold text-xs transition-transform duration-200",
                  isActive
                    ? `bg-gradient-to-br ${stg.color.gradient} shadow-sm scale-105`
                    : "bg-[#0b1d38] border border-slate-700 text-slate-400",
                )}
              >
                <StepIcon className="size-3.5 sm:size-4" />
              </div>

              {/* Title & Subtitle */}
              <div className="min-w-0 w-full sm:w-auto sm:flex-1">
                <span
                  className={cn(
                    "text-[9px] font-black uppercase tracking-wider hidden sm:block leading-none",
                    isActive ? stg.color.text : "text-slate-400",
                  )}
                >
                  Stage {stg.step}
                </span>
                <p
                  className={cn(
                    "text-[8.5px] xs:text-[9.5px] sm:text-[13px] font-bold tracking-tight leading-tight sm:leading-snug mt-0 sm:mt-0.5 whitespace-nowrap",
                    isActive ? "text-white" : "text-slate-300 group-hover:text-white",
                  )}
                >
                  {stg.title}
                </p>
              </div>

              {/* Active Indicator Bar with Smooth Linear Progress Fill */}
              {isActive && (
                <div
                  className="absolute -top-0.5 sm:-top-1 left-1 right-1 sm:left-2 sm:right-2 h-0.5 rounded-full overflow-hidden bg-slate-800"
                  aria-hidden="true"
                >
                  <div
                    key={`progress-${activeStageIndex}-${cycleKey}`}
                    className={cn(
                      "h-full rounded-full bg-gradient-to-r",
                      stg.color.gradient,
                    )}
                    style={{
                      animation: "learning-stage-fill 4500ms linear forwards",
                    }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 2. STAGE SHOWCASE: EQUAL HEIGHT & SAME SIZE WITH COMPACT 3D CARTOON ART   */}
      {/* ========================================================================= */}
      <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl border border-sky-500/20 bg-[#091830]/95 backdrop-blur-xl shadow-xl p-2 sm:p-5 relative overflow-hidden w-full max-w-full min-w-0">
        {/* Ambient background glow */}
        <div
          className={cn(
            "pointer-events-none absolute -right-16 -top-16 size-60 rounded-full blur-3xl opacity-30 transition-all duration-500",
            `bg-gradient-to-br ${currentStage.color.glow}`,
          )}
          aria-hidden="true"
        />

        {/* 2-Column Balanced Grid with matching equal heights */}
        <div className="grid lg:grid-cols-2 gap-3.5 sm:gap-5 items-stretch relative z-10 w-full min-w-0 max-w-full">
          {/* ------------------------------------------------------------- */}
          {/* LEFT CARD: Stage Info, 2 Highlights, Tools & Controls         */}
          {/* ------------------------------------------------------------- */}
          <div className="flex flex-col justify-between h-full rounded-xl sm:rounded-2xl border border-sky-400/20 bg-[#061122]/70 p-2.5 sm:p-5 shadow-lg w-full min-w-0 max-w-full overflow-hidden">
            <div className="space-y-2 sm:space-y-3 min-w-0 w-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide">
                <CurrentIcon className="size-3 shrink-0" />
                <span className={currentStage.color.text}>{currentStage.badge}</span>
              </div>

              {/* Stage Title */}
              <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight leading-snug">
                {currentStage.title}:{" "}
                <span className={currentStage.color.text}>{currentStage.subtitle}</span>
              </h3>

              {/* Short, punchy description */}
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
                {currentStage.description}
              </p>

              {/* 2 Clean Highlights */}
              <div className="space-y-1.5 pt-0.5">
                {currentStage.highlights.map((item) => (
                  <div key={item} className="flex items-start sm:items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>

              {/* Clean Tool Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 mr-1">Tools:</span>
                {currentStage.tools.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded-md bg-[#0e2547] border border-sky-400/20 px-1.5 sm:px-2 py-0.5 text-[9.5px] sm:text-[11px] font-medium text-sky-200"
                  >
                    <Wrench className="size-2 sm:size-2.5 text-sky-400 shrink-0" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>

              {/* Practical Milestone Card (Responsive, never truncates on mobile) */}
              <div className="rounded-lg bg-gradient-to-r from-sky-950/60 to-[#081b36] border border-sky-400/25 p-2 sm:p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1.5 sm:gap-2 shadow-2xs mt-1 w-full min-w-0">
                <div className="flex items-center gap-2 min-w-0 w-full sm:w-auto flex-1">
                  <div className="size-6 sm:size-7 rounded-md bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0">
                    <Award className="size-3 sm:size-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[8px] sm:text-[9.5px] uppercase font-bold text-slate-400 block tracking-wide leading-none">
                      Key Milestone
                    </span>
                    <span className="text-xs sm:text-[12.5px] font-bold text-white block mt-0.5 leading-tight truncate sm:whitespace-normal">
                      {currentStage.outputTitle}
                    </span>
                  </div>
                </div>
                <span className="self-start sm:self-auto text-[9.5px] sm:text-[11px] font-bold text-emerald-300 bg-emerald-500/15 px-1.5 sm:px-2 py-0.5 rounded border border-emerald-500/30 shrink-0">
                  {currentStage.outputStat}
                </span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-3 pt-2.5 sm:pt-3 flex items-center justify-between gap-1.5 sm:gap-3 border-t border-slate-800 w-full min-w-0">
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                {stages.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectStage(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-200 cursor-pointer",
                      i === activeStageIndex
                        ? `w-3.5 sm:w-5 bg-gradient-to-r ${s.color.gradient}`
                        : "w-1 sm:w-1.5 bg-slate-700 hover:bg-slate-600",
                    )}
                    aria-label={`Go to stage ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => selectStage((activeStageIndex - 1 + stages.length) % stages.length)}
                  className="px-2 sm:px-2.5 py-1 rounded-lg border border-slate-700 text-[10px] sm:text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => selectStage((activeStageIndex + 1) % stages.length)}
                  className="px-2 sm:px-3 py-1 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-[10px] sm:text-xs font-bold transition-colors inline-flex items-center gap-0.5 sm:gap-1 cursor-pointer shrink-0"
                >
                  <span>Next</span>
                  <ChevronRight className="size-3" />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT CARD: EQUAL HEIGHT & SAME SIZE WITH COMPACT CARTOON ART */}
          {/* ------------------------------------------------------------- */}
          <div className="flex flex-col h-full w-full min-w-0 max-w-full overflow-hidden">
            <div className="group relative rounded-xl sm:rounded-2xl border border-sky-400/25 bg-[#061122]/95 p-2.5 sm:p-4 shadow-2xl overflow-hidden transition-all hover:border-sky-400/40 flex flex-col justify-between h-full w-full min-w-0 max-w-full">
              {/* Top Window Bar (Mac dots & Deliverable Badge) */}
              <div className="flex items-center justify-between gap-1 pb-2 sm:pb-2.5 border-b border-slate-800/80 shrink-0 w-full min-w-0">
                <div className="flex items-center gap-1 sm:gap-1.5 min-w-0 flex-1">
                  <span className="size-1.5 sm:size-2 rounded-full bg-rose-500/90 inline-block shrink-0" />
                  <span className="size-1.5 sm:size-2 rounded-full bg-amber-500/90 inline-block shrink-0" />
                  <span className="size-1.5 sm:size-2 rounded-full bg-emerald-500/90 inline-block shrink-0" />
                  <span className="text-[9px] sm:text-xs font-mono text-slate-300 font-semibold ml-0.5 truncate">
                    {currentStage.outputTitle}
                  </span>
                </div>
                <span className="text-[7.5px] sm:text-[9.5px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full bg-slate-800/90 border border-slate-700 text-sky-300 shadow-2xs shrink-0 max-w-[100px] sm:max-w-none truncate">
                  {currentStage.outputBadge}
                </span>
              </div>

              {/* COMPACT FULL-VIEW 3D CARTOON IMAGE (Controlled Height & Ambient Fill) */}
              <div className="relative w-full h-[190px] xs:h-[220px] sm:h-[240px] md:h-[260px] my-2 sm:my-2.5 rounded-xl sm:rounded-2xl overflow-hidden border border-sky-400/30 bg-[#030914] shadow-md flex items-center justify-center">
                {/* Ambient Blurred Background (Fills complete height and width, eliminates black side gaps) */}
                <img
                  key={`blur-${currentStage.image}`}
                  src={currentStage.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
                />
                {/* Subtle vignette layer */}
                <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />

                {/* Main Sharp Illustration - 100% Complete & Uncropped at Top and Bottom */}
                <img
                  key={currentStage.image}
                  src={currentStage.image}
                  alt={currentStage.imageAlt}
                  className="relative z-10 w-full h-full object-contain object-center drop-shadow-md transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="lazy"
                />

                {/* Live Stage Deliverable Badge */}
                <div className="absolute bottom-2 right-2 z-20 inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-slate-950/90 border border-white/20 backdrop-blur-md text-[7.5px] sm:text-[10px] font-bold text-white shadow-md pointer-events-none max-w-[calc(100%-1rem)]">
                  <span className="relative flex size-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="truncate">Stage {currentStage.step} • {currentStage.outputTitle}</span>
                </div>
              </div>

              {/* Stat Highlight Banner */}
              <div className="shrink-0 py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg bg-gradient-to-r from-[#091b36] to-[#0c2347] border border-sky-500/20 flex items-center justify-between gap-1.5 shadow-2xs w-full min-w-0">
                <span className="text-[9.5px] sm:text-[11px] text-slate-400 font-medium shrink-0">Outcome:</span>
                <span className="text-[10px] sm:text-[13px] font-bold text-white tracking-wide truncate text-right flex-1 min-w-0">
                  {currentStage.outputStat}
                </span>
              </div>

              {/* Notice: Terminal snippet box card is deleted as requested */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

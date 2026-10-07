import { useState, useEffect } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  MessageSquareCheck,
  PlayCircle,
  Rocket,
  Sparkles,
  Terminal,
  Wrench,
} from "lucide-react";

import { cn } from "@/lib/utils";
import stageLearnImg from "@/assets/stage-learn-blueprint.jpg";
import stagePracticeImg from "@/assets/stage-practice-sandbox.jpg";
import stageBuildImg from "@/assets/stage-capstone-deliverable.jpg";
import stageReviewImg from "@/assets/stage-review-audit.jpg";
import stageProgressImg from "@/assets/stage-progress-credential.jpg";

interface StageCompetency {
  title: string;
  desc: string;
}

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
  competencies: StageCompetency[];
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
    competencies: [
      {
        title: "Digital Architecture & Funnels",
        desc: "End-to-end customer journey mapping, acquisition loops, and conversion funnel architecture.",
      },
      {
        title: "Threat Modeling & OSI Security",
        desc: "7-layer enterprise network fundamentals, threat surface analysis, and MITRE ATT&CK framework.",
      },
      {
        title: "Search Algorithms & Indexing",
        desc: "Core ranking algorithms, crawler behavior, semantic search engines, and technical SEO structure.",
      },
    ],
    tools: ["OSI Model", "Search Algorithms", "Digital Funnels", "Threat Matrix", "GA4 Schema"],
    outputTitle: "Foundation Blueprint",
    outputBadge: "Module 1 Cleared",
    outputStat: "32+ Core Concepts",
    image: stageLearnImg,
    imageAlt: "Students learning core digital marketing and cybersecurity principles in a modern training room",
  },
  {
    id: "action",
    step: "02",
    title: "See It In Action",
    subtitle: "Real-World Scenarios",
    badge: "Live Demonstrations",
    color: {
      primary: "blue",
      text: "text-cyan-400",
      bgBadge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      gradient: "from-cyan-400 to-blue-600",
      glow: "from-cyan-500/20 via-blue-600/10 to-transparent",
    },
    icon: PlayCircle,
    description:
      "Watch how the concept is applied in a real-world scenario.",
    highlights: [
      "Live walkthroughs of authentic industry scenarios & live environments",
      "Observe expert decision-making, configuration, and troubleshooting",
    ],
    competencies: [
      {
        title: "Live Scenario Demonstrations",
        desc: "Observe how seasoned mentors configure campaigns, inspect live network traffic, and diagnose real-world issues.",
      },
      {
        title: "Real-World Problem Solving",
        desc: "Watch practical problem-solving in action across ad platforms, tag architecture, and defensive monitors.",
      },
      {
        title: "Industry Workflow Teardowns",
        desc: "Break down real production briefs and technical workflows before executing your own capstone projects.",
      },
    ],
    tools: ["Live Demos", "DV360", "Google Tag Manager", "Wireshark", "Burp Suite"],
    outputTitle: "Live Scenario Walkthrough",
    outputBadge: "Real-World Demo Cleared",
    outputStat: "18+ Scenario Teardowns",
    image: stagePracticeImg,
    imageAlt: "Watch how concepts are applied in real-world scenarios with live mentor walkthroughs",
  },
  {
    id: "build",
    step: "03",
    title: "Build",
    subtitle: "Real-World Projects",
    badge: "Live Capstones",
    color: {
      primary: "sky",
      text: "text-sky-400",
      bgBadge: "bg-sky-500/10 text-sky-300 border-sky-500/30",
      gradient: "from-sky-400 to-indigo-600",
      glow: "from-sky-500/20 via-indigo-600/10 to-transparent",
    },
    icon: Rocket,
    description:
      "Apply your skills to real client briefs with actual budgets, live ad campaigns, and enterprise web application penetration tests.",
    highlights: [
      "Resume-ready deliverables you can demonstrate in interviews",
      "Real budget constraints and business problem solving",
    ],
    competencies: [
      {
        title: "Live Campaign Execution (4.8x ROAS)",
        desc: "Real budget deployment across DV360 & Google Ads with multi-touch conversion attribution.",
      },
      {
        title: "Enterprise Web Penetration Testing",
        desc: "OWASP Top 10 web app vulnerability discovery, proof-of-concept exploits, and CVE patching.",
      },
      {
        title: "Automated Growth & Security Dashboards",
        desc: "Custom Looker Studio attribution reporting and live security posture monitoring boards.",
      },
    ],
    tools: ["Google Ads", "Kali Linux", "GA4", "Metasploit", "Looker Studio"],
    outputTitle: "Capstone Deliverable",
    outputBadge: "Portfolio Grade",
    outputStat: "4.8x ROAS / Zero Critical CVEs",
    image: stageBuildImg,
    imageAlt: "Tech professional presenting digital marketing capstone growth metrics and cyber defense results in a conference room",
  },
  {
    id: "review",
    step: "04",
    title: "Review",
    subtitle: "Mentor Audits",
    badge: "1-on-1 Feedback",
    color: {
      primary: "blue",
      text: "text-blue-400",
      bgBadge: "bg-blue-500/10 text-blue-300 border-blue-500/30",
      gradient: "from-blue-400 to-cyan-500",
      glow: "from-blue-500/20 via-cyan-500/10 to-transparent",
    },
    icon: MessageSquareCheck,
    description:
      "Receive direct 1-on-1 code critiques and campaign optimizations from seasoned industry practitioners to eliminate rookie mistakes.",
    highlights: [
      "Direct critique to eliminate rookie mistakes",
      "Personalized feedback tailored to your career goals",
    ],
    competencies: [
      {
        title: "1-on-1 Architecture & Campaign Audits",
        desc: "Detailed line-by-line configuration critiques and budget waste elimination with senior leads.",
      },
      {
        title: "Production Rubric Benchmarking",
        desc: "Assessing performance, security headers, and tag latency against enterprise standards.",
      },
      {
        title: "Personalized Action Roadmap",
        desc: "Direct remediation checklist to refine capstone deliverables before hiring partner submissions.",
      },
    ],
    tools: ["Looker Studio", "Git Pull Requests", "Audit Rubrics", "Lighthouse", "OWASP ZAP"],
    outputTitle: "Mentor Audit Report",
    outputBadge: "1-on-1 Review Cleared",
    outputStat: "Score: 96/100 Approved",
    image: stageReviewImg,
    imageAlt: "Senior industry mentor reviewing campaign performance dashboards and code audit reports 1-on-1 with a student",
  },
  {
    id: "progress",
    step: "05",
    title: "Progress",
    subtitle: "Placement Ready",
    badge: "Career Summit",
    color: {
      primary: "cyan",
      text: "text-cyan-400",
      bgBadge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
      gradient: "from-cyan-400 to-sky-600",
      glow: "from-cyan-500/20 via-sky-600/10 to-transparent",
    },
    icon: Award,
    description:
      "Graduate career-ready with verified capstone portfolios, course credentials, technical interview prep, and comprehensive placement support.",
    highlights: [
      "Course completion credential for LinkedIn & resume",
      "Technical mock interviews with career mentorship access",
    ],
    competencies: [
      {
        title: "Technical Mock Interview Prep",
        desc: "Live problem-solving drills, campaign teardowns, and security whiteboard scenarios.",
      },
      {
        title: "ATS-Optimized Resume & Portfolio",
        desc: "Verified GitHub & live project repos tailored to match high-demand hiring requirements.",
      },
      {
        title: "Direct Hiring Partner Referrals",
        desc: "Exclusive access to hiring pipelines across top agencies, tech companies, and security firms.",
      },
    ],
    tools: ["Portfolio Review", "Mock Interviews", "ATS Resume", "LinkedIn Brand", "Hiring Network"],
    outputTitle: "Verified Credential Profile",
    outputBadge: "Career Ready",
    outputStat: "Career Ready & Certified",
    image: stageProgressImg,
    imageAlt: "Graduate professional celebrating placement readiness with course credentials in a corporate office",
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
      <div className="grid grid-cols-5 sm:grid-cols-[1fr_1.35fr_1fr_1fr_1.05fr] gap-1 sm:gap-1.5 md:gap-2 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl bg-slate-100 border border-slate-200 shadow-xs">
        {stages.map((stg, idx) => {
          const isActive = idx === activeStageIndex;
          const StepIcon = stg.icon;

          return (
            <button
              key={stg.id}
              type="button"
              onClick={() => selectStage(idx)}
              className={cn(
                "group relative flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-1.5 md:gap-2 rounded-lg sm:rounded-xl px-0.5 sm:px-2 md:px-2.5 lg:px-3 py-1 sm:py-2.5 text-center sm:text-left transition-all duration-200 cursor-pointer focus:outline-none min-w-0",
                isActive
                  ? "bg-white border border-slate-200 shadow-sm"
                  : "bg-transparent border border-transparent hover:bg-slate-200/50",
              )}
            >
              {/* Step indicator */}
              <div
                className={cn(
                  "grid size-6.5 sm:size-7.5 md:size-8 lg:size-9 shrink-0 place-items-center rounded-md sm:rounded-lg text-white font-bold text-xs transition-transform duration-200",
                  isActive
                    ? `bg-gradient-to-br ${stg.color.gradient} shadow-sm scale-105`
                    : "bg-white border border-slate-300 text-slate-500",
                )}
              >
                <StepIcon className="size-3.5 sm:size-4" />
              </div>

              {/* Title & Subtitle */}
              <div className="min-w-0 w-full sm:w-auto sm:flex-1">
                <span
                  className={cn(
                    "text-[9px] font-black uppercase tracking-wider hidden sm:block leading-none",
                    isActive ? "text-blue-700" : "text-slate-500",
                  )}
                >
                  Stage {stg.step}
                </span>
                <p
                  className={cn(
                    "text-[8px] xs:text-[9px] sm:text-[11px] md:text-[12px] lg:text-[13px] font-bold tracking-tight leading-tight sm:leading-snug mt-0 sm:mt-0.5 [text-wrap:balance]",
                    stg.id === "action"
                      ? "sm:whitespace-normal md:whitespace-nowrap"
                      : "sm:whitespace-nowrap",
                    isActive ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900",
                  )}
                >
                  {stg.title}
                </p>
              </div>

              {/* Active Indicator Bar with Smooth Linear Progress Fill */}
              {isActive && (
                <div
                  className="absolute -top-0.5 sm:-top-1 left-1 right-1 sm:left-2 sm:right-2 h-0.5 rounded-full overflow-hidden bg-slate-200"
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
      {/* 2. STAGE SHOWCASE: COMPACT & BALANCED WITH REALISTIC STAGE PHOTO          */}
      {/* ========================================================================= */}
      <div className="mt-2.5 sm:mt-3 rounded-xl border border-slate-200 bg-white shadow-2xs p-2.5 sm:p-3.5 relative overflow-hidden w-full max-w-full min-w-0">
        {/* 2-Column Balanced Grid with matching equal heights */}
        <div className="grid lg:grid-cols-12 gap-3 sm:gap-4 items-stretch relative z-10 w-full min-w-0 max-w-full">
          {/* ------------------------------------------------------------- */}
          {/* LEFT CARD: Stage Info, Highlights, Tools & Focus Areas (7 cols) */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full rounded-xl border border-slate-200 bg-slate-50/60 p-3 sm:p-4 shadow-2xs w-full min-w-0 max-w-full overflow-hidden">
            <div className="space-y-2 min-w-0 w-full">
              {/* Top Row: Badge & Stage Title */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wide">
                  <CurrentIcon className="size-2.5 shrink-0 text-blue-600" />
                  <span className="text-blue-700">{currentStage.badge}</span>
                </div>
                <span className="text-[10.5px] font-mono font-bold text-slate-400">
                  Stage {currentStage.step} of 05
                </span>
              </div>

              {/* Stage Title */}
              <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                {currentStage.title}:{" "}
                <span className="text-blue-600">{currentStage.subtitle}</span>
              </h3>

              {/* Short description */}
              <p className="text-[11.5px] sm:text-xs text-slate-600 leading-relaxed font-normal">
                {currentStage.description}
              </p>

              {/* 2 Clean Highlights */}
              <div className="space-y-1 pt-0.5">
                {currentStage.highlights.map((item) => (
                  <div key={item} className="flex items-start sm:items-center gap-1.5 text-[11px] sm:text-xs text-slate-700">
                    <CheckCircle2 className="size-3 text-emerald-600 shrink-0 mt-0.5 sm:mt-0" />
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>

              {/* Clean Tool Chips */}
              <div className="flex flex-wrap items-center gap-1 pt-0.5">
                <span className="text-[9.5px] sm:text-[10px] font-semibold text-slate-400 mr-0.5">Tools:</span>
                {currentStage.tools.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium text-slate-800 shadow-2xs"
                  >
                    <Wrench className="size-2 text-blue-600 shrink-0" />
                    <span>{t}</span>
                  </span>
                ))}
              </div>

              {/* Core Execution Focus Areas (Compact horizontal items) */}
              <div className="pt-1 space-y-1">
                <span className="text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider text-slate-500 block">
                  Core Execution Capabilities:
                </span>
                <div className="grid sm:grid-cols-3 gap-1">
                  {currentStage.competencies.map((comp) => (
                    <div
                      key={comp.title}
                      className="flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2 py-1.5 shadow-2xs"
                    >
                      <Sparkles className="size-2.5 text-blue-600 shrink-0" />
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 truncate">
                        {comp.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Milestone Card (Compact 1-line strip) */}
              <div className="rounded-lg bg-blue-50/70 border border-blue-200 px-2.5 py-1.5 flex items-center justify-between gap-2 shadow-2xs mt-1 w-full min-w-0">
                <div className="flex items-center gap-1.5 min-w-0 flex-1">
                  <div className="size-5 rounded bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
                    <Award className="size-2.5" />
                  </div>
                  <span className="text-[10.5px] font-bold text-slate-900 truncate">
                    {currentStage.outputTitle}
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                  {currentStage.outputStat}
                </span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="mt-2.5 pt-2 flex items-center justify-between gap-2 border-t border-slate-200 w-full min-w-0">
              <div className="flex items-center gap-1 shrink-0">
                {stages.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectStage(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-200 cursor-pointer",
                      i === activeStageIndex
                        ? `w-4 bg-gradient-to-r ${s.color.gradient}`
                        : "w-1.5 bg-slate-300 hover:bg-slate-400",
                    )}
                    aria-label={`Go to stage ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => selectStage((activeStageIndex - 1 + stages.length) % stages.length)}
                  className="px-2 py-0.5 rounded-md border border-slate-300 text-[10px] font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                >
                  ← Prev
                </button>
                <button
                  type="button"
                  onClick={() => selectStage((activeStageIndex + 1) % stages.length)}
                  className="px-2.5 py-0.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold transition-colors inline-flex items-center gap-0.5 cursor-pointer shrink-0 shadow-2xs"
                >
                  <span>Next</span>
                  <ChevronRight className="size-2.5" />
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT CARD: COMPACT WINDOW & REALISTIC STAGE PHOTO (5 cols)    */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col h-full w-full min-w-0 max-w-full overflow-hidden">
            <div className="group relative rounded-xl border border-slate-200 bg-white p-2 sm:p-2.5 shadow-2xs overflow-hidden transition-all hover:border-blue-400 flex flex-col justify-between h-full w-full min-w-0 max-w-full">
              {/* Top Window Bar (Mac dots & Deliverable Badge) */}
              <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-slate-100 shrink-0 w-full min-w-0">
                <div className="flex items-center gap-1 min-w-0 flex-1">
                  <span className="size-1.5 rounded-full bg-rose-500/90 inline-block shrink-0" />
                  <span className="size-1.5 rounded-full bg-amber-500/90 inline-block shrink-0" />
                  <span className="size-1.5 rounded-full bg-emerald-500/90 inline-block shrink-0" />
                  <span className="text-[9px] sm:text-[10px] font-mono text-slate-600 font-semibold ml-0.5 truncate">
                    {currentStage.outputTitle}
                  </span>
                </div>
                <span className="text-[7.5px] sm:text-[8.5px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 shadow-2xs shrink-0 truncate">
                  {currentStage.outputBadge}
                </span>
              </div>

              {/* Realistic Stage Image */}
              <div className="relative w-full flex-1 min-h-[160px] xs:min-h-[180px] sm:min-h-[195px] my-1.5 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs">
                <img
                  key={currentStage.image}
                  src={currentStage.image}
                  alt={currentStage.imageAlt}
                  className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Subtle bottom gradient to ensure overlay badge is always readable */}
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Live Stage Deliverable Badge */}
                <div className="absolute bottom-2 right-2 z-20 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-950/85 border border-white/20 backdrop-blur-md text-[8px] sm:text-[9.5px] font-bold text-white shadow-md pointer-events-none max-w-[calc(100%-1rem)]">
                  <span className="relative flex size-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="truncate">Stage {currentStage.step} • {currentStage.outputTitle}</span>
                </div>
              </div>

              {/* Stat Highlight Banner */}
              <div className="shrink-0 py-1 px-2 rounded bg-slate-50 border border-slate-200 flex items-center justify-between gap-1 shadow-2xs w-full min-w-0">
                <span className="text-[9px] text-slate-500 font-medium shrink-0">Outcome:</span>
                <span className="text-[9.5px] sm:text-[11px] font-bold text-slate-900 tracking-wide truncate text-right flex-1 min-w-0">
                  {currentStage.outputStat}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

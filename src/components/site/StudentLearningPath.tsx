import { useState, useEffect } from "react";
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  MessageSquareCheck,
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
    competencies: [
      {
        title: "Live Packet Inspection",
        desc: "Wireshark packet capture analysis, protocol dissection, and suspicious traffic isolation.",
      },
      {
        title: "Tag Engineering & Pixels",
        desc: "Google Tag Manager container setup, custom DOM listeners, and server-side tracking.",
      },
      {
        title: "Sandbox Exploitation & Scans",
        desc: "Burp Suite proxy interception, automated vulnerability crawling, and parameter fuzzing.",
      },
    ],
    tools: ["Wireshark", "Google Tag Manager", "Burp Suite", "Ads Sandbox", "Nmap"],
    outputTitle: "Interactive Lab Terminal",
    outputBadge: "Active Sandbox Session",
    outputStat: "24+ Completed Drills",
    image: stagePracticeImg,
    imageAlt: "Professional running hands-on packet analysis and conversion tag debugging drills in a tech lab",
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
      primary: "rose",
      text: "text-rose-400",
      bgBadge: "bg-rose-500/10 text-rose-300 border-rose-500/30",
      gradient: "from-rose-400 to-pink-600",
      glow: "from-rose-500/20 via-pink-600/10 to-transparent",
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
      {/* 2. STAGE SHOWCASE: EQUAL HEIGHT & SAME SIZE WITH REALISTIC STAGE PHOTO    */}
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

              {/* Core Execution Capabilities (Fills empty vertical area cleanly) */}
              <div className="pt-1 sm:pt-1.5 space-y-1.5">
                <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-wider text-slate-400 block">
                  Core Execution Capabilities:
                </span>
                <div className="grid gap-1 sm:gap-1.5">
                  {currentStage.competencies.map((comp) => (
                    <div
                      key={comp.title}
                      className="group/item flex items-start gap-2 sm:gap-2.5 rounded-lg bg-[#0a1b35]/85 border border-sky-500/20 p-2 sm:p-2.5 transition-all hover:border-sky-400/50 hover:bg-[#0e2447]"
                    >
                      <div className="mt-0.5 size-4 rounded-md bg-sky-500/15 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
                        <Sparkles className="size-2.5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] sm:text-xs font-bold text-white leading-snug">
                          {comp.title}
                        </p>
                        <p className="text-[10px] sm:text-[11.5px] text-slate-300 leading-normal mt-0.5 font-normal">
                          {comp.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
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
          {/* RIGHT CARD: EQUAL HEIGHT & SAME SIZE WITH REALISTIC STAGE PHOTO */}
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

              {/* Realistic Stage Image (Fills border area cleanly edge-to-edge) */}
              <div className="relative w-full flex-1 min-h-[220px] xs:min-h-[250px] sm:min-h-[270px] md:min-h-[290px] my-2 sm:my-2.5 rounded-xl sm:rounded-2xl overflow-hidden border border-sky-400/30 bg-[#030914] shadow-md">
                {/* Full-bleed realistic photography filling the entire bordered frame */}
                <img
                  key={currentStage.image}
                  src={currentStage.image}
                  alt={currentStage.imageAlt}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />

                {/* Subtle bottom gradient to ensure overlay badge is always readable */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

                {/* Live Stage Deliverable Badge */}
                <div className="absolute bottom-2.5 right-2.5 z-20 inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1 rounded-lg bg-slate-950/85 border border-white/20 backdrop-blur-md text-[8px] sm:text-[10.5px] font-bold text-white shadow-lg pointer-events-none max-w-[calc(100%-1.25rem)]">
                  <span className="relative flex size-1.5 sm:size-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-1.5 sm:size-2 rounded-full bg-emerald-500" />
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

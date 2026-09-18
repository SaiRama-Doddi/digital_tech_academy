import { useState } from "react";
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  Gamepad2,
  GraduationCap,
  Layers,
  PlayCircle,
  Rocket,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface LearningStepItem {
  step: string;
  title: string;
  description: string;
  tagline: string;
  colorName: string;
  theme: {
    text: string;
    bgBadge: string;
    divider: string;
    nodeGradient: string;
    nodeGlow: string;
    borderHover: string;
    shadowHover: string;
    orbFill: string;
  };
  icon: React.ComponentType<{ className?: string }>;
}

const learningSteps: LearningStepItem[] = [
  {
    step: "01",
    title: "Learn",
    description:
      "Understand the principles, terminology, frameworks, and tools behind each subject.",
    tagline: "Build a strong foundation",
    colorName: "blue",
    theme: {
      text: "text-blue-600",
      bgBadge: "bg-blue-50 text-blue-700 border-blue-200",
      divider: "bg-blue-600",
      nodeGradient: "from-blue-500 via-blue-600 to-indigo-700",
      nodeGlow: "rgba(37, 99, 235, 0.45)",
      borderHover: "hover:border-blue-400/80",
      shadowHover: "hover:shadow-blue-500/15",
      orbFill: "#2563eb",
    },
    icon: BookOpen,
  },
  {
    step: "02",
    title: "See It In Action",
    description:
      "Watch how the concept is applied in a real-world scenario.",
    tagline: "Watch real-world application",
    colorName: "purple",
    theme: {
      text: "text-purple-600",
      bgBadge: "bg-purple-50 text-purple-700 border-purple-200",
      divider: "bg-purple-600",
      nodeGradient: "from-purple-500 via-purple-600 to-violet-800",
      nodeGlow: "rgba(147, 51, 234, 0.45)",
      borderHover: "hover:border-purple-400/80",
      shadowHover: "hover:shadow-purple-500/15",
      orbFill: "#7c3aed",
    },
    icon: PlayCircle,
  },
  {
    step: "03",
    title: "Build",
    description:
      "Apply your learning to projects, campaigns, case studies, and realistic scenarios.",
    tagline: "Create real-world experience",
    colorName: "emerald",
    theme: {
      text: "text-emerald-600",
      bgBadge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      divider: "bg-emerald-600",
      nodeGradient: "from-emerald-400 via-emerald-500 to-teal-700",
      nodeGlow: "rgba(16, 185, 129, 0.45)",
      borderHover: "hover:border-emerald-400/80",
      shadowHover: "hover:shadow-emerald-500/15",
      orbFill: "#059669",
    },
    icon: Layers,
  },
  {
    step: "04",
    title: "Review",
    description:
      "Identify gaps, improve your work, and learn how professionals evaluate results.",
    tagline: "Get expert feedback",
    colorName: "amber",
    theme: {
      text: "text-amber-600",
      bgBadge: "bg-amber-50 text-amber-800 border-amber-200",
      divider: "bg-amber-500",
      nodeGradient: "from-amber-400 via-amber-500 to-orange-600",
      nodeGlow: "rgba(245, 158, 11, 0.45)",
      borderHover: "hover:border-amber-400/80",
      shadowHover: "hover:shadow-amber-500/15",
      orbFill: "#d97706",
    },
    icon: BarChart3,
  },
  {
    step: "05",
    title: "Progress",
    description:
      "Build a stronger portfolio of skills and move forward with greater career confidence.",
    tagline: "Be job-ready",
    colorName: "rose",
    theme: {
      text: "text-rose-600",
      bgBadge: "bg-rose-50 text-rose-700 border-rose-200",
      divider: "bg-rose-500",
      nodeGradient: "from-pink-500 via-rose-500 to-rose-700",
      nodeGlow: "rgba(244, 63, 94, 0.45)",
      borderHover: "hover:border-rose-400/80",
      shadowHover: "hover:shadow-rose-500/15",
      orbFill: "#e11d48",
    },
    icon: Rocket,
  },
];

export function LearningPathRoad({ className }: { className?: string }) {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className={cn("relative w-full select-none overflow-hidden", className)}>
      {/* ========================================================================= */}
      {/* DESKTOP WINDING ROAD VIEW (Visible on lg and larger screens)              */}
      {/* ========================================================================= */}
      <div className="hidden lg:block relative w-full pt-4 pb-8">
        {/* Subtle decorative dot pattern behind the canvas */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(#94a3b8 1.2px, transparent 1.2px)",
            backgroundSize: "24px 24px",
          }}
          aria-hidden="true"
        />

        {/* Ambient colored lighting blooms */}
        <div
          className="pointer-events-none absolute left-[5%] top-[10%] size-72 rounded-full bg-blue-200/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-[8%] top-[5%] size-80 rounded-full bg-amber-200/25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute left-[45%] bottom-[10%] size-72 rounded-full bg-emerald-100/30 blur-3xl"
          aria-hidden="true"
        />

        {/* Handwritten Accent: "Build & Grow" with curved arrow (Top Left) */}
        <div
          className="absolute left-4 top-0 z-20 flex items-center gap-2 pointer-events-none"
          style={{ transform: "rotate(-4deg)" }}
        >
          <div className="text-left">
            <span className="font-serif italic text-slate-400 text-sm font-semibold tracking-wide block leading-none">
              Build
            </span>
            <span className="font-serif italic text-slate-500 text-lg font-bold tracking-tight block -mt-0.5">
              Grow
            </span>
          </div>
          {/* Handwritten curved arrow */}
          <svg
            className="w-14 h-8 text-slate-400"
            viewBox="0 0 56 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 4 8 C 18 4, 38 10, 48 24" />
            <path d="M 41 24 L 49 25 L 48 17" />
          </svg>
        </div>

        {/* Main Road & Cards Stage Container - Compact Height and Width */}
        <div className="relative mx-auto w-full max-w-[1060px] h-[470px] xl:h-[490px]">
          {/* SVG Road Network */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
            viewBox="0 0 1200 480"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              {/* Road Gradient with 3D top shading */}
              <linearGradient id="roadSurfaceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#a5b4cb" />
                <stop offset="25%" stopColor="#9aabc4" />
                <stop offset="50%" stopColor="#8ea0bc" />
                <stop offset="75%" stopColor="#9db1ce" />
                <stop offset="100%" stopColor="#899cb8" />
              </linearGradient>

              {/* Road lower 3D extrusion shadow */}
              <filter id="roadShadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="7" stdDeviation="8" floodColor="#0f172a" floodOpacity="0.12" />
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0f172a" floodOpacity="0.08" />
              </filter>
            </defs>

            {/* The Winding Road Base Path (Shadow Layer) */}
            <path
              d="M 65 410 
                 C 65 340, 75 305, 135 305 
                 C 205 305, 260 120, 355 120 
                 C 440 120, 480 175, 570 165 
                 C 660 155, 715 190, 795 180 
                 C 870 170, 920 170, 980 160 
                 C 1040 150, 1085 110, 1105 50"
              stroke="#64748b"
              strokeWidth="44"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#roadShadow)"
              opacity="0.22"
            />

            {/* The Main 3D Road Asphalt Ribbon */}
            <path
              d="M 65 410 
                 C 65 340, 75 305, 135 305 
                 C 205 305, 260 120, 355 120 
                 C 440 120, 480 175, 570 165 
                 C 660 155, 715 190, 795 180 
                 C 870 170, 920 170, 980 160 
                 C 1040 150, 1085 110, 1105 50"
              stroke="url(#roadSurfaceGrad)"
              strokeWidth="38"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Center Dashed Highway Line */}
            <path
              d="M 65 405 
                 C 65 340, 75 305, 135 305 
                 C 205 305, 260 120, 355 120 
                 C 440 120, 480 175, 570 165 
                 C 660 155, 715 190, 795 180 
                 C 870 170, 920 170, 980 160 
                 C 1040 150, 1085 110, 1105 50"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeDasharray="8 6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Road Terminal Arrowhead */}
            <path
              d="M 1080 70 L 1108 35 L 1136 70 L 1108 58 Z"
              fill="#899cb8"
              filter="url(#roadShadow)"
            />
          </svg>

          {/* ================================================================= */}
          {/* START BUTTON (Bottom-Left)                                        */}
          {/* ================================================================= */}
          <div
            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-105"
            style={{ left: "5.4%", top: "85.4%" }}
          >
            <div
              className="absolute -inset-1.5 rounded-full bg-blue-500/25 animate-ping opacity-50 pointer-events-none"
              style={{ animationDuration: "3s" }}
              aria-hidden="true"
            />
            <div className="relative size-13 sm:size-14 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 text-white shadow-lg shadow-blue-600/40 border-2 border-blue-300/40 flex flex-col items-center justify-center text-center cursor-pointer p-1">
              <span className="text-[10px] font-black uppercase tracking-tight leading-none">
                Start
              </span>
              <span className="text-[10px] font-black uppercase tracking-tight leading-tight flex items-center gap-0.5 mt-0.5">
                Here <span className="text-sky-200">➔</span>
              </span>
            </div>
          </div>

          {/* ================================================================= */}
          {/* END DESTINATION: GRADUATION CAP & "BRIGHTER YOU" (Top-Right)      */}
          {/* ================================================================= */}
          <div
            className="absolute z-30 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none"
            style={{ left: "92.5%", top: "0%" }}
          >
            {/* Warm Golden Halo behind Graduation Cap */}
            <div
              className="absolute -inset-5 rounded-full bg-amber-400/25 blur-lg pointer-events-none"
              aria-hidden="true"
            />

            {/* 3D Graduation Cap Icon & Aura */}
            <div className="relative flex items-center justify-center">
              <div className="relative size-14 xl:size-16 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-amber-400 shadow-xl shadow-slate-900/40 border border-amber-400/30 flex items-center justify-center">
                <GraduationCap className="size-8 xl:size-9 text-amber-300 drop-shadow-[0_2px_8px_rgba(251,191,36,0.5)]" />
              </div>
            </div>

            {/* "✨ Brighter You" Floating Badge */}
            <div className="mt-2 flex items-center gap-1.5 rounded-full bg-white/95 border border-amber-200/90 px-3 py-0.5 text-[11px] font-bold text-slate-800 shadow-md shadow-amber-500/10 backdrop-blur-md whitespace-nowrap">
              <Sparkles className="size-3 text-amber-500 fill-amber-400" />
              <span className="tracking-tight">Brighter You</span>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 5 ROAD NODES (CIRCULAR GLOWING ORBS PLACED ALONG THE PATH)        */}
          {/* ================================================================= */}

          {/* Node 01: Book (Blue) sitting on road under Card 01 */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 cursor-pointer"
            style={{ left: "11.25%", top: "63.5%" }}
            onMouseEnter={() => setHoveredStep(0)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "absolute -inset-2.5 rounded-full blur-md transition-opacity duration-300 bg-blue-500/40",
                  hoveredStep === 0 ? "opacity-100 scale-125" : "opacity-75",
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "relative grid size-10 xl:size-11 place-items-center rounded-full text-white border-2 border-white/90 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-700 transition-all duration-300",
                  hoveredStep === 0 ? "scale-115 shadow-blue-500/60" : "shadow-blue-500/35",
                )}
              >
                <BookOpen className="size-5 text-white drop-shadow-sm" />
              </span>
            </div>
          </div>

          {/* Node 02: Gamepad (Purple) at the first crest */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 cursor-pointer"
            style={{ left: "29.58%", top: "25%" }}
            onMouseEnter={() => setHoveredStep(1)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "absolute -inset-2.5 rounded-full blur-md transition-opacity duration-300 bg-purple-500/40",
                  hoveredStep === 1 ? "opacity-100 scale-125" : "opacity-75",
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "relative grid size-10 xl:size-11 place-items-center rounded-full text-white border-2 border-white/90 shadow-lg bg-gradient-to-br from-purple-500 to-violet-800 transition-all duration-300",
                  hoveredStep === 1 ? "scale-115 shadow-purple-500/60" : "shadow-purple-500/35",
                )}
              >
                <Gamepad2 className="size-5 text-white drop-shadow-sm" />
              </span>
            </div>
          </div>

          {/* Node 03: Layers (Emerald) at second crest */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 cursor-pointer"
            style={{ left: "47.5%", top: "34.4%" }}
            onMouseEnter={() => setHoveredStep(2)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "absolute -inset-2.5 rounded-full blur-md transition-opacity duration-300 bg-emerald-500/40",
                  hoveredStep === 2 ? "opacity-100 scale-125" : "opacity-75",
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "relative grid size-10 xl:size-11 place-items-center rounded-full text-white border-2 border-white/90 shadow-lg bg-gradient-to-br from-emerald-400 to-teal-700 transition-all duration-300",
                  hoveredStep === 2 ? "scale-115 shadow-emerald-500/60" : "shadow-emerald-500/35",
                )}
              >
                <Layers className="size-5 text-white drop-shadow-sm" />
              </span>
            </div>
          </div>

          {/* Node 04: BarChart (Amber) at third crest */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 cursor-pointer"
            style={{ left: "66.0%", top: "37.5%" }}
            onMouseEnter={() => setHoveredStep(3)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "absolute -inset-2.5 rounded-full blur-md transition-opacity duration-300 bg-amber-500/40",
                  hoveredStep === 3 ? "opacity-100 scale-125" : "opacity-75",
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "relative grid size-10 xl:size-11 place-items-center rounded-full text-white border-2 border-white/90 shadow-lg bg-gradient-to-br from-amber-400 to-orange-600 transition-all duration-300",
                  hoveredStep === 3 ? "scale-115 shadow-amber-500/60" : "shadow-amber-500/35",
                )}
              >
                <BarChart3 className="size-5 text-white drop-shadow-sm" />
              </span>
            </div>
          </div>

          {/* Node 05: Rocket (Rose) at fourth crest */}
          <div
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 cursor-pointer"
            style={{ left: "81.67%", top: "33.3%" }}
            onMouseEnter={() => setHoveredStep(4)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <div className="relative flex items-center justify-center">
              <div
                className={cn(
                  "absolute -inset-2.5 rounded-full blur-md transition-opacity duration-300 bg-rose-500/40",
                  hoveredStep === 4 ? "opacity-100 scale-125" : "opacity-75",
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "relative grid size-10 xl:size-11 place-items-center rounded-full text-white border-2 border-white/90 shadow-lg bg-gradient-to-br from-pink-500 to-rose-700 transition-all duration-300",
                  hoveredStep === 4 ? "scale-115 shadow-rose-500/60" : "shadow-rose-500/35",
                )}
              >
                <Rocket className="size-5 text-white drop-shadow-sm" />
              </span>
            </div>
          </div>

          {/* ================================================================= */}
          {/* 5 CARDS ACCORDING TO USER MOCKUP                                  */}
          {/* Card 01: Top-Left (above Node 01)                                 */}
          {/* Cards 02, 03, 04, 05: In lower row underneath the crests          */}
          {/* ================================================================= */}

          {/* Card 01: Learn */}
          <div
            className="absolute z-20"
            style={{ left: "2%", top: "6%", width: "18%" }}
            onMouseEnter={() => setHoveredStep(0)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <RoadCard step={learningSteps[0]!} isHighlighted={hoveredStep === 0} />
          </div>

          {/* Card 02: Practice */}
          <div
            className="absolute z-20"
            style={{ left: "21%", top: "42%", width: "17.5%" }}
            onMouseEnter={() => setHoveredStep(1)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <RoadCard step={learningSteps[1]!} isHighlighted={hoveredStep === 1} />
          </div>

          {/* Card 03: Build */}
          <div
            className="absolute z-20"
            style={{ left: "40%", top: "48%", width: "17.5%" }}
            onMouseEnter={() => setHoveredStep(2)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <RoadCard step={learningSteps[2]!} isHighlighted={hoveredStep === 2} />
          </div>

          {/* Card 04: Review */}
          <div
            className="absolute z-20"
            style={{ left: "59%", top: "48%", width: "17.5%" }}
            onMouseEnter={() => setHoveredStep(3)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <RoadCard step={learningSteps[3]!} isHighlighted={hoveredStep === 3} />
          </div>

          {/* Card 05: Progress */}
          <div
            className="absolute z-20"
            style={{ left: "78%", top: "45%", width: "17.5%" }}
            onMouseEnter={() => setHoveredStep(4)}
            onMouseLeave={() => setHoveredStep(null)}
          >
            <RoadCard step={learningSteps[4]!} isHighlighted={hoveredStep === 4} />
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET ADAPTIVE ROADMAP (< 1024px)                               */}
      {/* Fully responsive vertical highway flow maintaining identical styling      */}
      {/* ========================================================================= */}
      <div className="block lg:hidden relative px-2 sm:px-4 pt-2 pb-6">
        {/* Start Badge on Mobile */}
        <div className="flex items-center justify-start gap-3 mb-5 pl-1">
          <div className="size-10 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 text-white shadow-md shadow-blue-500/30 flex items-center justify-center font-black text-xs">
            Start
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Begin Your Learning Path</span>
            <ChevronRight className="size-3.5 text-blue-500" />
          </div>
        </div>

        {/* Vertical Connecting Road Line on Mobile */}
        <div className="relative space-y-4">
          <div
            className="absolute left-[22px] sm:left-[26px] top-4 bottom-8 w-2.5 bg-slate-300 rounded-full pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-white"
              aria-hidden="true"
            />
          </div>

          {/* Step Cards with Left-side Glowing Orbs */}
          {learningSteps.map((stepItem) => {
            const IconCmp = stepItem.icon;
            return (
              <div key={stepItem.step} className="relative flex items-start gap-3.5 sm:gap-5 pl-1">
                {/* Node Orb on Road */}
                <div className="relative z-10 shrink-0 mt-2">
                  <div
                    className={cn(
                      "grid size-11 sm:size-12 place-items-center rounded-full text-white border-2 border-white shadow-md bg-gradient-to-br transition-transform duration-300",
                      stepItem.theme.nodeGradient,
                    )}
                  >
                    <IconCmp className="size-4.5 sm:size-5 text-white drop-shadow-xs" />
                  </div>
                </div>

                {/* Card Container */}
                <div className="flex-1">
                  <RoadCard step={stepItem} isHighlighted={false} />
                </div>
              </div>
            );
          })}

          {/* Final Goal on Mobile */}
          <div className="relative flex items-center gap-3.5 sm:gap-5 pl-1 pt-3">
            <div className="relative z-10 shrink-0 size-11 sm:size-12 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 text-amber-400 shadow-lg border border-amber-400/30 flex items-center justify-center">
              <GraduationCap className="size-6 sm:size-7 text-amber-300 drop-shadow-sm" />
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white border border-amber-200 px-3.5 py-1.5 text-xs sm:text-[13px] font-bold text-slate-800 shadow-sm">
              <Sparkles className="size-3.5 text-amber-500 fill-amber-400" />
              <span>Brighter You · Career Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Reusable Card Component representing each stage
 * - No 01s (numbers removed per user request)
 * - text-justify on descriptions
 * - compact and snug padding
 */
function RoadCard({
  step,
  isHighlighted,
}: {
  step: LearningStepItem;
  isHighlighted: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border bg-white p-3.5 sm:p-4 text-left transition-all duration-300 shadow-sm",
        isHighlighted
          ? "border-slate-300 shadow-lg -translate-y-1 ring-2 ring-blue-500/10"
          : "border-slate-100 hover:border-slate-200/90 hover:shadow-md hover:-translate-y-0.5",
      )}
    >
      <div>
        {/* Title (01s removed per request) */}
        <h4 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug tracking-tight">
          {step.title}
        </h4>

        {/* Description */}
        <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-slate-600 font-normal">
          {step.description}
        </p>
      </div>

      <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-slate-100/90">
        {/* Accent Divider & Bottom Tagline */}
        <div className="flex items-center gap-1.5">
          <div className={cn("h-0.5 w-4 rounded-full shrink-0", step.theme.divider)} />
          <p className={cn("text-[10.5px] sm:text-[11px] font-semibold leading-tight truncate", step.theme.text)}>
            {step.tagline}
          </p>
        </div>
      </div>
    </div>
  );
}

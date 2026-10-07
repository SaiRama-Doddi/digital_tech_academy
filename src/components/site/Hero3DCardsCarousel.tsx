import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Shield,
  BarChart3,
  TrendingUp,
  Bot,
  Code2,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

import cyber3dImg from "@/assets/card-cyber-security-3d.jpg";
import marketing3dImg from "@/assets/card-digital-marketing-3d.jpg";
import programmatic3dImg from "@/assets/card-programmatic-ads-3d.jpg";
import ai3dImg from "@/assets/card-ai-automation-3d.jpg";
import fullstack3dImg from "@/assets/card-fullstack-dev-3d.jpg";

export interface HeroCourseCard {
  id: string;
  category: string;
  title: string;
  liveTag: string;
  tagColor: string;
  gradientTheme: string;
  borderGlow: string;
  accentColor: string;
  icon: typeof Shield;
  image: string;
  keyOutcome: string;
  link: string;
}

const HERO_COURSE_CARDS: HeroCourseCard[] = [
  {
    id: "cyber",
    category: "CYBER SECURITY",
    title: "Cyber Security & Ethical Hacking",
    liveTag: "SOC LABS • LIVE",
    tagColor: "text-cyan-400 bg-cyan-950/80 border-cyan-500/40",
    gradientTheme: "from-cyan-500/20 via-blue-600/15 to-slate-950",
    borderGlow: "border-cyan-500/50 shadow-[0_0_40px_rgba(6,182,212,0.35)]",
    accentColor: "text-cyan-400",
    icon: Shield,
    image: cyber3dImg,
    keyOutcome: "Hands-on Threat Defense & SOC Labs",
    link: "/courses/cyber-security",
  },
  {
    id: "marketing",
    category: "DIGITAL MARKETING",
    title: "Digital Marketing & Performance Ads",
    liveTag: "META & GOOGLE ADS",
    tagColor: "text-emerald-400 bg-emerald-950/80 border-emerald-500/40",
    gradientTheme: "from-emerald-500/20 via-teal-600/15 to-slate-950",
    borderGlow: "border-emerald-500/50 shadow-[0_0_40px_rgba(16,185,129,0.35)]",
    accentColor: "text-emerald-400",
    icon: TrendingUp,
    image: marketing3dImg,
    keyOutcome: "Full-Funnel ROAS & Conversion Scale",
    link: "/courses/digital-marketing",
  },
  {
    id: "programmatic",
    category: "PROGRAMMATIC ADS",
    title: "Programmatic Advertising & DV360",
    liveTag: "RTB ENGINE • LIVE",
    tagColor: "text-indigo-400 bg-indigo-950/80 border-indigo-500/40",
    gradientTheme: "from-indigo-500/20 via-purple-600/15 to-slate-950",
    borderGlow: "border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.35)]",
    accentColor: "text-indigo-400",
    icon: BarChart3,
    image: programmatic3dImg,
    keyOutcome: "Real-Time Bidding & DSP Campaigns",
    link: "/courses/programmatic-advertising",
  },
  {
    id: "ai",
    category: "ARTIFICIAL INTELLIGENCE",
    title: "AI & Marketing Automation",
    liveTag: "AI AGENTS • ACTIVE",
    tagColor: "text-amber-400 bg-amber-950/80 border-amber-500/40",
    gradientTheme: "from-amber-500/20 via-orange-600/15 to-slate-950",
    borderGlow: "border-amber-500/50 shadow-[0_0_40px_rgba(245,158,11,0.35)]",
    accentColor: "text-amber-400",
    icon: Bot,
    image: ai3dImg,
    keyOutcome: "Automated Workflows & Smart CRM",
    link: "/courses",
  },
  {
    id: "fullstack",
    category: "FULL STACK DEV",
    title: "Full Stack Web Development",
    liveTag: "REACT & NODE.JS",
    tagColor: "text-sky-400 bg-sky-950/80 border-sky-500/40",
    gradientTheme: "from-sky-500/20 via-blue-600/15 to-slate-950",
    borderGlow: "border-sky-500/50 shadow-[0_0_40px_rgba(14,165,233,0.35)]",
    accentColor: "text-sky-400",
    icon: Code2,
    image: fullstack3dImg,
    keyOutcome: "High-Performance Modern Web Apps",
    link: "/courses",
  },
];

const DOMAIN_MAP: Record<string, string> = {
  cyber: "Cyber Security",
  marketing: "Digital Marketing",
  programmatic: "Programmatic Advertising",
  ai: "AI & Automation",
  fullstack: "Full Stack Development",
};

export interface Hero3DCardsCarouselProps {
  onSelectDomain?: ((domain: string) => void) | undefined;
}

export function Hero3DCardsCarousel({ onSelectDomain }: Hero3DCardsCarouselProps = {}) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const totalCards = HERO_COURSE_CARDS.length;

  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  }, [totalCards]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  }, [totalCards]);

  // Auto-cycle every 4 seconds unless hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextCard, 4000);
    return () => clearInterval(interval);
  }, [isPaused, nextCard]);

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    setTouchStartX(touch.clientX);
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touch = e.changedTouches[0];
    if (touch) {
      const diff = touchStartX - touch.clientX;
      if (diff > 45) {
        nextCard();
      } else if (diff < -45) {
        prevCard();
      }
    }
    setTouchStartX(null);
    setIsPaused(false);
  };

  return (
    <div
      className="relative w-full max-w-[520px] lg:max-w-[460px] xl:max-w-[520px] mx-auto lg:mr-0 pt-2 sm:pt-4 pb-4 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Ambient background glow behind 3D space */}
      <div
        className="pointer-events-none absolute inset-x-4 inset-y-6 sm:inset-y-8 rounded-3xl bg-gradient-to-r from-blue-600/20 via-sky-500/15 to-indigo-600/20 blur-2xl opacity-75 animate-pulse-glow"
        aria-hidden="true"
      />

      {/* 3D Cylindrical Cards Stage */}
      <div
        className="relative w-full h-[395px] sm:h-[420px] lg:h-[435px] flex items-center justify-center mt-1 sm:mt-2"
        style={{ perspective: "1100px" }}
      >
        {HERO_COURSE_CARDS.map((card, idx) => {
          let offset = idx - activeIndex;
          if (offset > totalCards / 2) offset -= totalCards;
          if (offset < -totalCards / 2) offset += totalCards;

          const isCenter = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;
          const isFarLeft = offset === -2;
          const isFarRight = offset === 2;

          let transformStyle = "";
          let zIndex = 10;
          let opacity = 0;
          let pointerEvents: "auto" | "none" = "none";

          if (isCenter) {
            transformStyle = "translateX(0%) translateZ(0px) rotateY(0deg) scale(1)";
            zIndex = 25;
            opacity = 1;
            pointerEvents = "auto";
          } else if (isLeft) {
            transformStyle = "translateX(-24%) translateZ(-65px) rotateY(18deg) scale(0.9)";
            zIndex = 15;
            opacity = 0.85;
            pointerEvents = "auto";
          } else if (isRight) {
            transformStyle = "translateX(24%) translateZ(-65px) rotateY(-18deg) scale(0.9)";
            zIndex = 15;
            opacity = 0.85;
            pointerEvents = "auto";
          } else if (isFarLeft) {
            transformStyle = "translateX(-42%) translateZ(-130px) rotateY(30deg) scale(0.78)";
            zIndex = 6;
            opacity = 0.3;
            pointerEvents = "none";
          } else if (isFarRight) {
            transformStyle = "translateX(42%) translateZ(-130px) rotateY(-30deg) scale(0.78)";
            zIndex = 6;
            opacity = 0.3;
            pointerEvents = "none";
          } else {
            transformStyle = "translateX(0%) translateZ(-250px) scale(0.5)";
            zIndex = 1;
            opacity = 0;
            pointerEvents = "none";
          }

          const CardIcon = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => {
                if (!isCenter) {
                  setActiveIndex(idx);
                } else {
                  const domainName = DOMAIN_MAP[card.id] || "Digital Marketing";
                  if (onSelectDomain) {
                    onSelectDomain(domainName);
                    const coursesElem = document.getElementById("courses");
                    if (coursesElem) {
                      coursesElem.scrollIntoView({ behavior: "smooth" });
                    }
                  } else {
                    navigate({ to: card.link as any });
                  }
                }
              }}
              className={cn(
                "group absolute top-0 w-[92%] max-w-[355px] sm:max-w-[385px] xl:max-w-[405px] h-[390px] sm:h-[415px] lg:h-[430px] rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-700 ease-out cursor-pointer overflow-hidden text-white shadow-2xl",
                isCenter ? card.borderGlow : "shadow-slate-950/60 ring-1 ring-white/5"
              )}
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
                pointerEvents,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Full Bleed Card Background Image */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-slate-950/65" />
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-35 mix-blend-color-dodge bg-gradient-to-b",
                    card.gradientTheme
                  )}
                  aria-hidden="true"
                />
              </div>

              {/* Shimmer line on active card */}
              {isCenter && (
                <div
                  className="pointer-events-none absolute inset-x-0 h-0.5 top-0 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-scanline z-20"
                  aria-hidden="true"
                />
              )}

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0 bg-slate-950/70 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10 shadow-xs">
                  <div className="grid size-6 sm:size-7 place-items-center rounded-lg bg-slate-900/90 shrink-0">
                    <CardIcon className={cn("size-3.5 sm:size-4", card.accentColor)} />
                  </div>
                  <span className="text-[10.5px] sm:text-xs font-black uppercase tracking-wider text-slate-200 truncate">
                    {card.category}
                  </span>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 text-[9px] sm:text-[9.5px] font-mono font-black backdrop-blur-md px-2.5 py-1 rounded-full shrink-0 border border-white/10",
                    card.tagColor
                  )}
                >
                  <span className="size-1.5 rounded-full bg-current animate-ping" />
                  {card.liveTag}
                </span>
              </div>

              {/* Card Bottom Area: Title and Outcome Badge */}
              <div className="relative z-10 space-y-2.5 mt-auto pt-4">
                <div>
                  <h3 className="text-base sm:text-lg xl:text-xl font-black tracking-tight text-white leading-tight drop-shadow-md">
                    {card.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 shadow-sm">
                  <Zap className={cn("size-3.5 shrink-0", card.accentColor)} />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-200 truncate">
                    {card.keyOutcome}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows & Dot Indicators */}
      <div className="flex items-center justify-between mt-3 px-2 z-20 relative">
        <button
          onClick={prevCard}
          type="button"
          aria-label="Previous card"
          className="size-8.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm flex items-center justify-center transition-all active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {HERO_COURSE_CARDS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              type="button"
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                dotIdx === activeIndex ? "w-6 bg-blue-600 shadow-xs" : "w-1.5 bg-slate-300 hover:bg-slate-400"
              )}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          type="button"
          aria-label="Next card"
          className="size-8.5 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm flex items-center justify-center transition-all active:scale-95 cursor-pointer"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

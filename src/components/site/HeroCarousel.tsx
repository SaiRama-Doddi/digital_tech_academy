import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Megaphone,
  Layers,
  Sparkles,
  GraduationCap,
  Award,
  Briefcase,
  Cpu,
  PhoneCall,
} from "lucide-react";
import { cn } from "@/lib/utils";

import heroSlide1Img from "@/assets/hero-slide-1.jpg";
import heroSlide2Img from "@/assets/hero-slide-2.jpg";
import heroSlide3Img from "@/assets/hero-slide-3.jpg";

export interface HeroCarouselProps {
  onSelectDomain?: ((domain: string) => void) | undefined;
}

interface FloatingCardItem {
  title: string;
  subtitle?: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  borderColor: string;
  glowColor: string;
  positionDesktop: string;
  delay: string;
}

interface HeroSlide {
  id: number;
  eyebrow: string;
  headlineLine1: string;
  headlineHighlight: string;
  headlineLine2?: string;
  headlineLine3?: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  image: string;
  imageAlt: string;
  ambientColor: string;
  floatingCards: FloatingCardItem[];
}

const HERO_SLIDES: HeroSlide[] = [
  // =========================================================================
  // SLIDE 1: MASTER THE SKILLS. BUILD REAL-WORLD EXPERIENCE.
  // =========================================================================
  {
    id: 1,
    eyebrow: "INDUSTRY-LED • PRACTICAL • CAREER-FOCUSED",
    headlineLine1: "MASTER THE SKILLS.",
    headlineHighlight: "REAL-WORLD",
    headlineLine2: "BUILD",
    headlineLine3: "EXPERIENCE.",
    description:
      "Learn Cyber Security, Programmatic Advertising & Digital Marketing with practical, industry-focused training.",
    primaryCtaText: "Explore Programs",
    primaryCtaLink: "#courses",
    secondaryCtaText: "Talk to an Expert",
    secondaryCtaLink: "/request-call",
    image: heroSlide1Img,
    imageAlt: "Female technology learner holding a laptop with holographic digital globe",
    ambientColor: "rgba(6, 182, 212, 0.22)",
    floatingCards: [
      {
        title: "Digital Marketing",
        icon: BarChart3,
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/20 border-cyan-400/40",
        borderColor: "border-cyan-400/40",
        glowColor: "shadow-[0_0_25px_rgba(6,182,212,0.35)]",
        positionDesktop: "top-[8%] -left-3 xl:-left-6",
        delay: "100ms",
      },
      {
        title: "Programmatic Advertising",
        icon: Megaphone,
        iconColor: "text-indigo-400",
        iconBg: "bg-indigo-500/20 border-indigo-400/40",
        borderColor: "border-indigo-400/40",
        glowColor: "shadow-[0_0_25px_rgba(99,102,241,0.35)]",
        positionDesktop: "bottom-[10%] -left-3 xl:-left-6",
        delay: "200ms",
      },
      {
        title: "Cyber Security",
        icon: ShieldCheck,
        iconColor: "text-sky-400",
        iconBg: "bg-sky-500/20 border-sky-400/40",
        borderColor: "border-sky-400/40",
        glowColor: "shadow-[0_0_25px_rgba(56,189,248,0.35)]",
        positionDesktop: "top-[8%] -right-3 xl:-right-6",
        delay: "300ms",
      },
      {
        title: "Live Projects",
        icon: Layers,
        iconColor: "text-cyan-300",
        iconBg: "bg-cyan-500/20 border-cyan-400/40",
        borderColor: "border-cyan-400/40",
        glowColor: "shadow-[0_0_25px_rgba(6,182,212,0.35)]",
        positionDesktop: "bottom-[10%] -right-3 xl:-right-6",
        delay: "400ms",
      },
    ],
  },

  // =========================================================================
  // SLIDE 2: LEARN TODAY. LEAD TOMORROW.
  // =========================================================================
  {
    id: 2,
    eyebrow: "PRACTICAL TRAINING • INDUSTRY PROJECTS • JOB-READY SKILLS",
    headlineLine1: "LEARN TODAY.",
    headlineHighlight: "LEAD TOMORROW.",
    description:
      "Industry-relevant training with real-world projects, mentorship and career support.",
    primaryCtaText: "Explore Programs",
    primaryCtaLink: "#courses",
    secondaryCtaText: "Talk to an Expert",
    secondaryCtaLink: "/request-call",
    image: heroSlide2Img,
    imageAlt: "Professional learner working on laptop in modern technology workspace with multiple screens",
    ambientColor: "rgba(59, 130, 246, 0.22)",
    floatingCards: [
      {
        title: "REAL PROJECTS",
        subtitle: "REAL SKILLS • REAL CAREERS",
        icon: Sparkles,
        iconColor: "text-cyan-300",
        iconBg: "bg-cyan-500/25 border-cyan-300/50",
        borderColor: "border-cyan-400/60",
        glowColor: "shadow-[0_0_35px_rgba(6,182,212,0.5)]",
        positionDesktop: "top-[8%] -left-3 xl:-left-6",
        delay: "100ms",
      },
      {
        title: "Digital Marketing",
        icon: TrendingUp,
        iconColor: "text-cyan-400",
        iconBg: "bg-cyan-500/20 border-cyan-400/40",
        borderColor: "border-cyan-400/40",
        glowColor: "shadow-[0_0_25px_rgba(6,182,212,0.35)]",
        positionDesktop: "bottom-[10%] -left-3 xl:-left-6",
        delay: "200ms",
      },
      {
        title: "Programmatic Advertising",
        icon: Megaphone,
        iconColor: "text-sky-400",
        iconBg: "bg-sky-500/20 border-sky-400/40",
        borderColor: "border-sky-400/40",
        glowColor: "shadow-[0_0_25px_rgba(56,189,248,0.35)]",
        positionDesktop: "top-[8%] -right-3 xl:-right-6",
        delay: "300ms",
      },
      {
        title: "Cyber Security",
        icon: ShieldCheck,
        iconColor: "text-blue-400",
        iconBg: "bg-blue-500/20 border-blue-400/40",
        borderColor: "border-blue-400/40",
        glowColor: "shadow-[0_0_25px_rgba(59,130,246,0.35)]",
        positionDesktop: "bottom-[10%] -right-3 xl:-right-6",
        delay: "400ms",
      },
    ],
  },

  // =========================================================================
  // SLIDE 3: FROM LEARNING TO REAL CAREERS.
  // =========================================================================
  {
    id: 3,
    eyebrow: "SKILLS • PROJECTS • CERTIFICATIONS • CAREER SUPPORT",
    headlineLine1: "FROM LEARNING",
    headlineHighlight: "TO REAL CAREERS.",
    description:
      "Get hands-on training, work on live projects, and become industry-ready with expert guidance.",
    primaryCtaText: "Explore Programs",
    primaryCtaLink: "#courses",
    secondaryCtaText: "Talk to an Expert",
    secondaryCtaLink: "/request-call",
    image: heroSlide3Img,
    imageAlt: "Futuristic career pathway showing a learner moving toward a glowing professional career destination",
    ambientColor: "rgba(6, 182, 212, 0.25)",
    floatingCards: [
      {
        title: "Learn from Experts",
        icon: GraduationCap,
        iconColor: "text-sky-300",
        iconBg: "bg-sky-500/20 border-sky-400/40",
        borderColor: "border-sky-400/40",
        glowColor: "shadow-[0_0_25px_rgba(56,189,248,0.35)]",
        positionDesktop: "top-[8%] -left-3 xl:-left-6",
        delay: "100ms",
      },
      {
        title: "Work on Live Projects",
        icon: Cpu,
        iconColor: "text-cyan-300",
        iconBg: "bg-cyan-500/20 border-cyan-400/40",
        borderColor: "border-cyan-400/40",
        glowColor: "shadow-[0_0_25px_rgba(6,182,212,0.35)]",
        positionDesktop: "bottom-[10%] -left-3 xl:-left-6",
        delay: "200ms",
      },
      {
        title: "Get Certified",
        icon: Award,
        iconColor: "text-blue-300",
        iconBg: "bg-blue-500/20 border-blue-400/40",
        borderColor: "border-blue-400/40",
        glowColor: "shadow-[0_0_25px_rgba(59,130,246,0.35)]",
        positionDesktop: "top-[8%] -right-3 xl:-right-6",
        delay: "300ms",
      },
      {
        title: "Career Support",
        icon: Briefcase,
        iconColor: "text-indigo-300",
        iconBg: "bg-indigo-500/20 border-indigo-400/40",
        borderColor: "border-indigo-400/40",
        glowColor: "shadow-[0_0_25px_rgba(99,102,241,0.35)]",
        positionDesktop: "bottom-[10%] -right-3 xl:-right-6",
        delay: "400ms",
      },
    ],
  },
];

export function HeroCarousel({ onSelectDomain }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide((index + totalSlides) % totalSlides);
    },
    [totalSlides],
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Robust automatic cycling every 5.0 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalSlides, currentSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide]);

  const slide = HERO_SLIDES[currentSlide] ?? HERO_SLIDES[0]!;

  return (
    <section
      aria-label="Digitech Academy Hero Carousel"
      className="relative overflow-hidden bg-[#030712] text-white select-none transition-colors duration-700 min-h-[480px] sm:min-h-[540px] lg:min-h-[580px] xl:min-h-[620px] flex flex-col justify-start pt-1 sm:pt-2 lg:pt-3 pb-5 sm:pb-7"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ========================================================================= */}
      {/* BACKGROUND EFFECTS: Tech Matrix Grid, Deep Navy Vignette & Ambient Glows */}
      {/* ========================================================================= */}
      {/* Matrix Circuit Dot Grid Overlay */}
      <div
        className="absolute inset-0 bg-[radial-gradient(rgba(56,189,248,0.14)_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-75 pointer-events-none"
        aria-hidden="true"
      />

      {/* Dynamic Ambient Glow Orbs keyed to current slide */}
      <div
        className="pointer-events-none absolute -top-24 -left-20 size-[32rem] sm:size-[45rem] rounded-full blur-[130px] opacity-45 transition-all duration-1000 animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${slide.ambientColor} 0%, rgba(3,7,18,0) 70%)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-24 size-[34rem] sm:size-[52rem] rounded-full blur-[140px] opacity-50 transition-all duration-1000 animate-pulse-glow"
        style={{
          background: `radial-gradient(circle, ${slide.ambientColor} 0%, rgba(3,7,18,0) 70%)`,
          animationDelay: "2s",
        }}
        aria-hidden="true"
      />

      {/* Deep Navy/Black Edge Vignettes */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/60 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#030712]/95 via-transparent to-[#030712]/80 pointer-events-none"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* MAIN CAROUSEL CONTENT CONTAINER                                           */}
      {/* ========================================================================= */}
      <div className="container-site relative z-10 w-full pt-1 sm:pt-2 lg:pt-3 pb-3 sm:pb-5 px-4 sm:px-8 lg:px-20 xl:px-24">
        {/* DESKTOP SIDE ARROWS (Safely positioned in gutter margins, never overriding text or floating cards) */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="hidden lg:grid absolute left-2 lg:left-3 xl:left-4 top-1/2 -translate-y-1/2 z-40 size-10 xl:size-11 place-items-center rounded-full bg-slate-900/85 hover:bg-cyan-500/20 border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 shadow-[0_0_20px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all active:scale-90 cursor-pointer"
        >
          <ChevronLeft className="size-5 xl:size-5.5" />
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Slide"
          className="hidden lg:grid absolute right-2 lg:right-3 xl:right-4 top-1/2 -translate-y-1/2 z-40 size-10 xl:size-11 place-items-center rounded-full bg-slate-900/85 hover:bg-cyan-500/20 border border-slate-700/80 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 shadow-[0_0_20px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all active:scale-90 cursor-pointer"
        >
          <ChevronRight className="size-5 xl:size-5.5" />
        </button>

        {/* Slides Track - ONLY Active Slide Rendered to Prevent Any Ghost Layer Overlap */}
        <div key={slide.id} className="relative w-full animate-in fade-in duration-500 ease-out">
          <div className="grid lg:grid-cols-12 items-center gap-6 sm:gap-8 lg:gap-6 xl:gap-12 w-full">
            {/* ========================================================= */}
            {/* LEFT COLUMN: Eyebrow, Large Headline, Subtitle & CTAs     */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 xl:col-span-6 w-full text-left flex flex-col justify-center min-w-0 pr-0 lg:pr-2">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-slate-900/85 backdrop-blur-xl px-3.5 py-1.5 sm:px-4 sm:py-1.5 shadow-[0_0_20px_rgba(6,182,212,0.25)] mb-2.5 sm:mb-3 w-fit max-w-full">
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-cyan-400" />
                </span>
                <span className="text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-wider sm:tracking-[0.16em] text-cyan-300 truncate">
                  {slide.eyebrow}
                </span>
                <Sparkles className="size-3 text-cyan-400 shrink-0" aria-hidden="true" />
              </div>

              {/* Headline */}
              <h1 className="text-[1.65rem] xs:text-[1.95rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[2.9rem] xl:text-[3.45rem] 2xl:text-[3.85rem] font-black leading-[1.08] tracking-tight text-white uppercase">
                {/* Slide 1 Layout */}
                {slide.id === 1 && (
                  <>
                    <span className="block">{slide.headlineLine1}</span>
                    <span className="block mt-0.5 sm:mt-1">
                      {slide.headlineLine2}{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 drop-shadow-[0_0_35px_rgba(56,189,248,0.45)]">
                        {slide.headlineHighlight}
                      </span>
                    </span>
                    <span className="block mt-0.5 sm:mt-1">{slide.headlineLine3}</span>
                  </>
                )}

                {/* Slide 2 Layout */}
                {slide.id === 2 && (
                  <>
                    <span className="block">{slide.headlineLine1}</span>
                    <span className="block mt-0.5 sm:mt-1 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 drop-shadow-[0_0_35px_rgba(56,189,248,0.45)]">
                      {slide.headlineHighlight}
                    </span>
                  </>
                )}

                {/* Slide 3 Layout */}
                {slide.id === 3 && (
                  <>
                    <span className="block">{slide.headlineLine1}</span>
                    <span className="block mt-0.5 sm:mt-1 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 drop-shadow-[0_0_35px_rgba(56,189,248,0.45)]">
                      {slide.headlineHighlight}
                    </span>
                  </>
                )}
              </h1>

              {/* Supporting Description */}
              <p className="mt-2.5 sm:mt-3.5 lg:mt-4 text-xs sm:text-base lg:text-[16.5px] text-slate-300 leading-relaxed max-w-lg lg:max-w-xl font-normal">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="mt-4 sm:mt-6 flex flex-row items-center gap-2.5 sm:gap-4 w-full max-w-md sm:max-w-none">
                {/* Primary Button: Explore Programs */}
                <a
                  href="#courses"
                  onClick={(e) => {
                    e.preventDefault();
                    const coursesElem = document.getElementById("courses");
                    if (coursesElem) {
                      coursesElem.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="relative overflow-hidden flex-1 sm:flex-initial justify-center bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold h-10.5 sm:h-12.5 px-4 sm:px-7 text-xs sm:text-base rounded-full shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-[0.98] transition-all flex items-center gap-2 group whitespace-nowrap min-w-0 border border-cyan-400/30 cursor-pointer"
                >
                  {/* Shimmer Light Bar */}
                  <div
                    className="pointer-events-none absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer-slide"
                    aria-hidden="true"
                  />
                  <span className="relative z-10 truncate">{slide.primaryCtaText}</span>
                  <ArrowRight
                    className="relative z-10 size-3.5 sm:size-4 transition-transform group-hover:translate-x-1 shrink-0"
                    aria-hidden="true"
                  />
                </a>

                {/* Secondary Button: Talk to an Expert */}
                <Link
                  to="/request-call"
                  className="flex-1 sm:flex-initial justify-center h-10.5 sm:h-12.5 px-3.5 sm:px-6 rounded-full bg-slate-900/80 hover:bg-slate-800/90 text-slate-100 font-bold border border-slate-700/80 hover:border-cyan-400/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md transition-all flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base active:scale-[0.98] cursor-pointer whitespace-nowrap min-w-0"
                >
                  <span className="grid size-5 sm:size-6 place-items-center rounded-full bg-blue-500/20 text-cyan-400 border border-cyan-400/30 shrink-0">
                    <PhoneCall className="size-2.5 sm:size-3" aria-hidden="true" />
                  </span>
                  <span className="truncate">{slide.secondaryCtaText}</span>
                </Link>
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: 3D Visual Scene & Floating Glass Cards       */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 xl:col-span-6 relative w-full flex flex-col justify-center items-center mt-3 sm:mt-6 lg:mt-0 min-h-[280px] sm:min-h-[380px] lg:min-h-[460px]">
              {/* Visual Center Wrapper with Soft Outer Glow */}
              <div className="relative w-full max-w-[540px] lg:max-w-none aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-visible flex items-center justify-center">
                {/* Radial Backlight behind the subject */}
                <div
                  className="absolute inset-0 -m-4 sm:-m-6 rounded-3xl bg-gradient-to-r from-blue-600/20 via-cyan-500/25 to-indigo-600/20 blur-3xl opacity-60 pointer-events-none"
                  aria-hidden="true"
                />

                {/* The Main Hero Image with Seamless Blended Edge Masking */}
                <div className="relative w-full h-full rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950/80 group">
                  <img
                    src={slide.image}
                    alt={slide.imageAlt}
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                    loading="eager"
                  />

                  {/* Edge Gradient Mask so image seamlessly dissolves into dark background */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-80 pointer-events-none"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[#030712]/60 via-transparent to-[#030712]/60 pointer-events-none"
                    aria-hidden="true"
                  />
                </div>

                {/* ===================================================== */}
                {/* FLOATING GLASS CARDS (Desktop & Tablet)                */}
                {/* ===================================================== */}
                {slide.floatingCards.map((card, cIdx) => {
                  const IconComp = card.icon;
                  const isEven = cIdx % 2 === 0;

                  return (
                    <div
                      key={card.title}
                      className={cn(
                        "absolute z-30 transition-all duration-700",
                        "hidden md:flex",
                        card.positionDesktop,
                        isEven ? "animate-float-slow" : "animate-float-reverse",
                      )}
                      style={{
                        animationDelay: `${cIdx * 0.4}s`,
                      }}
                    >
                      <div
                        className={cn(
                          "flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl backdrop-blur-xl bg-slate-900/90 border text-white transition-transform hover:scale-105 shadow-xl select-none",
                          card.borderColor,
                          card.glowColor,
                        )}
                      >
                        <div
                          className={cn(
                            "grid size-8 place-items-center rounded-xl border shrink-0",
                            card.iconBg,
                            card.iconColor,
                          )}
                        >
                          <IconComp className="size-4.5" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="text-xs font-black tracking-wide text-white whitespace-nowrap">
                            {card.title}
                          </p>
                          {card.subtitle && (
                            <p className="text-[9.5px] font-bold text-cyan-300 tracking-wider whitespace-nowrap">
                              {card.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Only: Floating Badges Strip below image (Clean 2x2 Grid) */}
              <div className="md:hidden grid grid-cols-2 gap-2 mt-3 sm:mt-4 w-full">
                {slide.floatingCards.slice(0, 4).map((card, cIdx) => {
                  const IconComp = card.icon;
                  return (
                    <div
                      key={cIdx}
                      className={cn(
                        "flex items-center gap-2 p-2 rounded-xl backdrop-blur-md bg-slate-900/90 border text-left",
                        card.borderColor,
                        card.glowColor,
                      )}
                    >
                      <div
                        className={cn(
                          "grid size-6 place-items-center rounded-lg border shrink-0",
                          card.iconBg,
                          card.iconColor,
                        )}
                      >
                        <IconComp className="size-3" />
                      </div>
                      <span className="text-[11px] font-bold text-white truncate">
                        {card.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CAROUSEL CONTROLS BAR (Arrows on Mobile/Tablet + Bottom Pagination Dots)  */}
        {/* ========================================================================= */}
        <div className="relative z-30 mt-6 sm:mt-8 flex items-center justify-center gap-3">
          {/* Mobile Prev Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Hero Slide"
            className="lg:hidden grid size-8 place-items-center rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white active:scale-95"
          >
            <ChevronLeft className="size-4" />
          </button>

          {/* Center Pagination Dots */}
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-lg"
            role="tablist"
            aria-label="Hero Slide Switcher"
          >
            {HERO_SLIDES.map((s, idx) => {
              const isSelected = idx === currentSlide;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={`Go to slide ${s.id}`}
                  onClick={() => goToSlide(idx)}
                  className={cn(
                    "transition-all duration-300 cursor-pointer rounded-full",
                    isSelected
                      ? "w-8 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.85)]"
                      : "size-2.5 bg-slate-600/80 hover:bg-slate-400",
                  )}
                />
              );
            })}
          </div>

          {/* Mobile Next Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Hero Slide"
            className="lg:hidden grid size-8 place-items-center rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white active:scale-95"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

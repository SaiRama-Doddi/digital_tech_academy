import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Bot,
  Briefcase,
  Check,
  CheckCircle2,
  Code2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  FileText,
  Globe,
  GraduationCap,
  HelpCircle,
  Layers,
  LineChart,
  Lock,
  Megaphone,
  PhoneCall,
  Play,
  Radio,
  Search,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import aboutImg from "@/assets/about-training.jpg";
import heroImg from "@/assets/hero-tech.jpg";
import heroStudentImg from "@/assets/hero-student.jpg";
import careerReadinessStudentImg from "@/assets/career-readiness-student.jpg";
import cyberHeroBg from "@/assets/cyber-hero-bg.jpg";
import cyberPhase1Img from "@/assets/cyber-phase1-3d.jpg";
import cyberPhase2Img from "@/assets/cyber-phase2-3d.jpg";
import cyberPhase3Img from "@/assets/cyber-phase3-3d.jpg";
import cyberPhase4Img from "@/assets/cyber-phase4-3d.jpg";
import cyberPhase5Img from "@/assets/cyber-phase5-3d.jpg";
import domainCyberSecurityImg from "@/assets/domain-cyber-security.jpg";
import domainDigitalMarketingImg from "@/assets/domain-digital-marketing.jpg";
import domainProgrammaticAdsImg from "@/assets/domain-programmatic-ads.jpg";
import domainAiAutomationImg from "@/assets/domain-ai-automation.jpg";
import domainFullstackDevImg from "@/assets/domain-fullstack-dev.jpg";
import { BtnLink } from "@/components/site/Btn";
import { CourseCard } from "@/components/site/CourseCard";
import { CountUp } from "@/components/site/CountUp";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { FinalCta } from "@/components/site/FinalCta";
import { DemoClassModal } from "@/components/site/DemoClassModal";
import { Icon } from "@/components/site/Icon";
import { StudentLearningPath } from "@/components/site/StudentLearningPath";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero3DCardsCarousel } from "@/components/site/Hero3DCardsCarousel";
import { homeFaqs, practicalTraining, whoIsForAudience } from "@/data/content";
import { courses } from "@/data/courses";
import { subscribeCourses, normalizeCourseCategory, type FirebaseCourse } from "@/services/courseService";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Digital Marketing, Programmatic & Cyber Security Training | Digitechademy",
      },
      {
        name: "description",
        content:
          "Build practical skills in Digital Marketing, Programmatic Advertising & Cyber Security through real-world projects, industry tools and expert-led training at Digitechademy.",
      },
      {
        name: "keywords",
        content:
          "Digital Marketing Training, Cyber Security Training, Programmatic Advertising Training, Digital Marketing Course, Cyber Security Course, Programmatic Advertising Course, DV360 Training, Performance Marketing Training, DV360 Course, CM360 Training, Programmatic Media Buying Course, Ethical Hacking Course, Cyber Security Training for Beginners, Practical Cyber Security Course, Paid Advertising Course, Digital Marketing Training for Beginners",
      },
      {
        property: "og:title",
        content: "Digital Marketing, Programmatic & Cyber Security Training | Digitechademy",
      },
      {
        property: "og:description",
        content:
          "Build practical skills in Digital Marketing, Programmatic Advertising & Cyber Security through real-world projects, industry tools and expert-led training at Digitechademy.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

/**
 * =========================================================================
 * HOMEPAGE MASTER STRUCTURE (Exact 16-Section Architecture)
 * =========================================================================
 * 1. Announcement Bar                      -> Provided by SiteLayout (Header)
 * 2. Navigation                            -> Provided by SiteLayout (Header)
 * 3. Hero                                  -> <Hero />
 * 4. USP / Trust Strip                     -> <UspTrustStrip />
 * 5. Why Digitechademy                     -> <WhyDigitechademy />
 * 6. Core Programs                         -> <CorePrograms />
 * 7. Programmatic Advertising Differentiator-> <ProgrammaticDifferentiator />
 * 8. Cyber Security Differentiator         -> <CyberSecurityDifferentiator />
 * 9. Digitechademy Learning Method         -> <DigitechademyLearningMethod />
 * 10. Practical Learning                   -> <PracticalLearning />
 * 11. Who Is This For?                     -> <WhoIsThisFor />
 * 12. Career Readiness                     -> <CareerReadiness />
 * 13. FAQ                                  -> <FaqSection />
 * 14. Final CTA                            -> <FinalCta />
 * 15. Footer                               -> Provided by SiteLayout (Footer)
 * =========================================================================
 */
function Home() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Sync with global header dropdown domain selection
  useEffect(() => {
    const handleSelectDomainEvent = (e: any) => {
      if (e?.detail) {
        setSelectedDomain(e.detail);
      }
    };
    window.addEventListener("select-domain", handleSelectDomainEvent);
    return () => window.removeEventListener("select-domain", handleSelectDomainEvent);
  }, []);

  return (
    <SiteLayout>
      {/* 3. Hero */}
      <Hero onSelectDomain={setSelectedDomain} />

      {/* 4. USP / Trust Strip */}
      <UspTrustStrip />

      {/* 5. Why Digitechademy */}
      <WhyDigitechademy />

      {/* 6. Core Programs */}
      <CorePrograms selectedDomain={selectedDomain} onSelectDomain={setSelectedDomain} />

      {/* 7. Programmatic Advertising Differentiator (Appears when Digital Marketing or Programmatic Advertising is clicked) */}
      {(selectedDomain === "Digital Marketing" || selectedDomain === "Programmatic Advertising") && (
        <ProgrammaticDifferentiator />
      )}

      {/* 8. Cyber Security Differentiator (Appears when Cyber Security is clicked) */}
      {selectedDomain === "Cyber Security" && (
        <CyberSecurityDifferentiator />
      )}

      {/* 9. Digitechademy Learning Method */}
      <DigitechademyLearningMethod />

      {/* 10. Practical Learning */}
      <PracticalLearning />

      {/* 11. Who Is This For? */}
      <WhoIsThisFor />

      {/* 12. Career Readiness */}
      <CareerReadiness />

      {/* 13. FAQ */}
      <FaqSection />

      {/* 14. Final CTA */}
      <FinalCta />

      {/* Interactive Global Demo Class Modal */}
      <DemoClassModal />
    </SiteLayout>
  );
}

/**
 * Rotating Trust Highlights Tag (displays Practical Training, Industry Mentorship, Real-World Projects, Career-Focused Learning one by one)
 */
const TRUST_HIGHLIGHTS = [
  {
    icon: CheckCircle2,
    text: "Practical Training",
    textColor: "text-blue-700",
    iconColor: "text-blue-600",
    badgeClass: "bg-blue-50/85 border-blue-200/80 shadow-blue-500/5",
  },
  {
    icon: Users,
    text: "Industry Mentorship",
    textColor: "text-indigo-700",
    iconColor: "text-indigo-600",
    badgeClass: "bg-indigo-50/85 border-indigo-200/80 shadow-indigo-500/5",
  },
  {
    icon: Cpu,
    text: "Real-World Projects",
    textColor: "text-sky-700",
    iconColor: "text-sky-600",
    badgeClass: "bg-sky-50/85 border-sky-200/80 shadow-sky-500/5",
  },
  {
    icon: Award,
    text: "Career-Focused Learning",
    textColor: "text-emerald-700",
    iconColor: "text-emerald-600",
    badgeClass: "bg-emerald-50/85 border-emerald-200/80 shadow-emerald-500/5",
  },
];

function RotatingTrustBadge() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TRUST_HIGHLIGHTS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = TRUST_HIGHLIGHTS[index] ?? TRUST_HIGHLIGHTS[0]!;
  const IconComponent = current.icon;

  return (
    <div
      className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-3"
      data-reveal
      style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 shadow-xs transition-all duration-500",
          current.badgeClass
        )}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-live="polite"
      >
        <div
          key={index}
          className="flex items-center gap-2 animate-in fade-in slide-in-from-bottom-1 duration-300 text-xs sm:text-[13px] font-bold"
        >
          <IconComponent className={cn("size-3.5 sm:size-4 shrink-0", current.iconColor)} />
          <span className={cn("whitespace-nowrap font-bold", current.textColor)}>
            {current.text}
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * =========================================================================
 * 3. HERO & ANIMATED INTERACTIVE LAB SIMULATOR
 * =========================================================================
 */
const HERO_DOMAINS = [
  {
    id: "cyber",
    headlinePart1: "MASTER THE SKILLS.",
    headlinePart2: "CYBER SECURITY DEFENSE.",
    tagline: "Learn ethical hacking, SOC analysis, and Kali Linux sandboxes from seasoned practitioners.",
    accentGradient: "from-blue-600 via-sky-500 to-cyan-500",
    badgeLabel: "CYBER SECURITY • SOC LABS",
    badgeColor: "border-blue-300 bg-blue-50/90 text-blue-700",
  },
  {
    id: "programmatic",
    headlinePart1: "MASTER THE SKILLS.",
    headlinePart2: "PROGRAMMATIC ADVERTISING.",
    tagline: "Master DV360 DSP, CM360 ad serving, real-time bidding, and programmatic campaign strategies.",
    accentGradient: "from-blue-600 via-sky-500 to-cyan-500",
    badgeLabel: "PROGRAMMATIC ADVERTISING • DV360",
    badgeColor: "border-blue-300 bg-blue-50/90 text-blue-700",
  },
  {
    id: "growth",
    headlinePart1: "MASTER THE SKILLS.",
    headlinePart2: "PERFORMANCE MARKETING.",
    tagline: "Execute Google Ads, Meta campaigns, and GA4 analytics to drive measurable business growth.",
    accentGradient: "from-blue-600 via-sky-500 to-cyan-500",
    badgeLabel: "DIGITAL MARKETING • GA4 ANALYTICS",
    badgeColor: "border-sky-300 bg-sky-50/90 text-sky-700",
  },
];

function Hero({ onSelectDomain }: { onSelectDomain?: ((domain: string) => void) | undefined } = {}) {
  const [domainIndex, setDomainIndex] = useState(0);

  // Auto-cycle headline domain every 3.6s
  useEffect(() => {
    const timer = setInterval(() => {
      setDomainIndex((prev) => (prev + 1) % HERO_DOMAINS.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  const currentDomain = HERO_DOMAINS[domainIndex] ?? HERO_DOMAINS[0]!;

  return (
    <section className="relative overflow-hidden bg-white pb-6 pt-3 sm:pt-4 lg:pb-8 lg:pt-6">
      {/* Dynamic Background Tech & Data Transformation Video */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-30 mix-blend-multiply transition-opacity duration-1000 filter contrast-105"
        >
          <source src="/hero-tech-bg.mp4" type="video/mp4" />
          <source src="/hero-tech-bg-2.mp4" type="video/mp4" />
        </video>
        {/* Soft gradient masks to keep typography, badges and 3D cards 100% legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent" />
      </div>

      {/* High-tech matrix background grid overlay */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#3b82f6_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-[0.08] pointer-events-none"
        aria-hidden="true"
      />

      {/* Premium ambient glow orbs */}
      <div
        className="pointer-events-none absolute right-[-5%] sm:right-[5%] top-[5%] size-[18rem] sm:size-[38rem] rounded-full bg-gradient-to-tr from-sky-300/35 via-blue-200/25 to-transparent blur-3xl animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[-5%] sm:left-[5%] top-[20%] size-[16rem] sm:size-[32rem] rounded-full bg-gradient-to-br from-indigo-200/30 via-blue-100/35 to-transparent blur-3xl animate-pulse-glow"
        style={{ animationDelay: "2s" }}
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-12 items-center gap-8 lg:gap-8 xl:gap-14 w-full">
          {/* Left Column: Text & CTAs (7 cols on lg/xl) */}
          <div className="lg:col-span-7 w-full text-left flex flex-col justify-center min-w-0">
            {/* Eyebrow: INDUSTRY-LED • PRACTICAL • CAREER-FOCUSED */}
            <div
              className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200/90 bg-gradient-to-r from-blue-50/95 via-sky-50/80 to-indigo-50/95 px-3 py-1.5 sm:px-4 sm:py-1.5 shadow-[0_2px_12px_-2px_rgba(37,99,235,0.14)] backdrop-blur-md mb-3 sm:mb-3.5 w-fit transition-all duration-300 hover:border-blue-400 hover:shadow-[0_4px_16px_-2px_rgba(37,99,235,0.2)]"
              data-reveal
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[10px] xs:text-[11px] sm:text-xs font-black uppercase tracking-wider sm:tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 truncate">
                INDUSTRY-LED • PRACTICAL • CAREER-FOCUSED
              </span>
              <Sparkles className="size-3 text-amber-500 shrink-0 animate-pulse" aria-hidden="true" />
            </div>

            {/* Dynamic Animated H1 */}
            <h1
              className="text-[1.12rem] xs:text-[1.26rem] sm:text-[1.65rem] md:text-[1.85rem] lg:text-[1.8rem] xl:text-[2.15rem] 2xl:text-[2.4rem] font-black leading-[1.18] sm:leading-[1.14] tracking-tight text-slate-900"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              <span className="block">MASTER THE SKILLS.</span>
              <span
                key={currentDomain.id}
                className={cn(
                  "block text-transparent bg-clip-text bg-gradient-to-r break-words sm:break-normal animate-in fade-in slide-in-from-bottom-2 duration-500",
                  currentDomain.accentGradient,
                )}
              >
                {currentDomain.headlinePart2}
              </span>
            </h1>

            {/* Subheading */}
            <p
              className="mt-3.5 sm:mt-4 text-xs sm:text-[15px] lg:text-base text-slate-600 leading-relaxed max-w-lg lg:max-w-xl font-normal text-justify sm:text-left"
              data-reveal
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            >
              Learn Cyber Security, Programmatic Advertising &amp; Digital Marketing from industry practitioners through practical training, real-world scenarios, guided capstone projects and hands-on tool learning.
            </p>

            {/* Official Supporting Line: Learn. Practice. Build. Become Industry Ready. */}
            <div
              className="mt-3 sm:mt-3.5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-50/95 via-indigo-50/80 to-sky-50/90 border border-blue-200/90 px-3.5 py-1.5 shadow-2xs w-fit max-w-full"
              data-reveal
              style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
              </span>
              <span className="text-xs sm:text-[13px] font-extrabold text-blue-900 tracking-wide truncate">
                Learn. Practice. Build. Become Industry Ready.
              </span>
            </div>


            {/* CTAs: Explore Programs / Talk to an Expert (Side-by-side on mobile) */}
            <div
              className="mt-5 sm:mt-6 flex flex-row items-center gap-2 sm:gap-3.5 w-full max-w-md sm:max-w-none"
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            >
              <a
                href="#courses"
                onClick={(e) => {
                  e.preventDefault();
                  const coursesElem = document.getElementById("courses");
                  if (coursesElem) {
                    coursesElem.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="relative overflow-hidden flex-1 sm:flex-initial justify-center bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:brightness-110 text-white font-bold h-10.5 sm:h-12 px-2.5 sm:px-7 text-[11px] min-[380px]:text-xs sm:text-base rounded-xl shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all flex items-center gap-1.5 sm:gap-2 group whitespace-nowrap min-w-0"
              >
                {/* Subtle Shimmer Slide Effect */}
                <div
                  className="pointer-events-none absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-shimmer-slide"
                  aria-hidden="true"
                />
                <span className="relative z-10 truncate">Explore Programs</span>
                <ArrowRight className="relative z-10 size-3.5 sm:size-4 transition-transform group-hover:translate-x-1 shrink-0" aria-hidden="true" />
              </a>

              <BtnLink
                to="/request-call"
                variant="outline"
                size="md"
                className="flex-1 sm:flex-initial justify-center h-10.5 sm:h-12 px-2.5 sm:px-6 rounded-xl bg-white/95 hover:bg-slate-50 text-slate-800 font-bold border border-slate-300/90 shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 sm:gap-2 text-[11px] min-[380px]:text-xs sm:text-base active:scale-[0.98] cursor-pointer whitespace-nowrap min-w-0"
              >
                <span className="grid size-5 sm:size-6 place-items-center rounded-full bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                  <PhoneCall className="size-2.5 sm:size-3" aria-hidden="true" />
                </span>
                <span className="truncate">Talk to an Expert</span>
              </BtnLink>
            </div>

            {/* Rotating Trust Tag */}
            <RotatingTrustBadge />
          </div>

          {/* Right Column: Interactive 3D Cards Showcase Carousel (5 cols on lg/xl) */}
          <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-end mt-4 lg:mt-0" data-reveal="right">
            <Hero3DCardsCarousel onSelectDomain={onSelectDomain} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 4. USP / TRUST STRIP
 * =========================================================================
 */
function UspTrustStrip() {
  return (
    <section className="bg-white border-y border-slate-200/80 py-4 sm:py-5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]">
      <div className="container-site">
        {/* Row 1: Key Credible Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6 lg:divide-x lg:divide-slate-200/80">
          <div className="flex items-center gap-2 sm:gap-3 px-0.5 sm:px-4 min-w-0" data-reveal>
            <span className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
              <Users className="size-4 sm:size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-black text-slate-900 leading-none">
                <CountUp value={3} suffix="k+" />
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-1 leading-tight truncate">
                Learners Mentored
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 px-0.5 sm:px-4 min-w-0" data-reveal>
            <span className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-xs">
              <UserCheck className="size-4 sm:size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-black text-slate-900 leading-none">
                <CountUp value={10} suffix="" />
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-1 leading-tight truncate">
                Dedicated Mentors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 px-0.5 sm:px-4 min-w-0" data-reveal>
            <span className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 shadow-xs">
              <Cpu className="size-4 sm:size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-black text-slate-900 leading-none">
                <CountUp value={25} suffix="+" />
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-1 leading-tight truncate">
                Practical Projects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 px-0.5 sm:px-4 min-w-0" data-reveal>
            <span className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-xs">
              <Award className="size-4 sm:size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-lg sm:text-2xl font-black text-slate-900 leading-none">
                <CountUp value={100} suffix="%" />
              </p>
              <p className="text-[11px] sm:text-xs font-semibold text-slate-500 mt-1 leading-tight truncate">
                Placement Assistance
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 5. WHY DIGITECHADEMY
 * =========================================================================
 */
function WhyDigitechademy() {
  return (
    <section className="bg-white py-7 sm:py-10 overflow-hidden border-b border-slate-200/60">
      <div className="container-site grid items-center gap-6 lg:grid-cols-12 lg:gap-8 xl:gap-10">
        {/* Left Column: Visual graphic */}
        <div className="relative lg:col-span-5" data-reveal="left">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 shadow-xl bg-slate-950 aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] relative">
            <img
              src={aboutImg}
              alt="DIGITECHADEMY practical skills and industry training"
              loading="lazy"
              width={1200}
              height={1008}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/80 text-[10.5px] font-black uppercase tracking-wider text-sky-200 mb-1.5 backdrop-blur-xs">
                <Sparkles className="size-3" />
                LEARN • GROW • ACHIEVE
              </span>
              <p className="font-bold text-sm sm:text-base text-white">
                Learn practical skills. Build real-world confidence.
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                100% hands-on training with 10 dedicated mentors.
              </p>
            </div>
          </div>

          {/* Floating Pill Badge */}
          <div className="absolute -bottom-3 -right-2 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-3.5 shadow-lg hidden sm:flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <CheckCircle2 className="size-5" />
            </span>
            <div>
              <p className="font-display text-sm font-black text-slate-900">Career Ready</p>
              <p className="text-[11px] font-semibold text-slate-500">100% Placement Assistance</p>
            </div>
          </div>
        </div>

        {/* Right Column: Heading and 5 Exact Differentiators */}
        <div className="lg:col-span-7">
          <div data-reveal="right">
            <SectionHeading
              eyebrow="WHY DIGITECHADEMY"
              title="What Makes DIGITECHADEMY Different?"
              singleLine={false}
              align="left"
            />
          </div>

          <div className="mt-6 grid gap-2.5 sm:gap-3">
            {[
              {
                title: "Industry-Led Training",
                desc: "Learn concepts through an industry-focused lens, not just theory.",
                icon: Briefcase,
                color: "bg-blue-50 text-blue-700 border-blue-200",
                hoverBorder: "hover:border-blue-500",
                hoverGlow: "hover:shadow-blue-500/10",
                accentGradient: "group-hover:from-blue-50/60",
                barColor: "bg-blue-600",
              },
              {
                title: "Hands-On Practice",
                desc: "Practice the skills you are learning through exercises and realistic scenarios.",
                icon: Terminal,
                color: "bg-sky-50 text-sky-700 border-sky-200",
                hoverBorder: "hover:border-sky-500",
                hoverGlow: "hover:shadow-sky-500/10",
                accentGradient: "group-hover:from-sky-50/60",
                barColor: "bg-sky-500",
              },
              {
                title: "Build Work You Can Talk About",
                desc: "Use projects and practical outcomes to demonstrate what you can actually do.",
                icon: Award,
                color: "bg-blue-50 text-blue-700 border-blue-200",
                hoverBorder: "hover:border-blue-500",
                hoverGlow: "hover:shadow-blue-500/10",
                accentGradient: "group-hover:from-blue-50/60",
                barColor: "bg-blue-600",
              },
              {
                title: "Industry-Relevant Skills",
                desc: "Focus on tools, workflows and skills relevant to modern digital and technology roles.",
                icon: Target,
                color: "bg-sky-50 text-sky-700 border-sky-200",
                hoverBorder: "hover:border-sky-500",
                hoverGlow: "hover:shadow-sky-500/10",
                accentGradient: "group-hover:from-sky-50/60",
                barColor: "bg-sky-500",
              },
              {
                title: "Guidance, Not Just Content",
                desc: "Learn with structured guidance, feedback and practical direction.",
                icon: Users,
                color: "bg-blue-50 text-blue-700 border-blue-200",
                hoverBorder: "hover:border-blue-500",
                hoverGlow: "hover:shadow-blue-500/10",
                accentGradient: "group-hover:from-blue-50/60",
                barColor: "bg-blue-600",
              },
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.title}
                  data-reveal="left-to-right"
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                  className={cn(
                    "differentiator-card group relative flex items-start gap-3 rounded-xl border border-slate-300 bg-white p-3 sm:p-3.5 shadow-2xs overflow-hidden",
                    "transition-all duration-300 ease-out",
                    "hover:translate-x-1.5 sm:hover:translate-x-2.5 hover:-translate-y-0.5 hover:shadow-md",
                    "active:scale-[0.985] active:translate-x-0.5",
                    item.hoverBorder,
                    item.hoverGlow,
                  )}
                >
                  {/* Interactive left accent bar */}
                  <span
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-1 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-1.5",
                      item.barColor,
                    )}
                    aria-hidden="true"
                  />

                  {/* Subtle hover gradient background */}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 bg-gradient-to-r via-white to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                      item.accentGradient,
                    )}
                    aria-hidden="true"
                  />

                  {/* Icon badge with interactive rotate & scale */}
                  <span
                    className={cn(
                      "relative z-10 grid size-7.5 sm:size-8 shrink-0 place-items-center rounded-lg border mt-0.5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-2xs",
                      item.color,
                    )}
                  >
                    <ItemIcon className="size-3.5 sm:size-4 transition-transform duration-300" aria-hidden="true" />
                  </span>

                  {/* Text Details */}
                  <div className="relative z-10 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug transition-colors duration-200 group-hover:text-blue-950">
                        {item.title}
                      </h4>
                      <ChevronRight
                        className="size-3.5 text-slate-400 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 shrink-0 hidden sm:block"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed font-normal text-justify">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <BtnLink
              to="/courses"
              variant="primary"
              size="md"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm"
            >
              <span>Explore Programs</span>
              <ArrowRight className="size-3.5 ml-1.5" />
            </BtnLink>

            <BtnLink
              to="/about"
              variant="outline"
              size="md"
              className="border-slate-300 text-slate-800 hover:bg-slate-50 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm"
            >
              <span>About the Academy</span>
            </BtnLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 6. CORE PROGRAMS
 * =========================================================================
 */
type DomainTrack = {
  id: string;
  name: string;
  eyebrow: string;
  badgeStyle: string;
  title: string;
  description: string;
  icon: typeof ShieldCheck;
  iconBg: string;
  image: string;
  cardBorder: string;
  cardHoverBorder: string;
  cardBg: string;
  hoverShadow: string;
  btnHoverBg: string;
  skills: string[];
};

const DOMAIN_TRACKS: DomainTrack[] = [
  {
    id: "cyber-security",
    name: "Cyber Security",
    eyebrow: "DEFENSE & ETHICAL HACKING",
    badgeStyle: "bg-blue-50 text-blue-800 border-blue-200/90",
    title: "Cyber Security",
    description:
      "Master network defense, Linux administration, vulnerability assessment, and real-world ethical security testing.",
    icon: ShieldCheck,
    iconBg: "bg-blue-100 text-blue-700 ring-1 ring-blue-200/80",
    image: domainCyberSecurityImg,
    cardBorder: "border-slate-300",
    cardHoverBorder: "hover:border-blue-600",
    cardBg: "bg-gradient-to-b from-blue-50/30 via-white to-white",
    hoverShadow: "hover:shadow-xl hover:shadow-blue-500/10",
    btnHoverBg: "group-hover:bg-blue-600",
    skills: ["Ethical Hacking", "Network Defense", "Vulnerability Assessment", "Linux Security"],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    eyebrow: "GROWTH & PERFORMANCE",
    badgeStyle: "bg-sky-50 text-sky-800 border-sky-200/90",
    title: "Digital Marketing",
    description:
      "Drive measurable business growth across SEO, paid advertising campaigns, social media, and conversion analytics.",
    icon: Megaphone,
    iconBg: "bg-sky-100 text-sky-700 ring-1 ring-sky-200/80",
    image: domainDigitalMarketingImg,
    cardBorder: "border-slate-300",
    cardHoverBorder: "hover:border-sky-500",
    cardBg: "bg-gradient-to-b from-sky-50/30 via-white to-white",
    hoverShadow: "hover:shadow-xl hover:shadow-sky-500/10",
    btnHoverBg: "group-hover:bg-sky-600",
    skills: ["SEO Strategy", "Google & Meta Ads", "Social Media", "Conversion Analytics"],
  },
  {
    id: "programmatic-advertising",
    name: "Programmatic Advertising",
    eyebrow: "ADTECH & REAL-TIME BIDDING",
    badgeStyle: "bg-blue-50 text-blue-800 border-blue-200/90",
    title: "Programmatic Advertising",
    description:
      "Specialized enterprise media buying, real-time bidding (RTB), demand-side platforms (DV360), and AdTech analytics.",
    icon: Radio,
    iconBg: "bg-blue-100 text-blue-700 ring-1 ring-blue-200/80",
    image: domainProgrammaticAdsImg,
    cardBorder: "border-slate-300",
    cardHoverBorder: "hover:border-blue-600",
    cardBg: "bg-gradient-to-b from-blue-50/30 via-white to-white",
    hoverShadow: "hover:shadow-xl hover:shadow-blue-500/10",
    btnHoverBg: "group-hover:bg-blue-600",
    skills: ["DV360 & CM360", "Real-Time Bidding", "Audience Targeting", "DSP & SSP Platforms"],
  },
  {
    id: "ai-automation",
    name: "AI & Automation",
    eyebrow: "AI AGENTS & SMART WORKFLOWS",
    badgeStyle: "bg-amber-50 text-amber-800 border-amber-200/90",
    title: "AI & Automation",
    description:
      "Automate business operations, AI agents, Zapier workflows, and smart CRM integrations.",
    icon: Bot,
    iconBg: "bg-amber-100 text-amber-700 ring-1 ring-amber-200/80",
    image: domainAiAutomationImg,
    cardBorder: "border-slate-300",
    cardHoverBorder: "hover:border-amber-500",
    cardBg: "bg-gradient-to-b from-amber-50/30 via-white to-white",
    hoverShadow: "hover:shadow-xl hover:shadow-amber-500/10",
    btnHoverBg: "group-hover:bg-amber-600",
    skills: ["AI Agents", "Zapier & Webhooks", "CRM Automation", "Chatbot Funnels"],
  },
  {
    id: "fullstack-dev",
    name: "Full Stack Development",
    eyebrow: "REACT & NODE.JS ENGINEERING",
    badgeStyle: "bg-sky-50 text-sky-800 border-sky-200/90",
    title: "Full Stack Development",
    description:
      "Build scalable, high-performance modern web apps with React, Node.js, databases, and APIs.",
    icon: Code2,
    iconBg: "bg-sky-100 text-sky-700 ring-1 ring-sky-200/80",
    image: domainFullstackDevImg,
    cardBorder: "border-slate-300",
    cardHoverBorder: "hover:border-sky-500",
    cardBg: "bg-gradient-to-b from-sky-50/30 via-white to-white",
    hoverShadow: "hover:shadow-xl hover:shadow-sky-500/10",
    btnHoverBg: "group-hover:bg-sky-600",
    skills: ["React & TypeScript", "Node.js & Express", "Databases & APIs", "Full Stack Architecture"],
  },
];

function matchesDomain(course: FirebaseCourse, domainName: string): boolean {
  const cat = (course.category || "").toLowerCase();
  const slug = (course.slug || "").toLowerCase();
  const title = (course.title || "").toLowerCase();

  if (domainName === "Cyber Security") {
    return (
      cat.includes("cyber") ||
      cat.includes("security") ||
      slug.includes("cyber") ||
      slug.includes("hack") ||
      title.includes("cyber") ||
      title.includes("hack")
    );
  }

  if (domainName === "Programmatic Advertising") {
    return (
      cat.includes("programmatic") ||
      slug.includes("programmatic") ||
      title.includes("programmatic") ||
      slug.includes("adtech") ||
      title.includes("adtech")
    );
  }

  if (domainName === "Digital Marketing") {
    if (
      cat.includes("programmatic") ||
      slug.includes("programmatic") ||
      title.includes("programmatic")
    ) {
      return false;
    }
    return (
      cat.includes("market") ||
      slug.includes("digital-market") ||
      slug.includes("seo") ||
      title.includes("market") ||
      title.includes("seo")
    );
  }

  if (domainName === "AI & Automation") {
    return (
      cat.includes("ai") ||
      cat.includes("automation") ||
      slug.includes("ai") ||
      slug.includes("automation") ||
      title.includes("ai") ||
      title.includes("automation")
    );
  }

  if (domainName === "Full Stack Development") {
    return (
      cat.includes("web") ||
      cat.includes("stack") ||
      cat.includes("dev") ||
      slug.includes("full-stack") ||
      slug.includes("web") ||
      title.includes("full stack") ||
      title.includes("web")
    );
  }

  return false;
}

interface CoreProgramsProps {
  selectedDomain?: string | null | undefined;
  onSelectDomain?: ((domain: string | null) => void) | undefined;
}

function CorePrograms({
  selectedDomain: externalSelectedDomain,
  onSelectDomain,
}: CoreProgramsProps = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [internalSelectedDomain, setInternalSelectedDomain] = useState<string | null>(null);
  const selectedDomain = externalSelectedDomain !== undefined ? externalSelectedDomain : internalSelectedDomain;
  const setSelectedDomain = (val: string | null) => {
    if (onSelectDomain) {
      onSelectDomain(val);
    } else {
      setInternalSelectedDomain(val);
    }
  };
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const [liveCourses, setLiveCourses] = useState<FirebaseCourse[]>(() =>
    courses.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      category: normalizeCourseCategory(c.category, c.title, c.slug),
      description: c.description,
      duration: c.duration,
      level: c.level,
      instructor: c.instructors?.[0]?.name || "Lead Faculty",
      price: c.pricing?.fee || "₹24,999",
      highlights: c.highlights || [],
      syllabus: c.syllabus || [],
      students: 150,
      active: true,
      featured: true,
      image: c.image || "",
    })),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollToTrack = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-scroll loop
  useEffect(() => {
    if (!emblaApi || isAutoScrollPaused || selectedDomain) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3400);

    return () => clearInterval(interval);
  }, [emblaApi, isAutoScrollPaused, selectedDomain]);

  // Scroll to active domain track when selectedDomain is updated
  useEffect(() => {
    if (selectedDomain && emblaApi) {
      const idx = DOMAIN_TRACKS.findIndex((t) => t.name === selectedDomain);
      if (idx !== -1) {
        emblaApi.scrollTo(idx);
      }
    }
  }, [selectedDomain, emblaApi]);

  useEffect(() => {
    const unsub = subscribeCourses((coursesList) => {
      if (coursesList && coursesList.length > 0) {
        setLiveCourses(coursesList);
      }
    });
    return () => unsub();
  }, []);

  const activeCourses = useMemo(() => {
    return liveCourses.filter((c) => c.active !== false);
  }, [liveCourses]);

  // Dynamic counts for each domain
  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const track of DOMAIN_TRACKS) {
      counts[track.name] = activeCourses.filter((c) => matchesDomain(c, track.name)).length;
    }
    return counts;
  }, [activeCourses]);

  const displayedCourses = useMemo(() => {
    if (!selectedDomain) return [];
    return activeCourses.filter((c) => matchesDomain(c, selectedDomain));
  }, [activeCourses, selectedDomain]);

  const handleSelectDomain = (domainName: string | null) => {
    setSelectedDomain(domainName);
    if (sectionRef.current) {
      const topOffset = -70;
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + topOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const selectedTrack = DOMAIN_TRACKS.find((t) => t.name === selectedDomain);

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="bg-white py-7 sm:py-10 border-y border-slate-200/80 overflow-hidden"
    >
      <div className="container-site">
        {/* Section Header: Title on Left, Navigation Controls & Link Up on Right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-2 sm:mb-2.5" data-reveal>
          <div className="min-w-0">
            <div className="eyebrow text-xs inline-flex items-center gap-2 text-blue-700 mb-1.5">
              <span className="h-px w-5 sm:w-6 bg-blue-600" aria-hidden="true" />
              <span className="font-bold uppercase tracking-wider">CORE PROGRAMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.2]">
              Career-Oriented Training Tracks
            </h2>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 self-start sm:self-center shrink-0">
            {!selectedDomain && (
              <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/90 shadow-2xs">
                <button
                  type="button"
                  onClick={scrollPrev}
                  aria-label="Previous domain track"
                  className="p-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-white transition-all cursor-pointer shadow-none hover:shadow-xs active:scale-95"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={scrollNext}
                  aria-label="Next domain track"
                  className="p-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-white transition-all cursor-pointer shadow-none hover:shadow-xs active:scale-95"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            )}

            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
            >
              <span>View All Course Details</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <p className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal max-w-5xl mb-5 sm:mb-6" data-reveal>
          Select a specialized domain to explore dedicated hands-on programs, live lab environments, and job-ready technical curriculums.
        </p>

        {/* 5 Domain Cards with Auto-Scrolling Carousel */}
        <div>
          <div
            ref={emblaRef}
            onMouseEnter={() => setIsAutoScrollPaused(true)}
            onMouseLeave={() => setIsAutoScrollPaused(false)}
            onTouchStart={() => setIsAutoScrollPaused(true)}
            onTouchEnd={() => {
              setTimeout(() => setIsAutoScrollPaused(false), 2500);
            }}
            className="overflow-hidden p-1 -m-1 cursor-grab active:cursor-grabbing"
          >
            <div className="flex -ml-4 sm:-ml-5 py-2">
              {DOMAIN_TRACKS.map((track, idx) => {
                const TrackIcon = track.icon;
                const count = domainCounts[track.name] || 0;
                const isSelected = selectedDomain === track.name;
                const isSnapActive = selectedIndex === idx;

                return (
                  <div
                    key={track.id}
                    className="min-w-0 shrink-0 grow-0 pl-4 sm:pl-5 basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      onClick={() => handleSelectDomain(isSelected ? null : track.name)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleSelectDomain(isSelected ? null : track.name);
                        }
                      }}
                      className={cn(
                        "h-full core-program-card group relative flex flex-col justify-between rounded-xl p-4 sm:p-5 transition-all duration-200 cursor-pointer border shadow-2xs select-none",
                        track.cardBorder,
                        track.cardHoverBorder,
                        track.cardBg,
                        track.hoverShadow,
                        isSelected ? "ring-2 ring-blue-600 border-blue-600 bg-blue-50/25 shadow-md scale-[1.01]" : isSnapActive ? "ring-1 ring-blue-400/50" : "",
                        "hover:-translate-y-1 hover:shadow-md focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      )}
                    >
                      <div>
                        {/* Card 3D Image Banner */}
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-3.5 bg-slate-900 shadow-xs">
                          <img
                            src={track.image}
                            alt={track.title}
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-black/20" />

                          {/* Floating Icon & Eyebrow Badge */}
                          <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2 z-10">
                            <div className={cn("size-8 rounded-lg flex items-center justify-center backdrop-blur-md bg-white/95 shadow-xs", track.iconBg)}>
                              <TrackIcon className="size-4" />
                            </div>
                            <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider backdrop-blur-md bg-white/95 border shadow-xs", track.badgeStyle)}>
                              {track.eyebrow}
                            </span>
                          </div>
                        </div>

                        {/* Domain Main Heading */}
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {track.title}
                        </h3>
                      </div>

                      {/* Clean Compact Footer */}
                      <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                        <span>{count} {count === 1 ? "Program" : "Programs"}</span>
                        <span className={cn("inline-flex items-center gap-1 font-bold transition-colors", isSelected ? "text-blue-700" : "text-blue-600 group-hover:text-blue-700")}>
                          <span>{isSelected ? "Selected" : "Explore"}</span>
                          <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Carousel Indicator Dots & Auto-scroll State */}
          <div className="flex items-center justify-between mt-4 pt-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                {DOMAIN_TRACKS.map((track, i) => (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => scrollToTrack(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 cursor-pointer",
                      selectedIndex === i ? "w-7 bg-blue-600 shadow-xs" : "w-2 bg-slate-300 hover:bg-slate-400"
                    )}
                    aria-label={`Go to ${track.title}`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-slate-400 ml-1.5 hidden sm:inline">
                {selectedIndex + 1} / {DOMAIN_TRACKS.length}
              </span>
            </div>

            {/* Pause/Resume Auto-scroll Toggle */}
            <button
              type="button"
              onClick={() => setIsAutoScrollPaused((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-600 transition-colors cursor-pointer border border-slate-200/70"
              title={isAutoScrollPaused ? "Resume auto-scroll" : "Pause auto-scroll"}
            >
              <span className={cn("size-1.5 rounded-full", isAutoScrollPaused ? "bg-amber-500" : "bg-emerald-500 animate-pulse")} />
              <span>{isAutoScrollPaused ? "Auto-scroll: Paused" : "Auto-scrolling"}</span>
            </button>
          </div>
        </div>

        {/* Selected Domain Courses Grid (Rendered cleanly below cards without extra top bar) */}
        {selectedDomain && (
          <div className="mt-8 pt-6 border-t border-slate-200/80 space-y-4 animate-in fade-in duration-300">
            {displayedCourses.length > 0 ? (
              <div
                className={cn(
                  "gap-5 w-full",
                  displayedCourses.length === 1
                    ? "flex justify-center max-w-[320px] sm:max-w-[340px] mx-auto"
                    : displayedCourses.length === 2
                      ? "grid sm:grid-cols-2 max-w-2xl mx-auto"
                      : "grid sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
                )}
              >
                {displayedCourses.map((course, cIdx) => (
                  <div
                    key={course.id || course.slug}
                    data-reveal="bottom-to-up"
                    style={{ "--reveal-delay": `${cIdx * 100}ms` } as React.CSSProperties}
                    className="h-full"
                  >
                    <CourseCard
                      course={course as any}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-white rounded-2xl border border-slate-200/80">
                <p className="text-slate-600 text-sm">No active courses currently available in this domain.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 7. PROGRAMMATIC ADVERTISING DIFFERENTIATOR
 * =========================================================================
 */
function ProgrammaticDifferentiator() {
  const programmaticPillars = [
    {
      icon: Radio,
      badge: "Demand Side Platform",
      dotColor: "bg-sky-400",
      name: "DV360",
      desc: "Campaign planning, targeting, bidding and optimization.",
      color: "bg-sky-500/15 text-sky-400 border-sky-400/30 group-hover:bg-sky-500 group-hover:text-slate-950 group-hover:border-sky-400 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.4)]",
      hoverGlow: "from-sky-500/10",
      accentGradient: "from-sky-400 via-cyan-400 to-blue-500",
    },
    {
      icon: Server,
      badge: "Ad Server & Tracking",
      dotColor: "bg-blue-400",
      name: "CM360",
      desc: "Ad serving, tracking, attribution and campaign measurement.",
      color: "bg-blue-500/15 text-blue-400 border-blue-400/30 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400 group-hover:shadow-[0_0_18px_rgba(59,130,246,0.4)]",
      hoverGlow: "from-blue-500/10",
      accentGradient: "from-blue-400 via-sky-500 to-cyan-400",
    },
    {
      icon: Play,
      badge: "Video & Discovery",
      dotColor: "bg-sky-400",
      name: "YouTube Advertising",
      desc: "Audience strategy, video campaigns and performance analysis.",
      color: "bg-sky-500/15 text-sky-400 border-sky-400/30 group-hover:bg-sky-500 group-hover:text-slate-950 group-hover:border-sky-400 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.4)]",
      hoverGlow: "from-sky-500/10",
      accentGradient: "from-sky-400 via-cyan-400 to-blue-600",
    },
    {
      icon: Target,
      badge: "Audience Strategy",
      dotColor: "bg-blue-400",
      name: "Audience & Targeting",
      desc: "Understand how audiences are built, segmented and activated.",
      color: "bg-blue-500/15 text-blue-400 border-blue-400/30 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400 group-hover:shadow-[0_0_18px_rgba(59,130,246,0.4)]",
      hoverGlow: "from-blue-500/10",
      accentGradient: "from-blue-500 via-sky-500 to-cyan-400",
    },
    {
      icon: TrendingUp,
      badge: "Media Trader Decisions",
      dotColor: "bg-cyan-400",
      name: "Optimization",
      desc: "Learn how traders identify performance issues and make optimization decisions.",
      color: "bg-cyan-500/15 text-cyan-400 border-cyan-400/30 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 group-hover:shadow-[0_0_18px_rgba(6,182,212,0.4)]",
      hoverGlow: "from-cyan-500/10",
      accentGradient: "from-cyan-400 via-sky-500 to-blue-600",
    },
    {
      icon: BarChart3,
      badge: "Analytics & Attribution",
      dotColor: "bg-sky-400",
      name: "Reporting & Measurement",
      desc: "Turn campaign data into actionable media insights.",
      color: "bg-sky-500/15 text-sky-400 border-sky-400/30 group-hover:bg-sky-500 group-hover:text-slate-950 group-hover:border-sky-400 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.4)]",
      hoverGlow: "from-sky-500/10",
      accentGradient: "from-sky-400 via-blue-500 to-indigo-600",
    },
  ];

  const renderPillarCard = (
    item: (typeof programmaticPillars)[number],
    key: string,
  ) => {
    const ItemIcon = item.icon;
    return (
      <div
        key={key}
        className="programmatic-pillar-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 transition-all duration-300 ease-out hover:border-blue-400 hover:shadow-md cursor-default w-[290px] sm:w-[330px] md:w-[350px] shrink-0 min-h-[220px]"
      >
        {/* Top Accent Gradient Line that glides open */}
        <div
          className={cn(
            "absolute top-0 inset-x-0 h-1 bg-gradient-to-r transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100",
            item.accentGradient,
          )}
        />

        <div>
          {/* Card Top Row: Icon Badge & Platform Pill */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <span
              className={cn(
                "grid size-9 sm:size-9.5 place-items-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
                item.color,
              )}
            >
              <ItemIcon className="size-4.5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
            </span>
            <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[9.5px] font-bold text-slate-700 uppercase tracking-wider bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200 transition-all duration-300 group-hover:border-blue-400/50 group-hover:text-blue-700 group-hover:bg-blue-50">
              <span className={cn("size-1.5 rounded-full animate-pulse", item.dotColor)} />
              <span>{item.badge}</span>
            </span>
          </div>

          {/* Title & Description */}
          <div className="relative z-10 mt-3.5">
            <h3 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200">
              {item.name}
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600 group-hover:text-slate-800 font-normal transition-colors duration-200 text-justify">
              {item.desc}
            </p>
          </div>
        </div>

        {/* Bottom Micro Standard Indicator */}
        <div className="relative z-10 mt-4 pt-3 border-t border-slate-100 flex items-center text-[10.5px] font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3 text-emerald-600" />
            <span>Industry Framework</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <section id="programmatic-differentiator" className="bg-slate-50/80 relative py-7 sm:py-10 overflow-hidden border-t border-slate-200/80">
      <div className="container-site relative z-10">
        <div className="max-w-4xl lg:max-w-6xl flex flex-col sm:flex-row sm:items-end justify-between gap-4" data-reveal>
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700 mb-3 shadow-xs">
              <Radio className="size-3.5 text-blue-600 animate-pulse" />
              <span>GO BEYOND BASIC DIGITAL MARKETING</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-[1.2] tracking-tight whitespace-normal sm:whitespace-nowrap">
              Learn Programmatic Advertising{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600">
                From the Inside Out
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-5xl">
              Programmatic advertising isn't just about running ads. It's about understanding audiences, inventory, bidding, targeting, pacing, optimization, measurement and media performance.
            </p>
          </div>
        </div>

        {/* Auto-scrolling Single-Row Platform Pillars Marquee */}
        <div className="relative mt-5 -mx-4 sm:-mx-6 px-4 sm:px-6 overflow-hidden py-2" data-reveal>
          {/* Subtle gradient edge fades */}
          <div
            className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 z-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 z-20 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent"
            aria-hidden="true"
          />

          <div className="flex w-max animate-programmatic-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {/* Primary Track Set */}
            <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0">
              {programmaticPillars.map((item, index) => renderPillarCard(item, `pillar-a-${index}`))}
            </div>
            {/* Duplicated Track Set for Seamless Infinite Loop */}
            <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0" aria-hidden="true">
              {programmaticPillars.map((item, index) => renderPillarCard(item, `pillar-b-${index}`))}
            </div>
          </div>
        </div>

        {/* Signature Statement Banner */}
        <div
          className="mt-4 rounded-xl sm:rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 p-3.5 sm:p-4.5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 relative overflow-hidden"
          data-reveal
        >
          <div className="flex items-center gap-3">
            <span className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
              <Sparkles className="size-4.5" />
            </span>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                Signature Programmatic Philosophy
              </span>
              <p className="text-xs sm:text-sm md:text-[15px] font-black text-slate-900 tracking-wide mt-0.5 uppercase">
                DON’T JUST LEARN PROGRAMMATIC. LEARN HOW PROGRAMMATIC PROFESSIONALS THINK.
              </p>
            </div>
          </div>

          <BtnLink
            to="/courses/$slug"
            params={{ slug: "programmatic-advertising" }}
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs sm:text-[13px] shrink-0 whitespace-nowrap shadow-md shadow-blue-600/20 flex items-center gap-1.5"
          >
            <span>Explore Programmatic Masterclass</span>
            <ArrowRight className="size-3.5" />
          </BtnLink>
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 8. CYBER SECURITY DIFFERENTIATOR
 * =========================================================================
 */
function CyberSecurityDifferentiator() {
  const [activePhase, setActivePhase] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-scroll loop for mobile/tablet screens
  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  const phases = [
    {
      step: "01",
      title: "Understand",
      desc: "Networking protocols, OS architectures & core security foundations.",
      icon: ShieldCheck,
      image: cyberPhase1Img,
      badge: "FOUNDATIONS",
      dotColor: "bg-cyan-400 shadow-[0_0_8px_#22d3ee]",
      cardBorder: "border-cyan-500/25 hover:border-cyan-400/80 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)]",
      badgeStyle: "text-cyan-300 bg-cyan-950/80 border-cyan-500/30",
      iconStyle: "text-cyan-400 bg-cyan-500/10 border-cyan-500/30 group-hover:bg-cyan-500/20 group-hover:border-cyan-400",
      stepColor: "text-cyan-400 bg-cyan-950/90 border-cyan-500/40",
      glow: "from-cyan-500/15",
    },
    {
      step: "02",
      title: "Explore",
      desc: "Linux systems, web technologies & common vulnerability surfaces.",
      icon: Terminal,
      image: cyberPhase2Img,
      badge: "TOOLING & OS",
      dotColor: "bg-purple-400 shadow-[0_0_8px_#c084fc]",
      cardBorder: "border-purple-500/25 hover:border-purple-400/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]",
      badgeStyle: "text-purple-300 bg-purple-950/80 border-purple-500/30",
      iconStyle: "text-purple-400 bg-purple-500/10 border-purple-500/30 group-hover:bg-purple-500/20 group-hover:border-purple-400",
      stepColor: "text-purple-400 bg-purple-950/90 border-purple-500/40",
      glow: "from-purple-500/15",
    },
    {
      step: "03",
      title: "Practice",
      desc: "Hands-on guided lab environments & defensive configuration exercises.",
      icon: Cpu,
      image: cyberPhase3Img,
      badge: "HANDS-ON",
      dotColor: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
      cardBorder: "border-emerald-500/25 hover:border-emerald-400/80 hover:shadow-[0_0_25px_rgba(168,85,247,0.25)]",
      badgeStyle: "text-emerald-300 bg-emerald-950/80 border-emerald-500/30",
      iconStyle: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30 group-hover:bg-emerald-500/20 group-hover:border-emerald-400",
      stepColor: "text-emerald-400 bg-emerald-950/90 border-emerald-500/40",
      glow: "from-emerald-500/15",
    },
    {
      step: "04",
      title: "Test",
      desc: "Vulnerability assessment, pen-testing methods & ethical exploitation.",
      icon: Lock,
      image: cyberPhase4Img,
      badge: "ASSESSMENT",
      dotColor: "bg-amber-400 shadow-[0_0_8px_#fbbf24]",
      cardBorder: "border-amber-500/25 hover:border-amber-400/80 hover:shadow-[0_0_25px_rgba(245,158,11,0.25)]",
      badgeStyle: "text-amber-300 bg-amber-950/80 border-amber-500/30",
      iconStyle: "text-amber-400 bg-amber-500/10 border-amber-500/30 group-hover:bg-amber-500/20 group-hover:border-amber-400",
      stepColor: "text-amber-400 bg-amber-950/90 border-amber-500/40",
      glow: "from-amber-500/15",
    },
    {
      step: "05",
      title: "Apply",
      desc: "Realistic incident analysis, threat mitigation & live security scenarios.",
      icon: Target,
      image: cyberPhase5Img,
      badge: "REAL SCENARIOS",
      dotColor: "bg-pink-400 shadow-[0_0_8px_#f472b6]",
      cardBorder: "border-pink-500/25 hover:border-pink-400/80 hover:shadow-[0_0_25px_rgba(236,72,153,0.25)]",
      badgeStyle: "text-pink-300 bg-pink-950/80 border-pink-500/30",
      iconStyle: "text-pink-400 bg-pink-500/10 border-pink-500/30 group-hover:bg-pink-500/20 group-hover:border-pink-400",
      stepColor: "text-pink-400 bg-pink-950/90 border-pink-500/40",
      glow: "from-pink-500/15",
    },
  ];

  const hudVectors = [
    { icon: Search, label: "DETECT", color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/50" },
    { icon: BarChart3, label: "ANALYZE", color: "text-sky-400 border-sky-500/30 bg-sky-950/50" },
    { icon: ShieldCheck, label: "SECURE", color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/50" },
    { icon: Settings, label: "DEFEND", color: "text-indigo-400 border-indigo-500/30 bg-indigo-950/50" },
  ];

  return (
    <section
      id="cyber-security-differentiator"
      className="bg-[#030914] relative py-7 sm:py-9 overflow-hidden border-t border-b border-cyan-950/80"
    >
      {/* Cyber Security Background Image strictly positioned in top-right area with higher opacity */}
      <div className="pointer-events-none absolute top-0 right-0 w-full sm:w-[65%] lg:w-[50%] h-64 sm:h-72 lg:h-80 z-0 overflow-hidden">
        <img
          src={cyberHeroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-right-top opacity-65"
        />
        {/* Soft edge blend overlays so it fades smoothly into the dark section background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#030914] via-[#030914]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030914]/30 to-[#030914]" />
      </div>

      {/* High-tech Cyber Grid Background & Subtle Ambient Fades */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(34, 211, 238, 0.45) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -top-32 left-1/3 size-96 rounded-full bg-cyan-500/10 blur-[100px] z-0" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 size-96 rounded-full bg-blue-600/10 blur-[100px] z-0" aria-hidden="true" />

      <div className="container-site relative z-10">
        {/* Unified Compact Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5 sm:mb-6" data-reveal>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-950/70 px-3 py-1 text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-md mb-2.5 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <ShieldCheck className="size-3.5 text-cyan-400 animate-pulse" />
              <span>THINK LIKE A DEFENDER • TEST LIKE AN ETHICAL HACKER</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight">
              Build Practical{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                Cyber Security Skills
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl">
              Cyber Security is not learned by memorizing definitions. Learn how systems work, where vulnerabilities occur, and how security professionals identify, analyze, and respond to threats.
            </p>
          </div>

          {/* Right Action & Controls Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 self-start lg:self-end">
            <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl border border-slate-800 bg-slate-950/70 backdrop-blur-md">
              {hudVectors.map((hud) => {
                const HudIcon = hud.icon;
                return (
                  <span
                    key={hud.label}
                    className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-mono font-bold tracking-wider uppercase",
                      hud.color,
                    )}
                  >
                    <HudIcon className="size-3" />
                    <span>{hud.label}</span>
                  </span>
                );
              })}
            </div>

            {/* Mobile / Tablet Arrow Navigation Controls */}
            <div className="flex lg:hidden items-center gap-1 p-1 rounded-xl border border-slate-800 bg-slate-950/70 backdrop-blur-md">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous cyber phase"
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900 transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next cyber phase"
                className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900 transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <BtnLink
              to="/courses/$slug"
              params={{ slug: "cyber-security" }}
              variant="primary"
              size="sm"
              className="bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-black px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-xl text-xs shrink-0 whitespace-nowrap shadow-[0_0_20px_rgba(6,182,212,0.35)] flex items-center gap-1.5 hover:scale-[1.02] transition-all"
            >
              <span>Explore Cyber Track</span>
              <ArrowRight className="size-3.5" />
            </BtnLink>
          </div>
        </div>

        {/* 5-Step Connected Cyber Defense Pipeline Cards (Mobile/Tablet Carousel, Desktop 5-Col Row) */}
        <div
          ref={emblaRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="overflow-hidden p-1 -m-1 cursor-grab active:cursor-grabbing"
        >
          <div className="flex -ml-3 sm:-ml-3.5 py-1.5">
            {phases.map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="min-w-0 shrink-0 grow-0 pl-3 sm:pl-3.5 basis-[85%] sm:basis-[48%] md:basis-1/3 lg:basis-1/5"
                >
                  <Link
                    to="/courses/$slug"
                    params={{ slug: "cyber-security" }}
                    onMouseEnter={() => setActivePhase(index)}
                    onMouseLeave={() => setActivePhase(null)}
                    data-reveal="bottom-to-up"
                    style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                    className={cn(
                      "h-full group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#061122]/90 p-4 transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-pointer border backdrop-blur-md shadow-md shadow-black/40 select-none",
                      item.cardBorder,
                    )}
                  >
                    {/* Top Subtle Accent Gradient Glow */}
                    <div
                      className={cn(
                        "pointer-events-none absolute -top-10 -right-10 size-28 rounded-full bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500",
                        item.glow,
                      )}
                    />

                    <div className="relative z-10">
                      {/* Top Row: Step Tag + Category Pill */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={cn(
                            "text-[10px] font-mono font-black px-2 py-0.5 rounded-md border shadow-xs tracking-wider",
                            item.stepColor,
                          )}
                        >
                          PHASE {item.step}
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border",
                            item.badgeStyle,
                          )}
                        >
                          <span className={cn("size-1.5 rounded-full", item.dotColor)} />
                          <span>{item.badge}</span>
                        </span>
                      </div>

                      {/* Icon & Title Row */}
                      <div className="flex items-center gap-2.5 mb-2">
                        <span
                          className={cn(
                            "grid size-8.5 place-items-center rounded-xl border shrink-0 transition-transform duration-300 group-hover:scale-110",
                            item.iconStyle,
                          )}
                        >
                          <ItemIcon className="size-4.5" aria-hidden="true" />
                        </span>
                        <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      {/* Concise Description */}
                      <p className="text-[11.5px] leading-relaxed text-slate-300/90 font-normal">
                        {item.desc}
                      </p>
                    </div>

                    {/* Small Cyber 3D Illustration at Bottom (Square 1:1 Aspect Ratio - No Cropping) */}
                    <div className="relative z-10 mt-3.5 flex items-center justify-center overflow-hidden rounded-xl bg-slate-950/70 border border-white/10 p-2 group-hover:border-cyan-400/40 transition-colors duration-300">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="size-24 sm:size-28 object-contain transition-transform duration-500 group-hover:scale-105 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Carousel Indicator Dots */}
        <div className="flex lg:hidden justify-center items-center gap-1.5 mt-3.5">
          {phases.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                selectedIndex === i
                  ? "w-6 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  : "w-1.5 bg-slate-700 hover:bg-slate-600"
              )}
              aria-label={`Go to phase ${i + 1}`}
            />
          ))}
        </div>

        {/* Slim Cyber Philosophy Strip */}
        <div
          className="mt-3.5 sm:mt-4 rounded-xl border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-slate-900/60 to-blue-950/40 px-3.5 py-2.5 sm:px-4.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-300 backdrop-blur-md"
          data-reveal
        >
          <div className="flex items-center gap-2.5 text-slate-200 font-medium">
            <span className="grid size-6 place-items-center rounded-lg bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 shrink-0">
              <ShieldCheck className="size-3.5" />
            </span>
            <span className="text-[11px] sm:text-xs">
              <strong className="text-white font-bold">The Practical Defense Pathway:</strong> Structured progression from network fundamentals to real-world attack mitigation.
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10.5px] text-cyan-300/90 shrink-0">
            <span className="inline-block size-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>100% Practical Labs • Live Tooling</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 9. DIGITECHADEMY LEARNING METHOD
 * =========================================================================
 */
function DigitechademyLearningMethod() {
  return (
    <section id="methodology" className="bg-white relative py-5 sm:py-8 overflow-hidden border-t border-slate-200/80">
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="DIGITECHADEMY LEARNING METHOD"
          title="From Concept Architecture to Real-World Mastery"
          description="Our structured 5-stage progressive pathway takes you from fundamental principles to building defensible, portfolio-grade project deliverables."
          align="left"
        />

        {/* 5-Step Progressive Learning Path Component */}
        <div className="mt-3.5" data-reveal>
          <StudentLearningPath />
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 10. PRACTICAL LEARNING — "DON'T JUST WATCH. DO."
 * =========================================================================
 */
function PracticalLearning() {
  const [activeCard, setActiveCard] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through the cards every 2.8s when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % practicalTraining.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="bg-slate-50/80 py-7 sm:py-10 overflow-hidden border-b border-slate-200/80">
      <div className="container-site">
        {/* Header Row: Title & Badges on Left, Action Buttons Up on Right */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2.5 sm:mb-3" data-reveal="left">
          <div className="min-w-0 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase mb-2">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
              PRACTICAL LEARNING
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2] whitespace-normal sm:whitespace-nowrap">
              Don’t Just Watch. Do.
            </h2>

            <p className="mt-1 text-sm sm:text-base font-bold text-blue-600">
              Learn By Solving Real-World Problems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 self-start md:self-center">
            <BtnLink
              to="/courses"
              variant="primary"
              size="md"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 sm:h-11 px-5 sm:px-6 rounded-xl inline-flex items-center gap-2 shadow-sm text-xs sm:text-sm"
            >
              <span>Explore Hands-On Syllabus</span>
              <ArrowRight className="size-4" />
            </BtnLink>
          </div>
        </div>

        {/* Paragraph brought below across full width, wrapping cleanly */}
        <p className="mb-5 sm:mb-6 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-5xl" data-reveal="left">
          At Digitechademy, practical learning is not an optional add-on. You'll work through exercises, projects, case studies, tools and realistic scenarios designed to help you understand how professionals approach real problems.
        </p>

        {/* 5 Practical Learning Cards Grid Across Full Width */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {practicalTraining.map((item, index) => {
            const isActive = index === activeCard;
            return (
              <article
                key={item.title}
                onClick={() => setActiveCard(index)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border p-4 sm:p-4.5 shadow-xs transition-all duration-300 ease-out cursor-pointer active:scale-[0.99] flex flex-col justify-between",
                  isActive
                    ? "border-blue-500 bg-white shadow-xl shadow-blue-500/10 -translate-y-1.5 ring-1 ring-blue-400/40"
                    : "border-slate-200/90 bg-white/90 hover:border-blue-400 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5",
                  index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                )}
              >
                  {/* Top Animated Accent Border Gradient */}
                  <div
                    className={cn(
                      "absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 transition-transform duration-300 origin-left",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />

                  {/* Subtle Hover & Active Radial Ambient Glow */}
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-50/50 via-transparent to-transparent transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}
                  />

                  <div className="relative z-10 flex flex-col">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "grid size-8 sm:size-8.5 shrink-0 place-items-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md",
                          isActive
                            ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/30 scale-105 rotate-3"
                            : "bg-blue-50 text-blue-600 border-blue-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                        )}
                      >
                        <Icon name={item.icon} className="size-4 sm:size-4.5 transition-transform duration-300 group-hover:scale-110" />
                      </span>

                      <h3
                        className={cn(
                          "text-xs sm:text-[13px] font-black leading-tight transition-all duration-200 min-w-0 flex-1",
                          isActive
                            ? "text-blue-700 translate-x-0.5"
                            : "text-slate-900 group-hover:text-blue-600 group-hover:translate-x-0.5"
                        )}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <p className="mt-2 text-xs text-slate-600 group-hover:text-slate-700 leading-relaxed font-normal transition-colors duration-200 text-left">
                      {item.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

        {/* Closing Line Callout */}
        <div className="mt-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-3.5 sm:p-4.5 text-white shadow-md border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <div className="grid size-9 sm:size-10 place-items-center rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 shrink-0">
              <Sparkles className="size-4.5 text-blue-300" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-blue-300/90">Closing Philosophy</p>
              <p className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-white mt-0.5">
                Knowledge Gets You Started. <span className="text-blue-400">Practice Makes You Job Ready.</span>
              </p>
            </div>
          </div>
          <BtnLink
            to="/request-call"
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl shrink-0 text-xs sm:text-[13px] shadow-sm flex items-center gap-1.5"
          >
            <span>Talk to a Mentor</span>
            <ArrowRight className="size-3.5" />
          </BtnLink>
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 14. WHO IS DIGITECHADEMY FOR?
 * =========================================================================
 */
function WhoIsThisFor() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Auto-play interval (3.5s)
  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  return (
    <section className="bg-white py-7 sm:py-10 overflow-hidden border-b border-slate-200/80">
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-4xl" data-reveal="left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase mb-3">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
              WHO IS DIGITECHADEMY FOR?
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2] whitespace-normal sm:whitespace-nowrap">
              Programs Structured for Distinct Career Aspirations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-4xl">
              Whether launching your first career, transitioning domains, or upgrading into high-paying specialized fields, DIGITECHADEMY provides clear, guided entry points.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto" data-reveal="right">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="size-10 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="size-10 rounded-full border border-slate-300 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div
          className="mt-6 overflow-hidden p-1 -m-1 cursor-grab active:cursor-grabbing"
          ref={emblaRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="flex -ml-4 py-2">
            {whoIsForAudience.map((persona, index) => {
              return (
                <div
                  key={persona.title}
                  className="min-w-0 shrink-0 grow-0 pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full group relative rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all duration-300 hover:border-blue-500/40 hover:bg-white hover:shadow-md hover:-translate-y-0.5 select-none">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          <Icon name={persona.icon} className="size-5.5" />
                        </span>
                        <span className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wider bg-slate-200/70 px-2.5 py-0.5 rounded-full">
                          {persona.badge}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-[10px] font-bold text-blue-600/80 bg-blue-50 px-1.5 py-0.5 rounded">
                          0{index + 1}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {persona.title}
                        </h3>
                      </div>

                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal text-justify">
                        {persona.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-200/70 flex items-center gap-2 text-[11.5px] font-semibold text-blue-700">
                      <Check className="size-3.5 text-emerald-600 shrink-0" />
                      <span>{persona.highlight}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Dots / Pagination */}
        <div className="flex justify-center items-center gap-1.5 mt-5">
          {whoIsForAudience.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                selectedIndex === i
                  ? "w-7 bg-blue-600 shadow-xs"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 15. CAREER READINESS
 * =========================================================================
 */
function CareerReadiness() {
  return (
    <section className="bg-white relative py-7 sm:py-10 lg:py-12 overflow-hidden border-b border-slate-200/80">
      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
          
          {/* Left Column: Visual Student Frame with Royal Blue Accent Backdrop */}
          <div className="lg:col-span-5 relative" data-reveal="left">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Royal Blue / Indigo Geometric Accent Backdrop Box */}
              <div
                className="absolute -top-3 -left-3 sm:-top-3.5 sm:-left-3.5 w-3/4 h-full rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 -z-10 shadow-lg shadow-blue-600/20 opacity-95"
                aria-hidden="true"
              />

              {/* Main Student Image Frame */}
              <div className="relative overflow-hidden rounded-3xl border-2 border-white shadow-xl bg-slate-900 aspect-[4/4.2] sm:aspect-[4/4]">
                <img
                  src={careerReadinessStudentImg}
                  alt="Student with laptop giving thumbs up"
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Pill Badge */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md flex items-center gap-2.5">
                  <span className="grid size-8 sm:size-9 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-xs">
                    <CheckCircle2 className="size-4.5 sm:size-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-extrabold text-xs sm:text-[13px] text-slate-900 leading-tight">
                      100% Practical Training
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-semibold text-slate-500 truncate">
                      Job-Ready Skills &amp; Placement Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Concise Highlight Cards & Framework */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4" data-reveal="right">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase mb-2">
                <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
                CAREER READINESS
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                We are the best in <span className="text-blue-600">training...</span>
              </h2>

              <p className="mt-1 text-xs sm:text-[13px] font-semibold text-slate-500">
                Learn with your next career move in mind.
              </p>
            </div>

            {/* Primary Blue Highlight Card */}
            <div className="rounded-2xl border border-blue-100/90 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-blue-50/70 p-3.5 sm:p-4 shadow-2xs">
              <div className="flex items-start gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-blue-600 text-white shadow-2xs mt-0.5">
                  <Check className="size-3.5 stroke-[3]" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 font-medium">
                    Our industry-aligned curriculum is crafted to match global technology standards, providing you with strong practical foundations to excel in modern roles worldwide.
                  </p>
                </div>
              </div>
            </div>

            {/* Assured Job Assistance Card */}
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3.5 sm:p-4 shadow-2xs">
              <div className="flex items-start gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-2xs mt-0.5">
                  <Check className="size-3.5 stroke-[3]" />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-[13px] font-extrabold text-slate-900 leading-snug">
                    Assured Job Assistance &amp; Placement Support
                  </h3>
                  <p className="mt-0.5 text-[11.5px] sm:text-xs text-slate-600 leading-relaxed font-normal">
                    Resume optimization, mock technical interview preparation, and direct hiring partner referrals.
                  </p>
                </div>
              </div>
            </div>

            {/* The Core Framework Strip */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-3.5 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-blue-700">The Core Framework</span>
                  <p className="text-xs sm:text-[13px] font-bold text-slate-900">
                    A certificate alone doesn&apos;t build a career.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-1.5 bg-slate-50 border border-slate-200 px-2 py-1 rounded-xl">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[10.5px] font-bold">
                    Skills
                  </span>
                  <span className="text-slate-400 font-bold text-xs">+</span>
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200 text-sky-700 text-[10.5px] font-bold">
                    Practice
                  </span>
                  <span className="text-slate-400 font-bold text-xs">+</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-200 text-blue-700 text-[10.5px] font-bold">
                    Projects
                  </span>
                  <span className="text-slate-400 font-bold text-xs">+</span>
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 border border-sky-200 text-sky-700 text-[10.5px] font-bold">
                    Confidence
                  </span>
                  <span className="text-blue-600 font-bold text-xs">=</span>
                  <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white text-[10.5px] font-black tracking-tight shadow-xs">
                    Career Ready
                  </span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-0.5 flex flex-wrap items-center gap-2.5">
              <BtnLink
                to="/courses"
                variant="primary"
                size="md"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4.5 py-2 rounded-xl text-xs sm:text-[13px] shadow-sm flex items-center gap-1.5"
              >
                <span>Explore Career Programs</span>
                <ArrowRight className="size-3.5" />
              </BtnLink>

              <BtnLink
                to="/request-call"
                variant="outline"
                size="md"
                className="border-slate-300 text-slate-800 hover:bg-slate-50 font-bold px-4.5 py-2 rounded-xl text-xs sm:text-[13px]"
              >
                <span>Talk to a Career Mentor</span>
              </BtnLink>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}



/**
 * =========================================================================
 * 17. FAQ — EXACT QUESTIONS & ANSWERS
 * =========================================================================
 */
function FaqSection() {
  const midIndex = Math.ceil(homeFaqs.length / 2);
  const leftFaqs = homeFaqs.slice(0, midIndex);
  const rightFaqs = homeFaqs.slice(midIndex);

  return (
    <section className="relative bg-white py-7 sm:py-10 overflow-hidden border-b border-slate-200/80">
      {/* Soft ambient gradient accents */}
      <div
        className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-blue-500/5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 size-80 rounded-full bg-sky-500/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        {/* Section Header: Title on Left, Action Buttons Up on Right */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2.5 sm:mb-3" data-reveal="top">
          <div className="min-w-0 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase mb-2">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
              FAQ — QUESTIONS &amp; ANSWERS
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2] whitespace-normal sm:whitespace-nowrap">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Buttons placed up on the right */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 self-start md:self-center">
            <BtnLink
              to="/faq"
              variant="outline"
              size="md"
              className="border-slate-300 text-slate-800 hover:bg-slate-100/80 font-bold px-4.5 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs"
            >
              <span>View All Questions</span>
              <ArrowRight className="size-3.5 ml-1.5" />
            </BtnLink>

            <BtnLink
              to="/contact"
              variant="outline"
              size="md"
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4.5 py-2.5 rounded-xl text-xs sm:text-sm border border-blue-200 shadow-xs"
            >
              <span>Ask a Counselor</span>
            </BtnLink>
          </div>
        </div>

        {/* Paragraph brought below across full width, wrapping cleanly */}
        <p className="mb-5 sm:mb-6 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-5xl" data-reveal="top">
          Find clear, straightforward answers about eligibility, hands-on learning, offered programs, prerequisites, and certifications at DIGITECHADEMY.
        </p>

        {/* FAQs Side by Side in 2 Balanced Columns */}
        <div className="grid gap-5 lg:gap-6 md:grid-cols-2 items-start" data-reveal="bottom">
          <FaqAccordion items={leftFaqs} defaultOpen={0} />
          <FaqAccordion items={rightFaqs} defaultOpen={null} />
        </div>
      </div>
    </section>
  );
}


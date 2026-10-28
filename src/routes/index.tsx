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
import heroImg from "@/assets/hero-tech.jpg";
import heroStudentImg from "@/assets/hero-student.jpg";
import cyberHeroBg from "@/assets/cyber-hero-bg.jpg";
import cyberPhase1Img from "@/assets/cyber-phase1-3d.jpg";
import cyberPhase2Img from "@/assets/cyber-phase2-3d.jpg";
import cyberPhase3Img from "@/assets/cyber-phase3-3d.jpg";
import cyberPhase4Img from "@/assets/cyber-phase4-3d.jpg";
import cyberPhase5Img from "@/assets/cyber-phase5-3d.jpg";
import domainCyberSecurityImg from "@/assets/domain-cyber-security.jpg";
import domainDigitalMarketingImg from "@/assets/domain-digital-marketing.jpg";
import domainProgrammaticAdsImg from "@/assets/domain-programmatic-ads.jpg";
import { BtnLink } from "@/components/site/Btn";
import { CourseCard } from "@/components/site/CourseCard";
import { CountUp } from "@/components/site/CountUp";
import { DemoClassModal } from "@/components/site/DemoClassModal";
import { Icon } from "@/components/site/Icon";
import { StudentLearningPath } from "@/components/site/StudentLearningPath";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { HeroCarousel } from "@/components/site/HeroCarousel";
import { AlumniWorkplaceStrip } from "@/components/site/AlumniWorkplaceStrip";
import { practicalTraining, whoIsForAudience } from "@/data/content";
import { courses } from "@/data/courses";
import {
  subscribeCourses,
  normalizeCourseCategory,
  type FirebaseCourse,
} from "@/services/courseService";

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
      {/* 3. Hero Carousel */}
      <HeroCarousel onSelectDomain={setSelectedDomain} />

      {/* 4. USP / Trust Strip */}
      <UspTrustStrip />

      {/* Where Our Alumni Work (Auto-scrolling Left to Right) */}
      <AlumniWorkplaceStrip />

      {/* 5. Why Digitechademy */}
      <WhyDigitechademy />

      {/* 6. Core Programs */}
      <CorePrograms selectedDomain={selectedDomain} onSelectDomain={setSelectedDomain} />

      {/* 7. Programmatic Advertising Differentiator (Appears when Digital Marketing or Programmatic Advertising is clicked) */}
      {(selectedDomain === "Digital Marketing" ||
        selectedDomain === "Programmatic Advertising") && <ProgrammaticDifferentiator />}

      {/* 8. Cyber Security Differentiator (Appears when Cyber Security is clicked) */}
      {selectedDomain === "Cyber Security" && <CyberSecurityDifferentiator />}

      {/* 9. Digitechademy Learning Method */}
      <DigitechademyLearningMethod />

      {/* 10. Practical Learning */}
      <PracticalLearning />

      {/* 11. Who Is This For? */}
      <WhoIsThisFor />

      {/* Interactive Global Demo Class Modal */}
      <DemoClassModal />
    </SiteLayout>
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
            <span className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#0C4FA8] border border-blue-100 shadow-xs">
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
            <span className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#E14E2E] border border-orange-100 shadow-xs">
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
            <span className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#0C4FA8] border border-blue-100 shadow-xs">
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
            <span className="grid size-9 sm:size-11 shrink-0 place-items-center rounded-xl bg-orange-50 text-[#E14E2E] border border-orange-100 shadow-xs">
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
 * 5. WHY DIGITECHADEMY — COMPACT PREMIUM 5-PILLAR SHOWCASE (ZERO GAPS)
 * =========================================================================
 */
function WhyDigitechademy() {
  const row1Cards = [
    {
      step: "01",
      eyebrow: "PRACTICAL PEDAGOGY",
      title: "Industry-Led Training",
      desc: "Learn concepts through an industry-focused lens, not just theory. Curriculum structured around active company workflows, live agency briefs, and real operational demands.",
      icon: Briefcase,
      iconBg: "bg-blue-50 text-[#0C4FA8] border-blue-200/80",
      accentBorder: "hover:border-[#0C4FA8]",
      accentLine: "from-[#0C4FA8] to-[#0C4FA8]",
      pills: ["Live Agency Briefs", "Real-World Projects", "Zero Dry Theory"],
    },
    {
      step: "02",
      eyebrow: "ACTIVE APPLICATION",
      title: "Hands-On Practice",
      desc: "Practice the skills you are learning through exercises, live consoles, sandbox labs, and realistic scenarios instead of passive video lectures.",
      icon: Terminal,
      iconBg: "bg-orange-50 text-[#E14E2E] border-orange-200/80",
      accentBorder: "hover:border-[#E14E2E]",
      accentLine: "from-[#E14E2E] to-[#E14E2E]",
      pills: ["Command Line & Consoles", "Interactive Sandboxes", "Real-Time Problem Solving"],
    },
  ];

  const row2Cards = [
    {
      step: "03",
      eyebrow: "PORTFOLIO DELIVERABLES",
      title: "Build Work You Can Talk About",
      desc: "Use capstone projects and documented performance outcomes to demonstrate your capabilities with tangible proof during hiring interviews.",
      icon: Award,
      iconBg: "bg-blue-50 text-[#0C4FA8] border-blue-200/80",
      accentBorder: "hover:border-[#0C4FA8]",
      accentLine: "from-[#0C4FA8] to-[#0C4FA8]",
      pills: ["Campaign Case Studies", "Security Audit Reports", "Interview Portfolio"],
    },
    {
      step: "04",
      eyebrow: "ENTERPRISE TOOLSTACK",
      title: "Industry-Relevant Skills",
      desc: "Focus on modern tools, enterprise workflows (DV360, Meta Ads, Wireshark, Linux, GA4) relevant to current digital & technology roles.",
      icon: Target,
      iconBg: "bg-orange-50 text-[#E14E2E] border-orange-200/80",
      accentBorder: "hover:border-[#E14E2E]",
      accentLine: "from-[#E14E2E] to-[#E14E2E]",
      pills: ["DV360 & CM360", "Meta & Google Ads", "Linux & Wireshark"],
    },
    {
      step: "05",
      eyebrow: "PERSONALIZED SUPPORT",
      title: "Guidance, Not Just Content",
      desc: "Learn with structured guidance, personalized feedback, continuous support and practical direction from experienced practitioners.",
      icon: Users,
      iconBg: "bg-blue-50 text-[#0C4FA8] border-blue-200/80",
      accentBorder: "hover:border-[#0C4FA8]",
      accentLine: "from-[#0C4FA8] via-[#E14E2E] to-[#0C4FA8]",
      pills: ["Personalized Reviews", "Doubt Clearing", "Career Coaching"],
    },
  ];

  const allCards = [...row1Cards, ...row2Cards];

  const renderCard = (
    item: (typeof row1Cards)[0],
    idx: number,
    cardClass?: string
  ) => {
    const ItemIcon = item.icon;
    return (
      <div
        key={item.title}
        data-reveal="bottom-to-up"
        style={{ "--reveal-delay": `${idx * 70}ms` } as React.CSSProperties}
        className={cn(
          "group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-2xs",
          "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50",
          item.accentBorder,
          cardClass
        )}
      >
        {/* Top Accent Line */}
        <div
          className={cn(
            "absolute top-0 inset-x-0 h-1 rounded-t-2xl bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            item.accentLine
          )}
          aria-hidden="true"
        />

        <div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <span
              className={cn(
                "grid size-10 place-items-center rounded-xl border shadow-2xs transition-transform duration-300 group-hover:scale-105",
                item.iconBg
              )}
            >
              <ItemIcon className="size-5 stroke-[2.2]" />
            </span>

            <span className="text-[11px] font-bold tracking-wider text-slate-400 group-hover:text-[#0C4FA8] transition-colors uppercase font-mono">
              {item.step} // 05
            </span>
          </div>

          <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest text-[#0C4FA8] mb-1">
            {item.eyebrow}
          </span>

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#0C4FA8] transition-colors">
            {item.title}
          </h3>

          <p className="mt-1.5 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
            {item.desc}
          </p>
        </div>

        {/* Tight bottom tags without hollow gap */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
          {item.pills.map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center text-[10.5px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200/80"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-8 sm:py-12 lg:py-16 bg-white overflow-hidden border-b border-slate-200/80">
      <div className="container-site relative z-10">
        {/* Section Header: Left Aligned */}
        <div className="text-left max-w-4xl" data-reveal="left">
          <div className="eyebrow text-xs inline-flex items-center gap-2 text-[#0C4FA8] mb-2">
            <span className="h-px w-5 sm:w-6 bg-[#0C4FA8]" aria-hidden="true" />
            <span className="font-bold uppercase tracking-wider">WHY DIGITECHADEMY</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
            What Makes{" "}
            <span className="text-[#0C4FA8]">
              DIGITECH
            </span>
            <span className="text-[#E14E2E]">
              ADEMY
            </span>{" "}
            Different?
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal max-w-3xl">
            We eliminate outdated theory and passive tutorials. Our industry-focused training is
            built around live tools, real projects, and 1-on-1 mentorship so you build true workplace
            competence.
          </p>
        </div>

        {/* Mobile View (< md): Single Horizontal Scrolling Row */}
        <div className="mt-6 md:hidden">
          <div className="flex items-center justify-between mb-2.5 px-0.5 text-xs font-semibold text-slate-500">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">5 Pillars</span>
            <span className="text-[11px] font-medium text-[#0C4FA8] flex items-center gap-1">
              Scroll across →
            </span>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 no-scrollbar touch-pan-x scroll-smooth">
            {allCards.map((item, idx) =>
              renderCard(item, idx, "w-[82vw] max-w-[310px] shrink-0 snap-start")
            )}
          </div>
        </div>

        {/* Desktop / Tablet View (>= md): 2 Structured Grid Rows */}
        <div className="hidden md:block">
          {/* Top Row: 2 Key Foundations (Equal Width & Compact Height) */}
          <div className="mt-8 grid grid-cols-2 gap-5">
            {row1Cards.map((item, idx) => renderCard(item, idx))}
          </div>

          {/* Bottom Row: 3 Focus Pillars (Equal Height & Compact Flow) */}
          <div className="mt-5 grid grid-cols-3 gap-5">
            {row2Cards.map((item, idx) => renderCard(item, idx + 2))}
          </div>
        </div>

        {/* High-Impact Highlighted Benchmark Banner */}
        <div
          id="benchmark-banner"
          data-reveal="bottom-to-up"
          className="mt-8 rounded-2xl border border-blue-700/60 bg-[#0C4FA8] p-4 sm:p-5 text-white shadow-xl shadow-blue-900/25 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-5"
        >
          {/* Ambient Glow Effects */}
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-16 -bottom-16 size-48 rounded-full bg-[#E14E2E]/25 blur-3xl" />

          {/* Highlight Badges */}
          <div className="relative z-10 flex flex-wrap items-center gap-2 sm:gap-2.5 justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md shadow-xs transition-transform duration-200 hover:scale-[1.02]">
              <span className="grid size-5 place-items-center rounded-lg bg-[#E14E2E] border border-orange-400/40 text-white shrink-0">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
              </span>
              <span className="text-xs sm:text-[13px] font-extrabold text-white tracking-tight whitespace-nowrap">
                100% Hands-On Labs
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md shadow-xs transition-transform duration-200 hover:scale-[1.02]">
              <span className="grid size-5 place-items-center rounded-lg bg-[#E14E2E] border border-orange-400/40 text-white shrink-0">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
              </span>
              <span className="text-xs sm:text-[13px] font-extrabold text-white tracking-tight whitespace-nowrap">
                10+ Dedicated Mentors
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md shadow-xs transition-transform duration-200 hover:scale-[1.02]">
              <span className="grid size-5 place-items-center rounded-lg bg-[#E14E2E] border border-orange-400/40 text-white shrink-0">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
              </span>
              <span className="text-xs sm:text-[13px] font-extrabold text-white tracking-tight whitespace-nowrap">
                Live Capstone Projects
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md shadow-xs transition-transform duration-200 hover:scale-[1.02]">
              <span className="grid size-5 place-items-center rounded-lg bg-[#E14E2E] border border-orange-400/40 text-white shrink-0">
                <CheckCircle2 className="size-3.5 stroke-[2.5]" />
              </span>
              <span className="text-xs sm:text-[13px] font-extrabold text-white tracking-tight whitespace-nowrap">
                1:1 Placement Support
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="relative z-10 flex items-center gap-2 sm:gap-2.5 shrink-0 w-full sm:w-auto justify-center">
            <BtnLink
              to="/courses"
              variant="primary"
              size="sm"
              className="bg-[#E14E2E] hover:bg-[#be391d] text-white font-extrabold px-3.5 sm:px-4.5 py-2 rounded-xl text-xs sm:text-sm shadow-md shadow-orange-950/20 ring-2 ring-white/20 transition-all hover:scale-[1.03] active:scale-[0.98] flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <span>Explore Programs</span>
              <ArrowRight className="size-3.5" />
            </BtnLink>
            <BtnLink
              to="/request-call"
              variant="outline"
              size="sm"
              className="border border-white bg-white hover:bg-slate-100 text-[#0C4FA8] font-extrabold px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm transition-all hover:scale-[1.03] active:scale-[0.98] whitespace-nowrap shadow-sm cursor-pointer"
            >
              <span>Talk to an Expert</span>
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
  selectedDomain,
  onSelectDomain,
}: CoreProgramsProps = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);
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

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="bg-white py-8 sm:py-12 border-y border-slate-200/80 overflow-hidden"
    >
      <div className="container-site">
        {/* Section Header: Title on Left, Link on Right */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-3 sm:mb-4"
          data-reveal
        >
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
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap"
            >
              <span>View All Course Details</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
        <p
          className="text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed font-normal max-w-4xl mb-6 sm:mb-8"
          data-reveal
        >
          Explore our specialized career tracks. Select any domain below to view complete in-depth
          program details, practical curriculums, live lab environments, and career outcomes.
        </p>

        {/* 3 Domain Cards in a Responsive Grid (Mobile 1 col, Tablet 2 col, Desktop 3 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {DOMAIN_TRACKS.map((track) => {
            const TrackIcon = track.icon;
            const count = domainCounts[track.name] || 0;

            return (
              <Link
                key={track.id}
                to="/courses/$slug"
                params={{ slug: track.id }}
                className={cn(
                  "core-program-card group relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 transition-all duration-300 border shadow-2xs select-none bg-white",
                  track.cardBorder,
                  track.cardHoverBorder,
                  track.cardBg,
                  track.hoverShadow,
                  "hover:-translate-y-1.5 hover:shadow-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500",
                )}
              >
                <div>
                  {/* Card 3D Image Banner */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl mb-4 bg-slate-900 shadow-xs">
                    <img
                      src={track.image}
                      alt={track.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                    {/* Floating Icon & Eyebrow Badge */}
                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between gap-2 z-10">
                      <div
                        className={cn(
                          "size-8 rounded-lg flex items-center justify-center backdrop-blur-md bg-white/95 shadow-xs",
                          track.iconBg,
                        )}
                      >
                        <TrackIcon className="size-4" />
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider backdrop-blur-md bg-white/95 border shadow-xs",
                          track.badgeStyle,
                        )}
                      >
                        {track.eyebrow}
                      </span>
                    </div>
                  </div>

                  {/* Domain Main Heading */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {track.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed line-clamp-3">
                    {track.description}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {track.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100/90 text-slate-700 border border-slate-200/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Clean Compact Footer */}
                <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="text-slate-500">
                    {count} {count === 1 ? "Program" : "Programs"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span>View Program Details</span>
                    <ArrowRight className="size-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
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
      color:
        "bg-sky-500/15 text-sky-400 border-sky-400/30 group-hover:bg-sky-500 group-hover:text-slate-950 group-hover:border-sky-400 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.4)]",
      hoverGlow: "from-sky-500/10",
      accentGradient: "from-sky-400 via-cyan-400 to-blue-500",
    },
    {
      icon: Server,
      badge: "Ad Server & Tracking",
      dotColor: "bg-blue-400",
      name: "CM360",
      desc: "Ad serving, tracking, attribution and campaign measurement.",
      color:
        "bg-blue-500/15 text-blue-400 border-blue-400/30 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400 group-hover:shadow-[0_0_18px_rgba(59,130,246,0.4)]",
      hoverGlow: "from-blue-500/10",
      accentGradient: "from-blue-400 via-sky-500 to-cyan-400",
    },
    {
      icon: Play,
      badge: "Video & Discovery",
      dotColor: "bg-sky-400",
      name: "YouTube Advertising",
      desc: "Audience strategy, video campaigns and performance analysis.",
      color:
        "bg-sky-500/15 text-sky-400 border-sky-400/30 group-hover:bg-sky-500 group-hover:text-slate-950 group-hover:border-sky-400 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.4)]",
      hoverGlow: "from-sky-500/10",
      accentGradient: "from-sky-400 via-cyan-400 to-blue-600",
    },
    {
      icon: Target,
      badge: "Audience Strategy",
      dotColor: "bg-blue-400",
      name: "Audience & Targeting",
      desc: "Understand how audiences are built, segmented and activated.",
      color:
        "bg-blue-500/15 text-blue-400 border-blue-400/30 group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-400 group-hover:shadow-[0_0_18px_rgba(59,130,246,0.4)]",
      hoverGlow: "from-blue-500/10",
      accentGradient: "from-blue-500 via-sky-500 to-cyan-400",
    },
    {
      icon: TrendingUp,
      badge: "Media Trader Decisions",
      dotColor: "bg-cyan-400",
      name: "Optimization",
      desc: "Learn how traders identify performance issues and make optimization decisions.",
      color:
        "bg-cyan-500/15 text-cyan-400 border-cyan-400/30 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 group-hover:shadow-[0_0_18px_rgba(6,182,212,0.4)]",
      hoverGlow: "from-cyan-500/10",
      accentGradient: "from-cyan-400 via-sky-500 to-blue-600",
    },
    {
      icon: BarChart3,
      badge: "Analytics & Attribution",
      dotColor: "bg-sky-400",
      name: "Reporting & Measurement",
      desc: "Turn campaign data into actionable media insights.",
      color:
        "bg-sky-500/15 text-sky-400 border-sky-400/30 group-hover:bg-sky-500 group-hover:text-slate-950 group-hover:border-sky-400 group-hover:shadow-[0_0_18px_rgba(56,189,248,0.4)]",
      hoverGlow: "from-sky-500/10",
      accentGradient: "from-sky-400 via-blue-500 to-indigo-600",
    },
  ];

  const renderPillarCard = (item: (typeof programmaticPillars)[number], key: string) => {
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
              <ItemIcon
                className="size-4.5 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
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
        <div className="relative z-10 mt-4 pt-3 border-t border-slate-100 flex items-center text-[10.5px] font-semibold text-slate-500 group-hover:text-[#0C4FA8] transition-colors">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3 text-[#0C4FA8]" />
            <span>Industry Framework</span>
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="programmatic-differentiator"
      className="bg-slate-50/80 relative py-7 sm:py-10 overflow-hidden border-t border-slate-200/80"
    >
      <div className="container-site relative z-10">
        <div
          className="max-w-4xl lg:max-w-6xl flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          data-reveal
        >
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0C4FA8] mb-3 shadow-xs">
              <Radio className="size-3.5 text-[#0C4FA8] animate-pulse" />
              <span>GO BEYOND BASIC DIGITAL MARKETING</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-[1.2] tracking-tight whitespace-normal sm:whitespace-nowrap">
              Learn Programmatic Advertising{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0C4FA8] to-[#E14E2E]">
                From the Inside Out
              </span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-5xl">
              Programmatic advertising isn't just about running ads. It's about understanding
              audiences, inventory, bidding, targeting, pacing, optimization, measurement and media
              performance.
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
              {programmaticPillars.map((item, index) =>
                renderPillarCard(item, `pillar-a-${index}`),
              )}
            </div>
            {/* Duplicated Track Set for Seamless Infinite Loop */}
            <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0" aria-hidden="true">
              {programmaticPillars.map((item, index) =>
                renderPillarCard(item, `pillar-b-${index}`),
              )}
            </div>
          </div>
        </div>

        {/* Signature Statement Banner */}
        <div
          className="mt-4 rounded-xl sm:rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/80 via-white to-orange-50/60 p-3.5 sm:p-4.5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 relative overflow-hidden"
          data-reveal
        >
          <div className="flex items-center gap-3">
            <span className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-xl bg-[#0C4FA8] text-white shadow-md">
              <Sparkles className="size-4.5" />
            </span>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[#0C4FA8]">
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
    [emblaApi],
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
      dotColor: "bg-[#0C4FA8]",
      cardBorder:
        "border-slate-200 hover:border-[#0C4FA8] hover:shadow-md",
      badgeStyle: "text-[#0C4FA8] bg-blue-50 border-blue-200",
      iconStyle:
        "text-[#0C4FA8] bg-blue-50 border-blue-200 group-hover:bg-[#0C4FA8] group-hover:text-white",
      stepColor: "text-[#0C4FA8] bg-blue-50 border-blue-200",
      glow: "from-blue-500/10",
    },
    {
      step: "02",
      title: "Explore",
      desc: "Linux systems, web technologies & common vulnerability surfaces.",
      icon: Terminal,
      image: cyberPhase2Img,
      badge: "TOOLING & OS",
      dotColor: "bg-[#E14E2E]",
      cardBorder:
        "border-slate-200 hover:border-[#E14E2E] hover:shadow-md",
      badgeStyle: "text-[#E14E2E] bg-orange-50 border-orange-200",
      iconStyle:
        "text-[#E14E2E] bg-orange-50 border-orange-200 group-hover:bg-[#E14E2E] group-hover:text-white",
      stepColor: "text-[#E14E2E] bg-orange-50 border-orange-200",
      glow: "from-orange-500/10",
    },
    {
      step: "03",
      title: "Practice",
      desc: "Hands-on guided lab environments & defensive configuration exercises.",
      icon: Cpu,
      image: cyberPhase3Img,
      badge: "HANDS-ON",
      dotColor: "bg-[#0C4FA8]",
      cardBorder:
        "border-slate-200 hover:border-[#0C4FA8] hover:shadow-md",
      badgeStyle: "text-[#0C4FA8] bg-blue-50 border-blue-200",
      iconStyle:
        "text-[#0C4FA8] bg-blue-50 border-blue-200 group-hover:bg-[#0C4FA8] group-hover:text-white",
      stepColor: "text-[#0C4FA8] bg-blue-50 border-blue-200",
      glow: "from-blue-500/10",
    },
    {
      step: "04",
      title: "Test",
      desc: "Vulnerability assessment, pen-testing methods & ethical exploitation.",
      icon: Lock,
      image: cyberPhase4Img,
      badge: "ASSESSMENT",
      dotColor: "bg-[#E14E2E]",
      cardBorder:
        "border-slate-200 hover:border-[#E14E2E] hover:shadow-md",
      badgeStyle: "text-[#E14E2E] bg-orange-50 border-orange-200",
      iconStyle:
        "text-[#E14E2E] bg-orange-50 border-orange-200 group-hover:bg-[#E14E2E] group-hover:text-white",
      stepColor: "text-[#E14E2E] bg-orange-50 border-orange-200",
      glow: "from-orange-500/10",
    },
    {
      step: "05",
      title: "Apply",
      desc: "Realistic incident analysis, threat mitigation & live security scenarios.",
      icon: Target,
      image: cyberPhase5Img,
      badge: "REAL SCENARIOS",
      dotColor: "bg-[#0C4FA8]",
      cardBorder:
        "border-slate-200 hover:border-[#0C4FA8] hover:shadow-md",
      badgeStyle: "text-[#0C4FA8] bg-blue-50 border-blue-200",
      iconStyle:
        "text-[#0C4FA8] bg-blue-50 border-blue-200 group-hover:bg-[#0C4FA8] group-hover:text-white",
      stepColor: "text-[#0C4FA8] bg-blue-50 border-blue-200",
      glow: "from-blue-500/10",
    },
  ];

  const hudVectors = [
    { icon: Search, label: "DETECT", color: "text-[#0C4FA8] border-blue-200 bg-blue-50/70" },
    { icon: BarChart3, label: "ANALYZE", color: "text-[#E14E2E] border-orange-200 bg-orange-50/70" },
    {
      icon: ShieldCheck,
      label: "SECURE",
      color: "text-[#0C4FA8] border-blue-200 bg-blue-50/70",
    },
    {
      icon: Settings,
      label: "DEFEND",
      color: "text-[#E14E2E] border-orange-200 bg-orange-50/70",
    },
  ];

  return (
    <section
      id="cyber-security-differentiator"
      className="bg-white relative py-7 sm:py-9 overflow-hidden border-t border-b border-slate-200"
    >
      <div className="container-site relative z-10">
        {/* Unified Compact Header */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-5 sm:mb-6"
          data-reveal
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#0C4FA8] mb-2.5 shadow-xs">
              <ShieldCheck className="size-3.5 text-[#E14E2E]" />
              <span>THINK LIKE A DEFENDER • TEST LIKE AN ETHICAL HACKER</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Build Practical{" "}
              <span className="text-[#0C4FA8]">
                Cyber Security Skills
              </span>
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal max-w-2xl">
              Cyber Security is not learned by memorizing definitions. Learn how systems work, where
              vulnerabilities occur, and how security professionals identify, analyze, and respond
              to threats.
            </p>
          </div>

          {/* Right Action & Controls Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 shrink-0 self-start lg:self-end">
            <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-xl border border-slate-200 bg-slate-50">
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
            <div className="flex lg:hidden items-center gap-1 p-1 rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Previous cyber phase"
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#0C4FA8] hover:bg-slate-100 transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Next cyber phase"
                className="p-1.5 rounded-lg text-slate-500 hover:text-[#0C4FA8] hover:bg-slate-100 transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <BtnLink
              to="/courses/$slug"
              params={{ slug: "cyber-security" }}
              variant="primary"
              size="sm"
              className="bg-[#E14E2E] hover:bg-[#be391d] text-white font-extrabold px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-xl text-xs shrink-0 whitespace-nowrap shadow-md shadow-orange-500/20 flex items-center gap-1.5 hover:scale-[1.02] transition-all cursor-pointer"
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
                      "h-full group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-4 transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-pointer border shadow-sm select-none",
                      item.cardBorder,
                    )}
                  >
                    <div className="relative z-10">
                      {/* Top Row: Step Tag + Category Pill */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={cn(
                            "text-[10px] font-mono font-black px-2 py-0.5 rounded-md border shadow-2xs tracking-wider",
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
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#0C4FA8] transition-colors">
                          {item.title}
                        </h3>
                      </div>

                      {/* Concise Description */}
                      <p className="text-[11.5px] leading-relaxed text-slate-600 font-normal">
                        {item.desc}
                      </p>
                    </div>

                    {/* Small Cyber 3D Illustration at Bottom */}
                    <div className="relative z-10 mt-3.5 flex items-center justify-center overflow-hidden rounded-xl bg-slate-50 border border-slate-200 p-2 group-hover:border-blue-300 transition-colors duration-300">
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="size-24 sm:size-28 object-contain transition-transform duration-500 group-hover:scale-105"
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
                  ? "w-6 bg-[#0C4FA8]"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400",
              )}
              aria-label={`Go to phase ${i + 1}`}
            />
          ))}
        </div>

        {/* Slim Cyber Philosophy Strip */}
        <div
          className="mt-3.5 sm:mt-4 rounded-xl border border-blue-200 bg-blue-50/70 px-3.5 py-2.5 sm:px-4.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs text-slate-700"
          data-reveal
        >
          <div className="flex items-center gap-2.5 font-medium">
            <span className="grid size-6 place-items-center rounded-lg bg-[#E14E2E] text-white shrink-0">
              <ShieldCheck className="size-3.5" />
            </span>
            <span className="text-[11px] sm:text-xs text-slate-700">
              <strong className="text-[#0C4FA8] font-bold">The Practical Defense Pathway:</strong>{" "}
              Structured progression from network fundamentals to real-world attack mitigation.
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10.5px] text-[#0C4FA8] font-bold shrink-0">
            <span className="inline-block size-1.5 rounded-full bg-[#E14E2E] animate-pulse" />
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
    <section
      id="methodology"
      className="bg-white relative py-5 sm:py-8 overflow-hidden border-t border-slate-200/80"
    >
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
        <div
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2.5 sm:mb-3"
          data-reveal="left"
        >
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
        <p
          className="mb-5 sm:mb-6 text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-5xl"
          data-reveal="left"
        >
          At Digitechademy, practical learning is not an optional add-on. You'll work through
          exercises, projects, case studies, tools and realistic scenarios designed to help you
          understand how professionals approach real problems.
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
                  index === 4 ? "sm:col-span-2 lg:col-span-1" : "",
                )}
              >
                {/* Top Animated Accent Border Gradient */}
                <div
                  className={cn(
                    "absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 transition-transform duration-300 origin-left",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />

                {/* Subtle Hover & Active Radial Ambient Glow */}
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-50/50 via-transparent to-transparent transition-opacity duration-300",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                  )}
                />

                <div className="relative z-10 flex flex-col">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "grid size-8 sm:size-8.5 shrink-0 place-items-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md",
                        isActive
                          ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/30 scale-105 rotate-3"
                          : "bg-blue-50 text-blue-600 border-blue-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600",
                      )}
                    >
                      <Icon
                        name={item.icon}
                        className="size-4 sm:size-4.5 transition-transform duration-300 group-hover:scale-110"
                      />
                    </span>

                    <h3
                      className={cn(
                        "text-xs sm:text-[13px] font-black leading-tight transition-all duration-200 min-w-0 flex-1",
                        isActive
                          ? "text-blue-700 translate-x-0.5"
                          : "text-slate-900 group-hover:text-blue-600 group-hover:translate-x-0.5",
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
              <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-bold text-blue-300/90">
                Closing Philosophy
              </p>
              <p className="text-xs sm:text-sm md:text-base font-bold tracking-tight text-white mt-0.5">
                Knowledge Gets You Started.{" "}
                <span className="text-blue-400">Practice Makes You Job Ready.</span>
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
    [emblaApi],
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
              Whether launching your first career, transitioning domains, or upgrading into
              high-paying specialized fields, DIGITECHADEMY provides clear, guided entry points.
            </p>
          </div>

          {/* Navigation Controls */}
          <div
            className="flex items-center gap-2.5 shrink-0 self-end md:self-auto"
            data-reveal="right"
          >
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

                    <div className="mt-4 pt-3.5 border-t border-slate-200/70 flex items-center gap-2 text-[11.5px] font-semibold text-[#0C4FA8]">
                      <Check className="size-3.5 text-[#0C4FA8] shrink-0" />
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
                  ? "w-7 bg-[#0C4FA8] shadow-xs"
                  : "w-2 bg-slate-300 hover:bg-slate-400",
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

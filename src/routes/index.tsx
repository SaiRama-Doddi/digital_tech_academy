import { useEffect, useRef, useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronRight,
  Cpu,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  Lock,
  Megaphone,
  PhoneCall,
  Play,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import aboutImg from "@/assets/about-training.jpg";
import heroImg from "@/assets/hero-tech.jpg";
import heroStudentImg from "@/assets/hero-student.jpg";
import { BtnLink } from "@/components/site/Btn";
import { CourseCard } from "@/components/site/CourseCard";
import { CountUp } from "@/components/site/CountUp";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { DemoClassModal } from "@/components/site/DemoClassModal";
import { Icon } from "@/components/site/Icon";
import { StudentLearningPath } from "@/components/site/StudentLearningPath";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { homeFaqs, practicalTraining, whoIsForAudience, careerReadinessPillars } from "@/data/content";
import { courses } from "@/data/courses";
import { subscribeCourses, type FirebaseCourse } from "@/services/courseService";

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
 * 13. Genuine Testimonials (only when avail)-> <GenuineTestimonials />
 * 14. FAQ                                  -> <FaqSection />
 * 15. Final CTA                            -> <FinalCta />
 * 16. Footer                               -> Provided by SiteLayout (Footer)
 * =========================================================================
 */
function Home() {
  return (
    <SiteLayout>
      {/* 3. Hero */}
      <Hero />

      {/* 4. USP / Trust Strip */}
      <UspTrustStrip />

      {/* 5. Why Digitechademy */}
      <WhyDigitechademy />

      {/* 6. Core Programs */}
      <CorePrograms />

      {/* 7. Programmatic Advertising Differentiator */}
      <ProgrammaticDifferentiator />

      {/* 8. Cyber Security Differentiator */}
      <CyberSecurityDifferentiator />

      {/* 9. Digitechademy Learning Method */}
      <DigitechademyLearningMethod />

      {/* 10. Practical Learning */}
      <PracticalLearning />

      {/* 11. Who Is This For? */}
      <WhoIsThisFor />

      {/* 12. Career Readiness */}
      <CareerReadiness />

      {/* 13. Genuine Testimonials (only when available) */}
      <GenuineTestimonials />

      {/* 14. FAQ */}
      <FaqSection />

      {/* 15. Final CTA */}
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
          "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 shadow-xs transition-all duration-500 select-none",
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
 * 3. HERO
 * =========================================================================
 */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/50 via-white to-slate-50/40 pb-8 pt-4 sm:pt-6 lg:pb-10 lg:pt-6">
      {/* Soft ambient background glow */}
      <div
        className="pointer-events-none absolute right-[5%] top-[8%] size-[36rem] rounded-full bg-gradient-to-tr from-sky-200/40 to-blue-200/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[15%] top-[20%] size-[28rem] rounded-full bg-blue-100/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative z-10 overflow-x-clip sm:overflow-visible">
        <div className="grid lg:grid-cols-2 items-center gap-8 lg:gap-10 xl:gap-14 w-full">
          {/* Left Column: Text & CTAs */}
          <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl text-left flex flex-col justify-center min-w-0">
            {/* Eyebrow: INDUSTRY-LED • PRACTICAL • CAREER-FOCUSED */}
            <div
              className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200/80 bg-gradient-to-r from-blue-50/90 via-sky-50/60 to-indigo-50/90 px-2.5 py-1 sm:px-3.5 sm:py-1.5 shadow-[0_2px_10px_-2px_rgba(37,99,235,0.12)] backdrop-blur-md mb-3 sm:mb-4 w-fit select-none transition-all duration-300 hover:border-blue-300 hover:shadow-[0_4px_14px_-2px_rgba(37,99,235,0.18)]"
              data-reveal
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
              </span>
              <span className="text-[9.5px] xs:text-[10.5px] sm:text-xs font-black uppercase tracking-wider sm:tracking-[0.14em] text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 whitespace-nowrap">
                INDUSTRY-LED • PRACTICAL • CAREER-FOCUSED
              </span>
              <Sparkles className="size-2.5 sm:size-3 text-blue-500/80 shrink-0" aria-hidden="true" />
            </div>

            {/* H1: MASTER THE SKILLS. BUILD REAL-WORLD EXPERIENCE. (Strictly 2 lines) */}
            <h1
              className="text-[1.05rem] xs:text-[1.2rem] sm:text-[1.45rem] md:text-[1.75rem] lg:text-[1.65rem] xl:text-[2.05rem] 2xl:text-[2.25rem] font-black leading-[1.2] sm:leading-[1.15] tracking-tight text-slate-900"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              <span className="block whitespace-nowrap">MASTER THE SKILLS.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 whitespace-nowrap">
                BUILD REAL-WORLD EXPERIENCE.
              </span>
            </h1>

            {/* Subheading: Learn Cyber Security, Programmatic Advertising & Digital Marketing from industry practitioners... */}
            <p
              className="mt-3.5 sm:mt-4 text-xs sm:text-base text-slate-600 leading-relaxed max-w-lg font-normal text-justify [text-align:justify] [text-justify:inter-word]"
              data-reveal
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            >
              Learn Cyber Security, Programmatic Advertising &amp; Digital Marketing from industry practitioners through practical training, real-world scenarios, guided projects and hands-on learning.
            </p>

            {/* Supporting line: Learn. Practice. Build. Become Industry Ready. */}
            <div
              className="mt-3 sm:mt-3.5 inline-flex items-center gap-2 rounded-lg bg-blue-50/80 border border-blue-100/90 px-3 py-1.5 w-fit"
              data-reveal
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            >
              <span className="size-1.5 rounded-full bg-blue-600 shrink-0" />
              <span className="text-xs sm:text-[13px] font-bold text-blue-800 tracking-wide">
                Learn. Practice. Build. Become Industry Ready.
              </span>
            </div>

            {/* CTAs: Explore Programs / Talk to an Expert */}
            <div
              className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3.5"
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            >
              <BtnLink
                to="/courses"
                variant="primary"
                size="md"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 sm:h-12 px-4.5 sm:px-7 text-xs sm:text-base rounded-xl shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center gap-1.5 sm:gap-2 group"
              >
                <span>Explore Programs</span>
                <ArrowRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </BtnLink>

              <BtnLink
                to="/request-call"
                variant="outline"
                size="md"
                className="h-10 sm:h-12 px-4 sm:px-6 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-300/90 shadow-xs hover:shadow-sm transition-all flex items-center gap-2 text-xs sm:text-base active:scale-[0.98] cursor-pointer"
              >
                <span className="grid size-5 sm:size-6 place-items-center rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                  <PhoneCall className="size-2.5 sm:size-3" aria-hidden="true" />
                </span>
                <span>Talk to an Expert</span>
              </BtnLink>
            </div>

            {/* Rotating Trust Tag: Practical Training, Industry Mentorship, Real-World Projects, Career-Focused Learning */}
            <RotatingTrustBadge />
          </div>

          {/* Right Column: Hero Visual Graphic */}
          <div className="relative w-full flex justify-center lg:justify-end mt-4 lg:mt-0 select-none">
            <div
              className="relative w-full max-w-[480px] sm:max-w-[540px] lg:max-w-none rounded-3xl p-3 sm:p-4"
              data-reveal="right"
            >
              {/* Central Hero Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-slate-900/10 border border-white/80 aspect-[16/11] sm:aspect-[16/10] bg-slate-950">
                <img
                  src={heroImg}
                  alt="DIGITECHADEMY training lab simulation"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                  width={960}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-bold tracking-wide uppercase">Live Cloud Sandbox Active</span>
                  </div>
                  <span className="text-[11px] font-semibold text-sky-300">100% Hands-On</span>
                </div>
              </div>

              {/* Floating Bottom Trust Pill Strip */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 w-full max-w-full px-2 sm:max-w-none flex justify-center pointer-events-none">
                <div className="pointer-events-auto inline-flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md px-3 sm:px-4 py-1 sm:py-1.5 text-[9px] sm:text-[11px] font-bold text-slate-800 text-center whitespace-nowrap">
                  <span>Practical Training</span>
                  <span className="text-slate-300 font-normal">•</span>
                  <span>Industry Mentorship</span>
                  <span className="text-slate-300 font-normal">•</span>
                  <span>Real-World Projects</span>
                  <span className="text-slate-300 font-normal">•</span>
                  <span>Career-Focused</span>
                </div>
              </div>
            </div>
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
    <section className="bg-white border-y border-slate-200/80 py-6 sm:py-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] select-none">
      <div className="container-site">
        {/* Row 1: Key Credible Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:divide-x lg:divide-slate-200/80">
          <div className="flex items-center gap-3 px-1 sm:px-4" data-reveal>
            <span className="grid size-10 sm:size-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
              <Users className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
                <CountUp value={3} suffix="k+" />
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-1 leading-tight">
                Learners Mentored
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-1 sm:px-4" data-reveal>
            <span className="grid size-10 sm:size-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-xs">
              <UserCheck className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
                <CountUp value={10} suffix="" />
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-1 leading-tight">
                Dedicated Mentors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-1 sm:px-4" data-reveal>
            <span className="grid size-10 sm:size-11 shrink-0 place-items-center rounded-xl bg-sky-50 text-sky-600 border border-sky-100 shadow-xs">
              <Cpu className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
                <CountUp value={25} suffix="+" />
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-1 leading-tight">
                Practical Projects
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-1 sm:px-4" data-reveal>
            <span className="grid size-10 sm:size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-xs">
              <Award className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xl sm:text-2xl font-black text-slate-900 leading-none">
                <CountUp value={100} suffix="%" />
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-1 leading-tight">
                Placement Assistance
              </p>
            </div>
          </div>
        </div>

        {/* Row 2: 4 Foundational USP Commitments */}
        <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5">
          {[
            {
              title: "Practical Training",
              text: "Live tool labs & sandboxes",
              icon: Terminal,
              color: "text-blue-600 bg-blue-50 border-blue-100",
            },
            {
              title: "Industry Mentorship",
              text: "10 dedicated expert mentors",
              icon: Users,
              color: "text-indigo-600 bg-indigo-50 border-indigo-100",
            },
            {
              title: "Real-World Projects",
              text: "Live campaigns & security audits",
              icon: Layers,
              color: "text-sky-600 bg-sky-50 border-sky-100",
            },
            {
              title: "Career-Focused Learning",
              text: "100% placement assistance & prep",
              icon: Briefcase,
              color: "text-emerald-600 bg-emerald-50 border-emerald-100",
            },
          ].map((usp) => {
            const UspIcon = usp.icon;
            return (
              <div
                key={usp.title}
                className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50/70 border border-slate-200/70"
              >
                <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg border", usp.color)}>
                  <UspIcon className="size-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 truncate">{usp.title}</p>
                  <p className="text-[10.5px] text-slate-500 truncate">{usp.text}</p>
                </div>
              </div>
            );
          })}
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
    <section className="bg-background py-10 sm:py-16 overflow-hidden border-b border-slate-200/60">
      <div className="container-site grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
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
              title="WHAT MAKES DIGITECHADEMY DIFFERENT?"
              singleLine={false}
              description="DIGITECHADEMY bridges the gap between academic theory and technical employability through practical, mentor-led training across Cyber Security, Digital Marketing, and Programmatic Advertising."
              align="left"
            />
          </div>

          <div className="mt-6 grid gap-2.5 sm:gap-3">
            {[
              {
                title: "Industry-Led Training",
                desc: "Learn concepts through an industry-focused lens, not just theory.",
                icon: Briefcase,
                color: "bg-blue-50 text-blue-600 border-blue-100",
                hoverBorder: "hover:border-blue-400/80",
                hoverGlow: "hover:shadow-blue-500/10",
                accentGradient: "group-hover:from-blue-50/60",
                barColor: "bg-blue-600",
              },
              {
                title: "Hands-On Practice",
                desc: "Practice the skills you are learning through exercises and realistic scenarios.",
                icon: Terminal,
                color: "bg-indigo-50 text-indigo-600 border-indigo-100",
                hoverBorder: "hover:border-indigo-400/80",
                hoverGlow: "hover:shadow-indigo-500/10",
                accentGradient: "group-hover:from-indigo-50/60",
                barColor: "bg-indigo-600",
              },
              {
                title: "Build Work You Can Talk About",
                desc: "Use projects and practical outcomes to demonstrate what you can actually do.",
                icon: Award,
                color: "bg-amber-50 text-amber-600 border-amber-100",
                hoverBorder: "hover:border-amber-400/80",
                hoverGlow: "hover:shadow-amber-500/10",
                accentGradient: "group-hover:from-amber-50/60",
                barColor: "bg-amber-500",
              },
              {
                title: "Industry-Relevant Skills",
                desc: "Focus on tools, workflows and skills relevant to modern digital and technology roles.",
                icon: Target,
                color: "bg-sky-50 text-sky-600 border-sky-100",
                hoverBorder: "hover:border-sky-400/80",
                hoverGlow: "hover:shadow-sky-500/10",
                accentGradient: "group-hover:from-sky-50/60",
                barColor: "bg-sky-500",
              },
              {
                title: "Guidance, Not Just Content",
                desc: "Learn with structured guidance, feedback and practical direction.",
                icon: Users,
                color: "bg-emerald-50 text-emerald-600 border-emerald-100",
                hoverBorder: "hover:border-emerald-400/80",
                hoverGlow: "hover:shadow-emerald-500/10",
                accentGradient: "group-hover:from-emerald-50/60",
                barColor: "bg-emerald-500",
              },
            ].map((item, index) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.title}
                  data-reveal="left-to-right"
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                  className={cn(
                    "differentiator-card group relative flex items-start gap-3 rounded-xl border border-slate-200/90 bg-white p-3 sm:p-3.5 shadow-2xs overflow-hidden",
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
                    <p className="mt-0.5 text-xs text-slate-600 leading-relaxed font-normal text-justify [text-align:justify] [text-justify:inter-word]">
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
              <span>Learn About Our Mentors</span>
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
function CorePrograms() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [liveCourses, setLiveCourses] = useState<FirebaseCourse[]>(() =>
    courses.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      category: c.category,
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

  const programCategories = ["All", "Cyber Security", "Digital Marketing", "Programmatic Advertising"];

  const displayedCourses = useMemo(() => {
    const active = liveCourses.filter((c) => c.active !== false);
    if (selectedCategory === "All") return active;
    return active.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase());
  }, [liveCourses, selectedCategory]);

  return (
    <section id="courses" className="bg-surface py-10 sm:py-16 border-y border-slate-200/80 overflow-hidden">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8" data-reveal>
          <div className="max-w-2xl">
            <SectionHeading
              eyebrow="CORE PROGRAMS"
              title="Career-Oriented Training Tracks"
              description="Choose an industry-aligned program crafted for real-world technical competency, hands-on lab practice, and comprehensive placement support."
              align="left"
            />
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap self-start sm:self-end"
          >
            <span>View All Course Details</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 mb-8" data-reveal>
          {programCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap",
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Course Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedCourses.map((course) => (
            <CourseCard
              key={course.id || course.slug}
              course={course as any}
            />
          ))}
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
  return (
    <section id="programmatic-differentiator" className="surface-navy relative py-12 sm:py-20 overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-20 -bottom-20 size-[32rem] rounded-full bg-blue-600/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-[32rem] rounded-full bg-indigo-600/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <div className="max-w-3xl" data-reveal>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 px-3 py-1 text-[10.5px] font-black uppercase tracking-[0.14em] text-sky-300 mb-3 backdrop-blur-xs">
            <Radio className="size-3 text-sky-400 animate-pulse" />
            <span>GO BEYOND BASIC DIGITAL MARKETING</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-white leading-tight tracking-tight">
            Learn Programmatic Advertising{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">
              From the Inside Out
            </span>
          </h2>

          <div className="mt-3.5 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal text-justify [text-align:justify] [text-justify:inter-word]">
            <p>
              Programmatic advertising isn't just about running ads. It's about understanding audiences, inventory, bidding, targeting, pacing, optimization, measurement and media performance.
            </p>
            <p className="text-slate-400">
              Learn how modern programmatic campaigns are planned, launched, monitored and optimized using industry workflows and platforms.
            </p>
          </div>
        </div>

        {/* 6 Platform Pillars Grid */}
        <div className="mt-8 grid gap-3.5 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Radio,
              badge: "Demand Side Platform",
              name: "DV360",
              desc: "Campaign planning, targeting, bidding and optimization.",
              color: "bg-sky-500/15 text-sky-400 border-sky-400/30",
            },
            {
              icon: Server,
              badge: "Ad Server & Tracking",
              name: "CM360",
              desc: "Ad serving, tracking, attribution and campaign measurement.",
              color: "bg-blue-500/15 text-blue-400 border-blue-400/30",
            },
            {
              icon: Play,
              badge: "Video & Discovery",
              name: "YouTube Advertising",
              desc: "Audience strategy, video campaigns and performance analysis.",
              color: "bg-red-500/15 text-red-400 border-red-400/30",
            },
            {
              icon: Target,
              badge: "Audience Strategy",
              name: "Audience & Targeting",
              desc: "Understand how audiences are built, segmented and activated.",
              color: "bg-indigo-500/15 text-indigo-400 border-indigo-400/30",
            },
            {
              icon: TrendingUp,
              badge: "Media Trader Decisions",
              name: "Optimization",
              desc: "Learn how traders identify performance issues and make optimization decisions.",
              color: "bg-emerald-500/15 text-emerald-400 border-emerald-400/30",
            },
            {
              icon: BarChart3,
              badge: "Analytics & Attribution",
              name: "Reporting & Measurement",
              desc: "Turn campaign data into actionable media insights.",
              color: "bg-amber-500/15 text-amber-400 border-amber-400/30",
            },
          ].map((item) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.name}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-4 sm:p-5 transition-all duration-300 ease-out hover:bg-white/[0.09] hover:border-sky-400/50 hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-2 cursor-pointer"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div className="flex items-center justify-between">
                  <span className={cn("grid size-9 place-items-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md", item.color)}>
                    <ItemIcon className="size-4.5 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <span className="text-[9.5px] font-bold text-slate-300 uppercase tracking-wider bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10 transition-colors duration-300 group-hover:border-sky-400/40 group-hover:text-white">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mt-3.5 text-sm sm:text-base font-black text-white group-hover:text-sky-300 group-hover:translate-x-0.5 transition-all duration-200">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-300 group-hover:text-slate-200 font-normal transition-colors duration-200 text-justify [text-align:justify] [text-justify:inter-word]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Signature Statement Banner */}
        <div
          className="mt-8 rounded-2xl border border-sky-400/30 bg-gradient-to-r from-blue-950/90 via-[#071a40]/90 to-indigo-950/90 p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
          data-reveal
        >
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md">
              <Sparkles className="size-5" />
            </span>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-sky-400">
                Signature Programmatic Philosophy
              </span>
              <p className="text-sm sm:text-base font-black text-white tracking-wide mt-0.5 uppercase">
                DON’T JUST LEARN PROGRAMMATIC. LEARN HOW PROGRAMMATIC PROFESSIONALS THINK.
              </p>
            </div>
          </div>

          <BtnLink
            to="/courses/programmatic-advertising"
            variant="primary"
            size="md"
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shrink-0 whitespace-nowrap shadow-md shadow-sky-500/30"
          >
            <span>Explore Programmatic Masterclass</span>
            <ArrowRight className="size-4 ml-1.5" />
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
  return (
    <section className="bg-white py-12 sm:py-20 border-b border-slate-200/80 overflow-hidden">
      <div className="container-site">
        <div className="max-w-3xl" data-reveal>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-[10.5px] font-black uppercase tracking-[0.14em] text-blue-700 mb-3 backdrop-blur-xs">
            <ShieldCheck className="size-3.5 text-blue-600" />
            <span>THINK LIKE A DEFENDER. TEST LIKE AN ETHICAL HACKER.</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-slate-900 leading-tight tracking-tight">
            Build Practical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">
              Cyber Security Skills
            </span>
          </h2>

          <p className="mt-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl font-normal text-justify [text-align:justify] [text-justify:inter-word]">
            Cyber Security is not learned by memorizing definitions. Learn how systems work, where vulnerabilities occur and how security professionals identify, analyze and respond to security risks.
          </p>
        </div>

        {/* 5 Progressive Steps Grid */}
        <div className="mt-8 grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {[
            {
              step: "01",
              title: "Understand",
              desc: "Networking, operating systems and security fundamentals.",
              icon: ShieldCheck,
              badge: "Foundations",
              color: "bg-blue-50 text-blue-600 border-blue-200",
            },
            {
              step: "02",
              title: "Explore",
              desc: "Linux, web technologies and common security weaknesses.",
              icon: Terminal,
              badge: "Tooling & OS",
              color: "bg-indigo-50 text-indigo-600 border-indigo-200",
            },
            {
              step: "03",
              title: "Practice",
              desc: "Guided security exercises and labs.",
              icon: Cpu,
              badge: "Hands-on",
              color: "bg-sky-50 text-sky-600 border-sky-200",
            },
            {
              step: "04",
              title: "Test",
              desc: "Vulnerability assessment and ethical hacking methodologies.",
              icon: Lock,
              badge: "Assessment",
              color: "bg-amber-50 text-amber-600 border-amber-200",
            },
            {
              step: "05",
              title: "Apply",
              desc: "Analyze realistic security scenarios.",
              icon: Target,
              badge: "Real Scenarios",
              color: "bg-emerald-50 text-emerald-600 border-emerald-200",
            },
          ].map((item) => {
            const ItemIcon = item.icon;
            return (
              <Link
                key={item.step}
                to="/courses/cyber-security"
                className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 transition-all duration-300 ease-out hover:bg-white hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 flex flex-col justify-between h-full cursor-pointer select-none active:scale-[0.98]"
              >
                {/* Top Animated Accent Border Gradient */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Subtle Hover Radial Ambient Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-display text-xs font-black text-blue-700 bg-blue-100/70 border border-blue-200 px-2.5 py-0.5 rounded-md transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-sm group-hover:shadow-blue-500/30 group-hover:scale-105">
                      {item.step}
                    </span>
                    <span className="text-[9.5px] font-bold text-slate-500 uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200/70 transition-all duration-300 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-300">
                      {item.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 mt-2">
                    <span className={cn("grid size-8.5 place-items-center rounded-xl border shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md", item.color)}>
                      <ItemIcon className="size-4.5 transition-transform duration-300 group-hover:scale-110" />
                    </span>
                    <h3 className="text-base font-black text-slate-900 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-2.5 text-xs leading-relaxed text-slate-600 group-hover:text-slate-800 transition-colors duration-200 font-normal text-justify [text-align:justify] [text-justify:inter-word]">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Step Progression Flow Indicator */}
                <div className="relative z-10 mt-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors duration-200">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 group-hover:text-blue-600 transition-colors">Phase {item.step}</span>
                  <span className="flex items-center gap-1">
                    <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">View Track</span>
                    <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Closing Line Banner */}
        <div
          className="mt-8 rounded-2xl border border-blue-200/90 bg-gradient-to-r from-blue-50/90 via-indigo-50/60 to-sky-50/80 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
          data-reveal
        >
          <div className="flex items-center gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <ShieldCheck className="size-5.5" />
            </span>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-blue-700">
                The Practical Pathway
              </span>
              <p className="text-sm sm:text-base font-black text-slate-900 tracking-tight mt-0.5">
                From Security Fundamentals to Practical Confidence.
              </p>
            </div>
          </div>

          <BtnLink
            to="/courses/cyber-security"
            variant="primary"
            size="md"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shrink-0 whitespace-nowrap shadow-sm"
          >
            <span>Explore Cyber Security Track</span>
            <ArrowRight className="size-4 ml-1.5" />
          </BtnLink>
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
    <section id="methodology" className="surface-navy relative py-12 sm:py-18 overflow-hidden border-t border-navy-700/60">
      <div className="grid-lines absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="DIGITECHADEMY LEARNING METHOD"
          title="From Concept Architecture to Real-World Mastery"
          description="Our structured 5-stage progressive pathway takes you from fundamental principles to building defensible, portfolio-grade project deliverables."
          align="left"
          onDark
        />
        <div className="mt-8">
          <StudentLearningPath />
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 10. PRACTICAL LEARNING
 * =========================================================================
 */
function PracticalLearning() {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % practicalTraining.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="bg-surface py-12 sm:py-16 overflow-hidden border-b border-slate-200/80">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14">
          <div data-reveal="left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase mb-3">
              <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
              PRACTICAL LEARNING
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              DON’T JUST WATCH. DO.
            </h2>

            <p className="mt-2 text-base sm:text-lg font-bold text-blue-600">
              Learn By Solving Real-World Problems.
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-justify [text-align:justify] [text-justify:inter-word]">
              At Digitechademy, practical learning is not an optional add-on. You'll work through exercises, projects, case studies, tools and realistic scenarios designed to help you understand how professionals approach real problems.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <BtnLink
                to="/courses"
                variant="primary"
                size="md"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl inline-flex items-center gap-2 shadow-sm text-xs sm:text-sm"
              >
                <span>Explore Hands-On Syllabus</span>
                <ArrowRight className="size-4" />
              </BtnLink>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
                <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Pillar {activeCard + 1} of {practicalTraining.length}</span>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
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
                    "group relative overflow-hidden rounded-2xl border p-4 sm:p-4.5 shadow-xs transition-all duration-300 ease-out cursor-pointer select-none active:scale-[0.99] flex flex-col justify-between",
                    isActive
                      ? "border-blue-500 bg-white shadow-xl shadow-blue-500/10 -translate-y-1.5 ring-1 ring-blue-400/40"
                      : "border-slate-200/90 bg-white/90 hover:border-blue-400 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5",
                    index === 4 ? "sm:col-span-2" : ""
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

                  <div className="relative z-10 flex items-start gap-3.5">
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-md",
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 scale-105 rotate-3"
                          : "bg-blue-50 text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600"
                      )}
                    >
                      <Icon name={item.icon} className="size-5 transition-transform duration-300 group-hover:scale-110" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "text-[10px] font-bold px-1.5 py-0.5 rounded-md border transition-all duration-300",
                            isActive
                              ? "bg-blue-600 text-white border-blue-600 shadow-xs shadow-blue-500/30 scale-105"
                              : "bg-blue-50 text-blue-700 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 group-hover:shadow-xs group-hover:scale-105"
                          )}
                        >
                          0{index + 1}
                        </span>
                        <h3
                          className={cn(
                            "text-sm font-black leading-tight transition-all duration-200",
                            isActive
                              ? "text-blue-700 translate-x-0.5"
                              : "text-slate-900 group-hover:text-blue-600 group-hover:translate-x-0.5"
                          )}
                        >
                          {item.title}
                        </h3>
                      </div>

                      <p className="mt-1.5 text-xs text-slate-600 group-hover:text-slate-700 leading-relaxed font-normal transition-colors duration-200 text-justify [text-align:justify] [text-justify:inter-word]">
                        {item.text}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="relative z-10 mt-3.5 pt-2.5 border-t border-slate-100/80 flex items-center justify-between text-[10.5px] font-bold transition-colors">
                    <span
                      className={cn(
                        "uppercase tracking-wider transition-colors",
                        isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-600"
                      )}
                    >
                      {isActive ? "Pillar Active" : `Pillar 0${index + 1}`}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        {isActive ? "Selected" : "Select"}
                      </span>
                      <ArrowRight
                        className={cn(
                          "size-3.5 transition-transform duration-300",
                          isActive
                            ? "translate-x-1 text-blue-600"
                            : "text-slate-300 group-hover:translate-x-1 group-hover:text-blue-600"
                        )}
                      />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Closing Line Callout */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-5 sm:p-6 text-white shadow-lg border border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 shrink-0">
              <Sparkles className="size-5 text-blue-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-blue-300/90">Closing Philosophy</p>
              <p className="text-sm sm:text-base font-bold tracking-tight text-white mt-0.5">
                Knowledge Gets You Started. <span className="text-blue-400">Practice Makes You Job Ready.</span>
              </p>
            </div>
          </div>
          <BtnLink
            to="/request-call"
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 py-2.5 rounded-xl shrink-0 text-xs sm:text-sm shadow-md"
          >
            <span>Talk to a Mentor</span>
            <ArrowRight className="size-4" />
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
  return (
    <section className="bg-white py-12 sm:py-18 overflow-hidden border-b border-slate-200/80">
      <div className="container-site">
        <div className="max-w-3xl" data-reveal="left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase mb-3">
            <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
            WHO IS DIGITECHADEMY FOR?
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Programs Structured for Distinct Career Aspirations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-justify [text-align:justify] [text-justify:inter-word]">
            Whether launching your first career, transitioning domains, or upgrading into high-paying specialized fields, DIGITECHADEMY provides clear, guided entry points.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whoIsForAudience.map((persona, index) => {
            return (
              <div
                key={persona.title}
                data-reveal
                className="group relative rounded-2xl border border-slate-200/80 bg-surface p-5 sm:p-6 shadow-xs flex flex-col justify-between transition-all duration-300 hover:border-blue-500/40 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
              >
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

                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal text-justify [text-align:justify] [text-justify:inter-word]">
                    {persona.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-200/70 flex items-center gap-2 text-[11.5px] font-semibold text-blue-700">
                  <Check className="size-3.5 text-emerald-600 shrink-0" />
                  <span>{persona.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 12. CAREER READINESS
 * =========================================================================
 */
/**
 * =========================================================================
 * 15. CAREER READINESS
 * =========================================================================
 */
function CareerReadiness() {
  return (
    <section className="surface-navy relative py-12 sm:py-18 overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="container-site relative z-10">
        <div className="max-w-4xl" data-reveal="left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wider uppercase mb-3">
            <span className="size-2 rounded-full bg-blue-400 animate-pulse" />
            CAREER READINESS
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            BUILD SKILLS WITH YOUR NEXT CAREER MOVE IN MIND
          </h2>
          <p className="mt-2 text-base sm:text-lg font-bold text-sky-400">
            Learn With Your Next Career Move In Mind.
          </p>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal text-justify [text-align:justify] [text-justify:inter-word]">
            Our programs are designed to help you understand industry concepts, practice practical skills, work through realistic scenarios, build project experience, prepare for technical and role-based interviews, and communicate your knowledge with confidence.
          </p>
        </div>

        {/* Formula / Truth Card */}
        <div
          data-reveal
          className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-5 sm:p-6 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-rose-300">The Hard Truth</span>
              <p className="text-base sm:text-lg font-bold text-slate-100 mt-0.5">
                A certificate alone doesn't build a career.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-slate-900/80 border border-blue-500/30 p-3 sm:p-3.5 rounded-xl">
              <span className="px-3 py-1 rounded-lg bg-blue-600/30 border border-blue-400/40 text-blue-200 text-xs sm:text-sm font-bold">
                Skills
              </span>
              <span className="text-slate-400 font-bold">+</span>
              <span className="px-3 py-1 rounded-lg bg-indigo-600/30 border border-indigo-400/40 text-indigo-200 text-xs sm:text-sm font-bold">
                Practice
              </span>
              <span className="text-slate-400 font-bold">+</span>
              <span className="px-3 py-1 rounded-lg bg-cyan-600/30 border border-cyan-400/40 text-cyan-200 text-xs sm:text-sm font-bold">
                Projects
              </span>
              <span className="text-slate-400 font-bold">+</span>
              <span className="px-3 py-1 rounded-lg bg-emerald-600/30 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-bold">
                Confidence
              </span>
              <span className="text-amber-400 font-bold">=</span>
              <span className="px-3 py-1 rounded-lg bg-amber-400/20 border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-black tracking-wide">
                Career Readiness
              </span>
            </div>
          </div>
        </div>

        {/* 6 Career Readiness Pillars */}
        <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {careerReadinessPillars.map((pillar, index) => (
            <div
              key={pillar.title}
              data-reveal
              className="group rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 hover:border-sky-400/40 hover:bg-white/[0.07] hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-blue-500/10 text-sky-400 border border-blue-400/20 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <Icon name={pillar.icon} className="size-5.5" />
                  </span>
                  <span className="text-xs font-black text-sky-400/80 bg-sky-950/60 border border-sky-800/40 px-2 py-0.5 rounded-md">
                    0{index + 1}
                  </span>
                </div>

                <h4 className="mt-4 text-base font-bold text-white leading-snug">
                  {pillar.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal text-justify [text-align:justify] [text-justify:inter-word]">
                  {pillar.text}
                </p>
              </div>

              <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center gap-1.5 text-xs text-sky-300 font-medium">
                <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                <span>Verified Career Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Closing Line & CTA Banner */}
        <div
          data-reveal
          className="mt-10 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 sm:p-8 text-white shadow-2xl border border-blue-500/30 flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="grid size-12 place-items-center rounded-2xl bg-blue-500/20 border border-blue-400/40 text-sky-300 shrink-0 shadow-inner">
              <Sparkles className="size-6 text-sky-300" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-bold text-sky-300">Core Principle</p>
              <p className="text-base sm:text-xl font-black tracking-tight text-white mt-0.5">
                Your Career Starts With What You Can Do — <span className="text-sky-300">Not Just What You Know.</span>
              </p>
            </div>
          </div>

          <BtnLink
            to="/courses"
            variant="primary"
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl shrink-0 text-sm shadow-xl flex items-center gap-2"
          >
            <span>Explore Career-Focused Programs</span>
            <ArrowRight className="size-4" />
          </BtnLink>
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 13. GENUINE TESTIMONIALS (Only when available)
 * =========================================================================
 */
function GenuineTestimonials() {
  // Respecting the mandatory rule:
  // "Testimonials must be genuine, attributable and approved. If genuine testimonials are not ready, replace the section with a value/trust section rather than fabricating testimonials."
  const verifiedReviews: Array<{ name: string; course: string; quote: string; verified: boolean }> = [];

  return (
    <section className="bg-surface py-12 sm:py-16 border-y border-slate-200/80 overflow-hidden">
      <div className="container-site max-w-5xl">
        <SectionHeading
          eyebrow="GENUINE TESTIMONIALS POLICY"
          title="Authentic Reviews Policy & Trust Standards"
          description="Credibility is our foundational principle. We do not publish fabricated quotes, fake student personas, or unverified star ratings."
          align="left"
        />

        {verifiedReviews.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {verifiedReviews.map((rev, i) => (
              <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200">
                <p className="text-xs text-slate-600 italic">"{rev.quote}"</p>
                <p className="mt-3 text-xs font-bold text-slate-900">{rev.name}</p>
                <p className="text-[11px] text-slate-500">{rev.course}</p>
              </div>
            ))}
          </div>
        ) : (
          <div
            data-reveal
            className="mt-8 rounded-2xl border border-blue-200/90 bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/60 p-6 sm:p-8 shadow-xs"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
              <ShieldCheck className="size-4 text-blue-600" />
              <span>Authentic Reviews Standard</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Testimonials Must Be Genuine, Attributable &amp; Approved
            </h3>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-justify [text-align:justify] [text-justify:inter-word]">
              At DIGITECHADEMY, we uphold strict standards of institutional credibility. We never use placeholder testimonials or manufactured reviews. As learners from our current cohorts finish their verified capstones and enter the workforce, their authorized journeys and feedback will be published here with full attribution.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-blue-100">
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Zero Fabricated Quotes
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  Verified Student Defenses
                </span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-600" />
                  100% Practical Training
                </span>
              </div>

              <BtnLink
                to="/testimonials"
                variant="outline"
                size="sm"
                className="border-blue-300 text-blue-700 bg-white hover:bg-blue-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all duration-200"
              >
                <span>Read Our Standards</span>
                <ArrowRight className="size-3.5 ml-1.5" />
              </BtnLink>
            </div>
          </div>
        )}
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
  return (
    <section className="bg-white py-12 sm:py-18 overflow-hidden border-b border-slate-200/80">
      <div className="container-site grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div data-reveal="left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold tracking-wider uppercase mb-3">
            <span className="size-2 rounded-full bg-blue-600 animate-pulse" />
            FAQ — QUESTIONS &amp; ANSWERS
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-justify [text-align:justify] [text-justify:inter-word]">
            Find clear, straightforward answers about eligibility, hands-on learning, offered programs, prerequisites, and certifications at DIGITECHADEMY.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <BtnLink
              to="/faq"
              variant="outline"
              size="md"
              className="border-slate-300 text-slate-800 hover:bg-slate-50 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-xs"
            >
              <span>View All Questions</span>
              <ArrowRight className="size-3.5 ml-1.5" />
            </BtnLink>

            <BtnLink
              to="/contact"
              variant="secondary"
              size="md"
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm border border-blue-200"
            >
              <span>Ask a Counselor</span>
            </BtnLink>
          </div>
        </div>

        <div data-reveal="right">
          <FaqAccordion items={homeFaqs} />
        </div>
      </div>
    </section>
  );
}

/**
 * =========================================================================
 * 18. FINAL CTA
 * =========================================================================
 */
function FinalCta() {
  return (
    <section className="surface-navy relative py-8 sm:py-12 overflow-hidden select-none">
      <div className="grid-lines absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-blue-600/15 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-16 -bottom-16 size-64 rounded-full bg-sky-500/10 blur-2xl"
        aria-hidden="true"
      />

      <div className="container-site relative z-10 max-w-3xl text-center" data-reveal>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-sky-300 text-[10.5px] font-bold uppercase tracking-wider mb-2.5">
          <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
          START YOUR LEARNING JOURNEY
        </div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
          READY TO BUILD SKILLS THAT{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">
            ACTUALLY MATTER?
          </span>
        </h2>

        <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto font-normal text-justify [text-align:justify] [text-justify:inter-word]">
          Whether you're starting your career, switching fields or upgrading your existing skills, Digitechademy helps you move from learning concepts to applying them with confidence.
        </p>

        {/* 3 Value Pillars */}
        <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-3.5 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
          <span className="text-[11px] sm:text-xs font-semibold text-sky-300">Choose Your Path.</span>
          <span className="text-slate-500 text-xs font-bold">•</span>
          <span className="text-[11px] sm:text-xs font-semibold text-blue-300">Learn With Purpose.</span>
          <span className="text-slate-500 text-xs font-bold">•</span>
          <span className="text-[11px] sm:text-xs font-semibold text-indigo-300">Build Your Future.</span>
        </div>

        <div className="mt-5 flex flex-wrap justify-center items-center gap-3">
          <BtnLink
            to="/courses"
            variant="primary"
            size="sm"
            className="inline-flex h-9 sm:h-10 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-xs font-bold text-white shadow-md shadow-blue-500/20 transition-all duration-200 hover:brightness-110 active:scale-95 cursor-pointer"
          >
            <span>Explore Programs</span>
            <ArrowRight className="size-3.5" />
          </BtnLink>

          <BtnLink
            to="/request-call"
            variant="outline"
            size="sm"
            className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 font-bold h-9 sm:h-10 px-4 rounded-lg text-xs"
          >
            <span>Talk to an Expert</span>
          </BtnLink>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3 text-emerald-400" />
            100% Practical Training
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3 text-emerald-400" />
            1-on-1 Expert Guidance
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="size-3 text-emerald-400" />
            Placement Support
          </span>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  Briefcase,
  CheckCircle2,
  Compass,
  History,
  Layers,
  MessageCircle,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
  ArrowRight,
  X,
} from "lucide-react";

import aboutImg from "@/assets/about-institute.jpg";
import { subscribeMentors, type FirebaseMentor } from "@/services/mentorService";
import { BtnLink } from "@/components/site/Btn";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StatsSection } from "@/components/site/StatsSection";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About DIGITECHADEMY | Cyber Security, Digital Marketing & Programmatic Advertising" },
      {
        name: "description",
        content:
          "Learn practical skills. Build real-world confidence. Become career ready. DIGITECHADEMY is a career-focused learning academy for technology and digital disciplines.",
      },
      { property: "og:title", content: "About DIGITECHADEMY — LEARN • GROW • ACHIEVE" },
      {
        property: "og:description",
        content: "Learn practical skills. Build real-world confidence. Become career ready with DIGITECHADEMY.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});


const whyLearnersChooseUs = [
  {
    title: "Practical Curriculum",
    text: "Training focuses on usable skills rather than theory alone.",
    icon: Layers,
  },
  {
    title: "Industry Relevance",
    text: "Course topics and workflows are aligned with evolving digital roles.",
    icon: TrendingUp,
  },
  {
    title: "Structured Learning",
    text: "Clear learning paths help students progress from fundamentals to practical application.",
    icon: Workflow,
  },
  {
    title: "Career Focus",
    text: "Programs are designed to strengthen skills, confidence, and professional readiness.",
    icon: Briefcase,
  },
];

function AboutPage() {
  const [liveMentors, setLiveMentors] = useState<FirebaseMentor[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<FirebaseMentor | null>(null);

  // Subscribe to live mentors managed by the admin
  useEffect(() => {
    const unsub = subscribeMentors((list) => {
      setLiveMentors(list.filter((m) => m.active !== false));
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMentor(null);
      }
    };

    if (selectedMentor) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedMentor]);

  return (
    <SiteLayout>
      {/* Section 1 — Hero */}
      <PageHero
        eyebrow="ABOUT DIGITECHADEMY"
        title="Learn Skills. Build Experience. Grow With the Digital Industry."
        description="DIGITECHADEMY helps learners build in-demand digital skills, hands-on experience, and career confidence."
      />
      <StatsSection />

      {/* Section 2 — Introduction */}
      <section className="bg-background">
        <div className="container-site py-8 sm:py-10 lg:py-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-md" data-reveal="left">
            <img
              src={aboutImg}
              alt="Hands-on technology training lab at DIGITECHADEMY with learners and mentor"
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <div>
            <div data-reveal="right">
              <SectionHeading
                eyebrow="ABOUT DIGITECHADEMY"
                title="Where Practical Learning Meets Career Growth"
                singleLine={false}
                description={
                  <>
                    <span className="sm:hidden">
                      DIGITECHADEMY combines structured concepts, practical application, industry tools, and real projects for job-ready skills.
                    </span>
                    <span className="hidden sm:inline">
                      We believe effective training should go beyond completing lessons. DIGITECHADEMY combines structured concepts, practical application, industry tools, guided projects, and continuous improvement to create a learning experience built around real skills.
                    </span>
                  </>
                }
                align="left"
              />
            </div>
            <ul className="mt-3.5 sm:mt-6 grid gap-1.5 sm:gap-3 sm:grid-cols-2">
              {[
                { title: "Structured Core Concepts", delay: "100ms" },
                { title: "Practical Hands-On Application", delay: "180ms" },
                { title: "Industry Standard Tools", delay: "260ms" },
                { title: "Guided Real-World Projects", delay: "340ms" },
              ].map((item) => (
                <li
                  key={item.title}
                  data-reveal="right-to-left-and-bottom-to-up"
                  style={{ "--reveal-delay": item.delay } as React.CSSProperties}
                  className="flex items-center gap-2 sm:gap-2.5 rounded-lg sm:rounded-xl border border-slate-200/80 bg-white py-1.5 px-2.5 sm:p-3.5 text-[11.5px] sm:text-sm font-bold text-slate-800 shadow-xs sm:shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="grid size-3.5 sm:size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <CheckCircle2 className="size-2 sm:size-3.5" aria-hidden="true" />
                  </span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3 — Our Story */}
      <section className="bg-surface border-t border-slate-200/80">
        <div className="container-site py-6 sm:py-8 lg:py-10">
          <div className="max-w-4xl lg:max-w-5xl text-left" data-reveal>
            <span className="inline-block text-xs font-black uppercase tracking-widest text-accent mb-2">
              OUR STORY
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-navy text-left break-words">
              Built to Make Digital Learning Practical
            </h2>
            <p className="mt-3 text-xs sm:text-sm lg:text-base leading-relaxed text-slate-600 max-w-3xl font-normal text-justify [text-align:justify] [text-justify:inter-word]">
              DIGITECHADEMY makes professional digital training practical, accessible, and aligned with workplace requirements. Our structured curriculum connects fundamentals with real-world application so learners gain actionable skills.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Then / Now / Next */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50 py-12 sm:py-16 lg:py-20 border-t border-b border-slate-200/70 select-none">
        {/* Ambient Glows & Grid */}
        <div className="grid-lines absolute inset-0 opacity-[0.15] pointer-events-none" aria-hidden="true" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[34rem] rounded-full bg-sky-400/8 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-site relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10" data-reveal="top-to-bottom">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
              <span className="size-1.5 rounded-full bg-blue-600 animate-pulse" />
              THE PROGRESSION • EVOLUTION OF LEARNING
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 text-center">
              Then <span className="text-slate-300 font-light mx-1">/</span> Now{" "}
              <span className="text-slate-300 font-light mx-1">/</span> Next
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal text-justify [text-align:justify] [text-justify:inter-word]">
              How digital skill education shifted from isolated theoretical memorization into live, production-grade sandboxes and high-velocity career specializations.
            </p>
          </div>

          {/* Horizontal Milestone Progression Rail (Left-to-Right Flow) */}
          <div
            className="max-w-4xl mx-auto mb-8 hidden md:flex items-center justify-between px-6 relative"
            data-reveal="left-to-right"
          >
            {/* Connecting Flow Track */}
            <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-[2px] bg-gradient-to-r from-slate-200 via-sky-400 to-indigo-300 -z-0" />

            {/* Step 1 */}
            <div className="flex items-center gap-2 bg-white px-3.5 py-1 rounded-full border border-slate-200 text-[11px] font-bold text-slate-500 relative z-10 shadow-xs">
              <span className="size-2 rounded-full bg-slate-400" />
              <span>PHASE 01 • LEGACY GAP</span>
            </div>

            {/* Step 2 (Active Standard) */}
            <div className="flex items-center gap-2 bg-sky-50 px-4 py-1.5 rounded-full border border-sky-400 text-xs font-black text-sky-700 relative z-10 shadow-md shadow-sky-500/15 ring-2 ring-sky-400/20">
              <span className="size-2 rounded-full bg-sky-500 animate-pulse" />
              <span>PHASE 02 • ACTIVE STANDARD</span>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-2 bg-white px-3.5 py-1 rounded-full border border-indigo-200 text-[11px] font-bold text-indigo-700 relative z-10 shadow-xs">
              <span className="size-2 rounded-full bg-indigo-500" />
              <span>PHASE 03 • FUTURE MASTERY</span>
            </div>
          </div>

          {/* 3 Premium Progression Cards */}
          <div className="grid gap-6 sm:grid-cols-3 max-w-6xl mx-auto items-stretch">
            {[
              {
                stage: "Then",
                phaseLabel: "PHASE 01",
                subtitle: "Traditional Education Gap",
                tagline: "Theory Without Application",
                icon: History,
                watermark: "01",
                badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
                iconBg: "bg-slate-100 text-slate-600 border border-slate-200/80",
                accentBorder: "border-t-4 border-t-slate-300",
                cardClass: "border-slate-200/90 bg-white/95 hover:border-slate-300 hover:shadow-xl",
                text: "Memorizing slides and isolated theory without exposure to live ad budgets, production servers, or real workplace tools.",
                highlightIcon: "✕",
                highlightText: "Disconnected from live tools",
                highlightClass: "text-slate-500 bg-slate-50 border-slate-200/70 font-medium",
              },
              {
                stage: "Now",
                phaseLabel: "PHASE 02",
                subtitle: "The DIGITECHADEMY Standard",
                tagline: "100% Practical & Mentored",
                icon: Sparkles,
                watermark: "02",
                badgeClass: "bg-sky-500 text-white border-sky-400 shadow-xs shadow-sky-500/30",
                iconBg: "bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/30",
                accentBorder: "border-t-4 border-t-sky-500",
                cardClass:
                  "border-2 border-sky-400/80 bg-gradient-to-b from-sky-50/40 via-white to-blue-50/25 shadow-xl shadow-sky-500/10 ring-4 ring-sky-400/15 hover:border-sky-400 hover:shadow-2xl hover:shadow-sky-500/25",
                text: "Practical sandbox labs, live project execution, and 1-on-1 mentorship to build genuine workplace capability.",
                highlightIcon: "✓",
                highlightText: "Live sandboxes & 1-on-1 mentoring",
                highlightClass: "text-sky-900 bg-sky-50/90 border-sky-300 font-bold",
              },
              {
                stage: "Next",
                phaseLabel: "PHASE 03",
                subtitle: "Continuous Career Evolution",
                tagline: "Specialization & Leadership",
                icon: TrendingUp,
                watermark: "03",
                badgeClass: "bg-slate-900 text-white border-slate-800 shadow-xs",
                iconBg: "bg-indigo-50 text-indigo-600 border border-indigo-200",
                accentBorder: "border-t-4 border-t-indigo-600",
                cardClass:
                  "border-indigo-200/90 bg-gradient-to-b from-indigo-50/25 via-white to-slate-50/40 hover:border-indigo-400 hover:shadow-xl",
                text: "Continuous skill upgrading, advanced specializations, and portfolio growth to step into senior tech roles.",
                highlightIcon: "★",
                highlightText: "Lifelong career acceleration",
                highlightClass: "text-indigo-950 bg-indigo-50/80 border-indigo-200 font-semibold",
              },
            ].map((item, index) => {
              const IconComp = item.icon;
              return (
                <article
                  key={item.stage}
                  data-reveal="up-to-bottom-left-to-right"
                  style={{ "--reveal-delay": `${index * 160}ms` } as React.CSSProperties}
                  className={cn(
                    "progression-card group relative flex flex-col justify-between gap-5 rounded-2xl border p-6 sm:p-7 shadow-xs overflow-hidden transition-all duration-300 hover:-translate-y-2",
                    item.accentBorder,
                    item.cardClass
                  )}
                >
                  {/* Subtle Background Watermark Step Number */}
                  <span
                    className="pointer-events-none absolute right-4 top-3 text-5xl font-black opacity-[0.07] font-mono select-none"
                    aria-hidden="true"
                  >
                    {item.watermark}
                  </span>

                  <div>
                    {/* Card Header Bar */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-3 py-0.5 text-[11px] uppercase tracking-wider border font-black",
                            item.badgeClass
                          )}
                        >
                          {item.stage}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {item.phaseLabel}
                        </span>
                      </div>

                      <span
                        className={cn(
                          "grid size-9 place-items-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
                          item.iconBg
                        )}
                      >
                        <IconComp className="size-4.5" aria-hidden="true" />
                      </span>
                    </div>

                    {/* Card Titles */}
                    <div className="mt-4">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                        {item.subtitle}
                      </h3>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
                        {item.tagline}
                      </p>
                    </div>

                    {/* Card Description */}
                    <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-slate-600 font-normal text-justify [text-align:justify] [text-justify:inter-word]">
                      {item.text}
                    </p>
                  </div>

                  {/* Card Bottom Key Takeaway Badge */}
                  <div
                    className={cn(
                      "pt-3 mt-4 border-t flex items-center gap-2 rounded-xl px-3 py-2 text-xs border",
                      item.highlightClass
                    )}
                  >
                    <span className="size-4 rounded-full grid place-items-center text-[10px] shrink-0 font-bold">
                      {item.highlightIcon}
                    </span>
                    <span className="truncate text-[11px]">{item.highlightText}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5 — Vision & Section 6 — Mission */}
      <section className="surface-navy relative overflow-hidden py-8 sm:py-10 lg:py-12 border-t border-navy-700/60">
        <div className="grid-lines absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-[28rem] rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 -bottom-20 size-[28rem] rounded-full bg-blue-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-site relative z-10 grid gap-6 lg:grid-cols-2">
          {/* Section 5 — Vision */}
          <article
            data-reveal="left"
            className="group flex flex-col gap-3 rounded-2xl border border-navy-foreground/15 bg-navy-700/30 backdrop-blur-md p-5 sm:p-6 shadow-xl transition-all duration-300 hover:border-accent/40"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent border border-accent/20 transition-transform duration-300 group-hover:scale-105">
                <Compass className="size-5" aria-hidden="true" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Our Vision</h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 text-justify [text-align:justify] [text-justify:inter-word]">
              To build a trusted learning ecosystem where learners develop practical digital skills and thrive in modern tech roles.
            </p>
          </article>

          {/* Section 6 — Mission */}
          <article
            data-reveal="right"
            className="group flex flex-col gap-3 rounded-2xl border border-navy-foreground/15 bg-navy-700/30 backdrop-blur-md p-5 sm:p-6 shadow-xl transition-all duration-300 hover:border-accent/40"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent border border-accent/20 transition-transform duration-300 group-hover:scale-105">
                <Target className="size-5" aria-hidden="true" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Our Mission</h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 text-justify [text-align:justify] [text-justify:inter-word]">
              To deliver hands-on, industry-relevant training that prepares learners with real skills, practical experience, and career confidence.
            </p>
          </article>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 26 — ABOUT US: MEET THE MINDS BEHIND YOUR GROWTH (5 Mentor Cards) */}
      {/* ========================================================================= */}
      <section id="mentors" className="surface-navy relative py-12 sm:py-20 overflow-hidden border-t border-sky-500/20 scroll-mt-20">
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
          <div className="max-w-3xl mb-10" data-reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 px-3 py-1 text-[10.5px] font-black uppercase tracking-[0.14em] text-sky-300 mb-3 backdrop-blur-xs">
              <Sparkles className="size-3 text-sky-400 animate-pulse" />
              <span>EXPERT FACULTY &amp; MENTORS</span>
            </div>

            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.6rem] font-black text-white leading-tight tracking-tight uppercase">
              MEET THE MINDS BEHIND YOUR GROWTH.
            </h2>

            <p className="mt-3.5 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal text-justify [text-align:justify] [text-justify:inter-word]">
              Learn directly from experienced practitioners who bring authentic agency, AdTech, and enterprise security battle-tested knowledge into every interactive lecture and sandbox lab. Click on any mentor to explore their detailed background and expertise.
            </p>
          </div>

          {/* Circular Mentor Cards Grid (Live Admin Sync) */}
          {liveMentors.length === 0 ? (
            <div className="rounded-2xl border border-sky-400/20 bg-sky-950/40 backdrop-blur-md p-10 text-center text-slate-300 max-w-xl mx-auto">
              <div className="size-14 rounded-full bg-sky-500/15 text-sky-400 grid place-items-center mx-auto mb-3 border border-sky-400/30">
                <Sparkles className="size-6" />
              </div>
              <h3 className="text-base font-black text-white">Faculty Directory Synchronizing</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                Our academic mentors and program directors are currently being updated by the academy administration. Speak with our admission counselors for immediate guidance.
              </p>
              <div className="mt-5">
                <BtnLink
                  to="/request-call"
                  size="sm"
                  className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs"
                >
                  <span>Connect with Academic Counselor</span>
                </BtnLink>
              </div>
            </div>
          ) : (
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {liveMentors.map((mentor, index) => (
                <div
                  key={mentor.id || mentor.name}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                  onClick={() => setSelectedMentor(mentor)}
                  className="group relative rounded-2xl border border-sky-500/25 bg-[#061122]/90 backdrop-blur-md p-5 sm:p-6 shadow-xl flex flex-col items-center text-center justify-between transition-all duration-300 hover:border-sky-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-sky-500/20 cursor-pointer"
                >
                  {/* Ambient Glow */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex flex-col items-center w-full">
                    {/* Circular Border Portrait */}
                    <div className="relative size-28 sm:size-32 rounded-full p-1 bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 ring-2 ring-[#051126] shadow-lg shadow-sky-500/20 group-hover:scale-105 group-hover:shadow-sky-400/40 transition-all duration-300">
                      <div className="size-full rounded-full overflow-hidden bg-slate-950">
                        <img
                          src={mentor.image}
                          alt={`${mentor.name} — ${mentor.role}`}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                      {/* Verified badge */}
                      <div className="absolute bottom-0 right-0 rounded-full bg-[#061122] p-0.5 shadow-md">
                        <CheckCircle2 className="size-5 text-sky-400 fill-[#061122]" aria-label="Verified Faculty" />
                      </div>
                    </div>

                    {/* Track Pill */}
                    <div className="mt-4">
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider border shadow-xs backdrop-blur-md", mentor.badgeBg)}>
                        {mentor.track}
                      </span>
                    </div>

                    {/* Mentor Name & Role */}
                    <h3 className="text-base sm:text-[17px] font-black text-white group-hover:text-sky-300 transition-colors mt-2.5 leading-snug">
                      {mentor.name}
                    </h3>

                    <p className="text-xs font-semibold text-sky-300/90 leading-tight mt-1">
                      {mentor.role}
                    </p>
                  </div>

                  {/* Card Action Button */}
                  <div className="w-full mt-4 pt-3 border-t border-sky-500/15">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedMentor(mentor);
                      }}
                      className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl border border-sky-400/40 bg-sky-500/10 group-hover:bg-sky-500 text-sky-300 group-hover:text-slate-950 text-xs font-bold py-2 px-3 transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      <span>View Bio &amp; Insights</span>
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Mentorship Banner */}
          <div
            className="mt-10 rounded-2xl border border-sky-400/30 bg-gradient-to-r from-blue-950/90 via-[#071a40]/90 to-indigo-950/90 p-5 sm:p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 relative overflow-hidden"
            data-reveal
          >
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md">
                <Award className="size-5" />
              </span>
              <div>
                <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-sky-400">
                  Direct Mentor Access
                </span>
                <p className="text-sm sm:text-base font-black text-white tracking-wide mt-0.5 uppercase">
                  1-ON-1 CODE REVIEWS, CAMPAIGN AUDITS &amp; CAREER GUIDANCE IN EVERY PROGRAM.
                </p>
              </div>
            </div>

            <BtnLink
              to="/request-call"
              variant="primary"
              size="md"
              className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shrink-0 whitespace-nowrap shadow-md shadow-sky-500/30"
            >
              <span>Book a Mentorship Session</span>
              <ArrowRight className="size-4 ml-1.5" />
            </BtnLink>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MENTOR POPUP MODAL DIALOG */}
      {/* ========================================================================= */}
      {selectedMentor && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mentor-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedMentor(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-sky-400/40 bg-gradient-to-b from-[#0a1835] via-[#061122] to-[#040c1a] shadow-2xl p-5 sm:p-7 text-white animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 size-56 rounded-full bg-blue-600/20 blur-3xl" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedMentor(null)}
              className="absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-full bg-slate-900/90 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-400 cursor-pointer"
              aria-label="Close mentor details"
            >
              <X className="size-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 pb-5 border-b border-sky-500/20 relative z-10">
              <div className="size-24 sm:size-28 shrink-0 rounded-full p-1 bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 ring-2 ring-[#051126] shadow-xl shadow-sky-500/25">
                <div className="size-full rounded-full overflow-hidden bg-slate-950">
                  <img
                    src={selectedMentor.image}
                    alt={selectedMentor.name}
                    className="size-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="text-center sm:text-left space-y-1.5 flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-[10px] font-black uppercase tracking-wider border shadow-sm", selectedMentor.badgeBg)}>
                    {selectedMentor.track}
                  </span>
                  <span className="text-[10px] font-bold text-sky-200 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-400/20">
                    {selectedMentor.experience}
                  </span>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 id="mentor-modal-title" className="text-xl sm:text-2xl font-black text-white">
                    {selectedMentor.name}
                  </h3>
                  <CheckCircle2 className="size-5 text-sky-400 shrink-0" aria-label="Verified Faculty" />
                </div>

                <p className="text-xs sm:text-sm font-semibold text-sky-300">
                  {selectedMentor.role}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 sm:space-y-5 py-5 relative z-10">
              {/* Detailed Bio */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-sky-400 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="size-3.5" />
                  <span>About {selectedMentor.name.split(" ")[0]}</span>
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-200 font-normal text-justify [text-align:justify] [text-justify:inter-word]">
                  {selectedMentor.fullBio}
                </p>
              </div>

              {/* Core Expertise Skills */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-sky-400 mb-2">
                  Core Technical Expertise &amp; Tools
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMentor.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-block rounded-lg bg-sky-950/70 border border-sky-400/30 px-2.5 py-1 text-xs font-semibold text-sky-200 shadow-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mentorship Focus */}
              <div className="rounded-2xl border border-sky-500/20 bg-sky-950/30 p-3.5 sm:p-4">
                <h4 className="text-xs font-black uppercase tracking-wider text-sky-400 mb-2.5">
                  What You Master in 1-on-1 Mentorship Sessions
                </h4>
                <ul className="space-y-2">
                  {selectedMentor.mentorshipFocus.map((focus) => (
                    <li key={focus} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-200 font-medium">
                      <CheckCircle2 className="size-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{focus}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-sky-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
              <a
                href={whatsappLink(`Hi DIGITECHADEMY, I would like to connect with mentor ${selectedMentor.name} for career and program guidance.`)}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold px-4 py-2.5 transition-colors shadow-md shadow-emerald-600/20"
              >
                <MessageCircle className="size-4" />
                <span>Ask via WhatsApp</span>
              </a>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedMentor(null)}
                  className="flex-1 sm:flex-initial rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-bold px-4 py-2.5 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <BtnLink
                  to="/request-call"
                  variant="primary"
                  size="sm"
                  className="flex-1 sm:flex-initial bg-sky-500 hover:bg-sky-400 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-sky-500/30 whitespace-nowrap"
                  onClick={() => setSelectedMentor(null)}
                >
                  <span>Book Mentorship Call</span>
                  <ArrowRight className="size-4 ml-1.5" />
                </BtnLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 8 — Why Learners Choose Us */}
      <section className="bg-surface border-t border-slate-200/80">
        <div className="container-site py-8 sm:py-10 lg:py-12">
          <SectionHeading
            eyebrow="WHY LEARNERS CHOOSE US"
            title="Why Learners Choose Us"
          />
          <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {whyLearnersChooseUs.map((item, index) => {
              const IconComp = item.icon;
              return (
                <article
                  key={item.title}
                  data-reveal={index % 2 === 0 ? "left" : "top"}
                  style={{ "--reveal-delay": `${(index % 2) * 120 + Math.floor(index / 2) * 80}ms` } as React.CSSProperties}
                  className="group flex flex-col justify-between gap-2.5 sm:gap-4 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-7 shadow-xs sm:shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-navy/5"
                >
                  <span className="grid size-9 sm:size-12 place-items-center rounded-lg sm:rounded-xl bg-accent/15 text-accent border border-accent/20 transition-transform duration-300 group-hover:scale-110">
                    <IconComp className="size-4.5 sm:size-6 text-accent" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-lg font-bold text-navy leading-snug">{item.title}</h3>
                    <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm leading-relaxed text-slate-600 text-justify [text-align:justify] [text-justify:inter-word]">
                      {item.text}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}


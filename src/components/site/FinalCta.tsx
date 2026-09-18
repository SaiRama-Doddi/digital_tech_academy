import { ArrowRight, CheckCircle2, PhoneCall, Sparkles } from "lucide-react";
import { BtnLink } from "./Btn";
import ctaCareerSkillsImg from "@/assets/cta-career-skills.jpg";

export function FinalCta() {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-[#071329] to-[#061122] py-7 sm:py-10 text-white overflow-hidden border-t border-slate-800/90">
      {/* Ambient glowing orbs */}
      <div
        className="pointer-events-none absolute -top-24 left-1/4 size-96 rounded-full bg-blue-600/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-1/4 size-96 rounded-full bg-indigo-500/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="grid-lines absolute inset-0 opacity-15 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left" data-reveal="left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-sky-400 text-xs font-bold tracking-widest uppercase mb-3.5 shadow-inner">
              <Sparkles className="size-3.5 text-sky-400 animate-pulse" />
              <span>FINAL CTA</span>
            </div>

            {/* Main Heading (Decreased Font Size) */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[2rem] xl:text-[2.35rem] font-black text-white tracking-tight leading-tight">
              READY TO BUILD SKILLS THAT{" "}
              <span className="bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                ACTUALLY MATTER?
              </span>
            </h2>

            {/* Description (Formatted in 2 balanced lines) */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-[15px] text-slate-300 leading-relaxed font-normal max-w-2xl lg:max-w-3xl">
              Whether you&apos;re starting your career, switching fields or upgrading your existing skills,
              <br className="hidden sm:inline" /> Digitechademy helps you move from learning concepts to applying them with confidence.
            </p>

            {/* Tagline Ribbon */}
            <div className="mt-5 inline-flex flex-wrap items-center gap-2 sm:gap-3 px-3.5 py-1.5 sm:py-2 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-md text-xs font-bold shadow-sm">
              <span className="text-sky-300">Choose Your Path</span>
              <span className="text-slate-500 font-bold">•</span>
              <span className="text-blue-200">Learn With Purpose</span>
              <span className="text-slate-500 font-bold">•</span>
              <span className="text-amber-300">Build Your Future</span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <BtnLink
                to="/courses"
                variant="primary"
                size="md"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-5 sm:px-6 py-3 rounded-xl shadow-lg shadow-blue-600/30 flex items-center gap-2 text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Explore Programs</span>
                <ArrowRight className="size-4" />
              </BtnLink>

              <BtnLink
                to="/contact"
                variant="outline"
                size="md"
                className="border-slate-600/80 bg-white/5 hover:bg-white/10 hover:border-slate-400 text-white font-bold px-5 sm:px-6 py-3 rounded-xl backdrop-blur-sm flex items-center gap-2 text-xs sm:text-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <PhoneCall className="size-4 text-sky-400" />
                <span>Talk to an Expert</span>
              </BtnLink>
            </div>

            {/* Value Badges */}
            <div className="mt-6 sm:mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                Practical Hands-On Labs
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                1-on-1 Expert Mentorship
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5 text-emerald-400" />
                Career Transition Support
              </span>
            </div>
          </div>

          {/* Right Column: Visual Image Card */}
          <div className="lg:col-span-5 relative" data-reveal="right">
            {/* Glow effect behind image */}
            <div className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-blue-600/15 to-indigo-500/20 blur-xl opacity-70" />

            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-sky-500/30 bg-slate-900/60 shadow-2xl shadow-navy/60 group">
              <img
                src={ctaCareerSkillsImg}
                alt="Practical Tech Skills Training at Digitechademy"
                className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle gradient overlay at base */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#061122]/90 via-transparent to-transparent pointer-events-none" />

              {/* Floating Feature Strip on Image */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2 p-2.5 sm:p-3 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white shadow-lg">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="grid size-8 rounded-lg bg-blue-600/30 text-sky-400 border border-blue-400/30 place-items-center shrink-0">
                    <Sparkles className="size-4 text-sky-300" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-sky-400 font-bold">100% Practical Training</p>
                    <p className="text-xs sm:text-sm font-bold text-white truncate">Job-Ready Project Defenses</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold shrink-0">
                  <CheckCircle2 className="size-3" />
                  Live Cohorts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

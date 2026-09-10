import { useEffect, useRef, useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BarChart3,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  FileText,
  GraduationCap,
  Headphones,
  Megaphone,
  Palette,
  Play,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  User,
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
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StatsSection } from "@/components/site/StatsSection";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import {
  homeFaqs,
  methodology,
  practicalTraining,
  testimonials,
  whyChooseUs,
} from "@/data/content";
import { courses } from "@/data/courses";
import { subscribeCourses, type FirebaseCourse } from "@/services/courseService";
import { subscribeTestimonials } from "@/services/testimonialService";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Marketing & Cyber Security Training | Digital Tech Solution" },
      {
        name: "description",
        content:
          "Career-focused Digital Marketing and Cyber Security courses with practical projects, expert mentors and certification. Explore programs and request a call.",
      },
      {
        property: "og:title",
        content: "Digital Marketing & Cyber Security Training | Digital Tech Solution",
      },
      {
        property: "og:description",
        content:
          "Practical, industry-focused training that turns knowledge into real-world Digital Marketing and Cyber Security skills.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <AboutPreview />
      <FeaturedCourses />
      <WhyChooseUs />
      <Methodology />
      <PracticalTraining />
      <CareerFocus />
      <Testimonials />
      <FaqPreview />
      <DemoClassModal />
    </SiteLayout>
  );
}

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
          {/* Left Column: Text, CTAs & Social Proof */}
          <div className="w-full max-w-xl text-left flex flex-col justify-center min-w-0">
            {/* Premium Pill Eyebrow */}
            <div
              className="inline-flex max-w-full items-center gap-1.5 sm:gap-2 rounded-full border border-blue-200/80 bg-gradient-to-r from-blue-50/90 via-sky-50/60 to-indigo-50/90 px-2.5 py-1 sm:px-3.5 sm:py-1.5 shadow-[0_2px_10px_-2px_rgba(37,99,235,0.12)] backdrop-blur-md mb-3 sm:mb-4 w-fit select-none transition-all duration-300 hover:border-blue-300 hover:shadow-[0_4px_14px_-2px_rgba(37,99,235,0.18)]"
              data-reveal
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-blue-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
              </span>
              <span className="text-[9.5px] xs:text-[10.5px] sm:text-xs font-black uppercase tracking-wider sm:tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 whitespace-nowrap">
                Skills Today · A Brighter Tomorrow
              </span>
              <Sparkles className="size-2.5 sm:size-3 text-blue-500/80 shrink-0" aria-hidden="true" />
            </div>

            <h1
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.85rem] font-black leading-[1.2] sm:leading-[1.15] tracking-tight text-slate-900 break-words"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              Digital Skills.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 inline-block">
                Build Real-World Expertise.
              </span>
            </h1>

            <p
              className="mt-3.5 sm:mt-4 text-xs sm:text-base text-slate-600 leading-relaxed max-w-lg font-normal text-justify sm:text-left"
              data-reveal
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            >
              Build practical skills through career-focused training in Digital Marketing, Programmatic Advertising, Cyber Security, SEO, and Performance Marketing. Learn industry-relevant tools, apply concepts through hands-on projects, and develop the confidence to take on real digital roles.
            </p>

            {/* CTAs */}
            <div
              className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3.5"
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            >
              <BtnLink
                to="/courses"
                variant="primary"
                size="md"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9.5 sm:h-12 px-4 sm:px-7 text-xs sm:text-base rounded-lg sm:rounded-xl shadow-md shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center gap-1.5 sm:gap-2 group"
              >
                <span>Explore Courses</span>
                <ArrowRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </BtnLink>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("methodology");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-9.5 sm:h-12 px-3.5 sm:px-5 rounded-lg sm:rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-200 shadow-xs hover:shadow-sm transition-all flex items-center gap-2 sm:gap-2.5 text-xs sm:text-base active:scale-[0.98] cursor-pointer"
              >
                <span className="grid size-5 sm:size-6 place-items-center rounded-full bg-blue-600 text-white shadow-xs">
                  <Play className="size-2.5 sm:size-3 fill-white ml-0.5" aria-hidden="true" />
                </span>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Social Proof */}
            <div
              className="mt-6 pt-5 border-t border-slate-200/60 flex items-center gap-3.5"
              data-reveal
              style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
            >
              <div className="flex -space-x-2">
                {[
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=120&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop",
                  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop",
                ].map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Student avatar"
                    className="size-8 rounded-full border-2 border-white object-cover shadow-xs ring-1 ring-slate-100"
                  />
                ))}
              </div>
              <div>
                <p className="text-xs sm:text-sm font-black text-blue-600 leading-tight">
                  <CountUp value={10} suffix="K+" /> Students
                </p>
                <p className="text-[11px] text-slate-500 font-medium">Already building their careers with us</p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Composition */}
          <div
            className="relative flex justify-center items-center lg:justify-end animate-fade-in duration-700 select-none w-full min-w-0"
            data-reveal="scale"
          >
            <div className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[480px] lg:max-w-[500px] flex items-center justify-center py-4 mx-auto">
              {/* Background Soft Radiant Gradient Halo */}
              <div
                className="pointer-events-none absolute inset-0 m-auto size-[300px] sm:size-[380px] rounded-full bg-gradient-to-tr from-sky-200/50 via-blue-100/35 to-indigo-100/25 blur-2xl"
                aria-hidden="true"
              />

              {/* SVG Circular Orbit Paths */}
              <svg
                className="pointer-events-none absolute inset-0 size-full"
                viewBox="0 0 500 500"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="250"
                  cy="250"
                  r="195"
                  stroke="#38bdf8"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="235"
                  stroke="#60a5fa"
                  strokeOpacity="0.25"
                  strokeWidth="1.2"
                  strokeDasharray="8 8"
                />
              </svg>

              {/* Mobile Centered Tag (sm:hidden) — Elegant, No Colliding Doodles */}
              <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex sm:hidden">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/95 border border-blue-200/80 px-3.5 py-1 text-[11px] font-black italic tracking-wide text-blue-600 shadow-xs backdrop-blur-sm whitespace-nowrap">
                  <span className="text-blue-500">✦</span>
                  <span>Learn · Practice · Grow</span>
                </div>
              </div>

              {/* Desktop Top-Left Doodle: "Learn Practice Grow" (hidden on mobile) */}
              <div className="pointer-events-none absolute left-0 sm:left-2 top-0 z-20 hidden sm:flex flex-col items-center">
                <div className="flex items-center gap-1 text-blue-600 font-black italic text-[11px] sm:text-xs tracking-wide">
                  <span className="text-blue-500">✦</span>
                  <span>Learn · Practice · Grow</span>
                </div>
                <svg
                  className="w-14 h-6 text-blue-500 -mt-0.5 ml-4"
                  viewBox="0 0 80 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M10 5 C 40 8, 55 18, 65 30" />
                  <path d="M58 28 L 65 30 L 64 22" />
                </svg>
              </div>

              {/* Desktop Top-Right Doodle: "Your Future Starts Here" (hidden on mobile) */}
              <div className="pointer-events-none absolute right-0 sm:right-2 top-0 z-20 hidden sm:flex flex-col items-center">
                <div className="flex items-center gap-1 text-blue-600 font-black italic text-[11px] sm:text-xs tracking-wide">
                  <Sparkles className="size-3.5 text-blue-500" aria-hidden="true" />
                  <span>Your Future Starts Here</span>
                </div>
                <svg
                  className="w-14 h-6 text-blue-500 -mt-0.5 -mr-4"
                  viewBox="0 0 80 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M70 5 C 45 8, 30 18, 20 30" />
                  <path d="M26 22 L 20 30 L 28 29" />
                </svg>
              </div>

              {/* Centerpiece Student Photo — Crystal Clear, Unobstructed */}
              <div className="relative z-10 w-[88%] sm:w-[78%] max-w-[370px] lg:max-w-[400px] flex justify-center">
                <img
                  src={heroStudentImg}
                  alt="Digitechademy student building real-world expertise"
                  className="w-full object-contain rounded-2xl drop-shadow-xl"
                />
              </div>

              {/* Mobile Subtle Floating Chips (sm:hidden) — Non-obtrusive outer edge chips */}
              <div className="sm:hidden absolute left-0 top-6 z-20 flex items-center gap-1 rounded-full bg-white/95 border border-slate-200/90 shadow-md px-2 py-0.5 backdrop-blur-md">
                <span className="grid size-4.5 place-items-center rounded-full bg-blue-50 text-blue-600">
                  <ShieldCheck className="size-2.5" aria-hidden="true" />
                </span>
                <span className="text-[9px] font-black text-slate-800 whitespace-nowrap">Cyber Security</span>
              </div>

              <div className="sm:hidden absolute right-0 top-6 z-20 flex items-center gap-1 rounded-full bg-white/95 border border-slate-200/90 shadow-md px-2 py-0.5 backdrop-blur-md">
                <span className="grid size-4.5 place-items-center rounded-full bg-blue-50 text-blue-600">
                  <Megaphone className="size-2.5" aria-hidden="true" />
                </span>
                <span className="text-[9px] font-black text-slate-800 whitespace-nowrap">Digital Marketing</span>
              </div>

              <div className="sm:hidden absolute right-0 bottom-14 z-20 flex items-center gap-1 rounded-full bg-slate-950 text-white shadow-md border border-slate-800 px-2 py-0.5">
                <GraduationCap className="size-2.5 text-cyan-400" aria-hidden="true" />
                <span className="text-[8.5px] font-black uppercase tracking-wider whitespace-nowrap">Job-Ready Skills</span>
              </div>

              {/* Desktop/Tablet Floating Card 1 (Top-Left): Digital Marketing */}
              <div className="hidden sm:block absolute left-0 sm:-left-2 lg:-left-4 top-14 sm:top-16 z-20 rounded-lg sm:rounded-xl border border-white/90 bg-white/95 shadow-md p-1.5 sm:p-2.5 backdrop-blur-md w-32 sm:w-38 transition-transform duration-300 hover:scale-105">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="grid size-5 sm:size-6 shrink-0 place-items-center rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                    <Megaphone className="size-2.5 sm:size-3" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-black text-slate-900 leading-tight">Digital Marketing</p>
                    <p className="text-[8px] sm:text-[8.5px] text-slate-400 font-medium truncate">From strategy to execution</p>
                  </div>
                </div>
                {/* Mini Bar Chart */}
                <div className="mt-1 flex items-end justify-between gap-0.5 sm:gap-1 h-3.5 sm:h-4 pt-0.5 px-0.5 sm:px-1 bg-slate-50/90 rounded">
                  {[28, 42, 35, 58, 50, 72, 65, 92].map((height, i) => (
                    <span
                      key={i}
                      className="w-full bg-blue-600 rounded-xs transition-all"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Desktop/Tablet Floating Card 2 (Bottom-Left): Cyber Security */}
              <div className="hidden sm:block absolute left-0 sm:-left-2 lg:-left-4 bottom-14 sm:bottom-16 z-20 rounded-lg sm:rounded-xl border border-white/90 bg-white/95 shadow-md p-1.5 sm:p-2.5 backdrop-blur-md w-30 sm:w-36 transition-transform duration-300 hover:scale-105">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="grid size-5 sm:size-6 shrink-0 place-items-center rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                    <ShieldCheck className="size-2.5 sm:size-3" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-black text-slate-900 leading-tight">Cyber Security</p>
                    <p className="text-[8px] sm:text-[8.5px] text-slate-400 font-medium truncate">Stay ahead. Stay secure.</p>
                  </div>
                </div>
                {/* Mini Upward Line Chart */}
                <div className="mt-1 h-3.5 sm:h-4 w-full flex items-center">
                  <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 28" fill="none" aria-hidden="true">
                    <path
                      d="M 0 24 Q 25 18, 45 20 T 80 8 T 100 3"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0 24 Q 25 18, 45 20 T 80 8 T 100 3 L 100 28 L 0 28 Z"
                      fill="currentColor"
                      fillOpacity="0.12"
                    />
                  </svg>
                </div>
              </div>

              {/* Desktop/Tablet Floating Card 3 (Top-Right): Hands-on Projects */}
              <div className="hidden sm:block absolute right-0 sm:-right-2 lg:-right-4 top-10 sm:top-12 z-20 rounded-lg sm:rounded-xl border border-white/90 bg-white/95 shadow-md p-1.5 sm:p-2.5 backdrop-blur-md w-34 sm:w-40 transition-transform duration-300 hover:scale-105">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="grid size-5 sm:size-6 shrink-0 place-items-center rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                    <FileText className="size-2.5 sm:size-3" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-black text-slate-900 leading-tight">Hands-on Projects</p>
                    <p className="text-[8px] sm:text-[8.5px] text-slate-400 font-medium truncate">Build real-world experience</p>
                  </div>
                </div>
                {/* Mini Collaboration Image */}
                <div className="mt-1 overflow-hidden rounded border border-slate-100 h-8 sm:h-9 w-full">
                  <img
                    src={aboutImg}
                    alt="Students collaborating on projects"
                    className="size-full object-cover"
                  />
                </div>
              </div>

              {/* Desktop/Tablet Floating Card 4 (Bottom-Right): Career Support */}
              <div className="hidden sm:block absolute right-0 sm:-right-2 lg:-right-4 bottom-18 sm:bottom-20 z-20 rounded-lg sm:rounded-xl border border-white/90 bg-white/95 shadow-md p-1.5 sm:p-2.5 backdrop-blur-md w-30 sm:w-36 transition-transform duration-300 hover:scale-105">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="grid size-5 sm:size-6 shrink-0 place-items-center rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                    <User className="size-2.5 sm:size-3" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-[11px] font-black text-slate-900 leading-tight">Career Support</p>
                    <p className="text-[8px] sm:text-[8.5px] text-slate-400 font-medium truncate">Guidance till you succeed</p>
                  </div>
                </div>
                {/* Upward Growth Arrow */}
                <div className="mt-1 h-3.5 sm:h-4 w-full flex items-center">
                  <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 28" fill="none" aria-hidden="true">
                    <path
                      d="M 0 24 C 30 22, 50 14, 75 10 L 95 4"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <polygon points="90,3 98,3 96,10" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Attached Circular Badge: Job-Ready Skills (Desktop/Tablet) */}
              <div className="hidden sm:flex absolute right-[4%] bottom-[12%] sm:bottom-[14%] z-30 size-14 sm:size-16 rounded-full bg-slate-950 text-white shadow-xl border-2 border-white flex-col items-center justify-center p-1 text-center transition-transform hover:scale-110">
                <GraduationCap className="size-3.5 sm:size-4 text-cyan-400" aria-hidden="true" />
                <span className="text-[7.5px] sm:text-[8px] font-black uppercase tracking-wider leading-tight mt-0.5">
                  Job-Ready
                  <br />
                  Skills
                </span>
              </div>

              {/* Bottom Pill Strip - 100% Responsive on All Screens */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-30 w-full max-w-full px-2 sm:max-w-none flex justify-center pointer-events-none">
                <div className="pointer-events-auto inline-flex items-center justify-center gap-1.5 sm:gap-2.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md px-3 sm:px-5 py-1 sm:py-1.5 text-[9.5px] sm:text-xs font-bold text-slate-800 text-center whitespace-nowrap">
                  <span>Industry Experts</span>
                  <span className="text-slate-300 font-normal">|</span>
                  <span>Get Certified</span>
                  <span className="text-slate-300 font-normal">|</span>
                  <span className="hidden sm:inline">Grow Your </span>
                  <span>Career</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 — Elevated Stats Bar */}
        <div
          className="mt-6 sm:mt-8 w-full max-w-6xl mx-auto rounded-2xl bg-white border border-slate-200/80 shadow-[0_8px_30px_-10px_rgba(8,20,38,0.06)] px-3 sm:px-6 py-3 sm:py-4"
          data-reveal
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-0 lg:divide-x lg:divide-slate-100">
            <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-5">
              <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
                <Users className="size-4 sm:size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-2xl font-black text-slate-900 leading-none">
                  <CountUp value={10} suffix="K+" />
                </p>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-1 leading-tight truncate sm:whitespace-normal">
                  Students Trained
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-5">
              <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
                <UserCheck className="size-4 sm:size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-2xl font-black text-slate-900 leading-none">
                  <CountUp value={50} suffix="+" />
                </p>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-1 leading-tight truncate sm:whitespace-normal">
                  Expert Trainers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-5">
              <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
                <Cpu className="size-4 sm:size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-2xl font-black text-slate-900 leading-none">
                  <CountUp value={20} suffix="+" />
                </p>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-1 leading-tight truncate sm:whitespace-normal">
                  Industry Courses
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 px-1 sm:px-5">
              <span className="grid size-8 sm:size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 shadow-xs">
                <ShieldCheck className="size-4 sm:size-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-lg sm:text-2xl font-black text-slate-900 leading-none">
                  <CountUp value={95} suffix="%" />
                </p>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-1 leading-tight truncate sm:whitespace-normal">
                  Career Advancement
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="bg-background overflow-hidden">
      <div className="container-site py-8 sm:py-10 lg:py-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative" data-reveal="left">
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-md">
            <img
              src={aboutImg}
              alt="Instructor guiding students during a practical technology training session"
              loading="lazy"
              width={1200}
              height={1008}
              className="aspect-[5/4] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -bottom-5 -right-3 hidden rounded-xl border border-slate-200/80 bg-white/95 backdrop-blur-md p-4 shadow-lg sm:block">
            <p className="font-display text-2xl font-black text-accent">95%</p>
            <p className="text-xs font-bold text-slate-600">Learning satisfaction</p>
          </div>
        </div>

        <div data-reveal="right">
          <SectionHeading
            eyebrow="ABOUT DIGITECHADEMY"
            title="Training Built Around Skills You Can Actually Use"
            singleLine={false}
            description={
              <>
                <span className="sm:hidden">
                  Digitechademy turns digital concepts into practical, career-ready skills through hands-on practice, industry tools, and guided projects.
                </span>
                <span className="hidden sm:inline">
                  Digitechademy helps learners turn digital concepts into practical, career-ready skills. Our training combines structured learning, hands-on practice, industry tools, guided projects, and real-world scenarios across digital marketing and technology-focused disciplines.
                </span>
              </>
            }
            align="left"
            descriptionClassName="text-justify [text-align:justify] [text-justify:inter-word]"
          />
          <ul className="mt-3.5 sm:mt-6 flex flex-col gap-1.5 sm:gap-3">
            {[
              {
                mobile: "Learn fundamentals before advanced concepts.",
                full: "Learn the fundamentals before moving into advanced concepts.",
              },
              {
                mobile: "Practice with industry tools & real workflows.",
                full: "Practice with tools, workflows, campaigns, and realistic business scenarios.",
              },
              {
                mobile: "Build practical confidence & career readiness.",
                full: "Develop practical confidence that extends beyond course completion.",
              },
            ].map((item) => (
              <li
                key={item.full}
                className="flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-slate-200/80 bg-white py-1.5 px-2.5 sm:py-3.5 sm:px-4 text-[11.5px] sm:text-sm font-medium text-slate-700 shadow-xs sm:shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md"
              >
                <span className="grid size-3.5 sm:size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                  <CheckCircle2 className="size-2 sm:size-3.5" aria-hidden="true" />
                </span>
                <span className="leading-snug text-left">
                  <span className="sm:hidden">{item.mobile}</span>
                  <span className="hidden sm:inline">{item.full}</span>
                </span>
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="group mt-4 sm:mt-7 inline-flex items-center gap-1.5 sm:gap-2 text-[11.5px] sm:text-sm font-bold text-slate-900 transition-colors hover:text-accent"
          >
            <span>Discover Our Approach</span>
            <ArrowRight
              className="size-3 sm:size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

const popularCategories = [
  {
    title: "Digital Marketing",
    skills: "SEO, Social Media, Ads & More",
    coursesCount: "120+ Courses",
    href: "/courses",
    icon: Megaphone,
    bgGradient: "from-rose-50/80 via-white to-rose-50/30",
    borderColor: "border-rose-100 hover:border-rose-200",
    iconBg: "bg-rose-100 text-rose-600",
    btnBg: "bg-rose-100/90 text-rose-600 group-hover:bg-rose-200",
  },
  {
    title: "Web Development",
    skills: "HTML, CSS, JavaScript, React & More",
    coursesCount: "150+ Courses",
    href: "/courses",
    icon: Code2,
    bgGradient: "from-emerald-50/80 via-white to-emerald-50/30",
    borderColor: "border-emerald-100 hover:border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-600",
    btnBg: "bg-emerald-100/90 text-emerald-600 group-hover:bg-emerald-200",
  },
  {
    title: "Data Analytics",
    skills: "Excel, SQL, Power BI, Python",
    coursesCount: "100+ Courses",
    href: "/courses",
    icon: BarChart3,
    bgGradient: "from-purple-50/80 via-white to-purple-50/30",
    borderColor: "border-purple-100 hover:border-purple-200",
    iconBg: "bg-purple-100 text-purple-600",
    btnBg: "bg-purple-100/90 text-purple-600 group-hover:bg-purple-200",
  },
  {
    title: "Cyber Security",
    skills: "Network Security, Ethical Hacking",
    coursesCount: "80+ Courses",
    href: "/courses",
    icon: ShieldCheck,
    bgGradient: "from-amber-50/80 via-white to-amber-50/30",
    borderColor: "border-amber-100 hover:border-amber-200",
    iconBg: "bg-amber-100 text-amber-600",
    btnBg: "bg-amber-100/90 text-amber-600 group-hover:bg-amber-200",
  },
  {
    title: "Design & Creative",
    skills: "UI/UX, Graphic Design, Video Editing",
    coursesCount: "90+ Courses",
    href: "/courses",
    icon: Palette,
    bgGradient: "from-sky-50/80 via-white to-sky-50/30",
    borderColor: "border-sky-100 hover:border-sky-200",
    iconBg: "bg-sky-100 text-sky-600",
    btnBg: "bg-sky-100/90 text-sky-600 group-hover:bg-sky-200",
  },
  {
    title: "Business & Management",
    skills: "Leadership, Product, Career Growth",
    coursesCount: "70+ Courses",
    href: "/courses",
    icon: Briefcase,
    bgGradient: "from-pink-50/80 via-white to-pink-50/30",
    borderColor: "border-pink-100 hover:border-pink-200",
    iconBg: "bg-pink-100 text-pink-600",
    btnBg: "bg-pink-100/90 text-pink-600 group-hover:bg-pink-200",
  },
];

function FeaturedCourses() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [liveCourses, setLiveCourses] = useState<FirebaseCourse[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("digital_tech_courses_db");
        if (raw) return JSON.parse(raw);
      } catch {}
    }
    return courses.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      category: c.category,
      description: c.description,
      duration: c.duration,
      level: c.level,
      instructor: c.instructors?.[0]?.name || "Sai Rama",
      price: c.pricing?.fee || "₹24,999",
      highlights: c.highlights || [],
      syllabus: c.syllabus || [],
      students: 180,
      active: true,
      featured: true,
      image: c.image || "",
    }));
  });

  // Subscribe to live Firebase courses
  useEffect(() => {
    const unsub = subscribeCourses((courses) => {
      setLiveCourses(courses);
    });
    return () => unsub();
  }, []);

  // Filter courses displayed directly in this section
  const displayedCourses = useMemo(() => {
    const active = liveCourses.filter((c) => c.active !== false);
    if (selectedCategory === "All") {
      return active;
    }
    return active.filter(
      (c) => c.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [liveCourses, selectedCategory]);

  return (
    <section id="courses" className="bg-white py-10 sm:py-14 lg:py-16 border-y border-slate-200/80 overflow-hidden">
      <div className="container-site">
        {/* Header matching reference design with right-aligned View All Courses link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10" data-reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 select-none">
              EXPLORE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[2.35rem] font-black text-slate-900 tracking-tight mt-1 leading-[1.15]">
              Popular Course Categories
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1.5 font-normal leading-relaxed text-justify [text-align:justify] [text-justify:inter-word]">
              Choose from our most in-demand programs and start your learning journey today.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group"
            >
              <span>View All Courses</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Category Quick Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0" data-reveal>
          {["All", ...popularCategories.map((c) => c.title)].map((catName) => {
            const isSelected = selectedCategory === catName;
            const count = catName === "All"
              ? liveCourses.filter((c) => c.active !== false).length
              : liveCourses.filter((c) => c.category.toLowerCase() === catName.toLowerCase() && c.active !== false).length;

            return (
              <button
                key={catName}
                type="button"
                onClick={() => setSelectedCategory(catName)}
                className={cn(
                  "shrink-0 text-xs font-bold px-3.5 sm:px-4 py-2 rounded-xl transition-all cursor-pointer flex items-center gap-1.5",
                  isSelected
                    ? "bg-slate-950 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                )}
              >
                <span>{catName === "All" ? "All Programs" : catName}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.2 rounded-full font-extrabold",
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-600"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Courses Grid Styled with Category Theme UI */}
        {displayedCourses.length > 0 ? (
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedCourses.map((course) => (
              <CourseCard key={course.slug || course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 sm:p-12 text-center max-w-md mx-auto">
            <div className="size-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <Sparkles className="size-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              New {selectedCategory} Courses Coming Soon
            </h4>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              We are curating high-impact curriculum for this category. Explore our live courses below or in our catalog.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors cursor-pointer"
            >
              View All Available Courses
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="surface-navy relative overflow-hidden">
      {/* Subtle cyber grid backdrop */}
      <div className="grid-lines absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Ambient cyan and blue glow */}
      <div
        className="pointer-events-none absolute -left-20 -top-20 size-[32rem] rounded-full bg-blue-600/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 -bottom-20 size-[32rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative z-10 py-10 sm:py-12 lg:py-14">
        <SectionHeading
          eyebrow="WHY CHOOSE US"
          title="More Than a Course. A Practical Learning Experience."
          description="A learning experience designed around practice, industry relevance and measurable progress."
          align="left"
          onDark
        />

        {/* 2 Cards in a Row on Mobile, 4 Cards on Desktop */}
        <div className="mt-10 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 sm:gap-6 pt-8 sm:pt-6">
          {whyChooseUs.map((item, index) => (
            <article
              key={item.title}
              data-reveal={index % 2 === 0 ? "left" : "top"}
              style={{ "--reveal-delay": `${(index % 2) * 120 + Math.floor(index / 2) * 80}ms` } as React.CSSProperties}
              className="group relative flex flex-col justify-between rounded-2xl border border-sky-500/25 bg-[#0b1c34]/90 backdrop-blur-md p-3 sm:p-6 pt-8 sm:pt-9 shadow-lg shadow-black/25 transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-400/60 hover:shadow-xl hover:shadow-blue-500/15"
            >
              {/* Circular Icon Badge Straddling Top Border */}
              <div className="absolute -top-5 sm:-top-6 left-3 sm:left-7 z-10">
                <div className="relative flex items-center justify-center">
                  {/* Soft luminous halo */}
                  <div
                    className="absolute -inset-1.5 rounded-full bg-sky-400/30 blur-sm transition-all duration-300 group-hover:bg-sky-400/50 group-hover:blur-md"
                    aria-hidden="true"
                  />
                  {/* Glowing Circle Badge */}
                  <span className="relative grid size-11 sm:size-13 place-items-center rounded-full bg-gradient-to-b from-sky-400 via-blue-600 to-blue-800 text-white border-2 border-sky-300/40 shadow-md shadow-blue-950/60 transition-transform duration-300 group-hover:scale-110">
                    <Icon name={item.icon} className="size-5.5 sm:size-6.5 text-white drop-shadow-xs" />
                  </span>
                </div>
              </div>

              <div>
                {/* Title */}
                <h3 className="min-h-[30px] sm:min-h-0 flex items-center sm:block text-xs sm:text-base sm:text-[17px] font-bold text-white transition-colors group-hover:text-sky-300 leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mt-1.5 sm:mt-2.5 text-[10.5px] sm:text-[13px] leading-relaxed text-slate-300 font-normal text-justify [text-align:justify] [text-justify:inter-word] [hyphens:auto]">
                  {item.text}
                </p>
              </div>

              {/* Connector arrow between cards on desktop */}
              {index < whyChooseUs.length - 1 && (
                <div
                  className="pointer-events-none absolute -right-3.5 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center z-20"
                  aria-hidden="true"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-[#081426] border border-sky-400/40 text-sky-400 shadow-sm shadow-blue-950/50">
                    <ChevronRight className="size-3" />
                  </span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section id="methodology" className="surface-navy relative overflow-hidden py-8 sm:py-14 lg:py-16 border-t border-navy-700/60">
      <div className="grid-lines absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-20 -bottom-20 size-[32rem] rounded-full bg-blue-600/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-[32rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative z-10 overflow-x-clip">
        <SectionHeading
          eyebrow="OUR LEARNING APPROACH"
          title="From Concept Architecture to Real-World Mastery"
          description="An interactive 5-stage progressive pathway designed to move you from fundamental concepts to building portfolio-grade deliverables."
          align="left"
          onDark
        />
        <div className="mt-5 sm:mt-10">
          <StudentLearningPath />
        </div>
      </div>
    </section>
  );
}

function PracticalTraining() {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-advancing sequential transition effect:
  // Card 1 (Top-Left) -> Card 2 (Top-Right) -> Card 3 (Mid-Left) -> Card 4 (Mid-Right) -> Card 5 (Bottom)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % practicalTraining.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="bg-surface overflow-hidden">
      <div className="container-site py-8 sm:py-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div data-reveal="left">
            <SectionHeading
              eyebrow="PRACTICAL EXPERIENCE"
              title="Practice the Work. Build the Skill. Be Ready for the Real World."
              description="Real capability comes from applying what you learn. Our practical learning experience connects concepts with the tasks, decisions, tools, and problem-solving situations professionals encounter in the workplace."
              align="left"
              singleLine={false}
            />
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <BtnLink
                to="/courses"
                variant="primary"
                size="md"
                className="bg-navy hover:bg-navy-700 text-white font-bold h-12 px-7 rounded-xl inline-flex items-center gap-2 shadow-md shadow-navy/10 hover:shadow-accent/20 transition-all duration-300"
              >
                <span>Explore Practical Learning</span>
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </BtnLink>

              {/* Live Transition Step Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/90 text-blue-700 text-xs font-bold shadow-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-blue-600" />
                </span>
                <span>Transitioning: Step {activeCard + 1} of 5</span>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-2 gap-2.5 sm:gap-4"
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
                    "group relative overflow-hidden rounded-xl sm:rounded-2xl border p-2.5 sm:p-5 shadow-sm transition-all duration-500 ease-out cursor-pointer select-none",
                    "flex flex-col sm:flex-row items-start gap-2 sm:gap-3.5",
                    isActive
                      ? "border-sky-400 bg-gradient-to-br from-blue-50/90 via-white to-indigo-50/70 shadow-xl shadow-blue-500/15 -translate-y-1.5 translate-x-1.5 scale-[1.02]"
                      : "border-slate-200/80 bg-white hover:border-sky-300 hover:shadow-md hover:-translate-y-0.5 hover:translate-x-0.5",
                    index === 4 ? "col-span-2 sm:col-span-2" : "",
                  )}
                >
                  {/* Left-to-right top border gradient sweep (Active on highlighted card or hover) */}
                  <span
                    className={cn(
                      "absolute top-0 left-0 h-1 transition-all duration-500 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    )}
                    aria-hidden="true"
                  />
                  {/* Top-to-bottom left border gradient sweep (Active on highlighted card or hover) */}
                  <span
                    className={cn(
                      "absolute top-0 left-0 w-1 transition-all duration-500 bg-gradient-to-b from-blue-600 via-indigo-600 to-sky-400",
                      isActive ? "h-full" : "h-0 group-hover:h-full",
                    )}
                    aria-hidden="true"
                  />

                  {/* Shimmer Light Beam on active card */}
                  <div
                    className={cn(
                      "pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-blue-400/25 to-transparent rotate-25 transition-opacity duration-300",
                      isActive ? "animate-diagonal-sweep opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                    aria-hidden="true"
                  />

                  <span
                    className={cn(
                      "relative z-10 grid size-8 sm:size-11 shrink-0 place-items-center rounded-lg sm:rounded-xl transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 scale-110"
                        : "bg-navy/5 text-accent border border-navy/10 group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:scale-105",
                    )}
                  >
                    <Icon name={item.icon} className="size-4 sm:size-5" />
                  </span>

                  <div className="relative z-10 min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <h3
                        className={cn(
                          "text-xs sm:text-sm font-extrabold transition-colors leading-tight",
                          isActive ? "text-blue-600" : "text-slate-800 group-hover:text-blue-600",
                        )}
                      >
                        {item.title}
                      </h3>
                      {isActive && (
                        <span className="size-1.5 rounded-full bg-blue-600 animate-pulse shrink-0" />
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 hidden sm:block">
                      {item.text}
                    </p>
                    <p className="mt-0.5 text-[10.5px] leading-snug text-slate-500 font-normal sm:hidden">
                      {(item as { shortText?: string; text: string }).shortText || item.text}
                    </p>
                  </div>

                  {/* Active Linear Progress Bar on Bottom Edge */}
                  {isActive && (
                    <div className="absolute bottom-0 inset-x-0 h-0.75 bg-blue-100/60 overflow-hidden">
                      <div
                        key={`prog-${activeCard}`}
                        className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400"
                        style={{
                          animation: isPaused
                            ? "none"
                            : "learning-stage-fill 2600ms linear forwards",
                        }}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerFocus() {
  const benefits = [
    {
      title: "Job-Ready Capabilities",
      desc: "Skills mapped directly to live digital marketing and cyber security roles.",
      badge: "Role-Aligned",
      icon: Briefcase,
      color: "from-sky-500/20 to-blue-600/20 border-sky-400/30 text-sky-400",
      accent: "from-sky-400 to-blue-600",
      glow: "hover:shadow-sky-500/20 hover:border-sky-400/50",
    },
    {
      title: "Portfolio Deliverables",
      desc: "Build concrete case studies, campaign plans, and assessment reports.",
      badge: "Live Projects",
      icon: FileText,
      color: "from-indigo-500/20 to-purple-600/20 border-indigo-400/30 text-indigo-400",
      accent: "from-indigo-400 to-purple-600",
      glow: "hover:shadow-indigo-500/20 hover:border-indigo-400/50",
    },
    {
      title: "Professional Confidence",
      desc: "Master the tools, metrics, and workflows expected in modern teams.",
      badge: "Tool Mastery",
      icon: Sparkles,
      color: "from-emerald-500/20 to-teal-600/20 border-emerald-400/30 text-emerald-400",
      accent: "from-emerald-400 to-teal-600",
      glow: "hover:shadow-emerald-500/20 hover:border-emerald-400/50",
    },
  ];

  return (
    <section className="bg-background overflow-hidden">
      <div className="container-site py-8 sm:py-12 lg:py-16">
        <div
          data-reveal
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#06132d] via-[#091f48] to-[#040e24] p-5 sm:p-10 lg:p-14 border border-sky-500/20 shadow-2xl shadow-navy/40"
        >
          {/* Subtle cyber grid and ambient lighting */}
          <div className="grid-lines absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -right-20 -top-20 size-80 sm:size-96 rounded-full bg-sky-500/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute left-1/4 -bottom-20 size-72 sm:size-80 rounded-full bg-indigo-500/15 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Content Column */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-[11px] font-bold tracking-widest text-sky-300 uppercase">
                <span className="size-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span>Build Your Career With Confidence</span>
              </div>

              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight">
                Turn Knowledge Into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-200 to-indigo-200">
                  Career-Ready Skills
                </span>
              </h2>

              <p className="mt-4 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-slate-300 max-w-2xl text-justify [text-align:justify] [text-justify:inter-word]">
                Whether you are starting your career, strengthening your current skill set, or moving into a new digital role, focused practical training can help you build a stronger professional foundation. Learn the concepts, practise the workflows, and develop skills you can demonstrate with confidence.
              </p>

              {/* Trust Metric Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-semibold text-slate-300">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle2 className="size-3.5 text-sky-400" />
                  <span>100% Practical Focus</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle2 className="size-3.5 text-indigo-400" />
                  <span>Industry Mentor Feedback</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                  <CheckCircle2 className="size-3.5 text-emerald-400" />
                  <span>Verified Credentials</span>
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <BtnLink
                  to="/courses"
                  variant="primary"
                  size="md"
                  className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-white font-extrabold h-12 px-7 rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                >
                  <span>Explore Career-Focused Courses</span>
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </BtnLink>
              </div>
            </div>

            {/* Right Cards Column - Transition Effect From Left to Right and Top to Bottom */}
            <div className="grid gap-3 sm:gap-3.5">
              {benefits.map((benefit, idx) => {
                const IconComp = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    data-reveal="top-left"
                    style={{ "--reveal-delay": `${(idx + 1) * 110}ms` } as React.CSSProperties}
                    className="w-full"
                  >
                    <div
                      className={cn(
                        "group relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-3.5 sm:p-4.5 cursor-pointer",
                        // LEFT TO RIGHT TRANSITION ON HOVER
                        "transition-all duration-300 ease-out hover:translate-x-3 sm:hover:translate-x-4 hover:bg-white/[0.08] hover:shadow-xl",
                        benefit.glow
                      )}
                    >
                      {/* Glowing Left-to-Right Accent Indicator Bar */}
                      <div
                        className={cn(
                          "absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out -translate-x-full group-hover:translate-x-0",
                          benefit.accent
                        )}
                        aria-hidden="true"
                      />

                      {/* Left-to-Right Animated Shimmer / Light Sweep */}
                      <div
                        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        aria-hidden="true"
                      />

                      <div className="flex items-start gap-3 sm:gap-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1">
                        <span
                          className={cn(
                            "mt-0.5 grid size-9 sm:size-10 shrink-0 place-items-center rounded-xl border bg-gradient-to-br transition-all duration-300 ease-out group-hover:scale-105 group-hover:translate-x-1 group-hover:shadow-md",
                            benefit.color
                          )}
                        >
                          <IconComp className="size-4 sm:size-4.5" aria-hidden="true" />
                        </span>

                        <div className="min-w-0 flex-1 transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide transition-colors duration-200 group-hover:text-white">
                              {benefit.title}
                            </h3>
                            <span className="text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 shrink-0 transition-all duration-300 group-hover:bg-white/10 group-hover:text-white group-hover:border-white/20">
                              {benefit.badge}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-slate-300 leading-relaxed text-left transition-colors duration-200 group-hover:text-slate-200">
                            {benefit.desc}
                          </p>
                        </div>

                        {/* Right Chevron indicating forward transition direction */}
                        <ChevronRight
                          className="size-4 text-slate-500/0 group-hover:text-sky-400 self-center shrink-0 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-out"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Testimonials() {
  const [liveTestimonials, setLiveTestimonials] = useState(testimonials);

  useEffect(() => {
    const unsub = subscribeTestimonials((data) => {
      if (data && data.length > 0) {
        setLiveTestimonials(
          data.map((t) => ({
            name: t.name,
            course: t.course,
            rating: t.rating || 5,
            quote: t.content,
            initials: t.name.charAt(0).toUpperCase(),
          }))
        );
      }
    });
    return () => unsub();
  }, []);

  return (
    <section className="bg-surface overflow-hidden">
      <div className="container-site py-8 sm:py-10 lg:py-12">
        <SectionHeading
          eyebrow="LEARNER EXPERIENCES"
          title="What Our Learners Say"
          description="Discover how learners experience practical training, structured guidance, and career-focused learning at Digitechademy."
          align="left"
        />
        <div className="mt-8">
          <TestimonialCarousel items={liveTestimonials.slice(0, 3)} />
        </div>
        <div className="mt-10 flex justify-center" data-reveal>
          <BtnLink
            to="/testimonials"
            variant="outline"
            size="md"
            className="border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 hover:border-accent hover:text-accent font-bold px-7 h-11 rounded-xl shadow-sm transition-all duration-300 flex items-center gap-2"
          >
            <span>Read All Testimonials</span>
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </BtnLink>
        </div>
      </div>
    </section>
  );
}

function FaqPreview() {
  return (
    <section className="bg-background overflow-hidden">
      <div className="container-site py-8 sm:py-10 lg:py-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div data-reveal="left">
          <SectionHeading
            eyebrow="FREQUENTLY ASKED QUESTIONS"
            title="Questions Before You Start?"
            description="Find answers to common questions about eligibility, course structure, prerequisites, and learning pathways at Digitechademy."
            align="left"
            singleLine={false}
          />
          <div className="mt-8">
            <BtnLink
              to="/faq"
              variant="outline"
              size="md"
              className="border-slate-200 bg-white/80 backdrop-blur-sm text-slate-800 hover:border-accent hover:text-accent font-bold px-7 h-11 rounded-xl shadow-sm transition-all duration-300 inline-flex items-center gap-2"
            >
              <span>View All FAQs</span>
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </BtnLink>
          </div>
        </div>
        <FaqAccordion items={homeFaqs} />
      </div>
    </section>
  );
}


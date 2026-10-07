import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect, type CSSProperties } from "react";
import { courses } from "@/data/courses";
import domainCyberSecurityImg from "@/assets/domain-cyber-security.jpg";
import domainDigitalMarketingImg from "@/assets/domain-digital-marketing.jpg";
import domainProgrammaticAdsImg from "@/assets/domain-programmatic-ads.jpg";
import domainAiAutomationImg from "@/assets/domain-ai-automation.jpg";
import domainFullstackDevImg from "@/assets/domain-fullstack-dev.jpg";
import {
  subscribeCourses,
  normalizeCourseCategory,
  getDefaultCoursesList,
  type FirebaseCourse,
} from "@/services/courseService";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BtnLink } from "@/components/site/Btn";
import { CourseDemoSidebar } from "@/components/site/CourseDemoSidebar";
import { getCourseCategory, getCourseImage } from "@/components/site/CourseCard";
import {
  Award,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Heart,
  HelpCircle,
  PhoneCall,
  Signal,
  Sparkles,
  UserPlus,
  ArrowRight,
  X,
  ShieldCheck,
  Megaphone,
  Radio,
  Bot,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DOMAIN_SPOTLIGHTS: Record<string, {
  eyebrow: string;
  title: string;
  desc: string;
  image: string;
  badgeStyle: string;
  skills: string[];
}> = {
  "Cyber Security": {
    eyebrow: "DEFENSE & ETHICAL HACKING",
    title: "Cyber Security & Defensive Operations",
    desc: "Master hands-on penetration testing, vulnerability assessments, network defense, Linux administration, and SOC incident analysis.",
    image: domainCyberSecurityImg,
    badgeStyle: "bg-blue-50 text-blue-800 border-blue-200",
    skills: ["Ethical Hacking", "Network Defense", "SOC Incident Response", "Vulnerability Assessment"],
  },
  "Digital Marketing": {
    eyebrow: "GROWTH & PERFORMANCE",
    title: "Digital Marketing & Performance Growth",
    desc: "Scale traffic and conversions across modern SEO, Meta/Google Ads, viral funnels, and data-driven GA4 analytics.",
    image: domainDigitalMarketingImg,
    badgeStyle: "bg-sky-50 text-sky-800 border-sky-200",
    skills: ["SEO Strategy", "Google & Meta Ads", "Conversion Rate Optimization", "GA4 Analytics"],
  },
  "Programmatic Advertising": {
    eyebrow: "ADTECH & REAL-TIME BIDDING",
    title: "Programmatic Advertising & DSP Trading",
    desc: "Enterprise AdTech media buying, real-time bidding algorithms, Google DV360, CM360, SSPs, and publisher monetization.",
    image: domainProgrammaticAdsImg,
    badgeStyle: "bg-blue-50 text-blue-800 border-blue-200",
    skills: ["DV360 & CM360", "Real-Time Bidding", "Audience Targeting", "DSP & SSP Platforms"],
  },
  "AI & Automation": {
    eyebrow: "AI AGENTS & SMART WORKFLOWS",
    title: "AI Agents & Intelligent Automation",
    desc: "Automate modern business operations with autonomous AI agents, Zapier pipelines, smart CRM integrations, and LLM apps.",
    image: domainAiAutomationImg,
    badgeStyle: "bg-amber-50 text-amber-800 border-amber-200",
    skills: ["Autonomous AI Agents", "Zapier & Webhooks", "CRM Pipelines", "Chatbot Funnels"],
  },
  "Full Stack Development": {
    eyebrow: "REACT & NODE.JS ENGINEERING",
    title: "Full Stack Web Engineering Masterclass",
    desc: "Build scalable full-stack web applications with React 19, TypeScript, Node.js, Express, databases, and cloud DevOps.",
    image: domainFullstackDevImg,
    badgeStyle: "bg-sky-50 text-sky-800 border-sky-200",
    skills: ["React & TypeScript", "Node.js & Express", "Databases & APIs", "AWS Cloud & DevOps"],
  },
};

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Practical Courses for Today's Digital Careers | DIGITECHADEMY" },
      {
        name: "description",
        content:
          "Choose a career-focused training program in Cyber Security, Digital Marketing, or Programmatic Advertising and build job-ready skills through structured, hands-on learning at DIGITECHADEMY.",
      },
      {
        property: "og:title",
        content: "Practical Courses for Today's Digital Careers | DIGITECHADEMY",
      },
      {
        property: "og:description",
        content:
          "Choose a career-focused training program in Cyber Security, Digital Marketing, or Programmatic Advertising and build job-ready skills through structured, hands-on learning at DIGITECHADEMY.",
      },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

const generalFaqs = [
  {
    question: "How do the online live interactive classes work?",
    answer:
      "Our classes are conducted live by seasoned industry practitioners. Every session is interactive, allowing you to ask questions in real-time, view live practical demonstrations, and participate in guided hands-on lab exercises.",
  },
  {
    question: "Do I receive hands-on lab access and real projects?",
    answer:
      "Yes! All programs include dedicated cloud-based virtual lab access, tool licenses, and real-world capstone projects designed to simulate actual workplace tasks and build a portfolio.",
  },
  {
    question: "Will I receive placement assistance and interview preparation?",
    answer:
      "Absolutely. Our career acceleration service includes resume rebuilding, LinkedIn profile optimization, mock technical interviews, and direct interview scheduling with hiring partner companies.",
  },
  {
    question: "Are certificates provided upon course completion?",
    answer:
      "Yes, you receive an authorized, verified digital course completion certificate and credential that you can showcase on your resume and LinkedIn profile.",
  },
];

function CoursesPage() {
  const navigate = useNavigate();
  const [coursesList, setCoursesList] = useState<FirebaseCourse[]>(() =>
    getDefaultCoursesList()
  );

  const [activeTab, setActiveTab] = useState<string>("All Courses");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Subscribe to live Firebase courses
  useEffect(() => {
    const unsub = subscribeCourses((list) => {
      if (list && list.length > 0) {
        const normalized = list.map((c) => ({
          ...c,
          category: normalizeCourseCategory(c.category, c.title, c.slug),
        }));
        setCoursesList(normalized);
      }
    });
    return () => unsub();
  }, []);

  // Handle ?category= URL query parameter (e.g. from Popular Categories)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const catParam = urlParams.get("category");
      if (catParam) {
        setActiveTab(catParam);
      }
    }
  }, []);

  // Dynamically compute category tabs with counts strictly according to existing active courses
  const categoryTabs = useMemo(() => {
    const activeCourses = coursesList.filter((c) => c.active !== false);
    const tabs: { id: string; label: string; count: number }[] = [
      { id: "All Courses", label: "All Courses", count: activeCourses.length },
    ];

    const categoryCounts: Record<string, number> = {};
    activeCourses.forEach((c) => {
      const cat = normalizeCourseCategory(c.category, c.title, c.slug);
      if (cat) {
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
      }
    });

    // Standard primary tracks order
    const priorityCategories = [
      "Cyber Security",
      "Digital Marketing",
      "Programmatic Advertising",
      "AI & Automation",
      "Full Stack Development",
    ];

    // First add priority categories that have active courses
    priorityCategories.forEach((cat) => {
      if (categoryCounts[cat]) {
        tabs.push({ id: cat, label: cat, count: categoryCounts[cat] });
      }
    });

    // Then add any other custom categories
    Object.keys(categoryCounts).forEach((cat) => {
      if (!priorityCategories.includes(cat) && categoryCounts[cat]) {
        tabs.push({ id: cat, label: cat, count: categoryCounts[cat] });
      }
    });

    return tabs;
  }, [coursesList]);

  // If activeTab is no longer in categoryTabs, revert to "All Courses"
  useEffect(() => {
    if (activeTab !== "All Courses" && !categoryTabs.some((t) => t.id === activeTab)) {
      setActiveTab("All Courses");
    }
  }, [categoryTabs, activeTab]);

  // Filter visible courses based on active category tab
  const visibleCourses = useMemo(() => {
    const active = coursesList.filter((c) => c.active !== false);
    if (activeTab === "All Courses") return active;
    return active.filter((c) => {
      const cat = normalizeCourseCategory(c.category, c.title, c.slug);
      return cat.toLowerCase() === activeTab.toLowerCase();
    });
  }, [coursesList, activeTab]);

  // Scroll listener for sticky heading small size on scroll
  const [isHeroScrolled, setIsHeroScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsHeroScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToDemoForm = () => {
    const el = document.getElementById("course-demo-sidebar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const nameInput = document.getElementById("course-sidebar-name");
      if (nameInput) {
        setTimeout(() => nameInput.focus({ preventScroll: true }), 500);
      }
    }
  };

  const scrollToPrograms = () => {
    const el = document.getElementById("programs-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <SiteLayout>
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Sticky Header Banner with Shrink on Scroll)                */}
      {/* ========================================================================= */}
      <section
        className={cn(
          "sticky top-16 z-30 text-slate-900 border-b transition-all duration-300 ease-in-out overflow-hidden",
          isHeroScrolled
            ? "bg-white/95 backdrop-blur-md border-slate-200/90 shadow-sm py-1.5 sm:py-2"
            : "bg-gradient-to-r from-slate-50 via-sky-50/70 to-blue-50/50 border-slate-200/90 py-4 sm:py-5 lg:py-6 shadow-2xs"
        )}
      >
        {/* Ambient light glow */}
        <div
          className={cn(
            "pointer-events-none absolute left-1/2 -top-24 size-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-400/10 via-sky-400/10 to-indigo-400/10 blur-3xl transition-opacity duration-300",
            isHeroScrolled ? "opacity-0" : "opacity-100"
          )}
          aria-hidden="true"
        />
        <div className="container-site relative z-10">
          <div
            className={cn(
              "max-w-5xl transition-all duration-300",
              isHeroScrolled ? "space-y-0.5" : "space-y-2"
            )}
          >
            {/* Top Row: Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className={cn(
                "flex items-center gap-1.5 text-slate-500 font-medium transition-all duration-300",
                isHeroScrolled ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs"
              )}
            >
              <Link to="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <span className="text-slate-400">»</span>
              <span className="text-slate-900 font-semibold">All Courses</span>
            </nav>

            {/* Title & Subtitle */}
            <div className="pt-0">
              <h1
                className={cn(
                  "font-display font-extrabold tracking-tight text-slate-900 leading-tight transition-all duration-300",
                  isHeroScrolled
                    ? "text-sm sm:text-base md:text-lg"
                    : "text-lg sm:text-xl md:text-2xl lg:text-[1.75rem]"
                )}
              >
                Practical Courses for Today&apos;s Digital Careers
              </h1>

              <p
                className={cn(
                  "leading-relaxed font-normal max-w-3xl text-slate-600 transition-all duration-300",
                  isHeroScrolled
                    ? "text-[10.5px] sm:text-xs line-clamp-1 mt-0.5 text-slate-500"
                    : "text-xs sm:text-[13.5px] mt-1"
                )}
              >
                Industry-recognized training in Cyber Security, Digital Marketing &amp; Programmatic Advertising.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA (Course Cards on Left + Sticky Demo Sidebar on Right)  */}
      {/* ========================================================================= */}
      <section id="programs-grid" className="bg-white py-4 sm:py-6 overflow-x-clip">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px] items-start w-full min-w-0">
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN: Pill Tabs, Course Cards & Highlights                   */}
            {/* ------------------------------------------------------------------- */}
            <div className="space-y-5 w-full min-w-0">
              {/* Category Pill Tabs & Quick Action Bar */}
              <div className="space-y-3.5 border-b border-slate-200/80 pb-3.5 w-full min-w-0">
                {/* Top Row: Section Label / Program Count */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                    Filter Programs
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-semibold text-slate-500">
                    Showing <strong className="text-slate-800 font-bold">{visibleCourses.length}</strong> {visibleCourses.length === 1 ? "track" : "tracks"}
                  </span>
                </div>

                {/* Bottom Row: Full-Width Category Filter Pills (Wraps on Desktop/Tablet, Smooth Scroll on Small Mobile) */}
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5 w-full min-w-0 sm:flex-wrap">
                  {categoryTabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap active:scale-[0.98]",
                          isActive
                            ? "bg-[#5455f6] text-white shadow-md shadow-indigo-500/25"
                            : "bg-[#eff2fe] hover:bg-[#e0e7ff] text-[#4b52c0]"
                        )}
                      >
                        <span>{tab.label}</span>
                        <span
                          className={cn(
                            "text-[0.7rem] px-1.5 py-0.5 rounded-md font-extrabold",
                            isActive ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-700"
                          )}
                        >
                          {tab.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>


              {/* 3D Domain Track Spotlight Banner (Connecting Category Tab to 3D Artwork and Subcourses) */}
              {activeTab !== "All Courses" && DOMAIN_SPOTLIGHTS[activeTab] && (
                <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-r from-slate-900 via-[#0a1835] to-slate-900 p-4 sm:p-5 text-white shadow-md">
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
                    {/* 3D Domain Visual Frame */}
                    <div className="relative aspect-[16/10] w-full sm:w-44 md:w-48 shrink-0 rounded-xl overflow-hidden border border-white/10 shadow-md">
                      <img
                        src={DOMAIN_SPOTLIGHTS[activeTab].image}
                        alt={DOMAIN_SPOTLIGHTS[activeTab].title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <span className="absolute bottom-1.5 left-2 right-2 text-[8.5px] font-black uppercase tracking-wider text-amber-300 truncate">
                        {DOMAIN_SPOTLIGHTS[activeTab].eyebrow}
                      </span>
                    </div>

                    {/* Spotlight Details */}
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-sky-300 border border-blue-400/30 text-[9.5px] font-extrabold uppercase tracking-wider">
                          {DOMAIN_SPOTLIGHTS[activeTab].eyebrow}
                        </span>
                        <span className="text-slate-400 text-xs">•</span>
                        <span className="text-slate-300 text-xs font-semibold">
                          {visibleCourses.length} {visibleCourses.length === 1 ? "Program" : "Programs"}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-black text-white leading-snug">
                        {DOMAIN_SPOTLIGHTS[activeTab].title}
                      </h3>

                      <p className="text-[11.5px] sm:text-xs text-slate-300 leading-relaxed">
                        {DOMAIN_SPOTLIGHTS[activeTab].desc}
                      </p>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {DOMAIN_SPOTLIGHTS[activeTab].skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-0.5 rounded-md bg-white/10 text-slate-200 text-[10px] font-medium border border-white/10"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Course Cards Grid */}
              <div
                className={cn(
                  "gap-5 sm:gap-6 w-full min-w-0",
                  visibleCourses.length === 1
                    ? "flex justify-center max-w-xl mx-auto"
                    : "grid sm:grid-cols-2"
                )}
              >
                {visibleCourses.map((course) => (
                  <article
                    key={course.id}
                    onClick={() => {
                      navigate({ to: "/courses/$slug", params: { slug: course.slug } });
                    }}
                    className="group flex flex-col w-full min-w-0 overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm hover:border-blue-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    {/* Course Thumbnail with Category & Mode */}
                    <Link
                      to="/courses/$slug"
                      params={{ slug: course.slug }}
                      onClick={(e) => e.stopPropagation()}
                      className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 block cursor-pointer"
                    >
                      <img
                        src={getCourseImage(course)}
                        alt={`${course.title} banner`}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      <span className="absolute left-3 top-3 rounded-md bg-[#081426]/90 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wider text-amber-300 border border-white/10 backdrop-blur-sm">
                        {getCourseCategory(course)}
                      </span>
                      <span className="absolute right-3 top-3 rounded-md bg-white/95 px-2 py-0.5 text-[0.62rem] font-black uppercase tracking-wider text-slate-900 shadow-sm border border-slate-200">
                        ONLINE &bull; LIVE
                      </span>
                    </Link>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-4 sm:p-5 space-y-3 min-w-0">
                      <div className="min-w-0">
                        <Link
                          to="/courses/$slug"
                          params={{ slug: course.slug }}
                          onClick={(e) => e.stopPropagation()}
                          className="block"
                        >
                          <h3 className="text-base sm:text-lg font-black text-navy leading-snug group-hover:text-blue-600 hover:underline transition-colors">
                            {course.title}
                          </h3>
                        </Link>
                        <p className="mt-1.5 text-xs sm:text-[13px] text-slate-700 leading-relaxed text-justify line-clamp-2 font-normal">
                          {course.description}
                        </p>
                      </div>

                      {/* Tool Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(course.highlights || []).slice(0, 4).map((tool) => (
                          <span
                            key={tool}
                            className="rounded-md border border-slate-300 bg-slate-100 px-2 py-0.5 text-[0.65rem] font-bold text-slate-800"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Specs Row */}
                      <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 text-[0.72rem] sm:text-xs font-bold text-slate-600 border-t border-slate-200 pt-3 mt-auto">
                        <div className="flex items-center gap-1 shrink-0">
                          <Clock className="size-3.5 text-blue-600" />
                          <span>{course.duration}</span>
                        </div>
                        <span className="text-slate-400">&bull;</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <Signal className="size-3.5 text-blue-600" />
                          <span>{(course.level || "All Levels").split(" to ")[0]}</span>
                        </div>
                        <span className="text-slate-400">&bull;</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <BookOpen className="size-3.5 text-blue-600" />
                          <span>{course.syllabus?.length || 4} Modules</span>
                        </div>
                      </div>

                      {/* Dual Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-200">
                        <BtnLink
                          to="/courses/$slug"
                          params={{ slug: course.slug }}
                          variant="outline"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full min-w-0 border-slate-300 hover:bg-navy hover:text-white hover:border-navy text-slate-800 font-bold rounded-xl text-xs h-9 justify-center gap-1 px-2"
                        >
                          <span>View Course</span>
                          <ArrowRight className="size-3.5 shrink-0" />
                        </BtnLink>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToDemoForm();
                          }}
                          className="w-full min-w-0 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-9 flex items-center justify-center gap-1 shadow-xs cursor-pointer transition-colors px-2"
                        >
                          <UserPlus className="size-3.5 shrink-0" />
                          <span>Free Demo</span>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Key Features & Placement Support Grid */}
              <div className="space-y-3 pt-4 w-full min-w-0">
                <h3
                  data-reveal="left"
                  className="text-base sm:text-lg font-black text-navy flex items-center gap-2"
                >
                  <CheckCircle2 className="size-5 text-accent shrink-0" />
                  Why Learn With DIGITECHADEMY?
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 w-full min-w-0">
                  {[
                    "100% Job-Oriented Hands-On Practical Curriculum",
                    "Live Interactive Online Sessions by Experienced Mentors",
                    "Cloud-Based Virtual Lab Environments & Real-Time Tool Access",
                    "Real-Time Case Studies & Capstone Industry Projects",
                    "Dedicated Resume Building & Mock Interview Sessions",
                    "Authorized Course Completion Credential for LinkedIn",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      data-reveal={idx % 2 === 0 ? "left" : "top"}
                      style={{ "--reveal-delay": `${(idx % 2) * 100 + Math.floor(idx / 2) * 80}ms` } as CSSProperties}
                      className="flex items-start gap-3 rounded-xl border border-slate-300 bg-white p-3 sm:p-3.5 shadow-xs min-w-0"
                    >
                      <span className="grid size-6 place-items-center rounded-full bg-blue-50 text-blue-600 text-xs font-bold shrink-0 mt-0.5 border border-blue-200">
                        <Check className="size-3.5 stroke-[2.5]" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-800 font-semibold leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program FAQs Section */}
              <div className="space-y-3 pt-4 border-t border-slate-300 w-full min-w-0">
                <div
                  data-reveal="left"
                  className="flex items-center justify-between"
                >
                  <h3 className="text-base sm:text-lg font-black text-navy flex items-center gap-2">
                    <HelpCircle className="size-5 text-blue-600 shrink-0" />
                    Frequently Asked Questions
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    {generalFaqs.length} Answers
                  </span>
                </div>

                <div className="space-y-2.5 w-full min-w-0">
                  {generalFaqs.map((faq, index) => {
                    const isFaqExpanded = expandedFaq === index;
                    return (
                      <div
                        key={index}
                        data-reveal={index % 2 === 0 ? "top" : "left"}
                        style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                        className="border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs w-full min-w-0"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaq(isFaqExpanded ? null : index)}
                          className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-bold text-sm sm:text-base text-navy hover:bg-slate-50/50 cursor-pointer"
                        >
                          <span className="pr-2">{faq.question}</span>
                          {isFaqExpanded ? (
                            <ChevronUp className="size-4 text-blue-600 shrink-0 ml-auto" />
                          ) : (
                            <ChevronDown className="size-4 text-slate-500 shrink-0 ml-auto" />
                          )}
                        </button>
                        {isFaqExpanded && (
                          <div className="border-t border-slate-200 p-3.5 sm:p-4 bg-slate-50/60 text-xs sm:text-sm lg:text-[0.95rem] text-slate-700 leading-relaxed text-justify font-normal">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT COLUMN: Video Demo Card + JOIN FREE DEMO CLASS Form           */}
            {/* ------------------------------------------------------------------- */}
            <aside className="lg:sticky lg:top-36 w-full min-w-0">
              <CourseDemoSidebar />
            </aside>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MENTOR POPUP MODAL DIALOG                                                 */}
      {/* ========================================================================= */}
    </SiteLayout>
  );
}

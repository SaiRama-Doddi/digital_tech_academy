import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";

import { Logo } from "./Logo";
import { courses } from "@/data/courses";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  subscribeCourses,
  getLocalCachedCourses,
  type FirebaseCourse,
} from "@/services/courseService";

// All 9 navigation links
const headerNavLinks = navLinks;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Subscribe to live courses (from Firebase and local cache)
  const [liveCourses, setLiveCourses] = useState<FirebaseCourse[]>(() => {
    if (typeof window !== "undefined") {
      const cached = getLocalCachedCourses();
      if (cached.length > 0) return cached;
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
      students: 150,
      active: true,
      featured: true,
      image: c.image || "",
    }));
  });

  useEffect(() => {
    const unsub = subscribeCourses((list) => {
      if (list && list.length > 0) {
        setLiveCourses(list);
      }
    });
    return () => unsub();
  }, []);

  const activeCourses = useMemo(() => {
    return liveCourses.filter((c) => c.active !== false);
  }, [liveCourses]);

  const marketingCourses = useMemo(() => {
    const subset = activeCourses.filter(
      (c) =>
        c.category === "Digital Marketing" ||
        c.category === "Design & Creative" ||
        c.category === "Business & Management"
    );
    return subset.length > 0 ? subset : activeCourses.slice(0, 2);
  }, [activeCourses]);

  const securityCourses = useMemo(() => {
    const subset = activeCourses.filter(
      (c) =>
        c.category !== "Digital Marketing" &&
        c.category !== "Design & Creative" &&
        c.category !== "Business & Management"
    );
    return subset.length > 0 ? subset : activeCourses.slice(2);
  }, [activeCourses]);

  // Scroll listener for sticky glassmorphism elevation
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close drawers on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <div className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* ========================================================================= */}
      {/* 1. TOP ANNOUNCEMENT SUPER-BAR (Responsive & Smoothly Collapsible on Scroll)*/}
      {/* ========================================================================= */}
      <div
        className={cn(
          "w-full bg-gradient-to-r from-slate-950 via-[#07132b] to-slate-950 text-slate-300 border-b transition-all duration-300 select-none overflow-hidden",
          scrolled
            ? "max-h-0 py-0 opacity-0 border-b-transparent pointer-events-none"
            : "max-h-12 py-2 opacity-100 border-white/[0.08] text-xs font-medium",
        )}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-8">
          {/* Mobile view (< sm): Clean, non-colliding responsive layout */}
          <div className="flex sm:hidden items-center justify-center text-center">
            <Link
              to="/courses"
              className="group inline-flex items-center justify-center gap-2 text-[10.5px] text-slate-200 hover:text-white transition-colors max-w-full px-1"
            >
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-bold text-emerald-400 shrink-0 uppercase tracking-wide text-[10px] sm:text-[10.5px]">
                Admissions Open 2026
              </span>
              <span className="hidden min-[480px]:inline text-slate-600 shrink-0" aria-hidden="true">•</span>
              <span className="hidden min-[480px]:inline text-slate-300 truncate text-[10.5px]">
                New Batches Starting Soon
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-600/30 border border-blue-400/30 px-2.5 py-0.5 text-[9.5px] font-bold text-sky-300 group-hover:bg-blue-600 group-hover:text-white shrink-0 transition-colors">
                <span>Explore Programs</span>
                <ArrowRight className="size-2.5" />
              </span>
            </Link>
          </div>

          {/* Tablet & Desktop view (>= sm) */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-center gap-3">
            {/* Left/Center: The Announcement + CTA */}
            <div className="lg:col-span-8 flex items-center gap-2.5">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-bold text-emerald-400 tracking-wide text-[11px] uppercase whitespace-nowrap">
                Admissions Open 2026
              </span>
              <span className="text-slate-600" aria-hidden="true">•</span>
              <span className="text-slate-200 text-[11px] whitespace-nowrap font-medium">
                New Batches Starting Soon
              </span>
              <Link
                to="/courses"
                className="group inline-flex items-center gap-1.5 ml-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 hover:bg-blue-600 border border-blue-400/30 hover:border-blue-500 text-sky-300 hover:text-white text-[10.5px] font-bold transition-all whitespace-nowrap shadow-2xs"
              >
                <span>Explore Programs</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Right: Hotline & WhatsApp shortcuts */}
            <div className="lg:col-span-4 flex items-center justify-end gap-2.5 text-[11px]">
              <a
                href={site.phoneHref}
                className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] hover:bg-blue-600/20 border border-white/[0.08] hover:border-blue-400/40 text-slate-200 hover:text-white transition-all whitespace-nowrap"
              >
                <span className="grid size-3.5 place-items-center rounded-full bg-blue-600/30 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                  <Phone className="size-2" />
                </span>
                <span className="font-semibold text-[10.5px]">{site.phone}</span>
              </a>
              <span className="h-3 w-px bg-white/10" aria-hidden="true" />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 hover:border-emerald-400/50 text-emerald-300 hover:text-emerald-200 transition-all font-semibold text-[10.5px] whitespace-nowrap"
              >
                <span className="grid size-3.5 place-items-center rounded-full bg-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0">
                  <MessageCircle className="size-2" />
                </span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN FLOATING FROSTED GLASS HEADER                                      */}
      {/* ========================================================================= */}
      <header
        className={cn(
          "w-full transition-all duration-300 ease-in-out",
          mobileOpen
            ? "border-b border-slate-200 bg-white shadow-md"
            : scrolled
              ? "border-b border-slate-200/90 bg-white sm:bg-white/95 shadow-[0_6px_24px_-4px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
              : "border-b border-slate-200/60 bg-white sm:bg-white/90 shadow-[0_2px_16px_-3px_rgba(15,23,42,0.04)] backdrop-blur-xl",
        )}
      >
        <div
          className={cn(
            "relative z-50 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-4 xl:px-8 flex items-center justify-between gap-2 xl:gap-6 transition-all duration-300",
            mobileOpen ? "bg-white" : "",
            scrolled ? "h-16" : "h-17 lg:h-20",
          )}
        >
          {/* Logo (Shrink-0 and fully responsive) */}
          <Logo />

          {/* Desktop Navigation Links (Responsive spacing & Premium Active Pills) */}
          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:gap-1 lg:flex h-full">
            {headerNavLinks.map((link) => {
              if (link.label === "Programs") {
                return (
                  <div key={link.to} className="relative group/nav h-full flex items-center">
                    {/* Programs Dropdown Trigger Button */}
                    <Link
                      to={link.to}
                      className={cn(
                        "group inline-flex items-center justify-center gap-1 rounded-lg font-semibold transition-all duration-200 select-none relative cursor-pointer",
                        "px-2 py-1.5 text-[11.5px] xl:px-2.5 xl:text-[13px] 2xl:px-3 2xl:text-sm",
                        isActive(link.to)
                          ? "bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-blue-50/90 text-blue-700 font-bold shadow-[0_2px_8px_-2px_rgba(37,99,235,0.14)]"
                          : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 group-hover/nav:text-blue-600 group-hover/nav:bg-slate-100/80",
                      )}
                    >
                      {isActive(link.to) && (
                        <span className="size-1.5 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.9)] shrink-0" />
                      )}
                      <span>{link.label}</span>
                      <span className="grid size-3.5 place-items-center rounded-full bg-slate-100 group-hover/nav:bg-blue-100/70 text-slate-500 group-hover/nav:text-blue-600 transition-colors shrink-0">
                        <ChevronDown className="size-2.5 transition-transform duration-300 group-hover/nav:rotate-180" />
                      </span>
                    </Link>

                    {/* PROGRAMS MEGA MENU DROPDOWN (Centered & Constrained to never overflow) */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 w-[680px] xl:w-[740px] max-w-[calc(100vw-2rem)] opacity-0 translate-y-2 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible transition-all duration-200 z-50 pointer-events-none group-hover/nav:pointer-events-auto">
                      <div className="rounded-3xl border border-slate-200/90 bg-white/98 p-5 xl:p-6 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] backdrop-blur-2xl ring-1 ring-black/[0.03] overflow-hidden">
                        {/* Mega Menu Top Header */}
                        <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-slate-100">
                          <div>
                            <span className="block text-xs font-black uppercase tracking-widest text-blue-600">
                              Career-Focused Training Tracks
                            </span>
                            <span className="text-[11.5px] text-slate-500 font-normal">
                              Curricula crafted for direct IT hiring &amp; placement
                            </span>
                          </div>
                          <Link
                            to="/courses"
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-indigo-600 hover:underline transition-colors whitespace-nowrap"
                          >
                            <span>All Programs Directory</span>
                            <ArrowRight className="size-3.5" />
                          </Link>
                        </div>

                        {/* Two Columns: Marketing vs Security */}
                        <div className="grid grid-cols-2 gap-4 xl:gap-6">
                          {/* Column 1: Digital Marketing */}
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                              <span className="grid size-5.5 place-items-center rounded-lg bg-blue-50 text-blue-600">
                                <TrendingUp className="size-3.5" />
                              </span>
                              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                                Digital Marketing Suite
                              </span>
                            </div>

                            <div className="space-y-1">
                              {marketingCourses.map((c) => (
                                <Link
                                  key={c.slug}
                                  to="/courses/$slug"
                                  params={{ slug: c.slug }}
                                  className="group/item flex items-start justify-between rounded-xl p-2 hover:bg-gradient-to-r hover:from-blue-50/70 hover:to-indigo-50/40 border border-transparent hover:border-blue-100 transition-all duration-200"
                                >
                                  <div className="pr-1.5 min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="text-xs font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors truncate">
                                        {c.title}
                                      </span>
                                      {c.slug === "digital-marketing" && (
                                        <span className="text-[8.5px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-50 text-amber-600 border border-amber-200/70 shrink-0">
                                          Popular
                                        </span>
                                      )}
                                      {c.slug === "programmatic-advertising" && (
                                        <span className="text-[8.5px] font-black uppercase px-1.5 py-0.2 rounded bg-indigo-50 text-indigo-600 border border-indigo-200/70 shrink-0">
                                          High Demand
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[10.5px] text-slate-500 font-normal line-clamp-1 mt-0.5">
                                      {c.slug === "digital-marketing"
                                        ? "Meta Ads, Google SEM, SEO & GA4"
                                        : c.slug === "programmatic-advertising"
                                          ? "DSP, SSP, DV360 & Real-Time Bidding"
                                          : "Technical SEO, Schema & Organic Traffic"}
                                    </p>
                                    <span className="inline-block mt-0.5 text-[9.5px] text-slate-400 font-medium">
                                      {c.duration}
                                    </span>
                                  </div>
                                  <ArrowUpRight className="size-3.5 text-slate-300 group-hover/item:text-blue-600 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Column 2: Tech, Cyber Security & Development */}
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 pb-1.5 border-b border-slate-100">
                              <span className="grid size-5.5 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                                <ShieldCheck className="size-3.5" />
                              </span>
                              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                                Tech, Security &amp; Development
                              </span>
                            </div>

                            <div className="space-y-1">
                              {securityCourses.map((c) => (
                                <Link
                                  key={c.slug}
                                  to="/courses/$slug"
                                  params={{ slug: c.slug }}
                                  className="group/item flex items-start justify-between rounded-xl p-2 hover:bg-gradient-to-r hover:from-emerald-50/70 hover:to-teal-50/40 border border-transparent hover:border-emerald-100 transition-all duration-200"
                                >
                                  <div className="pr-1.5 min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className="text-xs font-bold text-slate-800 group-hover/item:text-emerald-700 transition-colors truncate">
                                        {c.title}
                                      </span>
                                      <span className="text-[8.5px] font-black uppercase px-1.5 py-0.2 rounded bg-blue-50 text-blue-600 border border-blue-200/70 shrink-0">
                                        {c.category}
                                      </span>
                                    </div>
                                    <p className="text-[10.5px] text-slate-500 font-normal line-clamp-1 mt-0.5">
                                      {c.description || (c.slug === "cyber-security"
                                        ? "SOC Analyst, Network Security & SIEM"
                                        : "Practical Hands-on Training & Placement")}
                                    </p>
                                    <span className="inline-block mt-0.5 text-[9.5px] text-slate-400 font-medium">
                                      {c.duration}
                                    </span>
                                  </div>
                                  <ArrowUpRight className="size-3.5 text-slate-300 group-hover/item:text-emerald-600 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                                </Link>
                              ))}

                              {/* Highlight Card inside Mega Menu */}
                              <div className="rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-2.5 text-white shadow-md relative overflow-hidden mt-2 border border-white/10">
                                <div className="relative z-10 flex items-center justify-between gap-2">
                                  <div>
                                    <div className="flex items-center gap-1 text-[10.5px] font-extrabold text-accent">
                                      <Sparkles className="size-3" />
                                      <span>100% Placement Assistance</span>
                                    </div>
                                    <p className="text-[9.5px] text-slate-300 mt-0.5">
                                      Dedicated resume reviews &amp; mock interviews.
                                    </p>
                                  </div>
                                  <Link
                                    to="/request-call"
                                    className="shrink-0 text-[9.5px] font-bold bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded-lg shadow-sm transition-all whitespace-nowrap"
                                  >
                                    Free Demo
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Mega Menu Footer Strip */}
                        <div className="mt-3.5 -mx-5 -mb-5 xl:-mx-6 xl:-mb-6 px-5 xl:px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10.5px] text-slate-600">
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                              <CheckCircle2 className="size-3 text-emerald-600" />
                              10 Dedicated Mentors
                            </span>
                            <span className="inline-flex items-center gap-1 font-semibold text-slate-700">
                              <Award className="size-3 text-amber-500" />
                              100% Practical Labs
                            </span>
                          </div>
                          <Link
                            to="/courses"
                            className="font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
                          >
                            <span>Explore All Programs</span>
                            <ArrowRight className="size-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "group inline-flex items-center justify-center gap-1 rounded-lg font-semibold transition-all duration-200 select-none relative cursor-pointer",
                    "px-2 py-1.5 text-[11.5px] xl:px-2.5 xl:text-[13px] 2xl:px-3 2xl:text-sm",
                    isActive(link.to)
                      ? "bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-blue-50/90 text-blue-700 font-bold border border-blue-200/80 shadow-[0_2px_8px_-2px_rgba(37,99,235,0.14)]"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 hover:shadow-2xs",
                  )}
                >
                  {isActive(link.to) && (
                    <span className="size-1.5 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.9)] shrink-0" />
                  )}
                  <span className="whitespace-nowrap">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Area: Primary CTA (Explore Programs) */}
          <div className="hidden items-center gap-2 xl:gap-2.5 lg:flex shrink-0">
            <Link
              to="/courses"
              className={cn(
                "group relative inline-flex items-center justify-center gap-1.5 rounded-xl font-bold transition-all duration-200 select-none shrink-0 cursor-pointer",
                "h-8.5 px-3.5 text-[11.5px] xl:h-9.5 xl:px-4 xl:text-xs 2xl:h-10 2xl:px-4.5 2xl:text-sm",
                "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md active:scale-[0.98]",
              )}
            >
              <span>Explore Programs</span>
              <ArrowRight className="size-3 xl:size-3.5 text-white/90 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Right Controls: Premium Glassmorphic Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className={cn(
                "grid size-10 place-items-center rounded-xl transition-all duration-200 cursor-pointer shrink-0",
                mobileOpen
                  ? "bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white border border-slate-700 shadow-[0_4px_16px_rgba(15,23,42,0.3)] active:scale-95"
                  : "border border-slate-200/90 bg-white/90 text-slate-800 shadow-[0_2px_8px_rgba(15,23,42,0.06)] hover:border-blue-400 hover:text-blue-600 hover:shadow-md active:scale-95",
              )}
            >
              {mobileOpen ? <X className="size-5 stroke-[2.5]" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. MOBILE NAVIGATION SHEET DRAWER                                         */}
        {/* ========================================================================= */}
        <div
          id="mobile-nav"
          className={cn(
            "relative z-50 overflow-hidden border-t border-slate-200 bg-white shadow-2xl transition-[max-height,opacity] duration-300 lg:hidden",
            mobileOpen ? "max-h-[85vh] opacity-100 overflow-y-auto" : "max-h-0 opacity-0 pointer-events-none",
          )}
        >
          <div className="w-full max-w-[1400px] mx-auto px-4 py-4 space-y-3.5">
            {/* 2-Column Equal Grid: Call & WhatsApp shortcuts with premium styling */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={site.phoneHref}
                className="group flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-50/90 to-indigo-50/70 border border-blue-100/90 text-blue-700 font-bold hover:shadow-sm transition-all active:scale-[0.98] min-w-0"
              >
                <span className="grid size-5.5 place-items-center rounded-lg bg-blue-600 text-white shadow-2xs shrink-0">
                  <Phone className="size-3" />
                </span>
                <span className="whitespace-nowrap text-[11.5px] xs:text-xs tracking-tight font-bold">Call Admissions</span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-1.5 px-2.5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-50/90 to-teal-50/70 border border-emerald-100/90 text-emerald-700 font-bold hover:shadow-sm transition-all active:scale-[0.98] min-w-0"
              >
                <span className="grid size-5.5 place-items-center rounded-lg bg-emerald-500 text-white shadow-2xs shrink-0">
                  <MessageCircle className="size-3" />
                </span>
                <span className="whitespace-nowrap text-[11.5px] xs:text-xs tracking-tight font-bold">WhatsApp Us</span>
              </a>
            </div>

            {/* Mobile Nav Links */}
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {headerNavLinks.map((link) => {
                if (link.label === "Programs") {
                  return (
                    <div key={link.to} className="space-y-1 rounded-xl bg-slate-50/60 p-1">
                      <div className="flex items-center justify-between">
                        <Link
                          to={link.to}
                          className={cn(
                            "flex-1 px-3 py-2 text-sm font-bold transition-colors flex items-center gap-2",
                            isActive(link.to) ? "text-blue-600" : "text-slate-800",
                          )}
                        >
                          <span>{link.label}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileCoursesOpen((v) => !v)}
                          aria-label="Toggle programs list"
                          className="px-3 py-2 text-slate-500 hover:text-slate-900"
                        >
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-200",
                              mobileCoursesOpen && "rotate-180",
                            )}
                          />
                        </button>
                      </div>

                      {mobileCoursesOpen && (
                        <div className="space-y-1.5 pt-1.5 pb-2 px-2">
                          <span className="block text-[10px] font-black uppercase tracking-wider text-slate-400 px-1">
                            Select Track
                          </span>
                          {activeCourses.map((c) => (
                            <Link
                              key={c.slug}
                              to="/courses/$slug"
                              params={{ slug: c.slug }}
                              className="flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-600 transition-colors"
                            >
                              <div className="pr-2 min-w-0">
                                <span className="block font-bold text-slate-800 truncate">{c.title}</span>
                                <span className="text-[10px] text-slate-400">
                                  {c.category} • {c.duration}
                                </span>
                              </div>
                              <ArrowRight className="size-3 text-slate-400 shrink-0" />
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all",
                      isActive(link.to)
                        ? "bg-blue-50 border border-blue-100 text-blue-600 shadow-2xs"
                        : "text-slate-750 hover:bg-slate-100 hover:text-slate-900",
                    )}
                  >
                    <span>{link.label}</span>
                    {isActive(link.to) && <span className="size-1.5 rounded-full bg-blue-600" />}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Primary CTA: Explore Programs */}
            <div className="pt-1">
              <Link
                to="/courses"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 text-xs rounded-xl shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
              >
                <span>Explore Programs</span>
                <ArrowRight className="size-3.5 text-white/90" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Overlay (Positioned behind header & mobile drawer, dimming only the page beneath) */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close mobile navigation"
          tabIndex={-1}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 -z-10 bg-slate-950/60 backdrop-blur-xs lg:hidden cursor-pointer"
        />
      )}
    </div>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  MessageCircle,
  Phone,
  Radio,
  ShieldCheck,
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

// Core courses displayed in navbar courses dropdown
const coreCourseNavItems = [
  {
    label: "Digital Marketing",
    to: "/courses/digital-marketing",
    icon: TrendingUp,
    iconColor: "bg-rose-50 text-rose-600 border-rose-100",
  },
  {
    label: "Programmatic Advertising",
    to: "/courses/programmatic-advertising",
    icon: Radio,
    iconColor: "bg-sky-50 text-sky-600 border-sky-100",
  },
  {
    label: "Cyber Security",
    to: "/courses/cyber-security",
    icon: ShieldCheck,
    iconColor: "bg-amber-50 text-amber-600 border-amber-100",
  },
];

// All navigation links
const headerNavLinks = navLinks;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Subscribe to live courses (from Firebase and local cache)
  const [liveCourses, setLiveCourses] = useState<FirebaseCourse[]>(() => {
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
    const cached = getLocalCachedCourses();
    if (cached && cached.length > 0) {
      setLiveCourses(cached);
    }
    const unsub = subscribeCourses((list) => {
      if (list && list.length > 0) {
        setLiveCourses(list);
      }
    });
    return () => unsub();
  }, []);

  const activeCourses = useMemo(() => {
    return liveCourses.filter(
      (c) =>
        c.active !== false &&
        c.id !== "full-stack-java" &&
        c.slug !== "full-stack-java" &&
        !c.title?.toLowerCase().includes("full stack java") &&
        c.id !== "testing",
    );
  }, [liveCourses]);

  const isTechOrDev = (c: FirebaseCourse) => {
    const text = `${c.title} ${c.slug} ${c.category}`.toLowerCase();
    return (
      c.category === "Cyber Security" ||
      text.includes("security") ||
      text.includes("hacking") ||
      text.includes("cyber") ||
      text.includes("soc") ||
      text.includes("ethical")
    );
  };

  const marketingCourses = useMemo(() => {
    const subset = activeCourses.filter((c) => !isTechOrDev(c));
    return subset.length > 0 ? subset : activeCourses.slice(0, 3);
  }, [activeCourses]);

  const securityCourses = useMemo(() => {
    const subset = activeCourses.filter((c) => isTechOrDev(c));
    return subset.length > 0 ? subset : activeCourses.slice(3);
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
    setMobileCoursesOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TOP ANNOUNCEMENT SUPER-BAR (Responsive across all screens)             */}
      {/* ========================================================================= */}
      <div className="w-full bg-gradient-to-r from-slate-950 via-[#07132b] to-slate-950 text-slate-300 border-b border-white/[0.08] text-xs font-medium select-none py-2 sm:py-2.5">
        <div className="container-site">
          {/* Mobile view (< sm / < 640px) */}
          <div className="flex sm:hidden items-center justify-between gap-1.5 text-[10px] font-semibold min-w-0 w-full">
            {/* Left: Admissions Open (fixed live status badge) */}
            <div className="flex items-center gap-1 shrink-0">
              <span className="relative flex size-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-extrabold text-emerald-400 uppercase tracking-wider text-[8.5px] min-[360px]:text-[9.5px] whitespace-nowrap">
                Admissions Open
              </span>
              <span className="text-slate-500 shrink-0 select-none text-[9px]" aria-hidden="true">•</span>
            </div>

            {/* Center: Smooth Scrolling Ticker for "New Batches Starting Soon" */}
            <div className="relative overflow-hidden flex-1 min-w-0 h-4.5 flex items-center mx-1 [mask-image:linear-gradient(to_right,transparent,black_6px,black_calc(100%-6px),transparent)]">
              <div className="flex w-max animate-announcement-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused]">
                {/* Track Item 1 */}
                <div className="flex items-center gap-2.5 pr-2.5 shrink-0 text-[8.5px] min-[360px]:text-[9.5px]">
                  <span className="text-slate-200 font-medium whitespace-nowrap">
                    New Batches Starting Soon
                  </span>
                  <span className="text-amber-400/90 font-bold whitespace-nowrap">
                    • Limited Seats Available
                  </span>
                  <span className="text-sky-300 font-semibold whitespace-nowrap">
                    • Weekend &amp; Weekday Batches
                  </span>
                  <span className="text-slate-600 select-none" aria-hidden="true">•</span>
                </div>
                {/* Track Item 2 (Duplicate for seamless loop) */}
                <div className="flex items-center gap-2.5 pr-2.5 shrink-0 text-[8.5px] min-[360px]:text-[9.5px]" aria-hidden="true">
                  <span className="text-slate-200 font-medium whitespace-nowrap">
                    New Batches Starting Soon
                  </span>
                  <span className="text-amber-400/90 font-bold whitespace-nowrap">
                    • Limited Seats Available
                  </span>
                  <span className="text-sky-300 font-semibold whitespace-nowrap">
                    • Weekend &amp; Weekday Batches
                  </span>
                  <span className="text-slate-600 select-none" aria-hidden="true">•</span>
                </div>
              </div>
            </div>

            {/* Right: Quick actions (Explore pill & WhatsApp) */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                to="/courses"
                className="hidden min-[480px]:inline-flex items-center gap-1 rounded-full bg-blue-600/30 border border-blue-400/30 px-2.5 py-0.5 text-[9.5px] font-bold text-sky-300 hover:bg-blue-600 hover:text-white shrink-0 transition-colors whitespace-nowrap"
              >
                <span>Explore Programs</span>
                <ArrowRight className="size-2.5" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex min-[480px]:hidden items-center gap-1 rounded-full bg-blue-600/30 border border-blue-400/30 px-2 py-0.5 text-[9px] font-bold text-sky-300 hover:bg-blue-600 hover:text-white shrink-0 transition-colors whitespace-nowrap"
              >
                <span>Explore</span>
                <ArrowRight className="size-2.5" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-6 place-items-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-colors shrink-0"
              >
                <MessageCircle className="size-3" />
              </a>
            </div>
          </div>

          {/* Tablet & Desktop view (>= 640px / sm) */}
          <div className="hidden sm:flex items-center justify-between gap-3 w-full">
            {/* Left/Center: The Announcement + Ticker + CTA */}
            <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-extrabold text-emerald-400 tracking-wider text-[11px] uppercase whitespace-nowrap shrink-0">
                Admissions Open 2026
              </span>
              <span className="text-slate-600 shrink-0 select-none text-[11px]" aria-hidden="true">•</span>

              {/* Scrolling Ticker for New Batches Starting Soon */}
              <div className="relative overflow-hidden flex-1 max-w-[320px] lg:max-w-[400px] xl:max-w-[480px] h-4.5 flex items-center [mask-image:linear-gradient(to_right,transparent,black_8px,black_calc(100%-8px),transparent)]">
                <div className="flex w-max animate-announcement-marquee hover:[animation-play-state:paused]">
                  {/* Track Item 1 */}
                  <div className="flex items-center gap-3 pr-3 shrink-0 text-[11px]">
                    <span className="text-slate-200 font-medium whitespace-nowrap">
                      New Batches Starting Soon
                    </span>
                    <span className="text-amber-300 font-bold whitespace-nowrap">
                      • Limited Seats Available
                    </span>
                    <span className="text-sky-300 font-medium whitespace-nowrap">
                      • Fast-Track Weekend &amp; Weekday Batches
                    </span>
                    <span className="text-slate-600 select-none" aria-hidden="true">•</span>
                  </div>
                  {/* Track Item 2 (Duplicate for seamless loop) */}
                  <div className="flex items-center gap-3 pr-3 shrink-0 text-[11px]" aria-hidden="true">
                    <span className="text-slate-200 font-medium whitespace-nowrap">
                      New Batches Starting Soon
                    </span>
                    <span className="text-amber-300 font-bold whitespace-nowrap">
                      • Limited Seats Available
                    </span>
                    <span className="text-sky-300 font-medium whitespace-nowrap">
                      • Fast-Track Weekend &amp; Weekday Batches
                    </span>
                    <span className="text-slate-600 select-none" aria-hidden="true">•</span>
                  </div>
                </div>
              </div>

              <Link
                to="/courses"
                className="group inline-flex items-center gap-1.5 ml-1 px-2.5 py-0.5 rounded-full bg-blue-500/20 hover:bg-blue-600 border border-blue-400/30 hover:border-blue-500 text-sky-300 hover:text-white text-[10.5px] font-bold transition-all whitespace-nowrap shrink-0 shadow-2xs"
              >
                <span>Explore Programs</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Right: Hotline & WhatsApp shortcuts */}
            <div className="flex items-center gap-2 shrink-0 text-[11px]">
              <a
                href={site.phoneHref}
                className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] hover:bg-blue-600/20 border border-white/[0.08] hover:border-blue-400/40 text-slate-200 hover:text-white transition-all whitespace-nowrap shrink-0"
              >
                <span className="grid size-3.5 place-items-center rounded-full bg-blue-600/30 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                  <Phone className="size-2" />
                </span>
                <span className="font-semibold text-[10.5px] hidden xl:inline">{site.phone}</span>
                <span className="font-semibold text-[10.5px] xl:hidden">Call</span>
              </a>
              <span className="h-3 w-px bg-white/10 shrink-0" aria-hidden="true" />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 hover:border-emerald-400/50 text-emerald-300 hover:text-emerald-200 transition-all font-semibold text-[10.5px] whitespace-nowrap shrink-0"
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
      {/* 2. MAIN FLOATING FROSTED GLASS NAVBAR (Sticky across all screens & devices)*/}
      {/* ========================================================================= */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out sticky-nav",
          mobileOpen
            ? "border-b border-slate-200 bg-white shadow-md"
            : scrolled
              ? "border-b border-slate-200/90 bg-white/95 shadow-[0_6px_24px_-4px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
              : "border-b border-slate-200/60 bg-white/90 shadow-[0_2px_16px_-3px_rgba(15,23,42,0.04)] backdrop-blur-xl",
        )}
      >
        <div
          className={cn(
            "container-site relative z-50 flex items-center justify-between gap-2 xl:gap-6 transition-all duration-300",
            mobileOpen ? "bg-white" : "",
            scrolled ? "h-16" : "h-16 sm:h-18 lg:h-20",
          )}
        >
          {/* Logo (Shrink-0 and fully responsive) */}
          <Logo />

          {/* Desktop Navigation Links (Responsive spacing & Premium Active Pills) */}
          <nav aria-label="Main navigation" className="hidden items-center gap-0.5 xl:gap-1 lg:flex h-full">
            {headerNavLinks.map((link) => {
              if (link.label === "Courses" || link.label === "Programs") {
                return (
                  <div key={link.to} className="relative group/nav h-full flex items-center">
                    {/* Courses Dropdown Trigger Button */}
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

                    {/* COURSES DROPDOWN: ONLY Digital Marketing | Programmatic Advertising | Cyber Security */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72 sm:w-80 opacity-0 translate-y-2 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible transition-all duration-300 ease-out z-50 pointer-events-none group-hover/nav:pointer-events-auto">
                      <div className="relative rounded-2xl border border-slate-200/90 bg-white/98 backdrop-blur-xl p-2 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.04] overflow-hidden">
                        {/* Top Accent Hairline */}
                        <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-400" />

                        <div className="space-y-1 pt-1">
                          {coreCourseNavItems.map((item) => {
                            const ItemIcon = item.icon;
                            return (
                              <Link
                                key={item.to}
                                to={item.to}
                                className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-gradient-to-r hover:from-blue-50/80 hover:via-indigo-50/40 hover:to-transparent border border-transparent hover:border-blue-100 transition-all duration-200"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <span
                                    className={cn(
                                      "grid size-8.5 place-items-center rounded-xl border transition-all duration-200 group-hover/item:scale-105 shadow-2xs shrink-0",
                                      item.iconColor,
                                    )}
                                  >
                                    <ItemIcon className="size-4" />
                                  </span>
                                  <span className="text-[13.5px] font-bold text-slate-800 group-hover/item:text-blue-600 transition-colors leading-snug">
                                    {item.label}
                                  </span>
                                </div>
                                <span className="size-6 rounded-full bg-slate-100/80 group-hover/item:bg-blue-600 text-slate-400 group-hover/item:text-white grid place-items-center transition-all duration-200 shrink-0 shadow-2xs group-hover/item:shadow-sm group-hover/item:scale-105">
                                  <ArrowUpRight className="size-3.5 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform" />
                                </span>
                              </Link>
                            );
                          })}
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

          {/* Mobile & Tablet Right Controls: Premium Glassmorphic Hamburger Toggle + Tablet CTA */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <Link
              to="/courses"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs active:scale-[0.98] transition-all cursor-pointer select-none"
            >
              <span>Explore Programs</span>
              <ArrowRight className="size-3 text-white/90" />
            </Link>
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
                if (link.label === "Courses" || link.label === "Programs") {
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
                          aria-label="Toggle courses list"
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
                          {coreCourseNavItems.map((item) => {
                            const ItemIcon = item.icon;
                            return (
                              <Link
                                key={item.to}
                                to={item.to}
                                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-600 border border-slate-200/60 transition-colors shadow-2xs"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span
                                    className={cn(
                                      "grid size-7 place-items-center rounded-lg border shadow-2xs shrink-0",
                                      item.iconColor,
                                    )}
                                  >
                                    <ItemIcon className="size-3.5" />
                                  </span>
                                  <span className="block font-bold text-slate-800 text-[13px]">{item.label}</span>
                                </div>
                                <ArrowRight className="size-3.5 text-slate-400 shrink-0" />
                              </Link>
                            );
                          })}
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

      {/* Mobile Backdrop Overlay (Positioned behind sticky header & mobile drawer, dimming page beneath) */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close mobile navigation"
          tabIndex={-1}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden cursor-pointer"
        />
      )}
    </>
  );
}

import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Menu,
  MessageCircle,
  Phone,
  Radio,
  ShieldCheck,
  TrendingUp,
  Bot,
  Code2,
  Sparkles,
  Zap,
  Globe,
  BookOpen,
  X,
  BarChart3,
  Megaphone,
  Terminal,
  Lock,
  Layers,
  Cpu,
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

export interface SubCourseItem {
  title: string;
  to: string;
  icon?: any;
}

export interface CourseCategoryMenu {
  id: string;
  name: string;
  to: string;
  icon: any;
  subCourses: SubCourseItem[];
  viewAllText?: string;
}

const COURSE_CATEGORIES: CourseCategoryMenu[] = [
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    to: "/courses/digital-marketing",
    icon: TrendingUp,
    subCourses: [
      {
        title: "Digital Marketing Masterclass",
        to: "/courses/digital-marketing",
        icon: TrendingUp,
      },
      {
        title: "Performance Ads & GA4 Analytics",
        to: "/courses/digital-marketing",
        icon: BarChart3,
      },
      {
        title: "Advanced SEO & Organic Growth",
        to: "/courses/advanced-seo",
        icon: Globe,
      },
      {
        title: "Social Media & Viral Funnels",
        to: "/courses/digital-marketing",
        icon: Megaphone,
      },
    ],
    viewAllText: "View All Digital Marketing Courses (6+) →",
  },
  {
    id: "cyber-security",
    name: "Cyber Security",
    to: "/courses/cyber-security",
    icon: ShieldCheck,
    subCourses: [
      {
        title: "Practical Cyber Security Defense",
        to: "/courses/cyber-security",
        icon: ShieldCheck,
      },
      {
        title: "Ethical Hacking & Penetration Testing",
        to: "/courses/ethical-hacking",
        icon: Terminal,
      },
      {
        title: "SOC Analyst & Incident Response",
        to: "/courses/cyber-security",
        icon: Lock,
      },
      {
        title: "Network & Cloud Security Defense",
        to: "/courses/cyber-security",
        icon: Globe,
      },
    ],
    viewAllText: "View All Cyber Security Courses (5+) →",
  },
  {
    id: "programmatic",
    name: "Programmatic Advertising",
    to: "/courses/programmatic-advertising",
    icon: Radio,
    subCourses: [
      {
        title: "DV360 & Programmatic Media Buying",
        to: "/courses/programmatic-advertising",
        icon: Radio,
      },
      {
        title: "CM360 Ad Serving & Floodlight Tracking",
        to: "/courses/programmatic-advertising",
        icon: Layers,
      },
      {
        title: "RTB Auction Algorithms & PMP Deals",
        to: "/courses/programmatic-advertising",
        icon: Zap,
      },
      {
        title: "Cross-Exchange DSP & Media Strategy",
        to: "/courses/programmatic-advertising",
        icon: BarChart3,
      },
    ],
    viewAllText: "View All Programmatic Courses (4+) →",
  },
  {
    id: "ai-tech",
    name: "AI & Full-Stack Tech",
    to: "/courses",
    icon: Bot,
    subCourses: [
      {
        title: "AI Marketing & CRM Automation",
        to: "/courses",
        icon: Bot,
      },
      {
        title: "Full-Stack Web Development",
        to: "/courses",
        icon: Code2,
      },
      {
        title: "MarTech & Conversion Engineering",
        to: "/courses",
        icon: Cpu,
      },
    ],
    viewAllText: "View All Tech & Dev Courses (3+) →",
  },
];

// Navigation links list
const headerNavLinks = navLinks;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string>("digital-marketing");
  const [hoveredCategory, setHoveredCategory] = useState<string>("digital-marketing");
  const pathname = useRouterState({ select: (s) => s.location.pathname });

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

  const currentCategoryData = useMemo(() => {
    return (
      COURSE_CATEGORIES.find((cat) => cat.id === hoveredCategory) ??
      COURSE_CATEGORIES[0]!
    );
  }, [hoveredCategory]);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TOP ANNOUNCEMENT SUPER-BAR (Responsive across all screens)             */}
      {/* ========================================================================= */}
      <div className="w-full bg-gradient-to-r from-slate-950 via-[#07132b] to-slate-950 text-slate-300 border-b border-white/[0.08] text-xs font-medium select-none py-2 sm:py-2.5">
        <div className="container-site">
          {/* Mobile view (< sm / < 640px) */}
          <div className="flex sm:hidden items-center justify-between gap-1.5 text-[10px] font-semibold min-w-0 w-full">
            {/* Left: Admissions Open */}
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

            {/* Center: Smooth Scrolling Ticker */}
            <div className="relative overflow-hidden flex-1 min-w-0 h-4.5 flex items-center mx-1 [mask-image:linear-gradient(to_right,transparent,black_6px,black_calc(100%-6px),transparent)]">
              <div className="flex w-max animate-announcement-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused]">
                <div className="flex items-center gap-2.5 pr-2.5 shrink-0 text-[8.5px] min-[360px]:text-[9.5px]">
                  <span className="text-slate-200 font-medium whitespace-nowrap">
                    New Batches Starting Soon
                  </span>
                  <span className="text-amber-400/90 font-bold whitespace-nowrap">
                    • Limited Seats
                  </span>
                  <span className="text-sky-300 font-semibold whitespace-nowrap">
                    • Fast-Track Batches
                  </span>
                </div>
                <div className="flex items-center gap-2.5 pr-2.5 shrink-0 text-[8.5px] min-[360px]:text-[9.5px]" aria-hidden="true">
                  <span className="text-slate-200 font-medium whitespace-nowrap">
                    New Batches Starting Soon
                  </span>
                  <span className="text-amber-400/90 font-bold whitespace-nowrap">
                    • Limited Seats
                  </span>
                  <span className="text-sky-300 font-semibold whitespace-nowrap">
                    • Fast-Track Batches
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                to="/courses"
                className="inline-flex items-center gap-1 rounded-full bg-blue-600/30 border border-blue-400/30 px-2.5 py-0.5 text-[9px] font-bold text-sky-300 hover:bg-blue-600 hover:text-white shrink-0 transition-colors whitespace-nowrap"
              >
                <span>Programs</span>
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
            <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-extrabold text-emerald-400 tracking-wider text-[11px] uppercase whitespace-nowrap shrink-0">
                Admissions Open 2026
              </span>
              <span className="text-slate-600 shrink-0 select-none text-[11px]" aria-hidden="true">•</span>

              <div className="relative overflow-hidden flex-1 max-w-[320px] lg:max-w-[400px] xl:max-w-[480px] h-4.5 flex items-center [mask-image:linear-gradient(to_right,transparent,black_8px,black_calc(100%-8px),transparent)]">
                <div className="flex w-max animate-announcement-marquee hover:[animation-play-state:paused]">
                  <div className="flex items-center gap-3 pr-3 shrink-0 text-[11px]">
                    <span className="text-slate-200 font-medium whitespace-nowrap">
                      New Batches Starting Soon
                    </span>
                    <span className="text-amber-300 font-bold whitespace-nowrap">
                      • Practical Live Training
                    </span>
                    <span className="text-sky-300 font-medium whitespace-nowrap">
                      • Weekend &amp; Weekday Batches
                    </span>
                    <span className="text-slate-600 select-none" aria-hidden="true">•</span>
                  </div>
                  <div className="flex items-center gap-3 pr-3 shrink-0 text-[11px]" aria-hidden="true">
                    <span className="text-slate-200 font-medium whitespace-nowrap">
                      New Batches Starting Soon
                    </span>
                    <span className="text-amber-300 font-bold whitespace-nowrap">
                      • Practical Live Training
                    </span>
                    <span className="text-sky-300 font-medium whitespace-nowrap">
                      • Weekend &amp; Weekday Batches
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
      {/* 2. MAIN FLOATING FROSTED GLASS NAVBAR                                     */}
      {/* ========================================================================= */}
      <header
        className={cn(
          "w-full transition-all duration-300 ease-in-out sticky-nav",
          mobileOpen
            ? "fixed top-0 inset-x-0 z-[60] border-b border-slate-200 bg-white shadow-md"
            : "sticky top-0 z-50",
          !mobileOpen && (
            scrolled
              ? "border-b border-slate-200/90 bg-white/95 shadow-[0_6px_24px_-4px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
              : "border-b border-slate-200/60 bg-white/90 shadow-[0_2px_16px_-3px_rgba(15,23,42,0.04)] backdrop-blur-xl"
          ),
        )}
      >
        <div
          className={cn(
            "container-site relative z-50 flex items-center justify-between gap-2 xl:gap-6 transition-all duration-300",
            mobileOpen ? "bg-white" : "",
            scrolled ? "h-16" : "h-16 sm:h-18 lg:h-20",
          )}
        >
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation Links */}
          <nav aria-label="Main navigation" className="hidden items-center gap-1 xl:gap-2 lg:flex h-full">
            {headerNavLinks.map((link) => {
              if (link.label === "Courses") {
                return (
                  <div
                    key={link.to}
                    className="relative group/nav h-full flex items-center"
                    onMouseEnter={() => setHoveredCategory((prev) => prev || "digital-marketing")}
                  >
                    {/* Courses Dropdown Trigger Button */}
                    <Link
                      to={link.to}
                      className={cn(
                        "group inline-flex items-center justify-center gap-1.5 rounded-lg font-bold transition-all duration-200 select-none relative cursor-pointer",
                        "px-3 py-2 text-[12.5px] xl:px-3.5 xl:text-[13.5px] 2xl:text-sm",
                        isActive(link.to)
                          ? "bg-gradient-to-r from-blue-50/95 via-indigo-50/80 to-blue-50/95 text-blue-700 shadow-[0_2px_8px_-2px_rgba(37,99,235,0.14)] border border-blue-200/70"
                          : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80 group-hover/nav:text-blue-600 group-hover/nav:bg-slate-100/80",
                      )}
                    >
                      {isActive(link.to) && (
                        <span className="size-1.5 rounded-full bg-blue-600 shadow-[0_0_6px_rgba(37,99,235,0.9)] shrink-0" />
                      )}
                      <span>{link.label}</span>
                      <span className="grid size-4 place-items-center rounded-full bg-slate-100 group-hover/nav:bg-blue-100/70 text-slate-500 group-hover/nav:text-blue-600 transition-colors shrink-0">
                        <ChevronDown className="size-3 transition-transform duration-300 group-hover/nav:rotate-180" />
                      </span>
                    </Link>

                    {/* COURSES FLYOUT MENU (Matching Screenshot Model) */}
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-1 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible transition-all duration-200 ease-out z-50 pointer-events-none group-hover/nav:pointer-events-auto">
                      <div className="flex bg-white shadow-2xl rounded-md border border-slate-200/90 overflow-visible text-slate-700">
                        {/* Left Column: Categories List */}
                        <div className="w-[215px] sm:w-[230px] py-1 bg-white relative">
                          {COURSE_CATEGORIES.map((cat) => {
                            const CatIcon = cat.icon;
                            const isSelected = hoveredCategory === cat.id;
                            return (
                              <div
                                key={cat.id}
                                onMouseEnter={() => setHoveredCategory(cat.id)}
                                className={cn(
                                  "relative flex items-center gap-3 px-4 py-2.5 text-[13.5px] transition-colors cursor-pointer select-none border-l-[3.5px]",
                                  isSelected
                                    ? "text-orange-600 font-semibold bg-white border-l-orange-500"
                                    : "text-slate-700 hover:text-orange-600 hover:bg-slate-50/80 border-l-transparent"
                                )}
                              >
                                <CatIcon
                                  className={cn(
                                    "size-4 shrink-0 transition-colors",
                                    isSelected ? "text-orange-600" : "text-slate-500"
                                  )}
                                />

                                <span className="truncate flex-1 font-medium">{cat.name}</span>

                                {/* Orange Pointer Triangle Arrow pointing to Submenu */}
                                {isSelected && (
                                  <span
                                    className="absolute -right-[7px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[7px] border-l-orange-500 z-30 pointer-events-none"
                                    aria-hidden="true"
                                  />
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* Vertical Orange Accent Divider Bar */}
                        <div className="w-[2.5px] bg-orange-500 shrink-0 relative z-20" />

                        {/* Right Column: Flyout Sub-Courses List */}
                        <div className="w-[270px] sm:w-[305px] py-1 bg-white relative flex flex-col justify-between">
                          <div>
                            {currentCategoryData.subCourses.map((sub, sIdx) => {
                              const SubIcon = sub.icon || BookOpen;
                              return (
                                <Link
                                  key={sIdx}
                                  to={sub.to}
                                  className="group/sub relative flex items-center gap-3 px-4 py-2.5 text-[13px] text-slate-700 hover:text-orange-600 hover:bg-orange-50/30 border-b border-slate-100 last:border-b-0 transition-colors"
                                >
                                  <SubIcon className="size-3.5 shrink-0 text-slate-400 group-hover/sub:text-orange-600 transition-colors" />
                                  <span className="truncate flex-1 font-medium group-hover/sub:font-semibold">
                                    {sub.title}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>

                          {/* View All Category Link */}
                          {currentCategoryData.viewAllText && (
                            <div className="px-4 py-2 border-t border-slate-100 mt-1 bg-slate-50/50">
                              <Link
                                to={currentCategoryData.to}
                                className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center justify-between transition-colors"
                              >
                                <span>{currentCategoryData.viewAllText}</span>
                                <ArrowRight className="size-3" />
                              </Link>
                            </div>
                          )}
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
                    "group inline-flex items-center justify-center gap-1 rounded-lg font-bold transition-all duration-200 select-none relative cursor-pointer",
                    "px-3 py-2 text-[12.5px] xl:px-3.5 xl:text-[13.5px] 2xl:text-sm",
                    isActive(link.to)
                      ? "bg-gradient-to-r from-blue-50/95 via-indigo-50/80 to-blue-50/95 text-blue-700 border border-blue-200/80 shadow-[0_2px_8px_-2px_rgba(37,99,235,0.14)]"
                      : "text-slate-700 hover:text-slate-950 hover:bg-slate-100/80",
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

          {/* Desktop Right Area: Primary CTA */}
          <div className="hidden items-center gap-2 xl:gap-2.5 lg:flex shrink-0">
            <Link
              to="/courses"
              className={cn(
                "group relative inline-flex items-center justify-center gap-1.5 rounded-xl font-bold transition-all duration-200 select-none shrink-0 cursor-pointer",
                "h-9 px-4 text-xs xl:h-10 xl:px-5 xl:text-sm",
                "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md active:scale-[0.98]",
              )}
            >
              <span>Explore Programs</span>
              <ArrowRight className="size-3.5 text-white/90 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile & Tablet Right Controls */}
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
            mobileOpen ? "max-h-[calc(100dvh-4rem)] opacity-100 overflow-y-auto overscroll-contain" : "max-h-0 opacity-0 pointer-events-none",
          )}
        >
          <div className="w-full max-w-[1400px] mx-auto px-4 py-4 space-y-3.5">
            {/* Quick Actions */}
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
                if (link.label === "Courses") {
                  return (
                    <div key={link.to} className="space-y-1 rounded-xl bg-slate-50/80 p-1.5 border border-slate-200/80">
                      <div className="flex items-center justify-between">
                        <Link
                          to={link.to}
                          className={cn(
                            "flex-1 px-2.5 py-1.5 text-sm font-bold transition-colors flex items-center gap-2",
                            isActive(link.to) ? "text-blue-600" : "text-slate-800",
                          )}
                        >
                          <BookOpen className="size-4 text-blue-600" />
                          <span>{link.label}</span>
                        </Link>
                        <button
                          type="button"
                          onClick={() => setMobileCoursesOpen((v) => !v)}
                          aria-label="Toggle courses list"
                          className="px-2.5 py-1.5 text-slate-500 hover:text-slate-900 cursor-pointer"
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
                        <div className="space-y-2 pt-1 pb-2 px-1">
                          {/* Mobile Category Switcher Pills */}
                          <div className="grid grid-cols-2 gap-1.5 pb-1">
                            {COURSE_CATEGORIES.map((cat) => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => setMobileActiveCategory(cat.id)}
                                className={cn(
                                  "text-[11px] font-bold p-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-all",
                                  mobileActiveCategory === cat.id
                                    ? "bg-blue-600 text-white border-blue-600 shadow-2xs"
                                    : "bg-white text-slate-700 border-slate-200"
                                )}
                              >
                                <cat.icon className="size-3 shrink-0" />
                                <span className="truncate">{cat.name}</span>
                              </button>
                            ))}
                          </div>

                          {/* Sub-courses for selected mobile category */}
                          {COURSE_CATEGORIES.filter((c) => c.id === mobileActiveCategory).map((cat) => (
                            <div key={cat.id} className="space-y-1.5 bg-white p-2.5 rounded-xl border border-slate-200/80">
                              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                                <span className="text-[11.5px] font-bold text-slate-900">{cat.name}</span>
                                <Link
                                  to={cat.to}
                                  className="text-[10.5px] font-bold text-blue-600 flex items-center gap-1"
                                >
                                  <span>Explore</span>
                                  <ArrowRight className="size-2.5" />
                                </Link>
                              </div>

                              {cat.subCourses.map((sub, sIdx) => (
                                <Link
                                  key={sIdx}
                                  to={sub.to}
                                  className="block py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                  <span className="block text-xs font-bold text-slate-800 leading-tight">
                                    {sub.title}
                                  </span>
                                </Link>
                              ))}

                              <Link
                                to={cat.to}
                                className="block pt-1 text-[11px] font-bold text-blue-600 hover:underline text-center"
                              >
                                {cat.viewAllText}
                              </Link>
                            </div>
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

            {/* Mobile Primary CTA */}
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

      {/* Mobile Backdrop Overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close mobile navigation"
          tabIndex={-1}
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[55] bg-slate-950/60 backdrop-blur-xs lg:hidden cursor-pointer"
        />
      )}
    </>
  );
}

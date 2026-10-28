import { Link, useRouterState } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Menu,
  MessageCircle,
  Phone,
  Radio,
  Search,
  ShieldCheck,
  TrendingUp,
  Globe,
  BookOpen,
  X,
  BarChart3,
  Megaphone,
  Terminal,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";
import { useEffect, useState, useMemo, useRef } from "react";

import { Logo } from "./Logo";
import { courses, type Course } from "@/data/courses";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import domainCyberSecurityImg from "@/assets/domain-cyber-security.jpg";
import domainDigitalMarketingImg from "@/assets/domain-digital-marketing.jpg";
import domainProgrammaticAdsImg from "@/assets/domain-programmatic-ads.jpg";

import type { LucideIcon } from "lucide-react";

export interface SubCourseItem {
  title: string;
  to: string;
  icon?: LucideIcon;
  domainName: string;
}

export interface CourseCategoryMenu {
  id: string;
  name: string;
  domainName: string;
  eyebrow: string;
  badgeStyle: string;
  image: string;
  description: string;
  to: string;
  icon: LucideIcon;
  subCourses: SubCourseItem[];
  viewAllText?: string;
}

const COURSE_CATEGORIES: CourseCategoryMenu[] = [
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    domainName: "Digital Marketing",
    eyebrow: "GROWTH & PERFORMANCE",
    badgeStyle: "bg-sky-50 text-sky-800 border-sky-200",
    image: domainDigitalMarketingImg,
    description:
      "Drive measurable business growth across SEO, paid advertising, social media, and conversion analytics.",
    to: "/courses/digital-marketing",
    icon: TrendingUp,
    subCourses: [
      {
        title: "Digital Marketing Masterclass",
        to: "/courses/digital-marketing",
        icon: TrendingUp,
        domainName: "Digital Marketing",
      },
      {
        title: "Performance Ads & GA4 Analytics",
        to: "/courses/digital-marketing",
        icon: BarChart3,
        domainName: "Digital Marketing",
      },
      {
        title: "Advanced SEO & Organic Growth",
        to: "/courses/advanced-seo",
        icon: Globe,
        domainName: "Digital Marketing",
      },
      {
        title: "Social Media & Viral Funnels",
        to: "/courses/digital-marketing",
        icon: Megaphone,
        domainName: "Digital Marketing",
      },
    ],
    viewAllText: "View All Digital Marketing Courses (6+) →",
  },
  {
    id: "cyber-security",
    name: "Cyber Security",
    domainName: "Cyber Security",
    eyebrow: "DEFENSE & ETHICAL HACKING",
    badgeStyle: "bg-blue-50 text-blue-800 border-blue-200",
    image: domainCyberSecurityImg,
    description:
      "Master network defense, ethical hacking, vulnerability assessments, and SOC incident response.",
    to: "/courses/cyber-security",
    icon: ShieldCheck,
    subCourses: [
      {
        title: "Practical Cyber Security Defense",
        to: "/courses/cyber-security",
        icon: ShieldCheck,
        domainName: "Cyber Security",
      },
      {
        title: "Ethical Hacking & Penetration Testing",
        to: "/courses/ethical-hacking",
        icon: Terminal,
        domainName: "Cyber Security",
      },
      {
        title: "SOC Analyst & Incident Response",
        to: "/courses/cyber-security",
        icon: Lock,
        domainName: "Cyber Security",
      },
      {
        title: "Network & Cloud Security Defense",
        to: "/courses/cyber-security",
        icon: Globe,
        domainName: "Cyber Security",
      },
    ],
    viewAllText: "View All Cyber Security Courses (5+) →",
  },
  {
    id: "programmatic",
    name: "Programmatic Advertising",
    domainName: "Programmatic Advertising",
    eyebrow: "ADTECH & REAL-TIME BIDDING",
    badgeStyle: "bg-blue-50 text-blue-800 border-blue-200",
    image: domainProgrammaticAdsImg,
    description:
      "Specialized enterprise media buying, real-time bidding (RTB), DV360, CM360, and AdTech analytics.",
    to: "/courses/programmatic-advertising",
    icon: Radio,
    subCourses: [
      {
        title: "DV360 & Programmatic Media Buying",
        to: "/courses/programmatic-advertising",
        icon: Radio,
        domainName: "Programmatic Advertising",
      },
      {
        title: "CM360 Ad Serving & Floodlight Tracking",
        to: "/courses/programmatic-advertising",
        icon: Layers,
        domainName: "Programmatic Advertising",
      },
      {
        title: "RTB Auction Algorithms & PMP Deals",
        to: "/courses/programmatic-advertising",
        icon: Sparkles,
        domainName: "Programmatic Advertising",
      },
      {
        title: "Cross-Exchange DSP & Media Strategy",
        to: "/courses/programmatic-advertising",
        icon: BarChart3,
        domainName: "Programmatic Advertising",
      },
    ],
    viewAllText: "View All Programmatic Courses (4+) →",
  },
];

const headerNavLinks = navLinks;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string>("digital-marketing");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Scroll listener for elevation change
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-close drawers on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileCoursesOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Focus search input when search modal opens
  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  // Keyboard shortcut (Escape to close search/menu, Cmd/Ctrl+K to open search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (mobileOpen) setMobileOpen(false);
        if (searchOpen) setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen, searchOpen]);

  // Listen for open-site-nav event dispatched from sticky banner Menu buttons
  useEffect(() => {
    const handleOpenNav = () => setMobileOpen(true);
    window.addEventListener("open-site-nav", handleOpenNav);
    return () => window.removeEventListener("open-site-nav", handleOpenNav);
  }, []);

  // Lock body scroll when mobile menu or search drawer is open
  useEffect(() => {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, searchOpen]);

  const isHomePage = pathname === "/";
  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  const currentCategoryData = useMemo(() => {
    return COURSE_CATEGORIES.find((cat) => cat.id === hoveredCategory) ?? COURSE_CATEGORIES[0]!;
  }, [hoveredCategory]);

  // Filtered search courses
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return courses.slice(0, 6);
    const q = searchQuery.toLowerCase().trim();
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.overview?.learn?.some((item) => item.toLowerCase().includes(q)),
    );
  }, [searchQuery]);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TOP ANNOUNCEMENT TICKER BAR                                            */}
      {/* ========================================================================= */}
      <div className="w-full bg-[#0C4FA8] text-white border-b border-blue-800 text-xs font-medium select-none py-1.5 sm:py-2">
        <div className="container-site">
          {/* Mobile super-compact view */}
          <div className="flex sm:hidden items-center justify-between gap-1.5 text-[10px] font-semibold min-w-0 w-full">
            <div className="flex items-center gap-1 shrink-0">
              <span className="relative flex size-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex size-1.5 rounded-full bg-white" />
              </span>
              <span className="font-extrabold bg-[#E14E2E] text-white px-2 py-0.5 rounded-full uppercase tracking-wider text-[8.5px] min-[360px]:text-[9px] whitespace-nowrap">
                Admissions Open
              </span>
              <span className="text-blue-300 shrink-0 select-none text-[9px]" aria-hidden="true">
                •
              </span>
            </div>

            <div className="relative overflow-hidden flex-1 min-w-0 h-4 flex items-center mx-1 [mask-image:linear-gradient(to_right,transparent,black_6px,black_calc(100%-6px),transparent)]">
              <div className="flex w-max animate-announcement-marquee hover:[animation-play-state:paused]">
                <div className="flex items-center gap-2.5 pr-2.5 shrink-0 text-[8.5px] min-[360px]:text-[9.5px]">
                  <span className="text-white font-medium whitespace-nowrap">
                    New Batches Starting Soon
                  </span>
                  <span className="text-orange-200 font-bold whitespace-nowrap">
                    • Limited Seats
                  </span>
                  <span className="text-blue-100 font-semibold whitespace-nowrap">
                    • Fast-Track Batches
                  </span>
                </div>
                <div className="flex items-center gap-2.5 pr-2.5 shrink-0 text-[8.5px] min-[360px]:text-[9.5px]" aria-hidden="true">
                  <span className="text-white font-medium whitespace-nowrap">
                    New Batches Starting Soon
                  </span>
                  <span className="text-orange-200 font-bold whitespace-nowrap">
                    • Limited Seats
                  </span>
                  <span className="text-blue-100 font-semibold whitespace-nowrap">
                    • Fast-Track Batches
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                to="/courses"
                className="inline-flex items-center gap-1 rounded-full bg-white/20 border border-white/30 px-2 py-0.5 text-[9px] font-bold text-white hover:bg-white hover:text-[#0C4FA8] shrink-0 transition-colors whitespace-nowrap"
              >
                <span>Programs</span>
                <ArrowRight className="size-2.5" />
              </Link>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid size-5.5 place-items-center rounded-full bg-white/20 text-white border border-white/30 hover:bg-white hover:text-[#0C4FA8] transition-colors shrink-0"
              >
                <MessageCircle className="size-2.5" />
              </a>
            </div>
          </div>

          {/* Desktop & Tablet Announcement Bar */}
          <div className="hidden sm:flex items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-2 min-w-0 flex-1 overflow-hidden">
              <span className="relative flex size-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-white" />
              </span>
              <span className="font-extrabold bg-[#E14E2E] text-white px-2.5 py-0.5 rounded-full tracking-wider text-[10.5px] uppercase whitespace-nowrap shrink-0 shadow-xs">
                Admissions Open 2026
              </span>
              <span className="text-blue-300 shrink-0 select-none text-[11px]" aria-hidden="true">
                •
              </span>

              <div className="relative overflow-hidden flex-1 max-w-[320px] lg:max-w-[420px] xl:max-w-[500px] h-4 flex items-center [mask-image:linear-gradient(to_right,transparent,black_8px,black_calc(100%-8px),transparent)]">
                <div className="flex w-max animate-announcement-marquee hover:[animation-play-state:paused]">
                  <div className="flex items-center gap-3 pr-3 shrink-0 text-[11px]">
                    <span className="text-white font-medium whitespace-nowrap">
                      New Batches Starting Soon
                    </span>
                    <span className="text-orange-200 font-bold whitespace-nowrap">
                      • Practical Live Training
                    </span>
                    <span className="text-blue-100 font-medium whitespace-nowrap">
                      • Weekend &amp; Weekday Batches
                    </span>
                    <span className="text-blue-300 select-none" aria-hidden="true">
                      •
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pr-3 shrink-0 text-[11px]" aria-hidden="true">
                    <span className="text-white font-medium whitespace-nowrap">
                      New Batches Starting Soon
                    </span>
                    <span className="text-orange-200 font-bold whitespace-nowrap">
                      • Practical Live Training
                    </span>
                    <span className="text-blue-100 font-medium whitespace-nowrap">
                      • Weekend &amp; Weekday Batches
                    </span>
                    <span className="text-blue-300 select-none" aria-hidden="true">
                      •
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 text-[11px]">
              <a
                href={site.phoneHref}
                className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white border border-white/20 hover:border-white text-white hover:text-[#0C4FA8] transition-all whitespace-nowrap shrink-0"
              >
                <span className="grid size-3.5 place-items-center rounded-full bg-white/20 text-white group-hover:bg-[#0C4FA8] group-hover:text-white transition-all shrink-0">
                  <Phone className="size-2" />
                </span>
                <span className="font-semibold text-[10.5px] hidden xl:inline">{site.phone}</span>
                <span className="font-semibold text-[10.5px] xl:hidden">Call</span>
              </a>
              <span className="h-3 w-px bg-white/20 shrink-0" aria-hidden="true" />
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 hover:bg-white border border-white/20 hover:border-white text-white hover:text-[#0C4FA8] transition-all font-semibold text-[10.5px] whitespace-nowrap shrink-0"
              >
                <span className="grid size-3.5 place-items-center rounded-full bg-white/20 text-white group-hover:bg-[#0C4FA8] group-hover:text-white transition-all shrink-0">
                  <MessageCircle className="size-2" />
                </span>
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. FLOATING FROSTED GLASS CAPSULE NAVBAR (EXACT REFERENCE MODEL)          */}
      {/* ========================================================================= */}
      <header
        className={cn(
          "w-full px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300",
          isHomePage ? "sticky top-2.5 sm:top-3.5 z-50" : "relative my-2 sm:my-3 z-40",
        )}
      >
        <div
          className={cn(
            "pointer-events-auto mx-auto max-w-7xl rounded-full transition-all duration-300 ease-in-out",
            "px-3.5 sm:px-5 lg:px-6 py-2 sm:py-2.5",
            scrolled && isHomePage
              ? "bg-white/90 shadow-[0_16px_40px_-10px_rgba(15,23,42,0.16)] border border-slate-200/90 backdrop-blur-2xl"
              : "bg-white/75 shadow-[0_12px_36px_-8px_rgba(15,23,42,0.1),0_1px_3px_rgba(0,0,0,0.05)] border border-white/85 backdrop-blur-xl",
          )}
        >
          <div className="flex items-center justify-between gap-3 md:gap-4 lg:gap-6">
            {/* LEFT: Brand Logo */}
            <div className="shrink-0">
              <Logo />
            </div>

            {/* CENTER: Capsule Navigation Island (Desktop) */}
            <nav
              aria-label="Main Navigation"
              className="hidden lg:flex items-center bg-white/95 border border-slate-200/80 shadow-[0_2px_10px_-2px_rgba(0,0,0,0.06)] rounded-full p-1 gap-1 select-none shrink-0"
            >
              {headerNavLinks.map((link) => {
                // Courses with Dropdown Flyout
                if (link.label === "Courses") {
                  const isCoursesActive = isActive(link.to);
                  return (
                    <div
                      key={link.to}
                      className="relative group/nav h-full flex items-center"
                      onMouseEnter={() => setHoveredCategory((prev) => prev || "digital-marketing")}
                    >
                      <Link
                        to={link.to}
                        className={cn(
                          "relative inline-flex items-center gap-1.5 rounded-full font-bold text-[13px] xl:text-[13.5px] transition-all duration-200 cursor-pointer select-none px-4 xl:px-5 py-2",
                          isCoursesActive
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-700 hover:text-blue-600 hover:bg-slate-100/70",
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            "size-3.5 transition-transform duration-300 group-hover/nav:rotate-180",
                            isCoursesActive
                              ? "text-white"
                              : "text-slate-500 group-hover/nav:text-blue-600",
                          )}
                        />
                      </Link>

                      {/* Courses Dropdown Flyout Menu */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 translate-y-2 invisible group-hover/nav:opacity-100 group-hover/nav:translate-y-0 group-hover/nav:visible transition-all duration-200 ease-out z-50 pointer-events-none group-hover/nav:pointer-events-auto">
                        <div className="flex bg-white shadow-[0_20px_50px_rgba(15,23,42,0.2)] rounded-2xl border border-slate-200/90 overflow-hidden text-slate-700 p-1">
                          {/* Categories Left Column */}
                          <div className="w-[215px] sm:w-[225px] py-1 bg-white relative">
                            {COURSE_CATEGORIES.map((cat) => {
                              const CatIcon = cat.icon;
                              const isSelected = hoveredCategory === cat.id;
                              return (
                                <div
                                  key={cat.id}
                                  onMouseEnter={() => setHoveredCategory(cat.id)}
                                  onClick={() => {
                                    if (pathname === "/") {
                                      window.dispatchEvent(
                                        new CustomEvent("select-domain", {
                                          detail: cat.domainName,
                                        }),
                                      );
                                      const el = document.getElementById("courses");
                                      if (el) {
                                        const topOffset = -80;
                                        const y =
                                          el.getBoundingClientRect().top +
                                          window.pageYOffset +
                                          topOffset;
                                        window.scrollTo({ top: y, behavior: "smooth" });
                                      }
                                    }
                                  }}
                                  className={cn(
                                    "relative flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] rounded-xl transition-colors cursor-pointer select-none mx-1",
                                    isSelected
                                      ? "text-blue-600 font-bold bg-blue-50/80"
                                      : "text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-medium",
                                  )}
                                >
                                  <CatIcon
                                    className={cn(
                                      "size-4 shrink-0 transition-colors",
                                      isSelected ? "text-blue-600" : "text-slate-500",
                                    )}
                                  />
                                  <span className="truncate flex-1">{cat.name}</span>
                                  {isSelected && (
                                    <ChevronRight className="size-3.5 text-blue-600 shrink-0" />
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          {/* Vertical Divider */}
                          <div className="w-px bg-slate-100 shrink-0 my-2" />

                          {/* Subcourses Right Column */}
                          <div className="w-[280px] sm:w-[310px] p-2 bg-slate-50/50 rounded-xl relative flex flex-col justify-between">
                            <div>
                              <div className="px-2.5 py-1 mb-1">
                                <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-400">
                                  {currentCategoryData.eyebrow}
                                </span>
                              </div>
                              {currentCategoryData.subCourses.map((sub, sIdx) => {
                                const SubIcon = sub.icon || BookOpen;
                                return (
                                  <Link
                                    key={sIdx}
                                    to={sub.to}
                                    onClick={() => {
                                      if (pathname === "/") {
                                        window.dispatchEvent(
                                          new CustomEvent("select-domain", {
                                            detail: sub.domainName,
                                          }),
                                        );
                                        const el = document.getElementById("courses");
                                        if (el) {
                                          const topOffset = -80;
                                          const y =
                                            el.getBoundingClientRect().top +
                                            window.pageYOffset +
                                            topOffset;
                                          window.scrollTo({ top: y, behavior: "smooth" });
                                        }
                                      }
                                    }}
                                    className="group/sub flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] text-slate-700 hover:text-blue-600 hover:bg-white hover:shadow-2xs transition-all"
                                  >
                                    <SubIcon className="size-3.5 shrink-0 text-slate-400 group-hover/sub:text-blue-600 transition-colors" />
                                    <span className="truncate flex-1 font-medium group-hover/sub:font-bold">
                                      {sub.title}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>

                            {/* View All Link */}
                            {currentCategoryData.viewAllText && (
                              <div className="pt-2 mt-2 border-t border-slate-200/80 px-2">
                                <Link
                                  to={currentCategoryData.to}
                                  onClick={() => {
                                    if (pathname === "/") {
                                      window.dispatchEvent(
                                        new CustomEvent("select-domain", {
                                          detail: currentCategoryData.domainName,
                                        }),
                                      );
                                    }
                                  }}
                                  className="text-[11.5px] font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-between"
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

                // Standard Nav Links (Home, About, Reviews, FAQ, Contact)
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={cn(
                      "relative rounded-full font-bold text-[13px] xl:text-[13.5px] transition-all duration-200 select-none px-4 xl:px-5 py-2",
                      active
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-700 hover:text-blue-600 hover:bg-slate-100/70",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT: Search Button + Primary CTA ("Get Started →") */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Circular Search Icon Button */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search courses"
                className="grid size-9 sm:size-10 place-items-center rounded-full bg-slate-100/90 hover:bg-white border border-slate-200/80 text-slate-700 hover:text-blue-600 shadow-2xs hover:shadow-xs active:scale-95 transition-all cursor-pointer select-none"
              >
                <Search className="size-4" />
              </button>

              {/* Primary Pill CTA Button ("Get Started →") */}
              <Link
                to="/courses"
                className="hidden sm:inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-[13px] xl:text-sm px-5 xl:px-6 py-2.5 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98] transition-all cursor-pointer select-none whitespace-nowrap"
              >
                <span>Get Started</span>
                <ArrowRight className="size-4 text-white" />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className={cn(
                  "grid size-9 sm:size-10 place-items-center rounded-full border transition-all duration-200 cursor-pointer lg:hidden shrink-0",
                  mobileOpen
                    ? "bg-slate-900 text-white border-slate-700 shadow-md active:scale-95"
                    : "border-slate-200/90 bg-white/90 text-slate-800 shadow-2xs hover:border-blue-400 hover:text-blue-600 hover:shadow-xs active:scale-95",
                )}
              >
                {mobileOpen ? (
                  <X className="size-4.5 stroke-[2.5]" />
                ) : (
                  <Menu className="size-4.5" />
                )}
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* ========================================================================= */}
      {/* 3. RESPONSIVE SITE NAVIGATION SLIDE-OVER DRAWER (Mobile + Desktop)        */}
      {/* ========================================================================= */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex animate-in fade-in duration-200">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Side Panel from LEFT */}
          <div
            id="site-nav-drawer"
            className="relative z-10 w-full max-w-[340px] sm:max-w-[420px] bg-white h-full shadow-2xl border-r border-slate-200/90 flex flex-col animate-in slide-in-from-left duration-300 ease-out"
          >
            {/* Top Drawer Header with Logo & Close Button */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/80">
              <Logo />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="grid size-9 place-items-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer active:scale-95"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Scrollable Navigation Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {/* Quick Search Button in Drawer */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200/80 text-slate-500 border border-slate-200 text-xs font-medium text-left transition-colors cursor-pointer"
              >
                <Search className="size-4 text-slate-400" />
                <span className="flex-1">Search courses &amp; certifications...</span>
                <span className="text-[10px] font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-400">
                  Ctrl+K
                </span>
              </button>

              {/* Navigation Links */}
              <nav aria-label="Main navigation drawer" className="space-y-1">
                {headerNavLinks.map((link) => {
                  if (link.label === "Courses") {
                    return (
                      <div
                        key={link.to}
                        className="space-y-1 rounded-2xl bg-slate-50/90 p-2 border border-slate-200/80"
                      >
                        <div className="flex items-center justify-between">
                          <Link
                            to={link.to}
                            onClick={() => setMobileOpen(false)}
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
                          <div className="space-y-2 pt-1 pb-1 px-1">
                            {/* Categories Switcher */}
                            <div className="grid grid-cols-1 gap-1.5">
                              {COURSE_CATEGORIES.map((cat) => (
                                <div
                                  key={cat.id}
                                  className="bg-white p-3 rounded-xl border border-slate-200/80 space-y-2"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <cat.icon className="size-4 text-blue-600" />
                                      <span className="text-xs font-bold text-slate-900">
                                        {cat.name}
                                      </span>
                                    </div>
                                    <Link
                                      to={cat.to}
                                      onClick={() => {
                                        setMobileOpen(false);
                                        if (pathname === "/") {
                                          window.dispatchEvent(
                                            new CustomEvent("select-domain", {
                                              detail: cat.domainName,
                                            }),
                                          );
                                        }
                                      }}
                                      className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
                                    >
                                      <span>View</span>
                                      <ArrowRight className="size-2.5" />
                                    </Link>
                                  </div>

                                  <div className="space-y-1 pt-1 border-t border-slate-100">
                                    {cat.subCourses.map((sub, sIdx) => (
                                      <Link
                                        key={sIdx}
                                        to={sub.to}
                                        onClick={() => {
                                          setMobileOpen(false);
                                          if (pathname === "/") {
                                            window.dispatchEvent(
                                              new CustomEvent("select-domain", {
                                                detail: sub.domainName,
                                              }),
                                            );
                                          }
                                        }}
                                        className="block py-1 px-2 rounded-lg hover:bg-slate-50 text-xs font-medium text-slate-700 hover:text-blue-600 transition-colors"
                                      >
                                        {sub.title}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-bold transition-all",
                        active
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                      )}
                    >
                      <span>{link.label}</span>
                      {active && <span className="size-2 rounded-full bg-white" />}
                    </Link>
                  );
                })}
              </nav>

              {/* Quick Actions (Call & WhatsApp) */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <a
                  href={site.phoneHref}
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 font-bold hover:bg-blue-100 transition-all text-center"
                >
                  <Phone className="size-3.5" />
                  <span className="text-[11.5px]">Call Admissions</span>
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold hover:bg-emerald-100 transition-all text-center"
                >
                  <MessageCircle className="size-3.5" />
                  <span className="text-[11.5px]">WhatsApp</span>
                </a>
              </div>

              {/* Primary Drawer CTA */}
              <div className="pt-2">
                <Link
                  to="/courses"
                  onClick={() => setMobileOpen(false)}
                  className="w-full bg-[linear-gradient(135deg,#0284c7_0%,#2563eb_50%,#4f46e5_100%)] hover:brightness-110 text-white font-bold h-11 text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Explore All Courses</span>
                  <ArrowRight className="size-3.5 text-white" />
                </Link>
              </div>
            </div>

            {/* Bottom Brand Credential Strip */}
            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-semibold text-slate-700">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                100% Practical Training
              </span>
              <span className="text-[10px] text-slate-400">DIGITECHADEMY</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE SEARCH MODAL DIALOG                                        */}
      {/* ========================================================================= */}
      {searchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="fixed inset-0" onClick={() => setSearchOpen(false)} aria-hidden="true" />
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in zoom-in-95 duration-150">
            {/* Search Input Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
              <Search className="size-5 text-blue-600 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, modules, tools (e.g. SEO, Cyber Security, DV360)..."
                className="flex-1 text-sm sm:text-base font-medium text-slate-900 placeholder:text-slate-400 outline-hidden bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <X className="size-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Search Results List */}
            <div className="max-h-[60vh] overflow-y-auto p-3 space-y-1 divide-y divide-slate-100">
              {searchResults.length === 0 ? (
                <div className="text-center py-10 px-4">
                  <p className="text-sm font-semibold text-slate-700">
                    No courses match &ldquo;{searchQuery}&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Try searching for &quot;Digital Marketing&quot;, &quot;Cyber Security&quot;, or
                    &quot;Programmatic&quot;.
                  </p>
                </div>
              ) : (
                searchResults.map((course: Course) => (
                  <Link
                    key={course.id}
                    to="/courses/$slug"
                    params={{ slug: course.slug }}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl hover:bg-blue-50/70 transition-colors group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                          {course.category}
                        </span>
                        <span className="text-xs text-slate-500">{course.duration}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 mt-1 truncate">
                        {course.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {course.description}
                      </p>
                    </div>
                    <div className="shrink-0 grid size-8 place-items-center rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-500 transition-all">
                      <ArrowRight className="size-4" />
                    </div>
                  </Link>
                ))
              )}
            </div>

            {/* Footer hints */}
            <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>{courses.length} certified training programs</span>
              <span>
                Press{" "}
                <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">
                  ESC
                </kbd>{" "}
                to exit
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect, type CSSProperties } from "react";
import { courses } from "@/data/courses";
import digitalMarketingImg from "@/assets/course-digital-marketing.jpg";
import cyberSecurityImg from "@/assets/course-cyber-security.jpg";
import {
  subscribeCourses,
  POPULAR_COURSE_CATEGORIES,
  type FirebaseCourse,
} from "@/services/courseService";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BtnLink } from "@/components/site/Btn";
import { CourseDemoSidebar } from "@/components/site/CourseDemoSidebar";
import {
  Award,
  BookOpen,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  FileText,
  Heart,
  HelpCircle,
  PhoneCall,
  Signal,
  Sparkles,
  Star,
  UserPlus,
  Users,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Practical Courses for Today's Digital Careers | Digitechademy" },
      {
        name: "description",
        content:
          "Choose a focused training program in Cyber Security, Digital Marketing, Ethical Hacking, or Programmatic Advertising and build job-ready skills through structured, hands-on learning.",
      },
      {
        property: "og:title",
        content: "Practical Courses for Today's Digital Careers | Digitechademy",
      },
      {
        property: "og:description",
        content:
          "Choose a focused training program in Cyber Security, Digital Marketing, Ethical Hacking, or Programmatic Advertising and build job-ready skills through structured, hands-on learning.",
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
  const [coursesList, setCoursesList] = useState<FirebaseCourse[]>(() => {
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

  const [activeTab, setActiveTab] = useState<string>("All Courses");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Subscribe to live Firebase courses
  useEffect(() => {
    const unsub = subscribeCourses((list) => {
      setCoursesList(list);
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

  // Dynamically compute category tabs with counts
  const categoryTabs = useMemo(() => {
    const activeCourses = coursesList.filter((c) => c.active !== false);
    const tabs: { id: string; label: string; count: number }[] = [
      { id: "All Courses", label: "All Courses", count: activeCourses.length },
    ];

    const categoryCounts: Record<string, number> = {};
    activeCourses.forEach((c) => {
      categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
    });

    // Merge popular categories and any other existing category
    const allCategories = Array.from(
      new Set([...POPULAR_COURSE_CATEGORIES, ...Object.keys(categoryCounts)])
    );

    allCategories.forEach((cat) => {
      const count = categoryCounts[cat] || 0;
      if (count > 0 || cat === activeTab) {
        tabs.push({ id: cat, label: cat, count });
      }
    });

    return tabs;
  }, [coursesList, activeTab]);

  // Filter visible courses based on active category tab
  const visibleCourses = useMemo(() => {
    const active = coursesList.filter((c) => c.active !== false);
    if (activeTab === "All Courses") return active;
    return active.filter((c) => c.category.toLowerCase() === activeTab.toLowerCase());
  }, [coursesList, activeTab]);

  const getCourseImage = (c: FirebaseCourse) => {
    if (c.image && c.image.length > 5) return c.image;
    if (
      c.category.toLowerCase().includes("cyber") ||
      c.category.toLowerCase().includes("security") ||
      c.slug.includes("cyber") ||
      c.slug.includes("hack")
    ) {
      return cyberSecurityImg;
    }
    return digitalMarketingImg;
  };

  const scrollToDemoForm = () => {
    const el = document.getElementById("course-demo-sidebar");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const nameInput = document.getElementById("course-sidebar-name");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 500);
      }
    }
  };

  const scrollToPrograms = () => {
    const el = document.getElementById("programs-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleDownloadProspectus = () => {
    try {
      const pdfUrl = `/curriculum/all-courses-prospectus.pdf`;
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `all-courses-prospectus.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Download error:", e);
    }

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 5000);
  };

  return (
    <SiteLayout>
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Dark Navy Background matching reference screenshot)       */}
      {/* ========================================================================= */}
      <section className="bg-[#0b1633] text-white pt-6 pb-8 border-b border-navy-800 relative overflow-hidden">
        {/* Subtle background circuit / grid glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="max-w-4xl space-y-4">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-xs text-slate-300 font-medium"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-slate-500 font-bold">»</span>
              <span className="text-white font-semibold">All Courses</span>
            </nav>

            {/* Course Directory Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-black tracking-tight text-white leading-[1.15]">
              Practical Courses for Today&apos;s Digital Careers
            </h1>

            {/* Certification Badge & Social Proof Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bold text-white">
              {/* Yellow Certification Pill Badge */}
              <span className="rounded bg-[#ffcc00] px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-slate-950 font-sans">
                CERTIFICATION
              </span>

              {/* Star Rating */}
              <div className="flex items-center gap-1">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />
                <span className="text-white font-black">4.8 Rating</span>
              </div>

              {/* Likes */}
              <div className="flex items-center gap-1">
                <Heart className="size-3.5 fill-amber-400 text-amber-400" />
                <span className="text-white font-black">5232 Likes</span>
              </div>

              {/* Enrolled Students */}
              <div className="flex items-center gap-1">
                <Users className="size-3.5 text-amber-400" />
                <span className="text-white font-black">7845+ Placed Students</span>
              </div>
            </div>

            {/* Short Tagline / Summary */}
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl pt-1 text-justify [text-align:justify] [text-justify:inter-word]">
              Choose an industry-recognized training program in Cyber Security, Digital Marketing,
              Ethical Hacking, or Programmatic Advertising and build job-ready skills through
              hands-on live labs and mentorship.
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
              <button
                type="button"
                onClick={scrollToDemoForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#142452] hover:bg-[#1a306d] border border-white/20 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md active:scale-[0.98] transition-all cursor-pointer"
              >
                <UserPlus className="size-4 text-amber-400" />
                <span>Join Free Demo</span>
              </button>

              <button
                type="button"
                onClick={scrollToPrograms}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-white/60 hover:bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <FileText className="size-4 text-white" />
                <span>Explore All Programs</span>
              </button>
            </div>

            {/* Prospectus Notice Toast */}
            {downloadSuccess && (
              <div className="w-fit rounded-lg bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 flex items-center gap-2">
                <Check className="size-3.5 text-emerald-400" />
                <span>All Programs Prospectus PDF downloaded successfully!</span>
              </div>
            )}

            {/* Metadata & Social Share Icons */}
            <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-6 border-t border-white/10 pt-4 text-xs font-medium text-slate-300">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <span>
                  Last Updated: <strong className="text-white font-semibold">August 26, 2026</strong>
                </span>
                <span>
                  Course Duration:{" "}
                  <strong className="text-white font-semibold">10–16 Weeks (65h+ Labs)</strong>
                </span>
              </div>

              {/* Social Share Round Blue Icons */}
              <div className="flex items-center gap-2">
                <a
                  href="https://www.facebook.com/sharer/sharer.php"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Facebook"
                  className="grid size-6 place-items-center rounded-full bg-[#1877f2] text-white hover:brightness-110 transition-transform hover:scale-105"
                >
                  <FacebookIcon className="size-3 fill-current" />
                </a>
                <a
                  href="https://twitter.com/intent/tweet"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on Twitter"
                  className="grid size-6 place-items-center rounded-full bg-[#1da1f2] text-white hover:brightness-110 transition-transform hover:scale-105"
                >
                  <TwitterIcon className="size-3 fill-current" />
                </a>
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Share on LinkedIn"
                  className="grid size-6 place-items-center rounded-full bg-[#0a66c2] text-white hover:brightness-110 transition-transform hover:scale-105"
                >
                  <LinkedinIcon className="size-3 fill-current" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA (Course Cards on Left + Sticky Demo Sidebar on Right)  */}
      {/* ========================================================================= */}
      <section id="programs-grid" className="bg-slate-50/60 py-8 overflow-x-clip">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px] items-start w-full min-w-0">
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN: Pill Tabs, Course Cards & Highlights                   */}
            {/* ------------------------------------------------------------------- */}
            <div className="space-y-7 w-full min-w-0">
              {/* Category Pill Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200/80 pb-3 sm:pb-4 w-full min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full min-w-0">
                  {categoryTabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                          "rounded-xl px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5 sm:gap-2 shrink-0 whitespace-nowrap active:scale-[0.98]",
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

                <button
                  type="button"
                  onClick={handleDownloadProspectus}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors py-1 cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <Download className="size-3.5" />
                  <span>Download Prospectus</span>
                </button>
              </div>


              {/* Course Cards Grid */}
              <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 w-full min-w-0">
                {visibleCourses.map((course) => (
                  <article
                    key={course.id}
                    onClick={() => {
                      navigate({ to: "/courses/$slug", params: { slug: course.slug } });
                    }}
                    className="group flex flex-col w-full min-w-0 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:border-indigo-500/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
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
                      <span className="absolute left-3 top-3 rounded-md bg-[#0b1633]/90 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wider text-amber-300 border border-white/10 backdrop-blur-sm">
                        {course.category}
                      </span>
                      <span className="absolute right-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-[0.62rem] font-black uppercase tracking-wider text-slate-900 shadow-sm">
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
                          <h3 className="text-base sm:text-lg font-black text-navy leading-snug group-hover:text-indigo-600 hover:underline transition-colors">
                            {course.title}
                          </h3>
                        </Link>
                        <p className="mt-1.5 text-xs text-slate-600 leading-relaxed text-justify line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      {/* Tool Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {(course.highlights || []).slice(0, 4).map((tool) => (
                          <span
                            key={tool}
                            className="rounded-md bg-slate-100 px-2 py-0.5 text-[0.65rem] font-bold text-slate-700"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* Specs Row */}
                      <div className="flex flex-wrap items-center gap-x-2.5 sm:gap-x-3 gap-y-1.5 text-[0.72rem] sm:text-xs font-semibold text-slate-500 border-t border-slate-100 pt-3 mt-auto">
                        <div className="flex items-center gap-1 shrink-0">
                          <Clock className="size-3.5 text-indigo-600" />
                          <span>{course.duration}</span>
                        </div>
                        <span className="text-slate-300">&bull;</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <Signal className="size-3.5 text-indigo-600" />
                          <span>{(course.level || "All Levels").split(" to ")[0]}</span>
                        </div>
                        <span className="text-slate-300">&bull;</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <BookOpen className="size-3.5 text-indigo-600" />
                          <span>{course.syllabus?.length || 4} Modules</span>
                        </div>
                      </div>

                      {/* Dual Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2.5 border-t border-slate-100">
                        <BtnLink
                          to="/courses/$slug"
                          params={{ slug: course.slug }}
                          variant="outline"
                          size="sm"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full min-w-0 border-slate-200 hover:bg-navy hover:text-white hover:border-navy text-slate-800 font-bold rounded-xl text-xs h-9 justify-center gap-1 px-2"
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
                          className="w-full min-w-0 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-9 flex items-center justify-center gap-1 shadow-xs cursor-pointer transition-colors px-2"
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
                  Why Learn With Digitechademy?
                </h3>
                <div className="grid gap-3 sm:grid-cols-2 w-full min-w-0">
                  {[
                    "100% Job-Oriented Hands-On Practical Curriculum",
                    "Live Interactive Online Sessions by Certified Practitioners",
                    "Cloud-Based Virtual Lab Environments & Real-Time Tool Access",
                    "Real-Time Case Studies & Capstone Industry Projects",
                    "Dedicated Resume Building & Mock Interview Sessions",
                    "Authorized Course Completion Credential for LinkedIn",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      data-reveal={idx % 2 === 0 ? "left" : "top"}
                      style={{ "--reveal-delay": `${(idx % 2) * 100 + Math.floor(idx / 2) * 80}ms` } as CSSProperties}
                      className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3 sm:p-3.5 shadow-xs min-w-0"
                    >
                      <span className="grid size-6 place-items-center rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold shrink-0 mt-0.5">
                        <Check className="size-3.5 stroke-[2.5]" />
                      </span>
                      <span className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Program FAQs Section */}
              <div className="space-y-3 pt-4 border-t border-slate-200/80 w-full min-w-0">
                <div
                  data-reveal="left"
                  className="flex items-center justify-between"
                >
                  <h3 className="text-base sm:text-lg font-black text-navy flex items-center gap-2">
                    <HelpCircle className="size-5 text-indigo-600 shrink-0" />
                    Frequently Asked Questions
                  </h3>
                  <span className="text-xs font-bold text-slate-400">
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
                        className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-xs w-full min-w-0"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedFaq(isFaqExpanded ? null : index)}
                          className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left font-bold text-sm sm:text-base text-navy hover:bg-slate-50/50 cursor-pointer"
                        >
                          <span className="pr-2">{faq.question}</span>
                          {isFaqExpanded ? (
                            <ChevronUp className="size-4 text-indigo-600 shrink-0 ml-auto" />
                          ) : (
                            <ChevronDown className="size-4 text-slate-400 shrink-0 ml-auto" />
                          )}
                        </button>
                        {isFaqExpanded && (
                          <div className="border-t border-slate-100 p-3.5 sm:p-4 bg-slate-50/30 text-xs sm:text-sm lg:text-[0.95rem] text-slate-600 leading-relaxed text-justify">
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
            <aside className="lg:sticky lg:top-24 w-full min-w-0">
              <CourseDemoSidebar />
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

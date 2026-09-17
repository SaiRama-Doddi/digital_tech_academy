import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo, type CSSProperties } from "react";
import { courses, type Course } from "@/data/courses";
import digitalMarketingImg from "@/assets/course-digital-marketing.jpg";
import cyberSecurityImg from "@/assets/course-cyber-security.jpg";
import { getCourseBySlug, subscribeCourses, getLocalCachedCourses, type FirebaseCourse } from "@/services/courseService";
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
  Layers,
  PhoneCall,
  Signal,
  Star,
  UserPlus,
  Users,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses/$slug")({
  head: ({ params }) => {
    const cached = typeof window !== "undefined" ? getLocalCachedCourses() : [];
    const foundCached = cached.find((c) => c.slug === params.slug || c.id === params.slug);
    const staticCourse = courses.find((c) => c.slug === params.slug);
    const course = foundCached || staticCourse;
    const fallbackTitle = params.slug
      ? params.slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      : "Program Details";
    const title = course
      ? `${course.title} | DIGITECHADEMY`
      : `${fallbackTitle} Training Online | DIGITECHADEMY`;
    const desc = course
      ? course.description
      : "Practical, mentor-led industry training program at DIGITECHADEMY.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
      links: [{ rel: "canonical", href: `/courses/${params.slug}` }],
    };
  },
  component: CourseDetailPage,
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

type TabType = "about" | "curriculum" | "description" | "faqs";

const tabs: { id: TabType; label: string }[] = [
  { id: "about", label: "About" },
  { id: "curriculum", label: "Curriculum" },
  { id: "description", label: "Description" },
  { id: "faqs", label: "FAQ's" },
];

function adaptFirebaseCourseToDetail(fbCourse: FirebaseCourse): Course {
  const cat = fbCourse.category || "Training";
  const desc = fbCourse.description || "";
  const longDesc = fbCourse.longDescription || fbCourse.about?.description || desc;
  const courseTitle = fbCourse.title || "Program Details";
  const courseSlug = fbCourse.slug || fbCourse.id;

  return {
    id: fbCourse.id || courseSlug,
    slug: courseSlug,
    title: courseTitle,
    heroEyebrow: `${cat.toUpperCase()} TRAINING`,
    heroTitle: courseTitle,
    heroDescription: desc,
    primaryCta: "Enroll Now",
    secondaryCta: "Request a Call",
    category: cat as any,
    description: desc,
    longDescription: longDesc,
    duration: fbCourse.duration || "12 Weeks (120+ Hours)",
    level: fbCourse.level || "Beginner to Advanced",
    mode: fbCourse.mode || "Classroom & Live Online",
    certificate: fbCourse.certificate || "Course completion certificate",
    image:
      fbCourse.image ||
      (cat === "Cyber Security" ? cyberSecurityImg : digitalMarketingImg),
    highlights: Array.isArray(fbCourse.highlights) ? fbCourse.highlights : [],
    overview: {
      heading: `Master ${courseTitle} with Expert Mentorship`,
      description: fbCourse.about?.description || longDesc,
      learn: Array.isArray(fbCourse.about?.learn) ? fbCourse.about.learn : [],
      audience: Array.isArray(fbCourse.about?.audience) ? fbCourse.about.audience : [],
      outcomes: Array.isArray(fbCourse.about?.outcomes) ? fbCourse.about.outcomes : [],
    },
    syllabus: Array.isArray(fbCourse.syllabus)
      ? fbCourse.syllabus.map((s, idx) => ({
          module: s.module || `Module ${idx + 1}`,
          title: s.title || `Module ${idx + 1}`,
          topics: Array.isArray(s.topics) ? s.topics : [],
        }))
      : [],
    practicalTraining: [
      "Guided live laboratory walkthroughs",
      "Hands-on assignments after each module",
      "Real-world business case studies",
      "Mentor feedback on all submissions",
    ],
    projects: [
      {
        title: "Industry Capstone Project",
        summary: "Execute an end-to-end practical project meeting industry benchmarks.",
      },
    ],
    instructors: [
      {
        name: fbCourse.instructor || "Sai Rama",
        role: `${cat} Specialist`,
        experience: "8+ years in professional practice and instruction",
        expertise:
          Array.isArray(fbCourse.highlights) && fbCourse.highlights.length > 0
            ? fbCourse.highlights.slice(0, 4)
            : ["Practical Training", "Mentorship"],
        image: digitalMarketingImg,
      },
    ],
    pricing: {
      fee: fbCourse.price || "₹24,999",
      note: "Flexible EMI options and batch timings available",
      includes: [
        "Live Interactive Masterclasses",
        "Hands-on Lab Assignments",
        "Interview Preparation & Resume Review",
        "Lifetime Access to Class Recordings",
      ],
    },
    testimonials: [],
    faqs: Array.isArray(fbCourse.faqs) ? fbCourse.faqs : [],
  };
}

function CourseDetailPage() {
  const { slug } = Route.useParams();
  const staticCourse = courses.find((c) => c.slug === slug);
  const [courseData, setCourseData] = useState<Course | null>(() => {
    if (staticCourse) return staticCourse;
    if (typeof window !== "undefined") {
      const cached = getLocalCachedCourses();
      const found = cached.find((c) => c.slug === slug || c.id === slug);
      if (found) return adaptFirebaseCourseToDetail(found);
    }
    return null;
  });
  const [allLiveCourses, setAllLiveCourses] = useState<FirebaseCourse[]>(() => {
    if (typeof window !== "undefined") {
      return getLocalCachedCourses();
    }
    return [];
  });
  const [isLoadingDynamic, setIsLoadingDynamic] = useState(!courseData);

  const [activeTab, setActiveTab] = useState<TabType>("about");
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Subscribe to live course updates
  useEffect(() => {
    getCourseBySlug(slug).then((fbCourse) => {
      if (fbCourse) {
        setCourseData(adaptFirebaseCourseToDetail(fbCourse));
      } else if (staticCourse) {
        setCourseData(staticCourse);
      }
      setIsLoadingDynamic(false);
    });

    const unsub = subscribeCourses((list) => {
      if (list && list.length > 0) {
        setAllLiveCourses(list);
      }
      const found = list.find((c) => c.slug === slug || c.id === slug);
      if (found) {
        setCourseData(adaptFirebaseCourseToDetail(found));
      }
    });
    return () => unsub();
  }, [slug, staticCourse]);

  const course = courseData || staticCourse;

  // Display title matching screenshot style (e.g. Cyber Security Training Online)
  const displayTitle = course
    ? course.title.toLowerCase().includes("online")
      ? course.title
      : `${course.title} Training Online`
    : `${slug.replace(/-/g, " ")} Training Online`;

  // Dynamically sync browser tab title with active course name
  useEffect(() => {
    if (course) {
      document.title = `${displayTitle} | DIGITECHADEMY`;
    }
  }, [course, displayTitle]);

  const relatedCourses = useMemo(() => {
    const currentSlug = course?.slug || slug;
    const currentId = course?.id || slug;
    const list =
      allLiveCourses.length > 0
        ? allLiveCourses.filter(
            (c) => c && c.slug && c.slug !== currentSlug && c.id !== currentId && c.active !== false
          )
        : courses.filter((c) => c && c.slug && c.slug !== currentSlug);
    return list.slice(0, 3);
  }, [allLiveCourses, course?.slug, course?.id, slug]);

  if (isLoadingDynamic && !course) {
    return (
      <SiteLayout>
        <div className="container-site py-28 text-center">
          <div className="size-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800">Loading Program Details...</h2>
          <p className="mt-1 text-sm text-slate-500">Connecting to course catalog</p>
        </div>
      </SiteLayout>
    );
  }

  if (!course) {
    return (
      <SiteLayout>
        <div className="container-site py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Course Not Found</h1>
          <p className="mt-3 text-muted-foreground">
            The program you are looking for does not exist or has been updated.
          </p>
          <div className="mt-6">
            <BtnLink to="/courses" variant="primary">
              Browse All Courses
            </BtnLink>
          </div>
        </div>
      </SiteLayout>
    );
  }

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

  const handleDownloadCurriculum = () => {
    try {
      const pdfUrl = `/curriculum/${course.slug}-curriculum.pdf`;
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `${course.slug}-curriculum.pdf`;
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
      {/* 1. HERO SECTION (Compact Sticky Navy Background)                           */}
      {/* ========================================================================= */}
      <section className="bg-[#0b1633] text-white py-4 sm:py-5 border-b border-navy-800 sticky top-16 z-20 shadow-md backdrop-blur-xl relative overflow-hidden">
        {/* Subtle background circuit / grid glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="max-w-5xl space-y-2.5">
            {/* Breadcrumb & Social Proof Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium"
              >
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span className="text-slate-600">»</span>
                <Link to="/courses" className="hover:text-white transition-colors">
                  Courses
                </Link>
                <span className="text-slate-600">»</span>
                <span className="text-white font-semibold line-clamp-1">{displayTitle}</span>
              </nav>

              <div className="flex items-center gap-2 sm:gap-3 text-[11px] font-bold text-slate-300">
                <span className="rounded bg-[#ffcc00] px-2 py-0.5 text-[9.5px] font-black uppercase tracking-wider text-slate-950 font-sans">
                  CERTIFICATION
                </span>
                <span className="flex items-center gap-1 text-amber-300">
                  <Star className="size-3 fill-current" />
                  4.6
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">
                  {course.duration && (course.duration.includes("h") || course.duration.includes("H"))
                    ? course.duration
                    : `${course.duration || "12 Weeks"} (65h Live)`}
                </span>
              </div>
            </div>

            {/* Course Main Title & Demo CTA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-0.5">
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] font-black tracking-tight text-white leading-tight sm:whitespace-nowrap">
                  {displayTitle}
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal w-full max-w-none whitespace-normal md:whitespace-nowrap">
                  {course.category === "Cyber Security"
                    ? "Comprehensive practical training for mastering essential Cyber Security skills remotely."
                    : course.heroDescription || course.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={scrollToDemoForm}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 px-4 py-2 text-xs font-black text-slate-950 shadow-md transition-all cursor-pointer"
                >
                  <UserPlus className="size-3.5" />
                  <span>Join Free Demo</span>
                </button>
              </div>
            </div>

            {/* Curriculum Download Notice Toast */}
            {downloadSuccess && (
              <div className="w-fit rounded-lg bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 flex items-center gap-2">
                <Check className="size-3.5 text-emerald-400" />
                <span>Curriculum PDF guide downloaded successfully for {course.title}!</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTENT AREA (Tabs on Left + Sticky Demo Sidebar on Right)         */}
      {/* ========================================================================= */}
      <section className="bg-slate-50/60 py-8">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_390px] items-start">
            
            {/* ------------------------------------------------------------------- */}
            {/* LEFT COLUMN: Horizontal Tabs & Tab Panels                           */}
            {/* ------------------------------------------------------------------- */}
            <div className="space-y-6">
              
              {/* Horizontal Tabs: About, Curriculum, Description, FAQ's */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-b border-slate-200/80 pb-4">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "rounded-lg px-6 py-2.5 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer",
                        isActive
                          ? "bg-[#5455f6] text-white shadow-md shadow-indigo-500/25"
                          : "bg-[#eff2fe] hover:bg-[#e0e7ff] text-[#4b52c0]"
                      )}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* ================================================================= */}
              {/* TAB 1: ABOUT PANEL (Exact layout from user reference screenshot)  */}
              {/* ================================================================= */}
              {activeTab === "about" && (
                <div className="space-y-7 animate-in fade-in duration-200">
                  {/* Opening Lead Paragraph from screenshot */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-sm space-y-4">
                    <p className="text-sm sm:text-base text-slate-700 leading-relaxed text-justify">
                      Our online {course.title} training and placement program is fully job-oriented
                      and includes real-time project work for hands-on learning. The{" "}
                      <strong className="text-navy">{displayTitle} Course</strong> is developed by
                      certified experts to deliver industry-ready skills.
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                      {course.longDescription || course.description}
                    </p>
                  </div>

                  {/* Key Highlights / Program Features */}
                  <div className="space-y-3">
                    <h3 className="text-base sm:text-lg font-black text-navy flex items-center gap-2">
                      <CheckCircle2 className="size-5 text-accent shrink-0" />
                      Key Course Features &amp; Placement Support
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        "100% Job-Oriented Hands-On Practical Curriculum",
                        "Live Interactive Online Sessions by Industry Experts",
                        "Cloud-Based Virtual Lab Environments & Tool Access",
                        "Real-Time Case Studies & Capstone Industry Project",
                        "Comprehensive Resume Building & Mock Interview Sessions",
                        "Official Authorized Course Completion Credential",
                      ].map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs"
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

                  {/* What You'll Learn Section */}
                  {((course.overview?.whatYouLearnDetailed && course.overview.whatYouLearnDetailed.length > 0) ||
                    (course.overview?.learn && course.overview.learn.length > 0)) && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base sm:text-lg font-black text-navy flex items-center gap-2">
                          <BookOpen className="size-5 text-accent shrink-0" />
                          What You Will Learn
                        </h3>
                        <span className="text-xs font-bold text-slate-400">
                          {(course.overview?.whatYouLearnDetailed?.length || course.overview?.learn?.length || 0)}{" "}
                          Core Topics
                        </span>
                      </div>

                      {course.overview?.whatYouLearnDetailed ? (
                        <div className="grid gap-3.5 sm:grid-cols-2">
                          {course.overview.whatYouLearnDetailed.map((item, idx) => (
                            <div
                              key={idx}
                              className="rounded-2xl border border-slate-200/80 bg-white p-4.5 shadow-sm hover:border-indigo-500/40 hover:shadow-md transition-all group"
                            >
                              <div className="flex items-center gap-2.5 mb-1.5">
                                <span className="grid size-7 place-items-center rounded-lg bg-indigo-50 text-indigo-600 text-xs font-black shrink-0">
                                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                                </span>
                                <h4 className="text-xs sm:text-sm font-bold text-navy leading-tight">
                                  {item.title}
                                </h4>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed pl-9">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">
                          <ul className="grid gap-2.5 sm:grid-cols-2">
                            {(course.overview?.learn || []).map((item) => (
                              <li
                                key={item}
                                className="flex gap-2.5 text-xs sm:text-sm text-slate-600 leading-snug"
                              >
                                <Check className="size-4 shrink-0 text-accent mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Who Should Enroll */}
                  {(course.overview?.audienceDescription ||
                    (course.overview?.audience && course.overview.audience.length > 0)) && (
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-3">
                      <h3 className="text-sm font-black uppercase tracking-wider text-navy flex items-center gap-2">
                        <Users className="size-4 text-accent shrink-0" />
                        Who Should Attend This Training?
                      </h3>
                      {course.overview?.audienceDescription ? (
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {course.overview.audienceDescription}
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          {(course.overview?.audience || []).map((item) => (
                            <li
                              key={item}
                              className="flex gap-2.5 text-xs sm:text-sm text-slate-600 leading-snug"
                            >
                              <span className="size-2 rounded-full bg-accent shrink-0 mt-1.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {/* Career Readiness & Placement Outcomes */}
                  {course.overview?.outcomes && course.overview.outcomes.length > 0 && (
                    <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/50 to-white p-6 shadow-sm space-y-3">
                      <h3 className="text-sm font-black uppercase tracking-wider text-navy flex items-center gap-2">
                        <Award className="size-4 text-accent shrink-0" />
                        Career Outcomes &amp; Skills Acquired
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        Graduates from this program gain working competence, resume-ready portfolio
                        projects, and direct preparation for high-demand technical roles across the industry.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {(course.overview.outcomes || []).map((item, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs"
                          >
                            <Check className="size-3.5 text-emerald-600" />
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 2: CURRICULUM PANEL (Modular Syllabus with Accordion)          */}
              {/* ================================================================= */}
              {activeTab === "curriculum" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-navy">
                        Course Curriculum &amp; Syllabus Breakdown
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Structured modular tracks designed to meet latest industry hiring benchmarks.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleDownloadCurriculum}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 shadow-xs transition-colors cursor-pointer shrink-0"
                    >
                      <Download className="size-3.5" />
                      <span>Download PDF Syllabus</span>
                    </button>
                  </div>

                  {(!course.syllabus || course.syllabus.length === 0) ? (
                    <div className="p-8 sm:p-12 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
                      <Layers className="size-10 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-navy">Curriculum Syllabus in Progress</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                        Detailed module topics for this program are currently being structured by our faculty. Contact us to receive syllabus updates.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {course.syllabus.map((item, index) => {
                        const isExpanded = expandedModule === index;
                        return (
                          <div
                            key={index}
                            className={cn(
                              "border rounded-2xl transition-all duration-200 overflow-hidden shadow-xs",
                              isExpanded
                                ? "border-indigo-500/40 bg-indigo-50/20"
                                : "border-slate-200/80 bg-white"
                            )}
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedModule(isExpanded ? null : index)}
                              className="w-full flex items-center justify-between p-4 text-left font-bold text-navy hover:bg-slate-50/50 transition-colors cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-[0.7rem] bg-[#0b1633] text-amber-300 font-black px-2.5 py-1 rounded-md tracking-wider">
                                  {item.module}
                                </span>
                                <span className="text-xs sm:text-sm font-bold text-navy">
                                  {item.title}
                                </span>
                              </div>
                              {isExpanded ? (
                                <ChevronUp className="size-4 text-indigo-600" />
                              ) : (
                                <ChevronDown className="size-4 text-slate-400" />
                              )}
                            </button>

                            {isExpanded && (
                              <div className="border-t border-slate-100 p-5 bg-white">
                                <ul className="grid gap-2.5 sm:grid-cols-2">
                                  {(item.topics || []).map((topic, i) => (
                                    <li
                                      key={i}
                                      className="flex items-center gap-2 text-xs sm:text-sm text-slate-600"
                                    >
                                      <span className="size-1.5 bg-indigo-600 rounded-full shrink-0" />
                                      <span>{topic}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 3: DESCRIPTION PANEL (Detailed Methodology, Projects, Mentors) */}
              {/* ================================================================= */}
              {activeTab === "description" && (
                <div className="space-y-7 animate-in fade-in duration-200">
                  {/* Detailed Description */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-3">
                    <h3 className="text-base sm:text-lg font-black text-navy">
                      Program Overview &amp; Training Methodology
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                      {course.practicalLearning?.description || course.longDescription}
                    </p>
                  </div>

                  {/* Practical Labs & Portfolio Projects */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="bg-white border border-slate-200/80 p-5 rounded-2xl space-y-3 shadow-sm">
                      <h4 className="text-xs font-black uppercase tracking-wider text-navy flex items-center gap-2">
                        <Briefcase className="size-4 text-accent" />
                        Practical Lab Training
                      </h4>
                      <ul className="space-y-2">
                        {(course.practicalTraining || []).map((item, i) => (
                          <li key={i} className="flex gap-2 text-xs text-slate-600">
                            <Check className="size-3.5 shrink-0 text-emerald-600 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white border border-slate-200/80 p-5 rounded-2xl space-y-3 shadow-sm">
                      <h4 className="text-xs font-black uppercase tracking-wider text-navy flex items-center gap-2">
                        <FileText className="size-4 text-accent" />
                        Real-World Projects
                      </h4>
                      <div className="space-y-2">
                        {(course.projects || []).map((project, i) => (
                          <div
                            key={i}
                            className="border border-slate-100 rounded-xl p-3 bg-slate-50/50"
                          >
                            <h5 className="text-xs font-bold text-navy">{project.title}</h5>
                            <p className="text-[0.72rem] text-slate-500 mt-0.5 leading-relaxed text-justify">
                              {project.summary}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Certification Credential Box */}
                  <div className="grid gap-6 md:grid-cols-[1.3fr_1fr] border border-slate-200/80 rounded-2xl p-6 bg-gradient-to-br from-white to-indigo-50/30 items-center shadow-sm">
                    <div className="space-y-2">
                      <span className="text-[0.65rem] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-md">
                        Official Credential
                      </span>
                      <h4 className="text-base font-black text-navy">
                        {course.title} Authorized Certification
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed text-justify">
                        Earn an industry-recognized certificate and verified digital credential
                        upon completing assessments, labs, and capstones. Add this credential
                        directly to LinkedIn.
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="border border-slate-200 shadow-lg rounded-xl bg-white p-4 rotate-1 max-w-[200px] text-center">
                        <Award className="size-8 text-amber-500 mx-auto" />
                        <span className="block text-xs font-black text-navy uppercase tracking-wider mt-2">
                          DIGITECHADEMY
                        </span>
                        <span className="block text-[0.65rem] text-slate-400 font-semibold mt-1">
                          Verified Certificate
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Mentors */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-500">
                      Your Instructors &amp; Mentors
                    </h4>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {(course.instructors || []).map((item) => (
                        <div
                          key={item.name}
                          className="flex gap-3.5 border border-slate-200/80 rounded-2xl p-4 bg-white shadow-xs items-center"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="size-12 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <h5 className="text-sm font-bold text-navy">{item.name}</h5>
                            <span className="block text-xs text-muted-foreground">{item.role}</span>
                            <span className="block text-[0.7rem] text-indigo-600 font-bold mt-0.5">
                              {item.experience}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ================================================================= */}
              {/* TAB 4: FAQS PANEL (Frequently Asked Questions Accordion)           */}
              {/* ================================================================= */}
              {activeTab === "faqs" && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div data-reveal="left" className="border-b border-slate-200/80 pb-3">
                    <h3 className="text-lg sm:text-xl font-black text-navy flex items-center gap-2">
                      <HelpCircle className="size-5 text-indigo-600 shrink-0" />
                      Frequently Asked Questions
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Common queries regarding class timings, batch schedules, fees, and placement assistance.
                    </p>
                  </div>

                  {(!course.faqs || course.faqs.length === 0) ? (
                    <div className="p-8 sm:p-12 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
                      <HelpCircle className="size-10 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-navy">No FAQs Available Yet</h4>
                      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                        Have questions about this course? Connect with our counselors below for personalized guidance.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {(course.faqs || []).map((faq, index) => {
                        const isFaqExpanded = expandedFaq === index;
                        return (
                          <div
                            key={index}
                            data-reveal={index % 2 === 0 ? "top" : "left"}
                            style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                            className="border border-slate-200/80 rounded-xl overflow-hidden bg-white shadow-xs"
                          >
                            <button
                              type="button"
                              onClick={() => setExpandedFaq(isFaqExpanded ? null : index)}
                              className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-navy hover:bg-slate-50/50 cursor-pointer"
                            >
                              <span>{faq.question}</span>
                              {isFaqExpanded ? (
                                <ChevronUp className="size-4 text-indigo-600 shrink-0 ml-2" />
                              ) : (
                                <ChevronDown className="size-4 text-slate-400 shrink-0 ml-2" />
                              )}
                            </button>
                            {isFaqExpanded && (
                              <div className="border-t border-slate-100 p-4 bg-slate-50/30 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Need more help card */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                    <div>
                      <h4 className="text-sm font-bold text-navy">Still have questions?</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Our academic counselor can answer all questions about batches and curricula.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={scrollToDemoForm}
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 shadow-sm cursor-pointer shrink-0"
                    >
                      <PhoneCall className="size-3.5" />
                      <span>Request Free Counseling</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT COLUMN: Video Demo Card + JOIN FREE DEMO CLASS Form           */}
            {/* ------------------------------------------------------------------- */}
            <aside className="lg:sticky lg:top-24">
              <CourseDemoSidebar course={course} />
            </aside>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2.5 EXPLORE OTHER COURSES SECTION                                          */}
      {/* ========================================================================= */}
      <section className="bg-white py-12 border-t border-slate-200/80">
        <div className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="max-w-2xl lg:max-w-3xl flex-1 min-w-0">
              <span className="text-xs font-black uppercase tracking-widest text-indigo-600">
                RELATED PROGRAMS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-navy mt-1">
                Explore Other Professional Programs
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Looking to explore other career disciplines? Browse our other high-demand certification training courses with live mentors and hands-on labs.
              </p>
            </div>
            <BtnLink
              to="/courses"
              variant="outline"
              size="sm"
              className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 font-bold rounded-xl text-xs h-10 px-4 shrink-0 flex items-center gap-1.5"
            >
              <span>View All Courses Catalog</span>
              <ArrowRight className="size-3.5" />
            </BtnLink>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedCourses.map((otherCourse) => {
              if (!otherCourse || !otherCourse.slug) return null;
              const imageSrc =
                otherCourse.image ||
                (otherCourse.category === "Cyber Security" ? cyberSecurityImg : digitalMarketingImg);
              const moduleCount =
                otherCourse.syllabus && Array.isArray(otherCourse.syllabus)
                  ? otherCourse.syllabus.length
                  : 6;
              const levelText =
                otherCourse.level && typeof otherCourse.level === "string" && otherCourse.level.includes(" to ")
                  ? otherCourse.level.split(" to ")[0]
                  : otherCourse.level || "Beginner";
              const otherSlug = otherCourse.slug || otherCourse.id;
              return (
                <article
                  key={otherCourse.id || otherSlug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:border-indigo-500/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                    <img
                      src={imageSrc}
                      alt={`${otherCourse.title} banner`}
                      loading="lazy"
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-md bg-[#0b1633]/90 px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wider text-amber-300 border border-white/10">
                      {otherCourse.category}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 space-y-3">
                    <div>
                      <h3 className="text-base font-black text-navy group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {otherCourse.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 line-clamp-2 text-justify">
                        {otherCourse.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-semibold text-slate-500 border-t border-slate-100 pt-3 mt-auto">
                      <div className="flex items-center gap-1">
                        <Clock className="size-3.5 text-indigo-600" />
                        <span>{otherCourse.duration}</span>
                      </div>
                      <span className="text-slate-300">&bull;</span>
                      <div className="flex items-center gap-1">
                        <Signal className="size-3.5 text-indigo-600" />
                        <span>{levelText}</span>
                      </div>
                      <span className="text-slate-300">&bull;</span>
                      <div className="flex items-center gap-1">
                        <BookOpen className="size-3.5 text-indigo-600" />
                        <span>{moduleCount} Modules</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <BtnLink
                        to="/courses/$slug"
                        params={{ slug: otherSlug }}
                        variant="accent"
                        size="sm"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs h-9 justify-center gap-1.5 shadow-xs"
                      >
                        <span>View Program Curriculum</span>
                        <ArrowRight className="size-3.5" />
                      </BtnLink>
                    </div>
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

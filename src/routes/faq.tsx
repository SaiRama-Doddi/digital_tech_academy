import { useState, useMemo, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  Code,
  Cpu,
  GraduationCap,
  HelpCircle,
  Layers,
  Megaphone,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Radio,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  subscribeFaqs,
  getLocalCachedFaqs,
  type FirebaseFaq,
} from "@/services/faqService";
import {
  subscribeCourses,
  getLocalCachedCourses,
  normalizeCourseCategory,
  type FirebaseCourse,
} from "@/services/courseService";
import { courses as staticCourses } from "@/data/courses";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | DIGITECHADEMY" },
      {
        name: "description",
        content:
          "Find clear answers about DIGITECHADEMY courses, practical lab formats, DV360, Cyber Security, Digital Marketing, and admissions.",
      },
      { property: "og:title", content: "Frequently Asked Questions | DIGITECHADEMY" },
      {
        property: "og:description",
        content:
          "Find clear answers about DIGITECHADEMY courses, practical lab formats, eligibility, and enrollment.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

const categoryIcons: Record<string, typeof HelpCircle> = {
  All: Layers,
  General: GraduationCap,
  "Digital Marketing": Megaphone,
  "Programmatic Advertising": Radio,
  "Cyber Security": ShieldCheck,
  "Enrollment & Support": CheckCircle2,
  "AI & Automation": Cpu,
  "Full Stack Development": Code,
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  General: { bg: "bg-blue-50", text: "text-[#0C4FA8]", border: "border-blue-200" },
  "Digital Marketing": {
    bg: "bg-blue-50",
    text: "text-[#0C4FA8]",
    border: "border-blue-200",
  },
  "Programmatic Advertising": {
    bg: "bg-orange-50",
    text: "text-[#E14E2E]",
    border: "border-orange-200",
  },
  "Cyber Security": { bg: "bg-blue-50", text: "text-[#0C4FA8]", border: "border-blue-200" },
  "Enrollment & Support": {
    bg: "bg-orange-50",
    text: "text-[#E14E2E]",
    border: "border-orange-200",
  },
  "AI & Automation": {
    bg: "bg-blue-50",
    text: "text-[#0C4FA8]",
    border: "border-blue-200",
  },
  "Full Stack Development": {
    bg: "bg-orange-50",
    text: "text-[#E14E2E]",
    border: "border-orange-200",
  },
};

interface UnifiedFaq {
  id: string;
  category: string;
  question: string;
  answer: string;
  order?: number | undefined;
  courseTitle?: string | undefined;
  courseSlug?: string | undefined;
  isCourseFaq?: boolean | undefined;
}

const preferredCategoryOrder = [
  "All",
  "General",
  "Digital Marketing",
  "Programmatic Advertising",
  "Cyber Security",
  "AI & Automation",
  "Full Stack Development",
  "Enrollment & Support",
];

function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "Who can join Digitechademy?": true,
  });
  const [faqList, setFaqList] = useState<FirebaseFaq[]>(() => getLocalCachedFaqs());
  const [courseList, setCourseList] = useState<FirebaseCourse[]>(() => {
    if (typeof window !== "undefined") {
      return getLocalCachedCourses();
    }
    return [];
  });

  // Subscribe to real-time Firestore FAQ updates
  useEffect(() => {
    const unsubscribe = subscribeFaqs((updated) => {
      setFaqList(updated);
    });
    return () => unsubscribe();
  }, []);

  // Subscribe to real-time Firestore Courses updates for course-specific FAQs
  useEffect(() => {
    const unsubscribe = subscribeCourses((updated) => {
      if (updated && updated.length > 0) {
        setCourseList(updated);
      }
    });
    return () => unsubscribe();
  }, []);

  // Merge Knowledgebase FAQs + All Course-specific FAQs with deduplication
  const allFaqs = useMemo<UnifiedFaq[]>(() => {
    const result: UnifiedFaq[] = [];
    const seen = new Set<string>();

    // 1. Knowledgebase / General FAQs first
    faqList.forEach((item, idx) => {
      const q = (item.question || "").trim();
      const a = (item.answer || "").trim();
      if (!q || !a) return;
      const norm = q.toLowerCase();
      if (seen.has(norm)) return;
      seen.add(norm);

      result.push({
        id: item.id || `faq-kb-${idx}`,
        category: item.category || "General",
        question: q,
        answer: a,
        order: item.order ?? idx,
      });
    });

    // 2. Gather all courses (Static + Live Firestore / Cache)
    const coursesMap = new Map<
      string,
      {
        slug: string;
        title: string;
        category: string;
        faqs?: { question: string; answer: string }[] | undefined;
      }
    >();

    // Static courses first
    staticCourses.forEach((sc) => {
      if (sc.slug) {
        coursesMap.set(sc.slug, {
          slug: sc.slug,
          title: sc.title,
          category: normalizeCourseCategory(sc.category, sc.title, sc.slug),
          faqs: sc.faqs,
        });
      }
    });

    // Override/supplement with live courses from Firestore
    courseList.forEach((c) => {
      const slug = c.slug || c.id;
      if (slug) {
        coursesMap.set(slug, {
          slug,
          title: c.title,
          category: normalizeCourseCategory(c.category, c.title, c.slug),
          faqs: Array.isArray(c.faqs) && c.faqs.length > 0 ? c.faqs : coursesMap.get(slug)?.faqs,
        });
      }
    });

    // 3. Extract FAQs from each course
    coursesMap.forEach((course) => {
      if (!Array.isArray(course.faqs) || course.faqs.length === 0) return;

      course.faqs.forEach((cf, fIdx) => {
        const q = (cf.question || "").trim();
        const a = (cf.answer || "").trim();
        if (!q || !a) return;
        const norm = q.toLowerCase();
        if (seen.has(norm)) return;
        seen.add(norm);

        result.push({
          id: `course-${course.slug}-${fIdx}`,
          category: course.category || "General",
          question: q,
          answer: a,
          courseTitle: course.title,
          courseSlug: course.slug,
          isCourseFaq: true,
        });
      });
    });

    return result;
  }, [faqList, courseList]);

  // Compute dynamic categories present across all FAQs in preferred order
  const categories = useMemo(() => {
    const cats = new Set<string>();
    allFaqs.forEach((item) => {
      if (item.category) cats.add(item.category);
    });

    const ordered: string[] = ["All"];
    preferredCategoryOrder.forEach((pref) => {
      if (pref !== "All" && cats.has(pref)) {
        ordered.push(pref);
        cats.delete(pref);
      }
    });

    // Append any remaining categories alphabetically
    Array.from(cats)
      .sort()
      .forEach((cat) => ordered.push(cat));

    return ordered;
  }, [allFaqs]);

  // Filtered list based on selected category and optional search query
  const filteredItems = useMemo(() => {
    return allFaqs.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchQuestion = item.question.toLowerCase().includes(query);
        const matchAnswer = item.answer.toLowerCase().includes(query);
        const matchCourse = item.courseTitle?.toLowerCase().includes(query) ?? false;
        const matchCategory = item.category.toLowerCase().includes(query);
        return matchQuestion || matchAnswer || matchCourse || matchCategory;
      }
      return true;
    });
  }, [allFaqs, activeCategory, searchQuery]);

  // Compute count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allFaqs.length };
    allFaqs.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [allFaqs]);

  const toggleItem = (key: string, question: string) => {
    setOpenItems((prev) => {
      const isCurrentlyOpen = Boolean(prev[key] ?? prev[question]);
      return {
        ...prev,
        [key]: !isCurrentlyOpen,
        [question]: !isCurrentlyOpen,
      };
    });
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredItems.forEach((item) => {
      allOpen[item.id] = true;
      allOpen[item.question] = true;
    });
    setOpenItems(allOpen);
  };

  const collapseAll = () => {
    setOpenItems({});
  };

  return (
    <SiteLayout>
      {/* Sticky Page Hero */}
      <PageHero
        eyebrow="HELP CENTER &amp; KNOWLEDGE BASE"
        title="Frequently Asked Questions"
        description="Clear answers about DIGITECHADEMY courses, practical labs, tools, certification, and admissions."
      />

      <section className="bg-white py-6 sm:py-8">
        <div className="container-site">
          {/* ========================================================================= */}
          {/* 1. SEARCH BAR & CATEGORY FILTER TABS                                      */}
          {/* ========================================================================= */}
          <div className="max-w-6xl mx-auto mb-6 px-2 sm:px-0 space-y-4" data-reveal>
            {/* Live Search Input */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search FAQs by question, topic, or course name..."
                  className="w-full rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-white focus:bg-white pl-10 pr-9 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 shadow-2xs transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter Badges */}
            <div className="flex items-center justify-start md:justify-center gap-1.5 sm:gap-2 p-1 overflow-x-auto no-scrollbar whitespace-nowrap">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const IconComp = categoryIcons[cat] || HelpCircle;
                const count = categoryCounts[cat] || 0;

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat);
                    }}
                    className={cn(
                      "inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs whitespace-nowrap",
                      isActive
                        ? "bg-slate-900 text-white shadow-md shadow-slate-900/15 ring-2 ring-slate-900/10"
                        : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-slate-300",
                    )}
                  >
                    <IconComp
                      className={cn(
                        "size-3.5 shrink-0",
                        isActive ? "text-sky-400" : "text-slate-500",
                      )}
                    />
                    <span>{cat}</span>
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-extrabold",
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500",
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 2. MAIN CONTENT: ACCORDION LIST & STICKY HELP SIDEBAR                     */}
          {/* ========================================================================= */}
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px] items-start max-w-6xl mx-auto">
            {/* Left Column: Interactive Accordion Cards */}
            <div className="space-y-4" data-reveal>
              {/* Header with Results Count and Expand/Collapse All */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 text-xs">
                <div className="text-slate-500 font-semibold">
                  Showing <span className="text-slate-900 font-bold">{filteredItems.length}</span>{" "}
                  questions
                  {searchQuery && (
                    <span className="text-slate-400 ml-1">
                      for &ldquo;<span className="text-slate-700 font-medium">{searchQuery}</span>&rdquo;
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={expandAll}
                    className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                  >
                    Expand All
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={collapseAll}
                    className="text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Accordion Items */}
              {filteredItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center space-y-3">
                  <div className="grid size-12 mx-auto place-items-center rounded-full bg-slate-100 text-slate-400">
                    <HelpCircle className="size-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800">
                    No questions found {searchQuery ? `matching "${searchQuery}"` : "in this category"}
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Please try a different search keyword or select another category.
                  </p>
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold px-4 py-2 transition-colors cursor-pointer"
                      >
                        Clear Search
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCategory("All");
                        setSearchQuery("");
                      }}
                      className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 transition-colors cursor-pointer"
                    >
                      Show All Questions
                    </button>
                    <a
                      href={whatsappLink("Hi DIGITECHADEMY, I have a question about your courses.")}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-[#E14E2E] hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 transition-colors inline-flex items-center gap-1.5"
                    >
                      <MessageCircle className="size-3.5" />
                      <span>Ask on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredItems.map((item) => {
                    const isOpen = Boolean(openItems[item.id] ?? openItems[item.question]);
                    const colors = categoryColors[item.category] || {
                      bg: "bg-slate-100",
                      text: "text-slate-700",
                      border: "border-slate-200",
                    };

                    return (
                      <article
                        key={item.id}
                        className={cn(
                          "rounded-2xl border transition-all duration-200 bg-white overflow-hidden shadow-xs",
                          isOpen
                            ? "border-blue-500/40 ring-2 ring-blue-500/10 shadow-md"
                            : "border-slate-200/90 hover:border-slate-300",
                        )}
                      >
                        <h3>
                          <button
                            type="button"
                            onClick={() => toggleItem(item.id, item.question)}
                            aria-expanded={isOpen}
                            className="flex w-full items-start justify-between gap-4 p-4 sm:p-5 text-left transition-colors hover:bg-slate-50/60 cursor-pointer"
                          >
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-1.5">
                                {activeCategory === "All" && (
                                  <span
                                    className={cn(
                                      "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider border",
                                      colors.bg,
                                      colors.text,
                                      colors.border,
                                    )}
                                  >
                                    {item.category}
                                  </span>
                                )}
                                {item.courseTitle && (
                                  <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9.5px] font-bold bg-blue-50 text-[#0C4FA8] border border-blue-200">
                                    <GraduationCap className="size-3 text-[#0C4FA8] shrink-0" />
                                    <span className="truncate max-w-[200px] sm:max-w-sm">
                                      {item.courseTitle}
                                    </span>
                                  </span>
                                )}
                              </div>
                              <span
                                className={cn(
                                  "block text-sm sm:text-base font-extrabold transition-colors leading-snug",
                                  isOpen ? "text-blue-700" : "text-slate-900",
                                )}
                              >
                                {item.question}
                              </span>
                            </div>

                            <span
                              className={cn(
                                "grid size-7 sm:size-8 shrink-0 place-items-center rounded-xl border transition-all duration-200 mt-0.5",
                                isOpen
                                  ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                                  : "border-slate-200 bg-slate-100 text-slate-600 group-hover:bg-slate-200",
                              )}
                              aria-hidden="true"
                            >
                              {isOpen ? (
                                <Minus className="size-3.5" />
                              ) : (
                                <Plus className="size-3.5" />
                              )}
                            </span>
                          </button>
                        </h3>

                        <div
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-slate-100 mt-1 space-y-3">
                              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal pt-3 text-justify">
                                {item.answer}
                              </p>

                              {item.courseSlug && (
                                <div className="pt-1 flex items-center">
                                  <Link
                                    to="/courses/$slug"
                                    params={{ slug: item.courseSlug }}
                                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                  >
                                    <span>Explore {item.courseTitle || "Course"} Curriculum &amp; Batches</span>
                                    <ArrowRight className="size-3" />
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Sticky Support & Help Box */}
            <aside className="lg:sticky lg:top-36 space-y-4" data-reveal="right">
              {/* Card 1: Direct Support Card */}
              <div className="rounded-2xl border border-blue-700/60 bg-[#0C4FA8] p-5 sm:p-6 text-white shadow-xl relative overflow-hidden">
                <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-white/10 blur-2xl" />

                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E14E2E] px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    <span className="size-1.5 rounded-full bg-white animate-pulse" />
                    <span>Average response: &lt; 15 mins</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                    Have a Question Not Listed Here?
                  </h3>

                  <p className="text-xs text-blue-100 leading-relaxed font-normal">
                    Our academic advisors are online to assist with syllabus, pricing, batch
                    timings, and career paths.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <a
                      href={whatsappLink(
                        "Hi DIGITECHADEMY, I have a quick question about your courses.",
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-slate-100 text-[#0C4FA8] text-xs font-extrabold py-2.5 px-4 transition-all shadow-md active:scale-[0.99]"
                    >
                      <MessageCircle className="size-4" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    <a
                      href={site.phoneHref}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white hover:text-[#0C4FA8] text-white text-xs font-bold py-2.5 px-4 transition-all"
                    >
                      <Phone className="size-4" />
                      <span>Call {site.phone}</span>
                    </a>

                    <Link
                      to="/request-call"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#E14E2E] hover:bg-[#be391d] text-white text-xs font-extrabold py-2.5 px-4 transition-all shadow-md"
                    >
                      <span>Request a Callback</span>
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Card 2: Quick Links */}
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                  Quick Academy Links
                </h4>
                <ul className="space-y-2 text-xs font-bold text-slate-700">
                  <li>
                    <Link
                      to="/courses"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span>Explore All Programs</span>
                      <ArrowRight className="size-3 text-slate-400" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span>About DIGITECHADEMY</span>
                      <ArrowRight className="size-3 text-slate-400" />
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span>Academy Location &amp; Hours</span>
                      <ArrowRight className="size-3 text-slate-400" />
                    </Link>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

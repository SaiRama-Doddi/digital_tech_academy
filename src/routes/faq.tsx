import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  GraduationCap,
  HelpCircle,
  Layers,
  Megaphone,
  MessageCircle,
  Minus,
  Phone,
  Plus,
  Radio,
  ShieldCheck,
} from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { faqCategories } from "@/data/content";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

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
        content: "Find clear answers about DIGITECHADEMY courses, practical lab formats, eligibility, and enrollment.",
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
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  General: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-300/40" },
  "Digital Marketing": { bg: "bg-indigo-500/10", text: "text-indigo-600", border: "border-indigo-300/40" },
  "Programmatic Advertising": { bg: "bg-sky-500/10", text: "text-sky-600", border: "border-sky-300/40" },
  "Cyber Security": { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-300/40" },
  "Enrollment & Support": { bg: "bg-rose-500/10", text: "text-rose-600", border: "border-rose-300/40" },
};

function FaqPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "Who can join Digitechademy?": true,
  });

  // Flattened all items with their respective category for universal search & filter
  const allFaqItems = useMemo(() => {
    return faqCategories.flatMap((cat) =>
      cat.items.map((item) => ({
        ...item,
        category: cat.title,
      }))
    );
  }, []);

  // Filtered list based on selected category
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return allFaqItems;
    return allFaqItems.filter((item) => item.category === activeCategory);
  }, [allFaqItems, activeCategory]);

  // Compute count per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: allFaqItems.length };
    faqCategories.forEach((cat) => {
      counts[cat.title] = cat.items.length;
    });
    return counts;
  }, [allFaqItems]);

  const toggleItem = (question: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [question]: !prev[question],
    }));
  };

  const expandAll = () => {
    const allOpen: Record<string, boolean> = {};
    filteredItems.forEach((item) => {
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

      <section className="bg-gradient-to-b from-slate-50/70 via-white to-slate-50/50 py-6 sm:py-8">
        <div className="container-site">
          {/* ========================================================================= */}
          {/* 1. CATEGORY FILTER TABS                                                   */}
          {/* ========================================================================= */}
          <div className="max-w-6xl mx-auto mb-5 px-2 sm:px-0" data-reveal>
            <div className="flex items-center justify-start md:justify-center gap-1.5 sm:gap-2 p-1 overflow-x-auto no-scrollbar whitespace-nowrap">
              {["All", ...faqCategories.map((c) => c.title)].map((cat) => {
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
                        : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/80 hover:border-slate-300"
                    )}
                  >
                    <IconComp className={cn("size-3.5 shrink-0", isActive ? "text-sky-400" : "text-slate-500")} />
                    <span>{cat}</span>
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-extrabold",
                        isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
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
          {/* 3. MAIN CONTENT: ACCORDION LIST & STICKY HELP SIDEBAR                     */}
          {/* ========================================================================= */}
          <div className="grid gap-8 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_360px] items-start max-w-6xl mx-auto">
            {/* Left Column: Interactive Accordion Cards */}
            <div className="space-y-4" data-reveal>
              {/* Header with Results Count and Expand/Collapse All */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80 text-xs">
                <div className="text-slate-500 font-semibold">
                  Showing <span className="text-slate-900 font-bold">{filteredItems.length}</span> questions
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
                  <h3 className="text-base font-bold text-slate-800">No questions found in this category</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Please select another category or reach out to our team directly.
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveCategory("All")}
                      className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 transition-colors cursor-pointer"
                    >
                      Show All Questions
                    </button>
                    <a
                      href={whatsappLink("Hi DIGITECHADEMY, I have a question about your courses.")}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 transition-colors inline-flex items-center gap-1.5"
                    >
                      <MessageCircle className="size-3.5" />
                      <span>Ask on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredItems.map((item, index) => {
                    const isOpen = Boolean(openItems[item.question]);
                    const colors = categoryColors[item.category] || {
                      bg: "bg-slate-100",
                      text: "text-slate-700",
                      border: "border-slate-200",
                    };

                    return (
                      <article
                        key={item.question}
                        className={cn(
                          "rounded-2xl border transition-all duration-200 bg-white overflow-hidden shadow-xs",
                          isOpen
                            ? "border-blue-500/40 ring-2 ring-blue-500/10 shadow-md"
                            : "border-slate-200/90 hover:border-slate-300"
                        )}
                      >
                        <h3>
                          <button
                            type="button"
                            onClick={() => toggleItem(item.question)}
                            aria-expanded={isOpen}
                            className="flex w-full items-start justify-between gap-4 p-4 sm:p-5 text-left transition-colors hover:bg-slate-50/60 cursor-pointer"
                          >
                            <div className="space-y-1.5 flex-1">
                              {activeCategory === "All" && (
                                <span
                                  className={cn(
                                    "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider border",
                                    colors.bg,
                                    colors.text,
                                    colors.border
                                  )}
                                >
                                  {item.category}
                                </span>
                              )}
                              <span
                                className={cn(
                                  "block text-sm sm:text-base font-extrabold transition-colors leading-snug",
                                  isOpen ? "text-blue-700" : "text-slate-900"
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
                                  : "border-slate-200 bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                              )}
                              aria-hidden="true"
                            >
                              {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                            </span>
                          </button>
                        </h3>

                        <div
                          className={cn(
                            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-slate-100 mt-1">
                              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal pt-3 text-justify">
                                {item.answer}
                              </p>
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
            <aside className="lg:sticky lg:top-[185px] xl:top-[190px] space-y-4" data-reveal="right">
              {/* Card 1: Direct Support Card */}
              <div className="rounded-2xl border border-sky-400/30 bg-gradient-to-br from-[#091738] via-[#061126] to-[#040b1a] p-5 sm:p-6 text-white shadow-xl relative overflow-hidden">
                <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-blue-500/15 blur-2xl" />

                <div className="relative z-10 space-y-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Average response: &lt; 15 mins</span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                    Have a Question Not Listed Here?
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Our academic advisors are online to assist with syllabus, pricing, batch timings, and career paths.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <a
                      href={whatsappLink("Hi DIGITECHADEMY, I have a quick question about your courses.")}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold py-2.5 px-4 transition-all shadow-md shadow-emerald-600/20 active:scale-[0.99]"
                    >
                      <MessageCircle className="size-4" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    <a
                      href={site.phoneHref}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-sky-400/30 bg-sky-950/40 hover:bg-sky-500 hover:text-slate-950 text-sky-300 text-xs font-bold py-2.5 px-4 transition-all"
                    >
                      <Phone className="size-4" />
                      <span>Call {site.phone}</span>
                    </a>

                    <Link
                      to="/request-call"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold py-2.5 px-4 transition-all border border-white/10"
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
                      hash="mentors"
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-800 hover:text-blue-600 transition-colors"
                    >
                      <span>Meet Our Faculty</span>
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


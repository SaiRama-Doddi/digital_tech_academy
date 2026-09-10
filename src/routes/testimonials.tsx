import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Quote, Star, ArrowRight, Check, CheckCircle2 } from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { BtnLink } from "@/components/site/Btn";
import { cn } from "@/lib/utils";
import testimonialAnanyaImg from "@/assets/testimonial-ananya.jpg";
import { subscribeTestimonials } from "@/services/testimonialService";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Learner Experiences & Student Reviews | Digitechademy" },
      {
        name: "description",
        content:
          "Hear authentic feedback from learners about practical training, lab simulations, and job placement support across Cyber Security, Digital Marketing, and AdTech.",
      },
      { property: "og:title", content: "Learner Experiences at Digitechademy" },
      {
        property: "og:description",
        content:
          "Hear authentic feedback from learners about practical training, lab simulations, and job placement support across Cyber Security, Digital Marketing, and AdTech.",
      },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TestimonialsPage,
});

const ratingStats = [
  { value: "4.8 / 5", label: "Average learner rating" },
  { value: "95%", label: "Would recommend us" },
  { value: "500+", label: "Learners trained" },
  { value: "20+", label: "Projects reviewed monthly" },
];

export type EnrichedReview = {
  name: string;
  course: string;
  courseSlug: string;
  rating: number;
  quote: string;
  initials: string;
};

const allReviews: EnrichedReview[] = [
  // Cyber Security
  {
    name: "Ananya",
    course: "Cyber Security Course",
    courseSlug: "cyber-security",
    rating: 5,
    initials: "A",
    quote:
      "The Cyber Security sessions helped me understand security concepts through practical examples instead of only theory.",
  },
  {
    name: "Vikram",
    course: "Cyber Security Course",
    courseSlug: "cyber-security",
    rating: 5,
    initials: "V",
    quote:
      "Every concept was followed by a lab. That structure is what made it stick — we actually captured packets and configured SIEM rules.",
  },
  {
    name: "Fatima",
    course: "Cyber Security Course",
    courseSlug: "cyber-security",
    rating: 4,
    initials: "F",
    quote:
      "Report writing practice was unexpected and turned out to be the most useful skill of all during technical interview rounds.",
  },

  // Digital Marketing
  {
    name: "Rahul",
    course: "Digital Marketing Mastery",
    courseSlug: "digital-marketing",
    rating: 5,
    initials: "R",
    quote:
      "The practical approach made a huge difference. I wasn't just learning concepts — I was actually setting up campaigns and ad groups.",
  },
  {
    name: "Sneha",
    course: "Digital Marketing Mastery",
    courseSlug: "digital-marketing",
    rating: 5,
    initials: "S",
    quote:
      "Running real campaigns during the course gave me something concrete to show in digital marketing agency interviews.",
  },
  {
    name: "Imran",
    course: "Digital Marketing Mastery",
    courseSlug: "digital-marketing",
    rating: 4,
    initials: "I",
    quote:
      "Analytics finally made sense once we worked through actual GA4 reports and Looker dashboards instead of static slides.",
  },

  // Programmatic Advertising
  {
    name: "Siddharth",
    course: "Programmatic Advertising Course",
    courseSlug: "programmatic-advertising",
    rating: 5,
    initials: "S",
    quote:
      "Demystified DSPs and real-time bidding completely. The campaign simulations, PMP deal setups, and audience data modules were invaluable.",
  },
  {
    name: "Rhea",
    course: "Programmatic Advertising Course",
    courseSlug: "programmatic-advertising",
    rating: 5,
    initials: "R",
    quote:
      "Moved from basic paid search into enterprise media buying and audience data management thanks to this structured AdTech course.",
  },

  // Advanced SEO
  {
    name: "Karthik",
    course: "Advanced SEO & Performance Marketing",
    courseSlug: "advanced-seo",
    rating: 5,
    initials: "K",
    quote:
      "The audit workshops changed how I approach every client website now. Search crawling, indexing, and technical audits clicked completely.",
  },
  {
    name: "Divya",
    course: "Advanced SEO & Performance Marketing",
    courseSlug: "advanced-seo",
    rating: 5,
    initials: "D",
    quote:
      "Short course, very dense and practical. The reporting templates, competitor gap analysis, and ranking workflows alone were worth it.",
  },

  // Ethical Hacking
  {
    name: "Meghna",
    course: "Ethical Hacking & Security Fundamentals",
    courseSlug: "ethical-hacking",
    rating: 5,
    initials: "M",
    quote:
      "I joined with zero Linux experience and finished genuinely comfortable in the terminal, reconnaissance tools, and penetration testing.",
  },
  {
    name: "Rohit",
    course: "Ethical Hacking & Security Fundamentals",
    courseSlug: "ethical-hacking",
    rating: 5,
    initials: "R",
    quote:
      "Clear, ethical and very hands-on. The guided virtual labs and vulnerability assessment drills built real confidence for offensive security roles.",
  },
];

const courseFilterOptions = [
  { id: "all", label: "All Reviews" },
  { id: "cyber-security", label: "Cyber Security" },
  { id: "digital-marketing", label: "Digital Marketing" },
  { id: "programmatic-advertising", label: "Programmatic Advertising" },
  { id: "advanced-seo", label: "Advanced SEO" },
  { id: "ethical-hacking", label: "Ethical Hacking" },
];

function TestimonialsPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [reviewsList, setReviewsList] = useState<EnrichedReview[]>(allReviews);

  useEffect(() => {
    const unsub = subscribeTestimonials((data) => {
      if (data && data.length > 0) {
        const dynamic: EnrichedReview[] = data.map((t) => ({
          name: t.name,
          course: t.course,
          courseSlug: t.courseSlug || t.course.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          rating: t.rating || 5,
          quote: t.content,
          initials: t.name.charAt(0).toUpperCase(),
        }));
        setReviewsList(dynamic);
      }
    });
    return () => unsub();
  }, []);

  const filteredReviews =
    selectedCourse === "all"
      ? reviewsList
      : reviewsList.filter((r) => r.courseSlug === selectedCourse || r.course.toLowerCase().includes(selectedCourse));

  const featured = reviewsList.find((r) => r.rating === 5) || reviewsList[0] || allReviews[0]!;

  return (
    <SiteLayout>
      {/* Section 1 — Hero */}
      <PageHero
        eyebrow="TESTIMONIALS"
        title="Learner Experiences at Digitechademy"
        description="Hear from learners about their experience with practical training, structured learning, and career-focused programs."
      />

      {/* Section 2 — Introduction */}
      <section className="border-b border-slate-200/80 bg-white py-8 sm:py-10 lg:py-12">
        <div className="container-site max-w-4xl text-left" data-reveal>
          <span className="text-xs font-black uppercase tracking-widest text-accent mb-2.5 block">
            OUR COMMITMENT
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-navy leading-tight tracking-tight text-left">
            Learning That Helps You Move Forward
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl font-normal text-left">
            Our goal is to make learning practical, structured, and relevant so students can build skills they can continue to use beyond the classroom.
          </p>
        </div>
      </section>

      {/* Rating statistics */}
      <section className="border-b border-border bg-surface overflow-x-clip">
        <div className="container-site section-y-sm w-full min-w-0">
          <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 w-full min-w-0">
            {ratingStats.map((stat) => (
              <div key={stat.label} data-reveal className="border-l border-border-strong pl-3 sm:pl-4 min-w-0">
                <dd className="font-display text-2xl font-extrabold text-accent-foreground sm:text-3xl">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured testimonial with image beside it (Compact height) */}
      <section className="bg-background py-4 sm:py-5 lg:py-6 overflow-x-clip">
        <div className="container-site max-w-4xl xl:max-w-5xl mx-auto w-full min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch w-full min-w-0">
            {/* Featured testimonial card (Compact, Responsive) */}
            <figure
              data-reveal
              className="surface-navy relative overflow-hidden rounded-2xl border border-navy-600/80 p-4 sm:p-5 shadow-lg shadow-navy/20 flex flex-col justify-between min-h-[200px] lg:h-[220px] w-full min-w-0"
            >
              <div className="grid-lines absolute inset-0 opacity-30" aria-hidden="true" />
              <div className="relative">
                <Quote className="size-5 text-accent" aria-hidden="true" />
                <blockquote className="mt-2 text-sm sm:text-base lg:text-[1.05rem] font-medium leading-relaxed text-navy-foreground text-left text-justify [text-align:justify]">
                  {featured.quote}
                </blockquote>
              </div>
              <figcaption className="relative mt-3 pt-2.5 border-t border-navy-600/60 flex items-center gap-2.5 min-w-0">
                <span className="grid size-9 place-items-center rounded-full bg-accent/20 text-xs sm:text-sm font-bold text-accent shrink-0">
                  {featured.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm sm:text-[15px] font-bold text-navy-foreground leading-tight truncate">{featured.name}</span>
                  <span className="block text-xs sm:text-[12.5px] text-navy-muted truncate leading-tight mt-0.5">{featured.course}</span>
                </span>
                <span className="ml-auto flex gap-0.5 shrink-0" aria-label={`${featured.rating} out of 5`}>
                  {Array.from({ length: featured.rating }).map((_, i) => (
                    <Star key={i} className="size-3 fill-accent text-accent" aria-hidden="true" />
                  ))}
                </span>
              </figcaption>
            </figure>

            {/* Related website/academy training image beside card (Matching compact height) */}
            <div data-reveal className="relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-md group min-h-[200px] lg:h-[220px] w-full min-w-0">
              <img
                src={testimonialAnanyaImg}
                alt="Digital Tech Solution student in cyber security training lab"
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              {/* Floating verified badge */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-[10px] font-bold shadow-md border border-white/10">
                <CheckCircle2 className="size-3 text-emerald-400" />
                <span>Verified Alumni Story</span>
              </div>
              {/* Bottom gradient caption */}
              <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent text-white flex items-center justify-between text-[10.5px]">
                <span className="font-semibold text-slate-200">Cyber Security Hands-on Lab</span>
                <span className="text-[10px] text-accent font-bold">100% Practical Training</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of testimonials with interactive course filters */}
      <section className="bg-surface border-t border-slate-200/80 overflow-x-clip">
        <div className="container-site section-y w-full min-w-0">
          <SectionHeading
            eyebrow="FILTER BY COURSE"
            title="What Our Students Say"
            description="Explore authentic feedback filtered by specialized domain — select any course track below."
            align="left"
            className="w-full min-w-0"
          />

          {/* Interactive Course Filter Tabs */}
          <div className="mt-6 sm:mt-8 w-full min-w-0" data-reveal>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1.5 -mx-4 px-4 sm:mx-0 sm:px-0 w-auto max-w-full sm:flex-wrap sm:justify-start sm:gap-2.5">
              {courseFilterOptions.map((tab) => {
                const isActive = selectedCourse === tab.id;
                const count =
                  tab.id === "all"
                    ? allReviews.length
                    : allReviews.filter((r) => r.courseSlug === tab.id).length;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedCourse(tab.id)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-xl px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap active:scale-[0.98]",
                      isActive
                        ? "bg-[#5455f6] text-white shadow-md shadow-indigo-500/25"
                        : "bg-white text-slate-700 hover:bg-slate-100 hover:text-navy border border-slate-200/80 shadow-xs"
                    )}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10.5px] sm:text-[11px] font-black leading-none",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Status Bar */}
          {selectedCourse !== "all" && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-indigo-50/80 border border-indigo-100 px-4 py-2.5 text-xs text-indigo-950 max-w-4xl mx-auto animate-in fade-in duration-150 w-full min-w-0">
              <span className="font-medium">
                Showing reviews for <strong className="font-bold text-indigo-700">{courseFilterOptions.find((f) => f.id === selectedCourse)?.label}</strong> ({filteredReviews.length} {filteredReviews.length === 1 ? "review" : "reviews"})
              </span>
              <button
                type="button"
                onClick={() => setSelectedCourse("all")}
                className="font-bold text-indigo-600 hover:text-indigo-800 underline underline-offset-2 cursor-pointer"
              >
                Show All Reviews
              </button>
            </div>
          )}

          {/* Filtered Grid Cards */}
          <div className="mt-8 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full min-w-0">
            {filteredReviews.map((item) => (
              <div key={item.name + item.quote} data-reveal className="h-full w-full min-w-0">
                <TestimonialCard
                  name={item.name}
                  course={item.course}
                  rating={item.rating}
                  quote={item.quote}
                />
              </div>
            ))}
          </div>

          {/* Quick link to related course when filtered */}
          {selectedCourse !== "all" && (
            <div className="mt-8 sm:mt-10 flex justify-center w-full min-w-0 px-4" data-reveal>
              <BtnLink
                to="/courses/$slug"
                params={{ slug: selectedCourse }}
                variant="outline"
                size="md"
                className="w-full sm:w-auto border-indigo-200 bg-white text-indigo-700 hover:bg-indigo-50 font-bold px-6 h-11 rounded-xl shadow-xs inline-flex items-center justify-center gap-2"
              >
                <span>Explore {courseFilterOptions.find((f) => f.id === selectedCourse)?.label} Curriculum</span>
                <ArrowRight className="size-4" />
              </BtnLink>
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

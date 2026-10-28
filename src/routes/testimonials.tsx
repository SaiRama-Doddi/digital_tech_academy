import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  Star,
  Quote,
} from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BtnLink } from "@/components/site/Btn";
import testimonialAnanyaImg from "@/assets/testimonial-ananya.jpg";
import {
  type FirebaseTestimonial,
  subscribeTestimonials,
  isDummyTestimonial,
} from "@/services/testimonialService";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Student Reviews & Trust Standards | DIGITECHADEMY" },
      {
        name: "description",
        content:
          "Our commitment to credibility, practical hands-on training, dedicated mentors, and authentic learner outcomes.",
      },
      { property: "og:title", content: "Student Reviews & Trust Standards at DIGITECHADEMY" },
      {
        property: "og:description",
        content:
          "Discover our core learning standards, lab-driven methodology, authentic feedback policy, and verified student reviews.",
      },
      { property: "og:url", content: "/testimonials" },
    ],
    links: [{ rel: "canonical", href: "/testimonials" }],
  }),
  component: TrustAndValuesPage,
});

const credibleMetrics = [
  { value: "3k+", label: "Learners Mentored" },
  { value: "10", label: "Dedicated Mentors" },
  { value: "25+", label: "Practical Projects" },
  { value: "100%", label: "Placement Assistance" },
];

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "100% Practical & Lab-Driven",
    description:
      "Every module pairs structured instruction with realistic simulations—Wireshark packet captures, live ad budgets, GA4 audits, and vulnerability scans.",
    badge: "Hands-on First",
  },
  {
    icon: Users,
    title: "10 Dedicated Industry Mentors",
    description:
      "Learn directly from 10 experienced practitioners who review your lab outputs, critique your code and campaigns, and hold weekly 1-on-1 office hours.",
    badge: "Personalized Support",
  },
  {
    icon: Layers,
    title: "Verified Capstone Portfolios",
    description:
      "Graduate with concrete, verifiable project repositories and campaign portfolios that you can walk through during technical job interviews.",
    badge: "Portfolio Ready",
  },
  {
    icon: Award,
    title: "100% Placement Assistance",
    description:
      "Comprehensive career guidance including ATS resume revamping, LinkedIn optimization, and simulated technical mock interview drills.",
    badge: "Career Support",
  },
  {
    icon: BookOpen,
    title: "Transparent & Credible Curriculum",
    description:
      "Syllabi strictly aligned with contemporary hiring expectations across Cyber Security, Digital Marketing, and Programmatic Advertising.",
    badge: "Zero Fluff",
  },
  {
    icon: Sparkles,
    title: "Small-Batch Learning Assurance",
    description:
      "Controlled cohort sizes ensuring every student gets ample screen-sharing time, individual query resolution, and dedicated mentor attention.",
    badge: "Focused Attention",
  },
];

function renderQualityPillarCard(pillar: (typeof trustPillars)[number], key: string) {
  const PillarIcon = pillar.icon;
  return (
    <div
      key={key}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-xl w-[300px] sm:w-[350px] md:w-[370px] shrink-0 select-none overflow-hidden"
    >
      {/* Top Accent Glow Line on hover */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white shrink-0">
            <PillarIcon className="size-6" />
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600 uppercase tracking-wider shrink-0">
            {pillar.badge}
          </span>
        </div>
        <h3 className="mt-4 text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors">
          {pillar.title}
        </h3>
        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-justify">
          {pillar.description}
        </p>
      </div>
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-[#0C4FA8]">
        <CheckCircle2 className="size-3.5 text-[#0C4FA8] shrink-0" />
        <span>Institutional Standard</span>
      </div>
    </div>
  );
}

function TestimonialCard({ review }: { review: FirebaseTestimonial }) {
  const initials =
    review.name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "S";

  return (
    <div
      data-reveal
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-xl hover:border-blue-400/40 hover:-translate-y-1 transition-all duration-300"
    >
      <div>
        {/* Header: Avatar, Name, Role, Rating */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {review.avatar ? (
              <img
                src={review.avatar}
                alt={review.name}
                className="size-11 rounded-full object-cover border border-slate-200 shrink-0"
              />
            ) : (
              <div className="grid size-11 place-items-center rounded-full bg-[#0C4FA8] text-white font-black text-sm shrink-0 shadow-2xs">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <h4 className="font-bold text-slate-900 text-base leading-snug truncate">
                {review.name}
              </h4>
              <p className="text-xs text-slate-500 truncate">
                {review.role && review.company
                  ? `${review.role} • ${review.company}`
                  : review.role || review.company || "Verified Student"}
              </p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-0.5 shrink-0 bg-orange-50 border border-orange-200/60 px-2 py-1 rounded-lg">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`size-3.5 ${
                  i < (review.rating || 5)
                    ? "fill-[#E14E2E] text-[#E14E2E]"
                    : "fill-slate-200 text-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Course Badge */}
        {review.course && (
          <div className="mt-3.5">
            <span className="inline-block rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[11px] font-bold text-[#0C4FA8]">
              {review.course}
            </span>
          </div>
        )}

        {/* Testimonial Quote */}
        <div className="relative mt-4">
          <Quote className="size-6 text-blue-100 absolute -top-2 -left-1 -z-0 opacity-70" />
          <p className="relative z-10 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-justify">
            "{review.content}"
          </p>
        </div>
      </div>

      {/* Footer: Verified Learner Badge & Date */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-1.5 text-[#0C4FA8] font-bold">
          <CheckCircle2 className="size-3.5" />
          <span>Verified Learner</span>
        </div>
        {review.createdAt && (
          <span className="text-[11px] text-slate-400">
            {new Date(review.createdAt).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
        )}
      </div>
    </div>
  );
}

function TrustAndValuesPage() {
  const [testimonials, setTestimonials] = useState<FirebaseTestimonial[]>([]);

  useEffect(() => {
    const unsub = subscribeTestimonials((data) => {
      const valid = data.filter((t) => !isDummyTestimonial(t));
      setTestimonials(valid);
    });
    return () => unsub();
  }, []);

  return (
    <SiteLayout>
      {/* Section 1 — Hero */}
      <PageHero
        eyebrow="VALUE & TRUST COMMITMENTS"
        title="Credible Education Built on Real Skills"
        description={
          <>
            Explore our verified learning standards, practical methodology,
            <span className="block sm:inline"> and career assistance commitments.</span>
          </>
        }
      />

      {/* Section 2 — Credible Metrics Strip */}
      <section className="border-b border-border bg-white overflow-x-clip">
        <div className="container-site section-y-sm w-full min-w-0">
          <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 w-full min-w-0">
            {credibleMetrics.map((stat) => (
              <div
                key={stat.label}
                data-reveal
                className="border-l border-border-strong pl-3 sm:pl-4 min-w-0"
              >
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

      {/* Section 3 — Authentic Feedback Policy */}
      <section className="bg-white py-6 sm:py-8 lg:py-10 border-b border-slate-200/80">
        <div className="container-site">
          <div
            data-reveal
            className="rounded-2xl sm:rounded-3xl border border-blue-200/90 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/50 p-6 sm:p-8 lg:p-10 shadow-sm"
          >
            <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10 items-center">
              {/* Left Column: Eyebrow, Title & Verification Pills */}
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-3 py-1 rounded-full mb-3">
                  <ShieldCheck className="size-4 text-blue-600" />
                  <span>Authentic Reviews Policy</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
                  Testimonials Must Be Genuine, Attributable &amp; Approved
                </h2>

                <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 pt-5 border-t border-blue-100/80">
                  <div className="flex items-center gap-2 rounded-xl bg-white/90 border border-slate-200/80 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs">
                    <CheckCircle2 className="size-4 text-[#0C4FA8] shrink-0" />
                    <span>Zero Fabricated Quotes</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-white/90 border border-slate-200/80 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs">
                    <CheckCircle2 className="size-4 text-[#0C4FA8] shrink-0" />
                    <span>Attributable Alumni Feedback</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-white/90 border border-slate-200/80 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-2xs">
                    <CheckCircle2 className="size-4 text-[#0C4FA8] shrink-0" />
                    <span>Verified Capstones</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Narrative paragraphs */}
              <div className="space-y-4 lg:border-l lg:border-blue-100 lg:pl-10">
                <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal text-justify">
                  At DIGITECHADEMY, we do not fabricate student testimonials, publish stock reviews,
                  or invent unverified statistics. We believe that true credibility comes from
                  transparent educational delivery and verifiable student progress.
                </p>
                <p className="text-sm sm:text-base leading-relaxed text-slate-600 font-normal text-justify">
                  As our current cohort learners complete their capstone defenses and transition
                  into the workforce, verified and attributable student feedback will be published
                  here with full authorization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — The 6 Value & Trust Pillars (Single-Row with Scrolling Effect) */}
      <section className="bg-white py-6 sm:py-8 lg:py-10 border-b border-slate-200/80 overflow-hidden">
        <div className="container-site">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <SectionHeading
              eyebrow="OUR COMMITMENTS"
              title="The 6 Quality Standards That Define DIGITECHADEMY"
              description="Every program we teach is built around transparent delivery, practical application, and verifiable student growth."
              align="left"
            />
            <div className="hidden lg:flex items-center gap-2 shrink-0 pb-1 text-xs font-semibold text-slate-500">
              <span className="size-2 rounded-full bg-blue-500 animate-ping" />
              <span>Hover or touch to pause scroll</span>
            </div>
          </div>

          {/* Auto-scrolling Single-Row Quality Standards Marquee */}
          <div
            className="relative mt-5 sm:mt-6 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 overflow-hidden py-3"
            data-reveal
          >
            {/* Subtle gradient edge fades */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 z-20 bg-gradient-to-r from-white via-white/85 to-transparent"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 z-20 bg-gradient-to-l from-white via-white/85 to-transparent"
              aria-hidden="true"
            />

            <div className="flex w-max animate-quality-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused]">
              {/* Primary Track Set */}
              <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0">
                {trustPillars.map((pillar, index) =>
                  renderQualityPillarCard(pillar, `pillar-a-${index}`),
                )}
              </div>
              {/* Duplicated Track Set for Seamless Infinite Loop */}
              <div className="flex gap-4 sm:gap-5 pr-4 sm:pr-5 shrink-0" aria-hidden="true">
                {trustPillars.map((pillar, index) =>
                  renderQualityPillarCard(pillar, `pillar-b-${index}`),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 — Live Student Testimonials (Dynamically added by Admin) */}
      {testimonials.length > 0 && (
        <section className="bg-white py-8 sm:py-12 lg:py-16 border-b border-slate-200/80">
          <div className="container-site">
            <SectionHeading
              eyebrow="STUDENT REVIEWS"
              title="Verified Reviews from Our Learners"
              description="Authentic feedback and career outcomes shared by students who trained at DIGITECHADEMY."
              align="left"
            />

            <div
              className={cn(
                "mt-6 sm:mt-8 gap-5 sm:gap-6 w-full",
                testimonials.length === 1
                  ? "flex justify-center max-w-lg mx-auto"
                  : testimonials.length === 2
                    ? "grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
                    : "grid sm:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {testimonials.map((review) => (
                <TestimonialCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 6 — Live Practical Labs Experience CTA */}
      <section className="bg-white py-8 sm:py-12">
        <div className="container-site">
          <div
            className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white grid lg:grid-cols-12 items-center"
            data-reveal
          >
            <div className="lg:col-span-5 h-56 lg:h-full min-h-[220px]">
              <img
                src={testimonialAnanyaImg}
                alt="DIGITECHADEMY training lab classroom session"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-7 p-6 sm:p-8">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold mb-2">
                <Sparkles className="size-3" />
                Live Practical Labs
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Experience Practical Learning Firsthand
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal text-justify">
                Join a live demo session before enrolling. Meet our mentors, test-drive our lab
                simulations, and evaluate whether our practical training approach fits your career
                aspirations.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <BtnLink
                  to="/request-call"
                  variant="primary"
                  size="md"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm"
                >
                  <span>Book a Free Demo Class</span>
                  <ArrowRight className="size-4 ml-1.5" />
                </BtnLink>
                <BtnLink
                  to="/courses"
                  variant="outline"
                  size="md"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm"
                >
                  <span>Explore Courses</span>
                </BtnLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

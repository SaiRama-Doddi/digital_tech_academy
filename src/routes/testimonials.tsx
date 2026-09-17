import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Cpu,
  FileText,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
} from "lucide-react";

import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BtnLink } from "@/components/site/Btn";
import testimonialAnanyaImg from "@/assets/testimonial-ananya.jpg";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Value & Trust Standards | DIGITECHADEMY" },
      {
        name: "description",
        content:
          "Our commitment to credibility, practical hands-on training, 10 dedicated mentors, 100% placement assistance, and authentic learner outcomes.",
      },
      { property: "og:title", content: "Value & Trust Standards at DIGITECHADEMY" },
      {
        property: "og:description",
        content:
          "Discover our core learning standards, lab-driven methodology, 100% placement assistance framework, and authentic feedback policy.",
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

const placementPhases = [
  {
    step: "01",
    title: "Diagnostic & Skill Mapping",
    description:
      "Identify individual strengths and pinpoint technical gaps against current market requirements.",
    icon: Cpu,
  },
  {
    step: "02",
    title: "ATS Resume & Profile Rebuild",
    description:
      "Restructure your resume and LinkedIn presence to highlight verified capstone projects and technical proficiencies.",
    icon: FileText,
  },
  {
    step: "03",
    title: "Technical Mock Drills",
    description:
      "Simulate real interview scenarios with domain mentors, receiving actionable feedback on both technical depth and communication.",
    icon: Users,
  },
  {
    step: "04",
    title: "Ongoing Mentorship Support",
    description:
      "Continuous guidance and application strategies until you secure your target role in the industry.",
    icon: Briefcase,
  },
];

function TrustAndValuesPage() {
  return (
    <SiteLayout>
      {/* Section 1 — Hero */}
      <PageHero
        eyebrow="VALUE & TRUST COMMITMENTS"
        title="Credible Education Built on Real Skills"
        description="Explore our verified learning standards, practical methodology, and career assistance commitments."
      />

      {/* Section 2 — Credible Metrics Strip */}
      <section className="border-b border-border bg-surface overflow-x-clip">
        <div className="container-site section-y-sm w-full min-w-0">
          <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 w-full min-w-0">
            {credibleMetrics.map((stat) => (
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

      {/* Section 3 — Authentic Feedback Policy */}
      <section className="bg-background py-8 sm:py-12 border-b border-slate-200/80">
        <div className="container-site max-w-4xl">
          <div
            data-reveal
            className="rounded-2xl border border-blue-200/90 bg-gradient-to-br from-blue-50/80 via-white to-sky-50/50 p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 mb-2">
              <ShieldCheck className="size-4 text-blue-600" />
              <span>Authentic Reviews Policy</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Testimonials Must Be Genuine, Attributable &amp; Approved
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
              At DIGITECHADEMY, we do not fabricate student testimonials, publish stock reviews, or invent unverified statistics. We believe that true credibility comes from transparent educational delivery and verifiable student progress.
            </p>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600 font-normal">
              As our current cohort learners complete their capstone defenses and transition into the workforce, verified and attributable student feedback will be published here with full authorization.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-blue-100">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Zero Fabricated Quotes</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Attributable Alumni Feedback</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="size-4 text-emerald-600" />
                <span>Verified Capstones</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 — The 6 Value & Trust Pillars */}
      <section className="bg-surface py-10 sm:py-16 border-b border-slate-200/80">
        <div className="container-site">
          <SectionHeading
            eyebrow="OUR COMMITMENTS"
            title="The 6 Quality Standards That Define DIGITECHADEMY"
            description="Every program we teach is built around transparent delivery, practical application, and verifiable student growth."
            align="left"
          />

          <div className="mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trustPillars.map((pillar, index) => {
              const PillarIcon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  data-reveal="left-to-right-and-bottom-to-up"
                  style={{ "--reveal-delay": `${(index % 3) * 120}ms` } as React.CSSProperties}
                  className="group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/40 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="grid size-12 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        <PillarIcon className="size-6" />
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        {pillar.badge}
                      </span>
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900 leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-600">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    <span>Institutional Standard</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5 — 100% Placement Assistance Framework */}
      <section className="bg-background py-10 sm:py-16">
        <div className="container-site max-w-5xl">
          <SectionHeading
            eyebrow="CAREER ACCELERATION"
            title="Our 100% Placement Assistance Framework"
            description="We do not make misleading guarantees. Instead, we provide exhaustive, 1-on-1 placement support designed to equip you with the technical capability and interview confidence required to succeed."
            align="left"
          />

          <div className="mt-8 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {placementPhases.map((phase, index) => {
              const PhaseIcon = phase.icon;
              return (
                <div
                  key={phase.step}
                  data-reveal="left-to-right-and-bottom-to-up"
                  style={{ "--reveal-delay": `${index * 120}ms` } as React.CSSProperties}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between hover:border-blue-500/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer select-none"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-black text-blue-600 transition-transform duration-300 group-hover:scale-110">
                        {phase.step}
                      </span>
                      <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-600 border border-blue-100 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-110 group-hover:shadow-md">
                        <PhaseIcon className="size-4" />
                      </span>
                    </div>
                    <h4 className="mt-3.5 text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {phase.title}
                    </h4>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-normal">
                      {phase.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Training classroom image and highlight banner */}
          <div className="mt-10 rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white grid lg:grid-cols-12 items-center" data-reveal>
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
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Join a live demo session before enrolling. Meet our mentors, test-drive our lab simulations, and evaluate whether our practical training approach fits your career aspirations.
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

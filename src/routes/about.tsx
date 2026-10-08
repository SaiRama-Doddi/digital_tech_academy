import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase,
  CheckCircle2,
  Compass,
  Layers,
  Target,
  TrendingUp,
  Workflow,
} from "lucide-react";

import aboutImg from "@/assets/about-institute.jpg";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StatsSection } from "@/components/site/StatsSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "About DIGITECHADEMY | Cyber Security, Digital Marketing & Programmatic Advertising",
      },
      {
        name: "description",
        content:
          "Learn practical skills. Build real-world confidence. Become career ready. DIGITECHADEMY is a career-focused learning academy for technology and digital disciplines.",
      },
      { property: "og:title", content: "About DIGITECHADEMY — LEARN • GROW • ACHIEVE" },
      {
        property: "og:description",
        content:
          "Learn practical skills. Build real-world confidence. Become career ready with DIGITECHADEMY.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const whyLearnersChooseUs = [
  {
    title: "Practical Curriculum",
    text: "Training focuses on usable skills rather than theory alone.",
    icon: Layers,
  },
  {
    title: "Industry Relevance",
    text: "Course topics and workflows are aligned with evolving digital roles.",
    icon: TrendingUp,
  },
  {
    title: "Structured Learning",
    text: "Clear learning paths help students progress from fundamentals to practical application.",
    icon: Workflow,
  },
  {
    title: "Career Focus",
    text: "Programs are designed to strengthen skills, confidence, and professional readiness.",
    icon: Briefcase,
  },
];

function AboutPage() {
  return (
    <SiteLayout>
      {/* Section 1 — Hero */}
      <PageHero
        eyebrow="ABOUT DIGITECHADEMY"
        title="Learn Skills. Build Experience. Grow With the Digital Industry."
        description="DIGITECHADEMY helps learners build in-demand digital skills, hands-on experience, and career confidence."
      />
      <StatsSection />

      {/* Section 2 — Introduction */}
      <section className="bg-white">
        <div className="container-site py-6 sm:py-8 lg:py-10 grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
          <div
            className="overflow-hidden rounded-2xl border border-slate-300 shadow-sm"
            data-reveal="left"
          >
            <img
              src={aboutImg}
              alt="Hands-on technology training lab at DIGITECHADEMY with learners and mentor"
              loading="lazy"
              width={1200}
              height={900}
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <div>
            <div data-reveal="right">
              <SectionHeading
                eyebrow="ABOUT DIGITECHADEMY"
                title="Where Practical Learning Meets Career Growth"
                singleLine={false}
                description={
                  <>
                    <span className="sm:hidden text-slate-700">
                      DIGITECHADEMY combines structured concepts, practical application, industry
                      tools, and real projects for job-ready skills.
                    </span>
                    <span className="hidden sm:inline text-slate-700">
                      We believe effective training should go beyond completing lessons.
                      DIGITECHADEMY combines structured concepts, practical application, industry
                      tools, guided projects, and continuous improvement to create a learning
                      experience built around real skills.
                    </span>
                  </>
                }
                align="left"
              />
            </div>
            <ul className="mt-3.5 sm:mt-6 grid gap-1.5 sm:gap-3 sm:grid-cols-2">
              {[
                { title: "Structured Core Concepts", delay: "100ms" },
                { title: "Practical Hands-On Application", delay: "180ms" },
                { title: "Industry Standard Tools", delay: "260ms" },
                { title: "Guided Real-World Projects", delay: "340ms" },
              ].map((item) => (
                <li
                  key={item.title}
                  data-reveal="right-to-left-and-bottom-to-up"
                  style={{ "--reveal-delay": item.delay } as React.CSSProperties}
                  className="flex items-center gap-2 sm:gap-2.5 rounded-lg sm:rounded-xl border border-slate-300 bg-white py-2 px-3 sm:p-3.5 text-[11.5px] sm:text-sm font-bold text-slate-800 shadow-2xs sm:shadow-xs transition-all duration-300 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5"
                >
                  <span className="grid size-3.5 sm:size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <CheckCircle2 className="size-2 sm:size-3.5" aria-hidden="true" />
                  </span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 5 — Vision & Section 6 — Mission */}
      <section className="bg-white relative overflow-hidden py-6 sm:py-8 lg:py-10 border-t border-slate-200/80">
        <div className="container-site relative z-10 grid gap-6 lg:grid-cols-2">
          {/* Section 5 — Vision */}
          <article
            data-reveal="left"
            className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200 transition-transform duration-300 group-hover:scale-105">
                <Compass className="size-5" aria-hidden="true" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Our Vision
              </h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 text-justify">
              To build a trusted learning ecosystem where learners develop practical digital skills
              and thrive in modern tech roles.
            </p>
          </article>

          {/* Section 6 — Mission */}
          <article
            data-reveal="right"
            className="group flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-blue-500 hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200 transition-transform duration-300 group-hover:scale-105">
                <Target className="size-5" aria-hidden="true" />
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Our Mission
              </h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-600 text-justify">
              To deliver hands-on, industry-relevant training that prepares learners with real
              skills, practical experience, and career confidence.
            </p>
          </article>
        </div>
      </section>

      {/* Section 8 — Why Learners Choose Us */}
      <section className="bg-white border-t border-slate-200">
        <div className="container-site py-6 sm:py-8 lg:py-10">
          <SectionHeading eyebrow="WHY LEARNERS CHOOSE US" title="Why Learners Choose Us" />
          <div className="mt-6 sm:mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-2">
            {whyLearnersChooseUs.map((item, index) => {
              const IconComp = item.icon;
              return (
                <article
                  key={item.title}
                  data-reveal={index % 2 === 0 ? "left" : "top"}
                  style={
                    {
                      "--reveal-delay": `${(index % 2) * 120 + Math.floor(index / 2) * 80}ms`,
                    } as React.CSSProperties
                  }
                  className="group relative flex flex-col justify-between rounded-xl sm:rounded-2xl border border-slate-300 bg-white pt-5 sm:pt-6 pb-3.5 sm:pb-5 px-3.5 sm:px-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-navy/5"
                >
                  {/* Icon badge placed on the top border */}
                  <div className="absolute -top-4 sm:-top-5 left-3.5 sm:left-5 z-10">
                    <span className="grid size-8 sm:size-10 place-items-center rounded-lg sm:rounded-xl bg-sky-50 text-accent border border-accent/40 shadow-xs ring-4 ring-white transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:border-accent">
                      <IconComp className="size-4 sm:size-5" aria-hidden="true" />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs sm:text-base font-extrabold text-navy leading-snug mt-0.5 sm:mt-1">
                      {item.title}
                    </h3>
                    <p className="mt-1 sm:mt-1.5 text-[11px] sm:text-xs md:text-sm leading-relaxed text-slate-700 font-normal">
                      {item.text}
                    </p>
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

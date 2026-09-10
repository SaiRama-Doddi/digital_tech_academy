import { createFileRoute } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  Compass,
  GraduationCap,
  History,
  Layers,
  Sparkles,
  Target,
  TrendingUp,
  Workflow,
} from "lucide-react";

import aboutImg from "@/assets/about-training.jpg";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StatsSection } from "@/components/site/StatsSection";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Digitechademy | Practical Technology & Marketing Institute" },
      {
        name: "description",
        content:
          "Digitechademy is a practical learning platform focused on helping students and professionals develop relevant skills for today's digital careers.",
      },
      { property: "og:title", content: "About Digitechademy" },
      {
        property: "og:description",
        content: "Learn Skills. Build Experience. Grow With the Digital Industry.",
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
        description="Digitechademy is a practical learning platform focused on helping students and professionals develop relevant skills for today's digital careers."
        containerClassName="max-w-6xl xl:max-w-7xl w-full"
        titleClassName="max-w-none text-2xl sm:text-3xl md:text-4xl lg:text-[1.5rem] xl:text-[1.85rem] 2xl:text-[2.2rem] font-extrabold tracking-tight text-balance break-words xl:whitespace-nowrap leading-[1.25] sm:leading-[1.2]"
      />
      <StatsSection />

      {/* Section 2 — Introduction */}
      <section className="bg-background">
        <div className="container-site py-8 sm:py-10 lg:py-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-md" data-reveal="left">
            <img
              src={aboutImg}
              alt="Trainer working with learners in a technology training classroom"
              loading="lazy"
              width={1200}
              height={1008}
              className="aspect-[5/4] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <div data-reveal="right">
            <SectionHeading
              eyebrow="ABOUT DIGITECHADEMY"
              title="Where Practical Learning Meets Career Growth"
              singleLine={false}
              description={
                <>
                  <span className="sm:hidden">
                    Digitechademy combines structured concepts, practical application, industry tools, and real projects for job-ready skills.
                  </span>
                  <span className="hidden sm:inline">
                    We believe effective training should go beyond completing lessons. Digitechademy combines structured concepts, practical application, industry tools, guided projects, and continuous improvement to create a learning experience built around real skills.
                  </span>
                </>
              }
              align="left"
            />
            <ul className="mt-3.5 sm:mt-6 grid gap-1.5 sm:gap-3 sm:grid-cols-2">
              {[
                "Structured Core Concepts",
                "Practical Hands-On Application",
                "Industry Standard Tools",
                "Guided Real-World Projects",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 sm:gap-2.5 rounded-lg sm:rounded-xl border border-slate-200/80 bg-white py-1.5 px-2.5 sm:p-3.5 text-[11.5px] sm:text-sm font-bold text-slate-800 shadow-xs sm:shadow-sm transition-all duration-300 hover:border-accent/40"
                >
                  <span className="grid size-3.5 sm:size-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <CheckCircle2 className="size-2 sm:size-3.5" aria-hidden="true" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3 — Our Story */}
      <section className="bg-surface border-t border-slate-200/80">
        <div className="container-site py-8 sm:py-10 lg:py-12">
          <div className="max-w-4xl lg:max-w-5xl text-left" data-reveal>
            <span className="inline-block text-xs font-black uppercase tracking-widest text-accent mb-3">
              OUR STORY
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-navy text-left break-words">
              Built to Make Digital Learning More Practical
            </h2>
            <p className="mt-4 text-sm sm:text-base lg:text-[1.05rem] leading-relaxed text-slate-600 max-w-4xl text-left font-normal">
              Digitechademy was created with a simple goal: make professional digital training more practical, accessible, and relevant to the skills employers and businesses need. Our programs are designed to connect learning with real-world application so learners can understand not only what to learn, but how to use it.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 — Then / Now / Next */}
      <section className="bg-background border-t border-slate-200/60">
        <div className="container-site py-8 sm:py-10 lg:py-12">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8" data-reveal>
            <span className="inline-block text-xs font-black uppercase tracking-widest text-accent mb-2">
              THE PROGRESSION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-navy text-center">
              Then / Now / Next
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                stage: "Then",
                icon: History,
                badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
                iconBg: "bg-slate-100 text-slate-600",
                cardClass: "border-slate-200/80 bg-white",
                text: "Learning was often separated from practical workplace experience.",
              },
              {
                stage: "Now",
                icon: Sparkles,
                badgeClass: "bg-accent/15 text-accent border-accent/30 font-black",
                iconBg: "bg-accent/15 text-accent",
                cardClass: "border-accent/40 bg-white ring-2 ring-accent/20 shadow-md shadow-accent/5",
                text: "Digitechademy brings structured learning, practical projects, tools, and guided application together.",
              },
              {
                stage: "Next",
                icon: TrendingUp,
                badgeClass: "bg-navy text-white border-navy font-black",
                iconBg: "bg-navy/10 text-primary",
                cardClass: "border-slate-200/80 bg-white",
                text: "We aim to help more learners build specialized digital skills and confidently pursue evolving career opportunities.",
              },
            ].map((item, index) => {
              const IconComp = item.icon;
              return (
                <article
                  key={item.stage}
                  data-reveal
                  style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                  className={cn(
                    "group flex flex-col justify-between gap-3 rounded-xl border p-4 sm:p-5 shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md",
                    item.cardClass
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] uppercase tracking-wider border font-bold",
                        item.badgeClass
                      )}
                    >
                      {item.stage}
                    </span>
                    <span
                      className={cn(
                        "grid size-8 place-items-center rounded-lg transition-transform duration-300 group-hover:scale-105",
                        item.iconBg
                      )}
                    >
                      <IconComp className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-slate-600 font-medium text-left">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 5 — Vision & Section 6 — Mission */}
      <section className="surface-navy relative overflow-hidden py-10 sm:py-12 lg:py-14 border-t border-navy-700/60">
        <div className="grid-lines absolute inset-0 opacity-25 pointer-events-none" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-[28rem] rounded-full bg-accent/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-20 -bottom-20 size-[28rem] rounded-full bg-blue-500/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-site relative z-10 grid gap-6 lg:grid-cols-2">
          {/* Section 5 — Vision */}
          <article
            data-reveal="left"
            className="group flex flex-col gap-3.5 rounded-2xl border border-navy-foreground/15 bg-navy-700/30 backdrop-blur-md p-6 sm:p-7 shadow-xl transition-all duration-300 hover:border-accent/40"
          >
            <div className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent border border-accent/20 transition-transform duration-300 group-hover:scale-105">
                <Compass className="size-5.5" aria-hidden="true" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Our Vision</h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 text-justify [text-align:justify] [text-justify:inter-word] sm:text-left">
              To build a trusted learning ecosystem where people can develop practical digital skills and continuously adapt to a changing technology-driven workplace.
            </p>
          </article>

          {/* Section 6 — Mission */}
          <article
            data-reveal="right"
            className="group flex flex-col gap-3.5 rounded-2xl border border-navy-foreground/15 bg-navy-700/30 backdrop-blur-md p-6 sm:p-7 shadow-xl transition-all duration-300 hover:border-accent/40"
          >
            <div className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent border border-accent/20 transition-transform duration-300 group-hover:scale-105">
                <Target className="size-5.5" aria-hidden="true" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">Our Mission</h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300 text-justify [text-align:justify] [text-justify:inter-word] sm:text-left">
              To deliver practical, industry-relevant training that helps learners understand concepts, apply skills, build experience, and prepare for meaningful digital career opportunities.
            </p>
          </article>
        </div>
      </section>

      {/* Section 8 — Why Learners Choose Us */}
      <section className="bg-surface border-t border-slate-200/80">
        <div className="container-site py-8 sm:py-10 lg:py-12">
          <SectionHeading
            eyebrow="WHY LEARNERS CHOOSE US"
            title="Why Learners Choose Us"
          />
          <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {whyLearnersChooseUs.map((item, index) => {
              const IconComp = item.icon;
              return (
                <article
                  key={item.title}
                  data-reveal={index % 2 === 0 ? "left" : "top"}
                  style={{ "--reveal-delay": `${(index % 2) * 120 + Math.floor(index / 2) * 80}ms` } as React.CSSProperties}
                  className="group flex flex-col justify-between gap-2.5 sm:gap-4 rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-7 shadow-xs sm:shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-navy/5"
                >
                  <span className="grid size-9 sm:size-12 place-items-center rounded-lg sm:rounded-xl bg-accent/15 text-accent border border-accent/20 transition-transform duration-300 group-hover:scale-110">
                    <IconComp className="size-4.5 sm:size-6 text-accent" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-xs sm:text-lg font-bold text-navy leading-snug">{item.title}</h3>
                    <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-sm leading-relaxed text-slate-600 text-justify [text-align:justify] [text-justify:inter-word]">
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

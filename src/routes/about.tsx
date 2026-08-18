import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, CheckCircle2, Compass, Target } from "lucide-react";

import aboutImg from "@/assets/about-training.jpg";
import { CTASection } from "@/components/site/CTASection";
import { Icon } from "@/components/site/Icon";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StatsSection } from "@/components/site/StatsSection";
import { careerBenefits, whyChooseUs } from "@/data/content";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Our Academy | Digital Tech Solution" },
      {
        name: "description",
        content:
          "Learn how Digital Tech Solution trains learners in Digital Marketing and Cyber Security through practical, mentor-led, career-focused programs.",
      },
      { property: "og:title", content: "About Our Academy | Digital Tech Solution" },
      {
        property: "og:description",
        content: "Building practical skills for the digital and technology-driven world.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const philosophy = [
  { title: "Learn the Concept", text: "Structured sessions that build clear fundamentals first." },
  { title: "Understand the Tool", text: "Guided walkthroughs of the platforms professionals use." },
  { title: "Practice the Skill", text: "Repeated hands-on practice until execution feels natural." },
  { title: "Apply It to Real Problems", text: "Projects and scenarios modelled on real business needs." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="About Our Academy"
        title="About Our Academy"
        description="Building practical skills for the digital and technology-driven world."
      />
      <StatsSection />

      {/* Who We Are */}
      <section className="bg-background">
        <div className="container-site section-y grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-2xl border border-border shadow-card" data-reveal="left">
            <img
              src={aboutImg}
              alt="Trainer working with learners in a technology training classroom"
              loading="lazy"
              width={1200}
              height={1008}
              className="aspect-[5/4] w-full object-cover"
            />
          </div>
          <div data-reveal="right">
            <SectionHeading
              eyebrow="Who We Are"
              title="A Focused Institute for Two High-Demand Domains"
              align="left"
            />
            <div className="mt-5 space-y-4 text-[0.98rem] leading-relaxed text-muted-foreground">
              <p>
                Digital Tech Solution is a specialist training institute for Digital Marketing and
                Cyber Security. Instead of offering everything, we focus on two domains and teach
                them deeply, with curriculum shaped by how these roles actually work in industry.
              </p>
              <p>
                Every program is delivered by practitioners, structured around practical work and
                supported by mentors who review what you build. Learners finish with skills they
                can demonstrate — campaign work, audits, labs and assessment reports.
              </p>
            </div>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {["Practical education", "Technology-first curriculum", "Career development focus", "Continuous mentorship"].map(
                (item) => (
                  <li key={item} className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                    <CheckCircle2 className="size-4 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-surface">
        <div className="container-site section-y">
          <SectionHeading
            eyebrow="Our Story"
            title="Started to Close the Gap Between Courses and Careers"
            description="We kept meeting learners who had completed courses but had never run a campaign or worked inside a security lab. Digital Tech Solution was built to fix exactly that."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                year: "Then",
                title: "A practical pilot batch",
                text: "The first programs ran with small batches and heavy project work to prove the format.",
              },
              {
                year: "Now",
                title: "Two structured domains",
                text: "Digital Marketing and Cyber Security tracks with defined levels, labs and certification.",
              },
              {
                year: "Next",
                title: "Deeper specialisation",
                text: "Advanced tracks and industry collaboration to keep the curriculum current.",
              },
            ].map((item, index) => (
              <article
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
                className="hover-lift rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <span className="eyebrow text-accent-foreground/70">{item.year}</span>
                <h3 className="mt-2 text-base font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="surface-navy relative overflow-hidden">
        <div className="grid-lines absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-site relative section-y grid gap-5 lg:grid-cols-2">
          <article
            data-reveal="left"
            className="flex flex-col gap-4 rounded-2xl border border-accent/30 bg-accent/10 p-7 backdrop-blur sm:p-9"
          >
            <span className="grid size-12 place-items-center rounded-md bg-accent text-accent-foreground">
              <Compass className="size-6" aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-extrabold text-navy-foreground sm:text-3xl">Our Vision</h2>
            <p className="text-base leading-relaxed text-navy-foreground/85">
              To become a trusted learning destination for practical Digital Marketing and Cyber
              Security education.
            </p>
          </article>
          <article
            data-reveal="right"
            className="flex flex-col gap-4 rounded-2xl border border-navy-foreground/12 glass-panel p-7 sm:p-9"
          >
            <span className="grid size-12 place-items-center rounded-md border border-accent/40 text-accent">
              <Target className="size-6" aria-hidden="true" />
            </span>
            <h2 className="text-2xl font-extrabold text-navy-foreground sm:text-3xl">Our Mission</h2>
            <p className="text-base leading-relaxed text-navy-muted">
              To empower learners with relevant skills, practical experience and professional
              confidence needed to succeed in a rapidly changing digital world.
            </p>
          </article>
        </div>
      </section>

      {/* Training Philosophy */}
      <section className="bg-background">
        <div className="container-site section-y">
          <SectionHeading
            eyebrow="Training Philosophy"
            title="Four Stages, Every Single Module"
            description="The same rhythm repeats across every topic so learning always ends in application."
          />
          <ol className="mx-auto mt-10 flex max-w-4xl flex-col items-stretch gap-3">
            {philosophy.map((stage, index) => (
              <li key={stage.title} data-reveal className="flex flex-col items-center gap-3">
                <div className="hover-lift flex w-full items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-card sm:items-center">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary font-display text-sm font-extrabold text-primary-foreground">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-foreground">{stage.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{stage.text}</p>
                  </div>
                </div>
                {index < philosophy.length - 1 ? (
                  <ArrowDown className="size-5 text-accent" aria-hidden="true" />
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why students choose us */}
      <section className="bg-surface">
        <div className="container-site section-y">
          <SectionHeading
            eyebrow="Why Students Choose Us"
            title="Consistent Structure, Real Accountability"
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => (
              <article
                key={item.title}
                data-reveal
                className="hover-lift group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <span className="grid size-11 place-items-center rounded-md bg-accent-soft transition-transform duration-300 group-hover:scale-110">
                  <Icon name={item.icon} className="size-5 text-accent-foreground" />
                </span>
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Learning experience */}
      <section className="bg-background">
        <div className="container-site section-y">
          <SectionHeading
            eyebrow="Learning Experience"
            title="What a Batch Actually Feels Like"
            description="Small groups, structured sessions, weekly deliverables and honest feedback."
          />
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {careerBenefits.map((item) => (
              <article key={item.title} data-reveal className="group bg-card p-6 transition-colors hover:bg-surface">
                <span className="grid size-11 place-items-center rounded-md bg-accent-soft transition-transform duration-300 group-hover:scale-110">
                  <Icon name={item.icon} className="size-5 text-accent-foreground" />
                </span>
                <h3 className="mt-3 text-base font-bold text-foreground">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Learn With a Team That Cares About Outcomes"
        text="Talk to a counsellor about which program fits your background and career goal."
      />
    </SiteLayout>
  );
}

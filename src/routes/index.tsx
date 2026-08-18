import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";

import aboutImg from "@/assets/about-training.jpg";
import heroImg from "@/assets/hero-tech.jpg";
import { BtnLink } from "@/components/site/Btn";
import { CTASection } from "@/components/site/CTASection";
import { CourseCard } from "@/components/site/CourseCard";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { Icon } from "@/components/site/Icon";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StatsSection } from "@/components/site/StatsSection";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import {
  careerBenefits,
  homeFaqs,
  methodology,
  practicalTraining,
  testimonials,
  whyChooseUs,
} from "@/data/content";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Digital Marketing & Cyber Security Training | Digital Tech Solution" },
      {
        name: "description",
        content:
          "Career-focused Digital Marketing and Cyber Security courses with practical projects, expert mentors and certification. Explore programs and request a call.",
      },
      {
        property: "og:title",
        content: "Digital Marketing & Cyber Security Training | Digital Tech Solution",
      },
      {
        property: "og:description",
        content:
          "Practical, industry-focused training that turns knowledge into real-world Digital Marketing and Cyber Security skills.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <StatsSection />
      <AboutPreview />
      <WhyChooseUs />
      <FeaturedCourses />
      <Methodology />
      <PracticalTraining />
      <CareerBenefits />
      <Testimonials />
      <FaqPreview />
      <CTASection />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="surface-navy relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-24 top-0 size-[38rem] rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative grid items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:py-20 xl:gap-16">
        <div className="max-w-2xl">
          <span className="eyebrow text-accent" data-reveal>
            <Sparkles className="size-3.5" aria-hidden="true" />
            Career-Focused Technology Training
          </span>
          <h1
            className="mt-5 text-[2.15rem] font-extrabold leading-[1.08] text-navy-foreground sm:text-[2.75rem] lg:text-[3.4rem] xl:text-[3.75rem]"
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
          >
            Build Skills. Master Technology.{" "}
            <span className="text-accent">Accelerate Your Career.</span>
          </h1>
          <p
            className="mt-5 max-w-xl text-base leading-relaxed text-navy-muted sm:text-lg"
            data-reveal
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            Learn Digital Marketing and Cyber Security through practical, industry-focused training
            designed to turn knowledge into real-world skills.
          </p>
          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            data-reveal
            style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
          >
            <BtnLink to="/courses" variant="accent" size="lg">
              Explore Courses
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </BtnLink>
            <BtnLink to="/request-call" variant="onDark" size="lg">
              <PhoneCall className="size-4" aria-hidden="true" />
              Request a Call
            </BtnLink>
          </div>
          <ul
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-navy-muted"
            data-reveal
            style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
          >
            {["Practical project work", "Mentor guidance", "Certification on completion"].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="size-4 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative" data-reveal="scale">
          <div
            className="absolute inset-6 rounded-full bg-accent/15 blur-3xl motion-safe:animate-float"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-2xl border border-navy-foreground/12 shadow-lift motion-safe:animate-float">
            <img
              src={heroImg}
              alt="Cyber security dashboard and marketing analytics displayed on a laptop"
              width={1408}
              height={1104}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="glass-panel absolute -bottom-4 left-4 flex items-center gap-3 rounded-xl px-4 py-3 sm:left-6">
            <ShieldCheck className="size-6 text-accent" aria-hidden="true" />
            <span className="text-xs font-semibold leading-tight text-navy-foreground sm:text-sm">
              2 industry domains
              <span className="block text-[0.7rem] font-normal text-navy-muted">
                Digital Marketing · Cyber Security
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="bg-background">
      <div className="container-site section-y grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative" data-reveal="left">
          <div className="overflow-hidden rounded-2xl border border-border shadow-card">
            <img
              src={aboutImg}
              alt="Instructor guiding students during a practical technology training session"
              loading="lazy"
              width={1200}
              height={1008}
              className="aspect-[5/4] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -bottom-5 -right-3 hidden rounded-xl border border-border bg-card p-4 shadow-lift sm:block">
            <p className="font-display text-2xl font-extrabold text-accent">95%</p>
            <p className="text-xs font-semibold text-muted-foreground">Learning satisfaction</p>
          </div>
        </div>

        <div data-reveal="right">
          <SectionHeading
            eyebrow="About Our Academy"
            title="Learn Beyond Theory. Build Real Skills."
            description="Our training approach combines structured learning, practical assignments, real-world scenarios and mentor guidance to help learners confidently apply what they learn."
            align="left"
          />
          <ul className="mt-7 grid gap-3 sm:grid-cols-3">
            {["Industry-Relevant Curriculum", "Practical Learning", "Mentor Support"].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-border bg-card p-4 text-sm font-semibold text-foreground shadow-card"
              >
                <CheckCircle2 className="mb-2 size-4 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="group mt-7 inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-accent"
          >
            Explore About Us
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="bg-surface">
      <div className="container-site section-y">
        <SectionHeading
          eyebrow="Why Us"
          title="Why Learn With Us?"
          description="A learning experience designed around practice, industry relevance and measurable progress."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {whyChooseUs.map((item, index) => (
            <article
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              className="hover-lift group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-card sm:p-6"
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
  );
}

function FeaturedCourses() {
  return (
    <section id="courses" className="bg-background">
      <div className="container-site section-y">
        <SectionHeading
          eyebrow="Programs"
          title="Explore Our Courses"
          description="Choose a learning path designed around practical skills and career growth."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
        <div className="mt-8 flex justify-center" data-reveal>
          <BtnLink to="/courses" variant="outline" size="md">
            View All Courses
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </BtnLink>
        </div>
      </div>
    </section>
  );
}

function Methodology() {
  return (
    <section className="surface-navy relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-site relative section-y">
        <SectionHeading
          eyebrow="Our Methodology"
          title="From Learning to Real-World Application"
          description="A structured five-stage path that moves you from understanding a concept to applying it with confidence."
          onDark
        />
        <ProcessTimeline steps={methodology} onDark className="mt-10" />
      </div>
    </section>
  );
}

function PracticalTraining() {
  return (
    <section className="bg-surface">
      <div className="container-site section-y">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div data-reveal="left">
            <SectionHeading
              eyebrow="Practical Training"
              title="Practice. Build. Become Industry Ready."
              description="Training goes beyond presentations. Work through practical exercises, projects, case studies and realistic scenarios that help you develop confidence through hands-on experience."
              align="left"
            />
            <BtnLink to="/courses" variant="primary" size="md" className="mt-7">
              See what you'll build
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </BtnLink>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {practicalTraining.map((item, index) => (
              <article
                key={item.title}
                data-reveal
                style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                className="hover-lift group flex gap-3.5 rounded-xl border border-border bg-card p-4 shadow-card last:sm:col-span-2"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-soft transition-transform duration-300 group-hover:scale-110">
                  <Icon name={item.icon} className="size-5 text-accent-foreground" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CareerBenefits() {
  return (
    <section className="bg-background">
      <div className="container-site section-y">
        <SectionHeading
          eyebrow="Career Outcomes"
          title="Skills That Move Your Career Forward"
          description="Every program is designed to leave you with proof of skill, not just completion."
        />
        <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {careerBenefits.map((item) => (
            <article
              key={item.title}
              data-reveal
              className="group flex flex-col gap-3 bg-card p-6 transition-colors duration-300 hover:bg-surface"
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
  );
}

function Testimonials() {
  return (
    <section className="bg-surface">
      <div className="container-site section-y">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Learners Say"
          description="Feedback from learners who came for skills and left with practical experience."
        />
        <div className="mt-10">
          <TestimonialCarousel items={testimonials.slice(0, 6)} />
        </div>
        <div className="mt-8 flex justify-center" data-reveal>
          <BtnLink to="/testimonials" variant="outline" size="md">
            Read All Testimonials
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </BtnLink>
        </div>
      </div>
    </section>
  );
}

function FaqPreview() {
  return (
    <section className="bg-background">
      <div className="container-site section-y grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div data-reveal="left">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions Learners Ask Us"
            description="Short answers to the things most people want to know before enrolling."
            align="left"
          />
          <Link
            to="/faq"
            className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-foreground transition-colors hover:text-accent"
          >
            View All FAQs
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
        <FaqAccordion items={homeFaqs} />
      </div>
    </section>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Briefcase,
  CheckCircle2,
  Headphones,
  Megaphone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import aboutImg from "@/assets/about-training.jpg";
import heroImg from "@/assets/hero-tech.jpg";
import { BtnLink } from "@/components/site/Btn";
import { CourseCard } from "@/components/site/CourseCard";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { Icon } from "@/components/site/Icon";
import { ProcessTimeline } from "@/components/site/ProcessTimeline";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { StatsSection } from "@/components/site/StatsSection";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import {
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
      <AboutPreview />
      <WhyChooseUs />
      <FeaturedCourses />
      <Methodology />
      <PracticalTraining />
      <Testimonials />
      <FaqPreview />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40 relative overflow-hidden pb-12 pt-2 sm:pt-4 lg:pb-16 lg:pt-4">
      {/* Subtle grid backdrop */}
      <div className="grid-lines absolute inset-0 opacity-[0.22] pointer-events-none" aria-hidden="true" />
      
      {/* Glowing abstract circles */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 size-[32rem] rounded-full bg-accent/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/3 bottom-10 size-[28rem] rounded-full bg-blue-400/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-site relative z-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 xl:gap-14">
          {/* Left Column: Text & CTA */}
          <div className="max-w-2xl text-left">
            <span
              className="eyebrow inline-flex items-center gap-2 rounded-full bg-blue-50/70 px-3.5 py-1.5 text-xs font-semibold text-primary border border-blue-100/30"
              data-reveal
            >
              <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
              Career-Focused Technology Training
            </span>
            <h1
              className="mt-5 text-[2.25rem] font-extrabold leading-[1.08] text-foreground sm:text-[2.85rem] lg:text-[3.4rem] xl:text-[3.75rem]"
              data-reveal
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              Build Skills. <br className="hidden sm:inline" />
              Master Technology. <br />
              <span className="text-accent">Accelerate Your Career.</span>
            </h1>
            <p
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]"
              data-reveal
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            >
              Learn Digital Marketing and Cyber Security through practical, industry-focused training
              designed to turn knowledge into real-world skills.
            </p>
            <div
              className="mt-8 flex flex-col gap-3.5 sm:flex-row"
              data-reveal
              style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
            >
              <BtnLink to="/courses" variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-full flex items-center justify-center gap-1.5">
                Explore Courses &rarr;
              </BtnLink>
              <BtnLink to="/request-call" variant="outline" size="md" className="border-slate-200 bg-white text-slate-700 hover:border-blue-600 hover:text-blue-600 h-11 px-6 rounded-full flex items-center gap-2">
                <PhoneCall className="size-4" aria-hidden="true" />
                Request a Call
              </BtnLink>
            </div>

            {/* Stats / Proof Row inside Hero */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-x-8 gap-y-4">
              {/* Avatars + Count */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop"
                  ].map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Student avatar"
                      className="size-7 rounded-full border-2 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-800">10,000+</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Students Trained</p>
                </div>
              </div>

              {/* Trainers */}
              <div className="border-l border-slate-100 pl-6 text-left">
                <p className="text-sm font-extrabold text-slate-800">50+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Expert Trainers</p>
              </div>

              {/* Placement */}
              <div className="border-l border-slate-100 pl-6 text-left">
                <p className="text-sm font-extrabold text-slate-800">95%</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Placement Rate</p>
              </div>
            </div>
          </div>

          {/* Right Column: Platform & 3D Laptop */}
          <div className="relative flex justify-center items-center lg:justify-end animate-fade-in duration-700" data-reveal="scale">
            {/* The background glowing circle behind the laptop */}
            <div className="absolute size-72 sm:size-[26rem] rounded-full bg-gradient-to-tr from-blue-400/10 to-indigo-500/15 blur-2xl animate-pulse" />
            
            {/* Circular 3D platform / pedestal wrapper */}
            <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] flex items-center justify-center">
              {/* Upper disk surface */}
              <div className="absolute inset-x-0 bottom-6 top-16 rounded-full bg-white border-2 border-slate-150 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] flex items-center justify-center">
                {/* Cyan neon light rim */}
                <div className="absolute inset-1 rounded-full border border-cyan-400/40 bg-gradient-to-b from-cyan-50/20 to-blue-50/20 shadow-[0_0_20px_rgba(34,211,238,0.25),inset_0_0_20px_rgba(34,211,238,0.25)]" />
                {/* Platform top layer */}
                <div className="absolute inset-3.5 rounded-full border border-slate-100 bg-gradient-to-b from-white to-slate-50" />
              </div>

              {/* The Laptop rendering centered on the platform */}
              <div className="absolute inset-0 z-10 flex items-center justify-center p-6 sm:p-10">
                <img
                  src={heroImg}
                  alt="Cyber security dashboard and marketing analytics displayed on a laptop"
                  className="w-[85%] sm:w-[90%] object-contain rounded-lg shadow-[0_12px_32px_rgba(0,0,0,0.1)] border border-slate-200/50 transition-transform duration-500 hover:scale-[1.01]"
                />
              </div>

              {/* Floating Badge: Digital Marketing (Left) */}
              <div className="absolute -left-2 top-[32%] sm:-left-6 z-20 animate-float shadow-md border border-slate-100 bg-white/95 rounded-xl p-2.5 flex flex-col items-center gap-1.5 w-20 sm:w-24 text-center backdrop-blur-sm">
                <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <Megaphone className="size-4.5" />
                </span>
                <span className="text-[0.65rem] sm:text-xs font-bold text-slate-800 leading-tight">Digital Marketing</span>
              </div>

              {/* Floating Badge: Cyber Security (Right) */}
              <div className="absolute -right-2 top-[42%] sm:-right-6 z-20 animate-float shadow-md border border-slate-100 bg-white/95 rounded-xl p-2.5 flex flex-col items-center gap-1.5 w-20 sm:w-24 text-center backdrop-blur-sm" style={{ animationDelay: "2.5s" }}>
                <span className="grid size-8 place-items-center rounded-lg bg-blue-50 text-blue-600">
                  <ShieldCheck className="size-4.5" />
                </span>
                <span className="text-[0.65rem] sm:text-xs font-bold text-slate-800 leading-tight">Cyber Security</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Features Bar */}
        <div className="mt-12 w-full max-w-5xl mx-auto bg-white rounded-2xl border border-slate-100/80 shadow-[0_12px_40px_rgba(0,0,0,0.03)] p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-slate-100">
            {[
              { icon: Briefcase, title: "Practical Project Work", desc: "Work on real-world projects" },
              { icon: Users, title: "Mentor Guidance", desc: "Learn from industry experts" },
              { icon: Award, title: "Certification on Completion", desc: "Industry-recognized certificates" },
              { icon: Headphones, title: "100% Placement Assistance", desc: "End-to-end career support" },
            ].map((feature, i) => {
              const IconComp = feature.icon;
              return (
                <div key={feature.title} className="flex items-center gap-4 px-4 sm:px-6 md:px-5">
                  <span className="grid size-11 place-items-center rounded-full bg-blue-50 text-blue-600 shrink-0">
                    <IconComp className="size-5" />
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-sm font-extrabold text-slate-800 leading-snug">{feature.title}</span>
                    <span className="text-xs text-slate-500 mt-0.5 leading-normal">{feature.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPreview() {
  return (
    <section className="bg-background">
      <div className="container-site py-10 lg:py-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative" data-reveal="left">
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <img
              src={aboutImg}
              alt="Instructor guiding students during a practical technology training session"
              loading="lazy"
              width={1200}
              height={1008}
              className="aspect-[5/4] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -bottom-5 -right-3 hidden rounded-xl border border-slate-100 bg-white p-4 shadow-md sm:block">
            <p className="font-display text-2xl font-black text-blue-600">95%</p>
            <p className="text-xs font-bold text-slate-500">Learning satisfaction</p>
          </div>
        </div>

        <div data-reveal="right">
          <SectionHeading
            eyebrow="About Our Academy"
            title="Learn Beyond Theory. Build Real Skills."
            description="Our training approach combines structured learning, practical assignments, real-world scenarios and mentor guidance to help learners confidently apply what they learn."
            align="left"
          />
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {["Industry-Relevant Curriculum", "Practical Learning", "Mentor Support"].map((item) => (
              <li
                key={item}
                className="rounded-xl border border-slate-100 bg-white p-4 text-sm font-bold text-slate-800 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <CheckCircle2 className="mb-2 size-4 text-blue-500" aria-hidden="true" />
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
      <div className="container-site py-10 lg:py-12">
        <SectionHeading
          eyebrow="Why Us"
          title="Why Learn With Us?"
          description="A learning experience designed around practice, industry relevance and measurable progress."
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {whyChooseUs.map((item, index) => (
            <article
              key={item.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
              className="hover-lift group flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
            >
              <span className="grid size-11 place-items-center rounded-md bg-blue-50 transition-transform duration-300 group-hover:scale-110">
                <Icon name={item.icon} className="size-5 text-blue-600" />
              </span>
              <h3 className="text-base font-extrabold text-slate-800">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-500 text-justify">{item.text}</p>
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
      <div className="container-site py-10 lg:py-12">
        <SectionHeading
          eyebrow="Programs"
          title="Explore Our Courses"
          description="Choose a learning path designed around practical skills and career growth."
        />
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
        <div className="mt-8 flex justify-center" data-reveal>
          <BtnLink to="/courses" variant="outline" size="md" className="border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600">
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
      <div className="container-site relative py-10 lg:py-12">
        <SectionHeading
          eyebrow="Our Methodology"
          title="From Learning to Real-World Application"
          description="A structured five-stage path that moves you from understanding a concept to applying it with confidence."
          onDark
        />
        <ProcessTimeline steps={methodology} onDark className="mt-7" />
      </div>
    </section>
  );
}

function PracticalTraining() {
  return (
    <section className="bg-surface">
      <div className="container-site py-10 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div data-reveal="left">
            <SectionHeading
              eyebrow="Practical Training"
              title="Practice. Build. Become Industry Ready."
              description="Training goes beyond presentations. Work through practical exercises, projects, case studies and realistic scenarios that help you develop confidence through hands-on experience."
              align="left"
            />
            <BtnLink to="/courses" variant="primary" size="md" className="mt-6 bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10">
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
                className="hover-lift group flex gap-3.5 rounded-xl border border-slate-100 bg-white p-4 shadow-sm last:sm:col-span-2"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-md bg-blue-50 transition-transform duration-300 group-hover:scale-110">
                  <Icon name={item.icon} className="size-5 text-blue-600" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 text-justify">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


function Testimonials() {
  return (
    <section className="bg-surface">
      <div className="container-site py-10 lg:py-12">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Learners Say"
          description="Feedback from learners who came for skills and left with practical experience."
        />
        <div className="mt-7">
          <TestimonialCarousel items={testimonials.slice(0, 6)} />
        </div>
        <div className="mt-8 flex justify-center" data-reveal>
          <BtnLink to="/testimonials" variant="outline" size="md" className="border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-600">
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
      <div className="container-site py-10 lg:py-12 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <div data-reveal="left">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions Learners Ask Us"
            description="Short answers to the things most people want to know before enrolling."
            align="left"
          />
          <Link
            to="/faq"
            className="group mt-5 inline-flex items-center gap-2 text-sm font-bold text-slate-800 transition-colors hover:text-blue-600"
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

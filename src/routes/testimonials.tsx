import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";

import { CTASection } from "@/components/site/CTASection";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { testimonials } from "@/data/content";
import { courses } from "@/data/courses";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Learner Testimonials & Reviews | Digital Tech Solution" },
      {
        name: "description",
        content:
          "Read what Digital Marketing and Cyber Security learners say about practical training, mentor support and project work at Digital Tech Solution.",
      },
      { property: "og:title", content: "Real Learners. Real Experiences." },
      {
        property: "og:description",
        content: "Honest feedback from learners across our Digital Marketing and Cyber Security programs.",
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

function TestimonialsPage() {
  const featured = testimonials[0]!;
  const rest = testimonials.slice(1);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Testimonials"
        title="Real Learners. Real Experiences."
        description="Feedback from students who wanted practical skills — and finished with work they could show."
      />

      {/* Rating statistics */}
      <section className="border-b border-border bg-surface">
        <div className="container-site section-y-sm">
          <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {ratingStats.map((stat) => (
              <div key={stat.label} data-reveal className="border-l border-border-strong pl-4">
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

      {/* Featured testimonial */}
      <section className="bg-background">
        <div className="container-site section-y">
          <figure
            data-reveal
            className="surface-navy relative overflow-hidden rounded-2xl border border-navy-600 p-7 sm:p-10 lg:p-12"
          >
            <div className="grid-lines absolute inset-0 opacity-40" aria-hidden="true" />
            <div className="relative">
              <Quote className="size-9 text-accent" aria-hidden="true" />
              <blockquote className="mt-5 max-w-3xl text-xl font-semibold leading-snug text-navy-foreground sm:text-2xl lg:text-[1.7rem]">
                {featured.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-accent/20 font-bold text-accent">
                  {featured.initials}
                </span>
                <span>
                  <span className="block text-sm font-bold text-navy-foreground">{featured.name}</span>
                  <span className="block text-xs text-navy-muted">{featured.course}</span>
                </span>
                <span className="ml-auto flex gap-0.5" aria-label={`${featured.rating} out of 5`}>
                  {Array.from({ length: featured.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-accent text-accent" aria-hidden="true" />
                  ))}
                </span>
              </figcaption>
            </div>
          </figure>
        </div>
      </section>

      {/* Grid of testimonials */}
      <section className="bg-surface">
        <div className="container-site section-y">
          <SectionHeading
            eyebrow="Learner Voices"
            title="What Our Students Say"
            description="Across marketing and security batches, the same theme repeats: practice made the difference."
          />
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {rest.map((item) => (
              <div key={item.name + item.quote} data-reveal className="break-inside-avoid">
                <TestimonialCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course specific */}
      <section className="bg-background">
        <div className="container-site section-y flex flex-col gap-10">
          <SectionHeading
            eyebrow="By Program"
            title="Course-Specific Feedback"
            description="Reviews grouped by the program each learner completed."
          />
          {courses.map((course) => (
            <div key={course.slug}>
              <h3 className="text-lg font-bold text-foreground" data-reveal>
                {course.title}
              </h3>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {course.testimonials.map((item) => (
                  <div key={item.name + item.quote} data-reveal>
                    <TestimonialCard {...item} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        heading="Your Experience Could Be Next"
        text="Join a batch built around practice, mentorship and measurable progress."
      />
    </SiteLayout>
  );
}

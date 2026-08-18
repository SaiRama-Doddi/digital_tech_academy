import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { CTASection } from "@/components/site/CTASection";
import { CourseCard } from "@/components/site/CourseCard";
import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Digital Marketing & Cyber Security Courses | Digital Tech Solution" },
      {
        name: "description",
        content:
          "Explore practical training programs in Digital Marketing, SEO, performance marketing, cyber security and ethical hacking with projects and certification.",
      },
      { property: "og:title", content: "Choose Your Learning Path | Digital Tech Solution" },
      {
        property: "og:description",
        content:
          "Practical training programs designed to help you build valuable digital and technology skills.",
      },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesPage,
});

const filters = ["All Courses", "Digital Marketing", "Cyber Security"] as const;

function CoursesPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("All Courses");
  const visible = active === "All Courses" ? courses : courses.filter((c) => c.category === active);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Our Programs"
        title="Choose Your Learning Path"
        description="Explore practical training programs designed to help you build valuable digital and technology skills."
      />

      <section className="bg-background">
        <div className="container-site section-y">
          <div
            role="tablist"
            aria-label="Filter courses by category"
            className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                role="tab"
                aria-selected={active === filter}
                onClick={() => setActive(filter)}
                className={cn(
                  "shrink-0 rounded-md border px-4 py-2.5 text-sm font-semibold transition-colors",
                  active === filter
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-accent hover:text-foreground",
                )}
              >
                {filter}
              </button>
            ))}
          </div>

          <p className="mt-5 text-sm text-muted-foreground" aria-live="polite">
            Showing {visible.length} {visible.length === 1 ? "program" : "programs"}
            {active !== "All Courses" ? ` in ${active}` : ""}.
          </p>

          {visible.length ? (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-xl border border-dashed border-border-strong bg-card p-10 text-center">
              <h2 className="text-lg font-bold text-foreground">No courses in this category yet</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                New programs are added regularly. Request a call and we'll notify you.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        heading="Not Sure Which Program Fits?"
        text="A short counselling call is usually enough to match your background to the right learning path."
      />
    </SiteLayout>
  );
}

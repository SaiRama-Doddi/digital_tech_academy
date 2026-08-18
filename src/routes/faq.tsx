import { createFileRoute } from "@tanstack/react-router";

import { FaqAccordion } from "@/components/site/FaqAccordion";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { faqCategories } from "@/data/content";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Digital Tech Solution" },
      {
        name: "description",
        content:
          "Answers about eligibility, training formats, Digital Marketing and Cyber Security curriculum, fees, certification and enrolment at Digital Tech Solution.",
      },
      { property: "og:title", content: "Frequently Asked Questions | Digital Tech Solution" },
      {
        property: "og:description",
        content: "Everything learners ask about our courses, admission, fees and certification.",
      },
      { property: "og:url", content: "/faq" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Support"
        title="Frequently Asked Questions"
        description="Clear answers about our programs, training formats, fees and certification."
      />

      <section className="bg-background">
        <div className="container-site section-y flex flex-col gap-12">
          {faqCategories.map((category) => (
            <div key={category.title} className="grid gap-6 lg:grid-cols-[0.55fr_1.45fr] lg:gap-10">
              <SectionHeading
                eyebrow="FAQ"
                title={category.title}
                align="left"
                as="h2"
                className="lg:sticky lg:top-28 lg:self-start"
              />
              <FaqAccordion items={category.items} defaultOpen={null} />
            </div>
          ))}
        </div>
      </section>


    </SiteLayout>
  );
}

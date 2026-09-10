import { createFileRoute } from "@tanstack/react-router";

import { FaqAccordion } from "@/components/site/FaqAccordion";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { faqCategories } from "@/data/content";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions | Digitechademy" },
      {
        name: "description",
        content:
          "Find answers about Digitechademy courses, learning formats, practical training, eligibility, and enrollment.",
      },
      { property: "og:title", content: "Frequently Asked Questions | Digitechademy" },
      {
        property: "og:description",
        content: "Find answers about Digitechademy courses, learning formats, practical training, eligibility, and enrollment.",
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
        eyebrow="HELP & SUPPORT"
        title="Frequently Asked Questions"
        description="Find answers about Digitechademy courses, learning formats, practical training, eligibility, and enrollment."
      />

      <section className="bg-background">
        <div className="container-site section-y flex flex-col gap-8 sm:gap-10">
          {faqCategories.map((category) => (
            <div key={category.title} className="grid gap-6 lg:grid-cols-[0.55fr_1.45fr] lg:gap-10">
              <SectionHeading
                eyebrow="FAQ"
                title={category.title}
                align="left"
                as="h2"
                singleLine={false}
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

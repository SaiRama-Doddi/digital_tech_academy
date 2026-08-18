import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { BtnAnchor } from "@/components/site/Btn";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { PageHero } from "@/components/site/PageHero";
import { RequestCallForm } from "@/components/site/RequestCallForm";
import { SectionHeading } from "@/components/site/SectionHeading";
import { SiteLayout } from "@/components/site/SiteLayout";
import { homeFaqs } from "@/data/content";
import { site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Digital Tech Solution" },
      {
        name: "description",
        content:
          "Contact Digital Tech Solution for Digital Marketing and Cyber Security course enquiries — phone, WhatsApp, email and training centre address.",
      },
      { property: "og:title", content: "Contact Us | Digital Tech Solution" },
      {
        property: "og:description",
        content: "Call, WhatsApp, email or visit our training centre. We reply on the same working day.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const cards = [
    { icon: Phone, title: "Phone", value: site.phone, href: site.phoneHref, action: "Call now" },
    {
      icon: Mail,
      title: "Email",
      value: site.email,
      href: `mailto:${site.email}`,
      action: "Send an email",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: "Chat with admissions",
      href: whatsappLink(),
      action: "Open WhatsApp",
    },
    { icon: MapPin, title: "Training Center", value: site.address, action: site.city },
  ];

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Contact"
        title="Talk to Our Admissions Team"
        description="Questions about curriculum, batches, fees or career paths? Reach us on whichever channel suits you."
      />

      {/* Contact information */}
      <section className="bg-background">
        <div className="container-site section-y">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <article
                key={card.title}
                data-reveal
                className="hover-lift group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-card"
              >
                <span className="grid size-11 place-items-center rounded-md bg-accent-soft transition-transform duration-300 group-hover:scale-110">
                  <card.icon className="size-5 text-accent-foreground" aria-hidden="true" />
                </span>
                <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-muted-foreground">
                  {card.title}
                </h2>
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="break-words text-[0.95rem] font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-[0.95rem] font-semibold leading-relaxed text-foreground">{card.value}</p>
                )}
                <p className="mt-auto text-xs text-muted-foreground">{card.action}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface p-5">
            <Clock className="size-5 text-accent" aria-hidden="true" />
            <p className="text-sm font-semibold text-foreground">{site.hours}</p>
            <p className="text-sm text-muted-foreground">Enquiries outside these hours are answered next working day.</p>
          </div>
        </div>
      </section>

      {/* Enquiry form + location */}
      <section className="bg-surface">
        <div className="container-site section-y grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div data-reveal="left">
            <SectionHeading
              eyebrow="Enquiry Form"
              title="Send Us Your Details"
              description="Share your requirement and preferred call time — we'll take it from there."
              align="left"
              className="mb-6"
            />
            <RequestCallForm />
          </div>

          <div className="flex flex-col gap-4" data-reveal="right">
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
              <div
                className="surface-navy grid-lines flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 p-6 text-center"
                role="img"
                aria-label="Map placeholder for the training centre location"
              >
                <MapPin className="size-8 text-accent" aria-hidden="true" />
                <p className="text-sm font-bold text-navy-foreground">{site.city}</p>
                <p className="max-w-xs text-xs text-navy-muted">{site.address}</p>
                <p className="text-[0.7rem] uppercase tracking-[0.14em] text-navy-muted">
                  Map embed placeholder
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <BtnAnchor
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                variant="accent"
                size="md"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp Us
              </BtnAnchor>
              <BtnAnchor href={site.phoneHref} variant="primary" size="md">
                <Phone className="size-4" aria-hidden="true" />
                Call Us
              </BtnAnchor>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background">
        <div className="container-site section-y grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
          <SectionHeading
            eyebrow="Quick Answers"
            title="Before You Call"
            description="The questions we're asked most often."
            align="left"
          />
          <FaqAccordion items={homeFaqs} />
        </div>
      </section>
    </SiteLayout>
  );
}

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
        <div className="container-site py-10 lg:py-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <article
                key={card.title}
                data-reveal
                className="hover-lift group flex flex-col gap-3 rounded-xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <span className="grid size-11 place-items-center rounded-md bg-blue-50 transition-transform duration-300 group-hover:scale-110">
                  <card.icon className="size-5 text-blue-600" aria-hidden="true" />
                </span>
                <h2 className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
                  {card.title}
                </h2>
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="break-words text-[0.95rem] font-bold text-slate-800 transition-colors hover:text-blue-600"
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className="text-[0.95rem] font-bold leading-relaxed text-slate-800">{card.value}</p>
                )}
                <p className="mt-auto text-xs text-slate-400">{card.action}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-5">
            <Clock className="size-5 text-blue-500" aria-hidden="true" />
            <p className="text-sm font-bold text-slate-800">{site.hours}</p>
            <p className="text-sm text-slate-500">Enquiries outside these hours are answered next working day.</p>
          </div>
        </div>
      </section>

      {/* Enquiry form + location */}
      <section className="bg-surface">
        <div className="container-site py-10 lg:py-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <div data-reveal="left">
            <SectionHeading
              eyebrow="Enquiry Form"
              title="Send Us Your Details"
              description="Share your requirement and preferred call time — we'll take it from there."
              align="left"
              className="mb-5"
            />
            <RequestCallForm />
          </div>

          <div className="flex flex-col gap-4" data-reveal="right">
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
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
                variant="outline"
                size="md"
                className="border-slate-200 bg-white hover:border-blue-600 hover:text-blue-600 text-slate-700 h-11 rounded-lg"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp Us
              </BtnAnchor>
              <BtnAnchor href={site.phoneHref} variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 h-11 rounded-lg">
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

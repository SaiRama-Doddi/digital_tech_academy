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
      { title: "Talk to DIGITECHADEMY | Contact Us" },
      {
        name: "description",
        content:
          "Have questions about Cyber Security, Digital Marketing, or Programmatic Advertising courses? Connect with the DIGITECHADEMY team.",
      },
      { property: "og:title", content: "Talk to DIGITECHADEMY" },
      {
        property: "og:description",
        content:
          "Have questions about courses, schedules, or enrollment? Connect with DIGITECHADEMY.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const cards = [
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our admissions team about courses and enrollment.",
      value: site.phone,
      href: site.phoneHref,
      action: "Call now",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Send your questions and course enquiries to our team.",
      value: site.email,
      href: `mailto:${site.email}`,
      action: "Send an email",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Connect with DIGITECHADEMY for quick course and enrollment assistance.",
      value: "Chat on WhatsApp",
      href: whatsappLink(),
      action: "Open WhatsApp",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Connect with our team for training and admissions information.",
      value: site.address,
      action: site.city,
    },
  ];

  return (
    <SiteLayout>
      {/* Section 1 — Hero */}
      <PageHero
        eyebrow="CONTACT US"
        title="Talk to DIGITECHADEMY"
        description="Have questions about courses, schedules, or admissions? Our academic advisors are here to help."
      />

      {/* Section 2 — Contact Options */}
      <section className="bg-white">
        <div className="container-site py-5 sm:py-6 lg:py-7">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <article
                key={card.title}
                data-reveal
                className="hover-lift group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-5.5 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="grid size-11 place-items-center rounded-xl bg-accent/15 text-accent border border-accent/20 transition-transform duration-300 group-hover:scale-105">
                      <card.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="text-[0.65rem] font-black uppercase tracking-widest text-slate-400">
                      {card.action}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {card.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      title={card.value}
                      className="block truncate text-xs sm:text-[13px] font-bold text-accent transition-colors hover:underline"
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-xs sm:text-[13px] font-bold text-navy leading-relaxed">
                      {card.value}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-5">
            <Clock className="size-5 text-accent shrink-0" aria-hidden="true" />
            <p className="text-sm font-bold text-navy">{site.hours}</p>
            <span className="text-slate-300 hidden sm:inline">•</span>
            <p className="text-xs sm:text-sm text-slate-500">
              Enquiries outside these hours are answered next working day.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Enquiry Form */}
      <section className="bg-white border-t border-slate-200/80">
        <div className="container-site py-6 sm:py-8 lg:py-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 items-start">
          <div data-reveal="left">
            <SectionHeading
              eyebrow="ENQUIRY FORM"
              title="Tell Us What You Want to Learn"
              description="Share your requirement and preferred call time — we'll take it from there."
              align="left"
              singleLine={false}
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
                className="border border-slate-200/80 bg-white hover:border-accent hover:text-navy text-slate-700 h-11 rounded-xl font-bold"
              >
                <MessageCircle className="size-4 text-accent" aria-hidden="true" />
                WhatsApp Us
              </BtnAnchor>
              <BtnAnchor
                href={site.phoneHref}
                variant="primary"
                size="md"
                className="bg-accent hover:brightness-110 text-slate-950 font-black shadow-md shadow-accent/20 h-11 rounded-xl"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call Us
              </BtnAnchor>
            </div>

            {/* What to Expect Next — Balances the form height and eliminates the empty gap */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-extrabold text-navy">What Happens Next?</h3>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-blue-50 text-[#0C4FA8] border border-blue-200 text-[10px] font-bold">
                    1
                  </span>
                  <span>
                    <strong>15-Minute Callback:</strong> An academic counselor connects with you
                    during your chosen time slot.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-orange-50 text-[#E14E2E] border border-orange-200 text-[10px] font-bold">
                    2
                  </span>
                  <span>
                    <strong>Personalized Guidance:</strong> Understand curriculum details, live
                    projects, and career opportunities.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Clock, MessageCircle, Phone, ShieldCheck } from "lucide-react";

import { BtnAnchor } from "@/components/site/Btn";
import { PageHero } from "@/components/site/PageHero";
import { RequestCallForm } from "@/components/site/RequestCallForm";
import { SiteLayout } from "@/components/site/SiteLayout";
import { site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/request-call")({
  head: () => ({
    meta: [
      { title: "Request a Call | Digital Tech Solution" },
      {
        name: "description",
        content:
          "Request a free counselling call about our Digital Marketing and Cyber Security programs — batches, fees, curriculum and career guidance.",
      },
      { property: "og:title", content: "Request a Call | Digital Tech Solution" },
      {
        property: "og:description",
        content: "Share your details and our admissions team will call you at your preferred time.",
      },
      { property: "og:url", content: "/request-call" },
    ],
    links: [{ rel: "canonical", href: "/request-call" }],
  }),
  component: RequestCallPage,
});

function RequestCallPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Admissions"
        title="Request a Call"
        description="Tell us what you want to learn and when to reach you. A counsellor will call to guide you through the right program."
      />

      <section className="bg-background">
        <div className="container-site section-y grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div data-reveal="left">
            <RequestCallForm />
          </div>

          <aside className="flex flex-col gap-4" data-reveal="right">
            <div className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-base font-bold text-foreground">Prefer to talk right away?</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Call us during working hours or send a WhatsApp message — both reach the admissions
                team directly.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <BtnAnchor href={site.phoneHref} variant="primary" size="md">
                  <Phone className="size-4" aria-hidden="true" />
                  {site.phone}
                </BtnAnchor>
                <BtnAnchor
                  href={whatsappLink("Hi, I would like to request a call about your courses.")}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                  size="md"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Enquire on WhatsApp
                </BtnAnchor>
              </div>
            </div>

            <ul className="grid gap-3">
              {[
                { icon: Clock, title: "Working hours", text: site.hours },
                {
                  icon: ShieldCheck,
                  title: "No pressure, no spam",
                  text: "One counselling call to help you decide. Nothing more.",
                },
              ].map((item) => (
                <li
                  key={item.title}
                  className="flex gap-3 rounded-xl border border-border bg-surface p-4"
                >
                  <item.icon className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-bold text-foreground">{item.title}</span>
                    <span className="block text-xs text-muted-foreground">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}

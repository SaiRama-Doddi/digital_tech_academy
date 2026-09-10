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
        <div className="container-site py-6 sm:py-8 lg:py-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div data-reveal="left">
            <RequestCallForm />
          </div>

          <aside className="flex flex-col gap-4" data-reveal="right">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
              <h2 className="text-base font-extrabold text-slate-800">Prefer to talk right away?</h2>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500 text-justify">
                Call us during working hours or send a WhatsApp message — both reach the admissions
                team directly.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <BtnAnchor href={site.phoneHref} variant="primary" size="md" className="bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 h-11 rounded-lg">
                  <Phone className="size-4" aria-hidden="true" />
                  {site.phone}
                </BtnAnchor>
                <BtnAnchor
                  href={whatsappLink("Hi, I would like to request a call about your courses.")}
                  target="_blank"
                  rel="noreferrer"
                  variant="outline"
                  size="md"
                  className="border-slate-200 bg-white hover:border-blue-600 hover:text-blue-600 text-slate-700 h-11 rounded-lg"
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
                  className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4"
                >
                  <item.icon className="mt-0.5 size-5 shrink-0 text-blue-500" aria-hidden="true" />
                  <span>
                    <span className="block text-sm font-bold text-slate-800">{item.title}</span>
                    <span className="block text-xs text-slate-500 mt-0.5">{item.text}</span>
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

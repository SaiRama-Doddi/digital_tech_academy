import { createFileRoute } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  Copyright,
  CreditCard,
  FileCheck,
  Globe,
  Mail,
  RefreshCw,
  UserCheck,
} from "lucide-react";

import { BtnLink } from "@/components/site/Btn";
import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | DIGITECHADEMY" },
      {
        name: "description",
        content:
          "These terms govern your use of the DIGITECHADEMY website, course information, services, and related digital experiences.",
      },
      { property: "og:title", content: "Terms & Conditions | DIGITECHADEMY" },
      {
        property: "og:description",
        content:
          "These terms govern your use of the DIGITECHADEMY website, course information, services, and related digital experiences.",
      },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const sections = [
  {
    number: "02",
    label: "Section 2",
    title: "Website Use",
    icon: Globe,
    content:
      "You agree to use the website lawfully and responsibly and not to interfere with its operation, security, content, or services.",
  },
  {
    number: "03",
    label: "Section 3",
    title: "Course Information",
    icon: BookOpen,
    content:
      "Course names, curriculum, schedules, delivery formats, trainers, features, fees, and availability may change to reflect program updates or operational requirements. Current details should be confirmed before enrollment.",
  },
  {
    number: "04",
    label: "Section 4",
    title: "Enrollment & Payments",
    icon: CreditCard,
    content:
      "Enrollment is subject to program availability and completion of the applicable admission or payment process. Fees, payment schedules, cancellation terms, refunds, and other commercial conditions will be communicated for the selected program.",
  },
  {
    number: "05",
    label: "Section 5",
    title: "Intellectual Property",
    icon: Copyright,
    content:
      "Website content, course materials, branding, graphics, videos, documents, and other DIGITECHADEMY intellectual property may not be reproduced, distributed, resold, or commercially reused without permission.",
  },
  {
    number: "06",
    label: "Section 6",
    title: "User Responsibilities",
    icon: UserCheck,
    content:
      "Learners are responsible for providing accurate information, following applicable course rules, maintaining account security, and using learning materials only for permitted purposes.",
  },
  {
    number: "07",
    label: "Section 7",
    title: "Limitation of Liability",
    icon: AlertCircle,
    content:
      "DIGITECHADEMY aims to provide accurate and useful training information but does not guarantee a particular employment outcome, salary, promotion, certification result, or business result from course participation.",
  },
  {
    number: "08",
    label: "Section 8",
    title: "Changes",
    icon: RefreshCw,
    content:
      "These terms may be updated when services, policies, legal requirements, or website functionality change. Updated terms will apply from the date they are published.",
  },
  {
    number: "09",
    label: "Section 9",
    title: "Contact",
    icon: Mail,
    content:
      "For questions about these terms, contact DIGITECHADEMY through the contact information provided on the website.",
  },
];

function TermsPage() {
  return (
    <SiteLayout>
      {/* Section 1 — Hero */}
      <PageHero
        eyebrow="LEGAL & POLICIES"
        title="Terms & Conditions"
        description="Terms governing use of the DIGITECHADEMY website, courses, and educational services."
      />

      {/* Main Content */}
      <section className="bg-background py-8 sm:py-10 lg:py-12">
        <div className="container-site max-w-4xl">
          {/* Agreement Intro Card */}
          <div
            data-reveal
            className="mb-10 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent border border-accent/20">
                <FileCheck className="size-5" aria-hidden="true" />
              </span>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-accent">
                  AGREEMENT TO TERMS
                </span>
                <p className="text-xs text-slate-400 font-medium">Last updated: September 2026</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              Welcome to <strong className="font-black text-navy">DIGITECHADEMY</strong>. By accessing
              our website, browsing our curriculum, submitting course enquiries, or registering for
              training programs, you acknowledge and agree to the following terms and conditions.
            </p>
          </div>

          {/* Structured Terms Sections (2 to 9) */}
          <div className="space-y-6">
            {sections.map((sec) => (
              <article
                key={sec.number}
                data-reveal
                id={`section-${sec.number}`}
                className="hover-lift group rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent border border-accent/20 transition-transform duration-300 group-hover:scale-105">
                      <sec.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="text-xs font-black uppercase tracking-widest text-accent">
                        {sec.label}
                      </span>
                      <h2 className="text-lg sm:text-xl font-black text-navy leading-snug">
                        {`${sec.label} — ${sec.title}`}
                      </h2>
                    </div>
                  </div>
                  <span className="text-sm font-black text-slate-300 select-none">
                    {sec.number}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-justify">
                    {sec.content}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Support & Contact Card */}
          <div
            data-reveal
            className="mt-12 surface-navy relative overflow-hidden rounded-2xl p-8 sm:p-10 border border-navy-700/60 shadow-lg text-center sm:text-left"
          >
            <div className="grid-lines absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true" />
            <div
              className="pointer-events-none absolute -right-16 -bottom-16 size-64 rounded-full bg-accent/15 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="text-xs font-black uppercase tracking-widest text-accent">
                  QUESTIONS & ENQUIRIES
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Have Questions Regarding These Terms?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Speak with our admissions and administrative support team for any clarification on course
                  policies, schedules, or enrollment conditions.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <BtnLink
                  to="/contact"
                  variant="outline"
                  size="md"
                  className="border border-white/20 text-white hover:bg-white/10 h-11 px-5 rounded-xl font-bold"
                >
                  Contact Us
                </BtnLink>
                <BtnLink
                  to="/request-call"
                  variant="accent"
                  size="md"
                  className="bg-accent hover:brightness-110 text-slate-950 font-black h-11 px-5 rounded-xl shadow-md shadow-accent/20 flex items-center gap-2 group"
                >
                  <span>Talk to an Expert</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </BtnLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

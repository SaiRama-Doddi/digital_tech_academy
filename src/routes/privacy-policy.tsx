import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  FileText,
  Lock,
  Mail,
  PhoneCall,
  Share2,
  ShieldCheck,
  Sliders,
  UserCheck,
} from "lucide-react";

import { BtnLink } from "@/components/site/Btn";
import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | DIGITECHADEMY" },
      {
        name: "description",
        content:
          "Privacy policy for DIGITECHADEMY. Learn how we handle website analytics, information protection, cookies, and third-party services.",
      },
      { property: "og:title", content: "Privacy Policy | DIGITECHADEMY" },
      {
        property: "og:description",
        content:
          "Privacy policy for DIGITECHADEMY. Learn how we handle website analytics, information protection, cookies, and third-party services.",
      },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicyPage,
});

const sections = [
  {
    number: "01",
    label: "Section 1",
    title: "Information We Collect",
    icon: UserCheck,
    content:
      "We collect personal information that you provide to us when registering interest in a course, requesting a call, submitting an enquiry, or communicating with the DIGITECHADEMY admissions team. This may include your full name, phone number, email address, preferred call time, and areas of learning interest.",
  },
  {
    number: "02",
    label: "Section 2",
    title: "How We Use Your Information",
    icon: FileText,
    content:
      "We use the collected information to process course enquiries, coordinate callback requests, provide curriculum details, assist with enrollment procedures, and improve our website and educational offerings.",
  },
  {
    number: "03",
    label: "Section 3",
    title: "Communications & Enquiries",
    icon: PhoneCall,
    content:
      "When you submit an enquiry or request a call, our team may contact you via phone, email, or WhatsApp to assist you with program details, eligibility criteria, and upcoming batch schedules.",
  },
  {
    number: "04",
    label: "Section 4",
    title: "Website Analytics & Cookies",
    icon: BarChart2,
    content:
      "Our website may use analytics technologies and cookies to understand website usage, improve performance, maintain functionality, and provide a better user experience. Specific technologies used will depend on the website configuration.",
  },
  {
    number: "05",
    label: "Section 5",
    title: "Information Protection",
    icon: ShieldCheck,
    content:
      "DIGITECHADEMY takes reasonable measures to protect information submitted through the website. No online transmission or storage system can be guaranteed to be completely secure.",
  },
  {
    number: "06",
    label: "Section 6",
    title: "Third-Party Services",
    icon: Share2,
    content:
      "Certain website functions may use third-party services such as analytics, communication, hosting, payment, or marketing platforms. Information shared with such services is governed by their applicable policies and our configuration of those services.",
  },
  {
    number: "07",
    label: "Section 7",
    title: "Your Choices",
    icon: Sliders,
    content:
      "You may contact DIGITECHADEMY regarding questions about information submitted through the website or requests relating to applicable privacy rights.",
  },
  {
    number: "08",
    label: "Section 8",
    title: "Contact",
    icon: Mail,
    content:
      "For privacy-related questions, please contact DIGITECHADEMY through the contact information provided on our website.",
  },
];

function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      {/* Hero Section */}
      <PageHero
        eyebrow="LEGAL & PRIVACY"
        title="Privacy Policy"
        description="How DIGITECHADEMY collects, uses, and safeguards your information across our website and programs."
      />

      {/* Main Content */}
      <section className="bg-white py-6 sm:py-8">
        <div className="container-site max-w-4xl">
          {/* Policy Intro Card */}
          <div
            data-reveal
            className="mb-6 rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent border border-accent/20">
                <Lock className="size-5" aria-hidden="true" />
              </span>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-accent">
                  STATEMENT OF PRIVACY
                </span>
                <p className="text-xs text-slate-400 font-medium">Last updated: September 2026</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              At <strong className="font-black text-navy">DIGITECHADEMY</strong>, accessible from
              our website, protecting the privacy of our prospective students, enrolled learners,
              and visitors is essential to our educational mission. This document outlines how data
              and technology are managed across our online presence.
            </p>
          </div>

          {/* Structured Policy Sections */}
          <div className="space-y-5">
            {sections.map((sec) => (
              <article
                key={sec.number}
                data-reveal
                id={`section-${sec.number}`}
                className="hover-lift group rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-sm transition-all duration-300 hover:border-accent/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent border border-accent/20 transition-transform duration-300 group-hover:scale-105">
                      <sec.icon className="size-5" aria-hidden="true" />
                    </span>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                        {sec.label}
                      </span>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
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
            className="mt-8 relative overflow-hidden rounded-2xl p-6 sm:p-8 border border-blue-200/90 bg-gradient-to-br from-blue-50/90 via-white to-sky-50/70 shadow-sm text-center sm:text-left"
          >
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  QUESTIONS & ENQUIRIES
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                  Have Questions About Our Privacy Practices?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Speak with our admissions and administrative support team for any questions
                  regarding your information, courses, or enrollment.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <BtnLink
                  to="/contact"
                  variant="outline"
                  size="md"
                  className="border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 h-11 px-5 rounded-xl font-bold"
                >
                  Contact Us
                </BtnLink>
                <BtnLink
                  to="/request-call"
                  variant="primary"
                  size="md"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 px-5 rounded-xl shadow-md flex items-center gap-2 group"
                >
                  <span>Talk to an Expert</span>
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </BtnLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions | Digital Ascent Academy" },
      {
        name: "description",
        content: "Terms of service and usage conditions for Digital Ascent Academy.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Please read these terms and conditions carefully before using our services."
      />

      <section className="bg-background py-16">
        <div className="container-site max-w-4xl text-slate-700 leading-relaxed text-justify text-xs sm:text-sm">
          <div className="space-y-6">
            <p>
              Welcome to <strong>Digital Ascent Academy</strong>!
            </p>
            <p>
              These terms and conditions outline the rules and regulations for the use of Digital Ascent
              Academy's Website. By accessing this website, we assume you accept these terms and
              conditions. Do not continue to use Digital Ascent Academy if you do not agree to take all
              of the terms and conditions stated on this page.
            </p>

            <h2 className="text-lg font-bold text-slate-800 pt-4">1. Intellectual Property Rights</h2>
            <p>
              Unless otherwise stated, Digital Ascent Academy and/or its licensors own the intellectual
              property rights for all material on Digital Ascent Academy. All intellectual property
              rights are reserved. You may access this from Digital Ascent Academy for your own personal
              use subjected to restrictions set in these terms and conditions.
            </p>

            <h2 className="text-lg font-bold text-slate-800 pt-4">2. Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-650">
              <li>Publishing any website material in any other media;</li>
              <li>Selling, sublicensing and/or otherwise commercializing any website material;</li>
              <li>Publicly performing and/or showing any website material;</li>
              <li>Using this website in any way that is or may be damaging to this website;</li>
              <li>Using this website contrary to applicable laws and regulations.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-800 pt-4">3. Course Registration & Admittance</h2>
            <p>
              Any registration of interest or request for callback does not guarantee entry or batch
              allocation. Formal admission into programs (Digital Marketing or Cyber Security) is subject
              to intake availability, registration fees, and satisfying candidate requirements as
              assessed by our trainers.
            </p>

            <h2 className="text-lg font-bold text-slate-800 pt-4">4. Governing Law</h2>
            <p>
              These terms and conditions will be governed by and interpreted in accordance with the laws
              of the country of operation, and you submit to the non-exclusive jurisdiction of the state
              and federal courts located in the country of operation for the resolution of any disputes.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

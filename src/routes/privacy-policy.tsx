import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Digital Ascent Academy" },
      {
        name: "description",
        content: "Privacy policy and data protection terms for Digital Ascent Academy.",
      },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="Learn how Digital Ascent Academy collects, protects, and handles your personal information."
      />

      <section className="bg-background py-16">
        <div className="container-site max-w-4xl text-slate-700 leading-relaxed text-justify text-xs sm:text-sm">
          <div className="space-y-6">
            <p>
              At <strong>Digital Ascent Academy</strong>, accessible from our website, one of our main
              priorities is the privacy of our visitors. This Privacy Policy document contains types
              of information that is collected and recorded by Digital Ascent Academy and how we use it.
            </p>

            <h2 className="text-lg font-bold text-slate-800 pt-4">1. Information We Collect</h2>
            <p>
              We collect personal information that you provide to us when registering interest in a
              course, subscribing to our newsletter, requesting a callback, or otherwise contacting us.
              This may include your name, phone number, email address, and any details concerning your
              learning goals.
            </p>

            <h2 className="text-lg font-bold text-slate-800 pt-4">2. How We Use Your Information</h2>
            <p>
              We use the collected information to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Contact you regarding admission procedures, batches, and course structures.</li>
              <li>Provide, operate, and maintain our website.</li>
              <li>Improve, personalize, and expand our educational offerings.</li>
              <li>Understand and analyze how you use our platform.</li>
              <li>Send emails or marketing messages concerning digital marketing and security updates.</li>
            </ul>

            <h2 className="text-lg font-bold text-slate-800 pt-4">3. Log Files and Analytics</h2>
            <p>
              Digital Ascent Academy follows a standard procedure of using log files. These files log
              visitors when they visit websites. The information collected by log files includes internet
              protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp,
              referring/exit pages, and possibly the number of clicks. These are not linked to any
              information that is personally identifiable.
            </p>

            <h2 className="text-lg font-bold text-slate-800 pt-4">4. Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

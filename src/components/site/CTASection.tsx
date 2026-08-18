import { ArrowRight, PhoneCall } from "lucide-react";

import { BtnLink } from "./Btn";

type Props = {
  heading?: string | undefined;
  text?: string | undefined;
};

export function CTASection({
  heading = "Ready to Build Skills That Matter?",
  text = "Take the first step toward becoming confident, practical and career-ready.",
}: Props) {
  return (
    <section className="surface-navy relative overflow-hidden">
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="container-site relative section-y">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center" data-reveal>
          <span className="eyebrow text-accent">
            <span className="h-px w-6 bg-accent" aria-hidden="true" />
            Start Your Journey
          </span>
          <h2 className="text-3xl font-extrabold leading-[1.1] text-navy-foreground sm:text-4xl lg:text-5xl">
            {heading}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-navy-muted sm:text-lg">{text}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <BtnLink to="/courses" variant="accent" size="lg">
              Explore Courses
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </BtnLink>
            <BtnLink to="/request-call" variant="onDark" size="lg">
              <PhoneCall className="size-4" aria-hidden="true" />
              Request a Call
            </BtnLink>
          </div>
        </div>
      </div>
    </section>
  );
}

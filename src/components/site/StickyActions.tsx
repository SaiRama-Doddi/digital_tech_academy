import { MessageCircle, Phone } from "lucide-react";

import { site, whatsappLink } from "@/lib/site";

export function StickyActions() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 sm:bottom-6 sm:right-6">
      <a
        href={site.phoneHref}
        aria-label={`Call ${site.name}`}
        className="group relative grid size-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-all duration-300 hover:bg-accent hover:text-accent-foreground sm:size-14"
      >
        <Phone className="size-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:block">
          Call Now
        </span>
      </a>
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noreferrer"
        aria-label="Enquire on WhatsApp"
        className="group relative grid size-12 place-items-center rounded-full bg-accent text-accent-foreground shadow-accent animate-pulse-ring transition-all duration-300 hover:brightness-110 sm:size-14"
      >
        <MessageCircle className="size-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:block">
          WhatsApp Enquiry
        </span>
      </a>
    </div>
  );
}

import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { Logo } from "./Logo";
import { courses } from "@/data/courses";
import { navLinks, site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="surface-navy border-t border-navy-600/60">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div className="flex flex-col gap-4">
          <Logo onDark />
          <p className="max-w-sm text-sm leading-relaxed text-navy-muted">{site.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-foreground">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-navy-muted transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-foreground">
            Courses
          </h3>
          <ul className="mt-4 space-y-2.5">
            {courses.map((course) => (
              <li key={course.slug}>
                <Link
                  to="/courses/$slug"
                  params={{ slug: course.slug }}
                  className="text-sm text-navy-muted transition-colors hover:text-accent"
                >
                  {course.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-foreground">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-navy-muted">
            <li>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2.5 transition-colors hover:text-accent"
              >
                <Phone className="size-4 text-accent" aria-hidden="true" />
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 transition-colors hover:text-accent"
              >
                <MessageCircle className="size-4 text-accent" aria-hidden="true" />
                WhatsApp Enquiry
              </a>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 break-all transition-colors hover:text-accent"
              >
                <Mail className="size-4 shrink-0 text-accent" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{site.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-600/60">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-muted sm:flex-row">
          <p>© 2026 {site.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="transition-colors hover:text-accent">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-accent">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

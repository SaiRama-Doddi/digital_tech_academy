import { Link } from "@tanstack/react-router";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import { useState } from "react";

import { Logo } from "./Logo";
import { courses } from "@/data/courses";
import { navLinks, site, whatsappLink } from "@/lib/site";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="surface-navy relative border-t border-navy-600/50">
      {/* Premium subtle top gradient border glow */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container-site relative z-10 py-12 lg:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand Info & Newsletter */}
          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-5">
            <div>
              <Logo onDark />
              <p className="mt-3.5 max-w-md text-sm leading-relaxed text-navy-muted">
                {site.description}
              </p>
            </div>

            {/* Newsletter Subscription */}
            <div className="max-w-md rounded-xl border border-navy-600/30 bg-navy-700/20 p-5 backdrop-blur-sm">
              <h4 className="text-sm font-bold uppercase tracking-[0.12em] text-navy-foreground">
                Stay Updated
              </h4>
              <p className="mt-1 text-xs text-navy-muted">
                Subscribe to receive industry insights, resources, and batch updates.
              </p>
              {subscribed ? (
                <div className="mt-4 rounded-md bg-accent/10 border border-accent/20 px-3.5 py-2 text-xs font-semibold text-accent">
                  ✓ Thank you! You've been subscribed successfully.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                  <div className="relative flex-1">
                    <Mail
                      className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-navy-muted"
                      aria-hidden="true"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 w-full rounded-md border border-navy-600/60 bg-navy-700/30 pl-9 pr-3 text-xs text-navy-foreground placeholder-navy-muted transition-all focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md bg-accent px-4 text-xs font-bold text-accent-foreground shadow-accent transition-all duration-300 hover:brightness-110 active:scale-95"
                  >
                    <span>Subscribe</span>
                    <Send className="size-3" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Media Row */}
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
                { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
              ].map((social) => {
                const IconComp = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    className="grid size-9 place-items-center rounded-lg border border-navy-600/50 bg-navy-700/20 text-navy-muted transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-accent"
                  >
                    <IconComp className="size-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 lg:pl-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group relative inline-flex items-center text-sm text-navy-muted transition-colors hover:text-accent"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Column */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-foreground">
              Courses
            </h3>
            <ul className="mt-4 space-y-2.5">
              {courses.map((course) => (
                <li key={course.slug}>
                  <Link
                    to="/courses/$slug"
                    params={{ slug: course.slug }}
                    className="group relative inline-flex items-center text-sm text-navy-muted transition-colors hover:text-accent"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                      {course.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-navy-foreground">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-navy-muted">
              <li>
                <a
                  href={site.phoneHref}
                  className="group inline-flex items-start gap-3 transition-colors hover:text-accent"
                >
                  <Phone className="mt-0.5 size-4 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  <span>{site.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-start gap-3 transition-colors hover:text-accent"
                >
                  <MessageCircle className="mt-0.5 size-4 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  <span>WhatsApp Enquiry</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group inline-flex items-start gap-3 break-all transition-colors hover:text-accent"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-accent transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  <span>{site.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="leading-relaxed">{site.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom bar */}
      <div className="border-t border-navy-600/40 bg-navy/20">
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

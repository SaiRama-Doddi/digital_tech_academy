import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
} from "lucide-react";
import { useState, useEffect } from "react";

import { Logo } from "./Logo";
import { courses } from "@/data/courses";
import { navLinks, site, whatsappLink } from "@/lib/site";
import {
  subscribeCourses,
  getLocalCachedCourses,
  type FirebaseCourse,
} from "@/services/courseService";

function OfficialLinkedInIcon({ className = "size-9.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect width="36" height="36" rx="8" fill="#0A66C2" />
      <circle cx="10.5" cy="10" r="2.2" fill="#FFFFFF" />
      <path
        d="M8.5 14.5H12.5V26.5H8.5V14.5ZM15 14.5H18.8V16.3C19.4 15.1 20.9 14.2 22.7 14.2C26.3 14.2 27.5 16.4 27.5 20V26.5H23.5V20.5C23.5 18.8 23 17.5 21.5 17.5C20 17.5 19.3 18.7 19.3 20.3V26.5H15V14.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function OfficialTwitterIcon({ className = "size-9.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect width="36" height="36" rx="8" fill="#1DA1F2" />
      <path
        d="M28.5 12.6c-.9.4-1.8.7-2.8.8 1-.6 1.8-1.6 2.1-2.8-.9.6-2 1-3.1 1.2-.9-.9-2.2-1.5-3.6-1.5-2.7 0-4.9 2.2-4.9 4.9 0 .4 0 .8.1 1.1-4.1-.2-7.8-2.2-10.2-5.2-.4.7-.6 1.6-.6 2.5 0 1.7.9 3.2 2.2 4.1-.8 0-1.6-.2-2.3-.6v.1c0 2.4 1.7 4.4 4 4.8-.4.1-.9.2-1.3.2-.3 0-.7 0-1-.1.6 2 2.5 3.5 4.7 3.5-1.7 1.3-3.9 2.1-6.2 2.1-.4 0-.8 0-1.2-.1 2.2 1.4 4.9 2.3 7.7 2.3 9.2 0 14.3-7.6 14.3-14.3v-.6c1-.8 1.8-1.7 2.5-2.7z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function OfficialInstagramIcon({ className = "size-9.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="footer-ig-radial" cx="30%" cy="107%" r="110%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect width="36" height="36" rx="8" fill="url(#footer-ig-radial)" />
      <rect
        x="8.5"
        y="8.5"
        width="19"
        height="19"
        rx="5.5"
        stroke="#FFFFFF"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="18" cy="18" r="4.8" stroke="#FFFFFF" strokeWidth="2" fill="none" />
      <circle cx="23.2" cy="12.8" r="1.2" fill="#FFFFFF" />
    </svg>
  );
}

function OfficialYouTubeIcon({ className = "size-9.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect width="36" height="36" rx="8" fill="#FF0000" />
      <path d="M15 13L24 18L15 23V13Z" fill="#FFFFFF" />
    </svg>
  );
}

export function Footer() {
  const [liveCourses, setLiveCourses] =
    useState<Array<{ id: string; slug: string; title: string; active?: boolean }>>(courses);

  useEffect(() => {
    const cached = getLocalCachedCourses();
    if (cached && cached.length > 0) {
      setLiveCourses(cached);
    }
    const unsub = subscribeCourses((list) => {
      if (list && list.length > 0) {
        setLiveCourses(list);
      }
    });
    return () => unsub();
  }, []);

  return (
    <footer className="bg-white relative text-slate-700 border-t border-slate-200 overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. TOP BRAND ACCENT BORDER                                                */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#0C4FA8] via-[#E14E2E] to-[#0C4FA8]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-blue-500/5 blur-[120px]"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 2. MAIN MULTI-COLUMN FOOTER                                               */}
      {/* ========================================================================= */}
      <div className="container-site relative z-10 py-8 sm:py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 xl:gap-10">
          {/* Column 1: Brand & Description (4 cols on lg/xl) */}
          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-4 min-w-0">
            <div>
              <Logo />
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#0C4FA8]">
                <span>Digital Marketing</span>
                <span className="text-slate-400">•</span>
                <span>Programmatic Advertising</span>
                <span className="text-slate-400">•</span>
                <span>Cyber Security</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-md font-normal">
                Digitechademy is a practical learning platform focused on helping learners build
                relevant digital and technology skills through structured training, practical
                learning and expert guidance.
              </p>
              <p className="mt-2 text-xs font-bold text-[#E14E2E] tracking-wider uppercase">
                LEARN • GROW • ACHIEVE
              </p>
            </div>

            {/* Social Media Pills */}
            <div className="flex items-center gap-2.5">
              {[
                {
                  icon: OfficialLinkedInIcon,
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                  hoverShadow: "hover:shadow-md",
                },
                {
                  icon: OfficialTwitterIcon,
                  label: "Twitter",
                  href: "https://twitter.com",
                  hoverShadow: "hover:shadow-md",
                },
                {
                  icon: OfficialInstagramIcon,
                  label: "Instagram",
                  href: "https://instagram.com",
                  hoverShadow: "hover:shadow-md",
                },
                {
                  icon: OfficialYouTubeIcon,
                  label: "YouTube",
                  href: "https://youtube.com",
                  hoverShadow: "hover:shadow-md",
                },
              ].map((social) => {
                const IconComp = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Follow us on ${social.label}`}
                    className={`group relative rounded-xl transition-all duration-200 hover:-translate-y-1 hover:scale-105 active:scale-95 shadow-xs ${social.hoverShadow}`}
                  >
                    <IconComp className="size-9 rounded-xl block" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="md:col-span-1 lg:col-span-2 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-4 w-1 rounded-full bg-[#0C4FA8] shrink-0" />
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-slate-900 whitespace-nowrap">
                Navigation
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-1.5 text-slate-600 transition-all duration-200 hover:text-[#0C4FA8] hover:translate-x-1 w-full min-w-0 font-medium"
                  >
                    <ChevronRight className="size-3 text-[#0C4FA8] shrink-0 opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    <span className="truncate">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Courses (3 cols on lg/xl) */}
          <div className="md:col-span-1 lg:col-span-3 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-4 w-1 rounded-full bg-[#E14E2E] shrink-0" />
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-slate-900 whitespace-nowrap">
                Programs
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              {liveCourses
                .filter((c) => c.active !== false)
                .slice(0, 5)
                .map((course) => (
                  <li key={course.slug} className="min-w-0">
                    <Link
                      to="/courses/$slug"
                      params={{ slug: course.slug }}
                      className="group flex items-center gap-1.5 text-slate-600 transition-all duration-200 hover:text-[#0C4FA8] hover:translate-x-1 w-full min-w-0 overflow-hidden font-medium"
                    >
                      <ChevronRight className="size-3 text-[#E14E2E] shrink-0 opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                      <span className="truncate block min-w-0 flex-1">{course.title}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Column 4: Contact Information (3 cols on lg/xl) */}
          <div className="md:col-span-2 lg:col-span-3 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-4 w-1 rounded-full bg-[#0C4FA8] shrink-0" />
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-slate-900 whitespace-nowrap">
                Contact Us
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-[13px] text-slate-600 min-w-0">
              <li className="min-w-0">
                <a
                  href={site.phoneHref}
                  className="group flex items-start gap-2.5 rounded-xl p-1.5 -m-1.5 transition-colors hover:bg-blue-50/50 min-w-0"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-blue-50 border border-blue-200 text-[#0C4FA8] transition-all group-hover:bg-[#0C4FA8] group-hover:text-white group-hover:scale-110 shadow-xs">
                    <Phone className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-900 group-hover:text-[#0C4FA8] transition-colors truncate">
                      {site.phone}
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      Admissions Hotline
                    </span>
                  </div>
                </a>
              </li>
              <li className="min-w-0">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-2.5 rounded-xl p-1.5 -m-1.5 transition-colors hover:bg-orange-50/50 min-w-0"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-orange-50 border border-orange-200 text-[#E14E2E] transition-all group-hover:bg-[#E14E2E] group-hover:text-white group-hover:scale-110 shadow-xs">
                    <MessageCircle className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-900 group-hover:text-[#E14E2E] transition-colors truncate">
                      WhatsApp Enquiry
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      Instant Counselor Chat
                    </span>
                  </div>
                </a>
              </li>
              <li className="min-w-0">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-start gap-2.5 rounded-xl p-1.5 -m-1.5 transition-colors hover:bg-blue-50/50 min-w-0"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-blue-50 border border-blue-200 text-[#0C4FA8] transition-all group-hover:bg-[#0C4FA8] group-hover:text-white group-hover:scale-110 shadow-xs">
                    <Mail className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-900 group-hover:text-[#0C4FA8] transition-colors break-all text-xs xl:text-[13px] leading-snug">
                      {site.email}
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      Official Business Email
                    </span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-2.5 p-1.5 -m-1.5 min-w-0">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-orange-50 border border-orange-200 text-[#E14E2E] shadow-xs">
                  <MapPin className="size-3.5" />
                </span>
                <span className="leading-relaxed text-slate-600 text-[11.5px] min-w-0 flex-1">
                  {site.address}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. FOOTER BOTTOM COMPLETE LINKS & COPYRIGHT STRIP                          */}
      {/* ========================================================================= */}
      <div className="border-t border-slate-200 bg-slate-50/80 py-5">
        <div className="container-site flex flex-col items-center justify-between gap-4 text-xs text-slate-500 lg:flex-row">
          <p className="text-center sm:text-left">
            © 2026 <span className="font-bold text-slate-900">{site.name}</span>. All Rights Reserved.{" "}
            <span className="text-[#E14E2E] font-bold tracking-wider">
              LEARN • GROW • ACHIEVE
            </span>
          </p>

          <div className="flex items-center gap-x-3 text-[11.5px] text-slate-500">
            <Link to="/privacy-policy" className="transition-colors hover:text-[#0C4FA8]">
              Privacy Policy
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/terms" className="transition-colors hover:text-[#0C4FA8]">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

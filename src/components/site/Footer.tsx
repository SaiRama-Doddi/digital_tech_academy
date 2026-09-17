import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneCall,
  Send,
  Sparkles,
  Twitter,
  Youtube,
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

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const [liveCourses, setLiveCourses] = useState<Array<{ id: string; slug: string; title: string; active?: boolean }>>(() => {
    if (typeof window !== "undefined") {
      const cached = getLocalCachedCourses();
      if (cached.length > 0) return cached;
    }
    return courses;
  });

  useEffect(() => {
    const unsub = subscribeCourses((list) => {
      if (list && list.length > 0) {
        setLiveCourses(list);
      }
    });
    return () => unsub();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-[#020712] text-slate-300 border-t border-sky-500/20 overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* 1. TOP AMBIENT GLOW & MULTI-STOP BORDER                                   */}
      {/* ========================================================================= */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-blue-600/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 right-0 size-[500px] rounded-full bg-indigo-600/10 blur-[140px]"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 2. MAIN MULTI-COLUMN FOOTER                                               */}
      {/* ========================================================================= */}
      <div className="container-site relative z-10 py-10 sm:py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-12 xl:gap-10">
          {/* Column 1: Brand & Description (4 cols on lg/xl) */}
          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-4 min-w-0">
            <div>
              <Logo onDark />
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-400">
                <span>Digital Marketing</span>
                <span className="text-slate-600">•</span>
                <span>Programmatic Advertising</span>
                <span className="text-slate-600">•</span>
                <span>Cyber Security</span>
              </div>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-300 max-w-md font-normal">
                Digitechademy is a practical learning platform focused on helping learners build relevant digital and technology skills through structured training, practical learning and expert guidance.
              </p>
              <p className="mt-2 text-xs font-bold text-sky-300 tracking-wide">
                LEARN • GROW • ACHIEVE
              </p>
            </div>

            {/* VIP Newsletter Box */}
            <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-b from-[#081836]/90 to-[#040e21]/90 p-4 sm:p-5 shadow-xl backdrop-blur-md relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-wider text-sky-300 mb-1">
                <Sparkles className="size-3 text-amber-400" />
                <span>Industry Intelligence</span>
              </div>
              <h4 className="text-sm font-bold text-white tracking-wide">
                Get Practical Career Insights
              </h4>
              <p className="mt-1 text-xs text-slate-300 leading-relaxed font-normal">
                Free cheatsheets, curriculum updates, and interview roadmaps delivered weekly.
              </p>

              {subscribed ? (
                <div className="mt-3.5 rounded-xl bg-emerald-500/10 border border-emerald-400/30 px-3.5 py-2.5 text-xs font-semibold text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span>Thank you! You're subscribed to the weekly dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-3.5 flex gap-2">
                  <div className="relative flex-1">
                    <Mail
                      className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-sky-400"
                      aria-hidden="true"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-10 w-full rounded-xl border border-sky-500/25 bg-[#091d3d] pl-9 pr-3 text-xs text-white placeholder:text-slate-400 transition-all focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-4 text-xs font-bold text-white shadow-md shadow-sky-500/20 transition-all duration-200 hover:brightness-110 active:scale-95 cursor-pointer shrink-0"
                  >
                    <span>Subscribe</span>
                    <Send className="size-3" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Media Pills */}
            <div className="flex items-center gap-2.5">
              {[
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                  colors: "border-[#0077b5]/35 bg-[#0077b5]/15 text-[#38bdf8] hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:shadow-[#0077b5]/40",
                },
                {
                  icon: Twitter,
                  label: "Twitter",
                  href: "https://twitter.com",
                  colors: "border-sky-400/35 bg-sky-500/15 text-sky-400 hover:bg-sky-500 hover:text-white hover:border-sky-400 hover:shadow-sky-500/40",
                },
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "https://instagram.com",
                  colors: "border-pink-500/35 bg-pink-500/15 text-pink-400 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white hover:border-pink-400 hover:shadow-pink-500/40",
                },
                {
                  icon: Youtube,
                  label: "YouTube",
                  href: "https://youtube.com",
                  colors: "border-red-500/35 bg-red-500/15 text-red-500 hover:bg-red-600 hover:text-white hover:border-red-500 hover:shadow-red-500/40",
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
                    className={`grid size-9.5 place-items-center rounded-xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${social.colors}`}
                  >
                    <IconComp className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="md:col-span-1 lg:col-span-2 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-4 w-1 rounded-full bg-sky-500 shrink-0" />
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white whitespace-nowrap">
                Navigation
              </h3>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-[13px]">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="group flex items-center gap-1.5 text-slate-300 transition-all duration-200 hover:text-sky-300 hover:translate-x-1 w-full min-w-0"
                  >
                    <ChevronRight className="size-3 text-sky-400 shrink-0 opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    <span className="truncate">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Courses (3 cols on lg/xl with min-w-0 and clean truncate) */}
          <div className="md:col-span-1 lg:col-span-3 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-4 w-1 rounded-full bg-indigo-500 shrink-0" />
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white whitespace-nowrap">
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
                    className="group flex items-center gap-1.5 text-slate-300 transition-all duration-200 hover:text-sky-300 hover:translate-x-1 w-full min-w-0 overflow-hidden"
                  >
                    <ChevronRight className="size-3 text-indigo-400 shrink-0 opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    <span className="truncate block min-w-0 flex-1">{course.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information (3 cols on lg/xl with min-w-0) */}
          <div className="md:col-span-2 lg:col-span-3 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-4 w-1 rounded-full bg-emerald-500 shrink-0" />
              <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white whitespace-nowrap">
                Contact Us
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-[13px] text-slate-300 min-w-0">
              <li className="min-w-0">
                <a
                  href={site.phoneHref}
                  className="group flex items-start gap-2.5 rounded-xl p-1.5 -m-1.5 transition-colors hover:bg-white/[0.04] hover:text-white min-w-0"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-sky-500/15 border border-sky-400/30 text-sky-400 transition-all group-hover:bg-sky-500 group-hover:text-white group-hover:scale-110 shadow-sm shadow-sky-500/20">
                    <Phone className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block font-bold text-white group-hover:text-sky-300 transition-colors truncate">
                      {site.phone}
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Admissions Hotline</span>
                  </div>
                </a>
              </li>
              <li className="min-w-0">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start gap-2.5 rounded-xl p-1.5 -m-1.5 transition-colors hover:bg-white/[0.04] hover:text-white min-w-0"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 transition-all group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 shadow-sm shadow-emerald-500/20">
                    <MessageCircle className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                      WhatsApp Enquiry
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Instant Counselor Chat</span>
                  </div>
                </a>
              </li>
              <li className="min-w-0">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-start gap-2.5 rounded-xl p-1.5 -m-1.5 transition-colors hover:bg-white/[0.04] hover:text-white min-w-0"
                >
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-indigo-500/15 border border-indigo-400/30 text-indigo-400 transition-all group-hover:bg-indigo-500 group-hover:text-white group-hover:scale-110 shadow-sm shadow-indigo-500/20">
                    <Mail className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="block font-semibold text-white group-hover:text-indigo-300 transition-colors break-all text-xs xl:text-[13px] leading-snug">
                      {site.email}
                    </span>
                    <span className="block text-[11px] text-slate-400 mt-0.5">Official Business Email</span>
                  </div>
                </a>
              </li>
              <li className="flex items-start gap-2.5 p-1.5 -m-1.5 min-w-0">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-rose-500/15 border border-rose-400/30 text-rose-400 shadow-sm shadow-rose-500/20">
                  <MapPin className="size-3.5" />
                </span>
                <span className="leading-relaxed text-slate-300 text-[11.5px] min-w-0 flex-1">
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
      <div className="border-t border-white/[0.08] bg-[#01040a]/95 py-6">
        <div className="container-site flex flex-col items-center justify-between gap-4 text-xs text-slate-400 lg:flex-row">
          <p className="text-center sm:text-left">
            © 2026 <span className="font-bold text-white">{site.name}</span>. All Rights Reserved.{" "}
            <span className="text-sky-400 font-semibold tracking-wider">LEARN • GROW • ACHIEVE</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11.5px] text-slate-400">
            <Link to="/" className="transition-colors hover:text-sky-300">Home</Link>
            <span className="text-slate-700">|</span>
            <Link to="/about" className="transition-colors hover:text-sky-300">About</Link>
            <span className="text-slate-700">|</span>
            <Link to="/courses" className="transition-colors hover:text-sky-300">Programs</Link>
            <span className="text-slate-700">|</span>
            <Link to="/courses/digital-marketing" className="transition-colors hover:text-sky-300">Digital Marketing</Link>
            <span className="text-slate-700">|</span>
            <Link to="/courses/programmatic-advertising" className="transition-colors hover:text-sky-300">Programmatic Advertising</Link>
            <span className="text-slate-700">|</span>
            <Link to="/courses/cyber-security" className="transition-colors hover:text-sky-300">Cyber Security</Link>
            <span className="text-slate-700">|</span>
            <Link to="/testimonials" className="transition-colors hover:text-sky-300">Resources</Link>
            <span className="text-slate-700">|</span>
            <Link to="/faq" className="transition-colors hover:text-sky-300">FAQ</Link>
            <span className="text-slate-700">|</span>
            <Link to="/contact" className="transition-colors hover:text-sky-300">Contact</Link>
            <span className="text-slate-700">|</span>
            <Link to="/privacy-policy" className="transition-colors hover:text-sky-300">Privacy Policy</Link>
            <span className="text-slate-700">|</span>
            <Link to="/terms" className="transition-colors hover:text-sky-300">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

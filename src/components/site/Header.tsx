import { Link, useRouterState } from "@tanstack/react-router";
import { LogIn, Menu, PhoneCall, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BtnLink } from "./Btn";
import { Logo } from "./Logo";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (to: string) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <>
      {/* Top Announcement Promo Banner */}
      <div className="w-full bg-slate-50 border-b border-slate-100 py-2.5 px-4 text-center text-xs sm:text-sm font-bold text-slate-700 flex flex-wrap items-center justify-center gap-2">
        <span className="flex items-center gap-1.5">
          <span>🎁</span>
          <span>Limited Time Offer! Get 20% OFF on All Courses. Use Code:</span>
          <span className="text-blue-600 font-extrabold tracking-wide">DTS20</span>
        </span>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 py-1 text-[11px] font-bold shadow-sm shadow-blue-500/10 transition-all duration-300"
        >
          Enroll Now &rarr;
        </Link>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled
            ? "border-slate-200 bg-white/95 shadow-sm backdrop-blur-md"
            : "border-transparent bg-white/70 backdrop-blur-md",
        )}
      >
        <div
          className={cn(
            "container-site flex items-center justify-between gap-4 transition-all duration-300",
            scrolled ? "h-16" : "h-[4.75rem] lg:h-20",
          )}
        >
          <Logo />

          <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex h-full">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "py-1.5 text-sm font-bold transition-colors duration-200 h-full flex items-center",
                  isActive(link.to)
                    ? "text-blue-600"
                    : "text-slate-500 hover:text-blue-600"
                )}
              >
                <span className="relative py-1 flex items-center gap-1">
                  {link.label}
                  {link.label === "Courses" && <span className="text-[10px] ml-0.5 opacity-60">&#9662;</span>}
                  
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0 inset-x-0 h-0.5 origin-left rounded-full bg-blue-600 transition-all duration-300",
                      isActive(link.to) ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                    )}
                  />
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
            >
              <LogIn className="size-4" aria-hidden="true" />
              <span>Login</span>
            </Link>
            <BtnLink to="/request-call" size="sm" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-5 text-sm rounded-lg shadow-md shadow-blue-500/10 border-none flex items-center gap-1.5">
              <PhoneCall className="size-4" aria-hidden="true" />
              Request a Call
            </BtnLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-md border border-border text-foreground transition-colors hover:border-accent hover:text-accent lg:hidden"
          >
            {open ? <X className="size-5 rotate-90" /> : <Menu className="size-5" />}
          </button>
        </div>

        {/* Mobile navigation */}
        <div
          id="mobile-nav"
          className={cn(
            "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-300 lg:hidden",
            open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <nav aria-label="Mobile navigation" className="container-site flex flex-col gap-1.5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center justify-between rounded-lg px-4 py-2.5 text-sm font-bold border transition-all duration-300",
                  isActive(link.to)
                    ? "bg-blue-50 border-blue-100 text-blue-600 shadow-sm"
                    : "bg-transparent border-transparent text-slate-650 hover:bg-slate-50/60 hover:text-slate-900",
                )}
              >
                <span>
                  {link.label}
                  {link.label === "Courses" && <span className="text-[10px] ml-1 opacity-60">&#9662;</span>}
                </span>
                {isActive(link.to) ? <span className="size-1.5 rounded-full bg-blue-600" /> : null}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold text-slate-650 hover:bg-slate-50 hover:text-slate-900 transition-all duration-300"
            >
              <LogIn className="size-4" aria-hidden="true" />
              Login
            </Link>
            <BtnLink to="/request-call" className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 text-sm rounded-lg shadow-md shadow-blue-500/10 border-none" size="md">
              <PhoneCall className="size-4" aria-hidden="true" />
              Request a Call
            </BtnLink>
          </nav>
        </div>

        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className={cn(
            "fixed inset-0 top-[4.75rem] z-[-1] bg-navy/40 lg:hidden",
            open ? "block" : "hidden",
          )}
        >
          <X className="hidden" />
        </button>
      </header>
    </>
  );
}

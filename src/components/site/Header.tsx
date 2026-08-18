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
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-border bg-background/90 shadow-card backdrop-blur-xl"
          : "border-transparent bg-background/70 backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "container-site flex items-center justify-between gap-4 transition-all duration-300",
          scrolled ? "h-16" : "h-[4.75rem] lg:h-20",
        )}
      >
        <Logo />

        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                isActive(link.to) ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300",
                  isActive(link.to) ? "scale-x-100" : "scale-x-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Login
          </Link>
          <BtnLink to="/request-call" size="sm" variant="primary">
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
          {open ? <Menu className="size-5 rotate-90" /> : <Menu className="size-5" />}
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
        <nav aria-label="Mobile navigation" className="container-site flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center justify-between rounded-md px-3 py-3 text-[0.98rem] font-semibold transition-colors",
                isActive(link.to)
                  ? "bg-accent-soft text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {link.label}
              {isActive(link.to) ? <span className="size-1.5 rounded-full bg-accent" /> : null}
            </Link>
          ))}
          <Link
            to="/admin/login"
            className="flex items-center gap-2 rounded-md px-3 py-3 text-[0.98rem] font-semibold text-muted-foreground hover:text-foreground"
          >
            <LogIn className="size-4" aria-hidden="true" />
            Login
          </Link>
          <BtnLink to="/request-call" className="mt-2 w-full" size="md">
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
  );
}

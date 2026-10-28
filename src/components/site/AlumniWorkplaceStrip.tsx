import React from "react";
import { cn } from "@/lib/utils";

interface AlumniCompany {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

const ALUMNI_COMPANIES: AlumniCompany[] = [
  // 1. Omnicom Media Group (from reference image)
  {
    id: "omnicom",
    name: "Omnicom Media Group",
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-black text-slate-900 text-[15px] sm:text-[17px] tracking-[0.14em] uppercase leading-none">
          OMNICOM
        </span>
        <span className="font-extrabold text-[8px] sm:text-[9px] tracking-[0.26em] text-slate-500 uppercase mt-1 leading-none">
          MEDIA GROUP
        </span>
      </div>
    ),
  },

  // 2. Havas Media Group (from reference image)
  {
    id: "havas",
    name: "Havas Media Group",
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-black text-slate-900 text-[16px] sm:text-[18px] tracking-[0.16em] uppercase leading-none">
          HAVAS
        </span>
        <span className="font-extrabold text-[8px] sm:text-[9px] tracking-[0.24em] text-[#E14E2E] uppercase mt-1 leading-none">
          MEDIA GROUP
        </span>
      </div>
    ),
  },

  // 3. PGD - Publicis Groupe Digital (from reference image & user prompt)
  {
    id: "pgd",
    name: "PGD (Publicis Groupe)",
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-black text-[#0C4FA8] text-[20px] sm:text-[22px] tracking-[0.28em] uppercase leading-none">
          P G D
        </span>
        <span className="font-bold text-[7.5px] sm:text-[8.5px] tracking-[0.2em] text-slate-400 uppercase mt-1 leading-none">
          PUBLICIS GROUPE
        </span>
      </div>
    ),
  },

  // 4. TCS (from reference image)
  {
    id: "tcs",
    name: "Tata Consultancy Services",
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-black text-[22px] sm:text-[25px] lowercase tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#0C4FA8] via-indigo-600 to-[#E14E2E]">
          tcs
        </span>
        <span className="font-bold text-[7px] sm:text-[8px] tracking-[0.18em] text-slate-400 uppercase mt-1 leading-none">
          TATA CONSULTANCY SERVICES
        </span>
      </div>
    ),
  },

  // 5. Cognizant (from reference image & user prompt)
  {
    id: "cognizant",
    name: "Cognizant",
    renderLogo: () => (
      <div className="flex items-center gap-1.5 justify-center">
        <svg
          viewBox="0 0 24 24"
          className="size-4 sm:size-4.5 text-[#0C4FA8] shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M16 4h4v4" />
          <path d="M20 4l-9 9" />
          <path d="M4 14v6h6" />
        </svg>
        <span className="font-black text-[#0C4FA8] text-[17px] sm:text-[19px] lowercase tracking-tight leading-none">
          cognizant
        </span>
      </div>
    ),
  },

  // 6. HCL (from user prompt)
  {
    id: "hcl",
    name: "HCLTech",
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="flex items-baseline gap-1">
          <span className="font-black text-[#0C4FA8] text-[19px] sm:text-[21px] tracking-wider uppercase leading-none">
            HCL
          </span>
          <span className="font-bold text-[#E14E2E] text-[11px] sm:text-[12px] tracking-normal lowercase leading-none">
            Tech
          </span>
        </div>
        <span className="font-extrabold text-[7.5px] sm:text-[8.5px] tracking-[0.2em] text-slate-400 uppercase mt-1 leading-none">
          TECHNOLOGIES
        </span>
      </div>
    ),
  },

  // 7. Genpact (from user prompt)
  {
    id: "genpact",
    name: "Genpact",
    renderLogo: () => (
      <div className="flex items-center justify-center">
        <span className="font-black text-slate-900 text-[18px] sm:text-[20px] lowercase tracking-tight leading-none">
          genpact
        </span>
        <span className="size-2 rounded-full bg-[#E14E2E] ml-1 shrink-0" />
      </div>
    ),
  },

  // 8. Dentsu (from user prompt)
  {
    id: "dentsu",
    name: "Dentsu",
    renderLogo: () => (
      <div className="flex flex-col items-center justify-center text-center">
        <span className="font-black text-slate-900 text-[19px] sm:text-[21px] lowercase tracking-tight leading-none">
          dentsu
        </span>
        <span className="font-extrabold text-[7.5px] sm:text-[8.5px] tracking-[0.24em] text-[#E14E2E] uppercase mt-1 leading-none">
          GLOBAL NETWORK
        </span>
      </div>
    ),
  },
];

export function AlumniWorkplaceStrip({ className }: { className?: string }) {
  return (
    <section
      id="alumni-workplaces"
      className={cn(
        "bg-white relative py-8 sm:py-12 overflow-hidden border-b border-slate-200/80 select-none",
        className,
      )}
    >
      <div className="container-site text-center">
        {/* Centered Eyebrow & Title from Reference Screenshot */}
        <div className="max-w-2xl mx-auto space-y-1.5" data-reveal>
          <span className="inline-block text-[10.5px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#0C4FA8]">
            GLOBAL NETWORK
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Where Our Alumni Work
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto font-normal">
            Graduates from our programs work at leading global media networks, tech consulting giants, and Fortune 500 enterprises.
          </p>
        </div>
      </div>

      {/* Auto-scrolling Infinite Marquee Track (Left to Right) */}
      <div className="relative mt-6 sm:mt-8 overflow-hidden py-2" data-reveal>
        {/* Left & Right Gradient Mask Fades */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-28 z-20 bg-gradient-to-r from-white via-white/85 to-transparent"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-28 z-20 bg-gradient-to-l from-white via-white/85 to-transparent"
          aria-hidden="true"
        />

        {/* Continuous Marquee Track */}
        <div className="flex w-max animate-alumni-marquee hover:[animation-play-state:paused] active:[animation-play-state:paused]">
          {/* Primary Track */}
          <div className="flex items-center gap-3.5 sm:gap-5 pr-3.5 sm:pr-5 shrink-0">
            {ALUMNI_COMPANIES.map((company, idx) => (
              <div
                key={`alumni-a-${company.id}-${idx}`}
                className="h-[74px] sm:h-[82px] w-[185px] sm:w-[215px] px-5 py-3 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-md hover:border-[#0C4FA8] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center shrink-0 group cursor-default"
                title={company.name}
              >
                {company.renderLogo()}
              </div>
            ))}
          </div>

          {/* Duplicate Track for Seamless Infinite Loop */}
          <div
            className="flex items-center gap-3.5 sm:gap-5 pr-3.5 sm:pr-5 shrink-0"
            aria-hidden="true"
          >
            {ALUMNI_COMPANIES.map((company, idx) => (
              <div
                key={`alumni-b-${company.id}-${idx}`}
                className="h-[74px] sm:h-[82px] w-[185px] sm:w-[215px] px-5 py-3 rounded-2xl border border-slate-200/90 bg-white shadow-2xs hover:shadow-md hover:border-[#0C4FA8] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center shrink-0 group cursor-default"
                title={company.name}
              >
                {company.renderLogo()}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

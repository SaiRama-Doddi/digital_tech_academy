import React from "react";
import {
  Check,
  CheckCircle2,
  Sparkles,
  Users,
  Award,
  Target,
  Briefcase,
  TrendingUp,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Rocket,
  FileCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface PointItem {
  num: number;
  title?: string;
  body: string;
}

interface ParsedResult {
  paragraphs: string[];
  heading: string | null;
  points: PointItem[];
  bulletList: string[];
}

export function parseCourseRichText(rawText?: string | null): ParsedResult {
  if (!rawText || typeof rawText !== "string") {
    return { paragraphs: [], heading: null, points: [], bulletList: [] };
  }

  const text = rawText.replace(/\r\n/g, "\n").trim();
  if (!text) {
    return { paragraphs: [], heading: null, points: [], bulletList: [] };
  }

  // 1. Check if the text is primarily bullet points (- point, * point, • point)
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const bulletLines = lines.filter((l) => /^[-*•]\s+/.test(l));

  if (bulletLines.length >= 2 && bulletLines.length >= lines.length * 0.7) {
    const nonBulletIntro = lines.filter((l) => !/^[-*•]\s+/.test(l));
    return {
      paragraphs: nonBulletIntro,
      heading: null,
      points: [],
      bulletList: bulletLines.map((l) => l.replace(/^[-*•]\s+/, "").trim()),
    };
  }

  // 2. Check for numbered points (e.g. "1. ", "2. ", "1) ", "2) ")
  const pointMarker = /(?:^|\n|\s+)(?:(\d{1,2})[.)]\s+)/g;
  const matches = [...text.matchAll(pointMarker)];

  if (matches.length >= 2) {
    const firstPointIndex = matches[0]?.index ?? 0;
    let preamble = text.slice(0, firstPointIndex).trim();

    // Check if the tail of preamble is a section heading (e.g. "Core Pillars...:" or "Key Highlights")
    let heading: string | null = null;
    const headingCandidates = [
      /(?:^|\n|\.\s+)(Core Pillars of [^:\n.]+[:.]?)/i,
      /(?:^|\n|\.\s+)(Key Pillars[^:\n.]+[:.]?)/i,
      /(?:^|\n|\.\s+)(Practical Training Model[^:\n.]+[:.]?)/i,
      /(?:^|\n|\.\s+)(What You Will Learn[^:\n.]+[:.]?)/i,
      /(?:^|\n|\.\s+)(Core Focus Areas[^:\n.]+[:.]?)/i,
      /(?:^|\n|\.\s+)([A-Z][A-Za-z0-9\s&,/-]{4,50}:)/,
    ];

    for (const regex of headingCandidates) {
      const hMatch = preamble.match(regex);
      if (hMatch && hMatch[1]) {
        heading = hMatch[1].replace(/[:.]\s*$/, "").trim();
        // Remove the heading match from preamble
        preamble = preamble.replace(hMatch[0], ".").replace(/\.{2,}/g, ".").trim();
        break;
      }
    }

    const items: PointItem[] = [];
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      if (!match) continue;
      const nextMatch = matches[i + 1];
      const start = (match.index ?? 0) + match[0].length;
      const end = nextMatch?.index ?? text.length;
      const itemText = text.slice(start, end).trim();
      const num = parseInt(match[1] ?? `${i + 1}`, 10);

      let title = "";
      let body = itemText;

      const colonIdx = itemText.indexOf(":");
      const newlineIdx = itemText.indexOf("\n");
      const hyphenIdx = itemText.indexOf(" - ");
      const parenClose = itemText.indexOf(")");

      if (newlineIdx > 0 && newlineIdx < 90) {
        title = itemText.slice(0, newlineIdx).trim();
        body = itemText.slice(newlineIdx + 1).trim();
      } else if (colonIdx > 0 && colonIdx < 90) {
        title = itemText.slice(0, colonIdx).trim();
        body = itemText.slice(colonIdx + 1).trim();
      } else if (hyphenIdx > 0 && hyphenIdx < 90) {
        title = itemText.slice(0, hyphenIdx).trim();
        body = itemText.slice(hyphenIdx + 3).trim();
      } else if (parenClose > 10 && parenClose < 90) {
        title = itemText.slice(0, parenClose + 1).trim();
        body = itemText.slice(parenClose + 1).trim();
      } else {
        const splitRegex =
          /(?:\n|\s+)(Instead of|Every module|Work through|Receive|Gain|Build|You will|Learners will|Students will)\b/i;
        const splitMatch = itemText.match(splitRegex);
        if (splitMatch && splitMatch.index && splitMatch.index > 5 && splitMatch.index < 90) {
          title = itemText.slice(0, splitMatch.index).trim();
          body = itemText.slice(splitMatch.index).trim();
        } else {
          const dotIdx = itemText.indexOf(". ");
          if (dotIdx > 0 && dotIdx < 60) {
            title = itemText.slice(0, dotIdx).trim();
            body = itemText.slice(dotIdx + 1).trim();
          } else if (itemText.length < 80) {
            title = itemText;
            body = "";
          }
        }
      }

      items.push({ num, title, body });
    }

    const paragraphs = preamble
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    return { paragraphs, heading, points: items, bulletList: [] };
  }

  // 3. Fallback: regular paragraphs separated by newlines
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return { paragraphs, heading: null, points: [], bulletList: [] };
}

export function parseListItems(input: string[] | string | undefined | null): PointItem[] {
  if (!input) return [];

  if (Array.isArray(input)) {
    const rawList = input.map((i) => String(i).trim()).filter(Boolean);
    if (rawList.length > 0) {
      return rawList.map((item, idx) => {
        const clean = item.replace(/^(\d+[.)]\s*|[-*•]\s*)/, "").trim();
        const colonIdx = clean.indexOf(":");
        const hyphenIdx = clean.indexOf(" - ");
        let title = clean;
        let body = "";

        if (colonIdx > 0 && colonIdx < 60) {
          title = clean.slice(0, colonIdx).trim();
          body = clean.slice(colonIdx + 1).trim();
        } else if (hyphenIdx > 0 && hyphenIdx < 60) {
          title = clean.slice(0, hyphenIdx).trim();
          body = clean.slice(hyphenIdx + 3).trim();
        }

        return { num: idx + 1, title, body };
      });
    }
  }

  if (typeof input === "string") {
    const str = input.trim();
    if (!str) return [];

    if (str.includes("\n")) {
      const lines = str.split("\n").map((l) => l.trim()).filter(Boolean);
      return parseListItems(lines);
    }

    if (/(?:^|\s)\d{1,2}[.)]\s+/.test(str)) {
      const matches = [...str.matchAll(/(?:^|\s)(\d{1,2})[.)]\s+/g)];
      if (matches.length >= 2) {
        const items: string[] = [];
        for (let i = 0; i < matches.length; i++) {
          const match = matches[i];
          if (!match) continue;
          const nextMatch = matches[i + 1];
          const start = (match.index ?? 0) + match[0].length;
          const end = nextMatch?.index ?? str.length;
          items.push(str.slice(start, end).trim());
        }
        return parseListItems(items);
      }
    }

    if (str.includes(",")) {
      const parts = str
        .replace(/\sand\s/gi, ", ")
        .split(",")
        .map((p) => p.replace(/\.$/, "").trim())
        .filter((p) => p.length > 2);
      if (parts.length >= 2) {
        return parseListItems(parts);
      }
    }

    return [{ num: 1, title: str, body: "" }];
  }

  return [];
}

export function renderFormattedMarkdown(text?: string | null) {
  if (!text) return null;
  if (!text.includes("**")) return text;

  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-slate-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

interface CourseRichDescriptionProps {
  content?: string | null;
  className?: string;
  defaultHeading?: string;
}

export function CourseRichDescription({
  content,
  className,
  defaultHeading,
}: CourseRichDescriptionProps) {
  if (!content) return null;

  const parsed = parseCourseRichText(content);
  const activeHeading = parsed.heading || defaultHeading;

  return (
    <div className={cn("space-y-4 text-left", className)}>
      {/* Intro Paragraphs */}
      {parsed.paragraphs.map((para, idx) => (
        <p
          key={idx}
          className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify"
        >
          {renderFormattedMarkdown(para)}
        </p>
      ))}

      {/* Bullet Points List if formatted with dashes/bullets */}
      {parsed.bulletList.length > 0 && (
        <ul className="space-y-2.5 my-3 pl-1">
          {parsed.bulletList.map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed text-left"
            >
              <CheckCircle2 className="size-4 text-indigo-600 shrink-0 mt-0.5" />
              <span>{renderFormattedMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Structured Numbered Points Section */}
      {parsed.points.length > 0 && (
        <div className="space-y-3 pt-2">
          {activeHeading && (
            <div className="flex items-center gap-2 mb-3">
              <span className="grid size-6 place-items-center rounded-lg bg-indigo-50 text-indigo-600">
                <Sparkles className="size-3.5" />
              </span>
              <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                {activeHeading}
              </h4>
            </div>
          )}

          <div className="grid gap-3">
            {parsed.points.map((pt) => {
              const displayNum = pt.num < 10 ? `0${pt.num}` : `${pt.num}`;
              return (
                <div
                  key={pt.num}
                  className="flex items-start gap-3.5 p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50/70 via-white to-white hover:border-indigo-400 hover:shadow-xs transition-all duration-200 text-left"
                >
                  <span className="grid size-7 sm:size-8 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white font-black text-xs sm:text-[13px] shadow-xs shrink-0 mt-0.5 select-none">
                    {displayNum}
                  </span>
                  <div className="space-y-1 min-w-0 flex-1">
                    {pt.title && (
                      <h5 className="font-bold text-xs sm:text-sm text-slate-950 leading-snug">
                        {renderFormattedMarkdown(pt.title)}
                      </h5>
                    )}
                    {pt.body && (
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                        {renderFormattedMarkdown(pt.body)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export interface ParsedAudienceData {
  preamble: string | null;
  items: PointItem[];
}

export function parseAudienceData(input: string[] | string | undefined | null): ParsedAudienceData {
  if (!input) return { preamble: null, items: [] };

  let rawList: string[] = [];
  if (Array.isArray(input)) {
    rawList = input.map((i) => String(i).trim()).filter(Boolean);
  } else if (typeof input === "string") {
    rawList = input.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  }

  if (rawList.length === 0) {
    return { preamble: null, items: [] };
  }

  let preamble: string | null = null;
  const items: PointItem[] = [];

  // Check if first item is a lead paragraph/preamble
  const first = rawList[0];
  let startIndex = 0;
  if (first) {
    const cleanFirst = first.replace(/^(\d+[.)]\s*|[-*•]\s*)/, "").trim();
    const colonIdx = cleanFirst.indexOf(":");
    // If colon is near the end or no colon and long sentence, or explicitly intro wording
    if (
      colonIdx >= cleanFirst.length - 2 ||
      (colonIdx === -1 && cleanFirst.length > 65) ||
      cleanFirst.toLowerCase().includes("meticulously designed") ||
      cleanFirst.toLowerCase().includes("course is designed")
    ) {
      preamble = cleanFirst.replace(/:\s*$/, "");
      startIndex = 1;
    }
  }

  for (let i = startIndex; i < rawList.length; i++) {
    const raw = rawList[i];
    if (!raw) continue;
    const clean = raw.replace(/^(\d+[.)]\s*|[-*•]\s*)/, "").trim();
    const colonIdx = clean.indexOf(":");
    const hyphenIdx = clean.indexOf(" - ");
    let title = clean;
    let body = "";

    if (colonIdx > 0 && colonIdx < 70) {
      title = clean.slice(0, colonIdx).trim();
      body = clean.slice(colonIdx + 1).trim();
    } else if (hyphenIdx > 0 && hyphenIdx < 70) {
      title = clean.slice(0, hyphenIdx).trim();
      body = clean.slice(hyphenIdx + 3).trim();
    }

    items.push({
      num: items.length + 1,
      title,
      body,
    });
  }

  return { preamble, items };
}

interface AudienceSectionProps {
  audience?: string[] | null | undefined;
  audienceDescription?: string | null | undefined;
  className?: string | undefined;
}

const AUDIENCE_ACCENTS = [
  {
    icon: Target,
    badgeBg: "bg-blue-50 text-blue-600 border-blue-200/80 group-hover:bg-blue-600 group-hover:text-white",
    borderHover: "hover:border-blue-400 hover:shadow-blue-500/10",
  },
  {
    icon: TrendingUp,
    badgeBg: "bg-indigo-50 text-indigo-600 border-indigo-200/80 group-hover:bg-indigo-600 group-hover:text-white",
    borderHover: "hover:border-indigo-400 hover:shadow-indigo-500/10",
  },
  {
    icon: Briefcase,
    badgeBg: "bg-violet-50 text-violet-600 border-violet-200/80 group-hover:bg-violet-600 group-hover:text-white",
    borderHover: "hover:border-violet-400 hover:shadow-violet-500/10",
  },
  {
    icon: Users,
    badgeBg: "bg-cyan-50 text-cyan-700 border-cyan-200/80 group-hover:bg-cyan-600 group-hover:text-white",
    borderHover: "hover:border-cyan-400 hover:shadow-cyan-500/10",
  },
  {
    icon: GraduationCap,
    badgeBg: "bg-emerald-50 text-emerald-600 border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white",
    borderHover: "hover:border-emerald-400 hover:shadow-emerald-500/10",
  },
  {
    icon: Laptop,
    badgeBg: "bg-amber-50 text-amber-700 border-amber-200/80 group-hover:bg-amber-600 group-hover:text-white",
    borderHover: "hover:border-amber-400 hover:shadow-amber-500/10",
  },
];

export function WhoShouldAttendPoints({
  audience,
  audienceDescription,
  className,
}: AudienceSectionProps) {
  const { preamble, items } = parseAudienceData(
    audience && audience.length > 0 ? audience : audienceDescription,
  );

  const displayItems =
    items.length > 0
      ? items
      : [
          {
            num: 1,
            title: "Students & Graduates",
            body: "Aspiring to build high-growth, in-demand technical careers in modern industry sectors.",
          },
          {
            num: 2,
            title: "Working Professionals",
            body: "Looking to upskill, transition into higher-paying domains, or master live platform workflows.",
          },
          {
            num: 3,
            title: "Performance & Media Marketers",
            body: "Seeking hands-on enterprise platform execution and data-driven optimization strategies.",
          },
          {
            num: 4,
            title: "Career Switchers",
            body: "Moving from traditional or non-technical backgrounds into certified high-growth tech positions.",
          },
        ];

  return (
    <div
      className={cn(
        "rounded-2xl border border-blue-200/90 bg-gradient-to-br from-white via-blue-50/20 to-indigo-50/30 p-6 sm:p-7 shadow-xs space-y-5",
        className,
      )}
    >
      {/* Distinct Header with Gradient Icon & Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-blue-100/80">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs shrink-0">
            <Users className="size-5" />
          </span>
          <div className="text-left">
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Who Should Attend This Training?
            </h3>
            <p className="text-xs text-slate-500">
              Target learner profiles, industry aspirants, and eligibility criteria
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-2xs">
          <Target className="size-3.5 text-blue-600" />
          <span>Tailored Career Tracks</span>
        </span>
      </div>

      {/* Preamble Callout Banner if present */}
      {preamble && (
        <div className="rounded-xl border border-blue-200/90 bg-gradient-to-r from-blue-50/90 via-indigo-50/40 to-white p-4 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-3 shadow-2xs text-left">
          <span className="grid size-6 place-items-center rounded-lg bg-blue-600 text-white shrink-0 mt-0.5">
            <Sparkles className="size-3.5" />
          </span>
          <p className="font-medium text-slate-800 leading-snug">{preamble}</p>
        </div>
      )}

      {/* Responsive Persona Grid */}
      <div className="grid gap-3.5 sm:grid-cols-2 pt-1">
        {displayItems.map((pt, idx) => {
          const accent = AUDIENCE_ACCENTS[idx % AUDIENCE_ACCENTS.length] ?? AUDIENCE_ACCENTS[0]!;
          const IconComponent = accent.icon;

          return (
            <div
              key={pt.num}
              className={cn(
                "group flex items-start gap-3.5 p-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/40 transition-all duration-200 text-left shadow-2xs",
                accent.borderHover,
              )}
            >
              {/* Distinctive Left Avatar Badge */}
              <span
                className={cn(
                  "grid size-8.5 place-items-center rounded-xl border font-bold text-xs shrink-0 mt-0.5 transition-all duration-200 shadow-2xs",
                  accent.badgeBg,
                )}
              >
                <IconComponent className="size-4" />
              </span>

              {/* Persona Content */}
              <div className="space-y-1 min-w-0 flex-1">
                <h5 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug text-left">
                  {renderFormattedMarkdown(pt.title)}
                </h5>
                {pt.body && (
                  <p className="text-xs text-slate-600 leading-relaxed mt-0.5 text-left [text-align:left] [text-justify:none] [word-spacing:normal]">
                    {renderFormattedMarkdown(pt.body)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export interface ParsedOutcomesData {
  preamble: string | null;
  items: PointItem[];
  note: string | null;
}

export function parseOutcomesData(input: string[] | string | undefined | null): ParsedOutcomesData {
  if (!input) return { preamble: null, items: [], note: null };

  let rawList: string[] = [];
  if (Array.isArray(input)) {
    rawList = input.map((i) => String(i).trim()).filter(Boolean);
  } else if (typeof input === "string") {
    rawList = input.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  }

  if (rawList.length === 0) {
    return { preamble: null, items: [], note: null };
  }

  let preamble: string | null = null;
  let note: string | null = null;
  const items: PointItem[] = [];

  // Check if first item is preamble
  const first = rawList[0];
  let startIndex = 0;
  if (first) {
    const cleanFirst = first.replace(/^(\d+[.)]\s*|[-*•]\s*)/, "").trim();
    const colonIdx = cleanFirst.indexOf(":");
    if (
      colonIdx >= cleanFirst.length - 2 ||
      (colonIdx === -1 && cleanFirst.length > 60) ||
      cleanFirst.toLowerCase().includes("graduates") ||
      cleanFirst.toLowerCase().includes("career outcomes")
    ) {
      preamble = cleanFirst.replace(/:\s*$/, "");
      startIndex = 1;
    }
  }

  for (let i = startIndex; i < rawList.length; i++) {
    const raw = rawList[i];
    if (!raw) continue;
    const clean = raw.replace(/^(\d+[.)]\s*|[-*•]\s*)/, "").trim();

    // Check if it's a note / disclaimer
    if (
      clean.toLowerCase().startsWith("(note") ||
      clean.toLowerCase().startsWith("note:") ||
      clean.toLowerCase().includes("indicative salary")
    ) {
      note = clean.replace(/^\(?note:?\s*/i, "").replace(/\)$/, "").trim();
      continue;
    }

    // Check if it's a subheader or section label
    if (
      clean.endsWith(":") ||
      clean.toLowerCase().startsWith("primary career paths") ||
      clean.toLowerCase().includes("salary benchmark") ||
      clean.toLowerCase().startsWith("salary range")
    ) {
      continue;
    }

    const colonIdx = clean.indexOf(":");
    const hyphenIdx = clean.indexOf(" - ");
    let title = clean;
    let body = "";

    if (colonIdx > 0 && colonIdx < 60) {
      title = clean.slice(0, colonIdx).trim();
      body = clean.slice(colonIdx + 1).trim();
    } else if (hyphenIdx > 0 && hyphenIdx < 60) {
      title = clean.slice(0, hyphenIdx).trim();
      body = clean.slice(hyphenIdx + 3).trim();
    }

    items.push({
      num: items.length + 1,
      title,
      body,
    });
  }

  return { preamble, items, note };
}

interface OutcomesSectionProps {
  outcomes?: string[] | null | undefined;
  className?: string | undefined;
}

export function CareerOutcomesPoints({
  outcomes,
  className,
}: OutcomesSectionProps) {
  const { preamble, items, note } = parseOutcomesData(outcomes);

  const displayItems =
    items.length > 0
      ? items
      : [
          {
            num: 1,
            title: "Job-Ready Campaign Portfolio",
            body: "Walk into technical interviews with verifiable, real-world case studies and live project repositories.",
          },
          {
            num: 2,
            title: "Industry-Recognized Credential",
            body: "Earn an accredited course completion certificate verified by certified industry instructors.",
          },
          {
            num: 3,
            title: "Technical Mock Interviews",
            body: "Practice simulated live interview drills with specialized mentor feedback on technical questions.",
          },
          {
            num: 4,
            title: "100% Placement & Career Support",
            body: "Get direct resume reviews, ATS optimization, and access to partner hiring networks.",
          },
        ];

  return (
    <div
      className={cn(
        "rounded-2xl border border-emerald-200/90 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-6 sm:p-7 shadow-xs space-y-5",
        className,
      )}
    >
      {/* Distinct Emerald Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-emerald-100">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-xs shrink-0">
            <Award className="size-5" />
          </span>
          <div className="text-left">
            <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
              Career Outcomes &amp; Skills Acquired
            </h3>
            <p className="text-xs text-slate-500">
              Verifiable competencies, portfolio assets, and career readiness
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 self-start sm:self-center px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 shadow-2xs">
          <ShieldCheck className="size-3.5 text-emerald-600" />
          <span>Industry Validated</span>
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-left">
        {preamble ||
          "Graduates from this program gain working competence, resume-ready portfolio projects, and direct preparation for high-demand technical roles across the industry."}
      </p>

      {/* Responsive Verified Skill Cards */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 pt-1 items-stretch">
        {displayItems.map((pt) => {
          const isSalary =
            pt.body?.includes("₹") ||
            pt.body?.toLowerCase().includes("lpa") ||
            pt.title?.toLowerCase().includes("salary");

          return (
            <div
              key={pt.num}
              className="group flex flex-col justify-between p-4 rounded-xl border border-emerald-200/80 bg-white hover:border-emerald-500 hover:shadow-md transition-all duration-200 text-left shadow-2xs h-full"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "grid size-7 place-items-center rounded-lg font-black text-xs shrink-0 transition-colors",
                      isSalary
                        ? "bg-amber-50 text-amber-700 border border-amber-200/80 group-hover:bg-amber-600 group-hover:text-white"
                        : "bg-emerald-50 text-emerald-600 border border-emerald-200/80 group-hover:bg-emerald-600 group-hover:text-white",
                    )}
                  >
                    <Check className="size-4 stroke-[2.5]" />
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md",
                      isSalary
                        ? "text-amber-800 bg-amber-50 border border-amber-200/70"
                        : "text-emerald-700 bg-emerald-50/80 border border-emerald-200/60",
                    )}
                  >
                    {isSalary ? "Salary Benchmark" : "Verified Role"}
                  </span>
                </div>
                <h5 className="font-bold text-xs sm:text-sm text-slate-950 leading-snug pt-1 text-left">
                  {renderFormattedMarkdown(pt.title)}
                </h5>
                {pt.body && (
                  <p className="text-xs text-slate-600 leading-relaxed text-left [text-align:left] [text-justify:none] [word-spacing:normal]">
                    {renderFormattedMarkdown(pt.body)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Note / Salary Footnote Banner if present */}
      {note && (
        <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/40 p-3.5 text-xs text-slate-600 text-left flex items-start gap-2.5">
          <span className="font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-200/70 text-[10px] uppercase px-2 py-0.5 rounded-md shrink-0">
            Note
          </span>
          <p className="leading-relaxed text-[11px] sm:text-xs text-slate-600">{note}</p>
        </div>
      )}

      {/* Career Launchpad Proof Points */}
      <div className="pt-2 border-t border-emerald-100/80">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { icon: FileCheck, label: "Live Portfolio Projects" },
            { icon: ShieldCheck, label: "Authorized Certification" },
            { icon: Rocket, label: "1-on-1 Interview Prep" },
            { icon: Users, label: "Hiring Partner Referrals" },
          ].map((item, idx) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200/60 text-emerald-900 text-xs font-semibold"
              >
                <ItemIcon className="size-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] leading-tight font-bold">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

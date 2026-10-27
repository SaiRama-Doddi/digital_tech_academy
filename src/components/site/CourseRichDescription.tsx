import React from "react";
import { Check, CheckCircle2, Sparkles, Users, Award } from "lucide-react";
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
    const firstPointIndex = matches[0].index;
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
      const start = match.index + match[0].length;
      const end = i + 1 < matches.length ? matches[i + 1].index : text.length;
      const itemText = text.slice(start, end).trim();
      const num = parseInt(match[1], 10);

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
          const start = match.index + match[0].length;
          const end = i + 1 < matches.length ? matches[i + 1].index : str.length;
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
          className="text-xs sm:text-sm text-slate-700 leading-relaxed text-left"
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

interface AudienceSectionProps {
  audience?: string[] | null;
  audienceDescription?: string | null;
  className?: string;
}

export function WhoShouldAttendPoints({
  audience,
  audienceDescription,
  className,
}: AudienceSectionProps) {
  let items = parseListItems(audience && audience.length > 0 ? audience : audienceDescription);

  if (items.length === 0) {
    items = [
      {
        num: 1,
        title: "Students & Graduates",
        body: "Aspiring to build high-growth, in-demand technical careers.",
      },
      {
        num: 2,
        title: "Working Professionals",
        body: "Looking to switch domains or master live enterprise platforms.",
      },
      {
        num: 3,
        title: "Career Transitioners",
        body: "Moving from non-technical backgrounds into certified technology roles.",
      },
      {
        num: 4,
        title: "Freelancers & Consultants",
        body: "Aiming to manage direct campaigns, audits, and commercial client projects.",
      },
    ];
  }

  return (
    <div
      className={cn(
        "bg-white border border-slate-300 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 pb-1 border-b border-slate-100">
        <span className="grid size-8 place-items-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200/60 font-black text-xs shrink-0">
          <Users className="size-4.5" />
        </span>
        <div className="text-left">
          <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Who Should Attend This Training?
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Target learner profiles, industry aspirants, and eligibility
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 pt-1">
        {items.map((pt) => (
          <div
            key={pt.num}
            className="group flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border border-slate-200/85 bg-gradient-to-br from-slate-50/70 via-white to-white hover:border-blue-500 hover:shadow-xs transition-all duration-200 text-left"
          >
            <span className="grid size-7 sm:size-7.5 place-items-center rounded-lg bg-blue-50 text-blue-600 border border-blue-200/80 font-black text-xs shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="size-4" />
            </span>
            <div className="space-y-0.5 min-w-0 flex-1">
              <h5 className="font-bold text-xs sm:text-sm text-slate-950 leading-snug">
                {renderFormattedMarkdown(pt.title)}
              </h5>
              {pt.body && (
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                  {renderFormattedMarkdown(pt.body)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface OutcomesSectionProps {
  outcomes?: string[] | null;
  className?: string;
}

export function CareerOutcomesPoints({
  outcomes,
  className,
}: OutcomesSectionProps) {
  let items = parseListItems(outcomes);

  if (items.length === 0) {
    items = [
      {
        num: 1,
        title: "Job-Ready Campaign Portfolio",
        body: "Walk into technical interviews with verifiable, real-world case studies and project repositories.",
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
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-indigo-200/90 bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 p-6 sm:p-7 shadow-xs space-y-4",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 pb-1 border-b border-indigo-100">
        <span className="grid size-8 place-items-center rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200/80 font-black text-xs shrink-0">
          <Award className="size-4.5" />
        </span>
        <div className="text-left">
          <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
            Career Outcomes &amp; Skills Acquired
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500">
            Professional capabilities and job-ready competencies you will graduate with
          </p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-left">
        Graduates from this program gain working competence, resume-ready portfolio projects, and direct preparation for high-demand technical roles across the industry.
      </p>

      <div className="grid gap-3 sm:grid-cols-2 pt-1">
        {items.map((pt) => (
          <div
            key={pt.num}
            className="group flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border border-indigo-100/90 bg-white hover:border-indigo-400 hover:shadow-xs transition-all duration-200 text-left"
          >
            <span className="grid size-7 sm:size-7.5 place-items-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200/80 font-black text-xs shrink-0 mt-0.5 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Check className="size-4 stroke-[2.5]" />
            </span>
            <div className="space-y-0.5 min-w-0 flex-1">
              <h5 className="font-bold text-xs sm:text-sm text-slate-950 leading-snug">
                {renderFormattedMarkdown(pt.title)}
              </h5>
              {pt.body && (
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                  {renderFormattedMarkdown(pt.body)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

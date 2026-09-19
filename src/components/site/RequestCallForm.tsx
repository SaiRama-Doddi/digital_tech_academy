import { CheckCircle2, ChevronDown, Loader2, PhoneCall } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import { Btn } from "./Btn";
import { CountryFlag, COUNTRY_CODES, type CountryCodeItem } from "./CountryFlag";
import { callTimeOptions, courseOptions } from "@/data/content";
import { cn } from "@/lib/utils";
import { addEnquiryToFirebase } from "@/services/enquiryService";
import {
  subscribeCourses,
  getLocalCachedCourses,
} from "@/services/courseService";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(80, { message: "Name must be less than 80 characters" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Please enter your phone number" }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(160, { message: "Email is too long" }),
  course: z.string().min(1, { message: "Select a course" }),
  callTime: z.string().min(1, { message: "Select a preferred call time" }),
  message: z.string().trim().max(600, { message: "Message must be under 600 characters" }).optional(),
});

type Values = z.infer<typeof schema>;
type Errors = Partial<Record<keyof Values, string>>;

const initial: Values = { name: "", phone: "", email: "", course: "", callTime: "", message: "" };

const fieldClass =
  "w-full rounded-xl border bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-accent focus:ring-1 focus:ring-accent";

export function RequestCallForm({
  defaultCourse,
  compact = false,
}: {
  defaultCourse?: string | undefined;
  compact?: boolean | undefined;
}) {
  const [values, setValues] = useState<Values>({ ...initial, course: defaultCourse ?? "" });
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeItem>(COUNTRY_CODES[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [liveCourseList, setLiveCourseList] = useState<string[]>(() => {
    const cached = getLocalCachedCourses();
    const active = cached.filter(
      (c) =>
        c.active !== false &&
        Boolean(c.title?.trim()) &&
        c.id !== "full-stack-java" &&
        c.slug !== "full-stack-java" &&
        !c.title?.toLowerCase().includes("full stack java") &&
        c.id !== "testing"
    );
    if (active.length > 0) return active.map((c) => c.title.trim());
    return courseOptions;
  });

  useEffect(() => {
    const cached = getLocalCachedCourses();
    if (cached && cached.length > 0) {
      const active = cached.filter(
        (c) =>
          c.active !== false &&
          Boolean(c.title?.trim()) &&
          c.id !== "full-stack-java" &&
          c.slug !== "full-stack-java" &&
          !c.title?.toLowerCase().includes("full stack java") &&
          c.id !== "testing"
      );
      if (active.length > 0) setLiveCourseList(active.map((c) => c.title.trim()));
    }

    const unsub = subscribeCourses((list) => {
      if (list && list.length > 0) {
        const active = list.filter(
          (c) =>
            c.active !== false &&
            Boolean(c.title?.trim()) &&
            c.id !== "full-stack-java" &&
            c.slug !== "full-stack-java" &&
            !c.title?.toLowerCase().includes("full stack java") &&
            c.id !== "testing"
        );
        if (active.length > 0) {
          setLiveCourseList(active.map((c) => c.title.trim()));
        }
      }
    });
    return () => unsub();
  }, []);

  const set = (key: keyof Values, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    const next: Errors = {};
    if (!parsed.success) {
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      });
    }

    const cleanDigits = values.phone.replace(/\D/g, "");
    const minRequired = selectedCountry.minDigits || selectedCountry.digits;
    if (!cleanDigits) {
      next.phone = "Please enter your phone number";
    } else if (cleanDigits.length < minRequired) {
      next.phone = `Enter all ${selectedCountry.digits} digits for ${selectedCountry.name} (${cleanDigits.length}/${selectedCountry.digits})`;
    }

    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    setStatus("loading");
    try {
      await addEnquiryToFirebase({
        name: values.name.trim(),
        phone: `${selectedCountry.code} ${cleanDigits}`,
        email: values.email.trim(),
        course: values.course,
        callTime: values.callTime,
        notes: values.message,
        source: "Callback Request Form",
        status: "New",
        progress: 20,
      });
      setStatus("success");
    } catch (err) {
      console.warn("Error submitting callback enquiry:", err);
      setStatus("success");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-xl border border-accent/40 bg-card p-8 text-center shadow-card"
      >
        <span className="grid size-14 place-items-center rounded-full bg-accent-soft">
          <CheckCircle2 className="size-7 text-accent-foreground" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold text-foreground">Request received</h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Thank you, {values.name.split(" ")[0]}. Our admissions team will call you during your
          preferred time slot to discuss {values.course === "Not sure yet" ? "the right program for you" : values.course}.
        </p>
        <Btn
          variant="outline"
          size="sm"
          onClick={() => {
            setValues({ ...initial, course: defaultCourse ?? "" });
            setSelectedCountry(COUNTRY_CODES[0]);
            setStatus("idle");
          }}
        >
          Submit another request
        </Btn>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn(
        "rounded-2xl border border-slate-100/80 bg-white p-5 shadow-[0_12px_40px_rgba(0,0,0,0.03)] sm:p-6 lg:p-7",
        compact && "sm:p-5",
      )}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name} htmlFor="rc-name">
          <input
            id="rc-name"
            name="name"
            autoComplete="name"
            maxLength={80}
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Enter your full name"
            aria-invalid={Boolean(errors.name)}
            className={cn(fieldClass, errors.name ? "border-accent" : "border-input")}
          />
        </Field>

        <Field label="Phone Number" error={errors.phone} htmlFor="rc-phone">
          <div className="flex gap-2">
            <div className="relative shrink-0 flex items-center">
              <label htmlFor="rc-country" className="sr-only">
                Country Code
              </label>
              <div className="h-full rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 px-2.5 py-2 text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] pointer-events-none shrink-0 transition-colors">
                <CountryFlag country={selectedCountry.country} />
                <span className="text-xs sm:text-sm font-bold text-slate-700">{selectedCountry.code}</span>
                <ChevronDown className="size-3 text-slate-400 shrink-0 -ml-0.5" />
              </div>
              <select
                id="rc-country"
                value={selectedCountry.country}
                onChange={(e) => {
                  const found = COUNTRY_CODES.find((c) => c.country === e.target.value);
                  if (found) {
                    setSelectedCountry(found);
                    set("phone", values.phone.replace(/\D/g, "").slice(0, found.digits));
                  }
                }}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                aria-label="Country Code"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={`${c.country}-${c.code}`} value={c.country} className="text-slate-900 font-semibold">
                    {c.name} ({c.code}) - {c.digits} digits
                  </option>
                ))}
              </select>
            </div>

            <div className="relative flex-1">
              <input
                id="rc-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                maxLength={selectedCountry.digits}
                value={values.phone}
                onChange={(e) => {
                  const cleaned = e.target.value.replace(/\D/g, "").slice(0, selectedCountry.digits);
                  set("phone", cleaned);
                }}
                placeholder={selectedCountry.placeholder || `Enter ${selectedCountry.digits}-digit number`}
                aria-invalid={Boolean(errors.phone)}
                className={cn(fieldClass, "pr-14 font-mono", errors.phone ? "border-accent" : "border-input")}
              />
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[10px] font-bold text-slate-400 font-mono">
                {values.phone.length}/{selectedCountry.digits}
              </span>
            </div>
          </div>
        </Field>

        <Field label="Email Address" error={errors.email} htmlFor="rc-email">
          <input
            id="rc-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="Enter your email address"
            aria-invalid={Boolean(errors.email)}
            className={cn(fieldClass, errors.email ? "border-accent" : "border-input")}
          />
        </Field>

        <Field label="Interested Course" error={errors.course} htmlFor="rc-course">
          <select
            id="rc-course"
            name="course"
            value={values.course}
            onChange={(e) => set("course", e.target.value)}
            aria-invalid={Boolean(errors.course)}
            className={cn(fieldClass, errors.course ? "border-accent" : "border-input")}
          >
            <option value="">Select a course</option>
            {liveCourseList.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Preferred Call Time" error={errors.callTime} htmlFor="rc-time" className="sm:col-span-2">
          <div className="flex flex-wrap gap-2">
            {callTimeOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => set("callTime", option)}
                aria-pressed={values.callTime === option}
                className={cn(
                  "rounded-xl border px-4 py-2 text-xs font-bold transition-all duration-200 cursor-pointer",
                  values.callTime === option
                    ? "border-accent bg-accent/15 text-navy shadow-sm shadow-accent/10"
                    : "border-slate-200 bg-white text-slate-600 hover:border-accent/40 hover:text-navy",
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <input id="rc-time" type="hidden" name="callTime" value={values.callTime} readOnly />
        </Field>

        <Field label="Message" error={errors.message} htmlFor="rc-message" className="sm:col-span-2">
          <textarea
            id="rc-message"
            name="message"
            rows={4}
            maxLength={600}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Tell us about your learning goal or question."
            className={cn(fieldClass, "resize-y", errors.message ? "border-accent" : "border-input")}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 w-full bg-accent hover:brightness-110 text-slate-950 font-black h-12 text-sm shadow-md shadow-accent/20 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending request…
          </>
        ) : (
          <>
            <PhoneCall className="size-4" aria-hidden="true" />
            Request a Call
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        We respect your privacy. Your details are used only to contact you about training programs.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  className,
  children,
}: {
  label: string;
  error?: string | undefined;
  htmlFor: string;
  className?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-xs font-bold uppercase tracking-[0.1em] text-foreground/70">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs font-semibold text-accent-foreground/80" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

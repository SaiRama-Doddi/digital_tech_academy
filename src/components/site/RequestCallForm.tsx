import { CheckCircle2, Loader2, PhoneCall } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { Btn } from "./Btn";
import { callTimeOptions, courseOptions } from "@/data/content";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your full name" })
    .max(80, { message: "Name must be less than 80 characters" }),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-]{10,16}$/, { message: "Enter a valid phone number" }),
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
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

export function RequestCallForm({
  defaultCourse,
  compact = false,
}: {
  defaultCourse?: string | undefined;
  compact?: boolean | undefined;
}) {
  const [values, setValues] = useState<Values>({ ...initial, course: defaultCourse ?? "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const set = (key: keyof Values, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      });
      setErrors(next);
      return;
    }
    setStatus("loading");
    // Placeholder submission — connect this to your enquiry backend/API.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
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
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name)}
            className={cn(fieldClass, errors.name ? "border-accent" : "border-input")}
          />
        </Field>

        <Field label="Phone Number" error={errors.phone} htmlFor="rc-phone">
          <input
            id="rc-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={16}
            value={values.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+91 90000 00000"
            aria-invalid={Boolean(errors.phone)}
            className={cn(fieldClass, errors.phone ? "border-accent" : "border-input")}
          />
        </Field>

        <Field label="Email" error={errors.email} htmlFor="rc-email">
          <input
            id="rc-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={160}
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
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
            {courseOptions.map((option) => (
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
                  "rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all duration-200",
                  values.callTime === option
                    ? "border-blue-600 bg-blue-50 text-blue-600 font-bold"
                    : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-800",
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <input id="rc-time" type="hidden" name="callTime" value={values.callTime} readOnly />
        </Field>

        <Field label="Message (optional)" error={errors.message} htmlFor="rc-message" className="sm:col-span-2">
          <textarea
            id="rc-message"
            name="message"
            rows={4}
            maxLength={600}
            value={values.message}
            onChange={(e) => set("message", e.target.value)}
            placeholder="Tell us about your goals or questions"
            className={cn(fieldClass, "resize-y", errors.message ? "border-accent" : "border-input")}
          />
        </Field>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 text-sm shadow-md shadow-blue-500/10 rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-50"
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

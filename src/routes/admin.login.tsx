import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock, Mail, ShieldAlert, ArrowLeft, CheckCircle2, ChevronRight, Activity, Users, BookOpen } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import heroImg from "@/assets/hero-tech.jpg";
import { Btn } from "@/components/site/Btn";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal Login | Digital Ascent Academy" },
      {
        name: "description",
        content: "Secure administrative login portal for Digital Ascent Academy.",
      },
    ],
  }),
  component: AdminLoginPage,
});

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" }),
});

type FormValues = z.infer<typeof loginSchema>;
type FormErrors = Partial<Record<keyof FormValues, string>>;

function AdminLoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState<FormValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key: keyof FormValues, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const parsed = loginSchema.safeParse(values);
    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      parsed.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormValues;
        if (!nextErrors[key]) {
          nextErrors[key] = issue.message;
        }
      });
      setErrors(nextErrors);
      return;
    }

    setIsLoading(true);

    // Mock API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (
      values.email.toLowerCase() === "admin@digitalascent.academy" &&
      values.password === "admin123"
    ) {
      localStorage.setItem("admin_authenticated", "true");
      setIsLoading(false);
      navigate({ to: "/admin/dashboard" });
    } else {
      setIsLoading(false);
      setErrorMsg("Invalid credentials. Please use the demo administrator details below.");
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      {/* LEFT PANEL: Immersive Branding & Tech Overview (hidden on mobile) */}
      <section className="relative hidden md:flex md:w-[45%] lg:w-[50%] flex-col justify-between p-12 text-white overflow-hidden">
        {/* Background Image with Dark Indigo Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Academy Admin"
            className="w-full h-full object-cover scale-105 filter brightness-90 transition-transform duration-10000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900/95 to-blue-900/90 mix-blend-multiply" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60" />
        </div>

        {/* Top Header Section */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-blue-600 font-extrabold text-white shadow-lg shadow-blue-500/20 text-base tracking-tighter">
            DA
          </div>
          <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
            Digital Ascent Academy
          </span>
        </div>

        {/* Centered Pitch & Live Stats */}
        <div className="relative z-10 my-auto max-w-lg">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold tracking-wide text-blue-300 border border-blue-500/20 backdrop-blur-sm mb-6">
            <Activity className="size-3.5 animate-pulse text-blue-400" />
            Central Control Console
          </span>
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Manage your courses, leads, and student progress in one place.
          </h1>
          <p className="mt-4 text-sm lg:text-base text-slate-300 leading-relaxed">
            Authorized access only. Log in to manage academic curriculum, monitor user callback inquiries, update testimonials, and manage course structures.
          </p>

          {/* Quick Metrics Grid */}
          <div className="mt-10 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <BookOpen className="size-5 text-blue-400 mb-2" />
              <div className="text-xl font-extrabold">2 active</div>
              <div className="text-xs text-slate-400">Programs Published</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <Users className="size-5 text-emerald-400 mb-2" />
              <div className="text-xl font-extrabold">100%</div>
              <div className="text-xs text-slate-400">Enquiry Response Rate</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="relative z-10 text-xs text-slate-400 flex items-center justify-between border-t border-white/10 pt-6">
          <span>Secure Console Session v2.4</span>
          <span>© 2026 Digital Ascent</span>
        </div>
      </section>

      {/* RIGHT PANEL: Secure Form Entry */}
      <section className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 relative bg-white md:bg-transparent">
        {/* Decorative background grids (subtle on desktop) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] z-0" />

        {/* Navigation & Header Actions */}
        <div className="relative z-10 flex items-center justify-between mb-8 md:mb-0">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100/60"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
          
          <div className="md:hidden flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-blue-600 font-extrabold text-white text-xs">
              DA
            </div>
            <span className="font-extrabold text-xs text-slate-800">Digital Ascent</span>
          </div>
        </div>

        {/* Center Form Card */}
        <div className="relative z-10 my-auto mx-auto w-full max-w-[420px]">
          <div className="md:bg-white md:border md:border-slate-100 md:shadow-[0_20px_50px_rgba(0,0,0,0.03)] md:p-10 rounded-2xl">
            
            {/* Header Text */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Admin Sign In</h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-550 leading-relaxed">
                Please enter your administrator account credentials to proceed.
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mb-6 flex gap-2.5 rounded-xl border border-red-100 bg-red-50/50 p-3.5 text-xs sm:text-sm text-red-650 animate-shake">
                <ShieldAlert className="size-5 shrink-0 text-red-550" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@digitalascent.academy"
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full rounded-xl border bg-white pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${
                      errors.email ? "border-red-400 focus:border-red-600 focus:ring-red-600" : "border-slate-200"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={values.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={`w-full rounded-xl border bg-white pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${
                      errors.password ? "border-red-400 focus:border-red-600 focus:ring-red-600" : "border-slate-200"
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 font-medium">{errors.password}</p>
                )}
              </div>

              <Btn
                type="submit"
                disabled={isLoading}
                variant="primary"
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 text-sm rounded-xl shadow-lg shadow-blue-500/10 border-none flex items-center justify-center gap-2 transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Verifying session...</span>
                  </>
                ) : (
                  <>
                    <span>Enter Console</span>
                    <ChevronRight className="size-4" />
                  </>
                )}
              </Btn>
            </form>

            {/* Demo Credentials Box */}
            <div className="mt-8 rounded-xl bg-slate-50 border border-slate-100 p-4 text-xs">
              <div className="flex items-center gap-1.5 text-blue-600 font-bold mb-1.5">
                <CheckCircle2 className="size-4 shrink-0" />
                <h3>Developer Demo Logins:</h3>
              </div>
              <div className="space-y-1 text-slate-600">
                <div>
                  <span className="font-semibold text-slate-500">Email:</span>{" "}
                  <code className="bg-white border border-slate-100 px-1 py-0.5 rounded text-[11px] text-slate-850">
                    admin@digitalascent.academy
                  </code>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">Password:</span>{" "}
                  <code className="bg-white border border-slate-100 px-1 py-0.5 rounded text-[11px] text-slate-850">
                    admin123
                  </code>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer info (mobile fallback) */}
        <div className="relative z-10 text-center text-xs text-slate-400 mt-8 md:mt-0">
          <span>Digital Ascent Academy Console. Authorized Personnel Only.</span>
        </div>
      </section>
    </main>
  );
}

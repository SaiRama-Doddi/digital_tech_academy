import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, Mail, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Btn } from "@/components/site/Btn";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Digital Ascent Academy" },
      {
        name: "description",
        content: "Secure portal for Digital Ascent Academy administrators.",
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

    // Mock API request lag
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Check credentials (mocking admin access)
    if (
      values.email.toLowerCase() === "admin@digitalascent.academy" &&
      values.password === "admin123"
    ) {
      localStorage.setItem("admin_authenticated", "true");
      setIsLoading(false);
      navigate({ to: "/admin/dashboard" });
    } else {
      setIsLoading(false);
      setErrorMsg("Invalid email or password. Please use the demo credentials.");
    }
  };

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Portal"
        title="Admin Access"
        description="Sign in with your administrator credentials to manage courses, instructors, testimonials, FAQs, and student enquiries."
      />

      <section className="bg-slate-50/50 py-16 lg:py-24">
        <div className="container-site max-w-md">
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)]">
            <div className="text-center mb-6">
              <h2 className="text-xl font-extrabold text-slate-800">Welcome Back</h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
                Authorized administrator sign-in
              </p>
            </div>

            {errorMsg && (
              <div className="mb-5 flex gap-2.5 rounded-lg border border-red-100 bg-red-50/50 p-3 text-xs sm:text-sm text-red-650">
                <ShieldAlert className="size-5 shrink-0 text-red-550" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-650 mb-1.5"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@digitalascent.academy"
                    value={values.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className={`w-full rounded-lg border bg-white pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                      errors.email ? "border-red-400 focus:border-red-500 focus:ring-red-550" : "border-slate-200"
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
                  className="block text-xs font-bold uppercase tracking-wider text-slate-650 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={values.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className={`w-full rounded-lg border bg-white pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${
                      errors.password ? "border-red-400 focus:border-red-500 focus:ring-red-550" : "border-slate-200"
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
                className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 text-sm rounded-lg shadow-md shadow-blue-500/10 border-none flex items-center justify-center gap-1.5"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Btn>
            </form>

            <div className="mt-6 rounded-xl bg-blue-50/50 border border-blue-100/60 p-4 text-xs">
              <h3 className="font-bold text-blue-700 mb-1">Demo Credentials:</h3>
              <p className="text-slate-600">
                <strong>Email:</strong> admin@digitalascent.academy
              </p>
              <p className="text-slate-600">
                <strong>Password:</strong> admin123
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

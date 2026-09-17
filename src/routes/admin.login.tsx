import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Lock,
  Mail,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Activity,
  Users,
  BookOpen,
  KeyRound,
  RotateCcw,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";

import heroImg from "@/assets/hero-tech.jpg";
import { Btn } from "@/components/site/Btn";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { requestAdminOtpFn, verifyAdminOtpFn } from "@/lib/server/admin-auth";
import { saveAdminSession, isUserAdminAuthenticated } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal Login | DIGITECHADEMY" },
      {
        name: "description",
        content: "Secure administrative login portal via Email OTP for DIGITECHADEMY.",
      },
    ],
  }),
  component: AdminLoginPage,
});

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .email({ message: "Invalid email address format" });

function AdminLoginPage() {
  const navigate = useNavigate();

  // State
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("sunilkumarneelakantam@gmail.com");
  const [otp, setOtp] = useState("");
  const [devCode, setDevCode] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // If already logged in, redirect directly to dashboard
  useEffect(() => {
    if (isUserAdminAuthenticated()) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Step 1: Send OTP to Email
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setEmailError(null);
    setErrorMsg(null);
    setSuccessMsg(null);

    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setEmailError(parsed.error.issues[0]?.message || "Invalid email");
      return;
    }

    setIsLoading(true);

    try {
      const res = await requestAdminOtpFn({
        data: { email: email.trim().toLowerCase() },
      });

      if (res.success) {
        setStep("otp");
        if ((res as any).code) {
          setDevCode((res as any).code);
        }
        setSuccessMsg(res.message || `Verification code sent to ${email}`);
        setResendCooldown(45);
      } else {
        setErrorMsg(res.error || "Failed to send OTP code. Please try again.");
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg("Network error occurred while connecting to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (otp.length !== 6) {
      setErrorMsg("Please enter the full 6-digit verification code.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await verifyAdminOtpFn({
        data: {
          email: email.trim().toLowerCase(),
          otp,
        },
      });

      if (res.success && res.token) {
        saveAdminSession(res.token, res.email);
        setSuccessMsg("Verification successful! Redirecting...");
        setTimeout(() => {
          navigate({ to: "/admin/dashboard" });
        }, 500);
      } else {
        setErrorMsg(res.error || "Invalid verification code.");
      }
    } catch (err: unknown) {
      console.error(err);
      setErrorMsg("Failed to verify OTP code.");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-submit OTP when 6 digits are typed
  useEffect(() => {
    if (step === "otp" && otp.length === 6 && !isLoading) {
      handleVerifyOtp();
    }
  }, [otp, step]);

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-slate-50 font-sans selection:bg-blue-500 selection:text-white">
      {/* LEFT PANEL: Immersive Branding & Tech Overview */}
      <section className="relative hidden md:flex md:w-[45%] lg:w-[48%] flex-col justify-between p-12 text-white overflow-hidden">
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
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 font-extrabold text-white shadow-lg shadow-blue-500/30 text-base tracking-tighter">
            DA
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent block uppercase">
              DIGITECHADEMY
            </span>
            <span className="text-[11px] text-blue-300 font-medium">Enterprise Management Portal</span>
          </div>
        </div>

        {/* Centered Pitch & Security Info */}
        <div className="relative z-10 my-auto max-w-lg">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 px-3.5 py-1 text-xs font-bold tracking-wide text-blue-300 border border-blue-400/25 backdrop-blur-sm mb-6">
            <ShieldCheck className="size-3.5 text-blue-400" />
            2-Factor OTP Security Enabled
          </span>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Secure Admin Access with One-Time Email Passcodes.
          </h1>
          <p className="mt-4 text-sm lg:text-base text-slate-300 leading-relaxed">
            All administrative logins are protected with instant Gmail OTP verification codes sent directly to your registered administrator address.
          </p>

          {/* Quick Info Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <KeyRound className="size-5 text-blue-400 mb-2" />
              <div className="text-base font-extrabold">Instant Delivery</div>
              <div className="text-xs text-slate-400">Direct to Gmail Inbox</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <Activity className="size-5 text-emerald-400 mb-2" />
              <div className="text-base font-extrabold">10 Min Window</div>
              <div className="text-xs text-slate-400">Single-use OTP expiry</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="relative z-10 text-xs text-slate-400 flex items-center justify-between border-t border-white/10 pt-6">
          <span>Protected by SMTP TLS Encryption</span>
          <span>© 2026 DIGITECHADEMY</span>
        </div>
      </section>

      {/* RIGHT PANEL: Secure OTP Entry Form */}
      <section className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 relative bg-white md:bg-transparent">
        {/* Subtle grid pattern */}
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
            <span className="font-extrabold text-xs text-slate-800 uppercase">DIGITECHADEMY</span>
          </div>
        </div>

        {/* Center Form Card */}
        <div className="relative z-10 my-auto mx-auto w-full max-w-[440px]">
          <div className="md:bg-white md:border md:border-slate-100 md:shadow-[0_20px_50px_rgba(0,0,0,0.04)] md:p-10 rounded-2xl">
            {/* Header Text */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3 border border-blue-100">
                <Sparkles className="size-3.5" />
                <span>Admin OTP Verification</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
                {step === "email" ? "Administrator Sign In" : "Enter Verification Code"}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                {step === "email"
                  ? "Enter your registered administrator email to receive a secure 6-digit login passcode."
                  : `Enter the 6-digit code sent to ${email}`}
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mb-5 flex gap-2.5 rounded-xl border border-red-100 bg-red-50/70 p-3.5 text-xs sm:text-sm text-red-700 animate-shake">
                <ShieldAlert className="size-5 shrink-0 text-red-500 mt-0.5" />
                <span className="font-medium">{errorMsg}</span>
              </div>
            )}

            {/* Success Message Alert */}
            {successMsg && (
              <div className="mb-5 flex gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5 text-xs sm:text-sm text-emerald-700">
                <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" />
                <span className="font-medium">{successMsg}</span>
              </div>
            )}

            {/* STEP 1: Email Form */}
            {step === "email" ? (
              <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5"
                  >
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400" />
                    <input
                      id="email"
                      type="email"
                      placeholder="sunilneelakantams@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError(null);
                        setErrorMsg(null);
                      }}
                      className={`w-full rounded-xl border bg-white pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 ${
                        emailError ? "border-red-400 focus:border-red-600 focus:ring-red-600" : "border-slate-200"
                      }`}
                    />
                  </div>
                  {emailError && (
                    <p className="mt-1 text-xs text-red-500 font-medium">{emailError}</p>
                  )}
                </div>

                <Btn
                  type="submit"
                  disabled={isLoading}
                  variant="primary"
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 text-sm rounded-xl shadow-lg shadow-blue-500/15 border-none flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Sending OTP code...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Login Code</span>
                      <ChevronRight className="size-4" />
                    </>
                  )}
                </Btn>
              </form>
            ) : (
              /* STEP 2: OTP Form */
              <form onSubmit={handleVerifyOtp} className="flex flex-col gap-5">
                <div className="flex flex-col items-center py-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">
                    6-Digit Security Passcode
                  </label>

                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(val) => {
                      setOtp(val);
                      setErrorMsg(null);
                    }}
                    autoFocus
                  >
                    <InputOTPGroup className="gap-2">
                      <InputOTPSlot index={0} className="size-11 sm:size-12 rounded-xl text-lg font-bold border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20" />
                      <InputOTPSlot index={1} className="size-11 sm:size-12 rounded-xl text-lg font-bold border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20" />
                      <InputOTPSlot index={2} className="size-11 sm:size-12 rounded-xl text-lg font-bold border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20" />
                      <InputOTPSlot index={3} className="size-11 sm:size-12 rounded-xl text-lg font-bold border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20" />
                      <InputOTPSlot index={4} className="size-11 sm:size-12 rounded-xl text-lg font-bold border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20" />
                      <InputOTPSlot index={5} className="size-11 sm:size-12 rounded-xl text-lg font-bold border-slate-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20" />
                    </InputOTPGroup>
                  </InputOTP>

                  {devCode && (
                    <div className="mt-3.5 w-full rounded-xl border border-blue-200 bg-blue-50/90 p-3 text-center">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-left">
                          <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-blue-700 block">
                            Direct Security Passcode
                          </span>
                          <span className="text-xs text-slate-600 font-medium">
                            Code: <strong className="font-mono text-blue-900 text-sm tracking-widest">{devCode}</strong>
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setOtp(devCode)}
                          className="px-3 py-1 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs cursor-pointer active:scale-95 transition-all shrink-0"
                        >
                          Auto-fill
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between w-full text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setStep("email");
                        setOtp("");
                        setErrorMsg(null);
                        setSuccessMsg(null);
                      }}
                      className="text-slate-500 hover:text-blue-600 font-medium transition-colors"
                    >
                      &larr; Change email
                    </button>

                    <button
                      type="button"
                      disabled={resendCooldown > 0 || isLoading}
                      onClick={() => handleSendOtp()}
                      className="text-blue-600 hover:text-blue-700 font-bold disabled:text-slate-400 flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="size-3" />
                      {resendCooldown > 0
                        ? `Resend in ${resendCooldown}s`
                        : "Resend Code"}
                    </button>
                  </div>
                </div>

                <Btn
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  variant="primary"
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 text-sm rounded-xl shadow-lg shadow-blue-500/15 border-none flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Verifying passcode...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify & Enter Console</span>
                      <ChevronRight className="size-4" />
                    </>
                  )}
                </Btn>
              </form>
            )}

            {/* Configured Admin Hint */}
            <div className="mt-8 rounded-xl bg-slate-50 border border-slate-100 p-4 text-xs">
              <div className="flex items-center gap-1.5 text-blue-700 font-bold mb-1">
                <CheckCircle2 className="size-4 shrink-0" />
                <span>Configured Admin Email:</span>
              </div>
              <p className="text-slate-600 text-xs">
                Email OTP codes will be delivered directly to:{" "}
                <strong className="text-slate-800 break-all font-mono">sunilneelakantams@gmail.com</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Footer info (mobile fallback) */}
        <div className="relative z-10 text-center text-xs text-slate-400 mt-8 md:mt-0">
          <span>DIGITECHADEMY &bull; Authorized Personnel Only</span>
        </div>
      </section>
    </main>
  );
}

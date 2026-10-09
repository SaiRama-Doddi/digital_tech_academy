import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  Lock,
  Mail,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Activity,
  KeyRound,
  Sparkles,
  ShieldCheck,
  Eye,
  EyeOff,
  Layers,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import heroImg from "@/assets/hero-tech.jpg";
import { Btn } from "@/components/site/Btn";
import { auth } from "@/lib/firebase";
import { saveAdminSession, isUserAdminAuthenticated } from "@/lib/auth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Portal Login | DIGITECHADEMY" },
      {
        name: "description",
        content:
          "Secure administrative login portal via Email/Password & Google Sign-In for DIGITECHADEMY.",
      },
    ],
  }),
  component: AdminLoginPage,
});

const DEFAULT_ADMIN_EMAIL = "sunilneelakantams@gmail.com";
const DEFAULT_ADMIN_PASS = "Sunilneelakantams@123";

function GoogleIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function AdminLoginPage() {
  const navigate = useNavigate();

  // Form State
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState(DEFAULT_ADMIN_PASS);
  const [showPassword, setShowPassword] = useState(false);

  // Status & Feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  // If already logged in, redirect directly to dashboard
  useEffect(() => {
    if (isUserAdminAuthenticated()) {
      navigate({ to: "/admin/dashboard" });
    }
  }, [navigate]);

  // Handle Email & Password Sign In
  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = password.trim();

    if (!trimmedEmail) {
      setErrorMsg("Please enter your administrator email address.");
      return;
    }
    if (!trimmedPass) {
      setErrorMsg("Please enter your password.");
      return;
    }

    setIsLoading(true);

    try {
      let token = `admin-token-${Date.now()}`;
      let userEmail = trimmedEmail;

      try {
        // Attempt Firebase Auth sign-in
        const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, trimmedPass);
        token = await userCredential.user.getIdToken();
        userEmail = userCredential.user.email || trimmedEmail;
      } catch (fbErr: any) {
        // If user is not yet created in Firebase Auth, auto-create it if it matches admin credentials
        const code = fbErr?.code || "";
        const isMaster =
          trimmedEmail === DEFAULT_ADMIN_EMAIL && trimmedPass === DEFAULT_ADMIN_PASS;

        if (
          isMaster &&
          (code === "auth/user-not-found" ||
            code === "auth/invalid-credential" ||
            code === "auth/invalid-login-credentials")
        ) {
          try {
            const newUser = await createUserWithEmailAndPassword(auth, trimmedEmail, trimmedPass);
            token = await newUser.user.getIdToken();
            userEmail = newUser.user.email || trimmedEmail;
          } catch {
            // fallback to master grant
          }
        } else if (!isMaster) {
          throw fbErr;
        }
      }

      saveAdminSession(token, userEmail);
      setSuccessMsg("Authentication successful! Entering Purple Console...");
      setTimeout(() => {
        navigate({ to: "/admin/dashboard" });
      }, 500);
    } catch (err: any) {
      console.warn("Login failed:", err);
      const code = err?.code || "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password") {
        setErrorMsg("Invalid password or email credentials. Please check and try again.");
      } else if (code === "auth/user-not-found") {
        setErrorMsg("No administrator registered with this email address.");
      } else if (code === "auth/too-many-requests") {
        setErrorMsg("Too many failed attempts. Please wait a moment and try again.");
      } else {
        setErrorMsg(err?.message || "Failed to sign in. Please verify your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign In with Google
  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setIsGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      const userEmail = user.email || DEFAULT_ADMIN_EMAIL;

      saveAdminSession(token, userEmail);
      setSuccessMsg(`Signed in as ${userEmail}! Redirecting...`);
      setTimeout(() => {
        navigate({ to: "/admin/dashboard" });
      }, 500);
    } catch (err: any) {
      console.warn("Google sign-in error:", err);
      const code = err?.code || "";
      if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
        // user closed popup, no error needed
      } else if (code === "auth/unauthorized-domain") {
        setErrorMsg(
          "This domain is not authorized for OAuth in Firebase Console. Please add localhost to Firebase Auth authorized domains or use Email/Password sign-in.",
        );
      } else {
        setErrorMsg(err?.message || "Google sign-in could not be completed.");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFillCredentials = () => {
    setEmail(DEFAULT_ADMIN_EMAIL);
    setPassword(DEFAULT_ADMIN_PASS);
    setErrorMsg(null);
  };

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-[#f8fafc] font-sans selection:bg-purple-500 selection:text-white">
      {/* LEFT PANEL: Branding & Tech Overview */}
      <section className="relative hidden md:flex md:w-[45%] lg:w-[48%] flex-col justify-between p-12 text-white overflow-hidden">
        {/* Background Image with Dark Indigo Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Academy Admin"
            className="w-full h-full object-cover scale-105 filter brightness-90 transition-transform duration-10000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c0824] via-[#1a0f3d]/95 to-[#0f172a]/95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/60" />
        </div>

        {/* Top Header Section */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#9a55ff] to-[#da8cff] font-black text-white shadow-lg shadow-purple-500/30 text-base">
            <Layers className="size-6" />
          </div>
          <div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent block uppercase">
              DIGITECHADEMY
            </span>
            <span className="text-[11px] text-purple-300 font-medium">
              Purple Enterprise Control Portal
            </span>
          </div>
        </div>

        {/* Centered Pitch & Security Info */}
        <div className="relative z-10 my-auto max-w-lg">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/15 px-3.5 py-1 text-xs font-bold tracking-wide text-purple-300 border border-purple-400/25 backdrop-blur-sm mb-6">
            <ShieldCheck className="size-3.5 text-purple-400" />
            Firebase Authentication Engine
          </span>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight">
            Enterprise Admin Console Access.
          </h1>
          <p className="mt-4 text-sm lg:text-base text-slate-300 leading-relaxed">
            Manage course catalog, lead admissions, CRM pipeline, and support knowledgebase synced
            directly with Cloud Firestore.
          </p>

          {/* Quick Info Grid */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <KeyRound className="size-5 text-purple-400 mb-2" />
              <div className="text-base font-extrabold">Dual Sign-In</div>
              <div className="text-xs text-slate-400">Password or Google OAuth</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
              <Activity className="size-5 text-emerald-400 mb-2" />
              <div className="text-base font-extrabold">Cloud Sync</div>
              <div className="text-xs text-slate-400">Real-time Firestore DB</div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="relative z-10 text-xs text-slate-400 flex items-center justify-between border-t border-white/10 pt-6">
          <span>Protected by Firebase TLS Encryption</span>
          <span>© 2026 DIGITECHADEMY</span>
        </div>
      </section>

      {/* RIGHT PANEL: Authentication Form */}
      <section className="flex-1 flex flex-col justify-between p-6 sm:p-12 lg:p-16 relative bg-white md:bg-transparent">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#9a55ff_1px,transparent_1px)] [background-size:16px_16px] z-0" />

        {/* Navigation & Header Actions */}
        <div className="relative z-10 flex items-center justify-between mb-8 md:mb-0">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors py-1.5 px-3 rounded-lg hover:bg-slate-100/60 cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>

          <div className="md:hidden flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-[#b66dff] font-extrabold text-white text-xs">
              DA
            </div>
            <span className="font-extrabold text-xs text-slate-800 uppercase">DIGITECHADEMY</span>
          </div>
        </div>

        {/* Center Form Card */}
        <div className="relative z-10 my-auto mx-auto w-full max-w-[440px]">
          <div className="md:bg-white md:border md:border-slate-200/80 md:shadow-[0_20px_50px_rgba(182,109,255,0.08)] md:p-9 rounded-3xl">
            {/* Header Text */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-[#9a55ff] text-xs font-bold mb-3 border border-purple-100">
                <Sparkles className="size-3.5" />
                <span>Authorized Personnel Only</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Administrator Sign In
              </h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                Enter your credentials or continue with Google to access the Purple Console.
              </p>
            </div>

            {/* Error Message Alert */}
            {errorMsg && (
              <div className="mb-5 flex gap-2.5 rounded-xl border border-rose-200 bg-rose-50/80 p-3.5 text-xs text-rose-700 animate-shake">
                <ShieldAlert className="size-5 shrink-0 text-rose-500 mt-0.5" />
                <span className="font-medium leading-relaxed">{errorMsg}</span>
              </div>
            )}

            {/* Success Message Alert */}
            {successMsg && (
              <div className="mb-5 flex gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs text-emerald-700">
                <CheckCircle2 className="size-5 shrink-0 text-emerald-600 mt-0.5" />
                <span className="font-medium">{successMsg}</span>
              </div>
            )}

            {/* 1. SIGN IN WITH GOOGLE BUTTON */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isLoading}
              className="w-full h-12 rounded-2xl border border-slate-200 hover:border-purple-300 bg-white hover:bg-slate-50/80 text-slate-700 text-xs sm:text-sm font-bold flex items-center justify-center gap-3 transition-all duration-200 shadow-xs hover:shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isGoogleLoading ? (
                <div className="size-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              <span>Continue with Google</span>
            </button>

            {/* OR DIVIDER */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative bg-white px-3 text-[11px] font-black uppercase tracking-wider text-slate-400">
                or sign in with password
              </div>
            </div>

            {/* 2. EMAIL & PASSWORD FORM */}
            <form onSubmit={handleEmailPasswordLogin} className="flex flex-col gap-4">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5"
                >
                  Admin Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="sunilneelakantams@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrorMsg(null);
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#b66dff] focus:ring-1 focus:ring-[#b66dff]"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-500"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-[#9a55ff] hover:text-[#b66dff] font-bold inline-flex items-center gap-1 cursor-pointer"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="size-3" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="size-3" />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMsg(null);
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-10 py-3 text-xs sm:text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:bg-white focus:border-[#b66dff] focus:ring-1 focus:ring-[#b66dff]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Btn
                type="submit"
                disabled={isLoading || isGoogleLoading}
                variant="primary"
                className="mt-2 w-full bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 text-white font-bold h-12 text-sm rounded-xl shadow-lg shadow-purple-500/20 border-none flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <span className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Console</span>
                    <ChevronRight className="size-4" />
                  </>
                )}
              </Btn>
            </form>

            {/* Quick Admin Helper Card */}
            <div className="mt-6 rounded-2xl bg-purple-50/60 border border-purple-100/80 p-3.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#9a55ff] block">
                    Configured Master Admin
                  </span>
                  <p className="text-slate-700 text-[11.5px] font-medium mt-0.5">
                    {DEFAULT_ADMIN_EMAIL}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleFillCredentials}
                  className="px-3 py-1.5 text-[11px] font-black text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  Auto-fill
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-center text-xs text-slate-400 mt-8 md:mt-0">
          <span>DIGITECHADEMY &bull; Authorized Super Admin Console</span>
        </div>
      </section>
    </main>
  );
}

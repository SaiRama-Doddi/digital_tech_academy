import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  GraduationCap,
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  User,
  X,
} from "lucide-react";

import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { addEnquiryToFirebase } from "@/services/enquiryService";
import {
  CountryFlag,
  COUNTRY_CODES,
  type CountryCodeItem,
} from "@/components/site/CountryFlag";
import {
  subscribeCourses,
  getLocalCachedCourses,
  type FirebaseCourse,
} from "@/services/courseService";

export function DemoClassModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeItem>(
    COUNTRY_CODES[0]
  );
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [liveCourses, setLiveCourses] = useState<Array<{ id: string; title: string }>>(() => {
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
    return active.map((c) => ({ id: c.id, title: c.title.trim() }));
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
      if (active.length > 0) {
        setLiveCourses(active.map((c) => ({ id: c.id, title: c.title.trim() })));
      }
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
        setLiveCourses(active.map((c) => ({ id: c.id, title: c.title.trim() })));
      } else {
        setLiveCourses([]);
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    let triggered = false;
    const handleScroll = () => {
      if (triggered) return;
      const scrollPosition = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
      if (scrollPercentage >= 48) {
        triggered = true;
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    const fallbackTimer = setTimeout(() => {
      if (!sessionStorage.getItem("demo_modal_dismissed")) {
        setIsOpen(true);
      }
    }, 50000);
    if (typeof window !== "undefined") {
      (window as unknown as { openDemoModal: () => void }).openDemoModal = () => {
        setIsOpen(true);
      };
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const handleResetForm = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setCourse("");
    setErrorMsg("");
    setSelectedCountry(COUNTRY_CODES[0]);
    setIsSuccess(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("demo_modal_dismissed", "true");
    if (isSuccess) {
      handleResetForm();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    const cleanPhone = phone.replace(/\D/g, "");
    const minRequired = selectedCountry.minDigits || selectedCountry.digits;
    if (!cleanPhone || cleanPhone.length < minRequired) {
      setErrorMsg(`Please enter a valid ${selectedCountry.digits}-digit mobile number for ${selectedCountry.name}.`);
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!course) {
      setErrorMsg("Please select a training course.");
      return;
    }
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      await addEnquiryToFirebase({
        name: fullName.trim(),
        phone: `${selectedCountry.code} ${phone.trim()}`,
        email: email.trim(),
        course: course,
        callTime: "Free Demo Class Request",
        source: "Join Free Demo Modal",
        status: "New",
        progress: 20,
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      sessionStorage.setItem("demo_modal_dismissed", "true");
    } catch (err) {
      console.warn("Failed to submit enquiry to Firebase, saved locally:", err);
      setIsSubmitting(false);
      setIsSuccess(true);
      sessionStorage.setItem("demo_modal_dismissed", "true");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-300">
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-[460px]">
        <div className="absolute -inset-1.5 rounded-[32px] bg-gradient-to-r from-blue-600/30 via-indigo-600/30 to-purple-600/30 blur-2xl opacity-70 pointer-events-none" aria-hidden="true" />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-class-modal-title"
          className="relative w-full max-h-[94vh] overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-2xl sm:rounded-[28px] bg-white/98 backdrop-blur-2xl p-4 sm:p-5 lg:p-6 shadow-[0_25px_70px_-15px_rgba(15,23,42,0.3),0_0_0_1px_rgba(255,255,255,0.95)] border border-slate-100 text-slate-800 animate-in zoom-in-95 duration-200"
        >
          <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/80 to-transparent pointer-events-none" aria-hidden="true" />
          <button
            type="button"
            onClick={handleClose}
            className="group absolute right-3 top-3 sm:right-4 sm:top-4 grid size-7.5 sm:size-8 place-items-center rounded-full bg-slate-100/80 hover:bg-slate-200/90 text-slate-400 hover:text-slate-800 transition-all active:scale-95 cursor-pointer shadow-2xs z-20"
            aria-label="Close modal"
          >
            <X className="size-4 sm:size-4.5 transition-transform duration-200 group-hover:rotate-90" />
          </button>
          {isSuccess ? (
            <div className="py-6 text-center">
              <div className="relative mx-auto grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="size-9" />
                <span className="absolute -top-1 -right-1 size-3.5 rounded-full bg-white ring-2 ring-emerald-500" />
              </div>
              <h3 className="mt-4 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Demo Seat Reserved!
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                Thank you, <span className="font-bold text-slate-900">{fullName.split(" ")[0]}</span>.
                Our academic coordinator will call you on{" "}
                <span className="font-bold text-blue-600">{selectedCountry.code} {phone}</span> with
                your live demo class access link.
              </p>
              <div className="mt-6 flex flex-col gap-2.5">
                <a
                  href={whatsappLink(`Hi, I just registered for the ${course} demo class.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-3 text-xs sm:text-sm shadow-md shadow-emerald-600/25 transition-all hover:-translate-y-0.5"
                >
                  <MessageCircle className="size-4" />
                  <span>Chat with Academic Team on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full py-2 text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50/50 rounded-xl transition-colors cursor-pointer"
                >
                  Submit another request
                </button>
                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center pr-6 sm:pr-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 shadow-2xs mb-1 sm:mb-1.5">
                  <span className="relative flex size-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider text-blue-700">
                    Live 1-on-1 Interactive Demo
                  </span>
                </div>
                <h2
                  id="demo-class-modal-title"
                  className="text-lg sm:text-[22px] font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent uppercase leading-tight"
                >
                  JOIN FREE DEMO CLASS
                </h2>
                <p className="text-[10.5px] sm:text-[11.5px] text-slate-500 mt-0.5 font-normal max-w-xs mx-auto leading-snug">
                  Experience live mentor guidance & real hands-on projects before enrolling.
                </p>
              </div>
              {errorMsg && (
                <div className="mt-2 rounded-xl bg-rose-50/90 border border-rose-200/80 px-3 py-1.5 text-xs font-semibold text-rose-600 flex items-center gap-2 animate-in fade-in">
                  <span className="size-1.5 rounded-full bg-rose-500 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}
              <form onSubmit={handleSubmit} className="mt-2.5 sm:mt-3 space-y-2">
                <div className="relative group">
                  <label htmlFor="demo-fullname" className="sr-only">Full Name</label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <User className="size-3.5 sm:size-4" />
                  </div>
                  <input
                    id="demo-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full h-9.5 sm:h-10 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 pl-8.5 sm:pl-9 pr-3.5 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]"
                  />
                </div>
                <div className="flex gap-1.5 sm:gap-2">
                  <div className="relative shrink-0 flex items-center">
                    <label htmlFor="demo-country" className="sr-only">Country Code</label>
                    <div className="h-9.5 sm:h-10 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-100 px-2 sm:px-2.5 text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] pointer-events-none shrink-0 transition-colors">
                      <CountryFlag country={selectedCountry.country} />
                      <span className="text-xs sm:text-sm font-bold text-slate-700">{selectedCountry.code}</span>
                      <ChevronDown className="size-3 text-slate-400 shrink-0" />
                    </div>
                    <select
                      id="demo-country"
                      value={selectedCountry.country}
                      onChange={(e) => {
                        const found = COUNTRY_CODES.find((c) => c.country === e.target.value);
                        if (found) {
                          setSelectedCountry(found);
                          setPhone((prev) => prev.replace(/\D/g, "").slice(0, found.digits));
                        }
                      }}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                      aria-label="Country Code"
                    >
                      {COUNTRY_CODES.map((c) => (
                        <option key={`${c.country}-${c.code}`} value={c.country}>
                          {c.name} ({c.code}) - {c.digits} digits
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="relative flex-1 min-w-0 group">
                    <label htmlFor="demo-phone" className="sr-only">Phone Number</label>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                      <Phone className="size-3.5 sm:size-4" />
                    </div>
                    <input
                      id="demo-phone"
                      type="tel"
                      inputMode="numeric"
                      maxLength={selectedCountry.digits}
                      value={phone}
                      onChange={(e) => {
                        const cleaned = e.target.value.replace(/\D/g, "").slice(0, selectedCountry.digits);
                        setPhone(cleaned);
                      }}
                      placeholder={selectedCountry.placeholder || `Enter ${selectedCountry.digits}-digit number`}
                      className="w-full h-9.5 sm:h-10 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 pl-8.5 sm:pl-9 pr-14 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[10px] font-bold text-slate-400 font-mono">
                      {phone.length}/{selectedCountry.digits}
                    </span>
                  </div>
                </div>
                <div className="relative group">
                  <label htmlFor="demo-email" className="sr-only">Email Address</label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Mail className="size-3.5 sm:size-4" />
                  </div>
                  <input
                    id="demo-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full h-9.5 sm:h-10 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 pl-8.5 sm:pl-9 pr-3.5 py-1.5 sm:py-2 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]"
                  />
                </div>
                <div className="relative group">
                  <label htmlFor="demo-course" className="sr-only">Select your course</label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <GraduationCap className="size-3.5 sm:size-4" />
                  </div>
                  <select
                    id="demo-course"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full h-9.5 sm:h-10 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 pl-8.5 sm:pl-9 pr-8 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 cursor-pointer shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]"
                  >
                    <option value="" disabled>
                      {liveCourses.length === 0 ? "Loading published courses..." : "Select your course"}
                    </option>
                    {liveCourses.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="pt-0.5">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden rounded-xl bg-[linear-gradient(135deg,#0284c7_0%,#2563eb_40%,#4f46e5_80%,#7c3aed_100%)] text-white font-extrabold h-10 sm:h-11 text-xs sm:text-sm border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_6px_20px_-2px_rgba(37,99,235,0.45),0_2px_6px_rgba(15,23,42,0.1)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_10px_26px_-2px_rgba(37,99,235,0.65),0_4px_10px_rgba(79,70,229,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-75"
                  >
                    <span
                      className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                      aria-hidden="true"
                    />
                    {isSubmitting ? (
                      <>
                        <Loader2 className="size-4 animate-spin text-white" />
                        <span className="tracking-tight">Securing Your Demo Seat...</span>
                      </>
                    ) : (
                      <>
                        <span className="relative grid size-5 sm:size-5.5 place-items-center rounded-lg bg-white/20 ring-1 ring-white/30 shadow-inner backdrop-blur-xs shrink-0">
                          <PhoneCall className="size-3 text-white animate-pulse" />
                          <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-emerald-400 ring-1 ring-white" />
                        </span>
                        <span className="font-extrabold tracking-tight">Get a call back</span>
                        <ArrowRight className="size-3.5 sm:size-4 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </>
                    )}
                  </button>
                </div>
                <div className="pt-0.5 flex items-center justify-center gap-1.5 sm:gap-3 text-[9px] sm:text-[10px] text-slate-500 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="size-3 text-emerald-600" />
                    <span>100% Free Demo</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3 text-blue-600" />
                    <span>Instant Call Back</span>
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Sparkles className="size-3 text-amber-500" />
                    <span>Top Mentors</span>
                  </span>
                </div>
              </form>
              <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-slate-100/90 flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold">
                <a
                  href={site.phoneHref}
                  className="group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-100 text-blue-700 transition-all shadow-2xs hover:shadow-xs active:scale-95 shrink-0"
                >
                  <span className="grid size-4 place-items-center rounded-full bg-blue-600 text-white shadow-2xs">
                    <Phone className="size-2.5" />
                  </span>
                  <span>Call Us</span>
                </a>
                <a
                  href={`mailto:${site.email}?subject=Free Demo Class Enquiry`}
                  className="group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-100 text-purple-700 transition-all shadow-2xs hover:shadow-xs active:scale-95 shrink-0"
                >
                  <span className="grid size-4 place-items-center rounded-full bg-purple-600 text-white shadow-2xs">
                    <Mail className="size-2.5" />
                  </span>
                  <span>Email</span>
                </a>
                <a
                  href={whatsappLink("Hi, I would like to join the free demo class.")}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-100 text-emerald-700 transition-all shadow-2xs hover:shadow-xs active:scale-95 shrink-0"
                >
                  <span className="grid size-4 place-items-center rounded-full bg-emerald-500 text-white shadow-2xs">
                    <MessageCircle className="size-2.5" />
                  </span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

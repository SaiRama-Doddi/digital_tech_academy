import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
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
} from "lucide-react";
import { Course, courses } from "@/data/courses";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { addEnquiryToFirebase } from "@/services/enquiryService";
import {
  subscribeCourses,
  getLocalCachedCourses,
  type FirebaseCourse,
} from "@/services/courseService";
import {
  CountryFlag,
  COUNTRY_CODES,
  type CountryCodeItem,
} from "@/components/site/CountryFlag";

interface CourseDemoSidebarProps {
  course?: Course;
}

export function CourseDemoSidebar({ course }: CourseDemoSidebarProps) {
  const activeCourse = course || (courses[0] as Course);
  const [fullName, setFullName] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCodeItem>(
    COUNTRY_CODES[0]
  );
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(activeCourse.title || "Cyber Security Course");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [liveCourseOptions, setLiveCourseOptions] = useState<Array<{ id: string; title: string }>>(
    () => courses.map((c) => ({ id: c.id, title: c.title }))
  );

  useEffect(() => {
    const cached = getLocalCachedCourses();
    if (cached && cached.length > 0) {
      setLiveCourseOptions(cached.map((c) => ({ id: c.id, title: c.title })));
    }

    const unsub = subscribeCourses((list) => {
      if (list && list.length > 0) {
        setLiveCourseOptions(
          list
            .filter((c) => c.active !== false)
            .map((c) => ({ id: c.id, title: c.title }))
        );
      }
    });
    return () => unsub();
  }, []);

  // Update selected course if activeCourse changes
  useEffect(() => {
    if (activeCourse?.title) {
      setSelectedCourse(activeCourse.title);
    }
  }, [activeCourse?.title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Please enter your contact phone number.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      await addEnquiryToFirebase({
        name: fullName.trim(),
        phone: `${selectedCountry.code} ${phone.trim()}`,
        email: email.trim(),
        course: selectedCourse || activeCourse.title,
        source: `Course Sidebar: ${activeCourse.title}`,
        callTime: "Course Demo Request",
        status: "New",
        progress: 20,
      });
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      console.warn("Failed to store enquiry:", err);
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  const handleResetForm = () => {
    setFullName("");
    setPhone("");
    setEmail("");
    setSelectedCourse(activeCourse.title || "Cyber Security Course");
    setSelectedCountry(COUNTRY_CODES[0]);
    setErrorMsg("");
    setIsSuccess(false);
  };

  return (
    <div id="course-demo-sidebar" className="w-full scroll-mt-[190px]">
      {/* Embedded Lead Capture Form Card (JOIN FREE DEMO CLASS) */}
      <div className="relative rounded-2xl sm:rounded-[24px] border border-slate-200/90 bg-white/95 backdrop-blur-xl p-4 sm:p-6 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12),0_0_0_1px_rgba(255,255,255,0.8)] transition-all overflow-hidden w-full min-w-0">
        {/* Top Beveled Edge Glow Strip */}
        <div
          className="absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/70 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {isSuccess ? (
          <div className="py-6 text-center">
            <div className="relative mx-auto grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="size-8 stroke-[2.5]" />
            </div>
            <h4 className="mt-3 text-lg font-black text-slate-900 tracking-tight">Registration Confirmed!</h4>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
              Thank you, <strong className="text-slate-900">{fullName}</strong>. Your free demo class seat
              for <strong className="text-blue-600">{selectedCourse}</strong> is reserved.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href={whatsappLink(`Hi, I just registered for the ${selectedCourse} demo class.`)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 text-xs shadow-md shadow-emerald-600/25 transition-all"
              >
                <MessageCircle className="size-4" />
                <span>Connect with Coordinator on WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={handleResetForm}
                className="w-full text-xs font-semibold text-slate-500 hover:text-slate-900 py-1.5 cursor-pointer transition-colors"
              >
                Submit another request
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header: Exact copy from user screenshot with luxury styling */}
            <div className="text-center pb-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 shadow-2xs mb-1.5">
                <span className="relative flex size-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-blue-700">
                  Free Live Session
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                JOIN FREE DEMO CLASS
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Try the live curriculum before making a decision
              </p>
            </div>

            {errorMsg && (
              <div className="mt-2 rounded-xl bg-rose-50 border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-600 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-3 space-y-2.5">
              {/* Full Name with Icon */}
              <div className="relative group">
                <label htmlFor="course-sidebar-name" className="sr-only">
                  Full Name
                </label>
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <User className="size-3.5" />
                </div>
                <input
                  id="course-sidebar-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]"
                />
              </div>

              {/* Country Code + Phone */}
              <div className="flex gap-2">
                <div className="relative shrink-0 flex items-center">
                  <label htmlFor="course-sidebar-country" className="sr-only">
                    Country Code
                  </label>
                  <div className="h-full rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-100 px-2.5 py-2 text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)] pointer-events-none shrink-0 transition-colors">
                    <CountryFlag country={selectedCountry.country} />
                    <span className="text-xs sm:text-sm font-bold text-slate-700">{selectedCountry.code}</span>
                    <ChevronDown className="size-3 text-slate-400 shrink-0 -ml-0.5" />
                  </div>
                  <select
                    id="course-sidebar-country"
                    value={selectedCountry.country}
                    onChange={(e) => {
                      const found = COUNTRY_CODES.find((c) => c.country === e.target.value);
                      if (found) setSelectedCountry(found);
                    }}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    aria-label="Country Code"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={`${c.country}-${c.code}`} value={c.country} className="text-slate-900 font-semibold">
                        {c.name} ({c.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative flex-1 group">
                  <label htmlFor="course-sidebar-phone" className="sr-only">
                    Phone Number
                  </label>
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                    <Phone className="size-3.5" />
                  </div>
                  <input
                    id="course-sidebar-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative group">
                <label htmlFor="course-sidebar-email" className="sr-only">
                  Email
                </label>
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <Mail className="size-3.5" />
                </div>
                <input
                  id="course-sidebar-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 pl-9 pr-3.5 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]"
                />
              </div>

              {/* Select Your Course */}
              <div className="relative group">
                <label htmlFor="course-sidebar-select" className="sr-only">
                  Select your course
                </label>
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                  <GraduationCap className="size-3.5" />
                </div>
                <select
                  id="course-sidebar-select"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-50 pl-9 pr-8 py-2.5 text-xs sm:text-sm font-medium text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/15 cursor-pointer shadow-[inset_0_1px_2px_rgba(15,23,42,0.03)]"
                >
                  {liveCourseOptions.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-between pt-1 px-1 text-[11px] text-slate-500">
                  <span>Want to see full syllabus?</span>
                  <Link
                    to="/courses"
                    className="font-bold text-blue-600 hover:text-indigo-600 transition-colors"
                  >
                    All Courses &rarr;
                  </Link>
                </div>
              </div>

              {/* Submit CTA with Luxury Hardware Bevel & Light Sweep */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full overflow-hidden rounded-xl bg-[linear-gradient(135deg,#0284c7_0%,#2563eb_40%,#4f46e5_80%,#7c3aed_100%)] text-white font-extrabold py-3 text-xs sm:text-sm border border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_6px_22px_-2px_rgba(37,99,235,0.45),0_2px_6px_rgba(15,23,42,0.1)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.65),0_10px_28px_-2px_rgba(37,99,235,0.65),0_4px_10px_rgba(79,70,229,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] disabled:opacity-75"
                >
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
                    aria-hidden="true"
                  />
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 animate-spin text-white" />
                      <span>Reserving Seat...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative grid size-5.5 place-items-center rounded-lg bg-white/20 ring-1 ring-white/30 shadow-inner backdrop-blur-xs shrink-0">
                        <PhoneCall className="size-3 text-white animate-pulse" />
                        <span className="absolute -top-0.5 -right-0.5 size-1 rounded-full bg-emerald-400 ring-1 ring-white" />
                      </span>
                      <span className="font-extrabold tracking-tight">Get a call back</span>
                      <ArrowRight className="size-3.5 text-white/80 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badges Strip */}
              <div className="pt-1 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="size-3 text-emerald-600" />
                  <span>100% Free Demo</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3 text-blue-600" />
                  <span>Instant Confirmation</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="size-3 text-amber-500" />
                  <span>Top Mentors</span>
                </span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

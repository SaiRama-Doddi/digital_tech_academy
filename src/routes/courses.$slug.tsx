import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { courses } from "@/data/courses";
import { SiteLayout } from "@/components/site/SiteLayout";
import { BtnLink } from "@/components/site/Btn";
import {
  Clock,
  BookOpen,
  Signal,
  Award,
  Check,
  ChevronDown,
  ChevronUp,
  Users,
  CheckCircle2,
  PhoneCall,
  ArrowRight,
  FileText,
  Briefcase,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/courses/$slug")({
  head: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    return {
      meta: [
        { title: course ? `${course.title} Course | Digital Tech Solution` : "Course Not Found" },
        { name: "description", content: course ? course.description : "" },
        { property: "og:title", content: course ? course.title : "Course Not Found" },
        { property: "og:description", content: course ? course.description : "" }
      ],
      links: [{ rel: "canonical", href: course ? `/courses/${course.slug}` : "" }],
    };
  },
  component: CourseDetailPage,
});

const tabs = [
  { id: "overview", label: "Program Overview" },
  { id: "syllabus", label: "Syllabus" },
  { id: "practical", label: "Practical Training" },
  { id: "instructors", label: "Certificate & Instructors" },
  { id: "pricing", label: "Pricing" },
  { id: "faqs", label: "Testimonials & FAQs" }
];

function CourseDetailPage() {
  const { slug } = Route.useParams();
  const course = courses.find((c) => c.slug === slug);

  const [activeTab, setActiveTab] = useState("overview");
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  // Scroll Spy logic to highlight active section and handle sub-header stickiness state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const scrollPosition = window.scrollY + 220;

      for (const tab of tabs) {
        const el = document.getElementById(tab.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!course) {
    return (
      <SiteLayout>
        <div className="container-site py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground">Course Not Found</h1>
          <p className="mt-3 text-muted-foreground">The program you are looking for does not exist.</p>
          <div className="mt-6">
            <BtnLink to="/courses" variant="primary">
              Back to Courses
            </BtnLink>
          </div>
        </div>
      </SiteLayout>
    );
  }

  const handleTabClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.offsetTop - 140;
      window.scrollTo({
        top: offset,
        behavior: "smooth"
      });
      setActiveTab(id);
    }
  };

  return (
    <SiteLayout>
      {/* Course Hero Banner - Premium Dark/Navy Theme with Graphics */}
      <section className="bg-slate-950 text-white relative overflow-hidden pb-12 pt-14 border-b border-slate-900">
        {/* Glowing background shapes */}
        <div className="absolute size-96 rounded-full bg-blue-500/10 blur-3xl -top-20 -right-20 pointer-events-none" />
        <div className="absolute size-80 rounded-full bg-accent/5 blur-3xl bottom-0 left-10 pointer-events-none" />
        <div className="grid-lines absolute inset-0 opacity-[0.06] pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
            
            {/* Left side content */}
            <div className="max-w-2xl text-left space-y-5">
              <span className="eyebrow inline-flex items-center gap-1.5 rounded-full bg-blue-900/30 px-3 py-1 text-[0.7rem] font-bold text-accent border border-blue-800/30 uppercase tracking-wider">
                <Sparkles className="size-3 text-accent" />
                {course.category} Track
              </span>
              <h1 className="text-[2.25rem] font-extrabold tracking-tight text-white sm:text-[3rem] lg:text-[3.25rem] leading-[1.08] max-w-xl">
                {course.title}
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed text-justify max-w-xl">
                {course.longDescription}
              </p>

              {/* Clean compact metrics bar */}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="size-4 text-accent" />
                  <span>{course.duration}</span>
                </div>
                <span className="text-slate-700">•</span>
                <div className="flex items-center gap-1.5">
                  <Signal className="size-4 text-accent" />
                  <span>{course.level}</span>
                </div>
                <span className="text-slate-700">•</span>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="size-4 text-accent" />
                  <span>{course.syllabus.length} Core Modules</span>
                </div>
              </div>

              {/* Hero buttons for Mobile/Tablet */}
              <div className="flex flex-col gap-3 sm:flex-row pt-2 lg:hidden">
                <BtnLink to="/request-call" variant="accent" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-5 shadow-md shadow-blue-500/10">
                  Apply Now
                </BtnLink>
                <BtnLink to="/request-call" variant="outline" size="sm" className="border-slate-800 bg-transparent text-slate-300 hover:text-white h-10 px-5">
                  <PhoneCall className="size-3.5" />
                  Speak to Adviser
                </BtnLink>
              </div>
            </div>

            {/* Right side illustration / vector badge graphic */}
            <div className="hidden lg:flex justify-end relative">
              {/* Graphic pedestal / display */}
              <div className="relative flex justify-center items-center">
                <div className="absolute size-64 rounded-full bg-blue-500/10 blur-3xl" />
                
                {course.category === "Cyber Security" ? (
                  /* Cyber Shield Graphic */
                  <div className="relative z-10 w-64 h-64 flex items-center justify-center bg-slate-900/30 border border-slate-800 rounded-3xl shadow-lift backdrop-blur-sm">
                    <div className="absolute inset-x-0 bottom-4 top-12 rounded-full bg-blue-900/5 border border-blue-900/10 opacity-60" />
                    <svg className="size-32 text-accent animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    
                    {/* Floating badges */}
                    <div className="absolute -left-6 top-[20%] animate-float shadow-lg bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-[0.62rem] font-bold text-white flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Ethical Hacking
                    </div>
                    <div className="absolute -right-6 top-[55%] animate-float shadow-lg bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-[0.62rem] font-bold text-white flex items-center gap-1.5" style={{ animationDelay: "1.5s" }}>
                      <span className="size-1.5 rounded-full bg-blue-500" />
                      Linux Labs
                    </div>
                  </div>
                ) : (
                  /* Digital Marketing Megaphone/Graph Graphic */
                  <div className="relative z-10 w-64 h-64 flex items-center justify-center bg-slate-900/30 border border-slate-800 rounded-3xl shadow-lift backdrop-blur-sm">
                    <div className="absolute inset-x-0 bottom-4 top-12 rounded-full bg-blue-900/5 border border-blue-900/10 opacity-60" />
                    <svg className="size-32 text-accent animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                    </svg>
                    
                    {/* Floating badges */}
                    <div className="absolute -left-6 top-[20%] animate-float shadow-lg bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-[0.62rem] font-bold text-white flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      Paid Advertising
                    </div>
                    <div className="absolute -right-6 top-[55%] animate-float shadow-lg bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 text-[0.62rem] font-bold text-white flex items-center gap-1.5" style={{ animationDelay: "1.5s" }}>
                      <span className="size-1.5 rounded-full bg-blue-500" />
                      SEO Auditing
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Secondary Sticky Sub-Header Bar (mockup style) */}
      <nav
        className={cn(
          "sticky z-40 transition-all duration-300 border-b border-slate-200/50 shadow-sm backdrop-blur-md",
          scrolled ? "top-16 bg-slate-50/95" : "top-[4.75rem] lg:top-20 bg-white/95"
        )}
      >
        <div className="container-site flex items-center justify-between gap-4 h-14 overflow-x-auto no-scrollbar">
          <ul className="flex items-center gap-6 sm:gap-8 h-full shrink-0">
            {tabs.map((tab) => (
              <li key={tab.id} className="h-full">
                <button
                  onClick={() => handleTabClick(tab.id)}
                  className={cn(
                    "h-full text-xs sm:text-sm font-bold border-b-2 px-1 transition-all flex items-center whitespace-nowrap",
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  )}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center shrink-0">
            <BtnLink to="/request-call" variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-none shadow-sm gap-1.5 h-9.5 py-0 px-4 rounded-lg">
              <PhoneCall className="size-3.5" />
              Request Callback
            </BtnLink>
          </div>
        </div>
      </nav>

      {/* Main Content Layout */}
      <section className="bg-background py-10">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px]">
          
          {/* Left Column: Course sections */}
          <div className="space-y-10">
            
            {/* Section 1: Overview */}
            <article id="overview" className="scroll-mt-36 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">Program Overview</h2>
              </div>
              
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                    What You Will Learn
                  </h3>
                  <ul className="space-y-2.5">
                    {course.overview.learn.map((item) => (
                      <li key={item} className="flex gap-2.5 text-xs sm:text-sm text-slate-600 leading-snug">
                        <Check className="size-4 shrink-0 text-emerald-500 mt-0.5" />
                        <span className="text-justify">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-5 shadow-sm">
                  <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2 mb-3">
                    <Users className="size-4 text-blue-600 shrink-0" />
                    Who This Is For
                  </h3>
                  <ul className="space-y-2.5">
                    {course.overview.audience.map((item) => (
                      <li key={item} className="flex gap-2.5 text-xs sm:text-sm text-slate-600 leading-snug">
                        <span className="size-1.5 rounded-full bg-blue-500 shrink-0 mt-2" />
                        <span className="text-justify">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50/10 border border-blue-100/35 rounded-xl p-5 shadow-sm">
                <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-blue-800 flex items-center gap-2 mb-3">
                  <Award className="size-4 text-blue-700 shrink-0" />
                  Key Career Outcomes
                </h3>
                <ul className="grid gap-3 sm:grid-cols-3">
                  {course.overview.outcomes.map((item, i) => (
                    <li key={i} className="flex gap-2 text-xs sm:text-sm text-slate-700 leading-normal">
                      <Check className="size-4 shrink-0 text-blue-600 mt-0.5" />
                      <span className="text-justify font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Section 2: Syllabus Accordion */}
            <article id="syllabus" className="scroll-mt-36 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">Syllabus & Course Curriculum</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Explore modular layout tracks aligned to technical standards.</p>
              </div>

              <div className="space-y-2.5">
                {course.syllabus.map((item, index) => {
                  const isExpanded = expandedModule === index;
                  return (
                    <div
                      key={index}
                      className={cn(
                        "border rounded-xl transition-all duration-200 overflow-hidden shadow-sm",
                        isExpanded ? "border-blue-200 bg-blue-50/5" : "border-slate-100 bg-white"
                      )}
                    >
                      <button
                        onClick={() => setExpandedModule(isExpanded ? null : index)}
                        className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 hover:bg-slate-50/20 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[0.65rem] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded">
                            {item.module}
                          </span>
                          <span className="text-xs sm:text-sm">{item.title}</span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="size-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="size-4 text-slate-400" />
                        )}
                      </button>
                      
                      {isExpanded && (
                        <div className="border-t border-slate-100 p-4 bg-white">
                          <ul className="grid gap-2 sm:grid-cols-2">
                            {item.topics.map((topic, i) => (
                              <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                                <span className="size-1 bg-blue-500 rounded-full shrink-0" />
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>

            {/* Section 3: Practical Training */}
            <article id="practical" className="scroll-mt-36 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">Practical Training & Projects</h2>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="bg-slate-50/40 border border-slate-100 p-5 rounded-xl space-y-3">
                  <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <Briefcase className="size-4 text-blue-600" />
                    How You Practical Learn
                  </h3>
                  <ul className="space-y-2">
                    {course.practicalTraining.map((item, i) => (
                      <li key={i} className="flex gap-2 text-xs sm:text-sm text-slate-600">
                        <Check className="size-4 shrink-0 text-emerald-500 mt-0.5" />
                        <span className="text-justify">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-50/40 border border-slate-100 p-5 rounded-xl space-y-3">
                  <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <FileText className="size-4 text-blue-600" />
                    Portfolio Projects
                  </h3>
                  <div className="space-y-2.5">
                    {course.projects.map((project, i) => (
                      <div key={i} className="border border-slate-100/60 rounded-lg p-3 bg-white shadow-sm">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">{project.title}</h4>
                        <p className="text-[0.72rem] text-muted-foreground mt-1 text-justify leading-relaxed">{project.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Section 4: Certificate & Instructors */}
            <article id="instructors" className="scroll-mt-36 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">Certificate & Instructors</h2>
              </div>

              {/* Certificate layout */}
              <div className="grid gap-6 md:grid-cols-[1.25fr_1fr] border border-slate-100 rounded-xl p-5 bg-gradient-to-br from-white to-slate-50/40 items-center shadow-sm">
                <div className="space-y-2.5">
                  <span className="text-[0.62rem] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    Certification Included
                  </span>
                  <h3 className="text-base font-bold text-slate-800">Programmatic Industry Certification</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                    Get a digital certificate plus a verified, customized online badge upon successful submission of campaign audits, labs, or reports. Highlight your credentials on your LinkedIn profile.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="border border-slate-200 shadow-md rounded-xl bg-white p-3 rotate-1 max-w-[190px] text-center">
                    <Award className="size-9 text-amber-500 mx-auto" />
                    <span className="block text-[0.62rem] font-black text-slate-800 uppercase tracking-wider mt-2 leading-none">
                      Digital Tech Solution
                    </span>
                    <span className="block text-[0.55rem] text-slate-400 leading-none mt-1">
                      Authorized Certificate
                    </span>
                  </div>
                </div>
              </div>

              {/* Instructors Row */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Your Mentors</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {course.instructors.map((item) => (
                    <div key={item.name} className="flex gap-4 border border-slate-100 rounded-xl p-4 bg-white shadow-sm items-center hover:border-slate-200 transition-colors">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-12 rounded-full object-cover border border-slate-100 shrink-0"
                      />
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">{item.name}</h4>
                        <span className="block text-[0.68rem] text-muted-foreground">{item.role}</span>
                        <span className="block text-[0.62rem] text-blue-600 font-bold mt-0.5">{item.experience}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Section 5: Pricing */}
            <article id="pricing" className="scroll-mt-36 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">Course Pricing & Inclusions</h2>
              </div>

              <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50/50 border-b border-slate-100 p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <span className="text-[0.65rem] text-muted-foreground font-semibold">Total Fee Structure</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-xl sm:text-2xl font-black text-slate-900">{course.pricing.fee}</span>
                      {course.pricing.earlyFee && (
                        <span className="text-xs sm:text-sm text-slate-400 line-through">{course.pricing.earlyFee}</span>
                      )}
                    </div>
                  </div>
                  <BtnLink to="/request-call" variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 h-9.5 rounded-lg">
                    Apply Now
                  </BtnLink>
                </div>
                
                <div className="p-5 bg-white space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">What is included:</h3>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {course.pricing.includes.map((item) => (
                      <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                        <Check className="size-4 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-[0.68rem] text-muted-foreground text-justify border-t border-slate-50 pt-3 leading-relaxed">
                    * {course.pricing.note}
                  </p>
                </div>
              </div>
            </article>

            {/* Section 6: Testimonials & FAQs */}
            <article id="faqs" className="scroll-mt-36 space-y-8">
              {/* Testimonials */}
              <div className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-800">Testimonials & FAQs</h2>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  {course.testimonials.map((t, i) => (
                    <blockquote key={i} className="border border-slate-100 rounded-xl p-4 bg-slate-50/10 shadow-sm relative">
                      <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed text-justify">
                        "{t.quote}"
                      </p>
                      <cite className="block text-[0.68rem] font-bold text-slate-700 not-italic mt-3">
                        — {t.name}, student
                      </cite>
                    </blockquote>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Program FAQ</h3>
                <div className="space-y-2">
                  {course.faqs.map((faq, index) => {
                    const isFaqExpanded = expandedFaq === index;
                    return (
                      <div key={index} className="border border-slate-100 rounded-xl overflow-hidden bg-white shadow-sm">
                        <button
                          onClick={() => setExpandedFaq(isFaqExpanded ? null : index)}
                          className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-800 hover:bg-slate-50/20"
                        >
                          <span>{faq.question}</span>
                          {isFaqExpanded ? (
                            <ChevronUp className="size-4 text-slate-400 shrink-0 ml-2" />
                          ) : (
                            <ChevronDown className="size-4 text-slate-400 shrink-0 ml-2" />
                          )}
                        </button>
                        {isFaqExpanded && (
                          <div className="border-t border-slate-100 p-4 bg-slate-50/30 text-xs sm:text-sm text-slate-600 leading-relaxed text-justify">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </article>

          </div>

          {/* Right Column: Desktop Sticky Sidebar */}
          <aside className="relative">
            <div className="sticky top-36 hidden lg:block border border-slate-100 bg-white rounded-2xl p-5 shadow-[0_12px_32px_rgba(0,0,0,0.03)] space-y-4">
              <div>
                <span className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider">Course Fees</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-black text-slate-900">{course.pricing.fee}</span>
                  {course.pricing.earlyFee && (
                    <span className="text-xs text-slate-400 line-through">{course.pricing.earlyFee}</span>
                  )}
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <div className="space-y-3.5 text-xs text-slate-700">
                <div className="flex items-center gap-3">
                  <Clock className="size-4.5 text-blue-600 shrink-0" />
                  <div>
                    <span className="block font-bold text-slate-800">Duration</span>
                    <span className="text-slate-500">{course.duration}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Signal className="size-4.5 text-blue-600 shrink-0" />
                  <div>
                    <span className="block font-bold text-slate-800">Level</span>
                    <span className="text-slate-500">{course.level}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="size-4.5 text-blue-600 shrink-0" />
                  <div>
                    <span className="block font-bold text-slate-800">Certification</span>
                    <span className="text-slate-500">{course.certificate}</span>
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              <BtnLink to="/request-call" variant="primary" size="md" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 text-xs shadow-sm shadow-blue-500/10 rounded-lg">
                Request Callback
              </BtnLink>

              <p className="text-[0.65rem] text-center text-muted-foreground">
                Apply now and a career expert will guide you through the syllabus details.
              </p>
            </div>
          </aside>

        </div>
      </section>
    </SiteLayout>
  );
}

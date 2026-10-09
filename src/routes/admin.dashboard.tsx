import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  HelpCircle,
  LogOut,
  MessageSquare,
  ShieldCheck,
  Users,
  Star,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  Clock,
  Phone,
  Mail,
  User,
  Search,
  Filter,
  Download,
  CheckCircle2,
  X,
  Key,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Shield,
  Layers,
  Award,
  Sparkles,
  ChevronRight,
  Database,
  Home,
  TrendingUp,
  Bookmark,
  Gem,
  Maximize2,
  Bell,
  Power,
  Info,
  Menu,
  MoreVertical,
  Check,
  Radio,
  FileText,
  BarChart3,
  ChevronDown,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { useEffect, useState, useMemo, useRef } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import heroImg from "@/assets/hero-tech.jpg";
import { cn } from "@/lib/utils";
import { getAdminSession, clearAdminSession, type AdminSession } from "@/lib/auth";
import {
  POPULAR_COURSE_CATEGORIES,
  DEMO_COURSE_IDS,
  type FirebaseCourse,
  subscribeCourses,
  addCourseToFirebase,
  updateCourseInFirebase,
  deleteCourseFromFirebase,
  clearAllCoursesFromFirebase,
} from "@/services/courseService";
import {
  type FirebaseEnquiry,
  subscribeEnquiries,
  addEnquiryToFirebase,
  updateEnquiryInFirebase,
  deleteEnquiryFromFirebase,
  deleteDummyEnquiriesFromFirebase,
  isDummyEnquiry,
  clearAllEnquiries,
} from "@/services/enquiryService";
import {
  type FirebaseTestimonial,
  subscribeTestimonials,
  addTestimonialToFirebase,
  updateTestimonialInFirebase,
  deleteTestimonialFromFirebase,
  deleteDummyTestimonialsFromFirebase,
  isDummyTestimonial,
  clearAllTestimonials,
} from "@/services/testimonialService";
import {
  type FirebaseMentor,
  type MentorInput,
  subscribeMentors,
  addMentorToFirebase,
  updateMentorInFirebase,
  deleteMentorFromFirebase,
  deleteDemoMentorsFromFirebase,
  clearAllMentorsFromFirebase,
  getDefaultMentorAvatar,
} from "@/services/mentorService";
import {
  type FirebaseFaq,
  FAQ_CATEGORIES,
  subscribeFaqs,
  addFaqToFirebase,
  updateFaqInFirebase,
  deleteFaqFromFirebase,
  seedDefaultFaqsToFirebase,
} from "@/services/faqService";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Purple Admin Console | DIGITECHADEMY" },
      {
        name: "description",
        content: "Enterprise Purple Admin management console for DIGITECHADEMY.",
      },
    ],
  }),
  component: AdminDashboardPage,
});

type TabType = "dashboard" | "enquiries" | "courses" | "faqs" | "settings";

// --- TYPES FOR DASHBOARD DATA ---
interface Enquiry {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  course: string;
  callTime: string;
  date: string;
  status: "New" | "Contacted" | "Follow-up" | "Converted" | "Closed";
  progress: number;
}

interface CourseItem {
  id: string;
  title: string;
  slug: string;
  duration: string;
  level: string;
  instructor: string;
  price: string;
  students: number;
  active: boolean;
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  course: string;
  rating: number;
  content: string;
  featured: boolean;
}

interface InstructorItem {
  id: string;
  name: string;
  role: string;
  specialization: string;
  email: string;
  experience: string;
  activeBatches: number;
}

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

// Chart sample data
const barChartData = [
  { month: "Jan", DigitalMarketing: 40, CyberSecurity: 24, EthicalHacking: 30 },
  { month: "Feb", DigitalMarketing: 55, CyberSecurity: 35, EthicalHacking: 42 },
  { month: "Mar", DigitalMarketing: 70, CyberSecurity: 48, EthicalHacking: 60 },
  { month: "Apr", DigitalMarketing: 65, CyberSecurity: 55, EthicalHacking: 50 },
  { month: "May", DigitalMarketing: 85, CyberSecurity: 70, EthicalHacking: 75 },
  { month: "Jun", DigitalMarketing: 95, CyberSecurity: 85, EthicalHacking: 90 },
  { month: "Jul", DigitalMarketing: 110, CyberSecurity: 95, EthicalHacking: 105 },
];

const pieChartData = [
  { name: "Search Engines", value: 40, color: "#fe7096" },
  { name: "Direct Click", value: 35, color: "#047edf" },
  { name: "Social Referrals", value: 25, color: "#07b09e" },
];

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState<AdminSession | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [liveEnquiries, setLiveEnquiries] = useState<FirebaseEnquiry[]>([]);
  const [courses, setCourses] = useState<FirebaseCourse[]>([]);

  // Automatic cleanup of legacy sample dummy items from Firebase & browser storage on mount
  useEffect(() => {
    deleteDummyEnquiriesFromFirebase().catch(() => {});
    deleteDummyTestimonialsFromFirebase().catch(() => {});
    deleteDemoMentorsFromFirebase().catch(() => {});

    try {
      const enqRaw = localStorage.getItem("digital_tech_enquiries_db");
      if (enqRaw) {
        const parsed = JSON.parse(enqRaw);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter((e) => !isDummyEnquiry(e));
          if (cleaned.length !== parsed.length) {
            localStorage.setItem("digital_tech_enquiries_db", JSON.stringify(cleaned));
            localStorage.setItem("dta_enquiries", JSON.stringify(cleaned));
          }
        }
      }
      const testRaw = localStorage.getItem("digital_tech_testimonials_db");
      if (testRaw) {
        const parsed = JSON.parse(testRaw);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter((r) => !isDummyTestimonial(r));
          if (cleaned.length !== parsed.length) {
            localStorage.setItem("digital_tech_testimonials_db", JSON.stringify(cleaned));
          }
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Subscribe to live enquiries from Firebase & local storage
  useEffect(() => {
    const unsub = subscribeEnquiries((list) => {
      setLiveEnquiries(list);
    });
    return () => unsub();
  }, []);

  // Subscribe to live courses for dashboard stats
  useEffect(() => {
    const unsub = subscribeCourses((list) => {
      setCourses(list);
    });
    return () => unsub();
  }, []);

  const newEnquiriesCount = liveEnquiries.filter((e) => e.status === "New").length;

  // Verify Admin Session on mount
  useEffect(() => {
    setIsClient(true);
    const currentSession = getAdminSession();
    if (!currentSession) {
      navigate({ to: "/admin/login" });
    } else {
      setSession(currentSession);
      setIsVerifying(false);
    }
  }, [navigate]);

  const handleLogout = () => {
    clearAdminSession();
    navigate({ to: "/admin/login" });
  };

  if (isVerifying) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f2edf3]">
        <div className="text-center">
          <div className="size-12 border-4 border-[#b66dff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-800 font-black text-base">Loading Purple Admin...</p>
          <p className="text-slate-400 text-xs mt-1">Initializing control console</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f2edf3] text-slate-700 font-sans flex flex-col antialiased">
      {/* =========================================================================
          TOP NAVIGATION BAR
      ========================================================================= */}
      <header className="h-[70px] bg-white border-b border-slate-200/80 sticky top-0 z-40 flex items-center justify-between px-4 lg:px-7 shadow-xs">
        {/* Left: Brand Logo & Mobile Sidebar Toggle */}
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-[#9a55ff] to-[#da8cff] flex items-center justify-center text-white font-black shadow-md shadow-purple-500/25">
              <Layers className="size-5" />
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-[#9a55ff] via-[#b66dff] to-[#da8cff] bg-clip-text text-transparent">
              Purple
            </span>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100"
            aria-label="Toggle Sidebar"
          >
            <Menu className="size-5" />
          </button>

          {/* Global Search Bar */}
          <div className="hidden md:flex items-center gap-2 rounded-full bg-[#f8f9fa] border border-slate-200/80 px-4 py-2 w-72 lg:w-96">
            <Search className="size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search enquiries, courses, leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-slate-700 outline-none w-full placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Right Header Items */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Admin Profile Pill */}
          <div className="flex items-center gap-2.5 py-1 px-2 rounded-full hover:bg-slate-100/80 transition-colors cursor-pointer">
            <div className="relative size-9 rounded-full overflow-hidden border-2 border-[#b66dff] shadow-xs">
              <img src={heroImg} alt="Admin" className="w-full h-full object-cover" />
              <span className="absolute bottom-0 right-0 size-2 bg-emerald-500 rounded-full border border-white" />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-black text-slate-800 flex items-center gap-1">
                <span>Sunil Neelakantam</span>
                <ChevronDown className="size-3 text-slate-400" />
              </div>
              <span className="text-[10px] text-slate-400 font-semibold block">Super Admin</span>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block" />

          {/* Icon Controls */}
          <button
            className="hidden sm:grid size-8 place-items-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Toggle Fullscreen"
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              } else {
                document.exitFullscreen().catch(() => {});
              }
            }}
          >
            <Maximize2 className="size-4" />
          </button>

          {/* Messages */}
          <button
            onClick={() => setActiveTab("enquiries")}
            className="relative size-8 grid place-items-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Student Enquiries Inbox"
          >
            <Mail className="size-4" />
            <span className="absolute 1 top-1.5 right-1.5 size-2 bg-amber-400 rounded-full ring-2 ring-white" />
          </button>

          {/* Notifications */}
          <button
            className="relative size-8 grid place-items-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="System Alerts"
          >
            <Bell className="size-4" />
            <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {/* Power / Sign Out */}
          <button
            onClick={handleLogout}
            className="size-8 grid place-items-center rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Sign Out Console"
          >
            <Power className="size-4" />
          </button>
        </div>
      </header>

      {/* =========================================================================
          MAIN CONTAINER: SIDEBAR + CONTENT AREA
      ========================================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`fixed inset-y-0 left-0 top-[70px] z-30 w-64 bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 overflow-y-auto ${
            isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
          <div>
            {/* User Profile Card */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-slate-50 to-purple-50/40 border border-slate-100 mb-6">
              <div className="relative size-11 rounded-full overflow-hidden border-2 border-purple-300 shadow-sm shrink-0">
                <img src={heroImg} alt="User" className="w-full h-full object-cover" />
                <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full border-2 border-white" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-black text-slate-800 truncate flex items-center gap-1">
                  Sunil Neelakantam
                  <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                </h4>
                <p className="text-[11px] text-slate-400 truncate">Lead Administrator</p>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1">
              {[
                { id: "dashboard", label: "Dashboard", icon: Home, highlight: true },
                {
                  id: "enquiries",
                  label: "Student Enquiries",
                  icon: MessageSquare,
                  badge: newEnquiriesCount > 0 ? `${newEnquiriesCount} New` : undefined,
                },
                { id: "courses", label: "Course Catalog", icon: BookOpen },
                { id: "faqs", label: "Knowledgebase FAQs", icon: HelpCircle },
                { id: "settings", label: "Security & SMTP", icon: Shield },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as TabType);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                      isActive
                        ? "bg-gradient-to-r from-[#b66dff] to-[#da8cff] text-white shadow-md shadow-purple-500/20"
                        : "text-slate-600 hover:text-[#b66dff] hover:bg-purple-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`size-4.5 ${isActive ? "text-white" : "text-slate-400"}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive ? "bg-white/20 text-white" : "bg-purple-100 text-[#9a55ff]"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action CTA Button in Sidebar */}
            <div className="mt-8">
              <button
                onClick={() => {
                  setActiveTab("enquiries");
                  setIsSidebarOpen(false);
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 text-white text-xs font-black shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Plus className="size-4" />
                <span>+ View All Enquiries</span>
              </button>
            </div>

            {/* Category / Status Filter */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-3">
                Academic Tracks
              </span>
              <div className="space-y-2 text-xs font-bold text-slate-600">
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="size-2 rounded-full bg-[#fe7096]" />
                  <span>Digital Marketing Pro</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="size-2 rounded-full bg-[#047edf]" />
                  <span>Cyber Security Track</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <span className="size-2 rounded-full bg-[#07b09e]" />
                  <span>Ethical Hacking Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom App Info */}
          <div className="pt-6 text-[11px] text-slate-400 border-t border-slate-100 mt-6">
            <span>Purple Console v3.2</span>
          </div>
        </aside>

        {/* =========================================================================
            MAIN DASHBOARD CONTENT AREA
        ========================================================================= */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {/* TOP ANNOUNCEMENT BANNER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs mb-7">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-purple-50 text-[#b66dff] grid place-items-center shrink-0">
                <Sparkles className="size-4.5" />
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-700">
                Welcome to DIGITECHADEMY Console — Real-time Admissions, Batches & Lead Analytics.
              </p>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setActiveTab("courses")}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
              >
                View Catalog
              </button>
              <button
                onClick={() => setActiveTab("enquiries")}
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 rounded-xl shadow-md shadow-purple-500/20 transition-all cursor-pointer"
              >
                Admissions CRM
              </button>
            </div>
          </div>

          {/* BREADCRUMB HEADER */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-tr from-[#9a55ff] to-[#da8cff] grid place-items-center text-white shadow-md shadow-purple-500/25">
                <Home className="size-5" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight capitalize">
                  {activeTab}
                </h1>
                <p className="text-xs text-slate-400 font-medium">
                  DIGITECHADEMY Enterprise Control
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-[#9a55ff] bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-xl shadow-xs">
              <Info className="size-3.5" />
              <span>Overview</span>
            </div>
          </div>

          {/* =========================================================================
              RENDER ACTIVE TAB
          ========================================================================= */}
          {activeTab === "dashboard" && (
            <DashboardOverviewTab
              isClient={isClient}
              onNavigateTab={setActiveTab}
              recentEnquiries={liveEnquiries.slice(0, 6)}
              allEnquiries={liveEnquiries}
              totalLeads={liveEnquiries.length}
              courses={courses}
            />
          )}
          {activeTab === "enquiries" && <ManageEnquiriesTab />}
          {activeTab === "courses" && <ManageCoursesTab />}
          {activeTab === "faqs" && <ManageFaqsTab />}
          {activeTab === "settings" && <ManageSettingsTab session={session} />}
        </main>
      </div>
    </div>
  );
}

/* =========================================================================
   SUB-COMPONENT: DASHBOARD OVERVIEW (With Gradient Cards & Charts)
========================================================================= */
function DashboardOverviewTab({
  isClient,
  onNavigateTab,
  recentEnquiries = [],
  allEnquiries = [],
  totalLeads = 0,
  courses = [],
}: {
  isClient: boolean;
  onNavigateTab: (tab: TabType) => void;
  recentEnquiries?: FirebaseEnquiry[];
  allEnquiries?: FirebaseEnquiry[];
  totalLeads?: number;
  courses?: FirebaseCourse[];
}) {
  const enquiredStudentsCount = allEnquiries.length > 0 ? allEnquiries.length : totalLeads;
  const newEnquiriesCount = allEnquiries.filter((e) => e.status === "New").length;
  const convertedCount = allEnquiries.filter((e) => e.status === "Converted").length;
  const activeProgramsCount = courses.filter((c) => c.active !== false).length;

  return (
    <div className="space-y-7">
      {/* 3 BIG GRADIENT STAT CARDS WITH WATERMARK CIRCLES */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* CARD 1: CORAL / PINK GRADIENT */}
        <div
          onClick={() => onNavigateTab("courses")}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ffbf96] to-[#fe7096] p-6 text-white shadow-lg shadow-pink-500/15 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
        >
          {/* Translucent overlapping circular watermarks */}
          <div className="absolute -right-8 -top-8 size-36 rounded-full bg-white/15 pointer-events-none" />
          <div className="absolute right-4 -bottom-10 size-28 rounded-full bg-white/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-white/90">Catalog Programs</h3>
              <TrendingUp className="size-5 text-white/80" />
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              {courses.length} {courses.length === 1 ? "Program" : "Programs"}
            </div>
            <p className="text-xs font-bold text-white/80 flex items-center gap-1">
              <span>{activeProgramsCount} Active &amp; Published in Firebase</span>
            </p>
          </div>
        </div>

        {/* CARD 2: BLUE / CYAN GRADIENT */}
        <div
          onClick={() => onNavigateTab("enquiries")}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#90caf9] to-[#047edf] p-6 text-white shadow-lg shadow-blue-500/15 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
        >
          {/* Translucent overlapping circular watermarks */}
          <div className="absolute -right-8 -top-8 size-36 rounded-full bg-white/15 pointer-events-none" />
          <div className="absolute right-4 -bottom-10 size-28 rounded-full bg-white/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-white/90">Students In Enquire List</h3>
              <Users className="size-5 text-white/80" />
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              {enquiredStudentsCount} {enquiredStudentsCount === 1 ? "Student" : "Students"}
            </div>
            <p className="text-xs font-bold text-white/80 flex items-center gap-1">
              <span>{newEnquiriesCount} New Leads in Firebase</span>
            </p>
          </div>
        </div>

        {/* CARD 3: TEAL / EMERALD GRADIENT */}
        <div
          onClick={() => onNavigateTab("enquiries")}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#84d9d2] to-[#07b09e] p-6 text-white shadow-lg shadow-teal-500/15 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
        >
          {/* Translucent overlapping circular watermarks */}
          <div className="absolute -right-8 -top-8 size-36 rounded-full bg-white/15 pointer-events-none" />
          <div className="absolute right-4 -bottom-10 size-28 rounded-full bg-white/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-white/90">Admissions &amp; Converted</h3>
              <Gem className="size-5 text-white/80" />
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              {convertedCount} {convertedCount === 1 ? "Admission" : "Admissions"}
            </div>
            <p className="text-xs font-bold text-white/80 flex items-center gap-1">
              <span>{enquiredStudentsCount - convertedCount} In Counselling Pipeline</span>
            </p>
          </div>
        </div>
      </div>

      {/* CHARTS GRID: BAR CHART + DONUT PIE CHART */}
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* LEFT: BAR CHART (Visit and Sales / Admissions Statistics) */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base font-black text-slate-800">Visit And Sales Statistics</h3>
              <p className="text-xs text-slate-400">
                Monthly student interest & conversion metrics
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-bold">
              <span className="flex items-center gap-1 text-slate-600">
                <span className="size-2.5 rounded-full bg-[#b66dff]" /> DM Track
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <span className="size-2.5 rounded-full bg-[#fe7096]" /> Cyber Sec
              </span>
              <span className="flex items-center gap-1 text-slate-600">
                <span className="size-2.5 rounded-full bg-[#047edf]" /> Ethical Hack
              </span>
            </div>
          </div>

          <div className="h-[280px] w-full">
            {isClient && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} barGap={4}>
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderRadius: "12px",
                      color: "#fff",
                      border: "none",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="DigitalMarketing" fill="#b66dff" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="CyberSecurity" fill="#fe7096" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="EthicalHacking" fill="#047edf" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* RIGHT: DONUT PIE CHART (Traffic Sources) */}
        <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-black text-slate-800 mb-1">Traffic Sources</h3>
            <p className="text-xs text-slate-400">Where student leads originate from</p>
          </div>

          <div className="h-[200px] w-full relative flex items-center justify-center my-2">
            {isClient && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      borderRadius: "12px",
                      color: "#fff",
                      border: "none",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="absolute text-center pointer-events-none">
              <span className="text-xs text-slate-400 font-bold block">Total Leads</span>
              <span className="text-lg font-black text-slate-800">100%</span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-2 pt-3 border-t border-slate-100 text-xs font-bold text-slate-600">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#fe7096]" /> Search Engines
              </span>
              <span>40%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#047edf]" /> Direct Click
              </span>
              <span>35%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#07b09e]" /> Social Referrals
              </span>
              <span>25%</span>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ADMISSIONS & ENQUIRIES TABLE */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-base font-black text-slate-800">
              Recent Student Admissions Status
            </h3>
            <p className="text-xs text-slate-400">Live callback requests and enrollment states</p>
          </div>
          <button
            onClick={() => onNavigateTab("enquiries")}
            className="text-xs font-bold text-[#b66dff] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Leads</span>
            <ChevronRight className="size-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Interested Subject</th>
                <th className="py-3 px-3">Status Badge</th>
                <th className="py-3 px-3">Last Update</th>
                <th className="py-3 px-3">Batch Progress</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-400 font-medium">
                    <div className="size-10 rounded-full bg-purple-50 text-[#b66dff] flex items-center justify-center mx-auto mb-2">
                      <Mail className="size-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-700">No Student Enquiries Yet</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      New leads submitted via website contact forms and demo popups will appear here
                      in real-time.
                    </p>
                  </td>
                </tr>
              ) : (
                recentEnquiries.map((item) => {
                  const statusBg =
                    item.status === "Converted"
                      ? "from-[#b66dff] to-[#da8cff]"
                      : item.status === "Contacted"
                        ? "from-[#90caf9] to-[#047edf]"
                        : item.status === "Follow-up"
                          ? "from-[#ffbf96] to-[#fe7096]"
                          : "from-[#84d9d2] to-[#07b09e]";
                  const progressBar =
                    item.status === "Converted"
                      ? "bg-[#b66dff]"
                      : item.status === "Contacted"
                        ? "bg-[#047edf]"
                        : item.status === "Follow-up"
                          ? "bg-[#fe7096]"
                          : "bg-[#07b09e]";
                  const formattedDate = item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                      })
                    : "Today";

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-3 font-extrabold text-slate-800 flex items-center gap-2.5">
                        <div className="size-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div>{item.name}</div>
                          {"phone" in item && Boolean((item as any).phone) && (
                            <div className="text-[10px] text-slate-400 font-normal">
                              {(item as any).phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-600">{item.course}</td>
                      <td className="py-3.5 px-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[10px] font-black text-white bg-gradient-to-r ${statusBg} shadow-xs`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-slate-400 font-medium">{formattedDate}</td>
                      <td className="py-3.5 px-3">
                        <div className="w-28 bg-slate-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${progressBar}`}
                            style={{
                              width: `${item.progress || (item.status === "Converted" ? 100 : item.status === "Contacted" ? 60 : item.status === "Follow-up" ? 80 : 20)}%`,
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: STUDENT ENQUIRIES CRM (LIVE FIREBASE SYNC)
========================================================================= */
function ManageEnquiriesTab() {
  const [enquiries, setEnquiries] = useState<FirebaseEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEnquiry, setNewEnquiry] = useState({
    name: "",
    phone: "",
    email: "",
    course: "Digital Marketing Mastery",
    callTime: "Morning (9 AM - 12 PM)",
    source: "Admin Walk-in",
  });

  // Subscribe to live Firebase enquiries
  useEffect(() => {
    const unsub = subscribeEnquiries((list) => {
      setEnquiries(list);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (item.name || "").toLowerCase().includes(q) ||
        (item.email || "").toLowerCase().includes(q) ||
        (item.phone || "").includes(q) ||
        (item.course || "").toLowerCase().includes(q) ||
        (item.source || "").toLowerCase().includes(q);

      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchQuery, statusFilter]);

  const [isDeletingDemoLeads, setIsDeletingDemoLeads] = useState(false);

  const handleDeleteDemoLeads = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete all dummy/sample leads? Any real website submissions will be preserved.",
      )
    ) {
      return;
    }
    setIsDeletingDemoLeads(true);
    try {
      await deleteDummyEnquiriesFromFirebase();
    } finally {
      setIsDeletingDemoLeads(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: FirebaseEnquiry["status"]) => {
    const progressMap: Record<string, number> = {
      New: 20,
      Contacted: 50,
      "Follow-up": 75,
      Converted: 100,
      Closed: 0,
    };
    await updateEnquiryInFirebase(id, {
      status: newStatus,
      progress: progressMap[newStatus] ?? 20,
    });
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (confirm("Are you sure you want to delete this enquiry record?")) {
      await deleteEnquiryFromFirebase(id);
    }
  };

  const handleAddEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEnquiry.name || !newEnquiry.phone) return;

    await addEnquiryToFirebase({
      name: newEnquiry.name.trim(),
      phone: newEnquiry.phone.trim(),
      email: newEnquiry.email.trim() || "N/A",
      course: newEnquiry.course,
      callTime: newEnquiry.callTime,
      source: "Admin Walk-in",
      status: "New",
      progress: 20,
    });

    setIsAddModalOpen(false);
    setNewEnquiry({
      name: "",
      phone: "",
      email: "",
      course: "Digital Marketing Mastery",
      callTime: "Morning (9 AM - 12 PM)",
      source: "Admin Walk-in",
    });
  };

  const handleExportCSV = () => {
    const headers = [
      "Student Name",
      "Phone",
      "Email",
      "Course",
      "Call Time / Notes",
      "Source",
      "Date Received",
      "Status",
    ];
    const rows = filteredEnquiries.map((e) => [
      `"${(e.name || "").replace(/"/g, '""')}"`,
      `"${(e.phone || "").replace(/"/g, '""')}"`,
      `"${(e.email || "").replace(/"/g, '""')}"`,
      `"${(e.course || "").replace(/"/g, '""')}"`,
      `"${(e.callTime || "").replace(/"/g, '""')}"`,
      `"${(e.source || "Website Form").replace(/"/g, '""')}"`,
      `"${e.createdAt ? new Date(e.createdAt).toLocaleString() : ""}"`,
      `"${e.status || "New"}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `student_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "from-[#84d9d2] to-[#07b09e]";
      case "Contacted":
        return "from-[#90caf9] to-[#047edf]";
      case "Follow-up":
        return "from-[#ffbf96] to-[#fe7096]";
      case "Converted":
        return "from-[#b66dff] to-[#da8cff]";
      default:
        return "from-slate-400 to-slate-600";
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-slate-900">Student Admissions CRM</h3>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Firebase Sync
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time tracking for course enquiries ({filteredEnquiries.length} total)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
          {/* Delete Demo Leads Button */}
          <button
            type="button"
            onClick={handleDeleteDemoLeads}
            disabled={isDeletingDemoLeads}
            className="border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold flex items-center gap-1.5 h-10 px-3.5 rounded-xl cursor-pointer transition-all disabled:opacity-50"
            title="Delete all dummy/sample leads"
          >
            {isDeletingDemoLeads ? (
              <RefreshCw className="size-3.5 animate-spin" />
            ) : (
              <Trash2 className="size-3.5" />
            )}
            <span>Delete Demo Leads</span>
          </button>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 h-10 px-3.5 rounded-xl cursor-pointer transition-all"
            title="Download Leads as Excel CSV"
          >
            <Download className="size-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          {/* Add Enquiry Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 text-white text-xs font-black flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer transition-all"
          >
            <Plus className="size-4" />
            <span>Add Walk-in Enquiry</span>
          </button>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="grid gap-3 sm:grid-cols-[1fr_220px] mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, phone, email, course or source..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition-all focus:border-[#b66dff] focus:ring-1 focus:ring-[#b66dff]"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm text-slate-700 font-bold outline-none focus:border-[#b66dff]"
        >
          <option value="ALL">All Statuses ({enquiries.length})</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Follow-up">Follow-up</option>
          <option value="Converted">Converted</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-3">Student</th>
              <th className="py-3 px-3">Contact Details & Actions</th>
              <th className="py-3 px-3">Course Interest</th>
              <th className="py-3 px-3">Source & Preferred Time</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredEnquiries.length > 0 ? (
              filteredEnquiries.map((enq) => {
                const cleanPhone = (enq.phone || "").replace(/\D/g, "");
                const formattedDate = enq.createdAt
                  ? new Date(enq.createdAt).toLocaleDateString("en-IN", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Recent";

                return (
                  <tr key={enq.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-3 font-extrabold text-slate-800">
                      <div className="flex items-center gap-2.5">
                        <div className="size-8 rounded-full bg-purple-50 text-[#b66dff] font-black grid place-items-center shrink-0 border border-purple-100">
                          {(enq.name || "S").slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-slate-900 font-black">{enq.name}</div>
                          <span className="text-[11px] text-slate-400 font-normal block">
                            {formattedDate}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-0.5">
                          <a
                            href={`tel:${enq.phone}`}
                            className="text-xs font-semibold text-[#b66dff] hover:underline flex items-center gap-1"
                          >
                            <Phone className="size-3" />
                            {enq.phone}
                          </a>
                          {enq.email && enq.email !== "N/A" && (
                            <a
                              href={`mailto:${enq.email}`}
                              className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1 truncate max-w-[160px]"
                            >
                              <Mail className="size-3" />
                              {enq.email}
                            </a>
                          )}
                        </div>

                        {/* WhatsApp Button */}
                        {cleanPhone && (
                          <a
                            href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                              `Hi ${enq.name}, thank you for requesting a demo for ${enq.course} at DIGITECHADEMY. How can our counselors assist you?`,
                            )}`}
                            target="_blank"
                            rel="noreferrer"
                            className="size-7 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white grid place-items-center transition-colors shrink-0 shadow-2xs"
                            title="Chat with Student on WhatsApp"
                          >
                            <MessageSquare className="size-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className="font-bold text-slate-800 block">{enq.course}</span>
                    </td>
                    <td className="py-4 px-3 text-slate-500">
                      <div className="flex flex-col gap-1">
                        <span className="inline-block px-2 py-0.5 rounded-md bg-purple-50 text-[#9a55ff] border border-purple-100 text-[10px] font-bold self-start">
                          {enq.source || "Website Form"}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400">
                          <Clock className="size-3 text-slate-400" />
                          {enq.callTime || "Free Demo Request"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <select
                        value={enq.status}
                        onChange={(e) =>
                          handleStatusChange(enq.id, e.target.value as FirebaseEnquiry["status"])
                        }
                        className={`text-[10px] font-black uppercase text-white bg-gradient-to-r ${getStatusBadge(
                          enq.status,
                        )} rounded-full px-3 py-1 outline-none shadow-xs cursor-pointer`}
                      >
                        <option value="New" className="text-slate-800 bg-white font-bold">
                          New
                        </option>
                        <option value="Contacted" className="text-slate-800 bg-white font-bold">
                          Contacted
                        </option>
                        <option value="Follow-up" className="text-slate-800 bg-white font-bold">
                          Follow-up
                        </option>
                        <option value="Converted" className="text-slate-800 bg-white font-bold">
                          Converted
                        </option>
                        <option value="Closed" className="text-slate-800 bg-white font-bold">
                          Closed
                        </option>
                      </select>
                    </td>
                    <td className="py-4 px-3 text-right">
                      <button
                        onClick={() => handleDeleteEnquiry(enq.id)}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Record"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <AlertCircle className="size-6 text-slate-300" />
                    <span>No enquiries matching your search or filters.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ADD ENQUIRY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h4 className="text-base font-black text-slate-900">Add Walk-in Enquiry</h4>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleAddEnquiry} className="flex flex-col gap-3.5">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Student Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ramesh Reddy"
                  value={newEnquiry.name}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#b66dff]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  required
                  type="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={newEnquiry.phone}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#b66dff]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@example.com"
                  value={newEnquiry.email}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#b66dff]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Selected Course
                </label>
                <select
                  value={newEnquiry.course}
                  onChange={(e) => setNewEnquiry({ ...newEnquiry, course: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#b66dff]"
                >
                  <option value="Digital Marketing Mastery">Digital Marketing Mastery</option>
                  <option value="Cyber Security & Ethical Hacking">
                    Cyber Security & Ethical Hacking
                  </option>
                  <option value="Advanced SEO & Performance Marketing">
                    Advanced SEO & Performance Marketing
                  </option>
                  <option value="Web Development Bootcamp">Web Development Bootcamp</option>
                  <option value="Data Analytics with Python & BI">
                    Data Analytics with Python & BI
                  </option>
                </select>
              </div>

              <div className="flex gap-2 justify-end mt-4 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 shadow-md shadow-purple-500/20 cursor-pointer"
                >
                  Save Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   TAB: COURSES CATALOG & POPULAR CATEGORIES MANAGEMENT
========================================================================= */
function ManageCoursesTab() {
  const [courses, setCourses] = useState<FirebaseCourse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(
    null,
  );

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<FirebaseCourse | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<string>("Cyber Security");
  const [formCustomCategory, setFormCustomCategory] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDuration, setFormDuration] = useState("12 Weeks (120+ Hours)");
  const [formLevel, setFormLevel] = useState("Beginner to Advanced");
  const [formInstructor, setFormInstructor] = useState("Sai Rama");
  const [formPrice, setFormPrice] = useState("₹24,999");
  const [formDescription, setFormDescription] = useState("");
  const [formHighlights, setFormHighlights] = useState("");
  const [formFeatured, setFormFeatured] = useState(true);
  const [formActive, setFormActive] = useState(true);

  // Sub-tabs for the Course Modal
  type CourseModalTab = "basic" | "about" | "curriculum" | "description" | "faqs";
  const [courseModalTab, setCourseModalTab] = useState<CourseModalTab>("basic");

  // Detailed Course Fields: About Tab
  const [formAboutDesc, setFormAboutDesc] = useState("");
  const [formAboutLearn, setFormAboutLearn] = useState("");
  const [formAboutAudience, setFormAboutAudience] = useState("");
  const [formAboutOutcomes, setFormAboutOutcomes] = useState("");

  // Detailed Course Fields: Curriculum Tab
  interface SyllabusModuleForm {
    module: string;
    title: string;
    topicsText: string;
  }
  const [formSyllabus, setFormSyllabus] = useState<SyllabusModuleForm[]>([]);

  // Detailed Course Fields: Description Tab
  const [formLongDescription, setFormLongDescription] = useState("");

  // Detailed Course Fields: FAQs Tab
  interface CourseFaqForm {
    question: string;
    answer: string;
  }
  const [formCourseFaqs, setFormCourseFaqs] = useState<CourseFaqForm[]>([]);

  // Subscribe to live courses from Firebase
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeCourses((list) => {
      setCourses(list);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Category badge styles mapping for visual delight
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Cyber Security":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Digital Marketing":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Programmatic Advertising":
        return "bg-sky-50 text-sky-700 border-sky-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // Open modal to add a new course
  const handleOpenAddModal = (defaultCategory?: string) => {
    setEditingCourse(null);
    setCourseModalTab("basic");
    setFormTitle("");
    const cat =
      defaultCategory || (selectedCategory !== "All" ? selectedCategory : "Cyber Security");
    setFormCategory(cat);
    setFormCustomCategory("");
    setFormSlug("");
    setFormDuration("12 Weeks (120+ Hours)");
    setFormLevel("Beginner to Advanced");
    setFormInstructor("Sai Rama");
    setFormPrice("₹24,999");
    setFormDescription("");
    setFormHighlights("");
    setFormFeatured(true);
    setFormActive(true);

    // About defaults - empty so admin adds items
    setFormAboutDesc("");
    setFormAboutLearn("");
    setFormAboutAudience("");
    setFormAboutOutcomes("");

    // Curriculum defaults - empty so admin adds modules
    setFormSyllabus([]);

    // Description default - empty so admin adds description
    setFormLongDescription("");

    // FAQs default - empty so admin adds FAQs
    setFormCourseFaqs([]);

    setIsModalOpen(true);
  };

  // Open modal to edit existing course
  const handleOpenEditModal = (course: FirebaseCourse) => {
    setEditingCourse(course);
    setCourseModalTab("basic");
    setFormTitle(course.title);
    if (POPULAR_COURSE_CATEGORIES.includes(course.category as any)) {
      setFormCategory(course.category);
      setFormCustomCategory("");
    } else {
      setFormCategory("Other");
      setFormCustomCategory(course.category);
    }
    setFormSlug(course.slug);
    setFormDuration(course.duration);
    setFormLevel(course.level);
    setFormInstructor(course.instructor);
    setFormPrice(course.price);
    setFormDescription(course.description);
    setFormHighlights(course.highlights ? course.highlights.join(", ") : "");
    setFormFeatured(course.featured ?? true);
    setFormActive(course.active ?? true);

    // About
    setFormAboutDesc(course.about?.description || "");
    setFormAboutLearn(
      course.about?.learn && course.about.learn.length > 0 ? course.about.learn.join("\n") : "",
    );
    setFormAboutAudience(
      course.about?.audience && course.about.audience.length > 0
        ? course.about.audience.join("\n")
        : "",
    );
    setFormAboutOutcomes(
      course.about?.outcomes && course.about.outcomes.length > 0
        ? course.about.outcomes.join("\n")
        : "",
    );

    // Curriculum
    if (course.syllabus && course.syllabus.length > 0) {
      setFormSyllabus(
        course.syllabus.map((s) => ({
          module: s.module,
          title: s.title,
          topicsText: (s.topics || []).join("\n"),
        })),
      );
    } else {
      setFormSyllabus([]);
    }

    // Description
    setFormLongDescription(course.longDescription || "");

    // FAQs
    if (course.faqs && course.faqs.length > 0) {
      setFormCourseFaqs(
        course.faqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        })),
      );
    } else {
      setFormCourseFaqs([]);
    }

    setIsModalOpen(true);
  };

  // Syllabus Module Helpers
  const handleAddSyllabusModule = () => {
    setFormSyllabus((prev) => [
      ...prev,
      {
        module: `Module ${prev.length + 1}`,
        title: "",
        topicsText: "",
      },
    ]);
  };

  const handleUpdateSyllabusModule = (
    index: number,
    field: "module" | "title" | "topicsText",
    value: string,
  ) => {
    setFormSyllabus((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const handleRemoveSyllabusModule = (index: number) => {
    setFormSyllabus((prev) => prev.filter((_, i) => i !== index));
  };

  // FAQs Helpers
  const handleAddFaq = () => {
    setFormCourseFaqs((prev) => [
      ...prev,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const handleUpdateFaq = (index: number, field: "question" | "answer", value: string) => {
    setFormCourseFaqs((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const handleRemoveFaq = (index: number) => {
    setFormCourseFaqs((prev) => prev.filter((_, i) => i !== index));
  };

  // Auto-slug generator when title changes
  const handleTitleChange = (val: string) => {
    setFormTitle(val);
    if (!editingCourse) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormSlug(generated);
    }
  };

  // Save course to Firebase
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFeedback({ type: "error", text: "Please provide a valid Course Title." });
      return;
    }

    const finalCategory =
      formCategory === "Other" ? formCustomCategory.trim() || "General" : formCategory;

    const highlightsArray = formHighlights
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const parseLines = (text: string) =>
      text
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

    const aboutPayload = {
      description: formAboutDesc.trim(),
      learn: parseLines(formAboutLearn),
      audience: parseLines(formAboutAudience),
      outcomes: parseLines(formAboutOutcomes),
    };

    const syllabusPayload = formSyllabus
      .filter((m) => m.title.trim() || m.module.trim() || m.topicsText.trim())
      .map((m, idx) => ({
        module: m.module.trim() || `Module ${idx + 1}`,
        title: m.title.trim() || `Module ${idx + 1}`,
        topics: parseLines(m.topicsText),
      }));

    const faqsPayload = formCourseFaqs
      .filter((f) => f.question.trim() || f.answer.trim())
      .map((f) => ({
        question: f.question.trim(),
        answer: f.answer.trim(),
      }));

    const longDescPayload = formLongDescription.trim();

    setIsSaving(true);
    try {
      if (editingCourse) {
        await updateCourseInFirebase(editingCourse.id, {
          title: formTitle.trim(),
          category: finalCategory,
          slug: formSlug.trim() || editingCourse.slug,
          duration: formDuration.trim(),
          level: formLevel,
          instructor: formInstructor.trim(),
          price: formPrice.trim(),
          description: formDescription.trim(),
          longDescription: longDescPayload,
          highlights: highlightsArray,
          featured: formFeatured,
          active: formActive,
          about: aboutPayload,
          syllabus: syllabusPayload,
          faqs: faqsPayload,
        });
        setFeedback({
          type: "success",
          text: `"${formTitle}" successfully updated (About, Curriculum, Description & FAQs synced in Firebase)!`,
        });
      } else {
        await addCourseToFirebase({
          title: formTitle.trim(),
          category: finalCategory,
          slug: formSlug.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          duration: formDuration.trim(),
          level: formLevel,
          instructor: formInstructor.trim(),
          price: formPrice.trim(),
          description: formDescription.trim(),
          longDescription: longDescPayload,
          highlights: highlightsArray,
          featured: formFeatured,
          active: formActive,
          students: 0,
          about: aboutPayload,
          syllabus: syllabusPayload,
          faqs: faqsPayload,
        });
        setFeedback({
          type: "success",
          text: `"${formTitle}" successfully added to ${finalCategory} with full curriculum and stored in Firebase!`,
        });
      }
      setIsModalOpen(false);
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.message || "Failed to save course. Check Firebase connection.",
      });
    } finally {
      setIsSaving(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  // Delete course
  const handleDeleteCourse = async (id: string, title: string) => {
    try {
      await deleteCourseFromFirebase(id);
      setDeleteConfirmId(null);
      setFeedback({
        type: "success",
        text: `Course "${title}" removed from Firebase catalog.`,
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: err?.message || "Failed to delete course.",
      });
    } finally {
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Dynamically calculate category statistics strictly according to the actual courses present
  const { availableCategories, categoryStats } = useMemo(() => {
    const counts: Record<string, number> = {};
    courses.forEach((c) => {
      const cat = (c.category || "").trim();
      if (cat) {
        counts[cat] = (counts[cat] || 0) + 1;
      }
    });

    // Only categories that currently have courses (count > 0), sorted by course count
    const activeCats = Object.keys(counts).sort((a, b) => {
      if ((counts[b] || 0) !== (counts[a] || 0)) {
        return (counts[b] || 0) - (counts[a] || 0);
      }
      return a.localeCompare(b);
    });

    return { availableCategories: activeCats, categoryStats: counts };
  }, [courses]);

  // Reset selected category to "All" if current selection no longer exists in courses
  useEffect(() => {
    if (selectedCategory !== "All" && !availableCategories.includes(selectedCategory)) {
      setSelectedCategory("All");
    }
  }, [availableCategories, selectedCategory]);

  // Filter courses
  const filteredCourses = courses.filter((c) => {
    const matchesCategory =
      selectedCategory === "All" || c.category.toLowerCase() === selectedCategory.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Alert / Feedback Notification */}
      {feedback && (
        <div
          className={cn(
            "p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-bold border transition-all animate-in fade-in slide-in-from-top-2",
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200",
          )}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="size-4 sm:size-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="size-4 sm:size-5 text-rose-600 shrink-0" />
            )}
            <span>{feedback.text}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="p-1 rounded-lg hover:bg-black/5 text-slate-500 hover:text-slate-700"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      {/* Main Catalog Header Box */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Academic Courses & Popular Categories
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-50 text-[#b66dff] border border-purple-200">
                <Database className="size-3" />
                Firebase Cloud Sync
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Add and manage curriculum courses stored in Firebase Firestore across all popular
              categories
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handleOpenAddModal()}
              className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] text-white text-xs font-black flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Plus className="size-4" />
              <span>Add New Program</span>
            </button>
          </div>
        </div>

        {/* Course Categories Overview Filter Pills (Filtered According to Courses) */}
        <div className="mt-5 pt-1">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
              Course Categories ({availableCategories.length})
            </span>
            <span className="text-[11px] text-slate-400 font-semibold">
              Click a category to filter courses
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5",
                selectedCategory === "All"
                  ? "bg-[#b66dff] text-white border-[#b66dff] shadow-sm shadow-purple-500/20"
                  : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100",
              )}
            >
              <span>All Courses</span>
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px]",
                  selectedCategory === "All"
                    ? "bg-white/25 text-white"
                    : "bg-slate-200 text-slate-700",
                )}
              >
                {courses.length}
              </span>
            </button>

            {availableCategories.map((cat) => {
              const count = categoryStats[cat] || 0;
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5",
                    isSelected
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50",
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-full text-[10px]",
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600",
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
          <div className="relative w-full sm:w-80">
            <Search className="size-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title, instructor, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <div className="text-xs text-slate-400 font-medium ml-auto">
            Showing <strong className="text-slate-700">{filteredCourses.length}</strong> of{" "}
            <strong className="text-slate-700">{courses.length}</strong> total programs
          </div>
        </div>
      </div>

      {/* Courses Cards List */}
      {isLoading ? (
        <div className="bg-white border border-slate-200/80 p-12 rounded-2xl shadow-xs text-center">
          <RefreshCw className="size-8 text-[#b66dff] animate-spin mx-auto mb-3" />
          <p className="text-slate-800 font-bold text-sm">Loading courses from Firebase...</p>
          <p className="text-slate-400 text-xs mt-1">Connecting to Firestore collection</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="bg-white border border-slate-200/80 p-10 rounded-2xl shadow-xs text-center">
          <div className="size-14 rounded-full bg-purple-50 text-[#b66dff] flex items-center justify-center mx-auto mb-3">
            <BookOpen className="size-7" />
          </div>
          <h4 className="text-base font-bold text-slate-900">No courses found</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
            {searchQuery
              ? `No courses matching "${searchQuery}". Try clearing your search filter.`
              : `No courses created under "${selectedCategory}" yet. Add one to store it directly in Firebase!`}
          </p>
          <div className="flex items-center justify-center gap-3">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl"
              >
                Clear Search
              </button>
            )}
            <button
              onClick={() =>
                handleOpenAddModal(selectedCategory !== "All" ? selectedCategory : undefined)
              }
              className="text-xs font-bold text-white bg-[#b66dff] hover:bg-[#a655ff] px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm shadow-purple-500/20"
            >
              <Plus className="size-3.5" />
              <span>Add Course to {selectedCategory !== "All" ? selectedCategory : "Catalog"}</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="border border-slate-200/80 p-5 rounded-2xl bg-white shadow-xs hover:border-[#b66dff]/40 transition-all flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                {/* Top Badges Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-black border",
                      getCategoryBadgeClass(course.category),
                    )}
                  >
                    {course.category}
                  </span>

                  {course.featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-700 border border-amber-200">
                      <Sparkles className="size-3" />
                      Popular Category Featured
                    </span>
                  )}

                  {course.active ? (
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Published
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-100 text-slate-500 border border-slate-200">
                      Draft
                    </span>
                  )}
                </div>

                {/* Course Title */}
                <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                  {course.title}
                </h4>

                {/* Course Description */}
                {course.description && (
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>
                )}

                {/* Key Highlights Chips */}
                {course.highlights && course.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {course.highlights.slice(0, 5).map((h, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10.5px] font-medium"
                      >
                        {h}
                      </span>
                    ))}
                    {course.highlights.length > 5 && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10.5px] text-slate-400 font-medium">
                        +{course.highlights.length - 5} more
                      </span>
                    )}
                  </div>
                )}

                {/* Meta details footer */}
                <div className="pt-2 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500 font-medium border-t border-slate-100/90">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3.5 text-slate-400" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="size-3.5 text-slate-400" />
                    {course.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="size-3.5 text-slate-400" />
                    Lead:{" "}
                    <strong className="text-slate-700 font-semibold">{course.instructor}</strong>
                  </span>
                  <span className="flex items-center gap-1 font-bold text-slate-800">
                    Fee: {course.price}
                  </span>
                  <span className="flex items-center gap-1 text-[#b66dff] font-bold">
                    <Users className="size-3.5" />
                    {course.students} Enrolled
                  </span>
                  {course.syllabus && course.syllabus.length > 0 && (
                    <span className="flex items-center gap-1 text-slate-700 font-semibold">
                      <BookOpen className="size-3.5 text-[#b66dff]" />
                      {course.syllabus.length} Modules
                    </span>
                  )}
                  {course.faqs && course.faqs.length > 0 && (
                    <span className="flex items-center gap-1 text-slate-700 font-semibold">
                      <HelpCircle className="size-3.5 text-[#b66dff]" />
                      {course.faqs.length} FAQs
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                <a
                  href={`/courses/${course.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  title="View public course page in new tab"
                  className="flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 px-3 py-2 rounded-xl transition-colors"
                >
                  <ExternalLink className="size-3.5" />
                  <span>View</span>
                </a>

                <button
                  onClick={() => handleOpenEditModal(course)}
                  className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-[#b66dff] bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  <Edit3 className="size-3.5" />
                  <span>Edit</span>
                </button>

                {deleteConfirmId === course.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDeleteCourse(course.id, course.title)}
                      className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-2.5 py-2 rounded-xl transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 px-2.5 py-2 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(course.id)}
                    title="Delete Course"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT COURSE MODAL DIALOG (5-TAB COMPLETE CURRICULUM SUITE)
      ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden my-6 sm:my-8 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-purple-50/70 via-purple-50/30 to-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-gradient-to-tr from-[#b66dff] to-[#da8cff] flex items-center justify-center text-white shadow-md shadow-purple-500/20 shrink-0">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                    {editingCourse
                      ? `Edit Program: ${editingCourse.title}`
                      : "Create Academic Program"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Save directly into Firebase Firestore: Basic Info, About & Outcomes, Curriculum,
                    Description, and FAQs
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="size-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Modal Sub-Tabs Navigation */}
            <div className="px-5 sm:px-6 pt-3 pb-0 border-b border-slate-100 bg-slate-50/60 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setCourseModalTab("basic")}
                className={cn(
                  "px-3.5 py-2 text-xs font-bold rounded-t-xl border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer",
                  courseModalTab === "basic"
                    ? "border-[#b66dff] text-[#b66dff] bg-white shadow-xs"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60",
                )}
              >
                <Bookmark className="size-3.5" />
                <span>1. Basic Info</span>
              </button>

              <button
                type="button"
                onClick={() => setCourseModalTab("about")}
                className={cn(
                  "px-3.5 py-2 text-xs font-bold rounded-t-xl border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer",
                  courseModalTab === "about"
                    ? "border-[#b66dff] text-[#b66dff] bg-white shadow-xs"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60",
                )}
              >
                <Info className="size-3.5" />
                <span>2. About & Outcomes</span>
              </button>

              <button
                type="button"
                onClick={() => setCourseModalTab("curriculum")}
                className={cn(
                  "px-3.5 py-2 text-xs font-bold rounded-t-xl border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer",
                  courseModalTab === "curriculum"
                    ? "border-[#b66dff] text-[#b66dff] bg-white shadow-xs"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60",
                )}
              >
                <Layers className="size-3.5" />
                <span>3. Curriculum ({formSyllabus.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setCourseModalTab("description")}
                className={cn(
                  "px-3.5 py-2 text-xs font-bold rounded-t-xl border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer",
                  courseModalTab === "description"
                    ? "border-[#b66dff] text-[#b66dff] bg-white shadow-xs"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60",
                )}
              >
                <FileText className="size-3.5" />
                <span>4. Description</span>
              </button>

              <button
                type="button"
                onClick={() => setCourseModalTab("faqs")}
                className={cn(
                  "px-3.5 py-2 text-xs font-bold rounded-t-xl border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer",
                  courseModalTab === "faqs"
                    ? "border-[#b66dff] text-[#b66dff] bg-white shadow-xs"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60",
                )}
              >
                <HelpCircle className="size-3.5" />
                <span>5. FAQs ({formCourseFaqs.length})</span>
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCourse} className="flex flex-col flex-1 min-h-0">
              <div className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
                {/* TAB 1: BASIC INFO */}
                {courseModalTab === "basic" && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    {/* Title */}
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        Course Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Master Full Stack Web Development"
                        value={formTitle}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 font-semibold"
                      />
                    </div>

                    {/* Category & Slug Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-700 mb-1.5">
                          Course Category <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 font-semibold cursor-pointer"
                        >
                          {POPULAR_COURSE_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                          <option value="Other">Other / Custom Category...</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 mb-1.5">
                          URL Slug <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="web-development"
                          value={formSlug}
                          onChange={(e) => setFormSlug(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 font-mono"
                        />
                        <span className="text-[10.5px] text-slate-400 mt-1 block">
                          URL will be: /courses/{formSlug || "course-name"}
                        </span>
                      </div>
                    </div>

                    {/* Custom category if "Other" is chosen */}
                    {formCategory === "Other" && (
                      <div>
                        <label className="block text-xs font-black text-slate-700 mb-1.5">
                          Enter Custom Category Name <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Artificial Intelligence & Machine Learning"
                          value={formCustomCategory}
                          onChange={(e) => setFormCustomCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800"
                        />
                      </div>
                    )}

                    {/* Duration & Level */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-700 mb-1.5">
                          Duration & Schedule <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 12 Weeks (120+ Hours)"
                          value={formDuration}
                          onChange={(e) => setFormDuration(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 mb-1.5">
                          Skill Level <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={formLevel}
                          onChange={(e) => setFormLevel(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 cursor-pointer"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Beginner to Advanced">Beginner to Advanced</option>
                        </select>
                      </div>
                    </div>

                    {/* Instructor & Fee */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black text-slate-700 mb-1.5">
                          Lead Instructor <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sai Rama"
                          value={formInstructor}
                          onChange={(e) => setFormInstructor(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-black text-slate-700 mb-1.5">
                          Course Fee / Tuition <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ₹24,999"
                          value={formPrice}
                          onChange={(e) => setFormPrice(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 font-bold"
                        />
                      </div>
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        Card Summary / Short Description <span className="text-rose-500">*</span>
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Brief 1-2 sentence overview shown on course catalog cards..."
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 leading-relaxed"
                      />
                    </div>

                    {/* Key Highlights / Skills */}
                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        Key Skills & Highlights (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. HTML5, CSS3, React, Node.js, Express, MongoDB"
                        value={formHighlights}
                        onChange={(e) => setFormHighlights(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800"
                      />
                    </div>

                    {/* Checkboxes: Featured & Published */}
                    <div className="pt-2 flex flex-wrap items-center gap-6 border-t border-slate-100">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 select-none">
                        <input
                          type="checkbox"
                          checked={formFeatured}
                          onChange={(e) => setFormFeatured(e.target.checked)}
                          className="size-4 rounded-md text-[#b66dff] focus:ring-[#b66dff] border-slate-300"
                        />
                        <span>Feature in "Popular Course Categories"</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 select-none">
                        <input
                          type="checkbox"
                          checked={formActive}
                          onChange={(e) => setFormActive(e.target.checked)}
                          className="size-4 rounded-md text-[#b66dff] focus:ring-[#b66dff] border-slate-300"
                        />
                        <span>Active & Published on Website</span>
                      </label>
                    </div>
                  </div>
                )}

                {/* TAB 2: ABOUT & OUTCOMES */}
                {courseModalTab === "about" && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-4 flex items-start gap-3">
                      <Info className="size-5 text-[#b66dff] shrink-0 mt-0.5" />
                      <div className="text-xs text-purple-900 leading-relaxed">
                        <strong className="font-bold">Course "About" Tab Configuration:</strong>{" "}
                        These sections appear on the course detail page under the{" "}
                        <strong>About</strong> tab, including what students will learn, who should
                        attend, and expected career outcomes.
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        About Course Overview / Lead Description
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Detailed introductory overview of the course, objectives, and training vision..."
                        value={formAboutDesc}
                        onChange={(e) => setFormAboutDesc(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 leading-relaxed"
                      />
                      <span className="text-[10.5px] text-slate-400 mt-1 block">
                        If left empty, the short description from Basic Info will be used.
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-black text-slate-700">
                          What You Will Learn (Points)
                        </label>
                        <span className="text-[10.5px] font-bold text-[#b66dff] bg-purple-50 px-2 py-0.5 rounded-md">
                          One item per line
                        </span>
                      </div>
                      <textarea
                        rows={4}
                        placeholder={
                          "Hands-on production projects\nCore architecture & design patterns\nDatabase design & API integration\nLive deployment and cloud workflows"
                        }
                        value={formAboutLearn}
                        onChange={(e) => setFormAboutLearn(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 leading-relaxed font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-black text-slate-700">
                            Who Should Attend
                          </label>
                          <span className="text-[10px] font-bold text-slate-400">One per line</span>
                        </div>
                        <textarea
                          rows={4}
                          placeholder={
                            "Graduates & college students\nWorking developers upskilling\nCareer transitioners"
                          }
                          value={formAboutAudience}
                          onChange={(e) => setFormAboutAudience(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 leading-relaxed font-mono"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-black text-slate-700">
                            Career Outcomes
                          </label>
                          <span className="text-[10px] font-bold text-slate-400">One per line</span>
                        </div>
                        <textarea
                          rows={4}
                          placeholder={
                            "Job-ready portfolio\nInterview preparation assistance\nRecognized completion certificate"
                          }
                          value={formAboutOutcomes}
                          onChange={(e) => setFormAboutOutcomes(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 leading-relaxed font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: CURRICULUM (SYLLABUS) */}
                {courseModalTab === "curriculum" && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-purple-50/70 to-white p-4 rounded-2xl border border-purple-100">
                      <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                          Course Modules & Syllabus Breakdown
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Build the step-by-step modular curriculum shown on the public course page.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddSyllabusModule}
                        className="px-3.5 py-1.5 bg-[#b66dff] hover:bg-[#a355f3] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-center transition-colors"
                      >
                        <Plus className="size-3.5" />
                        <span>Add Module</span>
                      </button>
                    </div>

                    {formSyllabus.length === 0 ? (
                      <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                        <Layers className="size-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-600">No modules added yet</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Click the "Add Module" button above to structure the syllabus.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formSyllabus.map((mod, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-slate-50 border border-slate-200 rounded-2xl relative space-y-3 hover:border-purple-200 transition-colors"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10.5px] font-black bg-purple-100 text-[#b66dff]">
                                #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveSyllabusModule(idx)}
                                title="Remove Module"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                  Module Label
                                </label>
                                <input
                                  type="text"
                                  placeholder={`Module ${idx + 1}`}
                                  value={mod.module}
                                  onChange={(e) =>
                                    handleUpdateSyllabusModule(idx, "module", e.target.value)
                                  }
                                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] text-slate-800 font-semibold"
                                />
                              </div>

                              <div className="sm:col-span-2">
                                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                  Module Title / Topic Heading
                                </label>
                                <input
                                  type="text"
                                  placeholder="e.g. Master React Hooks & State Management"
                                  value={mod.title}
                                  onChange={(e) =>
                                    handleUpdateSyllabusModule(idx, "title", e.target.value)
                                  }
                                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] text-slate-800 font-bold"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="block text-[11px] font-bold text-slate-600">
                                  Topics Covered (one per line)
                                </label>
                                <span className="text-[10px] text-slate-400">
                                  One bullet point per line
                                </span>
                              </div>
                              <textarea
                                rows={3}
                                placeholder={
                                  "Components & JSX\nProps and State\nuseEffect and Lifecycle"
                                }
                                value={mod.topicsText}
                                onChange={(e) =>
                                  handleUpdateSyllabusModule(idx, "topicsText", e.target.value)
                                }
                                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] text-slate-800 font-mono leading-relaxed"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 4: DESCRIPTION */}
                {courseModalTab === "description" && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="bg-purple-50/60 border border-purple-100 rounded-2xl p-4 flex items-start gap-3">
                      <FileText className="size-5 text-[#b66dff] shrink-0 mt-0.5" />
                      <div className="text-xs text-purple-900 leading-relaxed">
                        <strong className="font-bold">
                          Course "Description" Tab Configuration:
                        </strong>{" "}
                        Provide an in-depth explanation of practical training, real-world laboratory
                        assignments, industrial workflows, tool integrations, and mentorship
                        methodology.
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        Comprehensive Training Methodology & Practical Learning Description
                      </label>
                      <textarea
                        rows={10}
                        placeholder={
                          "Our training model centers around immersive, project-based learning...\n\nEvery session includes live coding walkthroughs, code reviews, and industry-standard best practices...\n\nStudents will work on 3 end-to-end projects deployed to production environments..."
                        }
                        value={formLongDescription}
                        onChange={(e) => setFormLongDescription(e.target.value)}
                        className="w-full px-3.5 py-3 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 leading-relaxed"
                      />
                      <span className="text-[10.5px] text-slate-400 mt-1 block">
                        Displayed prominently under the "Description" tab on the course detail page.
                      </span>
                    </div>
                  </div>
                )}

                {/* TAB 5: FAQS */}
                {courseModalTab === "faqs" && (
                  <div className="space-y-4 animate-in fade-in duration-150">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-purple-50/70 to-white p-4 rounded-2xl border border-purple-100">
                      <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">
                          Course-Specific FAQs
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Answer frequently asked questions specifically for this program.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="px-3.5 py-1.5 bg-[#b66dff] hover:bg-[#a355f3] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-center transition-colors"
                      >
                        <Plus className="size-3.5" />
                        <span>Add FAQ</span>
                      </button>
                    </div>

                    {formCourseFaqs.length === 0 ? (
                      <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-2xl">
                        <HelpCircle className="size-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-600">No FAQs added yet</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Click "+ Add FAQ" above to add common questions and clear answers.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formCourseFaqs.map((faq, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 relative hover:border-purple-200 transition-colors"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10.5px] font-black bg-purple-100 text-[#b66dff]">
                                Q{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFaq(idx)}
                                title="Remove FAQ"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                Question
                              </label>
                              <input
                                type="text"
                                placeholder="e.g. Do I receive a certificate upon course completion?"
                                value={faq.question}
                                onChange={(e) => handleUpdateFaq(idx, "question", e.target.value)}
                                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] text-slate-800 font-bold"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-bold text-slate-600 mb-1">
                                Answer
                              </label>
                              <textarea
                                rows={2}
                                placeholder="e.g. Yes, you will receive an industry-recognized certificate..."
                                value={faq.answer}
                                onChange={(e) => handleUpdateFaq(idx, "answer", e.target.value)}
                                className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] text-slate-800 leading-relaxed"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer with quick tabs navigation & submit */}
              <div className="p-4 px-6 border-t border-slate-100 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold">
                    Current Section:{" "}
                    <span className="text-[#b66dff] font-black capitalize">
                      {courseModalTab === "basic" && "1. Basic Info"}
                      {courseModalTab === "about" && "2. About & Outcomes"}
                      {courseModalTab === "curriculum" && "3. Curriculum (Syllabus)"}
                      {courseModalTab === "description" && "4. Description"}
                      {courseModalTab === "faqs" && "5. FAQs"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 text-xs font-black text-white bg-gradient-to-r from-[#b66dff] to-[#da8cff] rounded-xl shadow-md shadow-purple-500/25 hover:opacity-95 transition-opacity flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <RefreshCw className="size-3.5 animate-spin" />
                        <span>Saving to Firebase...</span>
                      </>
                    ) : (
                      <>
                        <Database className="size-3.5" />
                        <span>Save Course to Firebase</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   TAB: TESTIMONIALS
========================================================================= */
function ManageTestimonialsTab() {
  const [reviews, setReviews] = useState<FirebaseTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<FirebaseTestimonial | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    course: "Digital Marketing Mastery",
    rating: 5,
    content: "",
    featured: true,
  });

  // Subscribe to live testimonials
  useEffect(() => {
    const unsub = subscribeTestimonials((data) => {
      setReviews(data);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const [isDeletingDemoReviews, setIsDeletingDemoReviews] = useState(false);

  const handleDeleteDemoReviews = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete all demo student reviews from Firebase & local cache?",
      )
    ) {
      return;
    }
    setIsDeletingDemoReviews(true);
    try {
      await deleteDummyTestimonialsFromFirebase();
      showToast("Demo reviews successfully removed!");
    } finally {
      setIsDeletingDemoReviews(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormData({
      name: "",
      role: "",
      company: "",
      course: "Digital Marketing Mastery",
      rating: 5,
      content: "",
      featured: true,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (rev: FirebaseTestimonial) => {
    setEditingReview(rev);
    setFormData({
      name: rev.name,
      role: rev.role,
      company: rev.company,
      course: rev.course,
      rating: rev.rating,
      content: rev.content,
      featured: rev.featured,
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.content.trim()) return;

    setIsSubmitting(true);
    try {
      if (editingReview) {
        await updateTestimonialInFirebase(editingReview.id, {
          name: formData.name.trim(),
          role: formData.role.trim() || "Alumni",
          company: formData.company.trim() || "Graduate",
          course: formData.course,
          rating: Number(formData.rating),
          content: formData.content.trim(),
          featured: Boolean(formData.featured),
        });
        showToast("Student review updated successfully!");
      } else {
        await addTestimonialToFirebase({
          name: formData.name.trim(),
          role: formData.role.trim() || "Alumni",
          company: formData.company.trim() || "Graduate",
          course: formData.course,
          rating: Number(formData.rating),
          content: formData.content.trim(),
          featured: Boolean(formData.featured),
        });
        showToast("New student review added successfully!");
      }
      setIsAddModalOpen(false);
      setEditingReview(null);
    } catch (err) {
      console.error("Failed to save review:", err);
      showToast("Error saving review to database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (rev: FirebaseTestimonial) => {
    if (window.confirm(`Are you sure you want to delete the review by "${rev.name}"?`)) {
      await deleteTestimonialFromFirebase(rev.id);
      showToast("Review deleted successfully.");
    }
  };

  const handleToggleFeatured = async (rev: FirebaseTestimonial) => {
    await updateTestimonialInFirebase(rev.id, { featured: !rev.featured });
    showToast(rev.featured ? "Removed from featured list." : "Featured on Wall of Love!");
  };

  // Filter reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((rev) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        rev.name.toLowerCase().includes(q) ||
        rev.company.toLowerCase().includes(q) ||
        rev.course.toLowerCase().includes(q) ||
        rev.content.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (filterRating === "featured") return rev.featured;
      if (filterRating === "5") return rev.rating === 5;
      if (filterRating === "4") return rev.rating === 4;

      return true;
    });
  }, [reviews, searchQuery, filterRating]);

  return (
    <div className="space-y-6">
      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 shadow-2xl border border-slate-700 animate-in fade-in duration-200">
          <CheckCircle2 className="size-4.5 text-emerald-400" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* HEADER CARD */}
      <div className="bg-white border border-slate-200/80 p-5 sm:p-6 rounded-2xl shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900">Student Reviews & Wall of Love</h3>
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-purple-50 text-[#9a55ff] border border-purple-100">
                {reviews.length} Total
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Add and manage student feedback, course ratings, and featured testimonials for the
              public site
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleDeleteDemoReviews}
              disabled={isDeletingDemoReviews}
              className="border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold flex items-center gap-1.5 h-10 px-3.5 rounded-xl cursor-pointer transition-all disabled:opacity-50"
              title="Delete all demo student reviews"
            >
              {isDeletingDemoReviews ? (
                <RefreshCw className="size-3.5 animate-spin" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
              <span>Delete Demo Reviews</span>
            </button>

            <button
              onClick={handleOpenAdd}
              className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 text-white text-xs font-black flex items-center gap-2 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer transition-all"
            >
              <Plus className="size-4" />
              <span>Add Student Review</span>
            </button>
          </div>
        </div>

        {/* SEARCH & FILTERS BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student, course, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:border-[#b66dff] focus:bg-white text-slate-700 transition-colors"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {[
              { id: "all", label: `All (${reviews.length})` },
              { id: "featured", label: `Featured (${reviews.filter((r) => r.featured).length})` },
              { id: "5", label: `5 Stars ★ (${reviews.filter((r) => r.rating === 5).length})` },
              { id: "4", label: `4 Stars ★ (${reviews.filter((r) => r.rating === 4).length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterRating(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0 ${
                  filterRating === tab.id
                    ? "bg-[#b66dff] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* REVIEWS GRID */}
      {filteredReviews.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="border border-slate-200/80 p-5 rounded-2xl bg-white shadow-xs flex flex-col justify-between hover:border-purple-200 hover:shadow-md transition-all group"
            >
              <div>
                {/* Top Row: Stars & Featured Toggle */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <button
                    onClick={() => handleToggleFeatured(rev)}
                    className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border transition-all cursor-pointer ${
                      rev.featured
                        ? "bg-purple-50 text-[#b66dff] border-purple-200 hover:bg-purple-100"
                        : "bg-slate-50 text-slate-400 border-slate-200 hover:text-slate-600"
                    }`}
                    title="Click to toggle featured on homepage"
                  >
                    {rev.featured ? "★ Featured" : "Standard"}
                  </button>
                </div>

                {/* Course Chip */}
                <div className="mb-2">
                  <span className="text-[10.5px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100/60 inline-block truncate max-w-full">
                    {rev.course}
                  </span>
                </div>

                {/* Content Quote */}
                <p className="text-xs text-slate-650 leading-relaxed italic line-clamp-4">
                  "{rev.content}"
                </p>
              </div>

              {/* Bottom Row: Student Profile & Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="min-w-0 flex-1 pr-2">
                  <h5 className="text-xs font-black text-slate-900 truncate">{rev.name}</h5>
                  <p className="text-[11px] text-slate-400 truncate">
                    {rev.role} &bull; {rev.company}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(rev)}
                    className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                    title="Edit Review"
                  >
                    <Edit3 className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(rev)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Review"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 p-12 rounded-2xl text-center shadow-xs">
          <div className="size-14 rounded-full bg-purple-50 text-[#b66dff] flex items-center justify-center mx-auto mb-3">
            <Star className="size-7" />
          </div>
          <h4 className="text-base font-black text-slate-800">No Student Reviews Found</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? "No reviews match your search keywords or filter criteria."
              : "No student reviews have been added yet. Click the button below to add your first verified student review."}
          </p>
          <button
            onClick={handleOpenAdd}
            className="mt-4 px-4 py-2 text-xs font-black text-white bg-gradient-to-r from-[#b66dff] to-[#da8cff] rounded-xl shadow-md shadow-purple-500/20 cursor-pointer"
          >
            Add Student Review
          </button>
        </div>
      )}

      {/* =========================================================================
          ADD / EDIT REVIEW MODAL
      ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-xl bg-purple-50 text-[#b66dff] grid place-items-center">
                  <Star className="size-4.5 fill-[#b66dff]" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    {editingReview ? "Edit Student Review" : "Add Student Review"}
                  </h4>
                  <p className="text-xs text-slate-400 font-medium">
                    Store verified learner feedback in Firestore
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingReview(null);
                }}
                className="text-slate-400 hover:text-slate-700 p-1 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Student Name */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Student Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ananya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#b66dff] focus:ring-2 focus:ring-purple-500/10"
                />
              </div>

              {/* Role & Company Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Role / Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SOC Analyst Intern"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#b66dff]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CyberGuard Defense"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#b66dff]"
                  />
                </div>
              </div>

              {/* Course Completed */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Course Completed *
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#b66dff] bg-white cursor-pointer"
                >
                  <option value="Digital Marketing Mastery">Digital Marketing Mastery</option>
                  <option value="Cyber Security & Ethical Hacking">
                    Cyber Security & Ethical Hacking
                  </option>
                  <option value="Advanced SEO & Performance Marketing">
                    Advanced SEO & Performance Marketing
                  </option>
                  <option value="Web Development Bootcamp">Web Development Bootcamp</option>
                  <option value="Data Analytics with Python & BI">
                    Data Analytics with Python & BI
                  </option>
                  <option value="Network Defense & Security Operations">
                    Network Defense & Security Operations
                  </option>
                  <option value="Programmatic Advertising Course">
                    Programmatic Advertising Course
                  </option>
                  <option value="Ethical Hacking & Security Fundamentals">
                    Ethical Hacking & Security Fundamentals
                  </option>
                </select>
              </div>

              {/* Star Rating Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Rating (1 to 5 Stars) *
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-amber-50/80 border border-amber-200/60 px-3 py-2 rounded-xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-0.5 hover:scale-115 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`size-6 ${
                            star <= formData.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-200 text-slate-200"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-600">
                    {formData.rating === 5 && "5 / 5 — Excellent / Career Transition"}
                    {formData.rating === 4 && "4 / 5 — Very Good Experience"}
                    {formData.rating === 3 && "3 / 5 — Good / Average"}
                    {formData.rating <= 2 && `${formData.rating} / 5`}
                  </span>
                </div>
              </div>

              {/* Review / Feedback Content */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                  Review & Feedback Quote *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share the student's review, what they loved about hands-on practice, mentor guidance, labs, or job preparation..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-[#b66dff] resize-none"
                />
              </div>

              {/* Feature on Wall of Love Toggle */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-purple-50/50 border border-purple-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="size-4 text-[#b66dff] rounded focus:ring-purple-400 cursor-pointer"
                />
                <div>
                  <span className="text-xs font-extrabold text-slate-900 block">
                    Feature on Homepage Wall of Love
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Highlight this review on the main landing page and testimonials carousel
                  </span>
                </div>
              </label>

              {/* Modal Buttons */}
              <div className="flex gap-2 justify-end mt-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingReview(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 shadow-md shadow-purple-500/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting && (
                    <div className="size-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  <span>{editingReview ? "Update Review" : "Save Student Review"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   TAB: INSTRUCTORS & FACULTY MENTORS (LIVE FIREBASE SYNC)
========================================================================= */
function ManageInstructorsTab() {
  const [mentors, setMentors] = useState<FirebaseMentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [trackFilter, setTrackFilter] = useState<string>("ALL");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMentor, setEditingMentor] = useState<FirebaseMentor | null>(null);
  const [modalTab, setModalTab] = useState<"basic" | "photo" | "bio" | "skills">("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingDemo, setIsDeletingDemo] = useState(false);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formRole, setFormRole] = useState("");
  const [formTrack, setFormTrack] = useState("Digital Marketing & SEO");
  const [formCustomTrack, setFormCustomTrack] = useState("");
  const [formExperience, setFormExperience] = useState("8+ Years Experience");
  const [formEmail, setFormEmail] = useState("");
  const [formActiveBatches, setFormActiveBatches] = useState(3);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customMode, setCustomMode] = useState<"upload" | "url">("upload");
  const [formCustomImage, setFormCustomImage] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [formBio, setFormBio] = useState("");
  const [formFullBio, setFormFullBio] = useState("");
  const [formSkillsText, setFormSkillsText] = useState("");
  const [formFocusText, setFormFocusText] = useState("");
  const [formActive, setFormActive] = useState(true);
  const [formOrder, setFormOrder] = useState(1);

  // Resize and compress uploaded image to a clean ~30-50KB Data URL for ultra fast loading and Firestore compatibility
  const resizeAndOptimizeImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxDim = 400;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxDim) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            }
          } else {
            if (height > maxDim) {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(e.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = e.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleImageFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file (PNG, JPG, or WebP).");
      return;
    }
    setIsProcessingImage(true);
    try {
      const optimized = await resizeAndOptimizeImage(file);
      setFormCustomImage(optimized);
      setUploadedFileName(`${file.name} (${Math.round(file.size / 1024)} KB)`);
      setCustomMode("upload");
      showToast("Photo uploaded and optimized successfully!");
    } catch (err) {
      console.error("Image processing error:", err);
      showToast("Failed to process image file.");
    } finally {
      setIsProcessingImage(false);
    }
  };

  // Subscribe to live mentors from Firebase & local cache, and clean out any demo mentors
  useEffect(() => {
    deleteDemoMentorsFromFirebase().catch(() => {});
    const unsub = subscribeMentors((list) => {
      setMentors(list);
      setIsLoading(false);
    });
    return () => unsub();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Helper to open Add modal
  const handleOpenAdd = () => {
    setEditingMentor(null);
    setModalTab("basic");
    setFormName("");
    setFormRole("");
    setFormTrack("Digital Marketing & SEO");
    setFormCustomTrack("");
    setFormExperience("8+ Years Experience");
    setFormEmail("");
    setFormActiveBatches(2);
    setCustomMode("upload");
    setFormCustomImage("");
    setUploadedFileName(null);
    setFormBio("");
    setFormFullBio("");
    setFormSkillsText("");
    setFormFocusText("");
    setFormActive(true);
    setFormOrder(mentors.length + 1);
    setIsModalOpen(true);
  };

  // Helper to open Edit modal
  const handleOpenEdit = (mentor: FirebaseMentor) => {
    setEditingMentor(mentor);
    setModalTab("basic");
    setFormName(mentor.name);
    setFormRole(mentor.role);

    const standardTracks = [
      "Digital Marketing & SEO",
      "Cyber Security & Defense",
      "Programmatic Advertising",
      "Paid Social & Growth",
      "Offensive Security",
      "Web Development & Engineering",
      "Data Analytics & AI",
    ];
    if (standardTracks.includes(mentor.track)) {
      setFormTrack(mentor.track);
      setFormCustomTrack("");
    } else {
      setFormTrack("Other");
      setFormCustomTrack(mentor.track);
    }

    setFormExperience(mentor.experience);
    setFormEmail(mentor.email || "");
    setFormActiveBatches(mentor.activeBatches ?? 2);

    // Identify avatar choice
    setFormCustomImage(mentor.image || "");
    if (mentor.image?.startsWith("data:")) {
      setCustomMode("upload");
      setUploadedFileName("Uploaded Custom Image");
    } else if (
      mentor.image &&
      (mentor.image.startsWith("http://") || mentor.image.startsWith("https://"))
    ) {
      setCustomMode("url");
      setUploadedFileName(null);
    } else {
      setCustomMode("upload");
      setUploadedFileName(null);
    }

    setFormBio(mentor.bio || "");
    setFormFullBio(mentor.fullBio || "");
    setFormSkillsText((mentor.skills || []).join(", "));
    setFormFocusText((mentor.mentorshipFocus || []).join("\n"));
    setFormActive(mentor.active !== false);
    setFormOrder(mentor.order ?? 1);
    setIsModalOpen(true);
  };

  // Helper: Resolve image to save
  const resolveSelectedImage = (): string => {
    if (formCustomImage && formCustomImage.trim()) {
      return formCustomImage.trim();
    }
    return getDefaultMentorAvatar(formName);
  };

  // Save Mentor to Firebase
  const handleSaveMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formRole.trim()) {
      showToast("Please provide both Mentor Name and Designation/Role.");
      return;
    }

    const finalTrack =
      formTrack === "Other" ? formCustomTrack.trim() || "Technology & Digital" : formTrack;

    const skillsArray = formSkillsText
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const focusArray = formFocusText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const resolvedImage = resolveSelectedImage();

    setIsSubmitting(true);
    try {
      if (editingMentor) {
        await updateMentorInFirebase(editingMentor.id, {
          name: formName.trim(),
          role: formRole.trim(),
          track: finalTrack,
          experience: formExperience.trim() || "5+ Years Experience",
          email: formEmail.trim(),
          activeBatches: Number(formActiveBatches) || 1,
          image: resolvedImage,
          bio: formBio.trim() || `${formRole.trim()} with expertise in ${finalTrack}.`,
          fullBio:
            formFullBio.trim() ||
            formBio.trim() ||
            `${formName.trim()} is an experienced industry practitioner leading the ${finalTrack} track at DIGITECHADEMY.`,
          skills: skillsArray.length > 0 ? skillsArray : [finalTrack, "Practical Mentorship"],
          mentorshipFocus:
            focusArray.length > 0
              ? focusArray
              : ["1-on-1 practical project code reviews", "Portfolio and resume enhancement"],
          active: Boolean(formActive),
          order: Number(formOrder) || 1,
        });
        showToast(`Mentor profile for "${formName}" updated successfully!`);
      } else {
        await addMentorToFirebase({
          name: formName.trim(),
          role: formRole.trim(),
          track: finalTrack,
          experience: formExperience.trim() || "5+ Years Experience",
          email: formEmail.trim(),
          activeBatches: Number(formActiveBatches) || 1,
          image: resolvedImage,
          bio: formBio.trim() || `${formRole.trim()} with expertise in ${finalTrack}.`,
          fullBio:
            formFullBio.trim() ||
            formBio.trim() ||
            `${formName.trim()} is an experienced industry practitioner leading the ${finalTrack} track at DIGITECHADEMY.`,
          skills: skillsArray.length > 0 ? skillsArray : [finalTrack, "Practical Mentorship"],
          mentorshipFocus:
            focusArray.length > 0
              ? focusArray
              : ["1-on-1 practical project code reviews", "Portfolio and resume enhancement"],
          active: Boolean(formActive),
          order: Number(formOrder) || mentors.length + 1,
        });
        showToast(`New mentor "${formName}" added to faculty and published live!`);
      }
      setIsModalOpen(false);
      setEditingMentor(null);
    } catch (err: any) {
      console.error("Failed to save mentor:", err);
      showToast(err?.message || "Failed to save mentor to database.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Mentor
  const handleDeleteMentor = async (mentor: FirebaseMentor) => {
    if (
      !window.confirm(
        `Are you sure you want to remove mentor "${mentor.name}" from the faculty catalog? This will also remove them from the website.`,
      )
    ) {
      return;
    }
    try {
      await deleteMentorFromFirebase(mentor.id);
      showToast(`Mentor "${mentor.name}" successfully removed.`);
    } catch (err: any) {
      showToast(err?.message || "Failed to delete mentor.");
    }
  };

  // Delete all demo mentors
  const handleDeleteDemoMentors = async () => {
    if (
      !window.confirm(
        "Delete all demo mentors (Arjun, Priya, Vikram, Sneha, Karthik) from Firebase and local cache? Any custom mentors you created will be preserved.",
      )
    ) {
      return;
    }
    setIsDeletingDemo(true);
    try {
      const count = await deleteDemoMentorsFromFirebase();
      showToast(`Demo mentors successfully removed (${count} cleaned).`);
    } catch (err: any) {
      showToast(err?.message || "Failed to remove demo mentors.");
    } finally {
      setIsDeletingDemo(false);
    }
  };

  // Filtered mentors
  const filteredMentors = useMemo(() => {
    return mentors.filter((m) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        (m.name || "").toLowerCase().includes(q) ||
        (m.role || "").toLowerCase().includes(q) ||
        (m.track || "").toLowerCase().includes(q) ||
        (m.skills || []).some((s) => s.toLowerCase().includes(q)) ||
        (m.email || "").toLowerCase().includes(q);

      const matchesTrack = trackFilter === "ALL" || m.track === trackFilter;
      return matchesSearch && matchesTrack;
    });
  }, [mentors, searchQuery, trackFilter]);

  // Unique tracks for filter
  const allTracks = useMemo(() => {
    const set = new Set<string>();
    mentors.forEach((m) => {
      if (m.track) set.add(m.track);
    });
    return Array.from(set);
  }, [mentors]);

  return (
    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
      {/* TOAST ALERT */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg font-black text-slate-900">Faculty &amp; Industry Mentors</h3>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-50 text-[#b66dff] text-[10px] font-extrabold border border-purple-200">
              <span className="size-1.5 rounded-full bg-[#b66dff] animate-pulse" />
              Live Website Sync
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Admin-controlled faculty profiles rendered dynamically across /about and /courses (
            {mentors.length} active)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Delete Demo Mentors Button */}
          <button
            type="button"
            onClick={handleDeleteDemoMentors}
            disabled={isDeletingDemo}
            className="border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold flex items-center gap-1.5 h-10 px-3.5 rounded-xl cursor-pointer transition-all disabled:opacity-50"
            title="Delete all demo mentors from database"
          >
            {isDeletingDemo ? (
              <RefreshCw className="size-3.5 animate-spin" />
            ) : (
              <Trash2 className="size-3.5" />
            )}
            <span>Delete Demo Mentors</span>
          </button>

          {/* Add Mentor Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 text-white text-xs font-black flex items-center gap-2 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer transition-all"
          >
            <Plus className="size-4" />
            <span>Add New Mentor</span>
          </button>
        </div>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="grid gap-3 sm:grid-cols-[1fr_240px] mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search mentor by name, role, track, skills or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 transition-all font-medium"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <select
            value={trackFilter}
            onChange={(e) => setTrackFilter(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 font-semibold cursor-pointer appearance-none"
          >
            <option value="ALL">All Tracks ({mentors.length})</option>
            {allTracks.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* MENTORS GRID */}
      {isLoading ? (
        <div className="py-16 text-center text-slate-400 text-xs font-bold flex items-center justify-center gap-2">
          <RefreshCw className="size-4 animate-spin text-[#b66dff]" />
          <span>Loading faculty directory from Firebase...</span>
        </div>
      ) : filteredMentors.length === 0 ? (
        <div className="border border-dashed border-slate-200 rounded-2xl p-10 text-center">
          <div className="size-14 rounded-full bg-purple-50 text-[#b66dff] grid place-items-center mx-auto mb-3">
            <Users className="size-7" />
          </div>
          <h4 className="text-sm font-black text-slate-800">No Mentors Found</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
            {searchQuery || trackFilter !== "ALL"
              ? "No faculty profiles match your search criteria. Try adjusting your filters."
              : "No mentors currently published. Click 'Add New Mentor' to create an instructor profile for the website."}
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-gradient-to-r from-[#b66dff] to-[#da8cff] text-white text-xs font-black rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="size-3.5" />
              <span>Add First Mentor</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className={`group border rounded-2xl p-5 bg-white shadow-xs transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
                mentor.active !== false
                  ? "border-slate-200/80 hover:border-purple-300"
                  : "border-slate-200 bg-slate-50/50 opacity-75"
              }`}
            >
              <div>
                {/* Card Top: Portrait + Status + Track */}
                <div className="flex items-start gap-3.5">
                  <div className="relative size-14 rounded-full p-0.5 bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 shadow-sm shrink-0">
                    <div className="size-full rounded-full overflow-hidden bg-slate-900">
                      <img
                        src={mentor.image}
                        alt={mentor.name}
                        className="size-full object-cover object-top"
                      />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white p-0.5 shadow-xs">
                      <CheckCircle2 className="size-4 text-sky-500" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[9.5px] font-black uppercase tracking-wider bg-purple-50 text-[#b66dff] border border-purple-100 truncate max-w-[170px]">
                        {mentor.track}
                      </span>
                      {mentor.active !== false ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Live
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          Hidden
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-black text-slate-900 truncate mt-1">
                      {mentor.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#b66dff] truncate">{mentor.role}</p>
                  </div>
                </div>

                {/* Experience & Batches Subline */}
                <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                  <span>{mentor.experience}</span>
                  <span>&bull;</span>
                  <span className="text-emerald-700 font-bold">
                    {mentor.activeBatches ?? 2} Active Batches
                  </span>
                  {mentor.email && (
                    <>
                      <span>&bull;</span>
                      <span className="truncate max-w-[120px] text-slate-400">{mentor.email}</span>
                    </>
                  )}
                </div>

                {/* Short Bio */}
                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {mentor.bio || mentor.fullBio}
                </p>

                {/* Skills tags preview */}
                {mentor.skills && mentor.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {mentor.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="text-[10.5px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                    {mentor.skills.length > 3 && (
                      <span className="text-[10px] font-bold text-[#b66dff] bg-purple-50 px-1.5 py-0.5 rounded-md">
                        +{mentor.skills.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10.5px] font-bold text-slate-400">
                  Order #{mentor.order ?? 99}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(mentor)}
                    className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:text-[#b66dff] hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                    title="Edit Mentor Profile"
                  >
                    <Edit3 className="size-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteMentor(mentor)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete Mentor"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* =========================================================================
          MODAL: ADD / EDIT MENTOR
      ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-tr from-[#b66dff] to-[#da8cff] text-white shadow-md shadow-purple-500/20">
                  <Users className="size-4" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    {editingMentor
                      ? `Edit Mentor: ${editingMentor.name}`
                      : "Add New Faculty Mentor"}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-medium">
                    This profile will appear live on the /about and /courses pages
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingMentor(null);
                }}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Tab Selector */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 shrink-0 bg-slate-50/50">
              {[
                { id: "basic", label: "1. Basic Info" },
                { id: "photo", label: "2. Photo & Avatar" },
                { id: "bio", label: "3. Bio & Story" },
                { id: "skills", label: "4. Skills & 1-on-1 Focus" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setModalTab(tab.id as any)}
                  className={`pb-2.5 px-3 text-xs font-extrabold border-b-2 transition-all cursor-pointer ${
                    modalTab === tab.id
                      ? "border-[#b66dff] text-[#b66dff]"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSaveMentor} className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* TAB 1: BASIC INFO */}
              {modalTab === "basic" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Mentor Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Arjun Kumar"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-900 font-bold"
                      />
                    </div>

                    {/* Role / Designation */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Role / Designation *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Lead Performance Strategist"
                        value={formRole}
                        onChange={(e) => setFormRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-900 font-semibold"
                      />
                    </div>
                  </div>

                  {/* Domain / Specialization Track */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Track / Domain *
                      </label>
                      <select
                        value={formTrack}
                        onChange={(e) => setFormTrack(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-900 font-semibold cursor-pointer"
                      >
                        <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                        <option value="Cyber Security & Defense">Cyber Security & Defense</option>
                        <option value="Programmatic Advertising">Programmatic Advertising</option>
                        <option value="Paid Social & Growth">Paid Social & Growth</option>
                        <option value="Offensive Security">Offensive Security</option>
                        <option value="Web Development & Engineering">
                          Web Development & Engineering
                        </option>
                        <option value="Data Analytics & AI">Data Analytics & AI</option>
                        <option value="Other">Other / Custom Track...</option>
                      </select>
                    </div>

                    {/* Experience */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Years of Experience *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. 9+ Years Experience"
                        value={formExperience}
                        onChange={(e) => setFormExperience(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Custom Track Input if "Other" */}
                  {formTrack === "Other" && (
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Specify Custom Track Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Cloud Security Architecture"
                        value={formCustomTrack}
                        onChange={(e) => setFormCustomTrack(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-900"
                      />
                    </div>
                  )}

                  {/* Email & Active Batches */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Mentor Email
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. mentor@digitechademy.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Active Batches
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={formActiveBatches}
                        onChange={(e) => setFormActiveBatches(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-900"
                      />
                    </div>
                  </div>

                  {/* Display Order & Visibility */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                        Display Priority / Order #
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={99}
                        value={formOrder}
                        onChange={(e) => setFormOrder(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-900"
                      />
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        Lower numbers appear first on the website.
                      </span>
                    </div>

                    <div className="flex items-center">
                      <label className="flex items-center gap-2.5 p-3 rounded-xl bg-purple-50/50 border border-purple-100 cursor-pointer w-full">
                        <input
                          type="checkbox"
                          checked={formActive}
                          onChange={(e) => setFormActive(e.target.checked)}
                          className="size-4 text-[#b66dff] rounded focus:ring-purple-400 cursor-pointer"
                        />
                        <div>
                          <span className="text-xs font-bold text-slate-900 block">
                            Active &amp; Published
                          </span>
                          <span className="text-[10.5px] text-slate-500 block">
                            Visible on /about and /courses
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: PHOTO & AVATAR */}
              {modalTab === "photo" && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div className="bg-purple-50/70 border border-purple-100 rounded-2xl p-3.5 flex items-center gap-3">
                    <Sparkles className="size-5 text-[#b66dff] shrink-0" />
                    <p className="text-xs text-purple-900 leading-relaxed">
                      Choose how to set the mentor photo:{" "}
                      <strong>upload an image file from your computer</strong> or{" "}
                      <strong>enter a direct image URL link</strong>.
                    </p>
                  </div>

                  {/* PHOTO SOURCES (UPLOAD OR URL LINK) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2.5">
                      1. Select Photo Method
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Option 1: Upload from Computer */}
                      <div
                        onClick={() => {
                          setCustomMode("upload");
                          if (!formCustomImage || !formCustomImage.startsWith("data:")) {
                            fileInputRef.current?.click();
                          }
                        }}
                        className={`p-4 rounded-2xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                          customMode === "upload"
                            ? "border-[#b66dff] bg-purple-50/70 ring-2 ring-purple-400/20 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="size-14 rounded-full border-2 border-dashed border-[#b66dff]/50 bg-purple-50 text-[#b66dff] flex items-center justify-center shadow-xs">
                          <Upload className="size-6" />
                        </div>
                        <div>
                          <span className="text-xs font-black text-slate-800 block">
                            Upload Image
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Browse local computer file (PNG, JPG, WebP)
                          </span>
                        </div>
                        {customMode === "upload" && (
                          <span className="text-[9px] font-black text-[#b66dff] bg-white px-2.5 py-0.5 rounded-full border border-purple-200">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Option 2: Image Web URL */}
                      <div
                        onClick={() => setCustomMode("url")}
                        className={`p-4 rounded-2xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                          customMode === "url"
                            ? "border-[#b66dff] bg-purple-50/70 ring-2 ring-purple-400/20 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div className="size-14 rounded-full border border-slate-200 bg-slate-50 text-slate-500 flex items-center justify-center shadow-xs">
                          <LinkIcon className="size-6 text-[#b66dff]" />
                        </div>
                        <div>
                          <span className="text-xs font-black text-slate-800 block">
                            Image URL Link
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            Direct web link to image (https://...)
                          </span>
                        </div>
                        {customMode === "url" && (
                          <span className="text-[9px] font-black text-[#b66dff] bg-white px-2.5 py-0.5 rounded-full border border-purple-200">
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* UPLOAD PANEL IF UPLOAD MODE */}
                  {customMode === "upload" && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Upload Image File From Your Computer
                        </label>
                        <button
                          type="button"
                          onClick={() => setCustomMode("url")}
                          className="text-[11px] font-bold text-[#b66dff] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <LinkIcon className="size-3" />
                          <span>Switch to Image URL link</span>
                        </button>
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageFileSelect(file);
                        }}
                      />

                      {/* Drag & Drop / Click Box */}
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragging(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) handleImageFileSelect(file);
                        }}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                          isDragging
                            ? "border-[#b66dff] bg-purple-50/80 scale-[1.01]"
                            : formCustomImage && formCustomImage.startsWith("data:")
                              ? "border-emerald-300 bg-emerald-50/40 hover:bg-emerald-50/60"
                              : "border-slate-300 bg-white hover:border-[#b66dff] hover:bg-purple-50/30"
                        }`}
                      >
                        {isProcessingImage ? (
                          <div className="flex flex-col items-center gap-2">
                            <RefreshCw className="size-7 animate-spin text-[#b66dff]" />
                            <span className="text-xs font-bold text-slate-700">
                              Optimizing photo for web...
                            </span>
                          </div>
                        ) : formCustomImage && formCustomImage.startsWith("data:") ? (
                          <div className="flex flex-col items-center gap-1.5">
                            <div className="size-10 rounded-full bg-emerald-100 text-emerald-700 grid place-items-center">
                              <CheckCircle2 className="size-5" />
                            </div>
                            <span className="text-xs font-black text-slate-900">
                              Photo Ready: {uploadedFileName || "Custom Uploaded Photo"}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Click or drag another image to replace
                            </span>
                          </div>
                        ) : (
                          <>
                            <div className="size-12 rounded-full bg-purple-50 text-[#b66dff] grid place-items-center shadow-xs">
                              <Upload className="size-6" />
                            </div>
                            <div>
                              <span className="text-xs font-black text-slate-800 block">
                                Click to Browse Image or Drag &amp; Drop Here
                              </span>
                              <span className="text-[11px] text-slate-400 block mt-0.5">
                                Supports PNG, JPG, JPEG, or WebP (auto-scaled to crisp 400x400
                                avatar)
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* URL INPUT PANEL IF URL MODE */}
                  {customMode === "url" && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                          Image / Photo Web URL *
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomMode("upload");
                            fileInputRef.current?.click();
                          }}
                          className="text-[11px] font-bold text-[#b66dff] hover:underline cursor-pointer flex items-center gap-1"
                        >
                          <Upload className="size-3" />
                          <span>Switch to Upload from computer</span>
                        </button>
                      </div>

                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/... or https://example.com/photos/mentor.jpg"
                        value={formCustomImage.startsWith("data:") ? "" : formCustomImage}
                        onChange={(e) => {
                          setFormCustomImage(e.target.value);
                          setUploadedFileName(null);
                        }}
                        className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] text-slate-900 font-medium font-mono"
                      />
                      <span className="text-[10.5px] text-slate-400 block">
                        Paste any accessible direct link to a portrait image file (PNG/JPG/WebP).
                      </span>
                    </div>
                  )}

                  {/* LIVE AVATAR PREVIEW */}
                  <div className="flex items-center gap-4 pt-3 border-t border-slate-100 bg-gradient-to-r from-slate-50 via-purple-50/20 to-transparent p-4 rounded-2xl border border-slate-200/80">
                    <div className="relative size-16 rounded-full p-0.5 bg-gradient-to-tr from-[#b66dff] via-indigo-500 to-sky-400 shadow-md shrink-0">
                      <div className="size-full rounded-full overflow-hidden bg-slate-900">
                        <img
                          src={resolveSelectedImage()}
                          alt="Preview"
                          className="size-full object-cover object-top"
                        />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white p-0.5 shadow-xs">
                        <CheckCircle2 className="size-4 text-emerald-500" />
                      </div>
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-900 block">
                        {formName || "Mentor Name"}
                      </span>
                      <span className="text-[11px] text-[#b66dff] font-semibold block">
                        {formRole || "Role / Track"}
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {formCustomImage
                          ? "Custom photo configured and ready to publish"
                          : "No custom photo set yet — will display stylish monogram initials badge"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: BIO & STORY */}
              {modalTab === "bio" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Short Bio */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Short Bio (Card Preview)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Concise 1-2 sentence overview of professional role and core expertise..."
                      value={formBio}
                      onChange={(e) => setFormBio(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 leading-relaxed"
                    />
                    <span className="text-[10.5px] text-slate-400 mt-1 block">
                      Appears on the circular mentor card preview.
                    </span>
                  </div>

                  {/* Full Bio */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Comprehensive Background / Story (Popup Modal)
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Detailed career journey, enterprise background, pedagogy, and why students benefit from learning under this mentor..."
                      value={formFullBio}
                      onChange={(e) => setFormFullBio(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 leading-relaxed"
                    />
                    <span className="text-[10.5px] text-slate-400 mt-1 block">
                      Displayed when learners click &quot;View Bio &amp; Insights&quot; on the
                      website.
                    </span>
                  </div>
                </div>
              )}

              {/* TAB 4: SKILLS & 1-ON-1 FOCUS */}
              {modalTab === "skills" && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  {/* Skills */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        Core Competencies / Skills
                      </label>
                      <span className="text-[10px] font-bold text-[#b66dff] bg-purple-50 px-2 py-0.5 rounded-md">
                        Comma or newline separated
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder="e.g. Performance Marketing, Technical SEO, GA4 Schema, Attribution Modeling, Funnel Architecture"
                      value={formSkillsText}
                      onChange={(e) => setFormSkillsText(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 leading-relaxed font-mono"
                    />
                  </div>

                  {/* Mentorship Focus */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                        What You Master in 1-on-1 Mentorship (Bullet Points)
                      </label>
                      <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">
                        One point per line
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      placeholder={
                        "1-on-1 live campaign teardowns & budget waste reduction\nTechnical SEO site audits and crawler log inspections\nConversion rate optimization (CRO) & multi-touch attribution modeling"
                      }
                      value={formFocusText}
                      onChange={(e) => setFormFocusText(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] focus:bg-white text-slate-800 leading-relaxed font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Modal Action Buttons Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2">
                  {modalTab !== "basic" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (modalTab === "skills") setModalTab("bio");
                        else if (modalTab === "bio") setModalTab("photo");
                        else if (modalTab === "photo") setModalTab("basic");
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      &larr; Back
                    </button>
                  )}
                  {modalTab !== "skills" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (modalTab === "basic") setModalTab("photo");
                        else if (modalTab === "photo") setModalTab("bio");
                        else if (modalTab === "bio") setModalTab("skills");
                      }}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-[#b66dff] hover:bg-purple-50 cursor-pointer"
                    >
                      Next Step &rarr;
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditingMentor(null);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 shadow-md shadow-purple-500/20 cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmitting && (
                      <div className="size-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    <span>
                      {editingMentor ? "Update Mentor Profile" : "Publish Mentor Profile"}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   TAB: FAQS (Full Firestore Real-Time CRUD)
========================================================================= */
function ManageFaqsTab() {
  const [faqs, setFaqs] = useState<FirebaseFaq[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FirebaseFaq | null>(null);
  const [formCategory, setFormCategory] = useState("General");
  const [formCustomCategory, setFormCustomCategory] = useState("");
  const [formQuestion, setFormQuestion] = useState("");
  const [formAnswer, setFormAnswer] = useState("");
  const [formOrder, setFormOrder] = useState<number>(1);

  const [isSaving, setIsSaving] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Subscribe to live Firestore updates
  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = subscribeFaqs(
      (updated) => {
        setFaqs(updated);
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  // Dynamic categories
  const categories = useMemo(() => {
    const cats = new Set<string>();
    faqs.forEach((f) => {
      if (f.category) cats.add(f.category);
    });
    return ["All", ...Array.from(cats)];
  }, [faqs]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchCat = selectedCategory === "All" || faq.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.category.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const openAddModal = () => {
    setEditingFaq(null);
    setFormCategory("General");
    setFormCustomCategory("");
    setFormQuestion("");
    setFormAnswer("");
    setFormOrder(faqs.length + 1);
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FirebaseFaq) => {
    setEditingFaq(faq);
    if (FAQ_CATEGORIES.includes(faq.category as any)) {
      setFormCategory(faq.category);
      setFormCustomCategory("");
    } else {
      setFormCategory("Custom");
      setFormCustomCategory(faq.category);
    }
    setFormQuestion(faq.question);
    setFormAnswer(faq.answer);
    setFormOrder(faq.order ?? 1);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formAnswer.trim()) {
      setStatusMessage({ type: "error", text: "Please enter both a question and an answer." });
      return;
    }

    const finalCategory =
      formCategory === "Custom"
        ? formCustomCategory.trim() || "General"
        : formCategory;

    setIsSaving(true);
    try {
      if (editingFaq) {
        await updateFaqInFirebase(editingFaq.id, {
          category: finalCategory,
          question: formQuestion.trim(),
          answer: formAnswer.trim(),
          order: Number(formOrder) || 1,
        });
        setStatusMessage({ type: "success", text: "FAQ updated successfully in Firestore database!" });
      } else {
        await addFaqToFirebase({
          category: finalCategory,
          question: formQuestion.trim(),
          answer: formAnswer.trim(),
          order: Number(formOrder) || 1,
        });
        setStatusMessage({ type: "success", text: "New FAQ added and stored in Firestore database!" });
      }
      setIsModalOpen(false);
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to save FAQ to Firestore." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFaqFromFirebase(id);
      setDeleteConfirmId(null);
      setStatusMessage({ type: "success", text: "FAQ deleted successfully from Firestore." });
      setTimeout(() => setStatusMessage(null), 4000);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to delete FAQ." });
    }
  };

  const handleSeedDefaults = async () => {
    if (
      !window.confirm(
        "Upload and sync all 18 official DIGITECHADEMY questions & answers to your Firebase Firestore 'faqs' collection now?",
      )
    ) {
      return;
    }
    setIsSeeding(true);
    try {
      const count = await seedDefaultFaqsToFirebase();
      setStatusMessage({
        type: "success",
        text: `Successfully synced ${count} official FAQs to Firebase Firestore!`,
      });
      setTimeout(() => setStatusMessage(null), 5000);
    } catch (err: any) {
      setStatusMessage({ type: "error", text: err?.message || "Failed to seed FAQs to Firestore." });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* STATUS TOAST BANNER */}
      {statusMessage && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl text-xs font-bold transition-all shadow-sm ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="size-4 text-rose-600 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
          <button
            onClick={() => setStatusMessage(null)}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* TOP HEADER CARD */}
      <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-black text-slate-900">Knowledgebase FAQs</h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-50 text-[#b66dff] border border-purple-200">
                <Database className="size-3" />
                Firebase Cloud Sync
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Manage questions & answers stored in Firestore — instantly reflected on the website /faq page
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <button
              onClick={handleSeedDefaults}
              disabled={isSeeding}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 h-10 px-3.5 rounded-xl border border-slate-200 transition-colors cursor-pointer disabled:opacity-60"
              title="Populate initial official FAQs in your Firestore database"
            >
              <RefreshCw className={`size-3.5 ${isSeeding ? "animate-spin" : ""}`} />
              <span>{isSeeding ? "Syncing..." : "Sync Official FAQs"}</span>
            </button>

            <button
              onClick={openAddModal}
              className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 text-white text-xs font-black flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer transition-all active:scale-[0.99]"
            >
              <Plus className="size-4" />
              <span>Add FAQ Item</span>
            </button>
          </div>
        </div>

        {/* CONTROLS: SEARCH & CATEGORY FILTER */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search FAQs by question, answer, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#b66dff] focus:ring-1 focus:ring-[#b66dff] text-slate-800 placeholder-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Quick Stat Pill */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-50/70 border border-purple-100 text-xs font-bold text-[#9a55ff] shrink-0">
              <HelpCircle className="size-4" />
              <span>{filteredFaqs.length} of {faqs.length} FAQs</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const count = cat === "All" ? faqs.length : faqs.filter((f) => f.category === cat).length;
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#b66dff] to-[#da8cff] text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9.5px] font-extrabold ${
                      isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQS LIST */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-10 text-center space-y-3">
            <div className="grid size-12 mx-auto place-items-center rounded-full bg-purple-50 text-[#b66dff]">
              <HelpCircle className="size-6" />
            </div>
            <h4 className="text-sm font-black text-slate-800">
              {faqs.length === 0 ? "No FAQs in Firestore Yet" : "No FAQs Match Your Filter"}
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {faqs.length === 0
                ? "Click 'Sync Official FAQs' above to immediately populate the default questions, or click 'Add FAQ Item' to create a custom one."
                : "Try clearing your search query or switching to 'All' categories."}
            </p>
            {faqs.length === 0 && (
              <div className="pt-2">
                <button
                  onClick={handleSeedDefaults}
                  disabled={isSeeding}
                  className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] text-white text-xs font-black px-4 py-2 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer"
                >
                  {isSeeding ? "Syncing..." : "Sync 18 Official FAQs to Firestore"}
                </button>
              </div>
            )}
          </div>
        ) : (
          filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border border-slate-200/80 p-5 rounded-2xl shadow-xs transition-all hover:border-purple-200 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-50 text-[#b66dff] border border-purple-100">
                      {faq.category}
                    </span>
                    {typeof faq.order === "number" && (
                      <span className="text-[10px] text-slate-400 font-bold">
                        #{faq.order}
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-[#9a55ff] transition-colors">
                    {faq.question}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {faq.answer}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0 pt-0.5">
                  <button
                    onClick={() => openEditModal(faq)}
                    className="p-2 rounded-lg text-slate-400 hover:text-[#b66dff] hover:bg-purple-50 transition-colors cursor-pointer"
                    title="Edit FAQ"
                  >
                    <Edit3 className="size-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(faq.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete FAQ"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="size-10 rounded-full bg-rose-50 grid place-items-center shrink-0">
                <AlertCircle className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">Delete FAQ</h4>
                <p className="text-xs text-slate-400">This action cannot be undone.</p>
              </div>
            </div>
            <p className="text-xs text-slate-600">
              Are you sure you want to permanently remove this FAQ item from Firebase Firestore and the website?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md shadow-rose-600/20 cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-gradient-to-tr from-[#9a55ff] to-[#da8cff] grid place-items-center text-white">
                  <HelpCircle className="size-4" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900">
                    {editingFaq ? "Edit Knowledgebase FAQ" : "Add New Knowledgebase FAQ"}
                  </h4>
                  <p className="text-[11px] text-slate-400">Stores directly in Firebase Firestore</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Category selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#b66dff] text-slate-800"
                >
                  {FAQ_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="Custom">+ Custom Category...</option>
                </select>

                {formCategory === "Custom" && (
                  <input
                    type="text"
                    placeholder="Enter custom category name..."
                    value={formCustomCategory}
                    onChange={(e) => setFormCustomCategory(e.target.value)}
                    required
                    className="w-full mt-2 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#b66dff] text-slate-800"
                  />
                )}
              </div>

              {/* Question */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Question <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Do I receive a certificate upon completion?"
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#b66dff] text-slate-800"
                />
              </div>

              {/* Answer */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Answer <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Provide an informative, clear answer for students..."
                  value={formAnswer}
                  onChange={(e) => setFormAnswer(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#b66dff] text-slate-800 resize-none leading-relaxed"
                />
              </div>

              {/* Order index */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Display Order / Priority
                </label>
                <input
                  type="number"
                  min="1"
                  value={formOrder}
                  onChange={(e) => setFormOrder(Number(e.target.value))}
                  className="w-32 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#b66dff] text-slate-800"
                />
                <span className="text-[11px] text-slate-400 ml-2">Lower numbers appear first</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-5 py-2 text-xs font-black text-white bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer disabled:opacity-60 transition-all flex items-center gap-1.5"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="size-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingFaq ? "Save Changes" : "Create FAQ"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   TAB: SETTINGS
========================================================================= */
function ManageSettingsTab({ session }: { session: AdminSession | null }) {
  const [isPurging, setIsPurging] = useState(false);
  const [purgeStatus, setPurgeStatus] = useState<string | null>(null);

  const handlePurgeAllDummyData = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete all dummy data (sample leads, sample student reviews, and demo faculty mentors) from Firebase Firestore and local browser cache? Any real website submissions and custom content will be preserved.",
      )
    ) {
      return;
    }
    setIsPurging(true);
    try {
      const eCount = await deleteDummyEnquiriesFromFirebase();
      const tCount = await deleteDummyTestimonialsFromFirebase();
      const mCount = await deleteDemoMentorsFromFirebase();
      setPurgeStatus(
        `All dummy data purged successfully from Firebase and local cache! (Cleaned ${eCount} dummy leads, ${tCount} dummy reviews, ${mCount} demo mentors).`,
      );
    } catch (err: any) {
      setPurgeStatus(err?.message || "Failed to purge dummy data.");
    } finally {
      setIsPurging(false);
      setTimeout(() => setPurgeStatus(null), 6000);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <h3 className="text-lg font-black text-slate-900">
          Console Security & Server Configuration
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          System health, email SMTP verification transport, and database connectors
        </p>
      </div>

      <div className="grid gap-6">
        {/* PURGE ALL DUMMY DATA CARD */}
        <div className="border border-rose-200 rounded-2xl p-5 bg-gradient-to-r from-white via-rose-50/20 to-rose-50/40 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-rose-500 text-white shadow-md shadow-rose-500/20 shrink-0">
                <Trash2 className="size-5" />
              </div>
              <div>
                <h4 className="text-sm font-black text-slate-900">Delete All Dummy / Demo Data</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Permanently purge all pre-seeded dummy enquiries, sample student reviews, and demo
                  faculty mentors from Firebase Firestore and browser cache.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handlePurgeAllDummyData}
              disabled={isPurging}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl shadow-md shadow-rose-500/20 transition-all cursor-pointer whitespace-nowrap self-start sm:self-center disabled:opacity-50 flex items-center gap-2"
            >
              {isPurging ? (
                <RefreshCw className="size-3.5 animate-spin" />
              ) : (
                <Trash2 className="size-3.5" />
              )}
              <span>Purge All Dummy Data</span>
            </button>
          </div>
          {purgeStatus && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>{purgeStatus}</span>
            </div>
          )}
        </div>

        {/* ACTIVE SESSION CARD */}
        <div className="border border-slate-200/80 rounded-2xl p-5 bg-gradient-to-r from-slate-50 to-purple-50/30">
          <div className="flex items-center gap-3 mb-4">
            <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-tr from-[#9a55ff] to-[#da8cff] text-white shadow-md shadow-purple-500/20">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">Active Admin Authorization</h4>
              <p className="text-xs text-slate-400">2-Factor OTP verified session</p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2 text-xs text-slate-600 bg-white p-4 rounded-xl border border-slate-200/80">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">
                Administrator Email
              </span>
              <span className="font-bold text-slate-800 font-mono">
                {session?.email || "sunilneelakantams@gmail.com"}
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">Role</span>
              <span className="font-bold text-[#b66dff]">Super Administrator</span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">
                Session Token Status
              </span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="size-3.5" /> Valid & Active
              </span>
            </div>
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block">
                Session Validity
              </span>
              <span>24 Hours</span>
            </div>
          </div>
        </div>

        {/* INTEGRATIONS STATUS */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* SMTP GMAIL */}
          <div className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Mail className="size-5 text-red-500" />
                <h5 className="text-sm font-black text-slate-900">Gmail SMTP Service</h5>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                Connected
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Host: <strong className="text-slate-700">smtp.gmail.com (SSL :465)</strong>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Sender: <strong className="text-slate-700">sunilneelakantams@gmail.com</strong>
            </p>
          </div>

          {/* FIREBASE */}
          <div className="border border-slate-200/80 rounded-2xl p-5 bg-white shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Database className="size-5 text-amber-500" />
                <h5 className="text-sm font-black text-slate-900">Firebase Cloud</h5>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                Connected
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Project ID: <strong className="text-slate-700">digital-tech-dd790</strong>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Auth Domain:{" "}
              <strong className="text-slate-700">digital-tech-dd790.firebaseapp.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
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
  type FirebaseCourse,
  subscribeCourses,
  addCourseToFirebase,
  updateCourseInFirebase,
  deleteCourseFromFirebase,
  seedDefaultCoursesToFirebase,
} from "@/services/courseService";
import {
  type FirebaseEnquiry,
  subscribeEnquiries,
  addEnquiryToFirebase,
  updateEnquiryInFirebase,
  deleteEnquiryFromFirebase,
} from "@/services/enquiryService";
import {
  type FirebaseTestimonial,
  subscribeTestimonials,
  addTestimonialToFirebase,
  updateTestimonialInFirebase,
  deleteTestimonialFromFirebase,
} from "@/services/testimonialService";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Purple Admin Console | Digital Ascent Academy" },
      {
        name: "description",
        content: "Enterprise Purple Admin management console for Digital Ascent Academy.",
      },
    ],
  }),
  component: AdminDashboardPage,
});

type TabType = "dashboard" | "enquiries" | "courses" | "testimonials" | "instructors" | "faqs" | "settings";

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

  // Subscribe to live enquiries from Firebase & local storage
  useEffect(() => {
    const unsub = subscribeEnquiries((list) => {
      setLiveEnquiries(list);
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
                { id: "testimonials", label: "Student Reviews", icon: Star },
                { id: "instructors", label: "Trainers & Faculty", icon: Users },
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
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-purple-100 text-[#9a55ff]"
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
                Welcome to Digital Ascent Academy Console — Real-time Admissions, Batches & Lead Analytics.
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
                <p className="text-xs text-slate-400 font-medium">Digital Ascent Enterprise Control</p>
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
              totalLeads={liveEnquiries.length}
            />
          )}
          {activeTab === "enquiries" && <ManageEnquiriesTab />}
          {activeTab === "courses" && <ManageCoursesTab />}
          {activeTab === "testimonials" && <ManageTestimonialsTab />}
          {activeTab === "instructors" && <ManageInstructorsTab />}
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
  totalLeads = 0,
}: {
  isClient: boolean;
  onNavigateTab: (tab: TabType) => void;
  recentEnquiries?: FirebaseEnquiry[];
  totalLeads?: number;
}) {
  return (
    <div className="space-y-7">
      {/* 3 BIG GRADIENT STAT CARDS WITH WATERMARK CIRCLES */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* CARD 1: CORAL / PINK GRADIENT */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ffbf96] to-[#fe7096] p-6 text-white shadow-lg shadow-pink-500/15">
          {/* Translucent overlapping circular watermarks */}
          <div className="absolute -right-8 -top-8 size-36 rounded-full bg-white/15 pointer-events-none" />
          <div className="absolute right-4 -bottom-10 size-28 rounded-full bg-white/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-white/90">Weekly Admissions & Revenue</h3>
              <TrendingUp className="size-5 text-white/80" />
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              ₹ 1,50,000
            </div>
            <p className="text-xs font-bold text-white/80 flex items-center gap-1">
              <span>Increased by 60%</span>
            </p>
          </div>
        </div>

        {/* CARD 2: BLUE / CYAN GRADIENT */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#90caf9] to-[#047edf] p-6 text-white shadow-lg shadow-blue-500/15">
          {/* Translucent overlapping circular watermarks */}
          <div className="absolute -right-8 -top-8 size-36 rounded-full bg-white/15 pointer-events-none" />
          <div className="absolute right-4 -bottom-10 size-28 rounded-full bg-white/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-white/90">Active Cohort Students</h3>
              <Bookmark className="size-5 text-white/80" />
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              45,6334
            </div>
            <p className="text-xs font-bold text-white/80 flex items-center gap-1">
              <span>Decreased by 10%</span>
            </p>
          </div>
        </div>

        {/* CARD 3: TEAL / EMERALD GRADIENT */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#84d9d2] to-[#07b09e] p-6 text-white shadow-lg shadow-teal-500/15">
          {/* Translucent overlapping circular watermarks */}
          <div className="absolute -right-8 -top-8 size-36 rounded-full bg-white/15 pointer-events-none" />
          <div className="absolute right-4 -bottom-10 size-28 rounded-full bg-white/10 pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-extrabold text-white/90">Visitors & Leads Online</h3>
              <Gem className="size-5 text-white/80" />
            </div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              {totalLeads > 0 ? `${totalLeads} Leads` : "4 Leads"}
            </div>
            <p className="text-xs font-bold text-white/80 flex items-center gap-1">
              <span>Real-time Firebase CRM</span>
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
              <p className="text-xs text-slate-400">Monthly student interest & conversion metrics</p>
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
            <h3 className="text-base font-black text-slate-800">Recent Student Admissions Status</h3>
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
              {(recentEnquiries.length > 0 ? recentEnquiries : [
                {
                  id: "enq-sample-1",
                  name: "Sai Rama Doddi",
                  course: "Digital Marketing Mastery",
                  status: "New" as const,
                  createdAt: new Date().toISOString(),
                  progress: 20,
                },
                {
                  id: "enq-sample-2",
                  name: "Sunil Neelakantam",
                  course: "Cyber Security & Ethical Hacking",
                  status: "Contacted" as const,
                  createdAt: new Date().toISOString(),
                  progress: 60,
                },
              ]).map((item) => {
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
                        {'phone' in item && Boolean((item as any).phone) && (
                          <div className="text-[10px] text-slate-400 font-normal">{(item as any).phone}</div>
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
                          style={{ width: `${item.progress || (item.status === "Converted" ? 100 : item.status === "Contacted" ? 60 : item.status === "Follow-up" ? 80 : 20)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
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
    link.setAttribute(
      "download",
      `student_leads_${new Date().toISOString().split("T")[0]}.csv`
    );
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

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
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
                          <span className="text-[11px] text-slate-400 font-normal block">{formattedDate}</span>
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
                              `Hi ${enq.name}, thank you for requesting a demo for ${enq.course} at Digital Tech Academy. How can our counselors assist you?`
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
                        <option value="New" className="text-slate-800 bg-white font-bold">New</option>
                        <option value="Contacted" className="text-slate-800 bg-white font-bold">Contacted</option>
                        <option value="Follow-up" className="text-slate-800 bg-white font-bold">Follow-up</option>
                        <option value="Converted" className="text-slate-800 bg-white font-bold">Converted</option>
                        <option value="Closed" className="text-slate-800 bg-white font-bold">Closed</option>
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
                  <option value="Digital Marketing Mastery">
                    Digital Marketing Mastery
                  </option>
                  <option value="Cyber Security & Ethical Hacking">
                    Cyber Security & Ethical Hacking
                  </option>
                  <option value="Advanced SEO & Performance Marketing">
                    Advanced SEO & Performance Marketing
                  </option>
                  <option value="Web Development Bootcamp">
                    Web Development Bootcamp
                  </option>
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
  const [isSeeding, setIsSeeding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<FirebaseCourse | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<string>("Digital Marketing");
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
      case "Digital Marketing":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Web Development":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Data Analytics":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Cyber Security":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Design & Creative":
        return "bg-sky-50 text-sky-700 border-sky-200";
      case "Business & Management":
        return "bg-pink-50 text-pink-700 border-pink-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  // Open modal to add a new course
  const handleOpenAddModal = (defaultCategory?: string) => {
    setEditingCourse(null);
    setCourseModalTab("basic");
    setFormTitle("");
    const cat = defaultCategory || (selectedCategory !== "All" ? selectedCategory : "Digital Marketing");
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

    // About defaults
    setFormAboutDesc("");
    setFormAboutLearn(
      "Practical hands-on industry projects and real client briefs\nIn-depth core principles, best practices & modern workflows\nIndustry tool mastery with portfolio-ready capstone assets\nReal-world troubleshooting, code optimization & delivery"
    );
    setFormAboutAudience(
      "Graduates & students seeking a high-paying tech career\nWorking professionals wanting to transition into high-growth tech domains\nFreelancers & entrepreneurs looking to build and scale products"
    );
    setFormAboutOutcomes(
      "Job-ready portfolio with end-to-end projects\n1-on-1 resume building, mock interviews & placement guidance\nRecognized course completion certificate"
    );

    // Curriculum defaults
    setFormSyllabus([
      {
        module: "Module 1",
        title: "Foundations & Core Principles",
        topicsText: "Course Introduction & Setup\nCore terminology & architecture\nDevelopment environment & essential tooling",
      },
      {
        module: "Module 2",
        title: "Intermediate Applications & Workflows",
        topicsText: "Hands-on practical implementation\nIndustry design patterns & workflows\nTesting, debugging and validation",
      },
      {
        module: "Module 3",
        title: "Advanced Mastery & Capstone Deployment",
        topicsText: "Performance optimization & security best practices\nIndustry case studies & live capstone project\nFinal review, portfolio polish & certification",
      },
    ]);

    // Description default
    setFormLongDescription("");

    // FAQs default
    setFormCourseFaqs([
      {
        question: "What are the prerequisites for joining this course?",
        answer: "No prior technical or coding background is required. Basic computer skills and a desire to learn are all that is needed.",
      },
      {
        question: "Will I receive a verified certificate upon completion?",
        answer: "Yes, you will earn an industry-recognized certificate from Digital Tech Academy upon successfully completing all practical assignments and the capstone project.",
      },
      {
        question: "Does this course include placement assistance and mentorship?",
        answer: "Yes! You get dedicated 1-on-1 mentorship, resume reviews, portfolio critiques, and placement assistance through our hiring partner network.",
      },
    ]);

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
    setFormAboutDesc(course.about?.description || course.description || "");
    setFormAboutLearn(
      course.about?.learn && course.about.learn.length > 0
        ? course.about.learn.join("\n")
        : "Practical hands-on industry projects and real client briefs\nIn-depth core principles & modern workflows\nIndustry tool mastery with portfolio-ready capstone assets"
    );
    setFormAboutAudience(
      course.about?.audience && course.about.audience.length > 0
        ? course.about.audience.join("\n")
        : "Graduates & students seeking a tech career\nWorking professionals looking to upskill or pivot"
    );
    setFormAboutOutcomes(
      course.about?.outcomes && course.about.outcomes.length > 0
        ? course.about.outcomes.join("\n")
        : "Job-ready portfolio with end-to-end projects\nResume building & interview guidance\nRecognized certificate of completion"
    );

    // Curriculum
    if (course.syllabus && course.syllabus.length > 0) {
      setFormSyllabus(
        course.syllabus.map((s) => ({
          module: s.module,
          title: s.title,
          topicsText: (s.topics || []).join("\n"),
        }))
      );
    } else {
      setFormSyllabus([
        {
          module: "Module 1",
          title: "Foundations & Core Principles",
          topicsText: "Course Introduction & Setup\nCore terminology & architecture",
        },
      ]);
    }

    // Description
    setFormLongDescription(course.longDescription || course.description || "");

    // FAQs
    if (course.faqs && course.faqs.length > 0) {
      setFormCourseFaqs(
        course.faqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))
      );
    } else {
      setFormCourseFaqs([
        {
          question: "What are the prerequisites for this course?",
          answer: "Basic computer skills and a desire to learn are all that is needed.",
        },
      ]);
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
    value: string
  ) => {
    setFormSyllabus((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
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

  const handleUpdateFaq = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFormCourseFaqs((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
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
      formCategory === "Other"
        ? formCustomCategory.trim() || "General"
        : formCategory;

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
      description: formAboutDesc.trim() || formDescription.trim(),
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

    const longDescPayload = formLongDescription.trim() || formDescription.trim();

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

  // Seed default courses
  const handleSeedDefaults = async () => {
    setIsSeeding(true);
    try {
      const res = await seedDefaultCoursesToFirebase();
      setFeedback({
        type: "success",
        text: `Successfully synced ${res.count} default courses to Firebase!`,
      });
    } catch (err: any) {
      setFeedback({
        type: "error",
        text: "Could not seed courses to Firestore directly. Local cache is loaded.",
      });
    } finally {
      setIsSeeding(false);
      setTimeout(() => setFeedback(null), 5000);
    }
  };

  // Filter courses
  const filteredCourses = courses.filter((c) => {
    const matchesCategory =
      selectedCategory === "All" ||
      c.category.toLowerCase() === selectedCategory.toLowerCase();
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  // Calculate category statistics
  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    POPULAR_COURSE_CATEGORIES.forEach((cat) => {
      counts[cat] = 0;
    });
    courses.forEach((c) => {
      counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
  }, [courses]);

  return (
    <div className="space-y-6">
      {/* Alert / Feedback Notification */}
      {feedback && (
        <div
          className={cn(
            "p-4 rounded-2xl flex items-center justify-between text-xs sm:text-sm font-bold border transition-all animate-in fade-in slide-in-from-top-2",
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
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
              Add and manage curriculum courses stored in Firebase Firestore across all popular categories
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSeedDefaults}
              disabled={isSeeding}
              title="Populate Firebase Firestore with the standard 5 courses"
              className="bg-slate-50 hover:bg-purple-50 text-slate-700 hover:text-[#b66dff] border border-slate-200 hover:border-purple-200 text-xs font-bold flex items-center gap-1.5 h-10 px-3.5 rounded-xl transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={cn("size-3.5", isSeeding && "animate-spin text-[#b66dff]")} />
              <span>{isSeeding ? "Syncing..." : "Seed Default Courses"}</span>
            </button>

            <button
              onClick={() => handleOpenAddModal()}
              className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] text-white text-xs font-black flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Plus className="size-4" />
              <span>Add New Program</span>
            </button>
          </div>
        </div>

        {/* Popular Categories Overview Pills */}
        <div className="mt-5 pt-1">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
              Popular Course Categories
            </span>
            <span className="text-[11px] text-slate-400 font-semibold">
              Click a category to filter or add courses
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5",
                selectedCategory === "All"
                  ? "bg-[#b66dff] text-white border-[#b66dff] shadow-sm shadow-purple-500/20"
                  : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100"
              )}
            >
              <span>All Courses</span>
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px]",
                  selectedCategory === "All" ? "bg-white/25 text-white" : "bg-slate-200 text-slate-700"
                )}
              >
                {courses.length}
              </span>
            </button>

            {POPULAR_COURSE_CATEGORIES.map((cat) => {
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
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      "px-1.5 py-0.2 rounded-full text-[10px]",
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
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
              onClick={() => handleOpenAddModal(selectedCategory !== "All" ? selectedCategory : undefined)}
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
                      getCategoryBadgeClass(course.category)
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
                    Lead: <strong className="text-slate-700 font-semibold">{course.instructor}</strong>
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
                    {editingCourse ? `Edit Program: ${editingCourse.title}` : "Create Academic Program"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Save directly into Firebase Firestore: Basic Info, About & Outcomes, Curriculum, Description, and FAQs
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
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60"
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
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60"
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
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60"
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
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60"
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
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-white/60"
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
                        These sections appear on the course detail page under the <strong>About</strong> tab, including what students will learn, who should attend, and expected career outcomes.
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
                        placeholder={"Hands-on production projects\nCore architecture & design patterns\nDatabase design & API integration\nLive deployment and cloud workflows"}
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
                          placeholder={"Graduates & college students\nWorking developers upskilling\nCareer transitioners"}
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
                          placeholder={"Job-ready portfolio\nInterview preparation assistance\nRecognized completion certificate"}
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
                                  onChange={(e) => handleUpdateSyllabusModule(idx, "module", e.target.value)}
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
                                  onChange={(e) => handleUpdateSyllabusModule(idx, "title", e.target.value)}
                                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:border-[#b66dff] text-slate-800 font-bold"
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="block text-[11px] font-bold text-slate-600">
                                  Topics Covered (one per line)
                                </label>
                                <span className="text-[10px] text-slate-400">One bullet point per line</span>
                              </div>
                              <textarea
                                rows={3}
                                placeholder={"Components & JSX\nProps and State\nuseEffect and Lifecycle"}
                                value={mod.topicsText}
                                onChange={(e) => handleUpdateSyllabusModule(idx, "topicsText", e.target.value)}
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
                        <strong className="font-bold">Course "Description" Tab Configuration:</strong>{" "}
                        Provide an in-depth explanation of practical training, real-world laboratory assignments, industrial workflows, tool integrations, and mentorship methodology.
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-700 mb-1.5">
                        Comprehensive Training Methodology & Practical Learning Description
                      </label>
                      <textarea
                        rows={10}
                        placeholder={"Our training model centers around immersive, project-based learning...\n\nEvery session includes live coding walkthroughs, code reviews, and industry-standard best practices...\n\nStudents will work on 3 end-to-end projects deployed to production environments..."}
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
              Add and manage student feedback, course ratings, and featured testimonials for the public site
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 text-white text-xs font-black flex items-center gap-2 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer self-start sm:self-auto transition-all"
          >
            <Plus className="size-4" />
            <span>Add Student Review</span>
          </button>
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
                  <option value="Cyber Security & Ethical Hacking">Cyber Security & Ethical Hacking</option>
                  <option value="Advanced SEO & Performance Marketing">Advanced SEO & Performance Marketing</option>
                  <option value="Web Development Bootcamp">Web Development Bootcamp</option>
                  <option value="Data Analytics with Python & BI">Data Analytics with Python & BI</option>
                  <option value="Network Defense & Security Operations">Network Defense & Security Operations</option>
                  <option value="Programmatic Advertising Course">Programmatic Advertising Course</option>
                  <option value="Ethical Hacking & Security Fundamentals">Ethical Hacking & Security Fundamentals</option>
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
                  {isSubmitting && <div className="size-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
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
   TAB: INSTRUCTORS
========================================================================= */
function ManageInstructorsTab() {
  const instructors: InstructorItem[] = [
    {
      id: "inst-1",
      name: "Sai Rama",
      role: "Lead Trainer & Founder",
      specialization: "Digital Marketing, Cyber Security & Ethical Hacking",
      email: "sairama@digitaltechsolution.in",
      experience: "8+ Years Industry Experience",
      activeBatches: 4,
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h3 className="text-lg font-black text-slate-900">Faculty & Mentors</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage course instructors, bios, and active cohort assignments
          </p>
        </div>
        <button className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] text-white text-xs font-black flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer self-start sm:self-auto">
          <Plus className="size-4" />
          Add Instructor
        </button>
      </div>

      <div className="grid gap-4">
        {instructors.map((inst) => (
          <div
            key={inst.id}
            className="border border-slate-200/80 p-5 rounded-2xl bg-white shadow-xs flex items-center gap-4 hover:border-purple-200 transition-colors"
          >
            <div className="size-14 rounded-2xl bg-gradient-to-tr from-[#9a55ff] to-[#da8cff] text-white flex items-center justify-center font-black text-lg shadow-md shadow-purple-500/20 shrink-0">
              SR
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">{inst.name}</h4>
              <p className="text-xs font-bold text-[#b66dff]">{inst.role}</p>
              <p className="text-xs text-slate-500 mt-1">{inst.specialization}</p>
              <div className="mt-2 flex gap-4 text-[11px] text-slate-400 font-medium">
                <span>{inst.experience}</span>
                <span>&bull;</span>
                <span className="text-emerald-600 font-bold">{inst.activeBatches} Active Batches</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: FAQS
========================================================================= */
function ManageFaqsTab() {
  const faqs: FaqItem[] = [
    {
      id: "faq-1",
      category: "Admissions",
      question: "Are there any prerequisites before enrolling?",
      answer:
        "No prior coding or digital marketing experience is required. Basic computer literacy and curiosity to learn are sufficient.",
    },
    {
      id: "faq-2",
      category: "Placement",
      question: "Do you provide job assistance upon course completion?",
      answer:
        "Yes, we provide resume building, mock interviews, portfolio development, and placement assistance with our partner network.",
    },
  ];

  return (
    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h3 className="text-lg font-black text-slate-900">Knowledgebase FAQs</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure frequently asked questions rendered across support & contact pages
          </p>
        </div>
        <button className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] text-white text-xs font-black flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer self-start sm:self-auto">
          <Plus className="size-4" />
          Add FAQ Item
        </button>
      </div>

      <div className="grid gap-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="border border-slate-200/80 p-4 rounded-xl bg-white shadow-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-purple-50 text-[#b66dff] border border-purple-100">
                {faq.category}
              </span>
            </div>
            <h4 className="text-sm font-black text-slate-800">{faq.question}</h4>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: SETTINGS
========================================================================= */
function ManageSettingsTab({ session }: { session: AdminSession | null }) {
  return (
    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
      <div className="border-b border-slate-100 pb-5 mb-6">
        <h3 className="text-lg font-black text-slate-900">Console Security & Server Configuration</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          System health, email SMTP verification transport, and database connectors
        </p>
      </div>

      <div className="grid gap-6">
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
              Auth Domain: <strong className="text-slate-700">digital-tech-dd790.firebaseapp.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
import { getAdminSession, clearAdminSession, type AdminSession } from "@/lib/auth";

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
                { id: "enquiries", label: "Student Enquiries", icon: MessageSquare, badge: "4 New" },
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
                <span>+ Add New Lead</span>
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
            <DashboardOverviewTab isClient={isClient} onNavigateTab={setActiveTab} />
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
}: {
  isClient: boolean;
  onNavigateTab: (tab: TabType) => void;
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
              95,5741
            </div>
            <p className="text-xs font-bold text-white/80 flex items-center gap-1">
              <span>Increased by 5%</span>
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
              {[
                {
                  name: "David Grey. H",
                  course: "Digital Marketing Pro",
                  status: "DONE",
                  statusBg: "from-[#84d9d2] to-[#07b09e]",
                  date: "Dec 5, 2026",
                  progress: 100,
                  progressBar: "bg-[#07b09e]",
                },
                {
                  name: "Stella Johnson",
                  course: "Cyber Security Practitioner",
                  status: "PROGRESS",
                  statusBg: "from-[#ffbf96] to-[#fe7096]",
                  date: "Dec 12, 2026",
                  progress: 60,
                  progressBar: "bg-[#fe7096]",
                },
                {
                  name: "Marina Michel",
                  course: "Ethical Hacking Live",
                  status: "ON HOLD",
                  statusBg: "from-[#90caf9] to-[#047edf]",
                  date: "Dec 16, 2026",
                  progress: 30,
                  progressBar: "bg-[#047edf]",
                },
                {
                  name: "John Doe",
                  course: "Digital Marketing Masterclass",
                  status: "REJECTED",
                  statusBg: "from-slate-400 to-slate-600",
                  date: "Dec 3, 2026",
                  progress: 0,
                  progressBar: "bg-slate-400",
                },
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-3 font-extrabold text-slate-800 flex items-center gap-2.5">
                    <div className="size-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-600 text-xs shrink-0">
                      {item.name.charAt(0)}
                    </div>
                    <span>{item.name}</span>
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-600">{item.course}</td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-black text-white bg-gradient-to-r ${item.statusBg} shadow-xs`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-slate-400 font-medium">{item.date}</td>
                  <td className="py-3.5 px-3">
                    <div className="w-28 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.progressBar}`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: STUDENT ENQUIRIES CRM
========================================================================= */
function ManageEnquiriesTab() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([
    {
      id: "enq-101",
      name: "Sai Rama",
      avatar: "SR",
      phone: "+91 98765 43210",
      email: "sairama@example.com",
      course: "Advanced Digital Marketing Masterclass",
      callTime: "Evening (4 PM - 7 PM)",
      date: "2026-09-07",
      status: "New",
      progress: 25,
    },
    {
      id: "enq-102",
      name: "Sunil Neelakantam",
      avatar: "SN",
      phone: "+91 94400 12345",
      email: "sunil@example.com",
      course: "Ethical Hacking & Cyber Security Practitioner",
      callTime: "Morning (9 AM - 12 PM)",
      date: "2026-09-06",
      status: "Contacted",
      progress: 60,
    },
    {
      id: "enq-103",
      name: "Ramesh Sharma",
      avatar: "RS",
      phone: "+91 88888 77777",
      email: "ramesh.sharma@example.com",
      course: "Advanced Digital Marketing Masterclass",
      callTime: "Afternoon (12 PM - 4 PM)",
      date: "2026-09-05",
      status: "Follow-up",
      progress: 45,
    },
    {
      id: "enq-104",
      name: "Pooja Reddy",
      avatar: "PR",
      phone: "+91 77777 66666",
      email: "pooja.reddy@example.com",
      course: "Ethical Hacking & Cyber Security Practitioner",
      callTime: "Evening (4 PM - 7 PM)",
      date: "2026-09-04",
      status: "Converted",
      progress: 100,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEnquiry, setNewEnquiry] = useState({
    name: "",
    phone: "",
    email: "",
    course: "Advanced Digital Marketing Masterclass",
    callTime: "Morning (9 AM - 12 PM)",
  });

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.includes(searchQuery) ||
        item.course.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [enquiries, searchQuery, statusFilter]);

  const handleStatusChange = (id: string, newStatus: Enquiry["status"]) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)),
    );
  };

  const handleDeleteEnquiry = (id: string) => {
    if (confirm("Are you sure you want to delete this enquiry record?")) {
      setEnquiries((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEnquiry.name || !newEnquiry.phone) return;

    const created: Enquiry = {
      id: `enq-${Date.now()}`,
      name: newEnquiry.name,
      avatar: newEnquiry.name.slice(0, 2).toUpperCase(),
      phone: newEnquiry.phone,
      email: newEnquiry.email || "N/A",
      course: newEnquiry.course,
      callTime: newEnquiry.callTime,
      date: new Date().toISOString().split("T")[0],
      status: "New",
      progress: 20,
    };

    setEnquiries([created, ...enquiries]);
    setIsAddModalOpen(false);
    setNewEnquiry({
      name: "",
      phone: "",
      email: "",
      course: "Advanced Digital Marketing Masterclass",
      callTime: "Morning (9 AM - 12 PM)",
    });
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
          <h3 className="text-lg font-black text-slate-900">Student Admissions CRM</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time tracking for course enquiries ({filteredEnquiries.length} total)
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] hover:opacity-95 text-white text-xs font-black flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer self-start sm:self-auto transition-all"
        >
          <Plus className="size-4" />
          Add Walk-in Enquiry
        </button>
      </div>

      {/* SEARCH AND FILTER BAR */}
      <div className="grid gap-3 sm:grid-cols-[1fr_200px] mb-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student name, phone, email or course..."
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
              <th className="py-3 px-3">Contact Details</th>
              <th className="py-3 px-3">Course Interest</th>
              <th className="py-3 px-3">Call Time</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredEnquiries.map((enq) => (
              <tr key={enq.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-3 font-extrabold text-slate-800 flex items-center gap-2.5">
                  <div className="size-8 rounded-full bg-purple-50 text-[#b66dff] font-black grid place-items-center shrink-0 border border-purple-100">
                    {enq.avatar}
                  </div>
                  <div>
                    <div>{enq.name}</div>
                    <span className="text-[11px] text-slate-400 font-normal">{enq.date}</span>
                  </div>
                </td>
                <td className="py-4 px-3">
                  <div className="flex flex-col gap-0.5">
                    <a
                      href={`tel:${enq.phone}`}
                      className="text-xs font-semibold text-[#b66dff] hover:underline flex items-center gap-1"
                    >
                      <Phone className="size-3" />
                      {enq.phone}
                    </a>
                    <a
                      href={`mailto:${enq.email}`}
                      className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                    >
                      <Mail className="size-3" />
                      {enq.email}
                    </a>
                  </div>
                </td>
                <td className="py-4 px-3 font-semibold text-slate-700">{enq.course}</td>
                <td className="py-4 px-3 text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="size-3 text-slate-400" />
                    {enq.callTime}
                  </span>
                </td>
                <td className="py-4 px-3">
                  <select
                    value={enq.status}
                    onChange={(e) =>
                      handleStatusChange(enq.id, e.target.value as Enquiry["status"])
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
            ))}
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
                  <option value="Advanced Digital Marketing Masterclass">
                    Advanced Digital Marketing Masterclass
                  </option>
                  <option value="Ethical Hacking & Cyber Security Practitioner">
                    Ethical Hacking & Cyber Security Practitioner
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
   TAB: COURSES CATALOG
========================================================================= */
function ManageCoursesTab() {
  const [courses] = useState<CourseItem[]>([
    {
      id: "course-1",
      title: "Advanced Digital Marketing Masterclass",
      slug: "digital-marketing",
      duration: "12 Weeks (120+ Hours)",
      level: "Beginner to Advanced",
      instructor: "Sai Rama",
      price: "₹24,999",
      students: 280,
      active: true,
    },
    {
      id: "course-2",
      title: "Ethical Hacking & Cyber Security Practitioner",
      slug: "cyber-security",
      duration: "16 Weeks (160+ Hours)",
      level: "Intermediate to Advanced",
      instructor: "Sai Rama",
      price: "₹34,999",
      students: 195,
      active: true,
    },
  ]);

  return (
    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h3 className="text-lg font-black text-slate-900">Academic Courses Catalog</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage course curriculum, batch fees, and live enrollment statuses
          </p>
        </div>
        <button className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] text-white text-xs font-black flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer self-start sm:self-auto">
          <Plus className="size-4" />
          Add New Program
        </button>
      </div>

      <div className="grid gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border border-slate-200/80 p-5 rounded-2xl bg-white shadow-xs hover:border-[#b66dff]/40 transition-all flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-extrabold text-slate-900">{course.title}</h4>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Published
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5 text-slate-400" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <User className="size-3.5 text-slate-400" />
                  Lead: {course.instructor}
                </span>
                <span className="flex items-center gap-1 font-bold text-slate-700">
                  Fee: {course.price}
                </span>
                <span className="flex items-center gap-1 font-bold text-[#b66dff]">
                  {course.students} Enrolled
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <button className="flex items-center gap-1 text-xs font-bold text-slate-650 hover:text-[#b66dff] bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer">
                <Edit3 className="size-3.5" />
                Edit Curriculum
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================================
   TAB: TESTIMONIALS
========================================================================= */
function ManageTestimonialsTab() {
  const [reviews] = useState<TestimonialItem[]>([
    {
      id: "rev-1",
      name: "Karthik Verma",
      role: "SEO Specialist",
      company: "TechNova Solutions",
      course: "Digital Marketing Masterclass",
      rating: 5,
      content:
        "The hands-on campaign simulations gave me the confidence to handle live client ad budgets.",
      featured: true,
    },
    {
      id: "rev-2",
      name: "Sneha Patel",
      role: "SOC Analyst Intern",
      company: "CyberGuard Defense",
      course: "Ethical Hacking & Cyber Security",
      rating: 5,
      content:
        "Real lab environments with Wireshark and Metasploit prepared me directly for technical interviews.",
      featured: true,
    },
  ]);

  return (
    <div className="bg-white border border-slate-200/80 p-6 rounded-2xl shadow-xs">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h3 className="text-lg font-black text-slate-900">Student Reviews & Wall of Love</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage verified graduate reviews and feedback shown on website layouts
          </p>
        </div>
        <button className="bg-gradient-to-r from-[#b66dff] to-[#da8cff] text-white text-xs font-black flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-purple-500/20 cursor-pointer self-start sm:self-auto">
          <Plus className="size-4" />
          Add Student Review
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="border border-slate-200/80 p-5 rounded-2xl bg-white shadow-xs flex flex-col justify-between hover:border-purple-200 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-purple-50 text-[#b66dff] border border-purple-100">
                  Featured
                </span>
              </div>
              <p className="text-xs text-slate-650 leading-relaxed italic">"{rev.content}"</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <h5 className="text-xs font-extrabold text-slate-900">{rev.name}</h5>
                <p className="text-[11px] text-slate-400">
                  {rev.role} &bull; {rev.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
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
              Project ID: <strong className="text-slate-700">digital-and-cyber</strong>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Auth Domain: <strong className="text-slate-700">digital-and-cyber.firebaseapp.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

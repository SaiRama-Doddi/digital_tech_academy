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
} from "lucide-react";
import { useEffect, useState } from "react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { Btn } from "@/components/site/Btn";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard | Digital Ascent Academy" },
      {
        name: "description",
        content: "Management panel for Digital Ascent Academy administrators.",
      },
    ],
  }),
  component: AdminDashboardPage,
});

type TabType = "courses" | "enquiries" | "testimonials" | "instructors" | "faqs";

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("courses");

  useEffect(() => {
    const isAuth = localStorage.getItem("admin_authenticated") === "true";
    if (!isAuth) {
      navigate({ to: "/admin/login" });
    } else {
      setAuthorized(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    navigate({ to: "/admin/login" });
  };

  if (authorized === null) {
    return (
      <div className="flex h-96 items-center justify-center bg-slate-50/20">
        <div className="text-center">
          <div className="size-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-500 font-bold text-sm">Verifying Session...</p>
        </div>
      </div>
    );
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Console"
        title="Admin Dashboard"
        description="Welcome back, Administrator. Use this control panel to manage your site content and review incoming enquiries."
      />

      <section className="bg-slate-50/50 py-8 lg:py-16">
        <div className="container-site">
          {/* Dashboard Header Panel */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white border border-slate-100 p-5 rounded-2xl shadow-sm mb-8">
            <div className="flex items-center gap-3.5">
              <div className="grid size-11 place-items-center rounded-xl bg-blue-50 text-blue-600 shadow-sm shadow-blue-500/5">
                <ShieldCheck className="size-5.5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-800">System Administrator</h2>
                <p className="text-xs text-slate-400">Access Level: Full Control</p>
              </div>
            </div>
            <Btn
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-slate-650 hover:bg-slate-50 border-slate-200 hover:text-slate-900 flex items-center gap-1.5 h-10 px-4 self-start sm:self-auto rounded-xl shadow-sm"
            >
              <LogOut className="size-4" />
              Logout
            </Btn>
          </div>

          <div className="grid gap-6 lg:gap-8 lg:grid-cols-[250px_1fr]">
            {/* Sidebar Navigation Tabs (Responsive: horizontal pill-list scroll on mobile, vertical sidebar list on desktop) */}
            <aside className="flex flex-row overflow-x-auto gap-2 pb-3 lg:pb-0 lg:overflow-x-visible lg:flex-col border-b border-slate-100 lg:border-none scrollbar-none">
              {[
                { id: "courses", label: "Manage Courses", icon: BookOpen },
                { id: "enquiries", label: "Student Enquiries", icon: MessageSquare },
                { id: "testimonials", label: "Testimonials", icon: Star },
                { id: "instructors", label: "Instructors", icon: Users },
                { id: "faqs", label: "FAQs", icon: HelpCircle },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold transition-all whitespace-nowrap border ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/15"
                        : "bg-white text-slate-650 hover:text-slate-900 border-slate-200/80 hover:border-slate-350 shadow-sm"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </aside>

            {/* Main Tab Content */}
            <main className="bg-white border border-slate-100 p-5 sm:p-7 rounded-2xl shadow-sm min-h-[400px]">
              {activeTab === "courses" && <ManageCoursesTab />}
              {activeTab === "enquiries" && <ManageEnquiriesTab />}
              {activeTab === "testimonials" && <ManageTestimonialsTab />}
              {activeTab === "instructors" && <ManageInstructorsTab />}
              {activeTab === "faqs" && <ManageFaqsTab />}
            </main>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

/* --- TAB COMPONENTS --- */

function ManageCoursesTab() {
  const mockCourses = [
    { id: 1, title: "Advanced Digital Marketing Masterclass", duration: "12 Weeks", instructor: "Sai Rama" },
    { id: 2, title: "Ethical Hacking & Cyber Security Practitioner", duration: "16 Weeks", instructor: "Sai Rama" },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Courses Catalog</h3>
          <p className="text-xs text-slate-500 mt-0.5">Manage active academic course pathways and structures</p>
        </div>
        <Btn size="sm" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-blue-500/10 self-start sm:self-auto">
          <Plus className="size-4" />
          Add New Course
        </Btn>
      </div>

      {/* MOBILE DEVICE GRID (Visible on mobile, hidden on desktop) */}
      <div className="grid gap-4 md:hidden">
        {mockCourses.map((course) => (
          <div key={course.id} className="border border-slate-100 p-4 rounded-xl shadow-sm bg-white hover:border-slate-200 transition-colors">
            <h4 className="font-extrabold text-slate-800 text-sm">{course.title}</h4>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5 text-slate-400" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <User className="size-3.5 text-slate-400" />
                {course.instructor}
              </span>
            </div>
            <div className="mt-4 flex gap-2 border-t border-slate-50 pt-3 justify-end">
              <button className="flex items-center gap-1.5 text-xs font-bold text-slate-650 hover:text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                <Edit3 className="size-3.5" />
                Edit
              </button>
              <button className="flex items-center gap-1.5 text-xs font-bold text-slate-650 hover:text-red-650 bg-slate-50 hover:bg-red-50 border border-slate-100 hover:border-red-100 px-3 py-1.5 rounded-lg transition-colors">
                <Trash2 className="size-3.5" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP DEVICE TABLE (Hidden on mobile, visible on desktop) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">
              <th className="py-3 px-2">Course Name</th>
              <th className="py-3 px-2">Duration</th>
              <th className="py-3 px-2">Lead Instructor</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockCourses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="py-4 px-2 font-bold text-slate-800">{course.title}</td>
                <td className="py-4 px-2 text-slate-500 flex items-center gap-1.5 h-full">
                  <Clock className="size-4 text-slate-400" />
                  {course.duration}
                </td>
                <td className="py-4 px-2 text-slate-650">{course.instructor}</td>
                <td className="py-4 px-2 text-right">
                  <div className="inline-flex gap-1">
                    <button className="p-2 text-slate-500 hover:text-blue-600 rounded-lg hover:bg-slate-100 transition-colors" title="Edit Course">
                      <Edit3 className="size-4" />
                    </button>
                    <button className="p-2 text-slate-500 hover:text-red-650 rounded-lg hover:bg-slate-100 transition-colors" title="Delete Course">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ManageEnquiriesTab() {
  const mockEnquiries = [
    { id: 1, name: "Rahul Kumar", phone: "9876543210", email: "rahul@example.com", course: "Digital Marketing", date: "2026-08-18", status: "New" },
    { id: 2, name: "Priya Sharma", phone: "8765432109", email: "priya@example.com", course: "Cyber Security", date: "2026-08-17", status: "Contacted" },
  ];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "New":
        return "bg-green-50 text-green-700 border-green-200";
      case "Contacted":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Follow-up":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Converted":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-slate-50 text-slate-650 border-slate-200";
    }
  };

  return (
    <div>
      <div className="border-b border-slate-100 pb-5 mb-6">
        <h3 className="text-base font-extrabold text-slate-800">Student Enquiries</h3>
        <p className="text-xs text-slate-500 mt-0.5">Manage admissions queries and scheduled callback actions</p>
      </div>

      {/* MOBILE DEVICE GRID */}
      <div className="grid gap-4 md:hidden">
        {mockEnquiries.map((enquiry) => (
          <div key={enquiry.id} className="border border-slate-100 p-4 rounded-xl shadow-sm bg-white hover:border-slate-200 transition-colors">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-3">
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">{enquiry.name}</h4>
                <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                  <Calendar className="size-3.5 text-slate-300" />
                  {enquiry.date}
                </span>
              </div>
              <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${getStatusClass(enquiry.status)}`}>
                {enquiry.status}
              </span>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <BookOpen className="size-3.5 text-slate-400 shrink-0" />
                <span className="font-medium text-slate-700">Course: {enquiry.course}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-slate-400 shrink-0" />
                <a href={`tel:${enquiry.phone}`} className="hover:text-blue-600 transition-colors">{enquiry.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-slate-400 shrink-0" />
                <a href={`mailto:${enquiry.email}`} className="hover:text-blue-600 transition-colors truncate max-w-[240px]">{enquiry.email}</a>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-50 pt-3 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Status Update</span>
              <select className="text-xs border border-slate-200 rounded-lg p-1.5 bg-white outline-none focus:border-blue-500 font-semibold text-slate-700 shadow-sm">
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Converted">Converted</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP DEVICE TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-xs">
              <th className="py-3 px-2">Student</th>
              <th className="py-3 px-2">Contact Details</th>
              <th className="py-3 px-2">Course Interest</th>
              <th className="py-3 px-2">Date Received</th>
              <th className="py-3 px-2">Current Status</th>
              <th className="py-3 px-2 text-right">Update Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockEnquiries.map((enquiry) => (
              <tr key={enquiry.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="py-4 px-2 font-bold text-slate-800">{enquiry.name}</td>
                <td className="py-4 px-2 text-slate-500">
                  <div className="flex flex-col gap-0.5">
                    <a href={`tel:${enquiry.phone}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors text-slate-650 font-medium">
                      <Phone className="size-3.5 text-slate-400" />
                      {enquiry.phone}
                    </a>
                    <a href={`mailto:${enquiry.email}`} className="flex items-center gap-1 hover:text-blue-600 transition-colors text-xs text-slate-400">
                      <Mail className="size-3.5 text-slate-350" />
                      {enquiry.email}
                    </a>
                  </div>
                </td>
                <td className="py-4 px-2 text-slate-650 font-semibold">{enquiry.course}</td>
                <td className="py-4 px-2 text-slate-500 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3.5 text-slate-400" />
                    {enquiry.date}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${getStatusClass(enquiry.status)}`}>
                    {enquiry.status}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <select className="text-xs border border-slate-200 rounded-lg p-1.5 bg-white outline-none focus:border-blue-500 font-semibold text-slate-700 shadow-sm">
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ManageTestimonialsTab() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Student Reviews</h3>
          <p className="text-xs text-slate-500 mt-0.5">Manage reviews, star ratings, and site layout settings</p>
        </div>
        <Btn size="sm" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-blue-500/10 self-start sm:self-auto">
          <Plus className="size-4" />
          Add Testimonial
        </Btn>
      </div>

      <div className="text-center py-16 border-2 border-dashed border-slate-200/80 rounded-2xl bg-slate-50/20">
        <div className="grid size-12 place-items-center rounded-full bg-slate-50 text-slate-400 mx-auto mb-3.5 border border-slate-100 shadow-sm">
          <Star className="size-5.5" />
        </div>
        <p className="text-slate-700 text-sm font-extrabold">No pending reviews</p>
        <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto px-4">
          All approved student testimonials are currently active and showing on the website’s home and testimonials layouts.
        </p>
      </div>
    </div>
  );
}

function ManageInstructorsTab() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Course Trainers</h3>
          <p className="text-xs text-slate-500 mt-0.5">Manage trainers, assigned bio details, and system profile settings</p>
        </div>
        <Btn size="sm" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-blue-500/10 self-start sm:self-auto">
          <Plus className="size-4" />
          Add Instructor
        </Btn>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-slate-100 rounded-2xl p-5 flex items-center gap-4 bg-white shadow-sm hover:border-slate-200 transition-colors">
          <div className="size-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold text-base border border-blue-100 shadow-sm shadow-blue-500/5 shrink-0">
            SR
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-slate-800">Sai Rama</h4>
            <p className="text-[11px] font-semibold text-blue-650 mt-0.5">Lead Trainer & Founder</p>
            <p className="text-xs text-slate-400 mt-1">Specialties: Digital Marketing, Cyber Security</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManageFaqsTab() {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 mb-6">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Knowledgebase FAQs</h3>
          <p className="text-xs text-slate-500 mt-0.5">Create, edit, or configure frequently asked questions</p>
        </div>
        <Btn size="sm" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 h-10 px-4 rounded-xl shadow-md shadow-blue-500/10 self-start sm:self-auto">
          <Plus className="size-4" />
          Add FAQ Item
        </Btn>
      </div>

      <div className="text-center py-16 border-2 border-dashed border-slate-200/80 rounded-2xl bg-slate-50/20">
        <div className="grid size-12 place-items-center rounded-full bg-slate-50 text-slate-400 mx-auto mb-3.5 border border-slate-100 shadow-sm">
          <HelpCircle className="size-5.5" />
        </div>
        <p className="text-slate-700 text-sm font-extrabold">All FAQs are synchronized</p>
        <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto px-4">
          Any modifications or new FAQ additions sync directly and will show up on the public FAQ support route instantly.
        </p>
      </div>
    </div>
  );
}

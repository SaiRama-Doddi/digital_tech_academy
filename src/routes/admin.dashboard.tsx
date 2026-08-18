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
      <div className="flex h-96 items-center justify-center">
        <p className="text-slate-500 font-bold animate-pulse">Checking authorization...</p>
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

      <section className="bg-slate-50/50 py-10 lg:py-16">
        <div className="container-site">
          {/* Dashboard Header Panel */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white border border-slate-100 p-5 rounded-2xl shadow-sm mb-8">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-lg bg-blue-50 text-blue-600">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-800">System Administrator</h2>
                <p className="text-xs text-slate-500">Access Level: Full Read/Write</p>
              </div>
            </div>
            <Btn
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-slate-650 hover:bg-slate-50 border-slate-200 hover:text-slate-905 flex items-center gap-1.5 h-10 px-4 self-start sm:self-auto"
            >
              <LogOut className="size-4" />
              Logout
            </Btn>
          </div>

          <div className="grid gap-8 lg:grid-cols-[250px_1fr]">
            {/* Sidebar Navigation Tabs */}
            <aside className="flex flex-row overflow-x-auto pb-3 lg:pb-0 lg:overflow-x-visible lg:flex-col gap-1 border-b border-slate-100 lg:border-none">
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
                    className={`flex items-center gap-2.5 rounded-lg px-4 py-3 text-xs sm:text-sm font-bold transition-all whitespace-nowrap lg:whitespace-normal ${
                      isActive
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                        : "text-slate-650 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-100/60"
                    }`}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </aside>

            {/* Main Tab Content */}
            <main className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm min-h-[400px]">
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
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Courses</h3>
          <p className="text-xs text-slate-500">Manage course catalogs, details, syllabus, and pricing</p>
        </div>
        <Btn size="sm" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 h-9 rounded-lg">
          <Plus className="size-4" />
          Add Course
        </Btn>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Course Name</th>
              <th className="py-3 px-2">Duration</th>
              <th className="py-3 px-2">Lead Instructor</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockCourses.map((course) => (
              <tr key={course.id} className="hover:bg-slate-50/50">
                <td className="py-4 px-2 font-bold text-slate-800">{course.title}</td>
                <td className="py-4 px-2 text-slate-500">{course.duration}</td>
                <td className="py-4 px-2 text-slate-650">{course.instructor}</td>
                <td className="py-4 px-2 text-right">
                  <div className="inline-flex gap-2">
                    <button className="p-1.5 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100">
                      <Edit3 className="size-4" />
                    </button>
                    <button className="p-1.5 text-slate-500 hover:text-red-650 rounded hover:bg-slate-100">
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

  return (
    <div>
      <div className="border-b border-slate-100 pb-4 mb-5">
        <h3 className="text-base font-extrabold text-slate-800">Student Enquiries</h3>
        <p className="text-xs text-slate-500">Track and respond to course inquiries and callback requests</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
              <th className="py-3 px-2">Student</th>
              <th className="py-3 px-2">Contact Info</th>
              <th className="py-3 px-2">Course Interest</th>
              <th className="py-3 px-2">Date</th>
              <th className="py-3 px-2">Status</th>
              <th className="py-3 px-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {mockEnquiries.map((enquiry) => (
              <tr key={enquiry.id} className="hover:bg-slate-50/50">
                <td className="py-4 px-2 font-bold text-slate-800">{enquiry.name}</td>
                <td className="py-4 px-2 text-slate-500">
                  <div className="flex flex-col">
                    <span>{enquiry.phone}</span>
                    <span className="text-[11px] text-slate-400">{enquiry.email}</span>
                  </div>
                </td>
                <td className="py-4 px-2 text-slate-650 font-medium">{enquiry.course}</td>
                <td className="py-4 px-2 text-slate-500">{enquiry.date}</td>
                <td className="py-4 px-2">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    enquiry.status === "New" ? "bg-green-50 text-green-700 border border-green-200" : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}>
                    {enquiry.status}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <select className="text-xs border rounded p-1 bg-white outline-none focus:border-blue-500">
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
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Testimonials</h3>
          <p className="text-xs text-slate-500">Manage student reviews, ratings, and display priority</p>
        </div>
        <Btn size="sm" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 h-9 rounded-lg">
          <Plus className="size-4" />
          Add Review
        </Btn>
      </div>

      <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl">
        <Star className="size-8 text-slate-300 mx-auto mb-2" />
        <p className="text-slate-500 text-xs sm:text-sm font-semibold">No pending student reviews</p>
        <p className="text-slate-400 text-xs mt-0.5">Approved reviews are actively displayed on the Testimonials page.</p>
      </div>
    </div>
  );
}

function ManageInstructorsTab() {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Instructors</h3>
          <p className="text-xs text-slate-500">Manage trainers, bio, social media profiles, and course assignments</p>
        </div>
        <Btn size="sm" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 h-9 rounded-lg">
          <Plus className="size-4" />
          Add Instructor
        </Btn>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="border border-slate-100 rounded-xl p-4 flex items-center gap-3">
          <div className="size-11 rounded-full bg-slate-100 flex items-center justify-center font-extrabold text-slate-600 text-sm">SR</div>
          <div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-800">Sai Rama</h4>
            <p className="text-[11px] text-slate-500">Lead Trainer & Founder</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManageFaqsTab() {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div>
          <h3 className="text-base font-extrabold text-slate-800">Frequently Asked Questions</h3>
          <p className="text-xs text-slate-500">Add or edit FAQs visible on the Support/FAQ page</p>
        </div>
        <Btn size="sm" variant="primary" className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1 h-9 rounded-lg">
          <Plus className="size-4" />
          Add FAQ
        </Btn>
      </div>

      <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-xl">
        <HelpCircle className="size-8 text-slate-300 mx-auto mb-2" />
        <p className="text-slate-500 text-xs sm:text-sm font-semibold">FAQs are synced directly with content datasets</p>
        <p className="text-slate-400 text-xs mt-0.5">Edit static datasets or customize categories here.</p>
      </div>
    </div>
  );
}

export const stats = [
  { value: 500, suffix: "+", label: "Students Trained" },
  { value: 20, suffix: "+", label: "Practical Projects" },
  { value: 95, suffix: "%", label: "Learning Satisfaction" },
  { value: 2, suffix: "", label: "Industry-Focused Domains" },
];

export const whyChooseUs = [
  {
    icon: "Hammer",
    title: "Practical First",
    text: "Learn by doing through projects, exercises and real-world scenarios.",
  },
  {
    icon: "Building2",
    title: "Industry-Aligned",
    text: "Courses are structured around skills relevant to today's digital and technology careers.",
  },
  {
    icon: "Users",
    title: "Expert Guidance",
    text: "Learn with structured guidance from experienced instructors.",
  },
  {
    icon: "TrendingUp",
    title: "Career Focused",
    text: "Build practical knowledge, confidence and portfolio-ready work.",
  },
];

export const methodology = [
  { step: "01", title: "Learn", text: "Concept sessions that build clear, structured understanding." },
  { step: "02", title: "Practice", text: "Guided tool work and exercises right after each concept." },
  { step: "03", title: "Build", text: "Apply skills to projects that mirror real business problems." },
  { step: "04", title: "Review", text: "Mentor feedback that sharpens quality and decision making." },
  { step: "05", title: "Get Certified", text: "Assessment and certification on successful completion." },
];

export const practicalTraining = [
  { icon: "Rocket", title: "Live Projects", text: "Work on end-to-end briefs with real deliverables." },
  { icon: "ClipboardList", title: "Practical Assignments", text: "Structured practice after every module." },
  { icon: "FileSearch", title: "Case Studies", text: "Break down real campaigns and security incidents." },
  { icon: "Wrench", title: "Tool-Based Training", text: "Hands-on time inside the tools professionals use." },
  { icon: "MessageSquareCheck", title: "Mentor Reviews", text: "Detailed feedback that improves your work." },
];

export const careerBenefits = [
  { icon: "BadgeCheck", title: "Job-ready skills", text: "Capabilities mapped to actual role requirements." },
  { icon: "FolderOpen", title: "Portfolio development", text: "Finish with work you can show, not just certificates." },
  { icon: "Activity", title: "Practical experience", text: "Repeated hands-on practice builds real fluency." },
  { icon: "Wrench", title: "Industry tools", text: "Confidence across the standard professional toolset." },
  { icon: "Award", title: "Certification", text: "Recognised course completion certificate." },
  { icon: "Mic", title: "Interview confidence", text: "Mock discussions and project walkthrough practice." },
];

export type Testimonial = {
  name: string;
  course: string;
  rating: number;
  quote: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rahul",
    course: "Digital Marketing Student",
    rating: 5,
    initials: "R",
    quote:
      "The practical approach made a huge difference. I wasn't just learning concepts — I was actually applying them.",
  },
  {
    name: "Ananya",
    course: "Cyber Security Student",
    rating: 5,
    initials: "A",
    quote:
      "The Cyber Security sessions helped me understand security concepts through practical examples instead of only theory.",
  },
  {
    name: "Karthik",
    course: "Advanced SEO & Performance Marketing",
    rating: 5,
    initials: "K",
    quote: "The audit workshops changed how I approach every client website now.",
  },
  {
    name: "Meghna",
    course: "Ethical Hacking & Security Fundamentals",
    rating: 5,
    initials: "M",
    quote: "I joined with zero Linux experience and finished genuinely comfortable in the terminal.",
  },
  {
    name: "Sneha",
    course: "Digital Marketing Mastery",
    rating: 5,
    initials: "S",
    quote: "Running real campaigns during the course gave me something concrete to show in interviews.",
  },
  {
    name: "Vikram",
    course: "Cyber Security Professional",
    rating: 4,
    initials: "V",
    quote: "Every concept was followed by a lab. That structure is what made it stick.",
  },
  {
    name: "Fatima",
    course: "Cyber Security Professional",
    rating: 5,
    initials: "F",
    quote: "Report writing practice was unexpected and turned out to be the most useful skill of all.",
  },
  {
    name: "Imran",
    course: "Digital Marketing Mastery",
    rating: 4,
    initials: "I",
    quote: "Analytics finally made sense once we worked through actual campaign reports.",
  },
];

export const homeFaqs = [
  {
    question: "Who can join the courses?",
    answer:
      "Anyone interested in building practical Digital Marketing or Cyber Security skills can join.",
  },
  {
    question: "Do beginners need prior experience?",
    answer: "No. Beginner-friendly learning paths are available.",
  },
  {
    question: "Are practical sessions included?",
    answer: "Yes. Courses include practical assignments and project-based learning.",
  },
  {
    question: "Will I receive a certificate?",
    answer: "Yes, eligible learners receive a course completion certificate.",
  },
  {
    question: "How can I enquire?",
    answer: "Use the Request a Call, WhatsApp or Contact options.",
  },
];

export const faqCategories = [
  {
    title: "General",
    items: [
      {
        question: "What kind of academy is Digital Tech Solution?",
        answer:
          "We are a focused training institute for Digital Marketing and Cyber Security, built around practical, career-oriented learning.",
      },
      {
        question: "Who can enrol in your programs?",
        answer:
          "Students, graduates, working professionals and business owners. Each course lists the level it is designed for.",
      },
      {
        question: "What training formats do you offer?",
        answer: "Classroom batches at our training centre and live online sessions with the same curriculum.",
      },
      {
        question: "Are batch timings flexible?",
        answer: "Yes, weekday and weekend batches are available. Availability is confirmed on your counselling call.",
      },
    ],
  },
  {
    title: "Digital Marketing",
    items: [
      {
        question: "Is SEO covered in depth?",
        answer:
          "Yes — keyword research, on-page, technical, off-page and local SEO, plus SEO analytics and reporting.",
      },
      {
        question: "Will I run real ad campaigns?",
        answer:
          "You build and optimise Google Ads and Meta Ads campaigns as part of guided practical sessions.",
      },
      {
        question: "Is social media marketing included?",
        answer: "Yes, covering Instagram, Facebook and LinkedIn with content and campaign planning.",
      },
      {
        question: "How is analytics taught?",
        answer:
          "Through hands-on work with analytics dashboards, conversion tracking and structured performance reporting.",
      },
    ],
  },
  {
    title: "Cyber Security",
    items: [
      {
        question: "Do I need networking knowledge before joining?",
        answer: "No. Networking and Linux fundamentals are covered from the beginning.",
      },
      {
        question: "Is ethical hacking taught responsibly?",
        answer:
          "Yes. All testing happens in controlled lab environments with a strong focus on scope, consent and ethics.",
      },
      {
        question: "What do the security labs include?",
        answer: "Network labs, web application testing, Linux hardening and scenario-based drills.",
      },
      {
        question: "Are security tools provided?",
        answer: "Yes, tool-based training runs inside guided lab setups shared during the course.",
      },
    ],
  },
  {
    title: "Enrollment, Fees & Support",
    items: [
      {
        question: "How does admission work?",
        answer:
          "Submit an enquiry, take a counselling call, choose your program and confirm your batch to start learning.",
      },
      {
        question: "What are the course fees?",
        answer:
          "Fees are listed on each course page. Early enrolment pricing and instalment options are available.",
      },
      {
        question: "When do I receive the certificate?",
        answer:
          "After completing assessments and participating in the course project, a completion certificate is issued.",
      },
      {
        question: "What support is available after the course?",
        answer:
          "Mentor guidance on project work, interview preparation discussions and doubt-clearing support.",
      },
    ],
  },
];

export const courseOptions = [
  "Digital Marketing Mastery",
  "Cyber Security Professional",
  "Advanced SEO & Performance Marketing",
  "Ethical Hacking & Security Fundamentals",
  "Not sure yet",
];

export const callTimeOptions = [
  "Morning (9:30 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 7:30 PM)",
  "Anytime",
];

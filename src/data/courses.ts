import digitalMarketingImg from "@/assets/course-digital-marketing.jpg";
import cyberSecurityImg from "@/assets/course-cyber-security.jpg";
import advancedSeoImg from "@/assets/course-advanced-seo.jpg";
import ethicalHackingImg from "@/assets/course-ethical-hacking.jpg";
import arjunImg from "@/assets/instructor-arjun.jpg";
import priyaImg from "@/assets/instructor-priya.jpg";

export type CourseCategory = "Digital Marketing" | "Cyber Security";

export type Instructor = {
  name: string;
  role: string;
  experience: string;
  expertise: string[];
  image: string;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  category: CourseCategory;
  description: string;
  longDescription: string;
  duration: string;
  level: string;
  mode: string;
  certificate: string;
  image: string;
  highlights: string[];
  overview: {
    learn: string[];
    audience: string[];
    outcomes: string[];
  };
  syllabus: { module: string; title: string; topics: string[] }[];
  practicalTraining: string[];
  projects: { title: string; summary: string }[];
  instructors: Instructor[];
  pricing: {
    fee: string;
    earlyFee?: string;
    note: string;
    includes: string[];
  };
  testimonials: { name: string; course: string; rating: number; quote: string }[];
  faqs: { question: string; answer: string }[];
};

export const instructors: Instructor[] = [
  {
    name: "Arjun Kumar",
    role: "Digital Marketing Strategist",
    experience: "9+ years in performance marketing and growth",
    expertise: ["SEO", "Paid Advertising", "Analytics", "Growth Strategy"],
    image: arjunImg,
  },
  {
    name: "Priya Sharma",
    role: "Cyber Security Trainer",
    experience: "8+ years in security operations and assessments",
    expertise: ["Network Security", "Web Security", "Ethical Hacking", "Security Fundamentals"],
    image: priyaImg,
  },
];

const marketingPractical = [
  "Live campaign demonstrations",
  "Hands-on assignments after every module",
  "Real brand case studies",
  "Tool-based exercises",
  "Mentor feedback on submissions",
  "Capstone campaign project",
];

const securityPractical = [
  "Guided lab walkthroughs",
  "Hands-on assignments after every module",
  "Incident case studies",
  "Tool-based exercises",
  "Mentor code and report reviews",
  "Final security assessment project",
];

export const courses: Course[] = [
  {
    id: "dm-01",
    slug: "digital-marketing",
    title: "Digital Marketing Mastery",
    category: "Digital Marketing",
    description:
      "A complete, practical path across SEO, social media, paid advertising, content and analytics — built around live campaign work.",
    longDescription:
      "Digital Marketing Mastery takes you from digital fundamentals to running and reporting on real campaigns. Each module pairs concepts with tool-based practice so you finish with a portfolio of campaign work, not just notes.",
    duration: "12 Weeks",
    level: "Beginner to Advanced",
    mode: "Classroom & Live Online",
    certificate: "Course completion certificate",
    image: digitalMarketingImg,
    highlights: [
      "SEO",
      "Social Media Marketing",
      "Google Ads",
      "Meta Ads",
      "Content Marketing",
      "Analytics",
    ],
    overview: {
      learn: [
        "Plan a digital strategy across search, social and paid channels",
        "Run and optimise Google Ads and Meta Ads campaigns",
        "Build SEO visibility through on-page, technical and off-page work",
        "Measure performance with analytics and structured reporting",
      ],
      audience: [
        "Students and fresh graduates starting a marketing career",
        "Business owners handling their own marketing",
        "Working professionals moving into digital roles",
      ],
      outcomes: [
        "Portfolio with a full campaign plan and performance report",
        "Practical command of industry marketing tools",
        "Confidence to own campaigns in a live role",
      ],
    },
    syllabus: [
      {
        module: "Module 01",
        title: "Digital Marketing Fundamentals",
        topics: ["Digital ecosystem", "Marketing funnel", "Customer journey", "Digital strategy"],
      },
      {
        module: "Module 02",
        title: "SEO",
        topics: [
          "Keyword research",
          "On-page SEO",
          "Technical SEO",
          "Off-page SEO",
          "Local SEO",
          "SEO analytics",
        ],
      },
      {
        module: "Module 03",
        title: "Social Media Marketing",
        topics: ["Instagram", "Facebook", "LinkedIn", "Content strategy", "Campaign planning"],
      },
      {
        module: "Module 04",
        title: "Google Ads",
        topics: [
          "Search campaigns",
          "Display campaigns",
          "Keyword strategy",
          "Ad copy",
          "Conversion tracking",
        ],
      },
      {
        module: "Module 05",
        title: "Meta Ads",
        topics: [
          "Campaign structure",
          "Audiences",
          "Creative strategy",
          "Retargeting",
          "Campaign optimization",
        ],
      },
      {
        module: "Module 06",
        title: "Analytics",
        topics: [
          "Google Analytics",
          "Conversion tracking",
          "Reporting",
          "Performance analysis",
        ],
      },
      {
        module: "Module 07",
        title: "Practical Project",
        topics: ["Campaign planning", "Execution", "Reporting", "Optimization"],
      },
    ],
    practicalTraining: marketingPractical,
    projects: [
      {
        title: "Full-funnel campaign plan",
        summary: "Research a brand, define audiences and build a channel-wise campaign plan with budgets.",
      },
      {
        title: "Search & social ad build",
        summary: "Structure live-style Google and Meta campaigns with tracking and creative variants.",
      },
      {
        title: "Performance report",
        summary: "Analyse campaign data and present optimisation recommendations like a marketing analyst.",
      },
    ],
    instructors: [instructors[0]!],
    pricing: {
      fee: "₹34,999",
      earlyFee: "₹29,999",
      note: "Placeholder pricing — replace with your current fee structure. Instalment options available.",
      includes: [
        "Full course access",
        "Practical sessions",
        "Assignments",
        "Mentor support",
        "Certificate",
        "Course materials",
      ],
    },
    testimonials: [
      {
        name: "Rahul",
        course: "Digital Marketing Mastery",
        rating: 5,
        quote:
          "The practical approach made a huge difference. I wasn't just learning concepts — I was actually applying them.",
      },
      {
        name: "Sneha",
        course: "Digital Marketing Mastery",
        rating: 5,
        quote:
          "Running real campaigns during the course gave me something concrete to show in interviews.",
      },
      {
        name: "Imran",
        course: "Digital Marketing Mastery",
        rating: 4,
        quote:
          "Analytics finally made sense once we worked through actual reports instead of slides.",
      },
    ],
    faqs: [
      {
        question: "Is the course beginner friendly?",
        answer:
          "Yes. The first module builds digital fundamentals before moving into channel-specific and advanced work.",
      },
      {
        question: "What is the duration?",
        answer: "12 weeks, with weekday and weekend batch options.",
      },
      {
        question: "Are practical sessions included?",
        answer: "Every module includes tool-based practice, assignments and mentor feedback.",
      },
      {
        question: "Is the course online or offline?",
        answer: "Both. You can join classroom batches or live online sessions.",
      },
      {
        question: "Will I receive a certificate?",
        answer:
          "Yes, eligible learners receive a course completion certificate after assessment and project submission.",
      },
      {
        question: "Are projects included?",
        answer: "Yes — a capstone campaign project plus module-level mini projects.",
      },
      {
        question: "How do I enroll?",
        answer: "Submit the Request a Call form and a counsellor will guide you through enrolment.",
      },
      {
        question: "Can I speak with a counsellor?",
        answer: "Yes. Request a call or message us on WhatsApp for a free counselling session.",
      },
    ],
  },
  {
    id: "cs-01",
    slug: "cyber-security",
    title: "Cyber Security Professional",
    category: "Cyber Security",
    description:
      "Structured security training across networking, Linux, web security and ethical hacking with guided hands-on labs.",
    longDescription:
      "Cyber Security Professional builds a strong technical base in networking and Linux, then moves into security fundamentals, web security, vulnerability assessment and practical security testing through guided labs.",
    duration: "16 Weeks",
    level: "Beginner to Advanced",
    mode: "Classroom & Live Online",
    certificate: "Course completion certificate",
    image: cyberSecurityImg,
    highlights: [
      "Networking",
      "Linux",
      "Cyber Security Fundamentals",
      "Ethical Hacking",
      "Web Security",
      "Security Tools",
    ],
    overview: {
      learn: [
        "Understand networks, protocols and Linux from a security perspective",
        "Identify and assess common vulnerabilities in web applications",
        "Use industry security tools in structured lab environments",
        "Document findings in professional assessment reports",
      ],
      audience: [
        "Beginners aiming for a cyber security career",
        "IT and support professionals moving into security roles",
        "Students who prefer lab-based technical learning",
      ],
      outcomes: [
        "Practical lab experience across security domains",
        "A written security assessment report for your portfolio",
        "Readiness for entry-level security analyst interviews",
      ],
    },
    syllabus: [
      {
        module: "Module 01",
        title: "Networking Fundamentals",
        topics: ["OSI & TCP/IP", "Protocols and ports", "Routing and switching basics", "Packet analysis"],
      },
      {
        module: "Module 02",
        title: "Linux Fundamentals",
        topics: ["Command line", "File system and permissions", "Users and services", "Shell basics"],
      },
      {
        module: "Module 03",
        title: "Security Fundamentals",
        topics: ["CIA triad", "Threats and attack surfaces", "Cryptography basics", "Security policies"],
      },
      {
        module: "Module 04",
        title: "Web Security",
        topics: ["HTTP fundamentals", "Injection flaws", "Authentication issues", "Secure configuration"],
      },
      {
        module: "Module 05",
        title: "Vulnerability Assessment",
        topics: ["Scanning methodology", "Asset discovery", "Risk rating", "Remediation guidance"],
      },
      {
        module: "Module 06",
        title: "Ethical Hacking Fundamentals",
        topics: ["Reconnaissance", "Enumeration", "Exploitation basics", "Reporting ethics"],
      },
      {
        module: "Module 07",
        title: "Security Tools",
        topics: ["Traffic analysers", "Scanners", "Proxy tools", "Reporting tools"],
      },
      {
        module: "Module 08",
        title: "Security Testing",
        topics: ["Test planning", "Manual verification", "Evidence capture", "Report writing"],
      },
      {
        module: "Module 09",
        title: "Practical Labs",
        topics: ["Network labs", "Web application labs", "Linux hardening labs", "Scenario drills"],
      },
      {
        module: "Module 10",
        title: "Final Security Project",
        topics: ["Scope definition", "Assessment execution", "Findings documentation", "Presentation"],
      },
    ],
    practicalTraining: securityPractical,
    projects: [
      {
        title: "Network assessment lab",
        summary: "Map a lab network, analyse traffic and document exposure points.",
      },
      {
        title: "Web application review",
        summary: "Test a deliberately vulnerable application and rate findings by risk.",
      },
      {
        title: "Security assessment report",
        summary: "Produce a professional report with findings, evidence and remediation steps.",
      },
    ],
    instructors: [instructors[1]!],
    pricing: {
      fee: "₹44,999",
      earlyFee: "₹39,999",
      note: "Placeholder pricing — replace with your current fee structure. Instalment options available.",
      includes: [
        "Full course access",
        "Practical lab sessions",
        "Assignments",
        "Mentor support",
        "Certificate",
        "Course materials",
      ],
    },
    testimonials: [
      {
        name: "Ananya",
        course: "Cyber Security Professional",
        rating: 5,
        quote:
          "The Cyber Security sessions helped me understand security concepts through practical examples instead of only theory.",
      },
      {
        name: "Vikram",
        course: "Cyber Security Professional",
        rating: 5,
        quote: "The labs were the highlight — every concept was followed by something we actually did.",
      },
      {
        name: "Fatima",
        course: "Cyber Security Professional",
        rating: 4,
        quote: "Report writing practice was unexpected and turned out to be the most useful skill.",
      },
    ],
    faqs: [
      {
        question: "Is the course beginner friendly?",
        answer: "Yes. Networking and Linux fundamentals are covered before any security topics.",
      },
      { question: "What is the duration?", answer: "16 weeks, with weekday and weekend batches." },
      {
        question: "Are practical sessions included?",
        answer: "Yes, guided labs run through the entire programme.",
      },
      {
        question: "Do I need programming experience?",
        answer: "No. Basic scripting is introduced where required.",
      },
      {
        question: "Will I receive a certificate?",
        answer: "Yes, after assessment and final project participation.",
      },
      {
        question: "Are projects included?",
        answer: "Yes — lab projects plus a final security assessment project.",
      },
      { question: "How do I enroll?", answer: "Request a call and a counsellor will help you enrol." },
      {
        question: "Can I speak with a counsellor?",
        answer: "Yes, counselling calls are free and without obligation.",
      },
    ],
  },
  {
    id: "dm-02",
    slug: "advanced-seo",
    title: "Advanced SEO & Performance Marketing",
    category: "Digital Marketing",
    description:
      "A focused programme for marketers who want deeper technical SEO, paid performance and conversion skills.",
    longDescription:
      "Advanced SEO & Performance Marketing is built for learners who already understand marketing basics and want measurable performance skills: technical SEO, paid search efficiency, conversion optimisation and reporting.",
    duration: "8 Weeks",
    level: "Intermediate to Advanced",
    mode: "Classroom & Live Online",
    certificate: "Course completion certificate",
    image: advancedSeoImg,
    highlights: [
      "Advanced SEO",
      "Technical SEO",
      "Google Ads",
      "Conversion Optimization",
      "Analytics",
      "Reporting",
    ],
    overview: {
      learn: [
        "Audit and fix technical SEO issues at scale",
        "Build topical authority with content and internal linking",
        "Improve paid campaign efficiency and quality",
        "Design conversion experiments and report on impact",
      ],
      audience: [
        "Marketers with basic digital experience",
        "Freelancers handling client SEO and ads",
        "Business owners scaling organic and paid channels",
      ],
      outcomes: [
        "A complete technical SEO audit deliverable",
        "Paid account optimisation playbook",
        "Reporting dashboard structure you can reuse",
      ],
    },
    syllabus: [
      {
        module: "Module 01",
        title: "Advanced SEO Strategy",
        topics: ["Search intent mapping", "Topical authority", "Competitor gap analysis", "Content architecture"],
      },
      {
        module: "Module 02",
        title: "Technical SEO",
        topics: ["Crawling and indexing", "Site speed", "Structured data", "Log and audit workflows"],
      },
      {
        module: "Module 03",
        title: "Google Ads Performance",
        topics: ["Account structure", "Bidding strategies", "Quality signals", "Budget efficiency"],
      },
      {
        module: "Module 04",
        title: "Conversion Optimization",
        topics: ["Landing page analysis", "Experiment design", "Funnel diagnostics", "Copy and offer testing"],
      },
      {
        module: "Module 05",
        title: "Analytics & Reporting",
        topics: ["Event tracking", "Attribution basics", "Dashboarding", "Stakeholder reporting"],
      },
      {
        module: "Module 06",
        title: "Practical Project",
        topics: ["Audit execution", "Optimisation roadmap", "Implementation review", "Results presentation"],
      },
    ],
    practicalTraining: marketingPractical,
    projects: [
      { title: "Technical SEO audit", summary: "Audit a live-style site and prioritise fixes by impact." },
      { title: "Paid account optimisation", summary: "Restructure a campaign set for efficiency and quality." },
      { title: "Conversion experiment plan", summary: "Design and document a full CRO test cycle." },
    ],
    instructors: [instructors[0]!],
    pricing: {
      fee: "₹27,999",
      earlyFee: "₹23,999",
      note: "Placeholder pricing — replace with your current fee structure.",
      includes: [
        "Full course access",
        "Live audit workshops",
        "Assignments",
        "Mentor support",
        "Certificate",
        "Templates and materials",
      ],
    },
    testimonials: [
      {
        name: "Karthik",
        course: "Advanced SEO & Performance Marketing",
        rating: 5,
        quote: "The audit workshops changed how I approach every client site now.",
      },
      {
        name: "Divya",
        course: "Advanced SEO & Performance Marketing",
        rating: 5,
        quote: "Short course, very dense. Reporting templates alone were worth it.",
      },
    ],
    faqs: [
      {
        question: "Is the course beginner friendly?",
        answer:
          "It is intended for learners with basic digital marketing knowledge. Beginners are guided to Digital Marketing Mastery first.",
      },
      { question: "What is the duration?", answer: "8 weeks of focused sessions and workshops." },
      { question: "Are practical sessions included?", answer: "Yes, every module is workshop-driven." },
      { question: "Is the course online or offline?", answer: "Available in classroom and live online formats." },
      { question: "Will I receive a certificate?", answer: "Yes, on completion of assessment and project." },
      { question: "How do I enroll?", answer: "Request a call and a counsellor will confirm your batch." },
    ],
  },
  {
    id: "cs-02",
    slug: "ethical-hacking",
    title: "Ethical Hacking & Security Fundamentals",
    category: "Cyber Security",
    description:
      "Hands-on introduction to ethical hacking: networking, Linux, vulnerability assessment and security testing.",
    longDescription:
      "Ethical Hacking & Security Fundamentals is a practical entry point into offensive security. You build the required networking and Linux base, then work through assessment and testing exercises in controlled lab environments.",
    duration: "12 Weeks",
    level: "Beginner to Intermediate",
    mode: "Classroom & Live Online",
    certificate: "Course completion certificate",
    image: ethicalHackingImg,
    highlights: [
      "Networking",
      "Linux",
      "Vulnerability Assessment",
      "Web Security",
      "Security Testing",
      "Security Fundamentals",
    ],
    overview: {
      learn: [
        "Work confidently on the Linux command line",
        "Run structured reconnaissance and enumeration",
        "Assess web and network vulnerabilities responsibly",
        "Document tests with clear, ethical reporting",
      ],
      audience: [
        "Beginners curious about ethical hacking",
        "Students preparing for security certifications",
        "IT professionals adding security skills",
      ],
      outcomes: [
        "Comfort with core security tooling",
        "Lab-tested assessment methodology",
        "Portfolio-ready testing documentation",
      ],
    },
    syllabus: [
      {
        module: "Module 01",
        title: "Networking Essentials",
        topics: ["Protocols", "Ports and services", "Network mapping", "Traffic basics"],
      },
      {
        module: "Module 02",
        title: "Linux for Security",
        topics: ["Command line", "Permissions", "Services", "Scripting basics"],
      },
      {
        module: "Module 03",
        title: "Security Fundamentals",
        topics: ["Threat models", "Attack lifecycle", "Cryptography basics", "Ethics and scope"],
      },
      {
        module: "Module 04",
        title: "Vulnerability Assessment",
        topics: ["Discovery", "Scanning", "Validation", "Risk rating"],
      },
      {
        module: "Module 05",
        title: "Web Security Testing",
        topics: ["Common web flaws", "Proxy tooling", "Manual testing", "Secure fixes"],
      },
      {
        module: "Module 06",
        title: "Practical Labs & Project",
        topics: ["Guided labs", "Scenario testing", "Evidence capture", "Final report"],
      },
    ],
    practicalTraining: securityPractical,
    projects: [
      { title: "Recon and enumeration lab", summary: "Profile a lab target and document its attack surface." },
      { title: "Vulnerability assessment", summary: "Scan, validate and risk-rate findings in a controlled lab." },
      { title: "Ethical testing report", summary: "Write a scoped, ethical testing report with remediation advice." },
    ],
    instructors: [instructors[1]!],
    pricing: {
      fee: "₹32,999",
      earlyFee: "₹28,999",
      note: "Placeholder pricing — replace with your current fee structure.",
      includes: [
        "Full course access",
        "Guided lab environment",
        "Assignments",
        "Mentor support",
        "Certificate",
        "Course materials",
      ],
    },
    testimonials: [
      {
        name: "Rohit",
        course: "Ethical Hacking & Security Fundamentals",
        rating: 5,
        quote: "Clear, ethical and very hands-on. The labs built real confidence.",
      },
      {
        name: "Meghna",
        course: "Ethical Hacking & Security Fundamentals",
        rating: 5,
        quote: "I came in with zero Linux experience and finished comfortable in the terminal.",
      },
    ],
    faqs: [
      { question: "Is the course beginner friendly?", answer: "Yes, no prior security experience is required." },
      { question: "What is the duration?", answer: "12 weeks including lab time." },
      { question: "Are practical sessions included?", answer: "Yes, labs run alongside every module." },
      { question: "Is the course online or offline?", answer: "Classroom and live online options are available." },
      { question: "Will I receive a certificate?", answer: "Yes, after assessment and lab project participation." },
      { question: "How do I enroll?", answer: "Request a call to check the next batch start date." },
    ],
  },
];

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug);
}

export const courseNavSections = [
  { id: "overview", label: "Program Overview" },
  { id: "syllabus", label: "Syllabus" },
  { id: "practical", label: "Practical Training" },
  { id: "certificate", label: "Certificate" },
  { id: "instructors", label: "Instructors" },
  { id: "admission", label: "Admission Process" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faqs", label: "FAQs" },
] as const;

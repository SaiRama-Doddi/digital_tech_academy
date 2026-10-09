import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlTnbqsBrLepfI_JWPkjLFeuNEo0oW-ik",
  authDomain: "digital-and-cyber.firebaseapp.com",
  projectId: "digital-and-cyber",
  storageBucket: "digital-and-cyber.firebasestorage.app",
  messagingSenderId: "298584402851",
  appId: "1:298584402851:web:54301f5391d10f39e60816",
  measurementId: "G-EHD33LVK05",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const allCourses = [
  {
    id: "dm-01",
    slug: "digital-marketing",
    title: "Digital Marketing & Performance Marketing Program",
    category: "Digital Marketing",
    description:
      "Learn how modern brands attract, engage and convert customers across search, social, paid media, analytics and performance marketing.",
    longDescription:
      "Learn how modern brands attract, engage and convert customers across search, social, paid media, analytics and performance marketing.",
    duration: "12 Weeks",
    level: "Beginner to Advanced",
    mode: "Classroom & Live Online",
    certificate: "Course completion certificate",
    instructor: "Arjun Kumar",
    price: "₹24,999",
    highlights: [
      "SEO",
      "Social Media Marketing",
      "Google Ads",
      "Meta Ads",
      "Content Marketing",
      "Analytics",
    ],
    about: {
      description:
        "Learn how modern brands attract, engage and convert customers across search, social, paid media, analytics and performance marketing.",
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
        title: "SEO Mastery",
        topics: ["Keyword research", "On-page SEO", "Technical SEO", "Off-page SEO", "Local SEO"],
      },
      {
        module: "Module 03",
        title: "Social Media Marketing",
        topics: ["Instagram", "Facebook", "LinkedIn", "Content strategy", "Campaign planning"],
      },
      {
        module: "Module 04",
        title: "Google Ads & PPC",
        topics: ["Search campaigns", "Display campaigns", "Keyword strategy", "Conversion tracking"],
      },
      {
        module: "Module 05",
        title: "Meta Ads & Paid Social",
        topics: ["Audience targeting", "Ad formats", "Retargeting", "A/B testing"],
      },
      {
        module: "Module 06",
        title: "Analytics & GA4",
        topics: ["Google Analytics 4", "Looker Studio", "KPI reporting", "Attribution basics"],
      },
    ],
    faqs: [
      {
        question: "Is this course beginner-friendly?",
        answer: "Yes, no prior experience is required.",
      },
      {
        question: "Will I get hands-on experience with live tools?",
        answer: "Yes, you will work on Google Ads, Meta Business Suite, GA4, and SEO tools.",
      },
    ],
    students: 184,
    active: true,
    featured: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "pa-01",
    slug: "programmatic-advertising",
    title: "Programmatic Advertising & Media Buying Program",
    category: "Programmatic Advertising",
    description:
      "Master DSPs, SSPs, ad exchanges, RTB, audience targeting, DV360, Google Campaign Manager, and data-driven digital media planning.",
    longDescription:
      "Master DSPs, SSPs, ad exchanges, RTB, audience targeting, DV360, Google Campaign Manager, and data-driven digital media planning.",
    duration: "10 Weeks",
    level: "Intermediate to Advanced",
    mode: "Classroom & Live Online",
    certificate: "Programmatic Advertising Professional Certificate",
    instructor: "Sai Rama",
    price: "₹34,999",
    highlights: [
      "DV360",
      "Campaign Manager 360",
      "DSP & SSP Ecosystem",
      "Real-Time Bidding (RTB)",
      "Audience Targeting & DMPs",
      "Attribution Modeling",
    ],
    about: {
      description:
        "Master the programmatic media ecosystem including demand-side platforms, supply-side platforms, data management platforms, and exchange bidding.",
      learn: [
        "Navigate DSPs and SSPs with practical confidence",
        "Set up programmatic deals and private marketplaces (PMP)",
        "Optimize campaign bids using data signals",
        "Implement conversion and audience tracking pixels",
      ],
      audience: [
        "Media planners and performance marketers",
        "Agency professionals transitioning to programmatic",
        "AdTech enthusiasts and graduate students",
      ],
      outcomes: [
        "Complete media plan portfolio ready for agency roles",
        "Hands-on DV360 workflow familiarity",
        "Certificate of completion from DIGITECHADEMY",
      ],
    },
    syllabus: [
      {
        module: "Module 01",
        title: "Programmatic Ecosystem Overview",
        topics: ["Ad networks vs programmatic", "DSPs, SSPs, and ad exchanges", "RTB auction mechanics"],
      },
      {
        module: "Module 02",
        title: "DSP Workflows & Setup",
        topics: ["Campaign hierarchies", "Targeting parameters", "Inventory selection", "PMP vs Open Auction"],
      },
      {
        module: "Module 03",
        title: "Audience Strategy & Data",
        topics: ["1st, 2nd, and 3rd-party data", "CDPs & DMPs", "Contextual targeting", "Privacy & cookies"],
      },
      {
        module: "Module 04",
        title: "Creative & Rich Media",
        topics: ["Dynamic creative optimization (DCO)", "Ad formats", "Trafficking tags", "QA verification"],
      },
      {
        module: "Module 05",
        title: "Optimization & Troubleshooting",
        topics: ["Bid shading & win rates", "Brand safety & verification", "Viewability optimization"],
      },
    ],
    faqs: [
      {
        question: "Do I need digital marketing background for programmatic?",
        answer: "Basic digital marketing knowledge is recommended, though we cover core concepts from week 1.",
      },
    ],
    students: 142,
    active: true,
    featured: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "cs-01",
    slug: "cyber-security",
    title: "Cyber Security Fundamentals & SOC Analyst Program",
    category: "Cyber Security",
    description:
      "Develop defensive and offensive security foundations: network security, Linux administration, vulnerability assessment, SIEM tools, and SOC analysis.",
    longDescription:
      "Develop defensive and offensive security foundations: network security, Linux administration, vulnerability assessment, SIEM tools, and SOC analysis.",
    duration: "14 Weeks",
    level: "Beginner to Intermediate",
    mode: "Classroom & Live Online",
    certificate: "Cyber Security Associate Certificate",
    instructor: "Priya Sharma",
    price: "₹29,999",
    highlights: [
      "Network Security",
      "Linux for Security",
      "Vulnerability Assessment",
      "SIEM & SOC Fundamentals",
      "Incident Response",
      "Security Audits",
    ],
    about: {
      description:
        "Build foundational capabilities in cyber defense, understanding threats, securing infrastructure, monitoring security events, and investigating incidents.",
      learn: [
        "Analyze network traffic with Wireshark and tcpdump",
        "Perform vulnerability scans using Nessus and Nmap",
        "Configure firewalls and intrusion detection systems",
        "Handle security incident triage in a SOC environment",
      ],
      audience: [
        "IT support and network technicians",
        "Computer science and engineering students",
        "Professionals seeking a career in cyber security",
      ],
      outcomes: [
        "Hands-on lab experience with real security tools",
        "Security audit report portfolio",
        "Preparation for entry-level SOC Analyst roles",
      ],
    },
    syllabus: [
      {
        module: "Module 01",
        title: "Networking & Security Architecture",
        topics: ["TCP/IP model", "Subnetting", "DNS, DHCP, HTTP/S protocols", "Ports & services"],
      },
      {
        module: "Module 02",
        title: "Linux & Command-Line Operations",
        topics: ["Linux fundamentals", "File permissions", "Process management", "Security bash scripting"],
      },
      {
        module: "Module 03",
        title: "Threats, Attacks & Vulnerabilities",
        topics: ["Malware types", "Social engineering", "Network attacks", "OWASP Top 10 overview"],
      },
      {
        module: "Module 04",
        title: "Defensive Operations & SIEM",
        topics: ["Log analysis", "SIEM dashboards", "Alert correlation", "Incident escalation"],
      },
    ],
    faqs: [
      {
        question: "Is coding required for this security program?",
        answer: "No prior coding experience is required. Basic scripting is taught step-by-step.",
      },
    ],
    students: 210,
    active: true,
    featured: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "seo-01",
    slug: "advanced-seo",
    title: "Advanced SEO & Content Marketing Mastery",
    category: "Digital Marketing",
    description:
      "Deep dive into technical SEO, programmatic content strategies, core web vitals, backlink acquisition, and organic search growth.",
    longDescription:
      "Deep dive into technical SEO, programmatic content strategies, core web vitals, backlink acquisition, and organic search growth.",
    duration: "8 Weeks",
    level: "Intermediate",
    mode: "Live Online & Classroom",
    certificate: "Advanced SEO Specialist Certificate",
    instructor: "Arjun Kumar",
    price: "₹18,999",
    highlights: [
      "Technical SEO Auditing",
      "Core Web Vitals",
      "Schema & Structured Data",
      "Link Building Strategy",
      "Ahrefs & Semrush",
      "Search Console Mastery",
    ],
    about: {
      description: "Scale organic website traffic through technical precision and strategic content.",
      learn: [
        "Perform comprehensive technical SEO audits",
        "Optimize crawl budget and site architecture",
        "Create data-driven keyword maps",
      ],
      audience: ["Content creators", "SEO specialists", "Growth managers"],
      outcomes: ["Full technical audit deliverable for a live brand"],
    },
    syllabus: [
      {
        module: "Module 01",
        title: "Technical SEO Foundation",
        topics: ["Crawling & indexing", "Robots.txt & XML sitemaps", "Canonical tags", "Status codes"],
      },
      {
        module: "Module 02",
        title: "On-Page & Semantic Content",
        topics: ["Entity SEO", "Search intent matching", "Content briefs", "Structured data markup"],
      },
    ],
    faqs: [],
    students: 115,
    active: true,
    featured: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "eh-01",
    slug: "ethical-hacking",
    title: "Ethical Hacking & Security Fundamentals",
    category: "Cyber Security",
    description:
      "Hands-on introduction to ethical hacking: networking, Linux, vulnerability assessment, penetration testing, and web app security.",
    longDescription:
      "Hands-on introduction to ethical hacking: networking, Linux, vulnerability assessment, penetration testing, and web app security.",
    duration: "12 Weeks",
    level: "Beginner to Intermediate",
    mode: "Live Online & Classroom",
    certificate: "Ethical Hacking Certificate",
    instructor: "Priya Sharma",
    price: "₹32,999",
    highlights: [
      "Networking",
      "Linux",
      "Vulnerability Assessment",
      "Web Security",
      "Security Testing",
      "Metasploit & Burp Suite",
    ],
    about: {
      description: "Gain hands-on skills in identifying security flaws before malicious attackers do.",
      learn: [
        "Understand penetration testing phases",
        "Find web vulnerabilities using Burp Suite",
        "Produce professional vulnerability remediation reports",
      ],
      audience: ["Students", "Network admins", "Aspiring security engineers"],
      outcomes: ["Practical penetration testing portfolio and methodology report"],
    },
    syllabus: [
      {
        module: "Module 01",
        title: "Reconnaissance & Scanning",
        topics: ["Passive recon", "Active recon", "Nmap port scanning", "OS fingerprinting"],
      },
      {
        module: "Module 02",
        title: "Web Application Assessment",
        topics: ["SQL injection", "XSS vulnerabilities", "Authentication bypass", "Burp Suite proxy"],
      },
    ],
    faqs: [],
    students: 191,
    active: true,
    featured: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "ai-01",
    slug: "ai-automation-mastery",
    title: "AI & Automation Mastery",
    category: "AI & Automation",
    description:
      "Master generative AI tools, prompt engineering, Zapier/Make automations, and enterprise workflow optimizations.",
    longDescription:
      "Master generative AI tools, prompt engineering, Zapier/Make automations, and enterprise workflow optimizations.",
    duration: "8 Weeks",
    level: "Beginner to Intermediate",
    mode: "Classroom & Live Online",
    certificate: "AI Automation Specialist Certificate",
    instructor: "Kiran Varma",
    price: "₹21,999",
    highlights: [
      "Prompt Engineering",
      "Zapier & Make Automations",
      "AI for Marketing & Sales",
      "No-Code AI App Building",
      "OpenAI & Claude APIs",
    ],
    about: {
      description: "Automate repetitive business workflows and unlock high-productivity AI solutions.",
      learn: [
        "Build multi-step automated workflows with Make and Zapier",
        "Engineer advanced prompts for LLMs",
        "Deploy custom AI assistants for customer support",
      ],
      audience: ["Entrepreneurs", "Operations managers", "Marketers", "Developers"],
      outcomes: ["Complete library of 10+ deployable business automation flows"],
    },
    syllabus: [
      {
        module: "Module 01",
        title: "Generative AI Foundations",
        topics: ["LLM architecture basics", "Prompt crafting", "Context window optimization"],
      },
      {
        module: "Module 02",
        title: "Workflow Automation with Make & Zapier",
        topics: ["Webhooks", "JSON parsing", "CRM data synchronization", "Error handling"],
      },
    ],
    faqs: [],
    students: 165,
    active: true,
    featured: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "ai-02",
    slug: "ai-agents-workflows",
    title: "AI Agents & Autonomous Workflows",
    category: "AI & Automation",
    description:
      "Build intelligent AI agents, tool-calling systems, vector database integrations, and LangChain autonomous workflows.",
    longDescription:
      "Build intelligent AI agents, tool-calling systems, vector database integrations, and LangChain autonomous workflows.",
    duration: "10 Weeks",
    level: "Intermediate to Advanced",
    mode: "Live Online",
    certificate: "AI Agent Architect Certificate",
    instructor: "Kiran Varma",
    price: "₹28,999",
    highlights: [
      "Autonomous Agents",
      "Tool Calling & Function Calling",
      "RAG & Vector Databases",
      "LangChain & LangGraph",
      "Multi-Agent Coordination",
    ],
    about: {
      description: "Build autonomous multi-agent pipelines capable of executing complex tasks.",
      learn: [
        "Design agent cognitive architectures",
        "Connect external tools via function calling",
        "Build RAG pipelines with Pinecone/Chroma",
      ],
      audience: ["Developers", "Data analysts", "Technical architects"],
      outcomes: ["Production-ready autonomous agent deployed to cloud"],
    },
    syllabus: [
      {
        module: "Module 01",
        title: "Agent Foundations & Function Calling",
        topics: ["ReAct framework", "Tool definition", "Structured outputs"],
      },
      {
        module: "Module 02",
        title: "RAG & Vector Search",
        topics: ["Embeddings", "Vector indexing", "Retrieval reranking"],
      },
    ],
    faqs: [],
    students: 98,
    active: true,
    featured: false,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: "fs-01",
    slug: "full-stack-web-dev",
    title: "Full Stack Web Development (MERN)",
    category: "Full Stack Development",
    description:
      "Complete hands-on full stack development: React, Node.js, Express, MongoDB, TailwindCSS, REST APIs, and Cloud Deployment.",
    longDescription:
      "Complete hands-on full stack development: React, Node.js, Express, MongoDB, TailwindCSS, REST APIs, and Cloud Deployment.",
    duration: "16 Weeks",
    level: "Beginner to Professional",
    mode: "Classroom & Live Online",
    certificate: "Full Stack Web Developer Certificate",
    instructor: "Sai Rama",
    price: "₹36,999",
    highlights: [
      "React 19 & TypeScript",
      "Node.js & Express APIs",
      "MongoDB & Mongoose",
      "TailwindCSS & Modern UI",
      "Auth & Security (JWT)",
      "Vercel & Docker Deployment",
    ],
    about: {
      description: "Become a job-ready full stack web developer through practical production project building.",
      learn: [
        "Build interactive frontend applications with React",
        "Design scalable REST APIs with Node.js and Express",
        "Manage cloud databases with MongoDB Atlas",
        "Deploy production web apps with CI/CD",
      ],
      audience: ["College graduates", "Self-taught developers", "Career switchers"],
      outcomes: ["3 full stack production projects deployed online on your portfolio"],
    },
    syllabus: [
      {
        module: "Module 01",
        title: "Modern Frontend (HTML, CSS, JS, React)",
        topics: ["DOM & Modern JS", "React Hooks & Components", "State Management", "Tailwind CSS"],
      },
      {
        module: "Module 02",
        title: "Backend Engineering (Node & Express)",
        topics: ["Server architecture", "RESTful API design", "Middleware", "Authentication & JWT"],
      },
      {
        module: "Module 03",
        title: "Databases & Cloud Architecture",
        topics: ["MongoDB schemas", "CRUD operations", "Indexing & performance", "Deployment"],
      },
    ],
    faqs: [],
    students: 230,
    active: true,
    featured: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const allFaqs = [
  {
    id: "faq-1",
    category: "General",
    question: "Who can join Digitechademy?",
    answer: "Our programs are designed for beginners, students, working professionals and career switchers depending on the course and any stated prerequisites.",
    order: 1,
  },
  {
    id: "faq-2",
    category: "General",
    question: "Are the courses practical?",
    answer: "Yes. Programs combine concepts with exercises, projects, case studies and tool-based activities where applicable.",
    order: 2,
  },
  {
    id: "faq-3",
    category: "General",
    question: "Which programs does Digitechademy offer?",
    answer: "Our core focus is Digital Marketing, Programmatic Advertising and Cyber Security, with additional specializations as the academy grows.",
    order: 3,
  },
  {
    id: "faq-4",
    category: "General",
    question: "Do I need prior experience?",
    answer: "Requirements vary by program. Beginner-friendly pathways are available, while advanced programs may require foundational knowledge.",
    order: 4,
  },
  {
    id: "faq-5",
    category: "General",
    question: "How do I choose the right program?",
    answer: "Choose based on your career goal, current skill level, interests and the role or specialization you want to pursue.",
    order: 5,
  },
  {
    id: "faq-6",
    category: "General",
    question: "Will I receive a certificate?",
    answer: "Certificate eligibility and requirements depend on the specific program and successful completion of required course milestones.",
    order: 6,
  },
  {
    id: "faq-7",
    category: "Digital Marketing",
    question: "What will I learn in Digital Marketing?",
    answer: "The program covers areas such as SEO, paid advertising, social media marketing, analytics, content, and performance marketing.",
    order: 7,
  },
  {
    id: "faq-8",
    category: "Digital Marketing",
    question: "Will I learn Google Ads and Meta Ads?",
    answer: "The curriculum can include paid search and paid social concepts, campaign planning, targeting, optimization, and measurement.",
    order: 8,
  },
  {
    id: "faq-9",
    category: "Digital Marketing",
    question: "Is SEO included?",
    answer: "Yes. SEO concepts are included as part of the digital marketing learning path.",
    order: 9,
  },
  {
    id: "faq-10",
    category: "Programmatic Advertising",
    question: "What is Programmatic Advertising?",
    answer: "Programmatic advertising refers to automated, data-driven buying and selling of digital ad inventory through platforms such as DSPs and SSPs.",
    order: 10,
  },
  {
    id: "faq-11",
    category: "Programmatic Advertising",
    question: "Which platforms or tools are introduced?",
    answer: "Depending on course level and module focus, concepts may reference DSP environments, campaign management workflows, audience targeting, and reporting tools.",
    order: 11,
  },
  {
    id: "faq-12",
    category: "Programmatic Advertising",
    question: "Is programmatic suitable for beginners?",
    answer: "Foundational digital marketing understanding helps, but introductory pathways are available for learners starting out.",
    order: 12,
  },
  {
    id: "faq-13",
    category: "Cyber Security",
    question: "What topics are covered in Cyber Security?",
    answer: "Topics can include networking fundamentals, security concepts, operating system security, vulnerability assessment, and defense principles.",
    order: 13,
  },
  {
    id: "faq-14",
    category: "Cyber Security",
    question: "Do I need programming knowledge for Cyber Security?",
    answer: "Not necessarily for entry-level foundations, though basic scripting and networking knowledge can be advantageous.",
    order: 14,
  },
  {
    id: "faq-15",
    category: "Cyber Security",
    question: "Is hands-on practice included?",
    answer: "Yes. Courses emphasize practical exercises, lab activities, or tool walkthroughs where applicable.",
    order: 15,
  },
  {
    id: "faq-16",
    category: "Enrollment & Support",
    question: "How do I enroll in a course?",
    answer: "You can apply through our website, request a callback, or reach out to our admissions team directly via phone or WhatsApp.",
    order: 16,
  },
  {
    id: "faq-17",
    category: "Enrollment & Support",
    question: "What class formats are available?",
    answer: "We offer interactive classroom sessions, live online training, and blended learning schedules to fit working professionals and students.",
    order: 17,
  },
  {
    id: "faq-18",
    category: "Enrollment & Support",
    question: "Do you offer weekend or evening batches?",
    answer: "Yes, flexible batch timings including weekday evenings and weekend batches are available for selected programs.",
    order: 18,
  },
  {
    id: "faq-19",
    category: "Enrollment & Support",
    question: "What happens if I miss a live class?",
    answer: "All live sessions are recorded and made available along with class notes, slides, and mentor assistance.",
    order: 19,
  },
];

async function seed() {
  console.log("Seeding all 8 courses to Firestore 'courses' collection...");
  for (const c of allCourses) {
    const docRef = doc(db, "courses", c.id);
    await setDoc(docRef, c, { merge: true });
    console.log(`  ✓ Seeded course: ${c.id} (${c.title})`);
  }

  console.log("\nSeeding all 19 FAQs to Firestore 'faqs' collection...");
  for (const f of allFaqs) {
    const docRef = doc(db, "faqs", f.id);
    await setDoc(docRef, f, { merge: true });
    console.log(`  ✓ Seeded FAQ: ${f.id} (${f.question.slice(0, 40)}...)`);
  }

  console.log("\nAll courses and FAQs successfully seeded into Firestore!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});

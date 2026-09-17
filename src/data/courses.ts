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

export type WhatYouLearnItem = {
  title: string;
  description: string;
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  primaryCta?: string;
  secondaryCta?: string;
  audienceText?: string;
  learningJourney?: string;
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
    heading?: string;
    description?: string;
    learn: string[];
    whatYouLearnDetailed?: WhatYouLearnItem[];
    audience: string[];
    audienceDescription?: string;
    outcomes: string[];
  };
  practicalLearning?: {
    heading: string;
    description: string;
    items?: string[];
  };
  careerSkills?: {
    heading: string;
    description: string;
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
  finalCta?: {
    heading: string;
    buttonText: string;
  };
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
    title: "Digital Marketing & Performance Marketing Program",
    heroEyebrow: "DIGITAL MARKETING & PERFORMANCE MARKETING PROGRAM",
    heroTitle: "Digital Marketing & Performance Marketing Program",
    heroDescription:
      "Learn how modern brands attract, engage and convert customers across search, social, paid media, analytics and performance marketing.",
    primaryCta: "Explore Digital Marketing",
    secondaryCta: "Talk to an Expert",
    audienceText: "Students, marketers, entrepreneurs and career switchers.",
    learningJourney: "Strategy → Campaigns → Optimization → Measurement",
    category: "Digital Marketing",
    description:
      "Learn how modern brands attract, engage and convert customers across search, social, paid media, analytics and performance marketing.",
    longDescription:
      "Learn how modern brands attract, engage and convert customers across search, social, paid media, analytics and performance marketing.",
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
      heading: "Learn Digital Marketing Through Practical Training",
      description:
        "Learn how modern brands attract, engage and convert customers across search, social, paid media, analytics and performance marketing.",
      learn: [
        "Plan a digital strategy across search, social and paid channels",
        "Run and optimise Google Ads and Meta Ads campaigns",
        "Build SEO visibility through on-page, technical and off-page work",
        "Measure performance with analytics and structured reporting",
      ],
      whatYouLearnDetailed: [
        {
          title: "Digital Marketing Fundamentals",
          description:
            "Build practical understanding and apply digital marketing fundamentals through structured learning and relevant exercises.",
        },
        {
          title: "Search Engine Optimization",
          description:
            "Build practical understanding and apply search engine optimization through structured learning and relevant exercises.",
        },
        {
          title: "Google Ads & Paid Search",
          description:
            "Build practical understanding and apply google ads & paid search through structured learning and relevant exercises.",
        },
        {
          title: "Meta Ads & Paid Social",
          description:
            "Build practical understanding and apply meta ads & paid social through structured learning and relevant exercises.",
        },
        {
          title: "Social Media Marketing",
          description:
            "Build practical understanding and apply social media marketing through structured learning and relevant exercises.",
        },
        {
          title: "Content Marketing",
          description:
            "Build practical understanding and apply content marketing through structured learning and relevant exercises.",
        },
        {
          title: "Google Analytics & Measurement",
          description:
            "Build practical understanding and apply google analytics & measurement through structured learning and relevant exercises.",
        },
        {
          title: "Conversion & Performance Optimization",
          description:
            "Build practical understanding and apply conversion & performance optimization through structured learning and relevant exercises.",
        },
      ],
      audience: [
        "Students and fresh graduates starting a marketing career",
        "Business owners handling their own marketing",
        "Working professionals moving into digital roles",
      ],
      audienceDescription:
        "Suitable for learners starting in the field, students building professional skills, working professionals strengthening their capabilities, and career switchers seeking a structured path into the discipline.",
      outcomes: [
        "Portfolio with a full campaign plan and performance report",
        "Practical command of industry marketing tools",
        "Confidence to own campaigns in a live role",
      ],
    },
    practicalLearning: {
      heading: "Learn by Applying What You Learn",
      description:
        "Apply concepts through practical exercises, guided assignments, realistic scenarios, projects, and performance-focused tasks.",
    },
    careerSkills: {
      heading: "Build Skills You Can Use in the Workplace",
      description:
        "Develop practical knowledge, tool familiarity, problem-solving ability, and professional confidence relevant to roles in this specialization.",
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
        title: "Meta Ads & Social Advertising",
        topics: [
          "Audience targeting",
          "Ad formats",
          "Creative strategy",
          "Retargeting",
          "A/B testing",
        ],
      },
      {
        module: "Module 06",
        title: "Analytics & Reporting",
        topics: ["Google Analytics 4", "Looker Studio", "KPI reporting", "Attribution basics"],
      },
    ],
    practicalTraining: marketingPractical,
    projects: [
      {
        title: "End-to-end digital marketing strategy",
        summary: "Build a complete multichannel strategy for an allocated brand brief.",
      },
      {
        title: "Live search campaign setup",
        summary: "Structure a live-style Google Ads campaign with ad copy and conversion tags.",
      },
      {
        title: "Technical SEO audit",
        summary: "Audit a live website, prioritise fixes and produce a client-ready report.",
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
        question: "Is this course suitable for beginners?",
        answer:
          "The learning path is structured to build foundational understanding before progressing into practical and advanced topics.",
      },
      {
        question: "Will I get practical experience?",
        answer:
          "The program incorporates practical exercises and application-based learning relevant to the course.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Choose the program, submit your enquiry, and speak with the Digitechademy team about the next available learning option.",
      },
    ],
    finalCta: {
      heading: "Start Building Your Skills Today",
      buttonText: "Enroll Now",
    },
  },
  {
    id: "dm-03",
    slug: "programmatic-advertising",
    title: "Programmatic Advertising Masterclass",
    heroEyebrow: "PROGRAMMATIC ADVERTISING MASTERCLASS",
    heroTitle: "Programmatic Advertising Masterclass",
    heroDescription:
      "Go beyond basic digital advertising and learn how programmatic campaigns are planned, launched, monitored and optimized across DV360, CM360, YouTube, audience targeting, bidding, measurement and reporting.",
    primaryCta: "Explore Programmatic Advertising",
    secondaryCta: "Talk to an Expert",
    audienceText: "Digital marketers, media planners, aspiring programmatic specialists and professionals moving into AdTech.",
    learningJourney: "Plan → Launch → Optimize → Measure",
    category: "Digital Marketing",
    description:
      "Go beyond basic digital advertising and learn how programmatic campaigns are planned, launched, monitored and optimized across DV360, CM360, YouTube, audience targeting, bidding, measurement and reporting.",
    longDescription:
      "Go beyond basic digital advertising and learn how programmatic campaigns are planned, launched, monitored and optimized across DV360, CM360, YouTube, audience targeting, bidding, measurement and reporting.",
    duration: "10 Weeks",
    level: "Beginner to Advanced",
    mode: "Classroom & Live Online",
    certificate: "Course completion certificate",
    image: advancedSeoImg,
    highlights: [
      "DV360 & CM360",
      "YouTube & Video Ads",
      "Audience Targeting",
      "Real-Time Bidding (RTB)",
      "Campaign Optimization",
      "Measurement & Reporting",
    ],
    overview: {
      heading: "Learn Programmatic Advertising Through Practical Training",
      description:
        "Go beyond basic digital advertising and learn how programmatic campaigns are planned, launched, monitored and optimized across DV360, CM360, YouTube, audience targeting, bidding, measurement and reporting.",
      learn: [
        "Navigate DSPs, SSPs, DV360 and CM360 to set up high-performing programmatic campaigns",
        "Plan, launch and manage audience-targeted YouTube and video inventory",
        "Execute real-time bidding (RTB) auctions and manage private marketplaces (PMP)",
        "Optimize bidding strategies, frequency caps, and measure multi-touch attribution",
      ],
      whatYouLearnDetailed: [
        {
          title: "Programmatic Advertising Fundamentals",
          description:
            "Build practical understanding and apply programmatic advertising fundamentals through structured learning and relevant exercises.",
        },
        {
          title: "DSPs, SSPs & Ad Exchanges",
          description:
            "Build practical understanding and apply dsps, ssps & ad exchanges through structured learning and relevant exercises.",
        },
        {
          title: "Real-Time Bidding & Auction Dynamics",
          description:
            "Build practical understanding and apply real-time bidding through structured learning and relevant exercises.",
        },
        {
          title: "Audience Targeting & Segmentation",
          description:
            "Build practical understanding and apply audience targeting & segmentation through structured learning and relevant exercises.",
        },
        {
          title: "Campaign Setup & Optimization",
          description:
            "Build practical understanding and apply campaign setup & optimization through structured learning and relevant exercises.",
        },
        {
          title: "DV360, CM360 & YouTube Platforms",
          description:
            "Build practical understanding and apply dv360, cm360 & youtube advertising through structured learning and relevant exercises.",
        },
        {
          title: "Measurement & Reporting",
          description:
            "Build practical understanding and apply measurement & reporting through structured learning and relevant exercises.",
        },
        {
          title: "Troubleshooting & Performance Analysis",
          description:
            "Build practical understanding and apply troubleshooting & performance analysis through structured learning and relevant exercises.",
        },
      ],
      audience: [
        "Digital marketers",
        "Media planners",
        "Aspiring programmatic specialists",
        "Professionals moving into AdTech",
      ],
      audienceDescription:
        "Digital marketers, media planners, aspiring programmatic specialists and professionals moving into AdTech.",
      outcomes: [
        "End-to-end programmatic media plan and budget allocation portfolio",
        "Practical familiarity with leading DSP platforms and audience managers",
        "Industry-standard campaign analysis and reporting capabilities",
      ],
    },
    practicalLearning: {
      heading: "Learn by Applying What You Learn",
      description:
        "Apply concepts through practical exercises, guided assignments, realistic scenarios, projects, and performance-focused tasks.",
    },
    careerSkills: {
      heading: "Build Skills You Can Use in the Workplace",
      description:
        "Develop practical knowledge, tool familiarity, problem-solving ability, and professional confidence relevant to roles in this specialization.",
    },
    syllabus: [
      {
        module: "Module 01",
        title: "AdTech & Programmatic Ecosystem",
        topics: ["History of media buying", "Advertiser vs Publisher stack", "DSPs, SSPs, and Ad Exchanges", "Data Management Platforms (DMP)"],
      },
      {
        module: "Module 02",
        title: "Real-Time Bidding (RTB) & Deals",
        topics: ["Open exchanges", "Private marketplaces (PMP)", "Programmatic guaranteed (PG)", "Floor pricing & bid shading"],
      },
      {
        module: "Module 03",
        title: "Audience Targeting & Data Strategies",
        topics: ["1st, 2nd, and 3rd party data", "Contextual targeting", "Lookalike modeling", "Privacy regulations & cookieless future"],
      },
      {
        module: "Module 04",
        title: "Campaign Setup & Creative Formats",
        topics: ["Display, video, native, and audio formats", "Dynamic creative optimization (DCO)", "Frequency capping", "Brand safety & fraud prevention"],
      },
      {
        module: "Module 05",
        title: "Optimization & Attribution",
        topics: ["Bid optimization", "Supply path optimization (SPO)", "Multi-touch attribution", "Incremental lift testing"],
      },
      {
        module: "Module 06",
        title: "Capstone Programmatic Project",
        topics: ["Media brief analysis", "Platform setup simulation", "Optimization reporting", "Final strategic review"],
      },
    ],
    practicalTraining: marketingPractical,
    projects: [
      {
        title: "Omnichannel programmatic plan",
        summary: "Design a comprehensive programmatic media campaign spanning display, connected TV, and audio.",
      },
      {
        title: "Audience segmentation strategy",
        summary: "Construct a targeting matrix combining first-party CRM data and contextual signals.",
      },
      {
        title: "Attribution and ROI analysis",
        summary: "Audit campaign logs to evaluate viewability, brand safety, and true ROAS.",
      },
    ],
    instructors: [instructors[0]!],
    pricing: {
      fee: "₹36,999",
      earlyFee: "₹31,999",
      note: "Early bird discount available for upcoming cohort.",
      includes: [
        "Full course access",
        "DSP simulator practice",
        "Assignments",
        "Mentor support",
        "Certificate",
        "AdTech frameworks & templates",
      ],
    },
    testimonials: [
      {
        name: "Siddharth",
        course: "Programmatic Advertising Course",
        rating: 5,
        quote: "Demystified DSPs and real-time bidding completely. The campaign simulations were invaluable.",
      },
      {
        name: "Rhea",
        course: "Programmatic Advertising Course",
        rating: 5,
        quote: "Moved from basic paid search into enterprise media buying thanks to this course.",
      },
    ],
    faqs: [
      {
        question: "Is this course suitable for beginners?",
        answer:
          "The learning path is structured to build foundational understanding before progressing into practical and advanced topics.",
      },
      {
        question: "Will I get practical experience?",
        answer:
          "The program incorporates practical exercises and application-based learning relevant to the course.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Choose the program, submit your enquiry, and speak with the Digitechademy team about the next available learning option.",
      },
    ],
    finalCta: {
      heading: "Start Building Your Skills Today",
      buttonText: "Enroll Now",
    },
  },
  {
    id: "cs-01",
    slug: "cyber-security",
    title: "Cyber Security Course",
    heroEyebrow: "CYBER SECURITY COURSE",
    heroTitle: "Build Practical Foundations in Cyber Security",
    heroDescription:
      "Develop a strong foundation in cyber security concepts, networking, threats, vulnerabilities, security operations, and defensive practices through structured learning and practical application.",
    primaryCta: "Enroll Now",
    secondaryCta: "Request a Call",
    category: "Cyber Security",
    description:
      "Learn practical cyber security foundations covering networking, security concepts, threat awareness, monitoring, and defensive practices.",
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
      heading: "Learn Cyber Security Through Practical Training",
      description:
        "Develop a strong foundation in cyber security concepts, networking, threats, vulnerabilities, security operations, and defensive practices through structured learning and practical application.",
      learn: [
        "Understand networks, protocols and Linux from a security perspective",
        "Identify and assess common vulnerabilities in web applications",
        "Use industry security tools in structured lab environments",
        "Document findings in professional assessment reports",
      ],
      whatYouLearnDetailed: [
        {
          title: "Cyber Security Fundamentals",
          description:
            "Build practical understanding and apply cyber security fundamentals through structured learning and relevant exercises.",
        },
        {
          title: "Networking & Security Concepts",
          description:
            "Build practical understanding and apply networking & security concepts through structured learning and relevant exercises.",
        },
        {
          title: "Threats, Vulnerabilities & Risk",
          description:
            "Build practical understanding and apply threats, vulnerabilities & risk through structured learning and relevant exercises.",
        },
        {
          title: "Security Monitoring",
          description:
            "Build practical understanding and apply security monitoring through structured learning and relevant exercises.",
        },
        {
          title: "Security Operations Fundamentals",
          description:
            "Build practical understanding and apply security operations fundamentals through structured learning and relevant exercises.",
        },
        {
          title: "Identity & Access Security",
          description:
            "Build practical understanding and apply identity & access security through structured learning and relevant exercises.",
        },
        {
          title: "Incident Response Fundamentals",
          description:
            "Build practical understanding and apply incident response fundamentals through structured learning and relevant exercises.",
        },
        {
          title: "Security Tools & Practical Exercises",
          description:
            "Build practical understanding and apply security tools & practical exercises through structured learning and relevant exercises.",
        },
      ],
      audience: [
        "Beginners aiming for a cyber security career",
        "IT and support professionals moving into security roles",
        "Students who prefer lab-based technical learning",
      ],
      audienceDescription:
        "Suitable for learners starting in the field, students building professional skills, working professionals strengthening their capabilities, and career switchers seeking a structured path into the discipline.",
      outcomes: [
        "Practical lab experience across security domains",
        "A written security assessment report for your portfolio",
        "Readiness for entry-level security analyst interviews",
      ],
    },
    practicalLearning: {
      heading: "Learn by Applying What You Learn",
      description:
        "Apply concepts through practical exercises, guided assignments, realistic scenarios, projects, and performance-focused tasks.",
    },
    careerSkills: {
      heading: "Build Skills You Can Use in the Workplace",
      description:
        "Develop practical knowledge, tool familiarity, problem-solving ability, and professional confidence relevant to roles in this specialization.",
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
        question: "Is this course suitable for beginners?",
        answer:
          "The learning path is structured to build foundational understanding before progressing into practical and advanced topics.",
      },
      {
        question: "Will I get practical experience?",
        answer:
          "The program incorporates practical exercises and application-based learning relevant to the course.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Choose the program, submit your enquiry, and speak with the Digitechademy team about the next available learning option.",
      },
    ],
    finalCta: {
      heading: "Start Building Your Skills Today",
      buttonText: "Enroll Now",
    },
  },
  {
    id: "dm-02",
    slug: "advanced-seo",
    title: "Advanced SEO & Performance Marketing",
    heroEyebrow: "ADVANCED SEO & PERFORMANCE MARKETING",
    heroTitle: "Turn Search and Paid Media Into Measurable Growth",
    heroDescription:
      "Develop advanced skills in SEO and performance marketing by learning how to build search strategies, manage paid campaigns, improve conversions, analyse performance, and connect marketing activity with measurable outcomes.",
    primaryCta: "Enroll Now",
    secondaryCta: "Request a Call",
    category: "Digital Marketing",
    description:
      "Develop advanced skills in search engine optimization, paid media, conversion strategy, measurement, and performance improvement.",
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
      heading: "Learn Advanced SEO & Performance Marketing Through Practical Training",
      description:
        "Develop advanced skills in SEO and performance marketing by learning how to build search strategies, manage paid campaigns, improve conversions, analyse performance, and connect marketing activity with measurable outcomes.",
      learn: [
        "Audit and fix technical SEO issues at scale",
        "Build topical authority with content and internal linking",
        "Improve paid campaign efficiency and quality",
        "Design conversion experiments and report on impact",
      ],
      whatYouLearnDetailed: [
        {
          title: "Advanced SEO Strategy",
          description:
            "Build practical understanding and apply advanced seo strategy through structured learning and relevant exercises.",
        },
        {
          title: "Keyword Research & Search Intent",
          description:
            "Build practical understanding and apply keyword research & search intent through structured learning and relevant exercises.",
        },
        {
          title: "Technical SEO Fundamentals",
          description:
            "Build practical understanding and apply technical seo fundamentals through structured learning and relevant exercises.",
        },
        {
          title: "Google Ads Strategy",
          description:
            "Build practical understanding and apply google ads strategy through structured learning and relevant exercises.",
        },
        {
          title: "Paid Social Campaigns",
          description:
            "Build practical understanding and apply paid social campaigns through structured learning and relevant exercises.",
        },
        {
          title: "Conversion Rate Optimization",
          description:
            "Build practical understanding and apply conversion rate optimization through structured learning and relevant exercises.",
        },
        {
          title: "Analytics & Attribution",
          description:
            "Build practical understanding and apply analytics & attribution through structured learning and relevant exercises.",
        },
        {
          title: "Performance Reporting & Optimization",
          description:
            "Build practical understanding and apply performance reporting & optimization through structured learning and relevant exercises.",
        },
      ],
      audience: [
        "Marketers with basic digital experience",
        "Freelancers handling client SEO and ads",
        "Business owners scaling organic and paid channels",
      ],
      audienceDescription:
        "Suitable for learners starting in the field, students building professional skills, working professionals strengthening their capabilities, and career switchers seeking a structured path into the discipline.",
      outcomes: [
        "A complete technical SEO audit deliverable",
        "Paid account optimisation playbook",
        "Reporting dashboard structure you can reuse",
      ],
    },
    practicalLearning: {
      heading: "Learn by Applying What You Learn",
      description:
        "Apply concepts through practical exercises, guided assignments, realistic scenarios, projects, and performance-focused tasks.",
    },
    careerSkills: {
      heading: "Build Skills You Can Use in the Workplace",
      description:
        "Develop practical knowledge, tool familiarity, problem-solving ability, and professional confidence relevant to roles in this specialization.",
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
        question: "Is this course suitable for beginners?",
        answer:
          "The learning path is structured to build foundational understanding before progressing into practical and advanced topics.",
      },
      {
        question: "Will I get practical experience?",
        answer:
          "The program incorporates practical exercises and application-based learning relevant to the course.",
      },
      {
        question: "How do I enroll?",
        answer:
          "Choose the program, submit your enquiry, and speak with the Digitechademy team about the next available learning option.",
      },
    ],
    finalCta: {
      heading: "Start Building Your Skills Today",
      buttonText: "Enroll Now",
    },
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

export const stats = [
  { value: 3, suffix: "k+", label: "Learners Trained" },
  { value: 10, suffix: "", label: "Dedicated Mentors" },
  { value: 25, suffix: "+", label: "Practical Projects" },
  { value: 100, suffix: "%", label: "Placement Assistance" },
];

export const whyChooseUs = [
  {
    icon: "BookOpen",
    title: "Learn by Doing",
    text: "Move beyond theory with practical exercises, assignments, projects, and scenario-based learning.",
  },
  {
    icon: "Building2",
    title: "Industry-Aligned Curriculum",
    text: "Learn concepts and workflows that reflect how digital marketing and technology teams operate in the real world.",
  },
  {
    icon: "Users",
    title: "Guided by Experience",
    text: "Understand not only what a tool does, but how professionals use it to solve business problems.",
  },
  {
    icon: "TrendingUp",
    title: "Career-Focused Learning",
    text: "Develop practical skills that can strengthen your portfolio, interview readiness, and professional confidence.",
  },
];

export const methodology = [
  { step: "01", title: "Learn", text: "Understand the principles, terminology, frameworks, and tools behind each subject." },
  { step: "02", title: "Practice", text: "Reinforce concepts through guided exercises and practical activities." },
  { step: "03", title: "Build", text: "Apply your learning to projects, campaigns, case studies, and realistic scenarios." },
  { step: "04", title: "Review", text: "Identify gaps, improve your work, and learn how professionals evaluate results." },
  { step: "05", title: "Progress", text: "Build a stronger portfolio of skills and move forward with greater career confidence." },
];

export const practicalTraining = [
  {
    icon: "Rocket",
    title: "Real Projects",
    text: "Apply knowledge to realistic briefs and scenarios.",
    shortText: "Realistic briefs & scenarios.",
  },
  {
    icon: "Activity",
    title: "Hands-On Practice",
    text: "Practice concepts instead of simply watching lessons.",
    shortText: "Active practical application.",
  },
  {
    icon: "FileSearch",
    title: "Industry Case Studies",
    text: "Understand how real campaigns, business challenges and security scenarios are approached.",
    shortText: "Campaigns & security challenges.",
  },
  {
    icon: "Wrench",
    title: "Tool-Based Learning",
    text: "Become familiar with tools and workflows used in industry.",
    shortText: "Industry tools & workflows.",
  },
  {
    icon: "MessageSquareCheck",
    title: "Expert Feedback",
    text: "Understand what you did right, what went wrong and how to improve.",
    shortText: "Constructive expert reviews.",
  },
];

export const whoIsForAudience = [
  {
    icon: "GraduationCap",
    badge: "Career Foundation",
    title: "Students",
    desc: "Build practical skills before entering the job market.",
    highlight: "Practical skills for market entry",
  },
  {
    icon: "TrendingUp",
    badge: "Domain Transition",
    title: "Career Switchers",
    desc: "Move into Digital Marketing or Cyber Security with a structured learning path.",
    highlight: "Guided transition roadmap",
  },
  {
    icon: "Briefcase",
    badge: "Skill Upgrade",
    title: "Working Professionals",
    desc: "Upgrade skills and stay relevant.",
    highlight: "Advanced industry competencies",
  },
  {
    icon: "Rocket",
    badge: "Business Growth",
    title: "Entrepreneurs",
    desc: "Understand technologies and digital strategies behind modern businesses.",
    highlight: "Tech & digital growth strategies",
  },
  {
    icon: "Target",
    badge: "AdTech Specialization",
    title: "Digital Marketers",
    desc: "Move beyond basic marketing into performance, AdTech and programmatic advertising.",
    highlight: "DSP, RTB & programmatic mastery",
  },
  {
    icon: "ShieldCheck",
    badge: "Infosec Pathway",
    title: "Aspiring Cyber Security Professionals",
    desc: "Build foundations needed to start.",
    highlight: "Security & ethical hacking foundations",
  },
];

export const careerReadinessPillars = [
  {
    icon: "BookOpen",
    title: "Industry Concepts",
    text: "Understand core terminology, architecture, and professional workflows.",
  },
  {
    icon: "Activity",
    title: "Practical Skills",
    text: "Hands-on execution drills that replace passive watching.",
  },
  {
    icon: "FileSearch",
    title: "Realistic Scenarios",
    text: "Work through challenges modeled after live business and threat landscapes.",
  },
  {
    icon: "FolderOpen",
    title: "Project Experience",
    text: "Build portfolio-ready deliverables that demonstrate proven capability.",
  },
  {
    icon: "Target",
    title: "Role-Based Interviews",
    text: "Rigorous technical and scenario mock interviews with senior mentors.",
  },
  {
    icon: "Mic",
    title: "Communicate with Confidence",
    text: "Articulate and defend your technical and strategic decisions fluently.",
  },
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
    question: "Who can join Digitechademy?",
    answer:
      "Our programs are designed for beginners, students, working professionals and career switchers depending on the course and any stated prerequisites.",
  },
  {
    question: "Are the courses practical?",
    answer:
      "Yes. Programs combine concepts with exercises, projects, case studies and tool-based activities where applicable.",
  },
  {
    question: "Which programs does Digitechademy offer?",
    answer:
      "Our core focus is Digital Marketing, Programmatic Advertising and Cyber Security, with additional specializations as the academy grows.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "Requirements vary by program. Beginner-friendly pathways are available, while advanced programs may require foundational knowledge.",
  },
  {
    question: "How do I choose the right program?",
    answer:
      "Choose based on your career goal, current skill level, interests and the role or specialization you want to pursue.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Certificate eligibility and requirements depend on the specific program and successful completion of required course milestones.",
  },
];

export const faqCategories = [
  {
    title: "General",
    items: [
      {
        question: "Who can join Digitechademy?",
        answer:
          "Our programs are designed for beginners, students, working professionals and career switchers depending on the course and any stated prerequisites.",
      },
      {
        question: "Are the courses practical?",
        answer:
          "Yes. Programs combine concepts with exercises, projects, case studies and tool-based activities where applicable.",
      },
      {
        question: "Which programs does Digitechademy offer?",
        answer:
          "Our core focus is Digital Marketing, Programmatic Advertising and Cyber Security, with additional specializations as the academy grows.",
      },
      {
        question: "Do I need prior experience?",
        answer:
          "Requirements vary by program. Beginner-friendly pathways are available, while advanced programs may require foundational knowledge.",
      },
      {
        question: "How do I choose the right program?",
        answer:
          "Choose based on your career goal, current skill level, interests and the role or specialization you want to pursue.",
      },
      {
        question: "Will I receive a certificate?",
        answer:
          "Certificate eligibility and requirements depend on the specific program and successful completion of required course milestones.",
      },
    ],
  },
  {
    title: "Digital Marketing",
    items: [
      {
        question: "What will I learn in Digital Marketing?",
        answer:
          "The program covers areas such as SEO, paid advertising, social media marketing, analytics, content, and performance marketing.",
      },
      {
        question: "Will I learn Google Ads and Meta Ads?",
        answer:
          "The curriculum can include paid search and paid social concepts, campaign planning, targeting, optimization, and measurement.",
      },
      {
        question: "Is SEO included?",
        answer: "Yes. SEO concepts are included as part of the digital marketing learning path.",
      },
    ],
  },
  {
    title: "Programmatic Advertising",
    items: [
      {
        question: "What is Programmatic Advertising training?",
        answer:
          "It is practical training focused on automated digital media buying, DSPs, SSPs, RTB, audience targeting, campaign management, optimization, and measurement.",
      },
      {
        question: "Is DV360 covered?",
        answer:
          "DV360 concepts and workflows can be included in the program based on the selected curriculum.",
      },
      {
        question: "Can beginners learn programmatic advertising?",
        answer:
          "Yes. The learning path can start with programmatic fundamentals before moving into platforms, campaign workflows, optimization, and reporting.",
      },
    ],
  },
  {
    title: "Cyber Security",
    items: [
      {
        question: "What will I learn in Cyber Security?",
        answer:
          "The program covers cyber security fundamentals, networking, threats, vulnerabilities, security operations, monitoring, and defensive security concepts.",
      },
      {
        question: "Is prior networking knowledge required?",
        answer:
          "Foundational networking concepts are introduced as part of the learning path, while advanced topics may require additional background knowledge.",
      },
      {
        question: "Is ethical security covered?",
        answer:
          "Relevant ethical security concepts and practical exercises can be included according to the selected program curriculum.",
      },
    ],
  },
  {
    title: "Enrollment & Support",
    items: [
      {
        question: "How do I enroll?",
        answer:
          "Choose your preferred course and submit an enquiry. The DIGITECHADEMY team will guide you through the next steps.",
      },
      {
        question: "Can I speak with someone before enrolling?",
        answer:
          "Yes. You can request a call to discuss the course, learning path, prerequisites, and enrollment process.",
      },
      {
        question: "Do courses include certificates?",
        answer:
          "Certificate availability depends on the selected program and its completion requirements.",
      },
      {
        question: "Is career support available?",
        answer:
          "Career-focused guidance may be provided according to the program and support package selected.",
      },
    ],
  },
];

export const courseOptions = [
  "Digital Marketing",
  "Programmatic Advertising",
  "Cyber Security",
  "Advanced SEO & Performance Marketing",
  "Not sure yet",
];

export const callTimeOptions = [
  "Morning",
  "Afternoon",
  "Evening",
  "Anytime",
];

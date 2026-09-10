export const stats = [
  { value: 500, suffix: "+", label: "Students Trained" },
  { value: 20, suffix: "+", label: "Practical Projects" },
  { value: 95, suffix: "%", label: "Learning Satisfaction" },
  { value: 2, suffix: "", label: "Industry-Focused Domains" },
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
    title: "Hands-On Projects",
    text: "Apply concepts to structured projects that demonstrate practical understanding.",
    shortText: "Real portfolio capstones & builds.",
  },
  {
    icon: "ClipboardList",
    title: "Practical Assignments",
    text: "Strengthen your skills through exercises designed around real digital tasks.",
    shortText: "Workplace task simulations.",
  },
  {
    icon: "FileSearch",
    title: "Case Studies",
    text: "Analyse business situations and understand how digital strategies are planned, executed, and measured.",
    shortText: "Live briefs & campaign audits.",
  },
  {
    icon: "Wrench",
    title: "Tool-Based Learning",
    text: "Get familiar with relevant platforms and workflows used across digital marketing and technology.",
    shortText: "Industry platforms & toolsets.",
  },
  {
    icon: "MessageSquareCheck",
    title: "Mentor Feedback",
    text: "Use guided reviews to identify improvements and develop better practical outcomes.",
    shortText: "1-on-1 expert code critiques.",
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
      "Our programs are designed for beginners, students, working professionals, and career switchers, depending on the course and its prerequisites.",
  },
  {
    question: "Are the courses practical?",
    answer:
      "Yes. Our learning approach combines concepts with practical exercises, projects, case studies, and tool-based activities where applicable.",
  },
  {
    question: "Which courses can I choose from?",
    answer:
      "Our programs cover Digital Marketing, Programmatic Advertising, Cyber Security, SEO, and Performance Marketing.",
  },
  {
    question: "Do I need prior experience?",
    answer:
      "Prerequisites vary by program. Beginner-friendly pathways are available, while advanced programs may require foundational knowledge.",
  },
  {
    question: "How do I choose the right course?",
    answer:
      "Choose based on your career goal, current skill level, interests, and the type of role or specialization you want to pursue.",
  },
];

export const faqCategories = [
  {
    title: "General",
    items: [
      {
        question: "What is Digitechademy?",
        answer:
          "Digitechademy is a career-focused training platform offering practical learning programs across digital marketing, programmatic advertising, cyber security, SEO, and performance marketing.",
      },
      {
        question: "Who can join the courses?",
        answer:
          "Programs are suitable for beginners, students, working professionals, and career switchers depending on the course requirements.",
      },
      {
        question: "Are the courses practical?",
        answer:
          "Yes. Practical exercises, projects, case studies, and tool-based activities are incorporated where applicable.",
      },
      {
        question: "Do I need prior experience?",
        answer:
          "Prerequisites vary by program. Beginner-friendly pathways are available for learners starting from the fundamentals.",
      },
      {
        question: "How can I choose the right course?",
        answer:
          "Start with your career goal, current skills, interests, and preferred specialization. Our team can also help you identify a suitable learning path.",
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
          "Choose your preferred course and submit an enquiry. The Digitechademy team will guide you through the next steps.",
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

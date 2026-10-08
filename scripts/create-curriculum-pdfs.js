import fs from "fs";
import path from "path";

function escapePdf(str) {
  return str.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function createSimplePdf({
  title,
  subtitle,
  duration,
  category,
  description,
  modules,
  projects,
  tools,
}) {
  const lines = [];

  // Header band
  lines.push("0.05 0.1 0.25 rg"); // Navy blue rect
  lines.push("0 720 612 72 re f");

  lines.push("BT");
  lines.push("/F1 18 Tf");
  lines.push("1 1 1 rg"); // White
  lines.push("40 755 Td");
  lines.push(`(${escapePdf("DIGITECHADEMY  -  LEARN • GROW • ACHIEVE")}) Tj`);
  lines.push("ET");

  lines.push("BT");
  lines.push("/F2 10 Tf");
  lines.push("0.9 0.9 0.9 rg");
  lines.push("40 735 Td");
  lines.push(`(${escapePdf("Official Course Curriculum & Syllabus Specification")}) Tj`);
  lines.push("ET");

  // Course Title
  lines.push("BT");
  lines.push("/F1 20 Tf");
  lines.push("0.08 0.12 0.28 rg");
  lines.push("40 680 Td");
  lines.push(`(${escapePdf(title)}) Tj`);
  lines.push("ET");

  // Category & Duration
  lines.push("BT");
  lines.push("/F1 11 Tf");
  lines.push("0.3 0.35 0.9 rg");
  lines.push("40 655 Td");
  lines.push(
    `(${escapePdf(`Track: ${category}   |   Duration: ${duration}   |   Mode: Live Online & Labs`)}) Tj`,
  );
  lines.push("ET");

  // Divider line
  lines.push("0.8 0.85 0.9 RG");
  lines.push("1 w");
  lines.push("40 642 m 572 642 l S");

  // Overview Header
  lines.push("BT");
  lines.push("/F1 12 Tf");
  lines.push("0.1 0.15 0.3 rg");
  lines.push("40 620 Td");
  lines.push(`(${escapePdf("1. PROGRAM OVERVIEW")}) Tj`);
  lines.push("ET");

  // Overview Description
  lines.push("BT");
  lines.push("/F2 9.5 Tf");
  lines.push("0.25 0.25 0.25 rg");
  lines.push("40 600 Td");
  const shortDesc = description.length > 220 ? description.substring(0, 220) + "..." : description;
  lines.push(`(${escapePdf(shortDesc)}) Tj`);
  lines.push("ET");

  // Tools Row
  if (tools && tools.length > 0) {
    lines.push("BT");
    lines.push("/F1 10 Tf");
    lines.push("0.05 0.1 0.25 rg");
    lines.push("40 575 Td");
    lines.push(`(${escapePdf("Industry Tools Covered: " + tools.join(", "))}) Tj`);
    lines.push("ET");
  }

  // Syllabus Header
  lines.push("BT");
  lines.push("/F1 12 Tf");
  lines.push("0.1 0.15 0.3 rg");
  lines.push("40 545 Td");
  lines.push(`(${escapePdf("2. MODULAR SYLLABUS BREAKDOWN")}) Tj`);
  lines.push("ET");

  let y = 525;
  if (modules && modules.length > 0) {
    modules.slice(0, 6).forEach((mod) => {
      lines.push("BT");
      lines.push("/F1 10 Tf");
      lines.push("0.2 0.2 0.7 rg");
      lines.push(`40 ${y} Td`);
      lines.push(`(${escapePdf(`* [${mod.module}] ${mod.title}`)}) Tj`);
      lines.push("ET");
      y -= 16;

      if (mod.topics && mod.topics.length > 0) {
        lines.push("BT");
        lines.push("/F2 8.5 Tf");
        lines.push("0.35 0.35 0.35 rg");
        lines.push(`55 ${y} Td`);
        const topicLine = mod.topics.slice(0, 4).join("  |  ");
        lines.push(`(${escapePdf("Topics: " + topicLine)}) Tj`);
        lines.push("ET");
        y -= 20;
      }
    });
  }

  // Projects Header
  y = Math.min(y, 250);
  lines.push("BT");
  lines.push("/F1 12 Tf");
  lines.push("0.1 0.15 0.3 rg");
  lines.push(`40 ${y} Td`);
  lines.push(`(${escapePdf("3. PRACTICAL CAPSTONE PROJECTS")}) Tj`);
  lines.push("ET");
  y -= 20;

  if (projects && projects.length > 0) {
    projects.slice(0, 3).forEach((p) => {
      lines.push("BT");
      lines.push("/F1 9 Tf");
      lines.push("0.1 0.1 0.1 rg");
      lines.push(`40 ${y} Td`);
      lines.push(`(${escapePdf("- " + p.title + ": " + p.summary)}) Tj`);
      lines.push("ET");
      y -= 16;
    });
  } else {
    lines.push("BT");
    lines.push("/F2 9 Tf");
    lines.push("0.3 0.3 0.3 rg");
    lines.push(`40 ${y} Td`);
    lines.push(
      `(${escapePdf("- Hands-on Virtual Cloud Labs with Real-Time Industry Case Studies")}) Tj`,
    );
    lines.push("ET");
    y -= 16;
  }

  // Certification note
  y = Math.min(y, 140);
  lines.push("0.94 0.96 1 rg"); // Light lavender rect
  lines.push(`40 ${y - 45} 532 50 re f`);
  lines.push("0.7 0.75 0.9 RG");
  lines.push(`40 ${y - 45} 532 50 re s`);

  lines.push("BT");
  lines.push("/F1 9.5 Tf");
  lines.push("0.1 0.2 0.6 rg");
  lines.push(`52 ${y - 15} Td`);
  lines.push(
    `(${escapePdf("Certification: Official Authorized Digitechademy Completion Credential Included")}) Tj`,
  );
  lines.push("ET");

  lines.push("BT");
  lines.push("/F2 8.5 Tf");
  lines.push("0.3 0.3 0.3 rg");
  lines.push(`52 ${y - 32} Td`);
  lines.push(
    `(${escapePdf("Admissions Hotline: +1 (770) 777-1269   |   Email: admissions@digitechademy.com   |   WhatsApp Assistance Available")}) Tj`,
  );
  lines.push("ET");

  // Footer band
  lines.push("0.05 0.1 0.25 rg");
  lines.push("0 0 612 28 re f");
  lines.push("BT");
  lines.push("/F2 8 Tf");
  lines.push("1 1 1 rg");
  lines.push("40 10 Td");
  lines.push(
    `(${escapePdf("Digitechademy (c) 2026. All rights reserved. Job-Oriented Online Tech & Marketing Academy.")}) Tj`,
  );
  lines.push("ET");

  const streamContent = lines.join("\n");
  const streamLength = Buffer.byteLength(streamContent);

  const objects = [];
  objects.push("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  objects.push("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  objects.push(
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>\nendobj\n",
  );
  objects.push(
    `4 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`,
  );
  objects.push("5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n");
  objects.push("6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n");

  let offset = 9; // "%PDF-1.4\n" length
  const offsets = [];
  let body = "%PDF-1.4\n";

  for (const obj of objects) {
    offsets.push(offset);
    body += obj;
    offset += Buffer.byteLength(obj);
  }

  const xrefOffset = offset;
  let xref = "xref\n0 7\n0000000000 65535 f \n";
  for (const off of offsets) {
    xref += String(off).padStart(10, "0") + " 00000 n \n";
  }

  const trailer = `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  return body + xref + trailer;
}

const outDir = path.resolve("public/curriculum");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Course data
const courseList = [
  {
    slug: "cyber-security",
    title: "Cyber Security Training Online - Curriculum",
    category: "Cyber Security",
    duration: "16 Weeks (65h Live Labs)",
    description:
      "Develop practical cyber security foundations covering networking, security operations, vulnerability assessment, threat awareness, monitoring, and hands-on defensive tools.",
    tools: [
      "Wireshark",
      "Nmap",
      "Snort",
      "Splunk",
      "Metasploit",
      "Kali Linux",
      "Burp Suite",
      "Mitre ATT&CK",
    ],
    modules: [
      {
        module: "Module 01",
        title: "Networking Fundamentals & Protocol Analysis",
        topics: ["OSI & TCP/IP", "Packet Analysis", "Wireshark Labs"],
      },
      {
        module: "Module 02",
        title: "Linux for Security Practitioners",
        topics: ["CLI Proficiency", "User Permissions", "Bash Scripting"],
      },
      {
        module: "Module 03",
        title: "Vulnerability Assessment & Web Security",
        topics: ["OWASP Top 10", "Burp Suite Setup", "Reconnaissance"],
      },
      {
        module: "Module 04",
        title: "Security Operations & SIEM Monitoring",
        topics: ["Splunk Setup", "Log Correlation", "Alert Triage"],
      },
      {
        module: "Module 05",
        title: "Defensive Security & Incident Response",
        topics: ["Incident Lifecycle", "Containment Strategies", "Post-Mortem"],
      },
    ],
    projects: [
      {
        title: "Enterprise Network Assessment",
        summary: "Full network vulnerability discovery and remediation report.",
      },
      {
        title: "SIEM Threat Detection Lab",
        summary: "Configured Splunk rules to detect brute-force and privilege escalation.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing Course - Curriculum",
    category: "Digital Marketing",
    duration: "12 Weeks (60h Live Sessions)",
    description:
      "Develop practical skills across SEO, paid advertising (Google & Meta Ads), social media marketing, content marketing, GA4 measurement, and conversion optimization.",
    tools: ["Google Ads", "Meta Ads", "Semrush", "GA4", "HubSpot", "Canva", "Ahrefs", "Mailchimp"],
    modules: [
      {
        module: "Module 01",
        title: "Digital Marketing Foundations & Strategy",
        topics: ["Marketing Funnel", "Buyer Personas", "Channel Mix"],
      },
      {
        module: "Module 02",
        title: "Search Engine Optimization (SEO)",
        topics: ["Keyword Research", "On-Page SEO", "Technical Auditing"],
      },
      {
        module: "Module 03",
        title: "Google Ads & Paid Search Advertising",
        topics: ["Search Campaigns", "Ad Rank & Bidding", "Negative Keywords"],
      },
      {
        module: "Module 04",
        title: "Meta Ads & Paid Social Media",
        topics: ["Audience Targeting", "Pixel Tracking", "Creative Testing"],
      },
      {
        module: "Module 05",
        title: "GA4 Analytics & Attribution Reporting",
        topics: ["Event Tracking", "Conversion Modeling", "Executive Dashboards"],
      },
    ],
    projects: [
      {
        title: "Omnichannel Acquisition Campaign",
        summary: "Designed and executed full funnel paid search and social campaign.",
      },
      {
        title: "Technical SEO Audit & Strategy",
        summary: "Complete live website audit with keyword roadmap and content strategy.",
      },
    ],
  },
  {
    slug: "programmatic-advertising",
    title: "Programmatic Advertising - Curriculum",
    category: "Digital Marketing",
    duration: "10 Weeks (50h Live Sessions)",
    description:
      "Develop high-demand skills in programmatic media buying, DSPs (DV360, The Trade Desk), SSPs, Real-Time Bidding, audience data management, and attribution models.",
    tools: [
      "DV360",
      "The Trade Desk",
      "Google Ad Manager",
      "Xandr",
      "MediaMath",
      "Amazon DSP",
      "AppsFlyer",
    ],
    modules: [
      {
        module: "Module 01",
        title: "AdTech & Programmatic Ecosystem",
        topics: ["DSPs & SSPs", "Ad Exchanges", "RTB Auctions"],
      },
      {
        module: "Module 02",
        title: "Audience Data & Targeting",
        topics: ["1st, 2nd, 3rd Party Data", "DMPs & CDPs", "Contextual Targeting"],
      },
      {
        module: "Module 03",
        title: "DV360 Campaign Setup & Management",
        topics: ["Insertion Orders", "Line Items", "Inventory Deals (PMP)"],
      },
      {
        module: "Module 04",
        title: "Measurement, Attribution & Verification",
        topics: ["Brand Safety", "Viewability", "Multi-Touch Attribution"],
      },
    ],
    projects: [
      {
        title: "Cross-Channel Programmatic Media Plan",
        summary: "Built full DSP media allocation with custom audience segments.",
      },
    ],
  },
  {
    slug: "ethical-hacking",
    title: "Ethical Hacking & Security Fundamentals - Curriculum",
    category: "Cyber Security",
    duration: "12 Weeks (55h Live Labs)",
    description:
      "Hands-on introduction to offensive security: network reconnaissance, Linux command line, vulnerability scanning, web application testing, and ethical reporting.",
    tools: [
      "Kali Linux",
      "Wireshark",
      "Nmap",
      "Burp Suite",
      "Metasploit",
      "OWASP ZAP",
      "Hydra",
      "John the Ripper",
    ],
    modules: [
      {
        module: "Module 01",
        title: "Ethical Hacking Foundations & Law",
        topics: ["Scope of Engagement", "Methodologies", "Reconnaissance"],
      },
      {
        module: "Module 02",
        title: "Network Scanning & Enumeration",
        topics: ["Nmap Techniques", "Port Scanning", "Service Fingerprinting"],
      },
      {
        module: "Module 03",
        title: "Vulnerability Assessment",
        topics: ["Vulnerability Scanners", "CVE Analysis", "Exploit Verification"],
      },
      {
        module: "Module 04",
        title: "Web App Penetration Testing",
        topics: ["SQL Injection", "XSS", "Authentication Bypass"],
      },
    ],
    projects: [
      {
        title: "Controlled Lab Penetration Test",
        summary: "Executed authorized assessment and compiled executive remediation report.",
      },
    ],
  },
  {
    slug: "all-courses-prospectus",
    title: "Digitechademy - All Programs Prospectus & Course Guide",
    category: "All Programs",
    duration: "10-16 Weeks",
    description:
      "Complete overview of all Digitechademy job-oriented career tracks including Cyber Security, Digital Marketing, Ethical Hacking, and Programmatic Advertising with placement support.",
    tools: ["Wireshark", "Google Ads", "Splunk", "Meta Ads", "Kali Linux", "DV360"],
    modules: [
      {
        module: "Track 01",
        title: "Cyber Security Professional (16 Weeks)",
        topics: ["Networking", "Linux", "SIEM", "Defensive Operations"],
      },
      {
        module: "Track 02",
        title: "Digital Marketing Mastery (12 Weeks)",
        topics: ["SEO", "Google Ads", "Meta Ads", "GA4 Analytics"],
      },
      {
        module: "Track 03",
        title: "Ethical Hacking & Security (12 Weeks)",
        topics: ["Recon", "Scanning", "Web App Testing", "Reporting"],
      },
      {
        module: "Track 04",
        title: "Programmatic Advertising (10 Weeks)",
        topics: ["DSPs", "SSPs", "DV360", "Attribution"],
      },
    ],
    projects: [
      {
        title: "Comprehensive Placement & Internship Support",
        summary: "Resume review, mock interviews, and direct hiring partner referrals.",
      },
    ],
  },
];

for (const c of courseList) {
  const pdfContent = createSimplePdf(c);
  const filePath = path.join(outDir, `${c.slug}-curriculum.pdf`);
  fs.writeFileSync(filePath, pdfContent, "binary");
  console.log(`Generated: ${filePath} (${fs.statSync(filePath).size} bytes)`);
}

// Also generate fallback general file
fs.copyFileSync(
  path.join(outDir, "all-courses-prospectus-curriculum.pdf"),
  path.join(outDir, "all-courses-prospectus.pdf"),
);
console.log("All curriculum PDF files created successfully!");

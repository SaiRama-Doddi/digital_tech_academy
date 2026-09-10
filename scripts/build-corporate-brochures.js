import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";

const outDir = path.resolve("public/curriculum");
const tempDir = path.resolve("scratch/brochure-temp");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

const edgeUserData = path.join(tempDir, "edge-profile");
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

// Rich courses data for curriculum brochures
const coursesData = [
  {
    slug: "cyber-security",
    title: "Cyber Security Training Online",
    subtitle: "Job-Oriented Certification & Hands-on Lab Program",
    category: "Cyber Security",
    duration: "16 Weeks (65h Live Interactive Labs)",
    mode: "Live Online & 24/7 Virtual Cloud Labs",
    level: "Beginner to Advanced",
    summary:
      "Our online Cyber security training and placement program is fully job-oriented and includes real-time project work for hands-on learning. The Cyber Security Training Online Certification Course is developed by certified experts to deliver industry-ready skills covering networking, Linux, vulnerability assessment, SIEM operations, and defensive security.",
    tools: ["Wireshark", "Nmap", "Snort", "Splunk", "Metasploit", "Kali Linux", "Burp Suite", "Mitre ATT&CK", "OWASP ZAP"],
    audience: [
      "Beginners and fresh graduates aspiring for a Cyber Security Analyst role",
      "IT Support and System Administrators transitioning into Information Security",
      "Students preparing for Security+, CEH, and SOC Analyst technical interviews",
    ],
    modules: [
      {
        num: "Module 01",
        title: "Networking Fundamentals & Protocol Analysis",
        duration: "3 Weeks",
        topics: [
          "OSI Model & TCP/IP stack deep dive",
          "IP addressing, Subnetting, Routing and Switching",
          "TCP three-way handshake, UDP, DNS, DHCP, HTTP/S protocols",
          "Packet capture and packet analysis using Wireshark",
        ],
        labs: "Live Wireshark packet capture lab; network traffic triage and protocol decoding.",
      },
      {
        num: "Module 02",
        title: "Linux Command Line for Security Practitioners",
        duration: "2 Weeks",
        topics: [
          "Linux directory structure, permissions, and user management",
          "Bash scripting, automation, grep, awk, and sed utilities",
          "Process management, cron jobs, network interfaces in Linux",
          "System logging (/var/log), firewall management (iptables, ufw)",
        ],
        labs: "Hardening Linux servers and automated bash reconnaissance scripts.",
      },
      {
        num: "Module 03",
        title: "Cyber Threat Landscape & Vulnerability Assessment",
        duration: "3 Weeks",
        topics: [
          "Threat vectors: Malware, Ransomware, Phishing, Social Engineering",
          "Vulnerability identification and Common Vulnerabilities and Exposures (CVE)",
          "Network discovery and port scanning using Nmap and Zenmap",
          "Automated vulnerability scanning and security posture auditing",
        ],
        labs: "Complete corporate network scan and vulnerability discovery report.",
      },
      {
        num: "Module 04",
        title: "Web Application Security & OWASP Top 10",
        duration: "3 Weeks",
        topics: [
          "Web architecture: client-server, cookies, sessions, and APIs",
          "OWASP Top 10 vulnerabilities (SQLi, XSS, CSRF, IDOR, SSRF)",
          "Intercepting proxy configuration and testing using Burp Suite",
          "Responsible disclosure, remediation reporting, and defense in depth",
        ],
        labs: "Penetration testing on vulnerable web targets; finding and mitigating SQL injection and XSS.",
      },
      {
        num: "Module 05",
        title: "Security Operations Center (SOC) & SIEM Monitoring",
        duration: "3 Weeks",
        topics: [
          "SOC roles, workflows, tier 1-3 escalation procedures",
          "Log aggregation and central monitoring using Splunk",
          "Writing search queries (SPL), creating dashboards, and correlation alerts",
          "Mitre ATT&CK framework mapping for real-world threat actors",
        ],
        labs: "Configured Splunk SIEM rules to detect simulated brute-force and credential stuffing attacks.",
      },
      {
        num: "Module 06",
        title: "Incident Response, Reporting & Career Placement",
        duration: "2 Weeks",
        topics: [
          "NIST and SANS Incident Response lifecycle (Preparation to Lessons Learned)",
          "Artifact preservation, triage, containment, and eradication",
          "Writing professional security audit and executive compliance reports",
          "Resume building, LinkedIn optimization, and technical mock interviews",
        ],
        labs: "End-to-end incident handling simulation and portfolio capstone defense.",
      },
    ],
    projects: [
      {
        title: "Corporate Network Vulnerability Assessment",
        description: "Conducted authorized discovery, port mapping, and vulnerability auditing across a simulated corporate intranet using Nmap, Nessus, and Wireshark.",
      },
      {
        title: "Enterprise SOC Threat Monitoring with Splunk",
        description: "Ingested server and firewall logs into Splunk Enterprise, developed detection rules for unauthorized access, and created an executive security posture dashboard.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing Course",
    subtitle: "Complete Performance Marketing, SEO, Paid Ads & Analytics Training",
    category: "Digital Marketing",
    duration: "12 Weeks (60h Live Interactive Sessions)",
    mode: "Live Online & Real Campaign Accounts",
    level: "Beginner to Advanced",
    summary:
      "Our online Digital Marketing training and placement program is fully job-oriented and includes real-time project work for hands-on learning. Learn how digital channels work together to drive traffic, generate qualified leads, scale revenues, and optimize ROI using industry-standard tools.",
    tools: ["Google Ads", "Meta Ads", "Semrush", "GA4 Analytics", "HubSpot", "Canva", "Ahrefs", "Mailchimp", "Google Search Console"],
    audience: [
      "Aspiring marketers and fresh graduates seeking high-growth digital agency roles",
      "Traditional marketing professionals transitioning into digital & performance marketing",
      "Entrepreneurs and business owners aiming to generate qualified inbound leads online",
    ],
    modules: [
      {
        num: "Module 01",
        title: "Digital Ecosystem & Marketing Strategy Fundamentals",
        duration: "2 Weeks",
        topics: [
          "Digital marketing landscape, buyer personas, customer journeys",
          "Full-funnel marketing strategies (TOFU, MOFU, BOFU)",
          "Competitive benchmarking and digital marketing roadmap planning",
          "Brand positioning, value propositions, and channel selection",
        ],
        labs: "Created a comprehensive go-to-market digital marketing strategy document for a real brand.",
      },
      {
        num: "Module 02",
        title: "Search Engine Optimization (SEO) Mastery",
        duration: "3 Weeks",
        topics: [
          "Search engine algorithms, crawling, indexing, ranking factors",
          "Keyword research: search intent, volume, difficulty using Semrush & Ahrefs",
          "On-page optimization: titles, meta tags, heading hierarchy, content optimization",
          "Technical SEO: site speed, schema markup, XML sitemaps, robots.txt, mobile-first index",
          "Off-page SEO: high-quality backlink building strategies and digital PR",
        ],
        labs: "Full technical SEO audit on a live website using Google Search Console and Semrush.",
      },
      {
        num: "Module 03",
        title: "Google Ads & Paid Search Advertising",
        duration: "3 Weeks",
        topics: [
          "Google Ads account structure, campaign types, and ad auction mechanics",
          "Keyword match types: broad, phrase, exact, negative keywords",
          "Search ads copywriting, responsive search ads, ad extensions (assets)",
          "Smart bidding strategies: Target CPA, Target ROAS, Maximize Conversions",
          "Conversion tracking setup using Google Tag Manager (GTM)",
        ],
        labs: "Built, launched, and optimized a live Google Search Ads campaign with budget allocation.",
      },
      {
        num: "Module 04",
        title: "Meta Ads (Facebook & Instagram) & Paid Social",
        duration: "2 Weeks",
        topics: [
          "Meta Business Suite setup, Ad Account, and Meta Pixel installation",
          "Audience targeting: Core audiences, Custom Audiences, Lookalikes",
          "Ad creative best practices: static, carousel, video, and reels formats",
          "A/B split testing creatives, copy, and landing pages to reduce CPL/CPA",
          "E-commerce catalog ads and lead generation forms",
        ],
        labs: "Engineered high-converting Meta lead generation ads campaign targeting lookalike audiences.",
      },
      {
        num: "Module 05",
        title: "GA4 Analytics, Reporting & Performance Optimization",
        duration: "2 Weeks",
        topics: [
          "Google Analytics 4 (GA4) setup, event-based data model, dimensions & metrics",
          "Conversion funnel analysis and user path exploration",
          "Building executive performance dashboards in Looker Studio",
          "Multi-channel attribution modeling and campaign ROI calculation",
          "Resume building, digital portfolio review, and placement interview prep",
        ],
        labs: "Built an interactive executive Looker Studio performance dashboard tracking ROAS and CAC.",
      },
    ],
    projects: [
      {
        title: "End-to-End Omnichannel Lead Generation Campaign",
        description: "Planned and executed an integrated campaign combining paid Google Search ads, Meta retargeting, and dedicated landing pages resulting in verified low-cost conversions.",
      },
      {
        title: "Complete Enterprise SEO Audit & Growth Roadmap",
        description: "Analyzed an existing business website, fixed technical crawl errors, optimized on-page search elements, and built an organic content calendar.",
      },
    ],
  },
  {
    slug: "programmatic-advertising",
    title: "Programmatic Advertising & AdTech",
    subtitle: "Real-Time Bidding, DSPs, SSPs, and Audience Data Management",
    category: "Digital Marketing",
    duration: "10 Weeks (50h Live Intensive)",
    mode: "Live Online & DSP Simulator Labs",
    level: "Beginner to Advanced",
    summary:
      "Develop high-demand technical capabilities in automated programmatic media buying, DSPs, SSPs, real-time bidding auctions (RTB), audience segmentation, and attribution analysis. Learn the core AdTech infrastructure powering billion-dollar media budgets.",
    tools: ["DV360", "The Trade Desk", "Google Ad Manager", "Xandr", "MediaMath", "Amazon DSP", "AppsFlyer", "IAS"],
    audience: [
      "Media planners, buyers, and performance marketers aiming to master AdTech stacks",
      "Digital agency account managers looking to run scalable display, native & video campaigns",
      "Graduates seeking high-paying Programmatic Specialist and Trader roles",
    ],
    modules: [
      {
        num: "Module 01",
        title: "AdTech Ecosystem & Programmatic Architecture",
        duration: "2 Weeks",
        topics: [
          "History of display advertising: Direct IO vs Programmatic trading",
          "The AdTech stack: DSPs, SSPs, Ad Networks, Ad Exchanges",
          "Real-Time Bidding (RTB) mechanics, 2nd price vs 1st price auctions",
          "Deal types: Open Auction, Private Marketplace (PMP), Preferred Deals, Programmatic Guaranteed (PG)",
        ],
        labs: "PMP deal negotiation and floor price optimization simulation.",
      },
      {
        num: "Module 02",
        title: "Audience Data, DMPs & Identity Solutions",
        duration: "2 Weeks",
        topics: [
          "First-party, second-party, and third-party data ecosystems",
          "Customer Data Platforms (CDPs) and Data Management Platforms (DMPs)",
          "Cookieless future: Privacy Sandbox, UID 2.0, probabilistic vs deterministic identity",
          "Contextual targeting, geo-fencing, and dayparting strategies",
        ],
        labs: "Constructed custom audience segments combining 1st party CRM data and 3rd party behavioral data.",
      },
      {
        num: "Module 03",
        title: "DSP Campaign Architecture & DV360 / Trade Desk",
        duration: "3 Weeks",
        topics: [
          "Account hierarchy: Partners, Advertisers, Campaigns, Insertion Orders (IO), Line Items",
          "Inventory targeting: whitelisting, brand safety tiers, viewability thresholds",
          "Creative formats: Display banners, HTML5 rich media, native ads, audio, and connected TV (CTV)",
          "Bidding algorithms and pacing controls (Flight pacing, Even pacing, Ahead pacing)",
        ],
        labs: "Configured full insertion orders, line items, and creative trafficking in DV360 simulator.",
      },
      {
        num: "Module 04",
        title: "Attribution, Fraud Prevention & Optimization",
        duration: "3 Weeks",
        topics: [
          "Verification partners: IAS, DoubleVerify, MOAT for ad fraud mitigation",
          "Post-click vs post-view (view-through) attribution analysis",
          "Multi-touch attribution models and incrementality testing",
          "Cross-device tracking and performance optimization workflows",
          "Technical interview prep, Trader certification guidance, and placement support",
        ],
        labs: "Comprehensive campaign performance analysis and media spend efficiency report.",
      },
    ],
    projects: [
      {
        title: "Multi-Million Dollar Programmatic Media Allocation Plan",
        description: "Built a complete media plan allocating budgets across CTV, Audio, Mobile, and Desktop using private marketplace inventory deals and custom behavioral segments.",
      },
    ],
  },
  {
    slug: "ethical-hacking",
    title: "Ethical Hacking & Security Fundamentals",
    subtitle: "Hands-on Offensive Security, Penetration Testing & Lab Assessments",
    category: "Cyber Security",
    duration: "12 Weeks (55h Live Labs)",
    mode: "Live Online & Virtual Pen-Testing Labs",
    level: "Beginner to Intermediate",
    summary:
      "A hands-on, practical entry point into ethical hacking and offensive security. Build essential foundations in networking and Linux, then work through structured reconnaissance, vulnerability scanning, system exploitation, and penetration testing in controlled, ethical lab environments.",
    tools: ["Kali Linux", "Wireshark", "Nmap", "Burp Suite", "Metasploit", "OWASP ZAP", "Hydra", "John the Ripper", "Aircrack-ng"],
    audience: [
      "Beginners and students passionate about ethical hacking and offensive security",
      "IT professionals preparing for CEH (Certified Ethical Hacker) and OSCP credentials",
      "Software developers seeking to understand attacker methodologies and write secure code",
    ],
    modules: [
      {
        num: "Module 01",
        title: "Ethical Hacking Foundations & Reconnaissance",
        duration: "2 Weeks",
        topics: [
          "Legal frameworks, scope of engagement, and ethical codes of conduct",
          "Passive reconnaissance: OSINT, Google dorking, Shodan, WHOIS, DNS records",
          "Active reconnaissance: DNS zone transfers, ping sweeps, service detection",
        ],
        labs: "OSINT target profiling and perimeter reconnaissance report.",
      },
      {
        num: "Module 02",
        title: "Network Scanning, Enumeration & Vulnerability Mapping",
        duration: "3 Weeks",
        topics: [
          "Nmap advanced scanning techniques, timing templates, and NSE scripts",
          "SMB, SNMP, NetBIOS, and SMTP service enumeration",
          "Vulnerability research, Exploit-DB, and CVE mapping",
        ],
        labs: "Discovered and mapped exposed ports and vulnerable services across a test subnet.",
      },
      {
        num: "Module 03",
        title: "System Exploitation & Metasploit Framework",
        duration: "3 Weeks",
        topics: [
          "Metasploit architecture: Exploits, Payloads, Encoders, Auxiliary modules",
          "Remote code execution, client-side attacks, and social engineering",
          "Post-exploitation: Privilege escalation, hash dumping, and persistence",
        ],
        labs: "Gained root access on a test machine, extracted password hashes, and documented findings.",
      },
      {
        num: "Module 04",
        title: "Web App Penetration Testing & Reporting",
        duration: "4 Weeks",
        topics: [
          "Web vulnerability discovery with Burp Suite and OWASP ZAP",
          "Testing for SQL injection, cross-site scripting, and broken authentication",
          "Drafting professional, executive-ready remediation and penetration test reports",
          "Mock technical security interviews and career mentoring",
        ],
        labs: "Completed full black-box penetration test against a multi-tier target and presented remediation findings.",
      },
    ],
    projects: [
      {
        title: "Full-Scope Black-Box Penetration Testing Project",
        description: "Executed complete reconnaissance, scanning, vulnerability identification, exploitation, and compiled a corporate executive remediation report.",
      },
    ],
  },
  {
    slug: "all-courses-prospectus",
    title: "Complete Career Programs Prospectus",
    subtitle: "Digital Tech Academy - Comprehensive Training & Placement Guide",
    category: "All Programs",
    duration: "10–16 Weeks Career Tracks",
    mode: "Live Interactive Online & Virtual Cloud Labs",
    level: "All Skill Levels",
    summary:
      "Comprehensive prospectus covering all Digitechademy job-oriented career tracks including Cyber Security, Digital Marketing, Ethical Hacking, and Programmatic Advertising with dedicated 1-on-1 placement preparation and mentorship.",
    tools: ["Wireshark", "Google Ads", "Splunk", "Meta Ads", "Kali Linux", "DV360", "Semrush", "Burp Suite"],
    audience: [
      "Students, fresh graduates, and career changers exploring high-growth technology and digital marketing careers",
      "Corporate teams and professionals seeking certified, hands-on skill upgrading",
    ],
    modules: [
      {
        num: "Track 01",
        title: "Cyber Security Training Online (16 Weeks / 65h Labs)",
        duration: "16 Weeks",
        topics: ["Networking fundamentals", "Linux administration", "OWASP web security", "Splunk SIEM operations", "Incident handling"],
        labs: "Hands-on virtual cloud labs, network packet triage, and enterprise threat detection.",
      },
      {
        num: "Track 02",
        title: "Digital Marketing Mastery (12 Weeks / 60h Sessions)",
        duration: "12 Weeks",
        topics: ["Comprehensive SEO strategy", "Google Ads search & display", "Meta Ads paid social", "GA4 analytics & Looker Studio"],
        labs: "Live budget campaign execution, technical site audit, and conversion optimization.",
      },
      {
        num: "Track 03",
        title: "Programmatic Advertising & AdTech (10 Weeks / 50h Sessions)",
        duration: "10 Weeks",
        topics: ["RTB auctions & deal types", "Audience data & DMPs", "DV360 & Trade Desk setups", "Multi-touch attribution models"],
        labs: "End-to-end multi-channel programmatic media plan and inventory bidding simulation.",
      },
      {
        num: "Track 04",
        title: "Ethical Hacking & Security Fundamentals (12 Weeks / 55h Labs)",
        duration: "12 Weeks",
        topics: ["OSINT & Reconnaissance", "Nmap network scanning", "Metasploit exploitation", "Web app security testing"],
        labs: "Black-box penetration testing and executive vulnerability remediation reporting.",
      },
    ],
    projects: [
      {
        title: "100% Job Placement Assistance Program",
        description: "Resume reconstruction, LinkedIn optimization, mock interviews with hiring managers, and direct corporate partner interview referrals.",
      },
    ],
  },
];

function generateHtml(course) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${course.title} - Official Curriculum Brochure</title>
  <style>
    @page {
      size: A4;
      margin: 12mm 15mm;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      background: #ffffff;
      line-height: 1.45;
      font-size: 10pt;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    /* Header Bar */
    .header-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(135deg, #0b1633 0%, #172554 100%);
      color: #ffffff;
      padding: 16px 22px;
      border-radius: 10px;
      margin-bottom: 18px;
    }
    .brand-title {
      font-size: 16pt;
      font-weight: 900;
      letter-spacing: -0.5px;
      color: #ffffff;
    }
    .brand-title span {
      color: #38bdf8;
    }
    .brand-tagline {
      font-size: 8pt;
      color: #cbd5e1;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 2px;
      font-weight: 700;
    }
    .header-badge {
      background: #ffcc00;
      color: #0f172a;
      font-size: 7.5pt;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.8px;
      padding: 5px 10px;
      border-radius: 6px;
      text-align: right;
    }

    /* Course Hero Banner */
    .course-hero {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 5px solid #4f46e5;
      padding: 16px 20px;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    .course-title {
      font-size: 18pt;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.2;
    }
    .course-subtitle {
      font-size: 9.5pt;
      color: #4f46e5;
      font-weight: 700;
      margin-top: 3px;
    }
    .course-meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
      margin-top: 12px;
      padding-top: 10px;
      border-top: 1px solid #e2e8f0;
    }
    .meta-item {
      display: flex;
      flex-direction: column;
    }
    .meta-label {
      font-size: 7pt;
      color: #64748b;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .meta-val {
      font-size: 8.5pt;
      color: #0f172a;
      font-weight: 700;
      margin-top: 1px;
    }

    /* Section Styling */
    .section-title {
      font-size: 11pt;
      font-weight: 900;
      color: #0b1633;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 5px;
      margin-top: 14px;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .section-title::before {
      content: "";
      display: inline-block;
      width: 4px;
      height: 12pt;
      background: #4f46e5;
      border-radius: 2px;
    }
    p {
      color: #334155;
      font-size: 8.8pt;
      line-height: 1.5;
      margin-bottom: 8px;
    }

    /* Tools Pill Row */
    .tools-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 12px;
    }
    .tool-pill {
      background: #eff6ff;
      color: #1e40af;
      border: 1px solid #bfdbfe;
      font-size: 7.5pt;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }

    /* Modules List */
    .module-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 10px 14px;
      margin-bottom: 8px;
      page-break-inside: avoid;
    }
    .module-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    .module-num {
      background: #0b1633;
      color: #facc15;
      font-size: 7pt;
      font-weight: 900;
      padding: 2px 7px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .module-name {
      font-size: 9.5pt;
      font-weight: 800;
      color: #0f172a;
      flex: 1;
      margin-left: 8px;
    }
    .module-dur {
      font-size: 7.5pt;
      font-weight: 700;
      color: #64748b;
    }
    .topics-list {
      list-style-type: none;
      margin-top: 4px;
      padding-left: 0;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 3px 14px;
    }
    .topics-list li {
      font-size: 8pt;
      color: #475569;
      position: relative;
      padding-left: 10px;
    }
    .topics-list li::before {
      content: "•";
      color: #4f46e5;
      position: absolute;
      left: 0;
      font-weight: 900;
    }
    .lab-note {
      font-size: 7.5pt;
      color: #047857;
      background: #ecfdf5;
      border: 1px dashed #a7f3d0;
      padding: 3px 8px;
      border-radius: 4px;
      margin-top: 5px;
      font-weight: 600;
    }

    /* Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;
      page-break-inside: avoid;
    }
    .project-box {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 10px 12px;
      border-radius: 6px;
    }
    .project-title {
      font-size: 8.5pt;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 3px;
    }
    .project-desc {
      font-size: 7.8pt;
      color: #64748b;
      line-height: 1.4;
      margin-bottom: 0;
    }

    /* Footer Credential Banner */
    .footer-credential {
      background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);
      border: 1px solid #bbf7d0;
      padding: 12px 16px;
      border-radius: 8px;
      margin-top: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      page-break-inside: avoid;
    }
    .cred-title {
      font-size: 8.5pt;
      font-weight: 900;
      color: #065f46;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .cred-desc {
      font-size: 7.8pt;
      color: #047857;
      margin-top: 2px;
      margin-bottom: 0;
    }

    /* Bottom Contact Bar */
    .contact-footer {
      border-top: 1px solid #cbd5e1;
      margin-top: 16px;
      padding-top: 8px;
      display: flex;
      justify-content: space-between;
      font-size: 7.5pt;
      color: #64748b;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <!-- Top Header -->
  <div class="header-bar">
    <div>
      <div class="brand-title">DIGITAL<span>TECH</span> ACADEMY</div>
      <div class="brand-tagline">Industry-Leading IT &amp; Marketing Job Placement Institute</div>
    </div>
    <div class="header-badge">
      ★ CERTIFIED CURRICULUM<br>
      <span style="font-size: 6.5pt; font-weight: normal; color: #334155;">100% Placement-Assisted</span>
    </div>
  </div>

  <!-- Course Hero -->
  <div class="course-hero">
    <div class="course-title">${course.title}</div>
    <div class="course-subtitle">${course.subtitle}</div>
    
    <div class="course-meta-grid">
      <div class="meta-item">
        <span class="meta-label">Track / Discipline</span>
        <span class="meta-val">${course.category}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Total Duration</span>
        <span class="meta-val">${course.duration}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Delivery Mode</span>
        <span class="meta-val">${course.mode}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Certification</span>
        <span class="meta-val">Verified Credential</span>
      </div>
    </div>
  </div>

  <!-- 1. Executive Program Overview -->
  <div class="section-title">1. Executive Program Overview</div>
  <p>${course.summary}</p>

  <!-- Tools Covered -->
  <div style="font-size: 8pt; font-weight: 800; color: #0f172a; text-transform: uppercase; margin-bottom: 5px;">
    Tools &amp; Technologies Stack:
  </div>
  <div class="tools-wrap">
    ${course.tools.map((t) => `<span class="tool-pill">${t}</span>`).join("")}
  </div>

  <!-- 2. Detailed Modular Syllabus Breakdown -->
  <div class="section-title">2. Modular Syllabus Breakdown</div>
  <div>
    ${course.modules
      .map(
        (m) => `
      <div class="module-card">
        <div class="module-head">
          <span class="module-num">${m.num}</span>
          <span class="module-name">${m.title}</span>
          <span class="module-dur">${m.duration || ""}</span>
        </div>
        <ul class="topics-list">
          ${m.topics.map((top) => `<li>${top}</li>`).join("")}
        </ul>
        ${m.labs ? `<div class="lab-note"><strong>Lab Milestone:</strong> ${m.labs}</div>` : ""}
      </div>
    `
      )
      .join("")}
  </div>

  <!-- 3. Practical Capstone Projects -->
  <div class="section-title">3. Real-World Portfolio Projects</div>
  <div class="projects-grid">
    ${course.projects
      .map(
        (p) => `
      <div class="project-box">
        <div class="project-title">${p.title}</div>
        <div class="project-desc">${p.description}</div>
      </div>
    `
      )
      .join("")}
  </div>

  <!-- 4. Certification & Placement Assurance -->
  <div class="footer-credential">
    <div>
      <div class="cred-title">Authorized Industry Certification &amp; Career Support</div>
      <div class="cred-desc">
        Graduates receive a verified credential shareable on LinkedIn, plus complete resume review, mock interviews, and corporate referrals.
      </div>
    </div>
    <div style="text-align: right; font-weight: 800; font-size: 8pt; color: #065f46;">
      Digitechademy<br>Authorized Seal
    </div>
  </div>

  <!-- Contact & Verification Footer -->
  <div class="contact-footer">
    <div>Admissions Desk: +91 90000 00000 &bull; admissions@digitaltechsolution.in &bull; Hyderabad, India</div>
    <div>Digital Tech Academy &bull; Official Career Curriculum Guide &bull; 2026 Academic Edition</div>
  </div>

</body>
</html>`;
}

console.log("Compiling corporate curriculum brochures via Edge Headless...");

for (const c of coursesData) {
  const htmlContent = generateHtml(c);
  const htmlFile = path.join(tempDir, `${c.slug}.html`);
  const pdfFile = path.join(outDir, `${c.slug}-curriculum.pdf`);

  fs.writeFileSync(htmlFile, htmlContent, "utf8");

  try {
    execFileSync(edgePath, [
      "--headless",
      "--disable-gpu",
      `--user-data-dir=${edgeUserData}`,
      `--print-to-pdf=${pdfFile}`,
      htmlFile,
    ]);

    const size = fs.statSync(pdfFile).size;
    console.log(`Generated: ${path.basename(pdfFile)} (${size} bytes)`);
  } catch (err) {
    console.error(`Failed to generate ${c.slug}:`, err.message);
  }
}

// Copy fallback prospectus
fs.copyFileSync(
  path.join(outDir, "all-courses-prospectus-curriculum.pdf"),
  path.join(outDir, "all-courses-prospectus.pdf")
);
console.log("All corporate curriculum PDFs compiled successfully!");

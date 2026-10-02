/**
 * Central brand + contact configuration.
 */
export const site = {
  name: "DIGITECHADEMY",
  shortName: "DIGITECHADEMY",
  tagline: "LEARN • GROW • ACHIEVE",
  descriptor: "Digital Marketing • Programmatic Advertising • Cyber Security",
  positioning: "Learn practical skills. Build real-world confidence. Become career ready.",
  description:
    "Digitechademy is a practical learning platform focused on helping learners build relevant digital and technology skills through structured training, practical learning and expert guidance.",
  phone: "+91 81434 51426",
  phoneHref: "tel:+918143451426",
  whatsapp: "918143451426",
  email: "admissions@digitechademy.com",
  address: "2nd Floor, Tech Park Avenue, Madhapur, Hyderabad 500081",
  city: "Hyderabad, India",
  hours: "Mon – Sat · 9:30 AM to 7:30 PM",
} as const;

export function whatsappLink(message = "Hi, I would like to know more about Digitechademy training programs.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
] as const;

export const footerLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Programs", to: "/courses" },
  { label: "Digital Marketing", to: "/courses/digital-marketing" },
  { label: "Programmatic Advertising", to: "/courses/programmatic-advertising" },
  { label: "Cyber Security", to: "/courses/cyber-security" },
  { label: "Resources", to: "/testimonials" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms" },
] as const;

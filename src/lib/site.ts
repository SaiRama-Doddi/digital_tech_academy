/**
 * Central brand + contact configuration.
 * Replace these placeholder details with the real business information.
 */
export const site = {
  name: "Digital Tech Solution",
  shortName: "DTS",
  tagline: "Digital Marketing & Cyber Security Training",
  description:
    "Digitechademy delivers practical, career-focused training in Digital Marketing, Programmatic Advertising, Cyber Security, SEO, and Performance Marketing. Our approach combines structured learning with hands-on practice to help learners build relevant professional skills.",
  phone: "+91 90000 00000",
  phoneHref: "tel:+919000000000",
  whatsapp: "919000000000",
  email: "admissions@digitaltechsolution.in",
  address: "2nd Floor, Tech Park Avenue, Madhapur, Hyderabad 500081",
  city: "Hyderabad, India",
  hours: "Mon – Sat · 9:30 AM to 7:30 PM",
} as const;

export function whatsappLink(message = "Hi, I would like to know more about your training programs.") {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "FAQ", to: "/faq" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
] as const;

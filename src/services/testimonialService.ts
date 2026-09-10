import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface FirebaseTestimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  course: string;
  courseSlug?: string | undefined;
  rating: number;
  content: string;
  featured: boolean;
  avatar?: string | undefined;
  createdAt: string;
  updatedAt?: string | undefined;
}

export type TestimonialInput = {
  name: string;
  role?: string | undefined;
  company?: string | undefined;
  course: string;
  courseSlug?: string | undefined;
  rating: number;
  content: string;
  featured?: boolean | undefined;
  avatar?: string | undefined;
};

const TESTIMONIALS_STORAGE_KEY = "digital_tech_testimonials_db";

export const DEFAULT_TESTIMONIALS: FirebaseTestimonial[] = [
  {
    id: "rev-1",
    name: "Karthik Verma",
    role: "SEO Specialist",
    company: "TechNova Solutions",
    course: "Digital Marketing Mastery",
    courseSlug: "digital-marketing",
    rating: 5,
    content:
      "The hands-on campaign simulations gave me the confidence to handle live client ad budgets.",
    featured: true,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: "rev-2",
    name: "Sneha Patel",
    role: "SOC Analyst Intern",
    company: "CyberGuard Defense",
    course: "Cyber Security & Ethical Hacking",
    courseSlug: "cyber-security",
    rating: 5,
    content:
      "Real lab environments with Wireshark and Metasploit prepared me directly for technical interviews.",
    featured: true,
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
  },
  {
    id: "rev-3",
    name: "Rahul Sharma",
    role: "Digital Marketing Associate",
    company: "GrowthX Media",
    course: "Digital Marketing Mastery",
    courseSlug: "digital-marketing",
    rating: 5,
    content:
      "The practical approach made a huge difference. I wasn't just learning concepts — I was actually applying them.",
    featured: true,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "rev-4",
    name: "Ananya Reddy",
    role: "Security Researcher",
    company: "CloudSecure",
    course: "Cyber Security & Ethical Hacking",
    courseSlug: "cyber-security",
    rating: 5,
    content:
      "The Cyber Security sessions helped me understand security concepts through practical examples instead of only theory.",
    featured: true,
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: "rev-5",
    name: "Divya Nair",
    role: "Growth Marketer",
    company: "AdVantage Agency",
    course: "Advanced SEO & Performance Marketing",
    courseSlug: "advanced-seo",
    rating: 5,
    content:
      "Short course, very dense and practical. The reporting templates, competitor gap analysis, and ranking workflows alone were worth it.",
    featured: false,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "rev-6",
    name: "Rohit Kumar",
    role: "Penetration Tester",
    company: "CyberSafe Labs",
    course: "Ethical Hacking & Security Fundamentals",
    courseSlug: "ethical-hacking",
    rating: 5,
    content:
      "Clear, ethical and very hands-on. The guided virtual labs and vulnerability assessment drills built real confidence for offensive security roles.",
    featured: true,
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
];

// Helper: Read local cached testimonials
export function getLocalTestimonials(): FirebaseTestimonial[] {
  if (typeof window === "undefined") return DEFAULT_TESTIMONIALS;
  try {
    const raw = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(DEFAULT_TESTIMONIALS));
      return DEFAULT_TESTIMONIALS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.warn("Failed to read local testimonials cache:", err);
  }
  return DEFAULT_TESTIMONIALS;
}

// Helper: Save local cached testimonials
export function saveLocalTestimonials(testimonials: FirebaseTestimonial[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
    window.dispatchEvent(new CustomEvent("dta_testimonials_updated", { detail: testimonials }));
  } catch (err) {
    console.warn("Failed to write local testimonials cache:", err);
  }
}

/**
 * Add a new student review to Firebase Firestore & local storage
 */
export async function addTestimonialToFirebase(
  input: TestimonialInput
): Promise<FirebaseTestimonial> {
  const newId = `rev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const item: FirebaseTestimonial = {
    id: newId,
    name: input.name.trim(),
    role: input.role?.trim() || "Student",
    company: input.company?.trim() || "Independent",
    course: input.course,
    courseSlug: input.courseSlug || input.course.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    rating: Number(input.rating) || 5,
    content: input.content.trim(),
    featured: Boolean(input.featured),
    avatar: input.avatar,
    createdAt: new Date().toISOString(),
  };

  // 1. Save optimistically to local cache
  const current = getLocalTestimonials();
  const updated = [item, ...current.filter((t) => t.id !== newId)];
  saveLocalTestimonials(updated);

  // 2. Persist to Firestore
  try {
    const docRef = doc(db, "testimonials", newId);
    await setDoc(docRef, {
      ...item,
      timestamp: Date.now(),
    });
  } catch (err) {
    console.warn("Firestore error adding testimonial, saved locally:", err);
  }

  return item;
}

/**
 * Update a student review in Firebase & local cache
 */
export async function updateTestimonialInFirebase(
  id: string,
  updates: Partial<FirebaseTestimonial>
): Promise<void> {
  const current = getLocalTestimonials();
  const updated = current.map((t) =>
    t.id === id
      ? {
          ...t,
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      : t
  );
  saveLocalTestimonials(updated);

  try {
    const docRef = doc(db, "testimonials", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Firestore update error for testimonial, saved locally:", err);
  }
}

/**
 * Delete a student review from Firebase & local cache
 */
export async function deleteTestimonialFromFirebase(id: string): Promise<void> {
  const current = getLocalTestimonials();
  const updated = current.filter((t) => t.id !== id);
  saveLocalTestimonials(updated);

  try {
    const docRef = doc(db, "testimonials", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn("Firestore delete error for testimonial, removed locally:", err);
  }
}

/**
 * Subscribe to real-time student reviews
 */
export function subscribeTestimonials(
  callback: (testimonials: FirebaseTestimonial[]) => void
): () => void {
  // Fire initial cache
  callback(getLocalTestimonials());

  const handleLocalUpdate = (e: Event) => {
    const custom = e as CustomEvent<FirebaseTestimonial[]>;
    if (custom.detail) {
      callback(custom.detail);
    } else {
      callback(getLocalTestimonials());
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("dta_testimonials_updated", handleLocalUpdate);
    window.addEventListener("storage", handleLocalUpdate);
  }

  try {
    const colRef = collection(db, "testimonials");
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: FirebaseTestimonial[] = [];
          snapshot.forEach((d) => {
            const data = d.data() as Record<string, any>;
            list.push({
              id: d.id,
              name: String(data["name"] || "Anonymous Student"),
              role: String(data["role"] || "Alumni"),
              company: String(data["company"] || "Graduate"),
              course: String(data["course"] || "Certification"),
              courseSlug: data["courseSlug"] ? String(data["courseSlug"]) : undefined,
              rating: Number(data["rating"] || 5),
              content: String(data["content"] || ""),
              featured: Boolean(data["featured"]),
              avatar: data["avatar"] ? String(data["avatar"]) : undefined,
              createdAt: String(data["createdAt"] || new Date().toISOString()),
              updatedAt: data["updatedAt"] ? String(data["updatedAt"]) : undefined,
            });
          });
          saveLocalTestimonials(list);
          callback(list);
        } else {
          callback(getLocalTestimonials());
        }
      },
      (error) => {
        console.warn("Firestore subscription error for testimonials:", error);
        callback(getLocalTestimonials());
      }
    );

    return () => {
      unsubscribe();
      if (typeof window !== "undefined") {
        window.removeEventListener("dta_testimonials_updated", handleLocalUpdate);
        window.removeEventListener("storage", handleLocalUpdate);
      }
    };
  } catch (err) {
    console.warn("Firestore listener error for testimonials:", err);
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("dta_testimonials_updated", handleLocalUpdate);
        window.removeEventListener("storage", handleLocalUpdate);
      }
    };
  }
}

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

export const DEFAULT_TESTIMONIALS: FirebaseTestimonial[] = [];

export const DUMMY_TESTIMONIAL_IDS = [
  "rev-1",
  "rev-2",
  "rev-3",
  "rev-4",
  "rev-5",
  "rev-6",
];

// Helper: Read local cached testimonials
export function getLocalTestimonials(): FirebaseTestimonial[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      const cleaned = parsed.filter((r) => r && !DUMMY_TESTIMONIAL_IDS.includes(r.id));
      if (cleaned.length !== parsed.length) {
        saveLocalTestimonials(cleaned);
      }
      return cleaned;
    }
  } catch (err) {
    console.warn("Failed to read local testimonials cache:", err);
  }
  return [];
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
 * Delete all dummy demo testimonials from Firebase and localStorage
 */
export async function deleteDummyTestimonialsFromFirebase(): Promise<number> {
  let count = 0;
  for (const id of DUMMY_TESTIMONIAL_IDS) {
    try {
      const docRef = doc(db, "testimonials", id);
      await deleteDoc(docRef);
      count++;
    } catch {
      // ignore
    }
  }
  clearAllTestimonials();
  return count;
}

/**
 * Clear all testimonials from local storage cache
 */
export function clearAllTestimonials(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(TESTIMONIALS_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent("dta_testimonials_updated", { detail: [] }));
  } catch (err) {
    console.warn("Failed to clear testimonials cache:", err);
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
    avatar: input.avatar || "",
    createdAt: new Date().toISOString(),
  };

  // 1. Save optimistically to local cache
  const current = getLocalTestimonials();
  const updated = [item, ...current.filter((t) => t.id !== newId)];
  saveLocalTestimonials(updated);

  // 2. Persist to Firestore
  try {
    const docRef = doc(db, "testimonials", newId);
    const firestoreData = Object.fromEntries(
      Object.entries({
        ...item,
        timestamp: Date.now(),
      }).filter(([_, v]) => v !== undefined)
    );
    await setDoc(docRef, firestoreData);
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
            if (DUMMY_TESTIMONIAL_IDS.includes(d.id)) {
              return;
            }
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

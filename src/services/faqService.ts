import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { faqCategories } from "@/data/content";

export interface FirebaseFaq {
  id: string;
  category: string;
  question: string;
  answer: string;
  order?: number;
  createdAt?: string | number;
  updatedAt?: string | number;
}

const LOCAL_STORAGE_KEY = "digital_tech_faqs_db";

export const FAQ_CATEGORIES = [
  "General",
  "Digital Marketing",
  "Programmatic Advertising",
  "Cyber Security",
  "Enrollment & Support",
] as const;

/**
 * Generates default list of FAQs from static content
 */
export function getDefaultFaqsList(): FirebaseFaq[] {
  let counter = 1;
  const list: FirebaseFaq[] = [];
  faqCategories.forEach((cat) => {
    cat.items.forEach((item) => {
      list.push({
        id: `faq-${counter}`,
        category: cat.title,
        question: item.question,
        answer: item.answer,
        order: counter,
        createdAt: "2026-01-01T00:00:00.000Z",
      });
      counter++;
    });
  });
  return list;
}

/**
 * Get cached FAQs from browser localStorage
 */
export function getLocalCachedFaqs(): FirebaseFaq[] {
  const defaults = getDefaultFaqsList();
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return defaults;
  } catch {
    return defaults;
  }
}

/**
 * Save FAQs to browser localStorage cache
 */
export function saveLocalCachedFaqs(faqs: FirebaseFaq[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(faqs));
  } catch (err) {
    console.warn("Failed to write to localStorage FAQ cache:", err);
  }
}

/**
 * Fetch FAQs once from Firestore, falls back to cache if empty or offline
 */
export async function getFaqsFromFirebase(): Promise<FirebaseFaq[]> {
  try {
    const colRef = collection(db, "faqs");
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const list: FirebaseFaq[] = snapshot.docs.map((docSnap) => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          category: d["category"] || "General",
          question: d["question"] || "Untitled Question",
          answer: d["answer"] || "",
          order: typeof d["order"] === "number" ? d["order"] : 0,
          createdAt: d["createdAt"] || Date.now(),
          updatedAt: d["updatedAt"] || Date.now(),
        };
      });
      saveLocalCachedFaqs(list);
      return list;
    }
  } catch (err) {
    console.warn("Firestore faqs read error, falling back to cache:", err);
  }
  return getLocalCachedFaqs();
}

/**
 * Real-time listener for FAQs from Firestore.
 */
export function subscribeFaqs(
  onUpdate: (faqs: FirebaseFaq[]) => void,
  onError?: (error: unknown) => void,
): () => void {
  try {
    const colRef = collection(db, "faqs");
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: FirebaseFaq[] = snapshot.docs.map((docSnap) => {
            const d = docSnap.data();
            return {
              id: docSnap.id,
              category: d["category"] || "General",
              question: d["question"] || "Untitled Question",
              answer: d["answer"] || "",
              order: typeof d["order"] === "number" ? d["order"] : 0,
              createdAt: d["createdAt"] || Date.now(),
              updatedAt: d["updatedAt"] || Date.now(),
            };
          });
          // Sort by order ascending, then by creation
          list.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
          saveLocalCachedFaqs(list);
          onUpdate(list);
        } else {
          // If Firestore collection is empty, fallback to local cached/defaults
          onUpdate(getLocalCachedFaqs());
        }
      },
      (err) => {
        console.warn("Firestore faqs subscription error, using local cache:", err);
        onUpdate(getLocalCachedFaqs());
        if (onError) onError(err);
      },
    );
    return unsubscribe;
  } catch (err) {
    console.warn("Could not subscribe to faqs in Firestore:", err);
    onUpdate(getLocalCachedFaqs());
    return () => {};
  }
}

/**
 * Add a new FAQ to Firestore & local cache
 */
export async function addFaqToFirebase(
  faqInput: Omit<FirebaseFaq, "id">,
): Promise<FirebaseFaq> {
  const newId = `faq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
  const newFaq: FirebaseFaq = {
    ...faqInput,
    id: newId,
    order: faqInput.order ?? Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  // Optimistic local update
  const cached = getLocalCachedFaqs();
  const updatedList = [newFaq, ...cached.filter((f) => f.id !== newId)];
  saveLocalCachedFaqs(updatedList);

  try {
    const docRef = doc(db, "faqs", newId);
    await setDoc(docRef, {
      category: newFaq.category,
      question: newFaq.question,
      answer: newFaq.answer,
      order: newFaq.order,
      createdAt: newFaq.createdAt,
      updatedAt: newFaq.updatedAt,
    });
  } catch (err) {
    console.warn("Failed to write FAQ to Firestore:", err);
  }

  return newFaq;
}

/**
 * Update an existing FAQ in Firestore & local cache
 */
export async function updateFaqInFirebase(
  id: string,
  updates: Partial<FirebaseFaq>,
): Promise<void> {
  const cached = getLocalCachedFaqs();
  const updatedList = cached.map((f) =>
    f.id === id ? { ...f, ...updates, updatedAt: Date.now() } : f,
  );
  saveLocalCachedFaqs(updatedList);

  try {
    const docRef = doc(db, "faqs", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: Date.now(),
    });
  } catch (err) {
    console.warn("Failed to update FAQ in Firestore:", err);
  }
}

/**
 * Delete an FAQ from Firestore & local cache
 */
export async function deleteFaqFromFirebase(id: string): Promise<void> {
  const cached = getLocalCachedFaqs();
  saveLocalCachedFaqs(cached.filter((f) => f.id !== id));

  try {
    const docRef = doc(db, "faqs", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn("Failed to delete FAQ from Firestore:", err);
  }
}

/**
 * Seed all default FAQs directly to Firestore (useful when starting with a fresh database)
 */
export async function seedDefaultFaqsToFirebase(): Promise<number> {
  const defaults = getDefaultFaqsList();
  let count = 0;
  for (const item of defaults) {
    try {
      const docRef = doc(db, "faqs", item.id);
      await setDoc(docRef, {
        category: item.category,
        question: item.question,
        answer: item.answer,
        order: item.order,
        createdAt: item.createdAt,
        updatedAt: Date.now(),
      });
      count++;
    } catch (err) {
      console.warn(`Failed to seed FAQ ${item.id}:`, err);
    }
  }
  saveLocalCachedFaqs(defaults);
  return count;
}

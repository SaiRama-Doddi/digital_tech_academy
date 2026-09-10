import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface FirebaseEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  course: string;
  callTime?: string | undefined;
  source?: string | undefined;
  notes?: string | undefined;
  status: "New" | "Contacted" | "Follow-up" | "Converted" | "Closed";
  progress: number;
  createdAt: string;
  updatedAt?: string | undefined;
}

export type EnquiryInput = {
  name: string;
  phone: string;
  email: string;
  course: string;
  callTime?: string | undefined;
  source?: string | undefined;
  notes?: string | undefined;
  status?: FirebaseEnquiry["status"] | undefined;
  progress?: number | undefined;
};

const ENQUIRIES_STORAGE_KEY = "digital_tech_enquiries_db";
const DTA_LEGACY_KEY = "dta_enquiries";

export const DEFAULT_ENQUIRIES: FirebaseEnquiry[] = [
  {
    id: "enq-101",
    name: "Sai Rama Doddi",
    phone: "+91 98765 43210",
    email: "sairama@example.com",
    course: "Digital Marketing Mastery",
    callTime: "Evening (4 PM - 7 PM)",
    source: "Free Demo Class Popup",
    status: "New",
    progress: 20,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "enq-102",
    name: "Sunil Neelakantam",
    phone: "+91 94400 12345",
    email: "sunil@example.com",
    course: "Cyber Security & Ethical Hacking",
    callTime: "Morning (9 AM - 12 PM)",
    source: "Course Demo Sidebar",
    status: "Contacted",
    progress: 60,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "enq-103",
    name: "Ramesh Sharma",
    phone: "+91 88888 77777",
    email: "ramesh.sharma@example.com",
    course: "Advanced SEO & Performance Marketing",
    callTime: "Afternoon (12 PM - 4 PM)",
    source: "Callback Form",
    status: "Follow-up",
    progress: 45,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: "enq-104",
    name: "Pooja Reddy",
    phone: "+91 77777 66666",
    email: "pooja.reddy@example.com",
    course: "Network Defense & Security Operations",
    callTime: "Evening (4 PM - 7 PM)",
    source: "Free Demo Class Popup",
    status: "Converted",
    progress: 100,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
];

// Helper: read cached enquiries
function getLocalEnquiries(): FirebaseEnquiry[] {
  if (typeof window === "undefined") return DEFAULT_ENQUIRIES;
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    if (raw) return JSON.parse(raw);

    // Check legacy key
    const legacy = localStorage.getItem(DTA_LEGACY_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item) => ({
          id: item.id || `enq-${Date.now()}`,
          name: item.name || "Anonymous",
          phone: item.phone || "N/A",
          email: item.email || "N/A",
          course: item.course || "General Counseling",
          callTime: item.callTime || "Immediate Callback",
          source: item.source || "Website Enquiry",
          status: (item.status === "NEW" ? "New" : item.status) || "New",
          progress: 20,
          createdAt: item.createdAt || new Date().toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn("Failed to read local enquiries cache:", err);
  }
  return DEFAULT_ENQUIRIES;
}

// Helper: save local enquiries
function saveLocalEnquiries(enquiries: FirebaseEnquiry[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(enquiries));
    localStorage.setItem(DTA_LEGACY_KEY, JSON.stringify(enquiries));
    window.dispatchEvent(new CustomEvent("dta_enquiries_updated", { detail: enquiries }));
  } catch (err) {
    console.warn("Failed to write local enquiries cache:", err);
  }
}

/**
 * Add a new enquiry to Firebase Firestore and local cache
 */
export async function addEnquiryToFirebase(
  input: EnquiryInput
): Promise<FirebaseEnquiry> {
  const newId = `enq-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const enquiry: FirebaseEnquiry = {
    ...input,
    id: newId,
    status: input.status || "New",
    progress: input.progress || 20,
    source: input.source || "Website Form",
    createdAt: new Date().toISOString(),
  };

  // 1. Save optimistically to local storage
  const current = getLocalEnquiries();
  const updated = [enquiry, ...current.filter((e) => e.id !== newId)];
  saveLocalEnquiries(updated);

  // 2. Persist to Firestore
  try {
    const docRef = doc(db, "enquiries", newId);
    await setDoc(docRef, {
      ...enquiry,
      timestamp: Date.now(),
    });
  } catch (err) {
    console.warn("Firestore error adding enquiry, saved locally:", err);
  }

  return enquiry;
}

/**
 * Subscribe to real-time enquiry updates
 */
export function subscribeEnquiries(
  callback: (enquiries: FirebaseEnquiry[]) => void
): () => void {
  // Initial fire with local cache
  callback(getLocalEnquiries());

  // Listen for local events across tabs or components
  const handleLocalUpdate = (e: Event) => {
    const custom = e as CustomEvent<FirebaseEnquiry[]>;
    if (custom.detail) {
      callback(custom.detail);
    } else {
      callback(getLocalEnquiries());
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("dta_enquiries_updated", handleLocalUpdate);
    window.addEventListener("storage", handleLocalUpdate);
  }

  // Subscribe to Firebase Firestore collection
  try {
    const colRef = collection(db, "enquiries");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: FirebaseEnquiry[] = [];
          snapshot.forEach((d) => {
            const data = d.data() as Record<string, any>;
            list.push({
              id: d.id,
              name: String(data["name"] || "Anonymous"),
              phone: String(data["phone"] || "N/A"),
              email: String(data["email"] || "N/A"),
              course: String(data["course"] || "General"),
              callTime: data["callTime"] ? String(data["callTime"]) : undefined,
              source: data["source"] ? String(data["source"]) : undefined,
              notes: data["notes"] ? String(data["notes"]) : undefined,
              status: (data["status"] || "New") as FirebaseEnquiry["status"],
              progress: typeof data["progress"] === "number" ? data["progress"] : 20,
              createdAt: String(data["createdAt"] || new Date().toISOString()),
              updatedAt: data["updatedAt"] ? String(data["updatedAt"]) : undefined,
            });
          });
          saveLocalEnquiries(list);
          callback(list);
        } else {
          // If Firestore is empty, keep local or seed
          callback(getLocalEnquiries());
        }
      },
      (error) => {
        console.warn("Firestore subscription error for enquiries:", error);
        callback(getLocalEnquiries());
      }
    );

    return () => {
      unsubscribe();
      if (typeof window !== "undefined") {
        window.removeEventListener("dta_enquiries_updated", handleLocalUpdate);
        window.removeEventListener("storage", handleLocalUpdate);
      }
    };
  } catch (err) {
    console.warn("Firestore failed to initialize listener for enquiries:", err);
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("dta_enquiries_updated", handleLocalUpdate);
        window.removeEventListener("storage", handleLocalUpdate);
      }
    };
  }
}

/**
 * Update enquiry status or progress
 */
export async function updateEnquiryInFirebase(
  id: string,
  updates: Partial<FirebaseEnquiry>
): Promise<void> {
  const current = getLocalEnquiries();
  const updated = current.map((item) =>
    item.id === id
      ? {
          ...item,
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      : item
  );
  saveLocalEnquiries(updated);

  try {
    const docRef = doc(db, "enquiries", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn("Firestore update error, saved locally:", err);
  }
}

/**
 * Delete enquiry from Firebase and local cache
 */
export async function deleteEnquiryFromFirebase(id: string): Promise<void> {
  const current = getLocalEnquiries();
  const updated = current.filter((item) => item.id !== id);
  saveLocalEnquiries(updated);

  try {
    const docRef = doc(db, "enquiries", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn("Firestore delete error, removed locally:", err);
  }
}

/**
 * Mentor Service - Firebase Firestore Synchronization
 * Handles full CRUD operations for faculty mentors with offline/local storage fallback.
 */

import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface FirebaseMentor {
  id: string;
  name: string;
  role: string;
  track: string;
  experience: string;
  bio: string;
  fullBio: string;
  skills: string[];
  mentorshipFocus: string[];
  image: string;
  badgeBg?: string;
  gradient?: string;
  active?: boolean;
  order?: number;
  email?: string;
  activeBatches?: number;
  createdAt?: string;
  updatedAt?: string;
}

export type MentorInput = Omit<FirebaseMentor, "id" | "createdAt" | "updatedAt">;

const MENTORS_STORAGE_KEY = "digital_tech_mentors_db";

export const DEMO_MENTOR_IDS = [
  "mentor-arjun",
  "mentor-priya",
  "mentor-vikram",
  "mentor-sneha",
  "mentor-karthik",
];

export const DEMO_MENTOR_NAMES = [
  "Arjun Kumar",
  "Priya Sharma",
  "Vikramaditya Rao",
  "Sneha Reddy",
  "Karthik Varma",
];

// Empty by default: all faculty mentors are strictly created & managed by admin
export const DEFAULT_MENTORS: FirebaseMentor[] = [];

// Empty preset avatars: mentors use uploaded photos or direct image URLs
export const PRESET_AVATARS: { id: string; label: string; src: string }[] = [];

/**
 * Generates an ultra-crisp SVG initials monogram avatar when no photo is uploaded
 */
export function getDefaultMentorAvatar(name?: string): string {
  const initials = (name || "Faculty")
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase() || "FA";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7c3aed"/>
        <stop offset="50%" stop-color="#4f46e5"/>
        <stop offset="100%" stop-color="#0284c7"/>
      </linearGradient>
    </defs>
    <rect width="300" height="300" rx="150" fill="url(#g)"/>
    <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="104" font-weight="800" letter-spacing="2">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// Helper: resolve badgeBg based on track
export function getTrackBadgeStyle(track: string): { badgeBg: string; gradient: string } {
  const lower = (track || "").toLowerCase();
  if (lower.includes("digital") || lower.includes("marketing") || lower.includes("seo")) {
    return {
      badgeBg: "bg-blue-500/15 text-blue-300 border-blue-400/30",
      gradient: "from-blue-600 to-cyan-600",
    };
  }
  if (lower.includes("cyber") || lower.includes("defense")) {
    return {
      badgeBg: "bg-blue-600/15 text-blue-300 border-blue-400/30",
      gradient: "from-blue-700 to-sky-600",
    };
  }
  if (lower.includes("programmatic") || lower.includes("ad")) {
    return {
      badgeBg: "bg-sky-500/15 text-sky-300 border-sky-400/30",
      gradient: "from-sky-500 to-blue-600",
    };
  }
  if (lower.includes("growth") || lower.includes("paid")) {
    return {
      badgeBg: "bg-sky-500/15 text-sky-300 border-sky-400/30",
      gradient: "from-sky-500 to-blue-600",
    };
  }
  if (lower.includes("offensive") || lower.includes("hack") || lower.includes("security")) {
    return {
      badgeBg: "bg-blue-600/15 text-blue-300 border-blue-400/30",
      gradient: "from-blue-700 to-sky-600",
    };
  }
  return {
    badgeBg: "bg-blue-500/15 text-blue-300 border-blue-400/30",
    gradient: "from-blue-600 to-cyan-600",
  };
}

// Helper: Read local cached mentors
// Helper: Read local cached mentors (demo mentors automatically purged)
export function getLocalMentors(): FirebaseMentor[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(MENTORS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Strictly filter out any demo/dummy mentors
      const cleaned = parsed.filter(
        (m) => !DEMO_MENTOR_IDS.includes(m.id) && !DEMO_MENTOR_NAMES.includes(m.name)
      );
      if (cleaned.length !== parsed.length) {
        localStorage.setItem(MENTORS_STORAGE_KEY, JSON.stringify(cleaned));
      }
      return cleaned;
    }
  } catch (err) {
    console.warn("Failed to read local mentors cache:", err);
  }
  return [];
}

// Helper: Save local cached mentors
export function saveLocalMentors(mentorsList: FirebaseMentor[]) {
  if (typeof window === "undefined") return;
  try {
    const cleaned = mentorsList.filter(
      (m) => !DEMO_MENTOR_IDS.includes(m.id) && !DEMO_MENTOR_NAMES.includes(m.name)
    );
    localStorage.setItem(MENTORS_STORAGE_KEY, JSON.stringify(cleaned));
    window.dispatchEvent(new CustomEvent("dta_mentors_updated", { detail: cleaned }));
  } catch (err) {
    console.warn("Failed to save local mentors cache:", err);
  }
}

/**
 * Delete all demo / dummy mentors (Arjun, Priya, Vikram, Sneha, Karthik) from Firebase & local cache
 */
export async function deleteDemoMentorsFromFirebase(): Promise<number> {
  let count = 0;
  for (const id of DEMO_MENTOR_IDS) {
    try {
      const docRef = doc(db, "mentors", id);
      await deleteDoc(docRef);
      count++;
    } catch {
      // ignore
    }
  }

  // Also query Firestore for any mentors with demo names and remove them
  try {
    const colRef = collection(db, "mentors");
    const snap = await getDocs(colRef);
    for (const d of snap.docs) {
      const data = d.data() as any;
      if (DEMO_MENTOR_NAMES.includes(data?.name) || DEMO_MENTOR_IDS.includes(d.id)) {
        await deleteDoc(doc(db, "mentors", d.id));
        count++;
      }
    }
  } catch {
    // ignore
  }

  // Clean local storage cache
  const current = getLocalMentors();
  const cleaned = current.filter(
    (m) => !DEMO_MENTOR_IDS.includes(m.id) && !DEMO_MENTOR_NAMES.includes(m.name)
  );
  saveLocalMentors(cleaned);
  return count;
}

/**
 * Fetch all mentors from Firestore with cache fallback (filters out demo mentors)
 */
export async function fetchMentorsFromFirebase(): Promise<FirebaseMentor[]> {
  try {
    const colRef = collection(db, "mentors");
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const list: FirebaseMentor[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as any;
        if (DEMO_MENTOR_IDS.includes(d.id) || DEMO_MENTOR_NAMES.includes(data?.name)) {
          // Asynchronously purge from Firestore in the background
          deleteDoc(doc(db, "mentors", d.id)).catch(() => {});
          return;
        }
        list.push({
          id: d.id,
          name: data?.name || "Faculty Mentor",
          role: data?.role || "Lead Instructor",
          track: data?.track || "Digital Tech",
          experience: data?.experience || "5+ Years Experience",
          bio: data?.bio || "",
          fullBio: data?.fullBio || data?.bio || "",
          skills: Array.isArray(data?.skills) ? data.skills : [],
          mentorshipFocus: Array.isArray(data?.mentorshipFocus) ? data.mentorshipFocus : [],
          image: data?.image || getDefaultMentorAvatar(data?.name),
          badgeBg: data?.badgeBg || getTrackBadgeStyle(data?.track || "").badgeBg,
          gradient: data?.gradient || getTrackBadgeStyle(data?.track || "").gradient,
          active: data?.active !== false,
          order: typeof data?.order === "number" ? data.order : 99,
          email: data?.email || "",
          activeBatches: typeof data?.activeBatches === "number" ? data.activeBatches : 1,
          createdAt: data?.createdAt || new Date().toISOString(),
          updatedAt: data?.updatedAt,
        });
      });
      list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      saveLocalMentors(list);
      return list;
    }
  } catch (err) {
    console.warn("Failed to fetch mentors from Firestore, using cache:", err);
  }
  return getLocalMentors();
}

/**
 * Real-time listener for mentors
 */
export function subscribeMentors(
  callback: (mentors: FirebaseMentor[]) => void
): () => void {
  // 1. Initial fire with local cache (demo mentors already filtered)
  callback(getLocalMentors());

  // Trigger background cleanup of demo mentors
  deleteDemoMentorsFromFirebase().catch(() => {});

  // 2. Listen to custom event for intra-tab updates
  const handleLocalUpdate = (e: Event) => {
    const custom = e as CustomEvent<FirebaseMentor[]>;
    if (custom.detail) {
      callback(custom.detail);
    } else {
      callback(getLocalMentors());
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("dta_mentors_updated", handleLocalUpdate);
  }

  // 3. Connect to Firestore real-time snapshot
  let unsubFirestore = () => {};
  try {
    const colRef = collection(db, "mentors");
    unsubFirestore = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: FirebaseMentor[] = [];
          snapshot.forEach((d) => {
            const data = d.data() as any;
            if (DEMO_MENTOR_IDS.includes(d.id) || DEMO_MENTOR_NAMES.includes(data?.name)) {
              deleteDoc(doc(db, "mentors", d.id)).catch(() => {});
              return;
            }
            list.push({
              id: d.id,
              name: data?.name || "Faculty Mentor",
              role: data?.role || "Lead Instructor",
              track: data?.track || "Digital Tech",
              experience: data?.experience || "5+ Years Experience",
              bio: data?.bio || "",
              fullBio: data?.fullBio || data?.bio || "",
              skills: Array.isArray(data?.skills) ? data.skills : [],
              mentorshipFocus: Array.isArray(data?.mentorshipFocus) ? data.mentorshipFocus : [],
              image: data?.image || getDefaultMentorAvatar(data?.name),
              badgeBg: data?.badgeBg || getTrackBadgeStyle(data?.track || "").badgeBg,
              gradient: data?.gradient || getTrackBadgeStyle(data?.track || "").gradient,
              active: data?.active !== false,
              order: typeof data?.order === "number" ? data.order : 99,
              email: data?.email || "",
              activeBatches: typeof data?.activeBatches === "number" ? data.activeBatches : 1,
              createdAt: data?.createdAt || new Date().toISOString(),
              updatedAt: data?.updatedAt,
            });
          });
          list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
          saveLocalMentors(list);
          callback(list);
        } else {
          const local = getLocalMentors();
          callback(local);
        }
      },
      (err) => {
        console.warn("Firestore mentors onSnapshot error:", err);
      }
    );
  } catch (err) {
    console.warn("Failed to subscribe to mentors Firestore collection:", err);
  }

  return () => {
    if (typeof window !== "undefined") {
      window.removeEventListener("dta_mentors_updated", handleLocalUpdate);
    }
    unsubFirestore();
  };
}

/**
 * Add a new mentor to Firebase and local cache
 */
export async function addMentorToFirebase(
  input: MentorInput
): Promise<FirebaseMentor> {
  const styles = getTrackBadgeStyle(input.track);
  const newId = `mentor-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const item: FirebaseMentor = {
    ...input,
    id: newId,
    image: input.image || getDefaultMentorAvatar(input.name),
    badgeBg: input.badgeBg || styles.badgeBg,
    gradient: input.gradient || styles.gradient,
    active: input.active !== false,
    order: input.order ?? 99,
    createdAt: new Date().toISOString(),
  };

  // 1. Save optimistically to local cache
  const current = getLocalMentors();
  const updated = [...current, item];
  updated.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  saveLocalMentors(updated);

  // 2. Persist to Firestore (strip undefined)
  try {
    const docRef = doc(db, "mentors", newId);
    const firestoreData = Object.fromEntries(
      Object.entries({
        ...item,
        timestamp: Date.now(),
      }).filter(([_, v]) => v !== undefined)
    );
    await setDoc(docRef, firestoreData);
  } catch (err) {
    console.warn("Firestore error adding mentor, saved locally:", err);
  }

  return item;
}

/**
 * Update an existing mentor in Firebase and local cache
 */
export async function updateMentorInFirebase(
  id: string,
  updates: Partial<FirebaseMentor>
): Promise<void> {
  const styles = updates.track ? getTrackBadgeStyle(updates.track) : null;
  const current = getLocalMentors();
  const updated: FirebaseMentor[] = current.map((m): FirebaseMentor => {
    if (m.id !== id) return m;
    const resolvedBadgeBg = updates.badgeBg || (styles ? styles.badgeBg : m.badgeBg);
    const resolvedGradient = updates.gradient || (styles ? styles.gradient : m.gradient);
    const base: FirebaseMentor = {
      ...m,
      ...updates,
      image: updates.image || m.image || getDefaultMentorAvatar(updates.name || m.name),
      updatedAt: new Date().toISOString(),
    };
    if (resolvedBadgeBg) base.badgeBg = resolvedBadgeBg;
    if (resolvedGradient) base.gradient = resolvedGradient;
    return base;
  });
  updated.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  saveLocalMentors(updated);

  try {
    const docRef = doc(db, "mentors", id);
    const firestoreUpdates = Object.fromEntries(
      Object.entries({
        ...updates,
        badgeBg: updates.badgeBg || (styles ? styles.badgeBg : undefined),
        gradient: updates.gradient || (styles ? styles.gradient : undefined),
        updatedAt: new Date().toISOString(),
      }).filter(([_, v]) => v !== undefined)
    );
    await updateDoc(docRef, firestoreUpdates);
  } catch (err) {
    console.warn("Firestore error updating mentor, saved locally:", err);
  }
}

/**
 * Delete a mentor from Firebase and local cache
 */
export async function deleteMentorFromFirebase(id: string): Promise<void> {
  const current = getLocalMentors();
  const updated = current.filter((m) => m.id !== id);
  saveLocalMentors(updated);

  try {
    const docRef = doc(db, "mentors", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn("Firestore error deleting mentor, removed locally:", err);
  }
}

/**
 * Clear all mentors from Firestore and local cache
 */
export async function clearAllMentorsFromFirebase(): Promise<void> {
  const current = getLocalMentors();
  for (const m of current) {
    try {
      const docRef = doc(db, "mentors", m.id);
      await deleteDoc(docRef);
    } catch {
      // ignore
    }
  }
  saveLocalMentors([]);
}

/**
 * Backward compatibility stub (all mentors are created exclusively by admin)
 */
export async function seedDefaultMentorsToFirebase(): Promise<number> {
  return 0;
}

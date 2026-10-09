import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { courses as defaultStaticCourses, type Course } from "@/data/courses";

export const POPULAR_COURSE_CATEGORIES = [
  "Cyber Security",
  "Digital Marketing",
  "Programmatic Advertising",
  "AI & Automation",
  "Full Stack Development",
] as const;

export type PopularCategory = (typeof POPULAR_COURSE_CATEGORIES)[number];

/**
 * Normalizes course category strictly according to course content, title, and slug.
 */
export function normalizeCourseCategory(category?: string, title?: string, slug?: string): string {
  const t = (title || "").toLowerCase();
  const s = (slug || "").toLowerCase();
  const c = (category || "").toLowerCase();

  // 1. Programmatic Advertising
  if (
    t.includes("programmatic") ||
    s.includes("programmatic") ||
    t.includes("adtech") ||
    s.includes("adtech") ||
    c.includes("programmatic") ||
    c.includes("adtech")
  ) {
    return "Programmatic Advertising";
  }

  // 2. Cyber Security
  if (
    t.includes("cyber") ||
    s.includes("cyber") ||
    t.includes("security") ||
    s.includes("security") ||
    t.includes("hacking") ||
    s.includes("hacking") ||
    c.includes("cyber") ||
    c.includes("security")
  ) {
    return "Cyber Security";
  }

  // 3. AI & Automation
  if (
    t.includes("ai &") ||
    t.includes("ai ") ||
    t.includes("automation") ||
    s.includes("ai") ||
    s.includes("automation") ||
    c.includes("ai") ||
    c.includes("automation")
  ) {
    return "AI & Automation";
  }

  // 4. Full Stack Development
  if (
    t.includes("full stack") ||
    t.includes("fullstack") ||
    s.includes("full-stack") ||
    s.includes("fullstack") ||
    c.includes("full stack") ||
    c.includes("fullstack") ||
    t.includes("web development") ||
    s.includes("web-dev")
  ) {
    return "Full Stack Development";
  }

  // 5. Digital Marketing
  if (
    t.includes("marketing") ||
    s.includes("marketing") ||
    t.includes("seo") ||
    s.includes("seo") ||
    c.includes("marketing")
  ) {
    return "Digital Marketing";
  }

  return category || "Digital Marketing";
}

export interface FirebaseCourse {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription?: string;
  about?: {
    description?: string;
    learn?: string[];
    audience?: string[];
    outcomes?: string[];
  };
  duration: string;
  level: string;
  mode?: string;
  certificate?: string;
  instructor: string;
  price: string;
  highlights: string[];
  syllabus?: { module: string; title: string; topics: string[] }[];
  faqs?: { question: string; answer: string }[];
  students: number;
  active: boolean;
  featured: boolean;
  image?: string;
  createdAt?: string | number | null;
  updatedAt?: string | number | null;
}

const LOCAL_STORAGE_KEY = "digital_tech_courses_db";

// Helper: Convert static Course from courses.ts into FirebaseCourse shape
function mapStaticCourse(c: Course): FirebaseCourse {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    category: normalizeCourseCategory(c.category, c.title, c.slug),
    description: c.description,
    longDescription: c.longDescription,
    about: {
      description: c.overview?.description || c.longDescription || c.description,
      learn: c.overview?.learn || c.highlights || [],
      audience: c.overview?.audience || [],
      outcomes: c.overview?.outcomes || [],
    },
    duration: c.duration,
    level: c.level,
    mode: c.mode || "Classroom & Live Online",
    certificate: c.certificate || "Course completion certificate",
    instructor: c.instructors?.[0]?.name || "Sai Rama",
    price: c.pricing?.fee || "₹24,999",
    highlights: c.highlights || [],
    syllabus: c.syllabus || [],
    faqs: c.faqs || [],
    students: 150,
    active: true,
    featured: true,
    image: c.image || "",
    createdAt: "2026-01-01T00:00:00.000Z",
  };
}

// Get initial seed courses
export function getDefaultCoursesList(): FirebaseCourse[] {
  return defaultStaticCourses.map(mapStaticCourse);
}

export const DEMO_COURSE_IDS = [
  "digital-marketing",
  "programmatic-advertising",
  "cyber-security",
  "advanced-seo",
  "web-development",
];

// Get courses from local storage cache
export function getLocalCachedCourses(): FirebaseCourse[] {
  const defaults = getDefaultCoursesList();
  if (typeof window === "undefined") return defaults;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      return defaults;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const filtered = parsed
        .filter(
          (c: any) =>
            c &&
            c.id !== "full-stack-java" &&
            c.slug !== "full-stack-java" &&
            !c.title?.toLowerCase().includes("full stack java") &&
            c.id !== "testing",
        )
        .map((c: any) => ({
          ...c,
          category: normalizeCourseCategory(c.category, c.title, c.slug),
        }));

      // Merge in any missing default courses (e.g. programmatic advertising)
      for (const def of defaults) {
        if (!filtered.some((c: any) => c.slug === def.slug || c.id === def.id)) {
          filtered.push(def);
        }
      }
      return filtered;
    }
    return defaults;
  } catch {
    return defaults;
  }
}

// Save courses to local storage cache
export function saveLocalCachedCourses(coursesList: FirebaseCourse[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(coursesList));
  } catch (err) {
    console.warn("Failed to write to localStorage course cache:", err);
  }
}

/**
 * Delete all demo / dummy courses from Firebase Firestore and local cache
 */
export async function deleteDemoCoursesFromFirebase(): Promise<number> {
  let count = 0;
  for (const id of DEMO_COURSE_IDS) {
    try {
      const docRef = doc(db, "courses", id);
      await deleteDoc(docRef);
      count++;
    } catch {
      // ignore
    }
  }
  const cached = getLocalCachedCourses();
  const cleaned = cached.filter(
    (c) => !DEMO_COURSE_IDS.includes(c.id) && !DEMO_COURSE_IDS.includes(c.slug),
  );
  saveLocalCachedCourses(cleaned);
  return count;
}

/**
 * Clear all courses from Firestore and local cache
 */
export async function clearAllCoursesFromFirebase(): Promise<void> {
  const cached = getLocalCachedCourses();
  for (const c of cached) {
    try {
      const docRef = doc(db, "courses", c.id);
      await deleteDoc(docRef);
    } catch {
      // ignore
    }
  }
  saveLocalCachedCourses([]);
}

/**
 * Fetch all courses from Firebase Firestore.
 * Merges with local cache / defaults if Firestore is empty or offline.
 */
const autoHealedDocIds = new Set<string>();

export async function getCoursesFromFirebase(): Promise<FirebaseCourse[]> {
  try {
    const colRef = collection(db, "courses");
    const snapshot = await getDocs(colRef);

    if (!snapshot.empty) {
      const coursesFromDb: FirebaseCourse[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const rawCategory = data["category"] || "";
        const rawTitle = data["title"] || "Untitled Course";
        const rawSlug = data["slug"] || docSnap.id;
        const category = normalizeCourseCategory(rawCategory, rawTitle, rawSlug);

        // Auto-heal in Firestore if category was stored incorrectly (once per document)
        if (
          rawCategory !== category &&
          (category === "Programmatic Advertising" || category === "Cyber Security") &&
          !autoHealedDocIds.has(docSnap.id)
        ) {
          autoHealedDocIds.add(docSnap.id);
          updateDoc(doc(db, "courses", docSnap.id), { category }).catch(() => {});
        }

        return {
          id: docSnap.id,
          slug: rawSlug,
          title: rawTitle,
          category,
          description: data["description"] || "",
          longDescription: data["longDescription"] || data["description"] || "",
          about: data["about"] || {
            description: data["longDescription"] || data["description"] || "",
            learn: Array.isArray(data["highlights"]) ? data["highlights"] : [],
            audience: [],
            outcomes: [],
          },
          duration: data["duration"] || "12 Weeks",
          level: data["level"] || "Beginner to Advanced",
          mode: data["mode"] || "Live Online & Classroom",
          certificate: data["certificate"] || "Certificate of Completion",
          instructor: data["instructor"] || "Expert Trainer",
          price: data["price"] || "₹24,999",
          highlights: Array.isArray(data["highlights"]) ? data["highlights"] : [],
          syllabus: Array.isArray(data["syllabus"]) ? data["syllabus"] : [],
          faqs: Array.isArray(data["faqs"]) ? data["faqs"] : [],
          students: typeof data["students"] === "number" ? data["students"] : 0,
          active: data["active"] !== false,
          featured: data["featured"] === true,
          image: data["image"] || "",
          createdAt: data["createdAt"] ? String(data["createdAt"]) : Date.now(),
        };
      });

      // Save to local cache as backup
      saveLocalCachedCourses(coursesFromDb);
      return coursesFromDb;
    }
  } catch (err) {
    console.warn("Firestore read failed, using local cached courses:", err);
  }

  // Fallback to local cache or defaults
  return getLocalCachedCourses();
}

/**
 * Real-time listener for courses from Firestore.
 * Calls onUpdate whenever database changes.
 */
export function subscribeCourses(
  onUpdate: (courses: FirebaseCourse[]) => void,
  onError?: (error: unknown) => void,
): () => void {
  try {
    const colRef = collection(db, "courses");
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (!snapshot.empty) {
          const list: FirebaseCourse[] = snapshot.docs
            .map((docSnap) => {
              const data = docSnap.data();
              const rawCategory = data["category"] || "";
              const rawTitle = data["title"] || "Untitled Course";
              const rawSlug = data["slug"] || docSnap.id;
              const category = normalizeCourseCategory(rawCategory, rawTitle, rawSlug);

              // Auto-heal in Firestore if category was stored incorrectly (once per document)
              if (
                rawCategory !== category &&
                (category === "Programmatic Advertising" || category === "Cyber Security") &&
                !autoHealedDocIds.has(docSnap.id)
              ) {
                autoHealedDocIds.add(docSnap.id);
                updateDoc(doc(db, "courses", docSnap.id), { category }).catch(() => {});
              }

              return {
                id: docSnap.id,
                slug: rawSlug,
                title: rawTitle,
                category,
                description: data["description"] || "",
                longDescription: data["longDescription"] || data["description"] || "",
                about: data["about"] || {
                  description: data["longDescription"] || data["description"] || "",
                  learn: Array.isArray(data["highlights"]) ? data["highlights"] : [],
                  audience: [],
                  outcomes: [],
                },
                duration: data["duration"] || "12 Weeks",
                level: data["level"] || "Beginner to Advanced",
                mode: data["mode"] || "Live Online & Classroom",
                certificate: data["certificate"] || "Certificate of Completion",
                instructor: data["instructor"] || "Expert Trainer",
                price: data["price"] || "₹24,999",
                highlights: Array.isArray(data["highlights"]) ? data["highlights"] : [],
                syllabus: Array.isArray(data["syllabus"]) ? data["syllabus"] : [],
                faqs: Array.isArray(data["faqs"]) ? data["faqs"] : [],
                students: typeof data["students"] === "number" ? data["students"] : 0,
                active: data["active"] !== false,
                featured: data["featured"] === true,
                image: data["image"] || "",
                createdAt: data["createdAt"] ? String(data["createdAt"]) : Date.now(),
              };
            })
            .filter(
              (c) =>
                c.id !== "full-stack-java" &&
                c.slug !== "full-stack-java" &&
                !c.title?.toLowerCase().includes("full stack java") &&
                c.id !== "testing",
            );
          saveLocalCachedCourses(list);
          onUpdate(list);
        } else {
          // Empty collection in Firestore, fallback to cached
          onUpdate(getLocalCachedCourses());
        }
      },
      (error) => {
        console.warn("Firestore subscription error, falling back to cache:", error);
        onUpdate(getLocalCachedCourses());
        if (onError) onError(error);
      },
    );

    return unsubscribe;
  } catch (err) {
    console.warn("Could not establish onSnapshot, using cache:", err);
    onUpdate(getLocalCachedCourses());
    return () => {};
  }
}

/**
 * Add a new course to Firebase Firestore and local backup.
 */
export async function addCourseToFirebase(
  courseInput: Omit<FirebaseCourse, "id">,
): Promise<FirebaseCourse> {
  const newId =
    courseInput.slug?.trim() ||
    `course-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

  const newCourse: FirebaseCourse = {
    ...courseInput,
    id: newId,
    students: courseInput.students ?? 0,
    active: courseInput.active !== false,
    featured: courseInput.featured ?? true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  // 1. Write to local cache first for instant optimistic response
  const cached = getLocalCachedCourses();
  const updatedList = [
    newCourse,
    ...cached.filter((c) => c.id !== newCourse.id && c.slug !== newCourse.slug),
  ];
  saveLocalCachedCourses(updatedList);

  // 2. Persist to Firestore
  try {
    const docRef = doc(db, "courses", newCourse.id);
    const firestoreData = Object.fromEntries(
      Object.entries({
        ...newCourse,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }).filter(([_, v]) => v !== undefined),
    );
    await setDoc(docRef, firestoreData);
  } catch (err) {
    console.warn("Could not save to Cloud Firestore directly (will remain in local cache):", err);
  }

  return newCourse;
}

/**
 * Update an existing course in Firebase Firestore and local backup.
 */
export async function updateCourseInFirebase(
  id: string,
  updates: Partial<FirebaseCourse>,
): Promise<void> {
  // Update local cache
  const cached = getLocalCachedCourses();
  const updatedList = cached.map((c) =>
    c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c,
  );
  saveLocalCachedCourses(updatedList);

  // Update Firestore
  try {
    const docRef = doc(db, "courses", id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.warn("Failed to update course in Firestore:", err);
  }
}

/**
 * Delete a course from Firebase Firestore and local backup.
 */
export async function deleteCourseFromFirebase(id: string): Promise<void> {
  // Update local cache
  const cached = getLocalCachedCourses();
  const updatedList = cached.filter((c) => c.id !== id);
  saveLocalCachedCourses(updatedList);

  // Delete from Firestore
  try {
    const docRef = doc(db, "courses", id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn("Failed to delete course from Firestore:", err);
  }
}

/**
 * Seed default courses into Firebase Firestore.
 */
export async function seedDefaultCoursesToFirebase(): Promise<{
  count: number;
  error?: string | undefined;
}> {
  const defaults = getDefaultCoursesList();
  let successCount = 0;
  let lastError: string | undefined;

  for (const c of defaults) {
    try {
      const docRef = doc(db, "courses", c.id);
      await setDoc(docRef, {
        ...c,
        updatedAt: Date.now(),
      });
      successCount++;
    } catch (err: any) {
      lastError = err?.message || String(err);
      console.warn(`Failed to seed ${c.id} to Firestore:`, err);
    }
  }

  // Ensure local cache has all defaults
  saveLocalCachedCourses(defaults);

  return lastError ? { count: successCount, error: lastError } : { count: successCount };
}

/**
 * Find course by slug from cache or Firestore.
 */
export async function getCourseBySlug(slug: string): Promise<FirebaseCourse | null> {
  const cached = getLocalCachedCourses();
  const found = cached.find((c) => c.slug === slug || c.id === slug);
  if (found) return found;

  try {
    const docRef = doc(db, "courses", slug);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as FirebaseCourse;
    }
  } catch (err) {
    console.warn("Failed to fetch course by slug from Firestore:", err);
  }

  return null;
}

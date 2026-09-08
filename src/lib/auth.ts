export interface AdminSession {
  email: string;
  role: string;
  authenticatedAt: number;
  expiresAt: number;
}

const STORAGE_KEY = "admin_session_data";
const AUTH_FLAG_KEY = "admin_authenticated";

export function saveAdminSession(token: string, email: string) {
  if (typeof window === "undefined") return;
  try {
    const session: AdminSession = {
      email,
      role: "SUPER_ADMIN",
      authenticatedAt: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };
    localStorage.setItem(AUTH_FLAG_KEY, "true");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    localStorage.setItem("admin_token", token);
  } catch (err) {
    console.error("Failed to save admin session:", err);
  }
}

export function getAdminSession(): AdminSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      if (localStorage.getItem(AUTH_FLAG_KEY) === "true") {
        return {
          email: "sunilneelakantams@gmail.com",
          role: "SUPER_ADMIN",
          authenticatedAt: Date.now(),
          expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        };
      }
      return null;
    }
    const session = JSON.parse(raw) as AdminSession;
    if (Date.now() > session.expiresAt) {
      clearAdminSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function isUserAdminAuthenticated(): boolean {
  return getAdminSession() !== null;
}

export function clearAdminSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_FLAG_KEY);
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("admin_token");
}

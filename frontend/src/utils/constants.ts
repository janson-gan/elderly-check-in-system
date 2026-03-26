// ==================================
// ROLES
// ==================================
export const ROLES = {
  SENIOR: "senior",
  FAMILY: "family",
  ADMIN: "admin",
} as const;

// ==================================
// ROUTES
// ==================================
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  CHECKIN: "/checkin",
  HISTORY: "/history",
  EMERGENCY_CONTACTS: "/emergency-contacts",
  FAMILY_DASHBOARD: "/family-dashboard",
  ADMIN_DASHBOARD: "/admin-dashboard",
} as const;

// ====================================
// LOCAL STORAGE KEYS
// ====================================
export const LOCAL_STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
} as const;

// ====================================
// MOOD
// ====================================
export const MOOD = {
  GOOD: "good",
  OKAY: "okay",
  UNWELL: "unwell",
} as const;



// ================================
// HTTP STATUS CODES
// ================================
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// ================================
// USER ROLES
// ================================
export const ROLES = {
  SENIOR: "senior",
  FAMILY: "family",
  ADMIN: "admin",
} as const;

// ================================
// JWT
// ================================
export const JWT = {
  DEFAULT_EXPIRED_IN: "7d",
  BEARER_PREFIX: "Bearer ",
} as const;

// ================================
// BCRYPT
// ================================
export const BCRYPT = {
  SALT_ROUNDS: 12,
} as const;

// ================================
// REMINDER DEFAULT
// ================================
export const DEFAULT_REMINDER = {
  TIME: "09:00:00",
  GRACE_PERIOD_MINUTES: 60,
} as const;

// ================================
// MOOD
// ================================
export const MOOD = {
  GOOD: "good",
  OKAY: "okay",
  UNWELL: "unwell",
} as const;

// ================================
// NOTIFICATOION TYPES
// ================================
export const NOTIFICATOION_TYPE = {
  MISSED_CHECKIN: "missed_checkin",
  EMERGENCY: "emergency",
  REMINDER: "reminder",
} as const;

// =================================
// MESSAGES
// =================================
export const MESSAGES = {
  AUTH: {
    EMAIL_EXISTS: "An account with this email already exists",
    ACCOUNT_CREATED: "Account created successfully",
    LOGIN_SUCCESS: "Login successful",
    INVALID_CREDENTIALS: "Invalid email or password",
    ACCOUNT_DEACTIVATED:
      "Your account has been deactivated. Please contact support.",
    USER_NOT_FOUND: "User not found",
    NO_TOKEN: "Access denied. No token provided.",
    INVALID_TOKEN: "Invalid or expired token.",
    NOT_AUTHENTICATED: "Access denied. Not authenticated.",
  },
  SERVER: {
    RUNNING: "Elderly Check-in System API is running",
    INTERNAL_ERROR: "Internal server error",
    FAILED_CREATE_ACCOUNT: "Failed to create account. Please try again.",
    FAILED_CREATE_SENIOR: "Failed to create senior profile. Please try again.",
  },
  VALIDATION: {
    FAILED: "Validation failed",
  },
} as const;

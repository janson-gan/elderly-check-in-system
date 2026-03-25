import { extend } from "zod/mini";

// Role type for authorise
export type Role = "admin" | "family" | "senior"

// Properties store inside JWT payload
export interface JwtPayload {
  userId: number;
  email: string;
  role: "senior" | "family" | "admin";
}

// Shape of data expected during registering
export interface RegisterInput {
  email: string;
  password: string;
  role: "senior" | "family" | "admin";
  first_name: string;
  last_name: string;
  phone?: string;
}

// Shape of data during logging in
export interface LoginInput {
  email: string;
  password: string;
}

// Include jwt payload in every request
export interface AuthenticatedRequest extends Express.Request {
  user?: JwtPayload;
}

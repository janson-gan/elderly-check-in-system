import axiosInstance from "./axiosInstance";
import type {
  LoginRequest,
  AuthResponse,
  User,
  RegisterRequest,
} from "../types";

// All APIs
export const authApi = {
  // Login
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      "/api/auth/login",
      data,
    );
    return response.data;
  },

  // Register
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post<AuthResponse>(
      "/api/auth/register",
      data,
    );
    return response.data;
  },

  // Get current user
  getMe: async (): Promise<{ success: boolean; user: User }> => {
    const response = await axiosInstance.get("/api/auth/getMe");
    return response.data;
  },
};

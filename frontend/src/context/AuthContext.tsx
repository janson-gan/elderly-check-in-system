import { createContext, useState, useEffect, type ReactNode } from "react";
import { type User } from "../types";
import { authApi } from "../api/auth.api";
import { LOCAL_STORAGE_KEYS, ROLES } from "../utils/constants";

// ===================================
// TYPES
// ===================================
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isSenior: boolean;
  isFamily: boolean;
  isAdmin: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

// ===================================
// CREATE CONTEXT
// ===================================
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ===================================
// PROVIDER
// ===================================
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // On app load - check if token exists in local storage
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);

      if (storedToken && storedUser) {
        try {
          // Verify token is still valid in the backend
          const response = await authApi.getMe();
          setToken(storedToken);
          setUser(response.user);
        } catch {
          // Token expired or invalid - clear storage
          localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
          localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  //Login - save token and user
  const login = (newToken: string, newUser: User) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, newToken);
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!token && !!user, // !! convert value to boolean
    isSenior: user?.role === ROLES.SENIOR,
    isFamily: user?.role === ROLES.FAMILY,
    isAdmin: user?.role === ROLES.ADMIN,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

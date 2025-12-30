"use client";

import { createContext, useContext, ReactNode } from "react";
import { useCurrentUser } from "@/hooks/useAuthentication";
import { User, UserRole } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: userResponse, isLoading } = useCurrentUser();

  const userData = userResponse;

  const value: AuthContextType = {
    user: userData || null,
    isLoading,
    isAuthenticated: !!userData,
    isAdmin: (userData?.role as UserRole) === "ADMIN",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

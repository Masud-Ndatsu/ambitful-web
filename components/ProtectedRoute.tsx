"use client";
import { useAuth } from "@/hooks/useAuthentication";
import { UserRole } from "@/app/types";
import { redirect } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/auth/login",
}: ProtectedRouteProps) {
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect(redirectTo);
    }

    if (
      !isLoading &&
      isAuthenticated &&
      requiredRole &&
      user &&
      user.role !== requiredRole
    ) {
      redirect("/x/opportunities");
    }
  }, [isLoading, isAuthenticated, user, requiredRole, redirectTo]);

  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole && user && user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}

interface AdminRouteProps {
  children: React.ReactNode;
}

export function AdminRoute({ children }: AdminRouteProps) {
  return <ProtectedRoute requiredRole="ADMIN">{children}</ProtectedRoute>;
}

interface ModeratorRouteProps {
  children: React.ReactNode;
}

export function ModeratorRoute({ children }: ModeratorRouteProps) {
  return <ProtectedRoute requiredRole="MODERATOR">{children}</ProtectedRoute>;
}

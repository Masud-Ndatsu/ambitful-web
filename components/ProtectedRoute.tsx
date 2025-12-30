"use client";
import { useAuth } from "@/hooks/useAuthentication";
import { UserRole } from "@/app/types";
import { redirect } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  redirectTo?: string;
  fallback?: React.ReactNode;
}

export function ProtectedRoute({
  children,
  requiredRole,
  redirectTo = "/auth/login",
  fallback,
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

  if (isLoading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )
    );
  }

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
  fallback?: React.ReactNode;
}

export function AdminRoute({ children, fallback }: AdminRouteProps) {
  return (
    <ProtectedRoute requiredRole="ADMIN" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

interface ModeratorRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ModeratorRoute({ children, fallback }: ModeratorRouteProps) {
  return (
    <ProtectedRoute requiredRole="MODERATOR" fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

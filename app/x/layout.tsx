"use client";
import { SideNavBar } from "@/components/SideBar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import React from "react";
import { useAuth } from "@/hooks/useAuthentication";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const { user, isAuthenticated } = useAuth();

  return (
    <ProtectedRoute
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <main className="min-h-screen max-h-screen text-[2rem] overflow-hidden flex">
        <SideNavBar isAuth={isAuthenticated} user={user} />
        <section className="flex-1 bg-[#F6F8FB]">{children}</section>
      </main>
    </ProtectedRoute>
  );
}

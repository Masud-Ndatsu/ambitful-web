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
    <ProtectedRoute>
      <main className="min-h-screen max-h-screen text-[2rem] overflow-hidden flex">
        <SideNavBar isAuth={isAuthenticated} user={user} />
        <section className="flex-1 bg-[#F6F8FB]">{children}</section>
      </main>
    </ProtectedRoute>
  );
}

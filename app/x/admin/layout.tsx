"use client";
import { AdminRoute } from "@/components/ProtectedRoute";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <AdminRoute
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking admin access...</p>
          </div>
        </div>
      }
    >
      {children}
    </AdminRoute>
  );
}
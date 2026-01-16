"use client";
import { AdminRoute } from "@/components/ProtectedRoute";
import { AdminTopBar } from "../components/AdminTopBar";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <AdminRoute>
      <div className="h-full flex flex-col overflow-hidden">
        <AdminTopBar />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </AdminRoute>
  );
}

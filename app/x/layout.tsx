import { SideNavBar } from "@/components/SideBar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <main className="min-h-screen max-h-screen text-[2rem] overflow-hidden flex">
      <SideNavBar />
      <section className="flex-1">{children}</section>
    </main>
  );
}

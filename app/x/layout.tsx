import { SideNavBar } from "@/components/SideBar";
import { getCurrentUser, User } from "@/actions/auth";
import React from "react";

interface Props {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const userResponse = await getCurrentUser();
  const isAuth = userResponse?.success || false;
  const user = userResponse?.data as User;

  return (
    <main className="min-h-screen max-h-screen text-[2rem] overflow-hidden flex">
      <SideNavBar isAuth={isAuth} user={user} />
      <section className="flex-1 bg-[#F6F8FB]">{children}</section>
    </main>
  );
}

"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { usePathname } from "next/navigation";
import React from "react";

export const AdminTopBar = () => {
  const pathname = usePathname();

  const activeNavItem = React.useMemo(() => {
    if (pathname.includes("/x/admin/dashboard")) {
      return "Dashboard";
    }
    if (pathname.includes("/x/admin/opportunities")) {
      return "Manage Opportunities";
    }
    if (pathname.includes("/x/admin/ai-draft")) {
      return "AI Drafts";
    }
    if (pathname.includes("/x/admin/access-control")) {
      return "Access Control";
    }
    if (pathname.includes("/x/admin/analytics")) {
      return "Analytics";
    }
    if (pathname.includes("/x/admin/settings")) {
      return "Settings";
    }
    return "Dashboard";
  }, [pathname]);
  return (
    <header className="h-[7.9rem] bg-foreground text-background flex items-center justify-between px-12">
      <h2 className="text-[2rem] font-bold leading-[4.112rem]">
        {activeNavItem}
      </h2>
      <div className="flex gap-4 items-center">
        <span>
          <Bell />
        </span>
        <div className="flex gap-6">
          <Avatar className="w-[3.2rem] h-[3.2rem]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-[#0F1729] text-[1.4rem] font-medium leading-8">
              Admin Tolu
            </h3>
            <p className="text-[#65758B] text-[1.2rem] font-medium leading-[1.6rem]">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

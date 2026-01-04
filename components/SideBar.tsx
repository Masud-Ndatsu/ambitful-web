// @typescript-eslint/no-explicit-any

"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  ChevronLeft,
  Briefcase,
  FileText,
  User as UserIcon,
  Settings,
  Layout,
  Cpu,
  Shield,
  BarChart2,
  LogOut,
  Bot,
  ListChecks,
} from "lucide-react";
import { Logo } from "./Logo";
import { useMobile } from "@/hooks/useMobile";
import { usePathname } from "next/navigation";
import { User } from "@/types";
import { useLogout } from "@/hooks/useAuthentication";

interface SideBarItemProps {
  href: string;
  icon: React.ComponentType<any>;
  label: string;
  isExpanded: boolean;
  pathname: string;
  isMobile: boolean;
}

const SideBarItem = ({
  href,
  icon: Icon,
  label,
  isExpanded,
  pathname,
  isMobile,
}: SideBarItemProps) => {
  const isActive = pathname.includes(href.toLowerCase());

  return (
    <li>
      <Link
        href={href}
        className={`
          text-[1.8rem] tracking-[1.5] 
          flex items-center rounded-4xl 
          transition-all duration-200 ${
            isActive
              ? "bg-[#03624C] text-white"
              : "text-[#03624C] hover:bg-gray-100/10"
          } ${isExpanded ? "py-3 px-4 gap-3" : "p-6 justify-center"}`}
      >
        <Icon
          className={`${
            isExpanded ? "w-5! h-5!" : isMobile ? "w-6! h-6!" : "w-6! h-6!"
          } shrink-0`}
          color={isActive ? "white" : "#03624C"}
        />
        {isExpanded && <span className="font-medium">{label}</span>}
      </Link>
    </li>
  );
};

const LogoutButton = ({
  isExpanded,
  isMobile,
}: {
  isExpanded: boolean;
  isMobile: boolean;
}) => {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <li>
      <button
        onClick={handleLogout}
        disabled={logoutMutation.isPending}
        className={`
          text-[1.8rem] tracking-[1.5] 
          flex items-center rounded-4xl 
          transition-all duration-200 
          text-[#03624C] hover:bg-gray-100/10 w-full
          ${isExpanded ? "py-3 px-4 gap-3" : "p-6 justify-center"}
          ${logoutMutation.isPending ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <LogOut
          className={`${
            isExpanded ? "w-5! h-5!" : isMobile ? "w-6! h-6!" : "w-6! h-6!"
          } shrink-0`}
          color="#03624C"
        />
        {isExpanded && (
          <span className="font-medium">
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </span>
        )}
      </button>
    </li>
  );
};

interface SideNavBarProps {
  isAuth: boolean;
  user: User | null;
}

export const SideNavBar = ({ user }: SideNavBarProps) => {
  const isMobile = useMobile(1024);
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const isAdmin = user?.role === "ADMIN" || user?.role === "MODERATOR";
  console.log({ user });

  return (
    <aside
      className={`
        min-h-screen h-full bg-foreground 
        text-background font-walsheim
         transition-all duration-200 relative inset-y-0
         ${isExpanded ? "w-86" : "w-32"} ${isExpanded ? "p-6" : "p-4"}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="
        absolute -right-3 top-6 bg-[#03624C]
      text-white rounded-full p-1.5 hover:bg-[#024d3a]
       transition-colors z-10 shadow-md"
        aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isExpanded ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {/* Logo */}
      <div
        className={`${isExpanded ? "block" : "hidden"} ${
          isExpanded ? "px-2 mb-6 overflow-hidden" : ""
        }`}
      >
        <Logo size="sidebar" className="truncate" />
      </div>

      {/* Compact Logo/Icon when collapsed */}
      {!isExpanded && (
        <div
          className="
        h-12 w-12 bg-[#03624C] text-white 
        rounded-lg grid place-items-center 
        text-sm font-bold mb-6 mx-auto"
        >
          A
        </div>
      )}

      <nav className="flex flex-col h-full">
        <ul
          className={`${
            isExpanded ? "mt-12" : "mt-12"
          } grid gap-3 text-[#03624C] ${
            isExpanded ? "text-[1.8rem]" : "text-[1.6rem]"
          } flex-1`}
        >
          {isAdmin ? (
            <>
              <SideBarItem
                href="/x/admin/dashboard"
                icon={Layout}
                label="Dashboard"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
              <SideBarItem
                href="/x/admin/opportunities"
                icon={Briefcase}
                label="Opportunities"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
              <SideBarItem
                href="/x/admin/ai-draft"
                icon={Cpu}
                label="AI Drafts"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
              <SideBarItem
                href="/x/admin/access-control"
                icon={Shield}
                label="Access Control"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
              <SideBarItem
                href="/x/admin/crawl-jobs"
                icon={ListChecks}
                label="Crawl Jobs"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
              <SideBarItem
                href="/x/admin/analytics"
                icon={BarChart2}
                label="Analytics"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
              <SideBarItem
                href="/x/admin/settings"
                icon={Settings}
                label="Settings"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
            </>
          ) : (
            <>
              <SideBarItem
                href="/x/opportunities"
                icon={Briefcase}
                label="Opportunities"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
              <SideBarItem
                href="/x/agent"
                icon={Bot}
                label="AI Agent"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
              <SideBarItem
                href="/x/resume"
                icon={FileText}
                label="Resume"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
              <SideBarItem
                href="/x/profile"
                icon={UserIcon}
                label="Profile"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
              <SideBarItem
                href="/x/settings"
                icon={Settings}
                label="Settings"
                isExpanded={isExpanded}
                pathname={pathname}
                isMobile={isMobile}
              />
            </>
          )}
        </ul>

        <ul className="mt-auto mb-4">
          <LogoutButton isExpanded={isExpanded} isMobile={isMobile} />
        </ul>
      </nav>
    </aside>
  );
};

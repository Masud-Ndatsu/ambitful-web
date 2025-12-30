"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { User } from "@/types";
import { useLogout } from "@/hooks/useAuthentication";

interface Props {
  isAuth?: boolean;
  user?: User | null;
}

export const TopBar = ({ isAuth, user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const logoutMutation = useLogout();

  const filters = [
    { id: 1, label: "Recommended", count: null },
    { id: 2, label: "Saved", count: 3 },
    { id: 3, label: "Like", count: 12 },
    { id: 4, label: "Applied", count: 5 },
    { id: 5, label: "Draft", count: 2 },
  ];

  const activeNavItem = React.useMemo(() => {
    if (pathname.includes("/opportunities")) {
      return "Opportunities";
    }
    if (pathname.includes("/resume")) {
      return "Resume";
    }
    if (pathname.includes("/profile")) {
      return "Profile";
    }
    if (pathname.includes("/settings")) {
      return "Settings";
    }
    return "Opportunities";
  }, [pathname]);

  const isOpportunityTab = activeNavItem.toLowerCase() === "opportunities";

  console.log({ user, isAuth });

  return (
    <>
      <nav className="hidden lg:flex h-[7.9rem] w-full text-background bg-white items-center justify-between gap-12 py-8 px-10">
        <div className="flex items-center gap-12">
          <h2 className="font-bold text-[2rem] leading-[41.12px] font-manrope uppercase">
            {activeNavItem}
          </h2>
          {isOpportunityTab && (
            <ul className="text-[1.3rem] flex gap-12 overflow-x-auto">
              <li className="py-[0.8rem] px-[1.4rem] border rounded-4xl bg-background text-foreground">
                Recommended
              </li>
              <li className="py-[0.8rem] px-[1.4rem] flex items-center gap-[5px] border rounded-4xl">
                Saved
                <span className="block h-[1.3rem] w-[1.3rem]  bg-[#0000004D] rounded-full"></span>
              </li>
              <li className="py-[0.8rem] px-[1.4rem] flex items-center gap-[5px] border rounded-4xl">
                Like
                <span className="block h-[1.3rem] w-[1.3rem]  bg-[#0000004D] rounded-full"></span>
              </li>
              <li className="py-[0.8rem] px-[1.4rem] flex items-center gap-[5px] border rounded-4xl">
                Applied
                <span className="block h-[1.3rem] w-[1.3rem]  bg-[#0000004D] rounded-full"></span>
              </li>
              <li className="py-[0.8rem] px-[1.4rem] flex items-center gap-[5px] border rounded-4xl">
                Draft
                <span className="block h-[1.3rem] w-[1.3rem]  bg-[#0000004D] rounded-full"></span>
              </li>
            </ul>
          )}
        </div>
        {isAuth && user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-primary text-white">
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="text-[1.4rem] font-medium">{user.name}</p>
                <p className="text-[1.2rem] text-gray-600 capitalize">
                  {user.role.toLowerCase()}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-medium text-[1.4rem]">{user.name}</p>
                    <p className="text-[1.2rem] text-gray-600">
                      {user.email.substring(0, 10)}
                    </p>
                  </div>
                  <div className="py-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        router.push("/x/profile");
                      }}
                      className="w-full text-left px-4 py-2 text-[1.3rem] hover:bg-gray-50"
                    >
                      Profile Settings
                    </button>
                    <Button
                      onClick={() => {
                        setShowUserMenu(false);
                        logoutMutation.mutate();
                      }}
                      loading={logoutMutation.isPending}
                      variant="ghost"
                      className="w-full justify-start px-4 py-2 text-[1.3rem] text-red-600 hover:bg-gray-50 h-auto"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div>
            <Button
              className="border border-primary font-medium text-[1.8rem] px-6 py-3 rounded-4xl uppercase justify-self-end"
              variant={"secondary"}
              onClick={() => router.push("/auth/login")}
            >
              Sign In
            </Button>
          </div>
        )}
      </nav>

      {/* Mobile */}
      <div className="lg:hidden sticky top-0 z-40 bg-white text-background! shadow-sm">
        <div className="flex items-center justify-between px-4 py-6 border-b">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-[1.8rem] font-manrope">
              Opportunities
            </h1>
            <div className="text-[1.2rem] px-2 py-1 bg-gray-100 rounded-full">
              {filters.reduce((acc, f) => acc + (f.count || 0), 0)} total
            </div>
          </div>

          <button className="p-2 rounded-md" aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </>
  );
};

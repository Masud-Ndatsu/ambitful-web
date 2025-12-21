"use client";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Logo } from "@/components/Logo";
import { User } from "@/actions/auth";

interface Props {
  isAuth: boolean;
  user: User | null;
}

export const TopBar = ({ isAuth, user }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = useState("Recommended");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  console.log({ user, isAuth });

  return (
    <>
      <nav className="hidden lg:flex h-[7.9rem] w-full text-background bg-white items-center justify-between gap-12 py-8 px-10">
        <div className="flex items-center gap-12">
          <h2 className="font-bold text-[2rem] leading-[41.12px] font-manrope uppercase">
            {activeNavItem}
          </h2>
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
        </div>
        {isAuth && user ? null : (
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

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 rounded-md"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed  inset-0 bg-black/80 z-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer from right */}
          <div className="fixed top-0 inset-y-0 right-0 w-[50%] bg-secondary text-background z-50 lg:hidden transform transition-transform duration-300">
            <Logo isMobile className="ml-8" />
            {/* Filter Navigation */}
            <nav className="p-6">
              <div className="space-y-3">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`w-full text-left px-4 py-3 rounded-lg text-[1.4rem] font-medium flex items-center justify-between transition-colors ${
                      activeFilter === filter.label
                        ? "bg-[#03624C] text-white"
                        : "text-[#03624C] hover:bg-gray-100/10"
                    }`}
                    onClick={() => {
                      setActiveFilter(filter.label);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span>{filter.label}</span>
                    {filter.count && (
                      <span
                        className={`text-[1.2rem] px-2 py-1 rounded-full ${
                          activeFilter === filter.label
                            ? "bg-white/20"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {filter.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Sign In Button */}
              <div className="mt-8 pt-6 border-t border-gray-200/20">
                <Button
                  className="w-full text-[1.4rem] px-4 py-3 rounded-full border border-primary"
                  variant="secondary"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push("/auth/login");
                  }}
                >
                  Sign In
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
};

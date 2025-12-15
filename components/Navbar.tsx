"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { MessageCircle, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Desktop Navbar */}
      <nav className="max-w-[158.6rem] mx-auto bg-secondary rounded-2xl w-full hidden lg:flex items-center p-8 justify-between">
        <Link href={"/"} className="font-bold text-[#03624C] text-[3.8rem]">
          Ambitful.ai
        </Link>

        <ul className="flex justify-between item-center gap-8 text-background text-[1.6rem]">
          <li>
            <Link href="/" className="text-[1.8rem]">
              Home
            </Link>
          </li>

          <li>
            <Link href="/" className="text-[1.8rem]">
              Opportunities
            </Link>
          </li>

          <li>
            <Link href="/about" className="text-[1.8rem]">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/blogs" className="text-[1.8rem]">
              Blog
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <Button className="cursor-pointer bg-linear-to-r from-[#00df82] to-[#007947] font-medium text-[1.8rem] leading-8">
            <MessageCircle className="h-[1.723rem]! w-[1.723rem]!" />
            Get Career Advice
          </Button>
          <Button
            className="border border-primary cursor-pointer font-medium text-[1.8rem] leading-8"
            variant={"secondary"}
            onClick={() => {
              router.push("/auth/login");
            }}
          >
            Sign In
          </Button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="lg:hidden bg-secondary rounded-2xl w-full py-4 px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href={"/"}
            className="font-bold text-[#03624C] text-[3.4rem] sm:text-[3.8rem]"
          >
            Ambitful.ai
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-background hover:bg-gray-100/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-8 w-8" />
            ) : (
              <Menu className="h-8 w-8" />
            )}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`mt-4 overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-4 space-y-4">
            {/* Navigation Links */}
            <ul className="space-y-4 text-background">
              <li>
                <Link
                  href="/"
                  className="block py-2 text-[1.6rem] hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/"
                  className="block py-2 text-[1.6rem] hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Opportunities
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="block py-2 text-[1.6rem] hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/blogs"
                  className="block py-2 text-[1.6rem] hover:text-primary transition-colors"
                  onClick={closeMobileMenu}
                >
                  Blog
                </Link>
              </li>
            </ul>

            {/* Mobile Buttons */}
            <div className="pt-4 space-y-4 border-t border-gray-200/20">
              <Button
                size={"sm"}
                className="w-full cursor-pointer bg-linear-to-r from-[#00df82] to-[#007947] font-medium text-[1.8rem] py-6! h-20"
                onClick={closeMobileMenu}
              >
                <MessageCircle className="h-6! w-6! mr-2" />
                Get Career Advice
              </Button>

              <Button
                className="w-full border border-primary cursor-pointer font-medium text-[1.6rem] py-6! h-20"
                variant={"secondary"}
                onClick={() => {
                  closeMobileMenu();
                  router.push("/auth/login");
                }}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

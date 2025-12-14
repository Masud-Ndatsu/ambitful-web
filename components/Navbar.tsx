"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  return (
    <div className="px-8">
      <nav className="max-w-[158.6rem] mx-auto bg-secondary rounded-2xl w-full h-40 hidden lg:flex items-center py-[0.7rem] px-8 justify-between">
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
    </div>
  );
};

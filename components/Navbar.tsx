import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown, MessageCircle } from "lucide-react";

export const Navbar = () => {
  return (
    <div className="px-8">
      <nav className="max-w-[158.6rem] mx-auto bg-secondary rounded-2xl w-full h-40 flex items-center py-[0.7rem] px-8 justify-between">
        <h2 className="font-bold text-[#03624C] text-[4.8rem]">Ambitful.ai</h2>

        <ul className="flex justify-between item-center gap-8 text-background text-[1.6rem]">
          <li>
            <Link className="" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href="">Opportunities</Link>
          </li>
          <li>
            <Link href="/blogs" className="">
              Blogs
            </Link>
          </li>

          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <Button className="cursor-pointer bg-linear-to-r from-[#00df82] to-[#007947] font-medium text-[2rem] leading-8">
            <MessageCircle className="h-[1.99rem]! w-[1.99rem]!" />
            Get Career Advice
          </Button>
          <Button
            className="border border-primary cursor-pointer font-medium text-[2rem] leading-8"
            variant={"secondary"}
          >
            Sign In
          </Button>
        </div>
      </nav>
    </div>
  );
};

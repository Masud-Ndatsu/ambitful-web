import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-secondary rounded-xl w-full h-[100px] mt-[100px] flex items-center py-[7px] px-5 justify-between">
      <h2 className="font-bold text-[#03624C] text-5xl">Ambitful.ai</h2>

      <ul className="flex justify-between item-center gap-2.5 text-background">
        <li>
          <Link className="" href="#">
            Home
          </Link>
        </li>
        <li>
          <Link href="">Opportunities</Link>
        </li>
        <li className="flex items-center">
          <Link href="" className="flex items-center gap-1">
            Categories
            <ChevronDown className="h-4 w-4" />
          </Link>
        </li>

        <li>
          <Link href="">About</Link>
        </li>
        <li>
          <Link href="">Contact</Link>
        </li>
      </ul>

      <div className="flex items-center gap-2.5">
        <Button className="py-3 px-[30px] cursor-pointer">
          Get Career Advice
        </Button>
        <Button
          className="py-3 px-[30px] border border-primary cursor-pointer"
          variant={"secondary"}
        >
          Sign In
        </Button>
      </div>
    </nav>
  );
};

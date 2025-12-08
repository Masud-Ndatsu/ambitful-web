import Link from "next/link";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="bg-secondary rounded-xl w-full h-40 mt-40 flex items-center py-[0.7rem] px-8 justify-between">
      <h2 className="font-bold text-[#03624C] text-[4.8rem]">Ambitful.ai</h2>

      <ul className="flex justify-between item-center gap-4 text-background text-[1.6rem]">
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

      <div className="flex items-center gap-6">
        <Button className="cursor-pointer">
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.1625 14.8375L4.7025 13.99L5.16 14.2125C6.21875 14.7262 7.42875 15 8.75 15C13.12 15 16.25 11.8775 16.25 8.125C16.25 4.35875 13.1425 1.25 8.75 1.25C4.3575 1.25 1.25 4.35875 1.25 8.125C1.25739 9.56628 1.73196 10.9663 2.6025 12.115L3.025 12.6775L2.1625 14.8363V14.8375ZM1.27875 16.45C1.16563 16.4879 1.04403 16.4926 0.928312 16.4636C0.812592 16.4347 0.707585 16.3731 0.625696 16.2864C0.543808 16.1996 0.488458 16.0913 0.466184 15.9741C0.443911 15.8569 0.455645 15.7357 0.5 15.625L1.60375 12.8663C0.570226 11.501 0.00747727 9.83732 0 8.125C0 3.9825 3.3525 0 8.75 0C14.1475 0 17.5 3.9825 17.5 8.125C17.5 12.2675 14.1125 16.25 8.75 16.25C7.19375 16.25 5.80375 15.915 4.615 15.3375L1.2775 16.45H1.27875Z"
              fill="white"
            />
          </svg>
          Get Career Advice
        </Button>
        <Button
          className="border border-primary cursor-pointer"
          variant={"secondary"}
        >
          Sign In
        </Button>
      </div>
    </nav>
  );
};

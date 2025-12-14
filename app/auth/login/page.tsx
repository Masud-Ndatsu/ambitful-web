"use client";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RegisterPage() {
  const pathname = usePathname();

  console.log({ pathname });
  return (
    <form action="" className="h-[78.33rem] px-[8.533rem]">
      <h1 className="text-[4rem] leading-[5.067rem] text-[#101828]">
        Welcome back
      </h1>
      <p className="text-[2rem] leading-[3.2rem] my-[4.267rem] text-[#667085]">
        Join thousands of professionals finding their dream opportunities
      </p>
      <div className="text-[1.8rem] mb-8">
        <label className="block text-[#344054]" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="py-[1.333rem] px-[1.867rem] border-[0.133rem] rounded-[1.067rem] mt-[0.8] w-full"
          placeholder="Enter your email"
        />
      </div>
      <div className="text-[1.8rem] mb-8">
        <label className="block text-[#344054]" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="py-[1.333rem] px-[1.867rem] border-[0.133rem] rounded-[1.067rem] block mt-[0.8] w-full"
          placeholder="Create a password"
        />
        <small className="hidden text-[1.867rem] leading-[2.667rem] text-[#667085]">
          Must be at least 8 characters.
        </small>
      </div>

      <div>
        <Button className="block w-full bg-[#03624C]! text-[2.133rem] mb-[2.133rem] border-[0.133rem] rounded-[1.067rem]">
          Sign In
        </Button>
        <GoogleAuthButton />
      </div>

      <div className="mt-[4.267rem] text-center flex justify-center gap-4">
        <p className="text-[1.867rem]">Already have an account?</p>
        <Link
          className="text-[1.867rem] text-[#03624C]"
          href={"/auth/register"}
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
}

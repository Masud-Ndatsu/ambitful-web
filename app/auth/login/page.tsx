"use client";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

export default function RegisterPage() {
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log("Login form data:", data);
    // TODO: Implement login logic
  };

  console.log({ pathname });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:h-[78.33rem]">
      <h1 className="text-[4rem] text-center lg:text-left leading-[5.067rem] text-[#101828]">
        Welcome back
      </h1>
      <p className="text-[2rem] text-center lg:text-left leading-[3.2rem] my-[4.267rem] text-[#667085]">
        Join thousands of professionals finding their dream opportunities
      </p>
      <div className="text-[1.8rem] mb-8">
        <label className="block text-[#344054]" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="py-[1.333rem] px-[1.867rem] border-[0.133rem] rounded-[1.067rem] mt-[0.8] w-full"
          placeholder="Enter your email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500  mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="text-[1.8rem] mb-8">
        <label className="block text-[#344054]" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="py-[1.333rem] px-[1.867rem] border-[0.133rem] rounded-[1.067rem] block mt-[0.8] w-full"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <p className="text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Button
          type="submit"
          className="block w-full bg-[#03624C]! text-[2.133rem] mb-[2.133rem] border-[0.133rem] rounded-[1.067rem]"
        >
          Sign In
        </Button>
        <GoogleAuthButton />
      </div>

      <div className="mt-[4.267rem] text-center flex justify-center gap-4">
        <p className="text-[1.867rem]">Don't have an account?</p>
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

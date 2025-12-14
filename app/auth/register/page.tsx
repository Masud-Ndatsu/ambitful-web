"use client";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm } from "react-hook-form";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    console.log("Register form data:", data);
    // TODO: Implement registration logic
  };

  console.log({ pathname });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-[78.33rem]">
      <h1 className="text-[4rem] text-center lg:text-left leading-[5.067rem] text-[#101828]">
        Create Account
      </h1>
      <p className="text-[2rem] text-center lg:text-left leading-[3.2rem] my-[4.267rem] text-[#667085]">
        Join thousands of professionals finding their dream opportunities
      </p>
      <div className="text-[1.8rem] mb-8">
        <label className="block text-[#344054]" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          className="py-[1.333rem] px-[1.867rem] border-[0.133rem] rounded-[1.067rem] mt-[0.8] w-full"
          placeholder="Enter your name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div className="text-[1.8rem] mb-8">
        <label className="block text-[#344054]" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="py-[1.333rem] px-[1.867rem] border-[0.133rem] rounded-[1.067rem] mt-[0.8]  w-full"
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
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="text-[1.8rem] mb-8">
        <label className="block text-[#344054]" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="py-[1.333rem] px-[1.867rem] border-[0.133rem] rounded-[1.067rem] block mt-[0.8]  w-full"
          placeholder="Create a password"
        />
        <small className="hidden text-[1.867rem] leading-[2.667rem] text-[#667085]">
          Must be at least 8 characters.
        </small>
      </div>

      <div>
        <Button className="block w-full bg-[#03624C]! text-[2.133rem] mb-[2.133rem] border-[0.133rem] rounded-[1.067rem]">
          Create account
        </Button>
        <GoogleAuthButton />
      </div>

      <div className="mt-[4.267rem] text-center flex justify-center gap-4">
        <p className="text-[1.867rem]">Already have an account?</p>
        <Link className="text-[1.867rem] text-[#03624C]" href={"/auth/login"}>
          Sign In
        </Link>
      </div>
    </form>
  );
}

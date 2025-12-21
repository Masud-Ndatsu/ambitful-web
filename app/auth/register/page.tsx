// @typescript-eslint/no-explicit-any
"use client";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register as registerUser, RegisterFormData } from "@/actions/auth";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await registerUser(data);

      if (response.success) {
        router.push("/x/opportunities");
      } else {
        setError(response.message);
      }
    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-[2.5rem] md:text-[3.5rem] font-degular font-bold">
          Create Account
        </h1>
        <p className="text-[1.6rem] md:text-[1.8rem] text-muted-foreground">
          Join thousands of professionals finding their dream opportunities
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <label
            className="block text-[1.6rem] font-medium mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-3 border border-border rounded-lg text-[1.6rem] focus:outline-none"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-destructive text-[1.4rem] mt-1">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="block text-[1.6rem] font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-border rounded-lg text-[1.6rem] focus:outline-none"
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
            <p className="text-destructive text-[1.4rem] mt-1">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            className="block text-[1.6rem] font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 border border-border rounded-lg text-[1.6rem] focus:outline-none"
            placeholder="Create a password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-destructive text-[1.4rem] mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-[1.4rem]">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full text-[1.6rem] bg-[#03624C] font-medium px-4 py-8 h-12 disabled:opacity-50"
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </Button>
        <GoogleAuthButton />
      </div>

      <div className="text-center">
        <p className="text-[1.6rem] text-muted-foreground">
          Already have an account?{" "}
          <Link
            className="text-[#03624C] font-medium hover:underline"
            href={"/auth/login"}
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}

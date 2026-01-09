// @typescript-eslint/no-explicit-any

"use client";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/validations";
import { useLogin } from "@/hooks/useAuthentication";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const loginMutation = useLogin();
  const isLoading = loginMutation.isPending;
  const { toast } = useToast();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      if (response.success && response.data) {
        const { user } = response.data;

        // Check role first - admins/moderators skip onboarding
        if (user.role === "ADMIN" || user.role === "MODERATOR") {
          router.push("/x/admin/dashboard");
        } else if (!user.isOnboardingComplete) {
          router.push("/onboarding?step=1");
        } else {
          router.push("/x/opportunities");
        }
      } else {
        toast({
          title: "Login Failed",
          description: response.message || "Unable to sign in",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Login failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-[2.5rem] md:text-[3.5rem] font-degular font-bold">
          Welcome back
        </h1>
        <p className="text-[1.6rem] md:text-[1.8rem] text-muted-foreground">
          Join thousands of professionals finding their dream opportunities
        </p>
      </div>
      <div className="space-y-4">
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
            className="block text-[1.6rem] font-medium  mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-3 border rounded-lg  text-[1.6rem] focus:outline-none"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-destructive text-[1.4rem] mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <Button
          type="submit"
          loading={isLoading}
          className="w-full text-[1.6rem] bg-[#03624C] font-medium px-4 py-8 h-12"
        >
          Sign In
        </Button>
        <GoogleAuthButton />
      </div>

      <div className="text-center">
        <p className="text-[1.6rem] text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            className="text-[#03624C] font-medium hover:underline"
            href={"/auth/register"}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
}

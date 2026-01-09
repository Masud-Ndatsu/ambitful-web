"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import { signInWithGoogle } from "@/lib/firebase";
import { useGoogleAuth } from "@/hooks/useAuthentication";
import { useToast } from "@/hooks/use-toast";

export const GoogleAuthButton = () => {
  const router = useRouter();
  const googleAuthMutation = useGoogleAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);

    try {
      // Step 1: Sign in with Google via Firebase
      const { idToken } = await signInWithGoogle();

      // Step 2: Send token to our backend
      const response = await googleAuthMutation.mutateAsync({ idToken });

      if (response.success && response.data) {
        const { user, isNewUser } = response.data;

        // Redirect based on user state
        if (user.role === "ADMIN" || user.role === "MODERATOR") {
          router.push("/x/admin/dashboard");
        } else if (isNewUser || !user.isOnboardingComplete) {
          router.push("/onboarding?step=1");
        } else {
          router.push("/x/opportunities");
        }
      } else {
        toast({
          title: "Google Sign-in Failed",
          description: response.message || "Unable to sign in with Google",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      // Handle Firebase popup closed by user
      if (error.code === "auth/popup-closed-by-user") {
        return;
      }

      toast({
        title: "Google Sign-in Failed",
        description:
          error.message || "Failed to sign in with Google. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      disabled={isLoading || googleAuthMutation.isPending}
      loading={isLoading || googleAuthMutation.isPending}
      className="flex items-center justify-center gap-3 w-full text-[1.6rem] font-medium bg-foreground border px-4 py-8 h-12!"
    >
      <Image
        src={"/google_icon.svg"}
        alt="Google Icon"
        width={20}
        height={20}
      />
      Sign in with Google
    </Button>
  );
};

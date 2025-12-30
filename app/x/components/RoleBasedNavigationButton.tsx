"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuthentication";
import { useRouter } from "next/navigation";
import { LayoutDashboard, Briefcase } from "lucide-react";

interface Props {
  className?: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
}

export function RoleBasedNavigationButton({ className, variant = "default" }: Props) {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  const isAdmin = user.role === "ADMIN" || user.role === "MODERATOR";
  
  const handleNavigation = () => {
    if (isAdmin) {
      router.push("/x/admin/dashboard");
    } else {
      router.push("/x/opportunities");
    }
  };

  return (
    <Button
      onClick={handleNavigation}
      variant={variant}
      className={className}
    >
      {isAdmin ? (
        <>
          <LayoutDashboard className="w-5 h-5 mr-2" />
          Admin Dashboard
        </>
      ) : (
        <>
          <Briefcase className="w-5 h-5 mr-2" />
          View Opportunities
        </>
      )}
    </Button>
  );
}
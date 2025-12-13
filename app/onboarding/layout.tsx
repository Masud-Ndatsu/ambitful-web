import React from "react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-foreground/80 text-background grid place-items-center">
      {children}
    </main>
  );
}

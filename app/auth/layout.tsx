import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <section
        style={{
          backgroundImage: "url('/bg_auth.jpg')",
          opacity: "0.8",
        }}
        className="min-h-screen flex-2 bg-repeat-none bg-cover bg-center grid place-items-center"
      >
        <div className="max-w-[89.6rem] grid gap-[6.4rem]">
          <Link href={"/"}>
            <img src="/auth_star.svg" alt="Ambitful Logo" />
          </Link>
          <h1 className="text-[6rem] leading-24 font-degular font-semibold">
            Connect to Your Future with AI-Powered Opportunities
          </h1>
          <p className="text-[2rem] leading-12">
            Discover personalized job matches, exclusive fellowships, and career
            opportunities tailored by advanced AI technology.
          </p>
        </div>
      </section>
      <section className="flex-1 min-w-[70.4rem] bg-secondary text-background grid place-items-center">
        {children}
      </section>
    </main>
  );
}

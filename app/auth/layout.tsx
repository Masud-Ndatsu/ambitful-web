import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="lg:flex min-h-screen">
      <section className="overlay hidden lg:flex bg-[url(/bg_auth.jpg)] flex-2 bg-cover bg-center items-center justify-center p-8">
        <div className="max-w-4xl space-y-16 text-white">
          <Link href={"/"} className="inline-block">
            <Image
              src="/auth_star.svg"
              alt="Ambitful Logo"
              width={80}
              height={80}
            />
          </Link>
          <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[6rem] leading-tight font-degular font-semibold">
            Connect to Your Future with AI-Powered Opportunities
          </h1>
          <p className="text-[1.8rem] md:text-[2rem] leading-relaxed">
            Discover personalized job matches, exclusive fellowships, and career
            opportunities tailored by advanced AI technology.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              <Avatar className="w-16 h-16 ring-2 ring-white">
                <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="w-16 h-16 ring-2 ring-white">
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="User 2"
                />
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
              <Avatar className="w-16 h-16 ring-2 ring-white">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="User 3"
                />
                <AvatarFallback>U3</AvatarFallback>
              </Avatar>
              <Avatar className="w-16 h-16 ring-2 ring-white">
                <AvatarFallback className="bg-primary text-white">
                  +2
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
                <span className="text-[2rem] font-medium ml-2">5.0</span>
              </div>
              <p className="text-primary text-[1.8rem] font-medium">
                from 200+ reviews
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex-1 px-6 sm:px-12 lg:px-20 min-h-screen bg-white text-background flex items-center justify-center">
        <div className="w-full max-w-lg">{children}</div>
      </section>
    </main>
  );
}

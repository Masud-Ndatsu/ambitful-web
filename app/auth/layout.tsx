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
          <div className="flex gap-8">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
              <Avatar className="w-[5.333rem] h-[5.333rem]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="w-[5.333rem] h-[5.333rem]">
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar className="w-[5.333rem] h-[5.333rem]">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <Avatar className="w-[5.333rem] h-[5.333rem]">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <Avatar className="w-[5.333rem] h-[5.333rem]">
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <div className="flex gap-[1.067rem] mb-[0.533rem]">
                <Image
                  src={"/auth_yellow_star.svg"}
                  alt="Review star"
                  width={26.666}
                  height={26.666}
                  className="text-[#FEC84B]!"
                />
                <Image
                  src={"/auth_yellow_star.svg"}
                  alt="Review star"
                  width={26.666}
                  height={26.666}
                  className="text-[#FEC84B]!"
                />{" "}
                <Image
                  src={"/auth_yellow_star.svg"}
                  alt="Review star"
                  width={26.666}
                  height={26.666}
                  className="text-[#FEC84B]!"
                />{" "}
                <Image
                  src={"/auth_yellow_star.svg"}
                  alt="Review star"
                  width={26.666}
                  height={26.666}
                  className="text-[#FEC84B]!"
                />{" "}
                <Image
                  src={"/auth_yellow_star.svg"}
                  alt="Review star"
                  width={26.666}
                  height={26.666}
                  className="text-[#FEC84B]!"
                />
                <p className="text-[2.133rem]">5.0</p>
              </div>
              <p className="text-[#40B36D] text-[2.133rem]">
                from 200+ reviews
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex-1 min-w-[70.4rem] bg-secondary text-background grid place-items-center">
        {children}
      </section>
    </main>
  );
}

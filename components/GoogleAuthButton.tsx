import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export const GoogleAuthButton = () => {
  return (
    <div>
      <Button className="flex items-center gap-8 w-full text-[2.133rem] bg-foreground! text-[#344054]!  border-[0.133rem] rounded-[1.067rem] ">
        <Image
          src={"/google_icon.svg"}
          alt="Google Icon"
          width={32}
          height={32}
          className="inline"
        />{" "}
        Sign up with Google
      </Button>
    </div>
  );
};

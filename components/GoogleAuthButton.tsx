import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export const GoogleAuthButton = () => {
  return (
    <Button
      variant="outline"
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

import { Button } from "@/components/ui/button";
import Image from "next/image";
import ReactPlayer from "react-player";

export const HeroSection = () => {
  return (
    <>
      <section className="text-center leading-24 p-8 md:p-20">
        <h1 className="font-degular py-5 md:py-8 text-[5rem] md:text-[8rem] lg:text-[10rem] font-bold leading-tight">
          Make Your Dream Reality
        </h1>

        <p className="text-[1.6rem] md:text-[1.8rem] lg:text-[2rem] max-w-[90%] md:max-w-358 mx-auto leading-[2.6rem] md:leading-14 mb-10 md:mb-0">
          Connect with AI-powered career opportunities, get personalized
          guidance, and recommended insider connections in less than 1 min!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 p-10 md:py-20 px-4">
          <Button
            size="xl"
            className="bg-linear-to-r from-[#00df82] to-[#007947] flex items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Image
              src={"/search.svg"}
              alt="Browse Opportunities"
              width={20}
              height={20}
            />
            Browse Opportunities
          </Button>
          <Button
            size="xl"
            variant={"secondary"}
            className="w-full bg-transperent sm:w-auto border border-[#007947] text-white"
          >
            <Image src={"/btn-ai.svg"} alt="AI Agent" width={20} height={20} />
            Talk to AI Agent
          </Button>
        </div>
      </section>

      <section className="bg-radial from-[#00DF82] to-[#00DF8200] p-6 md:p-12 pb-0 max-w-[99.2rem] w-full mx-auto rounded-2xl overflow-hidden">
        <ReactPlayer
          src="/videos/hero_player.mp4"
          width="100%"
          height="100%"
          className="rounded-t-2xl w-full aspect-video"
          loop
          muted
          controls
        />
      </section>
    </>
  );
};

import { Button } from "@/components/ui/button";
import Image from "next/image";
import ReactPlayer from "react-player";

export const HeroSection = () => {
  return (
    <>
      <section className="text-center leading-36 bg-linear-to-r from-[#00DF821A]/15 from-10% via-[#000000] to-[#00DF821A]/15 to-90%">
        <div className="py-[9.2rem]">
          <h1 className="font-degular text-[8rem] lg:text-[10rem] font-bold">
            Discover Opportunity
          </h1>
          <h1 className="font-degular text-[6rem] lg:text-[8rem] font-bold">
            Empower Your Future
          </h1>
        </div>

        <p className="text-[2.3rem] max-w-358 mx-auto leading-14">
          Connect with AI-powered career opportunities, get personalized
          guidance, and join thousands of professionals who've transformed their
          careers with AMBITFUL.AI.
        </p>

        <div className="flex items-center justify-center gap-5 py-[9.2rem] px-8">
          <Button
            size="xl"
            variant={"xl"}
            className="flex items-center gap-2.5"
          >
            <Image
              src={"/search.svg"}
              alt="Btn Search"
              width={20}
              height={20}
            />
            Browse Opportunities
          </Button>
          <Button
            size="xl"
            className="bg-background text-foreground border border-primary"
            variant={"secondary"}
          >
            <Image src={"/btn-ai.svg"} alt="Btn Ai" width={20} height={20} />
            Talk to AI Agent
          </Button>
        </div>
      </section>

      <section className="bg-radial from-[#00DF82] to-[#00DF8200] min-h-120 max-w-[129.7rem] w-full m-auto rounded-2xl lg:p-20 pb-0 flex items-end justify-center">
        <div className=" w-full h-full lg:h-280">
          <ReactPlayer
            src="/videos/hero_player.mp4"
            width="100%"
            height="100%"
            className="rounded-t-2xl object-cover"
            loop
            muted
            controls
          />
        </div>
      </section>
    </>
  );
};

import { Button } from "@/components/ui/button";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <>
      <section className="text-center leading-36">
        <div className="py-[9.2rem]">
          <h1 className="font-degular text-[12rem] font-bold">
            Discover Opportunity
          </h1>
          <h1 className="font-degular text-[10rem] font-bold">
            Empower Your Future
          </h1>
        </div>

        <p className="text-[2.5rem] max-w-358 mx-auto leading-14">
          Connect with AI-powered career opportunities, get personalized
          guidance, and join thousands of professionals who've transformed their
          careers with AMBITFUL.AI.
        </p>

        <div className="flex justify-center gap-5 py-[9.2rem]">
          <Button
            size="xl"
            variant={"xl"}
            className="flex items-center gap-2.5"
          >
            <Image
              src={"/search.svg"}
              alt="Btn Search"
              width={20.31}
              height={20.31}
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

      <section className="bg-radial from-[#00DF82] to-[#00DF8200] min-h-404 max-w-[159.7rem] w-full m-auto rounded-2xl p-10 pb-0 flex items-end justify-center">
        <div className="relative w-full h-full lg:h-376">
          <Image
            src={"/banner.png"}
            alt={"Banner Image"}
            fill
            sizes="100vw"
            className="object-cover rounded-2xl"
          />
        </div>
      </section>
    </>
  );
};

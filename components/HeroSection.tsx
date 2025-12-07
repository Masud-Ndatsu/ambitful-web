import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <>
      <section className="text-center leading-[90px]">
        <div className="py-[92px]">
          <h1 className="font-degular text-[120px] font-bold">
            Discover Opportunity
          </h1>
          <h1 className="font-degular text-[100px] font-bold">
            Empower Your Future
          </h1>
        </div>

        <p className="text-[25px] max-w-[895px] mx-auto leading-[35px]">
          Connect with AI-powered career opportunities, get personalized
          guidance, and join thousands of professionals who've transformed their
          careers with AMBITFUL.AI.
        </p>

        <div className="flex justify-center gap-5 py-[92px]">
          <Button size="xl" className="flex items-center gap-2.5">
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

      <section className="bg-radial from-[#00DF82] to-[#00DF8200] min-h-[1010px] max-w-[1597px] w-full m-auto rounded-[10px] p-10 pb-0 flex items-end justify-center">
        <div className="relative w-full h-full lg:h-[940px]">
          <Image
            src={"/banner.png"}
            alt={"Banner Image"}
            fill
            sizes="100vw"
            className="object-cover rounded-[10px]"
          />
        </div>
      </section>
    </>
  );
};

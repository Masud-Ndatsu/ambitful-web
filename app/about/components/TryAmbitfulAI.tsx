import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function TryAmbitfulAI() {
  return (
    <section className="py-[11.788rem] lg:px-[29.986rem]">
      <div className="text-center max-w-[163.7rem] m-auto">
        <h3 className="leading-[4.421rem] tracking-[-0.066rem] font-medium text-[5rem]">
          Try Ambitful AI
        </h3>
        <p className="leading-[3.536rem] tracking-[-0.046rem] mt-8 mb-[4.715rem]">
          Ready to transform your career journey? Join thousands of
          professionals who have already discovered their dream opportunities
          through our AI-powered platform.
        </p>
        <div className="flex justify-center gap-[2.358rem]">
          <Button className="bg-[#00DF82] text-background rounded-[1.179rem] text-[2rem] leading-[2.947rem] tracking-[-0.022rem]">
            Get Started Free{" "}
            <ArrowRight className="h-[1.99rem]! w-[1.99rem]!" />
          </Button>
          <Button className="bg-background! border border-primary rounded-[1.179rem] text-[2rem] leading-[2.947rem] tracking-[-0.022rem]">
            Learn More
          </Button>
        </div>{" "}
      </div>
    </section>
  );
}

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function TryAmbitfulAI() {
  return (
    <section className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[159.7rem] mx-auto text-center">
        <h3 className="font-medium font-degular text-[4rem] md:text-[5rem] leading-tight mb-8 text-foreground">
          Try Ambitful AI
        </h3>
        <p className="text-[1.8rem] md:text-[2rem] leading-relaxed mb-12 text-muted-foreground max-w-3xl mx-auto">
          Ready to transform your career journey? Join thousands of
          professionals who have already discovered their dream opportunities
          through our AI-powered platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Button size="xl" className="flex items-center justify-center gap-3">
            Get Started Free
            <ArrowRight size={20} />
          </Button>
          <Button size="xl" variant="outline" className="flex items-center justify-center">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}

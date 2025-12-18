import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Testimonial } from "@/app/types";
import Image from "next/image";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="border border-primary text-left p-6 md:p-8 h-full flex flex-col">
      <CardHeader className="p-0 mb-4">
        <div className="flex gap-1">
          <Image
            src={"/quote_mark.svg"}
            alt="Quote mark"
            width={12}
            height={30}
            className="w-[1.2rem] h-12"
          />
          <Image
            src={"/quote_mark.svg"}
            alt="Quote mark"
            width={12}
            height={30}
            className="w-[1.2rem] h-12"
          />
        </div>
      </CardHeader>

      <CardDescription className="text-[1.8rem] md:text-[2rem] italic py-4 md:py-5 text-foreground leading-relaxed grow">
        &quot;{testimonial.quote}&quot;
      </CardDescription>

      <CardFooter className="p-0 gap-4 md:gap-5 mt-auto">
        <Avatar className="w-16 h-16 md:w-24 md:h-24 shrink-0">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback className="text-[1.4rem] md:text-[1.6rem]">
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-[1.6rem] md:text-[1.9rem] truncate">
            {testimonial.name}
          </h2>
          <h4 className="text-[1.4rem] md:text-[1.6rem] font-normal text-muted-foreground truncate">
            {testimonial.title}
          </h4>
          <h5 className="text-[1.2rem] md:text-[1.4rem] font-normal text-muted-foreground truncate">
            {testimonial.location}
          </h5>
        </div>
      </CardFooter>
    </Card>
  );
};

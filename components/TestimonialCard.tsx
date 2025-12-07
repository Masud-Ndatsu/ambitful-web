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
    <Card className="text-[14.95px] border border-primary text-left p-[31px]">
      <CardHeader className="p-0">
        <Image
          src={"/quote_mark.svg"}
          alt={"Quotation Mark Image"}
          width={12}
          height={30}
          className="object-cover inline"
        />
        <Image
          src={"/quote_mark.svg"}
          alt={"Quotation Mark Image"}
          width={12}
          height={30}
          className="object-cover inline"
        />
      </CardHeader>
      <CardDescription className="text-[22.43px] italic py-5 text-foreground">
        "{testimonial.quote.slice(0, 130) + "..."}"
      </CardDescription>
      <CardFooter className="p-0 gap-5">
        <Avatar className="w-[59.8125px] h-[59.8125px]">
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback>
            {testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-[19.94px]">{testimonial.name}</h2>
          <h4 className="text-[17.45px] font-normal">{testimonial.title}</h4>
          <h5 className="text-[14.95px] font-normal">{testimonial.location}</h5>
        </div>
      </CardFooter>
    </Card>
  );
};

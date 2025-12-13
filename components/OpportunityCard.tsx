import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OpportunityCardProp } from "@/app/types";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";

export const OpportunityCard = ({
  opportunity: { title, category, description, deadline, locations },
}: OpportunityCardProp) => {
  return (
    <Card className="w-full max-w-md bg-background border border-primary lg:min-w-[48.6rem] max-h-[37.617rem] py-[3.1rem] px-[2.1rem]">
      <CardHeader className="p-0!">
        <Badge className="border-0 py-[0.4rem] px-[1.6rem] text-[1.495rem] font-semibold leading-[1.994rem] mb-8">
          {category}
        </Badge>
        <CardTitle className="text-left! text-[2.492rem] leading-[3.489rem]">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0! text-left! py-12">
        <CardDescription className="text-[1.745rem] text-foreground leading-[2.492rem]">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="block! p-0! space-y-3.5">
        <div className="text-[1.745rem] leading-[2.492rem] text-foreground">
          Deadline: {deadline}
        </div>
        <div className="flex flex-col flex-wrap gap-2 text-left">
          {locations.map((location, index) => (
            <span
              key={index}
              className="flex items-center gap-4 text-[1.745rem] leading-[2.492rem] "
            >
              <MapPin className="h-[1.99rem] w-[1.99rem]" />
              {location}
            </span>
          ))}
        </div>
        <Button
          variant={"secondary"}
          className="block! w-full bg-background! text-foreground border border-primary mt-12"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

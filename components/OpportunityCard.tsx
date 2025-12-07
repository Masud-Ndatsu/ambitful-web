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

export const OpportunityCard = ({
  opportunity: { title, category, description, deadline, locations },
}: OpportunityCardProp) => {
  return (
    <Card className="w-full max-w-md bg-background border border-primary lg:min-w-[486px] max-h-[376.1796875px] py-[31px] px-[21px]">
      <CardHeader className="p-0!">
        <Badge className="border-0">{category}</Badge>
        <CardTitle className="text-xl text-left!">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0! text-left! py-[30px]">
        <CardDescription className="text-[18px] text-foreground leading-[24.92px]">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="block! p-0! space-y-3.5">
        <div className="text-[18px] text-foreground">Deadline: {deadline}</div>
        <div className="flex flex-col flex-wrap gap-2 text-left">
          {locations.map((location, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {location}
            </Badge>
          ))}
        </div>
        <Button
          variant={"secondary"}
          className="block! w-full bg-background! text-foreground border border-primary mt-[30px]"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
};

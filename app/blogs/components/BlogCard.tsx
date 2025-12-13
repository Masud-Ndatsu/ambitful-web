import { blogItems } from "@/app/data/blogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CalendarHeart } from "lucide-react";
import Image from "next/image";

type BlogType = (typeof blogItems)[0];

export default function BlogCard({ blog }: { blog: BlogType }) {
  return (
    <Card className="p-0! flex! flex-col gap-[2.297rem] pb-[3.01rem]! border border-[#00DF824D] rounded-[2.01rem]">
      <div className="relative w-full h-[28.03rem] rounded-t-[2.01rem] overflow-hidden">
        <Image
          src="/ai_blog.svg"
          fill
          alt="Ai Blog Image"
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex gap-[2.297rem] text-[2.01rem] leading-[2.872rem] tracking-[-0.022rem] px-[2.01rem] mt-[2.01rem]">
        <Badge className="text-[2.01rem] leading-[2.872rem] tracking-[-0.022rem]">
          {blog.category}
        </Badge>
        <span>5 min read</span>
      </div>
      <CardTitle className="text-[2.297rem] leading-[3.446rem] px-[2.01rem]">
        {blog.title}
      </CardTitle>
      <CardDescription className="text-[2.297rem] px-[2.01rem]!">
        {blog.description}
      </CardDescription>
      <CardFooter className="p-0! flex justify-between items-center! mx-[2.297rem]! py-[2.01rem]! border-t border-[#00DF8233]">
        <div>
          <h3 className="text-[2.297rem] leading-[2.872rem]  tracking-[-0.022rem]">
            {blog.author}
          </h3>
          <p className="flex items-center gap-2 text-[2.01rem] text-muted-foreground">
            <CalendarHeart /> {blog.publishedAt}
          </p>
        </div>
        <Button className="text-[2.01rem] bg-background! cursor-pointer text-[#00DF82]">
          Read More <ArrowRight className="w-[1.8rem]! h-[1.8rem]!" />{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}

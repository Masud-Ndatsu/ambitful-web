import { blogItems } from "@/app/data/blogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, CalendarHeart } from "lucide-react";
import Image from "next/image";

type BlogType = (typeof blogItems)[0];

export default function BlogCard({ blog }: { blog: BlogType }) {
  return (
    <Card className="p-0! flex! flex-col gap-[2.297rem] border border-[#00DF824D] rounded-[2.01rem]">
      <div className="relative w-full h-96 rounded-t-[2.01rem] overflow-hidden">
        <Image
          src="/ai_blog.svg"
          fill
          alt="Ai Blog Image"
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex gap-[2.297rem] text-[2.01rem] leading-[2.872rem] tracking-[-0.022rem] px-[1.8rem] mt-[1.2rem]">
        <Badge className="text-[1.6rem] leading-[2.872rem] tracking-[-0.022rem] border-0 bg-[#00DF8233] text-[#00DF82] px-4!">
          {blog.category}
        </Badge>
        <span>5 min read</span>
      </div>
      <CardTitle className="text-[2.297rem] leading-[3.446rem] px-[1.8rem]">
        {blog.title}
      </CardTitle>
      <CardDescription className="text-[2rem] px-[1.8rem]!">
        {blog.description}
      </CardDescription>
      <CardFooter className="p-0! flex justify-between items-center! mx-[1.8rem]! py-[1.8rem]! border-t border-[#00DF8233]">
        <div className="flex flex-col gap-3">
          <h3 className="text-[2rem] leading-[2.872rem]  tracking-[-0.022rem]">
            {blog.author}
          </h3>
          <p className="flex items-center gap-2 text-[1.8rem] text-muted-foreground">
            <CalendarHeart className="h-[1.723rem] w-[1.723rem]" />{" "}
            {blog.publishedAt}
          </p>
        </div>
        <Button className="text-[1.8rem] bg-background! cursor-pointer text-[#00DF82]">
          Read More <ArrowRight className="w-[1.8rem]! h-[1.8rem]!" />{" "}
        </Button>
      </CardFooter>
    </Card>
  );
}

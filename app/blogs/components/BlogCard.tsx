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
    <Card className="p-0 flex flex-col border border-primary/30 rounded-2xl bg-card h-full">
      <div className="relative w-full h-64 md:h-72 rounded-t-2xl overflow-hidden">
        <Image
          src="/ai_blog.svg"
          fill
          alt="AI Blog Image"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col p-6">
        <div className="flex items-center gap-4 mb-4">
          <Badge className="text-[1.4rem] bg-primary/20 text-primary border-0">
            {blog.category}
          </Badge>
          <span className="text-[1.4rem] text-muted-foreground">{blog.readTime}</span>
        </div>
        
        <CardTitle className="text-[2rem] md:text-[2.2rem] leading-tight mb-4 text-foreground font-degular">
          {blog.title}
        </CardTitle>
        
        <CardDescription className="text-[1.6rem] md:text-[1.8rem] leading-relaxed mb-6 text-muted-foreground flex-1">
          {blog.description}
        </CardDescription>
        
        <CardFooter className="p-0 flex justify-between items-center border-t border-primary/20 pt-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-[1.6rem] md:text-[1.8rem] font-medium text-foreground">
              {blog.author}
            </h3>
            <p className="flex items-center gap-2 text-[1.4rem] text-muted-foreground">
              <CalendarHeart size={16} />
              {blog.publishedAt}
            </p>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2 text-primary">
            Read More
            <ArrowRight size={16} />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}

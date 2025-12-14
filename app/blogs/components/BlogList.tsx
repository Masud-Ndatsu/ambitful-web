import React from "react";
import BlogCard from "./BlogCard";
import { blogItems } from "@/app/data/blogs";

export default function BlogList() {
  return (
    <section className="max-w-[163.7rem] m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 p-[3rem] md:p-[5rem] lg:p-[10rem] mb-[11.7rem]">
      {blogItems.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </section>
  );
}

import { testimonials } from "@/app/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";

export const TestimonialsSection = () => {
  return (
    <section className="bg-linear-to-r from-[#171A21] to-[#171A2100] h-[945.16px] py-20 text-center">
      <header>
        <h1 className="font-bold font-degular text-[60px]">
          Stories That Inspire
        </h1>
        <p className="text-[22.43px] font-normal">
          Real success stories from our community
        </p>
      </header>

      <div className="max-w-[1597px] w-full m-auto grid gap-[30px] mt-10 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      <footer className="flex items-center justify-center gap-2.5 mt-10">
        <div className="h-[30px] w-[30px] rounded-full border border-primary"></div>
        <div className="h-[30px] w-[30px] rounded-full border border-primary"></div>
        <div className="h-[30px] w-[30px] rounded-full border border-primary"></div>
        <div className="h-[30px] w-[30px] rounded-full border border-primary"></div>
        <div className="h-[30px] w-[30px] rounded-full border border-primary"></div>
      </footer>
    </section>
  );
};
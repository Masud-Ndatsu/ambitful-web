import { testimonials } from "@/app/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";

export const TestimonialsSection = () => {
  return (
    <section className="bg-linear-to-r from-[#171A21] to-[#171A2100] h-[94.516rem] py-20 text-center grid place-items-center gap-8">
      <header>
        <h1 className="font-bold font-degular text-[6rem]">
          Stories That Inspire
        </h1>
        <p className="text-[2.243rem] font-normal">
          Real success stories from our community
        </p>
      </header>

      <div className="max-w-[159.7rem] w-full m-auto grid gap-12 mt-10 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      <footer className="flex items-center justify-center gap-4 mt-8">
        <div className="h-12  w-12 rounded-full border border-primary"></div>
        <div className="h-12  w-12  rounded-full border border-primary"></div>
        <div className="h-12  w-12  rounded-full border border-primary"></div>
        <div className="h-12  w-12  rounded-full border border-primary"></div>
        <div className="h-12  w-12  rounded-full border border-primary"></div>
      </footer>
    </section>
  );
};

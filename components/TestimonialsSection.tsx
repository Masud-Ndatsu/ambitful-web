import { testimonials } from "@/app/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";

export const TestimonialsSection = () => {
  return (
    <section className="bg-linear-to-r from-[#171A21] to-[#171A2100] py-16 md:py-20 px-4 md:px-8 text-center">
      <div className="max-w-[159.7rem] mx-auto">
        <header className="mb-12 md:mb-16">
          <h1 className="font-bold font-degular text-[4rem] md:text-[6rem] mb-4">
            Stories That Inspire
          </h1>
          <p className="text-[1.8rem] md:text-[2.2rem] font-normal text-muted-foreground">
            Real success stories from our community
          </p>
        </header>

        <div className="w-full grid gap-6 md:gap-8 lg:gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12 md:mb-16">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <footer className="flex items-center justify-center gap-3 md:gap-4">
          {[...Array(5)].map((_, index) => (
            <div 
              key={index}
              className="h-12 w-12 rounded-full border border-primary"
            />
          ))}
        </footer>
      </div>
    </section>
  );
};

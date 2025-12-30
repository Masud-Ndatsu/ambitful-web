"use client";

import { useState, useEffect, useCallback } from "react";
import { testimonials } from "@/app/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Calculate how many cards to show based on screen size
  const [cardsToShow, setCardsToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else {
        setCardsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - cardsToShow);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Calculate the number of dots to show
  const totalDots = maxIndex + 1;

  return (
    <section className="bg-linear-to-r from-[#171A21] to-[#171A2100] py-10 md:py-20 px-4 md:px-8 text-center">
      <div className="max-w-[159.7rem] mx-auto">
        <header className="mb-12 md:mb-16">
          <h1 className="font-bold font-degular text-[4rem] md:text-[6rem] mb-4">
            Stories That Inspire
          </h1>
          <p className="text-[1.8rem] md:text-[2.2rem] font-normal text-muted-foreground">
            Real success stories from our community
          </p>
        </header>

        {/* Carousel Container */}
        <div className="relative mb-12 md:mb-16">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-primary hover:bg-primary hover:text-primary-foreground transition-all hidden md:flex"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-primary hover:bg-primary hover:text-primary-foreground transition-all hidden md:flex"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 px-3 md:px-4"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <footer className="flex items-center justify-center gap-3 md:gap-4">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </footer>

        {/* Mobile Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mt-8 md:hidden">
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="h-12 w-12 rounded-full border-primary"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="h-12 w-12 rounded-full border-primary"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};


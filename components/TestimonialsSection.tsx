"use client";

import { testimonials } from "@/app/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";
import { useRef, useEffect, useState } from "react";

export const TestimonialsSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const scrollIntervalRef = useRef<number>(0);

  // Create infinite testimonials array (triple the original for seamless loop)
  const infiniteTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const startAutoScroll = () => {
      autoPlayRef.current = setInterval(() => {
        if (!carousel) return;

        // Scroll by 1px for smooth continuous motion
        carousel.scrollLeft += 1;

        // Calculate scroll progress
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const currentScroll = carousel.scrollLeft;
        const progress = (currentScroll / maxScroll) * 100;
        setScrollProgress(progress);

        // Reset to beginning when reaching the end of second set
        const singleSetWidth = carousel.scrollWidth / 3;
        if (carousel.scrollLeft >= singleSetWidth * 2) {
          carousel.scrollLeft = singleSetWidth;
        }
      }, 30); // Smooth 30ms interval for continuous scrolling
    };

    // Set initial position to middle set
    const singleSetWidth = carousel.scrollWidth / 3;
    carousel.scrollLeft = singleSetWidth;

    startAutoScroll();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  // Handle manual scroll
  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    const currentScroll = carousel.scrollLeft;
    const progress = (currentScroll / maxScroll) * 100;
    setScrollProgress(progress);

    // Reset auto-scroll timer on manual interaction
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    // Restart auto-scroll after 2 seconds of no interaction
    clearTimeout(scrollIntervalRef.current);
    scrollIntervalRef.current = window.setTimeout(() => {
      if (!carousel) return;

      autoPlayRef.current = setInterval(() => {
        carousel.scrollLeft += 1;

        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        const currentScroll = carousel.scrollLeft;
        const progress = (currentScroll / maxScroll) * 100;
        setScrollProgress(progress);

        const singleSetWidth = carousel.scrollWidth / 3;
        if (carousel.scrollLeft >= singleSetWidth * 2) {
          carousel.scrollLeft = singleSetWidth;
        }
      }, 30);
    }, 2000);
  };

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

        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="w-full overflow-x-auto overflow-y-hidden mb-12 md:mb-16 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex gap-6 md:gap-8 lg:gap-12">
            {infiniteTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-2rem)]"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator Dots */}
        <footer className="flex items-center justify-center gap-3 md:gap-4">
          {[...Array(5)].map((_, index) => {
            const dotProgress = Math.min(
              100,
              Math.max(0, (scrollProgress - index * 20) * 5)
            );

            return (
              <div
                key={index}
                className="h-3 w-12 rounded-full border border-primary overflow-hidden bg-transparent"
              >
                <div
                  className="h-full bg-primary transition-all duration-300 ease-out"
                  style={{ width: `${dotProgress}%` }}
                />
              </div>
            );
          })}
        </footer>
      </div>
    </section>
  );
};

import { FeaturedOpportunities } from "@/components/FeaturedOpportunities";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <header className="max-w-[159.7rem] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Navbar />
      </header>

      <HeroSection />

      <section className="max-w-[159.7rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <FeaturedOpportunities />
      </section>

      <HowItWorksSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
